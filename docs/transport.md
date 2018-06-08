# Transport mechanisms

This documents describes the used protocol and transport mechanisms for the DevTools Protocol.

## Protocol
The used protocol is the well known [JSON-RPC 2.0 Specification](http://www.jsonrpc.org/specification), which is  a stateless, light-weight remote procedure call (RPC) protocol. JSON-RPC is transport agnostic in that the concepts can be used within the same process, over sockets, over http, or in many various message passing environments. 

## Transport
The DevTools Protocol is using WebSockets as defined by [RFC 6455 - The WebSocket Protocol](https://tools.ietf.org/html/rfc6455) as it's main transport mechanism. 

A DevTools Protocol server is expected to expose a WebSocket server.



