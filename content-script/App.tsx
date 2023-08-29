import { useEffect, useState } from "react";
import React from "react";
import PreviewPage from "./modules/preview_page";
import styled from "styled-components";
import "./index.css";
import axios from "axios";

const classNames = ["hotdeal_var8", "notice_pop0", "title"];
var checkState = false;
var postHref = "";
var exTitle = "";
const throwError = () => {
  throw new Error("Something Broken");
};

var count = 0;

const add_history = (title1: any, postHref: any, title2: any) => {
  if (count === 0) {
    history.pushState(null, `${title1.innerText}`, `${postHref}`);
    exTitle = document.title;
    document.title = title2;
    count++;
  }
};

const App = () => {
  const [error, setError] = useState(false);
  const [visl, setVisual] = useState<string>();
  const throwErrorInRender = () => setError(true);
  const [post, setPost] = useState<any>();
  if (visl === undefined) {
    setVisual("hidden");
  }

  const chgVisl = () => {
    if (visl === "hidden" && checkState == true) {
      setVisual("block");
    } else if (visl === "block" && checkState == false) {
      setVisual("hidden");
    } else if (visl === undefined) {
      setVisual("block");
    }
  };

  const handleClick = async (target: any) => {
    try {
      if (checkState == false) {
        const extension_root = document.querySelector("#extension-root") as HTMLElement;
        extension_root.style.top = `${window.scrollY - 80}px`;
        document.querySelector("body")?.style.setProperty("overflow", "hidden");
        extension_root.style.visibility = "visible";
        extension_root.style.backgroundColor = "rgba(109, 109, 109, 0.5)";
        // console.log(target.innerText)
        checkState = true;
        if (target.href !== undefined) {
          postHref = target.href;
        } else if (target.children[0]?.href !== undefined) {
          postHref = target.children[0].href;
        } else if (target.parentElement?.href !== undefined) {
          postHref = target.parentElement.href;
        }
        chgVisl();
        add_history(target.innerText, postHref, target.innerText);
        setPost(await requestPost(postHref).then(res => res));

      }
    } catch {
    }
  };

  const requestPost = async (posthref: string) => {
    try {
      return await fetch(posthref).then(async res => {
        return await res.text();
      });
    } catch {
    }
  };

  const exit = () => {
    // console.log(checkState)
    if (checkState == false) {
      return;
    }
    if (count !== 1) {
      return;
    }

    checkState = false;
    chgVisl;
    setPost(undefined);
    try {
      document.querySelector(".rounded-md")!.remove();
    } catch {
      setPost(undefined);
    }
    document.querySelector("body")?.style.setProperty("overflow", "hidden scroll");
    const extension_root = document.querySelector("#extension-root") as HTMLElement;
    extension_root.style.backgroundColor = "rgba(109, 109, 109, 0.0)";
    extension_root.style.visibility = "hidden";
    extension_root.style.top = `0px`;
    document.title = exTitle;
    count = 0;
    history.back();
  };

  window.onkeydown = (event: { keyCode: number }) => {
    if (event.keyCode == 27) {
      // esc키 눌렀을때
      if (checkState == true) {
        exit();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", function (e) {
      if (checkState == true) {
      } else {
        if (e.target) {
          const target = e.target as HTMLElement;
          // console.log(target);
          if (
            classNames.some(className => target.classList.contains(className))
          ) {
            e.preventDefault();
            handleClick(target);
          } else if (target.parentElement) {
            const parent = target.parentElement;
            if (
              classNames.some(className => parent.classList.contains(className))
            ) {
              e.preventDefault();
              handleClick(target);
            } else if (target.parentElement?.parentElement) {
              const parent = target.parentElement.parentElement;
              if (
                classNames.some(className =>
                  parent.classList.contains(className)
                )
              ) {
                e.preventDefault();
                handleClick(target);
              } else {
                checkState = false;
              }
            }
          }
        }
      }
    });

    document.addEventListener("click", function (e) {
      const target = e.target as HTMLElement;
      if (checkState === true) {
        if (target.id === "extension-root" || target.id === "frame") {
          exit();
        }
      }
    });
  }, []);


  useEffect(() => {
    if (error) throwError();
  }, [error]);

  try {
    return (
      <div className={visl} id={"frame"} style={{ marginBottom: "500px" }}>
        {postHref !== "" && visl === "block" && post ? (
          <PreviewPage post={post} postHref={postHref} ></PreviewPage>
        ) : (
          <div></div>
        )}
      </div>
    );
  } catch {
    return <div className={visl}></div>;
  }
};

export default App;
