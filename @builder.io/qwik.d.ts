import { QRL as QRL_2 } from 'client/import/qrl.js';

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
export declare class Component<PROPS, STATE> {
    /**
     * Pointer to template to verify that the component is attached to the right DOM location.
     */
    static $templateQRL: QRL;
    static $new<COMP extends Component<any, any>>(this: {
        $templateQRL: QRL;
        new (...args: any[]): COMP;
    }, hostElement: Element): Promise<COMP>;
    /**
     * Component's host element.
     *
     * See HOST_ELEMENT.md for details
     */
    $host: Element;
    /**
     * Components serializable state.
     *
     * When application is de-hydrated only the component's state is serialized. For this reason
     * the state needs to contain all of the information necessary to rebuild the component.
     *
     * IMPORTANT: State must be JSON serializable!
     */
    $state: STATE;
    /**
     * Component's `Props`.
     *
     * Component is declared in the DOM like so `<MyComponent propA="valueA" ...>`. The attributes of
     * the component are it's properties and get converted int `Props` which is stored in this
     * property for convenience.
     */
    $props: PROPS;
    constructor(hostElement: Element, props: PROPS, state: STATE | null);
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
    $init(): Promise<void> | void;
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
    $newState(props: PROPS): Promise<STATE> | STATE;
}

/**
 * Component Constructor.
 *
 * Given:
 * ```
 * class Greeter extends Component<GreeterProps, GreeterState> {
 *   ...
 * }
 * ```
 * Then `ComponentConstructor<Greeter>` will return type which is compatible with `Greeter`.
 *
 *
 * @public
 */
export declare interface ComponentConstructor<COMP extends Component<any, any>> {
    $templateQRL: QRL;
    new (hostElement: Element, props: ComponentPropsOf<COMP>, state: ComponentStateOf<COMP> | null): COMP;
}

/**
 * Return `Props` of `Component` Type.
 *
 * Given:
 * ```
 * class Greeter extends Component<GreeterProps, GreeterState> {
 *   ...
 * }
 * ```
 * Then `ComponentPropsOf<Greeter>` will return `GreeterProps` type.
 *
 * @public
 */
export declare type ComponentPropsOf<SERVICE extends Component<any, any>> = SERVICE extends Component<infer PROPS, any> ? PROPS : never;

/**
 * Return `State` of `Component` Type.
 *
 * Given:
 * ```
 * class Greeter extends Component<GreeterProps, GreeterState> {
 *   ...
 * }
 * ```
 * Then `ComponentStateOf<Greeter>` will return `GreeterState` type.
 *
 * @public
 */
export declare type ComponentStateOf<SERVICE extends Component<any, any>> = SERVICE extends Component<any, infer STATE> ? STATE : never;

/**
 * Represents a class constructor.
 *
 * This type is often used when Qwik needs to refer to classes constructors.
 * @public
 */
export declare interface ConcreteType<T, ARGS extends any[] = [...any]> extends Function {
    new (...args: ARGS): T;
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
export declare function dirname(path: string): string;

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
export declare function emitEvent(element: HTMLElement, event: Event, url: URL): Promise<any>;

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
export declare class Entity<PROPS, STATE> {
    private static $config;
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
    static get $type(): string;
    static set $type(name: string);
    private static $_name;
    /**
     * The QRL location of this Entity type.
     *
     * When entities are serialized it is necessary to leave a pointer to location where the entity
     * can be lazy loaded from. `$qrl` serves that purpose.
     *
     * ```
     * class MyEntity extends Entity<MyEntityProps, MyEntityState> {
     *   $qrl = QRL`./path/to/entity/MyEntity`;
     *   $type = 'myEntity';
     *   $keyProps = ['project', 'task'];
     * }
     * ```
     *
     * The above definition will result in all instances of this entity to be encoded with
     * `myEntity` name.
     * ```
     * <div ::myEntity="./path/to/entity/MyEntity"
     *      myEntity:123:456="{completed: false, text: 'sample task'}">
     * ```
     */
    static $qrl: QRL;
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
    static $keyProps: string[];
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
    static $attachEntity<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, element: Element): void;
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
    static $attachEntityState<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, host: Element, propsOrKey: EntityPropsOf<SERVICE> | EntityKey, state: EntityStateOf<SERVICE> | null): void;
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
    static $hydrate<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, element: Element, propsOrKey: EntityPropsOf<SERVICE> | EntityKey, state?: EntityStateOf<SERVICE>): EntityPromise<SERVICE>;
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
    static $keyToProps<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, key: EntityKey): EntityPropsOf<SERVICE>;
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
    static $propsToKey<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, props: EntityPropsOf<SERVICE>): EntityKey;
    readonly $element: Element;
    readonly $props: PROPS;
    readonly $state: STATE;
    readonly $key: EntityKey<any>;
    constructor(element: Element, props: PROPS, state: STATE | null);
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
    $invokeQRL<ARGS extends any[], RET>(qrl: QRL<(...args: ARGS) => RET>, ...args: ARGS): Promise<RET>;
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
    $newState(keyProps: PROPS): Promise<STATE>;
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
    $init(): Promise<void>;
    /**
     * Release the entity.
     *
     * Releasing entity means that the transient entity instance is released from memory and it
     * becomes eligible for garbage collection. It also removes the entity state
     * from its associated element in the HTML/DOM.
     *
     * Releasing a entity does not imply that the state should be deleted on the backend.
     */
    $release(): void;
}

/**
 * Entity Constructor.
 * @public
 */
export declare interface EntityConstructor<SERVICE extends Entity<any, any> = any> {
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
    readonly $type: string;
    /**
     * The QRL location of this Entity type.
     *
     * When entities are serialized it is necessary to leave a pointer to location where the entity
     * can be lazy loaded from. `$qrl` serves that purpose.
     *
     * ```
     * class MyEntity extends Entity<MyEntityProps, MyEntityState> {
     *   $qrl = QRL`./path/to/entity/MyEntity`;
     *   $type = 'myEntity';
     *   $keyProps = ['project', 'task'];
     * }
     * ```
     *
     * The above definition will result in all instances of this entity to be encoded with
     * `myEntity` name.
     * ```
     * <div ::myEntity="./path/to/entity/MyEntity"
     *      myEntity:123:456="{completed: false, text: 'sample task'}">
     * ```
     */
    readonly $qrl: QRL;
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
    readonly $keyProps: string[];
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
    $attachEntity<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, element: Element): void;
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
    $attachEntityState<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, host: Element, propsOrKey: EntityPropsOf<SERVICE> | EntityKey, state: EntityStateOf<SERVICE> | null): void;
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
    $hydrate<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, element: Element, propsOrKey: EntityPropsOf<SERVICE> | EntityKey, state?: EntityStateOf<SERVICE>): EntityPromise<SERVICE>;
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
    $keyToProps<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, key: EntityKey<SERVICE>): EntityPropsOf<SERVICE>;
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
    $propsToKey<SERVICE extends Entity<any, any>>(this: {
        new (...args: any[]): SERVICE;
    }, props: EntityPropsOf<SERVICE>): EntityKey;
    new (hostElement: Element, props: any, // TODO: should be: EntityPropsOf<SERVICE>,
    state: any): SERVICE;
}

