
## DevTools Protocol HTTP Endpoints

The DevTools Protocol defines the following HTTP endpoints:

### GET /json/version

Provides information on the host machine's browser and which version of the DevTools Protocol it supports.

**Parameters**

*None*

**Return object**

```json
{
  Browser: "Chrome/37.0.2062.124",
  Protocol-Version: "1.1",
  User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36",
}
```


### GET /json/protocol


Provides the entire protocol API surface serialized as JSON.

**Parameters**

*None*

**Return object**
JSON object which represents the available API surface for current version of the protocol.



### GET /json, GET /json/list

Provides a candidate list of page targets for debugging.

**Parameters**

*None*

**Return object**

```json
[ {
  id: "961C1EB7-A0DA-2F42-F6D4-76B453E70DB5",
  title: "Yahoo",
  type: "page",
  url: "https://www.yahoo.com/",
  webSocketDebuggerUrl: "ws://localhost:9222/devtools/page/961C1EB7-A0DA-2F42-F6D4-76B453E70DB5"
} ]
```

For valid targets the response is 200, `"Target activated"`.


### POST /json/close/{targetId}

Closes down the target process (e.g., in Microsoft Edge, closes the page tab.)

**Parameters**

Target ID

**Return object**