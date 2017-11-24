# devtools-protocol

This repository is for resources and discussion around aligning the developer tools wire protocol used by various browsers, JavaScript egines and debugging tools.

## Goals

- Help empower web developers to build great applications by supporting an ecosystem of diagnostics tools which work well across a variety of targets.
- Reduce the need for target-specific "devtools protocol adapters" in order to simplify the experience for tool users and tool developers.
- Provide a vendor-neutral forum to facilitate consensus building between different protocol implementations.

[Contributions](CONTRIBUTING.md) from the community are welcome!

## Implementations
Engines and browsers that all have a similar debugging protocol built-in:
- [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/), also used by most other chromium-based browsers
- [WebKit / Safari](https://github.com/WebKit/webkit/tree/master/Source/JavaScriptCore/inspector/protocol)
- Firefox - [in development](https://groups.google.com/forum/#!msg/mozilla.dev.platform/4-4A8W-nP5g/Y9C9UkWTAAAJ)
- [Node.js](https://chromedevtools.github.io/devtools-protocol/v8/)

Adapters that expose a common protocol:
- [Microsoft Edge Diagnostics Adapter](https://github.com/Microsoft/edge-diagnostics-adapter)
- [RemoteDebug iOS WebKit Adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter)

See also [RemoteDebug Protocol Compatibility Tables](http://compatibility.remotedebug.org/)

## Clients
There are a wide variety of tools which target some or all of the above implementation of the protocol.  Here are a few resources:
- [Chrome DevTools protocol clients](https://github.com/ChromeDevTools/awesome-chrome-devtools#chrome-devtools-protocol)
- [VS Code debuggers](https://github.com/Microsoft/vscode-chrome-debug-core/blob/master/README.md)

## Key Use Cases
- Unified JavaScript debugging from a single IDE to multiple engines, i.e.
  - Chrome DevTools stepping between front-end JavaScript running in Chrome and back-end JavaScript running in Node.js
  - VS Code IDE debugging pages running in Safari, Edge, Firefox or Chrome
  
## Out of scope

- 100% compatibility across protocol implementations
  - It is sometimes necessary or even just convenient for engine implementation details to leak out through the behavior of the devtools protocol (eg. performance visualizations are often very coupled to engine implementation details such as GPU "layers").
  - The goal here is to align behavior and APIs where it is practical without constraining engines.  
- Producing a formal protocol specification.