/**
 * String representation of the entity key.
 *
 * A entity is uniquely identified by its props. Props is an object of key/value pairs which is
 * used to look up the entity. When referring to entity in DOM it is necessary to serialize the
 * Props into a unique strings which is a valid DOM attribute. To do that the Prop values are
 * concatenated into a `EntityKey` like so `<entity_name>:<value1>:<value2>:...`. The order
 * of values is determined by the `Entity.$keyProps` property.
 *
 * When Entity is working with the Props it is more connivent to use the deserialized version of
 * the `EntityKey` which is Props.
 *
 * See: `Entity.$keyProps`
 *
 * Example:
 *
 * ```
 * interface MyProps {
 *   id: string;
 * }
 *
 * class MyEntity extends Entity<MyProps, {}> {
 *   $qrl = QRL`./path/to/entity/MyEntity`;
 *   $type = 'myEntity';
 *   $keyProps = ['id'];
 * }
 *
 * expect(MyEntity.$propsToKey({id: 123})).toEqual('my-entity:123');
 * expect(MyEntity.$keyToProps('my-entity:123')).toEqual({id: 123});
 * ```
 *
 * @public
 */
export declare interface EntityKey<SERVICE = Entity<any, any>> {
    __brand__: SERVICE;
}

/**
 * `Promise` which resolves to a `Entity` instance but is extended with its `EntityKey`.
 *
 * @public
 */
export declare interface EntityPromise<SERVICE extends Entity<any, any>> extends Promise<SERVICE> {
    /**
     * The `EntityKey` associated with the current `Entity` instance.
     *
     * Normally one can retrieve `$key` from a `Entity` instance. In the case of the `Promise`
     * it may not be convenient to wait for the `Promise` to resolve, in which case retrieving
     * `$key` synchronously is more convenient.
     */
    $key: EntityKey<SERVICE>;
}

/**
 * Returns `Props` type of `Entity`.
 *
 * Given:
 * ```
 * class MyEntity extends Entity<MyProps, MyState> {
 *   ...
 * }
 *
 * const myEntity: MyEntity = ...;
 * ```
 * Then `EntityPropsOf<MyEntity>` returns `MyProps`.
 * @public
 */
export declare type EntityPropsOf<SERVICE extends Entity<any, any>> = SERVICE extends Entity<infer PROPS, any> ? PROPS : never;

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
export declare function entityStateKey<SERVICE extends Entity<any, any>>(value: SERVICE | EntityStateOf<SERVICE>): EntityKey<SERVICE>;

/**
 * Returns `State` type of `Entity`.
 *
 * Given:
 * ```
 * class MyEntity extends Entity<MyProps, MyState> {
 *   ...
 * }
 *
 * const myEntity: MyEntity = ...;
 * ```
 * Then `EntityStateOf<MyEntity>` returns `MyState`.
 * @public
 */
export declare type EntityStateOf<SERVICE extends Entity<any, any>> = SERVICE extends Entity<any, infer STATE> ? STATE : never;

/**
 * `EventEntity` is only visible during event processing and can be used to retrieve `Event`
 * related information.
 *
 * @public
 */
export declare class EventEntity extends Entity<any, any> {
    static $qrl: QRL;
    static $type: string;
    static $props: string[];
    static KEY: EntityKey<EventEntity>;
    /**
     * Current `Event`.
     */
    event: Event;
    /**
     * `URL` used to load the current code.
     */
    url: URL;
    /**
     * `Props` extracted from the `url`.
     */
    props: Props;
    constructor(element: Element, event: Event, url: URL, props: Props);
}

/**
 * @public
 */
export declare interface EventHandler<SELF, ARGS extends any[], RET> {
    (element: HTMLElement, event: Event, url: URL): Promise<RET>;
    $delegate: InjectedFunction<SELF, ARGS, [], RET>;
}

/**
 * Gets (or creates) an `Injector` at a particular DOM `Element`.
 *
 * If an element has an injector it is marked with `:` to designate it. This information
 * is used during serialization to locate all of the `Injector`s and serialize them.
 *
 * See: `serializeState`
 *
 * @param element -`Element` where the injector should be retrieved (or created)
 * @param create - Should the function lazy create the injector or just return `null`
 * @public
 */
export declare function getInjector(element: Element): Injector;

/** @public */
export declare function getInjector(element: Element, create: false): Injector | null;

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
export declare function Host(): JSXNode<any>;

/**
 * After rendering completes the `jsxRender` asynchronously returns a list of host elements
 * rendered asynchronously.
 * @public
 */
export declare type HostElements = Element[];

/**
 * A function returned by `inject` which contains provider information for that function.
 *
 * The function instance is same as the one which was passed into the inject with
 * provider information attached to the function which allows injector to invoke it.
 * @public
 */
export declare interface InjectedFunction<SELF, ARGS extends any[], REST extends any[], RET> {
    /**
     * A list of providers which are needed to satisfy the functions parameters.
     */
    $inject: Providers<ARGS>;
    /**
     * A type of `this` which needs to be passed in. This is used for error checking only.
     */
    $thisType: ConcreteType<SELF> | null;
    /**
     * Debug stack which points to where the `inject` was invoked. This is useful
     * for reporting errors. When the inject is invoked, if a provider throws an
     * error it is not clear where the provider was configured. This property does
     * provide the configuration information.
     */
    $debugStack?: Error;
    /**
     * Manual invocation of the function. (Useful mainly for tests)
     */
    (this: SELF, ...args: [...ARGS, ...REST]): RET;
}

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
export declare function injectEventHandler<SELF, ARGS extends any[], RET>(...args: [
    {
        $templateQRL: QRL;
        new (hostElement: Element, props: any, state: any): SELF;
    } | null,
    ...ARGS,
    (this: SELF, ...args: [...ProviderReturns<ARGS>]) => RET
]): EventHandler<SELF, ARGS, RET>;

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
export declare function injectFunction<ARGS extends any[], REST extends any[], RET>(...args: [...ARGS, (...args: [...ProviderReturns<ARGS>, ...REST]) => RET]): InjectedFunction<null, ARGS, REST, RET>;

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
export declare function injectMethod<SELF, ARGS extends any[], REST extends any[], RET>(...args: [
    ConcreteType<SELF>,
    ...ARGS,
    (this: SELF, ...args: [...ProviderReturns<ARGS>, ...REST]) => RET
]): InjectedFunction<SELF, ARGS, REST, RET>;

