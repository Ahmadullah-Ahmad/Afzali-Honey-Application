import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "./utils/theme";
import "./tailwind.css";
import ErrorFullback from "./UI/ErrorFullback";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFullback}
      onReset={() => window.location.replace("/")}
    >
      <ThemeProvider value={theme}>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
