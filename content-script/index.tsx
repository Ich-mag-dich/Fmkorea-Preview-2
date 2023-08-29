import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Mydiv } from "./modules/test_page_style";

const pluginTagId = "extension-root";
const existingInstance = document.getElementById("extension-root");
if (existingInstance) {
  console.log("existing instance found, removing");
  existingInstance.remove();
}

const frame = document.createElement("div");
// var winY = window.scrollY;
frame.style.width = "100VW"
// frame.style.marginLeft = "calc(-50vw + 50%);" // center the frame
// frame.style.maxWidth = "1200px";
// frame.style.top = `${winY - 80}px`;
frame.style.position = "absolute";
// frame.style.marginLeft = "21%";
// frame.style.marginRight = "21%";
frame.style.marginBottom = "100px";
frame.id = "extension-root";
frame.style.zIndex = "101";
frame.style.visibility = "visible";
frame.style.display = "block";
frame.style.opacity = "0";
frame.style.overflow = "scroll";
frame.style.opacity = "1";
frame.style.height = `1200px`;
frame.style.visibility = "hidden";
frame.style.top = "0px";
// frame.onclick = (e) => {
//   console.log(e.target);
// }
// frame.style.boxShadow = "rgba(109, 109, 109, 0.5) 0 0 0 9999px";

// Make sure the element that you want to mount the app to has loaded. You can
// also use `append` or insert the app using another method:
// https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
//
// Also control when the content script is injected from the manifest.json:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
const body123 = document.querySelector("#header");
if (body123) {
  body123.append(frame);
}

ReactDOM.createRoot(frame).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