/**
 * Interface for looking up components, entities, properties from the DOM `Element`s.
 *
 * `Injector` is used as a look up context and factory for components, entities and properties.
 * `Injector`s are marked with `:` attribute in the DOM. `Injector`s are responsible
 * for hydrating and serializing the state of the components and entities.
 *
 * See: `injector.md`
 * @public
 */
export declare interface Injector {
    /**
     * `Element` with which this injector is associated with.
     *
     * For the `ElementInjector`, the `element` points to the element
     * for  which the `Injector` provides resolution.
     *
     * For the `EventInjector`, the `element` points to the `Element` which
     * received the event.
     */
    readonly element: Element;
    /**
     * Returns a parent `Injector`
     *
     * Injectors are attached to the DOM `Element`s. The `Injector` parent
     * is the closest injector following the DOM resolution rules.
     *
     * NOTE: If the DOM `Element` migrates locations it is possible for the
     * `Injector` to return different parents during its lifetime.
     */
    getParent(): Injector | null;
    /**
     * Resolve function parameters and than invoke the function.
     *
     * This method is intended to be used in conjunction with `inject()`.
     * The `inject()` specifies which providers should be provided to the
     * `fn` to satisfy its parameters.
     *
     * The providers can be asynchronous which is why `invoke` returns a promise.
     *
     * ```
     * const injectedFn = inject(
     *   ComponentOrEntityClass,
     *   provideSomething(),
     *   function(this: ComponentOrEntityClass, smt: Something) {
     *     return ...;
     *   }
     * );
     *
     * await injector.invoke(injectedFn);
     * ```
     *
     * @param fn - Function to resolve and invoke.
     * @param rest - Additional parameters to pass to function after the injected parameters.
     */
    invoke<SELF, PROVIDERS extends any[], REST extends any[], RET>(fn: InjectedFunction<SELF, PROVIDERS, REST, RET>, self?: SELF | null, ...rest: REST): Promise<RET>;
    /**
     * Retrieves the closest component to the current `element`.
     *
     * Use this function for retrieving/materialize a component instance.
     * The function starts with the current `element` and walks up until it finds
     * an element with `AttributeMarker.ComponentTemplate` which matches the
     * `componentType.$templateQRL`. Once found it than tries to retrieve existing
     * component (or materialize it from the `AttributeMarker.ComponentState`).
     * Because creation of component may involve invoking `Component.$newState`
     * which is asynchronous the method itself is asynchronous.
     *
     * @param componentType - Component type to retrieve.
     */
    getComponent<COMP extends Component<any, any>>(componentType: ComponentConstructor<COMP>): Promise<COMP>;
    /**
     * Retrieves the Element Properties.
     *
     * The Element Properties are read from `Injector` or from the element
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
     *      bind:id="propB;propC"
     *      :="ignore">
     * ```
     * Results in:
     * ```
     * {
     *   propA: 'ValueA',
     *   propB: 'id',
     *   propC: 'id',
     * }
     * ```
     */
    elementProps: Props;
    /**
     * Retrieve a entity for a given key.
     *
     * Retrieve the entity from current or parent injector walking the DOM parents.
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
     * @param state - Optional state which the entity should be set to upon retrieval.
     * @param entityType - Optional state type. If not provide the injector looks it up from the
     *        entity `QRL` attribute.
     */
    getEntity<SERVICE extends Entity<any, any>>(entityKey: EntityKey<SERVICE>, state?: EntityStateOf<SERVICE>, entityType?: EntityConstructor<SERVICE>): EntityPromise<SERVICE>;
    /**
     * Retrieve the entity state for a given entity key.
     *
     * This method behaves same as `getEntity` except it returns state only. The main advantage
     * of this method is that it is faster in the case when state can be deserialized from the DOM.
     * This is usually useful for render methods which don't need to mutate the state for rendering.
     *
     * @param propsOrKey - The key of state which should be retrieved.
     */
    getEntityState<SERVICE extends Entity<any, any>>(propsOrKey: EntityPropsOf<SERVICE> | EntityKey<SERVICE>): Promise<EntityStateOf<SERVICE>>;
    /**
     * Release the entity.
     *
     * Releasing entity means that the entity is released form memory and it
     * becomes eligible for garbage collection. It also removes the entity state
     * from the HTML/DOM.
     *
     * Releasing a entity does not imply that the state should be deleted on backend.
     */
    releaseEntity(key: EntityKey): void;
    /**
     * Serialize the state of the injector and its Component/Entities into DOM.
     */
    serialize(): void;
}

/**
 * Base JSX type containing universal properties.
 *
 * @public
 */
