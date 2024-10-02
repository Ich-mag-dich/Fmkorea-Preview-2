# Fmkorea Extension for Chrome

## [`Chrome Extension Link`](https://chromewebstore.google.com/detail/fmkorea-preview-%EC%97%90%ED%8E%A8%EC%BD%94%EB%A6%AC%EC%95%84-%EA%B2%8C%EC%8B%9C%EA%B8%80/bboddojafohhhnbdifnlmmmbfngjldhf?hl=ko&authuser=0)

## Description

게시글의 제목을 우클릭해서 페이지 이동 없이 게시글을 미리보기 합니다.

## Features

- 우클릭으로 게시글을 미리 봅니다.
- 게시글을 미리보기하는 동안에 글과 댓글에 대해 추천 및 반대를 할 수 있는 기능을 제공합니다.

### Requirements

- Node.js
- pnpm

### Installation

`pnpm install` installs the dependencies.

### Development

`pnpm dev:watch` builds the extension for development and watches for changes.

### Chrome

`pnpm build` builds the extensions for Google Chrome.

The generated files are in `dist/`.
To load the extensions in Google Chrome go to `chrome://extensions/` and click `Load unpacked`. Locate the dist directory and select `manifest.json`.
