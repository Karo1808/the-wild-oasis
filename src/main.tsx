import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import type {} from "styled-components/cssprop";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      onReset={() => window.location.replace("/")}
      // eslint-disable-next-line
      // @ts-ignore
      FallbackComponent={<ErrorFallback />}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