export declare interface JSXBase {
    /**
     * Declare `Injector` `Entity` providers.
     *
     * See: `Injector`, `Entity`
     */
    'decl:entity'?: EntityConstructor<any>[];
    /**
     * Declare component template.
     */
    'decl:template'?: QRL_2;
    /**
     * Event fired when DOM is first loaded
     */
    'on:qInit'?: QRL_2;
    'on:qInterval'?: QRL_2;
    'on:qTimeout'?: QRL_2;
    'on:qRender'?: QRL_2;
    class?: string | string[] | Record<string, boolean>;
    style?: string | Record<string, string>;
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
export declare function jsxDeclareComponent<P>(componentTemplateQrl: QRL, tagName?: string, hostProps?: {
    [property: string]: string | QRL;
}): (props: P & JSXBase) => JSXNode<string>;

/**
 * @public
 */
export declare type JSXFactory = (props: Props) => JSXNode<unknown>;

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
export declare function jsxFactory<T extends string | null | JSXFactory | unknown>(tag: T, props: Props, ...children: any[]): JSXNode<T>;

/**
 * @public
 */
export declare interface JSXNode<T extends string | null | JSXFactory | unknown> {
    tag: T;
    props: Props;
    children: Array<any>;
}

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
export declare function jsxRender(host: Element | Document, jsxNode: JSXNode<unknown>, overrideDocument?: Document): Promise<HostElements>;

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
export declare function markDirty(componentEntityOrElement: Component<any, any> | Entity<any, any> | Element): Promise<HostElements>;

/**
 * `Props` interface.
 *
 * @public
 */
export declare interface Props {
    [key: string]: string;
}

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
export declare function provideComponentProp(name: string): Provider<string>;

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
export declare function provideComponentProps<T>(): Provider<T>;

/**
 * Provider of Component State.
 *
 * Use this function in conjunction with `inject` to inject Component State into the
 * `InjectedFunction`.
 *
 * See:
 * - STATE.md
 * - `inject`
 * - `Component.$inject`
 *
 * Example:
 * ```
 * export default inject(
 *   null,
 *   provideComponentState<MyComponentState>()
 *   function (myComponentState: MyComponentState) {
 *     ...
 *   }
 * );
 * ```
 *
 * @param throwIfNotFound - Should an exception be thrown if state is not found.
 *   (By default the system throws an exception as most of the time state is required)
 * @public
 */
export declare function provideComponentState<S>(throwIfNotFound: false): Provider<S | undefined>;

/** @public */
export declare function provideComponentState<S>(throwIfNotFound?: boolean): Provider<S>;

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
export declare function provideElement(): Provider<Element>;

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
export declare function provideEntity<SERVICE extends Entity<any, any>>(id: EntityKey<SERVICE> | Provider<EntityKey<SERVICE>>): Provider<SERVICE>;

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
export declare function provideEntityState<SERVICE extends Entity<any, any>>(id: EntityKey<SERVICE> | Provider<EntityKey<SERVICE>>): Provider<EntityStateOf<SERVICE>>;

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
export declare function provideEvent(): Provider<Event>;

/**
 * Provide `Injector`.
 *
 * Provides a reference to the closet `Injector`. This may be the `EventInjector`
 * if the provider was use in an `injectEventHandler`.
 *
 * @public
 */
export declare function provideInjector(): Provider<Injector>;

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
export declare function provideProviderOf<T>(provider: Provider<T>): Provider<() => Promise<T>>;

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
export declare function provideQrlExp<T>(parameterName: string): Provider<T>;

/**
 * Interface describing a provider for `inject` function.
 *
 * A provider is a function which is invoked by the injector in order to satisfy the
 * injected functions parameters.
 *
 * There are many provider functions which come with Qwik, but it is expected that new
 * provider functions are created by the developer.
 *
 * ## Example of creating a provider
 *
 * ```
 * inject(
 *   provideGreeting('World'), // Assume we want to create providerGreeting
 *   function(greeting: string) {
 *     // Which injects a `string` => `Hello World';
 *     expect(greeting).to.equal('Hello World!');
 *   }
 * )
 *
 * // 1. As a convention all providers are named `provide_____`
 * // 2. As a convention a provider comes with a factory function which allows
 * //    configuration information to be passed in. In this case the `name` is
 * //    configurable.
 * // 3. Provider factories return `Provider<__ReturnType__>`.
 * function provideGreeting(name: string) {
 *   // 4. As a convention the provider function is called `____Provider`. The name
 *   //    is not strictly necessary but it makes stack traces cleaner, so it is strongly
 *   //    encouraged.
 *   return async function greetingProvider(injector: Injector) {
 *     // 5. You can use `injector` to retrieve other information useful for computing
 *     //    the result.
 *     // 6. The function can be `async` or sync. The injector will wait until all of the
 *     //    `Promise`s are resolved before the `InjectedFunction` is invoked.
 *     return `Hello ${name}!`;
 *   }
 * }
 * ```
 * @public
 */
export declare type Provider<T> = (injector: Injector) => T | Promise<T>;

/**
 * Returns type which matches provider returns.
 *
 * @public
 */
export declare type ProviderReturns<ARGS extends any[]> = {
    [K in keyof ARGS]: ARGS[K] extends Provider<infer U> ? U : never;
};

/**
 * Collection of Providers
 *
 * @public
 */
export declare type Providers<ARGS extends any[]> = {
    [K in keyof ARGS]: Provider<ARGS[K]>;
};

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
export declare function provideUrlProp(parameterName: string): Provider<string | null>;

/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/**
 * Qwik configuration information.
 *
 * @public
 */
export declare interface QConfig {
    /**
     * Base URI for resolving QRLs.
     */
    baseURI: string;
    protocol: QRLProtocolMap;
}

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
export declare function qImport<T>(base: Element | Document | string | QConfig, url: string | QRL<T> | URL): T | Promise<T>;

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
export declare function QRL<T = any>(messageParts: TemplateStringsArray, ...expressions: readonly any[]): QRL<T>;

/**
 * `QRL` (Qwik Resource Locator) represents an import which points to a lazy loaded resource.
 *
 * QRL is a URL pointing to a lazy loaded resource. Because the URLs need to be verified
 * (and possibly bundled) there needs to be a way to identify all URL strings in the system.
 * QRL serves the purpose of statically tagging all URLs for static code analysis and for
 * development mode verification.
 *
 * QRLs can use custom protocols for referring to URLs in a baseURI independent way. This is
 * useful for third-party libraries. Third-party libraries don't know what URL they will be
 * installed at. For this reason the third-party libraries do all QRLs prefixed with
 * custom protocol and rely on the application to configure such protocol.
 *
 * ```
 * QRL`someLibrary:/someImport`
 *
 * Q = {
 *   protocol: {
 *     'someLibrary': 'somePath'
 *   }
 * }
 * ```
 * The `QRL` looks up `foo` in `QRLProtocolMap` resulting in `somePath/someImport`.
 *
 * In dev mode (`qDev=true`) the `QRL` eagerly tries to resolve the URLs to verify that they
 * are correct. This is done to notify the developer of any mistakes as soon as possible.
 *
 * @public
 */
export declare interface QRL<T = any> {
    __brand__: 'QRL';
    __brand__T__: T;
}

/**
 * Protocol aliases.
 *
 * Given
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
 * @public
 */
export declare interface QRLProtocolMap {
    [protocol: string]: string;
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
export declare function serializeState(element: Element | Document): void;

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
export declare function setConfig(config: QConfig): void;

/**
 * Converts a `string` into `EntityKey` typed object.
 *
 * `EntityKey`s are `string`s at runtime. This function just adds type-safety.
 *
 * @param key - `string` representation of `EntityKey`
 * @returns `EntityKey`
 * @public
 */
export declare function toEntityKey<SERVICE extends Entity<any, any>>(key: string): EntityKey<SERVICE>;

export { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      a: JSXHTMLAnchorElement;
      abbr: JSXHTMLElement;
      address: JSXHTMLElement;
      area: JSXHTMLAreaElement;
      article: JSXHTMLElement;
      aside: JSXHTMLElement;
      b: JSXHTMLElement;
      base: JSXHTMLBaseElement;
      bdi: JSXHTMLElement;
      bdo: JSXHTMLElement;
      blockquote: JSXHTMLQuoteElement;
      body: JSXHTMLBodyElement;
      br: JSXHTMLBRElement;
      button: JSXHTMLButtonElement;
      canvas: JSXHTMLCanvasElement;
      caption: JSXHTMLTableCaptionElement;
      cite: JSXHTMLElement;
      code: JSXHTMLElement;
      col: JSXHTMLTableColElement;
      colgroup: JSXHTMLTableColElement;
      data: JSXHTMLDataElement;
      datalist: JSXHTMLDataListElement;
      dd: JSXHTMLElement;
      del: JSXHTMLModElement;
      details: JSXHTMLDetailsElement;
      dfn: JSXHTMLElement;
      dialog: JSXHTMLDialogElement;
      div: JSXHTMLDivElement;
      dl: JSXHTMLDListElement;
      dt: JSXHTMLElement;
      em: JSXHTMLElement;
      embed: JSXHTMLEmbedElement;
      fieldset: JSXHTMLFieldSetElement;
      figure: JSXHTMLElement;
      footer: JSXHTMLElement;
      form: JSXHTMLFormElement;
      h1: JSXHTMLHeadingElement;
      h2: JSXHTMLHeadingElement;
      h3: JSXHTMLHeadingElement;
      h4: JSXHTMLHeadingElement;
      h5: JSXHTMLHeadingElement;
      h6: JSXHTMLHeadingElement;
      head: JSXHTMLHeadElement;
      header: JSXHTMLElement;
      hgroup: JSXHTMLElement;
      hr: JSXHTMLHRElement;
      html: JSXHTMLHtmlElement;
      i: JSXHTMLElement;
      iframe: JSXHTMLIFrameElement;
      img: JSXHTMLImageElement;
      input: JSXHTMLInputElement;
      ins: JSXHTMLModElement;
      kbd: JSXHTMLElement;
      keygen: JSXHTMLUnknownElement;
      label: JSXHTMLLabelElement;
      legend: JSXHTMLLegendElement;
      li: JSXHTMLLIElement;
      link: JSXHTMLLinkElement;
      main: JSXHTMLElement;
      map: JSXHTMLMapElement;
      mark: JSXHTMLElement;
      menu: JSXHTMLMenuElement;
      menuitem: JSXHTMLUnknownElement;
      meta: JSXHTMLMetaElement;
      meter: JSXHTMLMeterElement;
      nav: JSXHTMLElement;
      noscript: JSXHTMLElement;
      object: JSXHTMLObjectElement;
      ol: JSXHTMLOListElement;
      optgroup: JSXHTMLOptGroupElement;
      option: JSXHTMLOptionElement;
      output: JSXHTMLOutputElement;
      p: JSXHTMLParagraphElement;
      param: JSXHTMLParamElement;
      pre: JSXHTMLPreElement;
      progress: JSXHTMLProgressElement;
      q: JSXHTMLQuoteElement;
      rb: JSXHTMLElement;
      rp: JSXHTMLElement;
      rt: JSXHTMLElement;
      rtc: JSXHTMLElement;
      ruby: JSXHTMLElement;
      s: JSXHTMLElement;
      samp: JSXHTMLElement;
      script: JSXHTMLScriptElement;
      section: JSXHTMLElement;
      select: JSXHTMLSelectElement;
      small: JSXHTMLElement;
      source: JSXHTMLSourceElement;
      span: JSXHTMLSpanElement;
      strong: JSXHTMLElement;
      style: JSXHTMLStyleElement;
      sub: JSXHTMLElement;
      summary: JSXHTMLElement;
      sup: JSXHTMLElement;
      table: JSXHTMLTableElement;
      tbody: JSXHTMLTableSectionElement;
      td: JSXHTMLTableCellElement;
      template: JSXHTMLTemplateElement;
      textarea: JSXHTMLTextAreaElement;
      tfoot: JSXHTMLTableSectionElement;
      th: JSXHTMLTableCellElement;
      thead: JSXHTMLTableSectionElement;
      time: JSXHTMLTimeElement;
      title: JSXHTMLTitleElement;
      tr: JSXHTMLTableRowElement;
      track: JSXHTMLTrackElement;
      u: JSXHTMLElement;
      ul: JSXHTMLUListElement;
      var: JSXHTMLElement;
      video: JSXHTMLVideoElement;
      wbr: JSXHTMLElement;
    }
    interface JSXHTMLAnchorElement extends JSXHTMLElement {
      charset?: string;
      coords?: string;
      download?: string;
      hash?: string;
      host?: string;
      hostname?: string;
      href?: string;
      hreflang?: string;
      name?: string;
      origin?: string;
      password?: string;
      pathname?: string;
      ping?: string;
      port?: string;
      protocol?: string;
      rel?: string;
      rev?: string;
      search?: string;
      shape?: string;
      target?: string;
      text?: string;
      type?: string;
      username?: string;
    }

