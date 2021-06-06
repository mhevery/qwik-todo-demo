/**
 * Returns true if the `node` is `Element` and of the right `tagName`.
 *
 * @param node
 */
function isDomElementWithTagName(node, tagName) {
  return (
    isHtmlElement(node) && node.tagName.toLowerCase() == tagName.toLowerCase()
  );
}
function isHtmlElement(node) {
  return node ? node.nodeType === 1 /* ELEMENT_NODE */ : false;
}
function isTextNode(node) {
  return node ? node.nodeType === 3 /* TEXT_NODE */ : false;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function stringifyDebug(value) {
  if (value == null) return String(value);
  if (typeof value === 'function') return value.name;
  if (isHtmlElement(value)) return stringifyElement(value);
  if (value instanceof URL) return String(value);
  if (typeof value === 'object')
    return JSON.stringify(value, function(key, value) {
      if (isHtmlElement(value)) return stringifyElement(value);
      return value;
    });
  return String(value);
}
function stringifyElement(element) {
  let html = '<' + element.tagName.toLowerCase();
  const attributes = element.attributes;
  const names = [];
  for (let i = 0; i < attributes.length; i++) {
    names.push(attributes[i].name);
  }
  names.sort();
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    let value = element.getAttribute(name);
    if (
      value === null || value === void 0 ? void 0 : value.startsWith('file:/')
    ) {
      value = value.replace(
        /(file:\/\/).*(\/.*)$/,
        (all, protocol, file) => protocol + '...' + file
      );
    }
    html +=
      ' ' +
      name +
      (value == null || value == ''
        ? ''
        : "='" + value.replace("'", '&apos;') + "'");
  }
  return html + '>';
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function qError(code, ...args) {
  const text = codeToText(code);
  const parts = text.split('{}');
  const error = parts
    .map((value, index) => {
      return (
        value + (index === parts.length - 1 ? '' : stringifyDebug(args[index]))
      );
    })
    .join('');
  debugger; // eslint-disable-line no-debugger
  return new Error(error);
}
function codeToText(code) {
  const area = {
    0: 'ERROR',
    1: 'QRL-ERROR',
    2: 'INJECTOR-ERROR',
    3: 'SERVICE-ERROR',
    4: 'COMPONENT-ERROR',
    5: 'PROVIDER-ERROR',
    6: 'RENDER-ERROR',
    7: 'EVENT-ERROR'
  }[Math.floor(code / 100)];
  const text = {
    [1 /* Core_qConfigNotFound_path */]: "QConfig not found in path '{}'.",
    [2 /* Core_unrecognizedStack_frame */]: "Unrecognized stack format '{}'",
    [3 /* Core_noAttribute_atr1_element */]: "Could not find entity state '{}' at '{}' or any of it's parents.",
    [4 /* Core_noAttribute_atr1_attr2_element */]: "Could not find entity state '{}' ( or entity provider '{}') at '{}' or any of it's parents.",
    [5 /* Core_missingProperty_name_props */]: "Missing property '{}' in props '{}'.",
    [6 /* Core_missingExport_name_url_props */]: "Missing export '{}' from '{}'. Exported symbols are: {}",
    //////////////
    [100 /* QRL_expectFunction_url_actual */]: "QRL '${}' should point to function, was '{}'.",
    //////////////
    [200 /* Injector_noHost_element */]: "Can't find host element above '{}'.",
    [201 /* Injector_expectedSpecificInjector_expected_actual */]: "Provider is expecting '{}' but got '{}'.",
    [202 /* Injector_notElement_arg */]: "Expected 'Element' was '{}'.",
    [203 /* Injector_wrongMethodThis_expected_actual */]: "Expected injection 'this' to be of type '{}', but was of type '{}'.",
    [204 /* Injector_missingSerializedState_entityKey_element */]: "Entity key '{}' is found on '{}' but does not contain state. Was 'serializeState()' not run during dehydration?",
    [206 /* Injector_notFound_element */]: "No injector can be found starting at '{}'.",
    [207 /* Injector_eventInjectorNotSerializable */]: 'EventInjector does not support serialization.',
    //////////////
    [300 /* Entity_notValidKey_key */]:
      "Data key '{}' is not a valid key.\n" +
      '  - Data key can only contain characters (preferably lowercase) or number\n' +
      '  - Data key is prefixed with entity name\n' +
      "  - Data key is made up from parts that are separated with ':'.",
    [301 /* Entity_keyAlreadyExists_key */]: "A entity with key '{}' already exists.",
    [303 /* Entity_invalidAttribute_name */]:
      "'{}' is not a valid attribute. " +
      "Attributes can only contain 'a-z' (lowercase), '0-9', '-' and '_'.",
    [304 /* Entity_missingExpandoOrState_attrName */]: "Found '{}' but expando did not have entity and attribute did not have state.",
    [305 /* Entity_elementMissingEntityAttr_element_attr */]: "Element '{}' is missing entity attribute definition '{}'.",
    [306 /* Entity_noState_entity_props */]: "Unable to create state for entity '{}' with props '{}' because no state found and '$newState()' method was not defined on entity.",
    [307 /* Entity_expected_obj */]: "'{}' is not an instance of 'Entity'.",
    [308 /* Entity_overridesConstructor_entity */]: "'{}' overrides 'constructor' property preventing 'EntityType' retrieval.",
    [311 /* Entity_no$keyProps_entity */]: "Entity '{}' does not define '$keyProps'.",
    [310 /* Entity_no$type_entity */]: "Entity '{}' must have static '$type' property defining the name of the entity.",
    [312 /* Entity_no$qrl_entity */]: "Entity '{}' must have static '$qrl' property defining the import location of the entity.",
    [313 /* Entity_nameCollision_name_currentQrl_expectedQrl */]: "Name collision. Already have entity named '{}' with QRL '{}' but expected QRL '{}'.",
    [309 /* Entity_keyMissingParts_key_key */]: "Entity key '{}' is missing values. Expecting '{}:someValue'.",
    [314 /* Entity_keyTooManyParts_entity_parts_key */]: "Entity '{}' defines '$keyProps' as  '{}'. Actual key '{}' has more parts than entity defines.",
    [315 /* Entity_keyNameMismatch_key_name_entity_name */]: "Key '{}' belongs to entity named '{}', but expected entity '{}' with name '{}'.",
    [316 /* Entity_stateMissingKey_state */]: "Entity state is missing '$key'. Are you sure you passed in state? Got '{}'.",
    //////////////
    [400 /* Component_bindNeedsKey */]: "'bind:' must have an key. (Example: 'bind:key=\"propertyName\"').",
    [401 /* Component_bindNeedsValue */]: "'bind:id' must have a property name. (Example: 'bind:key=\"propertyName\"').",
    [402 /* Component_needsState */]: "Can't find state on host element.",
    [403 /* Component_needsInjectionContext_constructor */]: "Components must be instantiated inside an injection context. Use '{}.new(...)' for creation.",
    [404 /* Component_noProperty_propName_props_host */]: "Property '{}' not found in '{}' on component '{}'.",
    [405 /* Component_notFound_component */]: "Unable to find '{}' component.",
    [406 /* Component_doesNotMatch_component_actual */]: "Requesting component '{}' does not match existing component '{}'. Verify that the two components have distinct '$templateQRL's.",
    [407 /* Component_missingTemplateQRL_component */]: "Expecting Component '{}' to have static '$templateQRL' property, but none was found.",
    [408 /* Component_noState_component_props */]: "Unable to create state for component '{}' with props '{}' because no state found and '$newState()' method was not defined on component.",
    //////////////
    [500 /* Provider_unrecognizedFormat_value */]: "Unrecognized expression format '{}'.",
    //////////////
    [600 /* Render_unexpectedJSXNodeType_type */]: 'Unexpected JSXNode<{}> type.',
    [601 /* Render_unsupportedFormat_obj_attr */]: "Value '{}' can't be written into '{}' attribute.",
    [602 /* Render_expectingEntity_entity */]: "Expecting entity object, got '{}'.",
    [603 /* Render_expectingEntityArray_obj */]: "Expecting array of entities, got '{}'.",
    [604 /* Render_expectingEntityOrComponent_obj */]: "Expecting Entity or Component got '{}'.",
    [605 /* Render_noRAF */]: "'requestAnimationFrame' not found. If you are running on server design your applications in a way which does not require 'requestAnimationFrame' on first render.",
    [606 /* Render_bindNeedsComponent_key_element */]:
      "Expecting that element with 'bind:{}' should be a component (should have '" +
      'decl:template' /* ComponentTemplate */ +
      '="qrl"\' attribute): {}',
    //////////////
    [700 /* Event_emitEventRequiresName_url */]: "Missing '$type' attribute in the '{}' url.",
    [701 /* Event_emitEventCouldNotFindListener_event_element */]: "Re-emitting event '{}' but no listener found at '{}' or any of its parents."
  }[code];
  let textCode = '000' + code;
  textCode = textCode.substr(textCode.length - 3);
  return `${area}(Q-${textCode}): ${text}`;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
const _globalThis = typeof globalThis !== 'undefined' && globalThis;
const _window = typeof window !== 'undefined' && window;
const _self =
  typeof self !== 'undefined' &&
  typeof WorkerGlobalScope !== 'undefined' &&
  self instanceof WorkerGlobalScope &&
  self;
const __global = typeof global !== 'undefined' && global;
const _global = _globalThis || __global || _window || _self;

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
if (typeof qDev === 'undefined') {
  _global.qDev = true;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Returns directory name of a path.
 *
 * This function removes the file portion of the path and returns directory name only.
 *
 * @param path - File path
 * @returns Directory portion of the path.
 * @public
 */
function dirname(path) {
  const idx = path.lastIndexOf('/', path.length - 2);
  return idx == -1 ? path : path.substr(0, idx + 1);
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Stores multiple `QConfig` when running on server.
 *
 * A single node.js server can server more than one applications.
 * We want `QRL` to be relative to each application for this reason
 * a single node.js server may have more than one `QConfig`.
 *
 * We store the `QConfig` in `configs` and than we us the current
 * baseURI to determine which of the `QConfig`s are relevant.
 */
const configs = [];
/**
 * Configure `QConfig` for portion of node.js application.
 *
 * In browser the `QConfig` is stored on Window. See `global.Q`.
 *
 * In node.js there is no `Window` and there can be more than one
 * `QConfig`s active as there can be more than one application being served.
 *
 * In node.js use `setConfig` to configure a subtree. (`import.meta.url` defines the sub-tree.)
 * ```
 * setConfig({
 *   baseURI: dirname(import.meta.url),
 *   protocol: {
 *     ui: './ui',
 *     data: './data',
 *   },
 * });
 * ```
 *
 * @param config - `QConfig` to add.
 * @public
 */
function setConfig(config) {
  if (!config.baseURI.endsWith('/')) {
    config.baseURI = dirname(config.baseURI);
  }
  config.baseURI = normalizeBaseUri(config.baseURI);
  configs.push(config);
  configs.sort((a, b) => {
    return b.baseURI.length - a.baseURI.length;
  });
}
function normalizeBaseUri(baseURI) {
  if (baseURI.startsWith('/')) {
    baseURI = 'file://' + baseURI;
  }
  return baseURI;
}
/**
 * Retrieves the current `QConfig`.
 *
 * `QConfig` is retrieved either from `configs` or from `global.Q` if browser.
 *
 * @param path
 * @returns
 * @internal
 */
function getConfig(path) {
  if (path != null) {
    path = normalizeBaseUri(path);
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      if (path.startsWith(config.baseURI)) {
        return config;
      }
    }
  }
  if (typeof document === 'undefined') {
    // We are in Node.js
    throw qError(
      1 /* Core_qConfigNotFound_path */,
      path + '\n' + configs.map(c => JSON.stringify(c)).join('\n')
    );
  }
  if (!_global.Q) {
    _global.Q = {};
  }
  if (!Q.baseURI) {
    Q.baseURI = document.baseURI;
  }
  if (!Q.protocol) {
    Q.protocol = {};
  }
  return Q;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
let importCache;
/**
 * Lazy load a `QRL` symbol and returns the resulting value.
 *
 * @param base -`QRL`s are relative, and therefore they need a base for resolution.
 *    - `Element` use `base.ownerDocument.baseURI`
 *    - `Document` use `base.baseURI`
 *    - `string` use `base` as is
 *    - `QConfig` use `base.baseURI`
 * @param url - A relative URL (as `string` or `QRL`) or fully qualified `URL`
 * @returns A cached value synchronously or promise of imported value.
 * @public
 */
function qImport(base, url) {
  if (!importCache) importCache = new Map();
  const normalizedUrl = toUrl(toBaseURI(base), url);
  const importPath = toImportPath(normalizedUrl);
  const exportName = qExport(normalizedUrl);
  const cacheKey = `${importPath}#${exportName}`;
  const cacheValue = importCache.get(cacheKey);
  if (cacheValue) return cacheValue;
  // TODO(misko): Concern: When in `cjs` mode we should be using require?
  const promise = (typeof __mockImport === 'function'
    ? __mockImport(importPath + '.js')
    : import(importPath + '.js')
  ).then(module => {
    const handler = module[exportName];
    if (!handler)
      throw qError(
        6 /* Core_missingExport_name_url_props */,
        exportName,
        importPath,
        Object.keys(module)
      );
    qImportSet(cacheKey, handler);
    return handler;
  });
  qImportSet(cacheKey, promise);
  return promise;
}
function qImportSet(url, value) {
  importCache.set(url, value);
}
/**
 * Retrieves the base URI.
 *
 * @param base -`QRL`s are relative, and therefore they need a base for resolution.
 *    - `Element` use `base.ownerDocument.baseURI`
 *    - `Document` use `base.baseURI`
 *    - `string` use `base` as is
 *    - `QConfig` use `base.baseURI`
 * @returns Base URI.
 */
function toBaseURI(base) {
  if (typeof base === 'string') return base;
  const document = base.ownerDocument || base;
  return document.baseURI;
}
/**
 * Convert relative base URI and relative URL into a fully qualified URL.
 *
 * @param base -`QRL`s are relative, and therefore they need a base for resolution.
 *    - `Element` use `base.ownerDocument.baseURI`
 *    - `Document` use `base.baseURI`
 *    - `string` use `base` as is
 *    - `QConfig` use `base.baseURI`
 * @param url - relative URL
 * @returns fully qualified URL.
 */
function toUrl(baseURI, url) {
  if (typeof url === 'string') {
    const config = getConfig(baseURI);
    return new URL(adjustProtocol(config, url), config.baseURI);
  } else {
    return url;
  }
}
/**
 * Removes URL decorations such as search and hash, and normalizes extensions,
 * returning naked URL for importing.
 *
 * @param url - to clean.
 * @returns naked URL.
 */
function toImportPath(url) {
  const tmp = new URL(String(url));
  tmp.hash = '';
  tmp.search = '';
  return String(tmp).replace(/\.(ts|tsx)$/, '.js');
}
/**
 * Convert custom protocol to path by looking it up in `QConfig`
 *
 * Pats such as
 * ```
 * QRL`foo:/bar`
 *
 * Q = {
 *   protocol: {
 *     'foo': 'somePath'
 *   }
 * }
 * ```
 * The `QRL` looks up `foo` in `QRLProtocolMap` resulting in `somePath/bar`
 *
 * @param qConfig
 * @param qrl
 * @returns URL where the custom protocol has been resolved.
 */
function adjustProtocol(qConfig, qrl) {
  return String(qrl).replace(/(^\w+):\/?/, (all, protocol) => {
    let value = qConfig.protocol[protocol];
    if (!value) return all;
    if (!value.endsWith('/')) {
      value = value + '/';
    }
    return value;
  });
}
/**
 * Extract the QRL export name from a URL.
 *
 * This name is encoded in the hash of the URL, before any `?`.
 */
function qExport(url) {
  // 1 - optional `#` at the start.
  // 2 - capture group `$1` containing the export name, stopping at the first `?`.
  // 3 - the rest from the first `?` to the end.
  // The hash string is replaced by the captured group that contains only the export name.
  //                       1112222222333
  return url.hash.replace(/^#?([^?]*).*$/, '$1') || 'default';
}
/**
 * Extract the QRL params from a URL.
 *
 * These params are encoded after the `?` in the hash of the URL, not the URL's search params.
 */
function qParams(url) {
  // 1 - everything up to the first `?` (or the end of the string).
  // 2 - an optional `?`.
  // 3 - capture group `$1` containing everything after the first `?` to the end of the string.
  // The hash string is replaced by the captured group that contains only the serialized params.
  //                                           11111122233333
  return new URLSearchParams(url.hash.replace(/^[^?]*\??(.*)$/, '$1'));
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function assertValidDataKey(key) {
  if (!key) return;
  for (let i = 0; i < key.length; i++) {
    const ch = key.charCodeAt(i);
    if (!isAlphanumeric(ch)) {
      throw qError(300 /* Entity_notValidKey_key */, key);
    }
  }
}
function isAlphanumeric(ch) {
  return (
    (65 /* A */ <= ch && ch <= 90) /* Z */ ||
    isAlphanumericAttribute(ch) ||
    ch == 46 /* DOT */ ||
    ch == 58 /* COLON */
  );
}
function isAlphanumericAttribute(ch) {
  return (
    (97 /* a */ <= ch && ch <= 122) /* z */ ||
    (48 /* _0 */ <= ch && ch <= 57) /* _9 */ ||
    ch == 45 /* DASH */ ||
    ch == 95 /* UNDERSCORE */
  );
}
function isValidAttribute(text) {
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    if (!isAlphanumericAttribute(ch)) return false;
  }
  return true;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
const camelToKebabCase = new Map();
function fromCamelToKebabCase(text, includeFirst = false) {
  if (typeof text != 'string') return text;
  const value = camelToKebabCase.get(text);
  if (value != null) return value;
  let converted = '';
  for (let x = 0; x < text.length; x++) {
    const ch = text.charAt(x);
    if (isUpperCase(ch)) {
      converted += (x != 0 || includeFirst ? '-' : '') + ch.toLowerCase();
    } else {
      converted += ch;
    }
  }
  camelToKebabCase.set(text, converted);
  return converted;
}
const kebabToCamelCase = new Map();
function fromKebabToCamelCase(text, capitalizeFirstCharacter = true) {
  const value = kebabToCamelCase.get(text);
  if (value != null) return value;
  let converted = '';
  let wasKebab = capitalizeFirstCharacter;
  for (let x = 0; x < text.length; x++) {
    const ch = text.charAt(x);
    if (isKebab(ch)) {
      wasKebab = true;
    } else if (wasKebab) {
      wasKebab = false;
      converted += ch.toUpperCase();
    } else {
      converted += ch;
    }
  }
  kebabToCamelCase.set(text, converted);
  return converted;
}
function isUpperCase(ch) {
  return 'A' <= ch && ch <= 'Z';
}
function isKebab(ch) {
  return ch === '-';
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function stringify(value) {
  return value == null ? null : String(value);
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function assertDefined(value, text) {
  if (value != null) return;
  throw newError(text || 'Expected defined value.');
}
function assertString(value, text) {
  if (typeof value === 'string') return;
  throw newError(
    text ||
      `Expected value '${value}' to be 'string' but was '${typeOf(value)}'.`
  );
}
function assertEqual(value1, value2, text) {
  if (value1 === value2) return;
  throw newError(text || `Expected '${value1}' === '${value2}'.`);
}
function typeOf(value) {
  var _a;
  if (value === null) return 'null';
  const type = typeof value;
  if (type === 'object') {
    return (
      ((_a =
        value === null || value === void 0 ? void 0 : value.constructor) ===
        null || _a === void 0
        ? void 0
        : _a.name) || '<unknown>'
    );
  } else {
    return type;
  }
}
function newError(text) {
  debugger; // eslint-disable-line no-debugger
  return new Error(text);
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Converts a `string` into `EntityKey` typed object.
 *
 * `EntityKey`s are `string`s at runtime. This function just adds type-safety.
 *
 * @param key - `string` representation of `EntityKey`
 * @returns `EntityKey`
 * @public
 */
function toEntityKey(key) {
  qDev && assertString(key);
  return key;
}
/**
 * Converts entity `Props` into entity key.
 *
 * Entity keys are of format `entity:value1:value2:...`. The order
 * of values is defined in `EntityType.$keyProps` and the entity key
 * prefix is defined in `EntityType.$type`
 *
 * @param entityType - `EntityType` used to extract `EntityType.$type` and
 *        `EntityType.$keyProps` for the conversion process.
 * @param props - A `Props` object where key values need to be converted to
 *          entity-key according to the `EntityType.$keyProps`.
 * @returns entity-key.
 * @internal
 */
function propsToKey(entityType, props) {
  let id = fromCamelToKebabCase(entityType.$type) + ':';
  const propNames = entityType.$keyProps;
  if (!propNames) {
    throw qError(311 /* Entity_no$keyProps_entity */, entityType);
  }
  for (let i = 0; i < propNames.length; i++) {
    const name = propNames[i];
    if (i != 0) {
      id += ':';
    }
    const value = fromCamelToKebabCase(stringify(props[name]), true);
    id += validateKeyPart(value);
  }
  return id;
}
/**
 * Converts entity key into `Props`.
 *
 * Entity keys are of format `entity:value1:value2:...`
 *
 * @param entityType - `EntityType` used to extract `EntityType.$type` and
 *        `EntityType.$keyProps` for the conversion process
 * @param key - Entity keys are of format `entity:value1:value2:...`
 * @returns A `Props` object where key values have been convert to properties
 *          according to the `EntityType.$keyProps`.
 * @internal
 */
function keyToProps(entityType, key) {
  const props = {};
  const propOrder = entityType.$keyProps;
  if (!propOrder) {
    throw qError(311 /* Entity_no$keyProps_entity */, entityType);
  }
  propOrder.forEach(key => (props[key] = null));
  const keyParts = String(key).split(':');
  if (keyParts.length <= 1) {
    throw qError(309 /* Entity_keyMissingParts_key_key */, key, key);
  }
  const entityName = keyParts.shift();
  const expectedName = fromCamelToKebabCase(entityType.$type);
  if (expectedName !== entityName) {
    throw qError(
      315 /* Entity_keyNameMismatch_key_name_entity_name */,
      key,
      entityName,
      entityType,
      expectedName
    );
  }
  if (propOrder.length == 0 && keyParts.length == 1 && keyParts[0] == '') {
    // special case for keys with no parts.
    return props;
  }
  for (let i = 0; i < keyParts.length; i++) {
    const part = keyParts[i];
    if (i >= propOrder.length) {
      throw qError(
        314 /* Entity_keyTooManyParts_entity_parts_key */,
        entityType,
        propOrder,
        key
      );
    }
    const propName = propOrder[i];
    props[propName] =
      part == '' && i == keyParts.length - 1
        ? null
        : fromKebabToCamelCase(part, false);
  }
  return props;
}
/**
 * Validates that a entity key contains only valid characters.
 *
 * Entity keys need to be serialized into DOM attributes. DOM
 * puts constraints on what characters are allowed in attributes.
 * This function verifies that the key is valid.
 *
 * @param value - Key part
 * @returns Returns `value` or throws an error.
 * @internal
 */
function validateKeyPart(value) {
  const text = value == null ? '' : String(value);
  if (isValidAttribute(text)) {
    return text;
  } else {
    throw qError(303 /* Entity_invalidAttribute_name */, value);
  }
}
/**
 * Retrieve `EntityKey` from Entity State.
 *
 * Qwik stores `EntityKey` in the state of the Entity as `$key` even
 * if it is not declared in the State type. Use this method to retrieve it.
 *
 * This method is convenient when Entity key is needed but only Entity State is available.
 *
 * @param value - Entity State
 * @returns `EntityKey`
 * @public
 */
function entityStateKey(value) {
  const key = value.$key;
  if (typeof key !== 'string') {
    throw qError(316 /* Entity_stateMissingKey_state */, value);
  }
  return key;
}
/**
 * Returns the attribute where the entity QRL is stored.
 *
 * @param key - entity key attribute name (ie: `foo:123:456`)
 * @returns Entity attribute (ie: `::foo`)
 */
function keyToEntityAttribute(entityKey) {
  const key = entityKey;
  const idx = key.indexOf(':');
  if (idx == -1) {
    throw qError(300 /* Entity_notValidKey_key */, key);
  }
  return '::' + key.substr(0, idx);
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Find a parent `Element` which has either `attributePrimary` or `attributeSecondary`.
 *
 * @param element `Element` where the search should be initiated at
 * @param qNotFoundError Error if attribute not found
 * @param attributePrimary Primary attribute to look for.
 * @param callbackPrimary Callback to call if primary attribute is found
 * @param attributeSecondary Secondary attribute to look for.
 * @param callbackSecondary Callback to call if secondary attribute is found
 * @internal
 */
function findAttribute(
  element,
  qNotFoundError,
  attributePrimary,
  callbackPrimary,
  attributeSecondary,
  callbackSecondary
) {
  let cursor = element;
  while (cursor) {
    const attrValuePrimary = cursor.getAttribute(attributePrimary);
    if (attrValuePrimary !== null) {
      return callbackPrimary(cursor, attributePrimary, attrValuePrimary);
    }
    if (attributeSecondary && callbackSecondary) {
      const attrValueSecondary = cursor.getAttribute(attributeSecondary);
      if (attrValueSecondary !== null) {
        return callbackSecondary(
          cursor,
          attributeSecondary,
          attrValueSecondary
        );
      }
    }
    cursor = cursor.parentElement;
  }
  throw attributeSecondary
    ? qError(qNotFoundError, attributePrimary, attributeSecondary, element)
    : qError(qNotFoundError, attributePrimary, element);
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Returns the props from a given element.
 *
 * The method reads attributes on an element and returns `Props` object.
 *
 * @param element `Element` to read attributes from.
 * @internal
 */
function extractPropsFromElement(element) {
  const props = {};
  const attrs = element.attributes;
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const attrName = attr.name;
    const attrValue = attr.value;
    if (attrName.startsWith('bind:' /* BindPrefix */)) {
      const id = attrName.substr(5 /* BindPrefixLength */);
      if (!id) {
        throw qError(400 /* Component_bindNeedsKey */);
      }
      if (!attrValue) {
        throw qError(401 /* Component_bindNeedsValue */);
      }
      attrValue.split(';').forEach(key => key && (props[key] = id));
    } else if (attrName.indexOf(':') !== -1);
    else {
      props[fromKebabToCamelCase(attrName, false)] = attrValue;
    }
  }
  return props;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 *
 *
 * @param injector
 * @param args
 * @returns
 */
function resolveArgs(injector, ...args) {
  const argPromises = [];
  for (let i = 0; i < args.length; i++) {
    const valueOrProvider = args[i];
    argPromises.push(
      isProvider(valueOrProvider) ? valueOrProvider(injector) : valueOrProvider
    );
  }
  return Promise.all(argPromises);
}
function isProvider(value) {
  return typeof value === 'function';
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
class BaseInjector {
  constructor(element) {
    this._props = null;
    this.element = element;
  }
  invoke(fn, self, ...rest) {
    if (isInjectedFunction(fn)) {
      try {
        const selfType = fn.$thisType;
        if (self && selfType && !(self instanceof selfType)) {
          throw qError(
            203 /* Injector_wrongMethodThis_expected_actual */,
            selfType,
            self.constructor
          );
        }
        const hasSelf = selfType && self == null;
        return resolveArgs(
          this,
          hasSelf ? this.getComponent(selfType) : self,
          ...fn.$inject
        ).then(
          values => {
            return fn.apply(values.shift(), values.concat(rest));
          },
          error => Promise.reject(addDeclaredInfo(fn, error))
        );
      } catch (e) {
        throw addDeclaredInfo(fn, e);
      }
    } else {
      return Promise.resolve(fn.apply(null, rest));
    }
  }
  set elementProps(props) {
    this._props = props;
  }
  get elementProps() {
    const existingProps = this._props;
    if (existingProps != null) {
      return existingProps;
    }
    return extractPropsFromElement(this.element);
  }
}
function addDeclaredInfo(fn, error) {
  const debugStack = fn.$debugStack;
  if (!debugStack) return error;
  if (!(error instanceof Error)) {
    error = new Error(String(error));
  }
  const declaredFrames = debugStack.stack.split('\n');
  const declaredFrame = declaredFrames[2].trim();
  const stack = error.stack;
  const msg = error.message;
  error.stack = stack.replace(msg, msg + '\n      DECLARED ' + declaredFrame);
  return error;
}
function isInjectedFunction(value) {
  return !!value.$inject;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
class ElementInjector extends BaseInjector {
  constructor() {
    super(...arguments);
    this.component = null;
    this.componentPromise = null;
    this.entities = null;
  }
  getParent() {
    let element = this.element.parentElement;
    while (element) {
      if (
        element.hasAttribute(':' /* Injector */) ||
        element.hasAttribute('decl:template' /* ComponentTemplate */)
      ) {
        return getInjector(element);
      }
      element = element.parentElement;
    }
    return null;
  }
  getComponent(componentType) {
    const injector = this;
    const elementQRL = injector.element.getAttribute(
      'decl:template' /* ComponentTemplate */
    );
    const $templateQRL = componentType.$templateQRL;
    if (!$templateQRL) {
      throw qError(
        407 /* Component_missingTemplateQRL_component */,
        componentType
      );
    }
    if (elementQRL === $templateQRL) {
      let component = this.component;
      if (component) {
        if (component instanceof componentType) {
          return this.componentPromise;
        } else {
          throw qError(
            406 /* Component_doesNotMatch_component_actual */,
            componentType,
            component.constructor
          );
        }
      } else {
        const stateJSON = this.element.getAttribute(':.' /* ComponentState */);
        const state = stateJSON ? JSON.parse(stateJSON) : null;
        this.component = component = new componentType(
          this.element,
          this.elementProps,
          state
        );
        return (this.componentPromise = new Promise((resolve, reject) => {
          let promise;
          if (state == null) {
            promise = Promise.resolve(
              component.$newState(component.$props)
            ).then(state => {
              component.$state = state;
            });
          } else {
            promise = Promise.resolve(component);
          }
          promise
            .then(() => component.$init())
            .then(() => resolve(component), reject);
        }));
      }
    } else {
      const parentInjector = this.getParent();
      if (!parentInjector) {
        throw qError(405 /* Component_notFound_component */, componentType);
      }
      return parentInjector.getComponent(componentType);
    }
  }
  getEntity(entityKey, forceState, entityType) {
    var _a, _b;
    let entityPromise =
      (_b =
        (_a = this.entities) === null || _a === void 0
          ? void 0
          : _a.get(entityKey)) === null || _b === void 0
        ? void 0
        : _b.promise;
    if (entityPromise) return entityPromise;
    const entityAttrName = keyToEntityAttribute(entityKey);
    const self = this;
    return findAttribute(
      this.element,
      4 /* Core_noAttribute_atr1_attr2_element */,
      String(entityKey),
      entityFactory,
      entityAttrName,
      entityFactory
    );
    function entityFactory(element, attrName, attrValue) {
      var _a, _b;
      const injector = element === self.element ? self : getInjector(element);
      entityPromise =
        (_b =
          (_a = injector.entities) === null || _a === void 0
            ? void 0
            : _a.get(entityKey)) === null || _b === void 0
          ? void 0
          : _b.promise;
      if (entityPromise) return entityPromise;
      // OK, if we got here we don't already have entity, so we need to make it.
      injector.element.setAttribute(String(entityKey), '');
      const entityQRL = element.getAttribute(entityAttrName);
      if (!entityQRL) {
        throw qError(
          305 /* Entity_elementMissingEntityAttr_element_attr */,
          element,
          entityAttrName
        );
      }
      const entityTypePromise = Promise.resolve(
        entityType || qImport(element, entityQRL)
      );
      entityPromise = toEntityPromise(
        entityKey,
        new Promise((resolve, reject) => {
          entityTypePromise.then(entityType => {
            if (typeof entityType !== 'function') {
              throw qError(
                100 /* QRL_expectFunction_url_actual */,
                entityQRL,
                entityType
              );
            }
            let state = forceState || null;
            if (!state && attrName === String(entityKey)) {
              state = JSON.parse(attrValue);
              state.$key = entityKey;
            }
            const props = entityType.$keyToProps(entityKey);
            const entity = new entityType(element, props, state);
            let chain;
            if (state) {
              entityValue.entity = entity;
              chain = Promise.resolve(entity);
            } else {
              chain = entity.$newState(props).then(
                state => {
                  entityValue.entity = entity;
                  state.$key = entityKey;
                  entity.$state = state;
                  return entity;
                },
                e => {
                  var _a;
                  (_a = self.entities) === null || _a === void 0
                    ? void 0
                    : _a.delete(entityKey);
                  return Promise.reject(e);
                }
              );
            }
            chain.then(() => {
              Promise.resolve(entity.$init()).then(() => resolve(entity));
            }, reject);
          }, reject);
        })
      );
      const entityValue = { promise: entityPromise, entity: null };
      const entities = injector.entities || (injector.entities = new Map());
      entities.set(entityKey, entityValue);
      return entityPromise;
    }
  }
  getEntityState(entityKey) {
    const entityAttrName = keyToEntityAttribute(entityKey);
    return findAttribute(
      this.element,
      4 /* Core_noAttribute_atr1_attr2_element */,
      entityKey,
      (element, entityKeyAttr, entityState) => {
        var _a, _b;
        const injector = element == this.element ? this : getInjector(element);
        const existingEntity =
          (_b =
            (_a = injector.entities) === null || _a === void 0
              ? void 0
              : _a.get(entityKey)) === null || _b === void 0
            ? void 0
            : _b.promise;
        if (existingEntity) {
          return existingEntity.then(entity => entity.$state);
        }
        if (!entityState) {
          throw qError(
            204 /* Injector_missingSerializedState_entityKey_element */,
            entityKey,
            element
          );
        }
        const state = JSON.parse(entityState);
        state.$key = entityKeyAttr;
        return Promise.resolve(state);
      },
      entityAttrName,
      element => {
        return getInjector(element)
          .getEntity(entityKey)
          .then(entity => entity.$state);
      }
    );
  }
  releaseEntity(key) {
    var _a;
    if (
      (_a = this.entities) === null || _a === void 0 ? void 0 : _a.delete(key)
    ) {
      this.element.removeAttribute(key);
    }
  }
  serialize() {
    var _a, _b;
    const element = this.element;
    const state =
      (_a = this.component) === null || _a === void 0 ? void 0 : _a.$state;
    if (state != null) {
      element.setAttribute(':.' /* ComponentState */, JSON.stringify(state));
    }
    (_b = this.entities) === null || _b === void 0
      ? void 0
      : _b.forEach(entity => {
          var _a;
          const state =
            (_a = entity.entity) === null || _a === void 0 ? void 0 : _a.$state;
          if (state) {
            element.setAttribute(
              state.$key,
              JSON.stringify(state, filterFrameworkKeys)
            );
          }
        });
  }
}
function filterFrameworkKeys(key, value) {
  if (key.startsWith('$')) {
    return undefined;
  } else {
    return value;
  }
}
function toEntityPromise(entityKey, promise) {
  const entityPromise = promise;
  entityPromise.$key = entityKey;
  return entityPromise;
}
function getInjector(element, create = true) {
  if (!isHtmlElement(element)) {
    throw qError(202 /* Injector_notElement_arg */, element);
  }
  const _element = element;
  let injector = _element.$injector;
  if (create && !injector) {
    _element.$injector = injector = new ElementInjector(element);
    // We need to mark the Storage so that serializeState knows where to look for State
    element.setAttribute(':' /* Injector */, '');
  }
  return injector || null;
}
function getClosestInjector(element, throwIfNotFound = true) {
  let cursor = element;
  while (cursor) {
    if (
      cursor.hasAttribute(':' /* Injector */) ||
      cursor.hasAttribute('decl:template' /* ComponentTemplate */)
    ) {
      return getInjector(cursor);
    }
    cursor = cursor.parentElement;
  }
  if (throwIfNotFound) {
    throw qError(206 /* Injector_notFound_element */, element);
  }
  return null;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Base class for Qwik component.
 *
 * All Qwik components are defined by a class that must inherit from `Component`.
 * An instance of a Qwik component represents the transient state of that component.
 * A component contains `$state` and `$keyProps` properties.
 *
 * Example:
 * ```
 * interface GreeterState {}
 * interface GreeterProps {
 *   salutation: string,
 *   name: string,
 * }
 *
 * class Greeter extends Component<GreeterProps, GreeterState> {
 *   $newState() {
 *     return {} as GreeterState;
 *   }
 * }
 * ```
 * @public
 */
class Component {
  constructor(hostElement, props, state) {
    this.$host = hostElement;
    this.$props = props;
    this.$state = state;
  }
  static $new(hostElement) {
    // TODO: Needs tests
    const componentConstructor = this;
    const componentTemplate = hostElement.getAttribute(
      'decl:template' /* ComponentTemplate */
    );
    if (!componentTemplate) {
      hostElement.setAttribute(
        'decl:template' /* ComponentTemplate */,
        componentConstructor.$templateQRL
      );
    } else if (componentTemplate !== componentConstructor.$templateQRL) {
      // TODO: Needs tests for error condition for attaching component to element  which already has a component
      throw new Error('Write proper error');
    }
    const injector = getInjector(hostElement);
    return injector.getComponent(componentConstructor);
  }
  /**
   * Lifecycle method invoked on hydration.
   *
   * After the component creation and after the state is restored (either from DOM or by invoking
   * `$newState`) this method is invoked. The purpose of this method is to allow the component
   * to compute any transient state.
   *
   * Lifecycle order:
   * - `new Component(...)`
   * - `$newState(props)`: Invoked if no serialized state found in DOM.
   * - `$init()`
   * - Component returned by the `Injector`.
   */
  $init() {}
  /**
   * Lifecycle method to initialize a component's state.
   *
   * When component is first created it has no state. Use this method to create the component's
   * initial state from the `Props`.
   *
   * Once the component's state gets serialized to HTML and the component gets rehydrated this
   * method is no longer called.
   *
   * Lifecycle order:
   * - `new Component(...)`
   * - `$newState(props)`: Invoked if no serialized state found in DOM.
   * - `$init()`
   * - Component returned by the `Injector`.
   *
   * @param props - Component props.
   */
  $newState(props) {
    const componentType = this.constructor;
    throw qError(
      408 /* Component_noState_component_props */,
      componentType,
      props
    );
  }
}
/**
 * Pointer to template to verify that the component is attached to the right DOM location.
 */
Component.$templateQRL = null;
/**
 * Determines if an `object` is an instance of `Component`.
 *
 * @internal
 */
function isComponent(object) {
  var _a;
  return (
    typeof ((_a =
      object === null || object === void 0 ? void 0 : object.constructor) ===
      null || _a === void 0
      ? void 0
      : _a.$templateQRL) === 'string'
  );
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Event handler which re-emits the event under a different event name.
 *
 * This function is useful when you need to listen on some event and need to
 * re-emit the event under different name.
 *
 * # Example
 * ```
 * <my-component on:open="./onOpen" on:close="./onClose">
 *   <button on:click="base:qwik#emitEvent?$type=open&someArg=someValue">open</button>
 *   <button on:click="base:qwik#emitEvent?$type=close&someArg=someValue">close</button>
 * </my-component>
 * ```
 *
 * In the above example clicking on `<button>open</button>` will trigger `on:click` which will
 * re-emit the event as `open` which is than processed by `<my-component on:open>`.
 *
 * This is useful when it is desirable to separate the trigger mechanism from the implementation.
 *
 * The `emitEvent` takes URL `$type` property as the new event name to look for. Any additional
 * properties on the URL will be appended to the event object.
 *
 * @param element - `Element` of the original event.
 * @param event - Original `Event`.
 * @param url - Original `URL`.
 * @public
 */
function emitEvent(element, event, url) {
  const params = qParams(url);
  const $type = params.get('$type');
  if ($type == null) {
    throw qError(700 /* Event_emitEventRequiresName_url */, url);
  }
  const returnValue = findAttribute(
    element,
    701 /* Event_emitEventCouldNotFindListener_event_element */,
    'on:' /* EventPrefix */ + fromCamelToKebabCase($type),
    (element, attrName, attrValue) => {
      const qrl = attrValue;
      return Promise.resolve(qImport(element, qrl)).then(fn => {
        const dstUrl = toUrl(toBaseURI(element), qrl);
        const event = new CustomEvent($type);
        params.forEach((value, key) => {
          event[key] = value;
        });
        return fn(element, event, dstUrl);
      });
    }
  );
  return Promise.resolve(returnValue);
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function getFilePathFromFrame(frame) {
  const match = frame.match(/\(?(\S*):\d+:\d+\)?/);
  if (!match) {
    throw qError(2 /* Core_unrecognizedStack_frame */, frame);
  }
  const path = match[1];
  return path.replace(/\.(ts|tsx)$/, '.js');
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * `Entity` allows creation of lazy loading class whose state is serializable.
 *
 * Entities are a basic building block of Qwik applications. The basic idea behind entities
 * is that their state is serializable and thus a entity lifetime can span runtime environments
 * (i.e. entity instances can be created by the server and then used by the client).
 *
 * Entities are broken down into three parts:
 * 1) A global unique key. A key is a string which uniquely identifies a entity. Typically
 *    keys contain only a single id, such as `myEntity:123`, however they can be hierarchical
 *    as in `project:123:456`. Keys are immutable for a given entity instance. Keys get parsed
 *    into the `Props` of the entity.
 * 2) A JSON serializable `State` which is persisted in DOM when the application is dehydrated.
 * 3) A transient entity instance. We say transient because it does not get deserialized.
 *
 * The basic idea of a entity is that the transient instance can be recreated from the `Props` and
 * `State` on as-needed basis.
 *
 * Entities have two responsibilities:
 * 1) to provide behavior around `State`. This comes in form of async methods on the entity class.
 * 2) to materialize new data based on the `key` and `Props`.
 *
 * Let's say we would like to implement a todo item.
 *
 * ```
 * // Define Props which will serialize into the key: `todo:123`.
 * interface TodoItemProps {
 *   id: string;
 * }
 *
 * // Define State which can be serialized onto the DOM during dehydration.
 * interface TodoItem {
 *   completed: boolean,
 *   text: string;
 * }
 *
 * // Define a class whose instances are the transient entity objects.
 * class TodoItemEntity extends Entity<TodoItemProps, TodoItem> {
 *   $qrl = QRL`./path/to/entity/TodoItem`;
 *   $type = 'todo';
 *   $keyProps = ['id'];
 *
 *   async archive() {
 *     // entity specific method/behavior.
 *   }
 * }
 * ```
 *
 * ## Instantiating a entity.
 *
 * Entities are attached and store their data in the DOM/HTML. For this reason when the entity is
 * created an `Element` must be specified.
 *
 * ```
 * const todoItemEntity = await TodoItemEntity.$hydrate(
 *    element,      // Element where the entity should be attached.
 *    {id: '123'},  // Entity's identity. Serializes to `item:123`.
 *    {completed: false, text: 'sample task'} // Initial state.
 * );
 * expect(todoItemEntity.$state)
 *   .toEqual({completed: false, text: 'sample task'});
 * ```
 *
 * When dehydrated this results in HTML that looks like:
 *
 * ```
 * <div ::todo="./path/to/entity/TodoItem"
 *      todo:123="{completed: false, text: 'sample task'}">
 * ```
 *
 * NOTE:
 *   - `::todo` The QRL to import the `TodoItemEntity` class.
 *   - `todo:123` Represents a specific instance of the `TodoItemEntity`, with `id: 123` and state serialized as JSON.
 *
 *
 * ## Rehydration
 *
 * We can use the same code to rehydrate the entity from HTML/DOM.
 *
 * ```
 * const todoItemEntity =
 *   await TodoItemEntity.$hydrate(element, {id: '123'});
 * expect(todoItemEntity.$state)
 *   .toEqual({completed: false, text: 'sample task'});
 * ```
 *
 * The above will either return the same instance of the entity that was created above or a new instance
 * if the application was dehydrated into HTML. In either case the `$state` will contain the same data.
 *
 * ## Lookup
 *
 * There is a third situation when we ask to rehydrate a entity which has no serialized state in the DOM.
 *
 * Let's assume that the DOM looks like this.
 * ```
 * <div ::todo="./path/to/entity/TodoItem">
 * ```
 *
 * We can still use the same code to ask for `item:123` like so.
 * ```
 * const todoItemEntity = await TodoItemEntity.$hydrate(element, {id: '123'});
 * expect(todoItemEntity.$state)
 *   .toEqual({completed: false, text: 'sample task'});
 * ```
 *
 * In this cases there is no serialized state. For this reason the component executes the `$newState` method.
 *
 * ```
 * class TodoItemEntity extends Entity<TodoItemProps, TodoItem> {
 *   $qrl = QRL`./path/to/entity/TodoItem`;
 *   $type = 'todo';
 *   $keyProps = ['id'];
 *
 *   async $newState(props: TodoItemProps): Promise<TodoItem> {
 *     //  Execute code to create or look up the state.
 *   }
 * }
 * ```
 *
 * ## Release
 *
 * Finally, when the entity instance no longer needs to be associated with an element, it can be released.
 *
 * ```
 * todoItemEntity.$release()
 * ```
 *
 * This will remove the state from its element, resulting in the following HTML.
 *
 * ```
 * <div ::todo="./path/to/entity/TodoItem">
 * ```
 *
 * Note: `$release()` is not the same thing as deleting/destroying the data. It merely tells Qwik to
 * not serialize the state into the DOM/HTML.
 *
 * @public
 */
class Entity {
  constructor(element, props, state) {
    const entityType = getEntityType(this);
    this.$props = props;
    this.$state = state; // TODO: is this right?
    this.$element = element;
    this.$key = propsToKey(entityType, props);
    props && entityType.$attachEntity(element);
    props && entityType.$attachEntityState(element, props, null);
  }
  /**
   * A entity name.
   *
   * All entity instances of this type have this name.
   *
   * When entities are serialized each entity instance needs to have a unique name, which is a
   * combination of its `$type` name and its `Props` values, the keys of which are defined in `$keyProps`.
   *
   * ```
   * class MyEntity extends Entity<MyEntityProps, MyEntityState> {
   *   $qrl = QRL`./path/to/entity/MyEntity`;
   *   $type = 'myEntity';
   *   $keyProps = ['project', 'task'];
   * }
   * ```
   *
   * The above definition will result in attribute with a QRL pointer like so.
   * ```
   * <div ::myEntity="./path/to/entity/MyEntity">
   * ```
   */
  static get $type() {
    return this.$_name;
  }
  static set $type(name) {
    if (!name.startsWith('$')) {
      // Only do this for non-internal entities.
      const stack = new Error().stack;
      const frames = stack.split('\n');
      // 0: Error
      // 1:   at setter (this function)
      // 2:   at caller (this is what we are looking for)
      const base = getFilePathFromFrame(frames[2]);
      this.$config = getConfig(base);
      this.$_name = name;
    }
  }
  /**
   * Attach QRL definition of the `Entity` to an `Element`.
   *
   * Attaching a entity to an `Element` means that an attribute with the entity name (`$type`) is left
   * in DOM. This is later used when trying to resolve the entity.
   *
   * ```
   * class MyEntity extends Entity<MyProps, MyState> {
   *   $type = 'MyEntity';
   *   $qrl = QRL`somePath/MyEntity`;
   * }
   *
   * MyEntity.$attachEntity(element);
   * ```
   *
   * will result in:
   *
   * ```
   * <div ::my-entity="somePath/MyEntity">
   * ```
   *
   * @param element - Element where the entity definition should be attached.
   */
  // TODO: Is this the right name? we are not attaching, we are more like defining a provider
  static $attachEntity(element) {
    const entityType = this;
    if (!entityType.$type) {
      throw qError(310 /* Entity_no$type_entity */, entityType);
    }
    if (!entityType.$qrl) {
      throw qError(312 /* Entity_no$qrl_entity */, entityType);
    }
    const attributeName =
      '::' /* EntityProviderPrefix */ + fromCamelToKebabCase(entityType.$type);
    const currentQRL = element.getAttribute(attributeName);
    if (!currentQRL) {
      element.setAttribute(attributeName, String(entityType.$qrl));
    } else if (currentQRL != entityType.$qrl) {
      throw qError(
        313 /* Entity_nameCollision_name_currentQrl_expectedQrl */,
        entityType.$type,
        currentQRL,
        entityType.$qrl
      );
    }
  }
  /**
   * Attach entity instance state to an `Element`.
   *
   * Attaching a entity state to an `Element` means that the entity `Props` are serialized into
   * entity instance key and entity `State` is serialized into the entity value.
   *
   * ```
   * class MyEntity extends Entity<MyProps, MyState> {
   *   $type = 'MyEntity';
   *   static $keyProps = ['id'];
   *   $qrl = QRL`somePath/MyEntity`;
   * }
   *
   * MyEntity.$attachEntityState(element, {id:123}, {text: 'some text'});
   * ```
   *
   * will result in:
   *
   * ```
   * <div ::my-entity="somePath/MyEntity"
   *      my-entity:123="{text: 'some text'}">
   * ```
   *
   * @param element - Element where the entity definition should be attached.
   */
  static $attachEntityState(host, propsOrKey, state) {
    const entityType = this;
    entityType.$attachEntity(host);
    const key =
      typeof propsOrKey == 'string'
        ? propsOrKey
        : propsToKey(entityType, propsOrKey);
    if (!host.hasAttribute(String(key))) {
      host.setAttribute(
        String(key),
        state == null ? '' : JSON.stringify(state)
      );
    }
  }
  /**
   * Re-hydrate a entity instance.
   *
   * Re-hydration is the process of retrieving or creating a transitive instance of a entity
   * based on a entity `key`.
   *
   * There are these possible scenarios:
   * - `MyEntity.$hydrate(element, props, state)`:
   *   Create new entity (overriding any serialized `State` with the new `state`).
   * - `MyEntity.$hydrate(element, props)`: compute the entity `key` from props:
   *   - If `State` exists in the HTML/DOM for the `key`, use that.
   *   - If no `State` exists in HTML/DOM for the `key` invoke `Entity.$newState()`.
   *     - Possibly throw an error.
   *
   * @param element - Element to which the entity should be (or is) attached.
   * @param propsOrKey - Entity key either serialized to a string or in `Props` format.
   * @param state - Optional new state for the entity instance.
   * @returns `EntityPromise` which contains the `$key` property for synchronous retrieval.
   */
  static $hydrate(element, propsOrKey, state) {
    const entityType = this;
    const key =
      typeof propsOrKey == 'string'
        ? propsOrKey
        : propsToKey(entityType, propsOrKey);
    if (state) state.$key = key;
    const entityProviderKey = keyToEntityAttribute(key);
    if (!element.hasAttribute(entityProviderKey)) {
      this.$attachEntity(element);
    }
    const injector = getInjector(element);
    return injector.getEntity(key, state, this);
  }
  /**
   * Converts a serialized `EntityKey` into `EntityProps`.
   *
   * A `EntityKey` is formatted as: `<entityName>:<value1>:<value2>:...`.
   *
   * The purpose of the keys is to be globally unique identifiers in the application
   * so that entity instances can be identified. The keys are string representations
   * because it is important to be able to serialize the keys to HTML.
   *
   * Entity instances prefer to have a parsed version of the key as `EntityProps`.
   * A `EntityKey` contains values only, `EntityProps` are key/value pairs. This function uses
   * `Entity.$keyProps` to identify with which property each value should be associated with.
   *
   * @param key - the serialized `EntityKey` to parse to `EntityProps`.
   * @returns the parsed `EntityProps`.
   */
  static $keyToProps(key) {
    return keyToProps(this, key);
  }
  /**
   * Serialize `EntityProps` into a `EntityKey` string.
   *
   * A `EntityKey` is formatted as: `<entityName>:<value1>:<value2>:...`.
   *
   * The purpose of the keys is to be globally unique identifiers in the application
   * so that entity instances can be identified. The keys are string representations
   * because it is important to be able to serialize the keys to HTML.
   *
   * Entity instances prefer to have a parsed version of the key as `EntityProps`.
   * A `EntityKey` contains values only, `EntityProps` are key/value pairs. This function uses
   * `Entity.$keyProps` to identify with which property each value should be associated with.
   *
   * @param props - the parsed `EntityProps` to serialize.
   * @returns the serialized `EntityKey`.
   */
  static $propsToKey(props) {
    return propsToKey(this, props);
  }
  /**
   * Lazy loads code through QRL and invokes it.
   *
   * This method can be used inside entities to avoid loading the implementation of methods until
   * they are required.
   *
   * ```
   * class MyEntity extends Entity<MyEntityProps, MyEntityState> {
   *   $qrl = QRL`./path/to/entity/MyEntity`;
   *   $type = 'myEntity';
   *   $keyProps = ['project', 'task'];
   *
   *   async myUppercase(text: string): Promise<string> {
   *     return this.$invokeQRL(
   *         import.meta.url,
   *         QRL<(text: string) => string>`path_to_lazy_loaded_function`,
   *         text
   *       );
   *   }
   * }
   * ```
   *
   * @param qrl - QRL to the function to lazy load and execute.
   * @param args - arguments to pass to the QRL function.
   * @returns a Promise of the value returned from the invoked function.
   */
  async $invokeQRL(qrl, ...args) {
    const entity = getEntityType(this);
    const delegate = await qImport(entity.$config, qrl);
    return getInjector(this.$element).invoke(delegate, this, ...args);
  }
  /**
   * Invoked during hydration if state is not provide or can't be rehydrated from HTML/DOM.
   *
   * Lifecycle order:
   * - `new Entity(...)`
   * - `$newState(props)`: Invoked if no serialized state found in DOM.
   * - `$init()`
   * - Entity instance returned by the `Injector`.
   *
   * ```
   * class MyEntity extends Entity<MyEntityProps, MyEntityState> {
   *   $qrl = QRL`./path/to/entity/MyEntity`;
   *   $type = 'myEntity';
   *   $keyProps = ['project', 'task'];
   *
   *   async $newState(props: MyEntityProps): Promise<string> {
   *     // either compute new state OR call to the backend to retrieve it.
   *     return state;
   *   }
   * }
   * ```
   *
   * @param props - the `EntityProps` that identify the new instance of the entity.
   */
  $newState(keyProps) {
    const entityType = this.constructor;
    throw qError(
      306 /* Entity_noState_entity_props */,
      entityType.$type,
      keyProps
    );
  }
  /**
   * Lifecycle method invoked on hydration.
   *
   * After the entity creation and after the state is restored (either from DOM or by invoking
   * `$newState`) this method is invoked. The purpose of this method is to allow the entity
   * to compute any transient state.
   *
   * Lifecycle order:
   * - `new Entity(...)`
   * - `$newState(props)`: Invoked if no serialized state found in DOM.
   * - `$init()`
   * - Entity instance returned by the `Injector`.
   */
  async $init() {}
  /**
   * Release the entity.
   *
   * Releasing entity means that the transient entity instance is released from memory and it
   * becomes eligible for garbage collection. It also removes the entity state
   * from its associated element in the HTML/DOM.
   *
   * Releasing a entity does not imply that the state should be deleted on the backend.
   */
  $release() {
    const injector = getInjector(this.$element);
    const entityType = getEntityType(this);
    const key = propsToKey(entityType, this.$props);
    injector.releaseEntity(key);
  }
}
Entity.$config = null;
Entity.$_name = null;
/**
 * Order of properties in `Props` which define the entity key.
 *
 * A entity is uniquely identified by a key such as `myEntity:123:456`. The key consists
 * of `myEntity` which associates the key with a specific entity.
 *
 * For example:
 *
 * ```
 * <div ::myEntity="./path/to/entity/MyEntity"
 *      myEntity:123:456="{completed: false, text: 'sample task'}">
 * ```
 *
 * The key `myEntity:123:456` is associated with `myEntity` which is declared in `::myEntity`
 * attribute. The `123:456` are property values. In order for the key to be converted into
 * `Props` it is necessary to know what each of the values point to. `$keyProps` stores that
 * information.
 *
 * For example a entity defined like so:
 *
 * ```
 * class MyEntity extends Entity<MyEntityProps, MyEntityState> {
 *   $qrl = QRL`./path/to/entity/MyEntity`;
 *   $type = 'myEntity';
 *   $keyProps = ['project', 'task'];
 * }
 * ```
 *
 * Would result it `myEntity:123:456` to be convert to a `Props` of
 * `{project: '123', task: '456'}`. Notice that the `$keyProps` define
 * property names for the key value positions.
 */
// TODO: Throw error if `$keyProps` is not defined.
Entity.$keyProps = [];
/**
 * Retrieve the `EntityConstructor<SERVICE>` from the `Entity`
 * @param entity
 * @returns
 * @internal
 */
function getEntityType(entity) {
  if (!(entity instanceof Entity)) {
    throw qError(307 /* Entity_expected_obj */, entity);
  }
  const entityType = entity.constructor;
  if (entityType.$attachEntityState !== Entity.$attachEntityState) {
    throw qError(308 /* Entity_overridesConstructor_entity */, entity);
  }
  return entityType;
}
/**
 * @internal
 */
function isEntity(value) {
  return Object.prototype.hasOwnProperty.call(value, '$key');
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * `EventEntity` is only visible during event processing and can be used to retrieve `Event`
 * related information.
 *
 * @public
 */
class EventEntity extends Entity {
  constructor(element, event, url, props) {
    super(element, null, null);
    this.$key = EventEntity.KEY;
    this.event = event;
    this.url = url;
    this.props = props;
  }
}
EventEntity.$qrl = '';
EventEntity.$type = '$EventEntity';
EventEntity.$props = ['id'];
EventEntity.KEY = '$event:';

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
class EventInjector extends BaseInjector {
  constructor(element, event, url) {
    super(element);
    this.parentInjector = null;
    const props = {};
    qParams(url).forEach((value, key) => (props[key] = value));
    this.eventEntity = new EventEntity(element, event, url, props);
  }
  getParent() {
    const parent = this.parentInjector;
    if (parent) return parent;
    return (this.parentInjector = getClosestInjector(this.element, false));
  }
  getComponent(componentType) {
    return this.getParent().getComponent(componentType);
  }
  getEntity(entityKey, state, entityType) {
    if (entityKey === EventEntity.KEY) return this.eventEntity;
    return this.getParent().getEntity(entityKey, state, entityType);
  }
  getEntityState(propsOrKey) {
    return this.getParent().getEntityState(propsOrKey);
  }
  releaseEntity(key) {
    var _a;
    return (_a = this.getParent()) === null || _a === void 0
      ? void 0
      : _a.releaseEntity(key);
  }
  serialize() {
    throw qError(207 /* Injector_eventInjectorNotSerializable */);
  }
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Create an event handler with injected values.
 *
 * The function creates an `EventHandler` which is used by `qwikloader.js` to dispatch events.
 * The function supports passing in a component and providers.
 *
 * Creating an event handler. Assume an event is declared in template like so:
 * ```
 * <button on:click="./pathToHandler">Click me</button>
 * ```
 *
 * Then the `./pathToHandler` can be declared like so:
 * ```
 * export default injectEventHandler(
 *   MyComponent,
 *   provideEvent(),
 *   function(this: MyComponent, event: Event) {
 *     alert('Thanks for clicking me');
 *   }
 * );
 * ```
 *
 * @param args - a list consisting of Component type, zero or more providers and a handler function.
 * @returns A promise of handler function return.
 * @public
 */
function injectEventHandler(...args) {
  const injectedFunction = args.pop();
  const thisType = (injectedFunction.$thisType = args.shift());
  injectedFunction.$inject = args;
  qDev && (injectedFunction.$debugStack = new Error());
  const eventHandler = function eventHandler(element, event, url) {
    var _a;
    const eventInjector = new EventInjector(element, event, url);
    return Promise.resolve(
      (thisType &&
        ((_a = eventInjector.getParent()) === null || _a === void 0
          ? void 0
          : _a.getComponent(thisType))) ||
        null
    ).then(self => eventInjector.invoke(injectedFunction, self));
  };
  eventHandler.$delegate = injectedFunction;
  return eventHandler;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Provide the event Element.
 *
 * The function provides element associated with the request.
 *
 * Assume this DOM
 * ```
 * <button on:click="./pathToHandler">Click me</button>
 * ```
 *
 * Then the `./pathToHandler` can be declared like so:
 * ```
 * export default injectEventHandler(
 *   null,
 *   provideElement(),
 *   function(element: Element) {
 *     expect(element).toEqual(<button>Click me</button>);
 *   }
 * }
 * ```
 * @public
 */
function provideElement() {
  return function elementProvider(injector) {
    return injector.element;
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Provide the event.
 *
 * The function provides event associated with the request.
 *
 * Assume this DOM
 * ```
 * <button on:click="./pathToHandler">Click me</button>
 * ```
 *
 * Then the `./pathToHandler` can be declared like so:
 * ```
 * export default injectEventHandler(
 *   null,
 *   provideEvent(),
 *   function(event: Event) {
 *     expect(event).toEqual({name: 'click', ...});
 *   }
 * }
 * ```
 * @public
 */
function provideEvent() {
  return async function eventProvider(injector) {
    return (await injector.getEntity(EventEntity.KEY)).event;
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Inject result of url expression evaluation.
 *
 * Qwik supports URLs that embed parameters into the hash such as: `./somePath#foo?key1=value1`.
 * While injecting values as string is useful, it is often more useful to treat the value as an
 * expression and evaluate it.
 *
 * Example: Retrieving value of an input element
 *
 * ```
 * <input on:keyup="./MyComponent_input_okKeyup#?userInput=.target.value">
 * ```
 *
 * In the above example the URL can't contain the value of the input. But instead
 * the URL contains where the value can be read from. `.target.value` is input value
 * when evaluated from `event` as `event.target.value`.
 *
 * file: `MyComponent_input.onKeyup.ts`
 *
 * ```
 * export default inject(
 *   null,
 *   provideQrlExp<string>('userInput'),
 *   function (userInput: string) {
 *     // userInput contains `input.value`.
 *   }
 * );
 * ```
 *
 * The handler above is not interested where the `userInput` comes from. The author of the
 * template is in control where the handler should be located and than how to read the `value`
 * from the input.
 *
 * @param parameterName - The name of the parameter to read (and evaluate) from the `QRL` params.
 * @public
 */
function provideQrlExp(parameterName) {
  return async function qrlExpProvider(injector) {
    const eventEntity = await injector.getEntity(EventEntity.KEY);
    const value = eventEntity.props[parameterName];
    if (value == null) {
      throw qError(
        5 /* Core_missingProperty_name_props */,
        parameterName,
        eventEntity.props
      );
    }
    switch (value.charAt(0)) {
      case '.':
        let obj = eventEntity.event;
        qDev && assertDefined(obj);
        const parts = value.substr(1).split('.');
        while (parts.length && obj) {
          obj = obj[parts.shift()];
        }
        return obj;
      default:
        throw qError(500 /* Provider_unrecognizedFormat_value */, value);
    }
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Provide the event URL property.
 *
 * The function provides URL associated with the request.
 *
 * Assume this DOM
 * ```
 * <button on:click="./pathToHandler?foo=bar">Click me</button>
 * ```
 *
 * Then the `./pathToHandler` can be declared like so:
 * ```
 * export default injectEventHandler(
 *   null,
 *   provideURLProp('foo'),
 *   function(value: string) {
 *     expect(value).toEqual('bar');
 *   }
 * }
 * ```
 * @param parameterName - URL parameter name to provide.
 * @public
 */
function provideUrlProp(parameterName) {
  return async function eventPropProvider(injector) {
    return (
      (await injector.getEntity(EventEntity.KEY)).props[parameterName] || null
    );
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function flattenArray(array, dst) {
  // Yes this function is just Array.flat, but we need to run on old versions of Node.
  if (!dst) dst = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (Array.isArray(item)) {
      flattenArray(item, dst);
    } else {
      dst.push(item);
    }
  }
  return dst;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Converts a tree of Promises into a flat array of resolved promise values.
 *
 * @param tree - array of arrays of values or promises of values.
 * @returns a `Promise` of array of values.
 */
function flattenPromiseTree(tree) {
  return Promise.all(tree).then(values => {
    const flatArray = flattenArray(values);
    for (let i = 0; i < flatArray.length; i++) {
      if (isPromise(flatArray[i])) {
        return flattenPromiseTree(flatArray);
      }
    }
    return flatArray;
  });
}
function isPromise(value) {
  return value instanceof Promise;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Tag template literal factory.
 *
 * SEE: `QRL` interface for details
 *
 * Intended usage:
 * ```
 * QRL`./path_to_resource`
 * ```
 * @public
 */
function QRL(messageParts, ...expressions) {
  let url = '';
  for (let i = 0; i < messageParts.length; i++) {
    const part = messageParts[i];
    url += part;
    if (i < expressions.length) {
      url += expressions[i];
    }
  }
  qDev &&
    assertEqual(
      !!url.match(/^[.|/|\w+:]/),
      true,
      "Expecting URL to start with '.', '/', '<protocol>:'. Was: " + url
    );
  if (qDev) {
    verifyQrl(new Error('Invalid import: ' + url), url);
  }
  return url;
}
async function verifyQrl(error, url) {
  const stack = error.stack;
  if (!stack) return Promise.resolve(null);
  const frames = stack.split('\n');
  // 0: Error
  // 1:   at QRL (this function)
  // 2:   at caller (this is what we are looking for)
  let frame = '';
  for (let i = 2; i < frames.length; i++) {
    frame = frames[i];
    if (frame.indexOf('/node_modules/vm2/') === -1) {
      // It is possible that VM2 library was use to load us, in which case we should skip it.
      break;
    }
  }
  const base = getFilePathFromFrame(frame);
  const config = getConfig(base);
  try {
    const module = qImport(config, url);
    if (isPromise(module)) {
      return module.catch(e => {
        return Promise.reject(makeError(e));
      });
    }
    return module;
  } catch (e) {
    throw new Error(makeError(e));
  }
  function makeError(e) {
    return `QRL-ERROR: '${url}' is not a valid import.
Resolved URL: ${toUrl(base, url)}
    Base URL: ${config.baseURI}
      CONFIG: ${JSON.stringify(config)}
       STACK: ${stack}\n  => ${e}`;
  }
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Decorate a function for injection by associating providers.
 *
 * Invoking a function through an injector allows the function to declaratively list a set
 * of values which are needed by the function. The values can be entities, components or props.
 * The advantage of declarative approach is that the injector takes care of locating the values
 * as well as delaying the invocation until all the values have been resolved and or lazy loaded.
 *
 * Unlike `injectMethod`, `injectFunction` does not allow specifying of the `this` type.
 *
 * see: `injectMethod`
 *
 * # Example:
 *
 * ```
 * export const myFn =  injectFunction(
 *   provideEntity<MyEntity>(provideComponentProp('$myKey')),
 *   function (todoEntity: TodoEntity) {
 *     ...
 *   }
 * );
 *
 * await injector.invoke(myFn);
 * ```
 *
 * @param args - Takes a list of `async` functions. The 0 through n-1 functions compute a value
 *   and the last function is invoked as a handler with the compute value. The last function
 *   is invoked with `this` pointing to the transient component state.
 * @public
 */
function injectFunction(...args) {
  const fn = args.pop();
  fn.$thisType = null;
  fn.$inject = args;
  qDev && (fn.$debugStack = new Error());
  return fn;
}
/**
 * Decorate a method for injection by associating providers.
 *
 * Invoking a method through an injector allows the function to declaratively list a set
 * of values which are needed by the method. The values can be entities, components or props.
 * The advantage of declarative approach is that the injector takes care of locating the values
 * as well as delaying the invocation until all the values have been resolved and or lazy loaded.
 *
 * Unlike `injectFunction`, `injectMethod` allows specifying of the `this` type. `this` type is
 * only used for verification and it is not used for lookup. `injectMethod` is meant to be used with
 * `Injector.invoke`.
 *
 * see: `injectFunction`
 *
 * # Example:
 *
 * ```
 * export const greet = injectMethod(
 *   GreeterEntity,
 *   provideEntity<MyEntity>(provideComponentProp('$myKey')),
 *   function (this: GreeterEntity, myEntity: MyEntity) {
 *     return (this.$state.greeting = this.$props.salutation + ' ' + this.$props.name + '!');
 *   }
 * );
 *
 * await injector.invoke(greet, new GreetEntity());
 * ```
 *
 * @param args - Takes a list of `async` functions. The 0 through n-1 functions compute a value
 *   and the last function is invoked as a handler with the compute value. The last function
 *   is invoked with `this` pointing to the transient component state.
 * @public
 */
function injectMethod(...args) {
  const fn = args.pop();
  fn.$thisType = args.shift();
  fn.$inject = args;
  qDev && (fn.$debugStack = new Error());
  return fn;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Provide `Injector`.
 *
 * Provides a reference to the closet `Injector`. This may be the `EventInjector`
 * if the provider was use in an `injectEventHandler`.
 *
 * @public
 */
function provideInjector() {
  return async function resolveInjector(injector) {
    return injector;
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Provide a function for lazy retrieving the provider.
 *
 * Example:
 * ```
 * export default injectEventHandler(
 *   provideProviderOf(provideEntity<MyEntity>('myentity:123')),
 *   async function(myEntityProvider: () => MyEntity) {
 *     if (someCondition) {
 *       const entity = await myEntityProvider();
 *     }
 *   }
 * )
 * ```
 *
 * @param provider - `Provider` to wrap in lazy provider.
 * @public
 */
function provideProviderOf(provider) {
  return async function resolveInjector(injector) {
    return () => {
      return Promise.resolve(provider(injector));
    };
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Serialize the `Injector` state into the DOM.
 *
 * This function locates all of the injectors (which are child of `element`) and serializes their
 * state into the DOM. This prepares the DOM for dehydration.
 *
 *
 * @param element - `Element` (or `Document`) where injectors should be found and serialized.
 * @public
 */
function serializeState(element) {
  if (isHtmlElement(element)) {
    serializeNode(element);
  }
  element
    .querySelectorAll('[\\:]' /* InjectorSelector */)
    .forEach(serializeNode);
}
function serializeNode(element) {
  const injector = getInjector(element, false);
  if (injector) {
    injector.serialize();
  }
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
const EMPTY_ARRAY = [];
if (qDev) {
  Object.freeze(EMPTY_ARRAY);
}
const EMPTY_OBJ = {};
if (qDev) {
  Object.freeze(EMPTY_OBJ);
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
class JSXNode_ {
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props || EMPTY_OBJ;
    this.children = children;
  }
}
function isJSXNode(node) {
  return node instanceof JSXNode_;
}
/**
 * Factory function used by the TSX.
 *
 * ```
 * return <div></div>;
 * ```
 *
 * gets translated to
 * ```
 * return jsxFactory('div', {});
 * ```
 *
 * By TypeScript
 *
 *
 * @param tag - Tag name (or another function producing JSX)
 * @param props - Properties of the JSX node
 * @param children - Children of the JSX node
 * @returns `JSXNode`
 * @public
 */
function jsxFactory(tag, props, ...children) {
  return new JSXNode_(tag, props, flattenArray(children));
}
/**
 * Declares a JSX Qwik component.
 *
 * For lazy loading it is important that a top-level component does not have direct reference to
 * a child component. Doing so would pull in tho child component and prevent the child component
 * to be lazy loaded (it would be eagerly loaded with the parent.) For this reason the JSX needs
 * to contain boundaries which demarcate where the components are so that lazy loading can happen.
 *
 * ```
 * <div>
 *   parent component
 *   <child decl:template="./path_to_child_component_render_function" />
 * </div>
 * ```
 *
 * The `decl:template` attribute provides information to the rendering system how to descend to the
 * child component.
 *
 * Writing the above code would be cumbersome because the user of component would have to know
 * what the component QRL is. This would make it hard to change the URL in future refactorings.
 * It would also make it hard to guarantee type safety.
 *
 * For this reason `jsxDeclareComponent` provides a facade for the component host element.
 *
 * ```
 * export const Child = jsxDeclareComponent<HeaderProps>(
 *    QRL`path_to_render_function`,  // value of the '::' attribute
 *    'child'                        // Optional (defaults to 'div') name of the host element
 * );
 * ```
 *
 * With the above code it is now possible to rewrite the example in a more natural format.
 *
 * ```
 * <div>
 *   parent component
 *   <Child />
 * </div>
 * ```
 *
 * @param componentTemplateQrl - QRL pointing to the component's render function.
 * @param tagName - Host element tag name.
 * @param hostProps - Optional additional properties which should be included on the host element.
 * @returns
 * @public
 */
function jsxDeclareComponent(componentTemplateQrl, tagName = 'div', hostProps) {
  return function(props) {
    return jsxFactory(
      tagName,
      Object.assign(
        Object.assign(
          { ['decl:template' /* ComponentTemplate */]: componentTemplateQrl },
          hostProps
        ),
        props
      )
    );
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Remove `childNode` from `parentNode` and return `nextSibling`
 */
function removeNode(parentNode, childNode) {
  const nextSibling = childNode.nextSibling;
  parentNode.removeChild(childNode);
  return nextSibling;
}
/**
 * Replace `existingNode` with `newNode`
 */
function replaceNode(parentNode, existingNode, newNode) {
  parentNode.insertBefore(newNode, existingNode);
  existingNode && parentNode.removeChild(existingNode);
  return newNode;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Apply Props to Element
 *
 * @param element -`Element` onto which attributes need to be applied.
 * @param props -`Props` to apply
 * @param detectChanges - if true, ready the previous attributes to see if any have changed.
 */
function applyAttributes(element, props, detectChanges) {
  let changesDetected = false;
  if (props) {
    let bindMap = null;
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const kebabKey = fromCamelToKebabCase(key);
        const value = props[key];
        if (key === 'decl:entity' /* Entity */) {
          applyEntityProviders(value, element);
        } else if (key === 'decl:template' /* ComponentTemplate */) {
          setAttribute(element, 'decl:template' /* ComponentTemplate */, value);
        } else if (key.startsWith('on:' /* EventPrefix */)) {
          setAttribute(element, kebabKey, value);
        } else {
          if (key.startsWith('$')) {
            addToBindMap(
              stringify(value),
              bindMap || (bindMap = new Map()),
              key
            );
          } else if (detectChanges) {
            if (element.getAttribute(kebabKey) !== value) {
              setAttribute(element, key, value, kebabKey);
              changesDetected = true;
            }
          } else {
            setAttribute(element, key, value, kebabKey);
          }
        }
      }
    }
    if (bindMap) {
      changesDetected = updateBindMap(element, bindMap) || changesDetected;
    }
  }
  return changesDetected;
}
function applyEntityProviders(value, element) {
  if (Array.isArray(value)) {
    value.forEach(entity => {
      if (
        typeof (entity === null || entity === void 0
          ? void 0
          : entity.$attachEntity) === 'function'
      ) {
        entity.$attachEntity(element);
      } else {
        throw qError(602 /* Render_expectingEntity_entity */, entity);
      }
    });
  } else {
    throw qError(603 /* Render_expectingEntityArray_obj */, value);
  }
}
/**
 * Keep track of `bind:*`  attributes so that they can be correctly update.
 *
 * The tricky part is that the key/value are reversed in the `bind:*` attributes so that
 * we can `querySelectAll` on the attribute.
 *
 * This means that we need to add/remove/join attributes if more than one binding changes.
 */
function addToBindMap(stringValue, bindMap, key) {
  qDev && assertValidDataKey(stringValue);
  const bindKey =
    'bind:' /* BindPrefix */ +
    (stringValue ? fromCamelToKebabCase(stringValue) : '');
  let existingKeys = bindMap.get(bindKey);
  if (existingKeys) {
    existingKeys += '|' + key;
  } else {
    existingKeys = key;
  }
  bindMap.set(bindKey, existingKeys);
}
/**
 * Apply the `bind:*` updates to the DOM.
 *
 * @returns `true` if changes were detected.
 */
function updateBindMap(element, bindMap) {
  let changesDetected = false;
  for (let i = 0, attrs = element.attributes; i < attrs.length; i++) {
    const attr = attrs[i];
    const key = attr.name;
    if (key.startsWith('bind:' /* BindPrefix */)) {
      const expectedValue = bindMap.get(key);
      if (expectedValue != null) {
        bindMap.delete(key);
        if (attr.value === expectedValue) {
          // if expected is same as actual we can remove it from map
          bindMap.delete(key);
        } else {
          changesDetected = true;
          attr.value = expectedValue;
        }
      } else {
        changesDetected = true;
        element.removeAttribute(key);
        i--;
      }
    }
  }
  bindMap.forEach((v, k) => {
    changesDetected = true;
    element.setAttribute(k, v);
  });
  return changesDetected;
}
/**
 * Set attribute on a DOM element.
 *
 * This function understand `class`, `style` as well as `input` attributes.
 * @internal
 */
function setAttribute(element, key, value, kebabKey) {
  if (key == 'class') {
    element.setAttribute('class', stringifyClassOrStyle(value, true));
  } else if (key == 'style') {
    element.setAttribute('style', stringifyClassOrStyle(value, false));
  } else if (value == null || value === false) {
    element.removeAttribute(key);
  } else if (key === 'innerHTML' || key === 'innerText') {
    element.setAttribute(kebabKey, '');
    element[key] = value;
  } else if (element.tagName === 'INPUT' && key.indexOf(':') == -1) {
    element.setAttribute(key, String(value));
    element[key] = value;
  } else {
    element.setAttribute(key, String(value));
  }
}
/**
 * Turn an `Array` or object literal into a `class` or `style`
 *
 * @param obj `string`, `Array` or object literal
 * @param isClass `true` if expecting `class` output
 * @returns `string`
 */
function stringifyClassOrStyle(obj, isClass) {
  if (obj == null) return '';
  if (typeof obj == 'object') {
    let text = '';
    let sep = '';
    if (Array.isArray(obj)) {
      if (!isClass) {
        throw qError(601 /* Render_unsupportedFormat_obj_attr */, obj, 'style');
      }
      for (let i = 0; i < obj.length; i++) {
        text += sep + obj[i];
        sep = ' ';
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          text += isClass ? (value ? sep + key : '') : sep + key + ':' + value;
          sep = isClass ? ' ' : ';';
        }
      }
    }
    return text;
  }
  return String(obj);
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Place at the root of the component View to allow binding of attributes on the Host element.
 *
 * ```
 * <Host someAttr={someExpr} someAttrStatic="value">
 *   View content implementation.
 * </Host>
 * ```
 *
 * Qwik requires that components have [docs/HOST_ELEMENTS.ts] so that it is possible to have
 * asynchronous loading point. Host element is not owned by the component. At times it is
 * desirable for the component to render additional attributes on the host element. `<Host>`
 * servers that purpose.
 * @public
 */
function Host() {
  // TODO: QError?
  throw newError('Should not execute');
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Render JSX into a host element reusing DOM nodes when possible.
 *
 * @param host - Host element which will act as a parent to `jsxNode`. When
 *     possible the rendering will try to reuse existing nodes.
 * @param jsxNode - JSX to render
 * @param overrideDocument - optional document used for creating new DOM nodes
 *     (used global `document` otherwise)
 * @public
 */
async function jsxRender(host, jsxNode, overrideDocument) {
  const waitOn = [];
  let firstChild = host.firstChild;
  while (firstChild && firstChild.nodeType > 8 /* COMMENT_NODE */) {
    firstChild = firstChild.nextSibling;
  }
  visitJSXNode(overrideDocument || document, waitOn, host, firstChild, jsxNode);
  // TODO[type]: don't know how to make the type system happy, cheating with `any` cast.
  return flattenPromiseTree(waitOn);
}
function visitJSXNode(document, waitOn, parentNode, existingNode, jsxNode) {
  if (!jsxNode) return null;
  if (isPromise(jsxNode)) {
    waitOn.push(
      jsxNode.then(jsxNode => {
        const waitOn = [];
        const node = visitJSXNode(
          document,
          waitOn,
          parentNode,
          existingNode,
          jsxNode
        );
        // TODO: cast seems suspect;
        node && waitOn.push(node);
        // TODO: needs test
        return waitOn;
      }, writeErrorToDom(parentNode))
    );
    return null;
  } else if (typeof jsxNode.tag === 'string') {
    // String literal
    return visitJSXDomNode(document, waitOn, parentNode, existingNode, jsxNode);
  } else if (jsxNode.tag === Host) {
    return visitJSXHostNode(
      document,
      waitOn,
      parentNode,
      existingNode,
      jsxNode
    );
  } else if (typeof jsxNode.tag === 'function') {
    // Symbol reference
    return visitJSXFactoryNode(
      document,
      waitOn,
      parentNode,
      existingNode,
      jsxNode
    );
  } else if (jsxNode.tag === null) {
    // Fragment
    return visitJSXFragmentNode(
      document,
      waitOn,
      parentNode,
      existingNode,
      jsxNode
    );
  }
  throw qError(600 /* Render_unexpectedJSXNodeType_type */, jsxNode.tag);
}
function visitJSXDomNode(document, waitOn, parentNode, existingNode, jsxNode) {
  const jsxTag = jsxNode.tag;
  let reconcileElement;
  let inputPropChangesDetected = false;
  if (isDomElementWithTagName(existingNode, jsxTag)) {
    // We already have the right element so we need to reuse it.
    reconcileElement = existingNode;
  } else {
    // No match we need to create a new DOM element (and remove the old one)
    reconcileElement = replaceNode(
      parentNode,
      existingNode,
      document.createElement(jsxTag)
    );
    inputPropChangesDetected = true;
  }
  const componentUrl = getComponentTemplateUrl(jsxNode);
  const shouldDetectChanges = !!componentUrl;
  inputPropChangesDetected =
    applyAttributes(reconcileElement, jsxNode.props, shouldDetectChanges) ||
    inputPropChangesDetected;
  if (componentUrl && inputPropChangesDetected) {
    // TODO: better way of converting string to QRL.
    jsxRenderComponent(
      reconcileElement,
      componentUrl,
      waitOn,
      jsxNode.props,
      document
    );
  }
  if (
    !componentUrl &&
    !('innerHTML' in jsxNode.props || 'innerText' in jsxNode.props)
  ) {
    // we don't process children if we have a component, as component is responsible for projection.
    visitChildren(
      document,
      waitOn,
      reconcileElement,
      reconcileElement.firstChild,
      jsxNode.children
    );
  }
  return reconcileElement;
}
function jsxRenderComponent(
  hostElement,
  componentUrl,
  waitOn,
  props,
  overrideDocument = document
) {
  // we need to render child component only if the inputs to the component changed.
  const componentOrPromise = qImport(hostElement, componentUrl);
  if (isPromise(componentOrPromise)) {
    waitOn.push(
      componentOrPromise.then(component => {
        const waitOn = [hostElement];
        visitJSXComponentNode(
          overrideDocument,
          waitOn,
          hostElement,
          hostElement.firstChild,
          component,
          props
        );
        return waitOn;
      })
    );
  } else {
    visitJSXComponentNode(
      overrideDocument,
      waitOn,
      hostElement,
      hostElement.firstChild,
      componentOrPromise,
      props
    );
  }
}
function visitJSXComponentNode(
  document,
  waitOn,
  parentNode,
  existingNode,
  component,
  props
) {
  if (!props) props = EMPTY_OBJ;
  const injector = getInjector(parentNode);
  injector.elementProps = props;
  const componentJsxNode = injector.invoke(component, undefined, props);
  return visitJSXNode(
    document,
    waitOn,
    parentNode,
    existingNode,
    componentJsxNode
  );
}
function getComponentTemplateUrl(jsxNode) {
  const props = jsxNode.props || EMPTY_OBJ;
  return props['decl:template' /* ComponentTemplate */] || null;
}
function visitJSXFactoryNode(
  document,
  waitOn,
  parentNode,
  existingNode,
  jsxNode
) {
  return visitJSXNode(
    document,
    waitOn,
    parentNode,
    existingNode,
    jsxNode.tag(jsxNode.props)
  );
}
function visitJSXHostNode(document, waitOn, parentNode, existingNode, jsxNode) {
  applyAttributes(parentNode, jsxNode.props, false);
  visitChildren(document, waitOn, parentNode, existingNode, jsxNode.children);
  return parentNode;
}
function visitJSXFragmentNode(
  document,
  waitOn,
  parentNode,
  existingNode,
  jsxNode
) {
  return visitChildren(
    document,
    waitOn,
    parentNode,
    existingNode,
    jsxNode.children
  );
}
function visitChildren(
  document,
  waitOn,
  parentNode,
  existingNode,
  jsxChildren
) {
  if (jsxChildren) {
    for (let i = 0; i < jsxChildren.length; i++) {
      const jsxChild = jsxChildren[i];
      if (isJSXNode(jsxChild)) {
        existingNode = visitJSXNode(
          document,
          waitOn,
          parentNode,
          existingNode,
          jsxChild
        );
      } else if (jsxChild == null) {
        // delete
        if (existingNode) {
          existingNode = removeNode(parentNode, existingNode);
        }
      } else {
        // stringify
        if (isTextNode(existingNode)) {
          existingNode.textContent = String(jsxChild);
        } else {
          replaceNode(
            parentNode,
            existingNode,
            document.createTextNode(String(jsxChild))
          );
        }
      }
      existingNode =
        (existingNode === null || existingNode === void 0
          ? void 0
          : existingNode.nextSibling) || null;
    }
  }
  while (existingNode) {
    existingNode = removeNode(parentNode, existingNode);
  }
  return null;
}
// TODO: docs
// TODO: tests
function writeErrorToDom(node) {
  return function(error) {
    // TODO: needs test
    // eslint-disable-next-line no-console
    console.error('ERROR:', error);
    const element = node;
    const pre = element.ownerDocument.createElement('pre');
    element.appendChild(pre);
    pre.textContent = String(error);
    return Promise.reject(error);
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function isElement(value) {
  return value && !!value.ownerDocument;
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Marks `Component` or `Entity` dirty.
 *
 * # `Component`
 *
 * Marking a `Component` dirty means that the component needs to be re-rendered.
 *
 * Marking a `Component` dirty will add `on:q-render` attribute to each component which `markDirty`
 * is invoked on..
 *
 * # `Entity`
 *
 * Marking a `Entity` dirty means that all `Component`s which depend on the instance of the `Entity`
 * identified by its `EntityKey` are also marked dirty.
 *
 * To get a list of `Component`s a `querySelectorAll` is used to retrieve all `Components` which have
 * `bind:entity-key` attribute and subsequently mark them with an `on:q-render` attribute.
 *
 * This in effect propagates any changes to the service to all components which depend upon the
 * service as an input.
 *
 * # Reconciliation
 *
 * Marking a `Component` or `Entity` dirty will schedule a `requestAnimationFrame` to reconcile
 * the `Component`s which are marked with `on:q-render` attribute. When `requestAnimationFrame` fires
 * a `querySelectorAll` is used to retrieve all components marked with `on:q-render` attribute.
 * The `jsxRender` method is invoked on them, and the `on:q-render` attribute cleared.
 *
 * @param componentEntityOrElement - `Component`, `Entity` or `Element` instance to mark dirty.
 * @returns a `Promise` of all of the `HostElements` which were re-rendered.
 * @public
 */
function markDirty(componentEntityOrElement) {
  if (isEntity(componentEntityOrElement)) {
    return markEntityDirty(componentEntityOrElement);
  } else if (isComponent(componentEntityOrElement)) {
    return markComponentDirty(componentEntityOrElement);
  } else if (isElement(componentEntityOrElement)) {
    return markElementDirty(componentEntityOrElement);
  } else {
    throw qError(
      604 /* Render_expectingEntityOrComponent_obj */,
      componentEntityOrElement
    );
  }
}
/**
 * @internal
 */
function markComponentDirty(component) {
  return markElementDirty(component.$host);
}
/**
 * @internal
 */
function markElementDirty(host) {
  const document = host.ownerDocument;
  host.setAttribute(
    'on:q-render' /* EventRender */,
    host.getAttribute('decl:template' /* ComponentTemplate */)
  );
  const promise = document.$qScheduledRender;
  if (isPromise(promise)) {
    return promise;
  }
  return scheduleRender(document);
}
/**
 * @internal
 */
function markEntityDirty(entity) {
  const key = entity.$key;
  const document = entity.$element.ownerDocument;
  let foundListener = false;
  document
    .querySelectorAll(toAttrQuery('bind:' /* BindPrefix */ + key))
    .forEach(componentElement => {
      const qrl = componentElement.getAttribute(
        'decl:template' /* ComponentTemplate */
      );
      if (!qrl) {
        throw qError(
          606 /* Render_bindNeedsComponent_key_element */,
          key,
          componentElement
        );
      }
      foundListener = true;
      componentElement.setAttribute('on:q-render' /* EventRender */, qrl);
    });
  return foundListener ? scheduleRender(document) : Promise.resolve([]);
}
/**
 * Convert the key to an attribute query that can be used in `querySelectorAll()`.
 * @internal
 */
function toAttrQuery(key) {
  return '[' + key.replace(/[:.\-_]/g, v => '\\' + v) + ']';
}
/**
 * Schedule rendering for the future.
 *
 * Multiple calls to this function result in a single `rAF` scheduling creating coalescence.
 *
 * Rendering is achieved by `querySelectorAll` looking for all `on:q-render` attributes.
 *
 * @returns a `Promise` of all of the `HostElements` which were re-rendered.
 * @internal
 */
function scheduleRender(document) {
  const promise = document.$qScheduledRender;
  if (promise) return promise;
  const requestAnimationFrame = document.defaultView.requestAnimationFrame;
  if (!requestAnimationFrame) {
    throw qError(605 /* Render_noRAF */);
  }
  return (document.$qScheduledRender = new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      const waitOn = [];
      const componentHosts = document.querySelectorAll(
        '[on\\:q-render]' /* EventRenderSelector */
      );
      const hosts = [];
      componentHosts.forEach(host => {
        host.removeAttribute('on:q-render' /* EventRender */);
        const qrl = host.getAttribute('decl:template' /* ComponentTemplate */);
        qDev && assertString(qrl);
        const props = extractPropsFromElement(host);
        jsxRenderComponent(host, qrl, waitOn, props, document);
        hosts.push(host);
      });
      flattenPromiseTree(waitOn).then(() => {
        document.$qScheduledRender = null;
        resolve(hosts);
      }, reject);
    });
  }));
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
function provideComponentState(throwIfNotFound = true) {
  return function componentStateProvider(injector) {
    const state = injector.element.getAttribute(':.');
    if (state == null) {
      if (throwIfNotFound) {
        throw qError(402 /* Component_needsState */);
      } else {
        return undefined;
      }
    }
    return JSON.parse(state);
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Returns `Props` of component.
 *
 * This function finds the closest host-element and than collects its attributes
 * into `Props`.
 * See:
 * - STATE.md
 * - `inject`
 * - `Component`
 * - `Component.$inject`
 *
 * Example:
 * ```
 * export default inject(
 *   null,
 *   provideComponentProps<MyProps>()
 *   function (myProps: MyProps) {
 *     ...
 *   }
 * );
 * ```
 * @public
 */
function provideComponentProps() {
  return function propsComponentProvider(injector) {
    const props = injector.elementProps;
    qDev && assertDefined(props);
    return props;
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Provides the Component Property.
 *
 * The Component Properties are read from `Injector` or from the host-element
 * if the `Injector` does not have them.
 *
 * The attributes follow these rules:
 * - all attributes which contain `:` are ignored as these are control attributes and
 *   never part of bindings.
 * - All property keys are translated from kebab to camel case (with first char being
 *   lowercase)
 * - `bind:` properties are stored reversed. (Binding id is stored in attribute key and
 *   binding property is stored in attribute value. [Reason: so that Qwik can use
 *   `querySelectAll` to find all binding ids in case of an update.])
 *
 * Example
 * ```
 * <div prop-a="ValueA"
 *       bind:id="propB;propC"
 *       :="ignore">
 * ```
 * Results in:
 * ```
 * {
 *   propA: 'ValueA',
 *   propB: 'id',
 *   propC: 'id',
 * }
 * ```
 *
 * @param name - Name of the property to inject.
 * @returns
 * @public
 */
function provideComponentProp(name) {
  return function componentPropProvider(injector) {
    const elementInjector = getClosestInjector(injector.element);
    const props = elementInjector.elementProps;
    const value = props[name];
    if (value == null) {
      throw qError(
        404 /* Component_noProperty_propName_props_host */,
        name,
        elementInjector.elementProps,
        elementInjector.element
      );
    }
    return value;
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Provide a entity for a given key.
 *
 * Provide the entity from current or parent injector walking the DOM parents.
 * The injector starts with the current element and first looks for a serialized state
 * associated with the key. If not found it than looks for a factory definition on the same
 * element. If neither is found than the request is sent to the parent injector.
 *
 * ## Example
 *
 * Assume that `foo:123` has been requested and assume tha the search starts at `<child>`.
 * ```
 * <parent foo:123="{text: 'bar'}" :foo="qrlToFooEntity">
 *   <child bar:123 :bar="qrlToBarEntity"/>
 * </parent>
 * ```
 *
 * First injector looks at `<child>`, but neither `foo:123` nor `:foo` attribute can be found
 * so the injector delegates to `<parent>`. `<parent>` does have `foo:123` and so a entity is
 * materialized. Injector reads the state from the `<parent>`'s `foo:123` attribute and class
 * from `:foo` property. It then `new`es up `Foo` class with deserialized `{text: 'bar'}` state.
 *
 * If `foo:432` is requested instead, then the process is repeated. The difference is that
 * once the injector gets to `<parent>` it can't find `foo:432` but it can retrieve `:foo`
 * which can be instantiated and then `Foo.$newState` can be invoke to compute the state.
 *
 * @param entityKey - The key of state which should be retrieved.
 * @public
 */
function provideEntity(id) {
  return async function resolveEntity(injector) {
    const elementInjector = getClosestInjector(injector.element);
    const [idResolved] = await resolveArgs(injector, id);
    return elementInjector.getEntity(idResolved);
  };
}

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Provide the entity state for a given entity key.
 *
 * This provider behaves same as `provideEntity` except it returns state only. The main advantage
 * of this provider is that it is faster in the case when state can be deserialized from the DOM.
 * This is usually useful for render methods which don't need to mutate the state for rendering.
 *
 * @param entityKey - The key of state which should be retrieved. (This can be another provider)
 * @public
 */
function provideEntityState(id) {
  return async function resolveEntityState(injector) {
    const elementInjector = getClosestInjector(injector.element);
    const [idResolved] = await resolveArgs(injector, id);
    return elementInjector.getEntityState(idResolved);
  };
}

export {
  Component,
  Entity,
  EventEntity,
  Host,
  QRL,
  dirname,
  emitEvent,
  entityStateKey,
  getInjector,
  injectEventHandler,
  injectFunction,
  injectMethod,
  jsxDeclareComponent,
  jsxFactory,
  jsxRender,
  markDirty,
  provideComponentProp,
  provideComponentProps,
  provideComponentState,
  provideElement,
  provideEntity,
  provideEntityState,
  provideEvent,
  provideInjector,
  provideProviderOf,
  provideQrlExp,
  provideUrlProp,
  qImport,
  serializeState,
  setConfig,
  toEntityKey
};
