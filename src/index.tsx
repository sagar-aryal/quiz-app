import ReactDOM from "react-dom/client";
import "./App.styles.ts";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <App />
  </>
);
