"use strict";
(self["webpackChunkpjcan"] = self["webpackChunkpjcan"] || []).push([[234],{

/***/ 9363:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Co": function() { return /* binding */ flicking_esm_Flicking; }
});

// UNUSED EXPORTS: ALIGN, AnchorPoint, AnimatingState, AxesController, BoundCameraMode, CIRCULAR_FALLBACK, CLASS, Camera, CircularCameraMode, Control, DIRECTION, DisabledState, DraggingState, ERROR_CODE, EVENTS, ExternalRenderer, FlickingError, FreeControl, HoldingState, IdleState, LinearCameraMode, MOVE_TYPE, NormalRenderingStrategy, Panel, Renderer, SnapControl, State, StateMachine, StrictControl, VanillaElementProvider, VanillaRenderer, Viewport, VirtualElementProvider, VirtualManager, VirtualPanel, VirtualRenderingStrategy, checkExistence, circulateIndex, circulatePosition, clamp, find, findIndex, findRight, getDefaultCameraTransform, getDirection, getElement, getElementSize, getFlickingAttached, getMinusCompensatedIndex, getProgress, getRenderingPanels, getStyle, includes, isBetween, isString, merge, parseAlign, parseArithmeticExpression, parseArithmeticSize, parseBounce, parseCSSSizeValue, parseElement, parsePanelAlign, range, setPrototypeOf, setSize, sync, toArray, withFlickingMethods

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(3396);
;// CONCATENATED MODULE: ./node_modules/@egjs/list-differ/dist/list-differ.esm.js

/*
Copyright (c) 2019-present NAVER Corp.
name: @egjs/list-differ
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-list-differ
version: 1.0.1
*/
/*
egjs-list-differ
Copyright (c) 2019-present NAVER Corp.
MIT license
*/
var PolyMap = /*#__PURE__*/
function () {
  function PolyMap() {
    this.keys = [];
    this.values = [];
  }
  var __proto = PolyMap.prototype;
  __proto.get = function (key) {
    return this.values[this.keys.indexOf(key)];
  };
  __proto.set = function (key, value) {
    var keys = this.keys;
    var values = this.values;
    var prevIndex = keys.indexOf(key);
    var index = prevIndex === -1 ? keys.length : prevIndex;
    keys[index] = key;
    values[index] = value;
  };
  return PolyMap;
}();

/*
egjs-list-differ
Copyright (c) 2019-present NAVER Corp.
MIT license
*/
var HashMap = /*#__PURE__*/
function () {
  function HashMap() {
    this.object = {};
  }
  var __proto = HashMap.prototype;
  __proto.get = function (key) {
    return this.object[key];
  };
  __proto.set = function (key, value) {
    this.object[key] = value;
  };
  return HashMap;
}();

/*
egjs-list-differ
Copyright (c) 2019-present NAVER Corp.
MIT license
*/
var SUPPORT_MAP = typeof Map === "function";

/*
egjs-list-differ
Copyright (c) 2019-present NAVER Corp.
MIT license
*/
var Link = /*#__PURE__*/
function () {
  function Link() {}
  var __proto = Link.prototype;
  __proto.connect = function (prevLink, nextLink) {
    this.prev = prevLink;
    this.next = nextLink;
    prevLink && (prevLink.next = this);
    nextLink && (nextLink.prev = this);
  };
  __proto.disconnect = function () {
    // In double linked list, diconnect the interconnected relationship.
    var prevLink = this.prev;
    var nextLink = this.next;
    prevLink && (prevLink.next = nextLink);
    nextLink && (nextLink.prev = prevLink);
  };
  __proto.getIndex = function () {
    var link = this;
    var index = -1;
    while (link) {
      link = link.prev;
      ++index;
    }
    return index;
  };
  return Link;
}();

/*
egjs-list-differ
Copyright (c) 2019-present NAVER Corp.
MIT license
*/

function orderChanged(changed, fixed) {
  // It is roughly in the order of these examples.
  // 4, 6, 0, 2, 1, 3, 5, 7
  var fromLinks = []; // 0, 1, 2, 3, 4, 5, 6, 7

  var toLinks = [];
  changed.forEach(function (_a) {
    var from = _a[0],
      to = _a[1];
    var link = new Link();
    fromLinks[from] = link;
    toLinks[to] = link;
  }); // `fromLinks` are connected to each other by double linked list.

  fromLinks.forEach(function (link, i) {
    link.connect(fromLinks[i - 1]);
  });
  return changed.filter(function (_, i) {
    return !fixed[i];
  }).map(function (_a, i) {
    var from = _a[0],
      to = _a[1];
    if (from === to) {
      return [0, 0];
    }
    var fromLink = fromLinks[from];
    var toLink = toLinks[to - 1];
    var fromIndex = fromLink.getIndex(); // Disconnect the link connected to `fromLink`.

    fromLink.disconnect(); // Connect `fromLink` to the right of `toLink`.

    if (!toLink) {
      fromLink.connect(undefined, fromLinks[0]);
    } else {
      fromLink.connect(toLink, toLink.next);
    }
    var toIndex = fromLink.getIndex();
    return [fromIndex, toIndex];
  });
}
var Result = /*#__PURE__*/
function () {
  function Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed) {
    this.prevList = prevList;
    this.list = list;
    this.added = added;
    this.removed = removed;
    this.changed = changed;
    this.maintained = maintained;
    this.changedBeforeAdded = changedBeforeAdded;
    this.fixed = fixed;
  }
  var __proto = Result.prototype;
  Object.defineProperty(__proto, "ordered", {
    get: function () {
      if (!this.cacheOrdered) {
        this.caculateOrdered();
      }
      return this.cacheOrdered;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(__proto, "pureChanged", {
    get: function () {
      if (!this.cachePureChanged) {
        this.caculateOrdered();
      }
      return this.cachePureChanged;
    },
    enumerable: true,
    configurable: true
  });
  __proto.caculateOrdered = function () {
    var ordered = orderChanged(this.changedBeforeAdded, this.fixed);
    var changed = this.changed;
    var pureChanged = [];
    this.cacheOrdered = ordered.filter(function (_a, i) {
      var from = _a[0],
        to = _a[1];
      var _b = changed[i],
        fromBefore = _b[0],
        toBefore = _b[1];
      if (from !== to) {
        pureChanged.push([fromBefore, toBefore]);
        return true;
      }
    });
    this.cachePureChanged = pureChanged;
  };
  return Result;
}();

/**
 *
 * @memberof eg.ListDiffer
 * @static
 * @function
 * @param - Previous List <ko> 이전 목록 </ko>
 * @param - List to Update <ko> 업데이트 할 목록 </ko>
 * @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
 * @return - Returns the diff between `prevList` and `list` <ko> `prevList`와 `list`의 다른 점을 반환한다.</ko>
 * @example
 * import { diff } from "@egjs/list-differ";
 * // script => eg.ListDiffer.diff
 * const result = diff([0, 1, 2, 3, 4, 5], [7, 8, 0, 4, 3, 6, 2, 1], e => e);
 * // List before update
 * // [1, 2, 3, 4, 5]
 * console.log(result.prevList);
 * // Updated list
 * // [4, 3, 6, 2, 1]
 * console.log(result.list);
 * // Index array of values added to `list`
 * // [0, 1, 5]
 * console.log(result.added);
 * // Index array of values removed in `prevList`
 * // [5]
 * console.log(result.removed);
 * // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`
 * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
 * console.log(result.changed);
 * // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
 * // [[4, 3], [3, 4], [2, 6]]
 * console.log(result.pureChanged);
 * // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
 * // [[4, 1], [4, 2], [4, 3]]
 * console.log(result.ordered);
 * // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved
 * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
 * console.log(result.maintained);
 */

function diff(prevList, list, findKeyCallback) {
  var mapClass = SUPPORT_MAP ? Map : findKeyCallback ? HashMap : PolyMap;
  var callback = findKeyCallback || function (e) {
    return e;
  };
  var added = [];
  var removed = [];
  var maintained = [];
  var prevKeys = prevList.map(callback);
  var keys = list.map(callback);
  var prevKeyMap = new mapClass();
  var keyMap = new mapClass();
  var changedBeforeAdded = [];
  var fixed = [];
  var removedMap = {};
  var changed = [];
  var addedCount = 0;
  var removedCount = 0; // Add prevKeys and keys to the hashmap.

  prevKeys.forEach(function (key, prevListIndex) {
    prevKeyMap.set(key, prevListIndex);
  });
  keys.forEach(function (key, listIndex) {
    keyMap.set(key, listIndex);
  }); // Compare `prevKeys` and `keys` and add them to `removed` if they are not in `keys`.

  prevKeys.forEach(function (key, prevListIndex) {
    var listIndex = keyMap.get(key); // In prevList, but not in list, it is removed.

    if (typeof listIndex === "undefined") {
      ++removedCount;
      removed.push(prevListIndex);
    } else {
      removedMap[listIndex] = removedCount;
    }
  }); // Compare `prevKeys` and `keys` and add them to `added` if they are not in `prevKeys`.

  keys.forEach(function (key, listIndex) {
    var prevListIndex = prevKeyMap.get(key); // In list, but not in prevList, it is added.

    if (typeof prevListIndex === "undefined") {
      added.push(listIndex);
      ++addedCount;
    } else {
      maintained.push([prevListIndex, listIndex]);
      removedCount = removedMap[listIndex] || 0;
      changedBeforeAdded.push([prevListIndex - removedCount, listIndex - addedCount]);
      fixed.push(listIndex === prevListIndex);
      if (prevListIndex !== listIndex) {
        changed.push([prevListIndex, listIndex]);
      }
    }
  }); // Sort by ascending order of 'to(list's index).

  removed.reverse();
  return new Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed);
}

/**
 * A module that checks diff when values are added, removed, or changed in an array.
 * @ko 배열 또는 오브젝트에서 값이 추가되거나 삭제되거나 순서가 변경사항을 체크하는 모듈입니다.
 * @memberof eg
 */

var ListDiffer = /*#__PURE__*/
function () {
  /**
   * @param - Initializing Data Array. <ko> 초기 설정할 데이터 배열.</ko>
   * @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
   * @example
   * import ListDiffer from "@egjs/list-differ";
   * // script => eg.ListDiffer
   * const differ = new ListDiffer([0, 1, 2, 3, 4, 5], e => e);
   * const result = differ.update([7, 8, 0, 4, 3, 6, 2, 1]);
   * // List before update
   * // [1, 2, 3, 4, 5]
   * console.log(result.prevList);
   * // Updated list
   * // [4, 3, 6, 2, 1]
   * console.log(result.list);
   * // Index array of values added to `list`.
   * // [0, 1, 5]
   * console.log(result.added);
   * // Index array of values removed in `prevList`.
   * // [5]
   * console.log(result.removed);
   * // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`.
   * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
   * console.log(result.changed);
   * // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
   * // [[4, 3], [3, 4], [2, 6]]
   * console.log(result.pureChanged);
   * // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
   * // [[4, 1], [4, 2], [4, 3]]
   * console.log(result.ordered);
   * // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved.
   * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
   * console.log(result.maintained);
   */
  function ListDiffer(list, findKeyCallback) {
    if (list === void 0) {
      list = [];
    }
    this.findKeyCallback = findKeyCallback;
    this.list = [].slice.call(list);
  }
  /**
   * Update list.
   * @ko 리스트를 업데이트를 합니다.
   * @param - List to update <ko> 업데이트할 리스트 </ko>
   * @return - Returns the results of an update from `prevList` to `list`.<ko> `prevList`에서 `list`로 업데이트한 결과를 반환한다. </ko>
   */

  var __proto = ListDiffer.prototype;
  __proto.update = function (list) {
    var newData = [].slice.call(list);
    var result = diff(this.list, newData, this.findKeyCallback);
    this.list = newData;
    return result;
  };
  return ListDiffer;
}();

/*
egjs-list-differ
Copyright (c) 2019-present NAVER Corp.
MIT license
*/

/* harmony default export */ var list_differ_esm = (ListDiffer);

;// CONCATENATED MODULE: ./node_modules/@egjs/component/dist/component.esm.js

/*
Copyright (c) NAVER Corp.
name: @egjs/component
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-component
version: 3.0.4
*/
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
var isUndefined = function (value) {
  return typeof value === "undefined";
};

// This class name is not matched to file name intentionally
/**
 * Event class to provide additional properties
 * @ko Component에서 추가적인 프로퍼티를 제공하는 이벤트 클래스
 */
var ComponentEvent = /*#__PURE__*/function () {
  /**
   * Create a new instance of ComponentEvent.
   * @ko ComponentEvent의 새로운 인스턴스를 생성한다.
   * @param eventType The name of the event.<ko>이벤트 이름.</ko>
   * @param props An object that contains additional event properties.<ko>추가적인 이벤트 프로퍼티 오브젝트.</ko>
   */
  function ComponentEvent(eventType, props) {
    var e_1, _a;
    this._canceled = false;
    if (props) {
      try {
        for (var _b = __values(Object.keys(props)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var key = _c.value;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this[key] = props[key];
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
    this.eventType = eventType;
  }
  /**
   * Stop the event. {@link ComponentEvent#isCanceled} will return `true` after.
   * @ko 이벤트를 중단한다. 이후 {@link ComponentEvent#isCanceled}가 `true`를 반환한다.
   */
  var __proto = ComponentEvent.prototype;
  __proto.stop = function () {
    this._canceled = true;
  };
  /**
   * Returns a boolean value that indicates whether {@link ComponentEvent#stop} is called before.
   * @ko {@link ComponentEvent#stop}이 호출되었는지 여부를 반환한다.
   * @return {boolean} A boolean value that indicates whether {@link ComponentEvent#stop} is called before.<ko>이전에 {@link ComponentEvent#stop}이 불려졌는지 여부를 반환한다.</ko>
   */
  __proto.isCanceled = function () {
    return this._canceled;
  };
  return ComponentEvent;
}();

/**
 * A class used to manage events in a component
 * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
 */
var component_esm_Component = /*#__PURE__*/function () {
  /**
   * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
   */
  function Component() {
    this._eventHandler = {};
  }
  /**
   * Trigger a custom event.
   * @ko 커스텀 이벤트를 발생시킨다
   * @param {string | ComponentEvent} event The name of the custom event to be triggered or an instance of the ComponentEvent<ko>발생할 커스텀 이벤트의 이름 또는 ComponentEvent의 인스턴스</ko>
   * @param {any[]} params Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
   * @return An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   * ```ts
   * import Component, { ComponentEvent } from "@egjs/component";
   *
   * class Some extends Component<{
   *   beforeHi: ComponentEvent<{ foo: number; bar: string }>;
   *   hi: { foo: { a: number; b: boolean } };
   *   someEvent: (foo: number, bar: string) => void;
   *   someOtherEvent: void; // When there's no event argument
   * }> {
   *   some(){
   *     if(this.trigger("beforeHi")){ // When event call to stop return false.
   *       this.trigger("hi");// fire hi event.
   *     }
   *   }
   * }
   *
   * const some = new Some();
   * some.on("beforeHi", e => {
   *   if(condition){
   *     e.stop(); // When event call to stop, `hi` event not call.
   *   }
   *   // `currentTarget` is component instance.
   *   console.log(some === e.currentTarget); // true
   *
   *   typeof e.foo; // number
   *   typeof e.bar; // string
   * });
   * some.on("hi", e => {
   *   typeof e.foo.b; // boolean
   * });
   * // If you want to more know event design. You can see article.
   * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
   * ```
   */
  var __proto = Component.prototype;
  __proto.trigger = function (event) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      params[_i - 1] = arguments[_i];
    }
    var eventName = event instanceof ComponentEvent ? event.eventType : event;
    var handlers = __spread(this._eventHandler[eventName] || []);
    if (handlers.length <= 0) {
      return this;
    }
    if (event instanceof ComponentEvent) {
      event.currentTarget = this;
      handlers.forEach(function (handler) {
        handler(event);
      });
    } else {
      handlers.forEach(function (handler) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        handler.apply(void 0, __spread(params));
      });
    }
    return this;
  };
  /**
   * Executed event just one time.
   * @ko 이벤트가 한번만 실행된다.
   * @param {string} eventName The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>
   * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   * ```ts
   * import Component, { ComponentEvent } from "@egjs/component";
   *
   * class Some extends Component<{
   *   hi: ComponentEvent;
   * }> {
   *   hi() {
   *     alert("hi");
   *   }
   *   thing() {
   *     this.once("hi", this.hi);
   *   }
   * }
   *
   * var some = new Some();
   * some.thing();
   * some.trigger(new ComponentEvent("hi"));
   * // fire alert("hi");
   * some.trigger(new ComponentEvent("hi"));
   * // Nothing happens
   * ```
   */
  __proto.once = function (eventName, handlerToAttach) {
    var _this = this;
    if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
      var eventHash = eventName;
      for (var key in eventHash) {
        this.once(key, eventHash[key]);
      }
      return this;
    } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
      var listener_1 = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        handlerToAttach.apply(void 0, __spread(args));
        _this.off(eventName, listener_1);
      };
      this.on(eventName, listener_1);
    }
    return this;
  };
  /**
   * Checks whether an event has been attached to a component.
   * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
   * @param {string} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
   * @return {boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
   * @example
   * ```ts
   * import Component from "@egjs/component";
   *
   * class Some extends Component<{
   *   hi: void;
   * }> {
   *   some() {
   *     this.hasOn("hi");// check hi event.
   *   }
   * }
   * ```
   */
  __proto.hasOn = function (eventName) {
    return !!this._eventHandler[eventName];
  };
  /**
   * Attaches an event to a component.
   * @ko 컴포넌트에 이벤트를 등록한다.
   * @param {string} eventName The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>
   * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   * ```ts
   * import Component, { ComponentEvent } from "@egjs/component";
   *
   * class Some extends Component<{
   *   hi: void;
   * }> {
   *   hi() {
   *     console.log("hi");
   *   }
   *   some() {
   *     this.on("hi",this.hi); //attach event
   *   }
   * }
   * ```
   */
  __proto.on = function (eventName, handlerToAttach) {
    if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
      var eventHash = eventName;
      for (var name in eventHash) {
        this.on(name, eventHash[name]);
      }
      return this;
    } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
      var handlerList = this._eventHandler[eventName];
      if (isUndefined(handlerList)) {
        this._eventHandler[eventName] = [];
        handlerList = this._eventHandler[eventName];
      }
      handlerList.push(handlerToAttach);
    }
    return this;
  };
  /**
   * Detaches an event from the component.<br/>If the `eventName` is not given this will detach all event handlers attached.<br/>If the `handlerToDetach` is not given, this will detach all event handlers for `eventName`.
   * @ko 컴포넌트에 등록된 이벤트를 해제한다.<br/>`eventName`이 주어지지 않았을 경우 모든 이벤트 핸들러를 제거한다.<br/>`handlerToAttach`가 주어지지 않았을 경우 `eventName`에 해당하는 모든 이벤트 핸들러를 제거한다.
   * @param {string?} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
   * @param {function?} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
   * @return An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   * ```ts
   * import Component, { ComponentEvent } from "@egjs/component";
   *
   * class Some extends Component<{
   *   hi: void;
   * }> {
   *   hi() {
   *     console.log("hi");
   *   }
   *   some() {
   *     this.off("hi",this.hi); //detach event
   *   }
   * }
   * ```
   */
  __proto.off = function (eventName, handlerToDetach) {
    var e_1, _a;
    // Detach all event handlers.
    if (isUndefined(eventName)) {
      this._eventHandler = {};
      return this;
    }
    // Detach all handlers for eventname or detach event handlers by object.
    if (isUndefined(handlerToDetach)) {
      if (typeof eventName === "string") {
        delete this._eventHandler[eventName];
        return this;
      } else {
        var eventHash = eventName;
        for (var name in eventHash) {
          this.off(name, eventHash[name]);
        }
        return this;
      }
    }
    // Detach single event handler
    var handlerList = this._eventHandler[eventName];
    if (handlerList) {
      var idx = 0;
      try {
        for (var handlerList_1 = __values(handlerList), handlerList_1_1 = handlerList_1.next(); !handlerList_1_1.done; handlerList_1_1 = handlerList_1.next()) {
          var handlerFunction = handlerList_1_1.value;
          if (handlerFunction === handlerToDetach) {
            handlerList.splice(idx, 1);
            if (handlerList.length <= 0) {
              delete this._eventHandler[eventName];
            }
            break;
          }
          idx++;
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (handlerList_1_1 && !handlerList_1_1.done && (_a = handlerList_1.return)) _a.call(handlerList_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
    return this;
  };
  /**
   * Version info string
   * @ko 버전정보 문자열
   * @name VERSION
   * @static
   * @example
   * Component.VERSION;  // ex) 3.0.0
   * @memberof Component
   */
  Component.VERSION = "3.0.4";
  return Component;
}();

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment
var ComponentEvent$1 = ComponentEvent;

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* harmony default export */ var component_esm = (component_esm_Component);

;// CONCATENATED MODULE: ./node_modules/@egjs/agent/dist/agent.esm.js
/*
Copyright (c) 2015 NAVER Corp.
name: @egjs/agent
license: MIT
author: NAVER Corp.
repository: git+https://github.com/naver/agent.git
version: 2.4.3
*/
function some(arr, callback) {
  var length = arr.length;
  for (var i = 0; i < length; ++i) {
    if (callback(arr[i], i)) {
      return true;
    }
  }
  return false;
}
function find(arr, callback) {
  var length = arr.length;
  for (var i = 0; i < length; ++i) {
    if (callback(arr[i], i)) {
      return arr[i];
    }
  }
  return null;
}
function getUserAgentString(agent) {
  var userAgent = agent;
  if (typeof userAgent === "undefined") {
    if (typeof navigator === "undefined" || !navigator) {
      return "";
    }
    userAgent = navigator.userAgent || "";
  }
  return userAgent.toLowerCase();
}
function execRegExp(pattern, text) {
  try {
    return new RegExp(pattern, "g").exec(text);
  } catch (e) {
    return null;
  }
}
function hasUserAgentData() {
  if (typeof navigator === "undefined" || !navigator || !navigator.userAgentData) {
    return false;
  }
  var userAgentData = navigator.userAgentData;
  var brands = userAgentData.brands || userAgentData.uaList;
  return !!(brands && brands.length);
}
function findVersion(versionTest, userAgent) {
  var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", userAgent);
  return result ? result[3] : "";
}
function convertVersion(text) {
  return text.replace(/_/g, ".");
}
function findPreset(presets, userAgent) {
  var userPreset = null;
  var version = "-1";
  some(presets, function (preset) {
    var result = execRegExp("(" + preset.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);
    if (!result || preset.brand) {
      return false;
    }
    userPreset = preset;
    version = result[3] || "-1";
    if (preset.versionAlias) {
      version = preset.versionAlias;
    } else if (preset.versionTest) {
      version = findVersion(preset.versionTest.toLowerCase(), userAgent) || version;
    }
    version = convertVersion(version);
    return true;
  });
  return {
    preset: userPreset,
    version: version
  };
}
function findPresetBrand(presets, brands) {
  var brandInfo = {
    brand: "",
    version: "-1"
  };
  some(presets, function (preset) {
    var result = findBrand(brands, preset);
    if (!result) {
      return false;
    }
    brandInfo.brand = preset.id;
    brandInfo.version = preset.versionAlias || result.version;
    return brandInfo.version !== "-1";
  });
  return brandInfo;
}
function findBrand(brands, preset) {
  return find(brands, function (_a) {
    var brand = _a.brand;
    return execRegExp("" + preset.test, brand.toLowerCase());
  });
}
var BROWSER_PRESETS = [{
  test: "phantomjs",
  id: "phantomjs"
}, {
  test: "whale",
  id: "whale"
}, {
  test: "edgios|edge|edg",
  id: "edge"
}, {
  test: "msie|trident|windows phone",
  id: "ie",
  versionTest: "iemobile|msie|rv"
}, {
  test: "miuibrowser",
  id: "miui browser"
}, {
  test: "samsungbrowser",
  id: "samsung internet"
}, {
  test: "samsung",
  id: "samsung internet",
  versionTest: "version"
}, {
  test: "chrome|crios",
  id: "chrome"
}, {
  test: "firefox|fxios",
  id: "firefox"
}, {
  test: "android",
  id: "android browser",
  versionTest: "version"
}, {
  test: "safari|iphone|ipad|ipod",
  id: "safari",
  versionTest: "version"
}]; // chromium's engine(blink) is based on applewebkit 537.36.

var CHROMIUM_PRESETS = [{
  test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
  id: "chrome",
  versionTest: "chrome"
}, {
  test: "chromium",
  id: "chrome"
}, {
  test: "whale",
  id: "chrome",
  versionAlias: "-1",
  brand: true
}];
var WEBKIT_PRESETS = [{
  test: "applewebkit",
  id: "webkit",
  versionTest: "applewebkit|safari"
}];
var WEBVIEW_PRESETS = [{
  test: "(?=(iphone|ipad))(?!(.*version))",
  id: "webview"
}, {
  test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
  id: "webview"
}, {
  // test webview
  test: "webview",
  id: "webview"
}];
var OS_PRESETS = [{
  test: "windows phone",
  id: "windows phone"
}, {
  test: "windows 2000",
  id: "window",
  versionAlias: "5.0"
}, {
  test: "windows nt",
  id: "window"
}, {
  test: "win32|windows",
  id: "window"
}, {
  test: "iphone|ipad|ipod",
  id: "ios",
  versionTest: "iphone os|cpu os"
}, {
  test: "macos|macintel|mac os x",
  id: "mac"
}, {
  test: "android|linux armv81",
  id: "android"
}, {
  test: "tizen",
  id: "tizen"
}, {
  test: "webos|web0s",
  id: "webos"
}];
function isWebView(userAgent) {
  return !!findPreset(WEBVIEW_PRESETS, userAgent).preset;
}
function getLegacyAgent(userAgent) {
  var nextAgent = getUserAgentString(userAgent);
  var isMobile = !!/mobi/g.exec(nextAgent);
  var browser = {
    name: "unknown",
    version: "-1",
    majorVersion: -1,
    webview: isWebView(nextAgent),
    chromium: false,
    chromiumVersion: "-1",
    webkit: false,
    webkitVersion: "-1"
  };
  var os = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };
  var _a = findPreset(BROWSER_PRESETS, nextAgent),
    browserPreset = _a.preset,
    browserVersion = _a.version;
  var _b = findPreset(OS_PRESETS, nextAgent),
    osPreset = _b.preset,
    osVersion = _b.version;
  var chromiumPreset = findPreset(CHROMIUM_PRESETS, nextAgent);
  browser.chromium = !!chromiumPreset.preset;
  browser.chromiumVersion = chromiumPreset.version;
  if (!browser.chromium) {
    var webkitPreset = findPreset(WEBKIT_PRESETS, nextAgent);
    browser.webkit = !!webkitPreset.preset;
    browser.webkitVersion = webkitPreset.version;
  }
  if (osPreset) {
    os.name = osPreset.id;
    os.version = osVersion;
    os.majorVersion = parseInt(osVersion, 10);
  }
  if (browserPreset) {
    browser.name = browserPreset.id;
    browser.version = browserVersion; // Early whale bugs

    if (browser.webview && os.name === "ios" && browser.name !== "safari") {
      browser.webview = false;
    }
  }
  browser.majorVersion = parseInt(browser.version, 10);
  return {
    browser: browser,
    os: os,
    isMobile: isMobile,
    isHints: false
  };
}
function getClientHintsAgent(osData) {
  var userAgentData = navigator.userAgentData;
  var brands = (userAgentData.uaList || userAgentData.brands).slice();
  var fullVersionList = osData && osData.fullVersionList;
  var isMobile = userAgentData.mobile || false;
  var firstBrand = brands[0];
  var platform = (osData && osData.platform || userAgentData.platform || navigator.platform).toLowerCase();
  var browser = {
    name: firstBrand.brand,
    version: firstBrand.version,
    majorVersion: -1,
    webkit: false,
    webkitVersion: "-1",
    chromium: false,
    chromiumVersion: "-1",
    webview: !!findPresetBrand(WEBVIEW_PRESETS, brands).brand || isWebView(getUserAgentString())
  };
  var os = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };
  browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function (preset) {
    return findBrand(brands, preset);
  });
  var chromiumBrand = findPresetBrand(CHROMIUM_PRESETS, brands);
  browser.chromium = !!chromiumBrand.brand;
  browser.chromiumVersion = chromiumBrand.version;
  if (!browser.chromium) {
    var webkitBrand = findPresetBrand(WEBKIT_PRESETS, brands);
    browser.webkit = !!webkitBrand.brand;
    browser.webkitVersion = webkitBrand.version;
  }
  var platfomResult = find(OS_PRESETS, function (preset) {
    return new RegExp("" + preset.test, "g").exec(platform);
  });
  os.name = platfomResult ? platfomResult.id : "";
  if (osData) {
    os.version = osData.platformVersion;
  }
  if (fullVersionList && fullVersionList.length) {
    var browserBrandByFullVersionList = findPresetBrand(BROWSER_PRESETS, fullVersionList);
    browser.name = browserBrandByFullVersionList.brand || browser.name;
    browser.version = browserBrandByFullVersionList.version || browser.version;
  } else {
    var browserBrand = findPresetBrand(BROWSER_PRESETS, brands);
    browser.name = browserBrand.brand || browser.name;
    browser.version = browserBrand.brand && osData ? osData.uaFullVersion : browserBrand.version;
  }
  if (browser.webkit) {
    os.name = isMobile ? "ios" : "mac";
  }
  if (os.name === "ios" && browser.webview) {
    browser.version = "-1";
  }
  os.version = convertVersion(os.version);
  browser.version = convertVersion(browser.version);
  os.majorVersion = parseInt(os.version, 10);
  browser.majorVersion = parseInt(browser.version, 10);
  return {
    browser: browser,
    os: os,
    isMobile: isMobile,
    isHints: true
  };
}

/**
 * @namespace eg.agent
 */

/**
* Extracts accuate browser and operating system information from the user agent string or client hints.
* @ko 유저 에이전트 문자열 또는 client hints에서 정확한 브라우저와 운영체제 정보를 추출한다.
* @function eg.agent#getAccurateAgent
* @param - Callback function to get the accuate agent <ko>정확한 에이전트를 가져오기 위한 callback 함수</ko>
* @return - get the accuate agent promise. If Promise are not supported, null is returned. <ko> 정확한 에이전트 promise를 가져온다. Promise를 지원 하지 않는 경우, null을 반환한다. </ko>
* @example
import { getAccurateAgent } from "@egjs/agent";
// eg.agent.getAccurateAgent()
getAccurateAgent().then(agent => {
   const { os, browser, isMobile } = agent;
});
getAccurateAgent(agent => {
    const { os, browser, isMobile } = agent;
});
*/

function getAccurateAgent(callback) {
  if (hasUserAgentData()) {
    return navigator.userAgentData.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "uaFullVersion", "fullVersionList"]).then(function (info) {
      var agentInfo = getClientHintsAgent(info);
      callback && callback(agentInfo);
      return agentInfo;
    });
  }
  callback && callback(agent());
  if (typeof Promise === "undefined" || !Promise) {
    return null;
  }
  return Promise.resolve(agent());
}
/**
 * Extracts browser and operating system information from the user agent string.
 * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
 * @function eg.agent#agent
 * @param - user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
 * @return - agent Info <ko> 에이전트 정보 </ko>
 * @example
import agent from "@egjs/agent";
// eg.agent();
const { os, browser, isMobile } = agent();
 */

function agent(userAgent) {
  if (typeof userAgent === "undefined" && hasUserAgentData()) {
    return getClientHintsAgent();
  } else {
    return getLegacyAgent(userAgent);
  }
}
/* harmony default export */ var agent_esm = (agent);

;// CONCATENATED MODULE: ./node_modules/@egjs/axes/node_modules/@cfcs/core/dist/cfcs.esm.js
/*
Copyright (c) NAVER Crop.
name: @cfcs/core
license: MIT
author: NAVER Crop.
repository: https://github.com/naver/cfcs
version: 0.0.4
*/


/**
 * cfcs
 * Copyright (c) 2022-present NAVER Corp.
 * MIT license
 */
function keys(obj) {
  return Object.keys(obj);
}
function camelize(str) {
  return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
function isObject(val) {
  return typeof val === "object";
}
function isFunction(val) {
  return typeof val === "function";
}
function withClassMethods(methods) {
  return function (prototype, memberName) {
    methods.forEach(function (name) {
      if (name in prototype) {
        return;
      }
      prototype[name] = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var result = (_a = this[memberName])[name].apply(_a, args); // fix `this` type to return your own `class` instance to the instance using the decorator.

        if (result === this[memberName]) {
          return this;
        } else {
          return result;
        }
      };
    });
  };
}
var OBSERVERS_PATH = "__observers__";
var Observer = /*#__PURE__*/
function () {
  function Observer(value) {
    this._emitter = new component_esm();
    this._current = value;
  }
  var __proto = Observer.prototype;
  Object.defineProperty(__proto, "current", {
    get: function () {
      return this._current;
    },
    set: function (value) {
      var isUpdate = value !== this._current;
      this._current = value;
      if (isUpdate) {
        this._emitter.trigger("update", value);
      }
    },
    enumerable: false,
    configurable: true
  });
  __proto.subscribe = function (callback) {
    this._emitter.on("update", callback);
  };
  __proto.unsubscribe = function (callback) {
    this._emitter.off("update", callback);
  };
  return Observer;
}();
function withReactiveMethods(ref, methods) {
  var obj = {};
  if (!methods) {
    return obj;
  }
  methods.forEach(function (name) {
    obj[name] = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var current = ref.current || ref.value;
      return current[name].apply(current, args);
    };
  });
  return obj;
}
function observe(defaultValue) {
  return new Observer(defaultValue);
}
function getObservers(instance) {
  if (!instance[OBSERVERS_PATH]) {
    instance[OBSERVERS_PATH] = {};
  }
  return instance[OBSERVERS_PATH];
}
function getObserver(instance, name, defaultValue) {
  var observers = getObservers(instance);
  if (!observers[name]) {
    observers[name] = observe(defaultValue);
  }
  return observers[name];
}
function setObserver(instance, name, observer) {
  var observers = getObservers(instance);
  observers[name] = observer;
}
function isObserver(val) {
  return val && "current" in val && "subscribe" in val && "unsubscribe" in val;
}
function Reactive(name) {
  return function (prototype, memberName) {
    var publicName = name || memberName;
    Object.defineProperty(prototype, memberName, {
      get: function () {
        return getObserver(this, publicName).current;
      },
      set: function (value) {
        getObserver(this, publicName, value).current = value;
      }
    });
    if (publicName !== memberName) {
      Object.defineProperty(prototype, publicName, {
        get: function () {
          return getObserver(this, publicName).current;
        }
      });
    }
  };
}
function injectReactiveSubscribe(object) {
  object["subscribe"] = function (name, callback) {
    getObserver(this, name).subscribe(callback);
  };
  object["unsubscribe"] = function (name, callback) {
    var _this = this;
    if (!name) {
      keys(getObservers(this)).forEach(function (observerName) {
        _this.unsubscribe(observerName);
      });
      return;
    }
    if (!(name in this)) {
      return;
    }
    getObserver(this, name).unsubscribe(callback);
  };
}
function ReactiveSubscribe(Constructor) {
  var prototype = Constructor.prototype;
  injectReactiveSubscribe(prototype);
}
function cfcs_esm_reactive(setup) {
  var result = isFunction(setup) ? setup() : setup;
  var reactiveObject = {};
  keys(result).forEach(function (name) {
    var value = result[name];
    if (isObserver(value)) {
      setObserver(reactiveObject, name, value);
      Reactive(name)(reactiveObject, name);
    } else {
      reactiveObject[name] = value;
    }
  });
  injectReactiveSubscribe(reactiveObject);
  return reactiveObject;
}
function adaptReactive(adapter) {
  var _a;
  function data() {
    var _a, _b;
    return (_b = (_a = adapter.data) === null || _a === void 0 ? void 0 : _a.call(adapter)) !== null && _b !== void 0 ? _b : {};
  }
  var instanceRef = {
    current: ((_a = adapter.created) === null || _a === void 0 ? void 0 : _a.call(adapter, data())) || null
  };
  var firstState = null;
  return {
    state: function () {
      var inst = instanceRef.current;
      if (firstState) {
        return firstState;
      }
      if (adapter.state) {
        firstState = adapter.state;
      } else if (inst) {
        var observers_1 = getObservers(inst);
        firstState = keys(observers_1).reduce(function (prev, cur) {
          prev[cur] = observers_1[cur].current;
          return prev;
        }, {});
      }
      return firstState || {};
    },
    instance: function () {
      return instanceRef.current;
    },
    mounted: function () {
      var _a;
      instanceRef.current = ((_a = adapter.mounted) === null || _a === void 0 ? void 0 : _a.call(adapter, data())) || instanceRef.current;
    },
    init: function () {
      var _a;
      (_a = adapter.init) === null || _a === void 0 ? void 0 : _a.call(adapter, instanceRef.current, data());
    },
    destroy: function () {
      var _a;
      (_a = adapter.destroy) === null || _a === void 0 ? void 0 : _a.call(adapter, instanceRef.current, data());
    },
    methods: function () {
      return withReactiveMethods(instanceRef, adapter.methods);
    },
    on: function (eventName, listener) {
      var _a;
      (_a = adapter.on) === null || _a === void 0 ? void 0 : _a.call(adapter, instanceRef.current, eventName, listener);
    },
    off: function (eventName, listener) {
      var _a;
      (_a = adapter.off) === null || _a === void 0 ? void 0 : _a.call(adapter, instanceRef.current, eventName, listener);
    }
  };
}

;// CONCATENATED MODULE: ./node_modules/@egjs/axes/dist/axes.esm.js

/*
Copyright (c) NAVER Corp.
name: @egjs/axes
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-axes
version: 3.8.4
*/




/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* eslint-disable no-new-func, no-nested-ternary */
var win;
if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {
    navigator: {
      userAgent: ""
    }
  };
} else {
  win = window;
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_HORIZONTAL = 2 | 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;
var DIRECTION_VERTICAL = 8 | 16;
var DIRECTION_ALL = 2 | 4 | 8 | 16;
var MOUSE_LEFT = "left";
var MOUSE_RIGHT = "right";
var MOUSE_MIDDLE = "middle";
var ANY = "any";
var NONE = "none";
var SHIFT = "shift";
var CTRL = "ctrl";
var ALT = "alt";
var META = "meta";
var VELOCITY_INTERVAL = 16;
var AXES_METHODS = ["connect", "disconnect", "get", "setTo", "setBy", "setOptions", "setAxis", "stopAnimation", "updateAnimation", "isBounceArea"];
var AXES_EVENTS = ["hold", "release", "change", "animationStart", "animationEnd", "finish"];
var IOS_EDGE_THRESHOLD = 30;
var IS_IOS_SAFARI = "ontouchstart" in win && agent_esm().browser.name === "safari";
var TRANSFORM = function () {
  if (typeof document === "undefined") {
    return "";
  }
  var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
  var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];
  for (var i = 0, len = target.length; i < len; i++) {
    if (target[i] in bodyStyle) {
      return target[i];
    }
  }
  return "";
}();
var PREVENT_DRAG_CSSPROPS = {
  "-webkit-user-select": "none",
  "-ms-user-select": "none",
  "-moz-user-select": "none",
  "user-select": "none",
  "-webkit-user-drag": "none"
};
var toArray = function (nodes) {
  // const el = Array.prototype.slice.call(nodes);
  // for IE8
  var el = [];
  for (var i = 0, len = nodes.length; i < len; i++) {
    el.push(nodes[i]);
  }
  return el;
};
var $ = function (param, multi) {
  if (multi === void 0) {
    multi = false;
  }
  var el;
  if (typeof param === "string") {
    // String (HTML, Selector)
    // check if string is HTML tag format
    var match = param.match(/^<([a-z]+)\s*([^>]*)>/); // creating element

    if (match) {
      // HTML
      var dummy = document.createElement("div");
      dummy.innerHTML = param;
      el = toArray(dummy.childNodes);
    } else {
      // Selector
      el = toArray(document.querySelectorAll(param));
    }
    if (!multi) {
      el = el.length >= 1 ? el[0] : undefined;
    }
  } else if (param === win) {
    // window
    el = param;
  } else if ("value" in param || "current" in param) {
    el = param.value || param.current;
  } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
    // HTMLElement, Document
    el = param;
  } else if ("jQuery" in win && param instanceof jQuery || param.constructor.prototype.jquery) {
    // jQuery
    el = multi ? param.toArray() : param.get(0);
  } else if (Array.isArray(param)) {
    el = param.map(function (v) {
      return $(v);
    });
    if (!multi) {
      el = el.length >= 1 ? el[0] : undefined;
    }
  }
  return el;
};
var raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame;
var caf = win.cancelAnimationFrame || win.webkitCancelAnimationFrame;
if (raf && !caf) {
  var keyInfo_1 = {};
  var oldraf_1 = raf;
  raf = function (callback) {
    var wrapCallback = function (timestamp) {
      if (keyInfo_1[key]) {
        callback(timestamp);
      }
    };
    var key = oldraf_1(wrapCallback);
    keyInfo_1[key] = true;
    return key;
  };
  caf = function (key) {
    delete keyInfo_1[key];
  };
} else if (!(raf && caf)) {
  raf = function (callback) {
    return win.setTimeout(function () {
      callback(win.performance && win.performance.now && win.performance.now() || new Date().getTime());
    }, 16);
  };
  caf = win.clearTimeout;
}
/**
 * A polyfill for the window.requestAnimationFrame() method.
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * @private
 */

var requestAnimationFrame = function (fp) {
  return raf(fp);
};
/**
 * A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
 * @param {Number} key −  The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드가 반환한 아이디 값</ko>
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
 * @private
 */

var cancelAnimationFrame = function (key) {
  caf(key);
};
var map = function (obj, callback) {
  var tranformed = {};
  for (var k in obj) {
    if (k) {
      tranformed[k] = callback(obj[k], k);
    }
  }
  return tranformed;
};
var filter = function (obj, callback) {
  var filtered = {};
  for (var k in obj) {
    if (k && callback(obj[k], k)) {
      filtered[k] = obj[k];
    }
  }
  return filtered;
};
var every = function (obj, callback) {
  for (var k in obj) {
    if (k && !callback(obj[k], k)) {
      return false;
    }
  }
  return true;
};
var equal = function (target, base) {
  return every(target, function (v, k) {
    return v === base[k];
  });
};
var roundNumFunc = {};
var roundNumber = function (num, roundUnit) {
  // Cache for performance
  if (!roundNumFunc[roundUnit]) {
    roundNumFunc[roundUnit] = getRoundFunc(roundUnit);
  }
  return roundNumFunc[roundUnit](num);
};
var roundNumbers = function (num, roundUnit) {
  if (!num || !roundUnit) {
    return num;
  }
  return map(num, function (value, key) {
    return roundNumber(value, typeof roundUnit === "number" ? roundUnit : roundUnit[key]);
  });
};
var getDecimalPlace = function (val) {
  if (!isFinite(val)) {
    return 0;
  }
  var v = "".concat(val);
  if (v.indexOf("e") >= 0) {
    // Exponential Format
    // 1e-10, 1e-12
    var p = 0;
    var e = 1;
    while (Math.round(val * e) / e !== val) {
      e *= 10;
      p++;
    }
    return p;
  } // In general, following has performance benefit.
  // https://jsperf.com/precision-calculation

  return v.indexOf(".") >= 0 ? v.length - v.indexOf(".") - 1 : 0;
};
var inversePow = function (n) {
  // replace Math.pow(10, -n) to solve floating point issue.
  // eg. Math.pow(10, -4) => 0.00009999999999999999
  return 1 / Math.pow(10, n);
};
var getRoundFunc = function (v) {
  var p = v < 1 ? Math.pow(10, getDecimalPlace(v)) : 1;
  return function (n) {
    if (v === 0) {
      return 0;
    }
    return Math.round(Math.round(n / v) * v * p) / p;
  };
};
var getAngle = function (posX, posY) {
  return Math.atan2(posY, posX) * 180 / Math.PI;
};
var isCssPropsFromAxes = function (originalCssProps) {
  var same = true;
  Object.keys(PREVENT_DRAG_CSSPROPS).forEach(function (prop) {
    if (!originalCssProps || originalCssProps[prop] !== PREVENT_DRAG_CSSPROPS[prop]) {
      same = false;
    }
  });
  return same;
};
var getDirection = function (useHorizontal, useVertical) {
  if (useHorizontal && useVertical) {
    return DIRECTION_ALL;
  } else if (useHorizontal) {
    return DIRECTION_HORIZONTAL;
  } else if (useVertical) {
    return DIRECTION_VERTICAL;
  } else {
    return DIRECTION_NONE;
  }
};
var useDirection = function (checkType, direction, userDirection) {
  if (userDirection) {
    return !!(direction === DIRECTION_ALL || direction & checkType && userDirection & checkType);
  } else {
    return !!(direction & checkType);
  }
};
var setCssProps = function (element, option, direction) {
  var _a;
  var touchActionMap = (_a = {}, _a[DIRECTION_NONE] = "auto", _a[DIRECTION_ALL] = "none", _a[DIRECTION_VERTICAL] = "pan-x", _a[DIRECTION_HORIZONTAL] = "pan-y", _a);
  var oldCssProps = {};
  if (element && element.style) {
    var touchAction = option.touchAction ? option.touchAction : touchActionMap[direction];
    var newCssProps_1 = __assign(__assign({}, PREVENT_DRAG_CSSPROPS), {
      "touch-action": element.style["touch-action"] === "none" ? "none" : touchAction
    });
    Object.keys(newCssProps_1).forEach(function (prop) {
      oldCssProps[prop] = element.style[prop];
      element.style[prop] = newCssProps_1[prop];
    });
  }
  return oldCssProps;
};
var revertCssProps = function (element, originalCssProps) {
  if (element && element.style && originalCssProps) {
    Object.keys(originalCssProps).forEach(function (prop) {
      element.style[prop] = originalCssProps[prop];
    });
  }
  return;
};
var EventManager = /*#__PURE__*/
function () {
  function EventManager(_axes) {
    this._axes = _axes;
  }
  /**
   * This event is fired when a user holds an element on the screen of the device.
   * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
   * @event Axes#hold
   * @type {object}
   * @property {Object.<string, number>} pos coordinate <ko>좌표 정보</ko>
   * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("hold", function(event) {
   *   // event.pos
   *   // event.input
   *   // event.inputEvent
   *   // isTrusted
   * });
   * ```
   */

  var __proto = EventManager.prototype;
  __proto.hold = function (pos, option) {
    var roundPos = this._getRoundPos(pos).roundPos;
    this._axes.trigger(new ComponentEvent$1("hold", {
      pos: roundPos,
      input: option.input || null,
      inputEvent: option.event || null,
      isTrusted: true
    }));
  };
  /**
   * Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
   * @ko 'change' 이벤트 이후 이동할 좌표를 지정한다. change이벤트의 holding 값이 true일 경우에 동작한다
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("change", function(event) {
   *   event.holding && event.set({x: 10});
   * });
   * ```
   */

  /** Specifies the animation coordinates to move after the 'release' or 'animationStart' events.
   * @ko 'release' 또는 'animationStart' 이벤트 이후 이동할 좌표를 지정한다.
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("animationStart", function(event) {
   *   event.setTo({x: 10}, 2000);
   * });
   * ```
   */

  /**
   * This event is fired when a user release an element on the screen of the device.
   * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
   * @event Axes#release
   * @type {object}
   * @property {Object.<string, number>} depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
   * @property {Object.<string, number>} destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
   * @property {Object.<string, number>} bounceRatio If the coordinates at the time of release are in the bounce area, the current bounce value divided by the maximum bounce value <ko>손을 뗐을 때의 좌표가 bounce 영역에 있는 경우 현재 bounce된 값을 최대 bounce 값으로 나눈 수치.</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
   * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
   * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("release", function(event) {
   *   // event.depaPos
   *   // event.destPos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.setTo
   *   // event.isTrusted
   *
   *   // if you want to change the animation coordinates to move after the 'release' event.
   *   event.setTo({x: 10}, 2000);
   * });
   * ```
   */

  __proto.triggerRelease = function (param) {
    var _a = this._getRoundPos(param.destPos, param.depaPos),
      roundPos = _a.roundPos,
      roundDepa = _a.roundDepa;
    param.destPos = roundPos;
    param.depaPos = roundDepa;
    param.setTo = this._createUserControll(param.destPos, param.duration);
    this._axes.trigger(new ComponentEvent$1("release", __assign(__assign({}, param), {
      bounceRatio: this._getBounceRatio(roundPos)
    })));
  };
  /**
   * This event is fired when coordinate changes.
   * @ko 좌표가 변경됐을 때 발생하는 이벤트
   * @event Axes#change
   * @type {object}
   * @property {Object.<string, number>} pos  The coordinate <ko>좌표</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
   * @property {Object.<string, number>} bounceRatio If the current coordinates are in the bounce area, the current bounce value divided by the maximum bounce value <ko>현재 좌표가 bounce 영역에 있는 경우 현재 bounce된 값을 최대 bounce 값으로 나눈 수치.</ko>
   * @property {Boolean} holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
   * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
   * @property {Object} inputEvent The event object received from inputType. If the value is changed by animation, it returns 'null'.<ko>inputType으로 부터 받은 이벤트 객체. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
   * @property {set} set Specifies the coordinates to move after the event. It works when the holding value is true <ko>이벤트 이후 이동할 좌표를 지정한다. holding 값이 true일 경우에 동작한다.</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("change", function(event) {
   *   // event.pos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.holding
   *   // event.set
   *   // event.isTrusted
   *
   *   // if you want to change the coordinates to move after the 'change' event.
   *   // it works when the holding value of the change event is true.
   *   event.holding && event.set({x: 10});
   * });
   * ```
   */

  __proto.triggerChange = function (pos, depaPos, option, holding) {
    var _this = this;
    if (holding === void 0) {
      holding = false;
    }
    var animationManager = this.animationManager;
    var axisManager = animationManager.axisManager;
    var eventInfo = animationManager.getEventInfo();
    var _a = this._getRoundPos(pos, depaPos),
      roundPos = _a.roundPos,
      roundDepa = _a.roundDepa;
    var moveTo = axisManager.moveTo(roundPos, roundDepa);
    var inputEvent = (option === null || option === void 0 ? void 0 : option.event) || (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.event) || null;
    var param = {
      pos: moveTo.pos,
      delta: moveTo.delta,
      bounceRatio: this._getBounceRatio(moveTo.pos),
      holding: holding,
      inputEvent: inputEvent,
      isTrusted: !!inputEvent,
      input: (option === null || option === void 0 ? void 0 : option.input) || (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.input) || null,
      set: inputEvent ? this._createUserControll(moveTo.pos) : function () {} // eslint-disable-line @typescript-eslint/no-empty-function
    };

    var event = new ComponentEvent$1("change", param);
    this._axes.trigger(event);
    Object.keys(moveTo.pos).forEach(function (axis) {
      var p = moveTo.pos[axis];
      getObserver(_this._axes, axis, p).current = p;
    });
    if (inputEvent) {
      axisManager.set(param.set().destPos);
    }
    return !event.isCanceled();
  };
  /**
   * This event is fired when animation starts.
   * @ko 에니메이션이 시작할 때 발생한다.
   * @event Axes#animationStart
   * @type {object}
   * @property {Object.<string, number>} depaPos The coordinates when animation starts<ko>애니메이션이 시작 되었을 때의 좌표 </ko>
   * @property {Object.<string, number>} destPos The coordinates to move to. If you change this value, you can run the animation<ko>이동할 좌표. 이값을 변경하여 애니메이션을 동작시킬수 있다</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
   * @property {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>애니메이션 진행 시간(단위: ms). 이값을 변경하여 애니메이션의 이동시간을 조절할 수 있다.</ko>
   * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
   * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("release", function(event) {
   *   // event.depaPos
   *   // event.destPos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.setTo
   *   // event.isTrusted
   *
   *   // if you want to change the animation coordinates to move after the 'animationStart' event.
   *   event.setTo({x: 10}, 2000);
   * });
   * ```
   */

  __proto.triggerAnimationStart = function (param) {
    var _a = this._getRoundPos(param.destPos, param.depaPos),
      roundPos = _a.roundPos,
      roundDepa = _a.roundDepa;
    param.destPos = roundPos;
    param.depaPos = roundDepa;
    param.setTo = this._createUserControll(param.destPos, param.duration);
    var event = new ComponentEvent$1("animationStart", param);
    this._axes.trigger(event);
    return !event.isCanceled();
  };
  /**
   * This event is fired when animation ends.
   * @ko 에니메이션이 끝났을 때 발생한다.
   * @event Axes#animationEnd
   * @type {object}
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("animationEnd", function(event) {
   *   // event.isTrusted
   * });
   * ```
   */

  __proto.triggerAnimationEnd = function (isTrusted) {
    if (isTrusted === void 0) {
      isTrusted = false;
    }
    this._axes.trigger(new ComponentEvent$1("animationEnd", {
      isTrusted: isTrusted
    }));
  };
  /**
   * This event is fired when all actions have been completed.
   * @ko 에니메이션이 끝났을 때 발생한다.
   * @event Axes#finish
   * @type {object}
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   *
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("finish", function(event) {
   *   // event.isTrusted
   * });
   * ```
   */

  __proto.triggerFinish = function (isTrusted) {
    if (isTrusted === void 0) {
      isTrusted = false;
    }
    this._axes.trigger(new ComponentEvent$1("finish", {
      isTrusted: isTrusted
    }));
  };
  __proto.setAnimationManager = function (animationManager) {
    this.animationManager = animationManager;
  };
  __proto.destroy = function () {
    this._axes.off();
  };
  __proto._createUserControll = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    } // to controll

    var userControl = {
      destPos: __assign({}, pos),
      duration: duration
    };
    return function (toPos, userDuration) {
      if (toPos) {
        userControl.destPos = __assign({}, toPos);
      }
      if (userDuration !== undefined) {
        userControl.duration = userDuration;
      }
      return userControl;
    };
  };
  __proto._getRoundPos = function (pos, depaPos) {
    // round value if round exist
    var roundUnit = this._axes.options.round; // if (round == null) {
    //   return {pos, depaPos}; // undefined, undefined
    // }

    return {
      roundPos: roundNumbers(pos, roundUnit),
      roundDepa: roundNumbers(depaPos, roundUnit)
    };
  };
  __proto._getBounceRatio = function (pos) {
    return this._axes.axisManager.map(pos, function (v, opt) {
      if (v < opt.range[0] && opt.bounce[0] !== 0) {
        return (opt.range[0] - v) / opt.bounce[0];
      } else if (v > opt.range[1] && opt.bounce[1] !== 0) {
        return (v - opt.range[1]) / opt.bounce[1];
      } else {
        return 0;
      }
    });
  };
  return EventManager;
}();
var InterruptManager = /*#__PURE__*/
function () {
  function InterruptManager(_options) {
    this._options = _options;
    this._prevented = false; //  check whether the animation event was prevented
  }

  var __proto = InterruptManager.prototype;
  __proto.isInterrupting = function () {
    // when interruptable is 'true', return value is always 'true'.
    return this._options.interruptable || this._prevented;
  };
  __proto.isInterrupted = function () {
    return !this._options.interruptable && this._prevented;
  };
  __proto.setInterrupt = function (prevented) {
    if (!this._options.interruptable) {
      this._prevented = prevented;
    }
  };
  return InterruptManager;
}();

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
var getInsidePosition = function (destPos, range, circular, bounce) {
  var toDestPos = destPos;
  var targetRange = [circular[0] ? range[0] : bounce ? range[0] - bounce[0] : range[0], circular[1] ? range[1] : bounce ? range[1] + bounce[1] : range[1]];
  toDestPos = Math.max(targetRange[0], toDestPos);
  toDestPos = Math.min(targetRange[1], toDestPos);
  return toDestPos;
}; // determine outside

var isOutside = function (pos, range) {
  return pos < range[0] || pos > range[1];
}; // determine whether position has reached the maximum moveable area

var isEndofBounce = function (pos, range, bounce, circular) {
  return !circular[0] && pos === range[0] - bounce[0] || !circular[1] && pos === range[1] + bounce[1];
};
var getDuration = function (distance, deceleration) {
  var duration = Math.sqrt(distance / deceleration * 2); // when duration is under 100, then value is zero

  return duration < 100 ? 0 : duration;
};
var isCircularable = function (destPos, range, circular) {
  return circular[1] && destPos > range[1] || circular[0] && destPos < range[0];
};
var getCirculatedPos = function (pos, range, circular) {
  var toPos = pos;
  var min = range[0];
  var max = range[1];
  var length = max - min;
  if (circular[1] && pos > max) {
    // right
    toPos = (toPos - max) % length + min;
  }
  if (circular[0] && pos < min) {
    // left
    toPos = (toPos - min) % length + max;
  }
  return toPos;
};
var AxisManager = /*#__PURE__*/
function () {
  function AxisManager(_axis) {
    var _this = this;
    this._axis = _axis;
    this._complementOptions();
    this._pos = Object.keys(this._axis).reduce(function (pos, v) {
      pos[v] = _this._axis[v].startPos;
      return pos;
    }, {});
  }
  var __proto = AxisManager.prototype;
  __proto.getDelta = function (depaPos, destPos) {
    var fullDepaPos = this.get(depaPos);
    return map(this.get(destPos), function (v, k) {
      return v - fullDepaPos[k];
    });
  };
  __proto.get = function (axes) {
    var _this = this;
    if (axes && Array.isArray(axes)) {
      return axes.reduce(function (acc, v) {
        if (v && v in _this._pos) {
          acc[v] = _this._pos[v];
        }
        return acc;
      }, {});
    } else {
      return __assign(__assign({}, this._pos), axes || {});
    }
  };
  __proto.moveTo = function (pos, depaPos) {
    if (depaPos === void 0) {
      depaPos = this._pos;
    }
    var delta = map(this._pos, function (v, key) {
      return key in pos && key in depaPos ? pos[key] - depaPos[key] : 0;
    });
    this.set(this.map(pos, function (v, opt) {
      return opt ? getCirculatedPos(v, opt.range, opt.circular) : 0;
    }));
    return {
      pos: __assign({}, this._pos),
      delta: delta
    };
  };
  __proto.set = function (pos) {
    for (var k in pos) {
      if (k && k in this._pos) {
        this._pos[k] = pos[k];
      }
    }
  };
  __proto.every = function (pos, callback) {
    var axisOptions = this._axis;
    return every(pos, function (value, key) {
      return callback(value, axisOptions[key], key);
    });
  };
  __proto.filter = function (pos, callback) {
    var axisOptions = this._axis;
    return filter(pos, function (value, key) {
      return callback(value, axisOptions[key], key);
    });
  };
  __proto.map = function (pos, callback) {
    var axisOptions = this._axis;
    return map(pos, function (value, key) {
      return callback(value, axisOptions[key], key);
    });
  };
  __proto.isOutside = function (axes) {
    return !this.every(axes ? this.get(axes) : this._pos, function (v, opt) {
      return !isOutside(v, opt.range);
    });
  };
  __proto.getAxisOptions = function (key) {
    return this._axis[key];
  };
  __proto.setAxis = function (axis) {
    var _this = this;
    Object.keys(axis).forEach(function (key) {
      if (!_this._axis[key]) {
        throw new Error("Axis ".concat(key, " does not exist in Axes instance"));
      }
      _this._axis[key] = __assign(__assign({}, _this._axis[key]), axis[key]);
    });
    this._complementOptions();
  };
  /**
   * set up 'css' expression
   * @private
   */

  __proto._complementOptions = function () {
    var _this = this;
    Object.keys(this._axis).forEach(function (axis) {
      _this._axis[axis] = __assign({
        range: [0, 100],
        startPos: _this._axis[axis].range[0],
        bounce: [0, 0],
        circular: [false, false]
      }, _this._axis[axis]);
      ["bounce", "circular"].forEach(function (v) {
        var axisOption = _this._axis;
        var key = axisOption[axis][v];
        if (/string|number|boolean/.test(typeof key)) {
          axisOption[axis][v] = [key, key];
        }
      });
    });
  };
  return AxisManager;
}();
var SUPPORT_TOUCH = ("ontouchstart" in win);
var SUPPORT_POINTER = ("PointerEvent" in win);
var SUPPORT_MSPOINTER = ("MSPointerEvent" in win);
var SUPPORT_POINTER_EVENTS = SUPPORT_POINTER || SUPPORT_MSPOINTER;
var isValidKey = function (event, inputKey) {
  if (!inputKey || inputKey.indexOf(ANY) > -1 || inputKey.indexOf(NONE) > -1 && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey || inputKey.indexOf(SHIFT) > -1 && event.shiftKey || inputKey.indexOf(CTRL) > -1 && event.ctrlKey || inputKey.indexOf(ALT) > -1 && event.altKey || inputKey.indexOf(META) > -1 && event.metaKey) {
    return true;
  }
  return false;
};
var EventInput = /*#__PURE__*/
function () {
  function EventInput() {
    var _this = this;
    this._stopContextMenu = function (event) {
      event.preventDefault();
      win.removeEventListener("contextmenu", _this._stopContextMenu);
    };
  }
  var __proto = EventInput.prototype;
  __proto.extendEvent = function (event) {
    var _a;
    var prevEvent = this.prevEvent;
    var center = this._getCenter(event);
    var movement = prevEvent ? this._getMovement(event) : {
      x: 0,
      y: 0
    };
    var scale = prevEvent ? this._getScale(event) : 1;
    var angle = prevEvent ? getAngle(center.x - prevEvent.center.x, center.y - prevEvent.center.y) : 0;
    var deltaX = prevEvent ? prevEvent.deltaX + movement.x : movement.x;
    var deltaY = prevEvent ? prevEvent.deltaY + movement.y : movement.y;
    var offsetX = movement.x;
    var offsetY = movement.y;
    var latestInterval = this._latestInterval;
    var timeStamp = Date.now();
    var deltaTime = latestInterval ? timeStamp - latestInterval.timestamp : 0;
    var velocityX = prevEvent ? prevEvent.velocityX : 0;
    var velocityY = prevEvent ? prevEvent.velocityY : 0;
    if (!latestInterval || deltaTime >= VELOCITY_INTERVAL) {
      if (latestInterval) {
        _a = [(deltaX - latestInterval.deltaX) / deltaTime, (deltaY - latestInterval.deltaY) / deltaTime], velocityX = _a[0], velocityY = _a[1];
      }
      this._latestInterval = {
        timestamp: timeStamp,
        deltaX: deltaX,
        deltaY: deltaY
      };
    }
    return {
      srcEvent: event,
      scale: scale,
      angle: angle,
      center: center,
      deltaX: deltaX,
      deltaY: deltaY,
      offsetX: offsetX,
      offsetY: offsetY,
      velocityX: velocityX,
      velocityY: velocityY,
      preventSystemEvent: true
    };
  };
  __proto._getDistance = function (start, end) {
    var x = end.clientX - start.clientX;
    var y = end.clientY - start.clientY;
    return Math.sqrt(x * x + y * y);
  };
  __proto._getButton = function (event) {
    var buttonCodeMap = {
      1: MOUSE_LEFT,
      2: MOUSE_RIGHT,
      4: MOUSE_MIDDLE
    };
    var button = this._isTouchEvent(event) ? MOUSE_LEFT : buttonCodeMap[event.buttons];
    return button ? button : null;
  };
  __proto._isTouchEvent = function (event) {
    return event.type && event.type.indexOf("touch") > -1;
  };
  __proto._isValidButton = function (button, inputButton) {
    return inputButton.indexOf(button) > -1;
  };
  __proto._isValidEvent = function (event, inputKey, inputButton) {
    return (!inputKey || isValidKey(event, inputKey)) && (!inputButton || this._isValidButton(this._getButton(event), inputButton));
  };
  __proto._preventMouseButton = function (event, button) {
    if (button === MOUSE_RIGHT) {
      win.addEventListener("contextmenu", this._stopContextMenu);
    } else if (button === MOUSE_MIDDLE) {
      event.preventDefault();
    }
  };
  return EventInput;
}();
var MouseEventInput = /*#__PURE__*/
function (_super) {
  __extends(MouseEventInput, _super);
  function MouseEventInput() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.start = ["mousedown"];
    _this.move = ["mousemove"];
    _this.end = ["mouseup"];
    return _this;
  }
  var __proto = MouseEventInput.prototype;
  __proto.onEventStart = function (event, inputKey, inputButton) {
    var button = this._getButton(event);
    if (!this._isValidEvent(event, inputKey, inputButton)) {
      return null;
    }
    this._preventMouseButton(event, button);
    return this.extendEvent(event);
  };
  __proto.onEventMove = function (event, inputKey, inputButton) {
    if (!this._isValidEvent(event, inputKey, inputButton)) {
      return null;
    }
    return this.extendEvent(event);
  };
  __proto.onEventEnd = function () {
    return;
  };
  __proto.onRelease = function () {
    this.prevEvent = null;
    return;
  };
  __proto.getTouches = function (event, inputButton) {
    if (inputButton) {
      var buttonCodeMap = {
        1: MOUSE_LEFT,
        2: MOUSE_MIDDLE,
        3: MOUSE_RIGHT
      };
      return this._isValidButton(buttonCodeMap[event.which], inputButton) && this.end.indexOf(event.type) === -1 ? 1 : 0;
    }
    return 0;
  };
  __proto._getScale = function () {
    return 1;
  };
  __proto._getCenter = function (event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  };
  __proto._getMovement = function (event) {
    var prev = this.prevEvent.srcEvent;
    return {
      x: event.clientX - prev.clientX,
      y: event.clientY - prev.clientY
    };
  };
  return MouseEventInput;
}(EventInput);
var TouchEventInput = /*#__PURE__*/
function (_super) {
  __extends(TouchEventInput, _super);
  function TouchEventInput() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.start = ["touchstart"];
    _this.move = ["touchmove"];
    _this.end = ["touchend", "touchcancel"];
    return _this;
  }
  var __proto = TouchEventInput.prototype;
  __proto.onEventStart = function (event, inputKey) {
    this._baseTouches = event.touches;
    if (!this._isValidEvent(event, inputKey)) {
      return null;
    }
    return this.extendEvent(event);
  };
  __proto.onEventMove = function (event, inputKey) {
    if (!this._isValidEvent(event, inputKey)) {
      return null;
    }
    return this.extendEvent(event);
  };
  __proto.onEventEnd = function (event) {
    this._baseTouches = event.touches;
    return;
  };
  __proto.onRelease = function () {
    this.prevEvent = null;
    this._baseTouches = null;
    return;
  };
  __proto.getTouches = function (event) {
    return event.touches.length;
  };
  __proto._getScale = function (event) {
    if (event.touches.length !== 2 || this._baseTouches.length < 2) {
      return null; // TODO: consider calculating non-pinch gesture scale
    }

    return this._getDistance(event.touches[0], event.touches[1]) / this._getDistance(this._baseTouches[0], this._baseTouches[1]);
  };
  __proto._getCenter = function (event) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
  };
  __proto._getMovement = function (event) {
    var prev = this.prevEvent.srcEvent;
    if (event.touches[0].identifier !== prev.touches[0].identifier) {
      return {
        x: 0,
        y: 0
      };
    }
    return {
      x: event.touches[0].clientX - prev.touches[0].clientX,
      y: event.touches[0].clientY - prev.touches[0].clientY
    };
  };
  return TouchEventInput;
}(EventInput);
var PointerEventInput = /*#__PURE__*/
function (_super) {
  __extends(PointerEventInput, _super);
  function PointerEventInput() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.start = SUPPORT_POINTER ? ["pointerdown"] : ["MSPointerDown"];
    _this.move = SUPPORT_POINTER ? ["pointermove"] : ["MSPointerMove"];
    _this.end = SUPPORT_POINTER ? ["pointerup", "pointercancel"] : ["MSPointerUp", "MSPointerCancel"]; // store first, recent inputs for each event id

    _this._firstInputs = [];
    _this._recentInputs = [];
    return _this;
  }
  var __proto = PointerEventInput.prototype;
  __proto.onEventStart = function (event, inputKey, inputButton) {
    var button = this._getButton(event);
    if (!this._isValidEvent(event, inputKey, inputButton)) {
      return null;
    }
    this._preventMouseButton(event, button);
    this._updatePointerEvent(event);
    return this.extendEvent(event);
  };
  __proto.onEventMove = function (event, inputKey, inputButton) {
    if (!this._isValidEvent(event, inputKey, inputButton)) {
      return null;
    }
    this._updatePointerEvent(event);
    return this.extendEvent(event);
  };
  __proto.onEventEnd = function (event) {
    this._removePointerEvent(event);
  };
  __proto.onRelease = function () {
    this.prevEvent = null;
    this._firstInputs = [];
    this._recentInputs = [];
    return;
  };
  __proto.getTouches = function () {
    return this._recentInputs.length;
  };
  __proto._getScale = function () {
    if (this._recentInputs.length !== 2) {
      return null; // TODO: consider calculating non-pinch gesture scale
    }

    return this._getDistance(this._recentInputs[0], this._recentInputs[1]) / this._getDistance(this._firstInputs[0], this._firstInputs[1]);
  };
  __proto._getCenter = function (event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  };
  __proto._getMovement = function (event) {
    var prev = this.prevEvent.srcEvent;
    if (event.pointerId !== prev.pointerId) {
      return {
        x: 0,
        y: 0
      };
    }
    return {
      x: event.clientX - prev.clientX,
      y: event.clientY - prev.clientY
    };
  };
  __proto._updatePointerEvent = function (event) {
    var _this = this;
    var addFlag = false;
    this._recentInputs.forEach(function (e, i) {
      if (e.pointerId === event.pointerId) {
        addFlag = true;
        _this._recentInputs[i] = event;
      }
    });
    if (!addFlag) {
      this._firstInputs.push(event);
      this._recentInputs.push(event);
    }
  };
  __proto._removePointerEvent = function (event) {
    this._firstInputs = this._firstInputs.filter(function (x) {
      return x.pointerId !== event.pointerId;
    });
    this._recentInputs = this._recentInputs.filter(function (x) {
      return x.pointerId !== event.pointerId;
    });
  };
  return PointerEventInput;
}(EventInput);
var TouchMouseEventInput = /*#__PURE__*/
function (_super) {
  __extends(TouchMouseEventInput, _super);
  function TouchMouseEventInput() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.start = ["mousedown", "touchstart"];
    _this.move = ["mousemove", "touchmove"];
    _this.end = ["mouseup", "touchend", "touchcancel"];
    return _this;
  }
  var __proto = TouchMouseEventInput.prototype;
  __proto.onEventStart = function (event, inputKey, inputButton) {
    var button = this._getButton(event);
    if (this._isTouchEvent(event)) {
      this._baseTouches = event.touches;
    }
    if (!this._isValidEvent(event, inputKey, inputButton)) {
      return null;
    }
    this._preventMouseButton(event, button);
    return this.extendEvent(event);
  };
  __proto.onEventMove = function (event, inputKey, inputButton) {
    if (!this._isValidEvent(event, inputKey, inputButton)) {
      return null;
    }
    return this.extendEvent(event);
  };
  __proto.onEventEnd = function (event) {
    if (this._isTouchEvent(event)) {
      this._baseTouches = event.touches;
    }
    return;
  };
  __proto.onRelease = function () {
    this.prevEvent = null;
    this._baseTouches = null;
    return;
  };
  __proto.getTouches = function (event) {
    return this._isTouchEvent(event) ? event.touches.length : 0;
  };
  __proto._getScale = function (event) {
    if (this._isTouchEvent(event)) {
      if (event.touches.length !== 2 || this._baseTouches.length < 2) {
        return 1; // TODO: consider calculating non-pinch gesture scale
      }

      return this._getDistance(event.touches[0], event.touches[1]) / this._getDistance(this._baseTouches[0], this._baseTouches[1]);
    }
    return this.prevEvent.scale;
  };
  __proto._getCenter = function (event) {
    if (this._isTouchEvent(event)) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    }
    return {
      x: event.clientX,
      y: event.clientY
    };
  };
  __proto._getMovement = function (event) {
    var _this = this;
    var prev = this.prevEvent.srcEvent;
    var _a = [event, prev].map(function (e) {
        if (_this._isTouchEvent(e)) {
          return {
            id: e.touches[0].identifier,
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          };
        }
        return {
          id: null,
          x: e.clientX,
          y: e.clientY
        };
      }),
      nextSpot = _a[0],
      prevSpot = _a[1];
    return nextSpot.id === prevSpot.id ? {
      x: nextSpot.x - prevSpot.x,
      y: nextSpot.y - prevSpot.y
    } : {
      x: 0,
      y: 0
    };
  };
  return TouchMouseEventInput;
}(EventInput);
var toAxis = function (source, offset) {
  return offset.reduce(function (acc, v, i) {
    if (source[i]) {
      acc[source[i]] = v;
    }
    return acc;
  }, {});
};
var convertInputType = function (inputType) {
  if (inputType === void 0) {
    inputType = [];
  }
  var hasTouch = false;
  var hasMouse = false;
  var hasPointer = false;
  inputType.forEach(function (v) {
    switch (v) {
      case "mouse":
        hasMouse = true;
        break;
      case "touch":
        hasTouch = SUPPORT_TOUCH;
        break;
      case "pointer":
        hasPointer = SUPPORT_POINTER_EVENTS;
      // no default
    }
  });

  if (hasPointer) {
    return new PointerEventInput();
  } else if (hasTouch && hasMouse) {
    return new TouchMouseEventInput();
  } else if (hasTouch) {
    return new TouchEventInput();
  } else if (hasMouse) {
    return new MouseEventInput();
  }
  return null;
};
function getAddEventOptions(eventName) {
  // The passive default value of the touch event is true.
  // If not a touch event, return false to support ie11
  return eventName.indexOf("touch") > -1 ? {
    passive: false
  } : false;
}
var InputObserver = /*#__PURE__*/
function () {
  function InputObserver(_a) {
    var options = _a.options,
      interruptManager = _a.interruptManager,
      eventManager = _a.eventManager,
      axisManager = _a.axisManager,
      animationManager = _a.animationManager;
    this._isOutside = false;
    this._moveDistance = null;
    this._isStopped = false;
    this.options = options;
    this._interruptManager = interruptManager;
    this._eventManager = eventManager;
    this._axisManager = axisManager;
    this._animationManager = animationManager;
  }
  var __proto = InputObserver.prototype;
  __proto.get = function (input) {
    return this._axisManager.get(input.axes);
  };
  __proto.hold = function (input, event) {
    if (this._interruptManager.isInterrupted() || !input.axes.length) {
      return;
    }
    var changeOption = {
      input: input,
      event: event
    };
    this._isStopped = false;
    this._interruptManager.setInterrupt(true);
    this._animationManager.stopAnimation(changeOption);
    if (!this._moveDistance) {
      this._eventManager.hold(this._axisManager.get(), changeOption);
    }
    this._isOutside = this._axisManager.isOutside(input.axes);
    this._moveDistance = this._axisManager.get(input.axes);
  };
  __proto.change = function (input, event, offset, useAnimation) {
    if (this._isStopped || !this._interruptManager.isInterrupting() || this._axisManager.every(offset, function (v) {
      return v === 0;
    })) {
      return;
    }
    var nativeEvent = event.srcEvent ? event.srcEvent : event;
    if (nativeEvent.__childrenAxesAlreadyChanged) {
      return;
    }
    var depaPos = this._moveDistance || this._axisManager.get(input.axes);
    var destPos; // for outside logic

    destPos = map(depaPos, function (v, k) {
      return v + (offset[k] || 0);
    });
    if (this._moveDistance) {
      this._moveDistance = this._axisManager.map(destPos, function (v, _a) {
        var circular = _a.circular,
          range = _a.range;
        return circular && (circular[0] || circular[1]) ? getCirculatedPos(v, range, circular) : v;
      });
    } // from outside to inside

    if (this._isOutside && this._axisManager.every(depaPos, function (v, opt) {
      return !isOutside(v, opt.range);
    })) {
      this._isOutside = false;
    }
    depaPos = this._atOutside(depaPos);
    destPos = this._atOutside(destPos);
    if (!this.options.nested || !this._isEndofAxis(offset, depaPos, destPos)) {
      nativeEvent.__childrenAxesAlreadyChanged = true;
    }
    var changeOption = {
      input: input,
      event: event
    };
    if (useAnimation) {
      var duration = this._animationManager.getDuration(destPos, depaPos);
      this._animationManager.animateTo(destPos, duration, changeOption);
    } else {
      var isCanceled = !this._eventManager.triggerChange(destPos, depaPos, changeOption, true);
      if (isCanceled) {
        this._isStopped = true;
        this._moveDistance = null;
        this._animationManager.finish(false);
      }
    }
  };
  __proto.release = function (input, event, velocity, inputDuration) {
    if (this._isStopped || !this._interruptManager.isInterrupting() || !this._moveDistance) {
      return;
    }
    var nativeEvent = event.srcEvent ? event.srcEvent : event;
    if (nativeEvent.__childrenAxesAlreadyReleased) {
      velocity = velocity.map(function () {
        return 0;
      });
    }
    var pos = this._axisManager.get(input.axes);
    var depaPos = this._axisManager.get();
    var displacement = this._animationManager.getDisplacement(velocity);
    var offset = toAxis(input.axes, displacement);
    var destPos = this._axisManager.get(this._axisManager.map(offset, function (v, opt, k) {
      if (opt.circular && (opt.circular[0] || opt.circular[1])) {
        return pos[k] + v;
      } else {
        return getInsidePosition(pos[k] + v, opt.range, opt.circular, opt.bounce);
      }
    }));
    nativeEvent.__childrenAxesAlreadyReleased = true;
    var duration = this._animationManager.getDuration(destPos, pos, inputDuration);
    if (duration === 0) {
      destPos = __assign({}, depaPos);
    } // prepare params

    var param = {
      depaPos: depaPos,
      destPos: destPos,
      duration: duration,
      delta: this._axisManager.getDelta(depaPos, destPos),
      inputEvent: event,
      input: input,
      isTrusted: true
    };
    this._eventManager.triggerRelease(param);
    this._moveDistance = null; // to contol

    var userWish = this._animationManager.getUserControl(param);
    var isEqual = equal(userWish.destPos, depaPos);
    var changeOption = {
      input: input,
      event: event
    };
    if (isEqual || userWish.duration === 0) {
      if (!isEqual) {
        this._eventManager.triggerChange(userWish.destPos, depaPos, changeOption, true);
      }
      this._interruptManager.setInterrupt(false);
      if (this._axisManager.isOutside()) {
        this._animationManager.restore(changeOption);
      } else {
        this._eventManager.triggerFinish(true);
      }
    } else {
      this._animationManager.animateTo(userWish.destPos, userWish.duration, changeOption);
    }
  }; // when move pointer is held in outside

  __proto._atOutside = function (pos) {
    var _this = this;
    if (this._isOutside) {
      return this._axisManager.map(pos, function (v, opt) {
        var tn = opt.range[0] - opt.bounce[0];
        var tx = opt.range[1] + opt.bounce[1];
        return v > tx ? tx : v < tn ? tn : v;
      });
    } else {
      return this._axisManager.map(pos, function (v, opt) {
        var min = opt.range[0];
        var max = opt.range[1];
        var out = opt.bounce;
        var circular = opt.circular;
        if (circular[0] && v < min || circular[1] && v > max) {
          return v;
        } else if (v < min) {
          // left
          return min - _this._animationManager.interpolate(min - v, out[0]);
        } else if (v > max) {
          // right
          return max + _this._animationManager.interpolate(v - max, out[1]);
        }
        return v;
      });
    }
  };
  __proto._isEndofAxis = function (offset, depaPos, destPos) {
    return this._axisManager.every(depaPos, function (value, option, key) {
      return offset[key] === 0 || depaPos[key] === destPos[key] && isEndofBounce(value, option.range, option.bounce, option.circular);
    });
  };
  return InputObserver;
}();
var clamp = function (value, min, max) {
  return Math.max(Math.min(value, max), min);
};
var AnimationManager = /*#__PURE__*/
function () {
  function AnimationManager(_a) {
    var options = _a.options,
      interruptManager = _a.interruptManager,
      eventManager = _a.eventManager,
      axisManager = _a.axisManager;
    this._options = options;
    this.interruptManager = interruptManager;
    this.eventManager = eventManager;
    this.axisManager = axisManager;
    this.animationEnd = this.animationEnd.bind(this);
  }
  var __proto = AnimationManager.prototype;
  __proto.getDuration = function (depaPos, destPos, wishDuration) {
    var _this = this;
    var duration;
    if (typeof wishDuration !== "undefined") {
      duration = wishDuration;
    } else {
      var durations_1 = map(destPos, function (v, k) {
        return getDuration(Math.abs(v - depaPos[k]), _this._options.deceleration);
      });
      duration = Object.keys(durations_1).reduce(function (max, v) {
        return Math.max(max, durations_1[v]);
      }, -Infinity);
    }
    return clamp(duration, this._options.minimumDuration, this._options.maximumDuration);
  };
  __proto.getDisplacement = function (velocity) {
    var totalVelocity = Math.pow(velocity.reduce(function (total, v) {
      return total + v * v;
    }, 0), 1 / velocity.length);
    var duration = Math.abs(totalVelocity / -this._options.deceleration);
    return velocity.map(function (v) {
      return v / 2 * duration;
    });
  };
  __proto.stopAnimation = function (option) {
    if (this._animateParam) {
      var orgPos_1 = this.axisManager.get();
      var pos = this.axisManager.map(orgPos_1, function (v, opt) {
        return getCirculatedPos(v, opt.range, opt.circular);
      });
      if (!every(pos, function (v, k) {
        return orgPos_1[k] === v;
      })) {
        this.eventManager.triggerChange(pos, orgPos_1, option, !!option);
      }
      this._animateParam = null;
      if (this._raf) {
        cancelAnimationFrame(this._raf);
      }
      this._raf = null;
      this.eventManager.triggerAnimationEnd(!!(option === null || option === void 0 ? void 0 : option.event));
    }
  };
  __proto.getEventInfo = function () {
    if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
      return {
        input: this._animateParam.input,
        event: this._animateParam.inputEvent
      };
    } else {
      return null;
    }
  };
  __proto.restore = function (option) {
    var pos = this.axisManager.get();
    var destPos = this.axisManager.map(pos, function (v, opt) {
      return Math.min(opt.range[1], Math.max(opt.range[0], v));
    });
    this.stopAnimation();
    this.animateTo(destPos, this.getDuration(pos, destPos), option);
  };
  __proto.animationEnd = function () {
    var beforeParam = this.getEventInfo();
    this._animateParam = null; // for Circular

    var circularTargets = this.axisManager.filter(this.axisManager.get(), function (v, opt) {
      return isCircularable(v, opt.range, opt.circular);
    });
    if (Object.keys(circularTargets).length > 0) {
      this.setTo(this.axisManager.map(circularTargets, function (v, opt) {
        return getCirculatedPos(v, opt.range, opt.circular);
      }));
    }
    this.interruptManager.setInterrupt(false);
    this.eventManager.triggerAnimationEnd(!!beforeParam);
    if (this.axisManager.isOutside()) {
      this.restore(beforeParam);
    } else {
      this.finish(!!beforeParam);
    }
  };
  __proto.finish = function (isTrusted) {
    this._animateParam = null;
    this.interruptManager.setInterrupt(false);
    this.eventManager.triggerFinish(isTrusted);
  };
  __proto.getUserControl = function (param) {
    var userWish = param.setTo();
    userWish.destPos = this.axisManager.get(userWish.destPos);
    userWish.duration = clamp(userWish.duration, this._options.minimumDuration, this._options.maximumDuration);
    return userWish;
  };
  __proto.animateTo = function (destPos, duration, option) {
    var _this = this;
    this.stopAnimation();
    var param = this._createAnimationParam(destPos, duration, option);
    var depaPos = __assign({}, param.depaPos);
    var retTrigger = this.eventManager.triggerAnimationStart(param); // to control

    var userWish = this.getUserControl(param); // You can't stop the 'animationStart' event when 'circular' is true.

    if (!retTrigger && this.axisManager.every(userWish.destPos, function (v, opt) {
      return isCircularable(v, opt.range, opt.circular);
    })) {
      console.warn("You can't stop the 'animation' event when 'circular' is true.");
    }
    if (retTrigger && !equal(userWish.destPos, depaPos)) {
      var inputEvent = (option === null || option === void 0 ? void 0 : option.event) || null;
      this._animateLoop({
        depaPos: depaPos,
        destPos: userWish.destPos,
        duration: userWish.duration,
        delta: this.axisManager.getDelta(depaPos, userWish.destPos),
        isTrusted: !!inputEvent,
        inputEvent: inputEvent,
        input: (option === null || option === void 0 ? void 0 : option.input) || null
      }, function () {
        return _this.animationEnd();
      });
    }
  };
  __proto.setTo = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }
    var axes = Object.keys(pos);
    var orgPos = this.axisManager.get(axes);
    if (equal(pos, orgPos)) {
      return this;
    }
    this.interruptManager.setInterrupt(true);
    var movedPos = filter(pos, function (v, k) {
      return orgPos[k] !== v;
    });
    if (!Object.keys(movedPos).length) {
      return this;
    }
    movedPos = this.axisManager.map(movedPos, function (v, opt) {
      var range = opt.range,
        circular = opt.circular;
      if (circular && (circular[0] || circular[1])) {
        return v;
      } else {
        return getInsidePosition(v, range, circular);
      }
    });
    if (equal(movedPos, orgPos)) {
      return this;
    }
    if (duration > 0) {
      this.animateTo(movedPos, duration);
    } else {
      this.stopAnimation();
      this.eventManager.triggerChange(movedPos);
      this.finish(false);
    }
    return this;
  };
  __proto.setBy = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }
    return this.setTo(map(this.axisManager.get(Object.keys(pos)), function (v, k) {
      return v + pos[k];
    }), duration);
  };
  __proto._createAnimationParam = function (pos, duration, option) {
    var depaPos = this.axisManager.get();
    var destPos = pos;
    var inputEvent = (option === null || option === void 0 ? void 0 : option.event) || null;
    return {
      depaPos: depaPos,
      destPos: destPos,
      duration: clamp(duration, this._options.minimumDuration, this._options.maximumDuration),
      delta: this.axisManager.getDelta(depaPos, destPos),
      inputEvent: inputEvent,
      input: (option === null || option === void 0 ? void 0 : option.input) || null,
      isTrusted: !!inputEvent,
      done: this.animationEnd
    };
  };
  __proto._animateLoop = function (param, complete) {
    var _this = this;
    if (param.duration) {
      this._animateParam = __assign(__assign({}, param), {
        startTime: new Date().getTime()
      });
      var originalIntendedPos_1 = map(param.destPos, function (v) {
        return v;
      });
      var state_1 = this._initState(this._animateParam);
      var loop_1 = function () {
        _this._raf = null;
        var animateParam = _this._animateParam;
        var nextState = _this._getNextState(state_1);
        var isCanceled = !_this.eventManager.triggerChange(nextState.pos, state_1.pos);
        state_1 = nextState;
        if (nextState.finished) {
          animateParam.destPos = _this._getFinalPos(animateParam.destPos, originalIntendedPos_1);
          if (!equal(animateParam.destPos, _this.axisManager.get(Object.keys(animateParam.destPos)))) {
            _this.eventManager.triggerChange(animateParam.destPos, nextState.pos);
          }
          complete();
          return;
        } else if (isCanceled) {
          _this.finish(false);
        } else {
          _this._raf = requestAnimationFrame(loop_1);
        }
      };
      loop_1();
    } else {
      this.eventManager.triggerChange(param.destPos);
      complete();
    }
  };
  /**
   * Get estimated final value.
   *
   * If destPos is within the 'error range' of the original intended position, the initial intended position is returned.
   *   - eg. original intended pos: 100, destPos: 100.0000000004 ==> return 100;
   * If dest Pos is outside the 'range of error' compared to the originally intended pos, it is returned rounded based on the originally intended pos.
   *   - eg. original intended pos: 100.123 destPos: 50.12345 => return 50.123
   * @param originalIntendedPos
   * @param destPos
   */

  __proto._getFinalPos = function (destPos, originalIntendedPos) {
    var _this = this; // compare destPos and originalIntendedPos
    // eslint-disable-next-line @typescript-eslint/naming-convention

    var ERROR_LIMIT = 0.000001;
    var finalPos = map(destPos, function (value, key) {
      if (value >= originalIntendedPos[key] - ERROR_LIMIT && value <= originalIntendedPos[key] + ERROR_LIMIT) {
        // In error range, return original intended
        return originalIntendedPos[key];
      } else {
        // Out of error range, return rounded pos.
        var roundUnit = _this._getRoundUnit(value, key);
        var result = roundNumber(value, roundUnit);
        return result;
      }
    });
    return finalPos;
  };
  __proto._getRoundUnit = function (val, key) {
    var roundUnit = this._options.round; // manual mode

    var minRoundUnit = null; // auto mode
    // auto mode

    if (!roundUnit) {
      // Get minimum round unit
      var options = this.axisManager.getAxisOptions(key);
      minRoundUnit = inversePow(Math.max(getDecimalPlace(options.range[0]), getDecimalPlace(options.range[1]), getDecimalPlace(val)));
    }
    return minRoundUnit || roundUnit;
  };
  return AnimationManager;
}();
var EasingManager = /*#__PURE__*/
function (_super) {
  __extends(EasingManager, _super);
  function EasingManager() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this._useDuration = true;
    return _this;
  }
  var __proto = EasingManager.prototype;
  __proto.interpolate = function (displacement, threshold) {
    var initSlope = this._easing(0.00001) / 0.00001;
    return this._easing(displacement / (threshold * initSlope)) * threshold;
  };
  __proto.updateAnimation = function (options) {
    var _a;
    var animateParam = this._animateParam;
    if (!animateParam) {
      return;
    }
    var diffTime = new Date().getTime() - animateParam.startTime;
    var pos = (options === null || options === void 0 ? void 0 : options.destPos) || animateParam.destPos;
    var duration = (_a = options === null || options === void 0 ? void 0 : options.duration) !== null && _a !== void 0 ? _a : animateParam.duration;
    if ((options === null || options === void 0 ? void 0 : options.restart) || duration <= diffTime) {
      this.setTo(pos, duration - diffTime);
      return;
    }
    if (options === null || options === void 0 ? void 0 : options.destPos) {
      var currentPos = this.axisManager.get(); // When destination is changed, new delta should be calculated as remaining percent.
      // For example, moving x:0, y:0 to x:200, y:200 and it has current easing percent of 92%. coordinate is x:184 and y:184
      // If destination changes to x:300, y:300. xdelta:200, ydelta:200 changes to xdelta:116, ydelta:116 and use remaining easingPer as 100%, not 8% as previous.
      // Therefore, original easingPer by time is kept. And divided by (1 - self._initialEasingPer) which means new total easing percent. Like calculating 8% as 100%.

      this._initialEasingPer = this._prevEasingPer;
      animateParam.delta = this.axisManager.getDelta(currentPos, pos);
      animateParam.destPos = pos;
    }
    if (options === null || options === void 0 ? void 0 : options.duration) {
      var ratio = (diffTime + this._durationOffset) / animateParam.duration; // Use durationOffset for keeping animation ratio after duration is changed.
      // newRatio = (diffTime + newDurationOffset) / newDuration = oldRatio
      // newDurationOffset = oldRatio * newDuration - diffTime

      this._durationOffset = ratio * duration - diffTime;
      animateParam.duration = duration;
    }
  };
  __proto._initState = function (info) {
    this._initialEasingPer = 0;
    this._prevEasingPer = 0;
    this._durationOffset = 0;
    return {
      pos: info.depaPos,
      easingPer: 0,
      finished: false
    };
  };
  __proto._getNextState = function (prevState) {
    var _this = this;
    var animateParam = this._animateParam;
    var prevPos = prevState.pos;
    var destPos = animateParam.destPos;
    var directions = map(prevPos, function (value, key) {
      return value <= destPos[key] ? 1 : -1;
    });
    var diffTime = new Date().getTime() - animateParam.startTime;
    var ratio = (diffTime + this._durationOffset) / animateParam.duration;
    var easingPer = this._easing(ratio);
    var toPos = this.axisManager.map(prevPos, function (pos, options, key) {
      var nextPos = ratio >= 1 ? destPos[key] : pos + animateParam.delta[key] * (easingPer - _this._prevEasingPer) / (1 - _this._initialEasingPer); // Subtract distance from distance already moved.
      // Recalculate the remaining distance.
      // Fix the bouncing phenomenon by changing the range.

      var circulatedPos = getCirculatedPos(nextPos, options.range, options.circular);
      if (nextPos !== circulatedPos) {
        // circular
        var rangeOffset = directions[key] * (options.range[1] - options.range[0]);
        destPos[key] -= rangeOffset;
        prevPos[key] -= rangeOffset;
      }
      return circulatedPos;
    });
    this._prevEasingPer = easingPer;
    return {
      pos: toPos,
      easingPer: easingPer,
      finished: easingPer >= 1
    };
  };
  __proto._easing = function (p) {
    return p > 1 ? 1 : this._options.easing(p);
  };
  return EasingManager;
}(AnimationManager);

/**
 * @typedef {Object} AxisOption The Axis information. The key of the axis specifies the name to use as the logical virtual coordinate system.
 * @ko 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.
 * @param {Number[]} [range] The range of coordinate <ko>좌표 범위</ko>
 * @param {Number} [range[0]=0] The coordinate of the minimum <ko>최소 좌표</ko>
 * @param {Number} [range[1]=0] The coordinate of the maximum <ko>최대 좌표</ko>
 * @param {Number} [startPos=range[0]] The coordinates to be moved when creating an instance <ko>인스턴스 생성시 이동할 좌표</ko>
 * @param {Number[]} [bounce] The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
 * @param {Number} [bounce[0]=0] The size of coordinate of the minimum area <ko>최소 좌표 바운스 영역의 크기</ko>
 * @param {Number} [bounce[1]=0] The size of coordinate of the maximum area <ko>최대 좌표 바운스 영역의 크기</ko>
 * @param {Boolean[]} [circular] Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
 * @param {Boolean} [circular[0]=false] Indicates whether to circulate to the coordinate of the minimum <ko>최소 좌표 방향의 순환 여부</ko>
 * @param {Boolean} [circular[1]=false] Indicates whether to circulate to the coordinate of the maximum <ko>최대 좌표 방향의 순환 여부</ko>
 **/

/**
 * @typedef {Object} AxesOption The option object of the eg.Axes module
 * @ko eg.Axes 모듈의 옵션 객체
 * @param {Function} [easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
 * @param {Number} [maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
 * @param {Number} [minimumDuration=0] Minimum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최소 좌표 이동 시간</ko>
 * @param {Number} [deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
 * @param {Boolean} [interruptable=true] Indicates whether an animation is interruptible.
 * - true: It can be paused or stopped by user action or the API.
 * - false: It cannot be paused or stopped by user action or the API while it is running.
 * <ko>진행 중인 애니메이션 중지 가능 여부.
 * - true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.
 * - false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
 * @param {Number} [round=null] Rounding unit. For example, 0.1 rounds to 0.1 decimal point(6.1234 => 6.1), 5 rounds to 5 (93 => 95)
 * [Details](https://github.com/naver/egjs-axes/wiki/round-option)<ko>반올림 단위. 예를 들어 0.1 은 소숫점 0.1 까지 반올림(6.1234 => 6.1), 5 는 5 단위로 반올림(93 => 95).
 * [상세내용](https://github.com/naver/egjs-axes/wiki/round-option)</ko>
 * @param {Boolean} [nested=false] Whether the event propagates to other instances when the coordinates reach the end of the movable area <ko>좌표가 이동 가능한 영역의 끝까지 도달했을 때 다른 인스턴스들로의 이벤트 전파 여부</ko>
 **/

/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions.
 * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치를 통해 전달 받은 사용자의 동작을 논리적인 가상 좌표로 변경하는 모듈이다. 사용자 동작에 반응하는 UI를 손쉽게 만들수 있다.
 * @extends eg.Component
 *
 * @param {Object.<string, AxisOption>} axis Axis information managed by eg.Axes. The key of the axis specifies the name to use as the logical virtual coordinate system.  <ko>eg.Axes가 관리하는 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.</ko>
 * @param {AxesOption} [options={}] The option object of the eg.Axes module<ko>eg.Axes 모듈의 옵션 객체</ko>
 * @param {Object.<string, number>} [startPos={}] The coordinates to be moved when creating an instance. It is applied with higher priority than startPos of axisOption.<ko>인스턴스 생성시 이동할 좌표, axisOption의 startPos보다 높은 우선순위로 적용된다.</ko>
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 * @example
 * ```js
 * // 1. Initialize eg.Axes
 * const axes = new eg.Axes({
 *  something1: {
 *    range: [0, 150],
 *    bounce: 50
 *  },
 *  something2: {
 *    range: [0, 200],
 *    bounce: 100
 *  },
 *  somethingN: {
 *    range: [1, 10],
 *  }
 * }, {
 *  deceleration : 0.0024
 * });
 *
 * // 2. attach event handler
 * axes.on({
 *  "hold" : function(evt) {
 *  },
 *  "release" : function(evt) {
 *  },
 *  "animationStart" : function(evt) {
 *  },
 *  "animationEnd" : function(evt) {
 *  },
 *  "change" : function(evt) {
 *  }
 * });
 *
 * // 3. Initialize inputTypes
 * const panInputArea = new eg.Axes.PanInput("#area", {
 *  scale: [0.5, 1]
 * });
 * const panInputHmove = new eg.Axes.PanInput("#hmove");
 * const panInputVmove = new eg.Axes.PanInput("#vmove");
 * const pinchInputArea = new eg.Axes.PinchInput("#area", {
 *  scale: 1.5
 * });
 *
 * // 4. Connect eg.Axes and InputTypes
 * // [PanInput] When the mouse or touchscreen is down and moved.
 * // Connect the 'something2' axis to the mouse or touchscreen x position and
 * // connect the 'somethingN' axis to the mouse or touchscreen y position.
 * axes.connect(["something2", "somethingN"], panInputArea); // or axes.connect("something2 somethingN", panInputArea);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position.
 * axes.connect(["something1"], panInputHmove); // or axes.connect("something1", panInputHmove);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position.
 * axes.connect(["", "something2"], panInputVmove); // or axes.connect(" something2", panInputVmove);
 *
 * // [PinchInput] Connect 'something2' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something2", pinchInputArea);
 * ```
 */

var Axes = /*#__PURE__*/
function (_super) {
  __extends(Axes, _super);
  /**
   *
   */

  function Axes(axis, options, startPos) {
    if (axis === void 0) {
      axis = {};
    }
    if (options === void 0) {
      options = {};
    }
    if (startPos === void 0) {
      startPos = {};
    }
    var _this = _super.call(this) || this;
    _this.axis = axis;
    _this._inputs = [];
    _this.options = __assign({
      easing: function (x) {
        return 1 - Math.pow(1 - x, 3);
      },
      interruptable: true,
      maximumDuration: Infinity,
      minimumDuration: 0,
      deceleration: 0.0006,
      round: null,
      nested: false
    }, options);
    Object.keys(startPos).forEach(function (key) {
      _this.axis[key].startPos = startPos[key];
    });
    _this.interruptManager = new InterruptManager(_this.options);
    _this.axisManager = new AxisManager(_this.axis);
    _this.eventManager = new EventManager(_this);
    _this.animationManager = new EasingManager(_this);
    _this.inputObserver = new InputObserver(_this);
    _this.eventManager.setAnimationManager(_this.animationManager);
    _this.eventManager.triggerChange(_this.axisManager.get());
    return _this;
  }
  /**
   * Connect the axis of eg.Axes to the inputType.
   * @ko eg.Axes의 축과 inputType을 연결한다
   * @param {(String[]|String)} axes The name of the axis to associate with inputType <ko>inputType과 연결할 축의 이름</ko>
   * @param {Object} inputType The inputType instance to associate with the axis of eg.Axes <ko>eg.Axes의 축과 연결할 inputType 인스턴스</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   }
   * });
   *
   * axes.connect("x", new eg.Axes.PanInput("#area1"))
   *    .connect("x xOther", new eg.Axes.PanInput("#area2"))
   *    .connect(" xOther", new eg.Axes.PanInput("#area3"))
   *    .connect(["x"], new eg.Axes.PanInput("#area4"))
   *    .connect(["xOther", "x"], new eg.Axes.PanInput("#area5"))
   *    .connect(["", "xOther"], new eg.Axes.PanInput("#area6"));
   * ```
   */

  var __proto = Axes.prototype;
  __proto.connect = function (axes, inputType) {
    var mapped;
    if (typeof axes === "string") {
      mapped = axes.split(" ");
    } else {
      mapped = axes.concat();
    } // check same instance

    if (~this._inputs.indexOf(inputType)) {
      this.disconnect(inputType);
    }
    inputType.mapAxes(mapped);
    inputType.connect(this.inputObserver);
    this._inputs.push(inputType);
    return this;
  };
  /**
   * Disconnect the axis of eg.Axes from the inputType.
   * @ko eg.Axes의 축과 inputType의 연결을 끊는다.
   * @param {Object} [inputType] An inputType instance associated with the axis of eg.Axes <ko>eg.Axes의 축과 연결한 inputType 인스턴스</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   }
   * });
   *
   * const input1 = new eg.Axes.PanInput("#area1");
   * const input2 = new eg.Axes.PanInput("#area2");
   * const input3 = new eg.Axes.PanInput("#area3");
   *
   * axes.connect("x", input1);
   *    .connect("x xOther", input2)
   *    .connect(["xOther", "x"], input3);
   *
   * axes.disconnect(input1); // disconnects input1
   * axes.disconnect(); // disconnects all of them
   * ```
   */

  __proto.disconnect = function (inputType) {
    if (inputType) {
      var index = this._inputs.indexOf(inputType);
      if (index >= 0) {
        this._inputs[index].disconnect();
        this._inputs.splice(index, 1);
      }
    } else {
      this._inputs.forEach(function (v) {
        return v.disconnect();
      });
      this._inputs = [];
    }
    return this;
  };
  /**
   * Returns the current position of the coordinates.
   * @ko 좌표의 현재 위치를 반환한다
   * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
   * @return {Object.<string, number>} Axis coordinate information <ko>축 좌표 정보</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   *    "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.get(); // {"x": 0, "xOther": -100, "zoom": 50}
   * axes.get(["x", "zoom"]); // {"x": 0, "zoom": 50}
   * ```
   */

  __proto.get = function (axes) {
    return this.axisManager.get(axes);
  };
  /**
   * Moves an axis to specific coordinates.
   * @ko 좌표를 이동한다.
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   *    "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.setTo({"x": 30, "zoom": 60});
   * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
   *
   * axes.setTo({"x": 100, "xOther": 60}, 1000); // animatation
   *
   * // after 1000 ms
   * axes.get(); // {"x": 100, "xOther": 60, "zoom": 60}
   * ```
   */

  __proto.setTo = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }
    this.animationManager.setTo(pos, duration);
    return this;
  };
  /**
   * Moves an axis from the current coordinates to specific coordinates.
   * @ko 현재 좌표를 기준으로 좌표를 이동한다.
   * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   *    "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.setBy({"x": 30, "zoom": 10});
   * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
   *
   * axes.setBy({"x": 70, "xOther": 60}, 1000); // animatation
   *
   * // after 1000 ms
   * axes.get(); // {"x": 100, "xOther": -40, "zoom": 60}
   * ```
   */

  __proto.setBy = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }
    this.animationManager.setBy(pos, duration);
    return this;
  };
  /**
   * Change the options of Axes instance.
   * @ko 인스턴스의 옵션을 변경한다.
   * @param {AxesOption} options Axes options to change <ko>변경할 옵션 목록</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   * }, {
   *   round: 10,
   * });
   *
   * axes.setTo({"x": 48});
   * axes.get(); // {"x": 50}
   *
   * axes.setOptions({
   *   round: 1,
   * });
   *
   * axes.setTo({"x": 48});
   * axes.get(); // {"x": 48}
   * ```
   */

  __proto.setOptions = function (options) {
    this.options = __assign(__assign({}, this.options), options);
    return this;
  };
  /**
   * Change the information of an existing axis.
   * @ko 존재하는 축의 정보를 변경한다.
   * @param {Object.<string, AxisOption>} axis Axis options to change <ko>변경할 축의 정보</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   * });
   *
   * axes.setTo({"x": 150});
   * axes.get(); // {"x": 100}
   *
   * axes.setAxis({
   *   "x": {
   *      range: [0, 200]
   *   },
   * });
   *
   * axes.setTo({"x": 150});
   * axes.get(); // {"x": 150}
   * ```
   */

  __proto.setAxis = function (axis) {
    this.axisManager.setAxis(axis);
    return this;
  };
  /**
   * Stop an animation in progress.
   * @ko 재생 중인 애니메이션을 정지한다.
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   * });
   *
   * axes.setTo({"x": 10}, 1000); // start animatation
   *
   * // after 500 ms
   * axes.stopAnimation(); // stop animation during movement.
   * ```
   */

  __proto.stopAnimation = function () {
    this.animationManager.stopAnimation();
    this.animationManager.finish(false);
    return this;
  };
  /**
   * Change the destination of an animation in progress.
   * @ko 재생 중인 애니메이션의 목적지와 진행 시간을 변경한다.
   * @param {UpdateAnimationOption} pos The coordinate to move to <ko>이동할 좌표</ko>
   * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 200]
   *   },
   *   "y": {
   *      range: [0, 200]
   *   }
   * });
   *
   * axes.setTo({"x": 50, "y": 50}, 1000); // trigger animation by setTo
   *
   * // after 500 ms
   * axes.updateAnimation({destPos: {"x": 100, "y": 100}}); // animation will end after 500 ms, at {"x": 100, "y": 100}
   *
   * // after 500 ms
   * axes.setTo({"x": 50, "y": 50}, 1000); // trigger animation by setTo
   *
   * // after 700 ms
   * axes.updateAnimation({destPos: {"x": 100, "y": 100}, duration: 1500, restart: true}); // this works same as axes.setTo({"x": 100, "y": 100}, 800) since restart is true.
   * ```
   */

  __proto.updateAnimation = function (options) {
    this.animationManager.updateAnimation(options);
    return this;
  };
  /**
   * Returns whether there is a coordinate in the bounce area of ​​the target axis.
   * @ko 대상 축 중 bounce영역에 좌표가 존재하는지를 반환한다
   * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
   * @return {Boolen} Whether the bounce area exists. <ko>bounce 영역 존재 여부</ko>
   * @example
   * ```js
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   *    "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.isBounceArea(["x"]);
   * axes.isBounceArea(["x", "zoom"]);
   * axes.isBounceArea();
   * ```
   */

  __proto.isBounceArea = function (axes) {
    return this.axisManager.isOutside(axes);
  };
  /**
   * Destroys properties, and events used in a module and disconnect all connections to inputTypes.
   * @ko 모듈에 사용한 속성, 이벤트를 해제한다. 모든 inputType과의 연결을 끊는다.
   */

  __proto.destroy = function () {
    this.disconnect();
    this.eventManager.destroy();
  };
  /**
   * @name VERSION
   * @desc Version info string
   * @ko 버전정보 문자열
   *
   * @constant
   * @type {String}
   * @example
   * ```js
   * eg.Axes.VERSION;  // ex) 3.3.3
   * ```
   */

  Axes.VERSION = "3.8.4";
  /* eslint-enable */

  /**
   * @name TRANSFORM
   * @desc Returns the transform attribute with CSS vendor prefixes.
   * @ko CSS vendor prefixes를 붙인 transform 속성을 반환한다.
   *
   * @constant
   * @type {String}
   * @example
   * ```js
   * eg.Axes.TRANSFORM; // "transform" or "webkitTransform"
   * ```
   */

  Axes.TRANSFORM = TRANSFORM;
  /**
   * @name DIRECTION_NONE
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_NONE = DIRECTION_NONE;
  /**
   * @name DIRECTION_LEFT
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_LEFT = DIRECTION_LEFT;
  /**
   * @name DIRECTION_RIGHT
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_RIGHT = DIRECTION_RIGHT;
  /**
   * @name DIRECTION_UP
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_UP = DIRECTION_UP;
  /**
   * @name DIRECTION_DOWN
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_DOWN = DIRECTION_DOWN;
  /**
   * @name DIRECTION_HORIZONTAL
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  /**
   * @name DIRECTION_VERTICAL
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
  /**
   * @name DIRECTION_ALL
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_ALL = DIRECTION_ALL;
  Axes = __decorate([ReactiveSubscribe], Axes);
  return Axes;
}(component_esm);

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

var getDirectionByAngle = function (angle, thresholdAngle) {
  if (thresholdAngle < 0 || thresholdAngle > 90) {
    return DIRECTION_NONE;
  }
  var toAngle = Math.abs(angle);
  return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL;
};
/**
 * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
 * @ko eg.Axes.PanInput 모듈의 옵션 객체
 * @param {String[]} [inputType=["touch", "mouse", "pointer"]] Types of input devices
 * - touch: Touch screen
 * - mouse: Mouse
 * - pointer: Mouse and touch <ko>입력 장치 종류
 * - touch: 터치 입력 장치
 * - mouse: 마우스
 * - pointer: 마우스 및 터치</ko>
 * @param {String[]} [inputKey=["any"]] List of key combinations to allow input
 * - any: any key
 * - shift: shift key
 * - ctrl: ctrl key and pinch gesture on the trackpad
 * - alt: alt key
 * - meta: meta key
 * - none: none of these keys are pressed <ko>입력을 허용할 키 조합 목록
 * - any: 아무 키
 * - shift: shift 키
 * - ctrl: ctrl 키 및 트랙패드의 pinch 제스쳐
 * - alt: alt 키
 * - meta: meta 키
 * - none: 아무 키도 눌리지 않은 상태 </ko>
 * @param {String[]} [inputButton=["left"]] List of buttons to allow input
 * - left: Left mouse button and normal touch
 * - middle: Mouse wheel press
 * - right: Right mouse button <ko>입력을 허용할 버튼 목록
 * - left: 마우스 왼쪽 버튼
 * - middle: 마우스 휠 눌림
 * - right: 마우스 오른쪽 버튼 </ko>
 * @param {Number[]} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [scale[0]=1] horizontal axis scale <ko>수평축 배율</ko>
 * @param {Number} [scale[1]=1] vertical axis scale <ko>수직축 배율</ko>
 * @param {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
 * @param {Number} [threshold=0] Minimal pan distance required before recognizing <ko>사용자의 Pan 동작을 인식하기 위해산 최소한의 거리</ko>
 * @param {Boolean} [preventClickOnDrag=false] Whether to cancel the {@link https://developer.mozilla.org/en/docs/Web/API/Element/click_event click} event when the user finishes dragging more than 1 pixel <ko>사용자가 1픽셀 이상 드래그를 마쳤을 때 {@link https://developer.mozilla.org/ko/docs/Web/API/Element/click_event click} 이벤트 취소 여부</ko>
 * @param {Number} [iOSEdgeSwipeThreshold=30] Area (px) that can go to the next page when swiping the right edge in iOS safari <ko>iOS Safari에서 오른쪽 엣지를 스와이프 하는 경우 다음 페이지로 넘어갈 수 있는 영역(px)</ko>
 * @param {String} [touchAction=null] Value that overrides the element's "touch-action" css property. If set to null, it is automatically set to prevent scrolling in the direction of the connected axis. <ko>엘리먼트의 "touch-action" CSS 속성을 덮어쓰는 값. 만약 null로 설정된 경우, 연결된 축 방향으로의 스크롤을 방지하게끔 자동으로 설정된다.</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
 * @ko 마우스나 터치 스크린을 누르고 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
 *
 * @example
 * ```js
 * const pan = new eg.Axes.PanInput("#area", {
 *     inputType: ["touch"],
 *     scale: [1, 1.3],
 * });
 *
 * // Connect the 'something2' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * // Connect the 'somethingN' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * axes.connect(["something1"], pan); // or axes.connect("something1", pan);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);
 * ```
 * @param {String|HTMLElement|Ref<HTMLElement>|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options={}] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 */

var PanInput = /*#__PURE__*/
function () {
  /**
   *
   */
  function PanInput(el, options) {
    var _this = this;
    this.axes = [];
    this.element = null;
    this._enabled = false;
    this._activeEvent = null;
    this._atRightEdge = false;
    this._rightEdgeTimer = 0;
    this._dragged = false;
    this._isOverThreshold = false;
    this._preventClickWhenDragged = function (e) {
      if (_this._dragged) {
        e.preventDefault();
        e.stopPropagation();
      }
      _this._dragged = false;
    };
    this._voidFunction = function () {};
    this.element = $(el);
    this.options = __assign({
      inputType: ["touch", "mouse", "pointer"],
      inputKey: [ANY],
      inputButton: [MOUSE_LEFT],
      scale: [1, 1],
      thresholdAngle: 45,
      threshold: 0,
      preventClickOnDrag: false,
      iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
      releaseOnScroll: false,
      touchAction: null
    }, options);
    this._onPanstart = this._onPanstart.bind(this);
    this._onPanmove = this._onPanmove.bind(this);
    this._onPanend = this._onPanend.bind(this);
  }
  var __proto = PanInput.prototype;
  __proto.mapAxes = function (axes) {
    this._direction = getDirection(!!axes[0], !!axes[1]);
    this.axes = axes;
  };
  __proto.connect = function (observer) {
    if (this._activeEvent) {
      this._detachElementEvent();
      this._detachWindowEvent(this._activeEvent);
    }
    this._attachElementEvent(observer);
    this._originalCssProps = setCssProps(this.element, this.options, this._direction);
    return this;
  };
  __proto.disconnect = function () {
    this._detachElementEvent();
    this._detachWindowEvent(this._activeEvent);
    if (!isCssPropsFromAxes(this._originalCssProps)) {
      revertCssProps(this.element, this._originalCssProps);
    }
    this._direction = DIRECTION_NONE;
    return this;
  };
  /**
   * Destroys elements, properties, and events used in a module.
   * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
   */

  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };
  /**
   * Enables input devices
   * @ko 입력 장치를 사용할 수 있게 한다
   * @return {PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */

  __proto.enable = function () {
    this._enabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */

  __proto.disable = function () {
    this._enabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko 입력 장치 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */

  __proto.isEnabled = function () {
    return this._enabled;
  };
  /**
   * Releases current user input.
   * @ko 사용자의 입력을 강제로 중단시킨다.
   * @return {PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */

  __proto.release = function () {
    var activeEvent = this._activeEvent;
    var prevEvent = activeEvent.prevEvent;
    activeEvent.onRelease();
    this._observer.release(this, prevEvent, [0, 0]);
    this._detachWindowEvent(activeEvent);
    return this;
  };
  __proto._onPanstart = function (event) {
    var _a = this.options,
      inputKey = _a.inputKey,
      inputButton = _a.inputButton;
    var activeEvent = this._activeEvent;
    var panEvent = activeEvent.onEventStart(event, inputKey, inputButton);
    if (!panEvent || !this._enabled || activeEvent.getTouches(event, inputButton) > 1) {
      return;
    }
    if (panEvent.srcEvent.cancelable !== false) {
      var edgeThreshold = this.options.iOSEdgeSwipeThreshold;
      this._dragged = false;
      this._isOverThreshold = false;
      this._observer.hold(this, panEvent);
      this._atRightEdge = IS_IOS_SAFARI && panEvent.center.x > window.innerWidth - edgeThreshold;
      this._attachWindowEvent(activeEvent);
      activeEvent.prevEvent = panEvent;
    }
  };
  __proto._onPanmove = function (event) {
    var _this = this;
    var _a = this.options,
      iOSEdgeSwipeThreshold = _a.iOSEdgeSwipeThreshold,
      preventClickOnDrag = _a.preventClickOnDrag,
      releaseOnScroll = _a.releaseOnScroll,
      inputKey = _a.inputKey,
      inputButton = _a.inputButton,
      threshold = _a.threshold,
      thresholdAngle = _a.thresholdAngle;
    var activeEvent = this._activeEvent;
    var panEvent = activeEvent.onEventMove(event, inputKey, inputButton);
    var touches = activeEvent.getTouches(event, inputButton);
    if (touches === 0 || releaseOnScroll && panEvent && !panEvent.srcEvent.cancelable) {
      this._onPanend(event);
      return;
    }
    if (!panEvent || !this._enabled || touches > 1) {
      return;
    }
    var userDirection = getDirectionByAngle(panEvent.angle, thresholdAngle);
    var useHorizontal = useDirection(DIRECTION_HORIZONTAL, this._direction, userDirection);
    var useVertical = useDirection(DIRECTION_VERTICAL, this._direction, userDirection);
    if (activeEvent.prevEvent && IS_IOS_SAFARI) {
      var swipeLeftToRight = panEvent.center.x < 0;
      if (swipeLeftToRight) {
        // iOS swipe left => right
        this.release();
        return;
      } else if (this._atRightEdge) {
        clearTimeout(this._rightEdgeTimer); // - is right to left

        var swipeRightToLeft = panEvent.deltaX < -iOSEdgeSwipeThreshold;
        if (swipeRightToLeft) {
          this._atRightEdge = false;
        } else {
          // iOS swipe right => left
          this._rightEdgeTimer = window.setTimeout(function () {
            return _this.release();
          }, 100);
        }
      }
    }
    var distance = this._getDistance([panEvent.deltaX, panEvent.deltaY], [useHorizontal, useVertical]);
    var offset = this._getOffset([panEvent.offsetX, panEvent.offsetY], [useHorizontal, useVertical]);
    var prevent = offset.some(function (v) {
      return v !== 0;
    });
    if (prevent) {
      if (panEvent.srcEvent.cancelable !== false) {
        panEvent.srcEvent.preventDefault();
      }
      panEvent.srcEvent.stopPropagation();
    }
    panEvent.preventSystemEvent = prevent;
    if (prevent && (this._isOverThreshold || distance >= threshold)) {
      this._dragged = preventClickOnDrag;
      this._isOverThreshold = true;
      this._observer.change(this, panEvent, toAxis(this.axes, offset));
    }
    activeEvent.prevEvent = panEvent;
  };
  __proto._onPanend = function (event) {
    var inputButton = this.options.inputButton;
    var activeEvent = this._activeEvent;
    activeEvent.onEventEnd(event);
    if (!this._enabled || activeEvent.getTouches(event, inputButton) !== 0) {
      return;
    }
    this._detachWindowEvent(activeEvent);
    clearTimeout(this._rightEdgeTimer);
    var prevEvent = activeEvent.prevEvent;
    var velocity = this._isOverThreshold ? this._getOffset([Math.abs(prevEvent.velocityX) * (prevEvent.offsetX < 0 ? -1 : 1), Math.abs(prevEvent.velocityY) * (prevEvent.offsetY < 0 ? -1 : 1)], [useDirection(DIRECTION_HORIZONTAL, this._direction), useDirection(DIRECTION_VERTICAL, this._direction)]) : [0, 0];
    activeEvent.onRelease();
    this._observer.release(this, prevEvent, velocity);
  };
  __proto._attachWindowEvent = function (activeEvent) {
    var _this = this;
    activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.move.forEach(function (event) {
      window.addEventListener(event, _this._onPanmove, getAddEventOptions(event));
    });
    activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.end.forEach(function (event) {
      window.addEventListener(event, _this._onPanend, getAddEventOptions(event));
    });
  };
  __proto._detachWindowEvent = function (activeEvent) {
    var _this = this;
    activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.move.forEach(function (event) {
      window.removeEventListener(event, _this._onPanmove);
    });
    activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.end.forEach(function (event) {
      window.removeEventListener(event, _this._onPanend);
    });
  };
  __proto._getOffset = function (properties, direction) {
    var scale = this.options.scale;
    return [direction[0] ? properties[0] * scale[0] : 0, direction[1] ? properties[1] * scale[1] : 0];
  };
  __proto._getDistance = function (delta, direction) {
    return Math.sqrt(Number(direction[0]) * Math.pow(delta[0], 2) + Number(direction[1]) * Math.pow(delta[1], 2));
  };
  __proto._attachElementEvent = function (observer) {
    var _this = this;
    var activeEvent = convertInputType(this.options.inputType);
    var element = this.element;
    if (!activeEvent) {
      return;
    }
    if (!element) {
      throw new Error("Element to connect input does not exist.");
    }
    this._observer = observer;
    this._enabled = true;
    this._activeEvent = activeEvent;
    element.addEventListener("click", this._preventClickWhenDragged, true);
    activeEvent.start.forEach(function (event) {
      element.addEventListener(event, _this._onPanstart);
    }); // adding event listener to element prevents invalid behavior in iOS Safari

    activeEvent.move.forEach(function (event) {
      element.addEventListener(event, _this._voidFunction);
    });
  };
  __proto._detachElementEvent = function () {
    var _this = this;
    var activeEvent = this._activeEvent;
    var element = this.element;
    if (element) {
      element.removeEventListener("click", this._preventClickWhenDragged, true);
      activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.start.forEach(function (event) {
        element.removeEventListener(event, _this._onPanstart);
      });
      activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.move.forEach(function (event) {
        element.removeEventListener(event, _this._voidFunction);
      });
    }
    this._enabled = false;
    this._observer = null;
  };
  return PanInput;
}();

/**
 * A module that passes the angle moved by touch to Axes and uses one axis of rotation.
 * [Details](https://github.com/naver/egjs-axes/wiki/RotatePanInput)
 * @ko 터치에 의해 움직인 각도를 Axes 에 전달하며 1개의 회전축만 사용한다.
 * [상세내용](https://github.com/naver/egjs-axes/wiki/RotatePanInput-%7C-%ED%95%9C%EA%B5%AD%EC%96%B4)
 *
 * @example
 * ```js
 * const input = new eg.Axes.RotatePanInput("#area");
 *
 * var axes = new eg.Axes({
 *	// property name('angle') could be anything you want (eg. x, y, z...)
 * 	angle: {
 * 		range: [-180, 180] // from -180deg to 180deg
 * 	}
 * });
 *
 * axes.connect("angle", input)
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.RotatePanInput module <ko>eg.Axes.RotatePanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 * @extends PanInput
 */

var RotatePanInput = /*#__PURE__*/
(/* unused pure expression or super */ null && (function (_super) {
  __extends(RotatePanInput, _super);
  /**
   *
   */

  function RotatePanInput(el, options) {
    var _this = _super.call(this, el, options) || this;
    _this._prevQuadrant = null;
    _this._lastDiff = 0;
    return _this;
  }
  var __proto = RotatePanInput.prototype;
  __proto.mapAxes = function (axes) {
    this._direction = Axes.DIRECTION_ALL;
    this.axes = axes;
  };
  __proto._onPanstart = function (event) {
    var _a = this.options,
      inputKey = _a.inputKey,
      inputButton = _a.inputButton;
    var activeEvent = this._activeEvent;
    var panEvent = activeEvent.onEventStart(event, inputKey, inputButton);
    if (!panEvent || !this.isEnabled()) {
      return;
    }
    var rect = this.element.getBoundingClientRect();
    this._observer.hold(this, panEvent);
    this._attachWindowEvent(activeEvent); // TODO: how to do if element is ellipse not circle.

    this._coefficientForDistanceToAngle = 360 / (rect.width * Math.PI); // from 2*pi*r * x / 360
    // TODO: provide a way to set origin like https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin

    this._rotateOrigin = [rect.left + (rect.width - 1) / 2, rect.top + (rect.height - 1) / 2]; // init angle.

    this._prevAngle = null;
    this._triggerChange(panEvent);
    activeEvent.prevEvent = panEvent;
  };
  __proto._onPanmove = function (event) {
    var _a = this.options,
      inputKey = _a.inputKey,
      inputButton = _a.inputButton;
    var activeEvent = this._activeEvent;
    var panEvent = activeEvent.onEventMove(event, inputKey, inputButton);
    if (!panEvent || !this.isEnabled()) {
      return;
    }
    if (panEvent.srcEvent.cancelable !== false) {
      panEvent.srcEvent.preventDefault();
    }
    panEvent.srcEvent.stopPropagation();
    this._triggerChange(panEvent);
    activeEvent.prevEvent = panEvent;
  };
  __proto._onPanend = function (event) {
    var activeEvent = this._activeEvent;
    activeEvent.onEventEnd(event);
    if (!this.isEnabled()) {
      return;
    }
    var prevEvent = activeEvent.prevEvent;
    this._triggerChange(prevEvent);
    var vx = prevEvent.velocityX;
    var vy = prevEvent.velocityY;
    var velocity = Math.sqrt(vx * vx + vy * vy) * (this._lastDiff > 0 ? -1 : 1); // clockwise

    activeEvent.onRelease();
    this._observer.release(this, prevEvent, [velocity * this._coefficientForDistanceToAngle]);
    this._detachWindowEvent(activeEvent);
  };
  __proto._triggerChange = function (event) {
    var _a = this._getPosFromOrigin(event.center.x, event.center.y),
      x = _a.x,
      y = _a.y;
    var angle = getAngle(x, y);
    var positiveAngle = angle < 0 ? 360 + angle : angle;
    var quadrant = this._getQuadrant(event.center.x, event.center.y);
    var diff = this._getDifference(this._prevAngle, positiveAngle, this._prevQuadrant, quadrant);
    this._prevAngle = positiveAngle;
    this._prevQuadrant = quadrant;
    if (diff === 0) {
      return;
    }
    this._lastDiff = diff;
    this._observer.change(this, event, toAxis(this.axes, [-diff])); // minus for clockwise
  };

  __proto._getDifference = function (prevAngle, angle, prevQuadrant, quadrant) {
    var diff;
    if (prevAngle === null) {
      diff = 0;
    } else if (prevQuadrant === 1 && quadrant === 4) {
      diff = -prevAngle - (360 - angle);
    } else if (prevQuadrant === 4 && quadrant === 1) {
      diff = 360 - prevAngle + angle;
    } else {
      diff = angle - prevAngle;
    }
    return diff;
  };
  __proto._getPosFromOrigin = function (posX, posY) {
    return {
      x: posX - this._rotateOrigin[0],
      y: this._rotateOrigin[1] - posY
    };
  };
  __proto._getQuadrant = function (posX, posY) {
    /**
     * Quadrant
     *       y(+)
     *       |
     *   2   |    1
     * --------------->x(+)
     *   3   |    4
     *       |
     */
    var _a = this._getPosFromOrigin(posX, posY),
      x = _a.x,
      y = _a.y;
    var q = 0;
    if (x >= 0 && y >= 0) {
      q = 1;
    } else if (x < 0 && y >= 0) {
      q = 2;
    } else if (x < 0 && y < 0) {
      q = 3;
    } else if (x >= 0 && y < 0) {
      q = 4;
    }
    return q;
  };
  return RotatePanInput;
}(PanInput)));

/**
 * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
 * @ko eg.Axes.PinchInput 모듈의 옵션 객체
 * @param {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [threshold=0] Minimal scale before recognizing <ko>사용자의 Pinch 동작을 인식하기 위해산 최소한의 배율</ko>
 * @param {String[]} [inputType=["touch", "pointer"]] Types of input devices
 * - touch: Touch screen
 * - pointer: Mouse and touch <ko>입력 장치 종류
 * - touch: 터치 입력 장치
 * - pointer: 마우스 및 터치</ko>
 * @param {String} [touchAction="none"] Value that overrides the element's "touch-action" css property. It is set to "none" to prevent scrolling during touch. <ko>엘리먼트의 "touch-action" CSS 속성을 덮어쓰는 값. 터치 도중 스크롤을 방지하기 위해 "none" 으로 설정되어 있다.</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when two pointers are moving toward (zoom-in) or away from each other (zoom-out). use one axis.
 * @ko 2개의 pointer를 이용하여 zoom-in하거나 zoom-out 하는 동작의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 * @example
 * ```js
 * const pinch = new eg.Axes.PinchInput("#area", {
 *   scale: 1
 * });
 *
 * // Connect 'something' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something", pinch);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PinchInput module <ko>eg.Axes.PinchInput 모듈을 사용할 엘리먼트</ko>
 * @param {PinchInputOption} [options] The option object of the eg.Axes.PinchInput module<ko>eg.Axes.PinchInput 모듈의 옵션 객체</ko>
 */

var PinchInput = /*#__PURE__*/
(/* unused pure expression or super */ null && (function () {
  /**
   *
   */
  function PinchInput(el, options) {
    this.axes = [];
    this.element = null;
    this._pinchFlag = false;
    this._enabled = false;
    this._activeEvent = null;
    this._isOverThreshold = false;
    this.element = $(el);
    this.options = __assign({
      scale: 1,
      threshold: 0,
      inputType: ["touch", "pointer"],
      touchAction: "none"
    }, options);
    this._onPinchStart = this._onPinchStart.bind(this);
    this._onPinchMove = this._onPinchMove.bind(this);
    this._onPinchEnd = this._onPinchEnd.bind(this);
  }
  var __proto = PinchInput.prototype;
  __proto.mapAxes = function (axes) {
    this.axes = axes;
  };
  __proto.connect = function (observer) {
    if (this._activeEvent) {
      this._detachEvent();
    }
    this._attachEvent(observer);
    this._originalCssProps = setCssProps(this.element, this.options, DIRECTION_ALL);
    return this;
  };
  __proto.disconnect = function () {
    this._detachEvent();
    if (!isCssPropsFromAxes(this._originalCssProps)) {
      revertCssProps(this.element, this._originalCssProps);
    }
    return this;
  };
  /**
   * Destroys elements, properties, and events used in a module.
   * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
   */

  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };
  /**
   * Enables input devices
   * @ko 입력 장치를 사용할 수 있게 한다
   * @return {PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */

  __proto.enable = function () {
    this._enabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */

  __proto.disable = function () {
    this._enabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko 입력 장치를 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */

  __proto.isEnabled = function () {
    return this._enabled;
  };
  __proto._onPinchStart = function (event) {
    var activeEvent = this._activeEvent;
    var pinchEvent = activeEvent.onEventStart(event);
    if (!pinchEvent || !this._enabled || activeEvent.getTouches(event) !== 2) {
      return;
    }
    this._baseValue = this._observer.get(this)[this.axes[0]];
    this._observer.hold(this, event);
    this._pinchFlag = true;
    this._isOverThreshold = false;
    activeEvent.prevEvent = pinchEvent;
  };
  __proto._onPinchMove = function (event) {
    var threshold = this.options.threshold;
    var activeEvent = this._activeEvent;
    var pinchEvent = activeEvent.onEventMove(event);
    if (!pinchEvent || !this._pinchFlag || !this._enabled || activeEvent.getTouches(event) !== 2) {
      return;
    }
    var distance = this._getDistance(pinchEvent.scale);
    var offset = this._getOffset(pinchEvent.scale, activeEvent.prevEvent.scale);
    if (this._isOverThreshold || distance >= threshold) {
      this._isOverThreshold = true;
      this._observer.change(this, event, toAxis(this.axes, [offset]));
    }
    activeEvent.prevEvent = pinchEvent;
  };
  __proto._onPinchEnd = function (event) {
    var activeEvent = this._activeEvent;
    activeEvent.onEventEnd(event);
    if (!this._pinchFlag || !this._enabled || activeEvent.getTouches(event) >= 2) {
      return;
    }
    activeEvent.onRelease();
    this._observer.release(this, event, [0], 0);
    this._baseValue = null;
    this._pinchFlag = false;
  };
  __proto._attachEvent = function (observer) {
    var _this = this;
    var activeEvent = convertInputType(this.options.inputType);
    var element = this.element;
    if (!activeEvent) {
      return;
    }
    if (!element) {
      throw new Error("Element to connect input does not exist.");
    }
    this._observer = observer;
    this._enabled = true;
    this._activeEvent = activeEvent;
    activeEvent.start.forEach(function (event) {
      element.addEventListener(event, _this._onPinchStart, false);
    });
    activeEvent.move.forEach(function (event) {
      element.addEventListener(event, _this._onPinchMove, false);
    });
    activeEvent.end.forEach(function (event) {
      element.addEventListener(event, _this._onPinchEnd, false);
    });
  };
  __proto._detachEvent = function () {
    var _this = this;
    var activeEvent = this._activeEvent;
    var element = this.element;
    if (element) {
      activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.start.forEach(function (event) {
        element.removeEventListener(event, _this._onPinchStart, false);
      });
      activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.move.forEach(function (event) {
        element.removeEventListener(event, _this._onPinchMove, false);
      });
      activeEvent === null || activeEvent === void 0 ? void 0 : activeEvent.end.forEach(function (event) {
        element.removeEventListener(event, _this._onPinchEnd, false);
      });
    }
    this._enabled = false;
    this._observer = null;
  };
  __proto._getOffset = function (pinchScale, prev) {
    if (prev === void 0) {
      prev = 1;
    }
    return this._baseValue * (pinchScale - prev) * this.options.scale;
  };
  __proto._getDistance = function (pinchScale) {
    return Math.abs(pinchScale - 1);
  };
  return PinchInput;
}()));

/**
 * @typedef {Object} WheelInputOption The option object of the eg.Axes.WheelInput module
 * @ko eg.Axes.WheelInput 모듈의 옵션 객체
 * @param {String[]} [inputKey=["any"]] List of key combinations to allow input
 * - any: any key
 * - shift: shift key
 * - ctrl: ctrl key and pinch gesture on the trackpad
 * - alt: alt key
 * - meta: meta key
 * - none: none of these keys are pressed <ko>입력을 허용할 키 조합 목록
 * - any: 아무 키
 * - shift: shift 키
 * - ctrl: ctrl 키 및 트랙패드의 pinch 제스쳐
 * - alt: alt 키
 * - meta: meta 키
 * - none: 아무 키도 눌리지 않은 상태 </ko>
 * @param {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [releaseDelay=300] Millisecond that trigger release event after last input<ko>마지막 입력 이후 release 이벤트가 트리거되기까지의 밀리초</ko>
 * @param {Boolean} [useNormalized=true] Whether to calculate scroll speed the same in all browsers<ko>모든 브라우저에서 스크롤 속도를 동일하게 처리할지 여부</ko>
 * @param {Boolean} [useAnimation=false] Whether to process coordinate changes through the mouse wheel as a continuous animation<ko>마우스 휠을 통한 좌표 변화를 연속적인 애니메이션으로 처리할지 여부</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when the mouse wheel is moved. use one axis.
 * @ko 마우스 휠이 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
 *
 * @example
 * ```js
 * const wheel = new eg.Axes.WheelInput("#area", {
 *     scale: 1
 * });
 *
 * // Connect only one 'something1' axis to the vertical mouse wheel.
 * axes.connect(["something1"], wheel); // or axes.connect("something1", wheel);
 *
 * // Connect only one 'something2' axis to the horizontal mouse wheel.
 * axes.connect(["", "something2"], wheel); // or axes.connect(" something2", pan);
 *
 * // Connect the 'something1' axis to the vertical mouse wheel.
 * // Connect the 'something2' axis to the horizontal mouse wheel.
 * axes.connect(["something1", "something2"], wheel);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.WheelInput module <ko>eg.Axes.WheelInput 모듈을 사용할 엘리먼트</ko>
 * @param {WheelInputOption} [options] The option object of the eg.Axes.WheelInput module<ko>eg.Axes.WheelInput 모듈의 옵션 객체</ko>
 */

var WheelInput = /*#__PURE__*/
(/* unused pure expression or super */ null && (function () {
  /**
   *
   */
  function WheelInput(el, options) {
    this.axes = [];
    this.element = null;
    this._enabled = false;
    this._holding = false;
    this._timer = null;
    this.element = $(el);
    this.options = __assign({
      inputKey: [ANY],
      scale: 1,
      releaseDelay: 300,
      useNormalized: true,
      useAnimation: false
    }, options);
    this._onWheel = this._onWheel.bind(this);
  }
  var __proto = WheelInput.prototype;
  __proto.mapAxes = function (axes) {
    // vertical mouse wheel is mapped into axes[0]
    this._direction = getDirection(!!axes[1], !!axes[0]);
    this.axes = axes;
  };
  __proto.connect = function (observer) {
    this._detachEvent();
    this._attachEvent(observer);
    return this;
  };
  __proto.disconnect = function () {
    this._detachEvent();
    return this;
  };
  /**
   * Destroys elements, properties, and events used in a module.
   * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
   */

  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };
  /**
   * Enables input devices
   * @ko 입력 장치를 사용할 수 있게 한다
   * @return {WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */

  __proto.enable = function () {
    this._enabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */

  __proto.disable = function () {
    this._enabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko 입력 장치를 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */

  __proto.isEnabled = function () {
    return this._enabled;
  };
  __proto._onWheel = function (event) {
    var _this = this;
    if (!this._enabled || !isValidKey(event, this.options.inputKey)) {
      return;
    }
    var offset = this._getOffset([event.deltaY, event.deltaX], [useDirection(DIRECTION_VERTICAL, this._direction), useDirection(DIRECTION_HORIZONTAL, this._direction)]);
    if (offset[0] === 0 && offset[1] === 0) {
      return;
    }
    event.preventDefault();
    if (!this._holding) {
      this._observer.hold(this, event);
      this._holding = true;
    }
    this._observer.change(this, event, toAxis(this.axes, offset), this.options.useAnimation);
    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      if (_this._holding) {
        _this._holding = false;
        _this._observer.release(_this, event, [0]);
      }
    }, this.options.releaseDelay);
  };
  __proto._getOffset = function (properties, direction) {
    var scale = this.options.scale;
    var useNormalized = this.options.useNormalized;
    return [direction[0] && properties[0] ? (properties[0] > 0 ? -1 : 1) * (useNormalized ? 1 : Math.abs(properties[0])) * scale : 0, direction[1] && properties[1] ? (properties[1] > 0 ? -1 : 1) * (useNormalized ? 1 : Math.abs(properties[1])) * scale : 0];
  };
  __proto._attachEvent = function (observer) {
    var element = this.element;
    if (!element) {
      throw new Error("Element to connect input does not exist.");
    }
    this._observer = observer;
    element.addEventListener("wheel", this._onWheel);
    this._enabled = true;
  };
  __proto._detachEvent = function () {
    var element = this.element;
    if (element) {
      this.element.removeEventListener("wheel", this._onWheel);
    }
    this._enabled = false;
    this._observer = null;
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  };
  return WheelInput;
}()));
var KEY_LEFT_ARROW = 37;
var KEY_A = 65;
var KEY_UP_ARROW = 38;
var KEY_W = 87;
var KEY_RIGHT_ARROW = 39;
var KEY_D = 68;
var KEY_DOWN_ARROW = 40;
var KEY_S = 83;
/* eslint-disable */

var DIRECTION_REVERSE = (/* unused pure expression or super */ null && (-1));
var DIRECTION_FORWARD = 1;
var DIRECTION_HORIZONTAL$1 = (/* unused pure expression or super */ null && (-1));
var DIRECTION_VERTICAL$1 = 1;
var DELAY = 80;
/**
 * @typedef {Object} MoveKeyInputOption The option object of the eg.Axes.MoveKeyInput module
 * @ko eg.Axes.MoveKeyInput 모듈의 옵션 객체
 * @param {Array<Number>} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @param {Number} [scale[0]=1] Coordinate scale for the first axis<ko>첫번째 축의 배율</ko>
 * @param {Number} [scale[1]=1] Coordinate scale for the decond axis<ko>두번째 축의 배율</ko>
 **/

/**
 * A module that passes the amount of change to eg.Axes when the move key stroke is occured. use two axis.
 * @ko 이동키 입력이 발생했을 때의 변화량을 eg.Axes에 전달하는 모듈. 두 개 의 축을 사용한다.
 *
 * @example
 * ```js
 * const moveKey = new eg.Axes.MoveKeyInput("#area", {
 *     scale: [1, 1]
 * });
 *
 * // Connect 'x', 'y' axes when the moveKey is pressed.
 * axes.connect(["x", "y"], moveKey);
 * ```
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.MoveKeyInput module <ko>eg.Axes.MoveKeyInput 모듈을 사용할 엘리먼트</ko>
 * @param {MoveKeyInputOption} [options] The option object of the eg.Axes.MoveKeyInput module<ko>eg.Axes.MoveKeyInput 모듈의 옵션 객체</ko>
 */

var MoveKeyInput = /*#__PURE__*/
(/* unused pure expression or super */ null && (function () {
  /**
   *
   */
  function MoveKeyInput(el, options) {
    this.axes = [];
    this.element = null;
    this._enabled = false;
    this._holding = false;
    this._timer = null;
    this.element = $(el);
    this.options = __assign({
      scale: [1, 1]
    }, options);
    this._onKeydown = this._onKeydown.bind(this);
    this._onKeyup = this._onKeyup.bind(this);
  }
  var __proto = MoveKeyInput.prototype;
  __proto.mapAxes = function (axes) {
    this.axes = axes;
  };
  __proto.connect = function (observer) {
    this._detachEvent(); // add tabindex="0" to the container for making it focusable

    if (this.element.getAttribute("tabindex") !== "0") {
      this.element.setAttribute("tabindex", "0");
    }
    this._attachEvent(observer);
    return this;
  };
  __proto.disconnect = function () {
    this._detachEvent();
    return this;
  };
  /**
   * Destroys elements, properties, and events used in a module.
   * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
   */

  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };
  /**
   * Enables input devices
   * @ko 입력 장치를 사용할 수 있게 한다
   * @return {MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */

  __proto.enable = function () {
    this._enabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko 입력 장치를 사용할 수 없게 한다.
   * @return {MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
   */

  __proto.disable = function () {
    this._enabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko 입력 장치를 사용 여부를 반환한다.
   * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
   */

  __proto.isEnabled = function () {
    return this._enabled;
  };
  __proto._onKeydown = function (event) {
    if (!this._enabled) {
      return;
    }
    var isMoveKey = true;
    var direction = DIRECTION_FORWARD;
    var move = DIRECTION_HORIZONTAL$1;
    switch (event.keyCode) {
      case KEY_LEFT_ARROW:
      case KEY_A:
        direction = DIRECTION_REVERSE;
        break;
      case KEY_RIGHT_ARROW:
      case KEY_D:
        break;
      case KEY_DOWN_ARROW:
      case KEY_S:
        direction = DIRECTION_REVERSE;
        move = DIRECTION_VERTICAL$1;
        break;
      case KEY_UP_ARROW:
      case KEY_W:
        move = DIRECTION_VERTICAL$1;
        break;
      default:
        isMoveKey = false;
    }
    if (move === DIRECTION_HORIZONTAL$1 && !this.axes[0] || move === DIRECTION_VERTICAL$1 && !this.axes[1]) {
      isMoveKey = false;
    }
    if (!isMoveKey) {
      return;
    }
    event.preventDefault();
    var offsets = move === DIRECTION_HORIZONTAL$1 ? [+this.options.scale[0] * direction, 0] : [0, +this.options.scale[1] * direction];
    if (!this._holding) {
      this._observer.hold(this, event);
      this._holding = true;
    }
    clearTimeout(this._timer);
    this._observer.change(this, event, toAxis(this.axes, offsets));
  };
  __proto._onKeyup = function (event) {
    var _this = this;
    if (!this._holding) {
      return;
    }
    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      _this._observer.release(_this, event, [0, 0]);
      _this._holding = false;
    }, DELAY);
  };
  __proto._attachEvent = function (observer) {
    var element = this.element;
    if (!element) {
      throw new Error("Element to connect input does not exist.");
    }
    this._observer = observer;
    element.addEventListener("keydown", this._onKeydown, false);
    element.addEventListener("keypress", this._onKeydown, false);
    element.addEventListener("keyup", this._onKeyup, false);
    this._enabled = true;
  };
  __proto._detachEvent = function () {
    var element = this.element;
    if (element) {
      element.removeEventListener("keydown", this._onKeydown, false);
      element.removeEventListener("keypress", this._onKeydown, false);
      element.removeEventListener("keyup", this._onKeyup, false);
    }
    this._enabled = false;
    this._observer = null;
  };
  return MoveKeyInput;
}()));

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
var REACTIVE_AXES = {
  methods: AXES_METHODS,
  events: AXES_EVENTS,
  created: function (data) {
    return new Axes(data.axis, data.options);
  },
  on: function (instance, name, callback) {
    instance.on(name, callback);
  },
  off: function (instance, name, callback) {
    instance.off(name, callback);
  },
  destroy: function (instance) {
    instance.destroy();
  }
};

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* harmony default export */ var axes_esm = (Axes);

;// CONCATENATED MODULE: ./node_modules/@cfcs/core/dist/cfcs.esm.js

/*
Copyright (c) NAVER Crop.
name: @cfcs/core
license: MIT
author: NAVER Crop.
repository: https://github.com/naver/cfcs
version: 0.0.24
*/


/**
 * cfcs
 * Copyright (c) 2022-present NAVER Corp.
 * MIT license
 */

/**
 * @hidden
 */
function cfcs_esm_keys(obj) {
  return Object.keys(obj);
}
/**
 * @hidden
 */

function cfcs_esm_camelize(str) {
  return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
/**
 * @hidden
 */

function cfcs_esm_isString(val) {
  return typeof val === "string";
}
/**
 * @hidden
 */

function cfcs_esm_isObject(val) {
  return typeof val === "object";
}
/**
 * @hidden
 */

function cfcs_esm_isFunction(val) {
  return typeof val === "function";
}

/**
 * @hidden
 */

function findTarget(target) {
  var el;
  if (!target) {
    return null;
  }
  if (cfcs_esm_isString(target)) {
    el = document.querySelector(target);
  } else if (target instanceof Element) {
    el = target;
  } else if ("value" in target || "current" in target) {
    el = target.value || target.current;
  }
  return el;
}
/**
 * @description Sets the name of the class method to be exposed to the outside.
 * @category DOM
 * @return Property Decorator
 * @example
 * ```ts
 * import { withClassMethods } from "@cfcs/core";
 *
 * class YourFrameworkComponent {
 *   @withClassMethod(METHOD_NAMES)
 *   inst = new YourComponent();
 * }
 * ```
 */

function cfcs_esm_withClassMethods(methods) {
  return function (prototype, memberName) {
    methods.forEach(function (name) {
      if (name in prototype) {
        return;
      }
      prototype[name] = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var result = (_a = this[memberName])[name].apply(_a, args); // fix `this` type to return your own `class` instance to the instance using the decorator.

        if (result === this[memberName]) {
          return this;
        } else {
          return result;
        }
      };
    });
  };
}
var cfcs_esm_OBSERVERS_PATH = "__observers__";
var COMPUTED_PATH = "__computed__";
var CFCS_DETECTED_DEPENDENCIES_VERSION = 1;
var CFCS_DETECTED_DEPENDENCIES = "__CFCS_DETECTED_DEPENDENCIES__";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var cfcs_esm_extendStatics = function (d, b) {
  cfcs_esm_extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return cfcs_esm_extendStatics(d, b);
};
function cfcs_esm_extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  cfcs_esm_extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function getDetectedStack() {
  // Version issues do not occur when you access the native object in the global.
  Object[CFCS_DETECTED_DEPENDENCIES] = Object[CFCS_DETECTED_DEPENDENCIES] || {};
  var versionList = Object[CFCS_DETECTED_DEPENDENCIES];
  versionList[CFCS_DETECTED_DEPENDENCIES_VERSION] = versionList[CFCS_DETECTED_DEPENDENCIES_VERSION] || [];
  return versionList[CFCS_DETECTED_DEPENDENCIES_VERSION];
}
function getCurrentDetected() {
  var stack = getDetectedStack();
  return stack[stack.length - 1];
}
function detectDependencies(host) {
  var stack = getDetectedStack();
  var observers = [];
  var detected = {
    host: host,
    observers: observers,
    push: function (observer) {
      if (host !== observer && observers.indexOf(observer) === -1) {
        observers.push(observer);
      }
    }
  };
  stack.push(detected);
  return detected;
}
function endDetectDependencies() {
  var stack = getDetectedStack();
  return stack.pop();
}

/**
 * Creates a mutable ref object. You can access the `.current` value and detect the value change through `.subscribe`.
 * @category Reactive
 * @see observe
 */

var cfcs_esm_Observer = /*#__PURE__*/
(/* unused pure expression or super */ null && (function () {
  /**
   *
   */
  function Observer(value) {
    this._emitter = new Component();
    this._current = value;
  }
  var __proto = Observer.prototype;
  Object.defineProperty(__proto, "current", {
    /**
     * return the current value.
     */
    get: function () {
      var currentDetected = getCurrentDetected();
      currentDetected === null || currentDetected === void 0 ? void 0 : currentDetected.push(this);
      return this._current;
    },
    set: function (value) {
      this._setCurrent(value);
    },
    enumerable: false,
    configurable: true
  });
  /**
   * When the current value changes, the callback function is called.
   */

  __proto.subscribe = function (callback) {
    this.current;
    this._emitter.on("update", callback);
    return this;
  };
  /**
   * Cancel the registered subscription through callback.
   */

  __proto.unsubscribe = function (callback) {
    this._emitter.off("update", callback);
    return this;
  };
  __proto._setCurrent = function (value) {
    var prevValue = this._current;
    var isUpdate = value !== prevValue;
    this._current = value;
    if (isUpdate) {
      this._emitter.trigger("update", value, prevValue);
    }
  };
  /**
   * @hidden
   */

  __proto.toString = function () {
    return "".concat(this.current);
  };
  /**
   * @hidden
   */

  __proto.valueOf = function () {
    return this.current;
  };
  return Observer;
}()));

/**
 * @category Reactive
 * @hidden
 */

var ComputedObserver = /*#__PURE__*/
(/* unused pure expression or super */ null && (function (_super) {
  cfcs_esm_extends(ComputedObserver, _super);
  /**
   * @description Creates a new computed observer from the values of other observers.
   * It is read-only and if you change the value of the observer used inside the callback, its value will be automatically updated.
   * @param _computedCallback A function for observers to be computed.
   */

  function ComputedObserver(_computedCallback) {
    var _this = _super.call(this) || this;
    _this._computedCallback = _computedCallback;
    _this._registered = [];
    _this._onCheckUpdate = function () {
      _this._setCurrent(_this.current);
    };
    _this._current = _this.current;
    return _this;
  }
  var __proto = ComputedObserver.prototype;
  Object.defineProperty(__proto, "current", {
    get: function () {
      var _this = this;
      detectDependencies(this);
      var value = this._computedCallback();
      var results = endDetectDependencies();
      this._registered.forEach(function (observer) {
        observer.unsubscribe(_this._onCheckUpdate);
      });
      results.observers.forEach(function (observer) {
        observer.subscribe(_this._onCheckUpdate);
      });
      this._registered = results.observers;
      return value;
    },
    enumerable: false,
    configurable: true
  });
  return ComputedObserver;
}(cfcs_esm_Observer)));
function injectObserve(prototype, memberName, publicName) {
  if (publicName === void 0) {
    publicName = memberName;
  }
  var nextAttributes = {
    configurable: true,
    get: function () {
      return cfcs_esm_getObserver(this, publicName).current;
    },
    set: function (value) {
      cfcs_esm_getObserver(this, publicName, value).current = value;
    }
  };
  Object.defineProperty(prototype, memberName, nextAttributes);
  if (publicName !== memberName) {
    Object.defineProperty(prototype, publicName, {
      configurable: true,
      get: function () {
        return cfcs_esm_getObserver(this, publicName).current;
      }
    });
  }
}
/**
 * @description `Observe` is a property decorator and converts the property into a `reactive state`. You can detect its status through `.subscribe`.
 * @category Reactive-Decorator
 * @see ReactiveSubscribe
 * @example
* ```ts
import { ReactiveSubscribe, Observe } from "@cfcs/core";

@ReactiveSubscribe
class Component {
  // The public name and state name are the same.
  @Observe value1 = 1;
  // If you want to set public name and private properties separately
  @Observe("value2") _value2 = 1;

  constructor() {
    requestAnimationFrame(() => {
      this.value1 = 2;
    });
  }
}
interface C
```
 */

function Observe() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  if (args.length > 1) {
    return injectObserve(args[0], args[1]);
  }
  return function (prototype, memberName) {
    return injectObserve(prototype, memberName, args[0]);
  };
}
/**
 * @hidden
 */

function cfcs_esm_Reactive() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return Observe.apply(void 0, args);
}

/**
 * @hidden
 */

function cfcs_esm_injectReactiveSubscribe(object) {
  object["subscribe"] = function (name, callback) {
    this[name];
    cfcs_esm_getObserver(this, name).subscribe(callback);
  };
  object["unsubscribe"] = function (name, callback) {
    var _this = this;
    if (!name) {
      cfcs_esm_keys(cfcs_esm_getObservers(this)).forEach(function (observerName) {
        _this.unsubscribe(observerName);
      });
      return;
    }
    if (!(name in this)) {
      return;
    }
    cfcs_esm_getObserver(this, name).unsubscribe(callback);
  };
}
/**
 * @description `ReactiveSubscribe` is a class decorator and adds `.subscribe` and `.unsubscribe` methods.
 * @category Reactive-Decorator
 * @see Observe
 * @example
 * ```ts
import { ReactiveSubscribe, Observe } from "@cfcs/core";

@ReactiveSubscribe
class Component {
  @Observe value1 = 1;

  constructor() {
    requestAnimationFrame(() => {
      this.value1 = 2;
    });
  }
}

interface Component extends ReactiveSubscribe<{
  value1: number;
  value2: number;
}> {}

const component = new Component();

// 1
console.log(component.value1);

component.subscribe("value1", nextValue => {
  // When the change event occurs => (2, 2)
  console.log(nextValue, component.value2);
});
```
 */

function cfcs_esm_ReactiveSubscribe(Constructor) {
  var prototype = Constructor.prototype;
  cfcs_esm_injectReactiveSubscribe(prototype);
}
function makeReactiveObject(setup, all) {
  var result = cfcs_esm_isFunction(setup) ? setup() : setup;
  var reactiveObject = {};
  defineObservers(reactiveObject);
  cfcs_esm_keys(result).forEach(function (name) {
    var value = result[name];
    if (cfcs_esm_isObserver(value)) {
      cfcs_esm_setObserver(reactiveObject, name, value);
    } else {
      cfcs_esm_setObserver(reactiveObject, name, cfcs_esm_observe(value));
    }
    Observe(name)(reactiveObject, name);
  });
  cfcs_esm_injectReactiveSubscribe(reactiveObject);
  return reactiveObject;
}
/**
 * @description Make the return value of the corresponding object or function a reactive object.
 * @category Reactive
 * @param setup - The target object or function to which reactive is applied
 * @returns Makes all values into reactive objects.
 * @example
 * ```ts
 * import { reactive } from "@cfcs/core";
 *
 * const obj = reactive({
 *  value1: 1,
 *  value2: 2,
 * });
 *
 * obj.subscribe("value1", value1 => {
 *   console.log(value1);
 * });
 * obj.value1 = 2;
 * ```
 */

function dist_cfcs_esm_reactive(setup) {
  return makeReactiveObject(setup);
}
/**
 * @description Make the return value of the corresponding object or function a reactive object.
 * @category Reactive
 * @param setup - The target object or function to which reactive is applied
 * @returns Only the values to which observer is applied are objects to which reactive is applied.
 * @example
 * ```ts
 * import { partialReactive, observe } from "@cfcs/core";
 *
 * const value1 = observe(1);
 * const value2 = observe(2);
 * const obj = partialReactive({
 *  value1,
 *  value2,
 * });
 *
 * obj.subscribe("value1", value1 => {
 *   console.log(value1);
 * });
 * value1.current = 2;
 * ```
 */

function partialReactive(setup) {
  return makeReactiveObject(setup);
}
/**
 * @description Creates a mutable ref object. You can access the `.current` value and detect the value change through `.subscribe`.
 * @category Reactive
 * @example
 * ```ts
 * import { observe } from "@cfcs/core";
 *
 * const ob1 = observe(1);
 *
 * ob1.subscribe(nextValue => {
 *   console.log(nextValue);
 * });
 *
 * ob1.current = 2;
 * ```
 */

function cfcs_esm_observe(defaultValue) {
  return new cfcs_esm_Observer(defaultValue);
}
/**
 * @hidden
 */

function computed(computedCallback) {
  return new ComputedObserver(computedCallback);
}

/**
 * @hidden
 */

function cfcs_esm_withReactiveMethods(ref, methods) {
  var obj = {};
  if (!methods) {
    return obj;
  }
  methods.forEach(function (name) {
    obj[name] = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var current = ref.current || ref.value;
      return current[name].apply(current, args);
    };
  });
  return obj;
}
/**
 * @hidden
 */

function defineObservers(instance) {
  var observers = {};
  Object.defineProperty(instance, cfcs_esm_OBSERVERS_PATH, {
    get: function () {
      return observers;
    }
  });
  return observers;
}
/**
 * @hidden
 */

function cfcs_esm_getObservers(instance) {
  var _a, _b;
  if (!instance[cfcs_esm_OBSERVERS_PATH]) {
    defineObservers(instance);
  }
  var observers = instance[cfcs_esm_OBSERVERS_PATH];
  var computedList = (_b = (_a = instance === null || instance === void 0 ? void 0 : instance.constructor) === null || _a === void 0 ? void 0 : _a.prototype) === null || _b === void 0 ? void 0 : _b[COMPUTED_PATH];
  if (computedList) {
    computedList.forEach(function (name) {
      if (!(name in observers) && name in instance) {
        instance[name];
      }
    });
  }
  return observers;
}
/**
 * @hidden
 */

function cfcs_esm_getObserver(instance, name, defaultValue) {
  var observers = cfcs_esm_getObservers(instance);
  if (!observers[name]) {
    observers[name] = cfcs_esm_observe(defaultValue);
  }
  return observers[name];
}
/**
 * @hidden
 */

function cfcs_esm_setObserver(instance, name, observer) {
  var observers = cfcs_esm_getObservers(instance);
  observers[name] = observer;
}
/**
 * @description Whether that object is an observer instance
 * @category Reactive
 */

function cfcs_esm_isObserver(val) {
  return val && cfcs_esm_isObject(val) && "current" in val && "subscribe" in val && "unsubscribe" in val;
}
/**
 * @description Whether the object is reactive
 * @category Reactive
 */

function isReactive(val) {
  return val && !cfcs_esm_isObserver(val) && "subscribe" in val && "unsubscribe" in val;
}

/**
 * @category Reactive
 * @hidden
 */

function cfcs_esm_adaptReactive(adapter, props) {
  var objectAdapter = cfcs_esm_isFunction(adapter) ? {
    setup: adapter
  } : adapter;
  function getProps() {
    var _a, _b, _c, _d, _e;
    return (_e = (_c = (_a = props === null || props === void 0 ? void 0 : props()) !== null && _a !== void 0 ? _a : (_b = objectAdapter.props) === null || _b === void 0 ? void 0 : _b.call(objectAdapter)) !== null && _c !== void 0 ? _c : (_d = objectAdapter.data) === null || _d === void 0 ? void 0 : _d.call(objectAdapter)) !== null && _e !== void 0 ? _e : {};
  }
  var eventEmitter = new Component();
  var mountedHooks = [];
  var initHooks = [];
  var destroyHooks = [];
  var onHooks = [];
  var instanceRef = {
    current: null
  };
  var offHooksList = [];
  var initialState = null;
  var eventNames = [];
  var methodNames = [];
  var onMounted = function (callback) {
    mountedHooks.push(callback);
  };
  var onInit = function (callback) {
    initHooks.push(callback);
  };
  var onDestroy = function (callback) {
    destroyHooks.push(callback);
  };
  var on = function (callback) {
    onHooks.push(callback);
  };
  var emit = function (eventName) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      params[_i - 1] = arguments[_i];
    }
    eventEmitter.trigger.apply(eventEmitter, __spreadArray([eventName], params, false));
  };
  var setInitialState = function (state) {
    initialState = state;
  };
  var setEvents = function (events) {
    eventNames = events;
  };
  var setMethods = function (methods) {
    methodNames = methods;
  };
  if (objectAdapter.setup) {
    instanceRef.current = objectAdapter.setup({
      getProps: getProps,
      setInitialState: setInitialState,
      setEvents: setEvents,
      setMethods: setMethods,
      onMounted: onMounted,
      onDestroy: onDestroy,
      onInit: onInit,
      emit: emit,
      on: on
    }) || null;
  }
  if (objectAdapter.created) {
    instanceRef.current = objectAdapter.created(getProps()) || null;
  }
  if (objectAdapter.events) {
    setEvents(objectAdapter.events);
  }
  if (objectAdapter.state) {
    setInitialState(objectAdapter.state);
  }
  if (objectAdapter.methods) {
    setMethods(objectAdapter.methods);
  }
  if (objectAdapter.mounted) {
    onMounted(objectAdapter.mounted);
  }
  if (objectAdapter.destroy) {
    destroyHooks.push(objectAdapter.destroy);
  }
  if (objectAdapter.init) {
    initHooks.push(objectAdapter.init);
  }
  if (objectAdapter.on) {
    onHooks.push(function (instance, eventName, listener) {
      var off = objectAdapter.on(instance, eventName, listener);
      return function () {
        var _a;
        off && off();
        (_a = objectAdapter.off) === null || _a === void 0 ? void 0 : _a.call(objectAdapter, instance, eventName, listener);
      };
    });
  }
  return {
    events: function () {
      return eventNames;
    },
    state: function () {
      var inst = instanceRef.current;
      if (initialState) {
        return initialState;
      }
      if (inst) {
        var observers_1 = cfcs_esm_getObservers(inst);
        setInitialState(cfcs_esm_keys(observers_1).reduce(function (prev, cur) {
          prev[cur] = observers_1[cur].current;
          return prev;
        }, {}));
      }
      return initialState || {};
    },
    instance: function () {
      return instanceRef.current;
    },
    mounted: function () {
      var props = getProps();
      mountedHooks.forEach(function (hook) {
        instanceRef.current = hook(props, instanceRef.current) || instanceRef.current;
      });
    },
    init: function () {
      // on events
      var instance = instanceRef.current;
      var props = getProps();
      offHooksList = eventNames.map(function (eventName) {
        var listener = function () {
          var _a;
          var params = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
          }
          (_a = eventEmitter).trigger.apply(_a, __spreadArray([eventName], params, false));
        };
        var instance = instanceRef.current;
        return onHooks.map(function (hook) {
          return hook(instance, eventName, listener);
        }).filter(Boolean);
      }); // init

      initHooks.forEach(function (hook) {
        hook(instance, props);
      });
    },
    destroy: function () {
      // off events
      offHooksList.forEach(function (offHooks) {
        offHooks.forEach(function (hook) {
          hook();
        });
      }); // destroy

      eventEmitter.off();
      var instance = instanceRef.current;
      var props = getProps();
      destroyHooks.forEach(function (hook) {
        hook(instance, props);
      });
    },
    methods: function () {
      return cfcs_esm_withReactiveMethods(instanceRef, methodNames);
    },
    on: function (eventName, listener) {
      eventEmitter.on(eventName, listener);
    },
    off: function (eventName, listener) {
      eventEmitter.off(eventName, listener);
    }
  };
}

/**
 * @description `Computed` is a property decorator.
 * Changes in computed state values are also recognized according to changes in observers used within the getter function.
 * You can detect its status through `.subscribe`.
 * @hidden
 * @category Reactive-Decorator
 * @see ReactiveSubscribe
 * @example
 * ```ts
const ob1 = observe(0);
const ob2 = observe(1);

// When
@ReactiveSubscribe
class TestComputed {
    @Computed
    get ob3() {
        return ob1.current + ob2.current;
    }
}
const inst = new TestComputed();

inst.subscribe("ob3", ob3 => {
  console.log(ob3);
});

ob1.current = 1;
```
 */

function Computed(prototype, memberName, attributes) {
  var get = attributes.get;
  function getComputed() {
    var observers = cfcs_esm_getObservers(this);
    if (!(memberName in observers)) {
      observers[memberName] = computed(get.bind(this));
    }
    return cfcs_esm_getObserver(this, memberName).current;
  }
  var nextAttributes = {
    configurable: true,
    get: getComputed
  };
  if (COMPUTED_PATH in prototype) {
    prototype[COMPUTED_PATH] || (prototype[COMPUTED_PATH] = []);
    var computedList = prototype[COMPUTED_PATH];
    if (computedList.indexOf(memberName) === -1) {
      computedList.push(memberName);
    }
  }
  Object.defineProperty(prototype, memberName, nextAttributes);
  return nextAttributes;
}

;// CONCATENATED MODULE: ./node_modules/@egjs/imready/dist/imready.esm.js

/*
Copyright (c) NAVER Corp.
name: @egjs/imready
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-imready
version: 1.4.1
*/



/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var imready_esm_extendStatics = function (d, b) {
  imready_esm_extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return imready_esm_extendStatics(d, b);
};
function imready_esm_extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  imready_esm_extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var imready_esm_assign = function () {
  imready_esm_assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return imready_esm_assign.apply(this, arguments);
};

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
}

/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
var isWindow = typeof window !== "undefined";
var ua = isWindow ? window.navigator.userAgent : "";
var SUPPORT_COMPUTEDSTYLE = isWindow ? !!("getComputedStyle" in window) : false;
var IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
var SUPPORT_ADDEVENTLISTENER = isWindow ? !!("addEventListener" in document) : false;
var WIDTH = "width";
var HEIGHT = "height";
var PROPS = (/* unused pure expression or super */ null && (["prefix", "loaders"]));
var EVENTS = (/* unused pure expression or super */ null && (["preReadyElement", "readyElement", "error", "preReady", "ready"]));
function getAttribute(el, name) {
  return el.getAttribute(name) || "";
}
function imready_esm_toArray(arr) {
  return [].slice.call(arr);
}
function hasSizeAttribute(target, prefix) {
  if (prefix === void 0) {
    prefix = "data-";
  }
  return !!target.getAttribute(prefix + "width");
}
function hasLoadingAttribute(target, prefix) {
  if (prefix === void 0) {
    prefix = "data-";
  }
  return "loading" in target && target.getAttribute("loading") === "lazy" || !!target.getAttribute(prefix + "lazy");
}
function hasSkipAttribute(target, prefix) {
  if (prefix === void 0) {
    prefix = "data-";
  }
  return !!target.getAttribute(prefix + "skip");
}
function addEvent(element, type, handler) {
  if (SUPPORT_ADDEVENTLISTENER) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, handler);
  } else {
    element["on" + type] = handler;
  }
}
function removeEvent(element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, handler);
  } else {
    element["on" + type] = null;
  }
}
function imready_esm_innerWidth(el) {
  return getSize(el, "Width");
}
function imready_esm_innerHeight(el) {
  return getSize(el, "Height");
}
function getStyles(el) {
  return (SUPPORT_COMPUTEDSTYLE ? window.getComputedStyle(el) : el.currentStyle) || {};
}
function getSize(el, name) {
  var size = el["client" + name] || el["offset" + name];
  return parseFloat(size || getStyles(el)[name.toLowerCase()]) || 0;
}
function getContentElements(element, tags, prefix) {
  var skipElements = imready_esm_toArray(element.querySelectorAll(__spreadArrays(["[" + prefix + "skip] [" + prefix + "width]"], tags.map(function (tag) {
    return ["[" + prefix + "skip] " + tag, tag + "[" + prefix + "skip]", "[" + prefix + "width] " + tag].join(", ");
  })).join(", ")));
  return imready_esm_toArray(element.querySelectorAll("[" + prefix + "width], " + tags.join(", "))).filter(function (el) {
    return skipElements.indexOf(el) === -1;
  });
}

/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
var imready_esm_elements = [];
function addAutoSizer(element, prefix) {
  !imready_esm_elements.length && addEvent(window, "resize", resizeAllAutoSizers);
  element.__PREFIX__ = prefix;
  imready_esm_elements.push(element);
  resize(element);
}
function removeAutoSizer(element, prefix) {
  var index = imready_esm_elements.indexOf(element);
  if (index < 0) {
    return;
  }
  var fixed = getAttribute(element, prefix + "fixed");
  delete element.__PREFIX__;
  element.style[fixed === HEIGHT ? WIDTH : HEIGHT] = "";
  imready_esm_elements.splice(index, 1);
  !imready_esm_elements.length && removeEvent(window, "resize", resizeAllAutoSizers);
}
function resize(element, prefix) {
  if (prefix === void 0) {
    prefix = "data-";
  }
  var elementPrefix = element.__PREFIX__ || prefix;
  var dataWidth = parseInt(getAttribute(element, "" + elementPrefix + WIDTH), 10) || 0;
  var dataHeight = parseInt(getAttribute(element, "" + elementPrefix + HEIGHT), 10) || 0;
  var fixed = getAttribute(element, elementPrefix + "fixed");
  if (fixed === HEIGHT) {
    var size = imready_esm_innerHeight(element) || dataHeight;
    element.style[WIDTH] = dataWidth / dataHeight * size + "px";
  } else {
    var size = imready_esm_innerWidth(element) || dataWidth;
    element.style[HEIGHT] = dataHeight / dataWidth * size + "px";
  }
}
function resizeAllAutoSizers() {
  imready_esm_elements.forEach(function (element) {
    resize(element);
  });
}
var Loader = /*#__PURE__*/function (_super) {
  imready_esm_extends(Loader, _super);
  function Loader(element, options) {
    if (options === void 0) {
      options = {};
    }
    var _this = _super.call(this) || this;
    _this.isReady = false;
    _this.isPreReady = false;
    _this.hasDataSize = false;
    _this.hasLoading = false;
    _this.isSkip = false;
    _this.onCheck = function (e) {
      _this.clear();
      if (e && e.type === "error") {
        _this.onError(_this.element);
      }
      if (_this.hasLoading && _this.checkElement()) {
        // I'm not ready
        return;
      }
      // I'm pre-ready and ready!
      var withPreReady = !_this.hasDataSize && !_this.hasLoading;
      _this.onReady(withPreReady);
    };
    _this.options = imready_esm_assign({
      prefix: "data-"
    }, options);
    _this.element = element;
    var prefix = _this.options.prefix;
    _this.hasDataSize = hasSizeAttribute(element, prefix);
    _this.isSkip = hasSkipAttribute(element, prefix);
    _this.hasLoading = hasLoadingAttribute(element, prefix);
    return _this;
  }
  var __proto = Loader.prototype;
  __proto.check = function () {
    if (this.isSkip || !this.checkElement()) {
      // I'm Ready
      this.onAlreadyReady(true);
      return false;
    }
    if (this.hasDataSize) {
      addAutoSizer(this.element, this.options.prefix);
    }
    if (this.hasDataSize || this.hasLoading) {
      // I'm Pre Ready
      this.onAlreadyPreReady();
    }
    // Wati Pre Ready, Ready
    return true;
  };
  __proto.addEvents = function () {
    var _this = this;
    var element = this.element;
    this.constructor.EVENTS.forEach(function (name) {
      addEvent(element, name, _this.onCheck);
    });
  };
  __proto.clear = function () {
    var _this = this;
    var element = this.element;
    this.constructor.EVENTS.forEach(function (name) {
      removeEvent(element, name, _this.onCheck);
    });
    this.removeAutoSizer();
  };
  __proto.destroy = function () {
    this.clear();
    this.off();
  };
  __proto.removeAutoSizer = function () {
    if (this.hasDataSize) {
      // I'm already ready.
      var prefix = this.options.prefix;
      removeAutoSizer(this.element, prefix);
    }
  };
  __proto.onError = function (target) {
    this.trigger("error", {
      element: this.element,
      target: target
    });
  };
  __proto.onPreReady = function () {
    if (this.isPreReady) {
      return;
    }
    this.isPreReady = true;
    this.trigger("preReady", {
      element: this.element,
      hasLoading: this.hasLoading,
      isSkip: this.isSkip
    });
  };
  __proto.onReady = function (withPreReady) {
    if (this.isReady) {
      return;
    }
    withPreReady = !this.isPreReady && withPreReady;
    if (withPreReady) {
      this.isPreReady = true;
    }
    this.removeAutoSizer();
    this.isReady = true;
    this.trigger("ready", {
      element: this.element,
      withPreReady: withPreReady,
      hasLoading: this.hasLoading,
      isSkip: this.isSkip
    });
  };
  __proto.onAlreadyError = function (target) {
    var _this = this;
    setTimeout(function () {
      _this.onError(target);
    });
  };
  __proto.onAlreadyPreReady = function () {
    var _this = this;
    setTimeout(function () {
      _this.onPreReady();
    });
  };
  __proto.onAlreadyReady = function (withPreReady) {
    var _this = this;
    setTimeout(function () {
      _this.onReady(withPreReady);
    });
  };
  Loader.EVENTS = [];
  return Loader;
}(component_esm);
var ElementLoader = /*#__PURE__*/function (_super) {
  imready_esm_extends(ElementLoader, _super);
  function ElementLoader() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  var __proto = ElementLoader.prototype;
  __proto.setHasLoading = function (hasLoading) {
    this.hasLoading = hasLoading;
  };
  __proto.check = function () {
    if (this.isSkip) {
      // I'm Ready
      this.onAlreadyReady(true);
      return false;
    }
    if (this.hasDataSize) {
      addAutoSizer(this.element, this.options.prefix);
      this.onAlreadyPreReady();
    } else {
      // has not data size
      this.trigger("requestChildren");
    }
    return true;
  };
  __proto.checkElement = function () {
    return true;
  };
  __proto.destroy = function () {
    this.clear();
    this.trigger("requestDestroy");
    this.off();
  };
  __proto.onAlreadyPreReady = function () {
    // has data size
    _super.prototype.onAlreadyPreReady.call(this);
    this.trigger("reqeustReadyChildren");
  };
  ElementLoader.EVENTS = [];
  return ElementLoader;
}(Loader);

/**
 * @alias eg.ImReady
 * @extends eg.Component
 */
var ImReadyManager = /*#__PURE__*/function (_super) {
  imready_esm_extends(ImReadyManager, _super);
  /**
   * @param - ImReady's options
   */
  function ImReadyManager(options) {
    if (options === void 0) {
      options = {};
    }
    var _this = _super.call(this) || this;
    _this.readyCount = 0;
    _this.preReadyCount = 0;
    _this.totalCount = 0;
    _this.totalErrorCount = 0;
    _this.isPreReadyOver = true;
    _this.elementInfos = [];
    _this.options = imready_esm_assign({
      loaders: {},
      prefix: "data-"
    }, options);
    return _this;
  }
  /**
   * Checks whether elements are in the ready state.
   * @ko 엘리먼트가 준비 상태인지 체크한다.
   * @elements - Elements to check ready status. <ko> 준비 상태를 체크할 엘리먼트들.</ko>
   * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReadyElement: e => {
     *     // 1, 3
     *     // 2, 3
     *     // 3, 3
     *     console.log(e.preReadyCount, e.totalCount),
     *   },
     * });
     * ```
   */
  var __proto = ImReadyManager.prototype;
  __proto.check = function (elements) {
    var _this = this;
    var prefix = this.options.prefix;
    this.clear();
    this.elementInfos = imready_esm_toArray(elements).map(function (element, index) {
      var loader = _this.getLoader(element, {
        prefix: prefix
      });
      loader.check();
      loader.on("error", function (e) {
        _this.onError(index, e.target);
      }).on("preReady", function (e) {
        var info = _this.elementInfos[index];
        info.hasLoading = e.hasLoading;
        info.isSkip = e.isSkip;
        var isPreReady = _this.checkPreReady(index);
        _this.onPreReadyElement(index);
        isPreReady && _this.onPreReady();
      }).on("ready", function (_a) {
        var withPreReady = _a.withPreReady,
          hasLoading = _a.hasLoading,
          isSkip = _a.isSkip;
        var info = _this.elementInfos[index];
        info.hasLoading = hasLoading;
        info.isSkip = isSkip;
        var isPreReady = withPreReady && _this.checkPreReady(index);
        var isReady = _this.checkReady(index);
        // Pre-ready and ready occur simultaneously
        withPreReady && _this.onPreReadyElement(index);
        _this.onReadyElement(index);
        isPreReady && _this.onPreReady();
        isReady && _this.onReady();
      });
      return {
        loader: loader,
        element: element,
        hasLoading: false,
        hasError: false,
        isPreReady: false,
        isReady: false,
        isSkip: false
      };
    });
    var length = this.elementInfos.length;
    this.totalCount = length;
    if (!length) {
      setTimeout(function () {
        _this.onPreReady();
        _this.onReady();
      });
    }
    return this;
  };
  /**
   * Gets the total count of elements to be checked.
   * @ko 체크하는 element의 총 개수를 가져온다.
   */
  __proto.getTotalCount = function () {
    return this.totalCount;
  };
  /**
   * Whether the elements are all pre-ready. (all sizes are known)
   * @ko 엘리먼트들이 모두 사전 준비가 됐는지 (사이즈를 전부 알 수 있는지) 여부.
   */
  __proto.isPreReady = function () {
    return this.elementInfos.every(function (info) {
      return info.isPreReady;
    });
  };
  /**
   * Whether the elements are all ready.
   * @ko 엘리먼트들이 모두 준비가 됐는지 여부.
   */
  __proto.isReady = function () {
    return this.elementInfos.every(function (info) {
      return info.isReady;
    });
  };
  /**
   * Whether an error has occurred in the elements in the current state.
   * @ko 현재 상태에서 엘리먼트들이 에러가 발생했는지 여부.
   */
  __proto.hasError = function () {
    return this.totalErrorCount > 0;
  };
  /**
   * Clears events of elements being checked.
   * @ko 체크 중인 엘리먼트들의 이벤트를 해제 한다.
   */
  __proto.clear = function () {
    this.isPreReadyOver = false;
    this.totalCount = 0;
    this.preReadyCount = 0;
    this.readyCount = 0;
    this.totalErrorCount = 0;
    this.elementInfos.forEach(function (info) {
      if (info.loader) {
        info.loader.destroy();
      }
    });
    this.elementInfos = [];
  };
  /**
   * Destory all events.
   * @ko 모든 이벤트를 해제 한다.
   */
  __proto.destroy = function () {
    this.clear();
    this.off();
  };
  __proto.getLoader = function (element, options) {
    var _this = this;
    var tagName = element.tagName.toLowerCase();
    var loaders = this.options.loaders;
    var prefix = options.prefix;
    var tags = Object.keys(loaders);
    if (loaders[tagName]) {
      return new loaders[tagName](element, options);
    }
    var loader = new ElementLoader(element, options);
    var children = imready_esm_toArray(element.querySelectorAll(tags.join(", ")));
    loader.setHasLoading(children.some(function (el) {
      return hasLoadingAttribute(el, prefix);
    }));
    var withPreReady = false;
    var childrenImReady = this.clone().on("error", function (e) {
      loader.onError(e.target);
    }).on("ready", function () {
      loader.onReady(withPreReady);
    });
    loader.on("requestChildren", function () {
      // has not data size
      var contentElements = getContentElements(element, tags, _this.options.prefix);
      childrenImReady.check(contentElements).on("preReady", function (e) {
        withPreReady = e.isReady;
        if (!withPreReady) {
          loader.onPreReady();
        }
      });
    }).on("reqeustReadyChildren", function () {
      // has data size
      // loader call preReady
      // check only video, image elements
      childrenImReady.check(children);
    }).on("requestDestroy", function () {
      childrenImReady.destroy();
    });
    return loader;
  };
  __proto.clone = function () {
    return new ImReadyManager(imready_esm_assign({}, this.options));
  };
  __proto.checkPreReady = function (index) {
    this.elementInfos[index].isPreReady = true;
    ++this.preReadyCount;
    if (this.preReadyCount < this.totalCount) {
      return false;
    }
    return true;
  };
  __proto.checkReady = function (index) {
    this.elementInfos[index].isReady = true;
    ++this.readyCount;
    if (this.readyCount < this.totalCount) {
      return false;
    }
    return true;
  };
  __proto.onError = function (index, target) {
    var info = this.elementInfos[index];
    info.hasError = true;
    /**
     * An event occurs if the image, video fails to load.
     * @ko 이미지, 비디오가 로딩에 실패하면 이벤트가 발생한다.
     * @event eg.ImReady#error
     * @param {eg.ImReady.OnError} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg"/>
     *    <img src="ERR"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check([document.querySelector("div")]).on({
     *   error: e => {
     *     // <div>...</div>, 0, <img src="ERR"/>
     *     console.log(e.element, e.index, e.target),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent$1("error", {
      element: info.element,
      index: index,
      target: target,
      errorCount: this.getErrorCount(),
      totalErrorCount: ++this.totalErrorCount
    }));
  };
  __proto.onPreReadyElement = function (index) {
    var info = this.elementInfos[index];
    /**
     * An event occurs when the element is pre-ready (when the loading attribute is applied or the size is known)
     * @ko 해당 엘리먼트가 사전 준비되었을 때(loading 속성이 적용되었거나 사이즈를 알 수 있을 때) 이벤트가 발생한다.
     * @event eg.ImReady#preReadyElement
     * @param {eg.ImReady.OnPreReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReadyElement: e => {
     *     // 1, 3
     *     // 2, 3
     *     // 3, 3
     *     console.log(e.preReadyCount, e.totalCount),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent$1("preReadyElement", {
      element: info.element,
      index: index,
      preReadyCount: this.preReadyCount,
      readyCount: this.readyCount,
      totalCount: this.totalCount,
      isPreReady: this.isPreReady(),
      isReady: this.isReady(),
      hasLoading: info.hasLoading,
      isSkip: info.isSkip
    }));
  };
  __proto.onPreReady = function () {
    this.isPreReadyOver = true;
    /**
     * An event occurs when all element are pre-ready (When all elements have the loading attribute applied or the size is known)
     * @ko 모든 엘리먼트들이 사전 준비된 경우 (모든 엘리먼트들이 loading 속성이 적용되었거나 사이즈를 알 수 있는 경우) 이벤트가 발생한다.
     * @event eg.ImReady#preReady
     * @param {eg.ImReady.OnPreReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReady: e => {
     *     // 0, 3
     *     console.log(e.readyCount, e.totalCount),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent$1("preReady", {
      readyCount: this.readyCount,
      totalCount: this.totalCount,
      isReady: this.isReady(),
      hasLoading: this.hasLoading()
    }));
  };
  __proto.onReadyElement = function (index) {
    var info = this.elementInfos[index];
    /**
     * An event occurs when the element is ready
     * @ko 해당 엘리먼트가 준비가 되었을 때 이벤트가 발생한다.
     * @event eg.ImReady#readyElement
     * @param {eg.ImReady.OnReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   readyElement: e => {
     *     // 1, 0, false, 3
     *     // 2, 1, false, 3
     *     // 3, 2, true, 3
     *     console.log(e.readyCount, e.index, e.hasError, e.totalCount),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent$1("readyElement", {
      index: index,
      element: info.element,
      hasError: info.hasError,
      errorCount: this.getErrorCount(),
      totalErrorCount: this.totalErrorCount,
      preReadyCount: this.preReadyCount,
      readyCount: this.readyCount,
      totalCount: this.totalCount,
      isPreReady: this.isPreReady(),
      isReady: this.isReady(),
      hasLoading: info.hasLoading,
      isPreReadyOver: this.isPreReadyOver,
      isSkip: info.isSkip
    }));
  };
  __proto.onReady = function () {
    /**
     * An event occurs when all element are ready
     * @ko 모든 엘리먼트들이 준비된 경우 이벤트가 발생한다.
     * @event eg.ImReady#ready
     * @param {eg.ImReady.OnReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReady: e => {
     *     // 0, 3
     *     console.log(e.readyCount, e.totalCount),
     *   },
     *   ready: e => {
     *     // 1, 3
     *     console.log(e.errorCount, e.totalCount),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent$1("ready", {
      errorCount: this.getErrorCount(),
      totalErrorCount: this.totalErrorCount,
      totalCount: this.totalCount
    }));
  };
  __proto.getErrorCount = function () {
    return this.elementInfos.filter(function (info) {
      return info.hasError;
    }).length;
  };
  __proto.hasLoading = function () {
    return this.elementInfos.some(function (info) {
      return info.hasLoading;
    });
  };
  return ImReadyManager;
}(component_esm);
var ImageLoader = /*#__PURE__*/function (_super) {
  imready_esm_extends(ImageLoader, _super);
  function ImageLoader() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  var __proto = ImageLoader.prototype;
  __proto.checkElement = function () {
    var element = this.element;
    var src = element.getAttribute("src");
    if (element.complete) {
      if (src) {
        // complete
        if (!element.naturalWidth) {
          this.onAlreadyError(element);
        }
        return false;
      } else {
        // Using an external lazy loading module
        this.onAlreadyPreReady();
      }
    }
    this.addEvents();
    IS_IE && element.setAttribute("src", src);
    return true;
  };
  ImageLoader.EVENTS = ["load", "error"];
  return ImageLoader;
}(Loader);
var VideoLoader = /*#__PURE__*/function (_super) {
  imready_esm_extends(VideoLoader, _super);
  function VideoLoader() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  var __proto = VideoLoader.prototype;
  __proto.checkElement = function () {
    var element = this.element;
    // HAVE_NOTHING: 0, no information whether or not the audio/video is ready
    // HAVE_METADATA: 1, HAVE_METADATA - metadata for the audio/video is ready
    // HAVE_CURRENT_DATA: 2, data for the current playback position is available, but not enough data to play next frame/millisecond
    // HAVE_FUTURE_DATA: 3, data for the current and at least the next frame is available
    // HAVE_ENOUGH_DATA: 4, enough data available to start playing
    if (element.readyState >= 1) {
      return false;
    }
    if (element.error) {
      this.onAlreadyError(element);
      return false;
    }
    this.addEvents();
    return true;
  };
  VideoLoader.EVENTS = ["loadedmetadata", "error"];
  return VideoLoader;
}(Loader);
var ImReady = /*#__PURE__*/function (_super) {
  imready_esm_extends(ImReady, _super);
  function ImReady(options) {
    if (options === void 0) {
      options = {};
    }
    return _super.call(this, imready_esm_assign({
      loaders: {
        img: ImageLoader,
        video: VideoLoader
      }
    }, options)) || this;
  }
  return ImReady;
}(ImReadyManager);
var REACTIVE_IMREADY = function (_a) {
  var setEvents = _a.setEvents,
    setMethods = _a.setMethods,
    on = _a.on,
    onInit = _a.onInit,
    onDestroy = _a.onDestroy,
    getProps = _a.getProps;
  setEvents(EVENTS);
  setMethods(["add"]);
  var children = [];
  var reactiveImReady = reactive({
    preReadyCount: 0,
    readyCount: 0,
    errorCount: 0,
    totalErrorCount: 0,
    totalCount: 0,
    isPreReady: false,
    isReady: false,
    hasError: false,
    isPreReadyOver: false,
    add: function (element) {
      children.push(element);
    }
  });
  var props = getProps() || {};
  var imReady = new ImReady(props);
  imReady.on("error", function (e) {
    reactiveImReady.hasError = true;
    reactiveImReady.errorCount = e.errorCount;
    reactiveImReady.totalErrorCount = e.totalErrorCount;
  }).on("preReadyElement", function (e) {
    reactiveImReady.preReadyCount = e.preReadyCount;
  }).on("readyElement", function (e) {
    reactiveImReady.readyCount = e.readyCount;
    reactiveImReady.isPreReadyOver = e.isPreReadyOver;
  }).on("preReady", function () {
    reactiveImReady.isPreReady = true;
  }).on("ready", function () {
    reactiveImReady.isReady = true;
  });
  on(function (_, name, callback) {
    imReady.on(name, callback);
    return function () {
      imReady.off(name, callback);
    };
  });
  onInit(function () {
    var selector = props === null || props === void 0 ? void 0 : props.selector;
    var checkedElements = [];
    children.forEach(function (child) {
      if (!child) {
        return;
      }
      if (isString(child)) {
        checkedElements = __spreadArrays(checkedElements, imready_esm_toArray(document.querySelectorAll(child)));
      } else if (child instanceof Element) {
        checkedElements.push(child);
      } else if ("value" in child || "current" in child) {
        var element = child.value || child.current;
        if (element) {
          checkedElements.push(element);
        }
      }
    });
    if (selector) {
      checkedElements = checkedElements.reduce(function (prev, cur) {
        return __spreadArrays(prev, [].slice.call(cur.querySelectorAll(selector)));
      }, []);
    }
    reactiveImReady.totalCount = checkedElements.length;
    imReady.check(checkedElements);
  });
  onDestroy(function () {
    imReady.destroy();
  });
  return reactiveImReady;
};

/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/

/* harmony default export */ var imready_esm = (ImReady);

;// CONCATENATED MODULE: ./node_modules/@egjs/flicking/dist/flicking.esm.js

/*
Copyright (c) 2015-present NAVER Corp.
name: @egjs/flicking
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking
version: 4.10.7
*/




/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var flicking_esm_extendStatics = function (d, b) {
  flicking_esm_extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return flicking_esm_extendStatics(d, b);
};
function flicking_esm_extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  flicking_esm_extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var flicking_esm_assign = function () {
  flicking_esm_assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return flicking_esm_assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function flicking_esm_values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function flicking_esm_read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

/** @deprecated */
function flicking_esm_spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(flicking_esm_read(arguments[i]));
  return ar;
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/**
 * Error codes of {@link FlickingError}. Below are the conditions where each error code occurs.
 * @ko {@link FlickingError}의 에러 코드. 아래는 각각의 에러 코드가 발생하는 조건입니다.
 * @name ERROR_CODE
 * @constant
 * @type object
 * @property {number} WRONG_TYPE Parameter type is wrong<ko>패러미터의 타입이 잘못되었을 경우</ko>
 * @property {number} ELEMENT_NOT_FOUND Element is not found inside page with the given CSS selector<ko>주어진 CSS selector로 페이지 내에서 해당 엘리먼트를 찾지 못했을 경우</ko>
 * @property {number} VAL_MUST_NOT_NULL Expected non-null value, but given `null` or `undefined`<ko>값을 기대했으나, `null`이나 `undefined`를 받은 경우</ko>
 * @property {number} NOT_ATTACHED_TO_FLICKING When Flicking's component is not initialized (i.e. {@link Flicking#init} is not called)<ko>Flicking 내부 컴포넌트가 초기화되지 않은 경우 ({@link Flicking#init}이 호출되지 않은 경우)</ko>
 * @property {number} WRONG_OPTION One of the options is wrong<ko>옵션들 중 잘못된 값이 있을 때</ko>
 * @property {number} INDEX_OUT_OF_RANGE When the given index is out of possible range<ko>인덱스가 주어진 범위를 벗어난 경우</ko>
 * @property {number} POSITION_NOT_REACHABLE When {@link Control#moveToPosition}'s position parameter is out of possible range.<ko>{@link Control#moveToPosition}의 `position` 패러미터가 도달 가능한 범위를 벗어난 경우</ko>
 * @property {number} TRANSFORM_NOT_SUPPORTED CSS `transform` property is not available(<=IE8) <ko>CSS `transform` 속성을 사용할 수 없는 경우(<=IE8)</ko>
 * @property {number} STOP_CALLED_BY_USER When the event's `stop()` is called by user.<ko>사용자에 의해 이벤트의 `stop()`이 호출된 경우</ko>
 * @property {number} ANIMATION_INTERRUPTED When the animation is interrupted by user.<ko>사용자에 의해 애니메이션이 중단된 경우</ko>
 * @property {number} ANIMATION_ALREADY_PLAYING When the animation is already playing.<ko>현재 애니메이션이 이미 진행중인 경우</ko>
 * @property {number} NOT_ALLOWED_IN_FRAMEWORK When the non-allowed method is called from frameworks (React, Angular, Vue...)
 * <ko>프레임워크(React, Angular, Vue ...)에서 사용 불가능한 메소드를 호출했을 경우</ko>
 * @property {number} NOT_INITIALIZED When the {@link Flicking#init} is not called before but is needed<ko>{@link Flicking#init}의 호출이 필요하나, 아직 호출되지 않았을 경우</ko>
 * @property {number} NO_ACTIVE When there're no active panel that flicking has selected. This may be due to the absence of any panels<ko>현재 Flicking이 선택한 패널이 없을 경우. 일반적으로 패널이 하나도 없는 경우에 발생할 수 있습니다</ko>
 * @property {number} NOT_ALLOWED_IN_VIRTUAL When the non-allowed method is called while the virtual option is enabled<ko>virtual 옵션이 활성화된 상태에서 사용 불가능한 메소드가 호출되었을 경우</ko>
 */
var CODE = {
  WRONG_TYPE: 0,
  ELEMENT_NOT_FOUND: 1,
  VAL_MUST_NOT_NULL: 2,
  NOT_ATTACHED_TO_FLICKING: 3,
  WRONG_OPTION: 4,
  INDEX_OUT_OF_RANGE: 5,
  POSITION_NOT_REACHABLE: 6,
  TRANSFORM_NOT_SUPPORTED: 7,
  STOP_CALLED_BY_USER: 8,
  ANIMATION_INTERRUPTED: 9,
  ANIMATION_ALREADY_PLAYING: 10,
  NOT_ALLOWED_IN_FRAMEWORK: 11,
  NOT_INITIALIZED: 12,
  NO_ACTIVE: 13,
  NOT_ALLOWED_IN_VIRTUAL: 14
};
var MESSAGE = {
  WRONG_TYPE: function (wrongVal, correctTypes) {
    return wrongVal + "(" + typeof wrongVal + ") is not a " + correctTypes.map(function (type) {
      return "\"" + type + "\"";
    }).join(" or ") + ".";
  },
  ELEMENT_NOT_FOUND: function (selector) {
    return "Element with selector \"" + selector + "\" not found.";
  },
  VAL_MUST_NOT_NULL: function (val, name) {
    return name + " should be provided. Given: " + val;
  },
  NOT_ATTACHED_TO_FLICKING: "This module is not attached to the Flicking instance. \"init()\" should be called first.",
  WRONG_OPTION: function (optionName, val) {
    return "Option \"" + optionName + "\" is not in correct format, given: " + val;
  },
  INDEX_OUT_OF_RANGE: function (val, min, max) {
    return "Index \"" + val + "\" is out of range: should be between " + min + " and " + max + ".";
  },
  POSITION_NOT_REACHABLE: function (position) {
    return "Position \"" + position + "\" is not reachable.";
  },
  TRANSFORM_NOT_SUPPORTED: "Browser does not support CSS transform.",
  STOP_CALLED_BY_USER: "Event stop() is called by user.",
  ANIMATION_INTERRUPTED: "Animation is interrupted by user input.",
  ANIMATION_ALREADY_PLAYING: "Animation is already playing.",
  NOT_ALLOWED_IN_FRAMEWORK: "This behavior is not allowed in the frameworks like React, Vue, or Angular.",
  NOT_INITIALIZED: "Flicking is not initialized yet, call init() first.",
  NO_ACTIVE: "There's no active panel that Flicking has selected. This may be due to the absence of any panels.",
  NOT_ALLOWED_IN_VIRTUAL: "This behavior is not allowed when the virtual option is enabled"
};

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * Event type object with event name strings of {@link Flicking}
 * @ko {@link Flicking}의 이벤트 이름 문자열들을 담은 객체
 * @type {object}
 * @property {"holdStart"} HOLD_START holdStart event<ko>holdStart 이벤트</ko>
 * @property {"holdEnd"} HOLD_END holdEnd event<ko>holdEnd 이벤트</ko>
 * @property {"moveStart"} MOVE_START moveStart event<ko>moveStart 이벤트</ko>
 * @property {"move"} MOVE move event<ko>move 이벤트</ko>
 * @property {"moveEnd"} MOVE_END moveEnd event<ko>moveEnd 이벤트</ko>
 * @property {"willChange"} WILL_CHANGE willChange event<ko>willChange 이벤트</ko>
 * @property {"changed"} CHANGED changed event<ko>changed 이벤트</ko>
 * @property {"willRestore"} WILL_RESTORE willRestore event<ko>willRestore 이벤트</ko>
 * @property {"restored"} RESTORED restored event<ko>restored 이벤트</ko>
 * @property {"select"} SELECT select event<ko>select 이벤트</ko>
 * @property {"needPanel"} NEED_PANEL needPanel event<ko>needPanel 이벤트</ko>
 * @property {"panelChange"} PANEL_CHANGE panelChange event<ko>panelChange 이벤트</ko>
 * @example
 * ```ts
 * import { EVENTS } from "@egjs/flicking";
 * EVENTS.MOVE_START; // "moveStart"
 * ```
 */
var flicking_esm_EVENTS = {
  READY: "ready",
  BEFORE_RESIZE: "beforeResize",
  AFTER_RESIZE: "afterResize",
  HOLD_START: "holdStart",
  HOLD_END: "holdEnd",
  MOVE_START: "moveStart",
  MOVE: "move",
  MOVE_END: "moveEnd",
  WILL_CHANGE: "willChange",
  CHANGED: "changed",
  WILL_RESTORE: "willRestore",
  RESTORED: "restored",
  SELECT: "select",
  NEED_PANEL: "needPanel",
  VISIBLE_CHANGE: "visibleChange",
  REACH_EDGE: "reachEdge",
  PANEL_CHANGE: "panelChange"
};
/**
 * An object with all possible predefined literal string for the {@link Flicking#align align} option
 * @ko {@link Flicking#align align} 옵션에 사용되는 미리 정의된 리터럴 상수들을 담고 있는 객체
 * @type {object}
 * @property {"prev"} PREV left/top align<ko>좌/상 정렬</ko>
 * @property {"center"} CENTER center align<ko>중앙 정렬</ko>
 * @property {"next"} NEXT right/bottom align<ko>우/하 정렬</ko>
 */
var ALIGN = {
  PREV: "prev",
  CENTER: "center",
  NEXT: "next"
};
/**
 * An object of directions
 * @ko 방향을 나타내는 값들을 담고 있는 객체
 * @type {object}
 * @property {"PREV"} PREV "left" when {@link Flicking#horizontal horizontal} is true, and "top" when {@link Flicking#horizontal horizontal} is false
 * <ko>{@link Flicking#horizontal horizontal}가 `true`일 경우 왼쪽, {@link Flicking#horizontal horizontal}가 `false`일 경우 위쪽을 의미합니다</ko>
 * @property {"NEXT"} NEXT "right" when {@link Flicking#horizontal horizontal} is true, and "bottom" when {@link Flicking#horizontal horizontal} is false
 * <ko>{@link Flicking#horizontal horizontal}가 `true`일 경우 오른쪽, {@link Flicking#horizontal horizontal}가 `false`일 경우 아래쪽을 의미합니다</ko>
 * @property {null} NONE This value usually means it's the same position<ko>주로 제자리인 경우를 의미합니다</ko>
 */
var DIRECTION = {
  PREV: "PREV",
  NEXT: "NEXT",
  NONE: null
};
/**
 * An object with all possible {@link Flicking#moveType moveType}s
 * @ko Flicking이 제공하는 {@link Flicking#moveType moveType}들을 담고 있는 객체
 * @type {object}
 * @property {"snap"} SNAP Flicking's {@link Flicking#moveType moveType} that enables {@link SnapControl} as a Flicking's {@link Flicking#control control}
 * <ko>Flicking의 {@link Flicking#control control}을 {@link SnapControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
 * @property {"freeScroll"} FREE_SCROLL Flicking's {@link Flicking#moveType moveType} that enables {@link FreeControl} as a Flicking's {@link Flicking#control control}
 * <ko>Flicking의 {@link Flicking#control control}을 {@link FreeControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
 * @property {"strict"} STRICT Flicking's {@link Flicking#moveType moveType} that enables {@link StrictControl} as a Flicking's {@link Flicking#control control}
 * <ko>Flicking의 {@link Flicking#control control}을 {@link StrictControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
 */
var MOVE_TYPE = {
  SNAP: "snap",
  FREE_SCROLL: "freeScroll",
  STRICT: "strict"
};
var CLASS = {
  VERTICAL: "vertical",
  HIDDEN: "flicking-hidden",
  DEFAULT_VIRTUAL: "flicking-panel"
};
/**
 * An object with all possible {@link Flicking#circularFallback circularFallback}s
 * @ko Flicking의 {@link Flicking#circularFallback circularFallback}에 설정 가능한 값들을 담고 있는 객체
 * @type {object}
 * @property {string} LINEAR "linear"
 * @property {string} BOUND "bound"
 */
var CIRCULAR_FALLBACK = {
  LINEAR: "linear",
  BOUND: "bound"
};

// eslint-disable-next-line @typescript-eslint/ban-types
var merge = function (target) {
  var sources = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    sources[_i - 1] = arguments[_i];
  }
  sources.forEach(function (source) {
    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });
  });
  return target;
};
var getElement = function (el, parent) {
  var targetEl = null;
  if (flicking_esm_isString(el)) {
    var parentEl = parent ? parent : document;
    var queryResult = parentEl.querySelector(el);
    if (!queryResult) {
      throw new FlickingError(MESSAGE.ELEMENT_NOT_FOUND(el), CODE.ELEMENT_NOT_FOUND);
    }
    targetEl = queryResult;
  } else if (el && el.nodeType === Node.ELEMENT_NODE) {
    targetEl = el;
  }
  if (!targetEl) {
    throw new FlickingError(MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), CODE.WRONG_TYPE);
  }
  return targetEl;
};
var checkExistence = function (value, nameOnErrMsg) {
  if (value == null) {
    throw new FlickingError(MESSAGE.VAL_MUST_NOT_NULL(value, nameOnErrMsg), CODE.VAL_MUST_NOT_NULL);
  }
};
var flicking_esm_clamp = function (x, min, max) {
  return Math.max(Math.min(x, max), min);
};
var getFlickingAttached = function (val) {
  if (!val) {
    throw new FlickingError(MESSAGE.NOT_ATTACHED_TO_FLICKING, CODE.NOT_ATTACHED_TO_FLICKING);
  }
  return val;
};
var flicking_esm_toArray = function (iterable) {
  return [].slice.call(iterable);
};
var parseAlign$1 = function (align, size) {
  var alignPoint;
  if (flicking_esm_isString(align)) {
    switch (align) {
      case ALIGN.PREV:
        alignPoint = 0;
        break;
      case ALIGN.CENTER:
        alignPoint = 0.5 * size;
        break;
      case ALIGN.NEXT:
        alignPoint = size;
        break;
      default:
        alignPoint = parseArithmeticSize(align, size);
        if (alignPoint == null) {
          throw new FlickingError(MESSAGE.WRONG_OPTION("align", align), CODE.WRONG_OPTION);
        }
    }
  } else {
    alignPoint = align;
  }
  return alignPoint;
};
var parseBounce = function (bounce, size) {
  var parsedBounce;
  if (Array.isArray(bounce)) {
    parsedBounce = bounce.map(function (val) {
      return parseArithmeticSize(val, size);
    });
  } else {
    var parsedVal = parseArithmeticSize(bounce, size);
    parsedBounce = [parsedVal, parsedVal];
  }
  return parsedBounce.map(function (val) {
    if (val == null) {
      throw new FlickingError(MESSAGE.WRONG_OPTION("bounce", bounce), CODE.WRONG_OPTION);
    }
    return val;
  });
};
var parseArithmeticSize = function (cssValue, base) {
  var parsed = parseArithmeticExpression(cssValue);
  if (parsed == null) return null;
  return parsed.percentage * base + parsed.absolute;
};
var parseArithmeticExpression = function (cssValue) {
  var cssRegex = /(?:(\+|\-)\s*)?(\d+(?:\.\d+)?(%|px)?)/g;
  if (typeof cssValue === "number") {
    return {
      percentage: 0,
      absolute: cssValue
    };
  }
  var parsed = {
    percentage: 0,
    absolute: 0
  };
  var idx = 0;
  var matchResult = cssRegex.exec(cssValue);
  while (matchResult != null) {
    var sign = matchResult[1];
    var value = matchResult[2];
    var unit = matchResult[3];
    var parsedValue = parseFloat(value);
    if (idx <= 0) {
      sign = sign || "+";
    }
    // Return default value for values not in good form
    if (!sign) {
      return null;
    }
    var signMultiplier = sign === "+" ? 1 : -1;
    if (unit === "%") {
      parsed.percentage += signMultiplier * (parsedValue / 100);
    } else {
      parsed.absolute += signMultiplier * parsedValue;
    }
    // Match next occurrence
    ++idx;
    matchResult = cssRegex.exec(cssValue);
  }
  // None-matched
  if (idx === 0) {
    return null;
  }
  return parsed;
};
var parseCSSSizeValue = function (val) {
  return flicking_esm_isString(val) ? val : val + "px";
};
var parsePanelAlign = function (align) {
  return typeof align === "object" ? align.panel : align;
};
var flicking_esm_getDirection = function (start, end) {
  if (start === end) return DIRECTION.NONE;
  return start < end ? DIRECTION.NEXT : DIRECTION.PREV;
};
var parseElement = function (element) {
  if (!Array.isArray(element)) {
    element = [element];
  }
  var elements = [];
  element.forEach(function (el) {
    if (flicking_esm_isString(el)) {
      var tempDiv = document.createElement("div");
      tempDiv.innerHTML = el;
      elements.push.apply(elements, flicking_esm_spread(flicking_esm_toArray(tempDiv.children)));
      while (tempDiv.firstChild) {
        tempDiv.removeChild(tempDiv.firstChild);
      }
    } else if (el && el.nodeType === Node.ELEMENT_NODE) {
      elements.push(el);
    } else {
      throw new FlickingError(MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), CODE.WRONG_TYPE);
    }
  });
  return elements;
};
var getMinusCompensatedIndex = function (idx, max) {
  return idx < 0 ? flicking_esm_clamp(idx + max, 0, max) : flicking_esm_clamp(idx, 0, max);
};
var includes = function (array, target) {
  var e_1, _a;
  try {
    for (var array_1 = flicking_esm_values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
      var val = array_1_1.value;
      if (val === target) return true;
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return false;
};
var flicking_esm_isString = function (val) {
  return typeof val === "string";
};
var circulatePosition = function (pos, min, max) {
  var size = max - min;
  if (pos < min) {
    var offset = (min - pos) % size;
    pos = max - offset;
  } else if (pos > max) {
    var offset = (pos - max) % size;
    pos = min + offset;
  }
  return pos;
};
var flicking_esm_find = function (array, checker) {
  var e_2, _a;
  try {
    for (var array_2 = flicking_esm_values(array), array_2_1 = array_2.next(); !array_2_1.done; array_2_1 = array_2.next()) {
      var val = array_2_1.value;
      if (checker(val)) {
        return val;
      }
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1
    };
  } finally {
    try {
      if (array_2_1 && !array_2_1.done && (_a = array_2.return)) _a.call(array_2);
    } finally {
      if (e_2) throw e_2.error;
    }
  }
  return null;
};
var findRight = function (array, checker) {
  for (var idx = array.length - 1; idx >= 0; idx--) {
    var val = array[idx];
    if (checker(val)) {
      return val;
    }
  }
  return null;
};
var findIndex = function (array, checker) {
  for (var idx = 0; idx < array.length; idx++) {
    if (checker(array[idx])) {
      return idx;
    }
  }
  return -1;
};
var getProgress = function (pos, prev, next) {
  return (pos - prev) / (next - prev);
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
var getStyle = function (el) {
  return window.getComputedStyle(el) || el.currentStyle;
};
var setSize = function (el, _a) {
  var width = _a.width,
    height = _a.height;
  if (width != null) {
    if (flicking_esm_isString(width)) {
      el.style.width = width;
    } else {
      el.style.width = width + "px";
    }
  }
  if (height != null) {
    if (flicking_esm_isString(height)) {
      el.style.height = height;
    } else {
      el.style.height = height + "px";
    }
  }
};
var isBetween = function (val, min, max) {
  return val >= min && val <= max;
};
var circulateIndex = function (index, max) {
  if (index >= max) {
    return index % max;
  } else if (index < 0) {
    return getMinusCompensatedIndex((index + 1) % max - 1, max);
  } else {
    return index;
  }
};
var range = function (end) {
  var arr = new Array(end);
  for (var i = 0; i < end; i++) {
    arr[i] = i;
  }
  return arr;
};
var getElementSize = function (_a) {
  var el = _a.el,
    horizontal = _a.horizontal,
    useFractionalSize = _a.useFractionalSize,
    useOffset = _a.useOffset,
    style = _a.style;
  if (useFractionalSize) {
    var baseSize = parseFloat(horizontal ? style.width : style.height);
    var isBorderBoxSizing = style.boxSizing === "border-box";
    var border = horizontal ? parseFloat(style.borderLeftWidth || "0") + parseFloat(style.borderRightWidth || "0") : parseFloat(style.borderTopWidth || "0") + parseFloat(style.borderBottomWidth || "0");
    if (isBorderBoxSizing) {
      return useOffset ? baseSize : baseSize - border;
    } else {
      var padding = horizontal ? parseFloat(style.paddingLeft || "0") + parseFloat(style.paddingRight || "0") : parseFloat(style.paddingTop || "0") + parseFloat(style.paddingBottom || "0");
      return useOffset ? baseSize + padding + border : baseSize + padding;
    }
  } else {
    var sizeStr = horizontal ? "Width" : "Height";
    return useOffset ? el["offset" + sizeStr] : el["client" + sizeStr];
  }
};
var setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
};

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * Special type of known error that {@link Flicking} throws.
 * @ko Flicking 내부에서 알려진 오류 발생시 throw되는 에러
 * @property {number} code Error code<ko>에러 코드</ko>
 * @property {string} message Error message<ko>에러 메시지</ko>
 * @see {@link ERROR_CODE ERROR_CODE}
 * @example
 * ```ts
 * import Flicking, { FlickingError, ERROR_CODES } from "@egjs/flicking";
 * try {
 *   const flicking = new Flicking(".flicking-viewport")
 * } catch (e) {
 *   if (e instanceof FlickingError && e.code === ERROR_CODES.ELEMENT_NOT_FOUND) {
 *     console.error("Element not found")
 *   }
 * }
 * ```
 */
var FlickingError = /*#__PURE__*/function (_super) {
  flicking_esm_extends(FlickingError, _super);
  /**
   * @param message Error message<ko>에러 메시지</ko>
   * @param code Error code<ko>에러 코드</ko>
   */
  function FlickingError(message, code) {
    var _this = _super.call(this, message) || this;
    setPrototypeOf(_this, FlickingError.prototype);
    _this.name = "FlickingError";
    _this.code = code;
    return _this;
  }
  return FlickingError;
}(Error);

/**
 * A component that manages viewport size
 * @ko 뷰포트 크기 정보를 담당하는 컴포넌트
 */
var Viewport = /*#__PURE__*/function () {
  /**
   * @param el A viewport element<ko>뷰포트 엘리먼트</ko>
   */
  function Viewport(flicking, el) {
    this._flicking = flicking;
    this._el = el;
    this._width = 0;
    this._height = 0;
    this._padding = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this._isBorderBoxSizing = false;
  }
  var __proto = Viewport.prototype;
  Object.defineProperty(__proto, "element", {
    /**
     * A viewport(root) element
     * @ko 뷰포트(root) 엘리먼트
     * @type {HTMLElement}
     * @readonly
     */
    get: function () {
      return this._el;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "width", {
    /**
     * Viewport width, without paddings
     * @ko 뷰포트 너비
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._width - this._padding.left - this._padding.right;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "height", {
    /**
     * Viewport height, without paddings
     * @ko 뷰포트 높이
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._height - this._padding.top - this._padding.bottom;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "padding", {
    /**
     * Viewport paddings
     * @ko 뷰포트 CSS padding 값
     * @type {object}
     * @property {number} left CSS `padding-left`
     * @property {number} right CSS `padding-right`
     * @property {number} top CSS `padding-top`
     * @property {number} bottom CSS `padding-bottom`
     * @readonly
     */
    get: function () {
      return this._padding;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Change viewport's size.
   * This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property
   * @ko 뷰포트 크기를 변경합니다.
   * `.flicking-viewport` 엘리먼트에 해당 크기의 CSS width/height를 적용합니다
   * @param {object} [size] New viewport size<ko>새 뷰포트 크기</ko>
   * @param {number|string} [size.width] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
   * @param {number|string} [size.height] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
   */
  __proto.setSize = function (_a) {
    var width = _a.width,
      height = _a.height;
    var el = this._el;
    var padding = this._padding;
    var isBorderBoxSizing = this._isBorderBoxSizing;
    if (width != null) {
      if (flicking_esm_isString(width)) {
        el.style.width = width;
      } else {
        var newWidth = isBorderBoxSizing ? width + padding.left + padding.right : width;
        el.style.width = newWidth + "px";
      }
    }
    if (height != null) {
      if (flicking_esm_isString(height)) {
        el.style.height = height;
      } else {
        var newHeight = isBorderBoxSizing ? height + padding.top + padding.bottom : height;
        el.style.height = newHeight + "px";
      }
    }
    this.resize();
  };
  /**
   * Update width/height to the current viewport element's size
   * @ko 현재 뷰포트 엘리먼트의 크기로 너비/높이를 업데이트합니다
   */
  __proto.resize = function () {
    var el = this._el;
    var elStyle = getStyle(el);
    var useFractionalSize = this._flicking.useFractionalSize;
    this._width = getElementSize({
      el: el,
      horizontal: true,
      useFractionalSize: useFractionalSize,
      useOffset: false,
      style: elStyle
    });
    this._height = getElementSize({
      el: el,
      horizontal: false,
      useFractionalSize: useFractionalSize,
      useOffset: false,
      style: elStyle
    });
    this._padding = {
      left: elStyle.paddingLeft ? parseFloat(elStyle.paddingLeft) : 0,
      right: elStyle.paddingRight ? parseFloat(elStyle.paddingRight) : 0,
      top: elStyle.paddingTop ? parseFloat(elStyle.paddingTop) : 0,
      bottom: elStyle.paddingBottom ? parseFloat(elStyle.paddingBottom) : 0
    };
    this._isBorderBoxSizing = elStyle.boxSizing === "border-box";
  };
  return Viewport;
}();
var AutoResizer = /*#__PURE__*/function () {
  function AutoResizer(flicking) {
    var _this = this;
    this._onResize = function () {
      var flicking = _this._flicking;
      var resizeDebounce = flicking.resizeDebounce;
      var maxResizeDebounce = flicking.maxResizeDebounce;
      if (resizeDebounce <= 0) {
        void flicking.resize();
      } else {
        if (_this._maxResizeDebounceTimer <= 0) {
          if (maxResizeDebounce > 0 && maxResizeDebounce >= resizeDebounce) {
            _this._maxResizeDebounceTimer = window.setTimeout(_this._doScheduledResize, maxResizeDebounce);
          }
        }
        if (_this._resizeTimer > 0) {
          clearTimeout(_this._resizeTimer);
          _this._resizeTimer = 0;
        }
        _this._resizeTimer = window.setTimeout(_this._doScheduledResize, resizeDebounce);
      }
    };
    this._doScheduledResize = function () {
      clearTimeout(_this._resizeTimer);
      clearTimeout(_this._maxResizeDebounceTimer);
      _this._maxResizeDebounceTimer = -1;
      _this._resizeTimer = -1;
      void _this._flicking.resize();
    };
    // eslint-disable-next-line @typescript-eslint/member-ordering
    this._skipFirstResize = function () {
      var isFirstResize = true;
      return function () {
        if (isFirstResize) {
          isFirstResize = false;
          return;
        }
        _this._onResize();
      };
    }();
    this._flicking = flicking;
    this._enabled = false;
    this._resizeObserver = null;
    this._resizeTimer = -1;
    this._maxResizeDebounceTimer = -1;
  }
  var __proto = AutoResizer.prototype;
  Object.defineProperty(__proto, "enabled", {
    get: function () {
      return this._enabled;
    },
    enumerable: false,
    configurable: true
  });
  __proto.enable = function () {
    var flicking = this._flicking;
    var viewport = flicking.viewport;
    if (this._enabled) {
      this.disable();
    }
    if (flicking.useResizeObserver && !!window.ResizeObserver) {
      var viewportSizeNot0 = viewport.width !== 0 || viewport.height !== 0;
      var resizeObserver = viewportSizeNot0 ? new ResizeObserver(this._skipFirstResize) : new ResizeObserver(this._onResize);
      resizeObserver.observe(flicking.viewport.element);
      this._resizeObserver = resizeObserver;
    } else {
      window.addEventListener("resize", this._onResize);
    }
    this._enabled = true;
    return this;
  };
  __proto.disable = function () {
    if (!this._enabled) return this;
    var resizeObserver = this._resizeObserver;
    if (resizeObserver) {
      resizeObserver.disconnect();
      this._resizeObserver = null;
    } else {
      window.removeEventListener("resize", this._onResize);
    }
    this._enabled = false;
    return this;
  };
  return AutoResizer;
}();

/**
 * @internal
 */
var VanillaElementProvider = /*#__PURE__*/function () {
  function VanillaElementProvider(element) {
    this._element = element;
    this._rendered = true;
  }
  var __proto = VanillaElementProvider.prototype;
  Object.defineProperty(__proto, "element", {
    get: function () {
      return this._element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "rendered", {
    get: function () {
      return this._rendered;
    },
    enumerable: false,
    configurable: true
  });
  __proto.show = function (flicking) {
    var el = this.element;
    var cameraEl = flicking.camera.element;
    if (el.parentElement !== cameraEl) {
      cameraEl.appendChild(el);
      this._rendered = true;
    }
  };
  __proto.hide = function (flicking) {
    var el = this.element;
    var cameraEl = flicking.camera.element;
    if (el.parentElement === cameraEl) {
      cameraEl.removeChild(el);
      this._rendered = false;
    }
  };
  return VanillaElementProvider;
}();

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * @internal
 */
var VirtualElementProvider = /*#__PURE__*/function () {
  function VirtualElementProvider(flicking) {
    this._flicking = flicking;
  }
  var __proto = VirtualElementProvider.prototype;
  Object.defineProperty(__proto, "element", {
    get: function () {
      return this._virtualElement.nativeElement;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "rendered", {
    get: function () {
      return this._virtualElement.visible;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "_virtualElement", {
    get: function () {
      var flicking = this._flicking;
      var elIndex = this._panel.elementIndex;
      var virtualElements = flicking.virtual.elements;
      return virtualElements[elIndex];
    },
    enumerable: false,
    configurable: true
  });
  __proto.init = function (panel) {
    this._panel = panel;
  };
  __proto.show = function () {
    // DO_NOTHING
    // Actual element visibility is controlled by VirtualManager
  };
  __proto.hide = function () {
    // DO_NOTHING
    // Actual element visibility is controlled by VirtualManager
  };
  return VirtualElementProvider;
}();

/**
 * A manager class to add / remove virtual panels
 */
var VirtualManager = /*#__PURE__*/function () {
  function VirtualManager(flicking, options) {
    var _a, _b, _c, _d;
    this._flicking = flicking;
    this._renderPanel = (_a = options === null || options === void 0 ? void 0 : options.renderPanel) !== null && _a !== void 0 ? _a : function () {
      return "";
    };
    this._initialPanelCount = (_b = options === null || options === void 0 ? void 0 : options.initialPanelCount) !== null && _b !== void 0 ? _b : -1;
    this._cache = (_c = options === null || options === void 0 ? void 0 : options.cache) !== null && _c !== void 0 ? _c : false;
    this._panelClass = (_d = options === null || options === void 0 ? void 0 : options.panelClass) !== null && _d !== void 0 ? _d : CLASS.DEFAULT_VIRTUAL;
    this._elements = [];
  }
  var __proto = VirtualManager.prototype;
  Object.defineProperty(__proto, "elements", {
    get: function () {
      return this._elements;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "renderPanel", {
    // Options
    /**
     * A rendering function for the panel element's innerHTML
     * @ko 패널 엘리먼트의 innerHTML을 렌더링하는 함수
     * @type {function}
     * @param {VirtualPanel} panel Instance of the panel<ko>패널 인스턴스</ko>
     * @param {number} index Index of the panel<ko>패널 인덱스</ko>
     * @default "() => {}"
     */
    get: function () {
      return this._renderPanel;
    },
    set: function (val) {
      this._renderPanel = val;
      this._flicking.renderer.panels.forEach(function (panel) {
        return panel.uncacheRenderResult();
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "initialPanelCount", {
    /**
     * Initial panel count to render
     * @ko 최초로 렌더링할 패널의 개수
     * @readonly
     * @type {number}
     * @default -1
     */
    get: function () {
      return this._initialPanelCount;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "cache", {
    /**
     * Whether to cache rendered panel's innerHTML
     * @ko 렌더링된 패널의 innerHTML 정보를 캐시할지 여부
     * @type {boolean}
     * @default false
     */
    get: function () {
      return this._cache;
    },
    set: function (val) {
      this._cache = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panelClass", {
    /**
     * The class name that will be applied to rendered panel elements
     * @ko 렌더링되는 패널 엘리먼트에 적용될 클래스 이름
     * @type {string}
     * @default "flicking-panel"
     */
    get: function () {
      return this._panelClass;
    },
    set: function (val) {
      this._panelClass = val;
    },
    enumerable: false,
    configurable: true
  });
  __proto.init = function () {
    var flicking = this._flicking;
    if (!flicking.virtualEnabled) return;
    if (!flicking.externalRenderer && !flicking.renderExternal) {
      this._initVirtualElements();
    }
    var virtualElements = flicking.camera.children;
    this._elements = virtualElements.map(function (el) {
      return {
        nativeElement: el,
        visible: true
      };
    });
  };
  __proto.show = function (index) {
    var el = this._elements[index];
    var nativeEl = el.nativeElement;
    el.visible = true;
    if (nativeEl.style.display) {
      nativeEl.style.display = "";
    }
  };
  __proto.hide = function (index) {
    var el = this._elements[index];
    var nativeEl = el.nativeElement;
    el.visible = false;
    nativeEl.style.display = "none";
  };
  /**
   * Add new virtual panels at the end of the list
   * @ko 새로운 가상 패널들을 리스트의 끝에 추가합니다
   * @param {number} count The number of panels to add<ko>추가할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The new panels added<ko>새롭게 추가된 패널들</ko>
   */
  __proto.append = function (count) {
    if (count === void 0) {
      count = 1;
    }
    var flicking = this._flicking;
    return this.insert(flicking.panels.length, count);
  };
  /**
   * Add new virtual panels at the start of the list
   * @ko 새로운 가상 패널들을 리스트의 시작에 추가합니다
   * @param {number} count The number of panels to add<ko>추가할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The new panels added<ko>새롭게 추가된 패널들</ko>
   */
  __proto.prepend = function (count) {
    if (count === void 0) {
      count = 1;
    }
    return this.insert(0, count);
  };
  /**
   * Add new virtual panels at the given index
   * @ko 새로운 가상 패널들을 주어진 인덱스에 추가합니다
   * @param {number} count The number of panels to add<ko>추가할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The new panels added<ko>새롭게 추가된 패널들</ko>
   */
  __proto.insert = function (index, count) {
    if (count === void 0) {
      count = 1;
    }
    if (count <= 0) return [];
    var flicking = this._flicking;
    return flicking.renderer.batchInsert({
      index: index,
      elements: range(count),
      hasDOMInElements: false
    });
  };
  /**
   * Remove panels at the given index
   * @ko 주어진 인덱스에서 패널들을 삭제합니다
   * @param {number} count The number of panels to remove<ko>삭제할 패널의 개수</ko>
   * @returns {Array<VirtualPanel>} The panels removed<ko>삭제된 패널들</ko>
   */
  __proto.remove = function (index, count) {
    if (count <= 0) return [];
    var flicking = this._flicking;
    return flicking.renderer.batchRemove({
      index: index,
      deleteCount: count,
      hasDOMInElements: false
    });
  };
  __proto._initVirtualElements = function () {
    var _this = this;
    var flicking = this._flicking;
    var cameraElement = flicking.camera.element;
    var panelsPerView = flicking.panelsPerView;
    var fragment = document.createDocumentFragment();
    var newElements = range(panelsPerView + 1).map(function (idx) {
      var panelEl = document.createElement("div");
      panelEl.className = _this._panelClass;
      panelEl.dataset.elementIndex = idx.toString();
      return panelEl;
    });
    newElements.forEach(function (el) {
      fragment.appendChild(el);
    });
    cameraElement.appendChild(fragment);
  };
  return VirtualManager;
}();

/**
 * All possible @egjs/axes event keys
 * @internal
 */
var EVENT = {
  HOLD: "hold",
  CHANGE: "change",
  RELEASE: "release",
  ANIMATION_END: "animationEnd",
  FINISH: "finish"
};
/**
 * An Axis key that Flicking uses
 * @internal
 */
var POSITION_KEY = "flick";
var STATE_TYPE;
(function (STATE_TYPE) {
  STATE_TYPE[STATE_TYPE["IDLE"] = 0] = "IDLE";
  STATE_TYPE[STATE_TYPE["HOLDING"] = 1] = "HOLDING";
  STATE_TYPE[STATE_TYPE["DRAGGING"] = 2] = "DRAGGING";
  STATE_TYPE[STATE_TYPE["ANIMATING"] = 3] = "ANIMATING";
  STATE_TYPE[STATE_TYPE["DISABLED"] = 4] = "DISABLED";
})(STATE_TYPE || (STATE_TYPE = {}));
/**
 * A component that shows the current status of the user input or the animation
 * @ko 현재 사용자 입력 또는 애니메이션 상태를 나타내는 컴포넌트
 * @internal
 */
var State = /*#__PURE__*/function () {
  function State() {
    this._delta = 0;
    this._targetPanel = null;
  }
  var __proto = State.prototype;
  Object.defineProperty(__proto, "delta", {
    /**
     * A sum of delta values of change events from the last hold event of Axes
     * @ko 이전 hold이벤트부터 change에 의해 발생한 이동 delta값의 합산
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._delta;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "targetPanel", {
    /**
     * A panel to set as {@link Control#activePanel} after the animation is finished
     * @ko 애니메이션 종료시 {@link Control#activePanel}로 설정할 패널
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._targetPanel;
    },
    set: function (val) {
      this._targetPanel = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * An callback which is called when state has changed to this state
   * @ko 현재 상태로 돌입했을때 호출되는 콜백 함수
   * @param {State} prevState An previous state<ko>이전 상태값</ko>
   * @return {void}
   */
  __proto.onEnter = function (prevState) {
    this._delta = prevState._delta;
    this._targetPanel = prevState._targetPanel;
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event of Axes
   * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  __proto.onHold = function (ctx) {
    // DO NOTHING
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event of Axes
   * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  __proto.onChange = function (ctx) {
    // DO NOTHING
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of Axes
   * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  __proto.onRelease = function (ctx) {
    // DO NOTHING
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event of Axes
   * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  __proto.onAnimationEnd = function (ctx) {
    // DO NOTHING
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event of Axes<ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  __proto.onFinish = function (ctx) {
    // DO NOTHING
  };
  __proto._moveToChangedPosition = function (ctx) {
    var flicking = ctx.flicking,
      axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    var delta = axesEvent.delta[POSITION_KEY];
    if (!delta) {
      return;
    }
    this._delta += delta;
    var camera = flicking.camera;
    var prevPosition = camera.position;
    var position = axesEvent.pos[POSITION_KEY];
    var newPosition = flicking.circularEnabled ? circulatePosition(position, camera.range.min, camera.range.max) : position;
    camera.lookAt(newPosition);
    var moveEvent = new ComponentEvent$1(flicking_esm_EVENTS.MOVE, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: flicking_esm_getDirection(0, axesEvent.delta[POSITION_KEY]),
      axesEvent: axesEvent
    });
    flicking.trigger(moveEvent);
    if (moveEvent.isCanceled()) {
      // Return to previous position
      camera.lookAt(prevPosition);
      transitTo(STATE_TYPE.DISABLED);
    }
  };
  return State;
}();

/**
 * A default state when there's no user input and no animation's playing
 * @ko 사용자의 입력이 없고, 애니메이션이 동작하고있지 않은 기본 상태
 * @internal
 */
var IdleState = /*#__PURE__*/function (_super) {
  flicking_esm_extends(IdleState, _super);
  function IdleState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko 현재 사용자가 클릭/터치중인지 여부
     * @type {false}
     * @readonly
     */
    _this.holding = false;
    /**
     * Whether Flicking's animating
     * @ko 현재 애니메이션 동작 여부
     * @type {false}
     * @readonly
     */
    _this.animating = false;
    return _this;
  }
  var __proto = IdleState.prototype;
  __proto.onEnter = function () {
    this._delta = 0;
    this._targetPanel = null;
  };
  __proto.onHold = function (ctx) {
    // Shouldn't do any action until any panels on flicking area
    var flicking = ctx.flicking,
      axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    if (flicking.renderer.panelCount <= 0) {
      transitTo(STATE_TYPE.DISABLED);
      return;
    }
    var holdStartEvent = new ComponentEvent$1(flicking_esm_EVENTS.HOLD_START, {
      axesEvent: axesEvent
    });
    flicking.trigger(holdStartEvent);
    if (holdStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      transitTo(STATE_TYPE.HOLDING);
    }
  };
  // By methods call
  __proto.onChange = function (ctx) {
    var flicking = ctx.flicking,
      axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    var controller = flicking.control.controller;
    var animatingContext = controller.animatingContext;
    var moveStartEvent = new ComponentEvent$1(flicking_esm_EVENTS.MOVE_START, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: flicking_esm_getDirection(animatingContext.start, animatingContext.end),
      axesEvent: axesEvent
    });
    flicking.trigger(moveStartEvent);
    if (moveStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      // Trigger AnimatingState's onChange, to trigger "move" event immediately
      transitTo(STATE_TYPE.ANIMATING).onChange(ctx);
    }
  };
  return IdleState;
}(State);

/**
 * A state that activates when user's holding the Flicking area, but not moved a single pixel yet
 * @ko 사용자의 입력이 시작되었으나, 아직 움직이지는 않은 상태
 * @internal
 */
var HoldingState = /*#__PURE__*/function (_super) {
  flicking_esm_extends(HoldingState, _super);
  function HoldingState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko 현재 사용자가 클릭/터치중인지 여부
     * @type {true}
     * @readonly
     */
    _this.holding = true;
    /**
     * Whether Flicking's animating
     * @ko 현재 애니메이션 동작 여부
     * @type {false}
     * @readonly
     */
    _this.animating = false;
    _this._releaseEvent = null;
    return _this;
  }
  var __proto = HoldingState.prototype;
  __proto.onChange = function (ctx) {
    var flicking = ctx.flicking,
      axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    var inputEvent = axesEvent.inputEvent;
    var offset = flicking.horizontal ? inputEvent.offsetX : inputEvent.offsetY;
    var moveStartEvent = new ComponentEvent$1(flicking_esm_EVENTS.MOVE_START, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: flicking_esm_getDirection(0, -offset),
      axesEvent: axesEvent
    });
    flicking.trigger(moveStartEvent);
    if (moveStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      // Trigger DraggingState's onChange, to trigger "move" event immediately
      transitTo(STATE_TYPE.DRAGGING).onChange(ctx);
    }
  };
  __proto.onRelease = function (ctx) {
    var flicking = ctx.flicking,
      axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.HOLD_END, {
      axesEvent: axesEvent
    }));
    if (axesEvent.delta.flick !== 0) {
      // Sometimes "release" event on axes triggered before "change" event
      // Especially if user flicked panel fast in really short amount of time
      // if delta is not zero, that means above case happened.
      // Event flow should be HOLD_START -> MOVE_START -> MOVE -> HOLD_END
      // At least one move event should be included between holdStart and holdEnd
      axesEvent.setTo({
        flick: flicking.camera.position
      }, 0);
      transitTo(STATE_TYPE.IDLE);
      return;
    }
    // Can't handle select event here,
    // As "finish" axes event happens
    this._releaseEvent = axesEvent;
  };
  __proto.onFinish = function (ctx) {
    var e_1, _a;
    var flicking = ctx.flicking,
      transitTo = ctx.transitTo;
    // Should transite to IDLE state before select event
    // As user expects hold is already finished
    transitTo(STATE_TYPE.IDLE);
    if (!this._releaseEvent) {
      return;
    }
    // Handle release event here
    // To prevent finish event called twice
    var releaseEvent = this._releaseEvent;
    // Static click
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    var srcEvent = releaseEvent.inputEvent.srcEvent;
    var clickedElement;
    if (srcEvent.type === "touchend") {
      var touchEvent = srcEvent;
      var touch = touchEvent.changedTouches[0];
      clickedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    } else {
      clickedElement = srcEvent.target;
    }
    /* eslint-enable */
    var panels = flicking.renderer.panels;
    var clickedPanel = null;
    try {
      for (var panels_1 = flicking_esm_values(panels), panels_1_1 = panels_1.next(); !panels_1_1.done; panels_1_1 = panels_1.next()) {
        var panel = panels_1_1.value;
        if (panel.contains(clickedElement)) {
          clickedPanel = panel;
          break;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (panels_1_1 && !panels_1_1.done && (_a = panels_1.return)) _a.call(panels_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    if (clickedPanel) {
      var cameraPosition = flicking.camera.position;
      var clickedPanelPosition = clickedPanel.position;
      flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.SELECT, {
        index: clickedPanel.index,
        panel: clickedPanel,
        // Direction to the clicked panel
        direction: flicking_esm_getDirection(cameraPosition, clickedPanelPosition)
      }));
    }
  };
  return HoldingState;
}(State);

/**
 * A state that activates when user's dragging the Flicking area
 * @ko 사용자가 드래깅중인 상태
 * @internal
 */
var DraggingState = /*#__PURE__*/function (_super) {
  flicking_esm_extends(DraggingState, _super);
  function DraggingState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko 현재 사용자가 클릭/터치중인지 여부
     * @type {true}
     * @readonly
     */
    _this.holding = true;
    /**
     * Whether Flicking's animating
     * @ko 현재 애니메이션 동작 여부
     * @type {true}
     * @readonly
     */
    _this.animating = true;
    return _this;
  }
  var __proto = DraggingState.prototype;
  __proto.onChange = function (ctx) {
    this._moveToChangedPosition(ctx);
  };
  __proto.onRelease = function (ctx) {
    var _a;
    var flicking = ctx.flicking,
      axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    // Update last position to cope with Axes's animating behavior
    // Axes uses start position when animation start
    flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.HOLD_END, {
      axesEvent: axesEvent
    }));
    if (flicking.renderer.panelCount <= 0) {
      // There're no panels
      transitTo(STATE_TYPE.IDLE);
      return;
    }
    transitTo(STATE_TYPE.ANIMATING);
    var control = flicking.control;
    var position = axesEvent.destPos[POSITION_KEY];
    var duration = Math.max(axesEvent.duration, flicking.duration);
    try {
      void control.moveToPosition(position, duration, axesEvent);
    } catch (err) {
      transitTo(STATE_TYPE.IDLE);
      axesEvent.setTo((_a = {}, _a[POSITION_KEY] = flicking.camera.position, _a), 0);
    }
  };
  return DraggingState;
}(State);

/**
 * A state that activates when Flicking's animating by user input or method call
 * @ko 사용자 입력이나 메소드 호출에 의해 Flicking의 애니메이션이 동작중인 상태
 * @internal
 */
var AnimatingState = /*#__PURE__*/function (_super) {
  flicking_esm_extends(AnimatingState, _super);
  function AnimatingState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko 현재 사용자가 클릭/터치중인지 여부
     * @type {false}
     * @readonly
     */
    _this.holding = false;
    /**
     * Whether Flicking's animating
     * @ko 현재 애니메이션 동작 여부
     * @type {true}
     * @readonly
     */
    _this.animating = true;
    return _this;
  }
  var __proto = AnimatingState.prototype;
  __proto.onHold = function (ctx) {
    var flicking = ctx.flicking,
      axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    var targetPanel = this._targetPanel;
    var control = flicking.control;
    this._delta = 0;
    flicking.control.updateInput();
    if (flicking.changeOnHold && targetPanel) {
      control.setActive(targetPanel, control.activePanel, axesEvent.isTrusted);
    }
    var holdStartEvent = new ComponentEvent$1(flicking_esm_EVENTS.HOLD_START, {
      axesEvent: axesEvent
    });
    flicking.trigger(holdStartEvent);
    if (holdStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      transitTo(STATE_TYPE.DRAGGING);
    }
  };
  __proto.onChange = function (ctx) {
    this._moveToChangedPosition(ctx);
  };
  __proto.onFinish = function (ctx) {
    var flicking = ctx.flicking,
      axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    var control = flicking.control;
    var controller = control.controller;
    var animatingContext = controller.animatingContext;
    transitTo(STATE_TYPE.IDLE);
    flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.MOVE_END, {
      isTrusted: axesEvent.isTrusted,
      direction: flicking_esm_getDirection(animatingContext.start, animatingContext.end),
      axesEvent: axesEvent
    }));
    var targetPanel = this._targetPanel;
    if (targetPanel) {
      control.setActive(targetPanel, control.activePanel, axesEvent.isTrusted);
    }
  };
  return AnimatingState;
}(State);

/**
 * A state that activates when Flicking is stopped by event's `stop` method
 * @ko 이벤트의 `stop`호출에 의해 Flicking이 정지된 상태
 * @internal
 */
var DisabledState = /*#__PURE__*/function (_super) {
  flicking_esm_extends(DisabledState, _super);
  function DisabledState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko 현재 사용자가 클릭/터치중인지 여부
     * @type {false}
     * @readonly
     */
    _this.holding = false;
    /**
     * Whether Flicking's animating
     * @ko 현재 애니메이션 동작 여부
     * @type {true}
     * @readonly
     */
    _this.animating = true;
    return _this;
  }
  var __proto = DisabledState.prototype;
  __proto.onAnimationEnd = function (ctx) {
    var transitTo = ctx.transitTo;
    transitTo(STATE_TYPE.IDLE);
  };
  __proto.onChange = function (ctx) {
    var axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    // Can stop Axes's change event
    axesEvent.stop();
    transitTo(STATE_TYPE.IDLE);
  };
  __proto.onRelease = function (ctx) {
    var axesEvent = ctx.axesEvent,
      transitTo = ctx.transitTo;
    // This is needed when stopped hold start event
    if (axesEvent.delta.flick === 0) {
      transitTo(STATE_TYPE.IDLE);
    }
  };
  return DisabledState;
}(State);

/**
 * @internal
 */
var StateMachine = /*#__PURE__*/function () {
  function StateMachine() {
    var _this = this;
    this.transitTo = function (nextStateType) {
      var nextState;
      switch (nextStateType) {
        case STATE_TYPE.IDLE:
          nextState = new IdleState();
          break;
        case STATE_TYPE.HOLDING:
          nextState = new HoldingState();
          break;
        case STATE_TYPE.DRAGGING:
          nextState = new DraggingState();
          break;
        case STATE_TYPE.ANIMATING:
          nextState = new AnimatingState();
          break;
        case STATE_TYPE.DISABLED:
          nextState = new DisabledState();
          break;
      }
      nextState.onEnter(_this._state);
      _this._state = nextState;
      return _this._state;
    };
    this._state = new IdleState();
  }
  var __proto = StateMachine.prototype;
  Object.defineProperty(__proto, "state", {
    get: function () {
      return this._state;
    },
    enumerable: false,
    configurable: true
  });
  __proto.fire = function (eventType, externalCtx) {
    var currentState = this._state;
    var ctx = flicking_esm_assign(flicking_esm_assign({}, externalCtx), {
      transitTo: this.transitTo
    });
    switch (eventType) {
      case EVENT.HOLD:
        currentState.onHold(ctx);
        break;
      case EVENT.CHANGE:
        currentState.onChange(ctx);
        break;
      case EVENT.RELEASE:
        currentState.onRelease(ctx);
        break;
      case EVENT.ANIMATION_END:
        currentState.onAnimationEnd(ctx);
        break;
      case EVENT.FINISH:
        currentState.onFinish(ctx);
        break;
    }
  };
  return StateMachine;
}();

/**
 * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
 * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 이벤트를 처리하는 컨트롤러 컴포넌트
 * @internal
 */
var AxesController = /*#__PURE__*/function () {
  /** */
  function AxesController() {
    var _this = this;
    this._onAxesHold = function () {
      _this._dragged = false;
    };
    this._onAxesChange = function () {
      var _a;
      _this._dragged = !!((_a = _this._panInput) === null || _a === void 0 ? void 0 : _a.isEnabled());
    };
    this._preventClickWhenDragged = function (e) {
      if (_this._dragged) {
        e.preventDefault();
        e.stopPropagation();
      }
      _this._dragged = false;
    };
    this._resetInternalValues();
    this._stateMachine = new StateMachine();
  }
  var __proto = AxesController.prototype;
  Object.defineProperty(__proto, "axes", {
    /**
     * An {@link https://naver.github.io/egjs-axes/docs/api/Axes Axes} instance
     * @ko {@link https://naver.github.io/egjs-axes/docs/api/Axes Axes}의 인스턴스
     * @type {Axes | null}
     * @see https://naver.github.io/egjs-axes/docs/api/Axes
     * @readonly
     */
    get: function () {
      return this._axes;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panInput", {
    /**
     * An {@link https://naver.github.io/egjs-axes/docs/api/PanInput PanInput} instance
     * @ko {@link https://naver.github.io/egjs-axes/docs/api/PanInput PanInput}의 인스턴스
     * @type {PanInput | null}
     * @see https://naver.github.io/egjs-axes/docs/api/PanInput
     * @readonly
     */
    get: function () {
      return this._panInput;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "stateMachine", {
    /**
     * @internal
     */
    get: function () {
      return this._stateMachine;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "state", {
    /**
     * A activated {@link State} that shows the current status of the user input or the animation
     * @ko 현재 활성화된 {@link State} 인스턴스로 사용자 입력 또는 애니메이션 상태를 나타냅니다
     * @type {State}
     */
    get: function () {
      return this._stateMachine.state;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "animatingContext", {
    /**
     * A context of the current animation playing
     * @ko 현재 재생중인 애니메이션 정보
     * @type {object}
     * @property {number} start A start position of the animation<ko>애니메이션 시작 지점</ko>
     * @property {number} end A end position of the animation<ko>애니메이션 끝 지점</ko>
     * @property {number} offset camera offset<ko>카메라 오프셋</ko>
     * @readonly
     */
    get: function () {
      return this._animatingContext;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "controlParams", {
    /**
     * A current control parameters of the Axes instance
     * @ko 활성화된 현재 Axes 패러미터들
     * @type {ControlParams}
     */
    get: function () {
      var axes = this._axes;
      if (!axes) {
        return {
          range: {
            min: 0,
            max: 0
          },
          position: 0,
          circular: false
        };
      }
      var axis = axes.axis[POSITION_KEY];
      return {
        range: {
          min: axis.range[0],
          max: axis.range[1]
        },
        circular: axis.circular[0],
        position: this.position
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "enabled", {
    /**
     * A Boolean indicating whether the user input is enabled
     * @ko 현재 사용자 입력이 활성화되었는지를 나타내는 값
     * @type {boolean}
     * @readonly
     */
    get: function () {
      var _a, _b;
      return (_b = (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.isEnabled()) !== null && _b !== void 0 ? _b : false;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "position", {
    /**
     * Current position value in {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
     * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} 인스턴스 내부의 현재 좌표 값
     * @type {number}
     * @readonly
     */
    get: function () {
      var _a, _b;
      return (_b = (_a = this._axes) === null || _a === void 0 ? void 0 : _a.get([POSITION_KEY])[POSITION_KEY]) !== null && _b !== void 0 ? _b : 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "range", {
    /**
     * Current range value in {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
     * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} 인스턴스 내부의 현재 이동 범위 값
     * @type {number[]}
     * @readonly
     */
    get: function () {
      var _a, _b;
      return (_b = (_a = this._axes) === null || _a === void 0 ? void 0 : _a.axis[POSITION_KEY].range) !== null && _b !== void 0 ? _b : [0, 0];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "bounce", {
    /**
     * Actual bounce size(px)
     * @ko 적용된 bounce 크기(px 단위)
     * @type {number[]}
     * @readonly
     */
    get: function () {
      var _a;
      return (_a = this._axes) === null || _a === void 0 ? void 0 : _a.axis[POSITION_KEY].bounce;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize AxesController
   * @ko AxesController를 초기화합니다
   * @param {Flicking} flicking An instance of Flicking
   * @chainable
   * @return {this}
   */
  __proto.init = function (flicking) {
    var _a;
    var _this = this;
    this._flicking = flicking;
    this._axes = new axes_esm((_a = {}, _a[POSITION_KEY] = {
      range: [0, 0],
      circular: false,
      bounce: [0, 0]
    }, _a), {
      deceleration: flicking.deceleration,
      interruptable: flicking.interruptable,
      nested: flicking.nested,
      easing: flicking.easing
    });
    this._panInput = new PanInput(flicking.viewport.element, {
      inputType: flicking.inputType,
      threshold: 1,
      iOSEdgeSwipeThreshold: flicking.iOSEdgeSwipeThreshold,
      scale: flicking.horizontal ? [-1, 0] : [0, -1],
      releaseOnScroll: true
    });
    var axes = this._axes;
    axes.connect(flicking.horizontal ? [POSITION_KEY, ""] : ["", POSITION_KEY], this._panInput);
    var _loop_1 = function (key) {
      var eventType = EVENT[key];
      axes.on(eventType, function (e) {
        _this._stateMachine.fire(eventType, {
          flicking: flicking,
          axesEvent: e
        });
      });
    };
    for (var key in EVENT) {
      _loop_1(key);
    }
    return this;
  };
  /**
   * Destroy AxesController and return to initial state
   * @ko AxesController를 초기 상태로 되돌립니다
   * @return {void}
   */
  __proto.destroy = function () {
    var _a;
    if (this._axes) {
      this.removePreventClickHandler();
      this._axes.destroy();
    }
    (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.destroy();
    this._resetInternalValues();
  };
  /**
   * Enable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 활성화합니다
   * @chainable
   * @return {this}
   */
  __proto.enable = function () {
    var _a;
    (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.enable();
    return this;
  };
  /**
   * Disable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 막습니다
   * @chainable
   * @return {this}
   */
  __proto.disable = function () {
    var _a;
    (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.disable();
    return this;
  };
  /**
   * Releases ongoing user input (mouse/touch)
   * @ko 사용자의 현재 입력(마우스/터치)를 중단시킵니다
   * @chainable
   * @return {this}
   */
  __proto.release = function () {
    var _a;
    (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.release();
    return this;
  };
  /**
   * Change the destination and duration of the animation currently playing
   * @ko 재생 중인 애니메이션의 목적지와 재생 시간을 변경합니다
   * @param {number} position A position to move<ko>이동할 좌표</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @chainable
   * @return {this}
   */
  __proto.updateAnimation = function (position, duration) {
    var _a;
    var _b;
    this._animatingContext = flicking_esm_assign(flicking_esm_assign({}, this._animatingContext), {
      end: position
    });
    (_b = this._axes) === null || _b === void 0 ? void 0 : _b.updateAnimation({
      destPos: (_a = {}, _a[POSITION_KEY] = position, _a),
      duration: duration
    });
    return this;
  };
  /**
   * Stops the animation currently playing
   * @ko 재생 중인 애니메이션을 중단시킵니다
   * @chainable
   * @return {this}
   */
  __proto.stopAnimation = function () {
    var _a;
    (_a = this._axes) === null || _a === void 0 ? void 0 : _a.stopAnimation();
    return this;
  };
  /**
   * Update {@link https://naver.github.io/egjs-axes/ @egjs/axes}'s state
   * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 상태를 갱신합니다
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link AxesController#init init} is not called before
   * <ko>{@link AxesController#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
  __proto.update = function (controlParams) {
    var _a;
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var axes = this._axes;
    var axis = axes.axis[POSITION_KEY];
    axis.circular = [controlParams.circular, controlParams.circular];
    axis.range = [controlParams.range.min, controlParams.range.max];
    axis.bounce = parseBounce(flicking.bounce, camera.size);
    axes.axisManager.set((_a = {}, _a[POSITION_KEY] = controlParams.position, _a));
    return this;
  };
  /**
   * Attach a handler to the camera element to prevent click events during animation
   * @ko 카메라 엘리먼트에 애니메이션 도중에 클릭 이벤트를 방지하는 핸들러를 부착합니다
   * @return {this}
   */
  __proto.addPreventClickHandler = function () {
    var flicking = getFlickingAttached(this._flicking);
    var axes = this._axes;
    var cameraEl = flicking.camera.element;
    axes.on(EVENT.HOLD, this._onAxesHold);
    axes.on(EVENT.CHANGE, this._onAxesChange);
    cameraEl.addEventListener("click", this._preventClickWhenDragged, true);
    return this;
  };
  /**
   * Detach a handler to the camera element to prevent click events during animation
   * @ko 카메라 엘리먼트에 애니메이션 도중에 클릭 이벤트를 방지하는 핸들러를 탈착합니다
   * @return {this}
   */
  __proto.removePreventClickHandler = function () {
    var flicking = getFlickingAttached(this._flicking);
    var axes = this._axes;
    var cameraEl = flicking.camera.element;
    axes.off(EVENT.HOLD, this._onAxesHold);
    axes.off(EVENT.CHANGE, this._onAxesChange);
    cameraEl.removeEventListener("click", this._preventClickWhenDragged, true);
    return this;
  };
  /**
   * Run Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} using the given position
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} 메소드를 주어진 좌표를 이용하여 수행합니다
   * @param {number} position A position to move<ko>이동할 좌표</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @param {number} [axesEvent] If provided, it'll use its {@link https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#setTo setTo} method instead<ko>이 값이 주어졌을 경우, 해당 이벤트의 {@link https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#setTo setTo} 메소드를 대신해서 사용합니다.</ko>
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
   */
  __proto.animateTo = function (position, duration, axesEvent) {
    var _this = this;
    var _a;
    var axes = this._axes;
    var state = this._stateMachine.state;
    if (!axes) {
      return Promise.reject(new FlickingError(MESSAGE.NOT_ATTACHED_TO_FLICKING, CODE.NOT_ATTACHED_TO_FLICKING));
    }
    var startPos = axes.get([POSITION_KEY])[POSITION_KEY];
    if (startPos === position) {
      var flicking = getFlickingAttached(this._flicking);
      flicking.camera.lookAt(position);
      if (state.targetPanel) {
        flicking.control.setActive(state.targetPanel, flicking.control.activePanel, (_a = axesEvent === null || axesEvent === void 0 ? void 0 : axesEvent.isTrusted) !== null && _a !== void 0 ? _a : false);
      }
      return Promise.resolve();
    }
    this._animatingContext = {
      start: startPos,
      end: position,
      offset: 0
    };
    var animate = function () {
      var _a, _b;
      var resetContext = function () {
        _this._animatingContext = {
          start: 0,
          end: 0,
          offset: 0
        };
      };
      axes.once(EVENT.FINISH, resetContext);
      if (axesEvent) {
        axesEvent.setTo((_a = {}, _a[POSITION_KEY] = position, _a), duration);
      } else {
        axes.setTo((_b = {}, _b[POSITION_KEY] = position, _b), duration);
      }
    };
    return new Promise(function (resolve, reject) {
      var animationFinishHandler = function () {
        axes.off(EVENT.HOLD, interruptionHandler);
        resolve();
      };
      var interruptionHandler = function () {
        axes.off(EVENT.FINISH, animationFinishHandler);
        reject(new FlickingError(MESSAGE.ANIMATION_INTERRUPTED, CODE.ANIMATION_INTERRUPTED));
      };
      axes.once(EVENT.FINISH, animationFinishHandler);
      axes.once(EVENT.HOLD, interruptionHandler);
      animate();
    });
  };
  __proto.updateDirection = function () {
    var flicking = getFlickingAttached(this._flicking);
    var axes = this._axes;
    var panInput = this._panInput;
    axes.disconnect(panInput);
    axes.connect(flicking.horizontal ? [POSITION_KEY, ""] : ["", POSITION_KEY], panInput);
    panInput.options.scale = flicking.horizontal ? [-1, 0] : [0, -1];
  };
  __proto._resetInternalValues = function () {
    this._flicking = null;
    this._axes = null;
    this._panInput = null;
    this._animatingContext = {
      start: 0,
      end: 0,
      offset: 0
    };
    this._dragged = false;
  };
  return AxesController;
}();

/**
 * A component that manages inputs and animation of Flicking
 * @ko Flicking의 입력 장치 & 애니메이션을 담당하는 컴포넌트
 */
var Control = /*#__PURE__*/function () {
  /** */
  function Control() {
    this._flicking = null;
    this._controller = new AxesController();
    this._activePanel = null;
  }
  var __proto = Control.prototype;
  Object.defineProperty(__proto, "controller", {
    /**
     * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
     * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 이벤트를 처리하는 컨트롤러 컴포넌트
     * @type {AxesController}
     * @readonly
     */
    get: function () {
      return this._controller;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "activeIndex", {
    /**
     * Index number of the {@link Flicking#currentPanel currentPanel}
     * @ko {@link Flicking#currentPanel currentPanel}의 인덱스 번호
     * @type {number}
     * @default 0
     * @readonly
     */
    get: function () {
      var _a, _b;
      return (_b = (_a = this._activePanel) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : -1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "activePanel", {
    /**
     * An active panel
     * @ko 현재 선택된 패널
     * @type {Panel | null}
     * @readonly
     */
    get: function () {
      return this._activePanel;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "animating", {
    /**
     * Whether Flicking's animating
     * @ko 현재 애니메이션 동작 여부
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._controller.state.animating;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "holding", {
    /**
     * Whether user is clicking or touching
     * @ko 현재 사용자가 클릭/터치중인지 여부
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._controller.state.holding;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize Control
   * @ko Control을 초기화합니다
   * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
   * @chainable
   * @return {this}
   */
  __proto.init = function (flicking) {
    this._flicking = flicking;
    this._controller.init(flicking);
    return this;
  };
  /**
   * Destroy Control and return to initial state
   * @ko Control을 초기 상태로 되돌립니다
   * @return {void}
   */
  __proto.destroy = function () {
    this._controller.destroy();
    this._flicking = null;
    this._activePanel = null;
  };
  /**
   * Enable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 활성화합니다
   * @chainable
   * @return {this}
   */
  __proto.enable = function () {
    this._controller.enable();
    return this;
  };
  /**
   * Disable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 막습니다
   * @chainable
   * @return {this}
   */
  __proto.disable = function () {
    this._controller.disable();
    return this;
  };
  /**
   * Releases ongoing user input (mouse/touch)
   * @ko 사용자의 현재 입력(마우스/터치)를 중단시킵니다
   * @chainable
   * @return {this}
   */
  __proto.release = function () {
    this._controller.release();
    return this;
  };
  /**
   * Change the destination and duration of the animation currently playing
   * @ko 재생 중인 애니메이션의 목적지와 재생 시간을 변경합니다
   * @param {Panel} panel The target panel to move<ko>이동할 패널</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @param {DIRECTION} direction Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE POSITION_NOT_REACHABLE} When the given panel is already removed or not in the Camera's {@link Camera#range range}
   * <ko>{@link ERROR_CODE POSITION_NOT_REACHABLE} 주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우</ko>
   * @return {this}
   */
  __proto.updateAnimation = function (panel, duration, direction) {
    var state = this._controller.state;
    var position = this._getPosition(panel, direction !== null && direction !== void 0 ? direction : DIRECTION.NONE);
    state.targetPanel = panel;
    this._controller.updateAnimation(position, duration);
    return this;
  };
  /**
   * Stops the animation currently playing
   * @ko 재생 중인 애니메이션을 중단시킵니다
   * @chainable
   * @return {this}
   */
  __proto.stopAnimation = function () {
    var state = this._controller.state;
    state.targetPanel = null;
    this._controller.stopAnimation();
    return this;
  };
  /**
   * Update position after resizing
   * @ko resize 이후에 position을 업데이트합니다
   * @param {number} progressInPanel Previous camera's progress in active panel before resize<ko>Resize 이전 현재 선택된 패널 내에서의 카메라 progress 값</ko>
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @chainable
   * @return {Promise<void>}
   */
  __proto.updatePosition = function (progressInPanel) {
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var activePanel = this._activePanel;
    if (activePanel) {
      camera.lookAt(camera.clampToReachablePosition(activePanel.position));
    }
  };
  /**
   * Update {@link Control#controller controller}'s state
   * @ko {@link Control#controller controller}의 내부 상태를 갱신합니다
   * @chainable
   * @return {this}
   */
  __proto.updateInput = function () {
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    this._controller.update(camera.controlParams);
    return this;
  };
  /**
   * Reset {@link Control#activePanel activePanel} to `null`
   * @ko {@link Control#activePanel activePanel}을 `null`로 초기화합니다
   * @chainable
   * @return {this}
   */
  __proto.resetActive = function () {
    this._activePanel = null;
    return this;
  };
  /**
   * Move {@link Camera} to the given panel
   * @ko {@link Camera}를 해당 패널 위로 이동합니다
   * @param {Panel} panel The target panel to move<ko>이동할 패널</ko>
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
   * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
   * @param {DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>
   */
  __proto.moveToPanel = function (panel, _a) {
    var duration = _a.duration,
      _b = _a.direction,
      direction = _b === void 0 ? DIRECTION.NONE : _b,
      axesEvent = _a.axesEvent;
    return __awaiter(this, void 0, void 0, function () {
      var position;
      return __generator(this, function (_c) {
        position = this._getPosition(panel, direction);
        this._triggerIndexChangeEvent(panel, panel.position, axesEvent);
        return [2 /*return*/, this._animateToPosition({
          position: position,
          duration: duration,
          newActivePanel: panel,
          axesEvent: axesEvent
        })];
      });
    });
  };
  /**
   * @internal
   */
  __proto.setActive = function (newActivePanel, prevActivePanel, isTrusted) {
    var _a;
    var flicking = getFlickingAttached(this._flicking);
    this._activePanel = newActivePanel;
    flicking.camera.updateAdaptiveHeight();
    if (newActivePanel !== prevActivePanel) {
      flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.CHANGED, {
        index: newActivePanel.index,
        panel: newActivePanel,
        prevIndex: (_a = prevActivePanel === null || prevActivePanel === void 0 ? void 0 : prevActivePanel.index) !== null && _a !== void 0 ? _a : -1,
        prevPanel: prevActivePanel,
        isTrusted: isTrusted,
        direction: prevActivePanel ? flicking_esm_getDirection(prevActivePanel.position, newActivePanel.position) : DIRECTION.NONE
      }));
    } else {
      flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.RESTORED, {
        isTrusted: isTrusted
      }));
    }
  };
  /**
   * @internal
   */
  __proto.copy = function (control) {
    this._flicking = control._flicking;
    this._activePanel = control._activePanel;
    this._controller = control._controller;
  };
  __proto._triggerIndexChangeEvent = function (panel, position, axesEvent) {
    var _a;
    var flicking = getFlickingAttached(this._flicking);
    var triggeringEvent = panel !== this._activePanel ? flicking_esm_EVENTS.WILL_CHANGE : flicking_esm_EVENTS.WILL_RESTORE;
    var camera = flicking.camera;
    var activePanel = this._activePanel;
    var event = new ComponentEvent$1(triggeringEvent, {
      index: panel.index,
      panel: panel,
      isTrusted: (axesEvent === null || axesEvent === void 0 ? void 0 : axesEvent.isTrusted) || false,
      direction: flicking_esm_getDirection((_a = activePanel === null || activePanel === void 0 ? void 0 : activePanel.position) !== null && _a !== void 0 ? _a : camera.position, position)
    });
    flicking.trigger(event);
    if (event.isCanceled()) {
      throw new FlickingError(MESSAGE.STOP_CALLED_BY_USER, CODE.STOP_CALLED_BY_USER);
    }
  };
  __proto._animateToPosition = function (_a) {
    var position = _a.position,
      duration = _a.duration,
      newActivePanel = _a.newActivePanel,
      axesEvent = _a.axesEvent;
    return __awaiter(this, void 0, void 0, function () {
      var flicking, animate, state;
      var _this = this;
      return __generator(this, function (_b) {
        flicking = getFlickingAttached(this._flicking);
        animate = function () {
          return _this._controller.animateTo(position, duration, axesEvent);
        };
        state = this._controller.state;
        state.targetPanel = newActivePanel;
        if (duration <= 0) {
          return [2 /*return*/, animate()];
        } else {
          return [2 /*return*/, animate().then(function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/, flicking.renderer.render()];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          }).catch(function (err) {
            if (axesEvent && err instanceof FlickingError && err.code === CODE.ANIMATION_INTERRUPTED) return;
            throw err;
          })];
        }
      });
    });
  };
  __proto._getPosition = function (panel, direction) {
    if (direction === void 0) {
      direction = DIRECTION.NONE;
    }
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var position = panel.position;
    var nearestAnchor = camera.findNearestAnchor(position);
    if (panel.removed || !nearestAnchor) {
      throw new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(panel.position), CODE.POSITION_NOT_REACHABLE);
    }
    if (!camera.canReach(panel)) {
      // Override position & panel if that panel is not reachable
      position = nearestAnchor.position;
      panel = nearestAnchor.panel;
    } else if (flicking.circularEnabled) {
      // Circular mode is enabled, find nearest distance to panel
      var camPos_1 = this._controller.position; // Actual position of the Axes
      var camRangeDiff = camera.rangeDiff;
      var possiblePositions = [position, position + camRangeDiff, position - camRangeDiff].filter(function (pos) {
        if (direction === DIRECTION.NONE) return true;
        return direction === DIRECTION.PREV ? pos <= camPos_1 : pos >= camPos_1;
      });
      position = possiblePositions.reduce(function (nearestPosition, pos) {
        if (Math.abs(camPos_1 - pos) < Math.abs(camPos_1 - nearestPosition)) {
          return pos;
        } else {
          return nearestPosition;
        }
      }, Infinity);
    }
    return position;
  };
  return Control;
}();

/**
 * A data component that has actual position where the camera should be stopped at
 * @ko 카메라가 정지해야하는 실제 위치를 담고 있는 데이터 컴포넌트
 */
var AnchorPoint = /*#__PURE__*/function () {
  /**
   * @param {object} options An options object<ko>옵션 객체</ko>
   * @param {number} [options.index] Index of AnchorPoint<ko>AnchorPoint의 인덱스</ko>
   * @param {number} [options.position] Position of AnchorPoint<ko>AnchorPoint의 좌표</ko>
   * @param {Panel} [options.panel] A {@link Panel} instance AnchorPoint is referencing to<ko>AnchorPoint가 참조하고 있는 {@link Panel}</ko>
   */
  function AnchorPoint(_a) {
    var index = _a.index,
      position = _a.position,
      panel = _a.panel;
    this._index = index;
    this._pos = position;
    this._panel = panel;
  }
  var __proto = AnchorPoint.prototype;
  Object.defineProperty(__proto, "index", {
    /**
     * Index of AnchorPoint
     * @ko AnchorPoint의 인덱스
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._index;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "position", {
    /**
     * Position of AnchorPoint
     * @ko AnchorPoint의 좌표
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._pos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panel", {
    /**
     * A {@link Panel} instance AnchorPoint is referencing to
     * @ko AnchorPoint가 참조하고 있는 {@link Panel}
     * @type {Panel}
     * @readonly
     */
    get: function () {
      return this._panel;
    },
    enumerable: false,
    configurable: true
  });
  return AnchorPoint;
}();

/**
 * A {@link Control} that uses a release momentum to choose destination panel
 * @ko 입력을 중단한 시점의 가속도에 영향받아 도달할 패널을 계산하는 이동 방식을 사용하는 {@link Control}
 */
var SnapControl = /*#__PURE__*/function (_super) {
  flicking_esm_extends(SnapControl, _super);
  /** */
  function SnapControl(_a) {
    var _b = (_a === void 0 ? {} : _a).count,
      count = _b === void 0 ? Infinity : _b;
    var _this = _super.call(this) || this;
    _this._count = count;
    return _this;
  }
  var __proto = SnapControl.prototype;
  Object.defineProperty(__proto, "count", {
    /**
     * Maximum number of panels can go after release
     * @ko 입력 중단 이후 통과하여 이동할 수 있는 패널의 최대 갯수
     * @type {number}
     * @default Infinity
     */
    get: function () {
      return this._count;
    },
    set: function (val) {
      this._count = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Move {@link Camera} to the given position
   * @ko {@link Camera}를 주어진 좌표로 이동합니다
   * @param {number} position The target position to move<ko>이동할 좌표</ko>
   * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
   * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
   * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
   */
  __proto.moveToPosition = function (position, duration, axesEvent) {
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var activeAnchor = camera.findActiveAnchor();
    var anchorAtCamera = camera.findNearestAnchor(camera.position);
    var state = this._controller.state;
    if (!activeAnchor || !anchorAtCamera) {
      return Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE));
    }
    var snapThreshold = this._calcSnapThreshold(position, activeAnchor);
    var posDelta = flicking.animating ? state.delta : position - camera.position;
    var absPosDelta = Math.abs(posDelta);
    var snapDelta = axesEvent && axesEvent.delta[POSITION_KEY] !== 0 ? Math.abs(axesEvent.delta[POSITION_KEY]) : absPosDelta;
    var targetAnchor;
    if (snapDelta >= snapThreshold && snapDelta > 0) {
      // Move to anchor at position
      targetAnchor = this._findSnappedAnchor(position, anchorAtCamera);
    } else if (absPosDelta >= flicking.threshold && absPosDelta > 0) {
      // Move to the adjacent panel
      targetAnchor = this._findAdjacentAnchor(position, posDelta, anchorAtCamera);
    } else {
      // Fallback to nearest panel from current camera
      return this.moveToPanel(anchorAtCamera.panel, {
        duration: duration,
        axesEvent: axesEvent
      });
    }
    this._triggerIndexChangeEvent(targetAnchor.panel, position, axesEvent);
    return this._animateToPosition({
      position: camera.clampToReachablePosition(targetAnchor.position),
      duration: duration,
      newActivePanel: targetAnchor.panel,
      axesEvent: axesEvent
    });
  };
  __proto._findSnappedAnchor = function (position, anchorAtCamera) {
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var count = this._count;
    var currentPos = camera.position;
    var clampedPosition = camera.clampToReachablePosition(position);
    var anchorAtPosition = camera.findAnchorIncludePosition(clampedPosition);
    if (!anchorAtCamera || !anchorAtPosition) {
      throw new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE);
    }
    if (!isFinite(count)) {
      return anchorAtPosition;
    }
    var panelCount = flicking.panelCount;
    var anchors = camera.anchorPoints;
    var loopCount = Math.sign(position - currentPos) * Math.floor(Math.abs(position - currentPos) / camera.rangeDiff);
    if (position > currentPos && anchorAtPosition.index < anchorAtCamera.index || anchorAtPosition.position > anchorAtCamera.position && anchorAtPosition.index === anchorAtCamera.index) {
      loopCount += 1;
    } else if (position < currentPos && anchorAtPosition.index > anchorAtCamera.index || anchorAtPosition.position < anchorAtCamera.position && anchorAtPosition.index === anchorAtCamera.index) {
      loopCount -= 1;
    }
    var circularIndexOffset = loopCount * panelCount;
    var anchorAtPositionIndex = anchorAtPosition.index + circularIndexOffset;
    if (Math.abs(anchorAtPositionIndex - anchorAtCamera.index) <= count) {
      var anchor = anchors[anchorAtPosition.index];
      return new AnchorPoint({
        index: anchor.index,
        position: anchor.position + loopCount * camera.rangeDiff,
        panel: anchor.panel
      });
    }
    if (flicking.circularEnabled) {
      var targetAnchor = anchors[circulateIndex(anchorAtCamera.index + Math.sign(position - currentPos) * count, panelCount)];
      var loop = Math.floor(count / panelCount);
      if (position > currentPos && targetAnchor.index < anchorAtCamera.index) {
        loop += 1;
      } else if (position < currentPos && targetAnchor.index > anchorAtCamera.index) {
        loop -= 1;
      }
      return new AnchorPoint({
        index: targetAnchor.index,
        position: targetAnchor.position + loop * camera.rangeDiff,
        panel: targetAnchor.panel
      });
    } else {
      return anchors[flicking_esm_clamp(anchorAtCamera.index + Math.sign(position - currentPos) * count, 0, anchors.length - 1)];
    }
  };
  __proto._findAdjacentAnchor = function (position, posDelta, anchorAtCamera) {
    var _a;
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    if (camera.circularEnabled) {
      var anchorIncludePosition = camera.findAnchorIncludePosition(position);
      if (anchorIncludePosition && anchorIncludePosition.position !== anchorAtCamera.position) {
        return anchorIncludePosition;
      }
    }
    var adjacentAnchor = (_a = posDelta > 0 ? camera.getNextAnchor(anchorAtCamera) : camera.getPrevAnchor(anchorAtCamera)) !== null && _a !== void 0 ? _a : anchorAtCamera;
    return adjacentAnchor;
  };
  __proto._calcSnapThreshold = function (position, activeAnchor) {
    var isNextDirection = position > activeAnchor.position;
    var panel = activeAnchor.panel;
    var panelSize = panel.size;
    var alignPos = panel.alignPosition;
    // Minimum distance needed to decide prev/next panel as nearest
    /*
     * |  Prev  |     Next     |
     * |<------>|<------------>|
     * [        |<-Anchor      ]
     */
    return isNextDirection ? panelSize - alignPos + panel.margin.next : alignPos + panel.margin.prev;
  };
  return SnapControl;
}(Control);

/**
 * A {@link Control} that can be scrolled freely without alignment
 * @ko 패널이 정해진 지점에 정렬되지 않고, 자유롭게 스크롤할 수 있는 이동 방식을 사용하는 {@link Control}
 */
var FreeControl = /*#__PURE__*/function (_super) {
  flicking_esm_extends(FreeControl, _super);
  /** */
  function FreeControl(_a) {
    var _b = (_a === void 0 ? {} : _a).stopAtEdge,
      stopAtEdge = _b === void 0 ? true : _b;
    var _this = _super.call(this) || this;
    _this._stopAtEdge = stopAtEdge;
    return _this;
  }
  var __proto = FreeControl.prototype;
  Object.defineProperty(__proto, "stopAtEdge", {
    /**
     * Make scroll animation to stop at the start/end of the scroll area, not going out the bounce area
     * @ko 스크롤 애니메이션을 스크롤 영역의 시작과 끝부분에서 멈추도록 하여, 바운스 영역을 넘어가지 않도록 합니다
     * @type {boolean}
     * @default true
     */
    get: function () {
      return this._stopAtEdge;
    },
    set: function (val) {
      this._stopAtEdge = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Update position after resizing
   * @ko resize 이후에 position을 업데이트합니다
   * @param {number} progressInPanel Previous camera's progress in active panel before resize<ko>Resize 이전 현재 선택된 패널 내에서의 카메라 progress 값</ko>
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @chainable
   * @return {Promise<void>}
   */
  __proto.updatePosition = function (progressInPanel) {
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var activePanel = this._activePanel;
    if (activePanel) {
      var panelRange = activePanel.range;
      var newPosition = panelRange.min + (panelRange.max - panelRange.min) * progressInPanel;
      camera.lookAt(camera.clampToReachablePosition(newPosition));
    }
  };
  /**
   * Move {@link Camera} to the given position
   * @ko {@link Camera}를 주어진 좌표로 이동합니다
   * @param {number} position The target position to move<ko>이동할 좌표</ko>
   * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
   * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
   * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
   */
  __proto.moveToPosition = function (position, duration, axesEvent) {
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var targetPos = camera.clampToReachablePosition(position);
    var anchorAtPosition = camera.findAnchorIncludePosition(targetPos);
    if (!anchorAtPosition) {
      return Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE));
    }
    var targetPanel = anchorAtPosition.panel;
    // Trigger only change event
    if (targetPanel !== this._activePanel) {
      this._triggerIndexChangeEvent(targetPanel, position, axesEvent);
    }
    return this._animateToPosition({
      position: this._stopAtEdge ? targetPos : position,
      duration: duration,
      newActivePanel: targetPanel,
      axesEvent: axesEvent
    });
  };
  return FreeControl;
}(Control);

/**
 * A {@link Control} that allow you to select the maximum number of panels to move at a time
 * @ko 한번에 최대로 이동할 패널의 개수를 선택 가능한 {@link Control}
 */
var StrictControl = /*#__PURE__*/function (_super) {
  flicking_esm_extends(StrictControl, _super);
  /** */
  function StrictControl(_a) {
    var _b = (_a === void 0 ? {} : _a).count,
      count = _b === void 0 ? 1 : _b;
    var _this = _super.call(this) || this;
    _this.setActive = function (newActivePanel, prevActivePanel, isTrusted) {
      _super.prototype.setActive.call(_this, newActivePanel, prevActivePanel, isTrusted);
      _this.updateInput();
    };
    _this._count = count;
    _this._resetIndexRange();
    return _this;
  }
  var __proto = StrictControl.prototype;
  Object.defineProperty(__proto, "count", {
    /**
     * Maximum number of panels that can be moved at a time
     * @ko 최대로 움직일 수 있는 패널의 개수
     * @type {number}
     * @default 1
     */
    get: function () {
      return this._count;
    },
    set: function (val) {
      this._count = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Destroy Control and return to initial state
   * @ko Control을 초기 상태로 되돌립니다
   * @return {void}
   */
  __proto.destroy = function () {
    _super.prototype.destroy.call(this);
    this._resetIndexRange();
  };
  /**
   * Update {@link Control#controller controller}'s state
   * @ko {@link Control#controller controller}의 내부 상태를 갱신합니다
   * @chainable
   * @return {this}
   */
  __proto.updateInput = function () {
    var _a;
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var renderer = flicking.renderer;
    var controller = this._controller;
    var controlParams = camera.controlParams;
    var count = this._count;
    var activePanel = controller.state.animating ? (_a = camera.findNearestAnchor(camera.position)) === null || _a === void 0 ? void 0 : _a.panel : this._activePanel;
    if (!activePanel) {
      controller.update(controlParams);
      this._resetIndexRange();
      return this;
    }
    var cameraRange = controlParams.range;
    var currentPos = activePanel.position;
    var currentIndex = activePanel.index;
    var panelCount = renderer.panelCount;
    var prevPanelIndex = currentIndex - count;
    var nextPanelIndex = currentIndex + count;
    if (prevPanelIndex < 0) {
      prevPanelIndex = flicking.circularEnabled ? getMinusCompensatedIndex((prevPanelIndex + 1) % panelCount - 1, panelCount) : flicking_esm_clamp(prevPanelIndex, 0, panelCount - 1);
    }
    if (nextPanelIndex >= panelCount) {
      nextPanelIndex = flicking.circularEnabled ? nextPanelIndex % panelCount : flicking_esm_clamp(nextPanelIndex, 0, panelCount - 1);
    }
    var prevPanel = renderer.panels[prevPanelIndex];
    var nextPanel = renderer.panels[nextPanelIndex];
    var prevPos = Math.max(prevPanel.position, cameraRange.min);
    var nextPos = Math.min(nextPanel.position, cameraRange.max);
    if (prevPos > currentPos) {
      prevPos -= camera.rangeDiff;
    }
    if (nextPos < currentPos) {
      nextPos += camera.rangeDiff;
    }
    controlParams.range = {
      min: prevPos,
      max: nextPos
    };
    if (controlParams.circular) {
      if (controlParams.position < prevPos) {
        controlParams.position += camera.rangeDiff;
      }
      if (controlParams.position > nextPos) {
        controlParams.position -= camera.rangeDiff;
      }
    }
    controlParams.circular = false;
    controller.update(controlParams);
    this._indexRange = {
      min: prevPanel.index,
      max: nextPanel.index
    };
    return this;
  };
  __proto.moveToPanel = function (panel, options) {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, camera, controller;
      return __generator(this, function (_a) {
        flicking = getFlickingAttached(this._flicking);
        camera = flicking.camera;
        controller = this._controller;
        controller.update(camera.controlParams);
        return [2 /*return*/, _super.prototype.moveToPanel.call(this, panel, options)];
      });
    });
  };
  /**
   * Move {@link Camera} to the given position
   * @ko {@link Camera}를 주어진 좌표로 이동합니다
   * @param {number} position The target position to move<ko>이동할 좌표</ko>
   * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
   * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
   * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
   */
  __proto.moveToPosition = function (position, duration, axesEvent) {
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var activePanel = this._activePanel;
    var axesRange = this._controller.range;
    var indexRange = this._indexRange;
    var cameraRange = camera.range;
    var state = this._controller.state;
    var clampedPosition = flicking_esm_clamp(camera.clampToReachablePosition(position), axesRange[0], axesRange[1]);
    var anchorAtPosition = camera.findAnchorIncludePosition(clampedPosition);
    if (!anchorAtPosition || !activePanel) {
      return Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE));
    }
    var prevPos = activePanel.position;
    var posDelta = flicking.animating ? state.delta : position - camera.position;
    var isOverThreshold = Math.abs(posDelta) >= flicking.threshold;
    var adjacentAnchor = position > prevPos ? camera.getNextAnchor(anchorAtPosition) : camera.getPrevAnchor(anchorAtPosition);
    var targetPos;
    var targetPanel;
    var anchors = camera.anchorPoints;
    var firstAnchor = anchors[0];
    var lastAnchor = anchors[anchors.length - 1];
    var shouldBounceToFirst = position <= cameraRange.min && isBetween(firstAnchor.panel.index, indexRange.min, indexRange.max);
    var shouldBounceToLast = position >= cameraRange.max && isBetween(lastAnchor.panel.index, indexRange.min, indexRange.max);
    var isAdjacent = adjacentAnchor && (indexRange.min <= indexRange.max ? isBetween(adjacentAnchor.index, indexRange.min, indexRange.max) : adjacentAnchor.index >= indexRange.min || adjacentAnchor.index <= indexRange.max);
    if (shouldBounceToFirst || shouldBounceToLast) {
      // In bounce area
      var targetAnchor = position < cameraRange.min ? firstAnchor : lastAnchor;
      targetPanel = targetAnchor.panel;
      targetPos = targetAnchor.position;
    } else if (isOverThreshold && anchorAtPosition.position !== activePanel.position) {
      // Move to anchor at position
      targetPanel = anchorAtPosition.panel;
      targetPos = anchorAtPosition.position;
    } else if (isOverThreshold && isAdjacent) {
      // Move to adjacent anchor
      targetPanel = adjacentAnchor.panel;
      targetPos = adjacentAnchor.position;
    } else {
      // Fallback to nearest panel from current camera
      var anchorAtCamera = camera.findNearestAnchor(camera.position);
      if (!anchorAtCamera) {
        return Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE));
      }
      return this.moveToPanel(anchorAtCamera.panel, {
        duration: duration,
        axesEvent: axesEvent
      });
    }
    this._triggerIndexChangeEvent(targetPanel, position, axesEvent);
    return this._animateToPosition({
      position: targetPos,
      duration: duration,
      newActivePanel: targetPanel,
      axesEvent: axesEvent
    });
  };
  __proto._resetIndexRange = function () {
    this._indexRange = {
      min: 0,
      max: 0
    };
  };
  return StrictControl;
}(Control);

/**
 * A mode of camera
 */
var CameraMode = /*#__PURE__*/function () {
  /** */
  function CameraMode(flicking) {
    this._flicking = flicking;
  }
  var __proto = CameraMode.prototype;
  __proto.getAnchors = function () {
    var panels = this._flicking.renderer.panels;
    return panels.map(function (panel, index) {
      return new AnchorPoint({
        index: index,
        position: panel.position,
        panel: panel
      });
    });
  };
  __proto.findAnchorIncludePosition = function (position) {
    var anchors = this._flicking.camera.anchorPoints;
    var anchorsIncludingPosition = anchors.filter(function (anchor) {
      return anchor.panel.includePosition(position, true);
    });
    return anchorsIncludingPosition.reduce(function (nearest, anchor) {
      if (!nearest) return anchor;
      return Math.abs(nearest.position - position) < Math.abs(anchor.position - position) ? nearest : anchor;
    }, null);
  };
  __proto.findNearestAnchor = function (position) {
    var anchors = this._flicking.camera.anchorPoints;
    if (anchors.length <= 0) return null;
    var prevDist = Infinity;
    for (var anchorIdx = 0; anchorIdx < anchors.length; anchorIdx++) {
      var anchor = anchors[anchorIdx];
      var dist = Math.abs(anchor.position - position);
      if (dist > prevDist) {
        // Return previous anchor
        return anchors[anchorIdx - 1];
      }
      prevDist = dist;
    }
    // Return last anchor
    return anchors[anchors.length - 1];
  };
  __proto.clampToReachablePosition = function (position) {
    var camera = this._flicking.camera;
    var range = camera.range;
    return flicking_esm_clamp(position, range.min, range.max);
  };
  __proto.getCircularOffset = function () {
    return 0;
  };
  __proto.canReach = function (panel) {
    var camera = this._flicking.camera;
    var range = camera.range;
    if (panel.removed) return false;
    var panelPos = panel.position;
    return panelPos >= range.min && panelPos <= range.max;
  };
  __proto.canSee = function (panel) {
    var camera = this._flicking.camera;
    var visibleRange = camera.visibleRange;
    // Should not include margin, as we don't declare what the margin is visible as what the panel is visible.
    return panel.isVisibleOnRange(visibleRange.min, visibleRange.max);
  };
  return CameraMode;
}();
var LinearCameraMode = /*#__PURE__*/function (_super) {
  flicking_esm_extends(LinearCameraMode, _super);
  function LinearCameraMode() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  var __proto = LinearCameraMode.prototype;
  __proto.checkAvailability = function () {
    // It's always available
    return true;
  };
  __proto.getRange = function () {
    var _a, _b;
    var renderer = this._flicking.renderer;
    var firstPanel = renderer.getPanel(0);
    var lastPanel = renderer.getPanel(renderer.panelCount - 1);
    return {
      min: (_a = firstPanel === null || firstPanel === void 0 ? void 0 : firstPanel.position) !== null && _a !== void 0 ? _a : 0,
      max: (_b = lastPanel === null || lastPanel === void 0 ? void 0 : lastPanel.position) !== null && _b !== void 0 ? _b : 0
    };
  };
  return LinearCameraMode;
}(CameraMode);

/**
 * A {@link Camera} mode that connects the last panel and the first panel, enabling continuous loop
 * @ko 첫번째 패널과 마지막 패널이 이어진 상태로, 무한히 회전할 수 있는 종류의 {@link Camera} 모드
 */
var CircularCameraMode = /*#__PURE__*/function (_super) {
  flicking_esm_extends(CircularCameraMode, _super);
  function CircularCameraMode() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  var __proto = CircularCameraMode.prototype;
  __proto.checkAvailability = function () {
    var flicking = this._flicking;
    var renderer = flicking.renderer;
    var panels = renderer.panels;
    if (panels.length <= 0) {
      return false;
    }
    var firstPanel = panels[0];
    var lastPanel = panels[panels.length - 1];
    var firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
    var lastPanelNext = lastPanel.range.max + lastPanel.margin.next;
    var visibleSize = flicking.camera.size;
    var panelSizeSum = lastPanelNext - firstPanelPrev;
    var canSetCircularMode = panels.every(function (panel) {
      return panelSizeSum - panel.size >= visibleSize;
    });
    return canSetCircularMode;
  };
  __proto.getRange = function () {
    var flicking = this._flicking;
    var panels = flicking.renderer.panels;
    if (panels.length <= 0) {
      return {
        min: 0,
        max: 0
      };
    }
    var firstPanel = panels[0];
    var lastPanel = panels[panels.length - 1];
    var firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
    var lastPanelNext = lastPanel.range.max + lastPanel.margin.next;
    return {
      min: firstPanelPrev,
      max: lastPanelNext
    };
  };
  __proto.getAnchors = function () {
    var flicking = this._flicking;
    var panels = flicking.renderer.panels;
    return panels.map(function (panel, index) {
      return new AnchorPoint({
        index: index,
        position: panel.position,
        panel: panel
      });
    });
  };
  __proto.findNearestAnchor = function (position) {
    var camera = this._flicking.camera;
    var anchors = camera.anchorPoints;
    if (anchors.length <= 0) return null;
    var camRange = camera.range;
    var minDist = Infinity;
    var minDistIndex = -1;
    for (var anchorIdx = 0; anchorIdx < anchors.length; anchorIdx++) {
      var anchor = anchors[anchorIdx];
      var dist = Math.min(Math.abs(anchor.position - position), Math.abs(anchor.position - camRange.min + camRange.max - position), Math.abs(position - camRange.min + camRange.max - anchor.position));
      if (dist < minDist) {
        minDist = dist;
        minDistIndex = anchorIdx;
      }
    }
    // Return last anchor
    return anchors[minDistIndex];
  };
  __proto.findAnchorIncludePosition = function (position) {
    var camera = this._flicking.camera;
    var range = camera.range;
    var anchors = camera.anchorPoints;
    var rangeDiff = camera.rangeDiff;
    var anchorCount = anchors.length;
    var positionInRange = circulatePosition(position, range.min, range.max);
    var anchorInRange = _super.prototype.findAnchorIncludePosition.call(this, positionInRange);
    if (anchorCount > 0 && (position === range.min || position === range.max)) {
      var possibleAnchors = [anchorInRange, new AnchorPoint({
        index: 0,
        position: anchors[0].position + rangeDiff,
        panel: anchors[0].panel
      }), new AnchorPoint({
        index: anchorCount - 1,
        position: anchors[anchorCount - 1].position - rangeDiff,
        panel: anchors[anchorCount - 1].panel
      })].filter(function (anchor) {
        return !!anchor;
      });
      anchorInRange = possibleAnchors.reduce(function (nearest, anchor) {
        if (!nearest) return anchor;
        return Math.abs(nearest.position - position) < Math.abs(anchor.position - position) ? nearest : anchor;
      }, null);
    }
    if (!anchorInRange) return null;
    if (position < range.min) {
      var loopCount = -Math.floor((range.min - position) / rangeDiff) - 1;
      return new AnchorPoint({
        index: anchorInRange.index,
        position: anchorInRange.position + rangeDiff * loopCount,
        panel: anchorInRange.panel
      });
    } else if (position > range.max) {
      var loopCount = Math.floor((position - range.max) / rangeDiff) + 1;
      return new AnchorPoint({
        index: anchorInRange.index,
        position: anchorInRange.position + rangeDiff * loopCount,
        panel: anchorInRange.panel
      });
    }
    return anchorInRange;
  };
  __proto.getCircularOffset = function () {
    var flicking = this._flicking;
    var camera = flicking.camera;
    if (!camera.circularEnabled) return 0;
    var toggled = flicking.panels.filter(function (panel) {
      return panel.toggled;
    });
    var toggledPrev = toggled.filter(function (panel) {
      return panel.toggleDirection === DIRECTION.PREV;
    });
    var toggledNext = toggled.filter(function (panel) {
      return panel.toggleDirection === DIRECTION.NEXT;
    });
    return this._calcPanelAreaSum(toggledPrev) - this._calcPanelAreaSum(toggledNext);
  };
  __proto.clampToReachablePosition = function (position) {
    // Basically all position is reachable for circular camera
    return position;
  };
  __proto.canReach = function (panel) {
    if (panel.removed) return false;
    // Always reachable on circular mode
    return true;
  };
  __proto.canSee = function (panel) {
    var camera = this._flicking.camera;
    var range = camera.range;
    var rangeDiff = camera.rangeDiff;
    var visibleRange = camera.visibleRange;
    var visibleInCurrentRange = _super.prototype.canSee.call(this, panel);
    // Check looped visible area for circular case
    if (visibleRange.min < range.min) {
      return visibleInCurrentRange || panel.isVisibleOnRange(visibleRange.min + rangeDiff, visibleRange.max + rangeDiff);
    } else if (visibleRange.max > range.max) {
      return visibleInCurrentRange || panel.isVisibleOnRange(visibleRange.min - rangeDiff, visibleRange.max - rangeDiff);
    }
    return visibleInCurrentRange;
  };
  __proto._calcPanelAreaSum = function (panels) {
    return panels.reduce(function (sum, panel) {
      return sum + panel.sizeIncludingMargin;
    }, 0);
  };
  return CircularCameraMode;
}(CameraMode);
var BoundCameraMode = /*#__PURE__*/function (_super) {
  flicking_esm_extends(BoundCameraMode, _super);
  function BoundCameraMode() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  var __proto = BoundCameraMode.prototype;
  __proto.checkAvailability = function () {
    var flicking = this._flicking;
    var renderer = flicking.renderer;
    var firstPanel = renderer.getPanel(0);
    var lastPanel = renderer.getPanel(renderer.panelCount - 1);
    if (!firstPanel || !lastPanel) {
      return false;
    }
    var viewportSize = flicking.camera.size;
    var firstPanelPrev = firstPanel.range.min;
    var lastPanelNext = lastPanel.range.max;
    var panelAreaSize = lastPanelNext - firstPanelPrev;
    var isBiggerThanViewport = viewportSize < panelAreaSize;
    return isBiggerThanViewport;
  };
  __proto.getRange = function () {
    var flicking = this._flicking;
    var renderer = flicking.renderer;
    var alignPos = flicking.camera.alignPosition;
    var firstPanel = renderer.getPanel(0);
    var lastPanel = renderer.getPanel(renderer.panelCount - 1);
    if (!firstPanel || !lastPanel) {
      return {
        min: 0,
        max: 0
      };
    }
    var viewportSize = flicking.camera.size;
    var firstPanelPrev = firstPanel.range.min;
    var lastPanelNext = lastPanel.range.max;
    var panelAreaSize = lastPanelNext - firstPanelPrev;
    var isBiggerThanViewport = viewportSize < panelAreaSize;
    var firstPos = firstPanelPrev + alignPos;
    var lastPos = lastPanelNext - viewportSize + alignPos;
    if (isBiggerThanViewport) {
      return {
        min: firstPos,
        max: lastPos
      };
    } else {
      var align = flicking.camera.align;
      var alignVal = typeof align === "object" ? align.camera : align;
      var pos = firstPos + parseAlign$1(alignVal, lastPos - firstPos);
      return {
        min: pos,
        max: pos
      };
    }
  };
  __proto.getAnchors = function () {
    var flicking = this._flicking;
    var camera = flicking.camera;
    var panels = flicking.renderer.panels;
    if (panels.length <= 0) {
      return [];
    }
    var range = flicking.camera.range;
    var reachablePanels = panels.filter(function (panel) {
      return camera.canReach(panel);
    });
    if (reachablePanels.length > 0) {
      var shouldPrependBoundAnchor = reachablePanels[0].position !== range.min;
      var shouldAppendBoundAnchor = reachablePanels[reachablePanels.length - 1].position !== range.max;
      var indexOffset_1 = shouldPrependBoundAnchor ? 1 : 0;
      var newAnchors = reachablePanels.map(function (panel, idx) {
        return new AnchorPoint({
          index: idx + indexOffset_1,
          position: panel.position,
          panel: panel
        });
      });
      if (shouldPrependBoundAnchor) {
        newAnchors.splice(0, 0, new AnchorPoint({
          index: 0,
          position: range.min,
          panel: panels[reachablePanels[0].index - 1]
        }));
      }
      if (shouldAppendBoundAnchor) {
        newAnchors.push(new AnchorPoint({
          index: newAnchors.length,
          position: range.max,
          panel: panels[reachablePanels[reachablePanels.length - 1].index + 1]
        }));
      }
      return newAnchors;
    } else if (range.min !== range.max) {
      // There're more than 2 panels
      var nearestPanelAtMin = this._findNearestPanel(range.min, panels);
      var panelAtMin = nearestPanelAtMin.index === panels.length - 1 ? nearestPanelAtMin.prev() : nearestPanelAtMin;
      var panelAtMax = panelAtMin.next();
      return [new AnchorPoint({
        index: 0,
        position: range.min,
        panel: panelAtMin
      }), new AnchorPoint({
        index: 1,
        position: range.max,
        panel: panelAtMax
      })];
    } else {
      return [new AnchorPoint({
        index: 0,
        position: range.min,
        panel: this._findNearestPanel(range.min, panels)
      })];
    }
  };
  __proto.findAnchorIncludePosition = function (position) {
    var camera = this._flicking.camera;
    var range = camera.range;
    var anchors = camera.anchorPoints;
    if (anchors.length <= 0) return null;
    if (position <= range.min) {
      return anchors[0];
    } else if (position >= range.max) {
      return anchors[anchors.length - 1];
    } else {
      return _super.prototype.findAnchorIncludePosition.call(this, position);
    }
  };
  __proto._findNearestPanel = function (pos, panels) {
    var prevDist = Infinity;
    for (var panelIdx = 0; panelIdx < panels.length; panelIdx++) {
      var panel = panels[panelIdx];
      var dist = Math.abs(panel.position - pos);
      if (dist > prevDist) {
        // Return previous anchor
        return panels[panelIdx - 1];
      }
      prevDist = dist;
    }
    // Return last anchor
    return panels[panels.length - 1];
  };
  return BoundCameraMode;
}(CameraMode);

/**
 * A component that manages actual movement inside the viewport
 * @ko 뷰포트 내에서의 실제 움직임을 담당하는 컴포넌트
 */
var Camera = /*#__PURE__*/function () {
  /** */
  function Camera(flicking, _a) {
    var _this = this;
    var _b = (_a === void 0 ? {} : _a).align,
      align = _b === void 0 ? ALIGN.CENTER : _b;
    this._checkTranslateSupport = function () {
      var e_1, _a;
      var transforms = ["webkitTransform", "msTransform", "MozTransform", "OTransform", "transform"];
      var supportedStyle = document.documentElement.style;
      var transformName = "";
      try {
        for (var transforms_1 = flicking_esm_values(transforms), transforms_1_1 = transforms_1.next(); !transforms_1_1.done; transforms_1_1 = transforms_1.next()) {
          var prefixedTransform = transforms_1_1.value;
          if (prefixedTransform in supportedStyle) {
            transformName = prefixedTransform;
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (transforms_1_1 && !transforms_1_1.done && (_a = transforms_1.return)) _a.call(transforms_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      if (!transformName) {
        throw new FlickingError(MESSAGE.TRANSFORM_NOT_SUPPORTED, CODE.TRANSFORM_NOT_SUPPORTED);
      }
      _this._transform = transformName;
    };
    this._flicking = flicking;
    this._resetInternalValues();
    // Options
    this._align = align;
  }
  var __proto = Camera.prototype;
  Object.defineProperty(__proto, "element", {
    // Internal states getter
    /**
     * The camera element(`.flicking-camera`)
     * @ko 카메라 엘리먼트(`.flicking-camera`)
     * @type {HTMLElement}
     * @readonly
     */
    get: function () {
      return this._el;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "children", {
    /**
     * An array of the child elements of the camera element(`.flicking-camera`)
     * @ko 카메라 엘리먼트(`.flicking-camera`)의 자식 엘리먼트 배열
     * @type {HTMLElement[]}
     * @readonly
     */
    get: function () {
      return flicking_esm_toArray(this._el.children);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "position", {
    /**
     * Current position of the camera
     * @ko Camera의 현재 좌표
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "alignPosition", {
    /**
     * Align position inside the viewport where {@link Panel}'s {@link Panel#alignPosition alignPosition} should be located at
     * @ko 패널의 정렬 기준 위치. 뷰포트 내에서 {@link Panel}의 {@link Panel#alignPosition alignPosition}이 위치해야 하는 곳입니다
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._alignPos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "offset", {
    /**
     * Position offset, used for the {@link Flicking#renderOnlyVisible renderOnlyVisible} option
     * @ko Camera의 좌표 오프셋. {@link Flicking#renderOnlyVisible renderOnlyVisible} 옵션을 위해 사용됩니다.
     * @type {number}
     * @default 0
     * @readonly
     */
    get: function () {
      return this._offset - this._circularOffset;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "circularEnabled", {
    /**
     * Whether the `circular` option is enabled.
     * The {@link Flicking#circular circular} option can't be enabled when sum of the panel sizes are too small.
     * @ko {@link Flicking#circular circular} 옵션이 활성화되었는지 여부를 나타내는 멤버 변수.
     * {@link Flicking#circular circular} 옵션은 패널의 크기의 합이 충분하지 않을 경우 비활성화됩니다.
     * @type {boolean}
     * @default false
     * @readonly
     */
    get: function () {
      return this._circularEnabled;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "mode", {
    /**
     * A current camera mode
     * @type {CameraMode}
     * @readonly
     */
    get: function () {
      return this._mode;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "range", {
    /**
     * A range that Camera's {@link Camera#position position} can reach
     * @ko Camera의 {@link Camera#position position}이 도달 가능한 범위
     * @type {object}
     * @property {number} min A minimum position<ko>최소 위치</ko>
     * @property {number} max A maximum position<ko>최대 위치</ko>
     * @readonly
     */
    get: function () {
      return this._range;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "rangeDiff", {
    /**
     * A difference between Camera's minimum and maximum position that can reach
     * @ko Camera가 도달 가능한 최소/최대 좌표의 차이
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._range.max - this._range.min;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "visiblePanels", {
    /**
     * An array of visible panels from the current position
     * @ko 현재 보이는 패널들의 배열
     * @type {Panel[]}
     * @readonly
     */
    get: function () {
      return this._visiblePanels;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "visibleRange", {
    /**
     * A range of the visible area from the current position
     * @ko 현재 위치에서 보이는 범위
     * @type {object}
     * @property {number} min A minimum position<ko>최소 위치</ko>
     * @property {number} min A maximum position<ko>최대 위치</ko>
     * @readonly
     */
    get: function () {
      return {
        min: this._position - this._alignPos,
        max: this._position - this._alignPos + this.size
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "anchorPoints", {
    /**
     * An array of {@link AnchorPoint}s that Camera can be stopped at
     * @ko 카메라가 도달 가능한 {@link AnchorPoint}의 목록
     * @type {AnchorPoint[]}
     * @readonly
     */
    get: function () {
      return this._anchors;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "controlParams", {
    /**
     * A current parameters of the Camera for updating {@link AxesController}
     * @ko {@link AxesController}를 업데이트하기 위한 현재 Camera 패러미터들
     * @type {ControlParams}
     * @readonly
     */
    get: function () {
      return {
        range: this._range,
        position: this._position,
        circular: this._circularEnabled
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "atEdge", {
    /**
     * A Boolean value indicating whether Camera's over the minimum or maximum position reachable
     * @ko 현재 카메라가 도달 가능한 범위의 최소 혹은 최대점을 넘어섰는지를 나타냅니다
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._position <= this._range.min || this._position >= this._range.max;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "size", {
    /**
     * Return the size of the viewport
     * @ko 뷰포트 크기를 반환합니다
     * @type {number}
     * @readonly
     */
    get: function () {
      var flicking = this._flicking;
      return flicking ? flicking.horizontal ? flicking.viewport.width : flicking.viewport.height : 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "progress", {
    /**
     * Return the camera's position progress from the first panel to last panel
     * Range is from 0 to last panel's index
     * @ko 첫번째 패널로부터 마지막 패널까지의 카메라 위치의 진행도를 반환합니다
     * 범위는 0부터 마지막 패널의 인덱스까지입니다
     * @type {number}
     * @readonly
     */
    get: function () {
      var flicking = this._flicking;
      var position = this._position + this._offset;
      var nearestAnchor = this.findNearestAnchor(this._position);
      if (!flicking || !nearestAnchor) {
        return NaN;
      }
      var nearestPanel = nearestAnchor.panel;
      var panelPos = nearestPanel.position + nearestPanel.offset;
      var bounceSize = flicking.control.controller.bounce;
      var _a = this.range,
        prevRange = _a.min,
        nextRange = _a.max;
      var rangeDiff = this.rangeDiff;
      if (position === panelPos) {
        return nearestPanel.index;
      }
      if (position < panelPos) {
        var prevPanel = nearestPanel.prev();
        var prevPosition = prevPanel ? prevPanel.position + prevPanel.offset : prevRange - bounceSize[0];
        // Looped
        if (prevPosition > panelPos) {
          prevPosition -= rangeDiff;
        }
        return nearestPanel.index - 1 + getProgress(position, prevPosition, panelPos);
      } else {
        var nextPanel = nearestPanel.next();
        var nextPosition = nextPanel ? nextPanel.position + nextPanel.offset : nextRange + bounceSize[1];
        // Looped
        if (nextPosition < panelPos) {
          nextPosition += rangeDiff;
        }
        return nearestPanel.index + getProgress(position, panelPos, nextPosition);
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "align", {
    // Options Getter
    /**
     * A value indicating where the {@link Camera#alignPosition alignPosition} should be located at inside the viewport element
     * @ko {@link Camera#alignPosition alignPosition}이 뷰포트 엘리먼트 내의 어디에 위치해야 하는지를 나타내는 값
     * @type {ALIGN | string | number}
     */
    get: function () {
      return this._align;
    },
    // Options Setter
    set: function (val) {
      this._align = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize Camera
   * @ko Camera를 초기화합니다
   * @throws {FlickingError}
   * {@link ERROR_CODE VAL_MUST_NOT_NULL} If the camera element(`.flicking-camera`) does not exist inside viewport element
   * <ko>{@link ERROR_CODE VAL_MUST_NOT_NULL} 뷰포트 엘리먼트 내부에 카메라 엘리먼트(`.flicking-camera`)가 존재하지 않을 경우</ko>
   * @return {this}
   */
  __proto.init = function () {
    var viewportEl = this._flicking.viewport.element;
    checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
    this._el = viewportEl.firstElementChild;
    this._checkTranslateSupport();
    this._updateMode();
    return this;
  };
  /**
   * Destroy Camera and return to initial state
   * @ko Camera를 초기 상태로 되돌립니다
   * @return {void}
   */
  __proto.destroy = function () {
    this._resetInternalValues();
    return this;
  };
  /**
   * Move to the given position and apply CSS transform
   * @ko 해당 좌표로 이동하고, CSS transform을 적용합니다
   * @param {number} pos A new position<ko>움직일 위치</ko>
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
  __proto.lookAt = function (pos) {
    var _this = this;
    var flicking = getFlickingAttached(this._flicking);
    var prevPos = this._position;
    this._position = pos;
    var toggled = this._togglePanels(prevPos, pos);
    this._refreshVisiblePanels();
    this._checkNeedPanel();
    this._checkReachEnd(prevPos, pos);
    if (toggled) {
      void flicking.renderer.render().then(function () {
        _this.updateOffset();
      });
    } else {
      this.applyTransform();
    }
  };
  /**
   * Return a previous {@link AnchorPoint} of given {@link AnchorPoint}
   * If it does not exist, return `null` instead
   * @ko 주어진 {@link AnchorPoint}의 이전 {@link AnchorPoint}를 반환합니다
   * 존재하지 않을 경우 `null`을 반환합니다
   * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>기준 {@link AnchorPoint}</ko>
   * @return {AnchorPoint | null} The previous {@link AnchorPoint}<ko>이전 {@link AnchorPoint}</ko>
   */
  __proto.getPrevAnchor = function (anchor) {
    if (!this._circularEnabled || anchor.index !== 0) {
      return this._anchors[anchor.index - 1] || null;
    } else {
      var anchors = this._anchors;
      var rangeDiff = this.rangeDiff;
      var lastAnchor = anchors[anchors.length - 1];
      return new AnchorPoint({
        index: lastAnchor.index,
        position: lastAnchor.position - rangeDiff,
        panel: lastAnchor.panel
      });
    }
  };
  /**
   * Return a next {@link AnchorPoint} of given {@link AnchorPoint}
   * If it does not exist, return `null` instead
   * @ko 주어진 {@link AnchorPoint}의 다음 {@link AnchorPoint}를 반환합니다
   * 존재하지 않을 경우 `null`을 반환합니다
   * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>기준 {@link AnchorPoint}</ko>
   * @return {AnchorPoint | null} The next {@link AnchorPoint}<ko>다음 {@link AnchorPoint}</ko>
   */
  __proto.getNextAnchor = function (anchor) {
    var anchors = this._anchors;
    if (!this._circularEnabled || anchor.index !== anchors.length - 1) {
      return anchors[anchor.index + 1] || null;
    } else {
      var rangeDiff = this.rangeDiff;
      var firstAnchor = anchors[0];
      return new AnchorPoint({
        index: firstAnchor.index,
        position: firstAnchor.position + rangeDiff,
        panel: firstAnchor.panel
      });
    }
  };
  /**
   * Return the camera's position progress in the panel below
   * Value is from 0 to 1 when the camera's inside panel
   * Value can be lower than 0 or bigger than 1 when it's in the margin area
   * @ko 현재 카메라 아래 패널에서의 위치 진행도를 반환합니다
   * 반환값은 카메라가 패널 내부에 있을 경우 0부터 1까지의 값을 갖습니다
   * 패널의 margin 영역에 있을 경우 0보다 작거나 1보다 큰 값을 반환할 수 있습니다
   */
  __proto.getProgressInPanel = function (panel) {
    var panelRange = panel.range;
    return (this._position - panelRange.min) / (panelRange.max - panelRange.min);
  };
  /**
   * Return {@link AnchorPoint} that includes given position
   * If there's no {@link AnchorPoint} that includes the given position, return `null` instead
   * @ko 주어진 좌표를 포함하는 {@link AnchorPoint}를 반환합니다
   * 주어진 좌표를 포함하는 {@link AnchorPoint}가 없을 경우 `null`을 반환합니다
   * @param {number} position A position to check<ko>확인할 좌표</ko>
   * @return {AnchorPoint | null} The {@link AnchorPoint} that includes the given position<ko>해당 좌표를 포함하는 {@link AnchorPoint}</ko>
   */
  __proto.findAnchorIncludePosition = function (position) {
    return this._mode.findAnchorIncludePosition(position);
  };
  /**
   * Return {@link AnchorPoint} nearest to given position
   * If there're no {@link AnchorPoint}s, return `null` instead
   * @ko 해당 좌표에서 가장 가까운 {@link AnchorPoint}를 반환합니다
   * {@link AnchorPoint}가 하나도 없을 경우 `null`을 반환합니다
   * @param {number} position A position to check<ko>확인할 좌표</ko>
   * @return {AnchorPoint | null} The {@link AnchorPoint} nearest to the given position<ko>해당 좌표에 가장 인접한 {@link AnchorPoint}</ko>
   */
  __proto.findNearestAnchor = function (position) {
    return this._mode.findNearestAnchor(position);
  };
  /**
   * Return {@link AnchorPoint} that matches {@link Flicking#currentPanel}
   * @ko 현재 {@link Flicking#currentPanel}에 해당하는 {@link AnchorPoint}를 반환합니다
   * @return {AnchorPoint | null}
   */
  __proto.findActiveAnchor = function () {
    var flicking = getFlickingAttached(this._flicking);
    var activeIndex = flicking.control.activeIndex;
    return flicking_esm_find(this._anchors, function (anchor) {
      return anchor.panel.index === activeIndex;
    });
  };
  /**
   * Clamp the given position between camera's range
   * @ko 주어진 좌표를 Camera가 도달 가능한 범위 사이의 값으로 만듭니다
   * @param {number} position A position to clamp<ko>범위를 제한할 좌표</ko>
   * @return {number} A clamped position<ko>범위 제한된 좌표</ko>
   */
  __proto.clampToReachablePosition = function (position) {
    return this._mode.clampToReachablePosition(position);
  };
  /**
   * Check whether the given panel is inside of the Camera's range
   * @ko 해당 {@link Panel}이 Camera가 도달 가능한 범위 내에 있는지를 반환합니다
   * @param panel An instance of {@link Panel} to check<ko>확인할 {@link Panel}의 인스턴스</ko>
   * @return {boolean} Whether the panel's inside Camera's range<ko>도달 가능한 범위 내에 해당 패널이 존재하는지 여부</ko>
   */
  __proto.canReach = function (panel) {
    return this._mode.canReach(panel);
  };
  /**
   * Check whether the given panel element is visible at the current position
   * @ko 현재 좌표에서 해당 패널 엘리먼트를 볼 수 있는지 여부를 반환합니다
   * @param panel An instance of {@link Panel} to check<ko>확인할 {@link Panel}의 인스턴스</ko>
   * @return Whether the panel element is visible at the current position<ko>현재 위치에서 해당 패널 엘리먼트가 보이는지 여부</ko>
   */
  __proto.canSee = function (panel) {
    return this._mode.canSee(panel);
  };
  /**
   * Update {@link Camera#range range} of Camera
   * @ko Camera의 {@link Camera#range range}를 업데이트합니다
   * @method
   * @abstract
   * @memberof Camera
   * @instance
   * @name updateRange
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
  __proto.updateRange = function () {
    var flicking = getFlickingAttached(this._flicking);
    var renderer = flicking.renderer;
    var panels = renderer.panels;
    this._updateMode();
    this._range = this._mode.getRange();
    panels.forEach(function (panel) {
      return panel.updateCircularToggleDirection();
    });
    return this;
  };
  /**
   * Update Camera's {@link Camera#alignPosition alignPosition}
   * @ko Camera의 {@link Camera#alignPosition alignPosition}을 업데이트합니다
   * @chainable
   * @return {this}
   */
  __proto.updateAlignPos = function () {
    var align = this._align;
    var alignVal = typeof align === "object" ? align.camera : align;
    this._alignPos = parseAlign$1(alignVal, this.size);
    return this;
  };
  /**
   * Update Camera's {@link Camera#anchorPoints anchorPoints}
   * @ko Camera의 {@link Camera#anchorPoints anchorPoints}를 업데이트합니다
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @chainable
   * @return {this}
   */
  __proto.updateAnchors = function () {
    this._anchors = this._mode.getAnchors();
    return this;
  };
  /**
   * Update Viewport's height to active panel's height
   * @ko 현재 선택된 패널의 높이와 동일하도록 뷰포트의 높이를 업데이트합니다
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @chainable
   * @return {this}
   */
  __proto.updateAdaptiveHeight = function () {
    var flicking = getFlickingAttached(this._flicking);
    var activePanel = flicking.control.activePanel;
    if (!flicking.horizontal || !flicking.adaptive || !activePanel) return;
    flicking.viewport.setSize({
      height: activePanel.height
    });
  };
  /**
   * Update current offset of the camera
   * @ko 현재 카메라의 오프셋을 업데이트합니다
   * @chainable
   * @return {this}
   */
  __proto.updateOffset = function () {
    var flicking = getFlickingAttached(this._flicking);
    var position = this._position;
    var unRenderedPanels = flicking.panels.filter(function (panel) {
      return !panel.rendered;
    });
    this._offset = unRenderedPanels.filter(function (panel) {
      return panel.position + panel.offset < position;
    }).reduce(function (offset, panel) {
      return offset + panel.sizeIncludingMargin;
    }, 0);
    this._circularOffset = this._mode.getCircularOffset();
    this.applyTransform();
    return this;
  };
  /**
   * Reset the history of {@link Flicking#event:needPanel needPanel} events so it can be triggered again
   * @ko 발생한 {@link Flicking#event:needPanel needPanel} 이벤트들을 초기화하여 다시 발생할 수 있도록 합니다
   * @chainable
   * @return {this}
   */
  __proto.resetNeedPanelHistory = function () {
    this._needPanelTriggered = {
      prev: false,
      next: false
    };
    return this;
  };
  /**
   * Apply "transform" style with the current position to camera element
   * @ko 현재 위치를 기준으로한 transform 스타일을 카메라 엘리먼트에 적용합니다.
   * @return {this}
   */
  __proto.applyTransform = function () {
    var el = this._el;
    var flicking = getFlickingAttached(this._flicking);
    var renderer = flicking.renderer;
    if (renderer.rendering || !flicking.initialized) return this;
    var actualPosition = this._position - this._alignPos - this._offset + this._circularOffset;
    el.style[this._transform] = flicking.horizontal ? "translate(" + -actualPosition + "px)" : "translate(0, " + -actualPosition + "px)";
    return this;
  };
  __proto._resetInternalValues = function () {
    this._position = 0;
    this._alignPos = 0;
    this._offset = 0;
    this._circularOffset = 0;
    this._circularEnabled = false;
    this._range = {
      min: 0,
      max: 0
    };
    this._visiblePanels = [];
    this._anchors = [];
    this._needPanelTriggered = {
      prev: false,
      next: false
    };
  };
  __proto._refreshVisiblePanels = function () {
    var _this = this;
    var flicking = getFlickingAttached(this._flicking);
    var panels = flicking.renderer.panels;
    var newVisiblePanels = panels.filter(function (panel) {
      return _this.canSee(panel);
    });
    var prevVisiblePanels = this._visiblePanels;
    this._visiblePanels = newVisiblePanels;
    var added = newVisiblePanels.filter(function (panel) {
      return !includes(prevVisiblePanels, panel);
    });
    var removed = prevVisiblePanels.filter(function (panel) {
      return !includes(newVisiblePanels, panel);
    });
    if (added.length > 0 || removed.length > 0) {
      void flicking.renderer.render().then(function () {
        flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.VISIBLE_CHANGE, {
          added: added,
          removed: removed,
          visiblePanels: newVisiblePanels
        }));
      });
    }
  };
  __proto._checkNeedPanel = function () {
    var needPanelTriggered = this._needPanelTriggered;
    if (needPanelTriggered.prev && needPanelTriggered.next) return;
    var flicking = getFlickingAttached(this._flicking);
    var panels = flicking.renderer.panels;
    if (panels.length <= 0) {
      if (!needPanelTriggered.prev) {
        flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.NEED_PANEL, {
          direction: DIRECTION.PREV
        }));
        needPanelTriggered.prev = true;
      }
      if (!needPanelTriggered.next) {
        flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.NEED_PANEL, {
          direction: DIRECTION.NEXT
        }));
        needPanelTriggered.next = true;
      }
      return;
    }
    var cameraPosition = this._position;
    var cameraSize = this.size;
    var cameraRange = this._range;
    var needPanelThreshold = flicking.needPanelThreshold;
    var cameraPrev = cameraPosition - this._alignPos;
    var cameraNext = cameraPrev + cameraSize;
    var firstPanel = panels[0];
    var lastPanel = panels[panels.length - 1];
    if (!needPanelTriggered.prev) {
      var firstPanelPrev = firstPanel.range.min;
      if (cameraPrev <= firstPanelPrev + needPanelThreshold || cameraPosition <= cameraRange.min + needPanelThreshold) {
        flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.NEED_PANEL, {
          direction: DIRECTION.PREV
        }));
        needPanelTriggered.prev = true;
      }
    }
    if (!needPanelTriggered.next) {
      var lastPanelNext = lastPanel.range.max;
      if (cameraNext >= lastPanelNext - needPanelThreshold || cameraPosition >= cameraRange.max - needPanelThreshold) {
        flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.NEED_PANEL, {
          direction: DIRECTION.NEXT
        }));
        needPanelTriggered.next = true;
      }
    }
  };
  __proto._checkReachEnd = function (prevPos, newPos) {
    var flicking = getFlickingAttached(this._flicking);
    var range = this._range;
    var wasBetweenRange = prevPos > range.min && prevPos < range.max;
    var isBetweenRange = newPos > range.min && newPos < range.max;
    if (!wasBetweenRange || isBetweenRange) return;
    var direction = newPos <= range.min ? DIRECTION.PREV : DIRECTION.NEXT;
    flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.REACH_EDGE, {
      direction: direction
    }));
  };
  __proto._updateMode = function () {
    var flicking = getFlickingAttached(this._flicking);
    if (flicking.circular) {
      var circularMode = new CircularCameraMode(flicking);
      var canSetCircularMode = circularMode.checkAvailability();
      if (canSetCircularMode) {
        this._mode = circularMode;
      } else {
        var fallbackMode = flicking.circularFallback;
        this._mode = fallbackMode === CIRCULAR_FALLBACK.BOUND ? new BoundCameraMode(flicking) : new LinearCameraMode(flicking);
      }
      this._circularEnabled = canSetCircularMode;
    } else {
      this._mode = flicking.bound ? new BoundCameraMode(flicking) : new LinearCameraMode(flicking);
      this._circularEnabled = false;
    }
  };
  __proto._togglePanels = function (prevPos, pos) {
    if (pos === prevPos) return false;
    var flicking = getFlickingAttached(this._flicking);
    var panels = flicking.renderer.panels;
    var toggled = panels.map(function (panel) {
      return panel.toggle(prevPos, pos);
    });
    return toggled.some(function (isToggled) {
      return isToggled;
    });
  };
  return Camera;
}();

/**
 * A component that manages {@link Panel} and its elements
 * @ko {@link Panel}과 그 엘리먼트들을 관리하는 컴포넌트
 */
var Renderer = /*#__PURE__*/function () {
  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {Constants.ALIGN | string | number} [options.align="center"] An {@link Flicking#align align} value that will be applied to all panels<ko>전체 패널에 적용될 {@link Flicking#align align} 값</ko>
   * @param {object} [options.strategy] An instance of RenderingStrategy(internal module)<ko>RenderingStrategy의 인스턴스(내부 모듈)</ko>
   */
  function Renderer(_a) {
    var _b = _a.align,
      align = _b === void 0 ? ALIGN.CENTER : _b,
      strategy = _a.strategy;
    this._flicking = null;
    this._panels = [];
    this._rendering = false;
    // Bind options
    this._align = align;
    this._strategy = strategy;
  }
  var __proto = Renderer.prototype;
  Object.defineProperty(__proto, "panels", {
    // Internal states Getter
    /**
     * Array of panels
     * @ko 전체 패널들의 배열
     * @type {Panel[]}
     * @readonly
     * @see Panel
     */
    get: function () {
      return this._panels;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "rendering", {
    /**
     * A boolean value indicating whether rendering is in progress
     * @ko 현재 렌더링이 시작되어 끝나기 전까지의 상태인지의 여부
     * @type {boolean}
     * @readonly
     * @internal
     */
    get: function () {
      return this._rendering;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panelCount", {
    /**
     * Count of panels
     * @ko 전체 패널의 개수
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._panels.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "strategy", {
    /**
     * @internal
     */
    get: function () {
      return this._strategy;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "align", {
    // Options Getter
    /**
     * A {@link Panel}'s {@link Panel#align align} value that applied to all panels
     * @ko {@link Panel}에 공통적으로 적용할 {@link Panel#align align} 값
     * @type {Constants.ALIGN | string | number}
     */
    get: function () {
      return this._align;
    },
    // Options Setter
    set: function (val) {
      this._align = val;
      var panelAlign = parsePanelAlign(val);
      this._panels.forEach(function (panel) {
        panel.align = panelAlign;
      });
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize Renderer
   * @ko Renderer를 초기화합니다
   * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
   * @chainable
   * @return {this}
   */
  __proto.init = function (flicking) {
    this._flicking = flicking;
    this._collectPanels();
    return this;
  };
  /**
   * Destroy Renderer and return to initial state
   * @ko Renderer를 초기 상태로 되돌립니다
   * @return {void}
   */
  __proto.destroy = function () {
    this._flicking = null;
    this._panels = [];
  };
  /**
   * Return the {@link Panel} at the given index. `null` if it doesn't exists.
   * @ko 주어진 인덱스에 해당하는 {@link Panel}을 반환합니다. 주어진 인덱스에 해당하는 패널이 존재하지 않을 경우 `null`을 반환합니다.
   * @return {Panel | null} Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>
   * @see Panel
   */
  __proto.getPanel = function (index) {
    return this._panels[index] || null;
  };
  __proto.forceRenderAllPanels = function () {
    this._panels.forEach(function (panel) {
      return panel.markForShow();
    });
    return Promise.resolve();
  };
  /**
   * Update all panel sizes
   * @ko 모든 패널의 크기를 업데이트합니다
   * @chainable
   * @return {this}
   */
  __proto.updatePanelSize = function () {
    var flicking = getFlickingAttached(this._flicking);
    var panels = this._panels;
    if (panels.length <= 0) return this;
    if (flicking.panelsPerView > 0) {
      var firstPanel = panels[0];
      firstPanel.resize();
      this._updatePanelSizeByGrid(firstPanel, panels);
    } else {
      flicking.panels.forEach(function (panel) {
        return panel.resize();
      });
    }
    return this;
  };
  /**
   * Insert new panels at given index
   * This will increase index of panels after by the number of panels added
   * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
   * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
   * @param {Array<object>} items An array of items to insert<ko>추가할 아이템들의 배열</ko>
   * @param {number} [items.index] Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
   * @param {any[]} [items.elements] An array of element or framework component with element in it<ko>엘리먼트의 배열 혹은 프레임워크에서 엘리먼트를 포함한 컴포넌트들의 배열</ko>
   * @param {boolean} [items.hasDOMInElements] Whether it contains actual DOM elements. If set to true, renderer will add them to the camera element<ko>내부에 실제 DOM 엘리먼트들을 포함하고 있는지 여부. true로 설정할 경우, 렌더러는 해당 엘리먼트들을 카메라 엘리먼트 내부에 추가합니다</ko>
   * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
   */
  __proto.batchInsert = function () {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }
    var allPanelsInserted = this.batchInsertDefer.apply(this, flicking_esm_spread(items));
    if (allPanelsInserted.length <= 0) return [];
    this.updateAfterPanelChange(allPanelsInserted, []);
    return allPanelsInserted;
  };
  /**
   * Defers update
   * camera position & others will be updated after calling updateAfterPanelChange
   * @internal
   */
  __proto.batchInsertDefer = function () {
    var _this = this;
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }
    var panels = this._panels;
    var flicking = getFlickingAttached(this._flicking);
    var prevFirstPanel = panels[0];
    var align = parsePanelAlign(this._align);
    var allPanelsInserted = items.reduce(function (addedPanels, item) {
      var _a;
      var insertingIdx = getMinusCompensatedIndex(item.index, panels.length);
      var panelsPushed = panels.slice(insertingIdx);
      var panelsInserted = item.elements.map(function (el, idx) {
        return _this._createPanel(el, {
          index: insertingIdx + idx,
          align: align,
          flicking: flicking
        });
      });
      panels.splice.apply(panels, flicking_esm_spread([insertingIdx, 0], panelsInserted));
      if (item.hasDOMInElements) {
        // Insert the actual elements as camera element's children
        _this._insertPanelElements(panelsInserted, (_a = panelsPushed[0]) !== null && _a !== void 0 ? _a : null);
      }
      // Resize the newly added panels
      if (flicking.panelsPerView > 0) {
        var firstPanel = prevFirstPanel || panelsInserted[0].resize();
        _this._updatePanelSizeByGrid(firstPanel, panelsInserted);
      } else {
        panelsInserted.forEach(function (panel) {
          return panel.resize();
        });
      }
      // Update panel indexes & positions
      panelsPushed.forEach(function (panel) {
        panel.increaseIndex(panelsInserted.length);
        panel.updatePosition();
      });
      return flicking_esm_spread(addedPanels, panelsInserted);
    }, []);
    return allPanelsInserted;
  };
  /**
   * Remove the panel at the given index
   * This will decrease index of panels after by the number of panels removed
   * @ko 주어진 인덱스의 패널을 제거합니다
   * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
   * @param {Array<object>} items An array of items to remove<ko>제거할 아이템들의 배열</ko>
   * @param {number} [items.index] Index of panel to remove<ko>제거할 패널의 인덱스</ko>
   * @param {number} [items.deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
   * @param {boolean} [items.hasDOMInElements=1] Whether it contains actual DOM elements. If set to true, renderer will remove them from the camera element<ko>내부에 실제 DOM 엘리먼트들을 포함하고 있는지 여부. true로 설정할 경우, 렌더러는 해당 엘리먼트들을 카메라 엘리먼트 내부에서 제거합니다</ko>
   * @return An array of removed panels<ko>제거된 패널들의 배열</ko>
   */
  __proto.batchRemove = function () {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }
    var allPanelsRemoved = this.batchRemoveDefer.apply(this, flicking_esm_spread(items));
    if (allPanelsRemoved.length <= 0) return [];
    this.updateAfterPanelChange([], allPanelsRemoved);
    return allPanelsRemoved;
  };
  /**
   * Defers update
   * camera position & others will be updated after calling updateAfterPanelChange
   * @internal
   */
  __proto.batchRemoveDefer = function () {
    var _this = this;
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }
    var panels = this._panels;
    var flicking = getFlickingAttached(this._flicking);
    var control = flicking.control;
    var activePanel = control.activePanel;
    var allPanelsRemoved = items.reduce(function (removed, item) {
      var index = item.index,
        deleteCount = item.deleteCount;
      var removingIdx = getMinusCompensatedIndex(index, panels.length);
      var panelsPulled = panels.slice(removingIdx + deleteCount);
      var panelsRemoved = panels.splice(removingIdx, deleteCount);
      if (panelsRemoved.length <= 0) return [];
      // Update panel indexes & positions
      panelsPulled.forEach(function (panel) {
        panel.decreaseIndex(panelsRemoved.length);
        panel.updatePosition();
      });
      if (item.hasDOMInElements) {
        _this._removePanelElements(panelsRemoved);
      }
      // Remove panel elements
      panelsRemoved.forEach(function (panel) {
        return panel.destroy();
      });
      if (includes(panelsRemoved, activePanel)) {
        control.resetActive();
      }
      return flicking_esm_spread(removed, panelsRemoved);
    }, []);
    return allPanelsRemoved;
  };
  /**
   * @internal
   */
  __proto.updateAfterPanelChange = function (panelsAdded, panelsRemoved) {
    var _a;
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera,
      control = flicking.control;
    var panels = this._panels;
    var activePanel = control.activePanel;
    // Update camera & control
    this._updateCameraAndControl();
    void this.render();
    if (!flicking.animating) {
      if (!activePanel || activePanel.removed) {
        if (panels.length <= 0) {
          // All panels removed
          camera.lookAt(0);
        } else {
          var targetIndex = (_a = activePanel === null || activePanel === void 0 ? void 0 : activePanel.index) !== null && _a !== void 0 ? _a : 0;
          if (targetIndex > panels.length - 1) {
            targetIndex = panels.length - 1;
          }
          void control.moveToPanel(panels[targetIndex], {
            duration: 0
          }).catch(function () {
            return void 0;
          });
        }
      } else {
        void control.moveToPanel(activePanel, {
          duration: 0
        }).catch(function () {
          return void 0;
        });
      }
    }
    flicking.camera.updateOffset();
    if (panelsAdded.length > 0 || panelsRemoved.length > 0) {
      flicking.trigger(new ComponentEvent$1(flicking_esm_EVENTS.PANEL_CHANGE, {
        added: panelsAdded,
        removed: panelsRemoved
      }));
      this.checkPanelContentsReady(flicking_esm_spread(panelsAdded, panelsRemoved));
    }
  };
  /**
   * @internal
   */
  __proto.checkPanelContentsReady = function (checkingPanels) {
    var _this = this;
    var flicking = getFlickingAttached(this._flicking);
    var resizeOnContentsReady = flicking.resizeOnContentsReady;
    var panels = this._panels;
    if (!resizeOnContentsReady || flicking.virtualEnabled) return;
    var hasContents = function (panel) {
      return panel.element && !!panel.element.querySelector("img, video");
    };
    checkingPanels = checkingPanels.filter(function (panel) {
      return hasContents(panel);
    });
    if (checkingPanels.length <= 0) return;
    var contentsReadyChecker = new imready_esm();
    checkingPanels.forEach(function (panel) {
      panel.loading = true;
    });
    contentsReadyChecker.on("readyElement", function (e) {
      if (!_this._flicking) {
        // Renderer's destroy() is called before
        contentsReadyChecker.destroy();
        return;
      }
      var panel = checkingPanels[e.index];
      var camera = flicking.camera;
      var control = flicking.control;
      var prevProgressInPanel = control.activePanel ? camera.getProgressInPanel(control.activePanel) : 0;
      panel.loading = false;
      panel.resize();
      panels.slice(panel.index + 1).forEach(function (panelBehind) {
        return panelBehind.updatePosition();
      });
      if (!flicking.initialized) return;
      camera.updateRange();
      camera.updateOffset();
      camera.updateAnchors();
      if (control.animating) ;else {
        control.updatePosition(prevProgressInPanel);
        control.updateInput();
      }
    });
    contentsReadyChecker.on("preReady", function (e) {
      if (_this._flicking) {
        void _this.render();
      }
      if (e.readyCount === e.totalCount) {
        contentsReadyChecker.destroy();
      }
    });
    contentsReadyChecker.on("ready", function () {
      if (_this._flicking) {
        void _this.render();
      }
      contentsReadyChecker.destroy();
    });
    contentsReadyChecker.check(checkingPanels.map(function (panel) {
      return panel.element;
    }));
  };
  __proto._updateCameraAndControl = function () {
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera,
      control = flicking.control;
    camera.updateRange();
    camera.updateOffset();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();
  };
  __proto._showOnlyVisiblePanels = function (flicking) {
    var panels = flicking.renderer.panels;
    var camera = flicking.camera;
    var visibleIndexes = camera.visiblePanels.reduce(function (visibles, panel) {
      visibles[panel.index] = true;
      return visibles;
    }, {});
    panels.forEach(function (panel) {
      if (panel.index in visibleIndexes || panel.loading) {
        panel.markForShow();
      } else if (!flicking.holding) {
        // During the input sequence,
        // Do not remove panel elements as it won't trigger touchend event.
        panel.markForHide();
      }
    });
  };
  __proto._updatePanelSizeByGrid = function (referencePanel, panels) {
    var flicking = getFlickingAttached(this._flicking);
    var panelsPerView = flicking.panelsPerView;
    if (panelsPerView <= 0) {
      throw new FlickingError(MESSAGE.WRONG_OPTION("panelsPerView", panelsPerView), CODE.WRONG_OPTION);
    }
    if (panels.length <= 0) return;
    var viewportSize = flicking.camera.size;
    var gap = referencePanel.margin.prev + referencePanel.margin.next;
    var panelSize = (viewportSize - gap * (panelsPerView - 1)) / panelsPerView;
    var panelSizeObj = flicking.horizontal ? {
      width: panelSize
    } : {
      height: panelSize
    };
    var firstPanelSizeObj = flicking_esm_assign({
      size: panelSize,
      margin: referencePanel.margin
    }, !flicking.horizontal && {
      height: referencePanel.height
    });
    if (!flicking.noPanelStyleOverride) {
      this._strategy.updatePanelSizes(flicking, panelSizeObj);
    }
    flicking.panels.forEach(function (panel) {
      return panel.resize(firstPanelSizeObj);
    });
  };
  __proto._removeAllChildsFromCamera = function () {
    var flicking = getFlickingAttached(this._flicking);
    var cameraElement = flicking.camera.element;
    // Remove other elements
    while (cameraElement.firstChild) {
      cameraElement.removeChild(cameraElement.firstChild);
    }
  };
  __proto._insertPanelElements = function (panels, nextSibling) {
    if (nextSibling === void 0) {
      nextSibling = null;
    }
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    var cameraElement = camera.element;
    var nextSiblingElement = (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.element) || null;
    var fragment = document.createDocumentFragment();
    panels.forEach(function (panel) {
      return fragment.appendChild(panel.element);
    });
    cameraElement.insertBefore(fragment, nextSiblingElement);
  };
  __proto._removePanelElements = function (panels) {
    var flicking = getFlickingAttached(this._flicking);
    var cameraElement = flicking.camera.element;
    panels.forEach(function (panel) {
      cameraElement.removeChild(panel.element);
    });
  };
  __proto._afterRender = function () {
    var flicking = getFlickingAttached(this._flicking);
    flicking.camera.applyTransform();
  };
  return Renderer;
}();

/**
 *
 */
var VanillaRenderer = /*#__PURE__*/function (_super) {
  flicking_esm_extends(VanillaRenderer, _super);
  function VanillaRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  var __proto = VanillaRenderer.prototype;
  __proto.render = function () {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, strategy;
      return __generator(this, function (_a) {
        flicking = getFlickingAttached(this._flicking);
        strategy = this._strategy;
        strategy.updateRenderingPanels(flicking);
        strategy.renderPanels(flicking);
        this._resetPanelElementOrder();
        this._afterRender();
        return [2 /*return*/];
      });
    });
  };

  __proto._collectPanels = function () {
    var flicking = getFlickingAttached(this._flicking);
    var camera = flicking.camera;
    this._removeAllTextNodes();
    this._panels = this._strategy.collectPanels(flicking, camera.children);
  };
  __proto._createPanel = function (el, options) {
    return this._strategy.createPanel(el, options);
  };
  __proto._resetPanelElementOrder = function () {
    var flicking = getFlickingAttached(this._flicking);
    var cameraEl = flicking.camera.element;
    // We're using reversed panels here as last panel should be the last element of camera element
    var reversedElements = this._strategy.getRenderingElementsByOrder(flicking).reverse();
    reversedElements.forEach(function (el, idx) {
      var nextEl = reversedElements[idx - 1] ? reversedElements[idx - 1] : null;
      if (el.nextElementSibling !== nextEl) {
        cameraEl.insertBefore(el, nextEl);
      }
    });
  };
  __proto._removeAllTextNodes = function () {
    var flicking = getFlickingAttached(this._flicking);
    var cameraElement = flicking.camera.element;
    // Remove all text nodes in the camera element
    flicking_esm_toArray(cameraElement.childNodes).forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        cameraElement.removeChild(node);
      }
    });
  };
  return VanillaRenderer;
}(Renderer);

/**
 * @internal
 */
var ExternalRenderer = /*#__PURE__*/function (_super) {
  flicking_esm_extends(ExternalRenderer, _super);
  function ExternalRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /* eslint-disable @typescript-eslint/no-unused-vars */
  var __proto = ExternalRenderer.prototype;
  __proto._removePanelElements = function (panels) {
    // DO NOTHING, overrided to prevent an unexpected error
  };
  __proto._removeAllChildsFromCamera = function () {
    // DO NOTHING, overrided to prevent an unexpected error
  };
  return ExternalRenderer;
}(Renderer);

/**
 * A slide data component that holds information of a single HTMLElement
 * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
 */
var Panel = /*#__PURE__*/function () {
  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
   * @param {Flicking} [options.elementProvider] A provider instance that redirects elements<ko>실제 엘리먼트를 반환하는 엘리먼트 공급자의 인스턴스</ko>
   */
  function Panel(_a) {
    var index = _a.index,
      align = _a.align,
      flicking = _a.flicking,
      elementProvider = _a.elementProvider;
    this._index = index;
    this._flicking = flicking;
    this._elProvider = elementProvider;
    this._align = align;
    this._removed = false;
    this._rendered = true;
    this._loading = false;
    this._resetInternalStates();
  }
  var __proto = Panel.prototype;
  Object.defineProperty(__proto, "element", {
    // Internal States Getter
    /**
     * `HTMLElement` that panel's referencing
     * @ko 패널이 참조하고 있는 `HTMLElement`
     * @type {HTMLElement}
     * @readonly
     */
    get: function () {
      return this._elProvider.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "elementProvider", {
    /**
     * @internal
     * @readonly
     */
    get: function () {
      return this._elProvider;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "index", {
    /**
     * Index of the panel
     * @ko 패널의 인덱스
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._index;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "position", {
    /**
     * Position of the panel, including {@link Panel#alignPosition alignPosition}
     * @ko 패널의 현재 좌표, {@link Panel#alignPosition alignPosition}을 포함하고 있습니다
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._pos + this._alignPos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "size", {
    /**
     * Cached size of the panel element
     * This is equal to {@link Panel#element element}'s `offsetWidth` if {@link Flicking#horizontal horizontal} is `true`, and `offsetHeight` else
     * @ko 패널 엘리먼트의 캐시된 크기
     * 이 값은 {@link Flicking#horizontal horizontal}이 `true`일 경우 {@link Panel#element element}의 `offsetWidth`와 동일하고, `false`일 경우 `offsetHeight`와 동일합니다
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._size;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "sizeIncludingMargin", {
    /**
     * Panel's size including CSS `margin`
     * This value includes {@link Panel#element element}'s margin left/right if {@link Flicking#horizontal horizontal} is `true`, and margin top/bottom else
     * @ko CSS `margin`을 포함한 패널의 크기
     * 이 값은 {@link Flicking#horizontal horizontal}이 `true`일 경우 margin left/right을 포함하고, `false`일 경우 margin top/bottom을 포함합니다
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._size + this._margin.prev + this._margin.next;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "height", {
    /**
     * Height of the panel element
     * @ko 패널 엘리먼트의 높이
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._height;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "margin", {
    /**
     * Cached CSS `margin` value of the panel element
     * @ko 패널 엘리먼트의 CSS `margin` 값
     * @type {object}
     * @property {number} prev CSS `margin-left` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-top` else
     * <ko>{@link Flicking#horizontal horizontal}이 `true`일 경우 `margin-left`, `false`일 경우 `margin-top`에 해당하는 값</ko>
     * @property {number} next CSS `margin-right` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-bottom` else
     * <ko>{@link Flicking#horizontal horizontal}이 `true`일 경우 `margin-right`, `false`일 경우 `margin-bottom`에 해당하는 값</ko>
     * @readonly
     */
    get: function () {
      return this._margin;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "alignPosition", {
    /**
     * Align position inside the panel where {@link Camera}'s {@link Camera#alignPosition alignPosition} inside viewport should be located at
     * @ko 패널의 정렬 기준 위치. {@link Camera}의 뷰포트 내에서의 {@link Camera#alignPosition alignPosition}이 위치해야 하는 곳입니다
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._alignPos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "removed", {
    /**
     * A value indicating whether the panel's {@link Flicking#remove remove}d
     * @ko 패널이 {@link Flicking#remove remove}되었는지 여부를 나타내는 값
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._removed;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "rendered", {
    /**
     * A value indicating whether the panel's element is being rendered on the screen
     * @ko 패널의 엘리먼트가 화면상에 렌더링되고있는지 여부를 나타내는 값
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._rendered;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "loading", {
    /**
     * A value indicating whether the panel's image/video is not loaded and waiting for resize
     * @ko 패널 내부의 이미지/비디오가 아직 로드되지 않아 {@link Panel#resize resize}될 것인지를 나타내는 값
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._loading;
    },
    set: function (val) {
      this._loading = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "range", {
    /**
     * Panel element's range of the bounding box
     * @ko 패널 엘리먼트의 Bounding box 범위
     * @type {object}
     * @property {number} [min] Bounding box's left({@link Flicking#horizontal horizontal}: true) / top({@link Flicking#horizontal horizontal}: false)
     * @property {number} [max] Bounding box's right({@link Flicking#horizontal horizontal}: true) / bottom({@link Flicking#horizontal horizontal}: false)
     * @readonly
     */
    get: function () {
      return {
        min: this._pos,
        max: this._pos + this._size
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "toggled", {
    /**
     * A value indicating whether the panel's position is toggled by circular behavior
     * @ko 패널의 위치가 circular 동작에 의해 토글되었는지 여부를 나타내는 값
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._toggled;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "toggleDirection", {
    /**
     * A direction where the panel's position is toggled
     * @ko 패널의 위치가 circular 동작에 의해 토글되는 방향
     * @type {DIRECTION}
     * @readonly
     */
    get: function () {
      return this._toggleDirection;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "offset", {
    /**
     * Actual position offset determined by {@link Panel#order}
     * @ko {@link Panel#order}에 의한 실제 위치 변경값
     * @type {number}
     * @readonly
     */
    get: function () {
      var toggleDirection = this._toggleDirection;
      var cameraRangeDiff = this._flicking.camera.rangeDiff;
      return toggleDirection === DIRECTION.NONE || !this._toggled ? 0 : toggleDirection === DIRECTION.PREV ? -cameraRangeDiff : cameraRangeDiff;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "progress", {
    /**
     * Progress of movement between previous or next panel relative to current panel
     * @ko 이 패널로부터 이전/다음 패널으로의 이동 진행률
     * @type {number}
     * @readonly
     */
    get: function () {
      var flicking = this._flicking;
      return this.index - flicking.camera.progress;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "outsetProgress", {
    /**
     * Progress of movement between points that panel is completely invisible outside of viewport(prev direction: -1, selected point: 0, next direction: 1)
     * @ko 현재 패널이 뷰포트 영역 밖으로 완전히 사라지는 지점을 기준으로 하는 진행도(prev방향: -1, 선택 지점: 0, next방향: 1)
     * @type {number}
     * @readonly
     */
    get: function () {
      var position = this.position + this.offset;
      var alignPosition = this._alignPos;
      var camera = this._flicking.camera;
      var camPos = camera.position;
      if (camPos === position) {
        return 0;
      }
      if (camPos < position) {
        var disappearPosNext = position + (camera.size - camera.alignPosition) + alignPosition;
        return -getProgress(camPos, position, disappearPosNext);
      } else {
        var disappearPosPrev = position - (camera.alignPosition + this._size - alignPosition);
        return 1 - getProgress(camPos, disappearPosPrev, position);
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "visibleRatio", {
    /**
     * Percentage of area where panel is visible in the viewport
     * @ko 뷰포트 안에서 패널이 보이는 영역의 비율
     * @type {number}
     * @readonly
     */
    get: function () {
      var range = this.range;
      var size = this._size;
      var offset = this.offset;
      var visibleRange = this._flicking.camera.visibleRange;
      var checkingRange = {
        min: range.min + offset,
        max: range.max + offset
      };
      if (checkingRange.max <= visibleRange.min || checkingRange.min >= visibleRange.max) {
        return 0;
      }
      var visibleSize = size;
      if (visibleRange.min > checkingRange.min) {
        visibleSize -= visibleRange.min - checkingRange.min;
      }
      if (visibleRange.max < checkingRange.max) {
        visibleSize -= checkingRange.max - visibleRange.max;
      }
      return visibleSize / size;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "align", {
    // Options Getter
    /**
     * A value indicating where the {@link Panel#alignPosition alignPosition} should be located at inside the panel element
     * @ko {@link Panel#alignPosition alignPosition}이 패널 내의 어디에 위치해야 하는지를 나타내는 값
     * @type {Constants.ALIGN | string | number}
     */
    get: function () {
      return this._align;
    },
    // Options Setter
    set: function (val) {
      this._align = val;
      this._updateAlignPos();
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Mark panel element to be appended on the camera element
   * @internal
   */
  __proto.markForShow = function () {
    this._rendered = true;
    this._elProvider.show(this._flicking);
  };
  /**
   * Mark panel element to be removed from the camera element
   * @internal
   */
  __proto.markForHide = function () {
    this._rendered = false;
    this._elProvider.hide(this._flicking);
  };
  /**
   * Update size of the panel
   * @ko 패널의 크기를 갱신합니다
   * @param {object} cached Predefined cached size of the panel<ko>사전에 캐시된 패널의 크기 정보</ko>
   * @chainable
   * @return {this}
   */
  __proto.resize = function (cached) {
    var _a;
    var el = this.element;
    var flicking = this._flicking;
    var horizontal = flicking.horizontal,
      useFractionalSize = flicking.useFractionalSize;
    if (cached) {
      this._size = cached.size;
      this._margin = flicking_esm_assign({}, cached.margin);
      this._height = (_a = cached.height) !== null && _a !== void 0 ? _a : getElementSize({
        el: el,
        horizontal: false,
        useFractionalSize: useFractionalSize,
        useOffset: true,
        style: getStyle(el)
      });
    } else {
      var elStyle = getStyle(el);
      this._size = getElementSize({
        el: el,
        horizontal: horizontal,
        useFractionalSize: useFractionalSize,
        useOffset: true,
        style: elStyle
      });
      this._margin = horizontal ? {
        prev: parseFloat(elStyle.marginLeft || "0"),
        next: parseFloat(elStyle.marginRight || "0")
      } : {
        prev: parseFloat(elStyle.marginTop || "0"),
        next: parseFloat(elStyle.marginBottom || "0")
      };
      this._height = horizontal ? getElementSize({
        el: el,
        horizontal: false,
        useFractionalSize: useFractionalSize,
        useOffset: true,
        style: elStyle
      }) : this._size;
    }
    this.updatePosition();
    this._updateAlignPos();
    return this;
  };
  /**
   * Change panel's size. This will change the actual size of the panel element by changing its CSS width/height property
   * @ko 패널 크기를 변경합니다. 패널 엘리먼트에 해당 크기의 CSS width/height를 적용합니다
   * @param {object} [size] New panel size<ko>새 패널 크기</ko>
   * @param {number|string} [size.width] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
   * @param {number|string} [size.height] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
   * @chainable
   * @return {this}
   */
  __proto.setSize = function (size) {
    setSize(this.element, size);
    return this;
  };
  /**
   * Check whether the given element is inside of this panel's {@link Panel#element element}
   * @ko 해당 엘리먼트가 이 패널의 {@link Panel#element element} 내에 포함되어 있는지를 반환합니다
   * @param {HTMLElement} element The HTMLElement to check<ko>확인하고자 하는 HTMLElement</ko>
   * @return {boolean} A Boolean value indicating the element is inside of this panel {@link Panel#element element}<ko>패널의 {@link Panel#element element}내에 해당 엘리먼트 포함 여부</ko>
   */
  __proto.contains = function (element) {
    var _a;
    return !!((_a = this.element) === null || _a === void 0 ? void 0 : _a.contains(element));
  };
  /**
   * Reset internal state and set {@link Panel#removed removed} to `true`
   * @ko 내부 상태를 초기화하고 {@link Panel#removed removed}를 `true`로 설정합니다.
   * @return {void}
   */
  __proto.destroy = function () {
    this._resetInternalStates();
    this._removed = true;
  };
  /**
   * Check whether the given position is inside of this panel's {@link Panel#range range}
   * @ko 주어진 좌표가 현재 패널의 {@link Panel#range range}내에 속해있는지를 반환합니다.
   * @param {number} pos A position to check<ko>확인하고자 하는 좌표</ko>
   * @param {boolean} [includeMargin=false] Include {@link Panel#margin margin} to the range<ko>패널 영역에 {@link Panel#margin margin}값을 포함시킵니다</ko>
   * @return {boolean} A Boolean value indicating whether the given position is included in the panel range<ko>해당 좌표가 패널 영역 내에 속해있는지 여부</ko>
   */
  __proto.includePosition = function (pos, includeMargin) {
    if (includeMargin === void 0) {
      includeMargin = false;
    }
    return this.includeRange(pos, pos, includeMargin);
  };
  /**
   * Check whether the given range is fully included in this panel's area (inclusive)
   * @ko 주어진 범위가 이 패널 내부에 완전히 포함되는지를 반환합니다
   * @param {number} min Minimum value of the range to check<ko>확인하고자 하는 최소 범위</ko>
   * @param {number} max Maximum value of the range to check<ko>확인하고자 하는 최대 범위</ko>
   * @param {boolean} [includeMargin=false] Include {@link Panel#margin margin} to the range<ko>패널 영역에 {@link Panel#margin margin}값을 포함시킵니다</ko>
   * @returns {boolean} A Boolean value indicating whether the given range is fully included in the panel range<ko>해당 범위가 패널 영역 내에 완전히 속해있는지 여부</ko>
   */
  __proto.includeRange = function (min, max, includeMargin) {
    if (includeMargin === void 0) {
      includeMargin = false;
    }
    var margin = this._margin;
    var panelRange = this.range;
    if (includeMargin) {
      panelRange.min -= margin.prev;
      panelRange.max += margin.next;
    }
    return max >= panelRange.min && min <= panelRange.max;
  };
  /**
   * Check whether the panel is visble in the given range (exclusive)
   * @ko 주어진 범위 내에서 이 패널의 일부가 보여지는지를 반환합니다
   * @param {number} min Minimum value of the range to check<ko>확인하고자 하는 최소 범위</ko>
   * @param {number} max Maximum value of the range to check<ko>확인하고자 하는 최대 범위</ko>
   * @returns {boolean} A Boolean value indicating whether the panel is visible<ko>해당 범위 내에서 패널을 볼 수 있는지 여부</ko>
   */
  __proto.isVisibleOnRange = function (min, max) {
    var panelRange = this.range;
    return max > panelRange.min && min < panelRange.max;
  };
  /**
   * Move {@link Camera} to this panel
   * @ko {@link Camera}를 이 패널로 이동합니다
   * @param {number} [duration] Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @returns {Promise<void>} A Promise which will be resolved after reaching the panel<ko>패널 도달시에 resolve되는 Promise</ko>
   */
  __proto.focus = function (duration) {
    return this._flicking.moveTo(this._index, duration);
  };
  /**
   * Get previous(`index - 1`) panel. When the previous panel does not exist, this will return `null` instead
   * If the {@link Flicking#circularEnabled circular} is enabled, this will return the last panel if called from the first panel
   * @ko 이전(`index - 1`) 패널을 반환합니다. 이전 패널이 없을 경우 `null`을 반환합니다
   * {@link Flicking#circularEnabled circular} 모드가 활성화되었을 때 첫번째 패널에서 이 메소드를 호출할 경우 마지막 패널을 반환합니다
   * @returns {Panel | null} The previous panel<ko>이전 패널</ko>
   */
  __proto.prev = function () {
    var index = this._index;
    var flicking = this._flicking;
    var renderer = flicking.renderer;
    var panelCount = renderer.panelCount;
    if (panelCount === 1) return null;
    return flicking.circularEnabled ? renderer.getPanel(index === 0 ? panelCount - 1 : index - 1) : renderer.getPanel(index - 1);
  };
  /**
   * Get next(`index + 1`) panel. When the next panel does not exist, this will return `null` instead
   * If the {@link Flicking#circularEnabled circular} is enabled, this will return the first panel if called from the last panel
   * @ko 다음(`index + 1`) 패널을 반환합니다. 다음 패널이 없을 경우 `null`을 반환합니다
   * {@link Flicking#circularEnabled circular} 모드가 활성화되었을 때 마지막 패널에서 이 메소드를 호출할 경우 첫번째 패널을 반환합니다
   * @returns {Panel | null} The previous panel<ko>다음 패널</ko>
   */
  __proto.next = function () {
    var index = this._index;
    var flicking = this._flicking;
    var renderer = flicking.renderer;
    var panelCount = renderer.panelCount;
    if (panelCount === 1) return null;
    return flicking.circularEnabled ? renderer.getPanel(index === panelCount - 1 ? 0 : index + 1) : renderer.getPanel(index + 1);
  };
  /**
   * Increase panel's index by the given value
   * @ko 패널의 인덱스를 주어진 값만큼 증가시킵니다
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
   * @returns {this}
   */
  __proto.increaseIndex = function (val) {
    this._index += Math.max(val, 0);
    return this;
  };
  /**
   * Decrease panel's index by the given value
   * @ko 패널의 인덱스를 주어진 값만큼 감소시킵니다
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
   * @returns {this}
   */
  __proto.decreaseIndex = function (val) {
    this._index -= Math.max(val, 0);
    return this;
  };
  /**
   * @internal
   */
  __proto.updatePosition = function () {
    var prevPanel = this._flicking.renderer.panels[this._index - 1];
    this._pos = prevPanel ? prevPanel.range.max + prevPanel.margin.next + this._margin.prev : this._margin.prev;
    return this;
  };
  /**
   * @internal
   * @return {boolean} toggled
   */
  __proto.toggle = function (prevPos, newPos) {
    var toggleDirection = this._toggleDirection;
    var togglePosition = this._togglePosition;
    if (toggleDirection === DIRECTION.NONE || newPos === prevPos) return false;
    var prevToggled = this._toggled;
    if (newPos > prevPos) {
      if (togglePosition >= prevPos && togglePosition <= newPos) {
        this._toggled = toggleDirection === DIRECTION.NEXT;
      }
    } else {
      if (togglePosition <= prevPos && togglePosition >= newPos) {
        this._toggled = toggleDirection !== DIRECTION.NEXT;
      }
    }
    return prevToggled !== this._toggled;
  };
  /**
   * @internal
   */
  __proto.updateCircularToggleDirection = function () {
    var flicking = this._flicking;
    if (!flicking.circularEnabled) {
      this._toggleDirection = DIRECTION.NONE;
      this._togglePosition = 0;
      this._toggled = false;
      return this;
    }
    var camera = flicking.camera;
    var camRange = camera.range;
    var camAlignPosition = camera.alignPosition;
    var camVisibleRange = camera.visibleRange;
    var camVisibleSize = camVisibleRange.max - camVisibleRange.min;
    var minimumVisible = camRange.min - camAlignPosition;
    var maximumVisible = camRange.max - camAlignPosition + camVisibleSize;
    var shouldBeVisibleAtMin = this.includeRange(maximumVisible - camVisibleSize, maximumVisible, false);
    var shouldBeVisibleAtMax = this.includeRange(minimumVisible, minimumVisible + camVisibleSize, false);
    this._toggled = false;
    if (shouldBeVisibleAtMin) {
      this._toggleDirection = DIRECTION.PREV;
      this._togglePosition = this.range.max + camRange.min - camRange.max + camAlignPosition;
      this.toggle(Infinity, camera.position);
    } else if (shouldBeVisibleAtMax) {
      this._toggleDirection = DIRECTION.NEXT;
      this._togglePosition = this.range.min + camRange.max - camVisibleSize + camAlignPosition;
      this.toggle(-Infinity, camera.position);
    } else {
      this._toggleDirection = DIRECTION.NONE;
      this._togglePosition = 0;
    }
    return this;
  };
  __proto._updateAlignPos = function () {
    this._alignPos = parseAlign$1(this._align, this._size);
  };
  __proto._resetInternalStates = function () {
    this._size = 0;
    this._pos = 0;
    this._margin = {
      prev: 0,
      next: 0
    };
    this._height = 0;
    this._alignPos = 0;
    this._toggled = false;
    this._togglePosition = 0;
    this._toggleDirection = DIRECTION.NONE;
  };
  return Panel;
}();
var NormalRenderingStrategy = /*#__PURE__*/function () {
  function NormalRenderingStrategy(_a) {
    var providerCtor = _a.providerCtor;
    this._providerCtor = providerCtor;
  }
  var __proto = NormalRenderingStrategy.prototype;
  __proto.renderPanels = function () {
    // DO_NOTHING
  };
  __proto.getRenderingIndexesByOrder = function (flicking) {
    var renderedPanels = flicking.renderer.panels.filter(function (panel) {
      return panel.rendered;
    });
    var toggledPrev = renderedPanels.filter(function (panel) {
      return panel.toggled && panel.toggleDirection === DIRECTION.PREV;
    });
    var toggledNext = renderedPanels.filter(function (panel) {
      return panel.toggled && panel.toggleDirection === DIRECTION.NEXT;
    });
    var notToggled = renderedPanels.filter(function (panel) {
      return !panel.toggled;
    });
    return flicking_esm_spread(toggledPrev, notToggled, toggledNext).map(function (panel) {
      return panel.index;
    });
  };
  __proto.getRenderingElementsByOrder = function (flicking) {
    var panels = flicking.panels;
    return this.getRenderingIndexesByOrder(flicking).map(function (index) {
      return panels[index].element;
    });
  };
  __proto.updateRenderingPanels = function (flicking) {
    if (flicking.renderOnlyVisible) {
      this._showOnlyVisiblePanels(flicking);
    } else {
      flicking.panels.forEach(function (panel) {
        return panel.markForShow();
      });
    }
  };
  __proto.collectPanels = function (flicking, elements) {
    var _this = this;
    var align = parsePanelAlign(flicking.renderer.align);
    return elements.map(function (el, index) {
      return new Panel({
        index: index,
        elementProvider: new _this._providerCtor(el),
        align: align,
        flicking: flicking
      });
    });
  };
  __proto.createPanel = function (element, options) {
    return new Panel(flicking_esm_assign(flicking_esm_assign({}, options), {
      elementProvider: new this._providerCtor(element)
    }));
  };
  __proto.updatePanelSizes = function (flicking, size) {
    flicking.panels.forEach(function (panel) {
      return panel.setSize(size);
    });
  };
  __proto._showOnlyVisiblePanels = function (flicking) {
    var panels = flicking.renderer.panels;
    var camera = flicking.camera;
    var visibleIndexes = camera.visiblePanels.reduce(function (visibles, panel) {
      visibles[panel.index] = true;
      return visibles;
    }, {});
    panels.forEach(function (panel) {
      if (panel.index in visibleIndexes || panel.loading) {
        panel.markForShow();
      } else if (!flicking.holding) {
        // During the input sequence,
        // Do not remove panel elements as it won't trigger touchend event.
        panel.markForHide();
      }
    });
    camera.updateOffset();
  };
  return NormalRenderingStrategy;
}();

/**
 * An slide data component that holds information of a single HTMLElement
 * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
 */
var VirtualPanel = /*#__PURE__*/function (_super) {
  flicking_esm_extends(VirtualPanel, _super);
  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
   */
  function VirtualPanel(options) {
    var _this = _super.call(this, options) || this;
    options.elementProvider.init(_this);
    _this._elProvider = options.elementProvider;
    _this._cachedInnerHTML = null;
    return _this;
  }
  var __proto = VirtualPanel.prototype;
  Object.defineProperty(__proto, "element", {
    /**
     * `HTMLElement` that panel's referencing
     * @ko 패널이 참조하고 있는 `HTMLElement`
     * @type {HTMLElement}
     * @readonly
     */
    get: function () {
      return this._elProvider.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "cachedInnerHTML", {
    /**
     * Cached innerHTML by the previous render function
     * @ko 이전 렌더링에서 캐시된 innerHTML 정보
     * @type {string|null}
     * @readonly
     */
    get: function () {
      return this._cachedInnerHTML;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "elementIndex", {
    /**
     * An number for indexing which element it will be rendered on
     * @ko 몇 번째 엘리먼트에 렌더링될 것인지를 나타내는 숫자
     * @type {number}
     * @readonly
     */
    get: function () {
      var flicking = this._flicking;
      var virtualElCount = flicking.panelsPerView + 1;
      var panelCount = flicking.panelCount;
      var index = this._index;
      if (this._toggled) {
        // To prevent element duplication
        index = this._toggleDirection === DIRECTION.NEXT ? index + panelCount : index - panelCount;
      }
      return circulateIndex(index, virtualElCount);
    },
    enumerable: false,
    configurable: true
  });
  __proto.cacheRenderResult = function (result) {
    this._cachedInnerHTML = result;
  };
  __proto.uncacheRenderResult = function () {
    this._cachedInnerHTML = null;
  };
  __proto.render = function () {
    var flicking = this._flicking;
    var _a = flicking.virtual,
      renderPanel = _a.renderPanel,
      cache = _a.cache;
    var element = this._elProvider.element;
    var newInnerHTML = this._cachedInnerHTML || renderPanel(this, this._index);
    if (newInnerHTML === element.innerHTML) return;
    element.innerHTML = newInnerHTML;
    if (cache) {
      this.cacheRenderResult(newInnerHTML);
    }
  };
  __proto.increaseIndex = function (val) {
    this.uncacheRenderResult();
    return _super.prototype.increaseIndex.call(this, val);
  };
  __proto.decreaseIndex = function (val) {
    this.uncacheRenderResult();
    return _super.prototype.decreaseIndex.call(this, val);
  };
  return VirtualPanel;
}(Panel);
var VirtualRenderingStrategy = /*#__PURE__*/function () {
  function VirtualRenderingStrategy() {}
  var __proto = VirtualRenderingStrategy.prototype;
  __proto.renderPanels = function (flicking) {
    var virtualManager = flicking.virtual;
    var visiblePanels = flicking.visiblePanels;
    var invisibleIndexes = range(flicking.panelsPerView + 1);
    visiblePanels.forEach(function (panel) {
      var elementIndex = panel.elementIndex;
      panel.render();
      virtualManager.show(elementIndex);
      invisibleIndexes[elementIndex] = -1;
    });
    invisibleIndexes.filter(function (val) {
      return val >= 0;
    }).forEach(function (idx) {
      virtualManager.hide(idx);
    });
  };
  __proto.getRenderingIndexesByOrder = function (flicking) {
    var virtualManager = flicking.virtual;
    var visiblePanels = flicking_esm_spread(flicking.visiblePanels).filter(function (panel) {
      return panel.rendered;
    }).sort(function (panel1, panel2) {
      return panel1.position + panel1.offset - (panel2.position + panel2.offset);
    });
    if (visiblePanels.length <= 0) return virtualManager.elements.map(function (_, idx) {
      return idx;
    });
    var visibleIndexes = visiblePanels.map(function (panel) {
      return panel.elementIndex;
    });
    var invisibleIndexes = virtualManager.elements.map(function (el, idx) {
      return flicking_esm_assign(flicking_esm_assign({}, el), {
        idx: idx
      });
    }).filter(function (el) {
      return !el.visible;
    }).map(function (el) {
      return el.idx;
    });
    return flicking_esm_spread(visibleIndexes, invisibleIndexes);
  };
  __proto.getRenderingElementsByOrder = function (flicking) {
    var virtualManager = flicking.virtual;
    var elements = virtualManager.elements;
    return this.getRenderingIndexesByOrder(flicking).map(function (index) {
      return elements[index].nativeElement;
    });
  };
  __proto.updateRenderingPanels = function (flicking) {
    var panels = flicking.renderer.panels;
    var camera = flicking.camera;
    var visibleIndexes = camera.visiblePanels.reduce(function (visibles, panel) {
      visibles[panel.index] = true;
      return visibles;
    }, {});
    panels.forEach(function (panel) {
      if (panel.index in visibleIndexes || panel.loading) {
        panel.markForShow();
      } else {
        panel.markForHide();
      }
    });
    camera.updateOffset();
  };
  __proto.collectPanels = function (flicking) {
    var align = parsePanelAlign(flicking.renderer.align);
    return range(flicking.virtual.initialPanelCount).map(function (index) {
      return new VirtualPanel({
        index: index,
        elementProvider: new VirtualElementProvider(flicking),
        align: align,
        flicking: flicking
      });
    });
  };
  __proto.createPanel = function (_el, options) {
    return new VirtualPanel(flicking_esm_assign(flicking_esm_assign({}, options), {
      elementProvider: new VirtualElementProvider(options.flicking)
    }));
  };
  __proto.updatePanelSizes = function (flicking, size) {
    flicking.virtual.elements.forEach(function (el) {
      setSize(el.nativeElement, size);
    });
    flicking.panels.forEach(function (panel) {
      return panel.setSize(size);
    });
  };
  return VirtualRenderingStrategy;
}();

/**
 * @extends Component
 * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
 * @requires {@link https://github.com/naver/egjs-component|@egjs/component}
 * @requires {@link https://github.com/naver/egjs-axes|@egjs/axes}
 */
var Flicking = /*#__PURE__*/function (_super) {
  flicking_esm_extends(Flicking, _super);
  /**
   * @param root A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string
   * <ko>Flicking을 초기화할 HTMLElement로, `string` 타입으로 지정시 css 선택자 문자열을 지정해야 합니다.</ko>
   * @param {object} [options={}] An options object for Flicking.<ko>Flicking에 적용할 옵션 오브젝트</ko>
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE WRONG_TYPE}|When the root is not either string or HTMLElement|
   * |{@link ERROR_CODE ELEMENT_NOT_FOUND}|When the element with given CSS selector does not exist|
   * <ko>
   *
   * |code|조건|
   * |---|---|
   * |{@link ERROR_CODE WRONG_TYPE}|루트 엘리먼트가 string이나 HTMLElement가 아닐 경우|
   * |{@link ERROR_CODE ELEMENT_NOT_FOUND}|주어진 CSS selector로 엘리먼트를 찾지 못했을 경우|
   *
   * </ko>
   * @example
   * ```ts
   * import Flicking from "@egjs/flicking";
   *
   * // Creating new instance of Flicking with HTMLElement
   * const flicking = new Flicking(document.querySelector(".flicking-viewport"), { circular: true });
   *
   * // Creating new instance of Flicking with CSS selector
   * const flicking2 = new Flicking(".flicking-viewport", { circular: true });
   * ```
   */
  function Flicking(root, _a) {
    var _b = _a === void 0 ? {} : _a,
      _c = _b.align,
      align = _c === void 0 ? ALIGN.CENTER : _c,
      _d = _b.defaultIndex,
      defaultIndex = _d === void 0 ? 0 : _d,
      _e = _b.horizontal,
      horizontal = _e === void 0 ? true : _e,
      _f = _b.circular,
      circular = _f === void 0 ? false : _f,
      _g = _b.circularFallback,
      circularFallback = _g === void 0 ? CIRCULAR_FALLBACK.LINEAR : _g,
      _h = _b.bound,
      bound = _h === void 0 ? false : _h,
      _j = _b.adaptive,
      adaptive = _j === void 0 ? false : _j,
      _k = _b.panelsPerView,
      panelsPerView = _k === void 0 ? -1 : _k,
      _l = _b.noPanelStyleOverride,
      noPanelStyleOverride = _l === void 0 ? false : _l,
      _m = _b.resizeOnContentsReady,
      resizeOnContentsReady = _m === void 0 ? false : _m,
      _o = _b.nested,
      nested = _o === void 0 ? false : _o,
      _p = _b.needPanelThreshold,
      needPanelThreshold = _p === void 0 ? 0 : _p,
      _q = _b.preventEventsBeforeInit,
      preventEventsBeforeInit = _q === void 0 ? true : _q,
      _r = _b.deceleration,
      deceleration = _r === void 0 ? 0.0075 : _r,
      _s = _b.duration,
      duration = _s === void 0 ? 500 : _s,
      _t = _b.easing,
      easing = _t === void 0 ? function (x) {
        return 1 - Math.pow(1 - x, 3);
      } : _t,
      _u = _b.inputType,
      inputType = _u === void 0 ? ["mouse", "touch"] : _u,
      _v = _b.moveType,
      moveType = _v === void 0 ? "snap" : _v,
      _w = _b.threshold,
      threshold = _w === void 0 ? 40 : _w,
      _x = _b.interruptable,
      interruptable = _x === void 0 ? true : _x,
      _y = _b.bounce,
      bounce = _y === void 0 ? "20%" : _y,
      _z = _b.iOSEdgeSwipeThreshold,
      iOSEdgeSwipeThreshold = _z === void 0 ? 30 : _z,
      _0 = _b.preventClickOnDrag,
      preventClickOnDrag = _0 === void 0 ? true : _0,
      _1 = _b.disableOnInit,
      disableOnInit = _1 === void 0 ? false : _1,
      _2 = _b.changeOnHold,
      changeOnHold = _2 === void 0 ? false : _2,
      _3 = _b.renderOnlyVisible,
      renderOnlyVisible = _3 === void 0 ? false : _3,
      _4 = _b.virtual,
      virtual = _4 === void 0 ? null : _4,
      _5 = _b.autoInit,
      autoInit = _5 === void 0 ? true : _5,
      _6 = _b.autoResize,
      autoResize = _6 === void 0 ? true : _6,
      _7 = _b.useResizeObserver,
      useResizeObserver = _7 === void 0 ? true : _7,
      _8 = _b.resizeDebounce,
      resizeDebounce = _8 === void 0 ? 0 : _8,
      _9 = _b.maxResizeDebounce,
      maxResizeDebounce = _9 === void 0 ? 100 : _9,
      _10 = _b.useFractionalSize,
      useFractionalSize = _10 === void 0 ? false : _10,
      _11 = _b.externalRenderer,
      externalRenderer = _11 === void 0 ? null : _11,
      _12 = _b.renderExternal,
      renderExternal = _12 === void 0 ? null : _12;
    var _this = _super.call(this) || this;
    // Internal states
    _this._initialized = false;
    _this._plugins = [];
    // Bind options
    _this._align = align;
    _this._defaultIndex = defaultIndex;
    _this._horizontal = horizontal;
    _this._circular = circular;
    _this._circularFallback = circularFallback;
    _this._bound = bound;
    _this._adaptive = adaptive;
    _this._panelsPerView = panelsPerView;
    _this._noPanelStyleOverride = noPanelStyleOverride;
    _this._resizeOnContentsReady = resizeOnContentsReady;
    _this._nested = nested;
    _this._virtual = virtual;
    _this._needPanelThreshold = needPanelThreshold;
    _this._preventEventsBeforeInit = preventEventsBeforeInit;
    _this._deceleration = deceleration;
    _this._duration = duration;
    _this._easing = easing;
    _this._inputType = inputType;
    _this._moveType = moveType;
    _this._threshold = threshold;
    _this._interruptable = interruptable;
    _this._bounce = bounce;
    _this._iOSEdgeSwipeThreshold = iOSEdgeSwipeThreshold;
    _this._preventClickOnDrag = preventClickOnDrag;
    _this._disableOnInit = disableOnInit;
    _this._changeOnHold = changeOnHold;
    _this._renderOnlyVisible = renderOnlyVisible;
    _this._autoInit = autoInit;
    _this._autoResize = autoResize;
    _this._useResizeObserver = useResizeObserver;
    _this._resizeDebounce = resizeDebounce;
    _this._maxResizeDebounce = maxResizeDebounce;
    _this._useFractionalSize = useFractionalSize;
    _this._externalRenderer = externalRenderer;
    _this._renderExternal = renderExternal;
    // Create core components
    _this._viewport = new Viewport(_this, getElement(root));
    _this._autoResizer = new AutoResizer(_this);
    _this._renderer = _this._createRenderer();
    _this._camera = _this._createCamera();
    _this._control = _this._createControl();
    _this._virtualManager = new VirtualManager(_this, virtual);
    if (_this._autoInit) {
      void _this.init();
    }
    return _this;
  }
  var __proto = Flicking.prototype;
  Object.defineProperty(__proto, "control", {
    // Components
    /**
     * {@link Control} instance of the Flicking
     * @ko 현재 Flicking에 활성화된 {@link Control} 인스턴스
     * @type {Control}
     * @default SnapControl
     * @readonly
     * @see Control
     * @see SnapControl
     * @see FreeControl
     */
    get: function () {
      return this._control;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "camera", {
    /**
     * {@link Camera} instance of the Flicking
     * @ko 현재 Flicking에 활성화된 {@link Camera} 인스턴스
     * @type {Camera}
     * @default LinearCamera
     * @readonly
     * @see Camera
     * @see LinearCamera
     * @see BoundCamera
     * @see CircularCamera
     */
    get: function () {
      return this._camera;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "renderer", {
    /**
     * {@link Renderer} instance of the Flicking
     * @ko 현재 Flicking에 활성화된 {@link Renderer} 인스턴스
     * @type {Renderer}
     * @default VanillaRenderer
     * @readonly
     * @see Renderer
     * @see VanillaRenderer
     * @see ExternalRenderer
     */
    get: function () {
      return this._renderer;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "viewport", {
    /**
     * A component that manages viewport size
     * @ko 뷰포트 크기 정보를 담당하는 컴포넌트
     * @type {Viewport}
     * @readonly
     * @see Viewport
     */
    get: function () {
      return this._viewport;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "initialized", {
    // Internal States
    /**
     * Whether Flicking's {@link Flicking#init init()} is called.
     * This is `true` when {@link Flicking#init init()} is called, and is `false` after calling {@link Flicking#destroy destroy()}.
     * @ko Flicking의 {@link Flicking#init init()}이 호출되었는지를 나타내는 멤버 변수.
     * 이 값은 {@link Flicking#init init()}이 호출되었으면 `true`로 변하고, {@link Flicking#destroy destroy()}호출 이후에 다시 `false`로 변경됩니다.
     * @type {boolean}
     * @default false
     * @readonly
     */
    get: function () {
      return this._initialized;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "circularEnabled", {
    /**
     * Whether the `circular` option is enabled.
     * The {@link Flicking#circular circular} option can't be enabled when sum of the panel sizes are too small.
     * @ko {@link Flicking#circular circular} 옵션이 활성화되었는지 여부를 나타내는 멤버 변수.
     * {@link Flicking#circular circular} 옵션은 패널의 크기의 합이 충분하지 않을 경우 비활성화됩니다.
     * @type {boolean}
     * @default false
     * @readonly
     */
    get: function () {
      return this._camera.circularEnabled;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "virtualEnabled", {
    /**
     * Whether the `virtual` option is enabled.
     * The {@link Flicking#virtual virtual} option can't be enabled when  {@link Flicking#panelsPerView panelsPerView} is less or equal than zero.
     * @ko {@link Flicking#virtual virtual} 옵션이 활성화되었는지 여부를 나타내는 멤버 변수.
     * {@link Flicking#virtual virtual} 옵션은 {@link Flicking#panelsPerView panelsPerView} 옵션의 값이 0보다 같거나 작으면 비활성화됩니다.
     * @type {boolean}
     * @default false
     * @readonly
     */
    get: function () {
      return this._panelsPerView > 0 && this._virtual != null;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "index", {
    /**
     * Index number of the {@link Flicking#currentPanel currentPanel}
     * @ko {@link Flicking#currentPanel currentPanel}의 인덱스 번호
     * @type {number}
     * @default 0
     * @readonly
     */
    get: function () {
      return this._control.activeIndex;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "element", {
    /**
     * The root(`.flicking-viewport`) element
     * @ko root(`.flicking-viewport`) 엘리먼트
     * @type {HTMLElement}
     * @readonly
     */
    get: function () {
      return this._viewport.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "currentPanel", {
    /**
     * Currently active panel
     * @ko 현재 선택된 패널
     * @type {Panel}
     * @readonly
     * @see Panel
     */
    get: function () {
      return this._control.activePanel;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panels", {
    /**
     * Array of panels
     * @ko 전체 패널들의 배열
     * @type {Panel[]}
     * @readonly
     * @see Panel
     */
    get: function () {
      return this._renderer.panels;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panelCount", {
    /**
     * Count of panels
     * @ko 전체 패널의 개수
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._renderer.panelCount;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "visiblePanels", {
    /**
     * Array of panels that is visible at the current position
     * @ko 현재 보이는 패널의 배열
     * @type {Panel[]}
     * @readonly
     * @see Panel
     */
    get: function () {
      return this._camera.visiblePanels;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "animating", {
    /**
     * Whether Flicking's animating
     * @ko 현재 애니메이션 동작 여부
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._control.animating;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "holding", {
    /**
     * Whether user is clicking or touching
     * @ko 현재 사용자가 클릭/터치중인지 여부
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._control.holding;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "activePlugins", {
    /**
     * A current list of activated plugins
     * @ko 현재 활성화된 플러그인 목록
     * @type {Plugin[]}
     * @readonly
     */
    get: function () {
      return this._plugins;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "align", {
    // Options Getter
    // UI / LAYOUT
    /**
     * Align position of the panels within viewport. You can set different values each for the panel and camera
     * @ko 뷰포트 내에서 패널 정렬방식을 설정하는 옵션. 카메라와 패널 개별로 옵션을 설정할 수도 있습니다
     * @type {ALIGN | string | number | { panel: string | number, camera: string | number }}
     * @property {ALIGN | string | number} panel The align value for each {@link Panel}s<ko>개개의 {@link Panel}에 적용할 값</ko>
     * @property {ALIGN | string | number} camera The align value for {@link Camera}<ko>{@link Camera}에 적용할 값</ko>
     * @default "center"
     * @see {@link https://naver.github.io/egjs-flicking/Options#align align ( Options )}
     * @example
     * ```ts
     * const possibleOptions = [
     *   // Literal strings
     *   "prev", "center", "next",
     *   // % values, applied to both panel & camera
     *   "0%", "25%", "42%",
     *   // px values, arithmetic calculation with (+/-) is also allowed.
     *   "0px", "100px", "50% - 25px",
     *   // numbers, same to number + px ("0px", "100px")
     *   0, 100, 1000,
     *   // Setting a different value for panel & camera
     *   { panel: "10%", camera: "25%" }
     * ];
     *
     * possibleOptions.forEach(align => {
     *   new Flicking("#el", { align });
     * });
     * ```
     */
    get: function () {
      return this._align;
    },
    // Options Setter
    // UI / LAYOUT
    set: function (val) {
      this._align = val;
      this._renderer.align = val;
      this._camera.align = val;
      void this.resize();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "defaultIndex", {
    /**
     * Index of the panel to move when Flicking's {@link Flicking#init init()} is called. A zero-based integer
     * @ko Flicking의 {@link Flicking#init init()}이 호출될 때 이동할 디폴트 패널의 인덱스로, 0부터 시작하는 정수입니다
     * @type {number}
     * @default 0
     * @see {@link https://naver.github.io/egjs-flicking/Options#defaultindex defaultIndex ( Options )}
     */
    get: function () {
      return this._defaultIndex;
    },
    set: function (val) {
      this._defaultIndex = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "horizontal", {
    /**
     * Direction of panel movement (true: horizontal, false: vertical)
     * @ko 패널 이동 방향 (true: 가로방향, false: 세로방향)
     * @type {boolean}
     * @default true
     * @see {@link https://naver.github.io/egjs-flicking/Options#horizontal horizontal ( Options )}
     */
    get: function () {
      return this._horizontal;
    },
    set: function (val) {
      this._horizontal = val;
      this._control.controller.updateDirection();
      void this.resize();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "circular", {
    /**
     * Enables circular(continuous loop) mode, which connects first/last panel for continuous scrolling.
     * @ko 순환 모드를 활성화합니다. 순환 모드에서는 양 끝의 패널이 서로 연결되어 끊김없는 스크롤이 가능합니다.
     * @type {boolean}
     * @default false
     * @see {@link https://naver.github.io/egjs-flicking/Options#circular circular ( Options )}
     */
    get: function () {
      return this._circular;
    },
    set: function (val) {
      this._circular = val;
      void this.resize();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "circularFallback", {
    /**
     * Set panel control mode for the case when circular cannot be enabled.
     * "linear" will set the view's range from the top of the first panel to the top of the last panel.
     * "bound" will prevent the view from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel.
     * @ko 순환 모드 사용 불가능시 사용할 패널 조작 범위 설정 방식을 변경합니다.
     * "linear" 사용시 시점이 첫번째 엘리먼트 위에서부터 마지막 엘리먼트 위까지 움직일 수 있도록 설정합니다.
     * "bound" 사용시 시점이 첫번째 엘리먼트와 마지막 엘리먼트의 끝과 끝 사이에서 움직일 수 있도록 설정합니다.
     * @see CIRCULAR_FALLBACK
     * @type {string}
     * @default "linear"
     * @see {@link https://naver.github.io/egjs-flicking/Options#circularfallback circularFallback ( Options )}
     */
    get: function () {
      return this._circularFallback;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "bound", {
    /**
     * Prevent the view(camera element) from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel
     * Only can be enabled when `circular=false`
     * @ko 뷰(카메라 엘리먼트)가 첫번째와 마지막 패널 밖으로 넘어가지 못하게 하여, 첫번째/마지막 패널 전/후의 빈 공간을 보이지 않도록 하는 옵션입니다
     * `circular=false`인 경우에만 사용할 수 있습니다
     * @type {boolean}
     * @default false
     * @see {@link https://naver.github.io/egjs-flicking/Options#bound bound ( Options )}
     */
    get: function () {
      return this._bound;
    },
    set: function (val) {
      this._bound = val;
      void this.resize();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "adaptive", {
    /**
     * Update height of the viewport element after movement same to the height of the panel below. This can be only enabled when `horizontal=true`
     * @ko 이동한 후 뷰포트 엘리먼트의 크기를 현재 패널의 높이와 동일하게 설정합니다. `horizontal=true`인 경우에만 사용할 수 있습니다.
     * @type {boolean}
     * @default false
     * @see {@link https://naver.github.io/egjs-flicking/Options#adaptive adaptive ( Options )}
     */
    get: function () {
      return this._adaptive;
    },
    set: function (val) {
      this._adaptive = val;
      void this.resize();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panelsPerView", {
    /**
     * A visible number of panels on viewport. Enabling this option will automatically resize panel size
     * @ko 한 화면에 보이는 패널의 개수. 이 옵션을 활성화할 경우 패널의 크기를 강제로 재조정합니다
     * @type {number}
     * @default -1
     * @see {@link https://naver.github.io/egjs-flicking/Options#panelsperview panelsPerView ( Options )}
     */
    get: function () {
      return this._panelsPerView;
    },
    set: function (val) {
      this._panelsPerView = val;
      void this.resize();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "noPanelStyleOverride", {
    /**
     * Enabling this option will not change `width/height` style of the panels if {@link Flicking#panelsPerView} is enabled.
     * This behavior can be useful in terms of performance when you're manually managing all panel sizes
     * @ko 이 옵션을 활성화할 경우, {@link Flicking#panelsPerView} 옵션이 활성화되었을 때 패널의 `width/height` 스타일을 변경하지 않도록 설정합니다.
     * 모든 패널들의 크기를 직접 관리하고 있을 경우, 이 옵션을 활성화하면 성능면에서 유리할 수 있습니다
     * @type {boolean}
     * @default false
     */
    get: function () {
      return this._noPanelStyleOverride;
    },
    set: function (val) {
      this._noPanelStyleOverride = val;
      void this.resize();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "resizeOnContentsReady", {
    /**
     * Enabling this option will automatically call {@link Flicking#resize} when all image/video inside panels are loaded.
     * This can be useful when you have contents inside Flicking that changes its size when it's loaded
     * @ko 이 옵션을 활성화할 경우, Flicking 패널 내부의 이미지/비디오들이 로드되었을 때 자동으로 {@link Flicking#resize}를 호출합니다.
     * 이 동작은 Flicking 내부에 로드 전/후로 크기가 변하는 콘텐츠를 포함하고 있을 때 유용하게 사용하실 수 있습니다.
     * @type {boolean}
     * @default false
     * @see {@link https://naver.github.io/egjs-flicking/Options#resizeOnContentsReady resizeOnContentsReady ( Options )}
     */
    get: function () {
      return this._resizeOnContentsReady;
    },
    set: function (val) {
      this._resizeOnContentsReady = val;
      if (val) {
        this._renderer.checkPanelContentsReady(this._renderer.panels);
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "nested", {
    /**
     * If you enable this option on child Flicking when the Flicking is placed inside the Flicking, the parent Flicking will move in the same direction after the child Flicking reaches the first/last panel.
     * If the parent Flicking and child Flicking have different horizontal option, you do not need to set this option.
     * @ko Flicking 내부에 Flicking이 배치될 때 하위 Flicking에서 이 옵션을 활성화하면 하위 Flicking이 첫/마지막 패널에 도달한 뒤부터 같은 방향으로 상위 Flicking이 움직입니다.
     * 만약 상위 Flicking과 하위 Flicking이 서로 다른 horizontal 옵션을 가지고 있다면 이 옵션을 설정할 필요가 없습니다.
     * @type {boolean}
     * @default false
     * @see {@link https://naver.github.io/egjs-flicking/Options#nested nested ( Options )}
     */
    get: function () {
      return this._nested;
    },
    set: function (val) {
      this._nested = val;
      var axes = this._control.controller.axes;
      if (axes) {
        axes.options.nested = val;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "needPanelThreshold", {
    // EVENTS
    /**
     * A Threshold from viewport edge before triggering `needPanel` event
     * @ko `needPanel`이벤트가 발생하기 위한 뷰포트 끝으로부터의 최대 거리
     * @type {number}
     * @default 0
     * @see {@link https://naver.github.io/egjs-flicking/Options#needpanelthreshold needPanelThreshold ( Options )}
     */
    get: function () {
      return this._needPanelThreshold;
    },
    // EVENTS
    set: function (val) {
      this._needPanelThreshold = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "preventEventsBeforeInit", {
    /**
     * When enabled, events are not triggered before `ready` when initializing
     * @ko 활성화할 경우 초기화시 `ready` 이벤트 이전의 이벤트가 발생하지 않습니다.
     * @type {boolean}
     * @default true
     * @see {@link https://naver.github.io/egjs-flicking/Options#preventeventsbeforeinit preventEventsBeforeInit ( Options )}
     */
    get: function () {
      return this._preventEventsBeforeInit;
    },
    set: function (val) {
      this._preventEventsBeforeInit = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "deceleration", {
    // ANIMATION
    /**
     * Deceleration value for panel movement animation which is triggered by user input. A higher value means a shorter animation time
     * @ko 사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아집니다
     * @type {number}
     * @default 0.0075
     * @see {@link https://naver.github.io/egjs-flicking/Options#deceleration deceleration ( Options )}
     */
    get: function () {
      return this._deceleration;
    },
    // ANIMATION
    set: function (val) {
      this._deceleration = val;
      var axes = this._control.controller.axes;
      if (axes) {
        axes.options.deceleration = val;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "easing", {
    /**
     * An easing function applied to the panel movement animation. Default value is `easeOutCubic`
     * @ko 패널 이동 애니메이션에 적용할 easing 함수. 기본값은 `easeOutCubic`이다
     * @type {function}
     * @default x => 1 - Math.pow(1 - x, 3)
     * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
     * @see {@link https://naver.github.io/egjs-flicking/Options#easing Easing ( Options )}
     */
    get: function () {
      return this._easing;
    },
    set: function (val) {
      this._easing = val;
      var axes = this._control.controller.axes;
      if (axes) {
        axes.options.easing = val;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "duration", {
    /**
     * Default duration of the animation (ms)
     * @ko 디폴트 애니메이션 재생 시간 (ms)
     * @type {number}
     * @default 500
     * @see {@link https://naver.github.io/egjs-flicking/Options#duration duration ( Options )}
     */
    get: function () {
      return this._duration;
    },
    set: function (val) {
      this._duration = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "inputType", {
    // INPUT
    /**
     * Types of input devices to enable
     * @ko 활성화할 입력 장치 종류
     * @type {string[]}
     * @default ["touch", "mouse"]
     * @see {@link https://naver.github.io/egjs-axes/Options#paninput-options Possible values (PanInputOption#inputType)}
     * <ko>{@link https://naver.github.io/egjs-axes/Options#paninput-options 가능한 값들 (PanInputOption#inputType)}</ko>
     * @see {@link https://naver.github.io/egjs-flicking/Options#inputtype inputType ( Options )}
     */
    get: function () {
      return this._inputType;
    },
    // INPUT
    set: function (val) {
      this._inputType = val;
      var panInput = this._control.controller.panInput;
      if (panInput) {
        panInput.options.inputType = val;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "moveType", {
    /**
     * Movement style by user input. This will change instance type of {@link Flicking#control}
     * You can use the values of the constant {@link MOVE_TYPE}
     * @ko 사용자 입력에 의한 이동 방식. 이 값에 따라 {@link Flicking#control}의 인스턴스 타입이 결정됩니다
     * 상수 {@link MOVE_TYPE}에 정의된 값들을 이용할 수 있습니다
     * @type {MOVE_TYPE | Pair<string, object>}
     * @default "snap"
     * @see {@link https://naver.github.io/egjs-flicking/Options#movetype moveType ( Options )}
     * @example
     * |moveType|control|options|
     * |:---:|:---:|:---:|
     * |"snap"|{@link SnapControl}||
     * |"freeScroll"|{@link FreeControl}|{@link FreeControlOptions}|
     *
     * ```ts
     * import Flicking, { MOVE_TYPE } from "@egjs/flicking";
     *
     * const flicking = new Flicking({
     *   moveType: MOVE_TYPE.SNAP
     * });
     * ```
     *
     * ```ts
     * const flicking = new Flicking({
     *   // If you want more specific settings for the moveType
     *   // [moveType, options for that moveType]
     *   // In this case, it's ["freeScroll", FreeControlOptions]
     *   moveType: [MOVE_TYPE.FREE_SCROLL, { stopAtEdge: true }]
     * });
     * ```
     */
    get: function () {
      return this._moveType;
    },
    set: function (val) {
      this._moveType = val;
      var prevControl = this._control;
      var newControl = this._createControl();
      var activePanel = prevControl.activePanel;
      newControl.copy(prevControl);
      var prevProgressInPanel = activePanel ? this._camera.getProgressInPanel(activePanel) : 0;
      this._control = newControl;
      this._control.updatePosition(prevProgressInPanel);
      this._control.updateInput();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "threshold", {
    /**
     * Movement threshold to change panel (unit: px). It should be dragged above the threshold to change the current panel.
     * @ko 패널 변경을 위한 이동 임계값 (단위: px). 주어진 값 이상으로 스크롤해야만 패널 변경이 가능하다.
     * @type {number}
     * @default 40
     * @see {@link https://naver.github.io/egjs-flicking/Options#threshold Threshold ( Options )}
     */
    get: function () {
      return this._threshold;
    },
    set: function (val) {
      this._threshold = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "interruptable", {
    /**
     * Set animation to be interruptable by click/touch.
     * @ko 사용자의 클릭/터치로 인해 애니메이션을 도중에 멈출 수 있도록 설정합니다.
     * @type {boolean}
     * @default true
     * @see {@link https://naver.github.io/egjs-flicking/Options#interruptable Interruptable ( Options )}
     */
    get: function () {
      return this._interruptable;
    },
    set: function (val) {
      this._interruptable = val;
      var axes = this._control.controller.axes;
      if (axes) {
        axes.options.interruptable = val;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "bounce", {
    /**
     * The size value of the bounce area. Only can be enabled when `circular=false`.
     * You can set different bounce value for prev/next direction by using array.
     * `number` for px value, and `string` for px, and % value relative to viewport size.
     * You have to call {@link Control#updateInput} after changing this to take effect.
     * @ko Flicking이 최대 영역을 넘어서 갈 수 있는 최대 크기. `circular=false`인 경우에만 사용할 수 있습니다.
     * 배열을 통해 prev/next 방향에 대해 서로 다른 바운스 값을 지정할 수 있습니다.
     * `number`를 통해 px값을, `stirng`을 통해 px 혹은 뷰포트 크기 대비 %값을 사용할 수 있습니다.
     * 이 값을 변경시 {@link Control#updateInput}를 호출해야 합니다.
     * @type {string | number | Array<string | number>}
     * @default "20%"
     * @see {@link https://naver.github.io/egjs-flicking/Options#bounce bounce ( Options )}
     * @example
     * ```ts
     * const possibleOptions = [
     *   // % values, relative to viewport element(".flicking-viewport")'s size
     *   "0%", "25%", "42%",
     *   // px values, arithmetic calculation with (+/-) is also allowed.
     *   "0px", "100px", "50% - 25px",
     *   // numbers, same to number + px ("0px", "100px")
     *   0, 100, 1000
     * ];
     * ```
     *
     * @example
     * ```ts
     * const flicking = new Flicking("#el", { bounce: "20%" });
     *
     * flicking.bounce = "100%";
     * flicking.control.updateInput(); // Call this to update!
     * ```
     */
    get: function () {
      return this._bounce;
    },
    set: function (val) {
      this._bounce = val;
      this._control.updateInput();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "iOSEdgeSwipeThreshold", {
    /**
     * Size of the area from the right edge in iOS safari (in px) which enables swipe-back or swipe-forward
     * @ko iOS Safari에서 swipe를 통한 뒤로가기/앞으로가기를 활성화하는 오른쪽 끝으로부터의 영역의 크기 (px)
     * @type {number}
     * @default 30
     * @see {@link https://naver.github.io/egjs-flicking/Options#iosedgeswipethreshold iOSEdgeSwipeThreshold ( Options )}
     */
    get: function () {
      return this._iOSEdgeSwipeThreshold;
    },
    set: function (val) {
      this._iOSEdgeSwipeThreshold = val;
      var panInput = this._control.controller.panInput;
      if (panInput) {
        panInput.options.iOSEdgeSwipeThreshold = val;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "preventClickOnDrag", {
    /**
     * Automatically prevent `click` event if the user has dragged at least a single pixel on the viewport element
     * @ko 사용자가 뷰포트 영역을 1픽셀이라도 드래그했을 경우 자동으로 {@link https://developer.mozilla.org/ko/docs/Web/API/Element/click_event click} 이벤트를 취소합니다
     * @type {boolean}
     * @default true
     * @see {@link https://naver.github.io/egjs-flicking/Options#preventclickondrag preventClickOnDrag ( Options )}
     */
    get: function () {
      return this._preventClickOnDrag;
    },
    set: function (val) {
      var prevVal = this._preventClickOnDrag;
      if (val === prevVal) return;
      var controller = this._control.controller;
      if (val) {
        controller.addPreventClickHandler();
      } else {
        controller.removePreventClickHandler();
      }
      this._preventClickOnDrag = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "disableOnInit", {
    /**
     * Automatically call {@link Flicking#disableInput disableInput()} on initialization
     * @ko Flicking init시에 {@link Flicking#disableInput disableInput()}을 바로 호출합니다
     * @type {boolean}
     * @default false
     * @see {@link https://naver.github.io/egjs-flicking/Options#disableoninit disableOnInit ( Options )}
     */
    get: function () {
      return this._disableOnInit;
    },
    set: function (val) {
      this._disableOnInit = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "changeOnHold", {
    /**
     * Change active panel index on mouse/touch hold while animating.
     * `index` of the `willChange`/`willRestore` event will be used as new index.
     * @ko 애니메이션 도중 마우스/터치 입력시 현재 활성화된 패널의 인덱스를 변경합니다.
     * `willChange`/`willRestore` 이벤트의 `index`값이 새로운 인덱스로 사용될 것입니다.
     * @type {boolean}
     * @default false
     * @see {@link https://naver.github.io/egjs-flicking/Options#changeonhold changeOnHold ( Options )}
     */
    get: function () {
      return this._changeOnHold;
    },
    set: function (val) {
      this._changeOnHold = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "renderOnlyVisible", {
    // PERFORMANCE
    /**
     * Whether to render visible panels only. This can dramatically increase performance when there're many panels
     * @ko 보이는 패널만 렌더링할지 여부를 설정합니다. 패널이 많을 경우에 퍼포먼스를 크게 향상시킬 수 있습니다
     * @type {boolean}
     * @default false
     * @see {@link https://naver.github.io/egjs-flicking/Options#renderonlyvisible renderOnlyVisible ( Options )}
     */
    get: function () {
      return this._renderOnlyVisible;
    },
    // PERFORMANCE
    set: function (val) {
      this._renderOnlyVisible = val;
      void this._renderer.render();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "virtual", {
    /**
     * By enabling this option, it will reduce memory consumption by restricting the number of DOM elements to `panelsPerView + 1`
     * Must be used with `panelsPerview`.
     * After Flicking's initialized, this property can be used to add/remove the panel count.
     * @ko 이 옵션을 활성화할 경우 패널 엘리먼트의 개수를 `panelsPerView + 1` 개로 고정함으로써, 메모리 사용량을 줄일 수 있습니다.
     * `panelsPerView` 옵션과 함께 사용되어야만 합니다.
     * Flicking 초기화 이후에, 이 프로퍼티는 렌더링하는 패널의 개수를 추가/제거하기 위해 사용될 수 있습니다.
     * @type {VirtualManager}
     * @property {function} renderPanel A rendering function for the panel element's innerHTML<ko>패널 엘리먼트의 innerHTML을 렌더링하는 함수</ko>
     * @property {number} initialPanelCount Initial panel count to render<ko>최초로 렌더링할 패널의 개수</ko>
     * @property {boolean} [cache=false] Whether to cache rendered panel's innerHTML<ko>렌더링된 패널의 innerHTML 정보를 캐시할지 여부</ko>
     * @property {string} [panelClass="flicking-panel"] The class name that will be applied to rendered panel elements<ko>렌더링되는 패널 엘리먼트에 적용될 클래스 이름</ko>
     * @see {@link https://naver.github.io/egjs-flicking/Options#virtual virtual ( Options )}
     * @example
     * ```ts
     * import Flicking, { VirtualPanel } from "@egjs/flicking";
     *
     * const flicking = new Flicking("#some_el", {
     *   panelsPerView: 3,
     *   virtual: {
     *     renderPanel: (panel: VirtualPanel, index: number) => `Panel ${index}`,
     *     initialPanelCount: 100
     *   }
     * });
     *
     * // Add 100 virtual panels (at the end)
     * flicking.virtual.append(100);
     *
     * // Remove 100 virtual panels from 0 to 100
     * flicking.virtual.remove(0, 100);
     * ```
     */
    get: function () {
      return this._virtualManager;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "autoInit", {
    // OTHERS
    /**
     * Call {@link Flicking#init init()} automatically when creating Flicking's instance
     * @ko Flicking 인스턴스를 생성할 때 자동으로 {@link Flicking#init init()}를 호출합니다
     * @type {boolean}
     * @default true
     * @see {@link https://naver.github.io/egjs-flicking/Options#autoinit autoInit ( Options )}
     * @readonly
     */
    get: function () {
      return this._autoInit;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "autoResize", {
    /**
     * Whether to automatically call {@link Flicking#resize resize()} when the viewport element(.flicking-viewport)'s size is changed
     * @ko 뷰포트 엘리먼트(.flicking-viewport)의 크기 변경시 {@link Flicking#resize resize()} 메소드를 자동으로 호출할지 여부를 설정합니다
     * @type {boolean}
     * @default true
     */
    get: function () {
      return this._autoResize;
    },
    // OTHERS
    set: function (val) {
      this._autoResize = val;
      if (val) {
        this._autoResizer.enable();
      } else {
        this._autoResizer.disable();
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "useResizeObserver", {
    /**
     * Whether to listen {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver ResizeObserver}'s event instead of Window's {@link https://developer.mozilla.org/ko/docs/Web/API/Window/resize_event resize} event when using the `autoResize` option
     * @ko autoResize 옵션 사용시 {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver ResizeObserver}의 이벤트를 Window객체의 {@link https://developer.mozilla.org/ko/docs/Web/API/Window/resize_event resize} 이벤트 대신 수신할지 여부를 설정합니다
     * @type {boolean}
     * @default true
     * @see {@link https://naver.github.io/egjs-flicking/Options#useresizeobserver useResizeObserver ( Options )}
     */
    get: function () {
      return this._useResizeObserver;
    },
    set: function (val) {
      this._useResizeObserver = val;
      if (this._autoResize) {
        this._autoResizer.enable();
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "resizeDebounce", {
    /**
     * Delays size recalculation from `autoResize` by the given time in milisecond.
     * If the size is changed again while being delayed, it cancels the previous one and delays from the beginning again.
     * This can increase performance by preventing `resize` being called too often.
     * @ko `autoResize` 설정시에 호출되는 크기 재계산을 주어진 시간(단위: ms)만큼 지연시킵니다.
     * 지연시키는 도중 크기가 다시 변경되었을 경우, 이전 것을 취소하고 주어진 시간만큼 다시 지연시킵니다.
     * 이를 통해 `resize`가 너무 많이 호출되는 것을 방지하여 성능을 향상시킬 수 있습니다.
     * @type {number}
     * @default 0
     * @see {@link https://naver.github.io/egjs-flicking/Options#resizedebounce resizeDebounce ( Options )}
     */
    get: function () {
      return this._resizeDebounce;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "maxResizeDebounce", {
    /**
     * The maximum time for size recalculation delay when using `resizeDebounce`, in milisecond.
     * This guarantees that size recalculation is performed at least once every (n)ms.
     * @ko `resizeDebounce` 사용시에 크기 재계산이 지연되는 최대 시간을 지정합니다. (단위: ms)
     * 이를 통해, 적어도 (n)ms에 한번은 크기 재계산을 수행하는 것을 보장할 수 있습니다.
     * @type {number}
     * @default 100
     * @see {@link https://naver.github.io/egjs-flicking/Options#maxresizedebounce maxResizeDebounce ( Options )}
     */
    get: function () {
      return this._maxResizeDebounce;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "useFractionalSize", {
    /**
     * By enabling this, Flicking will calculate all internal size with CSS width computed with getComputedStyle.
     * This can prevent 1px offset issue in some cases where panel size has the fractional part.
     * All sizes will have the original size before CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform transform} is applied on the element.
     * @ko 이 옵션을 활성화할 경우, Flicking은 내부의 모든 크기를 {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect getBoundingClientRect}를 이용하여 계산합니다.
     * 이를 통해, 패널 크기에 소수점을 포함할 경우에 발생할 수 있는 일부 1px 오프셋 이슈를 해결 가능합니다.
     * 모든 크기는 CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform transform}이 엘리먼트에 적용되기 이전의 크기를 사용할 것입니다.
     * @type {boolean}
     * @default false
     * @see {@link https://naver.github.io/egjs-flicking/Options#usefractionalsize useFractionalSize ( Options )}
     */
    get: function () {
      return this._useFractionalSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "externalRenderer", {
    /**
     * This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.
     * @ko 프레임워크(React, Vue, Angular, ...)에서만 사용하는 옵션으로, 자동으로 설정되므로 따로 사용하실 필요 없습니다!
     * @default null
     * @internal
     * @readonly
     */
    get: function () {
      return this._externalRenderer;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "renderExternal", {
    /**
     * This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.
     * @ko 프레임워크(React, Vue, Angular, ...)에서만 사용하는 옵션으로, 자동으로 설정되므로 따로 사용하실 필요 없습니다!
     * @default null
     * @internal
     * @readonly
     * @deprecated
     */
    get: function () {
      return this._renderExternal;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize Flicking and move to the default index
   * This is automatically called on Flicking's constructor when `autoInit` is true(default)
   * @ko Flicking을 초기화하고, 디폴트 인덱스로 이동합니다
   * 이 메소드는 `autoInit` 옵션이 true(default)일 경우 Flicking이 생성될 때 자동으로 호출됩니다
   * @fires Flicking#ready
   * @return {Promise<void>}
   */
  __proto.init = function () {
    var _this = this;
    if (this._initialized) return Promise.resolve();
    var camera = this._camera;
    var renderer = this._renderer;
    var control = this._control;
    var virtualManager = this._virtualManager;
    var originalTrigger = this.trigger;
    var preventEventsBeforeInit = this._preventEventsBeforeInit;
    camera.init();
    virtualManager.init();
    renderer.init(this);
    control.init(this);
    if (preventEventsBeforeInit) {
      this.trigger = function () {
        return _this;
      };
    }
    this._initialResize();
    // Look at initial panel
    this._moveToInitialPanel();
    if (this._autoResize) {
      this._autoResizer.enable();
    }
    if (this._preventClickOnDrag) {
      control.controller.addPreventClickHandler();
    }
    if (this._disableOnInit) {
      this.disableInput();
    }
    renderer.checkPanelContentsReady(renderer.panels);
    this._initialized = true;
    return renderer.render().then(function () {
      // Done initializing & emit ready event
      _this._plugins.forEach(function (plugin) {
        return plugin.init(_this);
      });
      if (preventEventsBeforeInit) {
        _this.trigger = originalTrigger;
      }
      _this.trigger(new ComponentEvent$1(flicking_esm_EVENTS.READY));
    });
  };
  /**
   * Destroy Flicking and remove all event handlers
   * @ko Flicking과 하위 컴포넌트들을 초기 상태로 되돌리고, 부착된 모든 이벤트 핸들러를 제거합니다
   * @return {void}
   */
  __proto.destroy = function () {
    this.off();
    this._autoResizer.disable();
    this._control.destroy();
    this._camera.destroy();
    this._renderer.destroy();
    this._plugins.forEach(function (plugin) {
      return plugin.destroy();
    });
    this._initialized = false;
  };
  /**
   * Move to the previous panel (current index - 1)
   * @ko 이전 패널로 이동합니다 (현재 인덱스 - 1)
   * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms)<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
   * @async
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the previous panel does not exist|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|이전 패널이 존재하지 않을 경우|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the previous panel<ko>이전 패널 도달시에 resolve되는 Promise</ko>
   */
  __proto.prev = function (duration) {
    var _a, _b, _c;
    if (duration === void 0) {
      duration = this._duration;
    }
    return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.prev()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : -1, duration, DIRECTION.PREV);
  };
  /**
   * Move to the next panel (current index + 1)
   * @ko 다음 패널로 이동합니다 (현재 인덱스 + 1)
   * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
   * @async
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the next panel does not exist|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|다음 패널이 존재하지 않을 경우|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the next panel<ko>다음 패널 도달시에 resolve되는 Promise</ko>
   */
  __proto.next = function (duration) {
    var _a, _b, _c;
    if (duration === void 0) {
      duration = this._duration;
    }
    return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.next()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : this._renderer.panelCount, duration, DIRECTION.NEXT);
  };
  /**
   * Move to the panel with given index
   * @ko 주어진 인덱스에 해당하는 패널로 이동합니다
   * @param {number} index The index of the panel to move<ko>이동할 패널의 인덱스</ko>
   * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @param {DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
   * @async
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the root is not either string or HTMLElement|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|해당 인덱스를 가진 패널이 존재하지 않을 경우|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>
   */
  __proto.moveTo = function (index, duration, direction) {
    if (duration === void 0) {
      duration = this._duration;
    }
    if (direction === void 0) {
      direction = DIRECTION.NONE;
    }
    var renderer = this._renderer;
    var panelCount = renderer.panelCount;
    var panel = renderer.getPanel(index);
    if (!panel) {
      return Promise.reject(new FlickingError(MESSAGE.INDEX_OUT_OF_RANGE(index, 0, panelCount - 1), CODE.INDEX_OUT_OF_RANGE));
    }
    if (this._control.animating) {
      return Promise.reject(new FlickingError(MESSAGE.ANIMATION_ALREADY_PLAYING, CODE.ANIMATION_ALREADY_PLAYING));
    }
    if (this._control.holding) {
      this._control.controller.release();
    }
    return this._control.moveToPanel(panel, {
      duration: duration,
      direction: direction
    });
  };
  /**
   * Change the destination and duration of the animation currently playing
   * @ko 재생 중인 애니메이션의 목적지와 재생 시간을 변경합니다
   * @param {number} index The index of the panel to move<ko>이동할 패널의 인덱스</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @param {DIRECTION} direction Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
   * @throws {FlickingError}
   * {@link ERROR_CODE INDEX_OUT_OF_RANGE} When the root is not either string or HTMLElement
   * <ko>{@link ERROR_CODE INDEX_OUT_OF_RANGE} 해당 인덱스를 가진 패널이 존재하지 않을 경우</ko>
   * @return {void}
   */
  __proto.updateAnimation = function (index, duration, direction) {
    if (!this._control.animating) {
      return;
    }
    var renderer = this._renderer;
    var panelCount = renderer.panelCount;
    var panel = renderer.getPanel(index);
    if (!panel) {
      throw new FlickingError(MESSAGE.INDEX_OUT_OF_RANGE(index, 0, panelCount - 1), CODE.INDEX_OUT_OF_RANGE);
    }
    this._control.updateAnimation(panel, duration, direction);
  };
  /**
   * Stops the animation currently playing
   * @ko 재생 중인 애니메이션을 중단시킵니다
   * @fires Flicking#moveEnd
   * @return {void}
   */
  __proto.stopAnimation = function () {
    if (!this._control.animating) {
      return;
    }
    this._control.stopAnimation();
  };
  /**
   * Return the {@link Panel} at the given index. `null` if it doesn't exists.
   * @ko 주어진 인덱스에 해당하는 {@link Panel}을 반환합니다. 주어진 인덱스에 해당하는 패널이 존재하지 않을 경우 `null`을 반환합니다.
   * @return {Panel | null} Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>
   * @see Panel
   * @example
   * ```ts
   * const panel = flicking.getPanel(0);
   * // Which is a shorthand to...
   * const samePanel = flicking.panels[0];
   * ```
   */
  __proto.getPanel = function (index) {
    return this._renderer.getPanel(index);
  };
  /**
   * Enable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 활성화합니다
   * @return {this}
   */
  __proto.enableInput = function () {
    this._control.enable();
    return this;
  };
  /**
   * Disable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 막습니다
   * @return {this}
   */
  __proto.disableInput = function () {
    this._control.disable();
    return this;
  };
  /**
   * Get current flicking status. You can restore current state by giving returned value to {@link Flicking#setStatus setStatus()}
   * @ko 현재 상태를 반환합니다. 반환받은 값을 {@link Flicking#setStatus setStatus()} 메소드의 인자로 지정하면 현재 상태를 복원할 수 있습니다
   * @param {object} options Status retrieving options<ko>Status 반환 옵션</ko>
   * @param {boolean} [options.index=true] Include current panel index to the returning status. Camera will automatically move to the given index when the {@link Flicking#setStatus setStatus} is called<ko>현재 패널 인덱스를 반환값에 포함시킵니다. {@link Flicking#setStatus setStatus} 호출시 자동으로 해당 인덱스로 카메라를 움직입니다</ko>
   * @param {boolean} [options.position=true] Include camera position to the returning status. This works only when the {@link Flicking#moveType moveType} is `freeScroll`<ko>카메라의 현재 위치를 반환값에 포함시킵니다. 이 옵션은 {@link Flicking#moveType moveType}이 `freeScroll`일 경우에만 동작합니다</ko>
   * @param {boolean} [options.includePanelHTML=false] Include panel's `outerHTML` to the returning status<ko>패널의 `outerHTML`을 반환값에 포함시킵니다</ko>
   * @param {boolean} [options.visiblePanelsOnly=false] Include only {@link Flicking#visiblePanel visiblePanel}'s HTML. This option is available only when the `includePanelHTML` is true
   * <ko>현재 보이는 패널({@link Flicking#visiblePanel visiblePanel})의 HTML만 반환합니다. `includePanelHTML`이 `true`일 경우에만 동작합니다.</ko>
   * @return {Status} An object with current status value information<ko>현재 상태값 정보를 가진 객체.</ko>
   */
  __proto.getStatus = function (_a) {
    var _b, _c;
    var _d = _a === void 0 ? {} : _a,
      _e = _d.index,
      index = _e === void 0 ? true : _e,
      _f = _d.position,
      position = _f === void 0 ? true : _f,
      _g = _d.includePanelHTML,
      includePanelHTML = _g === void 0 ? false : _g,
      _h = _d.visiblePanelsOnly,
      visiblePanelsOnly = _h === void 0 ? false : _h;
    var camera = this._camera;
    var panels = visiblePanelsOnly ? this.visiblePanels : this.panels;
    var status = {
      panels: panels.map(function (panel) {
        var panelInfo = {
          index: panel.index
        };
        if (includePanelHTML) {
          panelInfo.html = panel.element.outerHTML;
        }
        return panelInfo;
      })
    };
    if (index) {
      status.index = this.index;
    }
    if (position) {
      var nearestAnchor = camera.findNearestAnchor(camera.position);
      if (nearestAnchor) {
        status.position = {
          panel: nearestAnchor.panel.index,
          progressInPanel: camera.getProgressInPanel(nearestAnchor.panel)
        };
      }
    }
    if (visiblePanelsOnly) {
      var visiblePanels = this.visiblePanels;
      status.visibleOffset = (_c = (_b = visiblePanels[0]) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : 0;
    }
    return status;
  };
  /**
   * Restore to the state of the given {@link Status}
   * @ko 주어진 {@link Status}의 상태로 복원합니다
   * @param {Partial<Status>} status Status value to be restored. You should use the return value of the {@link Flicking#getStatus getStatus()} method<ko>복원할 상태 값. {@link Flicking#getStatus getStatus()} 메서드의 반환값을 지정하면 됩니다</ko>
   * @return {void}
   */
  __proto.setStatus = function (status) {
    var _a;
    if (!this._initialized) {
      throw new FlickingError(MESSAGE.NOT_INITIALIZED, CODE.NOT_INITIALIZED);
    }
    var index = status.index,
      position = status.position,
      visibleOffset = status.visibleOffset,
      panels = status.panels;
    var renderer = this._renderer;
    var control = this._control;
    // Can't add/remove panels on external rendering
    if (((_a = panels[0]) === null || _a === void 0 ? void 0 : _a.html) && !this._renderExternal) {
      renderer.batchRemove({
        index: 0,
        deleteCount: this.panels.length,
        hasDOMInElements: true
      });
      renderer.batchInsert({
        index: 0,
        elements: parseElement(panels.map(function (panel) {
          return panel.html;
        })),
        hasDOMInElements: true
      });
    }
    if (index != null) {
      var panelIndex = visibleOffset ? index - visibleOffset : index;
      void this.moveTo(panelIndex, 0).catch(function () {
        return void 0;
      });
    }
    if (position && this._moveType === MOVE_TYPE.FREE_SCROLL) {
      var panel = position.panel,
        progressInPanel = position.progressInPanel;
      var panelIndex = visibleOffset ? panel - visibleOffset : panel;
      var panelRange = renderer.panels[panelIndex].range;
      var newCameraPos = panelRange.min + (panelRange.max - panelRange.min) * progressInPanel;
      void control.moveToPosition(newCameraPos, 0).catch(function () {
        return void 0;
      });
    }
  };
  /**
   * Add plugins that can have different effects on Flicking
   * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가합니다
   * @param {...Plugin} plugins The plugin(s) to add<ko>추가할 플러그인(들)</ko>
   * @return {this}
   * @see https://github.com/naver/egjs-flicking-plugins
   */
  __proto.addPlugins = function () {
    var _a;
    var _this = this;
    var plugins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      plugins[_i] = arguments[_i];
    }
    if (this._initialized) {
      plugins.forEach(function (item) {
        return item.init(_this);
      });
    }
    (_a = this._plugins).push.apply(_a, flicking_esm_spread(plugins));
    return this;
  };
  /**
   * Remove plugins from Flicking.
   * @ko 플리킹으로부터 플러그인들을 제거합니다.
   * @param {...Plugin} plugin The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
   * @return {this}
   * @see https://github.com/naver/egjs-flicking-plugins
   */
  __proto.removePlugins = function () {
    var _this = this;
    var plugins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      plugins[_i] = arguments[_i];
    }
    plugins.forEach(function (item) {
      var foundIndex = findIndex(_this._plugins, function (val) {
        return val === item;
      });
      if (foundIndex >= 0) {
        item.destroy();
        _this._plugins.splice(foundIndex, 1);
      }
    });
    return this;
  };
  /**
   * Update viewport/panel sizes
   * @ko 패널 및 뷰포트의 크기를 갱신합니다
   * @method
   * @fires Flicking#beforeResize
   * @fires Flicking#afterResize
   * @return {this}
   */
  __proto.resize = function () {
    return __awaiter(this, void 0, void 0, function () {
      var viewport, renderer, camera, control, activePanel, prevWidth, prevHeight, prevProgressInPanel, newWidth, newHeight, sizeChanged;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            viewport = this._viewport;
            renderer = this._renderer;
            camera = this._camera;
            control = this._control;
            activePanel = control.activePanel;
            prevWidth = viewport.width;
            prevHeight = viewport.height;
            prevProgressInPanel = activePanel ? camera.getProgressInPanel(activePanel) : 0;
            this.trigger(new ComponentEvent$1(flicking_esm_EVENTS.BEFORE_RESIZE, {
              width: prevWidth,
              height: prevHeight,
              element: viewport.element
            }));
            viewport.resize();
            return [4 /*yield*/, renderer.forceRenderAllPanels()];
          case 1:
            _a.sent(); // Render all panel elements, to update sizes
            renderer.updatePanelSize();
            camera.updateAlignPos();
            camera.updateRange();
            camera.updateAnchors();
            camera.updateAdaptiveHeight();
            camera.updateOffset();
            return [4 /*yield*/, renderer.render()];
          case 2:
            _a.sent();
            if (control.animating) ;else {
              control.updatePosition(prevProgressInPanel);
              control.updateInput();
            }
            newWidth = viewport.width;
            newHeight = viewport.height;
            sizeChanged = newWidth !== prevWidth || newHeight !== prevHeight;
            this.trigger(new ComponentEvent$1(flicking_esm_EVENTS.AFTER_RESIZE, {
              width: viewport.width,
              height: viewport.height,
              prev: {
                width: prevWidth,
                height: prevHeight
              },
              sizeChanged: sizeChanged,
              element: viewport.element
            }));
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Add new panels after the last panel
   * @ko 패널 목록의 제일 끝에 새로운 패널들을 추가합니다
   * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
   * @return {Panel[]} An array of appended panels<ko>추가된 패널들의 배열</ko>
   * @see Panel
   * @see ElementLike
   * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
   * @example
   * ```ts
   * const flicking = new Flicking("#flick");
   * // These are possible parameters
   * flicking.append(document.createElement("div"));
   * flicking.append("\<div\>Panel\</div\>");
   * flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]);
   * // Even this is possible
   * flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
   * ```
   */
  __proto.append = function (element) {
    return this.insert(this._renderer.panelCount, element);
  };
  /**
   * Add new panels before the first panel
   * This will increase index of panels after by the number of panels added
   * @ko 패널 목록의 제일 앞(index 0)에 새로운 패널들을 추가합니다
   * 추가한 패널의 개수만큼 기존 패널들의 인덱스가 증가합니다.
   * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
   * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
   * @see Panel
   * @see ElementLike
   * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
   * @example
   * ```ts
   * const flicking = new eg.Flicking("#flick");
   * flicking.prepend(document.createElement("div"));
   * flicking.prepend("\<div\>Panel\</div\>");
   * flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]);
   * // Even this is possible
   * flicking.prepend("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
   * ```
   */
  __proto.prepend = function (element) {
    return this.insert(0, element);
  };
  /**
   * Insert new panels at given index
   * This will increase index of panels after by the number of panels added
   * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
   * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
   * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
   * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
   * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
   * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
   * @example
   * ```ts
   * const flicking = new eg.Flicking("#flick");
   * flicking.insert(0, document.createElement("div"));
   * flicking.insert(2, "\<div\>Panel\</div\>");
   * flicking.insert(1, ["\<div\>Panel\</div\>", document.createElement("div")]);
   * // Even this is possible
   * flicking.insert(3, "\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
   * ```
   */
  __proto.insert = function (index, element) {
    if (this._renderExternal) {
      throw new FlickingError(MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, CODE.NOT_ALLOWED_IN_FRAMEWORK);
    }
    return this._renderer.batchInsert({
      index: index,
      elements: parseElement(element),
      hasDOMInElements: true
    });
  };
  /**
   * Remove the panel at the given index
   * This will decrease index of panels after by the number of panels removed
   * @ko 주어진 인덱스의 패널을 제거합니다
   * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
   * @param {number} index Index of panel to remove<ko>제거할 패널의 인덱스</ko>
   * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
   * @return {Panel[]} An array of removed panels<ko>제거된 패널들의 배열</ko>
   */
  __proto.remove = function (index, deleteCount) {
    if (deleteCount === void 0) {
      deleteCount = 1;
    }
    if (this._renderExternal) {
      throw new FlickingError(MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, CODE.NOT_ALLOWED_IN_FRAMEWORK);
    }
    return this._renderer.batchRemove({
      index: index,
      deleteCount: deleteCount,
      hasDOMInElements: true
    });
  };
  __proto._createControl = function () {
    var _a;
    var moveType = this._moveType;
    var moveTypes = Object.keys(MOVE_TYPE).map(function (key) {
      return MOVE_TYPE[key];
    });
    var moveTypeStr = Array.isArray(moveType) ? moveType[0] : moveType;
    var moveTypeOptions = Array.isArray(moveType) ? (_a = moveType[1]) !== null && _a !== void 0 ? _a : {} : {};
    if (!includes(moveTypes, moveTypeStr)) {
      throw new FlickingError(MESSAGE.WRONG_OPTION("moveType", JSON.stringify(moveType)), CODE.WRONG_OPTION);
    }
    switch (moveTypeStr) {
      case MOVE_TYPE.SNAP:
        return new SnapControl(moveTypeOptions);
      case MOVE_TYPE.FREE_SCROLL:
        return new FreeControl(moveTypeOptions);
      case MOVE_TYPE.STRICT:
        return new StrictControl(moveTypeOptions);
    }
  };
  __proto._createCamera = function () {
    if (this._circular && this._bound) {
      // eslint-disable-next-line no-console
      console.warn("\"circular\" and \"bound\" option cannot be used together, ignoring bound.");
    }
    return new Camera(this, {
      align: this._align
    });
  };
  __proto._createRenderer = function () {
    var externalRenderer = this._externalRenderer;
    if (this._virtual && this._panelsPerView <= 0) {
      // eslint-disable-next-line no-console
      console.warn("\"virtual\" and \"panelsPerView\" option should be used together, ignoring virtual.");
    }
    return externalRenderer ? externalRenderer : this._renderExternal ? this._createExternalRenderer() : this._createVanillaRenderer();
  };
  __proto._createExternalRenderer = function () {
    var _a = this._renderExternal,
      renderer = _a.renderer,
      rendererOptions = _a.rendererOptions;
    return new renderer(flicking_esm_assign({
      align: this._align
    }, rendererOptions));
  };
  __proto._createVanillaRenderer = function () {
    var virtual = this.virtualEnabled;
    return new VanillaRenderer({
      align: this._align,
      strategy: virtual ? new VirtualRenderingStrategy() : new NormalRenderingStrategy({
        providerCtor: VanillaElementProvider
      })
    });
  };
  __proto._moveToInitialPanel = function () {
    var renderer = this._renderer;
    var control = this._control;
    var camera = this._camera;
    var defaultPanel = renderer.getPanel(this._defaultIndex) || renderer.getPanel(0);
    if (!defaultPanel) return;
    var nearestAnchor = camera.findNearestAnchor(defaultPanel.position);
    var initialPanel = nearestAnchor && defaultPanel.index !== nearestAnchor.panel.index ? nearestAnchor.panel : defaultPanel;
    control.setActive(initialPanel, null, false);
    if (!nearestAnchor) {
      throw new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(initialPanel.position), CODE.POSITION_NOT_REACHABLE);
    }
    var position = initialPanel.position;
    if (!camera.canReach(initialPanel)) {
      position = nearestAnchor.position;
    }
    camera.lookAt(position);
    control.updateInput();
    camera.updateOffset();
  };
  __proto._initialResize = function () {
    var viewport = this._viewport;
    var renderer = this._renderer;
    var camera = this._camera;
    var control = this._control;
    this.trigger(new ComponentEvent$1(flicking_esm_EVENTS.BEFORE_RESIZE, {
      width: 0,
      height: 0,
      element: viewport.element
    }));
    viewport.resize();
    renderer.updatePanelSize();
    camera.updateAlignPos();
    camera.updateRange();
    camera.updateAnchors();
    camera.updateOffset();
    control.updateInput();
    var newWidth = viewport.width;
    var newHeight = viewport.height;
    var sizeChanged = newWidth !== 0 || newHeight !== 0;
    this.trigger(new ComponentEvent$1(flicking_esm_EVENTS.AFTER_RESIZE, {
      width: viewport.width,
      height: viewport.height,
      prev: {
        width: 0,
        height: 0
      },
      sizeChanged: sizeChanged,
      element: viewport.element
    }));
  };
  /**
   * Version info string
   * @ko 버전정보 문자열
   * @type {string}
   * @readonly
   * @example
   * ```ts
   * Flicking.VERSION;  // ex) 4.0.0
   * ```
   */
  Flicking.VERSION = "4.10.7";
  return Flicking;
}(component_esm);

/**
 * Decorator that makes the method of flicking available in the framework.
 * @ko 프레임워크에서 플리킹의 메소드를 사용할 수 있게 하는 데코레이터.
 * @memberof eg.Flicking
 * @private
 * @example
 * ```js
 * import Flicking, { withFlickingMethods } from "@egjs/flicking";
 *
 * class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
 *   &#64;withFlickingMethods
 *   private flicking: Flicking;
 * }
 * ```
 */
var withFlickingMethods = function (prototype, flickingName) {
  [component_esm.prototype, Flicking.prototype].forEach(function (proto) {
    Object.getOwnPropertyNames(proto).filter(function (name) {
      return !prototype[name] && name.indexOf("_") !== 0 && name !== "constructor";
    }).forEach(function (name) {
      var descriptor = Object.getOwnPropertyDescriptor(proto, name);
      if (descriptor.value) {
        // Public Function
        Object.defineProperty(prototype, name, {
          value: function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return (_a = descriptor.value).call.apply(_a, flicking_esm_spread([this[flickingName]], args));
          }
        });
      } else {
        var getterDescriptor = {};
        if (descriptor.get) {
          getterDescriptor.get = function () {
            var _a;
            var flicking = this[flickingName];
            return flicking && ((_a = descriptor.get) === null || _a === void 0 ? void 0 : _a.call(flicking));
          };
        }
        if (descriptor.set) {
          getterDescriptor.set = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return (_a = descriptor.set) === null || _a === void 0 ? void 0 : _a.call.apply(_a, flicking_esm_spread([this[flickingName]], args));
          };
        }
        Object.defineProperty(prototype, name, getterDescriptor);
      }
    });
  });
};
var sync = function (flicking, diffResult, rendered) {
  var renderer = flicking.renderer;
  var panels = renderer.panels;
  var prevList = flicking_esm_spread(diffResult.prevList);
  var added = [];
  var removed = [];
  if (diffResult.removed.length > 0) {
    var endIdx_1 = -1;
    var prevIdx_1 = -1;
    diffResult.removed.forEach(function (removedIdx) {
      if (endIdx_1 < 0) {
        endIdx_1 = removedIdx;
      }
      if (prevIdx_1 >= 0 && removedIdx !== prevIdx_1 - 1) {
        removed.push.apply(removed, flicking_esm_spread(batchRemove(renderer, prevIdx_1, endIdx_1 + 1)));
        endIdx_1 = removedIdx;
        prevIdx_1 = removedIdx;
      } else {
        prevIdx_1 = removedIdx;
      }
      prevList.splice(removedIdx, 1);
    });
    removed.push.apply(removed, flicking_esm_spread(batchRemove(renderer, prevIdx_1, endIdx_1 + 1)));
  }
  diffResult.ordered.forEach(function (_a) {
    var _b = flicking_esm_read(_a, 2),
      from = _b[0],
      to = _b[1];
    var prevPanel = panels.splice(from, 1)[0];
    panels.splice(to, 0, prevPanel);
  });
  if (diffResult.ordered.length > 0) {
    panels.forEach(function (panel, idx) {
      var indexDiff = idx - panel.index;
      if (indexDiff > 0) {
        panel.increaseIndex(indexDiff);
      } else {
        panel.decreaseIndex(-indexDiff);
      }
    });
    panels.sort(function (panel1, panel2) {
      return panel1.index - panel2.index;
    });
    panels.forEach(function (panel) {
      panel.updatePosition();
    });
  }
  if (diffResult.added.length > 0) {
    var startIdx_1 = -1;
    var prevIdx_2 = -1;
    var addedElements_1 = rendered.slice(prevList.length);
    diffResult.added.forEach(function (addedIdx, idx) {
      if (startIdx_1 < 0) {
        startIdx_1 = idx;
      }
      if (prevIdx_2 >= 0 && addedIdx !== prevIdx_2 + 1) {
        added.push.apply(added, flicking_esm_spread(batchInsert(renderer, diffResult, addedElements_1, startIdx_1, idx + 1)));
        startIdx_1 = -1;
        prevIdx_2 = -1;
      } else {
        prevIdx_2 = addedIdx;
      }
    });
    if (startIdx_1 >= 0) {
      added.push.apply(added, flicking_esm_spread(batchInsert(renderer, diffResult, addedElements_1, startIdx_1)));
    }
  }
  if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
    renderer.updateAfterPanelChange(added, removed);
  }
};
var batchInsert = function (renderer, diffResult, addedElements, startIdx, endIdx) {
  return renderer.batchInsertDefer.apply(renderer, flicking_esm_spread(diffResult.added.slice(startIdx, endIdx).map(function (index, elIdx) {
    return {
      index: index,
      elements: [addedElements[elIdx]],
      hasDOMInElements: false
    };
  })));
};
var batchRemove = function (renderer, startIdx, endIdx) {
  var removed = renderer.panels.slice(startIdx, endIdx);
  return renderer.batchRemoveDefer({
    index: startIdx,
    deleteCount: removed.length,
    hasDOMInElements: false
  });
};
var getRenderingPanels = function (flicking, diffResult) {
  var removedPanels = diffResult.removed.reduce(function (map, idx) {
    map[idx] = true;
    return map;
  }, {});
  var maintainedMap = diffResult.maintained.reduce(function (map, _a) {
    var _b = flicking_esm_read(_a, 2),
      prev = _b[0],
      current = _b[1];
    map[prev] = current;
    return map;
  }, {});
  return flicking_esm_spread(flicking.panels.filter(function (panel) {
    return !removedPanels[panel.index];
  })
  // Sort panels by position
  .sort(function (panel1, panel2) {
    return panel1.position + panel1.offset - (panel2.position + panel2.offset);
  }).map(function (panel) {
    return diffResult.list[maintainedMap[panel.index]];
  }), diffResult.added.map(function (idx) {
    return diffResult.list[idx];
  }));
};
var getDefaultCameraTransform = function (align, horizontal, firstPanelSize) {
  if (align === void 0) {
    align = ALIGN.CENTER;
  }
  if (horizontal === void 0) {
    horizontal = true;
  }
  var cameraAlign = getCameraAlign(align);
  var panelAlign = getPanelAlign(align);
  if (panelAlign == null) return "";
  var camPosition = "calc(" + cameraAlign + " - (" + (firstPanelSize || "0px") + " * " + panelAlign.percentage + ") - " + panelAlign.absolute + "px)";
  return horizontal ? "translate(" + camPosition + ")" : "translate(0, " + camPosition + ")";
};
var getCameraAlign = function (align) {
  var alignVal = typeof align === "object" ? align.camera : align;
  return parseAlign(alignVal);
};
var getPanelAlign = function (align) {
  var alignVal = typeof align === "object" ? align.panel : align;
  return parseArithmeticExpression(parseAlign(alignVal));
};
var parseAlign = function (alignVal) {
  if (typeof alignVal === "number") {
    return alignVal + "px";
  }
  switch (alignVal) {
    case ALIGN.CENTER:
      return "50%";
    case ALIGN.NEXT:
      return "100%";
    case ALIGN.PREV:
      return "0%";
    default:
      return alignVal;
  }
};

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */


;// CONCATENATED MODULE: ./node_modules/@egjs/vue3-flicking/dist/flicking.esm.js

/*
Copyright (c) NAVER Corp.
name: @egjs/vue3-flicking
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking/tree/master/packages/vue3-flicking
version: 4.10.7
*/






/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var dist_flicking_esm_extendStatics = function (d, b) {
  dist_flicking_esm_extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return dist_flicking_esm_extendStatics(d, b);
};
function dist_flicking_esm_extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  dist_flicking_esm_extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var dist_flicking_esm_assign = function () {
  dist_flicking_esm_assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return dist_flicking_esm_assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function flicking_esm_awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function flicking_esm_generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function flicking_esm_spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var FlickingProps = {
  viewportTag: {
    type: String,
    default: "div",
    required: false
  },
  cameraTag: {
    type: String,
    default: "div",
    required: false
  },
  cameraClass: {
    type: String,
    default: "",
    required: false
  },
  hideBeforeInit: {
    type: Boolean,
    default: false,
    required: false
  },
  firstPanelSize: {
    type: String,
    required: false
  },
  options: {
    type: Object,
    default: function () {
      return {};
    },
    required: false
  },
  plugins: {
    type: Array,
    default: function () {
      return [];
    },
    required: false
  },
  status: {
    type: Object,
    required: false
  }
};
var VueRenderer = /*#__PURE__*/
function (_super) {
  dist_flicking_esm_extends(VueRenderer, _super);
  function VueRenderer(options) {
    var _this = _super.call(this, options) || this;
    _this._vueFlicking = options.vueFlicking;
    return _this;
  }
  var __proto = VueRenderer.prototype;
  __proto.render = function () {
    return flicking_esm_awaiter(this, void 0, void 0, function () {
      var flicking, vueFlicking, strategy;
      var _this = this;
      return flicking_esm_generator(this, function (_a) {
        flicking = getFlickingAttached(this._flicking);
        vueFlicking = this._vueFlicking;
        strategy = this._strategy;
        strategy.updateRenderingPanels(flicking);
        strategy.renderPanels(flicking);
        return [2
        /*return*/, new Promise(function (resolve) {
          vueFlicking.renderEmitter.once("render", function () {
            _this._afterRender();
            resolve();
          });
          vueFlicking.$forceUpdate();
        })];
      });
    });
  };
  __proto.forceRenderAllPanels = function () {
    return flicking_esm_awaiter(this, void 0, void 0, function () {
      var vueFlicking;
      return flicking_esm_generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            vueFlicking = this._vueFlicking;
            return [4
            /*yield*/, _super.prototype.forceRenderAllPanels.call(this)];
          case 1:
            _a.sent();
            return [2
            /*return*/, new Promise(function (resolve) {
              vueFlicking.renderEmitter.once("render", resolve);
              vueFlicking.$forceUpdate();
            })];
        }
      });
    });
  };
  __proto._collectPanels = function () {
    var flicking = getFlickingAttached(this._flicking);
    var vueFlicking = this._vueFlicking;
    var childRefs = vueFlicking.$refs;
    var vuePanels = Object.keys(childRefs).map(function (refKey) {
      return childRefs[refKey];
    });
    this._panels = this._strategy.collectPanels(flicking, vuePanels);
  };
  __proto._createPanel = function (externalComponent, options) {
    return this._strategy.createPanel(externalComponent, options);
  };
  return VueRenderer;
}(ExternalRenderer);

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
var VuePanel = (0,runtime_core_esm_bundler/* defineComponent */.aZ)({
  data: function () {
    return {
      hide: false
    };
  },
  render: function () {
    if (this.hide || !this.$slots.default) return;
    return this.$slots.default();
  }
});
var VueElementProvider = /*#__PURE__*/
function () {
  function VueElementProvider(el) {
    this._el = el;
  }
  var __proto = VueElementProvider.prototype;
  Object.defineProperty(__proto, "rendered", {
    get: function () {
      return !this._el.hide;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "element", {
    get: function () {
      var el = this._el.$el.nextSibling;
      if (el && el.nodeType === Node.ELEMENT_NODE) {
        this._cachedElement = el;
      }
      return this._cachedElement;
    },
    enumerable: false,
    configurable: true
  });
  __proto.show = function () {
    this._el.hide = false;
  };
  __proto.hide = function () {
    this._el.hide = true;
  };
  return VueElementProvider;
}();
var flicking_esm_Flicking = (0,runtime_core_esm_bundler/* defineComponent */.aZ)({
  props: FlickingProps,
  components: {
    Panel: VuePanel
  },
  data: function () {
    return {};
  },
  created: function () {
    var _this = this;
    this.vanillaFlicking = null;
    this.renderEmitter = new component_esm();
    this.diffResult = null;
    this.getPanels = function () {
      var componentInstance = (0,runtime_core_esm_bundler/* getCurrentInstance */.FN)();
      var vueFlicking = componentInstance === null || componentInstance === void 0 ? void 0 : componentInstance.ctx;
      var flicking = _this.vanillaFlicking;
      var defaultSlots = _this.getSlots();
      var diffResult = vueFlicking === null || vueFlicking === void 0 ? void 0 : vueFlicking.diffResult;
      var slots = diffResult ? getRenderingPanels(flicking, diffResult) : defaultSlots;
      var panelComponent = (0,runtime_core_esm_bundler/* resolveComponent */.up)("Panel");
      var panels = slots.map(function (slot, idx) {
        return (0,runtime_core_esm_bundler.h)(panelComponent, {
          key: slot.key,
          ref: idx.toString()
        }, function () {
          return slot;
        });
      });
      return panels;
    };
    this.getVirtualPanels = function () {
      var options = _this.options;
      var _a = options.virtual.panelClass,
        panelClass = _a === void 0 ? "flicking-panel" : _a;
      var panelsPerView = options.panelsPerView;
      var flicking = _this.vanillaFlicking;
      var initialized = flicking && flicking.initialized;
      var renderingIndexes = initialized ? flicking.renderer.strategy.getRenderingIndexesByOrder(flicking) : range(panelsPerView + 1);
      var firstPanel = initialized && flicking.panels[0];
      var size = firstPanel ? flicking.horizontal ? {
        width: firstPanel.size
      } : {
        height: firstPanel.size
      } : {};
      return renderingIndexes.map(function (idx) {
        return (0,runtime_core_esm_bundler.h)("div", {
          key: idx,
          ref: idx.toString(),
          class: panelClass,
          style: size,
          "data-element-index": idx
        });
      });
    };
    withFlickingMethods(this, "vanillaFlicking");
  },
  mounted: function () {
    var _this = this;
    var _a;
    var options = this.options;
    var viewportEl = this.$el;
    var rendererOptions = {
      vueFlicking: this,
      align: options.align,
      strategy: options.virtual && ((_a = options.panelsPerView) !== null && _a !== void 0 ? _a : -1) > 0 ? new VirtualRenderingStrategy() : new NormalRenderingStrategy({
        providerCtor: VueElementProvider
      })
    };
    var flicking = new Flicking(viewportEl, dist_flicking_esm_assign(dist_flicking_esm_assign({}, options), {
      externalRenderer: new VueRenderer(rendererOptions)
    }));
    this.vanillaFlicking = flicking;
    flicking.once(flicking_esm_EVENTS.READY, function () {
      _this.$forceUpdate();
    });
    var slots = this.getSlots();
    this.slotDiffer = new list_differ_esm(slots, function (vnode) {
      return vnode.key;
    });
    this.pluginsDiffer = new list_differ_esm();
    this.bindEvents();
    this.checkPlugins();
    if (this.status) {
      flicking.setStatus(this.status);
    }
  },
  beforeUnmount: function () {
    var _a;
    (_a = this.vanillaFlicking) === null || _a === void 0 ? void 0 : _a.destroy();
  },
  beforeMount: function () {
    this.fillKeys();
  },
  beforeUpdate: function () {
    this.fillKeys();
    this.diffResult = this.slotDiffer.update(this.getSlots());
  },
  updated: function () {
    var flicking = this.vanillaFlicking;
    var diffResult = this.diffResult;
    this.checkPlugins();
    this.renderEmitter.trigger("render");
    if (!diffResult || !(flicking === null || flicking === void 0 ? void 0 : flicking.initialized)) return;
    var children = this.getChildren();
    sync(flicking, diffResult, children);
    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.$forceUpdate();
    }
    this.diffResult = undefined;
  },
  render: function () {
    var _a;
    var _b;
    var flicking = this.vanillaFlicking;
    var options = this.options;
    var initialized = flicking && flicking.initialized;
    var isHorizontal = flicking ? flicking.horizontal : (_b = this.options.horizontal) !== null && _b !== void 0 ? _b : true;
    var viewportData = {
      class: {
        "flicking-viewport": true,
        "vertical": !isHorizontal,
        "flicking-hidden": this.hideBeforeInit && !initialized
      }
    };
    var cameraData = {
      class: (_a = {
        "flicking-camera": true
      }, _a[this.cameraClass] = !!this.cameraClass, _a),
      style: !initialized && this.firstPanelSize ? {
        transform: getDefaultCameraTransform(this.options.align, this.options.horizontal, this.firstPanelSize)
      } : {}
    };
    var panels = options.virtual && options.panelsPerView && options.panelsPerView > 0 ? this.getVirtualPanels : this.getPanels;
    var viewportSlots = this.$slots.viewport ? this.$slots.viewport() : [];
    return (0,runtime_core_esm_bundler.h)(this.viewportTag, viewportData, flicking_esm_spreadArray([(0,runtime_core_esm_bundler.h)(this.cameraTag, cameraData, {
      default: panels
    })], viewportSlots, true));
  },
  methods: {
    getSlots: function () {
      var _this = this;
      var slots = this.$slots.default ? this.$slots.default() : [];
      return slots.reduce(function (elementSlots, slot) {
        return flicking_esm_spreadArray(flicking_esm_spreadArray([], elementSlots, true), _this.getElementVNodes(slot), true);
      }, []).filter(function (slot) {
        return slot.type !== runtime_core_esm_bundler/* Comment */.sv && slot.type !== runtime_core_esm_bundler/* Text */.xv;
      });
    },
    getElementVNodes: function (slot, childSlots) {
      var _this = this;
      if (childSlots === void 0) {
        childSlots = [];
      }
      if (slot.type === runtime_core_esm_bundler/* Fragment */.HY && Array.isArray(slot.children)) {
        slot.children.filter(function (child) {
          return child && typeof child === "object";
        }).forEach(function (child) {
          return _this.getElementVNodes(child, childSlots);
        });
      } else {
        childSlots.push(slot);
      }
      return childSlots;
    },
    bindEvents: function () {
      var _this = this;
      var flicking = this.vanillaFlicking;
      var events = Object.keys(flicking_esm_EVENTS).map(function (key) {
        return flicking_esm_EVENTS[key];
      });
      events.forEach(function (eventName) {
        flicking.on(eventName, function (e) {
          e.currentTarget = _this; // Make events from camelCase to kebab-case

          _this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
        });
      });
    },
    checkPlugins: function () {
      var _a, _b;
      var _c = this.pluginsDiffer.update(this.plugins),
        list = _c.list,
        added = _c.added,
        removed = _c.removed,
        prevList = _c.prevList;
      (_a = this.vanillaFlicking).addPlugins.apply(_a, added.map(function (index) {
        return list[index];
      }));
      (_b = this.vanillaFlicking).removePlugins.apply(_b, removed.map(function (index) {
        return prevList[index];
      }));
    },
    fillKeys: function () {
      var vnodes = this.getSlots();
      vnodes.forEach(function (node, idx) {
        if (node.key == null) {
          node.key = "$_".concat(idx);
        }
      });
    },
    getChildren: function () {
      var childRefs = this.$refs;
      return Object.keys(childRefs).map(function (refKey) {
        return childRefs[refKey];
      });
    }
  },
  watch: {
    options: {
      handler: function (newOptions) {
        var flicking = this.vanillaFlicking;
        if (!flicking) return; // Omit 'virtual', as it can't have any setter

        newOptions.virtual;
        var options = __rest(newOptions, ["virtual"]); // eslint-disable-line @typescript-eslint/no-unused-vars

        for (var key in options) {
          if (key in flicking && flicking[key] !== options[key]) {
            flicking[key] = options[key];
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
});


/***/ }),

/***/ 242:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ Card; }
});

// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(3396);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(7139);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.mjs + 2 modules
var VBtn = __webpack_require__(5101);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtnGroup/VBtnGroup.mjs + 1 modules
var VBtnGroup = __webpack_require__(401);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.mjs + 1 modules
var VCard = __webpack_require__(1489);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCardText.mjs
var VCardText = __webpack_require__(1888);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCardActions.mjs
var VCardActions = __webpack_require__(1334);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/Card.vue?vue&type=template&id=3b542480&scoped=true&ts=true

const _withScopeId = n => (_pushScopeId("data-v-3b542480"), n = n(), _popScopeId(), n);
const _hoisted_1 = {
  class: "pl-4 pr-4 text-h4 text-uppercase"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
                                                                  
                                                      
  const _component_menu_dots = (0,runtime_core_esm_bundler/* resolveComponent */.up)("menu-dots");
                                                                  
                                                                        
                                                        
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VCard/* VCard */._, {
    class: "card"
  }, {
    default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCardText/* VCardText */.Z, {
      class: "card__text"
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* renderSlot */.WI)(_ctx.$slots, "body", {}, undefined, true)]),
      _: 3
    }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCardActions/* VCardActions */.h, {
      class: "justify-space-between"
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_1, (0,shared_esm_bundler/* toDisplayString */.zw)($props.title), 1), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VBtnGroup/* VBtnGroup */.Y, {
        class: "border-dialog-btns"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [$props.custom !== undefined ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VBtn/* VBtn */.T, {
          key: 0,
          icon: $props.custom,
          color: "primary",
          onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('click:custom'))
        }, null, 8, ["icon"])) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.like !== undefined ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VBtn/* VBtn */.T, {
          key: 1,
          icon: "mdi-heart",
          color: "primary",
          onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('click:like'))
        })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.menu && $props.menu.length > 0 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_menu_dots, {
          key: 2,
          menu: $props.menu,
          color: "primary",
          "onClick:item": _cache[2] || (_cache[2] = $event => _ctx.$emit('click:menu', $event))
        }, null, 8, ["menu"])) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)]),
        _: 1
      })]),
      _: 1
    })]),
    _: 3
  });
}

/* Vuetify */





;// CONCATENATED MODULE: ./src/components/cards/Card.vue?vue&type=template&id=3b542480&scoped=true&ts=true

// EXTERNAL MODULE: ./src/components/MenuDots.vue + 3 modules
var MenuDots = __webpack_require__(6593);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/Card.vue?vue&type=script&lang=ts

/* harmony default export */ var Cardvue_type_script_lang_ts = ({
  name: "Card",
  components: {
    MenuDots: MenuDots/* default */.Z
  },
  props: {
    title: String,
    menu: Array,
    like: {
      type: Boolean,
      default: undefined
    },
    custom: {
      type: String,
      default: undefined
    }
  },
  emits: ["click:custom", "click:like", "click:menu"]
});
;// CONCATENATED MODULE: ./src/components/cards/Card.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/Card.vue?vue&type=style&index=0&id=3b542480&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/cards/Card.vue?vue&type=style&index=0&id=3b542480&lang=scss&scoped=true

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(89);
;// CONCATENATED MODULE: ./src/components/cards/Card.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(Cardvue_type_script_lang_ts, [['render',render],['__scopeId',"data-v-3b542480"]])

/* harmony default export */ var Card = (__exports__);

/***/ }),

/***/ 2905:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ SwitchCardItem; }
});

// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(3396);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VSwitch/VSwitch.mjs + 1 modules
var VSwitch = __webpack_require__(3104);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/VTextField.mjs
var VTextField = __webpack_require__(165);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/SwitchCardItem.vue?vue&type=template&id=737d97f3&scoped=true&ts=true

const _withScopeId = n => (_pushScopeId("data-v-737d97f3"), n = n(), _popScopeId(), n);
const _hoisted_1 = {
  class: "switch-card-item"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
                                                                    
                                                            
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VTextField/* VTextField */.h, {
    "model-value": $props.title,
    hint: $props.description,
    variant: "underlined",
    density: "compact",
    "persistent-hint": "",
    readonly: "",
    dense: "",
    disabled: $props.disabled
  }, null, 8, ["model-value", "hint", "disabled"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VSwitch/* VSwitch */.G, {
    modelValue: $setup.modelSwitch,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.modelSwitch = $event),
    class: "switch-card-item__switch",
    density: "compact",
    color: $props.color,
    "hide-details": "",
    disabled: $props.nodata || $props.disabled
  }, null, 8, ["modelValue", "color", "disabled"])]);
}

/* Vuetify */




;// CONCATENATED MODULE: ./src/components/cards/SwitchCardItem.vue?vue&type=template&id=737d97f3&scoped=true&ts=true

// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(4870);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/SwitchCardItem.vue?vue&type=script&lang=ts

/* harmony default export */ var SwitchCardItemvue_type_script_lang_ts = ({
  name: "SwitchCardItem",
  props: {
    /** Значение switch */
    modelValue: Boolean,
    /** Заголовок */
    title: String,
    /** Описание */
    description: String,
    /** Цвет switch */
    color: {
      type: String,
      default: "success"
    },
    /** Нет данных */
    nodata: Boolean,
    /** Выкл. */
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(props, {
    emit
  }) {
    const {
      modelValue,
      disabled
    } = (0,reactivity_esm_bundler/* toRefs */.BK)(props);
    const modelSwitch = (0,runtime_core_esm_bundler/* computed */.Fl)({
      get: () => modelValue.value,
      set: val => {
        if (!disabled.value) {
          emit("update:modelValue", val);
          emit("change", val);
        }
      }
    });
    return {
      modelSwitch
    };
  }
});
;// CONCATENATED MODULE: ./src/components/cards/SwitchCardItem.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/SwitchCardItem.vue?vue&type=style&index=0&id=737d97f3&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/cards/SwitchCardItem.vue?vue&type=style&index=0&id=737d97f3&lang=scss&scoped=true

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(89);
;// CONCATENATED MODULE: ./src/components/cards/SwitchCardItem.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(SwitchCardItemvue_type_script_lang_ts, [['render',render],['__scopeId',"data-v-737d97f3"]])

/* harmony default export */ var SwitchCardItem = (__exports__);

/***/ }),

/***/ 6733:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ ViewSettingDialog; }
});

// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(3396);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(7139);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.mjs + 2 modules
var VBtn = __webpack_require__(5101);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.mjs
var VRow = __webpack_require__(6824);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.mjs
var VCol = __webpack_require__(8521);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VSelect/VSelect.mjs + 1 modules
var VSelect = __webpack_require__(240);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/ViewSettingDialog.vue?vue&type=template&id=01a1127c&scoped=true&ts=true

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_switch_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("switch-card-item");
                                                      
                                                            
  const _component_number_field = (0,runtime_core_esm_bundler/* resolveComponent */.up)("number-field");
                                                      
                                                      
  const _component_dialog_template = (0,runtime_core_esm_bundler/* resolveComponent */.up)("dialog-template");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_dialog_template, {
    modelValue: $setup.visible,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.visible = $event),
    "content-class": "view-setting-dialog",
    icon: "lcd",
    title: $props.title,
    width: "550px",
    text: "",
    actions: ""
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, null, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          modelValue: $setup.modelEnabled,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.modelEnabled = $event),
          title: _ctx.$t('onboard.viewSetting.enabled.title'),
          description: _ctx.$t('onboard.viewSetting.enabled.description'),
          disabled: $props.disabled
        }, null, 8, ["modelValue", "title", "description", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VSelect/* VSelect */.r, {
          modelValue: $setup.modelType,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $setup.modelType = $event),
          label: _ctx.$t('onboard.viewSetting.type.title'),
          items: $setup.typeItems,
          hint: _ctx.$t('onboard.viewSetting.type.description'),
          variant: "underlined",
          "item-title": "label",
          "item-value": "value",
          "persistent-hint": "",
          disabled: $props.disabled
        }, null, 8, ["modelValue", "label", "items", "hint", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_number_field, {
          modelValue: $setup.modelTime,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.modelTime = $event),
          label: _ctx.$t('onboard.viewSetting.time.title'),
          hint: _ctx.$t('onboard.viewSetting.time.description'),
          disabled: $props.disabled,
          min: 1,
          max: 300
        }, null, 8, ["modelValue", "label", "hint", "disabled"])]),
        _: 1
      })]),
      _: 1
    })]),
    btns: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VBtn/* VBtn */.T, {
      color: "primary",
      "prepend-icon": "mdi-check",
      onClick: $setup.onApplyClick,
      disabled: $props.disabled
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$t("btn.apply")), 1)]),
      _: 1
    }, 8, ["onClick", "disabled"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VBtn/* VBtn */.T, {
      color: "primary",
      "prepend-icon": "mdi-close",
      onClick: _cache[3] || (_cache[3] = $event => $setup.visible = false)
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$t("btn.close")), 1)]),
      _: 1
    })]),
    _: 1
  }, 8, ["modelValue", "title"]);
}

/* Vuetify */





// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(4870);
// EXTERNAL MODULE: ./node_modules/vue-i18n/dist/vue-i18n.esm-bundler.js + 4 modules
var vue_i18n_esm_bundler = __webpack_require__(5658);
// EXTERNAL MODULE: ./src/layout/components/DialogTemplate.vue + 6 modules
var DialogTemplate = __webpack_require__(2196);
// EXTERNAL MODULE: ./src/components/cards/SwitchCardItem.vue + 6 modules
var SwitchCardItem = __webpack_require__(2905);
// EXTERNAL MODULE: ./src/components/common/NumberField.vue + 3 modules
var NumberField = __webpack_require__(5412);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/ViewSettingDialog.vue?vue&type=script&lang=ts





/* harmony default export */ var ViewSettingDialogvue_type_script_lang_ts = ({
  name: "ViewSettingDialog",
  components: {
    DialogTemplate: DialogTemplate/* default */.Z,
    SwitchCardItem: SwitchCardItem/* default */.Z,
    NumberField: NumberField/* default */.Z
  },
  props: {
    /** Отображение диалога */
    modelValue: {
      type: Boolean,
      default: false
    },
    /** Заголовок */
    title: {
      type: String,
      require: true
    },
    /** Вкл/выкл. отображения на LCD */
    enabled: Boolean,
    /** Тип вывода текста на LCD */
    type: Number,
    /** Время отображения текста на LCD, сек */
    time: Number,
    /** Выкл. */
    disabled: Boolean
  },
  emits: ["update:modelValue", "click:apply"],
  setup(props, {
    emit
  }) {
    const {
      modelValue,
      enabled,
      type,
      time
    } = (0,reactivity_esm_bundler/* toRefs */.BK)(props);
    const {
      tm
    } = (0,vue_i18n_esm_bundler/* useI18n */.QT)();
    const visible = (0,runtime_core_esm_bundler/* computed */.Fl)({
      get: () => modelValue.value,
      set: val => emit("update:modelValue", val)
    });
    const modelEnabled = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const modelType = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const typeItems = (0,runtime_core_esm_bundler/* computed */.Fl)(() => tm("onboard.viewSetting.type.items")?.map((x, i) => ({
      label: x,
      value: i
    })));
    const modelTime = (0,reactivity_esm_bundler/* ref */.iH)(3);
    (0,runtime_core_esm_bundler/* watch */.YP)(visible, val => {
      if (val) {
        modelEnabled.value = enabled.value ?? false;
        modelType.value = type.value ?? 0;
        modelTime.value = time.value ?? 3;
      }
    });
    /** Применить изменения и закрыть диалог */
    const onApplyClick = () => {
      visible.value = false;
      emit("click:apply", {
        enabled: modelEnabled.value,
        type: modelType.value,
        time: modelTime.value
      });
    };
    return {
      visible,
      modelEnabled,
      modelType,
      typeItems,
      modelTime,
      onApplyClick
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/ViewSettingDialog.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/ViewSettingDialog.vue?vue&type=style&index=0&id=01a1127c&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/views/onboard/components/ViewSettingDialog.vue?vue&type=style&index=0&id=01a1127c&lang=scss&scoped=true

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(89);
;// CONCATENATED MODULE: ./src/views/onboard/components/ViewSettingDialog.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(ViewSettingDialogvue_type_script_lang_ts, [['render',render],['__scopeId',"data-v-01a1127c"]])

/* harmony default export */ var ViewSettingDialog = (__exports__);

/***/ }),

/***/ 3234:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ onboard; }
});

// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(3396);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(7139);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/index.vue?vue&type=template&id=10185709&scoped=true&ts=true

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_flicking = (0,runtime_core_esm_bundler/* resolveComponent */.up)("flicking");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_flicking, {
    ref: "flicking",
    class: "onboard",
    options: {
      bound: true,
      align: 'prev'
    }
  }, {
    default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($setup.cardList, item => {
      return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
        key: item.name,
        class: (0,shared_esm_bundler/* normalizeClass */.C_)(["mr-4", `flicking-${$setup.display}`])
      }, [((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)((0,runtime_core_esm_bundler/* resolveDynamicComponent */.LL)(`${item.name}-card`), {
        "car-model": $setup.carModel
      }, null, 8, ["car-model"]))], 2);
    }), 128))]),
    _: 1
  }, 512);
}
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(4870);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/composables/display.mjs
var composables_display = __webpack_require__(8157);
// EXTERNAL MODULE: ./src/store/index.ts + 12 modules
var store = __webpack_require__(9918);
// EXTERNAL MODULE: ./node_modules/@egjs/vue3-flicking/dist/flicking.esm.js + 8 modules
var flicking_esm = __webpack_require__(9363);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.mjs
var VRow = __webpack_require__(6824);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.mjs
var VCol = __webpack_require__(8521);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/InfoCard.vue?vue&type=template&id=279e77e0&ts=true

function InfoCardvue_type_template_id_279e77e0_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("icon-card-item");
                                                      
  const _component_input_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("input-card-item");
  const _component_switch_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("switch-card-item");
                                                      
  const _component_card = (0,runtime_core_esm_bundler/* resolveComponent */.up)("card");
  const _component_view_setting_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("view-setting-dialog");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_card, {
    class: "info-card",
    title: _ctx.$t('onboard.info.title'),
    menu: $setup.menu,
    "onClick:menu": $setup.onMenuClick
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, null, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_card_item, {
          "model-value": [$setup.acc],
          title: _ctx.$t('onboard.info.acc.title'),
          description: _ctx.$t('onboard.info.acc.description'),
          "icon-name": ['key'],
          nodata: !$setup.isLoadedSensorValue,
          disabled: !$setup.isLoadedSensorView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.worktime,
          title: _ctx.$t('onboard.info.worktime.title'),
          description: _ctx.$t('onboard.info.worktime.description'),
          type: "mtime",
          nodata: !$setup.isLoadedDeviceValue,
          disabled: !$setup.isLoadedSensorView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), $props.carModel === $options.ECarModel.CAR_MODEL_MAZDA3 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VCol/* VCol */.D, {
        key: 0,
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.temperature,
          title: _ctx.$t('onboard.info.temperature.title'),
          description: _ctx.$t('onboard.info.temperature.description'),
          type: "temperature",
          nodata: !$setup.isLoadedTemperatureValue,
          disabled: !$setup.isLoadedTemperatureView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.carModel === $options.ECarModel.CAR_MODEL_MAZDA3 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VCol/* VCol */.D, {
        key: 1,
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          "model-value": $setup.handbrake,
          title: _ctx.$t('onboard.info.handbrake.title'),
          description: _ctx.$t('onboard.info.handbrake.description'),
          color: "error",
          nodata: !$setup.isLoadedSensorValue,
          disabled: !$setup.isLoadedSensorView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.carModel === $options.ECarModel.CAR_MODEL_MAZDA3 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VCol/* VCol */.D, {
        key: 2,
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          "model-value": $setup.reverse,
          title: _ctx.$t('onboard.info.reverse.title'),
          description: _ctx.$t('onboard.info.reverse.description'),
          color: "warning",
          nodata: !$setup.isLoadedSensorValue,
          disabled: !$setup.isLoadedSensorView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.carModel === $options.ECarModel.CAR_MODEL_MAZDA3 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VCol/* VCol */.D, {
        key: 3,
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_card_item, {
          "model-value": [$setup.seatbeltPassenger, $setup.seatbeltDriver],
          title: _ctx.$t('onboard.info.safetyBelt.title'),
          description: _ctx.$t('onboard.info.safetyBelt.description'),
          "icon-name": ['passenger', 'passenger'],
          colorsTrue: $setup.acc ? {
            primary: 'success'
          } : undefined,
          colorsFalse: $setup.acc ? {
            primary: 'error'
          } : undefined,
          nodata: !$setup.isLoadedSensorValue,
          disabled: !$setup.isLoadedSensorView
        }, null, 8, ["model-value", "title", "description", "colorsTrue", "colorsFalse", "nodata", "disabled"])]),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.carModel === $options.ECarModel.CAR_MODEL_MAZDA3 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VCol/* VCol */.D, {
        key: 4,
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_card_item, {
          "model-value": [$setup.signalRight, $setup.signalLeft],
          title: _ctx.$t('onboard.info.signal.title'),
          description: _ctx.$t('onboard.info.signal.description'),
          "icon-name": ['arrow-right', 'arrow-left'],
          colorsTrue: {
            primary: 'success'
          },
          nodata: !$setup.isLoadedSensorValue,
          disabled: !$setup.isLoadedSensorView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)]),
      _: 1
    })]),
    _: 1
  }, 8, ["title", "menu", "onClick:menu"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_view_setting_dialog, {
    modelValue: $setup.menuVisible,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.menuVisible = $event),
    title: $setup.menuSelected.title,
    enabled: $setup.menuViewConfig.enabled,
    type: $setup.menuViewConfig.type,
    time: $setup.menuViewConfig.time,
    disabled: !$setup.isLoadedSensorView,
    "onClick:apply": $setup.onViewSettingApply
  }, null, 8, ["modelValue", "title", "enabled", "type", "time", "disabled", "onClick:apply"])], 64);
}

/* Vuetify */



// EXTERNAL MODULE: ./node_modules/vue-i18n/dist/vue-i18n.esm-bundler.js + 4 modules
var vue_i18n_esm_bundler = __webpack_require__(5658);
// EXTERNAL MODULE: ./src/components/cards/Card.vue + 6 modules
var Card = __webpack_require__(242);
// EXTERNAL MODULE: ./src/components/cards/InputCardItem.vue + 6 modules
var InputCardItem = __webpack_require__(5943);
// EXTERNAL MODULE: ./src/components/cards/SwitchCardItem.vue + 6 modules
var SwitchCardItem = __webpack_require__(2905);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/VTextField.mjs
var VTextField = __webpack_require__(165);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/IconCardItem.vue?vue&type=template&id=9d490c8c&scoped=true&ts=true

const _withScopeId = n => (_pushScopeId("data-v-9d490c8c"), n = n(), _popScopeId(), n);
const _hoisted_1 = {
  class: "icon-card-item"
};
function IconCardItemvue_type_template_id_9d490c8c_scoped_true_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
                                                                    
  const _component_icon_custom = (0,runtime_core_esm_bundler/* resolveComponent */.up)("icon-custom");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VTextField/* VTextField */.h, {
    "model-value": $props.title,
    hint: $props.description,
    variant: "underlined",
    density: "compact",
    "persistent-hint": "",
    readonly: "",
    dense: "",
    disabled: $props.disabled
  }, null, 8, ["model-value", "hint", "disabled"]), ((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($setup.iconList, (item, index) => {
    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_icon_custom, {
      key: `icon-card-item_${index}`,
      class: "icon-card-item__icon",
      style: (0,shared_esm_bundler/* normalizeStyle */.j5)({
        right: `${parseInt($props.size) * index + ($props.margin ? $props.margin * index : 0)}px`
      }),
      name: item.name,
      colors: item.colors,
      size: $props.size,
      onClick: $event => $setup.onChange(index)
    }, null, 8, ["style", "name", "colors", "size", "onClick"]);
  }), 128))]);
}

/* Vuetify */



;// CONCATENATED MODULE: ./src/components/cards/IconCardItem.vue?vue&type=template&id=9d490c8c&scoped=true&ts=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./src/components/common/icon-custom/IconCustom.vue + 5 modules
var IconCustom = __webpack_require__(1776);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/IconCardItem.vue?vue&type=script&lang=ts



/* harmony default export */ var IconCardItemvue_type_script_lang_ts = ({
  name: "IconCardItem",
  components: {
    IconCustom: IconCustom/* default */.Z
  },
  props: {
    /** Список значений иконок */
    modelValue: Array,
    /** Заголовок */
    title: String,
    /** Описание */
    description: String,
    /** Список имен иконок */
    iconName: Array,
    /** Цвета вкл. иконки */
    colorsTrue: {
      type: Object,
      default: () => ({
        primary: "success",
        secondary: "#e2e2e2"
      })
    },
    /** Цвета выкл. иконки */
    colorsFalse: {
      type: Object,
      default: () => ({
        primary: "disable",
        secondary: "disable"
      })
    },
    /** Размер иконок */
    size: {
      type: String,
      default: "44px"
    },
    /** Отступ */
    margin: Number,
    /** Нет данных */
    nodata: Boolean,
    /** Выкл. */
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(props, {
    emit
  }) {
    const {
      modelValue,
      iconName,
      colorsTrue,
      colorsFalse,
      nodata,
      disabled
    } = (0,reactivity_esm_bundler/* toRefs */.BK)(props);
    /**
     * Изменение состояния
     * @param {number} index
     */
    const onChange = index => {
      if (!disabled.value) {
        modelValue.value[index] = !modelValue.value[index];
        emit("update:modelValue", modelValue.value);
        emit("change", modelValue.value);
      }
    };
    /** Список параметров иконок */
    const iconList = (0,runtime_core_esm_bundler/* computed */.Fl)(() => {
      const result = [];
      modelValue.value?.forEach((x, i) => {
        result.push({
          name: iconName.value[i],
          colors: x && !nodata.value && !disabled.value ? colorsTrue.value : colorsFalse.value
        });
      });
      return result;
    });
    return {
      iconList,
      onChange
    };
  }
});
;// CONCATENATED MODULE: ./src/components/cards/IconCardItem.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/IconCardItem.vue?vue&type=style&index=0&id=9d490c8c&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/cards/IconCardItem.vue?vue&type=style&index=0&id=9d490c8c&lang=scss&scoped=true

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(89);
;// CONCATENATED MODULE: ./src/components/cards/IconCardItem.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(IconCardItemvue_type_script_lang_ts, [['render',IconCardItemvue_type_template_id_9d490c8c_scoped_true_ts_true_render],['__scopeId',"data-v-9d490c8c"]])

/* harmony default export */ var IconCardItem = (__exports__);
// EXTERNAL MODULE: ./src/views/onboard/components/ViewSettingDialog.vue + 5 modules
var ViewSettingDialog = __webpack_require__(6733);
// EXTERNAL MODULE: ./src/models/pjcan/variables/sensors/index.ts + 3 modules
var variables_sensors = __webpack_require__(2343);
// EXTERNAL MODULE: ./src/models/pjcan/variables/temperature/index.ts + 2 modules
var variables_temperature = __webpack_require__(8951);
// EXTERNAL MODULE: ./src/models/pjcan/device/index.ts + 3 modules
var device = __webpack_require__(9065);
// EXTERNAL MODULE: ./src/api/canbus.ts + 12 modules
var canbus = __webpack_require__(4225);
// EXTERNAL MODULE: ./src/models/pjcan/car/index.ts + 3 modules
var car = __webpack_require__(3053);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/InfoCard.vue?vue&type=script&lang=ts












/* harmony default export */ var InfoCardvue_type_script_lang_ts = ({
  name: "InfoCard",
  computed: {
    ECarModel() {
      return car/* ECarModel */.qZ;
    }
  },
  components: {
    Card: Card/* default */.Z,
    InputCardItem: InputCardItem/* default */.Z,
    SwitchCardItem: SwitchCardItem/* default */.Z,
    IconCardItem: IconCardItem,
    ViewSettingDialog: ViewSettingDialog/* default */.Z
  },
  props: {
    carModel: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const {
      carModel
    } = (0,reactivity_esm_bundler/* toRefs */.BK)(props);
    const {
      t
    } = (0,vue_i18n_esm_bundler/* useI18n */.QT)();
    const isLoadedDeviceValue = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedSensorValue = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedSensorView = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedTemperatureValue = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedTemperatureView = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const acc = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const worktime = (0,reactivity_esm_bundler/* ref */.iH)(BigInt(0));
    const temperature = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const handbrake = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const reverse = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const seatbeltDriver = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const seatbeltPassenger = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const signalLeft = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const signalRight = (0,reactivity_esm_bundler/* ref */.iH)(false);
    /**
     * Входящие значения устройства
     * @param {IDeviceValue} res
     */
    const onReceiveDeviceValue = res => {
      isLoadedDeviceValue.value = res.isData;
      if (res.isData) {
        // @ts-ignore
        worktime.value = res.worktime;
      }
    };
    /**
     * Входящие значения датчиков
     * @param {ISensorsValue} res
     */
    const onReceiveSensorValue = res => {
      isLoadedSensorValue.value = res.isData;
      if (res.isData) {
        acc.value = res.acc;
        handbrake.value = res.handbrake;
        reverse.value = res.reverse;
        seatbeltDriver.value = res.seatbeltDriver;
        seatbeltPassenger.value = res.seatbeltPassenger;
        signalLeft.value = res.signal === variables_sensors/* TSensorsSignal.SIGNAL_LEFT */.Mq.SIGNAL_LEFT || res.signal === variables_sensors/* TSensorsSignal.SIGNAL_EMERGENCY */.Mq.SIGNAL_EMERGENCY;
        signalRight.value = res.signal === variables_sensors/* TSensorsSignal.SIGNAL_RIGHT */.Mq.SIGNAL_RIGHT || res.signal === variables_sensors/* TSensorsSignal.SIGNAL_EMERGENCY */.Mq.SIGNAL_EMERGENCY;
      }
    };
    /**
     * Входящие значения отображения датчиков
     * @param {ISensorsView} res
     */
    const onReceiveSensorView = res => {
      isLoadedSensorView.value = res.isData;
    };
    /**
     * Входящие значения температуры
     * @param {ITemperatureValue} res
     */
    const onReceiveTemperatureValue = res => {
      isLoadedTemperatureValue.value = res.isData;
      if (res.isData) {
        temperature.value = res.out / 10;
      }
    };
    /**
     * Входящие значения отображения температуры
     * @param {ITemperatureView} res
     */
    const onReceiveTemperatureView = res => {
      isLoadedTemperatureView.value = res.isData;
    };
    // регистрируем события
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].addListener(device/* API_DEVICE_EVENT */.kS, onReceiveDeviceValue);
      canbus["default"].addListener(variables_sensors/* API_VARIABLE_SENSORS_EVENT */.bs, onReceiveSensorValue);
      canbus["default"].addListener(variables_sensors/* API_VARIABLE_SENSORS_VIEW_EVENT */.Ht, onReceiveSensorView);
      canbus["default"].addListener(variables_temperature/* API_VARIABLE_TEMPERATURE_EVENT */.Yk, onReceiveTemperatureValue);
      canbus["default"].addListener(variables_temperature/* API_VARIABLE_TEMPERATURE_VIEW_EVENT */.LN, onReceiveTemperatureView);
      onReceiveDeviceValue(canbus["default"].values.device);
      onReceiveSensorValue(canbus["default"].values.variable.sensors);
      onReceiveSensorView(canbus["default"].views.variable.sensors);
      onReceiveTemperatureValue(canbus["default"].values.variable.temperature);
      onReceiveTemperatureView(canbus["default"].views.variable.temperature);
    });
    // удаляем события
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].removeListener(device/* API_DEVICE_EVENT */.kS, onReceiveDeviceValue);
      canbus["default"].removeListener(variables_sensors/* API_VARIABLE_SENSORS_EVENT */.bs, onReceiveSensorValue);
      canbus["default"].removeListener(variables_sensors/* API_VARIABLE_SENSORS_VIEW_EVENT */.Ht, onReceiveSensorView);
      canbus["default"].removeListener(variables_temperature/* API_VARIABLE_TEMPERATURE_EVENT */.Yk, onReceiveTemperatureValue);
      canbus["default"].removeListener(variables_temperature/* API_VARIABLE_TEMPERATURE_VIEW_EVENT */.LN, onReceiveTemperatureView);
    });
    // МЕНЮ ОТОБРАЖЕНИЯ
    const menu = (0,runtime_core_esm_bundler/* computed */.Fl)(() => carModel.value === car/* ECarModel.CAR_MODEL_MAZDA3 */.qZ.CAR_MODEL_MAZDA3 ? [{
      id: 0,
      title: t("onboard.info.temperature.menu")
    }, {
      id: 1,
      title: t("onboard.info.handbrake.menu")
    }, {
      id: 2,
      title: t("onboard.info.reverse.menu")
    }, {
      id: 3,
      title: t("onboard.info.safetyBelt.menu")
    }, {
      id: 4,
      title: t("onboard.info.signal.menu")
    }] : []);
    const menuVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const menuSelected = (0,reactivity_esm_bundler/* ref */.iH)({});
    const menuViewConfig = (0,reactivity_esm_bundler/* ref */.iH)({});
    const isLoaded = (0,reactivity_esm_bundler/* ref */.iH)(false);
    /**
     * Выбор пункта меню отображения на информационном экране
     * @param {IMenuItem} item Элемент меню
     */
    const onMenuClick = item => {
      menuVisible.value = true;
      menuSelected.value = item;
      const {
        temperature,
        sensors
      } = canbus["default"].views.variable;
      switch (item.id) {
        case 0:
          menuViewConfig.value = temperature.view;
          isLoaded.value = isLoadedTemperatureView.value;
          return;
        case 1:
          menuViewConfig.value = sensors.handbrake;
          break;
        case 2:
          menuViewConfig.value = sensors.reverse;
          break;
        case 3:
          menuViewConfig.value = sensors.seatbelt;
          break;
        case 4:
          menuViewConfig.value = sensors.signal;
          break;
      }
      isLoaded.value = isLoadedSensorView.value;
    };
    /**
     * Применить параметры отображения на информационном экране
     * @param {IViewConfig} data Новые параметры отображения
     */
    const onViewSettingApply = data => {
      const {
        temperature,
        sensors
      } = canbus["default"].views.variable;
      switch (menuSelected.value.id) {
        case 0:
          temperature.view = data;
          canbus["default"].queryView(variables_temperature/* API_VARIABLE_TEMPERATURE_VIEW_EXEC */.kh);
          return;
        case 1:
          sensors.handbrake = data;
          break;
        case 2:
          sensors.reverse = data;
          break;
        case 3:
          sensors.seatbelt = data;
          break;
        case 4:
          sensors.signal = data;
          break;
      }
      canbus["default"].queryView(variables_sensors/* API_VARIABLE_SENSORS_VIEW_EXEC */.Sw);
    };
    return {
      isLoadedDeviceValue,
      isLoadedSensorValue,
      isLoadedSensorView,
      isLoadedTemperatureValue,
      isLoadedTemperatureView,
      acc,
      worktime,
      temperature,
      handbrake,
      reverse,
      seatbeltDriver,
      seatbeltPassenger,
      signalLeft,
      signalRight,
      menu,
      menuVisible,
      menuSelected,
      menuViewConfig,
      onMenuClick,
      onViewSettingApply
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/InfoCard.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/views/onboard/components/InfoCard.vue




;
const InfoCard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(InfoCardvue_type_script_lang_ts, [['render',InfoCardvue_type_template_id_279e77e0_ts_true_render]])

/* harmony default export */ var InfoCard = (InfoCard_exports_);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/EngineCard.vue?vue&type=template&id=04589c6d&ts=true

function EngineCardvue_type_template_id_04589c6d_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("icon-card-item");
                                                      
  const _component_input_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("input-card-item");
  const _component_progress_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("progress-card-item");
                                                      
  const _component_card = (0,runtime_core_esm_bundler/* resolveComponent */.up)("card");
  const _component_view_setting_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("view-setting-dialog");
  const _component_engine_config_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("engine-config-dialog");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_card, {
    class: "engine-card",
    title: _ctx.$t('onboard.engine.title'),
    menu: $setup.menu,
    "onClick:menu": $setup.onMenuClick
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, null, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_card_item, {
          "model-value": [$setup.enabled],
          title: _ctx.$t('onboard.engine.enabled.title'),
          description: _ctx.$t('onboard.engine.enabled.description'),
          "icon-name": ['start-stop'],
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.rpm,
          title: _ctx.$t('onboard.engine.RPM.title'),
          description: _ctx.$t('onboard.engine.RPM.description'),
          nodata: !$setup.enabled,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.countRPM,
          title: _ctx.$t('onboard.engine.countRPM.title'),
          description: _ctx.$t('onboard.engine.countRPM.description'),
          nodata: !$setup.enabled,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.worktime,
          title: _ctx.$t('onboard.engine.worktime.title'),
          description: _ctx.$t('onboard.engine.worktime.description'),
          nodata: !$setup.enabled,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), $props.carModel === $options.ECarModel.CAR_MODEL_MAZDA3 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VCol/* VCol */.D, {
        key: 0,
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_progress_card_item, {
          value: $setup.load,
          title: _ctx.$t('onboard.engine.load.title'),
          description: _ctx.$t('onboard.engine.load.description'),
          nodata: !$setup.enabled,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_progress_card_item, {
          value: $setup.throttle,
          title: _ctx.$t('onboard.engine.throttle.title'),
          description: _ctx.$t('onboard.engine.throttle.description'),
          nodata: !$setup.enabled,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.coolant,
          title: _ctx.$t('onboard.engine.coolant.title'),
          description: _ctx.$t('onboard.engine.coolant.description'),
          type: "temperature",
          nodata: !$setup.enabled,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }, 8, ["title", "menu", "onClick:menu"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_view_setting_dialog, {
    modelValue: $setup.menuVisible,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.menuVisible = $event),
    title: $setup.menuSelected.title,
    enabled: $setup.menuViewConfig.enabled,
    type: $setup.menuViewConfig.type,
    time: $setup.menuViewConfig.time,
    disabled: !$setup.isLoadedView,
    "onClick:apply": $setup.onViewSettingApply
  }, null, 8, ["modelValue", "title", "enabled", "type", "time", "disabled", "onClick:apply"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_engine_config_dialog, {
    modelValue: $setup.settingsVisible,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $setup.settingsVisible = $event)
  }, null, 8, ["modelValue"])], 64);
}

/* Vuetify */



// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.mjs + 1 modules
var VProgressCircular = __webpack_require__(3173);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/ProgressCardItem.vue?vue&type=template&id=a652b4a6&scoped=true&ts=true

const ProgressCardItemvue_type_template_id_a652b4a6_scoped_true_ts_true_withScopeId = n => (_pushScopeId("data-v-a652b4a6"), n = n(), _popScopeId(), n);
const ProgressCardItemvue_type_template_id_a652b4a6_scoped_true_ts_true_hoisted_1 = {
  class: "progress-card-item"
};
function ProgressCardItemvue_type_template_id_a652b4a6_scoped_true_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
                                                                    
                                                                                  
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", ProgressCardItemvue_type_template_id_a652b4a6_scoped_true_ts_true_hoisted_1, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VTextField/* VTextField */.h, {
    "model-value": $props.title,
    hint: $props.description,
    variant: "underlined",
    density: "compact",
    "persistent-hint": "",
    readonly: "",
    dense: "",
    disabled: $props.disabled
  }, null, 8, ["model-value", "hint", "disabled"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VProgressCircular/* VProgressCircular */.L, {
    class: "progress-card-item__progress",
    color: $props.color,
    "model-value": $props.value,
    size: $props.size,
    width: 6,
    disabled: $props.nodata || $props.disabled
  }, {
    default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(!$props.nodata && !$props.disabled ? $props.value.toFixed() : ""), 1)]),
    _: 1
  }, 8, ["color", "model-value", "size", "disabled"])]);
}

/* Vuetify */




;// CONCATENATED MODULE: ./src/components/cards/ProgressCardItem.vue?vue&type=template&id=a652b4a6&scoped=true&ts=true

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/ProgressCardItem.vue?vue&type=script&lang=ts

/* harmony default export */ var ProgressCardItemvue_type_script_lang_ts = ({
  name: "ProgressCardItem",
  components: {
    IconCustom: IconCustom/* default */.Z
  },
  props: {
    /** Значение */
    value: Number,
    /** Заголовок */
    title: String,
    /** Описание */
    description: String,
    /** Цвет прогресса */
    color: {
      type: String,
      default: "success"
    },
    /** Размер иконок */
    size: {
      type: Number,
      default: 44
    },
    /** Нет данных */
    nodata: Boolean,
    /** Выкл. */
    disabled: Boolean
  }
});
;// CONCATENATED MODULE: ./src/components/cards/ProgressCardItem.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/ProgressCardItem.vue?vue&type=style&index=0&id=a652b4a6&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/cards/ProgressCardItem.vue?vue&type=style&index=0&id=a652b4a6&lang=scss&scoped=true

;// CONCATENATED MODULE: ./src/components/cards/ProgressCardItem.vue




;


const ProgressCardItem_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(ProgressCardItemvue_type_script_lang_ts, [['render',ProgressCardItemvue_type_template_id_a652b4a6_scoped_true_ts_true_render],['__scopeId',"data-v-a652b4a6"]])

/* harmony default export */ var ProgressCardItem = (ProgressCardItem_exports_);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.mjs + 2 modules
var VBtn = __webpack_require__(5101);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.mjs + 1 modules
var VIcon = __webpack_require__(3289);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/EngineConfigDialog.vue?vue&type=template&id=732ac68e&ts=true

const EngineConfigDialogvue_type_template_id_732ac68e_ts_true_hoisted_1 = {
  key: 1
};
const _hoisted_2 = {
  key: 1
};
const _hoisted_3 = {
  key: 1
};
function EngineConfigDialogvue_type_template_id_732ac68e_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_switch_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("switch-card-item");
                                                      
  const _component_number_field = (0,runtime_core_esm_bundler/* resolveComponent */.up)("number-field");
                                                      
                                                        
                                                      
  const _component_dialog_template = (0,runtime_core_esm_bundler/* resolveComponent */.up)("dialog-template");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_dialog_template, {
    "content-class": "device-reset",
    modelValue: $setup.visible,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.visible = $event),
    title: _ctx.$t('onboard.engine.settings.title'),
    icon: "engine-statistic",
    width: "500px",
    text: "",
    actions: ""
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, {
      class: "pb-2"
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          modelValue: $setup.showDays,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.showDays = $event),
          title: _ctx.$t('onboard.engine.settings.showDays.' + (_ctx.$vuetify.display.xs ? 'titleShort' : 'title')),
          description: _ctx.$t('onboard.engine.settings.showDays.description'),
          disabled: !$setup.loaderConfigEngine
        }, null, 8, ["modelValue", "title", "description", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_number_field, {
          modelValue: $setup.worktime,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $setup.worktime = $event),
          label: _ctx.$t('onboard.engine.settings.worktime.title'),
          hint: _ctx.$t('onboard.engine.settings.worktime.description'),
          min: 0,
          disabled: !$setup.loaderConfigEngine
        }, null, 8, ["modelValue", "label", "hint", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_number_field, {
          modelValue: $setup.totalCountRPM,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.totalCountRPM = $event),
          label: _ctx.$t('onboard.engine.settings.countRPM.title'),
          hint: _ctx.$t('onboard.engine.settings.countRPM.description'),
          min: 0,
          disabled: !$setup.loaderConfigEngine
        }, null, 8, ["modelValue", "label", "hint", "disabled"])]),
        _: 1
      })]),
      _: 1
    })]),
    btns: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VBtn/* VBtn */.T, {
      color: "secondary",
      onClick: $setup.onReset
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [_ctx.$vuetify.display.xs ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VIcon/* VIcon */.t, {
        key: 0
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("mdi-restart")]),
        _: 1
      })) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("span", EngineConfigDialogvue_type_template_id_732ac68e_ts_true_hoisted_1, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$t("btn.reset")), 1))]),
      _: 1
    }, 8, ["onClick"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VBtn/* VBtn */.T, {
      color: "primary",
      onClick: $setup.onApply
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [_ctx.$vuetify.display.xs ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VIcon/* VIcon */.t, {
        key: 0
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("mdi-check")]),
        _: 1
      })) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("span", _hoisted_2, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$t("btn.apply")), 1))]),
      _: 1
    }, 8, ["onClick"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VBtn/* VBtn */.T, {
      color: "primary",
      onClick: _cache[3] || (_cache[3] = $event => $setup.visible = false)
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [_ctx.$vuetify.display.xs ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VIcon/* VIcon */.t, {
        key: 0
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("mdi-close")]),
        _: 1
      })) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("span", _hoisted_3, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$t("btn.cancel")), 1))]),
      _: 1
    })]),
    _: 1
  }, 8, ["modelValue", "title"]);
}

/* Vuetify */





;// CONCATENATED MODULE: ./src/views/onboard/components/EngineConfigDialog.vue?vue&type=template&id=732ac68e&ts=true

// EXTERNAL MODULE: ./src/layout/components/DialogTemplate.vue + 6 modules
var DialogTemplate = __webpack_require__(2196);
// EXTERNAL MODULE: ./src/components/common/NumberField.vue + 3 modules
var NumberField = __webpack_require__(5412);
// EXTERNAL MODULE: ./src/models/pjcan/variables/engine/index.ts + 3 modules
var variables_engine = __webpack_require__(2658);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/EngineConfigDialog.vue?vue&type=script&lang=ts






/* harmony default export */ var EngineConfigDialogvue_type_script_lang_ts = ({
  name: "EngineConfig",
  components: {
    DialogTemplate: DialogTemplate/* default */.Z,
    SwitchCardItem: SwitchCardItem/* default */.Z,
    NumberField: NumberField/* default */.Z
  },
  props: {
    modelValue: Boolean
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const {
      modelValue
    } = (0,reactivity_esm_bundler/* toRefs */.BK)(props);
    const visible = (0,runtime_core_esm_bundler/* computed */.Fl)({
      get: () => modelValue.value,
      set: val => context.emit("update:modelValue", val)
    });
    const loaderConfigEngine = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const showDays = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const worktime = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const totalCountRPM = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const onReceiveConfigEngine = res => {
      loaderConfigEngine.value = res.isData;
      if (res.isData) {
        showDays.value = res.showDays;
        worktime.value = res.totalSeconds > 0 ? typeof res.totalSeconds === "number" ? Math.round(res.totalSeconds / 60) : Math.round(Number(res.totalSeconds / BigInt(60))) : 0;
        totalCountRPM.value = typeof res.totalCountRPM === "number" ? Math.round(res.totalCountRPM / 1000) : Math.round(Number(res.totalCountRPM / BigInt(1000)));
      }
    };
    /** Сбросить */
    const onReset = () => {
      const {
        engine
      } = canbus["default"].configs.variable;
      engine.showDays = showDays.value;
      engine.totalSeconds = BigInt(0);
      engine.totalCountRPM = BigInt(0);
      canbus["default"].queryConfig(variables_engine/* API_VARIABLE_ENGINE_CONFIG_EXEC */.LH);
      visible.value = false;
    };
    /** Применить */
    const onApply = () => {
      const {
        engine
      } = canbus["default"].configs.variable;
      engine.showDays = showDays.value;
      engine.totalSeconds = BigInt(worktime.value) * BigInt(60);
      engine.totalCountRPM = BigInt(totalCountRPM.value) * BigInt(1000);
      canbus["default"].queryConfig(variables_engine/* API_VARIABLE_ENGINE_CONFIG_EXEC */.LH);
      visible.value = false;
    };
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].addListener(variables_engine/* API_VARIABLE_ENGINE_CONFIG_EVENT */.f2, onReceiveConfigEngine);
      onReceiveConfigEngine(canbus["default"].configs.variable.engine);
    });
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].removeListener(variables_engine/* API_VARIABLE_ENGINE_CONFIG_EVENT */.f2, onReceiveConfigEngine);
    });
    return {
      visible,
      loaderConfigEngine,
      showDays,
      worktime,
      totalCountRPM,
      onReset,
      onApply
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/EngineConfigDialog.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/views/onboard/components/EngineConfigDialog.vue




;
const EngineConfigDialog_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(EngineConfigDialogvue_type_script_lang_ts, [['render',EngineConfigDialogvue_type_template_id_732ac68e_ts_true_render]])

/* harmony default export */ var EngineConfigDialog = (EngineConfigDialog_exports_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/EngineCard.vue?vue&type=script&lang=ts











/* harmony default export */ var EngineCardvue_type_script_lang_ts = ({
  name: "EngineCard",
  computed: {
    ECarModel() {
      return car/* ECarModel */.qZ;
    }
  },
  components: {
    Card: Card/* default */.Z,
    InputCardItem: InputCardItem/* default */.Z,
    IconCardItem: IconCardItem,
    ProgressCardItem: ProgressCardItem,
    ViewSettingDialog: ViewSettingDialog/* default */.Z,
    EngineConfigDialog: EngineConfigDialog
  },
  props: {
    carModel: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const {
      t
    } = (0,vue_i18n_esm_bundler/* useI18n */.QT)();
    const isLoadedValue = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedView = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const enabled = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const rpm = (0,reactivity_esm_bundler/* ref */.iH)("");
    const countRPM = (0,reactivity_esm_bundler/* ref */.iH)("");
    const load = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const worktime = (0,reactivity_esm_bundler/* ref */.iH)("");
    const throttle = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const coolant = (0,reactivity_esm_bundler/* ref */.iH)(0);
    /** Входящие значения ДВС */
    const onReceiveValue = res => {
      isLoadedValue.value = res.isData;
      if (res.isData) {
        enabled.value = res.enabled;
        rpm.value = res.rpm.toFixed();
        countRPM.value = res.viewCountRPM.toString();
        load.value = res.load / 1000;
        let wt = res.viewDays > 0 ? res.viewDays + "." : "";
        wt += (res.viewHours < 10 ? "0" : "") + res.viewHours + ":";
        wt += (res.viewMinutes < 10 ? "0" : "") + res.viewMinutes + ":";
        wt += (res.viewSeconds < 10 ? "0" : "") + res.viewSeconds;
        worktime.value = wt;
        throttle.value = res.throttle / 100;
        coolant.value = res.coolant;
      }
    };
    /** Входящие значения отображения ДВС */
    const onReceiveView = res => {
      isLoadedView.value = res.isData;
    };
    // регистрируем события
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].addListener(variables_engine/* API_VARIABLE_ENGINE_EVENT */.tk, onReceiveValue);
      canbus["default"].addListener(variables_engine/* API_VARIABLE_ENGINE_VIEW_EVENT */.P8, onReceiveView);
      onReceiveValue(canbus["default"].values.variable.engine);
      onReceiveView(canbus["default"].views.variable.engine);
    });
    // удаляем события
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].removeListener(variables_engine/* API_VARIABLE_ENGINE_EVENT */.tk, onReceiveValue);
      canbus["default"].removeListener(variables_engine/* API_VARIABLE_ENGINE_VIEW_EVENT */.P8, onReceiveView);
    });
    // МЕНЮ ОТОБРАЖЕНИЯ
    const menu = (0,runtime_core_esm_bundler/* computed */.Fl)(() => [{
      id: 10,
      title: t("onboard.engine.settings.menu")
    }, {
      id: 0,
      title: t("onboard.engine.enabled.menu")
    }, {
      id: 1,
      title: t("onboard.engine.RPM.menu")
    }, {
      id: 2,
      title: t("onboard.engine.countRPM.menu")
    }, {
      id: 3,
      title: t("onboard.engine.load.menu")
    }, {
      id: 4,
      title: t("onboard.engine.worktime.menu")
    }, {
      id: 5,
      title: t("onboard.engine.throttle.menu")
    }, {
      id: 6,
      title: t("onboard.engine.coolant.menu")
    }]);
    const menuVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const menuSelected = (0,reactivity_esm_bundler/* ref */.iH)({});
    const menuViewConfig = (0,reactivity_esm_bundler/* ref */.iH)({});
    const settingsVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    /**
     * Выбор пункта меню отображения на информационном экране
     * @param {IMenuItem} item Элемент меню
     */
    const onMenuClick = item => {
      if (item.id < 10) {
        menuVisible.value = true;
        menuSelected.value = item;
        const {
          engine
        } = canbus["default"].views.variable;
        switch (item.id) {
          case 0:
            menuViewConfig.value = engine.enabled;
            return;
          case 1:
            menuViewConfig.value = engine.rpm;
            break;
          case 2:
            menuViewConfig.value = engine.totalCountRPM;
            break;
          case 3:
            menuViewConfig.value = engine.load;
            break;
          case 4:
            menuViewConfig.value = engine.totalSeconds;
            break;
          case 5:
            menuViewConfig.value = engine.throttle;
            break;
          case 6:
            menuViewConfig.value = engine.coolant;
            break;
        }
      } else {
        settingsVisible.value = true;
      }
    };
    /**
     * Применить параметры отображения на информационном экране
     * @param {IViewConfig} data Новые параметры отображения
     */
    const onViewSettingApply = data => {
      const {
        engine
      } = canbus["default"].views.variable;
      switch (menuSelected.value.id) {
        case 0:
          engine.enabled = data;
          break;
        case 1:
          engine.rpm = data;
          break;
        case 2:
          engine.totalCountRPM = data;
          break;
        case 3:
          engine.load = data;
          break;
        case 4:
          engine.totalSeconds = data;
          break;
        case 5:
          engine.throttle = data;
          break;
        case 6:
          engine.coolant = data;
          break;
      }
      canbus["default"].queryView(variables_engine/* API_VARIABLE_ENGINE_VIEW_EXEC */._L);
    };
    return {
      isLoadedValue,
      isLoadedView,
      enabled,
      rpm,
      countRPM,
      load,
      worktime,
      throttle,
      coolant,
      menu,
      menuVisible,
      menuSelected,
      menuViewConfig,
      settingsVisible,
      onMenuClick,
      onViewSettingApply
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/EngineCard.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/views/onboard/components/EngineCard.vue




;
const EngineCard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(EngineCardvue_type_script_lang_ts, [['render',EngineCardvue_type_template_id_04589c6d_ts_true_render]])

/* harmony default export */ var EngineCard = (EngineCard_exports_);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/FuelCard.vue?vue&type=template&id=204921e4&ts=true

function FuelCardvue_type_template_id_204921e4_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_input_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("input-card-item");
                                                      
                                                      
  const _component_card = (0,runtime_core_esm_bundler/* resolveComponent */.up)("card");
  const _component_view_setting_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("view-setting-dialog");
  const _component_fuel_config_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("fuel-config-dialog");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_card, {
    class: "fuel-card",
    title: _ctx.$t('onboard.fuel.title'),
    menu: $setup.menu,
    "onClick:menu": $setup.onMenuClick
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, null, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.current,
          title: _ctx.$t('onboard.fuel.current.title'),
          description: _ctx.$t('onboard.fuel.current.description'),
          nodata: !$setup.isLoadedValue || Number($setup.current) <= 0,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.avg,
          title: _ctx.$t('onboard.fuel.avg.title'),
          description: _ctx.$t('onboard.fuel.avg.description'),
          nodata: !$setup.isLoadedValue || Number($setup.avg) <= 0,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.consumption,
          title: _ctx.$t('onboard.fuel.consumption.title'),
          description: _ctx.$t('onboard.fuel.consumption.description'),
          nodata: !$setup.isLoadedValue || Number($setup.consumption) <= 0,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }, 8, ["title", "menu", "onClick:menu"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_view_setting_dialog, {
    modelValue: $setup.menuVisible,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.menuVisible = $event),
    title: $setup.menuSelected.title,
    enabled: $setup.menuViewConfig.enabled,
    type: $setup.menuViewConfig.type,
    time: $setup.menuViewConfig.time,
    disabled: !$setup.isLoadedView,
    "onClick:apply": $setup.onViewSettingApply
  }, null, 8, ["modelValue", "title", "enabled", "type", "time", "disabled", "onClick:apply"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_fuel_config_dialog, {
    modelValue: $setup.settingsVisible,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $setup.settingsVisible = $event)
  }, null, 8, ["modelValue"])], 64);
}

/* Vuetify */



;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/FuelConfigDialog.vue?vue&type=template&id=617319d8&ts=true

const FuelConfigDialogvue_type_template_id_617319d8_ts_true_hoisted_1 = {
  key: 1
};
const FuelConfigDialogvue_type_template_id_617319d8_ts_true_hoisted_2 = {
  key: 1
};
const FuelConfigDialogvue_type_template_id_617319d8_ts_true_hoisted_3 = {
  key: 1
};
function FuelConfigDialogvue_type_template_id_617319d8_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_number_field = (0,runtime_core_esm_bundler/* resolveComponent */.up)("number-field");
                                                      
                                                      
                                                        
                                                      
  const _component_dialog_template = (0,runtime_core_esm_bundler/* resolveComponent */.up)("dialog-template");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_dialog_template, {
    "content-class": "device-reset",
    modelValue: $setup.visible,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.visible = $event),
    title: _ctx.$t('onboard.fuel.settings.title'),
    icon: "engine-statistic",
    width: "500px",
    text: "",
    actions: ""
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, {
      class: "pb-2"
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_number_field, {
          modelValue: $setup.ratio,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.ratio = $event),
          label: _ctx.$t('onboard.fuel.settings.ratio.title'),
          hint: _ctx.$t('onboard.fuel.settings.ratio.description'),
          min: 0,
          max: 1,
          disabled: !$setup.loaderConfigFuel
        }, null, 8, ["modelValue", "label", "hint", "disabled"])]),
        _: 1
      })]),
      _: 1
    })]),
    btns: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VBtn/* VBtn */.T, {
      color: "secondary",
      onClick: $setup.onReset
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [_ctx.$vuetify.display.xs ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VIcon/* VIcon */.t, {
        key: 0
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("mdi-restart")]),
        _: 1
      })) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("span", FuelConfigDialogvue_type_template_id_617319d8_ts_true_hoisted_1, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$t("btn.reset")), 1))]),
      _: 1
    }, 8, ["onClick"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VBtn/* VBtn */.T, {
      color: "primary",
      onClick: $setup.onApply
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [_ctx.$vuetify.display.xs ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VIcon/* VIcon */.t, {
        key: 0
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("mdi-check")]),
        _: 1
      })) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("span", FuelConfigDialogvue_type_template_id_617319d8_ts_true_hoisted_2, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$t("btn.apply")), 1))]),
      _: 1
    }, 8, ["onClick"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VBtn/* VBtn */.T, {
      color: "primary",
      onClick: _cache[1] || (_cache[1] = $event => $setup.visible = false)
    }, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [_ctx.$vuetify.display.xs ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(VIcon/* VIcon */.t, {
        key: 0
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("mdi-close")]),
        _: 1
      })) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("span", FuelConfigDialogvue_type_template_id_617319d8_ts_true_hoisted_3, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$t("btn.cancel")), 1))]),
      _: 1
    })]),
    _: 1
  }, 8, ["modelValue", "title"]);
}

/* Vuetify */





;// CONCATENATED MODULE: ./src/views/onboard/components/FuelConfigDialog.vue?vue&type=template&id=617319d8&ts=true

// EXTERNAL MODULE: ./src/models/pjcan/variables/fuel/index.ts + 3 modules
var variables_fuel = __webpack_require__(9422);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/FuelConfigDialog.vue?vue&type=script&lang=ts






/* harmony default export */ var FuelConfigDialogvue_type_script_lang_ts = ({
  name: "FuelConfigDialog",
  components: {
    DialogTemplate: DialogTemplate/* default */.Z,
    SwitchCardItem: SwitchCardItem/* default */.Z,
    NumberField: NumberField/* default */.Z
  },
  props: {
    modelValue: Boolean
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const {
      modelValue
    } = (0,reactivity_esm_bundler/* toRefs */.BK)(props);
    const visible = (0,runtime_core_esm_bundler/* computed */.Fl)({
      get: () => modelValue.value,
      set: val => context.emit("update:modelValue", val)
    });
    const loaderConfigFuel = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const ratio = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const onReceiveConfigFuel = res => {
      loaderConfigFuel.value = res.isData;
      if (res.isData) {
        ratio.value = res.ratio / 1000;
      }
    };
    /** Сбросить */
    const onReset = () => {
      canbus["default"].configs.variable.fuel.ratio = 1000;
      canbus["default"].queryConfig(variables_fuel/* API_VARIABLE_FUEL_CONFIG_EXEC */.Wm);
      visible.value = false;
    };
    /** Применить */
    const onApply = () => {
      canbus["default"].configs.variable.fuel.ratio = ratio.value * 1000;
      canbus["default"].queryConfig(variables_fuel/* API_VARIABLE_FUEL_CONFIG_EXEC */.Wm);
      visible.value = false;
    };
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].addListener(variables_fuel/* API_VARIABLE_FUEL_CONFIG_EVENT */.Lw, onReceiveConfigFuel);
      onReceiveConfigFuel(canbus["default"].configs.variable.fuel);
    });
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].removeListener(variables_fuel/* API_VARIABLE_FUEL_CONFIG_EVENT */.Lw, onReceiveConfigFuel);
    });
    return {
      visible,
      loaderConfigFuel,
      ratio,
      onReset,
      onApply
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/FuelConfigDialog.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/views/onboard/components/FuelConfigDialog.vue




;
const FuelConfigDialog_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(FuelConfigDialogvue_type_script_lang_ts, [['render',FuelConfigDialogvue_type_template_id_617319d8_ts_true_render]])

/* harmony default export */ var FuelConfigDialog = (FuelConfigDialog_exports_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/FuelCard.vue?vue&type=script&lang=ts








/* harmony default export */ var FuelCardvue_type_script_lang_ts = ({
  name: "FuelCard",
  components: {
    Card: Card/* default */.Z,
    InputCardItem: InputCardItem/* default */.Z,
    ViewSettingDialog: ViewSettingDialog/* default */.Z,
    FuelConfigDialog: FuelConfigDialog
  },
  props: {
    carModel: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const {
      t
    } = (0,vue_i18n_esm_bundler/* useI18n */.QT)();
    const isLoadedValue = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedView = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const current = (0,reactivity_esm_bundler/* ref */.iH)("");
    const avg = (0,reactivity_esm_bundler/* ref */.iH)("");
    // const total = ref("");
    const consumption = (0,reactivity_esm_bundler/* ref */.iH)("");
    /** Входящие значения расхода топлива */
    const onReceiveValue = res => {
      isLoadedValue.value = res.isData;
      if (res.isData) {
        current.value = (res.current / 10).toFixed(1);
        avg.value = (res.avg / 10).toFixed(1);
        // total.value = (res.total / 100).toFixed(2);
        consumption.value = (res.consumption / 100).toFixed(2);
      }
    };
    /** Входящие значения отображения расхода топлива */
    const onReceiveView = res => {
      isLoadedView.value = res.isData;
    };
    // регистрируем события
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].addListener(variables_fuel/* API_VARIABLE_FUEL_EVENT */.Je, onReceiveValue);
      canbus["default"].addListener(variables_fuel/* API_VARIABLE_FUEL_VIEW_EVENT */.S, onReceiveView);
      onReceiveValue(canbus["default"].values.variable.fuel);
      onReceiveView(canbus["default"].views.variable.fuel);
    });
    // удаляем события
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].removeListener(variables_fuel/* API_VARIABLE_FUEL_EVENT */.Je, onReceiveValue);
      canbus["default"].removeListener(variables_fuel/* API_VARIABLE_FUEL_VIEW_EVENT */.S, onReceiveView);
    });
    // МЕНЮ ОТОБРАЖЕНИЯ
    const menu = (0,runtime_core_esm_bundler/* computed */.Fl)(() => [{
      id: 10,
      title: t("onboard.fuel.settings.menu")
    }, {
      id: 0,
      title: t("onboard.fuel.current.menu")
    }, {
      id: 1,
      title: t("onboard.fuel.avg.menu")
    },
    // { id: 2, title: t("onboard.fuel.total.menu") },
    {
      id: 3,
      title: t("onboard.fuel.consumption.menu")
    }]);
    const menuVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const menuSelected = (0,reactivity_esm_bundler/* ref */.iH)({});
    const menuViewConfig = (0,reactivity_esm_bundler/* ref */.iH)({});
    const settingsVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    /**
     * Выбор пункта меню отображения на информационном экране
     * @param {IMenuItem} item Элемент меню
     */
    const onMenuClick = item => {
      if (item.id < 10) {
        menuVisible.value = true;
        menuSelected.value = item;
        const {
          fuel
        } = canbus["default"].views.variable;
        switch (item.id) {
          case 0:
            menuViewConfig.value = fuel.current;
            return;
          case 1:
            menuViewConfig.value = fuel.avg;
            break;
          // case 2:
          // 	menuViewConfig.value = fuel.total;
          // 	break;
          case 3:
            menuViewConfig.value = fuel.consumption;
            break;
        }
      } else {
        settingsVisible.value = true;
      }
    };
    /**
     * Применить параметры отображения на информационном экране
     * @param {IViewConfig} data Новые параметры отображения
     */
    const onViewSettingApply = data => {
      const {
        fuel
      } = canbus["default"].views.variable;
      switch (menuSelected.value.id) {
        case 0:
          fuel.current = data;
          break;
        case 1:
          fuel.avg = data;
          break;
        // case 2:
        // 	fuel.total = data;
        // 	break;
        case 3:
          fuel.consumption = data;
          break;
      }
      canbus["default"].queryView(variables_fuel/* API_VARIABLE_FUEL_VIEW_EXEC */.ES);
    };
    return {
      isLoadedView,
      isLoadedValue,
      current,
      avg,
      // total,
      consumption,
      menu,
      menuVisible,
      menuSelected,
      menuViewConfig,
      settingsVisible,
      onMenuClick,
      onViewSettingApply
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/FuelCard.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/views/onboard/components/FuelCard.vue




;
const FuelCard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(FuelCardvue_type_script_lang_ts, [['render',FuelCardvue_type_template_id_204921e4_ts_true_render]])

/* harmony default export */ var FuelCard = (FuelCard_exports_);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/MovementCard.vue?vue&type=template&id=0dec00ca&ts=true

function MovementCardvue_type_template_id_0dec00ca_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_input_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("input-card-item");
                                                      
                                                      
  const _component_card = (0,runtime_core_esm_bundler/* resolveComponent */.up)("card");
  const _component_view_setting_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("view-setting-dialog");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_card, {
    class: "movement-card",
    title: _ctx.$t('onboard.movement.title'),
    menu: $setup.menu,
    "onClick:menu": $setup.onMenuClick
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, null, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.speed,
          title: _ctx.$t('onboard.movement.speed.title'),
          description: _ctx.$t('onboard.movement.speed.description'),
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.speedAVG,
          title: _ctx.$t('onboard.movement.speedAVG.title'),
          description: _ctx.$t('onboard.movement.speedAVG.description'),
          nodata: !$setup.isSpeedAVG,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.restWay,
          title: _ctx.$t('onboard.movement.restWay.title'),
          description: _ctx.$t('onboard.movement.restWay.description'),
          nodata: !$setup.isRestWay,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }, 8, ["title", "menu", "onClick:menu"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_view_setting_dialog, {
    modelValue: $setup.menuVisible,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.menuVisible = $event),
    title: $setup.menuSelected.title,
    enabled: $setup.menuViewConfig.enabled,
    type: $setup.menuViewConfig.type,
    time: $setup.menuViewConfig.time,
    disabled: !$setup.isLoadedView,
    "onClick:apply": $setup.onViewSettingApply
  }, null, 8, ["modelValue", "title", "enabled", "type", "time", "disabled", "onClick:apply"])], 64);
}

/* Vuetify */



// EXTERNAL MODULE: ./src/models/pjcan/variables/movement/index.ts + 2 modules
var variables_movement = __webpack_require__(6297);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/MovementCard.vue?vue&type=script&lang=ts







/* harmony default export */ var MovementCardvue_type_script_lang_ts = ({
  name: "MovementCard",
  components: {
    Card: Card/* default */.Z,
    InputCardItem: InputCardItem/* default */.Z,
    ViewSettingDialog: ViewSettingDialog/* default */.Z
  },
  props: {
    carModel: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const {
      t
    } = (0,vue_i18n_esm_bundler/* useI18n */.QT)();
    const isLoadedView = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedValue = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const speed = (0,reactivity_esm_bundler/* ref */.iH)("");
    const speedAVG = (0,reactivity_esm_bundler/* ref */.iH)("");
    const restWay = (0,reactivity_esm_bundler/* ref */.iH)("");
    const isSpeedAVG = (0,runtime_core_esm_bundler/* computed */.Fl)(() => isLoadedValue.value && canbus["default"].values.variable.movement.speedAVG > 0);
    const isRestWay = (0,runtime_core_esm_bundler/* computed */.Fl)(() => isLoadedValue.value && canbus["default"].values.variable.movement.restWay > 0);
    /** Входящие значения движения */
    const onReceiveValue = res => {
      isLoadedValue.value = res.isData;
      if (res.isData) {
        speed.value = (res.speed / 100).toFixed(2);
        speedAVG.value = res.speedAVG.toFixed(0);
        restWay.value = (res.restWay / 100).toFixed(2);
      }
    };
    /** Входящие значения отображения движения */
    const onReceiveView = res => {
      isLoadedView.value = res.isData;
    };
    // регистрируем события
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].addListener(variables_movement/* API_VARIABLE_MOVEMENT_EVENT */.Ju, onReceiveValue);
      canbus["default"].addListener(variables_movement/* API_VARIABLE_MOVEMENT_VIEW_EVENT */.YT, onReceiveView);
      onReceiveValue(canbus["default"].values.variable.movement);
      onReceiveView(canbus["default"].views.variable.movement);
    });
    // удаляем события
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].removeListener(variables_movement/* API_VARIABLE_MOVEMENT_EVENT */.Ju, onReceiveValue);
      canbus["default"].removeListener(variables_movement/* API_VARIABLE_MOVEMENT_VIEW_EVENT */.YT, onReceiveView);
    });
    // МЕНЮ ОТОБРАЖЕНИЯ
    const menu = (0,runtime_core_esm_bundler/* computed */.Fl)(() => [{
      id: 0,
      title: t("onboard.movement.speed.menu")
    }, {
      id: 1,
      title: t("onboard.movement.speedAVG.menu")
    }, {
      id: 2,
      title: t("onboard.movement.restWay.menu")
    }]);
    const menuVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const menuSelected = (0,reactivity_esm_bundler/* ref */.iH)({});
    const menuViewConfig = (0,reactivity_esm_bundler/* ref */.iH)({});
    /**
     * Выбор пункта меню отображения на информационном экране
     * @param {IMenuItem} item Элемент меню
     */
    const onMenuClick = item => {
      menuVisible.value = true;
      menuSelected.value = item;
      const {
        movement
      } = canbus["default"].views.variable;
      switch (item.id) {
        case 0:
          menuViewConfig.value = movement.speed;
          return;
        case 1:
          menuViewConfig.value = movement.speedAVG;
          break;
        case 2:
          menuViewConfig.value = movement.restWay;
          break;
      }
    };
    /**
     * Применить параметры отображения на информационном экране
     * @param {IViewConfig} data Новые параметры отображения
     */
    const onViewSettingApply = data => {
      const {
        movement
      } = canbus["default"].views.variable;
      switch (menuSelected.value.id) {
        case 0:
          movement.speed = data;
          break;
        case 1:
          movement.speedAVG = data;
          break;
        case 2:
          movement.restWay = data;
          break;
      }
      canbus["default"].queryView(variables_movement/* API_VARIABLE_MOVEMENT_VIEW_EXEC */.hQ);
    };
    return {
      isLoadedView,
      isLoadedValue,
      isSpeedAVG,
      isRestWay,
      speed,
      speedAVG,
      restWay,
      menu,
      menuVisible,
      menuSelected,
      menuViewConfig,
      onMenuClick,
      onViewSettingApply
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/MovementCard.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/views/onboard/components/MovementCard.vue




;
const MovementCard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(MovementCardvue_type_script_lang_ts, [['render',MovementCardvue_type_template_id_0dec00ca_ts_true_render]])

/* harmony default export */ var MovementCard = (MovementCard_exports_);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/DoorsCard.vue?vue&type=template&id=2919b1d9&ts=true

function DoorsCardvue_type_template_id_2919b1d9_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_switch_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("switch-card-item");
                                                      
                                                      
  const _component_card = (0,runtime_core_esm_bundler/* resolveComponent */.up)("card");
  const _component_view_setting_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("view-setting-dialog");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_card, {
    class: "doors-card",
    title: _ctx.$t('onboard.doors.title'),
    menu: $setup.menu,
    "onClick:menu": $setup.onMenuClick
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, null, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          "model-value": $setup.doorFL,
          title: _ctx.$t('onboard.doors.doorFL.title'),
          description: _ctx.$t('onboard.doors.doorFL.description'),
          color: "error",
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          "model-value": $setup.doorFR,
          title: _ctx.$t('onboard.doors.doorFR.title'),
          description: _ctx.$t('onboard.doors.doorFR.description'),
          color: "error",
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          "model-value": $setup.doorBL,
          title: _ctx.$t('onboard.doors.doorBL.title'),
          description: _ctx.$t('onboard.doors.doorBL.description'),
          color: "error",
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          "model-value": $setup.doorBR,
          title: _ctx.$t('onboard.doors.doorBR.title'),
          description: _ctx.$t('onboard.doors.doorBR.description'),
          color: "error",
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          "model-value": $setup.trunk,
          title: _ctx.$t('onboard.doors.trunk.title'),
          description: _ctx.$t('onboard.doors.trunk.description'),
          color: "error",
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }, 8, ["title", "menu", "onClick:menu"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_view_setting_dialog, {
    modelValue: $setup.menuVisible,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.menuVisible = $event),
    title: $setup.menuSelected.title,
    enabled: $setup.menuViewConfig.enabled,
    type: $setup.menuViewConfig.type,
    time: $setup.menuViewConfig.time,
    disabled: !$setup.isLoadedView,
    "onClick:apply": $setup.onViewSettingApply
  }, null, 8, ["modelValue", "title", "enabled", "type", "time", "disabled", "onClick:apply"])], 64);
}

/* Vuetify */



// EXTERNAL MODULE: ./src/models/pjcan/variables/doors/index.ts + 2 modules
var doors = __webpack_require__(3558);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/DoorsCard.vue?vue&type=script&lang=ts







/* harmony default export */ var DoorsCardvue_type_script_lang_ts = ({
  name: "DoorsCard",
  components: {
    Card: Card/* default */.Z,
    SwitchCardItem: SwitchCardItem/* default */.Z,
    ViewSettingDialog: ViewSettingDialog/* default */.Z
  },
  props: {
    carModel: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const {
      t
    } = (0,vue_i18n_esm_bundler/* useI18n */.QT)();
    const isLoadedView = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedValue = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const doorFL = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const doorFR = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const doorBL = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const doorBR = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const trunk = (0,reactivity_esm_bundler/* ref */.iH)(false);
    /** Входящие значения открытых дверей */
    const onReceiveValue = res => {
      isLoadedValue.value = res.isData;
      if (res.isData) {
        doorFL.value = res.frontLeft;
        doorFR.value = res.frontRight;
        doorBL.value = res.backLeft;
        doorBR.value = res.backRight;
        trunk.value = res.trunk;
      }
    };
    /** Входящие значения отображения открытых дверей */
    const onReceiveView = res => {
      isLoadedView.value = res.isData;
    };
    // регистрируем события
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].addListener(doors/* API_VARIABLE_DOORS_EVENT */.bI, onReceiveValue);
      canbus["default"].addListener(doors/* API_VARIABLE_DOORS_VIEW_EVENT */.Xl, onReceiveView);
      onReceiveValue(canbus["default"].values.variable.doors);
      onReceiveView(canbus["default"].views.variable.doors);
    });
    // удаляем события
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].removeListener(doors/* API_VARIABLE_DOORS_EVENT */.bI, onReceiveValue);
      canbus["default"].removeListener(doors/* API_VARIABLE_DOORS_VIEW_EVENT */.Xl, onReceiveView);
    });
    // МЕНЮ ОТОБРАЖЕНИЯ
    const menu = (0,runtime_core_esm_bundler/* computed */.Fl)(() => [{
      id: 0,
      title: t("onboard.doors.menu")
    }]);
    const menuVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const menuSelected = (0,reactivity_esm_bundler/* ref */.iH)({});
    const menuViewConfig = (0,reactivity_esm_bundler/* ref */.iH)({});
    /**
     * Выбор пункта меню отображения на информационном экране
     * @param {IMenuItem} item Элемент меню
     */
    const onMenuClick = item => {
      menuVisible.value = true;
      menuSelected.value = item;
      menuViewConfig.value = canbus["default"].views.variable.doors.view;
    };
    /**
     * Применить параметры отображения на информационном экране
     * @param {IViewConfig} data Новые параметры отображения
     */
    const onViewSettingApply = data => {
      canbus["default"].views.variable.doors.view = data;
      canbus["default"].queryView(doors/* API_VARIABLE_DOORS_VIEW_EXEC */.EJ);
    };
    return {
      isLoadedView,
      isLoadedValue,
      doorFL,
      doorFR,
      doorBL,
      doorBR,
      trunk,
      menu,
      menuVisible,
      menuSelected,
      menuViewConfig,
      onMenuClick,
      onViewSettingApply
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/DoorsCard.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/views/onboard/components/DoorsCard.vue




;
const DoorsCard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(DoorsCardvue_type_script_lang_ts, [['render',DoorsCardvue_type_template_id_2919b1d9_ts_true_render]])

/* harmony default export */ var DoorsCard = (DoorsCard_exports_);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/ClimateCard.vue?vue&type=template&id=4e42cfa6&ts=true

function ClimateCardvue_type_template_id_4e42cfa6_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("icon-card-item");
                                                      
  const _component_switch_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("switch-card-item");
  const _component_input_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("input-card-item");
                                                      
  const _component_card = (0,runtime_core_esm_bundler/* resolveComponent */.up)("card");
  const _component_view_setting_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("view-setting-dialog");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_card, {
    class: "climate-card",
    title: _ctx.$t('onboard.climate.title'),
    menu: $setup.menu,
    "onClick:menu": $setup.onMenuClick
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, null, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_card_item, {
          "model-value": [$setup.enabled],
          title: _ctx.$t('onboard.climate.enabled.title'),
          description: _ctx.$t('onboard.climate.enabled.description'),
          "icon-name": ['climate'],
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          "model-value": $setup.autoMode,
          title: _ctx.$t('onboard.climate.autoMode.title'),
          description: _ctx.$t('onboard.climate.autoMode.description'),
          color: "success",
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          "model-value": $setup.ac,
          title: _ctx.$t('onboard.climate.ac.title'),
          description: _ctx.$t('onboard.climate.ac.description'),
          color: "success",
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_input_card_item, {
          value: $setup.temperature,
          title: _ctx.$t('onboard.climate.temperature.title'),
          description: _ctx.$t('onboard.climate.temperature.description'),
          type: "temperature",
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["value", "title", "description", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_card_item, {
          "model-value": [$setup.airEnabled],
          title: _ctx.$t('onboard.climate.air.title'),
          description: _ctx.$t('onboard.climate.air.description'),
          "icon-name": [$setup.airName],
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "icon-name", "nodata", "disabled"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_card_item, {
          "model-value": [$setup.blowWindshield, $setup.blowEnabled],
          title: _ctx.$t('onboard.climate.blow.title'),
          description: _ctx.$t('onboard.climate.blow.description'),
          "icon-name": ['blow-windshield', $setup.blowName],
          margin: 10,
          nodata: !$setup.isLoadedValue,
          disabled: !$setup.isLoadedView
        }, null, 8, ["model-value", "title", "description", "icon-name", "nodata", "disabled"])]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }, 8, ["title", "menu", "onClick:menu"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_view_setting_dialog, {
    modelValue: $setup.menuVisible,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.menuVisible = $event),
    title: $setup.menuSelected.title,
    enabled: $setup.menuViewConfig.enabled,
    type: $setup.menuViewConfig.type,
    time: $setup.menuViewConfig.time,
    disabled: !$setup.isLoadedView,
    "onClick:apply": $setup.onViewSettingApply
  }, null, 8, ["modelValue", "title", "enabled", "type", "time", "disabled", "onClick:apply"])], 64);
}

/* Vuetify */



// EXTERNAL MODULE: ./src/models/pjcan/variables/climate/index.ts + 3 modules
var climate = __webpack_require__(2481);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/ClimateCard.vue?vue&type=script&lang=ts









/* harmony default export */ var ClimateCardvue_type_script_lang_ts = ({
  name: "ClimateCard",
  components: {
    Card: Card/* default */.Z,
    InputCardItem: InputCardItem/* default */.Z,
    IconCardItem: IconCardItem,
    SwitchCardItem: SwitchCardItem/* default */.Z,
    ViewSettingDialog: ViewSettingDialog/* default */.Z
  },
  props: {
    carModel: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const {
      t
    } = (0,vue_i18n_esm_bundler/* useI18n */.QT)();
    const isLoadedValue = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedView = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const enabled = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const autoMode = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const ac = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const temperature = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const airEnabled = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const airName = (0,reactivity_esm_bundler/* ref */.iH)("");
    const blowEnabled = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const blowName = (0,reactivity_esm_bundler/* ref */.iH)("");
    const blowWindshield = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const speedRotation = (0,reactivity_esm_bundler/* ref */.iH)(0);
    /** Входящие значения климат-контроля */
    const onReceiveValue = res => {
      isLoadedValue.value = res.isData;
      if (res.isData) {
        enabled.value = res.enabled;
        autoMode.value = res.automode;
        ac.value = res.ac;
        temperature.value = res.temperature / 10;
        airEnabled.value = res.airType !== climate/* TAir.AIR_NONE */.T1.AIR_NONE;
        airName.value = res.airType === climate/* TAir.AIR_STREET */.T1.AIR_STREET ? "air-fresh" : "air-cabin";
        blowEnabled.value = res.airDBody || res.airDLegs;
        blowName.value = res.airDLegs && res.airDBody ? "blow-feet-body" : res.airDLegs ? "blow-feet" : res.airDBody ? "blow-body" : "blow-none";
        blowWindshield.value = res.airDWindshield;
        speedRotation.value = res.airRate > 0 ? res.airRate + 2 : 0;
      }
    };
    /** Входящие значения отображения климат-контроля */
    const onReceiveView = res => {
      isLoadedView.value = res.isData;
    };
    // регистрируем события
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].addListener(climate/* API_VARIABLE_CLIMATE_EVENT */.n$, onReceiveValue);
      canbus["default"].addListener(climate/* API_VARIABLE_CLIMATE_VIEW_EVENT */.j6, onReceiveView);
      onReceiveValue(canbus["default"].values.variable.climate);
      onReceiveView(canbus["default"].views.variable.climate);
    });
    // удаляем события
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].removeListener(climate/* API_VARIABLE_CLIMATE_EVENT */.n$, onReceiveValue);
      canbus["default"].removeListener(climate/* API_VARIABLE_CLIMATE_VIEW_EVENT */.j6, onReceiveView);
    });
    // МЕНЮ ОТОБРАЖЕНИЯ
    const menu = (0,runtime_core_esm_bundler/* computed */.Fl)(() => [{
      id: 0,
      title: t("onboard.climate.menu")
    }]);
    const menuVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const menuSelected = (0,reactivity_esm_bundler/* ref */.iH)({});
    const menuViewConfig = (0,reactivity_esm_bundler/* ref */.iH)({});
    /**
     * Выбор пункта меню отображения на информационном экране
     * @param {IMenuItem} item Элемент меню
     */
    const onMenuClick = item => {
      menuVisible.value = true;
      menuSelected.value = item;
      menuViewConfig.value = canbus["default"].views.variable.climate.view;
    };
    /**
     * Применить параметры отображения на информационном экране
     * @param {IViewConfig} data Новые параметры отображения
     */
    const onViewSettingApply = data => {
      canbus["default"].views.variable.climate.view = data;
      canbus["default"].queryView(climate/* API_VARIABLE_CLIMATE_VIEW_EXEC */.EW);
    };
    return {
      isLoadedValue,
      isLoadedView,
      enabled,
      autoMode,
      ac,
      temperature,
      airEnabled,
      airName,
      blowEnabled,
      blowName,
      blowWindshield,
      speedRotation,
      menu,
      menuVisible,
      menuSelected,
      menuViewConfig,
      onMenuClick,
      onViewSettingApply
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/ClimateCard.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/views/onboard/components/ClimateCard.vue




;
const ClimateCard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(ClimateCardvue_type_script_lang_ts, [['render',ClimateCardvue_type_template_id_4e42cfa6_ts_true_render]])

/* harmony default export */ var ClimateCard = (ClimateCard_exports_);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/BoseCard.vue?vue&type=template&id=4937f932&ts=true

function BoseCardvue_type_template_id_4937f932_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("icon-card-item");
                                                      
  const _component_slider_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("slider-card-item");
  const _component_switch_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("switch-card-item");
  const _component_select_card_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("select-card-item");
                                                      
  const _component_card = (0,runtime_core_esm_bundler/* resolveComponent */.up)("card");
  const _component_view_setting_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("view-setting-dialog");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_card, {
    class: "climate-card",
    title: _ctx.$t('onboard.bose.title'),
    menu: $setup.menu,
    "onClick:menu": $setup.onMenuClick
  }, {
    body: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VRow/* VRow */.o, null, {
      default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_card_item, {
          modelValue: $setup.enabled,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.enabled = $event),
          title: _ctx.$t('onboard.bose.enabled.title'),
          description: _ctx.$t('onboard.bose.enabled.description'),
          "icon-name": ['bose'],
          nodata: !$setup.isLoadedBoseConfig,
          disabled: !$setup.isLoadedBoseView,
          onChange: $setup.onApplyBoseConfig
        }, null, 8, ["modelValue", "title", "description", "nodata", "disabled", "onChange"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_slider_card_item, {
          modelValue: $setup.volume,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $setup.volume = $event),
          title: _ctx.$t('onboard.volume.level.title'),
          description: _ctx.$t('onboard.volume.level.description'),
          max: 63,
          nodata: !$setup.isLoadedVolumeConfig,
          disabled: !$setup.isLoadedVolumeView || !$setup.enabled[0],
          onChange: $setup.onApplyVolumeConfig
        }, null, 8, ["modelValue", "title", "description", "nodata", "disabled", "onChange"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          modelValue: $setup.mute,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.mute = $event),
          title: _ctx.$t('onboard.volume.mute.title'),
          description: _ctx.$t('onboard.volume.mute.description'),
          color: "warning",
          nodata: !$setup.isLoadedVolumeConfig,
          disabled: !$setup.isLoadedVolumeView || !$setup.enabled[0],
          onChange: $setup.onApplyVolumeConfig
        }, null, 8, ["modelValue", "title", "description", "nodata", "disabled", "onChange"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          modelValue: $setup.audioPLT,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $setup.audioPLT = $event),
          title: _ctx.$t('onboard.bose.audioPLT.title'),
          description: _ctx.$t('onboard.bose.audioPLT.description'),
          color: "success",
          nodata: !$setup.isLoadedBoseConfig,
          disabled: !$setup.isLoadedBoseView || !$setup.enabled[0],
          onChange: $setup.onApplyBoseConfig
        }, null, 8, ["modelValue", "title", "description", "nodata", "disabled", "onChange"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_select_card_item, {
          modelValue: $setup.centerPoint,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.centerPoint = $event),
          title: _ctx.$t('onboard.bose.centerPoint.title'),
          description: _ctx.$t('onboard.bose.centerPoint.description'),
          items: $setup.centerPointList,
          disabled: !$setup.isLoadedBoseView || !$setup.enabled[0],
          onChange: $setup.onApplyBoseConfig
        }, null, 8, ["modelValue", "title", "description", "items", "disabled", "onChange"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_slider_card_item, {
          modelValue: $setup.balance,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $setup.balance = $event),
          title: _ctx.$t('onboard.bose.balance.title'),
          description: _ctx.$t('onboard.bose.balance.description'),
          min: -8,
          max: 8,
          "prepend-icon": "volume-l",
          "append-icon": "volume-r",
          disabled: !$setup.isLoadedBoseView || !$setup.enabled[0],
          onChange: $setup.onApplyBoseConfig
        }, null, 8, ["modelValue", "title", "description", "disabled", "onChange"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_slider_card_item, {
          modelValue: $setup.fade,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $setup.fade = $event),
          title: _ctx.$t('onboard.bose.fade.title'),
          description: _ctx.$t('onboard.bose.fade.description'),
          min: -8,
          max: 8,
          "prepend-icon": "volume-fade-r",
          "append-icon": "volume-fade-f",
          disabled: !$setup.isLoadedBoseView || !$setup.enabled[0],
          onChange: $setup.onApplyBoseConfig
        }, null, 8, ["modelValue", "title", "description", "disabled", "onChange"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_slider_card_item, {
          modelValue: $setup.treble,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $setup.treble = $event),
          title: _ctx.$t('onboard.bose.treble.title'),
          description: _ctx.$t('onboard.bose.treble.description'),
          min: -6,
          max: 6,
          "prepend-icon-mdi": "mdi-volume-medium",
          "append-icon-mdi": "mdi-volume-high",
          disabled: !$setup.isLoadedBoseView || !$setup.enabled[0],
          onChange: $setup.onApplyBoseConfig
        }, null, 8, ["modelValue", "title", "description", "disabled", "onChange"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0 pb-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_slider_card_item, {
          modelValue: $setup.bass,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => $setup.bass = $event),
          title: _ctx.$t('onboard.bose.bass.title'),
          description: _ctx.$t('onboard.bose.bass.description'),
          min: -6,
          max: 6,
          "prepend-icon-mdi": "mdi-volume-medium",
          "append-icon-mdi": "mdi-volume-high",
          disabled: !$setup.isLoadedBoseView || !$setup.enabled[0],
          onChange: $setup.onApplyBoseConfig
        }, null, 8, ["modelValue", "title", "description", "disabled", "onChange"])]),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VCol/* VCol */.D, {
        cols: "12",
        class: "pt-0"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_switch_card_item, {
          modelValue: $setup.wow,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $setup.wow = $event),
          title: _ctx.$t('onboard.bose.wow.title'),
          description: _ctx.$t('onboard.bose.wow.description'),
          color: "success",
          nodata: !$setup.isLoadedBoseConfig,
          disabled: !$setup.isLoadedBoseView || !$setup.enabled[0],
          onChange: $setup.onApplyBoseConfig
        }, null, 8, ["modelValue", "title", "description", "nodata", "disabled", "onChange"])]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }, 8, ["title", "menu", "onClick:menu"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_view_setting_dialog, {
    modelValue: $setup.menuVisible,
    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $setup.menuVisible = $event),
    title: $setup.menuSelected.title,
    enabled: $setup.menuViewConfig.enabled,
    type: $setup.menuViewConfig.type,
    time: $setup.menuViewConfig.time,
    disabled: !$setup.isLoadedBoseView,
    "onClick:apply": $setup.onViewSettingApply
  }, null, 8, ["modelValue", "title", "enabled", "type", "time", "disabled", "onClick:apply"])], 64);
}

/* Vuetify */



// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VSlider/VSlider.mjs
var VSlider = __webpack_require__(5999);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/SliderCardItem.vue?vue&type=template&id=3d48ad1c&scoped=true&ts=true

const SliderCardItemvue_type_template_id_3d48ad1c_scoped_true_ts_true_withScopeId = n => (_pushScopeId("data-v-3d48ad1c"), n = n(), _popScopeId(), n);
const SliderCardItemvue_type_template_id_3d48ad1c_scoped_true_ts_true_hoisted_1 = {
  class: "slider-card-item"
};
function SliderCardItemvue_type_template_id_3d48ad1c_scoped_true_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_custom = (0,runtime_core_esm_bundler/* resolveComponent */.up)("icon-custom");
                                                            
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", SliderCardItemvue_type_template_id_3d48ad1c_scoped_true_ts_true_hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
    class: (0,shared_esm_bundler/* normalizeClass */.C_)(["text-h4", {
      'slider-card-item__disabled': $props.disabled
    }])
  }, (0,shared_esm_bundler/* toDisplayString */.zw)($props.title), 3), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VSlider/* VSlider */.R, {
    modelValue: $setup.modelSlider,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.modelSlider = $event),
    min: $props.min,
    max: $props.max,
    "prepend-icon": !$props.prependIcon ? $props.prependIconMdi : undefined,
    "append-icon": !$props.appendIcon ? $props.appendIconMdi : undefined,
    color: $setup.color(),
    step: 1,
    disabled: $props.disabled,
    "hide-details": "",
    "onUpdate:focused": $setup.onFocusedUpdate
  }, (0,runtime_core_esm_bundler/* createSlots */.Nv)({
    _: 2
  }, [$props.prependIcon ? {
    name: "prepend",
    fn: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_custom, {
      name: $props.prependIcon,
      size: $props.sizeIcon,
      color: $props.colorIcon
    }, null, 8, ["name", "size", "color"])]),
    key: "0"
  } : undefined, $props.appendIcon ? {
    name: "append",
    fn: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_icon_custom, {
      name: $props.appendIcon,
      size: $props.sizeIcon,
      color: $props.colorIcon
    }, null, 8, ["name", "size", "color"])]),
    key: "1"
  } : undefined]), 1032, ["modelValue", "min", "max", "prepend-icon", "append-icon", "color", "disabled", "onUpdate:focused"]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
    class: (0,shared_esm_bundler/* normalizeClass */.C_)(["mt-1 slider-card-item__description", {
      'slider-card-item__disabled': $props.disabled
    }])
  }, (0,shared_esm_bundler/* toDisplayString */.zw)($props.description), 3)]);
}

/* Vuetify */



;// CONCATENATED MODULE: ./src/components/cards/SliderCardItem.vue?vue&type=template&id=3d48ad1c&scoped=true&ts=true

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/SliderCardItem.vue?vue&type=script&lang=ts


/* harmony default export */ var SliderCardItemvue_type_script_lang_ts = ({
  name: "SliderCardItem",
  components: {
    IconCustom: IconCustom/* default */.Z
  },
  props: {
    /** Значение slider */
    modelValue: Number,
    /** Заголовок */
    title: String,
    /** Описание */
    description: String,
    /** Минимальное значение */
    min: {
      type: Number,
      default: 0
    },
    /** Максимальное значение */
    max: {
      type: Number,
      default: 32
    },
    /** Имя MDI иконки в начале */
    prependIconMdi: {
      type: String,
      default: "mdi-volume-minus"
    },
    /** Имя MDI иконки в конце */
    appendIconMdi: {
      type: String,
      default: "mdi-volume-plus"
    },
    /** Имя иконки в начале */
    prependIcon: String,
    /** Имя иконки в конце */
    appendIcon: String,
    /** Размер иконки */
    sizeIcon: {
      type: [String, Number],
      default: 24
    },
    /** Цвет иконки */
    colorIcon: {
      type: String,
      default: "#939597"
    },
    /** Точки */
    points: {
      type: Array,
      default: () => [7, 18, 26, 32]
    },
    /** Цвет точки */
    pointColors: {
      type: Array,
      default: () => ["primary", "success", "warning", "error"]
    },
    /** Выкл. */
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(props, {
    emit
  }) {
    const {
      modelValue,
      points,
      pointColors,
      disabled
    } = (0,reactivity_esm_bundler/* toRefs */.BK)(props);
    const flicking = (0,runtime_core_esm_bundler/* inject */.f3)("flicking");
    const modelSlider = (0,runtime_core_esm_bundler/* computed */.Fl)({
      get: () => modelValue.value,
      set: val => {
        if (!disabled.value) {
          emit("update:modelValue", val);
          emit("change", val);
        }
      }
    });
    /**
     * Блокировка flicking
     * @param {boolean} ev Статус фокуса
     */
    const onFocusedUpdate = ev => {
      if (ev) flicking.value.disableInput();else flicking.value.enableInput();
    };
    /** Цвет */
    const color = () => {
      const index = points.value?.findIndex(x => modelSlider.value <= x);
      return pointColors.value?.[index] ?? "error";
    };
    return {
      flicking,
      modelSlider,
      onFocusedUpdate,
      color
    };
  }
});
;// CONCATENATED MODULE: ./src/components/cards/SliderCardItem.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/SliderCardItem.vue?vue&type=style&index=0&id=3d48ad1c&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/cards/SliderCardItem.vue?vue&type=style&index=0&id=3d48ad1c&lang=scss&scoped=true

;// CONCATENATED MODULE: ./src/components/cards/SliderCardItem.vue




;


const SliderCardItem_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(SliderCardItemvue_type_script_lang_ts, [['render',SliderCardItemvue_type_template_id_3d48ad1c_scoped_true_ts_true_render],['__scopeId',"data-v-3d48ad1c"]])

/* harmony default export */ var SliderCardItem = (SliderCardItem_exports_);
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VSelect/VSelect.mjs + 1 modules
var VSelect = __webpack_require__(240);
;// CONCATENATED MODULE: ./node_modules/webpack-plugin-vuetify/dist/scriptLoader.js!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[5]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/SelectCardItem.vue?vue&type=template&id=20c266ba&scoped=true&ts=true

const SelectCardItemvue_type_template_id_20c266ba_scoped_true_ts_true_withScopeId = n => (_pushScopeId("data-v-20c266ba"), n = n(), _popScopeId(), n);
const SelectCardItemvue_type_template_id_20c266ba_scoped_true_ts_true_hoisted_1 = {
  class: "select-card-item"
};
function SelectCardItemvue_type_template_id_20c266ba_scoped_true_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
                                                            
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", SelectCardItemvue_type_template_id_20c266ba_scoped_true_ts_true_hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
    class: (0,shared_esm_bundler/* normalizeClass */.C_)(["text-h4", {
      'select-card-item__disabled': $props.disabled
    }])
  }, (0,shared_esm_bundler/* toDisplayString */.zw)($props.title), 3), (0,runtime_core_esm_bundler/* createVNode */.Wm)(VSelect/* VSelect */.r, {
    modelValue: $setup.modelSelect,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.modelSelect = $event),
    items: $props.items,
    hint: $props.description,
    variant: "underlined",
    "item-title": $props.itemTitle,
    "item-value": $props.itemValue,
    disabled: $props.disabled,
    "persistent-hint": ""
  }, null, 8, ["modelValue", "items", "hint", "item-title", "item-value", "disabled"])]);
}

/* Vuetify */



;// CONCATENATED MODULE: ./src/components/cards/SelectCardItem.vue?vue&type=template&id=20c266ba&scoped=true&ts=true

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/SelectCardItem.vue?vue&type=script&lang=ts


/* harmony default export */ var SelectCardItemvue_type_script_lang_ts = ({
  name: "SelectCardItem",
  components: {
    IconCustom: IconCustom/* default */.Z
  },
  props: {
    /** Значение select */
    modelValue: Number,
    /** Заголовок */
    title: String,
    /** Описание */
    description: String,
    /** Список значений */
    items: Array,
    /** Отображаемое в списке название */
    itemTitle: {
      type: String,
      default: "title"
    },
    /** Значение в списке */
    itemValue: {
      type: String,
      default: "value"
    },
    /** Выкл. */
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(props, {
    emit
  }) {
    const {
      modelValue,
      disabled
    } = (0,reactivity_esm_bundler/* toRefs */.BK)(props);
    const modelSelect = (0,runtime_core_esm_bundler/* computed */.Fl)({
      get: () => modelValue.value,
      set: val => {
        if (!disabled.value) {
          emit("update:modelValue", val);
          emit("change", val);
        }
      }
    });
    return {
      modelSelect
    };
  }
});
;// CONCATENATED MODULE: ./src/components/cards/SelectCardItem.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cards/SelectCardItem.vue?vue&type=style&index=0&id=20c266ba&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/cards/SelectCardItem.vue?vue&type=style&index=0&id=20c266ba&lang=scss&scoped=true

;// CONCATENATED MODULE: ./src/components/cards/SelectCardItem.vue




;


const SelectCardItem_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(SelectCardItemvue_type_script_lang_ts, [['render',SelectCardItemvue_type_template_id_20c266ba_scoped_true_ts_true_render],['__scopeId',"data-v-20c266ba"]])

/* harmony default export */ var SelectCardItem = (SelectCardItem_exports_);
// EXTERNAL MODULE: ./src/models/pjcan/variables/bose/index.ts + 3 modules
var bose = __webpack_require__(9217);
// EXTERNAL MODULE: ./src/models/pjcan/variables/volume/index.ts + 3 modules
var variables_volume = __webpack_require__(139);
// EXTERNAL MODULE: ./src/utils/debounce.ts
var debounce = __webpack_require__(9545);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/components/BoseCard.vue?vue&type=script&lang=ts













/* harmony default export */ var BoseCardvue_type_script_lang_ts = ({
  name: "BoseCard",
  components: {
    ViewSettingDialog: ViewSettingDialog/* default */.Z,
    IconCardItem: IconCardItem,
    InputCardItem: InputCardItem/* default */.Z,
    SwitchCardItem: SwitchCardItem/* default */.Z,
    SliderCardItem: SliderCardItem,
    SelectCardItem: SelectCardItem,
    Card: Card/* default */.Z
  },
  props: {
    carModel: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const {
      t
    } = (0,vue_i18n_esm_bundler/* useI18n */.QT)();
    // Bose
    const isLoadedBoseConfig = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedBoseView = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const enabled = (0,reactivity_esm_bundler/* ref */.iH)([false]);
    const audioPLT = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const radioFM = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const wow = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const balance = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const bass = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const fade = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const treble = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const centerPoint = (0,reactivity_esm_bundler/* ref */.iH)(bose/* TCenterPoint.CENTERPOINT_OFF */.XY.CENTERPOINT_OFF);
    const centerPointList = (0,runtime_core_esm_bundler/* computed */.Fl)(() => [{
      title: "OFF",
      value: bose/* TCenterPoint.CENTERPOINT_OFF */.XY.CENTERPOINT_OFF
    }, {
      title: "MIN",
      value: bose/* TCenterPoint.CENTERPOINT_MIN */.XY.CENTERPOINT_MIN
    }, {
      title: "LOW",
      value: bose/* TCenterPoint.CENTERPOINT_LOW */.XY.CENTERPOINT_LOW
    }, {
      title: "MID",
      value: bose/* TCenterPoint.CENTERPOINT_MID */.XY.CENTERPOINT_MID
    }, {
      title: "HI",
      value: bose/* TCenterPoint.CENTERPOINT_HI */.XY.CENTERPOINT_HI
    }, {
      title: "MAX",
      value: bose/* TCenterPoint.CENTERPOINT_MAX */.XY.CENTERPOINT_MAX
    }]);
    let disabledBoseConfig = false;
    const debounceBoseConfig = (0,debounce/* createDebounce */.c)();
    /** Входящие значения Bose */
    const onReceiveBoseConfig = res => {
      isLoadedBoseConfig.value = res.isData;
      if (res.isData) {
        enabled.value[0] = res.enabled;
        audioPLT.value = res.audioPLT;
        radioFM.value = res.radioFM;
        wow.value = res.wow;
        balance.value = res.balance;
        bass.value = res.bass;
        fade.value = res.fade;
        treble.value = res.treble;
        centerPoint.value = res.centerPoint;
        disabledBoseConfig = false;
      }
    };
    /** Входящие значения отображения климат-контроля */
    const onReceiveBoseView = res => {
      isLoadedBoseView.value = res.isData;
    };
    /** Применить значения Bose */
    const onApplyBoseConfig = () => {
      if (isLoadedBoseConfig.value && !disabledBoseConfig) {
        disabledBoseConfig = true;
        debounceBoseConfig(() => disabledBoseConfig = false, 1000);
        canbus["default"].configs.variable.bose.enabled = enabled.value[0];
        canbus["default"].configs.variable.bose.audioPLT = audioPLT.value;
        canbus["default"].configs.variable.bose.radioFM = radioFM.value;
        canbus["default"].configs.variable.bose.wow = wow.value;
        canbus["default"].configs.variable.bose.balance = balance.value;
        canbus["default"].configs.variable.bose.bass = bass.value;
        canbus["default"].configs.variable.bose.fade = fade.value;
        canbus["default"].configs.variable.bose.treble = treble.value;
        canbus["default"].configs.variable.bose.centerPoint = centerPoint.value;
        canbus["default"].queryConfig(bose/* API_VARIABLE_BOSE_EXEC */.j3);
      }
    };
    // Volume
    const isLoadedVolumeConfig = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const isLoadedVolumeView = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const mute = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const volume = (0,reactivity_esm_bundler/* ref */.iH)(0);
    let disabledVolumeConfig = false;
    const debounceVolumeConfig = (0,debounce/* createDebounce */.c)();
    /** Входящие конфигурация звука */
    const onReceiveVolumeConfig = res => {
      isLoadedVolumeConfig.value = res.isData;
      if (res.isData) {
        mute.value = res.muteBose;
        volume.value = res.volumeBose;
        disabledVolumeConfig = false;
      }
    };
    /** Входящие значения отображения звука */
    const onReceiveVolumeView = res => {
      isLoadedVolumeView.value = res.isData;
    };
    /** Применить значения звука */
    const onApplyVolumeConfig = () => {
      if (isLoadedVolumeConfig.value && !disabledVolumeConfig) {
        disabledVolumeConfig = true;
        debounceVolumeConfig(() => disabledVolumeConfig = false, 1000);
        canbus["default"].configs.variable.volume.muteBose = mute.value;
        canbus["default"].configs.variable.volume.volumeBose = volume.value;
        canbus["default"].queryConfig(variables_volume/* API_VARIABLE_VOLUME_CONFIG_EXEC */.U0);
      }
    };
    // регистрируем события
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].addListener(bose/* API_VARIABLE_BOSE_EVENT */.uj, onReceiveBoseConfig);
      canbus["default"].addListener(bose/* API_VARIABLE_BOSE_VIEW_EVENT */.sO, onReceiveBoseView);
      canbus["default"].addListener(variables_volume/* API_VARIABLE_VOLUME_CONFIG_EVENT */.Vy, onReceiveVolumeConfig);
      canbus["default"].addListener(variables_volume/* API_VARIABLE_VOLUME_VIEW_EVENT */.H7, onReceiveVolumeView);
      onReceiveBoseConfig(canbus["default"].configs.variable.bose);
      onReceiveBoseView(canbus["default"].views.variable.bose);
      onReceiveVolumeConfig(canbus["default"].configs.variable.volume);
      onReceiveVolumeView(canbus["default"].views.variable.volume);
    });
    // удаляем события
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].removeListener(bose/* API_VARIABLE_BOSE_EVENT */.uj, onReceiveBoseConfig);
      canbus["default"].removeListener(bose/* API_VARIABLE_BOSE_VIEW_EVENT */.sO, onReceiveBoseView);
      canbus["default"].removeListener(variables_volume/* API_VARIABLE_VOLUME_CONFIG_EVENT */.Vy, onReceiveVolumeConfig);
      canbus["default"].removeListener(variables_volume/* API_VARIABLE_VOLUME_VIEW_EVENT */.H7, onReceiveVolumeView);
    });
    // МЕНЮ ОТОБРАЖЕНИЯ
    const menu = (0,runtime_core_esm_bundler/* computed */.Fl)(() => [{
      id: 0,
      title: t("onboard.bose.menu")
    }]);
    const menuVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const menuSelected = (0,reactivity_esm_bundler/* ref */.iH)({});
    const menuViewConfig = (0,reactivity_esm_bundler/* ref */.iH)({});
    /**
     * Выбор пункта меню отображения на информационном экране
     * @param {IMenuItem} item Элемент меню
     */
    const onMenuClick = item => {
      menuVisible.value = true;
      menuSelected.value = item;
      menuViewConfig.value = canbus["default"].views.variable.bose.view;
    };
    /**
     * Применить параметры отображения на информационном экране
     * @param {IViewConfig} data Новые параметры отображения
     */
    const onViewSettingApply = data => {
      canbus["default"].views.variable.bose.view = data;
      canbus["default"].queryView(bose/* API_VARIABLE_BOSE_VIEW_EXEC */.qT);
    };
    return {
      isLoadedBoseConfig,
      isLoadedBoseView,
      isLoadedVolumeConfig,
      isLoadedVolumeView,
      enabled,
      audioPLT,
      radioFM,
      wow,
      balance,
      bass,
      fade,
      treble,
      centerPoint,
      centerPointList,
      mute,
      volume,
      menu,
      menuVisible,
      menuSelected,
      menuViewConfig,
      onApplyBoseConfig,
      onApplyVolumeConfig,
      onMenuClick,
      onViewSettingApply
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/components/BoseCard.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/views/onboard/components/BoseCard.vue




;
const BoseCard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(BoseCardvue_type_script_lang_ts, [['render',BoseCardvue_type_template_id_4937f932_ts_true_render]])

/* harmony default export */ var BoseCard = (BoseCard_exports_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/index.vue?vue&type=script&lang=ts













/* harmony default export */ var onboardvue_type_script_lang_ts = ({
  name: "onboard",
  components: {
    Flicking: flicking_esm/* default */.Co,
    InfoCard: InfoCard,
    EngineCard: EngineCard,
    FuelCard: FuelCard,
    MovementCard: MovementCard,
    DoorsCard: DoorsCard,
    ClimateCard: ClimateCard,
    BoseCard: BoseCard
  },
  setup() {
    const {
      name: display
    } = (0,composables_display/* useDisplay */.AW)();
    const flicking = (0,reactivity_esm_bundler/* ref */.iH)(null);
    (0,runtime_core_esm_bundler/* provide */.JJ)("flicking", flicking);
    const carModel = (0,reactivity_esm_bundler/* ref */.iH)(canbus["default"].configs.car.carModel);
    const cardList = (0,runtime_core_esm_bundler/* computed */.Fl)(() => {
      return store/* default.getters.app/onboardCardList */.Z.getters["app/onboardCardList"]?.filter(x => x.enabled && x.car?.indexOf(carModel.value) >= 0);
    });
    const onReceiveCarConfig = res => {
      if (res.isData) carModel.value = res.carModel;
    };
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      canbus["default"].startFetchValue();
      canbus["default"].addListener(car/* API_CAR_CONFIG_EVENT */.Gd, onReceiveCarConfig);
      onReceiveCarConfig(canbus["default"].configs.car);
    });
    (0,runtime_core_esm_bundler/* onUnmounted */.Ah)(() => {
      canbus["default"].stopFetchValue();
      canbus["default"].removeListener(car/* API_CAR_CONFIG_EVENT */.Gd, onReceiveCarConfig);
    });
    return {
      flicking,
      carModel,
      cardList,
      display
    };
  }
});
;// CONCATENATED MODULE: ./src/views/onboard/index.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/onboard/index.vue?vue&type=style&index=0&id=10185709&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/views/onboard/index.vue?vue&type=style&index=0&id=10185709&lang=scss&scoped=true

;// CONCATENATED MODULE: ./src/views/onboard/index.vue




;


const onboard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(onboardvue_type_script_lang_ts, [['render',render],['__scopeId',"data-v-10185709"]])

/* harmony default export */ var onboard = (onboard_exports_);

/***/ })

}]);