    interface JSXHTMLElement extends JSXElement {
      'on:abort'?: QRL;
      'on:animationend'?: QRL;
      'on:animationiteration'?: QRL;
      'on:animationstart'?: QRL;
      'on:auxclick'?: QRL;
      'on:beforexrselect'?: QRL;
      'on:blur'?: QRL;
      'on:cancel'?: QRL;
      'on:canplay'?: QRL;
      'on:canplaythrough'?: QRL;
      'on:change'?: QRL;
      'on:click'?: QRL;
      'on:close'?: QRL;
      'on:contextmenu'?: QRL;
      'on:copy'?: QRL;
      'on:cuechange'?: QRL;
      'on:cut'?: QRL;
      'on:dblclick'?: QRL;
      'on:drag'?: QRL;
      'on:dragend'?: QRL;
      'on:dragenter'?: QRL;
      'on:dragleave'?: QRL;
      'on:dragover'?: QRL;
      'on:dragstart'?: QRL;
      'on:drop'?: QRL;
      'on:durationchange'?: QRL;
      'on:emptied'?: QRL;
      'on:ended'?: QRL;
      'on:error'?: QRL;
      'on:focus'?: QRL;
      'on:formdata'?: QRL;
      'on:gotpointercapture'?: QRL;
      'on:input'?: QRL;
      'on:invalid'?: QRL;
      'on:keydown'?: QRL;
      'on:keypress'?: QRL;
      'on:keyup'?: QRL;
      'on:load'?: QRL;
      'on:loadeddata'?: QRL;
      'on:loadedmetadata'?: QRL;
      'on:loadstart'?: QRL;
      'on:lostpointercapture'?: QRL;
      'on:mousedown'?: QRL;
      'on:mouseenter'?: QRL;
      'on:mouseleave'?: QRL;
      'on:mousemove'?: QRL;
      'on:mouseout'?: QRL;
      'on:mouseover'?: QRL;
      'on:mouseup'?: QRL;
      'on:mousewheel'?: QRL;
      'on:paste'?: QRL;
      'on:pause'?: QRL;
      'on:play'?: QRL;
      'on:playing'?: QRL;
      'on:pointercancel'?: QRL;
      'on:pointerdown'?: QRL;
      'on:pointerenter'?: QRL;
      'on:pointerleave'?: QRL;
      'on:pointermove'?: QRL;
      'on:pointerout'?: QRL;
      'on:pointerover'?: QRL;
      'on:pointerrawupdate'?: QRL;
      'on:pointerup'?: QRL;
      'on:progress'?: QRL;
      'on:ratechange'?: QRL;
      'on:reset'?: QRL;
      'on:resize'?: QRL;
      'on:scroll'?: QRL;
      'on:seeked'?: QRL;
      'on:seeking'?: QRL;
      'on:select'?: QRL;
      'on:selectionchange'?: QRL;
      'on:selectstart'?: QRL;
      'on:stalled'?: QRL;
      'on:submit'?: QRL;
      'on:suspend'?: QRL;
      'on:timeupdate'?: QRL;
      'on:toggle'?: QRL;
      'on:transitioncancel'?: QRL;
      'on:transitionend'?: QRL;
      'on:transitionrun'?: QRL;
      'on:transitionstart'?: QRL;
      'on:volumechange'?: QRL;
      'on:waiting'?: QRL;
      'on:webkitanimationend'?: QRL;
      'on:webkitanimationiteration'?: QRL;
      'on:webkitanimationstart'?: QRL;
      'on:webkittransitionend'?: QRL;
      'on:wheel'?: QRL;
      accessKey?: string;
      autocapitalize?: string;
      autofocus?: boolean;
      contentEditable?: string;
      dir?: string;
      draggable?: boolean;
      enterKeyHint?: string;
      hidden?: boolean;
      isContentEditable?: boolean;
      lang?: string;
      nonce?: string;
      offsetHeight?: number;
      offsetLeft?: number;
      offsetTop?: number;
      offsetWidth?: number;
      spellcheck?: boolean;
      tabIndex?: number;
      title?: string;
      translate?: boolean;
    }

