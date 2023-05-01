import React from "react";
import { useState } from "react";
import { Mydiv } from "./test_page_style";
import ReactDOM from "react-dom/client";
import HTML2JSX from "convert-html-to-jsx";
import { useEffect } from "react";

// import GetPost from "./getPost/getPost";

interface iPost {
  post: any;
  postHref: string;
}
var count = 0;
const PreviewPage = (props: iPost) => {
  const { post, postHref } = props;

  // const postContent = GetPost(postHref).then(post => {
  //   console.log(post);
  //   setPost(post);
  // });
  // console.log(post);
  let getHtml = document.createElement("html");
  getHtml.innerHTML = post;
  let rd_vody = getHtml.querySelector(".xe_content")!;
  let title = getHtml.querySelector("title")!;
  document.title = `${title.innerText}`;
  const add_history = () => {
    if (count == 0) {
      history.pushState({ foo: "bar" }, `${title.innerText}`, `${postHref}`);
      count++;
    }
  };
  add_history();
  try {
    var beforeLoad = rd_vody.querySelectorAll(".beforeLoad");
    var beforeLoad_num = beforeLoad.length;
    for (let i = 0; i < beforeLoad_num; i++) {
      beforeLoad[i].className = beforeLoad[i].className.replace(
        "beforeLoad",
        ""
      );
    }
  } catch {}
  function getANewPropName(propName: string): string | undefined {
    throw new Error("Function not implemented.");
  }
  let winY = window.scrollY;
  console.log(winY);
  return (
    <Mydiv style={{ top: `${winY - 80}px` }}>
      <div className="flex flex-col gap-4 p-4 shadow-sm bg-gradient-to-r from-purple-500 to-pink-500 w-96 rounded-md">
        <HTML2JSX
          innerHTML={rd_vody.innerHTML}
          propErrorHandler={getANewPropName}
        />
      </div>
    </Mydiv>
  );
};

export default PreviewPage;
