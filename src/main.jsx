import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <ThemeContextProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>


      
      </ThemeContextProvider>
    </Provider>
  </>
);