    interface JSXElement extends JSXBase {
      'on:beforecopy'?: QRL;
      'on:beforecut'?: QRL;
      'on:beforepaste'?: QRL;
      'on:fullscreenchange'?: QRL;
      'on:fullscreenerror'?: QRL;
      'on:search'?: QRL;
      'on:webkitfullscreenchange'?: QRL;
      'on:webkitfullscreenerror'?: QRL;
      ariaAtomic?: string;
      ariaAutoComplete?: string;
      ariaBusy?: string;
      ariaChecked?: string;
      ariaColCount?: string;
      ariaColIndex?: string;
      ariaColSpan?: string;
      ariaCurrent?: string;
      ariaDescription?: string;
      ariaDisabled?: string;
      ariaExpanded?: string;
      ariaHasPopup?: string;
      ariaHidden?: string;
      ariaKeyShortcuts?: string;
      ariaLabel?: string;
      ariaLevel?: string;
      ariaLive?: string;
      ariaModal?: string;
      ariaMultiLine?: string;
      ariaMultiSelectable?: string;
      ariaOrientation?: string;
      ariaPlaceholder?: string;
      ariaPosInSet?: string;
      ariaPressed?: string;
      ariaReadOnly?: string;
      ariaRelevant?: string;
      ariaRequired?: string;
      ariaRoleDescription?: string;
      ariaRowCount?: string;
      ariaRowIndex?: string;
      ariaRowSpan?: string;
      ariaSelected?: string;
      ariaSetSize?: string;
      ariaSort?: string;
      ariaValueMax?: string;
      ariaValueMin?: string;
      ariaValueNow?: string;
      ariaValueText?: string;
      id?: string;
      innerHTML?: string;
    }

    interface JSXHTMLAreaElement extends JSXHTMLElement {
      alt?: string;
      coords?: string;
      download?: string;
      hash?: string;
      host?: string;
      hostname?: string;
      href?: string;
      noHref?: boolean;
      origin?: string;
      password?: string;
      pathname?: string;
      ping?: string;
      port?: string;
      protocol?: string;
      rel?: string;
      search?: string;
      shape?: string;
      target?: string;
      username?: string;
    }

    interface JSXHTMLBaseElement extends JSXHTMLElement {
      href?: string;
      target?: string;
    }

    interface JSXHTMLQuoteElement extends JSXHTMLElement {
      cite?: string;
    }

    interface JSXHTMLBodyElement extends JSXHTMLElement {
      'on:afterprint'?: QRL;
      'on:beforeprint'?: QRL;
      'on:beforeunload'?: QRL;
      'on:blur'?: QRL;
      'on:error'?: QRL;
      'on:focus'?: QRL;
      'on:hashchange'?: QRL;
      'on:languagechange'?: QRL;
      'on:load'?: QRL;
      'on:message'?: QRL;
      'on:messageerror'?: QRL;
      'on:offline'?: QRL;
      'on:online'?: QRL;
      'on:pagehide'?: QRL;
      'on:pageshow'?: QRL;
      'on:popstate'?: QRL;
      'on:rejectionhandled'?: QRL;
      'on:resize'?: QRL;
      'on:scroll'?: QRL;
      'on:storage'?: QRL;
      'on:unhandledrejection'?: QRL;
      'on:unload'?: QRL;
      aLink?: string;
      background?: string;
      bgColor?: string;
      link?: string;
      text?: string;
      vLink?: string;
    }

    interface JSXHTMLBRElement extends JSXHTMLElement {
      clear?: string;
    }

    interface JSXHTMLButtonElement extends JSXHTMLElement {
      disabled?: boolean;
      form?: string;
      formAction?: string;
      formEnctype?: string;
      formMethod?: string;
      formNoValidate?: boolean;
      formTarget?: string;
      name?: string;
      type?: string;
      validationMessage?: string;
      value?: string;
      willValidate?: boolean;
    }

