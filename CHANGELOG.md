# Changelog

## 0.17.6

* Add domain hooks for handle new events, effects or stores in domain.
```js
import {createDomain} from 'effector'
const mainPage = createDomain('main page')
mainPage.onCreateEvent(event => {
 console.log('new event: ', event.getType())
})
mainPage.onCreateStore(store => {
 console.log('new store: ', store.getState())
})
const mount = mainPage.event('mount')
// => new event: main page/mount

const pageStore = mainPage.store(0)
// => new store: 0
```
* Improve TypeScript typings

## 0.17.5

* Add ability to use createEvent, createEffect and createDomain without arguments (omit name)
* Fix wrong order of effect names
* Add `createWrappedDomain` to watch all nested events and updates
* Add `extract` to watch only part of nested storages
* Deprecate `.epic` method (library supports symbol-observable, so assumed that `most.from(event)` or `Observable.Of(store)` covered all use cases)

## 0.17.4

* **effector-react**: Add check for mounting of store consumer
* Add `effect.use.getCurrent()` method to get current used function
* Improve type inference in flow typing for `createStoreObject`
* Improve public ts and flow typings

## 0.17.3

* Fix effector-react typings
* Build with node 6 target, add engine field to package.json
* Add [warning](https://www.npmjs.com/package/warning) dependency

## 0.17.2

* Memoize store.map and store updates

## 0.17.0

* Added sync graph reduction engine (it's internal)
* Added store updates memoization
* Introduced effector-react

## 0.16.0

* Removed most-subject dependency
* New api

## 0.15.0-rc.2

* Add AVar: low-level interface for asynchronous variables
* Clean up builds before publishing
* Add types dir into npm build

## 0.14.0

* Add independent `createStore` method
* Replace console.warn with console.error in warnings
* Make reducers full-featured store elements (add `.get()`, `.set(x)` and `.map(fn)` methods)
* Add observable declaration to effects, events and reducers, which allow interop in this way: `from(effect)`

## 0.13.0

* Build via rollup
* New module architechture

## 0.12.0

* Exclude coverage from npm build
* Rename `mill` to `collect`
* Rename `joint` to `combine`

## 0.11.1

* Remove source files from npm release

## 0.11.0

* Add support for sync functions in `.use`
* **breaking** Rename config option `effectImplementationCheck` to `unused`

## 0.10.2

* Fix overriding of flow modules

## 0.10.0

* **breaking** Removed `rootDomain` alias for `createRootDomain`
* Fixed duplication of `typeConstant` events
* Added sync event propagation
* Catching of watch function errors
* Added warning to port errors
* Added type aliases `DomainAuto`, `EventAuto` and `EffectAuto`
* Added `mill` fluent "AND" reducer combinator

```js
import {mill, type MillType, type Reducer} from 'effector'

type A = 'foo'
type B = 'bar'
declare var reducerA: Reducer<A>
declare var reducerB: Reducer<B>

const tuple: MillType<A, B> = mill()
 .and(reducerA)
 .and(reducerB)

const union: Reducer<{
 a: A,
 b: B,
 staticField: string,
}> = tuple.joint((a: A, b: B) => ({
 a,
 b,
 staticField: 'its ok',
}))
```

## 0.9.1

* Added hot reload support for root domains
* Added support for dispatching halt action

```js
import {createHaltAction} from 'effector'

store.dispatch(createHaltAction()) //This store will be unsubscribed
```

## 0.9.0

First stable version

## Before 0.9.0

Proof of concept
