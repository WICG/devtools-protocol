# DevTools Protocol Initialization
An implementation of a DevTools Protocol server must provide a mechanism for starting the server.

## Command line
The easiest mechanism for starting the server is via the command line via an object mapped to the browser executable and parameters which control how the server starts. At a minimu, the following parameters should be supported:
* **DevTools server flag**: a flag which indicates to the browser to start the DevTools Protocol server
* **DevTools server port**: the port on which the server will listen for HTTP and WebSocket requests

### Examples

#### Chrome
The Chrome DevTools Protocol server can be started via the following command line API:

```chrome.exe --remote-debugging-port=<port>```

#### Edge
The Edge DevTools Protocol server can be started via the following command line API:

```MicrosoftEdge --devtools-server-port <port> <URL>```