    interface JSXHTMLCanvasElement extends JSXHTMLElement {
      height?: number;
      width?: number;
    }

    interface JSXHTMLTableCaptionElement extends JSXHTMLElement {
      align?: string;
    }

    interface JSXHTMLTableColElement extends JSXHTMLElement {
      align?: string;
      ch?: string;
      chOff?: string;
      span?: number;
      vAlign?: string;
      width?: string;
    }

    interface JSXHTMLDataElement extends JSXHTMLElement {
      value?: string;
    }

    interface JSXHTMLDataListElement extends JSXHTMLElement {}

    interface JSXHTMLModElement extends JSXHTMLElement {
      cite?: string;
      dateTime?: string;
    }

    interface JSXHTMLDetailsElement extends JSXHTMLElement {
      open?: boolean;
    }

    interface JSXHTMLDialogElement extends JSXHTMLElement {
      open?: boolean;
      returnValue?: string;
    }

    interface JSXHTMLDivElement extends JSXHTMLElement {
      align?: string;
    }

    interface JSXHTMLDListElement extends JSXHTMLElement {
      compact?: boolean;
    }

    interface JSXHTMLEmbedElement extends JSXHTMLElement {
      align?: string;
      height?: string;
      name?: string;
      src?: string;
      type?: string;
      width?: string;
    }

    interface JSXHTMLFieldSetElement extends JSXHTMLElement {
      disabled?: boolean;
      form?: string;
      name?: string;
      type?: string;
      validationMessage?: string;
      willValidate?: boolean;
    }

    interface JSXHTMLFormElement extends JSXHTMLElement {
      acceptCharset?: string;
      action?: string;
      autocomplete?: string;
      encoding?: string;
      enctype?: string;
      length?: number;
      method?: string;
      name?: string;
      noValidate?: boolean;
      target?: string;
    }

    interface JSXHTMLHeadingElement extends JSXHTMLElement {
      align?: string;
    }

    interface JSXHTMLHeadElement extends JSXHTMLElement {}

    interface JSXHTMLHRElement extends JSXHTMLElement {
      align?: string;
      color?: string;
      noShade?: boolean;
      size?: string;
      width?: string;
    }

    interface JSXHTMLHtmlElement extends JSXHTMLElement {
      version?: string;
    }

    interface JSXHTMLIFrameElement extends JSXHTMLElement {
      align?: string;
      allow?: string;
      allowFullscreen?: boolean;
      allowPaymentRequest?: boolean;
      contentDocument?: string;
      contentWindow?: string;
      csp?: string;
      frameBorder?: string;
      height?: string;
      loading?: string;
      longDesc?: string;
      marginHeight?: string;
      marginWidth?: string;
      name?: string;
      scrolling?: string;
      src?: string;
      srcdoc?: string;
      width?: string;
    }

    interface JSXHTMLImageElement extends JSXHTMLElement {
      align?: string;
      alt?: string;
      border?: string;
      complete?: boolean;
      crossOrigin?: string;
      currentSrc?: string;
      decoding?: string;
      height?: number;
      hspace?: number;
      isMap?: boolean;
      loading?: string;
      longDesc?: string;
      lowsrc?: string;
      name?: string;
      naturalHeight?: number;
      naturalWidth?: number;
      sizes?: string;
      src?: string;
      srcset?: string;
      useMap?: string;
      vspace?: number;
      width?: number;
      x?: number;
      y?: number;
    }

    interface JSXHTMLInputElement extends JSXHTMLElement {
      accept?: string;
      align?: string;
      alt?: string;
      autocomplete?: string;
      checked?: boolean;
      defaultChecked?: boolean;
      defaultValue?: string;
      dirName?: string;
      disabled?: boolean;
      files?: string;
      form?: string;
      formAction?: string;
      formEnctype?: string;
      formMethod?: string;
      formNoValidate?: boolean;
      formTarget?: string;
      height?: number;
      incremental?: boolean;
      indeterminate?: boolean;
      list?: string;
      max?: string;
      maxLength?: number;
      min?: string;
      minLength?: number;
      multiple?: boolean;
      name?: string;
      pattern?: string;
      placeholder?: string;
      readOnly?: boolean;
      required?: boolean;
      selectionDirection?: string;
      selectionEnd?: number;
      selectionStart?: number;
      size?: number;
      src?: string;
      step?: string;
      type?: string;
      useMap?: string;
      validationMessage?: string;
      value?: string;
      valueAsDate?: string;
      valueAsNumber?: number;
      webkitdirectory?: boolean;
      width?: number;
      willValidate?: boolean;
    }

    interface JSXHTMLUnknownElement extends JSXHTMLElement {}

    interface JSXHTMLLabelElement extends JSXHTMLElement {
      control?: string;
      form?: string;
      htmlFor?: string;
    }

    interface JSXHTMLLegendElement extends JSXHTMLElement {
      align?: string;
      form?: string;
    }

    interface JSXHTMLLIElement extends JSXHTMLElement {
      type?: string;
      value?: number;
    }

    interface JSXHTMLLinkElement extends JSXHTMLElement {
      as?: string;
      charset?: string;
      crossOrigin?: string;
      disabled?: boolean;
      href?: string;
      hreflang?: string;
      imageSizes?: string;
      imageSrcset?: string;
      integrity?: string;
      media?: string;
      rel?: string;
      rev?: string;
      sheet?: string;
      target?: string;
      type?: string;
    }

    interface JSXHTMLMapElement extends JSXHTMLElement {
      name?: string;
    }

    interface JSXHTMLMenuElement extends JSXHTMLElement {
      compact?: boolean;
    }

    interface JSXHTMLMetaElement extends JSXHTMLElement {
      content?: string;
      httpEquiv?: string;
      name?: string;
      scheme?: string;
    }

    interface JSXHTMLMeterElement extends JSXHTMLElement {
      high?: number;
      low?: number;
      max?: number;
      min?: number;
      optimum?: number;
      value?: number;
    }

    interface JSXHTMLObjectElement extends JSXHTMLElement {
      align?: string;
      archive?: string;
      border?: string;
      code?: string;
      codeBase?: string;
      codeType?: string;
      contentDocument?: string;
      contentWindow?: string;
      data?: string;
      declare?: boolean;
      form?: string;
      height?: string;
      hspace?: number;
      name?: string;
      standby?: string;
      type?: string;
      useMap?: string;
      validationMessage?: string;
      vspace?: number;
      width?: string;
      willValidate?: boolean;
    }

