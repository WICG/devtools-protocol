# Transport mechanisms

This document describes the protocol and transport mechanisms used by APIs exposed via the DevTools Protocol.

## Discovery APIs
Discovery APIs are used to reflect on metadata about the DevTools Protocol and surface available machine targets to be debugged and/or diagnosed.

### Protocol
Discovery APIs use [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) for sending and receiving data.

### Transport
REST APIs use HTTP as defined by the following:
* [RFC7230: HTTP/1.1, part 1: Message Syntax and Routing](http://tools.ietf.org/html/rfc7230)
* [RFC7231: HTTP/1.1, part 2: Semantics and Content](http://tools.ietf.org/html/rfc7231)
* [RFC7232: HTTP/1.1, part 4: Conditional Requests](http://tools.ietf.org/html/rfc7232)
* [RFC7233: HTTP/1.1, part 5: Range Requests](http://tools.ietf.org/html/rfc7233)
* [RFC7234: HTTP/1.1, part 6: Caching](http://tools.ietf.org/html/rfc7234)
* [RFC7235: HTTP/1.1, part 7: Authentication](http://tools.ietf.org/html/rfc7235)

## Diagnostics & Debugging APIs
Diagnostics & debugging APIs are used to inspect, subscribe to, and manipulate a target. The specific target is surfaced via the discovery APIs above, then the ID for the target is used to issue diagnostics & debugging commands.

A DevTools Protocol server is expected to expose an HTTP server.

### Protocol
The used protocol is the well known [JSON-RPC 2.0 Specification](http://www.jsonrpc.org/specification), which is  a stateless, light-weight remote procedure call (RPC) protocol. JSON-RPC is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. 

### Transport
The DevTools Protocol is using WebSockets as defined by [RFC 6455 - The WebSocket Protocol](https://tools.ietf.org/html/rfc6455) as its main transport mechanism. 

A DevTools Protocol server is expected to expose a WebSocket server.
