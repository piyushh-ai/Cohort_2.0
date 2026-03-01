import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PostContextProvider } from "./feature/posts/Post.context.jsx";
import { AuthProvider } from "./feature/auth/Auth.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </AuthProvider>
  </StrictMode>,
);
