import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Declare window.RenderWidget globally
declare global {
  interface Window {
    RenderWidget: (elementId: string, options?: { theme?: { primaryColor?: string; secondaryColor?: string } }) => void;
  }
}

window.RenderWidget = (elementId, options = {}) => {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Element with ID "${elementId}" not found`);
    return;
  }

  createRoot(container).render(
    <BrowserRouter>
      <App theme={options.theme} />
    </BrowserRouter>
  );
};
