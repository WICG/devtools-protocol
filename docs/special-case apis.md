# DevTools Protocol Special-case APIs
The stated goal of the DevTools Protocol WICG is to encourage alignment of APIs. We say alignment as we know there will be differences in the API surfaces each browser exposes.

## Experimental APIs
Browser vendors may at times want to implement APIs which are either not ready for production consumption or have a high likelihood of changing. For this, the `experimental` property in `protocol.json` should be used to indicate any domain, method, event, or type which is not finalized.

## Vendor-specific APIs
Browser vendors have different underlying architectures and as a result may need to expose properties which are specific to that vendor. If this is needed, vendors should prefix their APIs with a consistent string (e.g. `ms` or `mz`).