    interface JSXHTMLOListElement extends JSXHTMLElement {
      compact?: boolean;
      reversed?: boolean;
      start?: number;
      type?: string;
    }

    interface JSXHTMLOptGroupElement extends JSXHTMLElement {
      disabled?: boolean;
      label?: string;
    }

    interface JSXHTMLOptionElement extends JSXHTMLElement {
      defaultSelected?: boolean;
      disabled?: boolean;
      form?: string;
      index?: number;
      label?: string;
      selected?: boolean;
      text?: string;
      value?: string;
    }

    interface JSXHTMLOutputElement extends JSXHTMLElement {
      defaultValue?: string;
      form?: string;
      name?: string;
      type?: string;
      validationMessage?: string;
      value?: string;
      willValidate?: boolean;
    }

    interface JSXHTMLParagraphElement extends JSXHTMLElement {
      align?: string;
    }

    interface JSXHTMLParamElement extends JSXHTMLElement {
      name?: string;
      type?: string;
      value?: string;
      valueType?: string;
    }

    interface JSXHTMLPreElement extends JSXHTMLElement {
      width?: number;
    }

    interface JSXHTMLProgressElement extends JSXHTMLElement {
      max?: number;
      position?: number;
      value?: number;
    }

    interface JSXHTMLScriptElement extends JSXHTMLElement {
      async?: boolean;
      charset?: string;
      crossOrigin?: string;
      defer?: boolean;
      event?: string;
      events?: string;
      htmlFor?: string;
      integrity?: string;
      noModule?: boolean;
      src?: string;
      text?: string;
      type?: string;
    }

    interface JSXHTMLSelectElement extends JSXHTMLElement {
      autocomplete?: string;
      disabled?: boolean;
      form?: string;
      length?: number;
      multiple?: boolean;
      name?: string;
      required?: boolean;
      selectedIndex?: number;
      size?: number;
      type?: string;
      validationMessage?: string;
      value?: string;
      willValidate?: boolean;
    }

    interface JSXHTMLSourceElement extends JSXHTMLElement {
      height?: number;
      media?: string;
      sizes?: string;
      src?: string;
      srcset?: string;
      type?: string;
      width?: number;
    }

    interface JSXHTMLSpanElement extends JSXHTMLElement {}

    interface JSXHTMLStyleElement extends JSXHTMLElement {
      disabled?: boolean;
      media?: string;
      sheet?: string;
      type?: string;
    }

    interface JSXHTMLTableElement extends JSXHTMLElement {
      align?: string;
      bgColor?: string;
      border?: string;
      caption?: string;
      cellPadding?: string;
      cellSpacing?: string;
      frame?: string;
      rules?: string;
      summary?: string;
      tFoot?: string;
      tHead?: string;
      width?: string;
    }

    interface JSXHTMLTableSectionElement extends JSXHTMLElement {
      align?: string;
      ch?: string;
      chOff?: string;
      vAlign?: string;
    }

    interface JSXHTMLTableCellElement extends JSXHTMLElement {
      abbr?: string;
      align?: string;
      axis?: string;
      bgColor?: string;
      cellIndex?: number;
      ch?: string;
      chOff?: string;
      colSpan?: number;
      headers?: string;
      height?: string;
      noWrap?: boolean;
      rowSpan?: number;
      scope?: string;
      vAlign?: string;
      width?: string;
    }

    interface JSXHTMLTemplateElement extends JSXHTMLElement {}

    interface JSXHTMLTextAreaElement extends JSXHTMLElement {
      autocomplete?: string;
      cols?: number;
      defaultValue?: string;
      dirName?: string;
      disabled?: boolean;
      form?: string;
      maxLength?: number;
      minLength?: number;
      name?: string;
      placeholder?: string;
      readOnly?: boolean;
      required?: boolean;
      rows?: number;
      selectionDirection?: string;
      selectionEnd?: number;
      selectionStart?: number;
      textLength?: number;
      type?: string;
      validationMessage?: string;
      value?: string;
      willValidate?: boolean;
      wrap?: string;
    }

    interface JSXHTMLTimeElement extends JSXHTMLElement {
      dateTime?: string;
    }

    interface JSXHTMLTitleElement extends JSXHTMLElement {
      text?: string;
    }

    interface JSXHTMLTableRowElement extends JSXHTMLElement {
      align?: string;
      bgColor?: string;
      ch?: string;
      chOff?: string;
      rowIndex?: number;
      sectionRowIndex?: number;
      vAlign?: string;
    }

    interface JSXHTMLTrackElement extends JSXHTMLElement {
      default?: boolean;
      kind?: string;
      label?: string;
      readyState?: number;
      src?: string;
      srclang?: string;
    }

    interface JSXHTMLUListElement extends JSXHTMLElement {
      compact?: boolean;
      type?: string;
    }

    interface JSXHTMLVideoElement extends JSXHTMLMediaElement {
      'on:enterpictureinpicture'?: QRL;
      'on:leavepictureinpicture'?: QRL;
      disablePictureInPicture?: boolean;
      height?: number;
      playsInline?: boolean;
      poster?: string;
      videoHeight?: number;
      videoWidth?: number;
      webkitDecodedFrameCount?: number;
      webkitDisplayingFullscreen?: boolean;
      webkitDroppedFrameCount?: number;
      webkitSupportsFullscreen?: boolean;
      width?: number;
    }

    interface JSXHTMLMediaElement extends JSXHTMLElement {
      'on:encrypted'?: QRL;
      'on:waitingforkey'?: QRL;
      autoplay?: boolean;
      controls?: boolean;
      crossOrigin?: string;
      currentSrc?: string;
      currentTime?: number;
      defaultMuted?: boolean;
      defaultPlaybackRate?: number;
      disableRemotePlayback?: boolean;
      duration?: number;
      ended?: boolean;
      error?: string;
      loop?: boolean;
      mediaKeys?: string;
      muted?: boolean;
      networkState?: number;
      paused?: boolean;
      playbackRate?: number;
      preload?: string;
      preservesPitch?: boolean;
      readyState?: number;
      seeking?: boolean;
      sinkId?: string;
      src?: string;
      srcObject?: string;
      volume?: number;
      webkitAudioDecodedByteCount?: number;
      webkitVideoDecodedByteCount?: number;
    }
  }
}

/**
 * @internal
 */
// So that this file is treated as module.
export type JSX_IntrinsicElements = JSX.IntrinsicElements;
