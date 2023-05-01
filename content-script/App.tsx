import { useEffect, useState } from "react";
import React from "react";
// import "./index.css";
import PreviewPage from "./modules/preview_page";
import styled from "styled-components";
import "./index.css";
import axios from "axios";

const classNames = ["hotdeal_var8", "notice_pop0", "title"];
var checkState = false;
var postHref = "";
var exTitle = "";

const App = () => {
  const [visl, setVisual] = useState<string>();
  // const [postHref, setPostHref] = useState<string>("");
  const [post, setPost] = useState<any>();
  if (visl === undefined) {
    setVisual("hidden");
  }
  const chgVisl = () => {
    console.log(`${visl} ${checkState}`);
    if (visl === "hidden" && checkState == true) {
      console.log("chgVisl");
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
        console.log("handleClick");
        exTitle = document.title;
        console.log(exTitle);
        checkState = true;
        if (target.href !== undefined) {
          postHref = target.href;
        } else if (target.parentElement?.href !== undefined) {
          postHref = target.parentElement.href;
        } else if (target.parentElement?.parentElement?.href !== undefined) {
          postHref = target.parentElement.parentElement.href;
        }
        chgVisl();
        setPost(await requestPost(postHref).then(res => res));
      }
    } catch {
      exit();
    }
  };
  const GetPost = async (postHref: string) => {
    return await axios.get(postHref).then(res => {
      return res.data;
    });

    // .then(res => {
    //   res.data;
    //   throw Error(res.data);
    // })
    // .catch(err => {
    //   console.log(err);
    //   return err;
    // });
  };
  const requestPost = async (posthref: string) => {
    try {
      return await fetch(posthref).then(async res => {
        return await res.text();
      });
    } catch {
      exit();
    }
    // .then(html => {
    //   let html_dom = new DOMParser().parseFromString(html, "text/html");
    //   return html_dom;
    // })
  };
  const exit = () => {
    checkState = false;
    chgVisl;
    setPost(undefined);
    console.log(exTitle);
    document.querySelector("title")!.innerText = exTitle;
    try {
      document.querySelector(".rounded-md")!.remove();
    } catch {
      setPost(undefined);
    }
  };

  window.onkeydown = (event: { keyCode: number }) => {
    if (event.keyCode == 27) {
      // esc키 눌렀을때
      if (checkState == true) {
        checkState = false;
        // history.back();
        history.back();
        exit();
      }
      checkState = false;
    }
  };
  useEffect(() => {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      if (checkState == true) {
        console.log("");
      } else {
        if (e.target) {
          const target = e.target as HTMLElement;
          console.log(target);
          if (
            classNames.some(className => target.classList.contains(className))
          ) {
            console.log("contextmenu 1");
            handleClick(target);
            // chgVisl();
          } else if (target.parentElement) {
            const parent = target.parentElement;
            if (
              classNames.some(className => parent.classList.contains(className))
            ) {
              console.log("contextmenu 2");
              handleClick(target);
              // chgVisl();
            } else if (target.parentElement?.parentElement) {
              const parent = target.parentElement.parentElement;
              if (
                classNames.some(className =>
                  parent.classList.contains(className)
                )
              ) {
                console.log("contextmenu 3");
                // chgVisl();
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
      if (checkState == true) {
        console.log("click", target);
      }
    });
  }, []);

  return (
    <div className={visl}>
      {postHref !== "" && visl === "block" && post ? (
        <PreviewPage post={post} postHref={postHref}></PreviewPage>
      ) : (
        <div>qweqwe</div>
      )}
    </div>
  );
};
export default App;
