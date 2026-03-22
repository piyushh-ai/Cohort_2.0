// ─────────────────────────────────────────────────────────
// useAuth.js mein sirf login function update karo
// Baki sab same rahega
// ─────────────────────────────────────────────────────────

const login = async (formData) => {
  setLoading(true);
  setError(null);
  try {
    const response = await loginAPI(formData);
    setUser(response.user);

    // Extension ko token bhejo (agar installed hai)
    if (response.token) {
      syncTokenToExtension(response.token);
    }

    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Invalid email or password");
  } finally {
    setLoading(false);
  }
};

// ─────────────────────────────────────────────────────────
// Yeh helper function useAuth.js mein add karo (hook ke bahar)
// ─────────────────────────────────────────────────────────

function syncTokenToExtension(token) {
  try {
    const extensionId = import.meta.env.VITE_EXTENSION_ID;
    if (extensionId && typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage(extensionId, { type: "SAVE_TOKEN", token });
    }
  } catch {
    // Extension nahi hai — koi baat nahi
  }
}

// ─────────────────────────────────────────────────────────
// App.jsx ya main layout mein yeh useEffect add karo
// Google OAuth ke baad token URL mein aata hai — extension ko bhejo
// ─────────────────────────────────────────────────────────

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const extToken = params.get("ext_token");
  if (extToken) {
    syncTokenToExtension(extToken);
    // URL se token param hatao
    params.delete("ext_token");
    window.history.replaceState({}, "", window.location.pathname);
  }
}, []);

// ─────────────────────────────────────────────────────────
// .env.local mein add karo:
// VITE_EXTENSION_ID=yahan_apna_extension_id_daalo
//
// Extension ID kahan milega:
// chrome://extensions/ → apna extension → ID copy karo
// ─────────────────────────────────────────────────────────
