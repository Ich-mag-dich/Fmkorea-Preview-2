import React, { createRef, useRef } from "react";
import { useState } from "react";
import { Mydiv } from "./test_page_style";
import ReactDOM from "react-dom/client";
import HTML2JSX from "convert-html-to-jsx";
import { useEffect } from "react";
import "../index.css";
import { createElement } from "react";

// import GetPost from "./getPost/getPost";

interface iPost {
  post: any;
  postHref: string;
}
var count = 0;
const PreviewPage = (props: iPost) => {
  const { post, postHref } = props;
  let winY = window.scrollY;

  // const postContent = GetPost(postHref).then(post => {
  //   console.log(post);
  //   setPost(post);
  // });
  // console.log(post);
  let getHtml = document.createElement("html");
  getHtml.innerHTML = post;
  let rd_body = getHtml.querySelector(".xe_content")!;
  rd_body.innerHTML = rd_body.innerHTML.replace(/<\!--.*?-->/g, "");
  let title = getHtml.querySelector("title")!;
  // document.title = `${title.innerText}`;
  const add_history = () => {
    if (count == 0) {
      history.pushState(null, `${title.innerText}`, `${postHref}`);
      count++;
    }
  };
  add_history();
  try {
    var beforeLoad = rd_body.querySelectorAll(".beforeLoad");
    var beforeLoad_num = beforeLoad.length;
    for (let i = 0; i < beforeLoad_num; i++) {
      beforeLoad[i].className = beforeLoad[i].className.replace(
        "beforeLoad",
        ""
      );
    }
  } catch { }
  function getANewPropName(propName: string): string | undefined {
    throw new Error("Function not implemented.");
  }
  // console.log(winY);
  let elemArray: any = Array.from(rd_body.children);
  let div1 = document.createElement("div");
  elemArray.forEach((elem: any) => {
    // console.log(elem.innerHTML);
  });
  // console.log(elemArray);

  rd_body.querySelectorAll("img").forEach((img1: any) => {
    img1.style.maxWidth = "820px";
    img1.style.height = "auto";
    img1.style.margin = "0 auto";
    if (img1.src.indexOf("classes/lazy/img/transparent.gif")) {
      if (img1.dataset.original) {
        img1.src = img1.dataset.original;
      }
    }
  });

  rd_body.querySelectorAll("video").forEach((video1: any) => {
    video1.style.maxWidth = "820px";
    video1.style.height = "auto";
    video1.style.margin = "0 auto";

    if (video1.children[0]) {
      let addedVideo = document.createElement("video");
      let addedSource = document.createElement("source");
      addedSource.src = video1.children[0].src;
      addedSource.type = "video/mp4";
      addedVideo.appendChild(addedSource);
      addedVideo.src = video1.children[0].src;
      addedVideo.style.maxWidth = "820px";
      addedVideo.style.height = "auto";
      addedVideo.style.margin = "0 auto";
      video1.replaceWith(addedVideo);

    }
  });
  // (document.querySelector("#extention-root") as HTMLElement).style.top = `${winY + 80}px`;


  return (
    <div className="preview_article">
      <div
        style={{ width: "900px" }}
        className="mx-auto bg-white rounded-md shadow-sm p-4"
      >
        <div style={{
          textAlign: "left",
          paddingTop: "25px",
          marginLeft: "40px",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "Noto Sans CJK KR, sans-serif",
          letterSpacing: "-1.66px"
        }}>
          <p>{title.innerText.toString()}</p>

        </div>

        <div
          style={{ marginLeft: "40px", marginRight: "40px", paddingBottom: "40px" }}
        >


          {/* <HTML2JSX
            innerHTML={rd_body.innerHTML}
            propErrorHandler={getANewPropName}
          /> */}
          <div dangerouslySetInnerHTML={{ __html: rd_body.innerHTML }} />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
