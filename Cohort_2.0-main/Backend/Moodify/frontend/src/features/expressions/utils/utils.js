import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

/**
 * init()
 * Loads the FaceLandmarker model AND starts the camera.
 * Returns a Promise that resolves only after video.play() succeeds,
 * so callers can safely set ready=true and enable the detect button.
 */
export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
  // Guard against React Strict Mode double-invoke
  if (landmarkerRef.current) return;

  // 1. Load MediaPipe model
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  // 2. Stop any leftover stream from a previous mount
  if (streamRef.current) {
    streamRef.current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  // 3. Open the camera — try with facingMode first, fall back if denied
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
  } catch (err) {
    console.warn("facingMode constraint failed, retrying without it:", err.message);
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  }

  streamRef.current = stream;

  const video = videoRef.current;
  if (!video) return; // component unmounted before we got here

  video.srcObject = stream;

  // 4. Wait until metadata is loaded AND play() has started
  //    This is the critical fix — callers await this promise before
  //    enabling the detect button.
  await new Promise((resolve, reject) => {
    video.onloadedmetadata = () => {
      video.play()
        .then(resolve)
        .catch((err) => {
          // AbortError happens when srcObject changes mid-play; safe to ignore
          if (err.name === "AbortError") resolve();
          else reject(err);
        });
    };
    video.onerror = reject;
  });
};

/**
 * detect()
 * Runs a single-frame face-blendshape detection.
 * Returns the expression string, or undefined if no face found.
 */
export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
  if (!landmarkerRef.current || !videoRef.current) return;

  const video = videoRef.current;

  // readyState < 2 means we don't have a current frame yet
  if (video.readyState < 2) {
    console.warn("Video not ready — try again in a moment.");
    setExpression?.("Not ready yet…");
    return;
  }

  // Zero dimensions = no valid frame
  if (video.videoWidth === 0 || video.videoHeight === 0) {
    console.warn("Video dimensions are zero.");
    return;
  }

  const results = landmarkerRef.current.detectForVideo(video, performance.now());

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const score = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score ?? 0;

    const smileLeft  = score("mouthSmileLeft");
    const smileRight = score("mouthSmileRight");
    const jawOpen    = score("jawOpen");
    const browUp     = score("browInnerUp");
    const frownLeft  = score("mouthFrownLeft");
    const frownRight = score("mouthFrownRight");

    let expression = "neutral";

    if (smileLeft > 0.5 && smileRight > 0.5) {
      expression = "happy";
    } else if (jawOpen > 0.2 && browUp > 0.2) {
      expression = "surprised";
    } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
      expression = "sad";
    }

    setExpression(expression);
    return expression;
  } else {
    console.warn("No face detected.");
    setExpression?.("No face found");
  }
};