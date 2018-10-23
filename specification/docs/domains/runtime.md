---
        title: Runtime Domain - DevTools Protocol
        description: Reference for the Runtime Domain. Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects. Evaluation results are returned as mirror object that expose object type, string representation and unique identifier that can be used for further object reference. Original objects are maintained in memory unless they are either explicitly released.
    ---

# Runtime
Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects. Evaluation results are returned as mirror object that expose object type, string representation and unique identifier that can be used for further object reference. Original objects are maintained in memory unless they are either explicitly released. 
| | |
|-|-|
| [**Types**](#types) | [ScriptId](#scriptid), [CallArgument](#callargument), [ExecutionContextId](#executioncontextid), [RemoteObject](#remoteobject) |
## Methods 

## Events 

## Types 

### <a name="scriptid"></a> ScriptId `string`
Unique script identifier.

</p>
---


### <a name="callargument"></a> CallArgument `object`
Represents function call argument. Either remote object id <code>objectId</code>, primitive <code>value</code>, unserializable primitive value or neither of (for undefined) them should be specified.

<table>
    <thead>
        <tr>
            <th>Properties</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
<tr>
            <td>value <br/> <i>optional</i></td>
            <td><code class="flyout">any</code></td>
            <td>Primitive value or serializable javascript object.</td>
        </tr>
<tr>
            <td>unserializableValue <br/> <i>optional</i></td>
            <td><a href="#unserializablevalue"><code class="flyout">UnserializableValue</code></a></td>
            <td>Primitive value which can not be JSON-stringified.</td>
        </tr>
<tr>
            <td>objectId <br/> <i>optional</i></td>
            <td><a href="#remoteobjectid"><code class="flyout">RemoteObjectId</code></a></td>
            <td>Remote object handle.</td>
        </tr>
    </tbody>
</table>
</p>
---


### <a name="executioncontextid"></a> ExecutionContextId `integer`
Id of an execution context.

</p>
---


### <a name="remoteobject"></a> RemoteObject `object`
Mirror object referencing original JavaScript object.

<table>
    <thead>
        <tr>
            <th>Properties</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
<tr>
            <td>type</td>
            <td><code class="flyout">string</code> <br/> <i>Allowed values: object, function, undefined, string, number, boolean, symbol</i></td>
            <td>Object type.</td>
        </tr>
<tr>
            <td>subtype <br/> <i>optional</i></td>
            <td><code class="flyout">string</code> <br/> <i>Allowed values: null, error, promise, node</i></td>
            <td>Object subtype hint. Specified for <code>object</code> type values only.</td>
        </tr>
<tr>
            <td>className <br/> <i>optional</i></td>
            <td><code class="flyout">string</code></td>
            <td>Object class (constructor) name. Specified for <code>object</code> type values only.</td>
        </tr>
<tr>
            <td>value <br/> <i>optional</i></td>
            <td><code class="flyout">any</code></td>
            <td>Remote object value in case of primitive values or JSON values (if it was requested).</td>
        </tr>
<tr>
            <td>unserializableValue <br/> <i>optional</i></td>
            <td><a href="#unserializablevalue"><code class="flyout">UnserializableValue</code></a></td>
            <td>Primitive value which can not be JSON-stringified does not have <code>value</code>, but gets this property.</td>
        </tr>
<tr>
            <td>description <br/> <i>optional</i></td>
            <td><code class="flyout">string</code></td>
            <td>String representation of the object.</td>
        </tr>
<tr>
            <td>objectId <br/> <i>optional</i></td>
            <td><a href="#remoteobjectid"><code class="flyout">RemoteObjectId</code></a></td>
            <td>Unique object identifier (for non-primitive values).</td>
        </tr>
    </tbody>
</table>
</p>
---

## Dependencies 
