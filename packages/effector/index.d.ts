
import {Stream} from 'most'

export type Subscriber<A> = {
 next(value: A): void,
 // error(err: Error): void,
 //complete(): void,
}

export type Subscription = {
 (): void,
 unsubscribe(): void,
}

export interface Event<E> {
 (payload: E): E;
 watch(watcher: (payload: E) => any): Subscription;
 map<T>(fn: (_: E) => T): Event<T>;
 filter<T>(fn: (_: E) => T | void): Event<T>;
 prepend<Before>(fn: (_: Before) => E): Event<Before>;
 subscribe(subscriber: Subscriber<E>): Subscription;
 to(store: Store<E>, _: void): Subscription;
 to<T>(store: Store<T>, reducer: (state: T, payload: E) => T): Subscription;
 getType(): string;
 epic<T>(fn: (_: Stream<E>) => Stream<T>): Event<T>;
}

export interface Effect<Params, Done, Fail = Error> {
 (
  payload: Params,
 ): {
  done(): Promise<{params: Params, result: Done}>,
  fail(): Promise<{params: Params, error: Fail}>,
  promise(): Promise<Done>,
 };
 done: Event<{params: Params, result: Done}>;
 fail: Event<{params: Params, error: Fail}>;
 use: {
  (asyncFunction: (params: Params) => Promise<Done>): void;
  getCurrent(): (params: Params) => Promise<Done>;
 };
 watch(watcher: (payload: Params) => any): Subscription;
 //map<T>(fn: (_: E) => T): Event<T>,
 prepend<Before>(fn: (_: Before) => Params): Event<Before>;
 subscribe(subscriber: Subscriber<Params>): Subscription;
 to(store: Store<Params>, _: void): Subscription;
 to<T>(store: Store<T>, reducer: (state: T, payload: Params) => T): Subscription;
 epic<T>(fn: (_: Stream<Params>) => Stream<T>): Event<T>;
 getType(): string;
}

export class Store<State> {
 reset(event: Event<any> | Effect<any, any, any>): this;
 dispatch(action: any): any;
 getState(): State;
 withProps<Props, R>(
  fn: (state: State, props: Props) => R,
 ): (props: Props) => R;
 map<T>(fn: (_: State) => T): Store<T>;
 on<E>(
  event: Event<E> | Effect<E, any, any>,
  handler: (state: State, payload: E) => (State | void),
 ): this;
 replaceReducer(_: any): any;
 subscribe(listner: any): Subscription;
 watch<E>(
  watcher: (state: State, payload: E, type: string) => any,
 ): Subscription;
 watch<E>(
  event: Event<E> | Effect<E, any, any>,
  watcher: (state: State, payload: E, type: string) => any,
 ): Subscription;
 thru<U>(fn: (store: Store<State>) => U): U;
 epic<T, S>(
  event: Event<T> | Effect<T, any, any>,
  fn: (event$: Stream<T>, store$: Stream<State>) => Stream<S>,
 ): void;
 displayName?: string;
}

export class Domain {
 onCreateEvent(hook: (newEvent: Event<any>) => any): Subscription;
 onCreateEffect(hook: (newEffect: Effect<any, any, any>) => any): Subscription;
 onCreateStore(hook: (newStore: Store<any>) => any): Subscription;
 onCreateDomain(hook: (newDomain: Domain) => any): Subscription;
 event<Payload>(name?: string): Event<Payload>;
 effect<Params, Done, Fail>(name?: string): Effect<Params, Done, Fail>;
 domain(name?: string): Domain;
 store<State>(defaultState: State): Store<State>;
 getType(): string;
}

export function createEvent<E>(eventName?: string): Event<E>

export function createEffect<Params, Done, Fail>(
 effectName?: string,
): Effect<Params, Done, Fail>

export function createStore<State>(defaultState: State): Store<State>

export function createStoreObject<State>(
 defaultState: State,
): Store<{
  [K in keyof State]: State[K] extends Store<infer U> ? U : any
}>

export function extract<
 State,
 NextState,
>(
 obj: Store<State>,
 extractor: (_: State) => NextState,
): Store<NextState>
export function createDomain(domainName?: string): Domain
export function createWrappedDomain(
 watcher: Function,
 name?: string,
 parent?: Domain,
): Domain

export function combine<R>(fn: () => R): Store<R>
export function combine<A, R>(
 a: Store<A>,
 fn: (a: A) => R,
): Store<R>
export function combine<A, B, R>(
 a: Store<A>,
 b: Store<B>,
 fn: (a: A, b: B) => R,
): Store<R>
export function combine<A, B, C, R>(
 a: Store<A>,
 b: Store<B>,
 c: Store<C>,
 fn: (a: A, b: B, c: C) => R,
): Store<R>
export function combine<A, B, C, D, R>(
 a: Store<A>,
 b: Store<B>,
 c: Store<C>,
 d: Store<D>,
 fn: (a: A, b: B, c: C, d: D) => R,
): Store<R>
export function combine<A, B, C, D, E, R>(
 a: Store<A>,
 b: Store<B>,
 c: Store<C>,
 d: Store<D>,
 e: Store<E>,
 fn: (a: A, b: B, c: C, d: D, e: E) => R,
): Store<R>
export function combine<A, B, C, D, E, F, R>(
 a: Store<A>,
 b: Store<B>,
 c: Store<C>,
 d: Store<D>,
 e: Store<E>,
 f: Store<F>,
 fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, R>(
 a: Store<A>,
 b: Store<B>,
 c: Store<C>,
 d: Store<D>,
 e: Store<E>,
 f: Store<F>,
 g: Store<G>,
 fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, H, R>(
 a: Store<A>,
 b: Store<B>,
 c: Store<C>,
 d: Store<D>,
 e: Store<E>,
 f: Store<F>,
 g: Store<G>,
 h: Store<H>,
 fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, H, I, R>(
 a: Store<A>,
 b: Store<B>,
 c: Store<C>,
 d: Store<D>,
 e: Store<E>,
 f: Store<F>,
 g: Store<G>,
 h: Store<H>,
 i: Store<I>,
 fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, H, I, J, R>(
 a: Store<A>,
 b: Store<B>,
 c: Store<C>,
 d: Store<D>,
 e: Store<E>,
 f: Store<F>,
 g: Store<G>,
 h: Store<H>,
 i: Store<I>,
 j: Store<J>,
 fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, H, I, J, K, R>(
 a: Store<A>,
 b: Store<B>,
 c: Store<C>,
 d: Store<D>,
 e: Store<E>,
 f: Store<F>,
 g: Store<G>,
 h: Store<H>,
 i: Store<I>,
 j: Store<J>,
 k: Store<K>,
 fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => R,
): Store<R>

