'use strict';
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Set up event listening for browser.
 *
 * Determine all of the browser events and set up global listeners for them.
 * If browser triggers event search for the lazy load URL and `import()` it.
 *
 * @param document - Document to use for setting up global listeners, and to
 *     determine all of the browser supported events.
 */
(document => {
  // When cleared it means that `on:q-init` has been run
  let readystatechange = 'readystatechange';
  /**
   * Event handler responsible for processing browser events.
   *
   * If browser emits an event, the `eventProcessor` walks the DOM tree
   * looking for corresponding `(${event.type})`. If found the event's URL
   * is parsed and `import()`ed.
   *
   * @param event - Browser event.
   */
  const processEvent = async event => {
    const eventName = 'on:' + event.type;
    let element = event.target;
    while (element && element.getAttribute) {
      let eventUrl = element.getAttribute(eventName);
      if (eventUrl) {
        eventUrl = eventUrl.replace(/^(\w+):/, (_, protocol) => {
          return window.Q.protocol[protocol];
        });
        const url = new URL(eventUrl, document.baseURI);
        const importPath = url.pathname + '.js';
        const module = await import(importPath);
        // 1 - optional `#` at the start.
        // 2 - capture group `$1` containing the export name, stopping at the first `?`.
        // 3 - the rest from the first `?` to the end.
        // The hash string is replaced by the captured group that contains only the export name.
        // This is the same as in the `qExport()` function.
        //                                   1112222222333
        const exportName = url.hash.replace(/^#?([^?]*).*$/, '$1') || 'default';
        const handler = module[exportName];
        if (!handler)
          throw new Error(
            `QWIKLOADER-ERROR: import '${importPath}' does not export '${exportName}'.`
          );
        handler(element, event, url);
      }
      element = element.parentElement;
    }
  };
  const addEventListener = eventName => {
    document.addEventListener(eventName, processEvent, { capture: true });
  };
  // Set up listeners. Start with `document` and walk up the prototype
  // inheritance on look for `on*` properties. Assume that `on*` property
  // corresponds to an event browser can emit.
  const scriptTag = document.querySelector('script[events]');
  if (scriptTag) {
    const events = scriptTag.getAttribute('events') || '';
    events.split(/[\s,;]+/).forEach(addEventListener);
  } else {
    for (const key in document) {
      if (key.indexOf('on') == 0) {
        const eventName = key.substring(2);
        // For each `on*` property, set up a listener.
        addEventListener(eventName);
      }
    }
  }
  const qInit = `q-init`;
  addEventListener(qInit);
  const processReadyStateChange = () => {
    const readyState = document.readyState;
    if (
      readystatechange &&
      (readyState == 'interactive' || readyState == 'complete')
    ) {
      readystatechange = null;
      document
        .querySelectorAll('[on\\:\\' + qInit + ']')
        .forEach(target => target.dispatchEvent(new CustomEvent(qInit)));
    }
  };
  document.addEventListener(readystatechange, processReadyStateChange);
  processReadyStateChange();
})(
  // Invoke qwik-loader.
  document
);
