import React from "react";
import { render } from "react-dom";
import {NewsProvider} from "./NewProvider";
import App from "./App";

render(
  <NewsProvider>
    <App />
  </NewsProvider>,
  document.getElementById("root")
);
