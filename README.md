# DevTools Protocol (Archived)

This repository is for resources and discussion around aligning the developer tools protocol used by various browsers, JavaScript engines and debugging tools.

**⚠️ This repository is archived and no longer maintained.**

For the latest updates, ongoing development, and discussions, please visit the [w3c/webdriver-bidi](https://github.com/w3c/webdriver-bidi/) repository.

## Goals

- Help empower web developers to build great applications by supporting an ecosystem of diagnostics tools which work well across a variety of targets.
- Reduce the need for target-specific "devtools protocol adapters" in order to simplify the experience for tool users and tool developers.
- Provide a vendor-neutral forum to facilitate collaboration and consensus building between different protocol implementations and interested clients.
- Reduce the engineering investment necessary to build compatible protocol implementations through sharing of test cases.

[Contributions](CONTRIBUTING.md) from the community are welcome!

## What is here in this repo

Not much yet, just a [few issues](https://github.com/WICG/devtools-protocol/issues) tracking work we'd like to do and links to a few resources below.

## Implementations
Engines and browsers that all have a [similar](http://compatibility.remotedebug.org/) debugging protocol built-in:
- [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/), also used by most other chromium-based browsers
- [WebKit / Safari](https://github.com/WebKit/webkit/tree/master/Source/JavaScriptCore/inspector/protocol)
- [Node.js](https://chromedevtools.github.io/devtools-protocol/v8/)
- Firefox - [in development](https://groups.google.com/forum/#!msg/mozilla.dev.platform/4-4A8W-nP5g/Y9C9UkWTAAAJ)
- [Edge DevTools Protocol](https://docs.microsoft.com/en-us/microsoft-edge/devtools-protocol/)

Adapters that expose a common protocol:
- [Microsoft Edge Diagnostics Adapter](https://github.com/Microsoft/edge-diagnostics-adapter) - to be replaced with native support (above).
- [RemoteDebug iOS WebKit Adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter)
- See also [RemoteDebug list of adapters](https://remotedebug.org/adaptors/)

## Clients
There are a variety of tools which target some or all of the above implementations of the protocol.  Here are a few resources:
- [Chrome DevTools protocol clients](https://github.com/ChromeDevTools/awesome-chrome-devtools#chrome-devtools-protocol)
- [VS Code debuggers](https://github.com/Microsoft/vscode-chrome-debug-core/blob/master/README.md)
- [RemoteDebug integrations](https://remotedebug.org/integrations/)
- [sonarwhal](https://sonarwhal.com/)

## Key Use Cases

- Unified JavaScript debugging from a single IDE to multiple engines, eg.
  - Chrome DevTools stepping between front-end JavaScript running in Chrome and back-end JavaScript running in Node.js
  - VS Code IDE debugging pages running in Safari, Edge, Firefox or Chrome
  
## Out of scope

- 100% compatibility across protocol implementations
  - It is sometimes necessary, or even just convenient, for engine implementation details to leak out through the behavior of the devtools protocol (eg. performance visualizations are often very coupled to engine implementation details such as GPU "layers").
  - The goal here is to align behavior and APIs where it is practical without constraining engines.  
- Producing a formal protocol specification or standard
  - A formal specification for a subset of the protocols used in practice may someday be in-scope.
  - But for now our focus is just in facilitating implementations and reducing engineering effort within the community where practical.
- APIs for automated testing
  - Test cases are fundamentally different clients than developer tools in a few important ways:
   - We should expect there to be orders of magnitude more test cases in the world than tools.  I.e. they're much harder to update so API stability is critical.
   - It's important for the openness of the web that any browser can, in principle, run test cases originally designed for other browsers.  I.e. a full standard and conformance test suite is critical.
  - Therefore this community recommends the [WebDriver API](https://w3c.github.io/webdriver/webdriver-spec.html) and tools built upon it (eg. [Selenium](http://www.seleniumhq.org/)) as the right tool for automated testing.
