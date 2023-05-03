# Fmkorea Extension for Chrome and Firefox

## Description

This is a browser extension for Chrome and Firefox that adds a button to the Fmkorea website to open the current thread in the Fmkorea app.

## Features

- Open the current thread in the Fmkorea app

### Requirements

- Node.js
- pnpm

### Installation

`pnpm install` installs the dependencies.

### Development

`pnpm dev:watch` builds the extension for development and watches for changes.

### Firefox

`pnpm build` builds the extension by default for Firefox.

The generated files are in `dist/`.

To load the extension in Firefox go to `about:debugging#/runtime/this-firefox` or

Firefox > Preferences > Extensions & Themes > Debug Add-ons > Load Temporary Add-on...

Here locate the `dist/` directory and open `manifest.json`

### Chrome

`pnpm build:chrome` builds the extensions for Google Chrome.

The generated files are in `dist/`.
To load the extensions in Google Chrome go to `chrome://extensions/` and click `Load unpacked`. Locate the dist directory and select `manifest.json`.

### Files

- content-script - UI files
- background.ts - Background script/Service worker
- index.html - popup UI
