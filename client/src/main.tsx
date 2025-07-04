import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  console.log("Initializing React app...");
  createRoot(rootElement).render(<App />);
  console.log("React app initialized successfully");
} catch (error) {
  console.error("Failed to initialize React app:", error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1>Error Loading Application</h1>
      <p>There was an error loading the portfolio website.</p>
      <p>Error: ${error}</p>
      <p>Please check the browser console for more details.</p>
    </div>
  `;
}
