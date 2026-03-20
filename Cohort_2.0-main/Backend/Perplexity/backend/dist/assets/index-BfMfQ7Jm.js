function z2(e, n) {
  for (var i = 0; i < n.length; i++) {
    const a = n[i];
    if (typeof a != "string" && !Array.isArray(a)) {
      for (const o in a)
        if (o !== "default" && !(o in e)) {
          const u = Object.getOwnPropertyDescriptor(a, o);
          u &&
            Object.defineProperty(
              e,
              o,
              u.get ? u : { enumerable: !0, get: () => a[o] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) a(o);
  new MutationObserver((o) => {
    for (const u of o)
      if (u.type === "childList")
        for (const c of u.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && a(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(o) {
    const u = {};
    return (
      o.integrity && (u.integrity = o.integrity),
      o.referrerPolicy && (u.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    );
  }
  function a(o) {
    if (o.ep) return;
    o.ep = !0;
    const u = i(o);
    fetch(o.href, u);
  }
})();
function Kh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Cd = { exports: {} },
  to = {};
var E0;
function D2() {
  if (E0) return to;
  E0 = 1;
  var e = Symbol.for("react.transitional.element"),
    n = Symbol.for("react.fragment");
  function i(a, o, u) {
    var c = null;
    if (
      (u !== void 0 && (c = "" + u),
      o.key !== void 0 && (c = "" + o.key),
      "key" in o)
    ) {
      u = {};
      for (var f in o) f !== "key" && (u[f] = o[f]);
    } else u = o;
    return (
      (o = u.ref),
      { $$typeof: e, type: a, key: c, ref: o !== void 0 ? o : null, props: u }
    );
  }
  return ((to.Fragment = n), (to.jsx = i), (to.jsxs = i), to);
}
var k0;
function N2() {
  return (k0 || ((k0 = 1), (Cd.exports = D2())), Cd.exports);
}
var w = N2(),
  _d = { exports: {} },
  Me = {};
var C0;
function M2() {
  if (C0) return Me;
  C0 = 1;
  var e = Symbol.for("react.transitional.element"),
    n = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    a = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    u = Symbol.for("react.consumer"),
    c = Symbol.for("react.context"),
    f = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    p = Symbol.for("react.memo"),
    y = Symbol.for("react.lazy"),
    g = Symbol.for("react.activity"),
    x = Symbol.iterator;
  function v(O) {
    return O === null || typeof O != "object"
      ? null
      : ((O = (x && O[x]) || O["@@iterator"]),
        typeof O == "function" ? O : null);
  }
  var S = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    _ = Object.assign,
    k = {};
  function T(O, G, C) {
    ((this.props = O),
      (this.context = G),
      (this.refs = k),
      (this.updater = C || S));
  }
  ((T.prototype.isReactComponent = {}),
    (T.prototype.setState = function (O, G) {
      if (typeof O != "object" && typeof O != "function" && O != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, O, G, "setState");
    }),
    (T.prototype.forceUpdate = function (O) {
      this.updater.enqueueForceUpdate(this, O, "forceUpdate");
    }));
  function j() {}
  j.prototype = T.prototype;
  function M(O, G, C) {
    ((this.props = O),
      (this.context = G),
      (this.refs = k),
      (this.updater = C || S));
  }
  var $ = (M.prototype = new j());
  (($.constructor = M), _($, T.prototype), ($.isPureReactComponent = !0));
  var Z = Array.isArray;
  function U() {}
  var K = { H: null, A: null, T: null, S: null },
    N = Object.prototype.hasOwnProperty;
  function he(O, G, C) {
    var se = C.ref;
    return {
      $$typeof: e,
      type: O,
      key: G,
      ref: se !== void 0 ? se : null,
      props: C,
    };
  }
  function F(O, G) {
    return he(O.type, G, O.props);
  }
  function oe(O) {
    return typeof O == "object" && O !== null && O.$$typeof === e;
  }
  function ie(O) {
    var G = { "=": "=0", ":": "=2" };
    return (
      "$" +
      O.replace(/[=:]/g, function (C) {
        return G[C];
      })
    );
  }
  var Ee = /\/+/g;
  function le(O, G) {
    return typeof O == "object" && O !== null && O.key != null
      ? ie("" + O.key)
      : G.toString(36);
  }
  function ee(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (
          (typeof O.status == "string"
            ? O.then(U, U)
            : ((O.status = "pending"),
              O.then(
                function (G) {
                  O.status === "pending" &&
                    ((O.status = "fulfilled"), (O.value = G));
                },
                function (G) {
                  O.status === "pending" &&
                    ((O.status = "rejected"), (O.reason = G));
                },
              )),
          O.status)
        ) {
          case "fulfilled":
            return O.value;
          case "rejected":
            throw O.reason;
        }
    }
    throw O;
  }
  function D(O, G, C, se, Se) {
    var be = typeof O;
    (be === "undefined" || be === "boolean") && (O = null);
    var Ne = !1;
    if (O === null) Ne = !0;
    else
      switch (be) {
        case "bigint":
        case "string":
        case "number":
          Ne = !0;
          break;
        case "object":
          switch (O.$$typeof) {
            case e:
            case n:
              Ne = !0;
              break;
            case y:
              return ((Ne = O._init), D(Ne(O._payload), G, C, se, Se));
          }
      }
    if (Ne)
      return (
        (Se = Se(O)),
        (Ne = se === "" ? "." + le(O, 0) : se),
        Z(Se)
          ? ((C = ""),
            Ne != null && (C = Ne.replace(Ee, "$&/") + "/"),
            D(Se, G, C, "", function (on) {
              return on;
            }))
          : Se != null &&
            (oe(Se) &&
              (Se = F(
                Se,
                C +
                  (Se.key == null || (O && O.key === Se.key)
                    ? ""
                    : ("" + Se.key).replace(Ee, "$&/") + "/") +
                  Ne,
              )),
            G.push(Se)),
        1
      );
    Ne = 0;
    var rt = se === "" ? "." : se + ":";
    if (Z(O))
      for (var Ke = 0; Ke < O.length; Ke++)
        ((se = O[Ke]), (be = rt + le(se, Ke)), (Ne += D(se, G, C, be, Se)));
    else if (((Ke = v(O)), typeof Ke == "function"))
      for (O = Ke.call(O), Ke = 0; !(se = O.next()).done; )
        ((se = se.value),
          (be = rt + le(se, Ke++)),
          (Ne += D(se, G, C, be, Se)));
    else if (be === "object") {
      if (typeof O.then == "function") return D(ee(O), G, C, se, Se);
      throw (
        (G = String(O)),
        Error(
          "Objects are not valid as a React child (found: " +
            (G === "[object Object]"
              ? "object with keys {" + Object.keys(O).join(", ") + "}"
              : G) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return Ne;
  }
  function te(O, G, C) {
    if (O == null) return O;
    var se = [],
      Se = 0;
    return (
      D(O, se, "", "", function (be) {
        return G.call(C, be, Se++);
      }),
      se
    );
  }
  function fe(O) {
    if (O._status === -1) {
      var G = O._result;
      ((G = G()),
        G.then(
          function (C) {
            (O._status === 0 || O._status === -1) &&
              ((O._status = 1), (O._result = C));
          },
          function (C) {
            (O._status === 0 || O._status === -1) &&
              ((O._status = 2), (O._result = C));
          },
        ),
        O._status === -1 && ((O._status = 0), (O._result = G)));
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var me =
      typeof reportError == "function"
        ? reportError
        : function (O) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var G = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof O == "object" &&
                  O !== null &&
                  typeof O.message == "string"
                    ? String(O.message)
                    : String(O),
                error: O,
              });
              if (!window.dispatchEvent(G)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", O);
              return;
            }
            console.error(O);
          },
    R = {
      map: te,
      forEach: function (O, G, C) {
        te(
          O,
          function () {
            G.apply(this, arguments);
          },
          C,
        );
      },
      count: function (O) {
        var G = 0;
        return (
          te(O, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (O) {
        return (
          te(O, function (G) {
            return G;
          }) || []
        );
      },
      only: function (O) {
        if (!oe(O))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return O;
      },
    };
  return (
    (Me.Activity = g),
    (Me.Children = R),
    (Me.Component = T),
    (Me.Fragment = i),
    (Me.Profiler = o),
    (Me.PureComponent = M),
    (Me.StrictMode = a),
    (Me.Suspense = h),
    (Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K),
    (Me.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (O) {
        return K.H.useMemoCache(O);
      },
    }),
    (Me.cache = function (O) {
      return function () {
        return O.apply(null, arguments);
      };
    }),
    (Me.cacheSignal = function () {
      return null;
    }),
    (Me.cloneElement = function (O, G, C) {
      if (O == null)
        throw Error(
          "The argument must be a React element, but you passed " + O + ".",
        );
      var se = _({}, O.props),
        Se = O.key;
      if (G != null)
        for (be in (G.key !== void 0 && (Se = "" + G.key), G))
          !N.call(G, be) ||
            be === "key" ||
            be === "__self" ||
            be === "__source" ||
            (be === "ref" && G.ref === void 0) ||
            (se[be] = G[be]);
      var be = arguments.length - 2;
      if (be === 1) se.children = C;
      else if (1 < be) {
        for (var Ne = Array(be), rt = 0; rt < be; rt++)
          Ne[rt] = arguments[rt + 2];
        se.children = Ne;
      }
      return he(O.type, Se, se);
    }),
    (Me.createContext = function (O) {
      return (
        (O = {
          $$typeof: c,
          _currentValue: O,
          _currentValue2: O,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (O.Provider = O),
        (O.Consumer = { $$typeof: u, _context: O }),
        O
      );
    }),
    (Me.createElement = function (O, G, C) {
      var se,
        Se = {},
        be = null;
      if (G != null)
        for (se in (G.key !== void 0 && (be = "" + G.key), G))
          N.call(G, se) &&
            se !== "key" &&
            se !== "__self" &&
            se !== "__source" &&
            (Se[se] = G[se]);
      var Ne = arguments.length - 2;
      if (Ne === 1) Se.children = C;
      else if (1 < Ne) {
        for (var rt = Array(Ne), Ke = 0; Ke < Ne; Ke++)
          rt[Ke] = arguments[Ke + 2];
        Se.children = rt;
      }
      if (O && O.defaultProps)
        for (se in ((Ne = O.defaultProps), Ne))
          Se[se] === void 0 && (Se[se] = Ne[se]);
      return he(O, be, Se);
    }),
    (Me.createRef = function () {
      return { current: null };
    }),
    (Me.forwardRef = function (O) {
      return { $$typeof: f, render: O };
    }),
    (Me.isValidElement = oe),
    (Me.lazy = function (O) {
      return { $$typeof: y, _payload: { _status: -1, _result: O }, _init: fe };
    }),
    (Me.memo = function (O, G) {
      return { $$typeof: p, type: O, compare: G === void 0 ? null : G };
    }),
    (Me.startTransition = function (O) {
      var G = K.T,
        C = {};
      K.T = C;
      try {
        var se = O(),
          Se = K.S;
        (Se !== null && Se(C, se),
          typeof se == "object" &&
            se !== null &&
            typeof se.then == "function" &&
            se.then(U, me));
      } catch (be) {
        me(be);
      } finally {
        (G !== null && C.types !== null && (G.types = C.types), (K.T = G));
      }
    }),
    (Me.unstable_useCacheRefresh = function () {
      return K.H.useCacheRefresh();
    }),
    (Me.use = function (O) {
      return K.H.use(O);
    }),
    (Me.useActionState = function (O, G, C) {
      return K.H.useActionState(O, G, C);
    }),
    (Me.useCallback = function (O, G) {
      return K.H.useCallback(O, G);
    }),
    (Me.useContext = function (O) {
      return K.H.useContext(O);
    }),
    (Me.useDebugValue = function () {}),
    (Me.useDeferredValue = function (O, G) {
      return K.H.useDeferredValue(O, G);
    }),
    (Me.useEffect = function (O, G) {
      return K.H.useEffect(O, G);
    }),
    (Me.useEffectEvent = function (O) {
      return K.H.useEffectEvent(O);
    }),
    (Me.useId = function () {
      return K.H.useId();
    }),
    (Me.useImperativeHandle = function (O, G, C) {
      return K.H.useImperativeHandle(O, G, C);
    }),
    (Me.useInsertionEffect = function (O, G) {
      return K.H.useInsertionEffect(O, G);
    }),
    (Me.useLayoutEffect = function (O, G) {
      return K.H.useLayoutEffect(O, G);
    }),
    (Me.useMemo = function (O, G) {
      return K.H.useMemo(O, G);
    }),
    (Me.useOptimistic = function (O, G) {
      return K.H.useOptimistic(O, G);
    }),
    (Me.useReducer = function (O, G, C) {
      return K.H.useReducer(O, G, C);
    }),
    (Me.useRef = function (O) {
      return K.H.useRef(O);
    }),
    (Me.useState = function (O) {
      return K.H.useState(O);
    }),
    (Me.useSyncExternalStore = function (O, G, C) {
      return K.H.useSyncExternalStore(O, G, C);
    }),
    (Me.useTransition = function () {
      return K.H.useTransition();
    }),
    (Me.version = "19.2.4"),
    Me
  );
}
var _0;
function Xu() {
  return (_0 || ((_0 = 1), (_d.exports = M2())), _d.exports);
}
var B = Xu();
const j2 = Kh(B),
  L2 = z2({ __proto__: null, default: j2 }, [B]);
var Td = { exports: {} },
  no = {},
  Rd = { exports: {} },
  Ad = {};
var T0;
function B2() {
  return (
    T0 ||
      ((T0 = 1),
      (function (e) {
        function n(D, te) {
          var fe = D.length;
          D.push(te);
          e: for (; 0 < fe; ) {
            var me = (fe - 1) >>> 1,
              R = D[me];
            if (0 < o(R, te)) ((D[me] = te), (D[fe] = R), (fe = me));
            else break e;
          }
        }
        function i(D) {
          return D.length === 0 ? null : D[0];
        }
        function a(D) {
          if (D.length === 0) return null;
          var te = D[0],
            fe = D.pop();
          if (fe !== te) {
            D[0] = fe;
            e: for (var me = 0, R = D.length, O = R >>> 1; me < O; ) {
              var G = 2 * (me + 1) - 1,
                C = D[G],
                se = G + 1,
                Se = D[se];
              if (0 > o(C, fe))
                se < R && 0 > o(Se, C)
                  ? ((D[me] = Se), (D[se] = fe), (me = se))
                  : ((D[me] = C), (D[G] = fe), (me = G));
              else if (se < R && 0 > o(Se, fe))
                ((D[me] = Se), (D[se] = fe), (me = se));
              else break e;
            }
          }
          return te;
        }
        function o(D, te) {
          var fe = D.sortIndex - te.sortIndex;
          return fe !== 0 ? fe : D.id - te.id;
        }
        if (
          ((e.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var u = performance;
          e.unstable_now = function () {
            return u.now();
          };
        } else {
          var c = Date,
            f = c.now();
          e.unstable_now = function () {
            return c.now() - f;
          };
        }
        var h = [],
          p = [],
          y = 1,
          g = null,
          x = 3,
          v = !1,
          S = !1,
          _ = !1,
          k = !1,
          T = typeof setTimeout == "function" ? setTimeout : null,
          j = typeof clearTimeout == "function" ? clearTimeout : null,
          M = typeof setImmediate < "u" ? setImmediate : null;
        function $(D) {
          for (var te = i(p); te !== null; ) {
            if (te.callback === null) a(p);
            else if (te.startTime <= D)
              (a(p), (te.sortIndex = te.expirationTime), n(h, te));
            else break;
            te = i(p);
          }
        }
        function Z(D) {
          if (((_ = !1), $(D), !S))
            if (i(h) !== null) ((S = !0), U || ((U = !0), ie()));
            else {
              var te = i(p);
              te !== null && ee(Z, te.startTime - D);
            }
        }
        var U = !1,
          K = -1,
          N = 5,
          he = -1;
        function F() {
          return k ? !0 : !(e.unstable_now() - he < N);
        }
        function oe() {
          if (((k = !1), U)) {
            var D = e.unstable_now();
            he = D;
            var te = !0;
            try {
              e: {
                ((S = !1), _ && ((_ = !1), j(K), (K = -1)), (v = !0));
                var fe = x;
                try {
                  t: {
                    for (
                      $(D), g = i(h);
                      g !== null && !(g.expirationTime > D && F());
                    ) {
                      var me = g.callback;
                      if (typeof me == "function") {
                        ((g.callback = null), (x = g.priorityLevel));
                        var R = me(g.expirationTime <= D);
                        if (((D = e.unstable_now()), typeof R == "function")) {
                          ((g.callback = R), $(D), (te = !0));
                          break t;
                        }
                        (g === i(h) && a(h), $(D));
                      } else a(h);
                      g = i(h);
                    }
                    if (g !== null) te = !0;
                    else {
                      var O = i(p);
                      (O !== null && ee(Z, O.startTime - D), (te = !1));
                    }
                  }
                  break e;
                } finally {
                  ((g = null), (x = fe), (v = !1));
                }
                te = void 0;
              }
            } finally {
              te ? ie() : (U = !1);
            }
          }
        }
        var ie;
        if (typeof M == "function")
          ie = function () {
            M(oe);
          };
        else if (typeof MessageChannel < "u") {
          var Ee = new MessageChannel(),
            le = Ee.port2;
          ((Ee.port1.onmessage = oe),
            (ie = function () {
              le.postMessage(null);
            }));
        } else
          ie = function () {
            T(oe, 0);
          };
        function ee(D, te) {
          K = T(function () {
            D(e.unstable_now());
          }, te);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (D) {
            D.callback = null;
          }),
          (e.unstable_forceFrameRate = function (D) {
            0 > D || 125 < D
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (N = 0 < D ? Math.floor(1e3 / D) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (e.unstable_next = function (D) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var te = 3;
                break;
              default:
                te = x;
            }
            var fe = x;
            x = te;
            try {
              return D();
            } finally {
              x = fe;
            }
          }),
          (e.unstable_requestPaint = function () {
            k = !0;
          }),
          (e.unstable_runWithPriority = function (D, te) {
            switch (D) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                D = 3;
            }
            var fe = x;
            x = D;
            try {
              return te();
            } finally {
              x = fe;
            }
          }),
          (e.unstable_scheduleCallback = function (D, te, fe) {
            var me = e.unstable_now();
            switch (
              (typeof fe == "object" && fe !== null
                ? ((fe = fe.delay),
                  (fe = typeof fe == "number" && 0 < fe ? me + fe : me))
                : (fe = me),
              D)
            ) {
              case 1:
                var R = -1;
                break;
              case 2:
                R = 250;
                break;
              case 5:
                R = 1073741823;
                break;
              case 4:
                R = 1e4;
                break;
              default:
                R = 5e3;
            }
            return (
              (R = fe + R),
              (D = {
                id: y++,
                callback: te,
                priorityLevel: D,
                startTime: fe,
                expirationTime: R,
                sortIndex: -1,
              }),
              fe > me
                ? ((D.sortIndex = fe),
                  n(p, D),
                  i(h) === null &&
                    D === i(p) &&
                    (_ ? (j(K), (K = -1)) : (_ = !0), ee(Z, fe - me)))
                : ((D.sortIndex = R),
                  n(h, D),
                  S || v || ((S = !0), U || ((U = !0), ie()))),
              D
            );
          }),
          (e.unstable_shouldYield = F),
          (e.unstable_wrapCallback = function (D) {
            var te = x;
            return function () {
              var fe = x;
              x = te;
              try {
                return D.apply(this, arguments);
              } finally {
                x = fe;
              }
            };
          }));
      })(Ad)),
    Ad
  );
}
var R0;
function U2() {
  return (R0 || ((R0 = 1), (Rd.exports = B2())), Rd.exports);
}
var Od = { exports: {} },
  Jt = {};
var A0;
function H2() {
  if (A0) return Jt;
  A0 = 1;
  var e = Xu();
  function n(h) {
    var p = "https://react.dev/errors/" + h;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        p += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return (
      "Minified React error #" +
      h +
      "; visit " +
      p +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function i() {}
  var a = {
      d: {
        f: i,
        r: function () {
          throw Error(n(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    o = Symbol.for("react.portal");
  function u(h, p, y) {
    var g =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: g == null ? null : "" + g,
      children: h,
      containerInfo: p,
      implementation: y,
    };
  }
  var c = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function f(h, p) {
    if (h === "font") return "";
    if (typeof p == "string") return p === "use-credentials" ? p : "";
  }
  return (
    (Jt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a),
    (Jt.createPortal = function (h, p) {
      var y =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11))
        throw Error(n(299));
      return u(h, p, null, y);
    }),
    (Jt.flushSync = function (h) {
      var p = c.T,
        y = a.p;
      try {
        if (((c.T = null), (a.p = 2), h)) return h();
      } finally {
        ((c.T = p), (a.p = y), a.d.f());
      }
    }),
    (Jt.preconnect = function (h, p) {
      typeof h == "string" &&
        (p
          ? ((p = p.crossOrigin),
            (p =
              typeof p == "string"
                ? p === "use-credentials"
                  ? p
                  : ""
                : void 0))
          : (p = null),
        a.d.C(h, p));
    }),
    (Jt.prefetchDNS = function (h) {
      typeof h == "string" && a.d.D(h);
    }),
    (Jt.preinit = function (h, p) {
      if (typeof h == "string" && p && typeof p.as == "string") {
        var y = p.as,
          g = f(y, p.crossOrigin),
          x = typeof p.integrity == "string" ? p.integrity : void 0,
          v = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
        y === "style"
          ? a.d.S(h, typeof p.precedence == "string" ? p.precedence : void 0, {
              crossOrigin: g,
              integrity: x,
              fetchPriority: v,
            })
          : y === "script" &&
            a.d.X(h, {
              crossOrigin: g,
              integrity: x,
              fetchPriority: v,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
      }
    }),
    (Jt.preinitModule = function (h, p) {
      if (typeof h == "string")
        if (typeof p == "object" && p !== null) {
          if (p.as == null || p.as === "script") {
            var y = f(p.as, p.crossOrigin);
            a.d.M(h, {
              crossOrigin: y,
              integrity: typeof p.integrity == "string" ? p.integrity : void 0,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
          }
        } else p == null && a.d.M(h);
    }),
    (Jt.preload = function (h, p) {
      if (
        typeof h == "string" &&
        typeof p == "object" &&
        p !== null &&
        typeof p.as == "string"
      ) {
        var y = p.as,
          g = f(y, p.crossOrigin);
        a.d.L(h, y, {
          crossOrigin: g,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          type: typeof p.type == "string" ? p.type : void 0,
          fetchPriority:
            typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
          referrerPolicy:
            typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
          imageSrcSet:
            typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
          media: typeof p.media == "string" ? p.media : void 0,
        });
      }
    }),
    (Jt.preloadModule = function (h, p) {
      if (typeof h == "string")
        if (p) {
          var y = f(p.as, p.crossOrigin);
          a.d.m(h, {
            as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
            crossOrigin: y,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          });
        } else a.d.m(h);
    }),
    (Jt.requestFormReset = function (h) {
      a.d.r(h);
    }),
    (Jt.unstable_batchedUpdates = function (h, p) {
      return h(p);
    }),
    (Jt.useFormState = function (h, p, y) {
      return c.H.useFormState(h, p, y);
    }),
    (Jt.useFormStatus = function () {
      return c.H.useHostTransitionStatus();
    }),
    (Jt.version = "19.2.4"),
    Jt
  );
}
var O0;
function q2() {
  if (O0) return Od.exports;
  O0 = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  return (e(), (Od.exports = H2()), Od.exports);
}
var z0;
function F2() {
  if (z0) return no;
  z0 = 1;
  var e = U2(),
    n = Xu(),
    i = q2();
  function a(t) {
    var r = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      r += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        r += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      r +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function u(t) {
    var r = t,
      l = t;
    if (t.alternate) for (; r.return; ) r = r.return;
    else {
      t = r;
      do ((r = t), (r.flags & 4098) !== 0 && (l = r.return), (t = r.return));
      while (t);
    }
    return r.tag === 3 ? l : null;
  }
  function c(t) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (
        (r === null && ((t = t.alternate), t !== null && (r = t.memoizedState)),
        r !== null)
      )
        return r.dehydrated;
    }
    return null;
  }
  function f(t) {
    if (t.tag === 31) {
      var r = t.memoizedState;
      if (
        (r === null && ((t = t.alternate), t !== null && (r = t.memoizedState)),
        r !== null)
      )
        return r.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (u(t) !== t) throw Error(a(188));
  }
  function p(t) {
    var r = t.alternate;
    if (!r) {
      if (((r = u(t)), r === null)) throw Error(a(188));
      return r !== t ? null : t;
    }
    for (var l = t, s = r; ; ) {
      var d = l.return;
      if (d === null) break;
      var m = d.alternate;
      if (m === null) {
        if (((s = d.return), s !== null)) {
          l = s;
          continue;
        }
        break;
      }
      if (d.child === m.child) {
        for (m = d.child; m; ) {
          if (m === l) return (h(d), t);
          if (m === s) return (h(d), r);
          m = m.sibling;
        }
        throw Error(a(188));
      }
      if (l.return !== s.return) ((l = d), (s = m));
      else {
        for (var b = !1, E = d.child; E; ) {
          if (E === l) {
            ((b = !0), (l = d), (s = m));
            break;
          }
          if (E === s) {
            ((b = !0), (s = d), (l = m));
            break;
          }
          E = E.sibling;
        }
        if (!b) {
          for (E = m.child; E; ) {
            if (E === l) {
              ((b = !0), (l = m), (s = d));
              break;
            }
            if (E === s) {
              ((b = !0), (s = m), (l = d));
              break;
            }
            E = E.sibling;
          }
          if (!b) throw Error(a(189));
        }
      }
      if (l.alternate !== s) throw Error(a(190));
    }
    if (l.tag !== 3) throw Error(a(188));
    return l.stateNode.current === l ? t : r;
  }
  function y(t) {
    var r = t.tag;
    if (r === 5 || r === 26 || r === 27 || r === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((r = y(t)), r !== null)) return r;
      t = t.sibling;
    }
    return null;
  }
  var g = Object.assign,
    x = Symbol.for("react.element"),
    v = Symbol.for("react.transitional.element"),
    S = Symbol.for("react.portal"),
    _ = Symbol.for("react.fragment"),
    k = Symbol.for("react.strict_mode"),
    T = Symbol.for("react.profiler"),
    j = Symbol.for("react.consumer"),
    M = Symbol.for("react.context"),
    $ = Symbol.for("react.forward_ref"),
    Z = Symbol.for("react.suspense"),
    U = Symbol.for("react.suspense_list"),
    K = Symbol.for("react.memo"),
    N = Symbol.for("react.lazy"),
    he = Symbol.for("react.activity"),
    F = Symbol.for("react.memo_cache_sentinel"),
    oe = Symbol.iterator;
  function ie(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (oe && t[oe]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var Ee = Symbol.for("react.client.reference");
  function le(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Ee ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case _:
        return "Fragment";
      case T:
        return "Profiler";
      case k:
        return "StrictMode";
      case Z:
        return "Suspense";
      case U:
        return "SuspenseList";
      case he:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case S:
          return "Portal";
        case M:
          return t.displayName || "Context";
        case j:
          return (t._context.displayName || "Context") + ".Consumer";
        case $:
          var r = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = r.displayName || r.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case K:
          return (
            (r = t.displayName || null),
            r !== null ? r : le(t.type) || "Memo"
          );
        case N:
          ((r = t._payload), (t = t._init));
          try {
            return le(t(r));
          } catch {}
      }
    return null;
  }
  var ee = Array.isArray,
    D = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    te = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    fe = { pending: !1, data: null, method: null, action: null },
    me = [],
    R = -1;
  function O(t) {
    return { current: t };
  }
  function G(t) {
    0 > R || ((t.current = me[R]), (me[R] = null), R--);
  }
  function C(t, r) {
    (R++, (me[R] = t.current), (t.current = r));
  }
  var se = O(null),
    Se = O(null),
    be = O(null),
    Ne = O(null);
  function rt(t, r) {
    switch ((C(be, r), C(Se, t), C(se, null), r.nodeType)) {
      case 9:
      case 11:
        t = (t = r.documentElement) && (t = t.namespaceURI) ? Xy(t) : 0;
        break;
      default:
        if (((t = r.tagName), (r = r.namespaceURI)))
          ((r = Xy(r)), (t = Gy(r, t)));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (G(se), C(se, t));
  }
  function Ke() {
    (G(se), G(Se), G(be));
  }
  function on(t) {
    t.memoizedState !== null && C(Ne, t);
    var r = se.current,
      l = Gy(r, t.type);
    r !== l && (C(Se, t), C(se, l));
  }
  function Xn(t) {
    (Se.current === t && (G(se), G(Se)),
      Ne.current === t && (G(Ne), ($l._currentValue = fe)));
  }
  var Oi, Et;
  function Kt(t) {
    if (Oi === void 0)
      try {
        throw Error();
      } catch (l) {
        var r = l.stack.trim().match(/\n( *(at )?)/);
        ((Oi = (r && r[1]) || ""),
          (Et =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Oi +
      t +
      Et
    );
  }
  var Sr = !1;
  function Kr(t, r) {
    if (!t || Sr) return "";
    Sr = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function () {
          try {
            if (r) {
              var re = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(re.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(re, []);
                } catch (Q) {
                  var Y = Q;
                }
                Reflect.construct(t, [], re);
              } else {
                try {
                  re.call();
                } catch (Q) {
                  Y = Q;
                }
                t.call(re.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Q) {
                Y = Q;
              }
              (re = t()) &&
                typeof re.catch == "function" &&
                re.catch(function () {});
            }
          } catch (Q) {
            if (Q && Y && typeof Q.stack == "string") return [Q.stack, Y.stack];
          }
          return [null, null];
        },
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var d = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name",
      );
      d &&
        d.configurable &&
        Object.defineProperty(s.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var m = s.DetermineComponentFrameRoot(),
        b = m[0],
        E = m[1];
      if (b && E) {
        var A = b.split(`
`),
          V = E.split(`
`);
        for (
          d = s = 0;
          s < A.length && !A[s].includes("DetermineComponentFrameRoot");
        )
          s++;
        for (; d < V.length && !V[d].includes("DetermineComponentFrameRoot"); )
          d++;
        if (s === A.length || d === V.length)
          for (
            s = A.length - 1, d = V.length - 1;
            1 <= s && 0 <= d && A[s] !== V[d];
          )
            d--;
        for (; 1 <= s && 0 <= d; s--, d--)
          if (A[s] !== V[d]) {
            if (s !== 1 || d !== 1)
              do
                if ((s--, d--, 0 > d || A[s] !== V[d])) {
                  var W =
                    `
` + A[s].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      W.includes("<anonymous>") &&
                      (W = W.replace("<anonymous>", t.displayName)),
                    W
                  );
                }
              while (1 <= s && 0 <= d);
            break;
          }
      }
    } finally {
      ((Sr = !1), (Error.prepareStackTrace = l));
    }
    return (l = t ? t.displayName || t.name : "") ? Kt(l) : "";
  }
  function zn(t, r) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Kt(t.type);
      case 16:
        return Kt("Lazy");
      case 13:
        return t.child !== r && r !== null
          ? Kt("Suspense Fallback")
          : Kt("Suspense");
      case 19:
        return Kt("SuspenseList");
      case 0:
      case 15:
        return Kr(t.type, !1);
      case 11:
        return Kr(t.type.render, !1);
      case 1:
        return Kr(t.type, !0);
      case 31:
        return Kt("Activity");
      default:
        return "";
    }
  }
  function sa(t) {
    try {
      var r = "",
        l = null;
      do ((r += zn(t, l)), (l = t), (t = t.return));
      while (t);
      return r;
    } catch (s) {
      return (
        `
Error generating stack: ` +
        s.message +
        `
` +
        s.stack
      );
    }
  }
  var Zr = Object.prototype.hasOwnProperty,
    wr = e.unstable_scheduleCallback,
    zi = e.unstable_cancelCallback,
    fl = e.unstable_shouldYield,
    dl = e.unstable_requestPaint,
    Vt = e.unstable_now,
    Gn = e.unstable_getCurrentPriorityLevel,
    J = e.unstable_ImmediatePriority,
    de = e.unstable_UserBlockingPriority,
    Re = e.unstable_NormalPriority,
    De = e.unstable_LowPriority,
    Ue = e.unstable_IdlePriority,
    Zt = e.log,
    Qn = e.unstable_setDisableYieldValue,
    Bt = null,
    kt = null;
  function bt(t) {
    if (
      (typeof Zt == "function" && Qn(t),
      kt && typeof kt.setStrictMode == "function")
    )
      try {
        kt.setStrictMode(Bt, t);
      } catch {}
  }
  var nt = Math.clz32 ? Math.clz32 : gc,
    Kn = Math.log,
    sn = Math.LN2;
  function gc(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((Kn(t) / sn) | 0)) | 0);
  }
  var Di = 256,
    Er = 262144,
    Ni = 4194304;
  function Zn(t) {
    var r = t & 42;
    if (r !== 0) return r;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function ua(t, r, l) {
    var s = t.pendingLanes;
    if (s === 0) return 0;
    var d = 0,
      m = t.suspendedLanes,
      b = t.pingedLanes;
    t = t.warmLanes;
    var E = s & 134217727;
    return (
      E !== 0
        ? ((s = E & ~m),
          s !== 0
            ? (d = Zn(s))
            : ((b &= E),
              b !== 0
                ? (d = Zn(b))
                : l || ((l = E & ~t), l !== 0 && (d = Zn(l)))))
        : ((E = s & ~m),
          E !== 0
            ? (d = Zn(E))
            : b !== 0
              ? (d = Zn(b))
              : l || ((l = s & ~t), l !== 0 && (d = Zn(l)))),
      d === 0
        ? 0
        : r !== 0 &&
            r !== d &&
            (r & m) === 0 &&
            ((m = d & -d),
            (l = r & -r),
            m >= l || (m === 32 && (l & 4194048) !== 0))
          ? r
          : d
    );
  }
  function $r(t, r) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & r) === 0;
  }
  function yc(t, r) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return r + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function hl() {
    var t = Ni;
    return ((Ni <<= 1), (Ni & 62914560) === 0 && (Ni = 4194304), t);
  }
  function Jr(t) {
    for (var r = [], l = 0; 31 > l; l++) r.push(t);
    return r;
  }
  function ur(t, r) {
    ((t.pendingLanes |= r),
      r !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function Io(t, r, l, s, d, m) {
    var b = t.pendingLanes;
    ((t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0));
    var E = t.entanglements,
      A = t.expirationTimes,
      V = t.hiddenUpdates;
    for (l = b & ~l; 0 < l; ) {
      var W = 31 - nt(l),
        re = 1 << W;
      ((E[W] = 0), (A[W] = -1));
      var Y = V[W];
      if (Y !== null)
        for (V[W] = null, W = 0; W < Y.length; W++) {
          var Q = Y[W];
          Q !== null && (Q.lane &= -536870913);
        }
      l &= ~re;
    }
    (s !== 0 && Xo(t, s, 0),
      m !== 0 && d === 0 && t.tag !== 0 && (t.suspendedLanes |= m & ~(b & ~r)));
  }
  function Xo(t, r, l) {
    ((t.pendingLanes |= r), (t.suspendedLanes &= ~r));
    var s = 31 - nt(r);
    ((t.entangledLanes |= r),
      (t.entanglements[s] = t.entanglements[s] | 1073741824 | (l & 261930)));
  }
  function Go(t, r) {
    var l = (t.entangledLanes |= r);
    for (t = t.entanglements; l; ) {
      var s = 31 - nt(l),
        d = 1 << s;
      ((d & r) | (t[s] & r) && (t[s] |= r), (l &= ~d));
    }
  }
  function z(t, r) {
    var l = r & -r;
    return (
      (l = (l & 42) !== 0 ? 1 : H(l)),
      (l & (t.suspendedLanes | r)) !== 0 ? 0 : l
    );
  }
  function H(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function I(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function ae() {
    var t = te.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : g0(t.type));
  }
  function ce(t, r) {
    var l = te.p;
    try {
      return ((te.p = t), r());
    } finally {
      te.p = l;
    }
  }
  var xe = Math.random().toString(36).slice(2),
    pe = "__reactFiber$" + xe,
    ge = "__reactProps$" + xe,
    ye = "__reactContainer$" + xe,
    Ce = "__reactEvents$" + xe,
    Te = "__reactListeners$" + xe,
    ke = "__reactHandles$" + xe,
    Je = "__reactResources$" + xe,
    qe = "__reactMarker$" + xe;
  function ut(t) {
    (delete t[pe], delete t[ge], delete t[Ce], delete t[Te], delete t[ke]);
  }
  function pt(t) {
    var r = t[pe];
    if (r) return r;
    for (var l = t.parentNode; l; ) {
      if ((r = l[ye] || l[pe])) {
        if (
          ((l = r.alternate),
          r.child !== null || (l !== null && l.child !== null))
        )
          for (t = e0(t); t !== null; ) {
            if ((l = t[pe])) return l;
            t = e0(t);
          }
        return r;
      }
      ((t = l), (l = t.parentNode));
    }
    return null;
  }
  function vt(t) {
    if ((t = t[pe] || t[ye])) {
      var r = t.tag;
      if (
        r === 5 ||
        r === 6 ||
        r === 13 ||
        r === 31 ||
        r === 26 ||
        r === 27 ||
        r === 3
      )
        return t;
    }
    return null;
  }
  function Ze(t) {
    var r = t.tag;
    if (r === 5 || r === 26 || r === 27 || r === 6) return t.stateNode;
    throw Error(a(33));
  }
  function Ut(t) {
    var r = t[Je];
    return (
      r ||
        (r = t[Je] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      r
    );
  }
  function dt(t) {
    t[qe] = !0;
  }
  var Wr = new Set(),
    $n = {};
  function Ft(t, r) {
    (cr(t, r), cr(t + "Capture", r));
  }
  function cr(t, r) {
    for ($n[t] = r, t = 0; t < r.length; t++) Wr.add(r[t]);
  }
  var Mi = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    fr = {},
    ji = {};
  function ca(t) {
    return Zr.call(ji, t)
      ? !0
      : Zr.call(fr, t)
        ? !1
        : Mi.test(t)
          ? (ji[t] = !0)
          : ((fr[t] = !0), !1);
  }
  function Fe(t, r, l) {
    if (ca(r))
      if (l === null) t.removeAttribute(r);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(r);
            return;
          case "boolean":
            var s = r.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              t.removeAttribute(r);
              return;
            }
        }
        t.setAttribute(r, "" + l);
      }
  }
  function Ct(t, r, l) {
    if (l === null) t.removeAttribute(r);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(r);
          return;
      }
      t.setAttribute(r, "" + l);
    }
  }
  function $t(t, r, l, s) {
    if (s === null) t.removeAttribute(l);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(r, l, "" + s);
    }
  }
  function Ot(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function mt(t) {
    var r = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (r === "checkbox" || r === "radio")
    );
  }
  function fa(t, r, l) {
    var s = Object.getOwnPropertyDescriptor(t.constructor.prototype, r);
    if (
      !t.hasOwnProperty(r) &&
      typeof s < "u" &&
      typeof s.get == "function" &&
      typeof s.set == "function"
    ) {
      var d = s.get,
        m = s.set;
      return (
        Object.defineProperty(t, r, {
          configurable: !0,
          get: function () {
            return d.call(this);
          },
          set: function (b) {
            ((l = "" + b), m.call(this, b));
          },
        }),
        Object.defineProperty(t, r, { enumerable: s.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (b) {
            l = "" + b;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[r]);
          },
        }
      );
    }
  }
  function da(t) {
    if (!t._valueTracker) {
      var r = mt(t) ? "checked" : "value";
      t._valueTracker = fa(t, r, "" + t[r]);
    }
  }
  function Qo(t) {
    if (!t) return !1;
    var r = t._valueTracker;
    if (!r) return !0;
    var l = r.getValue(),
      s = "";
    return (
      t && (s = mt(t) ? (t.checked ? "true" : "false") : t.value),
      (t = s),
      t !== l ? (r.setValue(t), !0) : !1
    );
  }
  function Ko(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var CS = /[\n"\\]/g;
  function Dn(t) {
    return t.replace(CS, function (r) {
      return "\\" + r.charCodeAt(0).toString(16) + " ";
    });
  }
  function bc(t, r, l, s, d, m, b, E) {
    ((t.name = ""),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (t.type = b)
        : t.removeAttribute("type"),
      r != null
        ? b === "number"
          ? ((r === 0 && t.value === "") || t.value != r) &&
            (t.value = "" + Ot(r))
          : t.value !== "" + Ot(r) && (t.value = "" + Ot(r))
        : (b !== "submit" && b !== "reset") || t.removeAttribute("value"),
      r != null
        ? xc(t, b, Ot(r))
        : l != null
          ? xc(t, b, Ot(l))
          : s != null && t.removeAttribute("value"),
      d == null && m != null && (t.defaultChecked = !!m),
      d != null &&
        (t.checked = d && typeof d != "function" && typeof d != "symbol"),
      E != null &&
      typeof E != "function" &&
      typeof E != "symbol" &&
      typeof E != "boolean"
        ? (t.name = "" + Ot(E))
        : t.removeAttribute("name"));
  }
  function qp(t, r, l, s, d, m, b, E) {
    if (
      (m != null &&
        typeof m != "function" &&
        typeof m != "symbol" &&
        typeof m != "boolean" &&
        (t.type = m),
      r != null || l != null)
    ) {
      if (!((m !== "submit" && m !== "reset") || r != null)) {
        da(t);
        return;
      }
      ((l = l != null ? "" + Ot(l) : ""),
        (r = r != null ? "" + Ot(r) : l),
        E || r === t.value || (t.value = r),
        (t.defaultValue = r));
    }
    ((s = s ?? d),
      (s = typeof s != "function" && typeof s != "symbol" && !!s),
      (t.checked = E ? t.checked : !!s),
      (t.defaultChecked = !!s),
      b != null &&
        typeof b != "function" &&
        typeof b != "symbol" &&
        typeof b != "boolean" &&
        (t.name = b),
      da(t));
  }
  function xc(t, r, l) {
    (r === "number" && Ko(t.ownerDocument) === t) ||
      t.defaultValue === "" + l ||
      (t.defaultValue = "" + l);
  }
  function ha(t, r, l, s) {
    if (((t = t.options), r)) {
      r = {};
      for (var d = 0; d < l.length; d++) r["$" + l[d]] = !0;
      for (l = 0; l < t.length; l++)
        ((d = r.hasOwnProperty("$" + t[l].value)),
          t[l].selected !== d && (t[l].selected = d),
          d && s && (t[l].defaultSelected = !0));
    } else {
      for (l = "" + Ot(l), r = null, d = 0; d < t.length; d++) {
        if (t[d].value === l) {
          ((t[d].selected = !0), s && (t[d].defaultSelected = !0));
          return;
        }
        r !== null || t[d].disabled || (r = t[d]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Fp(t, r, l) {
    if (
      r != null &&
      ((r = "" + Ot(r)), r !== t.value && (t.value = r), l == null)
    ) {
      t.defaultValue !== r && (t.defaultValue = r);
      return;
    }
    t.defaultValue = l != null ? "" + Ot(l) : "";
  }
  function Pp(t, r, l, s) {
    if (r == null) {
      if (s != null) {
        if (l != null) throw Error(a(92));
        if (ee(s)) {
          if (1 < s.length) throw Error(a(93));
          s = s[0];
        }
        l = s;
      }
      (l == null && (l = ""), (r = l));
    }
    ((l = Ot(r)),
      (t.defaultValue = l),
      (s = t.textContent),
      s === l && s !== "" && s !== null && (t.value = s),
      da(t));
  }
  function pa(t, r) {
    if (r) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    t.textContent = r;
  }
  var _S = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Vp(t, r, l) {
    var s = r.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? s
        ? t.setProperty(r, "")
        : r === "float"
          ? (t.cssFloat = "")
          : (t[r] = "")
      : s
        ? t.setProperty(r, l)
        : typeof l != "number" || l === 0 || _S.has(r)
          ? r === "float"
            ? (t.cssFloat = l)
            : (t[r] = ("" + l).trim())
          : (t[r] = l + "px");
  }
  function Yp(t, r, l) {
    if (r != null && typeof r != "object") throw Error(a(62));
    if (((t = t.style), l != null)) {
      for (var s in l)
        !l.hasOwnProperty(s) ||
          (r != null && r.hasOwnProperty(s)) ||
          (s.indexOf("--") === 0
            ? t.setProperty(s, "")
            : s === "float"
              ? (t.cssFloat = "")
              : (t[s] = ""));
      for (var d in r)
        ((s = r[d]), r.hasOwnProperty(d) && l[d] !== s && Vp(t, d, s));
    } else for (var m in r) r.hasOwnProperty(m) && Vp(t, m, r[m]);
  }
  function vc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var TS = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    RS =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Zo(t) {
    return RS.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function kr() {}
  var Sc = null;
  function wc(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var ma = null,
    ga = null;
  function Ip(t) {
    var r = vt(t);
    if (r && (t = r.stateNode)) {
      var l = t[ge] || null;
      e: switch (((t = r.stateNode), r.type)) {
        case "input":
          if (
            (bc(
              t,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
            ),
            (r = l.name),
            l.type === "radio" && r != null)
          ) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + Dn("" + r) + '"][type="radio"]',
              ),
                r = 0;
              r < l.length;
              r++
            ) {
              var s = l[r];
              if (s !== t && s.form === t.form) {
                var d = s[ge] || null;
                if (!d) throw Error(a(90));
                bc(
                  s,
                  d.value,
                  d.defaultValue,
                  d.defaultValue,
                  d.checked,
                  d.defaultChecked,
                  d.type,
                  d.name,
                );
              }
            }
            for (r = 0; r < l.length; r++)
              ((s = l[r]), s.form === t.form && Qo(s));
          }
          break e;
        case "textarea":
          Fp(t, l.value, l.defaultValue);
          break e;
        case "select":
          ((r = l.value), r != null && ha(t, !!l.multiple, r, !1));
      }
    }
  }
  var Ec = !1;
  function Xp(t, r, l) {
    if (Ec) return t(r, l);
    Ec = !0;
    try {
      var s = t(r);
      return s;
    } finally {
      if (
        ((Ec = !1),
        (ma !== null || ga !== null) &&
          (Bs(), ma && ((r = ma), (t = ga), (ga = ma = null), Ip(r), t)))
      )
        for (r = 0; r < t.length; r++) Ip(t[r]);
    }
  }
  function pl(t, r) {
    var l = t.stateNode;
    if (l === null) return null;
    var s = l[ge] || null;
    if (s === null) return null;
    l = s[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((s = !s.disabled) ||
          ((t = t.type),
          (s = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !s));
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function") throw Error(a(231, r, typeof l));
    return l;
  }
  var Cr = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    kc = !1;
  if (Cr)
    try {
      var ml = {};
      (Object.defineProperty(ml, "passive", {
        get: function () {
          kc = !0;
        },
      }),
        window.addEventListener("test", ml, ml),
        window.removeEventListener("test", ml, ml));
    } catch {
      kc = !1;
    }
  var ei = null,
    Cc = null,
    $o = null;
  function Gp() {
    if ($o) return $o;
    var t,
      r = Cc,
      l = r.length,
      s,
      d = "value" in ei ? ei.value : ei.textContent,
      m = d.length;
    for (t = 0; t < l && r[t] === d[t]; t++);
    var b = l - t;
    for (s = 1; s <= b && r[l - s] === d[m - s]; s++);
    return ($o = d.slice(t, 1 < s ? 1 - s : void 0));
  }
  function Jo(t) {
    var r = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && r === 13 && (t = 13))
        : (t = r),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Wo() {
    return !0;
  }
  function Qp() {
    return !1;
  }
  function un(t) {
    function r(l, s, d, m, b) {
      ((this._reactName = l),
        (this._targetInst = d),
        (this.type = s),
        (this.nativeEvent = m),
        (this.target = b),
        (this.currentTarget = null));
      for (var E in t)
        t.hasOwnProperty(E) && ((l = t[E]), (this[E] = l ? l(m) : m[E]));
      return (
        (this.isDefaultPrevented = (
          m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1
        )
          ? Wo
          : Qp),
        (this.isPropagationStopped = Qp),
        this
      );
    }
    return (
      g(r.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = Wo));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = Wo));
        },
        persist: function () {},
        isPersistent: Wo,
      }),
      r
    );
  }
  var Li = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    es = un(Li),
    gl = g({}, Li, { view: 0, detail: 0 }),
    AS = un(gl),
    _c,
    Tc,
    yl,
    ts = g({}, gl, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ac,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== yl &&
              (yl && t.type === "mousemove"
                ? ((_c = t.screenX - yl.screenX), (Tc = t.screenY - yl.screenY))
                : (Tc = _c = 0),
              (yl = t)),
            _c);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Tc;
      },
    }),
    Kp = un(ts),
    OS = g({}, ts, { dataTransfer: 0 }),
    zS = un(OS),
    DS = g({}, gl, { relatedTarget: 0 }),
    Rc = un(DS),
    NS = g({}, Li, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    MS = un(NS),
    jS = g({}, Li, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    LS = un(jS),
    BS = g({}, Li, { data: 0 }),
    Zp = un(BS),
    US = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    HS = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    qS = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function FS(t) {
    var r = this.nativeEvent;
    return r.getModifierState
      ? r.getModifierState(t)
      : (t = qS[t])
        ? !!r[t]
        : !1;
  }
  function Ac() {
    return FS;
  }
  var PS = g({}, gl, {
      key: function (t) {
        if (t.key) {
          var r = US[t.key] || t.key;
          if (r !== "Unidentified") return r;
        }
        return t.type === "keypress"
          ? ((t = Jo(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? HS[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ac,
      charCode: function (t) {
        return t.type === "keypress" ? Jo(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Jo(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    VS = un(PS),
    YS = g({}, ts, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    $p = un(YS),
    IS = g({}, gl, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ac,
    }),
    XS = un(IS),
    GS = g({}, Li, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    QS = un(GS),
    KS = g({}, ts, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    ZS = un(KS),
    $S = g({}, Li, { newState: 0, oldState: 0 }),
    JS = un($S),
    WS = [9, 13, 27, 32],
    Oc = Cr && "CompositionEvent" in window,
    bl = null;
  Cr && "documentMode" in document && (bl = document.documentMode);
  var ew = Cr && "TextEvent" in window && !bl,
    Jp = Cr && (!Oc || (bl && 8 < bl && 11 >= bl)),
    Wp = " ",
    em = !1;
  function tm(t, r) {
    switch (t) {
      case "keyup":
        return WS.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function nm(t) {
    return (
      (t = t.detail),
      typeof t == "object" && "data" in t ? t.data : null
    );
  }
  var ya = !1;
  function tw(t, r) {
    switch (t) {
      case "compositionend":
        return nm(r);
      case "keypress":
        return r.which !== 32 ? null : ((em = !0), Wp);
      case "textInput":
        return ((t = r.data), t === Wp && em ? null : t);
      default:
        return null;
    }
  }
  function nw(t, r) {
    if (ya)
      return t === "compositionend" || (!Oc && tm(t, r))
        ? ((t = Gp()), ($o = Cc = ei = null), (ya = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || (r.ctrlKey && r.altKey)) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return Jp && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var rw = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function rm(t) {
    var r = t && t.nodeName && t.nodeName.toLowerCase();
    return r === "input" ? !!rw[t.type] : r === "textarea";
  }
  function im(t, r, l, s) {
    (ma ? (ga ? ga.push(s) : (ga = [s])) : (ma = s),
      (r = Ys(r, "onChange")),
      0 < r.length &&
        ((l = new es("onChange", "change", null, l, s)),
        t.push({ event: l, listeners: r })));
  }
  var xl = null,
    vl = null;
  function iw(t) {
    qy(t, 0);
  }
  function ns(t) {
    var r = Ze(t);
    if (Qo(r)) return t;
  }
  function am(t, r) {
    if (t === "change") return r;
  }
  var lm = !1;
  if (Cr) {
    var zc;
    if (Cr) {
      var Dc = "oninput" in document;
      if (!Dc) {
        var om = document.createElement("div");
        (om.setAttribute("oninput", "return;"),
          (Dc = typeof om.oninput == "function"));
      }
      zc = Dc;
    } else zc = !1;
    lm = zc && (!document.documentMode || 9 < document.documentMode);
  }
  function sm() {
    xl && (xl.detachEvent("onpropertychange", um), (vl = xl = null));
  }
  function um(t) {
    if (t.propertyName === "value" && ns(vl)) {
      var r = [];
      (im(r, vl, t, wc(t)), Xp(iw, r));
    }
  }
  function aw(t, r, l) {
    t === "focusin"
      ? (sm(), (xl = r), (vl = l), xl.attachEvent("onpropertychange", um))
      : t === "focusout" && sm();
  }
  function lw(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return ns(vl);
  }
  function ow(t, r) {
    if (t === "click") return ns(r);
  }
  function sw(t, r) {
    if (t === "input" || t === "change") return ns(r);
  }
  function uw(t, r) {
    return (t === r && (t !== 0 || 1 / t === 1 / r)) || (t !== t && r !== r);
  }
  var xn = typeof Object.is == "function" ? Object.is : uw;
  function Sl(t, r) {
    if (xn(t, r)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof r != "object" ||
      r === null
    )
      return !1;
    var l = Object.keys(t),
      s = Object.keys(r);
    if (l.length !== s.length) return !1;
    for (s = 0; s < l.length; s++) {
      var d = l[s];
      if (!Zr.call(r, d) || !xn(t[d], r[d])) return !1;
    }
    return !0;
  }
  function cm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function fm(t, r) {
    var l = cm(t);
    t = 0;
    for (var s; l; ) {
      if (l.nodeType === 3) {
        if (((s = t + l.textContent.length), t <= r && s >= r))
          return { node: l, offset: r - t };
        t = s;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = cm(l);
    }
  }
  function dm(t, r) {
    return t && r
      ? t === r
        ? !0
        : t && t.nodeType === 3
          ? !1
          : r && r.nodeType === 3
            ? dm(t, r.parentNode)
            : "contains" in t
              ? t.contains(r)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(r) & 16)
                : !1
      : !1;
  }
  function hm(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var r = Ko(t.document); r instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = r.contentWindow;
      else break;
      r = Ko(t.document);
    }
    return r;
  }
  function Nc(t) {
    var r = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      r &&
      ((r === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        r === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var cw = Cr && "documentMode" in document && 11 >= document.documentMode,
    ba = null,
    Mc = null,
    wl = null,
    jc = !1;
  function pm(t, r, l) {
    var s =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    jc ||
      ba == null ||
      ba !== Ko(s) ||
      ((s = ba),
      "selectionStart" in s && Nc(s)
        ? (s = { start: s.selectionStart, end: s.selectionEnd })
        : ((s = (
            (s.ownerDocument && s.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (s = {
            anchorNode: s.anchorNode,
            anchorOffset: s.anchorOffset,
            focusNode: s.focusNode,
            focusOffset: s.focusOffset,
          })),
      (wl && Sl(wl, s)) ||
        ((wl = s),
        (s = Ys(Mc, "onSelect")),
        0 < s.length &&
          ((r = new es("onSelect", "select", null, r, l)),
          t.push({ event: r, listeners: s }),
          (r.target = ba))));
  }
  function Bi(t, r) {
    var l = {};
    return (
      (l[t.toLowerCase()] = r.toLowerCase()),
      (l["Webkit" + t] = "webkit" + r),
      (l["Moz" + t] = "moz" + r),
      l
    );
  }
  var xa = {
      animationend: Bi("Animation", "AnimationEnd"),
      animationiteration: Bi("Animation", "AnimationIteration"),
      animationstart: Bi("Animation", "AnimationStart"),
      transitionrun: Bi("Transition", "TransitionRun"),
      transitionstart: Bi("Transition", "TransitionStart"),
      transitioncancel: Bi("Transition", "TransitionCancel"),
      transitionend: Bi("Transition", "TransitionEnd"),
    },
    Lc = {},
    mm = {};
  Cr &&
    ((mm = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete xa.animationend.animation,
      delete xa.animationiteration.animation,
      delete xa.animationstart.animation),
    "TransitionEvent" in window || delete xa.transitionend.transition);
  function Ui(t) {
    if (Lc[t]) return Lc[t];
    if (!xa[t]) return t;
    var r = xa[t],
      l;
    for (l in r) if (r.hasOwnProperty(l) && l in mm) return (Lc[t] = r[l]);
    return t;
  }
  var gm = Ui("animationend"),
    ym = Ui("animationiteration"),
    bm = Ui("animationstart"),
    fw = Ui("transitionrun"),
    dw = Ui("transitionstart"),
    hw = Ui("transitioncancel"),
    xm = Ui("transitionend"),
    vm = new Map(),
    Bc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Bc.push("scrollEnd");
  function Jn(t, r) {
    (vm.set(t, r), Ft(r, [t]));
  }
  var rs =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var r = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(r)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    Nn = [],
    va = 0,
    Uc = 0;
  function is() {
    for (var t = va, r = (Uc = va = 0); r < t; ) {
      var l = Nn[r];
      Nn[r++] = null;
      var s = Nn[r];
      Nn[r++] = null;
      var d = Nn[r];
      Nn[r++] = null;
      var m = Nn[r];
      if (((Nn[r++] = null), s !== null && d !== null)) {
        var b = s.pending;
        (b === null ? (d.next = d) : ((d.next = b.next), (b.next = d)),
          (s.pending = d));
      }
      m !== 0 && Sm(l, d, m);
    }
  }
  function as(t, r, l, s) {
    ((Nn[va++] = t),
      (Nn[va++] = r),
      (Nn[va++] = l),
      (Nn[va++] = s),
      (Uc |= s),
      (t.lanes |= s),
      (t = t.alternate),
      t !== null && (t.lanes |= s));
  }
  function Hc(t, r, l, s) {
    return (as(t, r, l, s), ls(t));
  }
  function Hi(t, r) {
    return (as(t, null, null, r), ls(t));
  }
  function Sm(t, r, l) {
    t.lanes |= l;
    var s = t.alternate;
    s !== null && (s.lanes |= l);
    for (var d = !1, m = t.return; m !== null; )
      ((m.childLanes |= l),
        (s = m.alternate),
        s !== null && (s.childLanes |= l),
        m.tag === 22 &&
          ((t = m.stateNode), t === null || t._visibility & 1 || (d = !0)),
        (t = m),
        (m = m.return));
    return t.tag === 3
      ? ((m = t.stateNode),
        d &&
          r !== null &&
          ((d = 31 - nt(l)),
          (t = m.hiddenUpdates),
          (s = t[d]),
          s === null ? (t[d] = [r]) : s.push(r),
          (r.lane = l | 536870912)),
        m)
      : null;
  }
  function ls(t) {
    if (50 < Yl) throw ((Yl = 0), (Kf = null), Error(a(185)));
    for (var r = t.return; r !== null; ) ((t = r), (r = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Sa = {};
  function pw(t, r, l, s) {
    ((this.tag = t),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = r),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = s),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function vn(t, r, l, s) {
    return new pw(t, r, l, s);
  }
  function qc(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function _r(t, r) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = vn(t.tag, r, t.key, t.mode)),
          (l.elementType = t.elementType),
          (l.type = t.type),
          (l.stateNode = t.stateNode),
          (l.alternate = t),
          (t.alternate = l))
        : ((l.pendingProps = r),
          (l.type = t.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = t.flags & 65011712),
      (l.childLanes = t.childLanes),
      (l.lanes = t.lanes),
      (l.child = t.child),
      (l.memoizedProps = t.memoizedProps),
      (l.memoizedState = t.memoizedState),
      (l.updateQueue = t.updateQueue),
      (r = t.dependencies),
      (l.dependencies =
        r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }),
      (l.sibling = t.sibling),
      (l.index = t.index),
      (l.ref = t.ref),
      (l.refCleanup = t.refCleanup),
      l
    );
  }
  function wm(t, r) {
    t.flags &= 65011714;
    var l = t.alternate;
    return (
      l === null
        ? ((t.childLanes = 0),
          (t.lanes = r),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = l.childLanes),
          (t.lanes = l.lanes),
          (t.child = l.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = l.memoizedProps),
          (t.memoizedState = l.memoizedState),
          (t.updateQueue = l.updateQueue),
          (t.type = l.type),
          (r = l.dependencies),
          (t.dependencies =
            r === null
              ? null
              : { lanes: r.lanes, firstContext: r.firstContext })),
      t
    );
  }
  function os(t, r, l, s, d, m) {
    var b = 0;
    if (((s = t), typeof t == "function")) qc(t) && (b = 1);
    else if (typeof t == "string")
      b = x2(t, l, se.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
          ? 27
          : 5;
    else
      e: switch (t) {
        case he:
          return (
            (t = vn(31, l, r, d)),
            (t.elementType = he),
            (t.lanes = m),
            t
          );
        case _:
          return qi(l.children, d, m, r);
        case k:
          ((b = 8), (d |= 24));
          break;
        case T:
          return (
            (t = vn(12, l, r, d | 2)),
            (t.elementType = T),
            (t.lanes = m),
            t
          );
        case Z:
          return ((t = vn(13, l, r, d)), (t.elementType = Z), (t.lanes = m), t);
        case U:
          return ((t = vn(19, l, r, d)), (t.elementType = U), (t.lanes = m), t);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case M:
                b = 10;
                break e;
              case j:
                b = 9;
                break e;
              case $:
                b = 11;
                break e;
              case K:
                b = 14;
                break e;
              case N:
                ((b = 16), (s = null));
                break e;
            }
          ((b = 29),
            (l = Error(a(130, t === null ? "null" : typeof t, ""))),
            (s = null));
      }
    return (
      (r = vn(b, l, r, d)),
      (r.elementType = t),
      (r.type = s),
      (r.lanes = m),
      r
    );
  }
  function qi(t, r, l, s) {
    return ((t = vn(7, t, s, r)), (t.lanes = l), t);
  }
  function Fc(t, r, l) {
    return ((t = vn(6, t, null, r)), (t.lanes = l), t);
  }
  function Em(t) {
    var r = vn(18, null, null, 0);
    return ((r.stateNode = t), r);
  }
  function Pc(t, r, l) {
    return (
      (r = vn(4, t.children !== null ? t.children : [], t.key, r)),
      (r.lanes = l),
      (r.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      r
    );
  }
  var km = new WeakMap();
  function Mn(t, r) {
    if (typeof t == "object" && t !== null) {
      var l = km.get(t);
      return l !== void 0
        ? l
        : ((r = { value: t, source: r, stack: sa(r) }), km.set(t, r), r);
    }
    return { value: t, source: r, stack: sa(r) };
  }
  var wa = [],
    Ea = 0,
    ss = null,
    El = 0,
    jn = [],
    Ln = 0,
    ti = null,
    dr = 1,
    hr = "";
  function Tr(t, r) {
    ((wa[Ea++] = El), (wa[Ea++] = ss), (ss = t), (El = r));
  }
  function Cm(t, r, l) {
    ((jn[Ln++] = dr), (jn[Ln++] = hr), (jn[Ln++] = ti), (ti = t));
    var s = dr;
    t = hr;
    var d = 32 - nt(s) - 1;
    ((s &= ~(1 << d)), (l += 1));
    var m = 32 - nt(r) + d;
    if (30 < m) {
      var b = d - (d % 5);
      ((m = (s & ((1 << b) - 1)).toString(32)),
        (s >>= b),
        (d -= b),
        (dr = (1 << (32 - nt(r) + d)) | (l << d) | s),
        (hr = m + t));
    } else ((dr = (1 << m) | (l << d) | s), (hr = t));
  }
  function Vc(t) {
    t.return !== null && (Tr(t, 1), Cm(t, 1, 0));
  }
  function Yc(t) {
    for (; t === ss; )
      ((ss = wa[--Ea]), (wa[Ea] = null), (El = wa[--Ea]), (wa[Ea] = null));
    for (; t === ti; )
      ((ti = jn[--Ln]),
        (jn[Ln] = null),
        (hr = jn[--Ln]),
        (jn[Ln] = null),
        (dr = jn[--Ln]),
        (jn[Ln] = null));
  }
  function _m(t, r) {
    ((jn[Ln++] = dr),
      (jn[Ln++] = hr),
      (jn[Ln++] = ti),
      (dr = r.id),
      (hr = r.overflow),
      (ti = t));
  }
  var Yt = null,
    gt = null,
    Ge = !1,
    ni = null,
    Bn = !1,
    Ic = Error(a(519));
  function ri(t) {
    var r = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (kl(Mn(r, t)), Ic);
  }
  function Tm(t) {
    var r = t.stateNode,
      l = t.type,
      s = t.memoizedProps;
    switch (((r[pe] = t), (r[ge] = s), l)) {
      case "dialog":
        (Ve("cancel", r), Ve("close", r));
        break;
      case "iframe":
      case "object":
      case "embed":
        Ve("load", r);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Xl.length; l++) Ve(Xl[l], r);
        break;
      case "source":
        Ve("error", r);
        break;
      case "img":
      case "image":
      case "link":
        (Ve("error", r), Ve("load", r));
        break;
      case "details":
        Ve("toggle", r);
        break;
      case "input":
        (Ve("invalid", r),
          qp(
            r,
            s.value,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name,
            !0,
          ));
        break;
      case "select":
        Ve("invalid", r);
        break;
      case "textarea":
        (Ve("invalid", r), Pp(r, s.value, s.defaultValue, s.children));
    }
    ((l = s.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      r.textContent === "" + l ||
      s.suppressHydrationWarning === !0 ||
      Yy(r.textContent, l)
        ? (s.popover != null && (Ve("beforetoggle", r), Ve("toggle", r)),
          s.onScroll != null && Ve("scroll", r),
          s.onScrollEnd != null && Ve("scrollend", r),
          s.onClick != null && (r.onclick = kr),
          (r = !0))
        : (r = !1),
      r || ri(t, !0));
  }
  function Rm(t) {
    for (Yt = t.return; Yt; )
      switch (Yt.tag) {
        case 5:
        case 31:
        case 13:
          Bn = !1;
          return;
        case 27:
        case 3:
          Bn = !0;
          return;
        default:
          Yt = Yt.return;
      }
  }
  function ka(t) {
    if (t !== Yt) return !1;
    if (!Ge) return (Rm(t), (Ge = !0), !1);
    var r = t.tag,
      l;
    if (
      ((l = r !== 3 && r !== 27) &&
        ((l = r === 5) &&
          ((l = t.type),
          (l =
            !(l !== "form" && l !== "button") || cd(t.type, t.memoizedProps))),
        (l = !l)),
      l && gt && ri(t),
      Rm(t),
      r === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(a(317));
      gt = Wy(t);
    } else if (r === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(a(317));
      gt = Wy(t);
    } else
      r === 27
        ? ((r = gt), yi(t.type) ? ((t = md), (md = null), (gt = t)) : (gt = r))
        : (gt = Yt ? Hn(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Fi() {
    ((gt = Yt = null), (Ge = !1));
  }
  function Xc() {
    var t = ni;
    return (
      t !== null &&
        (hn === null ? (hn = t) : hn.push.apply(hn, t), (ni = null)),
      t
    );
  }
  function kl(t) {
    ni === null ? (ni = [t]) : ni.push(t);
  }
  var Gc = O(null),
    Pi = null,
    Rr = null;
  function ii(t, r, l) {
    (C(Gc, r._currentValue), (r._currentValue = l));
  }
  function Ar(t) {
    ((t._currentValue = Gc.current), G(Gc));
  }
  function Qc(t, r, l) {
    for (; t !== null; ) {
      var s = t.alternate;
      if (
        ((t.childLanes & r) !== r
          ? ((t.childLanes |= r), s !== null && (s.childLanes |= r))
          : s !== null && (s.childLanes & r) !== r && (s.childLanes |= r),
        t === l)
      )
        break;
      t = t.return;
    }
  }
  function Kc(t, r, l, s) {
    var d = t.child;
    for (d !== null && (d.return = t); d !== null; ) {
      var m = d.dependencies;
      if (m !== null) {
        var b = d.child;
        m = m.firstContext;
        e: for (; m !== null; ) {
          var E = m;
          m = d;
          for (var A = 0; A < r.length; A++)
            if (E.context === r[A]) {
              ((m.lanes |= l),
                (E = m.alternate),
                E !== null && (E.lanes |= l),
                Qc(m.return, l, t),
                s || (b = null));
              break e;
            }
          m = E.next;
        }
      } else if (d.tag === 18) {
        if (((b = d.return), b === null)) throw Error(a(341));
        ((b.lanes |= l),
          (m = b.alternate),
          m !== null && (m.lanes |= l),
          Qc(b, l, t),
          (b = null));
      } else b = d.child;
      if (b !== null) b.return = d;
      else
        for (b = d; b !== null; ) {
          if (b === t) {
            b = null;
            break;
          }
          if (((d = b.sibling), d !== null)) {
            ((d.return = b.return), (b = d));
            break;
          }
          b = b.return;
        }
      d = b;
    }
  }
  function Ca(t, r, l, s) {
    t = null;
    for (var d = r, m = !1; d !== null; ) {
      if (!m) {
        if ((d.flags & 524288) !== 0) m = !0;
        else if ((d.flags & 262144) !== 0) break;
      }
      if (d.tag === 10) {
        var b = d.alternate;
        if (b === null) throw Error(a(387));
        if (((b = b.memoizedProps), b !== null)) {
          var E = d.type;
          xn(d.pendingProps.value, b.value) ||
            (t !== null ? t.push(E) : (t = [E]));
        }
      } else if (d === Ne.current) {
        if (((b = d.alternate), b === null)) throw Error(a(387));
        b.memoizedState.memoizedState !== d.memoizedState.memoizedState &&
          (t !== null ? t.push($l) : (t = [$l]));
      }
      d = d.return;
    }
    (t !== null && Kc(r, t, l, s), (r.flags |= 262144));
  }
  function us(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!xn(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Vi(t) {
    ((Pi = t),
      (Rr = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null));
  }
  function It(t) {
    return Am(Pi, t);
  }
  function cs(t, r) {
    return (Pi === null && Vi(t), Am(t, r));
  }
  function Am(t, r) {
    var l = r._currentValue;
    if (((r = { context: r, memoizedValue: l, next: null }), Rr === null)) {
      if (t === null) throw Error(a(308));
      ((Rr = r),
        (t.dependencies = { lanes: 0, firstContext: r }),
        (t.flags |= 524288));
    } else Rr = Rr.next = r;
    return l;
  }
  var mw =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              r = (this.signal = {
                aborted: !1,
                addEventListener: function (l, s) {
                  t.push(s);
                },
              });
            this.abort = function () {
              ((r.aborted = !0),
                t.forEach(function (l) {
                  return l();
                }));
            };
          },
    gw = e.unstable_scheduleCallback,
    yw = e.unstable_NormalPriority,
    zt = {
      $$typeof: M,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Zc() {
    return { controller: new mw(), data: new Map(), refCount: 0 };
  }
  function Cl(t) {
    (t.refCount--,
      t.refCount === 0 &&
        gw(yw, function () {
          t.controller.abort();
        }));
  }
  var _l = null,
    $c = 0,
    _a = 0,
    Ta = null;
  function bw(t, r) {
    if (_l === null) {
      var l = (_l = []);
      (($c = 0),
        (_a = td()),
        (Ta = {
          status: "pending",
          value: void 0,
          then: function (s) {
            l.push(s);
          },
        }));
    }
    return ($c++, r.then(Om, Om), r);
  }
  function Om() {
    if (--$c === 0 && _l !== null) {
      Ta !== null && (Ta.status = "fulfilled");
      var t = _l;
      ((_l = null), (_a = 0), (Ta = null));
      for (var r = 0; r < t.length; r++) (0, t[r])();
    }
  }
  function xw(t, r) {
    var l = [],
      s = {
        status: "pending",
        value: null,
        reason: null,
        then: function (d) {
          l.push(d);
        },
      };
    return (
      t.then(
        function () {
          ((s.status = "fulfilled"), (s.value = r));
          for (var d = 0; d < l.length; d++) (0, l[d])(r);
        },
        function (d) {
          for (s.status = "rejected", s.reason = d, d = 0; d < l.length; d++)
            (0, l[d])(void 0);
        },
      ),
      s
    );
  }
  var zm = D.S;
  D.S = function (t, r) {
    ((py = Vt()),
      typeof r == "object" &&
        r !== null &&
        typeof r.then == "function" &&
        bw(t, r),
      zm !== null && zm(t, r));
  };
  var Yi = O(null);
  function Jc() {
    var t = Yi.current;
    return t !== null ? t : ct.pooledCache;
  }
  function fs(t, r) {
    r === null ? C(Yi, Yi.current) : C(Yi, r.pool);
  }
  function Dm() {
    var t = Jc();
    return t === null ? null : { parent: zt._currentValue, pool: t };
  }
  var Ra = Error(a(460)),
    Wc = Error(a(474)),
    ds = Error(a(542)),
    hs = { then: function () {} };
  function Nm(t) {
    return ((t = t.status), t === "fulfilled" || t === "rejected");
  }
  function Mm(t, r, l) {
    switch (
      ((l = t[l]),
      l === void 0 ? t.push(r) : l !== r && (r.then(kr, kr), (r = l)),
      r.status)
    ) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw ((t = r.reason), Lm(t), t);
      default:
        if (typeof r.status == "string") r.then(kr, kr);
        else {
          if (((t = ct), t !== null && 100 < t.shellSuspendCounter))
            throw Error(a(482));
          ((t = r),
            (t.status = "pending"),
            t.then(
              function (s) {
                if (r.status === "pending") {
                  var d = r;
                  ((d.status = "fulfilled"), (d.value = s));
                }
              },
              function (s) {
                if (r.status === "pending") {
                  var d = r;
                  ((d.status = "rejected"), (d.reason = s));
                }
              },
            ));
        }
        switch (r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw ((t = r.reason), Lm(t), t);
        }
        throw ((Xi = r), Ra);
    }
  }
  function Ii(t) {
    try {
      var r = t._init;
      return r(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function"
        ? ((Xi = l), Ra)
        : l;
    }
  }
  var Xi = null;
  function jm() {
    if (Xi === null) throw Error(a(459));
    var t = Xi;
    return ((Xi = null), t);
  }
  function Lm(t) {
    if (t === Ra || t === ds) throw Error(a(483));
  }
  var Aa = null,
    Tl = 0;
  function ps(t) {
    var r = Tl;
    return ((Tl += 1), Aa === null && (Aa = []), Mm(Aa, t, r));
  }
  function Rl(t, r) {
    ((r = r.props.ref), (t.ref = r !== void 0 ? r : null));
  }
  function ms(t, r) {
    throw r.$$typeof === x
      ? Error(a(525))
      : ((t = Object.prototype.toString.call(r)),
        Error(
          a(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(r).join(", ") + "}"
              : t,
          ),
        ));
  }
  function Bm(t) {
    function r(q, L) {
      if (t) {
        var P = q.deletions;
        P === null ? ((q.deletions = [L]), (q.flags |= 16)) : P.push(L);
      }
    }
    function l(q, L) {
      if (!t) return null;
      for (; L !== null; ) (r(q, L), (L = L.sibling));
      return null;
    }
    function s(q) {
      for (var L = new Map(); q !== null; )
        (q.key !== null ? L.set(q.key, q) : L.set(q.index, q), (q = q.sibling));
      return L;
    }
    function d(q, L) {
      return ((q = _r(q, L)), (q.index = 0), (q.sibling = null), q);
    }
    function m(q, L, P) {
      return (
        (q.index = P),
        t
          ? ((P = q.alternate),
            P !== null
              ? ((P = P.index), P < L ? ((q.flags |= 67108866), L) : P)
              : ((q.flags |= 67108866), L))
          : ((q.flags |= 1048576), L)
      );
    }
    function b(q) {
      return (t && q.alternate === null && (q.flags |= 67108866), q);
    }
    function E(q, L, P, ne) {
      return L === null || L.tag !== 6
        ? ((L = Fc(P, q.mode, ne)), (L.return = q), L)
        : ((L = d(L, P)), (L.return = q), L);
    }
    function A(q, L, P, ne) {
      var _e = P.type;
      return _e === _
        ? W(q, L, P.props.children, ne, P.key)
        : L !== null &&
            (L.elementType === _e ||
              (typeof _e == "object" &&
                _e !== null &&
                _e.$$typeof === N &&
                Ii(_e) === L.type))
          ? ((L = d(L, P.props)), Rl(L, P), (L.return = q), L)
          : ((L = os(P.type, P.key, P.props, null, q.mode, ne)),
            Rl(L, P),
            (L.return = q),
            L);
    }
    function V(q, L, P, ne) {
      return L === null ||
        L.tag !== 4 ||
        L.stateNode.containerInfo !== P.containerInfo ||
        L.stateNode.implementation !== P.implementation
        ? ((L = Pc(P, q.mode, ne)), (L.return = q), L)
        : ((L = d(L, P.children || [])), (L.return = q), L);
    }
    function W(q, L, P, ne, _e) {
      return L === null || L.tag !== 7
        ? ((L = qi(P, q.mode, ne, _e)), (L.return = q), L)
        : ((L = d(L, P)), (L.return = q), L);
    }
    function re(q, L, P) {
      if (
        (typeof L == "string" && L !== "") ||
        typeof L == "number" ||
        typeof L == "bigint"
      )
        return ((L = Fc("" + L, q.mode, P)), (L.return = q), L);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case v:
            return (
              (P = os(L.type, L.key, L.props, null, q.mode, P)),
              Rl(P, L),
              (P.return = q),
              P
            );
          case S:
            return ((L = Pc(L, q.mode, P)), (L.return = q), L);
          case N:
            return ((L = Ii(L)), re(q, L, P));
        }
        if (ee(L) || ie(L))
          return ((L = qi(L, q.mode, P, null)), (L.return = q), L);
        if (typeof L.then == "function") return re(q, ps(L), P);
        if (L.$$typeof === M) return re(q, cs(q, L), P);
        ms(q, L);
      }
      return null;
    }
    function Y(q, L, P, ne) {
      var _e = L !== null ? L.key : null;
      if (
        (typeof P == "string" && P !== "") ||
        typeof P == "number" ||
        typeof P == "bigint"
      )
        return _e !== null ? null : E(q, L, "" + P, ne);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case v:
            return P.key === _e ? A(q, L, P, ne) : null;
          case S:
            return P.key === _e ? V(q, L, P, ne) : null;
          case N:
            return ((P = Ii(P)), Y(q, L, P, ne));
        }
        if (ee(P) || ie(P)) return _e !== null ? null : W(q, L, P, ne, null);
        if (typeof P.then == "function") return Y(q, L, ps(P), ne);
        if (P.$$typeof === M) return Y(q, L, cs(q, P), ne);
        ms(q, P);
      }
      return null;
    }
    function Q(q, L, P, ne, _e) {
      if (
        (typeof ne == "string" && ne !== "") ||
        typeof ne == "number" ||
        typeof ne == "bigint"
      )
        return ((q = q.get(P) || null), E(L, q, "" + ne, _e));
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case v:
            return (
              (q = q.get(ne.key === null ? P : ne.key) || null),
              A(L, q, ne, _e)
            );
          case S:
            return (
              (q = q.get(ne.key === null ? P : ne.key) || null),
              V(L, q, ne, _e)
            );
          case N:
            return ((ne = Ii(ne)), Q(q, L, P, ne, _e));
        }
        if (ee(ne) || ie(ne))
          return ((q = q.get(P) || null), W(L, q, ne, _e, null));
        if (typeof ne.then == "function") return Q(q, L, P, ps(ne), _e);
        if (ne.$$typeof === M) return Q(q, L, P, cs(L, ne), _e);
        ms(L, ne);
      }
      return null;
    }
    function ve(q, L, P, ne) {
      for (
        var _e = null, We = null, we = L, Le = (L = 0), Xe = null;
        we !== null && Le < P.length;
        Le++
      ) {
        we.index > Le ? ((Xe = we), (we = null)) : (Xe = we.sibling);
        var et = Y(q, we, P[Le], ne);
        if (et === null) {
          we === null && (we = Xe);
          break;
        }
        (t && we && et.alternate === null && r(q, we),
          (L = m(et, L, Le)),
          We === null ? (_e = et) : (We.sibling = et),
          (We = et),
          (we = Xe));
      }
      if (Le === P.length) return (l(q, we), Ge && Tr(q, Le), _e);
      if (we === null) {
        for (; Le < P.length; Le++)
          ((we = re(q, P[Le], ne)),
            we !== null &&
              ((L = m(we, L, Le)),
              We === null ? (_e = we) : (We.sibling = we),
              (We = we)));
        return (Ge && Tr(q, Le), _e);
      }
      for (we = s(we); Le < P.length; Le++)
        ((Xe = Q(we, q, Le, P[Le], ne)),
          Xe !== null &&
            (t &&
              Xe.alternate !== null &&
              we.delete(Xe.key === null ? Le : Xe.key),
            (L = m(Xe, L, Le)),
            We === null ? (_e = Xe) : (We.sibling = Xe),
            (We = Xe)));
      return (
        t &&
          we.forEach(function (wi) {
            return r(q, wi);
          }),
        Ge && Tr(q, Le),
        _e
      );
    }
    function Oe(q, L, P, ne) {
      if (P == null) throw Error(a(151));
      for (
        var _e = null,
          We = null,
          we = L,
          Le = (L = 0),
          Xe = null,
          et = P.next();
        we !== null && !et.done;
        Le++, et = P.next()
      ) {
        we.index > Le ? ((Xe = we), (we = null)) : (Xe = we.sibling);
        var wi = Y(q, we, et.value, ne);
        if (wi === null) {
          we === null && (we = Xe);
          break;
        }
        (t && we && wi.alternate === null && r(q, we),
          (L = m(wi, L, Le)),
          We === null ? (_e = wi) : (We.sibling = wi),
          (We = wi),
          (we = Xe));
      }
      if (et.done) return (l(q, we), Ge && Tr(q, Le), _e);
      if (we === null) {
        for (; !et.done; Le++, et = P.next())
          ((et = re(q, et.value, ne)),
            et !== null &&
              ((L = m(et, L, Le)),
              We === null ? (_e = et) : (We.sibling = et),
              (We = et)));
        return (Ge && Tr(q, Le), _e);
      }
      for (we = s(we); !et.done; Le++, et = P.next())
        ((et = Q(we, q, Le, et.value, ne)),
          et !== null &&
            (t &&
              et.alternate !== null &&
              we.delete(et.key === null ? Le : et.key),
            (L = m(et, L, Le)),
            We === null ? (_e = et) : (We.sibling = et),
            (We = et)));
      return (
        t &&
          we.forEach(function (O2) {
            return r(q, O2);
          }),
        Ge && Tr(q, Le),
        _e
      );
    }
    function st(q, L, P, ne) {
      if (
        (typeof P == "object" &&
          P !== null &&
          P.type === _ &&
          P.key === null &&
          (P = P.props.children),
        typeof P == "object" && P !== null)
      ) {
        switch (P.$$typeof) {
          case v:
            e: {
              for (var _e = P.key; L !== null; ) {
                if (L.key === _e) {
                  if (((_e = P.type), _e === _)) {
                    if (L.tag === 7) {
                      (l(q, L.sibling),
                        (ne = d(L, P.props.children)),
                        (ne.return = q),
                        (q = ne));
                      break e;
                    }
                  } else if (
                    L.elementType === _e ||
                    (typeof _e == "object" &&
                      _e !== null &&
                      _e.$$typeof === N &&
                      Ii(_e) === L.type)
                  ) {
                    (l(q, L.sibling),
                      (ne = d(L, P.props)),
                      Rl(ne, P),
                      (ne.return = q),
                      (q = ne));
                    break e;
                  }
                  l(q, L);
                  break;
                } else r(q, L);
                L = L.sibling;
              }
              P.type === _
                ? ((ne = qi(P.props.children, q.mode, ne, P.key)),
                  (ne.return = q),
                  (q = ne))
                : ((ne = os(P.type, P.key, P.props, null, q.mode, ne)),
                  Rl(ne, P),
                  (ne.return = q),
                  (q = ne));
            }
            return b(q);
          case S:
            e: {
              for (_e = P.key; L !== null; ) {
                if (L.key === _e)
                  if (
                    L.tag === 4 &&
                    L.stateNode.containerInfo === P.containerInfo &&
                    L.stateNode.implementation === P.implementation
                  ) {
                    (l(q, L.sibling),
                      (ne = d(L, P.children || [])),
                      (ne.return = q),
                      (q = ne));
                    break e;
                  } else {
                    l(q, L);
                    break;
                  }
                else r(q, L);
                L = L.sibling;
              }
              ((ne = Pc(P, q.mode, ne)), (ne.return = q), (q = ne));
            }
            return b(q);
          case N:
            return ((P = Ii(P)), st(q, L, P, ne));
        }
        if (ee(P)) return ve(q, L, P, ne);
        if (ie(P)) {
          if (((_e = ie(P)), typeof _e != "function")) throw Error(a(150));
          return ((P = _e.call(P)), Oe(q, L, P, ne));
        }
        if (typeof P.then == "function") return st(q, L, ps(P), ne);
        if (P.$$typeof === M) return st(q, L, cs(q, P), ne);
        ms(q, P);
      }
      return (typeof P == "string" && P !== "") ||
        typeof P == "number" ||
        typeof P == "bigint"
        ? ((P = "" + P),
          L !== null && L.tag === 6
            ? (l(q, L.sibling), (ne = d(L, P)), (ne.return = q), (q = ne))
            : (l(q, L), (ne = Fc(P, q.mode, ne)), (ne.return = q), (q = ne)),
          b(q))
        : l(q, L);
    }
    return function (q, L, P, ne) {
      try {
        Tl = 0;
        var _e = st(q, L, P, ne);
        return ((Aa = null), _e);
      } catch (we) {
        if (we === Ra || we === ds) throw we;
        var We = vn(29, we, null, q.mode);
        return ((We.lanes = ne), (We.return = q), We);
      }
    };
  }
  var Gi = Bm(!0),
    Um = Bm(!1),
    ai = !1;
  function ef(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function tf(t, r) {
    ((t = t.updateQueue),
      r.updateQueue === t &&
        (r.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function li(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function oi(t, r, l) {
    var s = t.updateQueue;
    if (s === null) return null;
    if (((s = s.shared), (tt & 2) !== 0)) {
      var d = s.pending;
      return (
        d === null ? (r.next = r) : ((r.next = d.next), (d.next = r)),
        (s.pending = r),
        (r = ls(t)),
        Sm(t, null, l),
        r
      );
    }
    return (as(t, s, r, l), ls(t));
  }
  function Al(t, r, l) {
    if (
      ((r = r.updateQueue), r !== null && ((r = r.shared), (l & 4194048) !== 0))
    ) {
      var s = r.lanes;
      ((s &= t.pendingLanes), (l |= s), (r.lanes = l), Go(t, l));
    }
  }
  function nf(t, r) {
    var l = t.updateQueue,
      s = t.alternate;
    if (s !== null && ((s = s.updateQueue), l === s)) {
      var d = null,
        m = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var b = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          (m === null ? (d = m = b) : (m = m.next = b), (l = l.next));
        } while (l !== null);
        m === null ? (d = m = r) : (m = m.next = r);
      } else d = m = r;
      ((l = {
        baseState: s.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: m,
        shared: s.shared,
        callbacks: s.callbacks,
      }),
        (t.updateQueue = l));
      return;
    }
    ((t = l.lastBaseUpdate),
      t === null ? (l.firstBaseUpdate = r) : (t.next = r),
      (l.lastBaseUpdate = r));
  }
  var rf = !1;
  function Ol() {
    if (rf) {
      var t = Ta;
      if (t !== null) throw t;
    }
  }
  function zl(t, r, l, s) {
    rf = !1;
    var d = t.updateQueue;
    ai = !1;
    var m = d.firstBaseUpdate,
      b = d.lastBaseUpdate,
      E = d.shared.pending;
    if (E !== null) {
      d.shared.pending = null;
      var A = E,
        V = A.next;
      ((A.next = null), b === null ? (m = V) : (b.next = V), (b = A));
      var W = t.alternate;
      W !== null &&
        ((W = W.updateQueue),
        (E = W.lastBaseUpdate),
        E !== b &&
          (E === null ? (W.firstBaseUpdate = V) : (E.next = V),
          (W.lastBaseUpdate = A)));
    }
    if (m !== null) {
      var re = d.baseState;
      ((b = 0), (W = V = A = null), (E = m));
      do {
        var Y = E.lane & -536870913,
          Q = Y !== E.lane;
        if (Q ? (Ie & Y) === Y : (s & Y) === Y) {
          (Y !== 0 && Y === _a && (rf = !0),
            W !== null &&
              (W = W.next =
                {
                  lane: 0,
                  tag: E.tag,
                  payload: E.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var ve = t,
              Oe = E;
            Y = r;
            var st = l;
            switch (Oe.tag) {
              case 1:
                if (((ve = Oe.payload), typeof ve == "function")) {
                  re = ve.call(st, re, Y);
                  break e;
                }
                re = ve;
                break e;
              case 3:
                ve.flags = (ve.flags & -65537) | 128;
              case 0:
                if (
                  ((ve = Oe.payload),
                  (Y = typeof ve == "function" ? ve.call(st, re, Y) : ve),
                  Y == null)
                )
                  break e;
                re = g({}, re, Y);
                break e;
              case 2:
                ai = !0;
            }
          }
          ((Y = E.callback),
            Y !== null &&
              ((t.flags |= 64),
              Q && (t.flags |= 8192),
              (Q = d.callbacks),
              Q === null ? (d.callbacks = [Y]) : Q.push(Y)));
        } else
          ((Q = {
            lane: Y,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null,
          }),
            W === null ? ((V = W = Q), (A = re)) : (W = W.next = Q),
            (b |= Y));
        if (((E = E.next), E === null)) {
          if (((E = d.shared.pending), E === null)) break;
          ((Q = E),
            (E = Q.next),
            (Q.next = null),
            (d.lastBaseUpdate = Q),
            (d.shared.pending = null));
        }
      } while (!0);
      (W === null && (A = re),
        (d.baseState = A),
        (d.firstBaseUpdate = V),
        (d.lastBaseUpdate = W),
        m === null && (d.shared.lanes = 0),
        (di |= b),
        (t.lanes = b),
        (t.memoizedState = re));
    }
  }
  function Hm(t, r) {
    if (typeof t != "function") throw Error(a(191, t));
    t.call(r);
  }
  function qm(t, r) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++) Hm(l[t], r);
  }
  var Oa = O(null),
    gs = O(0);
  function Fm(t, r) {
    ((t = Ur), C(gs, t), C(Oa, r), (Ur = t | r.baseLanes));
  }
  function af() {
    (C(gs, Ur), C(Oa, Oa.current));
  }
  function lf() {
    ((Ur = gs.current), G(Oa), G(gs));
  }
  var Sn = O(null),
    Un = null;
  function si(t) {
    var r = t.alternate;
    (C(_t, _t.current & 1),
      C(Sn, t),
      Un === null &&
        (r === null || Oa.current !== null || r.memoizedState !== null) &&
        (Un = t));
  }
  function of(t) {
    (C(_t, _t.current), C(Sn, t), Un === null && (Un = t));
  }
  function Pm(t) {
    t.tag === 22
      ? (C(_t, _t.current), C(Sn, t), Un === null && (Un = t))
      : ui();
  }
  function ui() {
    (C(_t, _t.current), C(Sn, Sn.current));
  }
  function wn(t) {
    (G(Sn), Un === t && (Un = null), G(_t));
  }
  var _t = O(0);
  function ys(t) {
    for (var r = t; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || hd(l) || pd(l)))
          return r;
      } else if (
        r.tag === 19 &&
        (r.memoizedProps.revealOrder === "forwards" ||
          r.memoizedProps.revealOrder === "backwards" ||
          r.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          r.memoizedProps.revealOrder === "together")
      ) {
        if ((r.flags & 128) !== 0) return r;
      } else if (r.child !== null) {
        ((r.child.return = r), (r = r.child));
        continue;
      }
      if (r === t) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t) return null;
        r = r.return;
      }
      ((r.sibling.return = r.return), (r = r.sibling));
    }
    return null;
  }
  var Or = 0,
    je = null,
    lt = null,
    Dt = null,
    bs = !1,
    za = !1,
    Qi = !1,
    xs = 0,
    Dl = 0,
    Da = null,
    vw = 0;
  function St() {
    throw Error(a(321));
  }
  function sf(t, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < t.length; l++)
      if (!xn(t[l], r[l])) return !1;
    return !0;
  }
  function uf(t, r, l, s, d, m) {
    return (
      (Or = m),
      (je = r),
      (r.memoizedState = null),
      (r.updateQueue = null),
      (r.lanes = 0),
      (D.H = t === null || t.memoizedState === null ? Cg : kf),
      (Qi = !1),
      (m = l(s, d)),
      (Qi = !1),
      za && (m = Ym(r, l, s, d)),
      Vm(t),
      m
    );
  }
  function Vm(t) {
    D.H = jl;
    var r = lt !== null && lt.next !== null;
    if (((Or = 0), (Dt = lt = je = null), (bs = !1), (Dl = 0), (Da = null), r))
      throw Error(a(300));
    t === null ||
      Nt ||
      ((t = t.dependencies), t !== null && us(t) && (Nt = !0));
  }
  function Ym(t, r, l, s) {
    je = t;
    var d = 0;
    do {
      if ((za && (Da = null), (Dl = 0), (za = !1), 25 <= d))
        throw Error(a(301));
      if (((d += 1), (Dt = lt = null), t.updateQueue != null)) {
        var m = t.updateQueue;
        ((m.lastEffect = null),
          (m.events = null),
          (m.stores = null),
          m.memoCache != null && (m.memoCache.index = 0));
      }
      ((D.H = _g), (m = r(l, s)));
    } while (za);
    return m;
  }
  function Sw() {
    var t = D.H,
      r = t.useState()[0];
    return (
      (r = typeof r.then == "function" ? Nl(r) : r),
      (t = t.useState()[0]),
      (lt !== null ? lt.memoizedState : null) !== t && (je.flags |= 1024),
      r
    );
  }
  function cf() {
    var t = xs !== 0;
    return ((xs = 0), t);
  }
  function ff(t, r, l) {
    ((r.updateQueue = t.updateQueue), (r.flags &= -2053), (t.lanes &= ~l));
  }
  function df(t) {
    if (bs) {
      for (t = t.memoizedState; t !== null; ) {
        var r = t.queue;
        (r !== null && (r.pending = null), (t = t.next));
      }
      bs = !1;
    }
    ((Or = 0), (Dt = lt = je = null), (za = !1), (Dl = xs = 0), (Da = null));
  }
  function rn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Dt === null ? (je.memoizedState = Dt = t) : (Dt = Dt.next = t), Dt);
  }
  function Tt() {
    if (lt === null) {
      var t = je.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = lt.next;
    var r = Dt === null ? je.memoizedState : Dt.next;
    if (r !== null) ((Dt = r), (lt = t));
    else {
      if (t === null)
        throw je.alternate === null ? Error(a(467)) : Error(a(310));
      ((lt = t),
        (t = {
          memoizedState: lt.memoizedState,
          baseState: lt.baseState,
          baseQueue: lt.baseQueue,
          queue: lt.queue,
          next: null,
        }),
        Dt === null ? (je.memoizedState = Dt = t) : (Dt = Dt.next = t));
    }
    return Dt;
  }
  function vs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Nl(t) {
    var r = Dl;
    return (
      (Dl += 1),
      Da === null && (Da = []),
      (t = Mm(Da, t, r)),
      (r = je),
      (Dt === null ? r.memoizedState : Dt.next) === null &&
        ((r = r.alternate),
        (D.H = r === null || r.memoizedState === null ? Cg : kf)),
      t
    );
  }
  function Ss(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Nl(t);
      if (t.$$typeof === M) return It(t);
    }
    throw Error(a(438, String(t)));
  }
  function hf(t) {
    var r = null,
      l = je.updateQueue;
    if ((l !== null && (r = l.memoCache), r == null)) {
      var s = je.alternate;
      s !== null &&
        ((s = s.updateQueue),
        s !== null &&
          ((s = s.memoCache),
          s != null &&
            (r = {
              data: s.data.map(function (d) {
                return d.slice();
              }),
              index: 0,
            })));
    }
    if (
      (r == null && (r = { data: [], index: 0 }),
      l === null && ((l = vs()), (je.updateQueue = l)),
      (l.memoCache = r),
      (l = r.data[r.index]),
      l === void 0)
    )
      for (l = r.data[r.index] = Array(t), s = 0; s < t; s++) l[s] = F;
    return (r.index++, l);
  }
  function zr(t, r) {
    return typeof r == "function" ? r(t) : r;
  }
  function ws(t) {
    var r = Tt();
    return pf(r, lt, t);
  }
  function pf(t, r, l) {
    var s = t.queue;
    if (s === null) throw Error(a(311));
    s.lastRenderedReducer = l;
    var d = t.baseQueue,
      m = s.pending;
    if (m !== null) {
      if (d !== null) {
        var b = d.next;
        ((d.next = m.next), (m.next = b));
      }
      ((r.baseQueue = d = m), (s.pending = null));
    }
    if (((m = t.baseState), d === null)) t.memoizedState = m;
    else {
      r = d.next;
      var E = (b = null),
        A = null,
        V = r,
        W = !1;
      do {
        var re = V.lane & -536870913;
        if (re !== V.lane ? (Ie & re) === re : (Or & re) === re) {
          var Y = V.revertLane;
          if (Y === 0)
            (A !== null &&
              (A = A.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: V.action,
                  hasEagerState: V.hasEagerState,
                  eagerState: V.eagerState,
                  next: null,
                }),
              re === _a && (W = !0));
          else if ((Or & Y) === Y) {
            ((V = V.next), Y === _a && (W = !0));
            continue;
          } else
            ((re = {
              lane: 0,
              revertLane: V.revertLane,
              gesture: null,
              action: V.action,
              hasEagerState: V.hasEagerState,
              eagerState: V.eagerState,
              next: null,
            }),
              A === null ? ((E = A = re), (b = m)) : (A = A.next = re),
              (je.lanes |= Y),
              (di |= Y));
          ((re = V.action),
            Qi && l(m, re),
            (m = V.hasEagerState ? V.eagerState : l(m, re)));
        } else
          ((Y = {
            lane: re,
            revertLane: V.revertLane,
            gesture: V.gesture,
            action: V.action,
            hasEagerState: V.hasEagerState,
            eagerState: V.eagerState,
            next: null,
          }),
            A === null ? ((E = A = Y), (b = m)) : (A = A.next = Y),
            (je.lanes |= re),
            (di |= re));
        V = V.next;
      } while (V !== null && V !== r);
      if (
        (A === null ? (b = m) : (A.next = E),
        !xn(m, t.memoizedState) && ((Nt = !0), W && ((l = Ta), l !== null)))
      )
        throw l;
      ((t.memoizedState = m),
        (t.baseState = b),
        (t.baseQueue = A),
        (s.lastRenderedState = m));
    }
    return (d === null && (s.lanes = 0), [t.memoizedState, s.dispatch]);
  }
  function mf(t) {
    var r = Tt(),
      l = r.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = t;
    var s = l.dispatch,
      d = l.pending,
      m = r.memoizedState;
    if (d !== null) {
      l.pending = null;
      var b = (d = d.next);
      do ((m = t(m, b.action)), (b = b.next));
      while (b !== d);
      (xn(m, r.memoizedState) || (Nt = !0),
        (r.memoizedState = m),
        r.baseQueue === null && (r.baseState = m),
        (l.lastRenderedState = m));
    }
    return [m, s];
  }
  function Im(t, r, l) {
    var s = je,
      d = Tt(),
      m = Ge;
    if (m) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = r();
    var b = !xn((lt || d).memoizedState, l);
    if (
      (b && ((d.memoizedState = l), (Nt = !0)),
      (d = d.queue),
      bf(Qm.bind(null, s, d, t), [t]),
      d.getSnapshot !== r || b || (Dt !== null && Dt.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        Na(9, { destroy: void 0 }, Gm.bind(null, s, d, l, r), null),
        ct === null)
      )
        throw Error(a(349));
      m || (Or & 127) !== 0 || Xm(s, r, l);
    }
    return l;
  }
  function Xm(t, r, l) {
    ((t.flags |= 16384),
      (t = { getSnapshot: r, value: l }),
      (r = je.updateQueue),
      r === null
        ? ((r = vs()), (je.updateQueue = r), (r.stores = [t]))
        : ((l = r.stores), l === null ? (r.stores = [t]) : l.push(t)));
  }
  function Gm(t, r, l, s) {
    ((r.value = l), (r.getSnapshot = s), Km(r) && Zm(t));
  }
  function Qm(t, r, l) {
    return l(function () {
      Km(r) && Zm(t);
    });
  }
  function Km(t) {
    var r = t.getSnapshot;
    t = t.value;
    try {
      var l = r();
      return !xn(t, l);
    } catch {
      return !0;
    }
  }
  function Zm(t) {
    var r = Hi(t, 2);
    r !== null && pn(r, t, 2);
  }
  function gf(t) {
    var r = rn();
    if (typeof t == "function") {
      var l = t;
      if (((t = l()), Qi)) {
        bt(!0);
        try {
          l();
        } finally {
          bt(!1);
        }
      }
    }
    return (
      (r.memoizedState = r.baseState = t),
      (r.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: zr,
        lastRenderedState: t,
      }),
      r
    );
  }
  function $m(t, r, l, s) {
    return ((t.baseState = l), pf(t, lt, typeof s == "function" ? s : zr));
  }
  function ww(t, r, l, s, d) {
    if (Cs(t)) throw Error(a(485));
    if (((t = r.action), t !== null)) {
      var m = {
        payload: d,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (b) {
          m.listeners.push(b);
        },
      };
      (D.T !== null ? l(!0) : (m.isTransition = !1),
        s(m),
        (l = r.pending),
        l === null
          ? ((m.next = r.pending = m), Jm(r, m))
          : ((m.next = l.next), (r.pending = l.next = m)));
    }
  }
  function Jm(t, r) {
    var l = r.action,
      s = r.payload,
      d = t.state;
    if (r.isTransition) {
      var m = D.T,
        b = {};
      D.T = b;
      try {
        var E = l(d, s),
          A = D.S;
        (A !== null && A(b, E), Wm(t, r, E));
      } catch (V) {
        yf(t, r, V);
      } finally {
        (m !== null && b.types !== null && (m.types = b.types), (D.T = m));
      }
    } else
      try {
        ((m = l(d, s)), Wm(t, r, m));
      } catch (V) {
        yf(t, r, V);
      }
  }
  function Wm(t, r, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (s) {
            eg(t, r, s);
          },
          function (s) {
            return yf(t, r, s);
          },
        )
      : eg(t, r, l);
  }
  function eg(t, r, l) {
    ((r.status = "fulfilled"),
      (r.value = l),
      tg(r),
      (t.state = l),
      (r = t.pending),
      r !== null &&
        ((l = r.next),
        l === r ? (t.pending = null) : ((l = l.next), (r.next = l), Jm(t, l))));
  }
  function yf(t, r, l) {
    var s = t.pending;
    if (((t.pending = null), s !== null)) {
      s = s.next;
      do ((r.status = "rejected"), (r.reason = l), tg(r), (r = r.next));
      while (r !== s);
    }
    t.action = null;
  }
  function tg(t) {
    t = t.listeners;
    for (var r = 0; r < t.length; r++) (0, t[r])();
  }
  function ng(t, r) {
    return r;
  }
  function rg(t, r) {
    if (Ge) {
      var l = ct.formState;
      if (l !== null) {
        e: {
          var s = je;
          if (Ge) {
            if (gt) {
              t: {
                for (var d = gt, m = Bn; d.nodeType !== 8; ) {
                  if (!m) {
                    d = null;
                    break t;
                  }
                  if (((d = Hn(d.nextSibling)), d === null)) {
                    d = null;
                    break t;
                  }
                }
                ((m = d.data), (d = m === "F!" || m === "F" ? d : null));
              }
              if (d) {
                ((gt = Hn(d.nextSibling)), (s = d.data === "F!"));
                break e;
              }
            }
            ri(s);
          }
          s = !1;
        }
        s && (r = l[0]);
      }
    }
    return (
      (l = rn()),
      (l.memoizedState = l.baseState = r),
      (s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ng,
        lastRenderedState: r,
      }),
      (l.queue = s),
      (l = wg.bind(null, je, s)),
      (s.dispatch = l),
      (s = gf(!1)),
      (m = Ef.bind(null, je, !1, s.queue)),
      (s = rn()),
      (d = { state: r, dispatch: null, action: t, pending: null }),
      (s.queue = d),
      (l = ww.bind(null, je, d, m, l)),
      (d.dispatch = l),
      (s.memoizedState = t),
      [r, l, !1]
    );
  }
  function ig(t) {
    var r = Tt();
    return ag(r, lt, t);
  }
  function ag(t, r, l) {
    if (
      ((r = pf(t, r, ng)[0]),
      (t = ws(zr)[0]),
      typeof r == "object" && r !== null && typeof r.then == "function")
    )
      try {
        var s = Nl(r);
      } catch (b) {
        throw b === Ra ? ds : b;
      }
    else s = r;
    r = Tt();
    var d = r.queue,
      m = d.dispatch;
    return (
      l !== r.memoizedState &&
        ((je.flags |= 2048),
        Na(9, { destroy: void 0 }, Ew.bind(null, d, l), null)),
      [s, m, t]
    );
  }
  function Ew(t, r) {
    t.action = r;
  }
  function lg(t) {
    var r = Tt(),
      l = lt;
    if (l !== null) return ag(r, l, t);
    (Tt(), (r = r.memoizedState), (l = Tt()));
    var s = l.queue.dispatch;
    return ((l.memoizedState = t), [r, s, !1]);
  }
  function Na(t, r, l, s) {
    return (
      (t = { tag: t, create: l, deps: s, inst: r, next: null }),
      (r = je.updateQueue),
      r === null && ((r = vs()), (je.updateQueue = r)),
      (l = r.lastEffect),
      l === null
        ? (r.lastEffect = t.next = t)
        : ((s = l.next), (l.next = t), (t.next = s), (r.lastEffect = t)),
      t
    );
  }
  function og() {
    return Tt().memoizedState;
  }
  function Es(t, r, l, s) {
    var d = rn();
    ((je.flags |= t),
      (d.memoizedState = Na(
        1 | r,
        { destroy: void 0 },
        l,
        s === void 0 ? null : s,
      )));
  }
  function ks(t, r, l, s) {
    var d = Tt();
    s = s === void 0 ? null : s;
    var m = d.memoizedState.inst;
    lt !== null && s !== null && sf(s, lt.memoizedState.deps)
      ? (d.memoizedState = Na(r, m, l, s))
      : ((je.flags |= t), (d.memoizedState = Na(1 | r, m, l, s)));
  }
  function sg(t, r) {
    Es(8390656, 8, t, r);
  }
  function bf(t, r) {
    ks(2048, 8, t, r);
  }
  function kw(t) {
    je.flags |= 4;
    var r = je.updateQueue;
    if (r === null) ((r = vs()), (je.updateQueue = r), (r.events = [t]));
    else {
      var l = r.events;
      l === null ? (r.events = [t]) : l.push(t);
    }
  }
  function ug(t) {
    var r = Tt().memoizedState;
    return (
      kw({ ref: r, nextImpl: t }),
      function () {
        if ((tt & 2) !== 0) throw Error(a(440));
        return r.impl.apply(void 0, arguments);
      }
    );
  }
  function cg(t, r) {
    return ks(4, 2, t, r);
  }
  function fg(t, r) {
    return ks(4, 4, t, r);
  }
  function dg(t, r) {
    if (typeof r == "function") {
      t = t();
      var l = r(t);
      return function () {
        typeof l == "function" ? l() : r(null);
      };
    }
    if (r != null)
      return (
        (t = t()),
        (r.current = t),
        function () {
          r.current = null;
        }
      );
  }
  function hg(t, r, l) {
    ((l = l != null ? l.concat([t]) : null), ks(4, 4, dg.bind(null, r, t), l));
  }
  function xf() {}
  function pg(t, r) {
    var l = Tt();
    r = r === void 0 ? null : r;
    var s = l.memoizedState;
    return r !== null && sf(r, s[1]) ? s[0] : ((l.memoizedState = [t, r]), t);
  }
  function mg(t, r) {
    var l = Tt();
    r = r === void 0 ? null : r;
    var s = l.memoizedState;
    if (r !== null && sf(r, s[1])) return s[0];
    if (((s = t()), Qi)) {
      bt(!0);
      try {
        t();
      } finally {
        bt(!1);
      }
    }
    return ((l.memoizedState = [s, r]), s);
  }
  function vf(t, r, l) {
    return l === void 0 || ((Or & 1073741824) !== 0 && (Ie & 261930) === 0)
      ? (t.memoizedState = r)
      : ((t.memoizedState = l), (t = gy()), (je.lanes |= t), (di |= t), l);
  }
  function gg(t, r, l, s) {
    return xn(l, r)
      ? l
      : Oa.current !== null
        ? ((t = vf(t, l, s)), xn(t, r) || (Nt = !0), t)
        : (Or & 42) === 0 || ((Or & 1073741824) !== 0 && (Ie & 261930) === 0)
          ? ((Nt = !0), (t.memoizedState = l))
          : ((t = gy()), (je.lanes |= t), (di |= t), r);
  }
  function yg(t, r, l, s, d) {
    var m = te.p;
    te.p = m !== 0 && 8 > m ? m : 8;
    var b = D.T,
      E = {};
    ((D.T = E), Ef(t, !1, r, l));
    try {
      var A = d(),
        V = D.S;
      if (
        (V !== null && V(E, A),
        A !== null && typeof A == "object" && typeof A.then == "function")
      ) {
        var W = xw(A, s);
        Ml(t, r, W, Cn(t));
      } else Ml(t, r, s, Cn(t));
    } catch (re) {
      Ml(t, r, { then: function () {}, status: "rejected", reason: re }, Cn());
    } finally {
      ((te.p = m),
        b !== null && E.types !== null && (b.types = E.types),
        (D.T = b));
    }
  }
  function Cw() {}
  function Sf(t, r, l, s) {
    if (t.tag !== 5) throw Error(a(476));
    var d = bg(t).queue;
    yg(
      t,
      d,
      r,
      fe,
      l === null
        ? Cw
        : function () {
            return (xg(t), l(s));
          },
    );
  }
  function bg(t) {
    var r = t.memoizedState;
    if (r !== null) return r;
    r = {
      memoizedState: fe,
      baseState: fe,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: zr,
        lastRenderedState: fe,
      },
      next: null,
    };
    var l = {};
    return (
      (r.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: zr,
          lastRenderedState: l,
        },
        next: null,
      }),
      (t.memoizedState = r),
      (t = t.alternate),
      t !== null && (t.memoizedState = r),
      r
    );
  }
  function xg(t) {
    var r = bg(t);
    (r.next === null && (r = t.alternate.memoizedState),
      Ml(t, r.next.queue, {}, Cn()));
  }
  function wf() {
    return It($l);
  }
  function vg() {
    return Tt().memoizedState;
  }
  function Sg() {
    return Tt().memoizedState;
  }
  function _w(t) {
    for (var r = t.return; r !== null; ) {
      switch (r.tag) {
        case 24:
        case 3:
          var l = Cn();
          t = li(l);
          var s = oi(r, t, l);
          (s !== null && (pn(s, r, l), Al(s, r, l)),
            (r = { cache: Zc() }),
            (t.payload = r));
          return;
      }
      r = r.return;
    }
  }
  function Tw(t, r, l) {
    var s = Cn();
    ((l = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Cs(t)
        ? Eg(r, l)
        : ((l = Hc(t, r, l, s)), l !== null && (pn(l, t, s), kg(l, r, s))));
  }
  function wg(t, r, l) {
    var s = Cn();
    Ml(t, r, l, s);
  }
  function Ml(t, r, l, s) {
    var d = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Cs(t)) Eg(r, d);
    else {
      var m = t.alternate;
      if (
        t.lanes === 0 &&
        (m === null || m.lanes === 0) &&
        ((m = r.lastRenderedReducer), m !== null)
      )
        try {
          var b = r.lastRenderedState,
            E = m(b, l);
          if (((d.hasEagerState = !0), (d.eagerState = E), xn(E, b)))
            return (as(t, r, d, 0), ct === null && is(), !1);
        } catch {}
      if (((l = Hc(t, r, d, s)), l !== null))
        return (pn(l, t, s), kg(l, r, s), !0);
    }
    return !1;
  }
  function Ef(t, r, l, s) {
    if (
      ((s = {
        lane: 2,
        revertLane: td(),
        gesture: null,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Cs(t))
    ) {
      if (r) throw Error(a(479));
    } else ((r = Hc(t, l, s, 2)), r !== null && pn(r, t, 2));
  }
  function Cs(t) {
    var r = t.alternate;
    return t === je || (r !== null && r === je);
  }
  function Eg(t, r) {
    za = bs = !0;
    var l = t.pending;
    (l === null ? (r.next = r) : ((r.next = l.next), (l.next = r)),
      (t.pending = r));
  }
  function kg(t, r, l) {
    if ((l & 4194048) !== 0) {
      var s = r.lanes;
      ((s &= t.pendingLanes), (l |= s), (r.lanes = l), Go(t, l));
    }
  }
  var jl = {
    readContext: It,
    use: Ss,
    useCallback: St,
    useContext: St,
    useEffect: St,
    useImperativeHandle: St,
    useLayoutEffect: St,
    useInsertionEffect: St,
    useMemo: St,
    useReducer: St,
    useRef: St,
    useState: St,
    useDebugValue: St,
    useDeferredValue: St,
    useTransition: St,
    useSyncExternalStore: St,
    useId: St,
    useHostTransitionStatus: St,
    useFormState: St,
    useActionState: St,
    useOptimistic: St,
    useMemoCache: St,
    useCacheRefresh: St,
  };
  jl.useEffectEvent = St;
  var Cg = {
      readContext: It,
      use: Ss,
      useCallback: function (t, r) {
        return ((rn().memoizedState = [t, r === void 0 ? null : r]), t);
      },
      useContext: It,
      useEffect: sg,
      useImperativeHandle: function (t, r, l) {
        ((l = l != null ? l.concat([t]) : null),
          Es(4194308, 4, dg.bind(null, r, t), l));
      },
      useLayoutEffect: function (t, r) {
        return Es(4194308, 4, t, r);
      },
      useInsertionEffect: function (t, r) {
        Es(4, 2, t, r);
      },
      useMemo: function (t, r) {
        var l = rn();
        r = r === void 0 ? null : r;
        var s = t();
        if (Qi) {
          bt(!0);
          try {
            t();
          } finally {
            bt(!1);
          }
        }
        return ((l.memoizedState = [s, r]), s);
      },
      useReducer: function (t, r, l) {
        var s = rn();
        if (l !== void 0) {
          var d = l(r);
          if (Qi) {
            bt(!0);
            try {
              l(r);
            } finally {
              bt(!1);
            }
          }
        } else d = r;
        return (
          (s.memoizedState = s.baseState = d),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: d,
          }),
          (s.queue = t),
          (t = t.dispatch = Tw.bind(null, je, t)),
          [s.memoizedState, t]
        );
      },
      useRef: function (t) {
        var r = rn();
        return ((t = { current: t }), (r.memoizedState = t));
      },
      useState: function (t) {
        t = gf(t);
        var r = t.queue,
          l = wg.bind(null, je, r);
        return ((r.dispatch = l), [t.memoizedState, l]);
      },
      useDebugValue: xf,
      useDeferredValue: function (t, r) {
        var l = rn();
        return vf(l, t, r);
      },
      useTransition: function () {
        var t = gf(!1);
        return (
          (t = yg.bind(null, je, t.queue, !0, !1)),
          (rn().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, r, l) {
        var s = je,
          d = rn();
        if (Ge) {
          if (l === void 0) throw Error(a(407));
          l = l();
        } else {
          if (((l = r()), ct === null)) throw Error(a(349));
          (Ie & 127) !== 0 || Xm(s, r, l);
        }
        d.memoizedState = l;
        var m = { value: l, getSnapshot: r };
        return (
          (d.queue = m),
          sg(Qm.bind(null, s, m, t), [t]),
          (s.flags |= 2048),
          Na(9, { destroy: void 0 }, Gm.bind(null, s, m, l, r), null),
          l
        );
      },
      useId: function () {
        var t = rn(),
          r = ct.identifierPrefix;
        if (Ge) {
          var l = hr,
            s = dr;
          ((l = (s & ~(1 << (32 - nt(s) - 1))).toString(32) + l),
            (r = "_" + r + "R_" + l),
            (l = xs++),
            0 < l && (r += "H" + l.toString(32)),
            (r += "_"));
        } else ((l = vw++), (r = "_" + r + "r_" + l.toString(32) + "_"));
        return (t.memoizedState = r);
      },
      useHostTransitionStatus: wf,
      useFormState: rg,
      useActionState: rg,
      useOptimistic: function (t) {
        var r = rn();
        r.memoizedState = r.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (r.queue = l),
          (r = Ef.bind(null, je, !0, l)),
          (l.dispatch = r),
          [t, r]
        );
      },
      useMemoCache: hf,
      useCacheRefresh: function () {
        return (rn().memoizedState = _w.bind(null, je));
      },
      useEffectEvent: function (t) {
        var r = rn(),
          l = { impl: t };
        return (
          (r.memoizedState = l),
          function () {
            if ((tt & 2) !== 0) throw Error(a(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    kf = {
      readContext: It,
      use: Ss,
      useCallback: pg,
      useContext: It,
      useEffect: bf,
      useImperativeHandle: hg,
      useInsertionEffect: cg,
      useLayoutEffect: fg,
      useMemo: mg,
      useReducer: ws,
      useRef: og,
      useState: function () {
        return ws(zr);
      },
      useDebugValue: xf,
      useDeferredValue: function (t, r) {
        var l = Tt();
        return gg(l, lt.memoizedState, t, r);
      },
      useTransition: function () {
        var t = ws(zr)[0],
          r = Tt().memoizedState;
        return [typeof t == "boolean" ? t : Nl(t), r];
      },
      useSyncExternalStore: Im,
      useId: vg,
      useHostTransitionStatus: wf,
      useFormState: ig,
      useActionState: ig,
      useOptimistic: function (t, r) {
        var l = Tt();
        return $m(l, lt, t, r);
      },
      useMemoCache: hf,
      useCacheRefresh: Sg,
    };
  kf.useEffectEvent = ug;
  var _g = {
    readContext: It,
    use: Ss,
    useCallback: pg,
    useContext: It,
    useEffect: bf,
    useImperativeHandle: hg,
    useInsertionEffect: cg,
    useLayoutEffect: fg,
    useMemo: mg,
    useReducer: mf,
    useRef: og,
    useState: function () {
      return mf(zr);
    },
    useDebugValue: xf,
    useDeferredValue: function (t, r) {
      var l = Tt();
      return lt === null ? vf(l, t, r) : gg(l, lt.memoizedState, t, r);
    },
    useTransition: function () {
      var t = mf(zr)[0],
        r = Tt().memoizedState;
      return [typeof t == "boolean" ? t : Nl(t), r];
    },
    useSyncExternalStore: Im,
    useId: vg,
    useHostTransitionStatus: wf,
    useFormState: lg,
    useActionState: lg,
    useOptimistic: function (t, r) {
      var l = Tt();
      return lt !== null
        ? $m(l, lt, t, r)
        : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: hf,
    useCacheRefresh: Sg,
  };
  _g.useEffectEvent = ug;
  function Cf(t, r, l, s) {
    ((r = t.memoizedState),
      (l = l(s, r)),
      (l = l == null ? r : g({}, r, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l));
  }
  var _f = {
    enqueueSetState: function (t, r, l) {
      t = t._reactInternals;
      var s = Cn(),
        d = li(s);
      ((d.payload = r),
        l != null && (d.callback = l),
        (r = oi(t, d, s)),
        r !== null && (pn(r, t, s), Al(r, t, s)));
    },
    enqueueReplaceState: function (t, r, l) {
      t = t._reactInternals;
      var s = Cn(),
        d = li(s);
      ((d.tag = 1),
        (d.payload = r),
        l != null && (d.callback = l),
        (r = oi(t, d, s)),
        r !== null && (pn(r, t, s), Al(r, t, s)));
    },
    enqueueForceUpdate: function (t, r) {
      t = t._reactInternals;
      var l = Cn(),
        s = li(l);
      ((s.tag = 2),
        r != null && (s.callback = r),
        (r = oi(t, s, l)),
        r !== null && (pn(r, t, l), Al(r, t, l)));
    },
  };
  function Tg(t, r, l, s, d, m, b) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(s, m, b)
        : r.prototype && r.prototype.isPureReactComponent
          ? !Sl(l, s) || !Sl(d, m)
          : !0
    );
  }
  function Rg(t, r, l, s) {
    ((t = r.state),
      typeof r.componentWillReceiveProps == "function" &&
        r.componentWillReceiveProps(l, s),
      typeof r.UNSAFE_componentWillReceiveProps == "function" &&
        r.UNSAFE_componentWillReceiveProps(l, s),
      r.state !== t && _f.enqueueReplaceState(r, r.state, null));
  }
  function Ki(t, r) {
    var l = r;
    if ("ref" in r) {
      l = {};
      for (var s in r) s !== "ref" && (l[s] = r[s]);
    }
    if ((t = t.defaultProps)) {
      l === r && (l = g({}, l));
      for (var d in t) l[d] === void 0 && (l[d] = t[d]);
    }
    return l;
  }
  function Ag(t) {
    rs(t);
  }
  function Og(t) {
    console.error(t);
  }
  function zg(t) {
    rs(t);
  }
  function _s(t, r) {
    try {
      var l = t.onUncaughtError;
      l(r.value, { componentStack: r.stack });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function Dg(t, r, l) {
    try {
      var s = t.onCaughtError;
      s(l.value, {
        componentStack: l.stack,
        errorBoundary: r.tag === 1 ? r.stateNode : null,
      });
    } catch (d) {
      setTimeout(function () {
        throw d;
      });
    }
  }
  function Tf(t, r, l) {
    return (
      (l = li(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        _s(t, r);
      }),
      l
    );
  }
  function Ng(t) {
    return ((t = li(t)), (t.tag = 3), t);
  }
  function Mg(t, r, l, s) {
    var d = l.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var m = s.value;
      ((t.payload = function () {
        return d(m);
      }),
        (t.callback = function () {
          Dg(r, l, s);
        }));
    }
    var b = l.stateNode;
    b !== null &&
      typeof b.componentDidCatch == "function" &&
      (t.callback = function () {
        (Dg(r, l, s),
          typeof d != "function" &&
            (hi === null ? (hi = new Set([this])) : hi.add(this)));
        var E = s.stack;
        this.componentDidCatch(s.value, {
          componentStack: E !== null ? E : "",
        });
      });
  }
  function Rw(t, r, l, s, d) {
    if (
      ((l.flags |= 32768),
      s !== null && typeof s == "object" && typeof s.then == "function")
    ) {
      if (
        ((r = l.alternate),
        r !== null && Ca(r, l, d, !0),
        (l = Sn.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Un === null ? Us() : l.alternate === null && wt === 0 && (wt = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = d),
              s === hs
                ? (l.flags |= 16384)
                : ((r = l.updateQueue),
                  r === null ? (l.updateQueue = new Set([s])) : r.add(s),
                  Jf(t, s, d)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              s === hs
                ? (l.flags |= 16384)
                : ((r = l.updateQueue),
                  r === null
                    ? ((r = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([s]),
                      }),
                      (l.updateQueue = r))
                    : ((l = r.retryQueue),
                      l === null ? (r.retryQueue = new Set([s])) : l.add(s)),
                  Jf(t, s, d)),
              !1
            );
        }
        throw Error(a(435, l.tag));
      }
      return (Jf(t, s, d), Us(), !1);
    }
    if (Ge)
      return (
        (r = Sn.current),
        r !== null
          ? ((r.flags & 65536) === 0 && (r.flags |= 256),
            (r.flags |= 65536),
            (r.lanes = d),
            s !== Ic && ((t = Error(a(422), { cause: s })), kl(Mn(t, l))))
          : (s !== Ic && ((r = Error(a(423), { cause: s })), kl(Mn(r, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (d &= -d),
            (t.lanes |= d),
            (s = Mn(s, l)),
            (d = Tf(t.stateNode, s, d)),
            nf(t, d),
            wt !== 4 && (wt = 2)),
        !1
      );
    var m = Error(a(520), { cause: s });
    if (
      ((m = Mn(m, l)),
      Vl === null ? (Vl = [m]) : Vl.push(m),
      wt !== 4 && (wt = 2),
      r === null)
    )
      return !0;
    ((s = Mn(s, l)), (l = r));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = d & -d),
            (l.lanes |= t),
            (t = Tf(l.stateNode, s, t)),
            nf(l, t),
            !1
          );
        case 1:
          if (
            ((r = l.type),
            (m = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof r.getDerivedStateFromError == "function" ||
                (m !== null &&
                  typeof m.componentDidCatch == "function" &&
                  (hi === null || !hi.has(m)))))
          )
            return (
              (l.flags |= 65536),
              (d &= -d),
              (l.lanes |= d),
              (d = Ng(d)),
              Mg(d, t, l, s),
              nf(l, d),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Rf = Error(a(461)),
    Nt = !1;
  function Xt(t, r, l, s) {
    r.child = t === null ? Um(r, null, l, s) : Gi(r, t.child, l, s);
  }
  function jg(t, r, l, s, d) {
    l = l.render;
    var m = r.ref;
    if ("ref" in s) {
      var b = {};
      for (var E in s) E !== "ref" && (b[E] = s[E]);
    } else b = s;
    return (
      Vi(r),
      (s = uf(t, r, l, b, m, d)),
      (E = cf()),
      t !== null && !Nt
        ? (ff(t, r, d), Dr(t, r, d))
        : (Ge && E && Vc(r), (r.flags |= 1), Xt(t, r, s, d), r.child)
    );
  }
  function Lg(t, r, l, s, d) {
    if (t === null) {
      var m = l.type;
      return typeof m == "function" &&
        !qc(m) &&
        m.defaultProps === void 0 &&
        l.compare === null
        ? ((r.tag = 15), (r.type = m), Bg(t, r, m, s, d))
        : ((t = os(l.type, null, s, r, r.mode, d)),
          (t.ref = r.ref),
          (t.return = r),
          (r.child = t));
    }
    if (((m = t.child), !Lf(t, d))) {
      var b = m.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : Sl), l(b, s) && t.ref === r.ref)
      )
        return Dr(t, r, d);
    }
    return (
      (r.flags |= 1),
      (t = _r(m, s)),
      (t.ref = r.ref),
      (t.return = r),
      (r.child = t)
    );
  }
  function Bg(t, r, l, s, d) {
    if (t !== null) {
      var m = t.memoizedProps;
      if (Sl(m, s) && t.ref === r.ref)
        if (((Nt = !1), (r.pendingProps = s = m), Lf(t, d)))
          (t.flags & 131072) !== 0 && (Nt = !0);
        else return ((r.lanes = t.lanes), Dr(t, r, d));
    }
    return Af(t, r, l, s, d);
  }
  function Ug(t, r, l, s) {
    var d = s.children,
      m = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        r.stateNode === null &&
        (r.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      s.mode === "hidden")
    ) {
      if ((r.flags & 128) !== 0) {
        if (((m = m !== null ? m.baseLanes | l : l), t !== null)) {
          for (s = r.child = t.child, d = 0; s !== null; )
            ((d = d | s.lanes | s.childLanes), (s = s.sibling));
          s = d & ~m;
        } else ((s = 0), (r.child = null));
        return Hg(t, r, m, l, s);
      }
      if ((l & 536870912) !== 0)
        ((r.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && fs(r, m !== null ? m.cachePool : null),
          m !== null ? Fm(r, m) : af(),
          Pm(r));
      else
        return (
          (s = r.lanes = 536870912),
          Hg(t, r, m !== null ? m.baseLanes | l : l, l, s)
        );
    } else
      m !== null
        ? (fs(r, m.cachePool), Fm(r, m), ui(), (r.memoizedState = null))
        : (t !== null && fs(r, null), af(), ui());
    return (Xt(t, r, d, l), r.child);
  }
  function Ll(t, r) {
    return (
      (t !== null && t.tag === 22) ||
        r.stateNode !== null ||
        (r.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      r.sibling
    );
  }
  function Hg(t, r, l, s, d) {
    var m = Jc();
    return (
      (m = m === null ? null : { parent: zt._currentValue, pool: m }),
      (r.memoizedState = { baseLanes: l, cachePool: m }),
      t !== null && fs(r, null),
      af(),
      Pm(r),
      t !== null && Ca(t, r, s, !0),
      (r.childLanes = d),
      null
    );
  }
  function Ts(t, r) {
    return (
      (r = As({ mode: r.mode, children: r.children }, t.mode)),
      (r.ref = t.ref),
      (t.child = r),
      (r.return = t),
      r
    );
  }
  function qg(t, r, l) {
    return (
      Gi(r, t.child, null, l),
      (t = Ts(r, r.pendingProps)),
      (t.flags |= 2),
      wn(r),
      (r.memoizedState = null),
      t
    );
  }
  function Aw(t, r, l) {
    var s = r.pendingProps,
      d = (r.flags & 128) !== 0;
    if (((r.flags &= -129), t === null)) {
      if (Ge) {
        if (s.mode === "hidden")
          return ((t = Ts(r, s)), (r.lanes = 536870912), Ll(null, t));
        if (
          (of(r),
          (t = gt)
            ? ((t = Jy(t, Bn)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((r.memoizedState = {
                  dehydrated: t,
                  treeContext: ti !== null ? { id: dr, overflow: hr } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Em(t)),
                (l.return = r),
                (r.child = l),
                (Yt = r),
                (gt = null)))
            : (t = null),
          t === null)
        )
          throw ri(r);
        return ((r.lanes = 536870912), null);
      }
      return Ts(r, s);
    }
    var m = t.memoizedState;
    if (m !== null) {
      var b = m.dehydrated;
      if ((of(r), d))
        if (r.flags & 256) ((r.flags &= -257), (r = qg(t, r, l)));
        else if (r.memoizedState !== null)
          ((r.child = t.child), (r.flags |= 128), (r = null));
        else throw Error(a(558));
      else if (
        (Nt || Ca(t, r, l, !1), (d = (l & t.childLanes) !== 0), Nt || d)
      ) {
        if (
          ((s = ct),
          s !== null && ((b = z(s, l)), b !== 0 && b !== m.retryLane))
        )
          throw ((m.retryLane = b), Hi(t, b), pn(s, t, b), Rf);
        (Us(), (r = qg(t, r, l)));
      } else
        ((t = m.treeContext),
          (gt = Hn(b.nextSibling)),
          (Yt = r),
          (Ge = !0),
          (ni = null),
          (Bn = !1),
          t !== null && _m(r, t),
          (r = Ts(r, s)),
          (r.flags |= 4096));
      return r;
    }
    return (
      (t = _r(t.child, { mode: s.mode, children: s.children })),
      (t.ref = r.ref),
      (r.child = t),
      (t.return = r),
      t
    );
  }
  function Rs(t, r) {
    var l = r.ref;
    if (l === null) t !== null && t.ref !== null && (r.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(a(284));
      (t === null || t.ref !== l) && (r.flags |= 4194816);
    }
  }
  function Af(t, r, l, s, d) {
    return (
      Vi(r),
      (l = uf(t, r, l, s, void 0, d)),
      (s = cf()),
      t !== null && !Nt
        ? (ff(t, r, d), Dr(t, r, d))
        : (Ge && s && Vc(r), (r.flags |= 1), Xt(t, r, l, d), r.child)
    );
  }
  function Fg(t, r, l, s, d, m) {
    return (
      Vi(r),
      (r.updateQueue = null),
      (l = Ym(r, s, l, d)),
      Vm(t),
      (s = cf()),
      t !== null && !Nt
        ? (ff(t, r, m), Dr(t, r, m))
        : (Ge && s && Vc(r), (r.flags |= 1), Xt(t, r, l, m), r.child)
    );
  }
  function Pg(t, r, l, s, d) {
    if ((Vi(r), r.stateNode === null)) {
      var m = Sa,
        b = l.contextType;
      (typeof b == "object" && b !== null && (m = It(b)),
        (m = new l(s, m)),
        (r.memoizedState =
          m.state !== null && m.state !== void 0 ? m.state : null),
        (m.updater = _f),
        (r.stateNode = m),
        (m._reactInternals = r),
        (m = r.stateNode),
        (m.props = s),
        (m.state = r.memoizedState),
        (m.refs = {}),
        ef(r),
        (b = l.contextType),
        (m.context = typeof b == "object" && b !== null ? It(b) : Sa),
        (m.state = r.memoizedState),
        (b = l.getDerivedStateFromProps),
        typeof b == "function" && (Cf(r, l, b, s), (m.state = r.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof m.getSnapshotBeforeUpdate == "function" ||
          (typeof m.UNSAFE_componentWillMount != "function" &&
            typeof m.componentWillMount != "function") ||
          ((b = m.state),
          typeof m.componentWillMount == "function" && m.componentWillMount(),
          typeof m.UNSAFE_componentWillMount == "function" &&
            m.UNSAFE_componentWillMount(),
          b !== m.state && _f.enqueueReplaceState(m, m.state, null),
          zl(r, s, m, d),
          Ol(),
          (m.state = r.memoizedState)),
        typeof m.componentDidMount == "function" && (r.flags |= 4194308),
        (s = !0));
    } else if (t === null) {
      m = r.stateNode;
      var E = r.memoizedProps,
        A = Ki(l, E);
      m.props = A;
      var V = m.context,
        W = l.contextType;
      ((b = Sa), typeof W == "object" && W !== null && (b = It(W)));
      var re = l.getDerivedStateFromProps;
      ((W =
        typeof re == "function" ||
        typeof m.getSnapshotBeforeUpdate == "function"),
        (E = r.pendingProps !== E),
        W ||
          (typeof m.UNSAFE_componentWillReceiveProps != "function" &&
            typeof m.componentWillReceiveProps != "function") ||
          ((E || V !== b) && Rg(r, m, s, b)),
        (ai = !1));
      var Y = r.memoizedState;
      ((m.state = Y),
        zl(r, s, m, d),
        Ol(),
        (V = r.memoizedState),
        E || Y !== V || ai
          ? (typeof re == "function" &&
              (Cf(r, l, re, s), (V = r.memoizedState)),
            (A = ai || Tg(r, l, A, s, Y, V, b))
              ? (W ||
                  (typeof m.UNSAFE_componentWillMount != "function" &&
                    typeof m.componentWillMount != "function") ||
                  (typeof m.componentWillMount == "function" &&
                    m.componentWillMount(),
                  typeof m.UNSAFE_componentWillMount == "function" &&
                    m.UNSAFE_componentWillMount()),
                typeof m.componentDidMount == "function" &&
                  (r.flags |= 4194308))
              : (typeof m.componentDidMount == "function" &&
                  (r.flags |= 4194308),
                (r.memoizedProps = s),
                (r.memoizedState = V)),
            (m.props = s),
            (m.state = V),
            (m.context = b),
            (s = A))
          : (typeof m.componentDidMount == "function" && (r.flags |= 4194308),
            (s = !1)));
    } else {
      ((m = r.stateNode),
        tf(t, r),
        (b = r.memoizedProps),
        (W = Ki(l, b)),
        (m.props = W),
        (re = r.pendingProps),
        (Y = m.context),
        (V = l.contextType),
        (A = Sa),
        typeof V == "object" && V !== null && (A = It(V)),
        (E = l.getDerivedStateFromProps),
        (V =
          typeof E == "function" ||
          typeof m.getSnapshotBeforeUpdate == "function") ||
          (typeof m.UNSAFE_componentWillReceiveProps != "function" &&
            typeof m.componentWillReceiveProps != "function") ||
          ((b !== re || Y !== A) && Rg(r, m, s, A)),
        (ai = !1),
        (Y = r.memoizedState),
        (m.state = Y),
        zl(r, s, m, d),
        Ol());
      var Q = r.memoizedState;
      b !== re ||
      Y !== Q ||
      ai ||
      (t !== null && t.dependencies !== null && us(t.dependencies))
        ? (typeof E == "function" && (Cf(r, l, E, s), (Q = r.memoizedState)),
          (W =
            ai ||
            Tg(r, l, W, s, Y, Q, A) ||
            (t !== null && t.dependencies !== null && us(t.dependencies)))
            ? (V ||
                (typeof m.UNSAFE_componentWillUpdate != "function" &&
                  typeof m.componentWillUpdate != "function") ||
                (typeof m.componentWillUpdate == "function" &&
                  m.componentWillUpdate(s, Q, A),
                typeof m.UNSAFE_componentWillUpdate == "function" &&
                  m.UNSAFE_componentWillUpdate(s, Q, A)),
              typeof m.componentDidUpdate == "function" && (r.flags |= 4),
              typeof m.getSnapshotBeforeUpdate == "function" &&
                (r.flags |= 1024))
            : (typeof m.componentDidUpdate != "function" ||
                (b === t.memoizedProps && Y === t.memoizedState) ||
                (r.flags |= 4),
              typeof m.getSnapshotBeforeUpdate != "function" ||
                (b === t.memoizedProps && Y === t.memoizedState) ||
                (r.flags |= 1024),
              (r.memoizedProps = s),
              (r.memoizedState = Q)),
          (m.props = s),
          (m.state = Q),
          (m.context = A),
          (s = W))
        : (typeof m.componentDidUpdate != "function" ||
            (b === t.memoizedProps && Y === t.memoizedState) ||
            (r.flags |= 4),
          typeof m.getSnapshotBeforeUpdate != "function" ||
            (b === t.memoizedProps && Y === t.memoizedState) ||
            (r.flags |= 1024),
          (s = !1));
    }
    return (
      (m = s),
      Rs(t, r),
      (s = (r.flags & 128) !== 0),
      m || s
        ? ((m = r.stateNode),
          (l =
            s && typeof l.getDerivedStateFromError != "function"
              ? null
              : m.render()),
          (r.flags |= 1),
          t !== null && s
            ? ((r.child = Gi(r, t.child, null, d)),
              (r.child = Gi(r, null, l, d)))
            : Xt(t, r, l, d),
          (r.memoizedState = m.state),
          (t = r.child))
        : (t = Dr(t, r, d)),
      t
    );
  }
  function Vg(t, r, l, s) {
    return (Fi(), (r.flags |= 256), Xt(t, r, l, s), r.child);
  }
  var Of = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function zf(t) {
    return { baseLanes: t, cachePool: Dm() };
  }
  function Df(t, r, l) {
    return ((t = t !== null ? t.childLanes & ~l : 0), r && (t |= kn), t);
  }
  function Yg(t, r, l) {
    var s = r.pendingProps,
      d = !1,
      m = (r.flags & 128) !== 0,
      b;
    if (
      ((b = m) ||
        (b =
          t !== null && t.memoizedState === null ? !1 : (_t.current & 2) !== 0),
      b && ((d = !0), (r.flags &= -129)),
      (b = (r.flags & 32) !== 0),
      (r.flags &= -33),
      t === null)
    ) {
      if (Ge) {
        if (
          (d ? si(r) : ui(),
          (t = gt)
            ? ((t = Jy(t, Bn)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((r.memoizedState = {
                  dehydrated: t,
                  treeContext: ti !== null ? { id: dr, overflow: hr } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Em(t)),
                (l.return = r),
                (r.child = l),
                (Yt = r),
                (gt = null)))
            : (t = null),
          t === null)
        )
          throw ri(r);
        return (pd(t) ? (r.lanes = 32) : (r.lanes = 536870912), null);
      }
      var E = s.children;
      return (
        (s = s.fallback),
        d
          ? (ui(),
            (d = r.mode),
            (E = As({ mode: "hidden", children: E }, d)),
            (s = qi(s, d, l, null)),
            (E.return = r),
            (s.return = r),
            (E.sibling = s),
            (r.child = E),
            (s = r.child),
            (s.memoizedState = zf(l)),
            (s.childLanes = Df(t, b, l)),
            (r.memoizedState = Of),
            Ll(null, s))
          : (si(r), Nf(r, E))
      );
    }
    var A = t.memoizedState;
    if (A !== null && ((E = A.dehydrated), E !== null)) {
      if (m)
        r.flags & 256
          ? (si(r), (r.flags &= -257), (r = Mf(t, r, l)))
          : r.memoizedState !== null
            ? (ui(), (r.child = t.child), (r.flags |= 128), (r = null))
            : (ui(),
              (E = s.fallback),
              (d = r.mode),
              (s = As({ mode: "visible", children: s.children }, d)),
              (E = qi(E, d, l, null)),
              (E.flags |= 2),
              (s.return = r),
              (E.return = r),
              (s.sibling = E),
              (r.child = s),
              Gi(r, t.child, null, l),
              (s = r.child),
              (s.memoizedState = zf(l)),
              (s.childLanes = Df(t, b, l)),
              (r.memoizedState = Of),
              (r = Ll(null, s)));
      else if ((si(r), pd(E))) {
        if (((b = E.nextSibling && E.nextSibling.dataset), b)) var V = b.dgst;
        ((b = V),
          (s = Error(a(419))),
          (s.stack = ""),
          (s.digest = b),
          kl({ value: s, source: null, stack: null }),
          (r = Mf(t, r, l)));
      } else if (
        (Nt || Ca(t, r, l, !1), (b = (l & t.childLanes) !== 0), Nt || b)
      ) {
        if (
          ((b = ct),
          b !== null && ((s = z(b, l)), s !== 0 && s !== A.retryLane))
        )
          throw ((A.retryLane = s), Hi(t, s), pn(b, t, s), Rf);
        (hd(E) || Us(), (r = Mf(t, r, l)));
      } else
        hd(E)
          ? ((r.flags |= 192), (r.child = t.child), (r = null))
          : ((t = A.treeContext),
            (gt = Hn(E.nextSibling)),
            (Yt = r),
            (Ge = !0),
            (ni = null),
            (Bn = !1),
            t !== null && _m(r, t),
            (r = Nf(r, s.children)),
            (r.flags |= 4096));
      return r;
    }
    return d
      ? (ui(),
        (E = s.fallback),
        (d = r.mode),
        (A = t.child),
        (V = A.sibling),
        (s = _r(A, { mode: "hidden", children: s.children })),
        (s.subtreeFlags = A.subtreeFlags & 65011712),
        V !== null ? (E = _r(V, E)) : ((E = qi(E, d, l, null)), (E.flags |= 2)),
        (E.return = r),
        (s.return = r),
        (s.sibling = E),
        (r.child = s),
        Ll(null, s),
        (s = r.child),
        (E = t.child.memoizedState),
        E === null
          ? (E = zf(l))
          : ((d = E.cachePool),
            d !== null
              ? ((A = zt._currentValue),
                (d = d.parent !== A ? { parent: A, pool: A } : d))
              : (d = Dm()),
            (E = { baseLanes: E.baseLanes | l, cachePool: d })),
        (s.memoizedState = E),
        (s.childLanes = Df(t, b, l)),
        (r.memoizedState = Of),
        Ll(t.child, s))
      : (si(r),
        (l = t.child),
        (t = l.sibling),
        (l = _r(l, { mode: "visible", children: s.children })),
        (l.return = r),
        (l.sibling = null),
        t !== null &&
          ((b = r.deletions),
          b === null ? ((r.deletions = [t]), (r.flags |= 16)) : b.push(t)),
        (r.child = l),
        (r.memoizedState = null),
        l);
  }
  function Nf(t, r) {
    return (
      (r = As({ mode: "visible", children: r }, t.mode)),
      (r.return = t),
      (t.child = r)
    );
  }
  function As(t, r) {
    return ((t = vn(22, t, null, r)), (t.lanes = 0), t);
  }
  function Mf(t, r, l) {
    return (
      Gi(r, t.child, null, l),
      (t = Nf(r, r.pendingProps.children)),
      (t.flags |= 2),
      (r.memoizedState = null),
      t
    );
  }
  function Ig(t, r, l) {
    t.lanes |= r;
    var s = t.alternate;
    (s !== null && (s.lanes |= r), Qc(t.return, r, l));
  }
  function jf(t, r, l, s, d, m) {
    var b = t.memoizedState;
    b === null
      ? (t.memoizedState = {
          isBackwards: r,
          rendering: null,
          renderingStartTime: 0,
          last: s,
          tail: l,
          tailMode: d,
          treeForkCount: m,
        })
      : ((b.isBackwards = r),
        (b.rendering = null),
        (b.renderingStartTime = 0),
        (b.last = s),
        (b.tail = l),
        (b.tailMode = d),
        (b.treeForkCount = m));
  }
  function Xg(t, r, l) {
    var s = r.pendingProps,
      d = s.revealOrder,
      m = s.tail;
    s = s.children;
    var b = _t.current,
      E = (b & 2) !== 0;
    if (
      (E ? ((b = (b & 1) | 2), (r.flags |= 128)) : (b &= 1),
      C(_t, b),
      Xt(t, r, s, l),
      (s = Ge ? El : 0),
      !E && t !== null && (t.flags & 128) !== 0)
    )
      e: for (t = r.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Ig(t, l, r);
        else if (t.tag === 19) Ig(t, l, r);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === r) break e;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === r) break e;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (d) {
      case "forwards":
        for (l = r.child, d = null; l !== null; )
          ((t = l.alternate),
            t !== null && ys(t) === null && (d = l),
            (l = l.sibling));
        ((l = d),
          l === null
            ? ((d = r.child), (r.child = null))
            : ((d = l.sibling), (l.sibling = null)),
          jf(r, !1, d, l, m, s));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, d = r.child, r.child = null; d !== null; ) {
          if (((t = d.alternate), t !== null && ys(t) === null)) {
            r.child = d;
            break;
          }
          ((t = d.sibling), (d.sibling = l), (l = d), (d = t));
        }
        jf(r, !0, l, null, m, s);
        break;
      case "together":
        jf(r, !1, null, null, void 0, s);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Dr(t, r, l) {
    if (
      (t !== null && (r.dependencies = t.dependencies),
      (di |= r.lanes),
      (l & r.childLanes) === 0)
    )
      if (t !== null) {
        if ((Ca(t, r, l, !1), (l & r.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && r.child !== t.child) throw Error(a(153));
    if (r.child !== null) {
      for (
        t = r.child, l = _r(t, t.pendingProps), r.child = l, l.return = r;
        t.sibling !== null;
      )
        ((t = t.sibling),
          (l = l.sibling = _r(t, t.pendingProps)),
          (l.return = r));
      l.sibling = null;
    }
    return r.child;
  }
  function Lf(t, r) {
    return (t.lanes & r) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && us(t)));
  }
  function Ow(t, r, l) {
    switch (r.tag) {
      case 3:
        (rt(r, r.stateNode.containerInfo),
          ii(r, zt, t.memoizedState.cache),
          Fi());
        break;
      case 27:
      case 5:
        on(r);
        break;
      case 4:
        rt(r, r.stateNode.containerInfo);
        break;
      case 10:
        ii(r, r.type, r.memoizedProps.value);
        break;
      case 31:
        if (r.memoizedState !== null) return ((r.flags |= 128), of(r), null);
        break;
      case 13:
        var s = r.memoizedState;
        if (s !== null)
          return s.dehydrated !== null
            ? (si(r), (r.flags |= 128), null)
            : (l & r.child.childLanes) !== 0
              ? Yg(t, r, l)
              : (si(r), (t = Dr(t, r, l)), t !== null ? t.sibling : null);
        si(r);
        break;
      case 19:
        var d = (t.flags & 128) !== 0;
        if (
          ((s = (l & r.childLanes) !== 0),
          s || (Ca(t, r, l, !1), (s = (l & r.childLanes) !== 0)),
          d)
        ) {
          if (s) return Xg(t, r, l);
          r.flags |= 128;
        }
        if (
          ((d = r.memoizedState),
          d !== null &&
            ((d.rendering = null), (d.tail = null), (d.lastEffect = null)),
          C(_t, _t.current),
          s)
        )
          break;
        return null;
      case 22:
        return ((r.lanes = 0), Ug(t, r, l, r.pendingProps));
      case 24:
        ii(r, zt, t.memoizedState.cache);
    }
    return Dr(t, r, l);
  }
  function Gg(t, r, l) {
    if (t !== null)
      if (t.memoizedProps !== r.pendingProps) Nt = !0;
      else {
        if (!Lf(t, l) && (r.flags & 128) === 0) return ((Nt = !1), Ow(t, r, l));
        Nt = (t.flags & 131072) !== 0;
      }
    else ((Nt = !1), Ge && (r.flags & 1048576) !== 0 && Cm(r, El, r.index));
    switch (((r.lanes = 0), r.tag)) {
      case 16:
        e: {
          var s = r.pendingProps;
          if (((t = Ii(r.elementType)), (r.type = t), typeof t == "function"))
            qc(t)
              ? ((s = Ki(t, s)), (r.tag = 1), (r = Pg(null, r, t, s, l)))
              : ((r.tag = 0), (r = Af(null, r, t, s, l)));
          else {
            if (t != null) {
              var d = t.$$typeof;
              if (d === $) {
                ((r.tag = 11), (r = jg(null, r, t, s, l)));
                break e;
              } else if (d === K) {
                ((r.tag = 14), (r = Lg(null, r, t, s, l)));
                break e;
              }
            }
            throw ((r = le(t) || t), Error(a(306, r, "")));
          }
        }
        return r;
      case 0:
        return Af(t, r, r.type, r.pendingProps, l);
      case 1:
        return ((s = r.type), (d = Ki(s, r.pendingProps)), Pg(t, r, s, d, l));
      case 3:
        e: {
          if ((rt(r, r.stateNode.containerInfo), t === null))
            throw Error(a(387));
          s = r.pendingProps;
          var m = r.memoizedState;
          ((d = m.element), tf(t, r), zl(r, s, null, l));
          var b = r.memoizedState;
          if (
            ((s = b.cache),
            ii(r, zt, s),
            s !== m.cache && Kc(r, [zt], l, !0),
            Ol(),
            (s = b.element),
            m.isDehydrated)
          )
            if (
              ((m = { element: s, isDehydrated: !1, cache: b.cache }),
              (r.updateQueue.baseState = m),
              (r.memoizedState = m),
              r.flags & 256)
            ) {
              r = Vg(t, r, s, l);
              break e;
            } else if (s !== d) {
              ((d = Mn(Error(a(424)), r)), kl(d), (r = Vg(t, r, s, l)));
              break e;
            } else
              for (
                t = r.stateNode.containerInfo,
                  t.nodeType === 9
                    ? (t = t.body)
                    : (t = t.nodeName === "HTML" ? t.ownerDocument.body : t),
                  gt = Hn(t.firstChild),
                  Yt = r,
                  Ge = !0,
                  ni = null,
                  Bn = !0,
                  l = Um(r, null, s, l),
                  r.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          else {
            if ((Fi(), s === d)) {
              r = Dr(t, r, l);
              break e;
            }
            Xt(t, r, s, l);
          }
          r = r.child;
        }
        return r;
      case 26:
        return (
          Rs(t, r),
          t === null
            ? (l = i0(r.type, null, r.pendingProps, null))
              ? (r.memoizedState = l)
              : Ge ||
                ((l = r.type),
                (t = r.pendingProps),
                (s = Is(be.current).createElement(l)),
                (s[pe] = r),
                (s[ge] = t),
                Gt(s, l, t),
                dt(s),
                (r.stateNode = s))
            : (r.memoizedState = i0(
                r.type,
                t.memoizedProps,
                r.pendingProps,
                t.memoizedState,
              )),
          null
        );
      case 27:
        return (
          on(r),
          t === null &&
            Ge &&
            ((s = r.stateNode = t0(r.type, r.pendingProps, be.current)),
            (Yt = r),
            (Bn = !0),
            (d = gt),
            yi(r.type) ? ((md = d), (gt = Hn(s.firstChild))) : (gt = d)),
          Xt(t, r, r.pendingProps.children, l),
          Rs(t, r),
          t === null && (r.flags |= 4194304),
          r.child
        );
      case 5:
        return (
          t === null &&
            Ge &&
            ((d = s = gt) &&
              ((s = l2(s, r.type, r.pendingProps, Bn)),
              s !== null
                ? ((r.stateNode = s),
                  (Yt = r),
                  (gt = Hn(s.firstChild)),
                  (Bn = !1),
                  (d = !0))
                : (d = !1)),
            d || ri(r)),
          on(r),
          (d = r.type),
          (m = r.pendingProps),
          (b = t !== null ? t.memoizedProps : null),
          (s = m.children),
          cd(d, m) ? (s = null) : b !== null && cd(d, b) && (r.flags |= 32),
          r.memoizedState !== null &&
            ((d = uf(t, r, Sw, null, null, l)), ($l._currentValue = d)),
          Rs(t, r),
          Xt(t, r, s, l),
          r.child
        );
      case 6:
        return (
          t === null &&
            Ge &&
            ((t = l = gt) &&
              ((l = o2(l, r.pendingProps, Bn)),
              l !== null
                ? ((r.stateNode = l), (Yt = r), (gt = null), (t = !0))
                : (t = !1)),
            t || ri(r)),
          null
        );
      case 13:
        return Yg(t, r, l);
      case 4:
        return (
          rt(r, r.stateNode.containerInfo),
          (s = r.pendingProps),
          t === null ? (r.child = Gi(r, null, s, l)) : Xt(t, r, s, l),
          r.child
        );
      case 11:
        return jg(t, r, r.type, r.pendingProps, l);
      case 7:
        return (Xt(t, r, r.pendingProps, l), r.child);
      case 8:
        return (Xt(t, r, r.pendingProps.children, l), r.child);
      case 12:
        return (Xt(t, r, r.pendingProps.children, l), r.child);
      case 10:
        return (
          (s = r.pendingProps),
          ii(r, r.type, s.value),
          Xt(t, r, s.children, l),
          r.child
        );
      case 9:
        return (
          (d = r.type._context),
          (s = r.pendingProps.children),
          Vi(r),
          (d = It(d)),
          (s = s(d)),
          (r.flags |= 1),
          Xt(t, r, s, l),
          r.child
        );
      case 14:
        return Lg(t, r, r.type, r.pendingProps, l);
      case 15:
        return Bg(t, r, r.type, r.pendingProps, l);
      case 19:
        return Xg(t, r, l);
      case 31:
        return Aw(t, r, l);
      case 22:
        return Ug(t, r, l, r.pendingProps);
      case 24:
        return (
          Vi(r),
          (s = It(zt)),
          t === null
            ? ((d = Jc()),
              d === null &&
                ((d = ct),
                (m = Zc()),
                (d.pooledCache = m),
                m.refCount++,
                m !== null && (d.pooledCacheLanes |= l),
                (d = m)),
              (r.memoizedState = { parent: s, cache: d }),
              ef(r),
              ii(r, zt, d))
            : ((t.lanes & l) !== 0 && (tf(t, r), zl(r, null, null, l), Ol()),
              (d = t.memoizedState),
              (m = r.memoizedState),
              d.parent !== s
                ? ((d = { parent: s, cache: s }),
                  (r.memoizedState = d),
                  r.lanes === 0 &&
                    (r.memoizedState = r.updateQueue.baseState = d),
                  ii(r, zt, s))
                : ((s = m.cache),
                  ii(r, zt, s),
                  s !== d.cache && Kc(r, [zt], l, !0))),
          Xt(t, r, r.pendingProps.children, l),
          r.child
        );
      case 29:
        throw r.pendingProps;
    }
    throw Error(a(156, r.tag));
  }
  function Nr(t) {
    t.flags |= 4;
  }
  function Bf(t, r, l, s, d) {
    if (((r = (t.mode & 32) !== 0) && (r = !1), r)) {
      if (((t.flags |= 16777216), (d & 335544128) === d))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (vy()) t.flags |= 8192;
        else throw ((Xi = hs), Wc);
    } else t.flags &= -16777217;
  }
  function Qg(t, r) {
    if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !u0(r)))
      if (vy()) t.flags |= 8192;
      else throw ((Xi = hs), Wc);
  }
  function Os(t, r) {
    (r !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((r = t.tag !== 22 ? hl() : 536870912), (t.lanes |= r), (Ba |= r)));
  }
  function Bl(t, r) {
    if (!Ge)
      switch (t.tailMode) {
        case "hidden":
          r = t.tail;
          for (var l = null; r !== null; )
            (r.alternate !== null && (l = r), (r = r.sibling));
          l === null ? (t.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = t.tail;
          for (var s = null; l !== null; )
            (l.alternate !== null && (s = l), (l = l.sibling));
          s === null
            ? r || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (s.sibling = null);
      }
  }
  function yt(t) {
    var r = t.alternate !== null && t.alternate.child === t.child,
      l = 0,
      s = 0;
    if (r)
      for (var d = t.child; d !== null; )
        ((l |= d.lanes | d.childLanes),
          (s |= d.subtreeFlags & 65011712),
          (s |= d.flags & 65011712),
          (d.return = t),
          (d = d.sibling));
    else
      for (d = t.child; d !== null; )
        ((l |= d.lanes | d.childLanes),
          (s |= d.subtreeFlags),
          (s |= d.flags),
          (d.return = t),
          (d = d.sibling));
    return ((t.subtreeFlags |= s), (t.childLanes = l), r);
  }
  function zw(t, r, l) {
    var s = r.pendingProps;
    switch ((Yc(r), r.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (yt(r), null);
      case 1:
        return (yt(r), null);
      case 3:
        return (
          (l = r.stateNode),
          (s = null),
          t !== null && (s = t.memoizedState.cache),
          r.memoizedState.cache !== s && (r.flags |= 2048),
          Ar(zt),
          Ke(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (ka(r)
              ? Nr(r)
              : t === null ||
                (t.memoizedState.isDehydrated && (r.flags & 256) === 0) ||
                ((r.flags |= 1024), Xc())),
          yt(r),
          null
        );
      case 26:
        var d = r.type,
          m = r.memoizedState;
        return (
          t === null
            ? (Nr(r),
              m !== null ? (yt(r), Qg(r, m)) : (yt(r), Bf(r, d, null, s, l)))
            : m
              ? m !== t.memoizedState
                ? (Nr(r), yt(r), Qg(r, m))
                : (yt(r), (r.flags &= -16777217))
              : ((t = t.memoizedProps),
                t !== s && Nr(r),
                yt(r),
                Bf(r, d, t, s, l)),
          null
        );
      case 27:
        if (
          (Xn(r),
          (l = be.current),
          (d = r.type),
          t !== null && r.stateNode != null)
        )
          t.memoizedProps !== s && Nr(r);
        else {
          if (!s) {
            if (r.stateNode === null) throw Error(a(166));
            return (yt(r), null);
          }
          ((t = se.current),
            ka(r) ? Tm(r) : ((t = t0(d, s, l)), (r.stateNode = t), Nr(r)));
        }
        return (yt(r), null);
      case 5:
        if ((Xn(r), (d = r.type), t !== null && r.stateNode != null))
          t.memoizedProps !== s && Nr(r);
        else {
          if (!s) {
            if (r.stateNode === null) throw Error(a(166));
            return (yt(r), null);
          }
          if (((m = se.current), ka(r))) Tm(r);
          else {
            var b = Is(be.current);
            switch (m) {
              case 1:
                m = b.createElementNS("http://www.w3.org/2000/svg", d);
                break;
              case 2:
                m = b.createElementNS("http://www.w3.org/1998/Math/MathML", d);
                break;
              default:
                switch (d) {
                  case "svg":
                    m = b.createElementNS("http://www.w3.org/2000/svg", d);
                    break;
                  case "math":
                    m = b.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      d,
                    );
                    break;
                  case "script":
                    ((m = b.createElement("div")),
                      (m.innerHTML = "<script><\/script>"),
                      (m = m.removeChild(m.firstChild)));
                    break;
                  case "select":
                    ((m =
                      typeof s.is == "string"
                        ? b.createElement("select", { is: s.is })
                        : b.createElement("select")),
                      s.multiple
                        ? (m.multiple = !0)
                        : s.size && (m.size = s.size));
                    break;
                  default:
                    m =
                      typeof s.is == "string"
                        ? b.createElement(d, { is: s.is })
                        : b.createElement(d);
                }
            }
            ((m[pe] = r), (m[ge] = s));
            e: for (b = r.child; b !== null; ) {
              if (b.tag === 5 || b.tag === 6) m.appendChild(b.stateNode);
              else if (b.tag !== 4 && b.tag !== 27 && b.child !== null) {
                ((b.child.return = b), (b = b.child));
                continue;
              }
              if (b === r) break e;
              for (; b.sibling === null; ) {
                if (b.return === null || b.return === r) break e;
                b = b.return;
              }
              ((b.sibling.return = b.return), (b = b.sibling));
            }
            r.stateNode = m;
            e: switch ((Gt(m, d, s), d)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break e;
              case "img":
                s = !0;
                break e;
              default:
                s = !1;
            }
            s && Nr(r);
          }
        }
        return (
          yt(r),
          Bf(r, r.type, t === null ? null : t.memoizedProps, r.pendingProps, l),
          null
        );
      case 6:
        if (t && r.stateNode != null) t.memoizedProps !== s && Nr(r);
        else {
          if (typeof s != "string" && r.stateNode === null) throw Error(a(166));
          if (((t = be.current), ka(r))) {
            if (
              ((t = r.stateNode),
              (l = r.memoizedProps),
              (s = null),
              (d = Yt),
              d !== null)
            )
              switch (d.tag) {
                case 27:
                case 5:
                  s = d.memoizedProps;
              }
            ((t[pe] = r),
              (t = !!(
                t.nodeValue === l ||
                (s !== null && s.suppressHydrationWarning === !0) ||
                Yy(t.nodeValue, l)
              )),
              t || ri(r, !0));
          } else
            ((t = Is(t).createTextNode(s)), (t[pe] = r), (r.stateNode = t));
        }
        return (yt(r), null);
      case 31:
        if (((l = r.memoizedState), t === null || t.memoizedState !== null)) {
          if (((s = ka(r)), l !== null)) {
            if (t === null) {
              if (!s) throw Error(a(318));
              if (
                ((t = r.memoizedState),
                (t = t !== null ? t.dehydrated : null),
                !t)
              )
                throw Error(a(557));
              t[pe] = r;
            } else
              (Fi(),
                (r.flags & 128) === 0 && (r.memoizedState = null),
                (r.flags |= 4));
            (yt(r), (t = !1));
          } else
            ((l = Xc()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = l),
              (t = !0));
          if (!t) return r.flags & 256 ? (wn(r), r) : (wn(r), null);
          if ((r.flags & 128) !== 0) throw Error(a(558));
        }
        return (yt(r), null);
      case 13:
        if (
          ((s = r.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((d = ka(r)), s !== null && s.dehydrated !== null)) {
            if (t === null) {
              if (!d) throw Error(a(318));
              if (
                ((d = r.memoizedState),
                (d = d !== null ? d.dehydrated : null),
                !d)
              )
                throw Error(a(317));
              d[pe] = r;
            } else
              (Fi(),
                (r.flags & 128) === 0 && (r.memoizedState = null),
                (r.flags |= 4));
            (yt(r), (d = !1));
          } else
            ((d = Xc()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = d),
              (d = !0));
          if (!d) return r.flags & 256 ? (wn(r), r) : (wn(r), null);
        }
        return (
          wn(r),
          (r.flags & 128) !== 0
            ? ((r.lanes = l), r)
            : ((l = s !== null),
              (t = t !== null && t.memoizedState !== null),
              l &&
                ((s = r.child),
                (d = null),
                s.alternate !== null &&
                  s.alternate.memoizedState !== null &&
                  s.alternate.memoizedState.cachePool !== null &&
                  (d = s.alternate.memoizedState.cachePool.pool),
                (m = null),
                s.memoizedState !== null &&
                  s.memoizedState.cachePool !== null &&
                  (m = s.memoizedState.cachePool.pool),
                m !== d && (s.flags |= 2048)),
              l !== t && l && (r.child.flags |= 8192),
              Os(r, r.updateQueue),
              yt(r),
              null)
        );
      case 4:
        return (Ke(), t === null && ad(r.stateNode.containerInfo), yt(r), null);
      case 10:
        return (Ar(r.type), yt(r), null);
      case 19:
        if ((G(_t), (s = r.memoizedState), s === null)) return (yt(r), null);
        if (((d = (r.flags & 128) !== 0), (m = s.rendering), m === null))
          if (d) Bl(s, !1);
          else {
            if (wt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = r.child; t !== null; ) {
                if (((m = ys(t)), m !== null)) {
                  for (
                    r.flags |= 128,
                      Bl(s, !1),
                      t = m.updateQueue,
                      r.updateQueue = t,
                      Os(r, t),
                      r.subtreeFlags = 0,
                      t = l,
                      l = r.child;
                    l !== null;
                  )
                    (wm(l, t), (l = l.sibling));
                  return (
                    C(_t, (_t.current & 1) | 2),
                    Ge && Tr(r, s.treeForkCount),
                    r.child
                  );
                }
                t = t.sibling;
              }
            s.tail !== null &&
              Vt() > js &&
              ((r.flags |= 128), (d = !0), Bl(s, !1), (r.lanes = 4194304));
          }
        else {
          if (!d)
            if (((t = ys(m)), t !== null)) {
              if (
                ((r.flags |= 128),
                (d = !0),
                (t = t.updateQueue),
                (r.updateQueue = t),
                Os(r, t),
                Bl(s, !0),
                s.tail === null &&
                  s.tailMode === "hidden" &&
                  !m.alternate &&
                  !Ge)
              )
                return (yt(r), null);
            } else
              2 * Vt() - s.renderingStartTime > js &&
                l !== 536870912 &&
                ((r.flags |= 128), (d = !0), Bl(s, !1), (r.lanes = 4194304));
          s.isBackwards
            ? ((m.sibling = r.child), (r.child = m))
            : ((t = s.last),
              t !== null ? (t.sibling = m) : (r.child = m),
              (s.last = m));
        }
        return s.tail !== null
          ? ((t = s.tail),
            (s.rendering = t),
            (s.tail = t.sibling),
            (s.renderingStartTime = Vt()),
            (t.sibling = null),
            (l = _t.current),
            C(_t, d ? (l & 1) | 2 : l & 1),
            Ge && Tr(r, s.treeForkCount),
            t)
          : (yt(r), null);
      case 22:
      case 23:
        return (
          wn(r),
          lf(),
          (s = r.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== s && (r.flags |= 8192)
            : s && (r.flags |= 8192),
          s
            ? (l & 536870912) !== 0 &&
              (r.flags & 128) === 0 &&
              (yt(r), r.subtreeFlags & 6 && (r.flags |= 8192))
            : yt(r),
          (l = r.updateQueue),
          l !== null && Os(r, l.retryQueue),
          (l = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          (s = null),
          r.memoizedState !== null &&
            r.memoizedState.cachePool !== null &&
            (s = r.memoizedState.cachePool.pool),
          s !== l && (r.flags |= 2048),
          t !== null && G(Yi),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          r.memoizedState.cache !== l && (r.flags |= 2048),
          Ar(zt),
          yt(r),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, r.tag));
  }
  function Dw(t, r) {
    switch ((Yc(r), r.tag)) {
      case 1:
        return (
          (t = r.flags),
          t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
        );
      case 3:
        return (
          Ar(zt),
          Ke(),
          (t = r.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((r.flags = (t & -65537) | 128), r)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (Xn(r), null);
      case 31:
        if (r.memoizedState !== null) {
          if ((wn(r), r.alternate === null)) throw Error(a(340));
          Fi();
        }
        return (
          (t = r.flags),
          t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
        );
      case 13:
        if (
          (wn(r), (t = r.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (r.alternate === null) throw Error(a(340));
          Fi();
        }
        return (
          (t = r.flags),
          t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
        );
      case 19:
        return (G(_t), null);
      case 4:
        return (Ke(), null);
      case 10:
        return (Ar(r.type), null);
      case 22:
      case 23:
        return (
          wn(r),
          lf(),
          t !== null && G(Yi),
          (t = r.flags),
          t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
        );
      case 24:
        return (Ar(zt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kg(t, r) {
    switch ((Yc(r), r.tag)) {
      case 3:
        (Ar(zt), Ke());
        break;
      case 26:
      case 27:
      case 5:
        Xn(r);
        break;
      case 4:
        Ke();
        break;
      case 31:
        r.memoizedState !== null && wn(r);
        break;
      case 13:
        wn(r);
        break;
      case 19:
        G(_t);
        break;
      case 10:
        Ar(r.type);
        break;
      case 22:
      case 23:
        (wn(r), lf(), t !== null && G(Yi));
        break;
      case 24:
        Ar(zt);
    }
  }
  function Ul(t, r) {
    try {
      var l = r.updateQueue,
        s = l !== null ? l.lastEffect : null;
      if (s !== null) {
        var d = s.next;
        l = d;
        do {
          if ((l.tag & t) === t) {
            s = void 0;
            var m = l.create,
              b = l.inst;
            ((s = m()), (b.destroy = s));
          }
          l = l.next;
        } while (l !== d);
      }
    } catch (E) {
      at(r, r.return, E);
    }
  }
  function ci(t, r, l) {
    try {
      var s = r.updateQueue,
        d = s !== null ? s.lastEffect : null;
      if (d !== null) {
        var m = d.next;
        s = m;
        do {
          if ((s.tag & t) === t) {
            var b = s.inst,
              E = b.destroy;
            if (E !== void 0) {
              ((b.destroy = void 0), (d = r));
              var A = l,
                V = E;
              try {
                V();
              } catch (W) {
                at(d, A, W);
              }
            }
          }
          s = s.next;
        } while (s !== m);
      }
    } catch (W) {
      at(r, r.return, W);
    }
  }
  function Zg(t) {
    var r = t.updateQueue;
    if (r !== null) {
      var l = t.stateNode;
      try {
        qm(r, l);
      } catch (s) {
        at(t, t.return, s);
      }
    }
  }
  function $g(t, r, l) {
    ((l.props = Ki(t.type, t.memoizedProps)), (l.state = t.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (s) {
      at(t, r, s);
    }
  }
  function Hl(t, r) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var s = t.stateNode;
            break;
          case 30:
            s = t.stateNode;
            break;
          default:
            s = t.stateNode;
        }
        typeof l == "function" ? (t.refCleanup = l(s)) : (l.current = s);
      }
    } catch (d) {
      at(t, r, d);
    }
  }
  function pr(t, r) {
    var l = t.ref,
      s = t.refCleanup;
    if (l !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (d) {
          at(t, r, d);
        } finally {
          ((t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null));
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (d) {
          at(t, r, d);
        }
      else l.current = null;
  }
  function Jg(t) {
    var r = t.type,
      l = t.memoizedProps,
      s = t.stateNode;
    try {
      e: switch (r) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && s.focus();
          break e;
        case "img":
          l.src ? (s.src = l.src) : l.srcSet && (s.srcset = l.srcSet);
      }
    } catch (d) {
      at(t, t.return, d);
    }
  }
  function Uf(t, r, l) {
    try {
      var s = t.stateNode;
      (e2(s, t.type, l, r), (s[ge] = r));
    } catch (d) {
      at(t, t.return, d);
    }
  }
  function Wg(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && yi(t.type)) ||
      t.tag === 4
    );
  }
  function Hf(t) {
    e: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Wg(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if (
          (t.tag === 27 && yi(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue e;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function qf(t, r, l) {
    var s = t.tag;
    if (s === 5 || s === 6)
      ((t = t.stateNode),
        r
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l
            ).insertBefore(t, r)
          : ((r =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l),
            r.appendChild(t),
            (l = l._reactRootContainer),
            l != null || r.onclick !== null || (r.onclick = kr)));
    else if (
      s !== 4 &&
      (s === 27 && yi(t.type) && ((l = t.stateNode), (r = null)),
      (t = t.child),
      t !== null)
    )
      for (qf(t, r, l), t = t.sibling; t !== null; )
        (qf(t, r, l), (t = t.sibling));
  }
  function zs(t, r, l) {
    var s = t.tag;
    if (s === 5 || s === 6)
      ((t = t.stateNode), r ? l.insertBefore(t, r) : l.appendChild(t));
    else if (
      s !== 4 &&
      (s === 27 && yi(t.type) && (l = t.stateNode), (t = t.child), t !== null)
    )
      for (zs(t, r, l), t = t.sibling; t !== null; )
        (zs(t, r, l), (t = t.sibling));
  }
  function ey(t) {
    var r = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var s = t.type, d = r.attributes; d.length; )
        r.removeAttributeNode(d[0]);
      (Gt(r, s, l), (r[pe] = t), (r[ge] = l));
    } catch (m) {
      at(t, t.return, m);
    }
  }
  var Mr = !1,
    Mt = !1,
    Ff = !1,
    ty = typeof WeakSet == "function" ? WeakSet : Set,
    Pt = null;
  function Nw(t, r) {
    if (((t = t.containerInfo), (sd = Js), (t = hm(t)), Nc(t))) {
      if ("selectionStart" in t)
        var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
          var s = l.getSelection && l.getSelection();
          if (s && s.rangeCount !== 0) {
            l = s.anchorNode;
            var d = s.anchorOffset,
              m = s.focusNode;
            s = s.focusOffset;
            try {
              (l.nodeType, m.nodeType);
            } catch {
              l = null;
              break e;
            }
            var b = 0,
              E = -1,
              A = -1,
              V = 0,
              W = 0,
              re = t,
              Y = null;
            t: for (;;) {
              for (
                var Q;
                re !== l || (d !== 0 && re.nodeType !== 3) || (E = b + d),
                  re !== m || (s !== 0 && re.nodeType !== 3) || (A = b + s),
                  re.nodeType === 3 && (b += re.nodeValue.length),
                  (Q = re.firstChild) !== null;
              )
                ((Y = re), (re = Q));
              for (;;) {
                if (re === t) break t;
                if (
                  (Y === l && ++V === d && (E = b),
                  Y === m && ++W === s && (A = b),
                  (Q = re.nextSibling) !== null)
                )
                  break;
                ((re = Y), (Y = re.parentNode));
              }
              re = Q;
            }
            l = E === -1 || A === -1 ? null : { start: E, end: A };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      ud = { focusedElem: t, selectionRange: l }, Js = !1, Pt = r;
      Pt !== null;
    )
      if (
        ((r = Pt), (t = r.child), (r.subtreeFlags & 1028) !== 0 && t !== null)
      )
        ((t.return = r), (Pt = t));
      else
        for (; Pt !== null; ) {
          switch (((r = Pt), (m = r.alternate), (t = r.flags), r.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = r.updateQueue),
                (t = t !== null ? t.events : null),
                t !== null)
              )
                for (l = 0; l < t.length; l++)
                  ((d = t[l]), (d.ref.impl = d.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && m !== null) {
                ((t = void 0),
                  (l = r),
                  (d = m.memoizedProps),
                  (m = m.memoizedState),
                  (s = l.stateNode));
                try {
                  var ve = Ki(l.type, d);
                  ((t = s.getSnapshotBeforeUpdate(ve, m)),
                    (s.__reactInternalSnapshotBeforeUpdate = t));
                } catch (Oe) {
                  at(l, l.return, Oe);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = r.stateNode.containerInfo), (l = t.nodeType), l === 9)
                )
                  dd(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      dd(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(a(163));
          }
          if (((t = r.sibling), t !== null)) {
            ((t.return = r.return), (Pt = t));
            break;
          }
          Pt = r.return;
        }
  }
  function ny(t, r, l) {
    var s = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Lr(t, l), s & 4 && Ul(5, l));
        break;
      case 1:
        if ((Lr(t, l), s & 4))
          if (((t = l.stateNode), r === null))
            try {
              t.componentDidMount();
            } catch (b) {
              at(l, l.return, b);
            }
          else {
            var d = Ki(l.type, r.memoizedProps);
            r = r.memoizedState;
            try {
              t.componentDidUpdate(d, r, t.__reactInternalSnapshotBeforeUpdate);
            } catch (b) {
              at(l, l.return, b);
            }
          }
        (s & 64 && Zg(l), s & 512 && Hl(l, l.return));
        break;
      case 3:
        if ((Lr(t, l), s & 64 && ((t = l.updateQueue), t !== null))) {
          if (((r = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                r = l.child.stateNode;
                break;
              case 1:
                r = l.child.stateNode;
            }
          try {
            qm(t, r);
          } catch (b) {
            at(l, l.return, b);
          }
        }
        break;
      case 27:
        r === null && s & 4 && ey(l);
      case 26:
      case 5:
        (Lr(t, l), r === null && s & 4 && Jg(l), s & 512 && Hl(l, l.return));
        break;
      case 12:
        Lr(t, l);
        break;
      case 31:
        (Lr(t, l), s & 4 && ay(t, l));
        break;
      case 13:
        (Lr(t, l),
          s & 4 && ly(t, l),
          s & 64 &&
            ((t = l.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((l = Pw.bind(null, l)), s2(t, l)))));
        break;
      case 22:
        if (((s = l.memoizedState !== null || Mr), !s)) {
          ((r = (r !== null && r.memoizedState !== null) || Mt), (d = Mr));
          var m = Mt;
          ((Mr = s),
            (Mt = r) && !m ? Br(t, l, (l.subtreeFlags & 8772) !== 0) : Lr(t, l),
            (Mr = d),
            (Mt = m));
        }
        break;
      case 30:
        break;
      default:
        Lr(t, l);
    }
  }
  function ry(t) {
    var r = t.alternate;
    (r !== null && ((t.alternate = null), ry(r)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((r = t.stateNode), r !== null && ut(r)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var xt = null,
    cn = !1;
  function jr(t, r, l) {
    for (l = l.child; l !== null; ) (iy(t, r, l), (l = l.sibling));
  }
  function iy(t, r, l) {
    if (kt && typeof kt.onCommitFiberUnmount == "function")
      try {
        kt.onCommitFiberUnmount(Bt, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (Mt || pr(l, r),
          jr(t, r, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        Mt || pr(l, r);
        var s = xt,
          d = cn;
        (yi(l.type) && ((xt = l.stateNode), (cn = !1)),
          jr(t, r, l),
          Ql(l.stateNode),
          (xt = s),
          (cn = d));
        break;
      case 5:
        Mt || pr(l, r);
      case 6:
        if (
          ((s = xt),
          (d = cn),
          (xt = null),
          jr(t, r, l),
          (xt = s),
          (cn = d),
          xt !== null)
        )
          if (cn)
            try {
              (xt.nodeType === 9
                ? xt.body
                : xt.nodeName === "HTML"
                  ? xt.ownerDocument.body
                  : xt
              ).removeChild(l.stateNode);
            } catch (m) {
              at(l, r, m);
            }
          else
            try {
              xt.removeChild(l.stateNode);
            } catch (m) {
              at(l, r, m);
            }
        break;
      case 18:
        xt !== null &&
          (cn
            ? ((t = xt),
              Zy(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                    ? t.ownerDocument.body
                    : t,
                l.stateNode,
              ),
              Ia(t))
            : Zy(xt, l.stateNode));
        break;
      case 4:
        ((s = xt),
          (d = cn),
          (xt = l.stateNode.containerInfo),
          (cn = !0),
          jr(t, r, l),
          (xt = s),
          (cn = d));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ci(2, l, r), Mt || ci(4, l, r), jr(t, r, l));
        break;
      case 1:
        (Mt ||
          (pr(l, r),
          (s = l.stateNode),
          typeof s.componentWillUnmount == "function" && $g(l, r, s)),
          jr(t, r, l));
        break;
      case 21:
        jr(t, r, l);
        break;
      case 22:
        ((Mt = (s = Mt) || l.memoizedState !== null), jr(t, r, l), (Mt = s));
        break;
      default:
        jr(t, r, l);
    }
  }
  function ay(t, r) {
    if (
      r.memoizedState === null &&
      ((t = r.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Ia(t);
      } catch (l) {
        at(r, r.return, l);
      }
    }
  }
  function ly(t, r) {
    if (
      r.memoizedState === null &&
      ((t = r.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Ia(t);
      } catch (l) {
        at(r, r.return, l);
      }
  }
  function Mw(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var r = t.stateNode;
        return (r === null && (r = t.stateNode = new ty()), r);
      case 22:
        return (
          (t = t.stateNode),
          (r = t._retryCache),
          r === null && (r = t._retryCache = new ty()),
          r
        );
      default:
        throw Error(a(435, t.tag));
    }
  }
  function Ds(t, r) {
    var l = Mw(t);
    r.forEach(function (s) {
      if (!l.has(s)) {
        l.add(s);
        var d = Vw.bind(null, t, s);
        s.then(d, d);
      }
    });
  }
  function fn(t, r) {
    var l = r.deletions;
    if (l !== null)
      for (var s = 0; s < l.length; s++) {
        var d = l[s],
          m = t,
          b = r,
          E = b;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (yi(E.type)) {
                ((xt = E.stateNode), (cn = !1));
                break e;
              }
              break;
            case 5:
              ((xt = E.stateNode), (cn = !1));
              break e;
            case 3:
            case 4:
              ((xt = E.stateNode.containerInfo), (cn = !0));
              break e;
          }
          E = E.return;
        }
        if (xt === null) throw Error(a(160));
        (iy(m, b, d),
          (xt = null),
          (cn = !1),
          (m = d.alternate),
          m !== null && (m.return = null),
          (d.return = null));
      }
    if (r.subtreeFlags & 13886)
      for (r = r.child; r !== null; ) (oy(r, t), (r = r.sibling));
  }
  var Wn = null;
  function oy(t, r) {
    var l = t.alternate,
      s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (fn(r, t),
          dn(t),
          s & 4 && (ci(3, t, t.return), Ul(3, t), ci(5, t, t.return)));
        break;
      case 1:
        (fn(r, t),
          dn(t),
          s & 512 && (Mt || l === null || pr(l, l.return)),
          s & 64 &&
            Mr &&
            ((t = t.updateQueue),
            t !== null &&
              ((s = t.callbacks),
              s !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? s : l.concat(s))))));
        break;
      case 26:
        var d = Wn;
        if (
          (fn(r, t),
          dn(t),
          s & 512 && (Mt || l === null || pr(l, l.return)),
          s & 4)
        ) {
          var m = l !== null ? l.memoizedState : null;
          if (((s = t.memoizedState), l === null))
            if (s === null)
              if (t.stateNode === null) {
                e: {
                  ((s = t.type),
                    (l = t.memoizedProps),
                    (d = d.ownerDocument || d));
                  t: switch (s) {
                    case "title":
                      ((m = d.getElementsByTagName("title")[0]),
                        (!m ||
                          m[qe] ||
                          m[pe] ||
                          m.namespaceURI === "http://www.w3.org/2000/svg" ||
                          m.hasAttribute("itemprop")) &&
                          ((m = d.createElement(s)),
                          d.head.insertBefore(
                            m,
                            d.querySelector("head > title"),
                          )),
                        Gt(m, s, l),
                        (m[pe] = t),
                        dt(m),
                        (s = m));
                      break e;
                    case "link":
                      var b = o0("link", "href", d).get(s + (l.href || ""));
                      if (b) {
                        for (var E = 0; E < b.length; E++)
                          if (
                            ((m = b[E]),
                            m.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              m.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              m.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              m.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            b.splice(E, 1);
                            break t;
                          }
                      }
                      ((m = d.createElement(s)),
                        Gt(m, s, l),
                        d.head.appendChild(m));
                      break;
                    case "meta":
                      if (
                        (b = o0("meta", "content", d).get(
                          s + (l.content || ""),
                        ))
                      ) {
                        for (E = 0; E < b.length; E++)
                          if (
                            ((m = b[E]),
                            m.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              m.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              m.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              m.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              m.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            b.splice(E, 1);
                            break t;
                          }
                      }
                      ((m = d.createElement(s)),
                        Gt(m, s, l),
                        d.head.appendChild(m));
                      break;
                    default:
                      throw Error(a(468, s));
                  }
                  ((m[pe] = t), dt(m), (s = m));
                }
                t.stateNode = s;
              } else s0(d, t.type, t.stateNode);
            else t.stateNode = l0(d, s, t.memoizedProps);
          else
            m !== s
              ? (m === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : m.count--,
                s === null
                  ? s0(d, t.type, t.stateNode)
                  : l0(d, s, t.memoizedProps))
              : s === null &&
                t.stateNode !== null &&
                Uf(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (fn(r, t),
          dn(t),
          s & 512 && (Mt || l === null || pr(l, l.return)),
          l !== null && s & 4 && Uf(t, t.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if (
          (fn(r, t),
          dn(t),
          s & 512 && (Mt || l === null || pr(l, l.return)),
          t.flags & 32)
        ) {
          d = t.stateNode;
          try {
            pa(d, "");
          } catch (ve) {
            at(t, t.return, ve);
          }
        }
        (s & 4 &&
          t.stateNode != null &&
          ((d = t.memoizedProps), Uf(t, d, l !== null ? l.memoizedProps : d)),
          s & 1024 && (Ff = !0));
        break;
      case 6:
        if ((fn(r, t), dn(t), s & 4)) {
          if (t.stateNode === null) throw Error(a(162));
          ((s = t.memoizedProps), (l = t.stateNode));
          try {
            l.nodeValue = s;
          } catch (ve) {
            at(t, t.return, ve);
          }
        }
        break;
      case 3:
        if (
          ((Qs = null),
          (d = Wn),
          (Wn = Xs(r.containerInfo)),
          fn(r, t),
          (Wn = d),
          dn(t),
          s & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Ia(r.containerInfo);
          } catch (ve) {
            at(t, t.return, ve);
          }
        Ff && ((Ff = !1), sy(t));
        break;
      case 4:
        ((s = Wn),
          (Wn = Xs(t.stateNode.containerInfo)),
          fn(r, t),
          dn(t),
          (Wn = s));
        break;
      case 12:
        (fn(r, t), dn(t));
        break;
      case 31:
        (fn(r, t),
          dn(t),
          s & 4 &&
            ((s = t.updateQueue),
            s !== null && ((t.updateQueue = null), Ds(t, s))));
        break;
      case 13:
        (fn(r, t),
          dn(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (Ms = Vt()),
          s & 4 &&
            ((s = t.updateQueue),
            s !== null && ((t.updateQueue = null), Ds(t, s))));
        break;
      case 22:
        d = t.memoizedState !== null;
        var A = l !== null && l.memoizedState !== null,
          V = Mr,
          W = Mt;
        if (
          ((Mr = V || d),
          (Mt = W || A),
          fn(r, t),
          (Mt = W),
          (Mr = V),
          dn(t),
          s & 8192)
        )
          e: for (
            r = t.stateNode,
              r._visibility = d ? r._visibility & -2 : r._visibility | 1,
              d && (l === null || A || Mr || Mt || Zi(t)),
              l = null,
              r = t;
            ;
          ) {
            if (r.tag === 5 || r.tag === 26) {
              if (l === null) {
                A = l = r;
                try {
                  if (((m = A.stateNode), d))
                    ((b = m.style),
                      typeof b.setProperty == "function"
                        ? b.setProperty("display", "none", "important")
                        : (b.display = "none"));
                  else {
                    E = A.stateNode;
                    var re = A.memoizedProps.style,
                      Y =
                        re != null && re.hasOwnProperty("display")
                          ? re.display
                          : null;
                    E.style.display =
                      Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
                  }
                } catch (ve) {
                  at(A, A.return, ve);
                }
              }
            } else if (r.tag === 6) {
              if (l === null) {
                A = r;
                try {
                  A.stateNode.nodeValue = d ? "" : A.memoizedProps;
                } catch (ve) {
                  at(A, A.return, ve);
                }
              }
            } else if (r.tag === 18) {
              if (l === null) {
                A = r;
                try {
                  var Q = A.stateNode;
                  d ? $y(Q, !0) : $y(A.stateNode, !1);
                } catch (ve) {
                  at(A, A.return, ve);
                }
              }
            } else if (
              ((r.tag !== 22 && r.tag !== 23) ||
                r.memoizedState === null ||
                r === t) &&
              r.child !== null
            ) {
              ((r.child.return = r), (r = r.child));
              continue;
            }
            if (r === t) break e;
            for (; r.sibling === null; ) {
              if (r.return === null || r.return === t) break e;
              (l === r && (l = null), (r = r.return));
            }
            (l === r && (l = null),
              (r.sibling.return = r.return),
              (r = r.sibling));
          }
        s & 4 &&
          ((s = t.updateQueue),
          s !== null &&
            ((l = s.retryQueue),
            l !== null && ((s.retryQueue = null), Ds(t, l))));
        break;
      case 19:
        (fn(r, t),
          dn(t),
          s & 4 &&
            ((s = t.updateQueue),
            s !== null && ((t.updateQueue = null), Ds(t, s))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (fn(r, t), dn(t));
    }
  }
  function dn(t) {
    var r = t.flags;
    if (r & 2) {
      try {
        for (var l, s = t.return; s !== null; ) {
          if (Wg(s)) {
            l = s;
            break;
          }
          s = s.return;
        }
        if (l == null) throw Error(a(160));
        switch (l.tag) {
          case 27:
            var d = l.stateNode,
              m = Hf(t);
            zs(t, m, d);
            break;
          case 5:
            var b = l.stateNode;
            l.flags & 32 && (pa(b, ""), (l.flags &= -33));
            var E = Hf(t);
            zs(t, E, b);
            break;
          case 3:
          case 4:
            var A = l.stateNode.containerInfo,
              V = Hf(t);
            qf(t, V, A);
            break;
          default:
            throw Error(a(161));
        }
      } catch (W) {
        at(t, t.return, W);
      }
      t.flags &= -3;
    }
    r & 4096 && (t.flags &= -4097);
  }
  function sy(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var r = t;
        (sy(r),
          r.tag === 5 && r.flags & 1024 && r.stateNode.reset(),
          (t = t.sibling));
      }
  }
  function Lr(t, r) {
    if (r.subtreeFlags & 8772)
      for (r = r.child; r !== null; ) (ny(t, r.alternate, r), (r = r.sibling));
  }
  function Zi(t) {
    for (t = t.child; t !== null; ) {
      var r = t;
      switch (r.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (ci(4, r, r.return), Zi(r));
          break;
        case 1:
          pr(r, r.return);
          var l = r.stateNode;
          (typeof l.componentWillUnmount == "function" && $g(r, r.return, l),
            Zi(r));
          break;
        case 27:
          Ql(r.stateNode);
        case 26:
        case 5:
          (pr(r, r.return), Zi(r));
          break;
        case 22:
          r.memoizedState === null && Zi(r);
          break;
        case 30:
          Zi(r);
          break;
        default:
          Zi(r);
      }
      t = t.sibling;
    }
  }
  function Br(t, r, l) {
    for (l = l && (r.subtreeFlags & 8772) !== 0, r = r.child; r !== null; ) {
      var s = r.alternate,
        d = t,
        m = r,
        b = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (Br(d, m, l), Ul(4, m));
          break;
        case 1:
          if (
            (Br(d, m, l),
            (s = m),
            (d = s.stateNode),
            typeof d.componentDidMount == "function")
          )
            try {
              d.componentDidMount();
            } catch (V) {
              at(s, s.return, V);
            }
          if (((s = m), (d = s.updateQueue), d !== null)) {
            var E = s.stateNode;
            try {
              var A = d.shared.hiddenCallbacks;
              if (A !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < A.length; d++)
                  Hm(A[d], E);
            } catch (V) {
              at(s, s.return, V);
            }
          }
          (l && b & 64 && Zg(m), Hl(m, m.return));
          break;
        case 27:
          ey(m);
        case 26:
        case 5:
          (Br(d, m, l), l && s === null && b & 4 && Jg(m), Hl(m, m.return));
          break;
        case 12:
          Br(d, m, l);
          break;
        case 31:
          (Br(d, m, l), l && b & 4 && ay(d, m));
          break;
        case 13:
          (Br(d, m, l), l && b & 4 && ly(d, m));
          break;
        case 22:
          (m.memoizedState === null && Br(d, m, l), Hl(m, m.return));
          break;
        case 30:
          break;
        default:
          Br(d, m, l);
      }
      r = r.sibling;
    }
  }
  function Pf(t, r) {
    var l = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      r.memoizedState !== null &&
        r.memoizedState.cachePool !== null &&
        (t = r.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && Cl(l)));
  }
  function Vf(t, r) {
    ((t = null),
      r.alternate !== null && (t = r.alternate.memoizedState.cache),
      (r = r.memoizedState.cache),
      r !== t && (r.refCount++, t != null && Cl(t)));
  }
  function er(t, r, l, s) {
    if (r.subtreeFlags & 10256)
      for (r = r.child; r !== null; ) (uy(t, r, l, s), (r = r.sibling));
  }
  function uy(t, r, l, s) {
    var d = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        (er(t, r, l, s), d & 2048 && Ul(9, r));
        break;
      case 1:
        er(t, r, l, s);
        break;
      case 3:
        (er(t, r, l, s),
          d & 2048 &&
            ((t = null),
            r.alternate !== null && (t = r.alternate.memoizedState.cache),
            (r = r.memoizedState.cache),
            r !== t && (r.refCount++, t != null && Cl(t))));
        break;
      case 12:
        if (d & 2048) {
          (er(t, r, l, s), (t = r.stateNode));
          try {
            var m = r.memoizedProps,
              b = m.id,
              E = m.onPostCommit;
            typeof E == "function" &&
              E(
                b,
                r.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0,
              );
          } catch (A) {
            at(r, r.return, A);
          }
        } else er(t, r, l, s);
        break;
      case 31:
        er(t, r, l, s);
        break;
      case 13:
        er(t, r, l, s);
        break;
      case 23:
        break;
      case 22:
        ((m = r.stateNode),
          (b = r.alternate),
          r.memoizedState !== null
            ? m._visibility & 2
              ? er(t, r, l, s)
              : ql(t, r)
            : m._visibility & 2
              ? er(t, r, l, s)
              : ((m._visibility |= 2),
                Ma(t, r, l, s, (r.subtreeFlags & 10256) !== 0 || !1)),
          d & 2048 && Pf(b, r));
        break;
      case 24:
        (er(t, r, l, s), d & 2048 && Vf(r.alternate, r));
        break;
      default:
        er(t, r, l, s);
    }
  }
  function Ma(t, r, l, s, d) {
    for (
      d = d && ((r.subtreeFlags & 10256) !== 0 || !1), r = r.child;
      r !== null;
    ) {
      var m = t,
        b = r,
        E = l,
        A = s,
        V = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          (Ma(m, b, E, A, d), Ul(8, b));
          break;
        case 23:
          break;
        case 22:
          var W = b.stateNode;
          (b.memoizedState !== null
            ? W._visibility & 2
              ? Ma(m, b, E, A, d)
              : ql(m, b)
            : ((W._visibility |= 2), Ma(m, b, E, A, d)),
            d && V & 2048 && Pf(b.alternate, b));
          break;
        case 24:
          (Ma(m, b, E, A, d), d && V & 2048 && Vf(b.alternate, b));
          break;
        default:
          Ma(m, b, E, A, d);
      }
      r = r.sibling;
    }
  }
  function ql(t, r) {
    if (r.subtreeFlags & 10256)
      for (r = r.child; r !== null; ) {
        var l = t,
          s = r,
          d = s.flags;
        switch (s.tag) {
          case 22:
            (ql(l, s), d & 2048 && Pf(s.alternate, s));
            break;
          case 24:
            (ql(l, s), d & 2048 && Vf(s.alternate, s));
            break;
          default:
            ql(l, s);
        }
        r = r.sibling;
      }
  }
  var Fl = 8192;
  function ja(t, r, l) {
    if (t.subtreeFlags & Fl)
      for (t = t.child; t !== null; ) (cy(t, r, l), (t = t.sibling));
  }
  function cy(t, r, l) {
    switch (t.tag) {
      case 26:
        (ja(t, r, l),
          t.flags & Fl &&
            t.memoizedState !== null &&
            v2(l, Wn, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        ja(t, r, l);
        break;
      case 3:
      case 4:
        var s = Wn;
        ((Wn = Xs(t.stateNode.containerInfo)), ja(t, r, l), (Wn = s));
        break;
      case 22:
        t.memoizedState === null &&
          ((s = t.alternate),
          s !== null && s.memoizedState !== null
            ? ((s = Fl), (Fl = 16777216), ja(t, r, l), (Fl = s))
            : ja(t, r, l));
        break;
      default:
        ja(t, r, l);
    }
  }
  function fy(t) {
    var r = t.alternate;
    if (r !== null && ((t = r.child), t !== null)) {
      r.child = null;
      do ((r = t.sibling), (t.sibling = null), (t = r));
      while (t !== null);
    }
  }
  function Pl(t) {
    var r = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (r !== null)
        for (var l = 0; l < r.length; l++) {
          var s = r[l];
          ((Pt = s), hy(s, t));
        }
      fy(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (dy(t), (t = t.sibling));
  }
  function dy(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Pl(t), t.flags & 2048 && ci(9, t, t.return));
        break;
      case 3:
        Pl(t);
        break;
      case 12:
        Pl(t);
        break;
      case 22:
        var r = t.stateNode;
        t.memoizedState !== null &&
        r._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((r._visibility &= -3), Ns(t))
          : Pl(t);
        break;
      default:
        Pl(t);
    }
  }
  function Ns(t) {
    var r = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (r !== null)
        for (var l = 0; l < r.length; l++) {
          var s = r[l];
          ((Pt = s), hy(s, t));
        }
      fy(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((r = t), r.tag)) {
        case 0:
        case 11:
        case 15:
          (ci(8, r, r.return), Ns(r));
          break;
        case 22:
          ((l = r.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), Ns(r)));
          break;
        default:
          Ns(r);
      }
      t = t.sibling;
    }
  }
  function hy(t, r) {
    for (; Pt !== null; ) {
      var l = Pt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          ci(8, l, r);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var s = l.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          Cl(l.memoizedState.cache);
      }
      if (((s = l.child), s !== null)) ((s.return = l), (Pt = s));
      else
        e: for (l = t; Pt !== null; ) {
          s = Pt;
          var d = s.sibling,
            m = s.return;
          if ((ry(s), s === l)) {
            Pt = null;
            break e;
          }
          if (d !== null) {
            ((d.return = m), (Pt = d));
            break e;
          }
          Pt = m;
        }
    }
  }
  var jw = {
      getCacheForType: function (t) {
        var r = It(zt),
          l = r.data.get(t);
        return (l === void 0 && ((l = t()), r.data.set(t, l)), l);
      },
      cacheSignal: function () {
        return It(zt).controller.signal;
      },
    },
    Lw = typeof WeakMap == "function" ? WeakMap : Map,
    tt = 0,
    ct = null,
    Pe = null,
    Ie = 0,
    it = 0,
    En = null,
    fi = !1,
    La = !1,
    Yf = !1,
    Ur = 0,
    wt = 0,
    di = 0,
    $i = 0,
    If = 0,
    kn = 0,
    Ba = 0,
    Vl = null,
    hn = null,
    Xf = !1,
    Ms = 0,
    py = 0,
    js = 1 / 0,
    Ls = null,
    hi = null,
    Ht = 0,
    pi = null,
    Ua = null,
    Hr = 0,
    Gf = 0,
    Qf = null,
    my = null,
    Yl = 0,
    Kf = null;
  function Cn() {
    return (tt & 2) !== 0 && Ie !== 0 ? Ie & -Ie : D.T !== null ? td() : ae();
  }
  function gy() {
    if (kn === 0)
      if ((Ie & 536870912) === 0 || Ge) {
        var t = Er;
        ((Er <<= 1), (Er & 3932160) === 0 && (Er = 262144), (kn = t));
      } else kn = 536870912;
    return ((t = Sn.current), t !== null && (t.flags |= 32), kn);
  }
  function pn(t, r, l) {
    (((t === ct && (it === 2 || it === 9)) || t.cancelPendingCommit !== null) &&
      (Ha(t, 0), mi(t, Ie, kn, !1)),
      ur(t, l),
      ((tt & 2) === 0 || t !== ct) &&
        (t === ct &&
          ((tt & 2) === 0 && ($i |= l), wt === 4 && mi(t, Ie, kn, !1)),
        mr(t)));
  }
  function yy(t, r, l) {
    if ((tt & 6) !== 0) throw Error(a(327));
    var s = (!l && (r & 127) === 0 && (r & t.expiredLanes) === 0) || $r(t, r),
      d = s ? Hw(t, r) : $f(t, r, !0),
      m = s;
    do {
      if (d === 0) {
        La && !s && mi(t, r, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), m && !Bw(l))) {
          ((d = $f(t, r, !1)), (m = !1));
          continue;
        }
        if (d === 2) {
          if (((m = r), t.errorRecoveryDisabledLanes & m)) var b = 0;
          else
            ((b = t.pendingLanes & -536870913),
              (b = b !== 0 ? b : b & 536870912 ? 536870912 : 0));
          if (b !== 0) {
            r = b;
            e: {
              var E = t;
              d = Vl;
              var A = E.current.memoizedState.isDehydrated;
              if ((A && (Ha(E, b).flags |= 256), (b = $f(E, b, !1)), b !== 2)) {
                if (Yf && !A) {
                  ((E.errorRecoveryDisabledLanes |= m), ($i |= m), (d = 4));
                  break e;
                }
                ((m = hn),
                  (hn = d),
                  m !== null &&
                    (hn === null ? (hn = m) : hn.push.apply(hn, m)));
              }
              d = b;
            }
            if (((m = !1), d !== 2)) continue;
          }
        }
        if (d === 1) {
          (Ha(t, 0), mi(t, r, 0, !0));
          break;
        }
        e: {
          switch (((s = t), (m = d), m)) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((r & 4194048) !== r) break;
            case 6:
              mi(s, r, kn, !fi);
              break e;
            case 2:
              hn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((r & 62914560) === r && ((d = Ms + 300 - Vt()), 10 < d)) {
            if ((mi(s, r, kn, !fi), ua(s, 0, !0) !== 0)) break e;
            ((Hr = r),
              (s.timeoutHandle = Qy(
                by.bind(
                  null,
                  s,
                  l,
                  hn,
                  Ls,
                  Xf,
                  r,
                  kn,
                  $i,
                  Ba,
                  fi,
                  m,
                  "Throttled",
                  -0,
                  0,
                ),
                d,
              )));
            break e;
          }
          by(s, l, hn, Ls, Xf, r, kn, $i, Ba, fi, m, null, -0, 0);
        }
      }
      break;
    } while (!0);
    mr(t);
  }
  function by(t, r, l, s, d, m, b, E, A, V, W, re, Y, Q) {
    if (
      ((t.timeoutHandle = -1),
      (re = r.subtreeFlags),
      re & 8192 || (re & 16785408) === 16785408)
    ) {
      ((re = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: kr,
      }),
        cy(r, m, re));
      var ve =
        (m & 62914560) === m ? Ms - Vt() : (m & 4194048) === m ? py - Vt() : 0;
      if (((ve = S2(re, ve)), ve !== null)) {
        ((Hr = m),
          (t.cancelPendingCommit = ve(
            _y.bind(null, t, r, m, l, s, d, b, E, A, W, re, null, Y, Q),
          )),
          mi(t, m, b, !V));
        return;
      }
    }
    _y(t, r, m, l, s, d, b, E, A);
  }
  function Bw(t) {
    for (var r = t; ; ) {
      var l = r.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        r.flags & 16384 &&
        ((l = r.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var s = 0; s < l.length; s++) {
          var d = l[s],
            m = d.getSnapshot;
          d = d.value;
          try {
            if (!xn(m(), d)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = r.child), r.subtreeFlags & 16384 && l !== null))
        ((l.return = r), (r = l));
      else {
        if (r === t) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === t) return !0;
          r = r.return;
        }
        ((r.sibling.return = r.return), (r = r.sibling));
      }
    }
    return !0;
  }
  function mi(t, r, l, s) {
    ((r &= ~If),
      (r &= ~$i),
      (t.suspendedLanes |= r),
      (t.pingedLanes &= ~r),
      s && (t.warmLanes |= r),
      (s = t.expirationTimes));
    for (var d = r; 0 < d; ) {
      var m = 31 - nt(d),
        b = 1 << m;
      ((s[m] = -1), (d &= ~b));
    }
    l !== 0 && Xo(t, l, r);
  }
  function Bs() {
    return (tt & 6) === 0 ? (Il(0), !1) : !0;
  }
  function Zf() {
    if (Pe !== null) {
      if (it === 0) var t = Pe.return;
      else ((t = Pe), (Rr = Pi = null), df(t), (Aa = null), (Tl = 0), (t = Pe));
      for (; t !== null; ) (Kg(t.alternate, t), (t = t.return));
      Pe = null;
    }
  }
  function Ha(t, r) {
    var l = t.timeoutHandle;
    (l !== -1 && ((t.timeoutHandle = -1), r2(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (Hr = 0),
      Zf(),
      (ct = t),
      (Pe = l = _r(t.current, null)),
      (Ie = r),
      (it = 0),
      (En = null),
      (fi = !1),
      (La = $r(t, r)),
      (Yf = !1),
      (Ba = kn = If = $i = di = wt = 0),
      (hn = Vl = null),
      (Xf = !1),
      (r & 8) !== 0 && (r |= r & 32));
    var s = t.entangledLanes;
    if (s !== 0)
      for (t = t.entanglements, s &= r; 0 < s; ) {
        var d = 31 - nt(s),
          m = 1 << d;
        ((r |= t[d]), (s &= ~m));
      }
    return ((Ur = r), is(), l);
  }
  function xy(t, r) {
    ((je = null),
      (D.H = jl),
      r === Ra || r === ds
        ? ((r = jm()), (it = 3))
        : r === Wc
          ? ((r = jm()), (it = 4))
          : (it =
              r === Rf
                ? 8
                : r !== null &&
                    typeof r == "object" &&
                    typeof r.then == "function"
                  ? 6
                  : 1),
      (En = r),
      Pe === null && ((wt = 1), _s(t, Mn(r, t.current))));
  }
  function vy() {
    var t = Sn.current;
    return t === null
      ? !0
      : (Ie & 4194048) === Ie
        ? Un === null
        : (Ie & 62914560) === Ie || (Ie & 536870912) !== 0
          ? t === Un
          : !1;
  }
  function Sy() {
    var t = D.H;
    return ((D.H = jl), t === null ? jl : t);
  }
  function wy() {
    var t = D.A;
    return ((D.A = jw), t);
  }
  function Us() {
    ((wt = 4),
      fi || ((Ie & 4194048) !== Ie && Sn.current !== null) || (La = !0),
      ((di & 134217727) === 0 && ($i & 134217727) === 0) ||
        ct === null ||
        mi(ct, Ie, kn, !1));
  }
  function $f(t, r, l) {
    var s = tt;
    tt |= 2;
    var d = Sy(),
      m = wy();
    ((ct !== t || Ie !== r) && ((Ls = null), Ha(t, r)), (r = !1));
    var b = wt;
    e: do
      try {
        if (it !== 0 && Pe !== null) {
          var E = Pe,
            A = En;
          switch (it) {
            case 8:
              (Zf(), (b = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Sn.current === null && (r = !0);
              var V = it;
              if (((it = 0), (En = null), qa(t, E, A, V), l && La)) {
                b = 0;
                break e;
              }
              break;
            default:
              ((V = it), (it = 0), (En = null), qa(t, E, A, V));
          }
        }
        (Uw(), (b = wt));
        break;
      } catch (W) {
        xy(t, W);
      }
    while (!0);
    return (
      r && t.shellSuspendCounter++,
      (Rr = Pi = null),
      (tt = s),
      (D.H = d),
      (D.A = m),
      Pe === null && ((ct = null), (Ie = 0), is()),
      b
    );
  }
  function Uw() {
    for (; Pe !== null; ) Ey(Pe);
  }
  function Hw(t, r) {
    var l = tt;
    tt |= 2;
    var s = Sy(),
      d = wy();
    ct !== t || Ie !== r
      ? ((Ls = null), (js = Vt() + 500), Ha(t, r))
      : (La = $r(t, r));
    e: do
      try {
        if (it !== 0 && Pe !== null) {
          r = Pe;
          var m = En;
          t: switch (it) {
            case 1:
              ((it = 0), (En = null), qa(t, r, m, 1));
              break;
            case 2:
            case 9:
              if (Nm(m)) {
                ((it = 0), (En = null), ky(r));
                break;
              }
              ((r = function () {
                ((it !== 2 && it !== 9) || ct !== t || (it = 7), mr(t));
              }),
                m.then(r, r));
              break e;
            case 3:
              it = 7;
              break e;
            case 4:
              it = 5;
              break e;
            case 7:
              Nm(m)
                ? ((it = 0), (En = null), ky(r))
                : ((it = 0), (En = null), qa(t, r, m, 7));
              break;
            case 5:
              var b = null;
              switch (Pe.tag) {
                case 26:
                  b = Pe.memoizedState;
                case 5:
                case 27:
                  var E = Pe;
                  if (b ? u0(b) : E.stateNode.complete) {
                    ((it = 0), (En = null));
                    var A = E.sibling;
                    if (A !== null) Pe = A;
                    else {
                      var V = E.return;
                      V !== null ? ((Pe = V), Hs(V)) : (Pe = null);
                    }
                    break t;
                  }
              }
              ((it = 0), (En = null), qa(t, r, m, 5));
              break;
            case 6:
              ((it = 0), (En = null), qa(t, r, m, 6));
              break;
            case 8:
              (Zf(), (wt = 6));
              break e;
            default:
              throw Error(a(462));
          }
        }
        qw();
        break;
      } catch (W) {
        xy(t, W);
      }
    while (!0);
    return (
      (Rr = Pi = null),
      (D.H = s),
      (D.A = d),
      (tt = l),
      Pe !== null ? 0 : ((ct = null), (Ie = 0), is(), wt)
    );
  }
  function qw() {
    for (; Pe !== null && !fl(); ) Ey(Pe);
  }
  function Ey(t) {
    var r = Gg(t.alternate, t, Ur);
    ((t.memoizedProps = t.pendingProps), r === null ? Hs(t) : (Pe = r));
  }
  function ky(t) {
    var r = t,
      l = r.alternate;
    switch (r.tag) {
      case 15:
      case 0:
        r = Fg(l, r, r.pendingProps, r.type, void 0, Ie);
        break;
      case 11:
        r = Fg(l, r, r.pendingProps, r.type.render, r.ref, Ie);
        break;
      case 5:
        df(r);
      default:
        (Kg(l, r), (r = Pe = wm(r, Ur)), (r = Gg(l, r, Ur)));
    }
    ((t.memoizedProps = t.pendingProps), r === null ? Hs(t) : (Pe = r));
  }
  function qa(t, r, l, s) {
    ((Rr = Pi = null), df(r), (Aa = null), (Tl = 0));
    var d = r.return;
    try {
      if (Rw(t, d, r, l, Ie)) {
        ((wt = 1), _s(t, Mn(l, t.current)), (Pe = null));
        return;
      }
    } catch (m) {
      if (d !== null) throw ((Pe = d), m);
      ((wt = 1), _s(t, Mn(l, t.current)), (Pe = null));
      return;
    }
    r.flags & 32768
      ? (Ge || s === 1
          ? (t = !0)
          : La || (Ie & 536870912) !== 0
            ? (t = !1)
            : ((fi = t = !0),
              (s === 2 || s === 9 || s === 3 || s === 6) &&
                ((s = Sn.current),
                s !== null && s.tag === 13 && (s.flags |= 16384))),
        Cy(r, t))
      : Hs(r);
  }
  function Hs(t) {
    var r = t;
    do {
      if ((r.flags & 32768) !== 0) {
        Cy(r, fi);
        return;
      }
      t = r.return;
      var l = zw(r.alternate, r, Ur);
      if (l !== null) {
        Pe = l;
        return;
      }
      if (((r = r.sibling), r !== null)) {
        Pe = r;
        return;
      }
      Pe = r = t;
    } while (r !== null);
    wt === 0 && (wt = 5);
  }
  function Cy(t, r) {
    do {
      var l = Dw(t.alternate, t);
      if (l !== null) {
        ((l.flags &= 32767), (Pe = l));
        return;
      }
      if (
        ((l = t.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !r && ((t = t.sibling), t !== null))
      ) {
        Pe = t;
        return;
      }
      Pe = t = l;
    } while (t !== null);
    ((wt = 6), (Pe = null));
  }
  function _y(t, r, l, s, d, m, b, E, A) {
    t.cancelPendingCommit = null;
    do qs();
    while (Ht !== 0);
    if ((tt & 6) !== 0) throw Error(a(327));
    if (r !== null) {
      if (r === t.current) throw Error(a(177));
      if (
        ((m = r.lanes | r.childLanes),
        (m |= Uc),
        Io(t, l, m, b, E, A),
        t === ct && ((Pe = ct = null), (Ie = 0)),
        (Ua = r),
        (pi = t),
        (Hr = l),
        (Gf = m),
        (Qf = d),
        (my = s),
        (r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            Yw(Re, function () {
              return (zy(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (s = (r.flags & 13878) !== 0),
        (r.subtreeFlags & 13878) !== 0 || s)
      ) {
        ((s = D.T), (D.T = null), (d = te.p), (te.p = 2), (b = tt), (tt |= 4));
        try {
          Nw(t, r, l);
        } finally {
          ((tt = b), (te.p = d), (D.T = s));
        }
      }
      ((Ht = 1), Ty(), Ry(), Ay());
    }
  }
  function Ty() {
    if (Ht === 1) {
      Ht = 0;
      var t = pi,
        r = Ua,
        l = (r.flags & 13878) !== 0;
      if ((r.subtreeFlags & 13878) !== 0 || l) {
        ((l = D.T), (D.T = null));
        var s = te.p;
        te.p = 2;
        var d = tt;
        tt |= 4;
        try {
          oy(r, t);
          var m = ud,
            b = hm(t.containerInfo),
            E = m.focusedElem,
            A = m.selectionRange;
          if (
            b !== E &&
            E &&
            E.ownerDocument &&
            dm(E.ownerDocument.documentElement, E)
          ) {
            if (A !== null && Nc(E)) {
              var V = A.start,
                W = A.end;
              if ((W === void 0 && (W = V), "selectionStart" in E))
                ((E.selectionStart = V),
                  (E.selectionEnd = Math.min(W, E.value.length)));
              else {
                var re = E.ownerDocument || document,
                  Y = (re && re.defaultView) || window;
                if (Y.getSelection) {
                  var Q = Y.getSelection(),
                    ve = E.textContent.length,
                    Oe = Math.min(A.start, ve),
                    st = A.end === void 0 ? Oe : Math.min(A.end, ve);
                  !Q.extend && Oe > st && ((b = st), (st = Oe), (Oe = b));
                  var q = fm(E, Oe),
                    L = fm(E, st);
                  if (
                    q &&
                    L &&
                    (Q.rangeCount !== 1 ||
                      Q.anchorNode !== q.node ||
                      Q.anchorOffset !== q.offset ||
                      Q.focusNode !== L.node ||
                      Q.focusOffset !== L.offset)
                  ) {
                    var P = re.createRange();
                    (P.setStart(q.node, q.offset),
                      Q.removeAllRanges(),
                      Oe > st
                        ? (Q.addRange(P), Q.extend(L.node, L.offset))
                        : (P.setEnd(L.node, L.offset), Q.addRange(P)));
                  }
                }
              }
            }
            for (re = [], Q = E; (Q = Q.parentNode); )
              Q.nodeType === 1 &&
                re.push({ element: Q, left: Q.scrollLeft, top: Q.scrollTop });
            for (
              typeof E.focus == "function" && E.focus(), E = 0;
              E < re.length;
              E++
            ) {
              var ne = re[E];
              ((ne.element.scrollLeft = ne.left),
                (ne.element.scrollTop = ne.top));
            }
          }
          ((Js = !!sd), (ud = sd = null));
        } finally {
          ((tt = d), (te.p = s), (D.T = l));
        }
      }
      ((t.current = r), (Ht = 2));
    }
  }
  function Ry() {
    if (Ht === 2) {
      Ht = 0;
      var t = pi,
        r = Ua,
        l = (r.flags & 8772) !== 0;
      if ((r.subtreeFlags & 8772) !== 0 || l) {
        ((l = D.T), (D.T = null));
        var s = te.p;
        te.p = 2;
        var d = tt;
        tt |= 4;
        try {
          ny(t, r.alternate, r);
        } finally {
          ((tt = d), (te.p = s), (D.T = l));
        }
      }
      Ht = 3;
    }
  }
  function Ay() {
    if (Ht === 4 || Ht === 3) {
      ((Ht = 0), dl());
      var t = pi,
        r = Ua,
        l = Hr,
        s = my;
      (r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
        ? (Ht = 5)
        : ((Ht = 0), (Ua = pi = null), Oy(t, t.pendingLanes));
      var d = t.pendingLanes;
      if (
        (d === 0 && (hi = null),
        I(l),
        (r = r.stateNode),
        kt && typeof kt.onCommitFiberRoot == "function")
      )
        try {
          kt.onCommitFiberRoot(Bt, r, void 0, (r.current.flags & 128) === 128);
        } catch {}
      if (s !== null) {
        ((r = D.T), (d = te.p), (te.p = 2), (D.T = null));
        try {
          for (var m = t.onRecoverableError, b = 0; b < s.length; b++) {
            var E = s[b];
            m(E.value, { componentStack: E.stack });
          }
        } finally {
          ((D.T = r), (te.p = d));
        }
      }
      ((Hr & 3) !== 0 && qs(),
        mr(t),
        (d = t.pendingLanes),
        (l & 261930) !== 0 && (d & 42) !== 0
          ? t === Kf
            ? Yl++
            : ((Yl = 0), (Kf = t))
          : (Yl = 0),
        Il(0));
    }
  }
  function Oy(t, r) {
    (t.pooledCacheLanes &= r) === 0 &&
      ((r = t.pooledCache), r != null && ((t.pooledCache = null), Cl(r)));
  }
  function qs() {
    return (Ty(), Ry(), Ay(), zy());
  }
  function zy() {
    if (Ht !== 5) return !1;
    var t = pi,
      r = Gf;
    Gf = 0;
    var l = I(Hr),
      s = D.T,
      d = te.p;
    try {
      ((te.p = 32 > l ? 32 : l), (D.T = null), (l = Qf), (Qf = null));
      var m = pi,
        b = Hr;
      if (((Ht = 0), (Ua = pi = null), (Hr = 0), (tt & 6) !== 0))
        throw Error(a(331));
      var E = tt;
      if (
        ((tt |= 4),
        dy(m.current),
        uy(m, m.current, b, l),
        (tt = E),
        Il(0, !1),
        kt && typeof kt.onPostCommitFiberRoot == "function")
      )
        try {
          kt.onPostCommitFiberRoot(Bt, m);
        } catch {}
      return !0;
    } finally {
      ((te.p = d), (D.T = s), Oy(t, r));
    }
  }
  function Dy(t, r, l) {
    ((r = Mn(l, r)),
      (r = Tf(t.stateNode, r, 2)),
      (t = oi(t, r, 2)),
      t !== null && (ur(t, 2), mr(t)));
  }
  function at(t, r, l) {
    if (t.tag === 3) Dy(t, t, l);
    else
      for (; r !== null; ) {
        if (r.tag === 3) {
          Dy(r, t, l);
          break;
        } else if (r.tag === 1) {
          var s = r.stateNode;
          if (
            typeof r.type.getDerivedStateFromError == "function" ||
            (typeof s.componentDidCatch == "function" &&
              (hi === null || !hi.has(s)))
          ) {
            ((t = Mn(l, t)),
              (l = Ng(2)),
              (s = oi(r, l, 2)),
              s !== null && (Mg(l, s, r, t), ur(s, 2), mr(s)));
            break;
          }
        }
        r = r.return;
      }
  }
  function Jf(t, r, l) {
    var s = t.pingCache;
    if (s === null) {
      s = t.pingCache = new Lw();
      var d = new Set();
      s.set(r, d);
    } else ((d = s.get(r)), d === void 0 && ((d = new Set()), s.set(r, d)));
    d.has(l) ||
      ((Yf = !0), d.add(l), (t = Fw.bind(null, t, r, l)), r.then(t, t));
  }
  function Fw(t, r, l) {
    var s = t.pingCache;
    (s !== null && s.delete(r),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      ct === t &&
        (Ie & l) === l &&
        (wt === 4 || (wt === 3 && (Ie & 62914560) === Ie && 300 > Vt() - Ms)
          ? (tt & 2) === 0 && Ha(t, 0)
          : (If |= l),
        Ba === Ie && (Ba = 0)),
      mr(t));
  }
  function Ny(t, r) {
    (r === 0 && (r = hl()), (t = Hi(t, r)), t !== null && (ur(t, r), mr(t)));
  }
  function Pw(t) {
    var r = t.memoizedState,
      l = 0;
    (r !== null && (l = r.retryLane), Ny(t, l));
  }
  function Vw(t, r) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var s = t.stateNode,
          d = t.memoizedState;
        d !== null && (l = d.retryLane);
        break;
      case 19:
        s = t.stateNode;
        break;
      case 22:
        s = t.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    (s !== null && s.delete(r), Ny(t, l));
  }
  function Yw(t, r) {
    return wr(t, r);
  }
  var Fs = null,
    Fa = null,
    Wf = !1,
    Ps = !1,
    ed = !1,
    gi = 0;
  function mr(t) {
    (t !== Fa &&
      t.next === null &&
      (Fa === null ? (Fs = Fa = t) : (Fa = Fa.next = t)),
      (Ps = !0),
      Wf || ((Wf = !0), Xw()));
  }
  function Il(t, r) {
    if (!ed && Ps) {
      ed = !0;
      do
        for (var l = !1, s = Fs; s !== null; ) {
          if (t !== 0) {
            var d = s.pendingLanes;
            if (d === 0) var m = 0;
            else {
              var b = s.suspendedLanes,
                E = s.pingedLanes;
              ((m = (1 << (31 - nt(42 | t) + 1)) - 1),
                (m &= d & ~(b & ~E)),
                (m = m & 201326741 ? (m & 201326741) | 1 : m ? m | 2 : 0));
            }
            m !== 0 && ((l = !0), By(s, m));
          } else
            ((m = Ie),
              (m = ua(
                s,
                s === ct ? m : 0,
                s.cancelPendingCommit !== null || s.timeoutHandle !== -1,
              )),
              (m & 3) === 0 || $r(s, m) || ((l = !0), By(s, m)));
          s = s.next;
        }
      while (l);
      ed = !1;
    }
  }
  function Iw() {
    My();
  }
  function My() {
    Ps = Wf = !1;
    var t = 0;
    gi !== 0 && n2() && (t = gi);
    for (var r = Vt(), l = null, s = Fs; s !== null; ) {
      var d = s.next,
        m = jy(s, r);
      (m === 0
        ? ((s.next = null),
          l === null ? (Fs = d) : (l.next = d),
          d === null && (Fa = l))
        : ((l = s), (t !== 0 || (m & 3) !== 0) && (Ps = !0)),
        (s = d));
    }
    ((Ht !== 0 && Ht !== 5) || Il(t), gi !== 0 && (gi = 0));
  }
  function jy(t, r) {
    for (
      var l = t.suspendedLanes,
        s = t.pingedLanes,
        d = t.expirationTimes,
        m = t.pendingLanes & -62914561;
      0 < m;
    ) {
      var b = 31 - nt(m),
        E = 1 << b,
        A = d[b];
      (A === -1
        ? ((E & l) === 0 || (E & s) !== 0) && (d[b] = yc(E, r))
        : A <= r && (t.expiredLanes |= E),
        (m &= ~E));
    }
    if (
      ((r = ct),
      (l = Ie),
      (l = ua(
        t,
        t === r ? l : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      (s = t.callbackNode),
      l === 0 ||
        (t === r && (it === 2 || it === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        s !== null && s !== null && zi(s),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((l & 3) === 0 || $r(t, l)) {
      if (((r = l & -l), r === t.callbackPriority)) return r;
      switch ((s !== null && zi(s), I(l))) {
        case 2:
        case 8:
          l = de;
          break;
        case 32:
          l = Re;
          break;
        case 268435456:
          l = Ue;
          break;
        default:
          l = Re;
      }
      return (
        (s = Ly.bind(null, t)),
        (l = wr(l, s)),
        (t.callbackPriority = r),
        (t.callbackNode = l),
        r
      );
    }
    return (
      s !== null && s !== null && zi(s),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Ly(t, r) {
    if (Ht !== 0 && Ht !== 5)
      return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var l = t.callbackNode;
    if (qs() && t.callbackNode !== l) return null;
    var s = Ie;
    return (
      (s = ua(
        t,
        t === ct ? s : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      s === 0
        ? null
        : (yy(t, s, r),
          jy(t, Vt()),
          t.callbackNode != null && t.callbackNode === l
            ? Ly.bind(null, t)
            : null)
    );
  }
  function By(t, r) {
    if (qs()) return null;
    yy(t, r, !0);
  }
  function Xw() {
    i2(function () {
      (tt & 6) !== 0 ? wr(J, Iw) : My();
    });
  }
  function td() {
    if (gi === 0) {
      var t = _a;
      (t === 0 && ((t = Di), (Di <<= 1), (Di & 261888) === 0 && (Di = 256)),
        (gi = t));
    }
    return gi;
  }
  function Uy(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : Zo("" + t);
  }
  function Hy(t, r) {
    var l = r.ownerDocument.createElement("input");
    return (
      (l.name = r.name),
      (l.value = r.value),
      t.id && l.setAttribute("form", t.id),
      r.parentNode.insertBefore(l, r),
      (t = new FormData(t)),
      l.parentNode.removeChild(l),
      t
    );
  }
  function Gw(t, r, l, s, d) {
    if (r === "submit" && l && l.stateNode === d) {
      var m = Uy((d[ge] || null).action),
        b = s.submitter;
      b &&
        ((r = (r = b[ge] || null)
          ? Uy(r.formAction)
          : b.getAttribute("formAction")),
        r !== null && ((m = r), (b = null)));
      var E = new es("action", "action", null, s, d);
      t.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (s.defaultPrevented) {
                if (gi !== 0) {
                  var A = b ? Hy(d, b) : new FormData(d);
                  Sf(
                    l,
                    { pending: !0, data: A, method: d.method, action: m },
                    null,
                    A,
                  );
                }
              } else
                typeof m == "function" &&
                  (E.preventDefault(),
                  (A = b ? Hy(d, b) : new FormData(d)),
                  Sf(
                    l,
                    { pending: !0, data: A, method: d.method, action: m },
                    m,
                    A,
                  ));
            },
            currentTarget: d,
          },
        ],
      });
    }
  }
  for (var nd = 0; nd < Bc.length; nd++) {
    var rd = Bc[nd],
      Qw = rd.toLowerCase(),
      Kw = rd[0].toUpperCase() + rd.slice(1);
    Jn(Qw, "on" + Kw);
  }
  (Jn(gm, "onAnimationEnd"),
    Jn(ym, "onAnimationIteration"),
    Jn(bm, "onAnimationStart"),
    Jn("dblclick", "onDoubleClick"),
    Jn("focusin", "onFocus"),
    Jn("focusout", "onBlur"),
    Jn(fw, "onTransitionRun"),
    Jn(dw, "onTransitionStart"),
    Jn(hw, "onTransitionCancel"),
    Jn(xm, "onTransitionEnd"),
    cr("onMouseEnter", ["mouseout", "mouseover"]),
    cr("onMouseLeave", ["mouseout", "mouseover"]),
    cr("onPointerEnter", ["pointerout", "pointerover"]),
    cr("onPointerLeave", ["pointerout", "pointerover"]),
    Ft(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Ft(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Ft("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ft(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Ft(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Ft(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var Xl =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Zw = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Xl),
    );
  function qy(t, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var s = t[l],
        d = s.event;
      s = s.listeners;
      e: {
        var m = void 0;
        if (r)
          for (var b = s.length - 1; 0 <= b; b--) {
            var E = s[b],
              A = E.instance,
              V = E.currentTarget;
            if (((E = E.listener), A !== m && d.isPropagationStopped()))
              break e;
            ((m = E), (d.currentTarget = V));
            try {
              m(d);
            } catch (W) {
              rs(W);
            }
            ((d.currentTarget = null), (m = A));
          }
        else
          for (b = 0; b < s.length; b++) {
            if (
              ((E = s[b]),
              (A = E.instance),
              (V = E.currentTarget),
              (E = E.listener),
              A !== m && d.isPropagationStopped())
            )
              break e;
            ((m = E), (d.currentTarget = V));
            try {
              m(d);
            } catch (W) {
              rs(W);
            }
            ((d.currentTarget = null), (m = A));
          }
      }
    }
  }
  function Ve(t, r) {
    var l = r[Ce];
    l === void 0 && (l = r[Ce] = new Set());
    var s = t + "__bubble";
    l.has(s) || (Fy(r, t, 2, !1), l.add(s));
  }
  function id(t, r, l) {
    var s = 0;
    (r && (s |= 4), Fy(l, t, s, r));
  }
  var Vs = "_reactListening" + Math.random().toString(36).slice(2);
  function ad(t) {
    if (!t[Vs]) {
      ((t[Vs] = !0),
        Wr.forEach(function (l) {
          l !== "selectionchange" && (Zw.has(l) || id(l, !1, t), id(l, !0, t));
        }));
      var r = t.nodeType === 9 ? t : t.ownerDocument;
      r === null || r[Vs] || ((r[Vs] = !0), id("selectionchange", !1, r));
    }
  }
  function Fy(t, r, l, s) {
    switch (g0(r)) {
      case 2:
        var d = k2;
        break;
      case 8:
        d = C2;
        break;
      default:
        d = vd;
    }
    ((l = d.bind(null, r, l, t)),
      (d = void 0),
      !kc ||
        (r !== "touchstart" && r !== "touchmove" && r !== "wheel") ||
        (d = !0),
      s
        ? d !== void 0
          ? t.addEventListener(r, l, { capture: !0, passive: d })
          : t.addEventListener(r, l, !0)
        : d !== void 0
          ? t.addEventListener(r, l, { passive: d })
          : t.addEventListener(r, l, !1));
  }
  function ld(t, r, l, s, d) {
    var m = s;
    if ((r & 1) === 0 && (r & 2) === 0 && s !== null)
      e: for (;;) {
        if (s === null) return;
        var b = s.tag;
        if (b === 3 || b === 4) {
          var E = s.stateNode.containerInfo;
          if (E === d) break;
          if (b === 4)
            for (b = s.return; b !== null; ) {
              var A = b.tag;
              if ((A === 3 || A === 4) && b.stateNode.containerInfo === d)
                return;
              b = b.return;
            }
          for (; E !== null; ) {
            if (((b = pt(E)), b === null)) return;
            if (((A = b.tag), A === 5 || A === 6 || A === 26 || A === 27)) {
              s = m = b;
              continue e;
            }
            E = E.parentNode;
          }
        }
        s = s.return;
      }
    Xp(function () {
      var V = m,
        W = wc(l),
        re = [];
      e: {
        var Y = vm.get(t);
        if (Y !== void 0) {
          var Q = es,
            ve = t;
          switch (t) {
            case "keypress":
              if (Jo(l) === 0) break e;
            case "keydown":
            case "keyup":
              Q = VS;
              break;
            case "focusin":
              ((ve = "focus"), (Q = Rc));
              break;
            case "focusout":
              ((ve = "blur"), (Q = Rc));
              break;
            case "beforeblur":
            case "afterblur":
              Q = Rc;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Q = Kp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Q = zS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Q = XS;
              break;
            case gm:
            case ym:
            case bm:
              Q = MS;
              break;
            case xm:
              Q = QS;
              break;
            case "scroll":
            case "scrollend":
              Q = AS;
              break;
            case "wheel":
              Q = ZS;
              break;
            case "copy":
            case "cut":
            case "paste":
              Q = LS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Q = $p;
              break;
            case "toggle":
            case "beforetoggle":
              Q = JS;
          }
          var Oe = (r & 4) !== 0,
            st = !Oe && (t === "scroll" || t === "scrollend"),
            q = Oe ? (Y !== null ? Y + "Capture" : null) : Y;
          Oe = [];
          for (var L = V, P; L !== null; ) {
            var ne = L;
            if (
              ((P = ne.stateNode),
              (ne = ne.tag),
              (ne !== 5 && ne !== 26 && ne !== 27) ||
                P === null ||
                q === null ||
                ((ne = pl(L, q)), ne != null && Oe.push(Gl(L, ne, P))),
              st)
            )
              break;
            L = L.return;
          }
          0 < Oe.length &&
            ((Y = new Q(Y, ve, null, l, W)),
            re.push({ event: Y, listeners: Oe }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (
            ((Y = t === "mouseover" || t === "pointerover"),
            (Q = t === "mouseout" || t === "pointerout"),
            Y &&
              l !== Sc &&
              (ve = l.relatedTarget || l.fromElement) &&
              (pt(ve) || ve[ye]))
          )
            break e;
          if (
            (Q || Y) &&
            ((Y =
              W.window === W
                ? W
                : (Y = W.ownerDocument)
                  ? Y.defaultView || Y.parentWindow
                  : window),
            Q
              ? ((ve = l.relatedTarget || l.toElement),
                (Q = V),
                (ve = ve ? pt(ve) : null),
                ve !== null &&
                  ((st = u(ve)),
                  (Oe = ve.tag),
                  ve !== st || (Oe !== 5 && Oe !== 27 && Oe !== 6)) &&
                  (ve = null))
              : ((Q = null), (ve = V)),
            Q !== ve)
          ) {
            if (
              ((Oe = Kp),
              (ne = "onMouseLeave"),
              (q = "onMouseEnter"),
              (L = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((Oe = $p),
                (ne = "onPointerLeave"),
                (q = "onPointerEnter"),
                (L = "pointer")),
              (st = Q == null ? Y : Ze(Q)),
              (P = ve == null ? Y : Ze(ve)),
              (Y = new Oe(ne, L + "leave", Q, l, W)),
              (Y.target = st),
              (Y.relatedTarget = P),
              (ne = null),
              pt(W) === V &&
                ((Oe = new Oe(q, L + "enter", ve, l, W)),
                (Oe.target = P),
                (Oe.relatedTarget = st),
                (ne = Oe)),
              (st = ne),
              Q && ve)
            )
              t: {
                for (Oe = $w, q = Q, L = ve, P = 0, ne = q; ne; ne = Oe(ne))
                  P++;
                ne = 0;
                for (var _e = L; _e; _e = Oe(_e)) ne++;
                for (; 0 < P - ne; ) ((q = Oe(q)), P--);
                for (; 0 < ne - P; ) ((L = Oe(L)), ne--);
                for (; P--; ) {
                  if (q === L || (L !== null && q === L.alternate)) {
                    Oe = q;
                    break t;
                  }
                  ((q = Oe(q)), (L = Oe(L)));
                }
                Oe = null;
              }
            else Oe = null;
            (Q !== null && Py(re, Y, Q, Oe, !1),
              ve !== null && st !== null && Py(re, st, ve, Oe, !0));
          }
        }
        e: {
          if (
            ((Y = V ? Ze(V) : window),
            (Q = Y.nodeName && Y.nodeName.toLowerCase()),
            Q === "select" || (Q === "input" && Y.type === "file"))
          )
            var We = am;
          else if (rm(Y))
            if (lm) We = sw;
            else {
              We = lw;
              var we = aw;
            }
          else
            ((Q = Y.nodeName),
              !Q ||
              Q.toLowerCase() !== "input" ||
              (Y.type !== "checkbox" && Y.type !== "radio")
                ? V && vc(V.elementType) && (We = am)
                : (We = ow));
          if (We && (We = We(t, V))) {
            im(re, We, l, W);
            break e;
          }
          (we && we(t, Y, V),
            t === "focusout" &&
              V &&
              Y.type === "number" &&
              V.memoizedProps.value != null &&
              xc(Y, "number", Y.value));
        }
        switch (((we = V ? Ze(V) : window), t)) {
          case "focusin":
            (rm(we) || we.contentEditable === "true") &&
              ((ba = we), (Mc = V), (wl = null));
            break;
          case "focusout":
            wl = Mc = ba = null;
            break;
          case "mousedown":
            jc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((jc = !1), pm(re, l, W));
            break;
          case "selectionchange":
            if (cw) break;
          case "keydown":
          case "keyup":
            pm(re, l, W);
        }
        var Le;
        if (Oc)
          e: {
            switch (t) {
              case "compositionstart":
                var Xe = "onCompositionStart";
                break e;
              case "compositionend":
                Xe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Xe = "onCompositionUpdate";
                break e;
            }
            Xe = void 0;
          }
        else
          ya
            ? tm(t, l) && (Xe = "onCompositionEnd")
            : t === "keydown" &&
              l.keyCode === 229 &&
              (Xe = "onCompositionStart");
        (Xe &&
          (Jp &&
            l.locale !== "ko" &&
            (ya || Xe !== "onCompositionStart"
              ? Xe === "onCompositionEnd" && ya && (Le = Gp())
              : ((ei = W),
                (Cc = "value" in ei ? ei.value : ei.textContent),
                (ya = !0))),
          (we = Ys(V, Xe)),
          0 < we.length &&
            ((Xe = new Zp(Xe, t, null, l, W)),
            re.push({ event: Xe, listeners: we }),
            Le
              ? (Xe.data = Le)
              : ((Le = nm(l)), Le !== null && (Xe.data = Le)))),
          (Le = ew ? tw(t, l) : nw(t, l)) &&
            ((Xe = Ys(V, "onBeforeInput")),
            0 < Xe.length &&
              ((we = new Zp("onBeforeInput", "beforeinput", null, l, W)),
              re.push({ event: we, listeners: Xe }),
              (we.data = Le))),
          Gw(re, t, V, l, W));
      }
      qy(re, r);
    });
  }
  function Gl(t, r, l) {
    return { instance: t, listener: r, currentTarget: l };
  }
  function Ys(t, r) {
    for (var l = r + "Capture", s = []; t !== null; ) {
      var d = t,
        m = d.stateNode;
      if (
        ((d = d.tag),
        (d !== 5 && d !== 26 && d !== 27) ||
          m === null ||
          ((d = pl(t, l)),
          d != null && s.unshift(Gl(t, d, m)),
          (d = pl(t, r)),
          d != null && s.push(Gl(t, d, m))),
        t.tag === 3)
      )
        return s;
      t = t.return;
    }
    return [];
  }
  function $w(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Py(t, r, l, s, d) {
    for (var m = r._reactName, b = []; l !== null && l !== s; ) {
      var E = l,
        A = E.alternate,
        V = E.stateNode;
      if (((E = E.tag), A !== null && A === s)) break;
      ((E !== 5 && E !== 26 && E !== 27) ||
        V === null ||
        ((A = V),
        d
          ? ((V = pl(l, m)), V != null && b.unshift(Gl(l, V, A)))
          : d || ((V = pl(l, m)), V != null && b.push(Gl(l, V, A)))),
        (l = l.return));
    }
    b.length !== 0 && t.push({ event: r, listeners: b });
  }
  var Jw = /\r\n?/g,
    Ww = /\u0000|\uFFFD/g;
  function Vy(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        Jw,
        `
`,
      )
      .replace(Ww, "");
  }
  function Yy(t, r) {
    return ((r = Vy(r)), Vy(t) === r);
  }
  function ot(t, r, l, s, d, m) {
    switch (l) {
      case "children":
        typeof s == "string"
          ? r === "body" || (r === "textarea" && s === "") || pa(t, s)
          : (typeof s == "number" || typeof s == "bigint") &&
            r !== "body" &&
            pa(t, "" + s);
        break;
      case "className":
        Ct(t, "class", s);
        break;
      case "tabIndex":
        Ct(t, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ct(t, l, s);
        break;
      case "style":
        Yp(t, s, m);
        break;
      case "data":
        if (r !== "object") {
          Ct(t, "data", s);
          break;
        }
      case "src":
      case "href":
        if (s === "" && (r !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "symbol" ||
          typeof s == "boolean"
        ) {
          t.removeAttribute(l);
          break;
        }
        ((s = Zo("" + s)), t.setAttribute(l, s));
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof m == "function" &&
            (l === "formAction"
              ? (r !== "input" && ot(t, r, "name", d.name, d, null),
                ot(t, r, "formEncType", d.formEncType, d, null),
                ot(t, r, "formMethod", d.formMethod, d, null),
                ot(t, r, "formTarget", d.formTarget, d, null))
              : (ot(t, r, "encType", d.encType, d, null),
                ot(t, r, "method", d.method, d, null),
                ot(t, r, "target", d.target, d, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          t.removeAttribute(l);
          break;
        }
        ((s = Zo("" + s)), t.setAttribute(l, s));
        break;
      case "onClick":
        s != null && (t.onclick = kr);
        break;
      case "onScroll":
        s != null && Ve("scroll", t);
        break;
      case "onScrollEnd":
        s != null && Ve("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(a(61));
          if (((l = s.__html), l != null)) {
            if (d.children != null) throw Error(a(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        t.muted = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "boolean" ||
          typeof s == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        ((l = Zo("" + s)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        s != null && typeof s != "function" && typeof s != "symbol"
          ? t.setAttribute(l, "" + s)
          : t.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        s && typeof s != "function" && typeof s != "symbol"
          ? t.setAttribute(l, "")
          : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        s === !0
          ? t.setAttribute(l, "")
          : s !== !1 &&
              s != null &&
              typeof s != "function" &&
              typeof s != "symbol"
            ? t.setAttribute(l, s)
            : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null &&
        typeof s != "function" &&
        typeof s != "symbol" &&
        !isNaN(s) &&
        1 <= s
          ? t.setAttribute(l, s)
          : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s)
          ? t.removeAttribute(l)
          : t.setAttribute(l, s);
        break;
      case "popover":
        (Ve("beforetoggle", t), Ve("toggle", t), Fe(t, "popover", s));
        break;
      case "xlinkActuate":
        $t(t, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
        break;
      case "xlinkArcrole":
        $t(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
        break;
      case "xlinkRole":
        $t(t, "http://www.w3.org/1999/xlink", "xlink:role", s);
        break;
      case "xlinkShow":
        $t(t, "http://www.w3.org/1999/xlink", "xlink:show", s);
        break;
      case "xlinkTitle":
        $t(t, "http://www.w3.org/1999/xlink", "xlink:title", s);
        break;
      case "xlinkType":
        $t(t, "http://www.w3.org/1999/xlink", "xlink:type", s);
        break;
      case "xmlBase":
        $t(t, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
        break;
      case "xmlLang":
        $t(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
        break;
      case "xmlSpace":
        $t(t, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
        break;
      case "is":
        Fe(t, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = TS.get(l) || l), Fe(t, l, s));
    }
  }
  function od(t, r, l, s, d, m) {
    switch (l) {
      case "style":
        Yp(t, s, m);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(a(61));
          if (((l = s.__html), l != null)) {
            if (d.children != null) throw Error(a(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof s == "string"
          ? pa(t, s)
          : (typeof s == "number" || typeof s == "bigint") && pa(t, "" + s);
        break;
      case "onScroll":
        s != null && Ve("scroll", t);
        break;
      case "onScrollEnd":
        s != null && Ve("scrollend", t);
        break;
      case "onClick":
        s != null && (t.onclick = kr);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!$n.hasOwnProperty(l))
          e: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((d = l.endsWith("Capture")),
              (r = l.slice(2, d ? l.length - 7 : void 0)),
              (m = t[ge] || null),
              (m = m != null ? m[l] : null),
              typeof m == "function" && t.removeEventListener(r, m, d),
              typeof s == "function")
            ) {
              (typeof m != "function" &&
                m !== null &&
                (l in t
                  ? (t[l] = null)
                  : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(r, s, d));
              break e;
            }
            l in t
              ? (t[l] = s)
              : s === !0
                ? t.setAttribute(l, "")
                : Fe(t, l, s);
          }
    }
  }
  function Gt(t, r, l) {
    switch (r) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Ve("error", t), Ve("load", t));
        var s = !1,
          d = !1,
          m;
        for (m in l)
          if (l.hasOwnProperty(m)) {
            var b = l[m];
            if (b != null)
              switch (m) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  d = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, r));
                default:
                  ot(t, r, m, b, l, null);
              }
          }
        (d && ot(t, r, "srcSet", l.srcSet, l, null),
          s && ot(t, r, "src", l.src, l, null));
        return;
      case "input":
        Ve("invalid", t);
        var E = (m = b = d = null),
          A = null,
          V = null;
        for (s in l)
          if (l.hasOwnProperty(s)) {
            var W = l[s];
            if (W != null)
              switch (s) {
                case "name":
                  d = W;
                  break;
                case "type":
                  b = W;
                  break;
                case "checked":
                  A = W;
                  break;
                case "defaultChecked":
                  V = W;
                  break;
                case "value":
                  m = W;
                  break;
                case "defaultValue":
                  E = W;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (W != null) throw Error(a(137, r));
                  break;
                default:
                  ot(t, r, s, W, l, null);
              }
          }
        qp(t, m, E, A, V, b, d, !1);
        return;
      case "select":
        (Ve("invalid", t), (s = b = m = null));
        for (d in l)
          if (l.hasOwnProperty(d) && ((E = l[d]), E != null))
            switch (d) {
              case "value":
                m = E;
                break;
              case "defaultValue":
                b = E;
                break;
              case "multiple":
                s = E;
              default:
                ot(t, r, d, E, l, null);
            }
        ((r = m),
          (l = b),
          (t.multiple = !!s),
          r != null ? ha(t, !!s, r, !1) : l != null && ha(t, !!s, l, !0));
        return;
      case "textarea":
        (Ve("invalid", t), (m = d = s = null));
        for (b in l)
          if (l.hasOwnProperty(b) && ((E = l[b]), E != null))
            switch (b) {
              case "value":
                s = E;
                break;
              case "defaultValue":
                d = E;
                break;
              case "children":
                m = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(a(91));
                break;
              default:
                ot(t, r, b, E, l, null);
            }
        Pp(t, s, d, m);
        return;
      case "option":
        for (A in l)
          l.hasOwnProperty(A) &&
            ((s = l[A]), s != null) &&
            (A === "selected"
              ? (t.selected =
                  s && typeof s != "function" && typeof s != "symbol")
              : ot(t, r, A, s, l, null));
        return;
      case "dialog":
        (Ve("beforetoggle", t),
          Ve("toggle", t),
          Ve("cancel", t),
          Ve("close", t));
        break;
      case "iframe":
      case "object":
        Ve("load", t);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Xl.length; s++) Ve(Xl[s], t);
        break;
      case "image":
        (Ve("error", t), Ve("load", t));
        break;
      case "details":
        Ve("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        (Ve("error", t), Ve("load", t));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (V in l)
          if (l.hasOwnProperty(V) && ((s = l[V]), s != null))
            switch (V) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, r));
              default:
                ot(t, r, V, s, l, null);
            }
        return;
      default:
        if (vc(r)) {
          for (W in l)
            l.hasOwnProperty(W) &&
              ((s = l[W]), s !== void 0 && od(t, r, W, s, l, void 0));
          return;
        }
    }
    for (E in l)
      l.hasOwnProperty(E) && ((s = l[E]), s != null && ot(t, r, E, s, l, null));
  }
  function e2(t, r, l, s) {
    switch (r) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var d = null,
          m = null,
          b = null,
          E = null,
          A = null,
          V = null,
          W = null;
        for (Q in l) {
          var re = l[Q];
          if (l.hasOwnProperty(Q) && re != null)
            switch (Q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                A = re;
              default:
                s.hasOwnProperty(Q) || ot(t, r, Q, null, s, re);
            }
        }
        for (var Y in s) {
          var Q = s[Y];
          if (((re = l[Y]), s.hasOwnProperty(Y) && (Q != null || re != null)))
            switch (Y) {
              case "type":
                m = Q;
                break;
              case "name":
                d = Q;
                break;
              case "checked":
                V = Q;
                break;
              case "defaultChecked":
                W = Q;
                break;
              case "value":
                b = Q;
                break;
              case "defaultValue":
                E = Q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Q != null) throw Error(a(137, r));
                break;
              default:
                Q !== re && ot(t, r, Y, Q, s, re);
            }
        }
        bc(t, b, E, A, V, W, m, d);
        return;
      case "select":
        Q = b = E = Y = null;
        for (m in l)
          if (((A = l[m]), l.hasOwnProperty(m) && A != null))
            switch (m) {
              case "value":
                break;
              case "multiple":
                Q = A;
              default:
                s.hasOwnProperty(m) || ot(t, r, m, null, s, A);
            }
        for (d in s)
          if (
            ((m = s[d]),
            (A = l[d]),
            s.hasOwnProperty(d) && (m != null || A != null))
          )
            switch (d) {
              case "value":
                Y = m;
                break;
              case "defaultValue":
                E = m;
                break;
              case "multiple":
                b = m;
              default:
                m !== A && ot(t, r, d, m, s, A);
            }
        ((r = E),
          (l = b),
          (s = Q),
          Y != null
            ? ha(t, !!l, Y, !1)
            : !!s != !!l &&
              (r != null ? ha(t, !!l, r, !0) : ha(t, !!l, l ? [] : "", !1)));
        return;
      case "textarea":
        Q = Y = null;
        for (E in l)
          if (
            ((d = l[E]),
            l.hasOwnProperty(E) && d != null && !s.hasOwnProperty(E))
          )
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(t, r, E, null, s, d);
            }
        for (b in s)
          if (
            ((d = s[b]),
            (m = l[b]),
            s.hasOwnProperty(b) && (d != null || m != null))
          )
            switch (b) {
              case "value":
                Y = d;
                break;
              case "defaultValue":
                Q = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(a(91));
                break;
              default:
                d !== m && ot(t, r, b, d, s, m);
            }
        Fp(t, Y, Q);
        return;
      case "option":
        for (var ve in l)
          ((Y = l[ve]),
            l.hasOwnProperty(ve) &&
              Y != null &&
              !s.hasOwnProperty(ve) &&
              (ve === "selected"
                ? (t.selected = !1)
                : ot(t, r, ve, null, s, Y)));
        for (A in s)
          ((Y = s[A]),
            (Q = l[A]),
            s.hasOwnProperty(A) &&
              Y !== Q &&
              (Y != null || Q != null) &&
              (A === "selected"
                ? (t.selected =
                    Y && typeof Y != "function" && typeof Y != "symbol")
                : ot(t, r, A, Y, s, Q)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Oe in l)
          ((Y = l[Oe]),
            l.hasOwnProperty(Oe) &&
              Y != null &&
              !s.hasOwnProperty(Oe) &&
              ot(t, r, Oe, null, s, Y));
        for (V in s)
          if (
            ((Y = s[V]),
            (Q = l[V]),
            s.hasOwnProperty(V) && Y !== Q && (Y != null || Q != null))
          )
            switch (V) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null) throw Error(a(137, r));
                break;
              default:
                ot(t, r, V, Y, s, Q);
            }
        return;
      default:
        if (vc(r)) {
          for (var st in l)
            ((Y = l[st]),
              l.hasOwnProperty(st) &&
                Y !== void 0 &&
                !s.hasOwnProperty(st) &&
                od(t, r, st, void 0, s, Y));
          for (W in s)
            ((Y = s[W]),
              (Q = l[W]),
              !s.hasOwnProperty(W) ||
                Y === Q ||
                (Y === void 0 && Q === void 0) ||
                od(t, r, W, Y, s, Q));
          return;
        }
    }
    for (var q in l)
      ((Y = l[q]),
        l.hasOwnProperty(q) &&
          Y != null &&
          !s.hasOwnProperty(q) &&
          ot(t, r, q, null, s, Y));
    for (re in s)
      ((Y = s[re]),
        (Q = l[re]),
        !s.hasOwnProperty(re) ||
          Y === Q ||
          (Y == null && Q == null) ||
          ot(t, r, re, Y, s, Q));
  }
  function Iy(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function t2() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, r = 0, l = performance.getEntriesByType("resource"), s = 0;
        s < l.length;
        s++
      ) {
        var d = l[s],
          m = d.transferSize,
          b = d.initiatorType,
          E = d.duration;
        if (m && E && Iy(b)) {
          for (b = 0, E = d.responseEnd, s += 1; s < l.length; s++) {
            var A = l[s],
              V = A.startTime;
            if (V > E) break;
            var W = A.transferSize,
              re = A.initiatorType;
            W &&
              Iy(re) &&
              ((A = A.responseEnd), (b += W * (A < E ? 1 : (E - V) / (A - V))));
          }
          if ((--s, (r += (8 * (m + b)) / (d.duration / 1e3)), t++, 10 < t))
            break;
        }
      }
      if (0 < t) return r / t / 1e6;
    }
    return navigator.connection &&
      ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var sd = null,
    ud = null;
  function Is(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Xy(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Gy(t, r) {
    if (t === 0)
      switch (r) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && r === "foreignObject" ? 0 : t;
  }
  function cd(t, r) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof r.children == "string" ||
      typeof r.children == "number" ||
      typeof r.children == "bigint" ||
      (typeof r.dangerouslySetInnerHTML == "object" &&
        r.dangerouslySetInnerHTML !== null &&
        r.dangerouslySetInnerHTML.__html != null)
    );
  }
  var fd = null;
  function n2() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === fd
        ? !1
        : ((fd = t), !0)
      : ((fd = null), !1);
  }
  var Qy = typeof setTimeout == "function" ? setTimeout : void 0,
    r2 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Ky = typeof Promise == "function" ? Promise : void 0,
    i2 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Ky < "u"
          ? function (t) {
              return Ky.resolve(null).then(t).catch(a2);
            }
          : Qy;
  function a2(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function yi(t) {
    return t === "head";
  }
  function Zy(t, r) {
    var l = r,
      s = 0;
    do {
      var d = l.nextSibling;
      if ((t.removeChild(l), d && d.nodeType === 8))
        if (((l = d.data), l === "/$" || l === "/&")) {
          if (s === 0) {
            (t.removeChild(d), Ia(r));
            return;
          }
          s--;
        } else if (
          l === "$" ||
          l === "$?" ||
          l === "$~" ||
          l === "$!" ||
          l === "&"
        )
          s++;
        else if (l === "html") Ql(t.ownerDocument.documentElement);
        else if (l === "head") {
          ((l = t.ownerDocument.head), Ql(l));
          for (var m = l.firstChild; m; ) {
            var b = m.nextSibling,
              E = m.nodeName;
            (m[qe] ||
              E === "SCRIPT" ||
              E === "STYLE" ||
              (E === "LINK" && m.rel.toLowerCase() === "stylesheet") ||
              l.removeChild(m),
              (m = b));
          }
        } else l === "body" && Ql(t.ownerDocument.body);
      l = d;
    } while (l);
    Ia(r);
  }
  function $y(t, r) {
    var l = t;
    t = 0;
    do {
      var s = l.nextSibling;
      if (
        (l.nodeType === 1
          ? r
            ? ((l._stashedDisplay = l.style.display),
              (l.style.display = "none"))
            : ((l.style.display = l._stashedDisplay || ""),
              l.getAttribute("style") === "" && l.removeAttribute("style"))
          : l.nodeType === 3 &&
            (r
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ""))
              : (l.nodeValue = l._stashedText || "")),
        s && s.nodeType === 8)
      )
        if (((l = s.data), l === "/$")) {
          if (t === 0) break;
          t--;
        } else (l !== "$" && l !== "$?" && l !== "$~" && l !== "$!") || t++;
      l = s;
    } while (l);
  }
  function dd(t) {
    var r = t.firstChild;
    for (r && r.nodeType === 10 && (r = r.nextSibling); r; ) {
      var l = r;
      switch (((r = r.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (dd(l), ut(l));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function l2(t, r, l, s) {
    for (; t.nodeType === 1; ) {
      var d = l;
      if (t.nodeName.toLowerCase() !== r.toLowerCase()) {
        if (!s && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (s) {
        if (!t[qe])
          switch (r) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((m = t.getAttribute("rel")),
                m === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                m !== d.rel ||
                t.getAttribute("href") !==
                  (d.href == null || d.href === "" ? null : d.href) ||
                t.getAttribute("crossorigin") !==
                  (d.crossOrigin == null ? null : d.crossOrigin) ||
                t.getAttribute("title") !== (d.title == null ? null : d.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((m = t.getAttribute("src")),
                (m !== (d.src == null ? null : d.src) ||
                  t.getAttribute("type") !== (d.type == null ? null : d.type) ||
                  t.getAttribute("crossorigin") !==
                    (d.crossOrigin == null ? null : d.crossOrigin)) &&
                  m &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (r === "input" && t.type === "hidden") {
        var m = d.name == null ? null : "" + d.name;
        if (d.type === "hidden" && t.getAttribute("name") === m) return t;
      } else return t;
      if (((t = Hn(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function o2(t, r, l) {
    if (r === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !l) ||
        ((t = Hn(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Jy(t, r) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !r) ||
        ((t = Hn(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function hd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function pd(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState !== "loading")
    );
  }
  function s2(t, r) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = r;
    else if (t.data !== "$?" || l.readyState !== "loading") r();
    else {
      var s = function () {
        (r(), l.removeEventListener("DOMContentLoaded", s));
      };
      (l.addEventListener("DOMContentLoaded", s), (t._reactRetry = s));
    }
  }
  function Hn(t) {
    for (; t != null; t = t.nextSibling) {
      var r = t.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (
          ((r = t.data),
          r === "$" ||
            r === "$!" ||
            r === "$?" ||
            r === "$~" ||
            r === "&" ||
            r === "F!" ||
            r === "F")
        )
          break;
        if (r === "/$" || r === "/&") return null;
      }
    }
    return t;
  }
  var md = null;
  function Wy(t) {
    t = t.nextSibling;
    for (var r = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (r === 0) return Hn(t.nextSibling);
          r--;
        } else
          (l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&") ||
            r++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function e0(t) {
    t = t.previousSibling;
    for (var r = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (r === 0) return t;
          r--;
        } else (l !== "/$" && l !== "/&") || r++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function t0(t, r, l) {
    switch (((r = Is(l)), t)) {
      case "html":
        if (((t = r.documentElement), !t)) throw Error(a(452));
        return t;
      case "head":
        if (((t = r.head), !t)) throw Error(a(453));
        return t;
      case "body":
        if (((t = r.body), !t)) throw Error(a(454));
        return t;
      default:
        throw Error(a(451));
    }
  }
  function Ql(t) {
    for (var r = t.attributes; r.length; ) t.removeAttributeNode(r[0]);
    ut(t);
  }
  var qn = new Map(),
    n0 = new Set();
  function Xs(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var qr = te.d;
  te.d = { f: u2, r: c2, D: f2, C: d2, L: h2, m: p2, X: g2, S: m2, M: y2 };
  function u2() {
    var t = qr.f(),
      r = Bs();
    return t || r;
  }
  function c2(t) {
    var r = vt(t);
    r !== null && r.tag === 5 && r.type === "form" ? xg(r) : qr.r(t);
  }
  var Pa = typeof document > "u" ? null : document;
  function r0(t, r, l) {
    var s = Pa;
    if (s && typeof r == "string" && r) {
      var d = Dn(r);
      ((d = 'link[rel="' + t + '"][href="' + d + '"]'),
        typeof l == "string" && (d += '[crossorigin="' + l + '"]'),
        n0.has(d) ||
          (n0.add(d),
          (t = { rel: t, crossOrigin: l, href: r }),
          s.querySelector(d) === null &&
            ((r = s.createElement("link")),
            Gt(r, "link", t),
            dt(r),
            s.head.appendChild(r))));
    }
  }
  function f2(t) {
    (qr.D(t), r0("dns-prefetch", t, null));
  }
  function d2(t, r) {
    (qr.C(t, r), r0("preconnect", t, r));
  }
  function h2(t, r, l) {
    qr.L(t, r, l);
    var s = Pa;
    if (s && t && r) {
      var d = 'link[rel="preload"][as="' + Dn(r) + '"]';
      r === "image" && l && l.imageSrcSet
        ? ((d += '[imagesrcset="' + Dn(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (d += '[imagesizes="' + Dn(l.imageSizes) + '"]'))
        : (d += '[href="' + Dn(t) + '"]');
      var m = d;
      switch (r) {
        case "style":
          m = Va(t);
          break;
        case "script":
          m = Ya(t);
      }
      qn.has(m) ||
        ((t = g(
          {
            rel: "preload",
            href: r === "image" && l && l.imageSrcSet ? void 0 : t,
            as: r,
          },
          l,
        )),
        qn.set(m, t),
        s.querySelector(d) !== null ||
          (r === "style" && s.querySelector(Kl(m))) ||
          (r === "script" && s.querySelector(Zl(m))) ||
          ((r = s.createElement("link")),
          Gt(r, "link", t),
          dt(r),
          s.head.appendChild(r)));
    }
  }
  function p2(t, r) {
    qr.m(t, r);
    var l = Pa;
    if (l && t) {
      var s = r && typeof r.as == "string" ? r.as : "script",
        d =
          'link[rel="modulepreload"][as="' + Dn(s) + '"][href="' + Dn(t) + '"]',
        m = d;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = Ya(t);
      }
      if (
        !qn.has(m) &&
        ((t = g({ rel: "modulepreload", href: t }, r)),
        qn.set(m, t),
        l.querySelector(d) === null)
      ) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Zl(m))) return;
        }
        ((s = l.createElement("link")),
          Gt(s, "link", t),
          dt(s),
          l.head.appendChild(s));
      }
    }
  }
  function m2(t, r, l) {
    qr.S(t, r, l);
    var s = Pa;
    if (s && t) {
      var d = Ut(s).hoistableStyles,
        m = Va(t);
      r = r || "default";
      var b = d.get(m);
      if (!b) {
        var E = { loading: 0, preload: null };
        if ((b = s.querySelector(Kl(m)))) E.loading = 5;
        else {
          ((t = g({ rel: "stylesheet", href: t, "data-precedence": r }, l)),
            (l = qn.get(m)) && gd(t, l));
          var A = (b = s.createElement("link"));
          (dt(A),
            Gt(A, "link", t),
            (A._p = new Promise(function (V, W) {
              ((A.onload = V), (A.onerror = W));
            })),
            A.addEventListener("load", function () {
              E.loading |= 1;
            }),
            A.addEventListener("error", function () {
              E.loading |= 2;
            }),
            (E.loading |= 4),
            Gs(b, r, s));
        }
        ((b = { type: "stylesheet", instance: b, count: 1, state: E }),
          d.set(m, b));
      }
    }
  }
  function g2(t, r) {
    qr.X(t, r);
    var l = Pa;
    if (l && t) {
      var s = Ut(l).hoistableScripts,
        d = Ya(t),
        m = s.get(d);
      m ||
        ((m = l.querySelector(Zl(d))),
        m ||
          ((t = g({ src: t, async: !0 }, r)),
          (r = qn.get(d)) && yd(t, r),
          (m = l.createElement("script")),
          dt(m),
          Gt(m, "link", t),
          l.head.appendChild(m)),
        (m = { type: "script", instance: m, count: 1, state: null }),
        s.set(d, m));
    }
  }
  function y2(t, r) {
    qr.M(t, r);
    var l = Pa;
    if (l && t) {
      var s = Ut(l).hoistableScripts,
        d = Ya(t),
        m = s.get(d);
      m ||
        ((m = l.querySelector(Zl(d))),
        m ||
          ((t = g({ src: t, async: !0, type: "module" }, r)),
          (r = qn.get(d)) && yd(t, r),
          (m = l.createElement("script")),
          dt(m),
          Gt(m, "link", t),
          l.head.appendChild(m)),
        (m = { type: "script", instance: m, count: 1, state: null }),
        s.set(d, m));
    }
  }
  function i0(t, r, l, s) {
    var d = (d = be.current) ? Xs(d) : null;
    if (!d) throw Error(a(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((r = Va(l.href)),
            (l = Ut(d).hoistableStyles),
            (s = l.get(r)),
            s ||
              ((s = { type: "style", instance: null, count: 0, state: null }),
              l.set(r, s)),
            s)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          t = Va(l.href);
          var m = Ut(d).hoistableStyles,
            b = m.get(t);
          if (
            (b ||
              ((d = d.ownerDocument || d),
              (b = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              m.set(t, b),
              (m = d.querySelector(Kl(t))) &&
                !m._p &&
                ((b.instance = m), (b.state.loading = 5)),
              qn.has(t) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                qn.set(t, l),
                m || b2(d, t, l, b.state))),
            r && s === null)
          )
            throw Error(a(528, ""));
          return b;
        }
        if (r && s !== null) throw Error(a(529, ""));
        return null;
      case "script":
        return (
          (r = l.async),
          (l = l.src),
          typeof l == "string" &&
          r &&
          typeof r != "function" &&
          typeof r != "symbol"
            ? ((r = Ya(l)),
              (l = Ut(d).hoistableScripts),
              (s = l.get(r)),
              s ||
                ((s = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(r, s)),
              s)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(a(444, t));
    }
  }
  function Va(t) {
    return 'href="' + Dn(t) + '"';
  }
  function Kl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function a0(t) {
    return g({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function b2(t, r, l, s) {
    t.querySelector('link[rel="preload"][as="style"][' + r + "]")
      ? (s.loading = 1)
      : ((r = t.createElement("link")),
        (s.preload = r),
        r.addEventListener("load", function () {
          return (s.loading |= 1);
        }),
        r.addEventListener("error", function () {
          return (s.loading |= 2);
        }),
        Gt(r, "link", l),
        dt(r),
        t.head.appendChild(r));
  }
  function Ya(t) {
    return '[src="' + Dn(t) + '"]';
  }
  function Zl(t) {
    return "script[async]" + t;
  }
  function l0(t, r, l) {
    if ((r.count++, r.instance === null))
      switch (r.type) {
        case "style":
          var s = t.querySelector('style[data-href~="' + Dn(l.href) + '"]');
          if (s) return ((r.instance = s), dt(s), s);
          var d = g({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (s = (t.ownerDocument || t).createElement("style")),
            dt(s),
            Gt(s, "style", d),
            Gs(s, l.precedence, t),
            (r.instance = s)
          );
        case "stylesheet":
          d = Va(l.href);
          var m = t.querySelector(Kl(d));
          if (m) return ((r.state.loading |= 4), (r.instance = m), dt(m), m);
          ((s = a0(l)),
            (d = qn.get(d)) && gd(s, d),
            (m = (t.ownerDocument || t).createElement("link")),
            dt(m));
          var b = m;
          return (
            (b._p = new Promise(function (E, A) {
              ((b.onload = E), (b.onerror = A));
            })),
            Gt(m, "link", s),
            (r.state.loading |= 4),
            Gs(m, l.precedence, t),
            (r.instance = m)
          );
        case "script":
          return (
            (m = Ya(l.src)),
            (d = t.querySelector(Zl(m)))
              ? ((r.instance = d), dt(d), d)
              : ((s = l),
                (d = qn.get(m)) && ((s = g({}, l)), yd(s, d)),
                (t = t.ownerDocument || t),
                (d = t.createElement("script")),
                dt(d),
                Gt(d, "link", s),
                t.head.appendChild(d),
                (r.instance = d))
          );
        case "void":
          return null;
        default:
          throw Error(a(443, r.type));
      }
    else
      r.type === "stylesheet" &&
        (r.state.loading & 4) === 0 &&
        ((s = r.instance), (r.state.loading |= 4), Gs(s, l.precedence, t));
    return r.instance;
  }
  function Gs(t, r, l) {
    for (
      var s = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        d = s.length ? s[s.length - 1] : null,
        m = d,
        b = 0;
      b < s.length;
      b++
    ) {
      var E = s[b];
      if (E.dataset.precedence === r) m = E;
      else if (m !== d) break;
    }
    m
      ? m.parentNode.insertBefore(t, m.nextSibling)
      : ((r = l.nodeType === 9 ? l.head : l), r.insertBefore(t, r.firstChild));
  }
  function gd(t, r) {
    (t.crossOrigin == null && (t.crossOrigin = r.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = r.referrerPolicy),
      t.title == null && (t.title = r.title));
  }
  function yd(t, r) {
    (t.crossOrigin == null && (t.crossOrigin = r.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = r.referrerPolicy),
      t.integrity == null && (t.integrity = r.integrity));
  }
  var Qs = null;
  function o0(t, r, l) {
    if (Qs === null) {
      var s = new Map(),
        d = (Qs = new Map());
      d.set(l, s);
    } else ((d = Qs), (s = d.get(l)), s || ((s = new Map()), d.set(l, s)));
    if (s.has(t)) return s;
    for (
      s.set(t, null), l = l.getElementsByTagName(t), d = 0;
      d < l.length;
      d++
    ) {
      var m = l[d];
      if (
        !(
          m[qe] ||
          m[pe] ||
          (t === "link" && m.getAttribute("rel") === "stylesheet")
        ) &&
        m.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var b = m.getAttribute(r) || "";
        b = t + b;
        var E = s.get(b);
        E ? E.push(m) : s.set(b, [m]);
      }
    }
    return s;
  }
  function s0(t, r, l) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(
        l,
        r === "title" ? t.querySelector("head > title") : null,
      ));
  }
  function x2(t, r, l) {
    if (l === 1 || r.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof r.precedence != "string" ||
          typeof r.href != "string" ||
          r.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof r.rel != "string" ||
          typeof r.href != "string" ||
          r.href === "" ||
          r.onLoad ||
          r.onError
        )
          break;
        return r.rel === "stylesheet"
          ? ((t = r.disabled), typeof r.precedence == "string" && t == null)
          : !0;
      case "script":
        if (
          r.async &&
          typeof r.async != "function" &&
          typeof r.async != "symbol" &&
          !r.onLoad &&
          !r.onError &&
          r.src &&
          typeof r.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function u0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function v2(t, r, l, s) {
    if (
      l.type === "stylesheet" &&
      (typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var d = Va(s.href),
          m = r.querySelector(Kl(d));
        if (m) {
          ((r = m._p),
            r !== null &&
              typeof r == "object" &&
              typeof r.then == "function" &&
              (t.count++, (t = Ks.bind(t)), r.then(t, t)),
            (l.state.loading |= 4),
            (l.instance = m),
            dt(m));
          return;
        }
        ((m = r.ownerDocument || r),
          (s = a0(s)),
          (d = qn.get(d)) && gd(s, d),
          (m = m.createElement("link")),
          dt(m));
        var b = m;
        ((b._p = new Promise(function (E, A) {
          ((b.onload = E), (b.onerror = A));
        })),
          Gt(m, "link", s),
          (l.instance = m));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(l, r),
        (r = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (t.count++,
          (l = Ks.bind(t)),
          r.addEventListener("load", l),
          r.addEventListener("error", l)));
    }
  }
  var bd = 0;
  function S2(t, r) {
    return (
      t.stylesheets && t.count === 0 && $s(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var s = setTimeout(function () {
              if ((t.stylesheets && $s(t, t.stylesheets), t.unsuspend)) {
                var m = t.unsuspend;
                ((t.unsuspend = null), m());
              }
            }, 6e4 + r);
            0 < t.imgBytes && bd === 0 && (bd = 62500 * t2());
            var d = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 &&
                    (t.stylesheets && $s(t, t.stylesheets), t.unsuspend))
                ) {
                  var m = t.unsuspend;
                  ((t.unsuspend = null), m());
                }
              },
              (t.imgBytes > bd ? 50 : 800) + r,
            );
            return (
              (t.unsuspend = l),
              function () {
                ((t.unsuspend = null), clearTimeout(s), clearTimeout(d));
              }
            );
          }
        : null
    );
  }
  function Ks() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) $s(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Zs = null;
  function $s(t, r) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (Zs = new Map()),
        r.forEach(w2, t),
        (Zs = null),
        Ks.call(t)));
  }
  function w2(t, r) {
    if (!(r.state.loading & 4)) {
      var l = Zs.get(t);
      if (l) var s = l.get(null);
      else {
        ((l = new Map()), Zs.set(t, l));
        for (
          var d = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            m = 0;
          m < d.length;
          m++
        ) {
          var b = d[m];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") &&
            (l.set(b.dataset.precedence, b), (s = b));
        }
        s && l.set(null, s);
      }
      ((d = r.instance),
        (b = d.getAttribute("data-precedence")),
        (m = l.get(b) || s),
        m === s && l.set(null, d),
        l.set(b, d),
        this.count++,
        (s = Ks.bind(this)),
        d.addEventListener("load", s),
        d.addEventListener("error", s),
        m
          ? m.parentNode.insertBefore(d, m.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(d, t.firstChild)),
        (r.state.loading |= 4));
    }
  }
  var $l = {
    $$typeof: M,
    Provider: null,
    Consumer: null,
    _currentValue: fe,
    _currentValue2: fe,
    _threadCount: 0,
  };
  function E2(t, r, l, s, d, m, b, E, A) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Jr(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Jr(0)),
      (this.hiddenUpdates = Jr(null)),
      (this.identifierPrefix = s),
      (this.onUncaughtError = d),
      (this.onCaughtError = m),
      (this.onRecoverableError = b),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = A),
      (this.incompleteTransitions = new Map()));
  }
  function c0(t, r, l, s, d, m, b, E, A, V, W, re) {
    return (
      (t = new E2(t, r, l, b, A, V, W, re, E)),
      (r = 1),
      m === !0 && (r |= 24),
      (m = vn(3, null, null, r)),
      (t.current = m),
      (m.stateNode = t),
      (r = Zc()),
      r.refCount++,
      (t.pooledCache = r),
      r.refCount++,
      (m.memoizedState = { element: s, isDehydrated: l, cache: r }),
      ef(m),
      t
    );
  }
  function f0(t) {
    return t ? ((t = Sa), t) : Sa;
  }
  function d0(t, r, l, s, d, m) {
    ((d = f0(d)),
      s.context === null ? (s.context = d) : (s.pendingContext = d),
      (s = li(r)),
      (s.payload = { element: l }),
      (m = m === void 0 ? null : m),
      m !== null && (s.callback = m),
      (l = oi(t, s, r)),
      l !== null && (pn(l, t, r), Al(l, t, r)));
  }
  function h0(t, r) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function xd(t, r) {
    (h0(t, r), (t = t.alternate) && h0(t, r));
  }
  function p0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var r = Hi(t, 67108864);
      (r !== null && pn(r, t, 67108864), xd(t, 67108864));
    }
  }
  function m0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var r = Cn();
      r = H(r);
      var l = Hi(t, r);
      (l !== null && pn(l, t, r), xd(t, r));
    }
  }
  var Js = !0;
  function k2(t, r, l, s) {
    var d = D.T;
    D.T = null;
    var m = te.p;
    try {
      ((te.p = 2), vd(t, r, l, s));
    } finally {
      ((te.p = m), (D.T = d));
    }
  }
  function C2(t, r, l, s) {
    var d = D.T;
    D.T = null;
    var m = te.p;
    try {
      ((te.p = 8), vd(t, r, l, s));
    } finally {
      ((te.p = m), (D.T = d));
    }
  }
  function vd(t, r, l, s) {
    if (Js) {
      var d = Sd(s);
      if (d === null) (ld(t, r, s, Ws, l), y0(t, s));
      else if (T2(d, t, r, l, s)) s.stopPropagation();
      else if ((y0(t, s), r & 4 && -1 < _2.indexOf(t))) {
        for (; d !== null; ) {
          var m = vt(d);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (((m = m.stateNode), m.current.memoizedState.isDehydrated)) {
                  var b = Zn(m.pendingLanes);
                  if (b !== 0) {
                    var E = m;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; b; ) {
                      var A = 1 << (31 - nt(b));
                      ((E.entanglements[1] |= A), (b &= ~A));
                    }
                    (mr(m), (tt & 6) === 0 && ((js = Vt() + 500), Il(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((E = Hi(m, 2)), E !== null && pn(E, m, 2), Bs(), xd(m, 2));
            }
          if (((m = Sd(s)), m === null && ld(t, r, s, Ws, l), m === d)) break;
          d = m;
        }
        d !== null && s.stopPropagation();
      } else ld(t, r, s, null, l);
    }
  }
  function Sd(t) {
    return ((t = wc(t)), wd(t));
  }
  var Ws = null;
  function wd(t) {
    if (((Ws = null), (t = pt(t)), t !== null)) {
      var r = u(t);
      if (r === null) t = null;
      else {
        var l = r.tag;
        if (l === 13) {
          if (((t = c(r)), t !== null)) return t;
          t = null;
        } else if (l === 31) {
          if (((t = f(r)), t !== null)) return t;
          t = null;
        } else if (l === 3) {
          if (r.stateNode.current.memoizedState.isDehydrated)
            return r.tag === 3 ? r.stateNode.containerInfo : null;
          t = null;
        } else r !== t && (t = null);
      }
    }
    return ((Ws = t), null);
  }
  function g0(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Gn()) {
          case J:
            return 2;
          case de:
            return 8;
          case Re:
          case De:
            return 32;
          case Ue:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ed = !1,
    bi = null,
    xi = null,
    vi = null,
    Jl = new Map(),
    Wl = new Map(),
    Si = [],
    _2 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function y0(t, r) {
    switch (t) {
      case "focusin":
      case "focusout":
        bi = null;
        break;
      case "dragenter":
      case "dragleave":
        xi = null;
        break;
      case "mouseover":
      case "mouseout":
        vi = null;
        break;
      case "pointerover":
      case "pointerout":
        Jl.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wl.delete(r.pointerId);
    }
  }
  function eo(t, r, l, s, d, m) {
    return t === null || t.nativeEvent !== m
      ? ((t = {
          blockedOn: r,
          domEventName: l,
          eventSystemFlags: s,
          nativeEvent: m,
          targetContainers: [d],
        }),
        r !== null && ((r = vt(r)), r !== null && p0(r)),
        t)
      : ((t.eventSystemFlags |= s),
        (r = t.targetContainers),
        d !== null && r.indexOf(d) === -1 && r.push(d),
        t);
  }
  function T2(t, r, l, s, d) {
    switch (r) {
      case "focusin":
        return ((bi = eo(bi, t, r, l, s, d)), !0);
      case "dragenter":
        return ((xi = eo(xi, t, r, l, s, d)), !0);
      case "mouseover":
        return ((vi = eo(vi, t, r, l, s, d)), !0);
      case "pointerover":
        var m = d.pointerId;
        return (Jl.set(m, eo(Jl.get(m) || null, t, r, l, s, d)), !0);
      case "gotpointercapture":
        return (
          (m = d.pointerId),
          Wl.set(m, eo(Wl.get(m) || null, t, r, l, s, d)),
          !0
        );
    }
    return !1;
  }
  function b0(t) {
    var r = pt(t.target);
    if (r !== null) {
      var l = u(r);
      if (l !== null) {
        if (((r = l.tag), r === 13)) {
          if (((r = c(l)), r !== null)) {
            ((t.blockedOn = r),
              ce(t.priority, function () {
                m0(l);
              }));
            return;
          }
        } else if (r === 31) {
          if (((r = f(l)), r !== null)) {
            ((t.blockedOn = r),
              ce(t.priority, function () {
                m0(l);
              }));
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function eu(t) {
    if (t.blockedOn !== null) return !1;
    for (var r = t.targetContainers; 0 < r.length; ) {
      var l = Sd(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var s = new l.constructor(l.type, l);
        ((Sc = s), l.target.dispatchEvent(s), (Sc = null));
      } else return ((r = vt(l)), r !== null && p0(r), (t.blockedOn = l), !1);
      r.shift();
    }
    return !0;
  }
  function x0(t, r, l) {
    eu(t) && l.delete(r);
  }
  function R2() {
    ((Ed = !1),
      bi !== null && eu(bi) && (bi = null),
      xi !== null && eu(xi) && (xi = null),
      vi !== null && eu(vi) && (vi = null),
      Jl.forEach(x0),
      Wl.forEach(x0));
  }
  function tu(t, r) {
    t.blockedOn === r &&
      ((t.blockedOn = null),
      Ed ||
        ((Ed = !0),
        e.unstable_scheduleCallback(e.unstable_NormalPriority, R2)));
  }
  var nu = null;
  function v0(t) {
    nu !== t &&
      ((nu = t),
      e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
        nu === t && (nu = null);
        for (var r = 0; r < t.length; r += 3) {
          var l = t[r],
            s = t[r + 1],
            d = t[r + 2];
          if (typeof s != "function") {
            if (wd(s || l) === null) continue;
            break;
          }
          var m = vt(l);
          m !== null &&
            (t.splice(r, 3),
            (r -= 3),
            Sf(m, { pending: !0, data: d, method: l.method, action: s }, s, d));
        }
      }));
  }
  function Ia(t) {
    function r(A) {
      return tu(A, t);
    }
    (bi !== null && tu(bi, t),
      xi !== null && tu(xi, t),
      vi !== null && tu(vi, t),
      Jl.forEach(r),
      Wl.forEach(r));
    for (var l = 0; l < Si.length; l++) {
      var s = Si[l];
      s.blockedOn === t && (s.blockedOn = null);
    }
    for (; 0 < Si.length && ((l = Si[0]), l.blockedOn === null); )
      (b0(l), l.blockedOn === null && Si.shift());
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (s = 0; s < l.length; s += 3) {
        var d = l[s],
          m = l[s + 1],
          b = d[ge] || null;
        if (typeof m == "function") b || v0(l);
        else if (b) {
          var E = null;
          if (m && m.hasAttribute("formAction")) {
            if (((d = m), (b = m[ge] || null))) E = b.formAction;
            else if (wd(d) !== null) continue;
          } else E = b.action;
          (typeof E == "function" ? (l[s + 1] = E) : (l.splice(s, 3), (s -= 3)),
            v0(l));
        }
      }
  }
  function S0() {
    function t(m) {
      m.canIntercept &&
        m.info === "react-transition" &&
        m.intercept({
          handler: function () {
            return new Promise(function (b) {
              return (d = b);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function r() {
      (d !== null && (d(), (d = null)), s || setTimeout(l, 20));
    }
    function l() {
      if (!s && !navigation.transition) {
        var m = navigation.currentEntry;
        m &&
          m.url != null &&
          navigation.navigate(m.url, {
            state: m.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var s = !1,
        d = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", r),
        navigation.addEventListener("navigateerror", r),
        setTimeout(l, 100),
        function () {
          ((s = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", r),
            navigation.removeEventListener("navigateerror", r),
            d !== null && (d(), (d = null)));
        }
      );
    }
  }
  function kd(t) {
    this._internalRoot = t;
  }
  ((ru.prototype.render = kd.prototype.render =
    function (t) {
      var r = this._internalRoot;
      if (r === null) throw Error(a(409));
      var l = r.current,
        s = Cn();
      d0(l, s, t, r, null, null);
    }),
    (ru.prototype.unmount = kd.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var r = t.containerInfo;
          (d0(t.current, 2, null, t, null, null), Bs(), (r[ye] = null));
        }
      }));
  function ru(t) {
    this._internalRoot = t;
  }
  ru.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var r = ae();
      t = { blockedOn: null, target: t, priority: r };
      for (var l = 0; l < Si.length && r !== 0 && r < Si[l].priority; l++);
      (Si.splice(l, 0, t), l === 0 && b0(t));
    }
  };
  var w0 = n.version;
  if (w0 !== "19.2.4") throw Error(a(527, w0, "19.2.4"));
  te.findDOMNode = function (t) {
    var r = t._reactInternals;
    if (r === void 0)
      throw typeof t.render == "function"
        ? Error(a(188))
        : ((t = Object.keys(t).join(",")), Error(a(268, t)));
    return (
      (t = p(r)),
      (t = t !== null ? y(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var A2 = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: D,
    reconcilerVersion: "19.2.4",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var iu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!iu.isDisabled && iu.supportsFiber)
      try {
        ((Bt = iu.inject(A2)), (kt = iu));
      } catch {}
  }
  return (
    (no.createRoot = function (t, r) {
      if (!o(t)) throw Error(a(299));
      var l = !1,
        s = "",
        d = Ag,
        m = Og,
        b = zg;
      return (
        r != null &&
          (r.unstable_strictMode === !0 && (l = !0),
          r.identifierPrefix !== void 0 && (s = r.identifierPrefix),
          r.onUncaughtError !== void 0 && (d = r.onUncaughtError),
          r.onCaughtError !== void 0 && (m = r.onCaughtError),
          r.onRecoverableError !== void 0 && (b = r.onRecoverableError)),
        (r = c0(t, 1, !1, null, null, l, s, null, d, m, b, S0)),
        (t[ye] = r.current),
        ad(t),
        new kd(r)
      );
    }),
    (no.hydrateRoot = function (t, r, l) {
      if (!o(t)) throw Error(a(299));
      var s = !1,
        d = "",
        m = Ag,
        b = Og,
        E = zg,
        A = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (s = !0),
          l.identifierPrefix !== void 0 && (d = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (m = l.onUncaughtError),
          l.onCaughtError !== void 0 && (b = l.onCaughtError),
          l.onRecoverableError !== void 0 && (E = l.onRecoverableError),
          l.formState !== void 0 && (A = l.formState)),
        (r = c0(t, 1, !0, r, l ?? null, s, d, A, m, b, E, S0)),
        (r.context = f0(null)),
        (l = r.current),
        (s = Cn()),
        (s = H(s)),
        (d = li(s)),
        (d.callback = null),
        oi(l, d, s),
        (l = s),
        (r.current.lanes = l),
        ur(r, l),
        mr(r),
        (t[ye] = r.current),
        ad(t),
        new ru(r)
      );
    }),
    (no.version = "19.2.4"),
    no
  );
}
var D0;
function P2() {
  if (D0) return Td.exports;
  D0 = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  return (e(), (Td.exports = F2()), Td.exports);
}
var V2 = P2();
var P1 = (e) => {
    throw TypeError(e);
  },
  Y2 = (e, n, i) => n.has(e) || P1("Cannot " + i),
  zd = (e, n, i) => (
    Y2(e, n, "read from private field"),
    i ? i.call(e) : n.get(e)
  ),
  I2 = (e, n, i) =>
    n.has(e)
      ? P1("Cannot add the same private member more than once")
      : n instanceof WeakSet
        ? n.add(e)
        : n.set(e, i),
  N0 = "popstate";
function M0(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "pathname" in e &&
    "search" in e &&
    "hash" in e &&
    "state" in e &&
    "key" in e
  );
}
function X2(e = {}) {
  function n(a, o) {
    let u = o.state?.masked,
      { pathname: c, search: f, hash: h } = u || a.location;
    return wo(
      "",
      { pathname: c, search: f, hash: h },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default",
      u
        ? {
            pathname: a.location.pathname,
            search: a.location.search,
            hash: a.location.hash,
          }
        : void 0,
    );
  }
  function i(a, o) {
    return typeof o == "string" ? o : br(o);
  }
  return Q2(n, i, null, e);
}
function He(e, n) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(n);
}
function Rt(e, n) {
  if (!e) {
    typeof console < "u" && console.warn(n);
    try {
      throw new Error(n);
    } catch {}
  }
}
function G2() {
  return Math.random().toString(36).substring(2, 10);
}
function j0(e, n) {
  return {
    usr: e.state,
    key: e.key,
    idx: n,
    masked: e.unstable_mask
      ? { pathname: e.pathname, search: e.search, hash: e.hash }
      : void 0,
  };
}
function wo(e, n, i = null, a, o) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof n == "string" ? Xr(n) : n),
    state: i,
    key: (n && n.key) || a || G2(),
    unstable_mask: o,
  };
}
function br({ pathname: e = "/", search: n = "", hash: i = "" }) {
  return (
    n && n !== "?" && (e += n.charAt(0) === "?" ? n : "?" + n),
    i && i !== "#" && (e += i.charAt(0) === "#" ? i : "#" + i),
    e
  );
}
function Xr(e) {
  let n = {};
  if (e) {
    let i = e.indexOf("#");
    i >= 0 && ((n.hash = e.substring(i)), (e = e.substring(0, i)));
    let a = e.indexOf("?");
    (a >= 0 && ((n.search = e.substring(a)), (e = e.substring(0, a))),
      e && (n.pathname = e));
  }
  return n;
}
function Q2(e, n, i, a = {}) {
  let { window: o = document.defaultView, v5Compat: u = !1 } = a,
    c = o.history,
    f = "POP",
    h = null,
    p = y();
  p == null && ((p = 0), c.replaceState({ ...c.state, idx: p }, ""));
  function y() {
    return (c.state || { idx: null }).idx;
  }
  function g() {
    f = "POP";
    let k = y(),
      T = k == null ? null : k - p;
    ((p = k), h && h({ action: f, location: _.location, delta: T }));
  }
  function x(k, T) {
    f = "PUSH";
    let j = M0(k) ? k : wo(_.location, k, T);
    p = y() + 1;
    let M = j0(j, p),
      $ = _.createHref(j.unstable_mask || j);
    try {
      c.pushState(M, "", $);
    } catch (Z) {
      if (Z instanceof DOMException && Z.name === "DataCloneError") throw Z;
      o.location.assign($);
    }
    u && h && h({ action: f, location: _.location, delta: 1 });
  }
  function v(k, T) {
    f = "REPLACE";
    let j = M0(k) ? k : wo(_.location, k, T);
    p = y();
    let M = j0(j, p),
      $ = _.createHref(j.unstable_mask || j);
    (c.replaceState(M, "", $),
      u && h && h({ action: f, location: _.location, delta: 0 }));
  }
  function S(k) {
    return V1(k);
  }
  let _ = {
    get action() {
      return f;
    },
    get location() {
      return e(o, c);
    },
    listen(k) {
      if (h) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(N0, g),
        (h = k),
        () => {
          (o.removeEventListener(N0, g), (h = null));
        }
      );
    },
    createHref(k) {
      return n(o, k);
    },
    createURL: S,
    encodeLocation(k) {
      let T = S(k);
      return { pathname: T.pathname, search: T.search, hash: T.hash };
    },
    push: x,
    replace: v,
    go(k) {
      return c.go(k);
    },
  };
  return _;
}
function V1(e, n = !1) {
  let i = "http://localhost";
  (typeof window < "u" &&
    (i =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    He(i, "No window.location.(origin|href) available to create URL"));
  let a = typeof e == "string" ? e : br(e);
  return (
    (a = a.replace(/ $/, "%20")),
    !n && a.startsWith("//") && (a = i + a),
    new URL(a, i)
  );
}
var ho,
  L0 = class {
    constructor(e) {
      if ((I2(this, ho, new Map()), e)) for (let [n, i] of e) this.set(n, i);
    }
    get(e) {
      if (zd(this, ho).has(e)) return zd(this, ho).get(e);
      if (e.defaultValue !== void 0) return e.defaultValue;
      throw new Error("No value found for context");
    }
    set(e, n) {
      zd(this, ho).set(e, n);
    }
  };
ho = new WeakMap();
var K2 = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function Z2(e) {
  return K2.has(e);
}
var $2 = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children",
]);
function J2(e) {
  return $2.has(e);
}
function W2(e) {
  return e.index === !0;
}
function Eo(e, n, i = [], a = {}, o = !1) {
  return e.map((u, c) => {
    let f = [...i, String(c)],
      h = typeof u.id == "string" ? u.id : f.join("-");
    if (
      (He(
        u.index !== !0 || !u.children,
        "Cannot specify children on an index route",
      ),
      He(
        o || !a[h],
        `Found a route id collision on id "${h}".  Route id's must be globally unique within Data Router usages`,
      ),
      W2(u))
    ) {
      let p = { ...u, id: h };
      return ((a[h] = B0(p, n(p))), p);
    } else {
      let p = { ...u, id: h, children: void 0 };
      return (
        (a[h] = B0(p, n(p))),
        u.children && (p.children = Eo(u.children, n, f, a, o)),
        p
      );
    }
  });
}
function B0(e, n) {
  return Object.assign(e, {
    ...n,
    ...(typeof n.lazy == "object" && n.lazy != null
      ? { lazy: { ...e.lazy, ...n.lazy } }
      : {}),
  });
}
function ki(e, n, i = "/") {
  return po(e, n, i, !1);
}
function po(e, n, i, a) {
  let o = typeof n == "string" ? Xr(n) : n,
    u = In(o.pathname || "/", i);
  if (u == null) return null;
  let c = Y1(e);
  tE(c);
  let f = null;
  for (let h = 0; f == null && h < c.length; ++h) {
    let p = dE(u);
    f = cE(c[h], p, a);
  }
  return f;
}
function eE(e, n) {
  let { route: i, pathname: a, params: o } = e;
  return {
    id: i.id,
    pathname: a,
    params: o,
    data: n[i.id],
    loaderData: n[i.id],
    handle: i.handle,
  };
}
function Y1(e, n = [], i = [], a = "", o = !1) {
  let u = (c, f, h = o, p) => {
    let y = {
      relativePath: p === void 0 ? c.path || "" : p,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: f,
      route: c,
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(a) && h) return;
      (He(
        y.relativePath.startsWith(a),
        `Absolute route path "${y.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (y.relativePath = y.relativePath.slice(a.length)));
    }
    let g = rr([a, y.relativePath]),
      x = i.concat(y);
    (c.children &&
      c.children.length > 0 &&
      (He(
        c.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${g}".`,
      ),
      Y1(c.children, n, x, g, h)),
      !(c.path == null && !c.index) &&
        n.push({ path: g, score: sE(g, c.index), routesMeta: x }));
  };
  return (
    e.forEach((c, f) => {
      if (c.path === "" || !c.path?.includes("?")) u(c, f);
      else for (let h of I1(c.path)) u(c, f, !0, h);
    }),
    n
  );
}
function I1(e) {
  let n = e.split("/");
  if (n.length === 0) return [];
  let [i, ...a] = n,
    o = i.endsWith("?"),
    u = i.replace(/\?$/, "");
  if (a.length === 0) return o ? [u, ""] : [u];
  let c = I1(a.join("/")),
    f = [];
  return (
    f.push(...c.map((h) => (h === "" ? u : [u, h].join("/")))),
    o && f.push(...c),
    f.map((h) => (e.startsWith("/") && h === "" ? "/" : h))
  );
}
function tE(e) {
  e.sort((n, i) =>
    n.score !== i.score
      ? i.score - n.score
      : uE(
          n.routesMeta.map((a) => a.childrenIndex),
          i.routesMeta.map((a) => a.childrenIndex),
        ),
  );
}
var nE = /^:[\w-]+$/,
  rE = 3,
  iE = 2,
  aE = 1,
  lE = 10,
  oE = -2,
  U0 = (e) => e === "*";
function sE(e, n) {
  let i = e.split("/"),
    a = i.length;
  return (
    i.some(U0) && (a += oE),
    n && (a += iE),
    i
      .filter((o) => !U0(o))
      .reduce((o, u) => o + (nE.test(u) ? rE : u === "" ? aE : lE), a)
  );
}
function uE(e, n) {
  return e.length === n.length && e.slice(0, -1).every((a, o) => a === n[o])
    ? e[e.length - 1] - n[n.length - 1]
    : 0;
}
function cE(e, n, i = !1) {
  let { routesMeta: a } = e,
    o = {},
    u = "/",
    c = [];
  for (let f = 0; f < a.length; ++f) {
    let h = a[f],
      p = f === a.length - 1,
      y = u === "/" ? n : n.slice(u.length) || "/",
      g = Du(
        { path: h.relativePath, caseSensitive: h.caseSensitive, end: p },
        y,
      ),
      x = h.route;
    if (
      (!g &&
        p &&
        i &&
        !a[a.length - 1].route.index &&
        (g = Du(
          { path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 },
          y,
        )),
      !g)
    )
      return null;
    (Object.assign(o, g.params),
      c.push({
        params: o,
        pathname: rr([u, g.pathname]),
        pathnameBase: mE(rr([u, g.pathnameBase])),
        route: x,
      }),
      g.pathnameBase !== "/" && (u = rr([u, g.pathnameBase])));
  }
  return c;
}
function Du(e, n) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [i, a] = fE(e.path, e.caseSensitive, e.end),
    o = n.match(i);
  if (!o) return null;
  let u = o[0],
    c = u.replace(/(.)\/+$/, "$1"),
    f = o.slice(1);
  return {
    params: a.reduce((p, { paramName: y, isOptional: g }, x) => {
      if (y === "*") {
        let S = f[x] || "";
        c = u.slice(0, u.length - S.length).replace(/(.)\/+$/, "$1");
      }
      const v = f[x];
      return (
        g && !v ? (p[y] = void 0) : (p[y] = (v || "").replace(/%2F/g, "/")),
        p
      );
    }, {}),
    pathname: u,
    pathnameBase: c,
    pattern: e,
  };
}
function fE(e, n = !1, i = !0) {
  Rt(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let a = [],
    o =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (c, f, h, p, y) => {
          if ((a.push({ paramName: f, isOptional: h != null }), h)) {
            let g = y.charAt(p + c.length);
            return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e.endsWith("*")
      ? (a.push({ paramName: "*" }),
        (o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : i
        ? (o += "\\/*$")
        : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, n ? void 0 : "i"), a]
  );
}
function dE(e) {
  try {
    return e
      .split("/")
      .map((n) => decodeURIComponent(n).replace(/\//g, "%2F"))
      .join("/");
  } catch (n) {
    return (
      Rt(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${n}).`,
      ),
      e
    );
  }
}
function In(e, n) {
  if (n === "/") return e;
  if (!e.toLowerCase().startsWith(n.toLowerCase())) return null;
  let i = n.endsWith("/") ? n.length - 1 : n.length,
    a = e.charAt(i);
  return a && a !== "/" ? null : e.slice(i) || "/";
}
function hE({ basename: e, pathname: n }) {
  return n === "/" ? e : rr([e, n]);
}
var X1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Zh = (e) => X1.test(e);
function pE(e, n = "/") {
  let {
      pathname: i,
      search: a = "",
      hash: o = "",
    } = typeof e == "string" ? Xr(e) : e,
    u;
  return (
    i
      ? ((i = i.replace(/\/\/+/g, "/")),
        i.startsWith("/") ? (u = H0(i.substring(1), "/")) : (u = H0(i, n)))
      : (u = n),
    { pathname: u, search: gE(a), hash: yE(o) }
  );
}
function H0(e, n) {
  let i = n.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((o) => {
      o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
    }),
    i.length > 1 ? i.join("/") : "/"
  );
}
function Dd(e, n, i, a) {
  return `Cannot include a '${e}' character in a manually specified \`to.${n}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function G1(e) {
  return e.filter(
    (n, i) => i === 0 || (n.route.path && n.route.path.length > 0),
  );
}
function Gu(e) {
  let n = G1(e);
  return n.map((i, a) => (a === n.length - 1 ? i.pathname : i.pathnameBase));
}
function Oo(e, n, i, a = !1) {
  let o;
  typeof e == "string"
    ? (o = Xr(e))
    : ((o = { ...e }),
      He(
        !o.pathname || !o.pathname.includes("?"),
        Dd("?", "pathname", "search", o),
      ),
      He(
        !o.pathname || !o.pathname.includes("#"),
        Dd("#", "pathname", "hash", o),
      ),
      He(!o.search || !o.search.includes("#"), Dd("#", "search", "hash", o)));
  let u = e === "" || o.pathname === "",
    c = u ? "/" : o.pathname,
    f;
  if (c == null) f = i;
  else {
    let g = n.length - 1;
    if (!a && c.startsWith("..")) {
      let x = c.split("/");
      for (; x[0] === ".."; ) (x.shift(), (g -= 1));
      o.pathname = x.join("/");
    }
    f = g >= 0 ? n[g] : "/";
  }
  let h = pE(o, f),
    p = c && c !== "/" && c.endsWith("/"),
    y = (u || c === ".") && i.endsWith("/");
  return (!h.pathname.endsWith("/") && (p || y) && (h.pathname += "/"), h);
}
var rr = (e) => e.join("/").replace(/\/\/+/g, "/"),
  mE = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  gE = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  yE = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  zo = class {
    constructor(e, n, i, a = !1) {
      ((this.status = e),
        (this.statusText = n || ""),
        (this.internal = a),
        i instanceof Error
          ? ((this.data = i.toString()), (this.error = i))
          : (this.data = i));
    }
  };
function ko(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function Do(e) {
  return (
    e
      .map((n) => n.route.path)
      .filter(Boolean)
      .join("/")
      .replace(/\/\/*/g, "/") || "/"
  );
}
var Q1 =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function K1(e, n) {
  let i = e;
  if (typeof i != "string" || !X1.test(i))
    return { absoluteURL: void 0, isExternal: !1, to: i };
  let a = i,
    o = !1;
  if (Q1)
    try {
      let u = new URL(window.location.href),
        c = i.startsWith("//") ? new URL(u.protocol + i) : new URL(i),
        f = In(c.pathname, n);
      c.origin === u.origin && f != null
        ? (i = f + c.search + c.hash)
        : (o = !0);
    } catch {
      Rt(
        !1,
        `<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: a, isExternal: o, to: i };
}
var _i = Symbol("Uninstrumented");
function bE(e, n) {
  let i = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: [],
  };
  e.forEach((o) =>
    o({
      id: n.id,
      index: n.index,
      path: n.path,
      instrument(u) {
        let c = Object.keys(i);
        for (let f of c) u[f] && i[f].push(u[f]);
      },
    }),
  );
  let a = {};
  if (typeof n.lazy == "function" && i.lazy.length > 0) {
    let o = Ja(i.lazy, n.lazy, () => {});
    o && (a.lazy = o);
  }
  if (typeof n.lazy == "object") {
    let o = n.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = o[u],
        f = i[`lazy.${u}`];
      if (typeof c == "function" && f.length > 0) {
        let h = Ja(f, c, () => {});
        h && (a.lazy = Object.assign(a.lazy || {}, { [u]: h }));
      }
    });
  }
  return (
    ["loader", "action"].forEach((o) => {
      let u = n[o];
      if (typeof u == "function" && i[o].length > 0) {
        let c = u[_i] ?? u,
          f = Ja(i[o], c, (...h) => q0(h[0]));
        f &&
          (o === "loader" && c.hydrate === !0 && (f.hydrate = !0),
          (f[_i] = c),
          (a[o] = f));
      }
    }),
    n.middleware &&
      n.middleware.length > 0 &&
      i.middleware.length > 0 &&
      (a.middleware = n.middleware.map((o) => {
        let u = o[_i] ?? o,
          c = Ja(i.middleware, u, (...f) => q0(f[0]));
        return c ? ((c[_i] = u), c) : o;
      })),
    a
  );
}
function xE(e, n) {
  let i = { navigate: [], fetch: [] };
  if (
    (n.forEach((a) =>
      a({
        instrument(o) {
          let u = Object.keys(o);
          for (let c of u) o[c] && i[c].push(o[c]);
        },
      }),
    ),
    i.navigate.length > 0)
  ) {
    let a = e.navigate[_i] ?? e.navigate,
      o = Ja(i.navigate, a, (...u) => {
        let [c, f] = u;
        return {
          to:
            typeof c == "number" || typeof c == "string" ? c : c ? br(c) : ".",
          ...F0(e, f ?? {}),
        };
      });
    o && ((o[_i] = a), (e.navigate = o));
  }
  if (i.fetch.length > 0) {
    let a = e.fetch[_i] ?? e.fetch,
      o = Ja(i.fetch, a, (...u) => {
        let [c, , f, h] = u;
        return { href: f ?? ".", fetcherKey: c, ...F0(e, h ?? {}) };
      });
    o && ((o[_i] = a), (e.fetch = o));
  }
  return e;
}
function Ja(e, n, i) {
  return e.length === 0
    ? null
    : async (...a) => {
        let o = await Z1(e, i(...a), () => n(...a), e.length - 1);
        if (o.type === "error") throw o.value;
        return o.value;
      };
}
async function Z1(e, n, i, a) {
  let o = e[a],
    u;
  if (o) {
    let c,
      f = async () => (
        c
          ? console.error(
              "You cannot call instrumented handlers more than once",
            )
          : (c = Z1(e, n, i, a - 1)),
        (u = await c),
        He(u, "Expected a result"),
        u.type === "error" && u.value instanceof Error
          ? { status: "error", error: u.value }
          : { status: "success", error: void 0 }
      );
    try {
      await o(f, n);
    } catch (h) {
      console.error("An instrumentation function threw an error:", h);
    }
    (c || (await f()), await c);
  } else
    try {
      u = { type: "success", value: await i() };
    } catch (c) {
      u = { type: "error", value: c };
    }
  return (
    u || {
      type: "error",
      value: new Error("No result assigned in instrumentation chain."),
    }
  );
}
function q0(e) {
  let { request: n, context: i, params: a, unstable_pattern: o } = e;
  return {
    request: vE(n),
    params: { ...a },
    unstable_pattern: o,
    context: SE(i),
  };
}
function F0(e, n) {
  return {
    currentUrl: br(e.state.location),
    ...("formMethod" in n ? { formMethod: n.formMethod } : {}),
    ...("formEncType" in n ? { formEncType: n.formEncType } : {}),
    ...("formData" in n ? { formData: n.formData } : {}),
    ...("body" in n ? { body: n.body } : {}),
  };
}
function vE(e) {
  return {
    method: e.method,
    url: e.url,
    headers: { get: (...n) => e.headers.get(...n) },
  };
}
function SE(e) {
  if (EE(e)) {
    let n = { ...e };
    return (Object.freeze(n), n);
  } else return { get: (n) => e.get(n) };
}
var wE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function EE(e) {
  if (e === null || typeof e != "object") return !1;
  const n = Object.getPrototypeOf(e);
  return (
    n === Object.prototype ||
    n === null ||
    Object.getOwnPropertyNames(n).sort().join("\0") === wE
  );
}
var $1 = ["POST", "PUT", "PATCH", "DELETE"],
  kE = new Set($1),
  CE = ["GET", ...$1],
  _E = new Set(CE),
  J1 = new Set([301, 302, 303, 307, 308]),
  TE = new Set([307, 308]),
  Nd = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  RE = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  ro = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  AE = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  W1 = "remix-router-transitions",
  ex = Symbol("ResetLoaderData");
function OE(e) {
  const n = e.window ? e.window : typeof window < "u" ? window : void 0,
    i =
      typeof n < "u" &&
      typeof n.document < "u" &&
      typeof n.document.createElement < "u";
  He(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter",
  );
  let a = e.hydrationRouteProperties || [],
    o = e.mapRouteProperties || AE,
    u = o;
  if (e.unstable_instrumentations) {
    let z = e.unstable_instrumentations;
    u = (H) => ({ ...o(H), ...bE(z.map((I) => I.route).filter(Boolean), H) });
  }
  let c = {},
    f = Eo(e.routes, u, void 0, c),
    h,
    p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let y = e.dataStrategy || jE,
    g = { ...e.future },
    x = null,
    v = new Set(),
    S = null,
    _ = null,
    k = null,
    T = e.hydrationData != null,
    j = ki(f, e.history.location, p),
    M = !1,
    $ = null,
    Z,
    U;
  if (j == null && !e.patchRoutesOnNavigation) {
    let z = Pn(404, { pathname: e.history.location.pathname }),
      { matches: H, route: I } = au(f);
    ((Z = !0), (U = !Z), (j = H), ($ = { [I.id]: z }));
  } else if (
    (j &&
      !e.hydrationData &&
      Jr(j, f, e.history.location.pathname).active &&
      (j = null),
    j)
  )
    if (j.some((z) => z.route.lazy)) ((Z = !1), (U = !Z));
    else if (!j.some((z) => $h(z.route))) ((Z = !0), (U = !Z));
    else {
      let z = e.hydrationData ? e.hydrationData.loaderData : null,
        H = e.hydrationData ? e.hydrationData.errors : null,
        I = j;
      if (H) {
        let ae = j.findIndex((ce) => H[ce.route.id] !== void 0);
        I = I.slice(0, ae + 1);
      }
      ((U = !1),
        (Z = I.every((ae) => {
          let ce = tx(ae.route, z, H);
          return ((U = U || ce.renderFallback), !ce.shouldLoad);
        })));
    }
  else {
    ((Z = !1), (U = !Z), (j = []));
    let z = Jr(null, f, e.history.location.pathname);
    z.active && z.matches && ((M = !0), (j = z.matches));
  }
  let K,
    N = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: j,
      initialized: Z,
      renderFallback: U,
      navigation: Nd,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || $,
      fetchers: new Map(),
      blockers: new Map(),
    },
    he = "POP",
    F = null,
    oe = !1,
    ie,
    Ee = !1,
    le = new Map(),
    ee = null,
    D = !1,
    te = !1,
    fe = new Set(),
    me = new Map(),
    R = 0,
    O = -1,
    G = new Map(),
    C = new Set(),
    se = new Map(),
    Se = new Map(),
    be = new Set(),
    Ne = new Map(),
    rt,
    Ke = null;
  function on() {
    if (
      ((x = e.history.listen(({ action: z, location: H, delta: I }) => {
        if (rt) {
          (rt(), (rt = void 0));
          return;
        }
        Rt(
          Ne.size === 0 || I != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
        );
        let ae = Ni({
          currentLocation: N.location,
          nextLocation: H,
          historyAction: z,
        });
        if (ae && I != null) {
          let ce = new Promise((xe) => {
            rt = xe;
          });
          (e.history.go(I * -1),
            Er(ae, {
              state: "blocked",
              location: H,
              proceed() {
                (Er(ae, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: H,
                }),
                  ce.then(() => e.history.go(I)));
              },
              reset() {
                let xe = new Map(N.blockers);
                (xe.set(ae, ro), Et({ blockers: xe }));
              },
            }),
            F?.resolve(),
            (F = null));
          return;
        }
        return zn(z, H);
      })),
      i)
    ) {
      WE(n, le);
      let z = () => ek(n, le);
      (n.addEventListener("pagehide", z),
        (ee = () => n.removeEventListener("pagehide", z)));
    }
    return (
      N.initialized || zn("POP", N.location, { initialHydration: !0 }),
      K
    );
  }
  function Xn() {
    (x && x(),
      ee && ee(),
      v.clear(),
      ie && ie.abort(),
      N.fetchers.forEach((z, H) => Bt(H)),
      N.blockers.forEach((z, H) => Di(H)));
  }
  function Oi(z) {
    return (v.add(z), () => v.delete(z));
  }
  function Et(z, H = {}) {
    (z.matches &&
      (z.matches = z.matches.map((ce) => {
        let xe = c[ce.route.id],
          pe = ce.route;
        return pe.element !== xe.element ||
          pe.errorElement !== xe.errorElement ||
          pe.hydrateFallbackElement !== xe.hydrateFallbackElement
          ? { ...ce, route: xe }
          : ce;
      })),
      (N = { ...N, ...z }));
    let I = [],
      ae = [];
    (N.fetchers.forEach((ce, xe) => {
      ce.state === "idle" && (be.has(xe) ? I.push(xe) : ae.push(xe));
    }),
      be.forEach((ce) => {
        !N.fetchers.has(ce) && !me.has(ce) && I.push(ce);
      }),
      [...v].forEach((ce) =>
        ce(N, {
          deletedFetchers: I,
          newErrors: z.errors ?? null,
          viewTransitionOpts: H.viewTransitionOpts,
          flushSync: H.flushSync === !0,
        }),
      ),
      I.forEach((ce) => Bt(ce)),
      ae.forEach((ce) => N.fetchers.delete(ce)));
  }
  function Kt(z, H, { flushSync: I } = {}) {
    let ae =
        N.actionData != null &&
        N.navigation.formMethod != null &&
        Wt(N.navigation.formMethod) &&
        N.navigation.state === "loading" &&
        z.state?._isRedirect !== !0,
      ce;
    H.actionData
      ? Object.keys(H.actionData).length > 0
        ? (ce = H.actionData)
        : (ce = null)
      : ae
        ? (ce = N.actionData)
        : (ce = null);
    let xe = H.loaderData
        ? $0(N.loaderData, H.loaderData, H.matches || [], H.errors)
        : N.loaderData,
      pe = N.blockers;
    pe.size > 0 && ((pe = new Map(pe)), pe.forEach((Te, ke) => pe.set(ke, ro)));
    let ge = D ? !1 : hl(z, H.matches || N.matches),
      ye =
        oe === !0 ||
        (N.navigation.formMethod != null &&
          Wt(N.navigation.formMethod) &&
          z.state?._isRedirect !== !0);
    (h && ((f = h), (h = void 0)),
      D ||
        he === "POP" ||
        (he === "PUSH"
          ? e.history.push(z, z.state)
          : he === "REPLACE" && e.history.replace(z, z.state)));
    let Ce;
    if (he === "POP") {
      let Te = le.get(N.location.pathname);
      Te && Te.has(z.pathname)
        ? (Ce = { currentLocation: N.location, nextLocation: z })
        : le.has(z.pathname) &&
          (Ce = { currentLocation: z, nextLocation: N.location });
    } else if (Ee) {
      let Te = le.get(N.location.pathname);
      (Te
        ? Te.add(z.pathname)
        : ((Te = new Set([z.pathname])), le.set(N.location.pathname, Te)),
        (Ce = { currentLocation: N.location, nextLocation: z }));
    }
    (Et(
      {
        ...H,
        actionData: ce,
        loaderData: xe,
        historyAction: he,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: Nd,
        revalidation: "idle",
        restoreScrollPosition: ge,
        preventScrollReset: ye,
        blockers: pe,
      },
      { viewTransitionOpts: Ce, flushSync: I === !0 },
    ),
      (he = "POP"),
      (oe = !1),
      (Ee = !1),
      (D = !1),
      (te = !1),
      F?.resolve(),
      (F = null),
      Ke?.resolve(),
      (Ke = null));
  }
  async function Sr(z, H) {
    if ((F?.resolve(), (F = null), typeof z == "number")) {
      F || (F = tb());
      let ut = F.promise;
      return (e.history.go(z), ut);
    }
    let I = gh(N.location, N.matches, p, z, H?.fromRouteId, H?.relative),
      { path: ae, submission: ce, error: xe } = P0(!1, I, H),
      pe;
    H?.unstable_mask &&
      (pe = {
        pathname: "",
        search: "",
        hash: "",
        ...(typeof H.unstable_mask == "string"
          ? Xr(H.unstable_mask)
          : { ...N.location.unstable_mask, ...H.unstable_mask }),
      });
    let ge = N.location,
      ye = wo(ge, ae, H && H.state, void 0, pe);
    ye = { ...ye, ...e.history.encodeLocation(ye) };
    let Ce = H && H.replace != null ? H.replace : void 0,
      Te = "PUSH";
    Ce === !0
      ? (Te = "REPLACE")
      : Ce === !1 ||
        (ce != null &&
          Wt(ce.formMethod) &&
          ce.formAction === N.location.pathname + N.location.search &&
          (Te = "REPLACE"));
    let ke =
        H && "preventScrollReset" in H ? H.preventScrollReset === !0 : void 0,
      Je = (H && H.flushSync) === !0,
      qe = Ni({ currentLocation: ge, nextLocation: ye, historyAction: Te });
    if (qe) {
      Er(qe, {
        state: "blocked",
        location: ye,
        proceed() {
          (Er(qe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ye,
          }),
            Sr(z, H));
        },
        reset() {
          let ut = new Map(N.blockers);
          (ut.set(qe, ro), Et({ blockers: ut }));
        },
      });
      return;
    }
    await zn(Te, ye, {
      submission: ce,
      pendingError: xe,
      preventScrollReset: ke,
      replace: H && H.replace,
      enableViewTransition: H && H.viewTransition,
      flushSync: Je,
      callSiteDefaultShouldRevalidate: H && H.unstable_defaultShouldRevalidate,
    });
  }
  function Kr() {
    (Ke || (Ke = tb()), Re(), Et({ revalidation: "loading" }));
    let z = Ke.promise;
    return N.navigation.state === "submitting"
      ? z
      : N.navigation.state === "idle"
        ? (zn(N.historyAction, N.location, {
            startUninterruptedRevalidation: !0,
          }),
          z)
        : (zn(he || N.historyAction, N.navigation.location, {
            overrideNavigation: N.navigation,
            enableViewTransition: Ee === !0,
          }),
          z);
  }
  async function zn(z, H, I) {
    (ie && ie.abort(),
      (ie = null),
      (he = z),
      (D = (I && I.startUninterruptedRevalidation) === !0),
      yc(N.location, N.matches),
      (oe = (I && I.preventScrollReset) === !0),
      (Ee = (I && I.enableViewTransition) === !0));
    let ae = h || f,
      ce = I && I.overrideNavigation,
      xe =
        I?.initialHydration && N.matches && N.matches.length > 0 && !M
          ? N.matches
          : ki(ae, H, p),
      pe = (I && I.flushSync) === !0;
    if (
      xe &&
      N.initialized &&
      !te &&
      VE(N.location, H) &&
      !(I && I.submission && Wt(I.submission.formMethod))
    ) {
      Kt(H, { matches: xe }, { flushSync: pe });
      return;
    }
    let ge = Jr(xe, ae, H.pathname);
    if ((ge.active && ge.matches && (xe = ge.matches), !xe)) {
      let { error: pt, notFoundMatches: vt, route: Ze } = Zn(H.pathname);
      Kt(
        H,
        { matches: vt, loaderData: {}, errors: { [Ze.id]: pt } },
        { flushSync: pe },
      );
      return;
    }
    ie = new AbortController();
    let ye = Ka(e.history, H, ie.signal, I && I.submission),
      Ce = e.getContext ? await e.getContext() : new L0(),
      Te;
    if (I && I.pendingError)
      Te = [Ci(xe).route.id, { type: "error", error: I.pendingError }];
    else if (I && I.submission && Wt(I.submission.formMethod)) {
      let pt = await sa(
        ye,
        H,
        I.submission,
        xe,
        Ce,
        ge.active,
        I && I.initialHydration === !0,
        { replace: I.replace, flushSync: pe },
      );
      if (pt.shortCircuited) return;
      if (pt.pendingActionResult) {
        let [vt, Ze] = pt.pendingActionResult;
        if (Tn(Ze) && ko(Ze.error) && Ze.error.status === 404) {
          ((ie = null),
            Kt(H, {
              matches: pt.matches,
              loaderData: {},
              errors: { [vt]: Ze.error },
            }));
          return;
        }
      }
      ((xe = pt.matches || xe),
        (Te = pt.pendingActionResult),
        (ce = Md(H, I.submission)),
        (pe = !1),
        (ge.active = !1),
        (ye = Ka(e.history, ye.url, ye.signal)));
    }
    let {
      shortCircuited: ke,
      matches: Je,
      loaderData: qe,
      errors: ut,
    } = await Zr(
      ye,
      H,
      xe,
      Ce,
      ge.active,
      ce,
      I && I.submission,
      I && I.fetcherSubmission,
      I && I.replace,
      I && I.initialHydration === !0,
      pe,
      Te,
      I && I.callSiteDefaultShouldRevalidate,
    );
    ke ||
      ((ie = null),
      Kt(H, { matches: Je || xe, ...J0(Te), loaderData: qe, errors: ut }));
  }
  async function sa(z, H, I, ae, ce, xe, pe, ge = {}) {
    Re();
    let ye = $E(H, I);
    if ((Et({ navigation: ye }, { flushSync: ge.flushSync === !0 }), xe)) {
      let ke = await ur(ae, H.pathname, z.signal);
      if (ke.type === "aborted") return { shortCircuited: !0 };
      if (ke.type === "error") {
        if (ke.partialMatches.length === 0) {
          let { matches: qe, route: ut } = au(f);
          return {
            matches: qe,
            pendingActionResult: [ut.id, { type: "error", error: ke.error }],
          };
        }
        let Je = Ci(ke.partialMatches).route.id;
        return {
          matches: ke.partialMatches,
          pendingActionResult: [Je, { type: "error", error: ke.error }],
        };
      } else if (ke.matches) ae = ke.matches;
      else {
        let { notFoundMatches: Je, error: qe, route: ut } = Zn(H.pathname);
        return {
          matches: Je,
          pendingActionResult: [ut.id, { type: "error", error: qe }],
        };
      }
    }
    let Ce,
      Te = bu(ae, H);
    if (!Te.route.action && !Te.route.lazy)
      Ce = {
        type: "error",
        error: Pn(405, {
          method: z.method,
          pathname: H.pathname,
          routeId: Te.route.id,
        }),
      };
    else {
      let ke = Wa(u, c, z, ae, Te, pe ? [] : a, ce),
        Je = await J(z, ke, ce, null);
      if (((Ce = Je[Te.route.id]), !Ce)) {
        for (let qe of ae)
          if (Je[qe.route.id]) {
            Ce = Je[qe.route.id];
            break;
          }
      }
      if (z.signal.aborted) return { shortCircuited: !0 };
    }
    if (Wi(Ce)) {
      let ke;
      return (
        ge && ge.replace != null
          ? (ke = ge.replace)
          : (ke =
              Q0(
                Ce.response.headers.get("Location"),
                new URL(z.url),
                p,
                e.history,
              ) ===
              N.location.pathname + N.location.search),
        await Gn(z, Ce, !0, { submission: I, replace: ke }),
        { shortCircuited: !0 }
      );
    }
    if (Tn(Ce)) {
      let ke = Ci(ae, Te.route.id);
      return (
        (ge && ge.replace) !== !0 && (he = "PUSH"),
        { matches: ae, pendingActionResult: [ke.route.id, Ce, Te.route.id] }
      );
    }
    return { matches: ae, pendingActionResult: [Te.route.id, Ce] };
  }
  async function Zr(z, H, I, ae, ce, xe, pe, ge, ye, Ce, Te, ke, Je) {
    let qe = xe || Md(H, pe),
      ut = pe || ge || eb(qe),
      pt = !D && !Ce;
    if (ce) {
      if (pt) {
        let Ct = wr(ke);
        Et(
          { navigation: qe, ...(Ct !== void 0 ? { actionData: Ct } : {}) },
          { flushSync: Te },
        );
      }
      let Fe = await ur(I, H.pathname, z.signal);
      if (Fe.type === "aborted") return { shortCircuited: !0 };
      if (Fe.type === "error") {
        if (Fe.partialMatches.length === 0) {
          let { matches: $t, route: Ot } = au(f);
          return { matches: $t, loaderData: {}, errors: { [Ot.id]: Fe.error } };
        }
        let Ct = Ci(Fe.partialMatches).route.id;
        return {
          matches: Fe.partialMatches,
          loaderData: {},
          errors: { [Ct]: Fe.error },
        };
      } else if (Fe.matches) I = Fe.matches;
      else {
        let { error: Ct, notFoundMatches: $t, route: Ot } = Zn(H.pathname);
        return { matches: $t, loaderData: {}, errors: { [Ot.id]: Ct } };
      }
    }
    let vt = h || f,
      { dsMatches: Ze, revalidatingFetchers: Ut } = V0(
        z,
        ae,
        u,
        c,
        e.history,
        N,
        I,
        ut,
        H,
        Ce ? [] : a,
        Ce === !0,
        te,
        fe,
        be,
        se,
        C,
        vt,
        p,
        e.patchRoutesOnNavigation != null,
        ke,
        Je,
      );
    if (
      ((O = ++R),
      !e.dataStrategy &&
        !Ze.some((Fe) => Fe.shouldLoad) &&
        !Ze.some(
          (Fe) => Fe.route.middleware && Fe.route.middleware.length > 0,
        ) &&
        Ut.length === 0)
    ) {
      let Fe = Kn();
      return (
        Kt(
          H,
          {
            matches: I,
            loaderData: {},
            errors: ke && Tn(ke[1]) ? { [ke[0]]: ke[1].error } : null,
            ...J0(ke),
            ...(Fe ? { fetchers: new Map(N.fetchers) } : {}),
          },
          { flushSync: Te },
        ),
        { shortCircuited: !0 }
      );
    }
    if (pt) {
      let Fe = {};
      if (!ce) {
        Fe.navigation = qe;
        let Ct = wr(ke);
        Ct !== void 0 && (Fe.actionData = Ct);
      }
      (Ut.length > 0 && (Fe.fetchers = zi(Ut)), Et(Fe, { flushSync: Te }));
    }
    Ut.forEach((Fe) => {
      (bt(Fe.key), Fe.controller && me.set(Fe.key, Fe.controller));
    });
    let dt = () => Ut.forEach((Fe) => bt(Fe.key));
    ie && ie.signal.addEventListener("abort", dt);
    let { loaderResults: Wr, fetcherResults: $n } = await de(Ze, Ut, z, ae);
    if (z.signal.aborted) return { shortCircuited: !0 };
    (ie && ie.signal.removeEventListener("abort", dt),
      Ut.forEach((Fe) => me.delete(Fe.key)));
    let Ft = lu(Wr);
    if (Ft)
      return (
        await Gn(z, Ft.result, !0, { replace: ye }),
        { shortCircuited: !0 }
      );
    if (((Ft = lu($n)), Ft))
      return (
        C.add(Ft.key),
        await Gn(z, Ft.result, !0, { replace: ye }),
        { shortCircuited: !0 }
      );
    let { loaderData: cr, errors: Mi } = Z0(N, I, Wr, ke, Ut, $n);
    Ce && N.errors && (Mi = { ...N.errors, ...Mi });
    let fr = Kn(),
      ji = sn(O),
      ca = fr || ji || Ut.length > 0;
    return {
      matches: I,
      loaderData: cr,
      errors: Mi,
      ...(ca ? { fetchers: new Map(N.fetchers) } : {}),
    };
  }
  function wr(z) {
    if (z && !Tn(z[1])) return { [z[0]]: z[1].data };
    if (N.actionData)
      return Object.keys(N.actionData).length === 0 ? null : N.actionData;
  }
  function zi(z) {
    return (
      z.forEach((H) => {
        let I = N.fetchers.get(H.key),
          ae = io(void 0, I ? I.data : void 0);
        N.fetchers.set(H.key, ae);
      }),
      new Map(N.fetchers)
    );
  }
  async function fl(z, H, I, ae) {
    bt(z);
    let ce = (ae && ae.flushSync) === !0,
      xe = h || f,
      pe = gh(N.location, N.matches, p, I, H, ae?.relative),
      ge = ki(xe, pe, p),
      ye = Jr(ge, xe, pe);
    if ((ye.active && ye.matches && (ge = ye.matches), !ge)) {
      Ue(z, H, Pn(404, { pathname: pe }), { flushSync: ce });
      return;
    }
    let { path: Ce, submission: Te, error: ke } = P0(!0, pe, ae);
    if (ke) {
      Ue(z, H, ke, { flushSync: ce });
      return;
    }
    let Je = e.getContext ? await e.getContext() : new L0(),
      qe = (ae && ae.preventScrollReset) === !0;
    if (Te && Wt(Te.formMethod)) {
      await dl(
        z,
        H,
        Ce,
        ge,
        Je,
        ye.active,
        ce,
        qe,
        Te,
        ae && ae.unstable_defaultShouldRevalidate,
      );
      return;
    }
    (se.set(z, { routeId: H, path: Ce }),
      await Vt(z, H, Ce, ge, Je, ye.active, ce, qe, Te));
  }
  async function dl(z, H, I, ae, ce, xe, pe, ge, ye, Ce) {
    (Re(), se.delete(z));
    let Te = N.fetchers.get(z);
    De(z, JE(ye, Te), { flushSync: pe });
    let ke = new AbortController(),
      Je = Ka(e.history, I, ke.signal, ye);
    if (xe) {
      let mt = await ur(ae, new URL(Je.url).pathname, Je.signal, z);
      if (mt.type === "aborted") return;
      if (mt.type === "error") {
        Ue(z, H, mt.error, { flushSync: pe });
        return;
      } else if (mt.matches) ae = mt.matches;
      else {
        Ue(z, H, Pn(404, { pathname: I }), { flushSync: pe });
        return;
      }
    }
    let qe = bu(ae, I);
    if (!qe.route.action && !qe.route.lazy) {
      let mt = Pn(405, { method: ye.formMethod, pathname: I, routeId: H });
      Ue(z, H, mt, { flushSync: pe });
      return;
    }
    me.set(z, ke);
    let ut = R,
      pt = Wa(u, c, Je, ae, qe, a, ce),
      vt = await J(Je, pt, ce, z),
      Ze = vt[qe.route.id];
    if (!Ze) {
      for (let mt of pt)
        if (vt[mt.route.id]) {
          Ze = vt[mt.route.id];
          break;
        }
    }
    if (Je.signal.aborted) {
      me.get(z) === ke && me.delete(z);
      return;
    }
    if (be.has(z)) {
      if (Wi(Ze) || Tn(Ze)) {
        De(z, Fr(void 0));
        return;
      }
    } else {
      if (Wi(Ze))
        if ((me.delete(z), O > ut)) {
          De(z, Fr(void 0));
          return;
        } else
          return (
            C.add(z),
            De(z, io(ye)),
            Gn(Je, Ze, !1, { fetcherSubmission: ye, preventScrollReset: ge })
          );
      if (Tn(Ze)) {
        Ue(z, H, Ze.error);
        return;
      }
    }
    let Ut = N.navigation.location || N.location,
      dt = Ka(e.history, Ut, ke.signal),
      Wr = h || f,
      $n =
        N.navigation.state !== "idle"
          ? ki(Wr, N.navigation.location, p)
          : N.matches;
    He($n, "Didn't find any matches after fetcher action");
    let Ft = ++R;
    G.set(z, Ft);
    let cr = io(ye, Ze.data);
    N.fetchers.set(z, cr);
    let { dsMatches: Mi, revalidatingFetchers: fr } = V0(
      dt,
      ce,
      u,
      c,
      e.history,
      N,
      $n,
      ye,
      Ut,
      a,
      !1,
      te,
      fe,
      be,
      se,
      C,
      Wr,
      p,
      e.patchRoutesOnNavigation != null,
      [qe.route.id, Ze],
      Ce,
    );
    (fr
      .filter((mt) => mt.key !== z)
      .forEach((mt) => {
        let fa = mt.key,
          da = N.fetchers.get(fa),
          Qo = io(void 0, da ? da.data : void 0);
        (N.fetchers.set(fa, Qo),
          bt(fa),
          mt.controller && me.set(fa, mt.controller));
      }),
      Et({ fetchers: new Map(N.fetchers) }));
    let ji = () => fr.forEach((mt) => bt(mt.key));
    ke.signal.addEventListener("abort", ji);
    let { loaderResults: ca, fetcherResults: Fe } = await de(Mi, fr, dt, ce);
    if (ke.signal.aborted) return;
    if (
      (ke.signal.removeEventListener("abort", ji),
      G.delete(z),
      me.delete(z),
      fr.forEach((mt) => me.delete(mt.key)),
      N.fetchers.has(z))
    ) {
      let mt = Fr(Ze.data);
      N.fetchers.set(z, mt);
    }
    let Ct = lu(ca);
    if (Ct) return Gn(dt, Ct.result, !1, { preventScrollReset: ge });
    if (((Ct = lu(Fe)), Ct))
      return (C.add(Ct.key), Gn(dt, Ct.result, !1, { preventScrollReset: ge }));
    let { loaderData: $t, errors: Ot } = Z0(N, $n, ca, void 0, fr, Fe);
    (sn(Ft),
      N.navigation.state === "loading" && Ft > O
        ? (He(he, "Expected pending action"),
          ie && ie.abort(),
          Kt(N.navigation.location, {
            matches: $n,
            loaderData: $t,
            errors: Ot,
            fetchers: new Map(N.fetchers),
          }))
        : (Et({
            errors: Ot,
            loaderData: $0(N.loaderData, $t, $n, Ot),
            fetchers: new Map(N.fetchers),
          }),
          (te = !1)));
  }
  async function Vt(z, H, I, ae, ce, xe, pe, ge, ye) {
    let Ce = N.fetchers.get(z);
    De(z, io(ye, Ce ? Ce.data : void 0), { flushSync: pe });
    let Te = new AbortController(),
      ke = Ka(e.history, I, Te.signal);
    if (xe) {
      let Ze = await ur(ae, new URL(ke.url).pathname, ke.signal, z);
      if (Ze.type === "aborted") return;
      if (Ze.type === "error") {
        Ue(z, H, Ze.error, { flushSync: pe });
        return;
      } else if (Ze.matches) ae = Ze.matches;
      else {
        Ue(z, H, Pn(404, { pathname: I }), { flushSync: pe });
        return;
      }
    }
    let Je = bu(ae, I);
    me.set(z, Te);
    let qe = R,
      ut = Wa(u, c, ke, ae, Je, a, ce),
      vt = (await J(ke, ut, ce, z))[Je.route.id];
    if ((me.get(z) === Te && me.delete(z), !ke.signal.aborted)) {
      if (be.has(z)) {
        De(z, Fr(void 0));
        return;
      }
      if (Wi(vt))
        if (O > qe) {
          De(z, Fr(void 0));
          return;
        } else {
          (C.add(z), await Gn(ke, vt, !1, { preventScrollReset: ge }));
          return;
        }
      if (Tn(vt)) {
        Ue(z, H, vt.error);
        return;
      }
      De(z, Fr(vt.data));
    }
  }
  async function Gn(
    z,
    H,
    I,
    {
      submission: ae,
      fetcherSubmission: ce,
      preventScrollReset: xe,
      replace: pe,
    } = {},
  ) {
    (I || (F?.resolve(), (F = null)),
      H.response.headers.has("X-Remix-Revalidate") && (te = !0));
    let ge = H.response.headers.get("Location");
    (He(ge, "Expected a Location header on the redirect Response"),
      (ge = Q0(ge, new URL(z.url), p, e.history)));
    let ye = wo(N.location, ge, { _isRedirect: !0 });
    if (i) {
      let ut = !1;
      if (H.response.headers.has("X-Remix-Reload-Document")) ut = !0;
      else if (Zh(ge)) {
        const pt = V1(ge, !0);
        ut = pt.origin !== n.location.origin || In(pt.pathname, p) == null;
      }
      if (ut) {
        pe ? n.location.replace(ge) : n.location.assign(ge);
        return;
      }
    }
    ie = null;
    let Ce =
        pe === !0 || H.response.headers.has("X-Remix-Replace")
          ? "REPLACE"
          : "PUSH",
      { formMethod: Te, formAction: ke, formEncType: Je } = N.navigation;
    !ae && !ce && Te && ke && Je && (ae = eb(N.navigation));
    let qe = ae || ce;
    if (TE.has(H.response.status) && qe && Wt(qe.formMethod))
      await zn(Ce, ye, {
        submission: { ...qe, formAction: ge },
        preventScrollReset: xe || oe,
        enableViewTransition: I ? Ee : void 0,
      });
    else {
      let ut = Md(ye, ae);
      await zn(Ce, ye, {
        overrideNavigation: ut,
        fetcherSubmission: ce,
        preventScrollReset: xe || oe,
        enableViewTransition: I ? Ee : void 0,
      });
    }
  }
  async function J(z, H, I, ae) {
    let ce,
      xe = {};
    try {
      ce = await BE(y, z, H, ae, I, !1);
    } catch (pe) {
      return (
        H.filter((ge) => ge.shouldLoad).forEach((ge) => {
          xe[ge.route.id] = { type: "error", error: pe };
        }),
        xe
      );
    }
    if (z.signal.aborted) return xe;
    if (!Wt(z.method))
      for (let pe of H) {
        if (ce[pe.route.id]?.type === "error") break;
        !ce.hasOwnProperty(pe.route.id) &&
          !N.loaderData.hasOwnProperty(pe.route.id) &&
          (!N.errors || !N.errors.hasOwnProperty(pe.route.id)) &&
          pe.shouldCallHandler() &&
          (ce[pe.route.id] = {
            type: "error",
            result: new Error(
              `No result returned from dataStrategy for route ${pe.route.id}`,
            ),
          });
      }
    for (let [pe, ge] of Object.entries(ce))
      if (GE(ge)) {
        let ye = ge.result;
        xe[pe] = { type: "redirect", response: FE(ye, z, pe, H, p) };
      } else xe[pe] = await qE(ge);
    return xe;
  }
  async function de(z, H, I, ae) {
    let ce = J(I, z, ae, null),
      xe = Promise.all(
        H.map(async (ye) => {
          if (ye.matches && ye.match && ye.request && ye.controller) {
            let Te = (await J(ye.request, ye.matches, ae, ye.key))[
              ye.match.route.id
            ];
            return { [ye.key]: Te };
          } else
            return Promise.resolve({
              [ye.key]: {
                type: "error",
                error: Pn(404, { pathname: ye.path }),
              },
            });
        }),
      ),
      pe = await ce,
      ge = (await xe).reduce((ye, Ce) => Object.assign(ye, Ce), {});
    return { loaderResults: pe, fetcherResults: ge };
  }
  function Re() {
    ((te = !0),
      se.forEach((z, H) => {
        (me.has(H) && fe.add(H), bt(H));
      }));
  }
  function De(z, H, I = {}) {
    (N.fetchers.set(z, H),
      Et(
        { fetchers: new Map(N.fetchers) },
        { flushSync: (I && I.flushSync) === !0 },
      ));
  }
  function Ue(z, H, I, ae = {}) {
    let ce = Ci(N.matches, H);
    (Bt(z),
      Et(
        { errors: { [ce.route.id]: I }, fetchers: new Map(N.fetchers) },
        { flushSync: (ae && ae.flushSync) === !0 },
      ));
  }
  function Zt(z) {
    return (
      Se.set(z, (Se.get(z) || 0) + 1),
      be.has(z) && be.delete(z),
      N.fetchers.get(z) || RE
    );
  }
  function Qn(z, H) {
    (bt(z, H?.reason), De(z, Fr(null)));
  }
  function Bt(z) {
    let H = N.fetchers.get(z);
    (me.has(z) && !(H && H.state === "loading" && G.has(z)) && bt(z),
      se.delete(z),
      G.delete(z),
      C.delete(z),
      be.delete(z),
      fe.delete(z),
      N.fetchers.delete(z));
  }
  function kt(z) {
    let H = (Se.get(z) || 0) - 1;
    (H <= 0 ? (Se.delete(z), be.add(z)) : Se.set(z, H),
      Et({ fetchers: new Map(N.fetchers) }));
  }
  function bt(z, H) {
    let I = me.get(z);
    I && (I.abort(H), me.delete(z));
  }
  function nt(z) {
    for (let H of z) {
      let I = Zt(H),
        ae = Fr(I.data);
      N.fetchers.set(H, ae);
    }
  }
  function Kn() {
    let z = [],
      H = !1;
    for (let I of C) {
      let ae = N.fetchers.get(I);
      (He(ae, `Expected fetcher: ${I}`),
        ae.state === "loading" && (C.delete(I), z.push(I), (H = !0)));
    }
    return (nt(z), H);
  }
  function sn(z) {
    let H = [];
    for (let [I, ae] of G)
      if (ae < z) {
        let ce = N.fetchers.get(I);
        (He(ce, `Expected fetcher: ${I}`),
          ce.state === "loading" && (bt(I), G.delete(I), H.push(I)));
      }
    return (nt(H), H.length > 0);
  }
  function gc(z, H) {
    let I = N.blockers.get(z) || ro;
    return (Ne.get(z) !== H && Ne.set(z, H), I);
  }
  function Di(z) {
    (N.blockers.delete(z), Ne.delete(z));
  }
  function Er(z, H) {
    let I = N.blockers.get(z) || ro;
    He(
      (I.state === "unblocked" && H.state === "blocked") ||
        (I.state === "blocked" && H.state === "blocked") ||
        (I.state === "blocked" && H.state === "proceeding") ||
        (I.state === "blocked" && H.state === "unblocked") ||
        (I.state === "proceeding" && H.state === "unblocked"),
      `Invalid blocker state transition: ${I.state} -> ${H.state}`,
    );
    let ae = new Map(N.blockers);
    (ae.set(z, H), Et({ blockers: ae }));
  }
  function Ni({ currentLocation: z, nextLocation: H, historyAction: I }) {
    if (Ne.size === 0) return;
    Ne.size > 1 && Rt(!1, "A router only supports one blocker at a time");
    let ae = Array.from(Ne.entries()),
      [ce, xe] = ae[ae.length - 1],
      pe = N.blockers.get(ce);
    if (
      !(pe && pe.state === "proceeding") &&
      xe({ currentLocation: z, nextLocation: H, historyAction: I })
    )
      return ce;
  }
  function Zn(z) {
    let H = Pn(404, { pathname: z }),
      I = h || f,
      { matches: ae, route: ce } = au(I);
    return { notFoundMatches: ae, route: ce, error: H };
  }
  function ua(z, H, I) {
    if (((S = z), (k = H), (_ = I || null), !T && N.navigation === Nd)) {
      T = !0;
      let ae = hl(N.location, N.matches);
      ae != null && Et({ restoreScrollPosition: ae });
    }
    return () => {
      ((S = null), (k = null), (_ = null));
    };
  }
  function $r(z, H) {
    return (
      (_ &&
        _(
          z,
          H.map((ae) => eE(ae, N.loaderData)),
        )) ||
      z.key
    );
  }
  function yc(z, H) {
    if (S && k) {
      let I = $r(z, H);
      S[I] = k();
    }
  }
  function hl(z, H) {
    if (S) {
      let I = $r(z, H),
        ae = S[I];
      if (typeof ae == "number") return ae;
    }
    return null;
  }
  function Jr(z, H, I) {
    if (e.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: po(H, I, p, !0) };
      } else return { active: !0, matches: po(H, I, p, !0) || [] };
    return { active: !1, matches: null };
  }
  async function ur(z, H, I, ae) {
    if (!e.patchRoutesOnNavigation) return { type: "success", matches: z };
    let ce = z;
    for (;;) {
      let xe = h == null,
        pe = h || f,
        ge = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: I,
          path: H,
          matches: ce,
          fetcherKey: ae,
          patch: (Te, ke) => {
            I.aborted || Y0(Te, ke, pe, ge, u, !1);
          },
        });
      } catch (Te) {
        return { type: "error", error: Te, partialMatches: ce };
      } finally {
        xe && !I.aborted && (f = [...f]);
      }
      if (I.aborted) return { type: "aborted" };
      let ye = ki(pe, H, p),
        Ce = null;
      if (ye) {
        if (Object.keys(ye[0].params).length === 0)
          return { type: "success", matches: ye };
        if (
          ((Ce = po(pe, H, p, !0)),
          !(Ce && ce.length < Ce.length && Io(ce, Ce.slice(0, ce.length))))
        )
          return { type: "success", matches: ye };
      }
      if ((Ce || (Ce = po(pe, H, p, !0)), !Ce || Io(ce, Ce)))
        return { type: "success", matches: null };
      ce = Ce;
    }
  }
  function Io(z, H) {
    return (
      z.length === H.length && z.every((I, ae) => I.route.id === H[ae].route.id)
    );
  }
  function Xo(z) {
    ((c = {}), (h = Eo(z, u, void 0, c)));
  }
  function Go(z, H, I = !1) {
    let ae = h == null;
    (Y0(z, H, h || f, c, u, I), ae && ((f = [...f]), Et({})));
  }
  return (
    (K = {
      get basename() {
        return p;
      },
      get future() {
        return g;
      },
      get state() {
        return N;
      },
      get routes() {
        return f;
      },
      get window() {
        return n;
      },
      initialize: on,
      subscribe: Oi,
      enableScrollRestoration: ua,
      navigate: Sr,
      fetch: fl,
      revalidate: Kr,
      createHref: (z) => e.history.createHref(z),
      encodeLocation: (z) => e.history.encodeLocation(z),
      getFetcher: Zt,
      resetFetcher: Qn,
      deleteFetcher: kt,
      dispose: Xn,
      getBlocker: gc,
      deleteBlocker: Di,
      patchRoutes: Go,
      _internalFetchControllers: me,
      _internalSetRoutes: Xo,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
        Et(z);
      },
    }),
    e.unstable_instrumentations &&
      (K = xE(
        K,
        e.unstable_instrumentations.map((z) => z.router).filter(Boolean),
      )),
    K
  );
}
function zE(e) {
  return (
    e != null &&
    (("formData" in e && e.formData != null) ||
      ("body" in e && e.body !== void 0))
  );
}
function gh(e, n, i, a, o, u) {
  let c, f;
  if (o) {
    c = [];
    for (let p of n)
      if ((c.push(p), p.route.id === o)) {
        f = p;
        break;
      }
  } else ((c = n), (f = n[n.length - 1]));
  let h = Oo(a || ".", Gu(c), In(e.pathname, i) || e.pathname, u === "path");
  if (
    (a == null && ((h.search = e.search), (h.hash = e.hash)),
    (a == null || a === "" || a === ".") && f)
  ) {
    let p = Wh(h.search);
    if (f.route.index && !p)
      h.search = h.search ? h.search.replace(/^\?/, "?index&") : "?index";
    else if (!f.route.index && p) {
      let y = new URLSearchParams(h.search),
        g = y.getAll("index");
      (y.delete("index"),
        g.filter((v) => v).forEach((v) => y.append("index", v)));
      let x = y.toString();
      h.search = x ? `?${x}` : "";
    }
  }
  return (
    i !== "/" && (h.pathname = hE({ basename: i, pathname: h.pathname })),
    br(h)
  );
}
function P0(e, n, i) {
  if (!i || !zE(i)) return { path: n };
  if (i.formMethod && !ZE(i.formMethod))
    return { path: n, error: Pn(405, { method: i.formMethod }) };
  let a = () => ({ path: n, error: Pn(400, { type: "invalid-body" }) }),
    u = (i.formMethod || "get").toUpperCase(),
    c = ox(n);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!Wt(u)) return a();
      let g =
        typeof i.body == "string"
          ? i.body
          : i.body instanceof FormData || i.body instanceof URLSearchParams
            ? Array.from(i.body.entries()).reduce(
                (x, [v, S]) => `${x}${v}=${S}
`,
                "",
              )
            : String(i.body);
      return {
        path: n,
        submission: {
          formMethod: u,
          formAction: c,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: g,
        },
      };
    } else if (i.formEncType === "application/json") {
      if (!Wt(u)) return a();
      try {
        let g = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: n,
          submission: {
            formMethod: u,
            formAction: c,
            formEncType: i.formEncType,
            formData: void 0,
            json: g,
            text: void 0,
          },
        };
      } catch {
        return a();
      }
    }
  }
  He(
    typeof FormData == "function",
    "FormData is not available in this environment",
  );
  let f, h;
  if (i.formData) ((f = bh(i.formData)), (h = i.formData));
  else if (i.body instanceof FormData) ((f = bh(i.body)), (h = i.body));
  else if (i.body instanceof URLSearchParams) ((f = i.body), (h = K0(f)));
  else if (i.body == null) ((f = new URLSearchParams()), (h = new FormData()));
  else
    try {
      ((f = new URLSearchParams(i.body)), (h = K0(f)));
    } catch {
      return a();
    }
  let p = {
    formMethod: u,
    formAction: c,
    formEncType: (i && i.formEncType) || "application/x-www-form-urlencoded",
    formData: h,
    json: void 0,
    text: void 0,
  };
  if (Wt(p.formMethod)) return { path: n, submission: p };
  let y = Xr(n);
  return (
    e && y.search && Wh(y.search) && f.append("index", ""),
    (y.search = `?${f}`),
    { path: br(y), submission: p }
  );
}
function V0(e, n, i, a, o, u, c, f, h, p, y, g, x, v, S, _, k, T, j, M, $) {
  let Z = M ? (Tn(M[1]) ? M[1].error : M[1].data) : void 0,
    U = o.createURL(u.location),
    K = o.createURL(h),
    N;
  if (y && u.errors) {
    let ee = Object.keys(u.errors)[0];
    N = c.findIndex((D) => D.route.id === ee);
  } else if (M && Tn(M[1])) {
    let ee = M[0];
    N = c.findIndex((D) => D.route.id === ee) - 1;
  }
  let he = M ? M[1].statusCode : void 0,
    F = he && he >= 400,
    oe = {
      currentUrl: U,
      currentParams: u.matches[0]?.params || {},
      nextUrl: K,
      nextParams: c[0].params,
      ...f,
      actionResult: Z,
      actionStatus: he,
    },
    ie = Do(c),
    Ee = c.map((ee, D) => {
      let { route: te } = ee,
        fe = null;
      if (N != null && D > N) fe = !1;
      else if (te.lazy) fe = !0;
      else if (!$h(te)) fe = !1;
      else if (y) {
        let { shouldLoad: G } = tx(te, u.loaderData, u.errors);
        fe = G;
      } else DE(u.loaderData, u.matches[D], ee) && (fe = !0);
      if (fe !== null) return yh(i, a, e, ie, ee, p, n, fe);
      let me = !1;
      typeof $ == "boolean"
        ? (me = $)
        : F
          ? (me = !1)
          : (g ||
              U.pathname + U.search === K.pathname + K.search ||
              U.search !== K.search ||
              NE(u.matches[D], ee)) &&
            (me = !0);
      let R = { ...oe, defaultShouldRevalidate: me },
        O = bo(ee, R);
      return yh(i, a, e, ie, ee, p, n, O, R, $);
    }),
    le = [];
  return (
    S.forEach((ee, D) => {
      if (y || !c.some((se) => se.route.id === ee.routeId) || v.has(D)) return;
      let te = u.fetchers.get(D),
        fe = te && te.state !== "idle" && te.data === void 0,
        me = ki(k, ee.path, T);
      if (!me) {
        if (j && fe) return;
        le.push({
          key: D,
          routeId: ee.routeId,
          path: ee.path,
          matches: null,
          match: null,
          request: null,
          controller: null,
        });
        return;
      }
      if (_.has(D)) return;
      let R = bu(me, ee.path),
        O = new AbortController(),
        G = Ka(o, ee.path, O.signal),
        C = null;
      if (x.has(D)) (x.delete(D), (C = Wa(i, a, G, me, R, p, n)));
      else if (fe) g && (C = Wa(i, a, G, me, R, p, n));
      else {
        let se;
        typeof $ == "boolean" ? (se = $) : F ? (se = !1) : (se = g);
        let Se = { ...oe, defaultShouldRevalidate: se };
        bo(R, Se) && (C = Wa(i, a, G, me, R, p, n, Se));
      }
      C &&
        le.push({
          key: D,
          routeId: ee.routeId,
          path: ee.path,
          matches: C,
          match: R,
          request: G,
          controller: O,
        });
    }),
    { dsMatches: Ee, revalidatingFetchers: le }
  );
}
function $h(e) {
  return e.loader != null || (e.middleware != null && e.middleware.length > 0);
}
function tx(e, n, i) {
  if (e.lazy) return { shouldLoad: !0, renderFallback: !0 };
  if (!$h(e)) return { shouldLoad: !1, renderFallback: !1 };
  let a = n != null && e.id in n,
    o = i != null && i[e.id] !== void 0;
  if (!a && o) return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !a };
  let u = !a && !o;
  return { shouldLoad: u, renderFallback: u };
}
function DE(e, n, i) {
  let a = !n || i.route.id !== n.route.id,
    o = !e.hasOwnProperty(i.route.id);
  return a || o;
}
function NE(e, n) {
  let i = e.route.path;
  return (
    e.pathname !== n.pathname ||
    (i != null && i.endsWith("*") && e.params["*"] !== n.params["*"])
  );
}
function bo(e, n) {
  if (e.route.shouldRevalidate) {
    let i = e.route.shouldRevalidate(n);
    if (typeof i == "boolean") return i;
  }
  return n.defaultShouldRevalidate;
}
function Y0(e, n, i, a, o, u) {
  let c;
  if (e) {
    let p = a[e];
    (He(p, `No route found to patch children into: routeId = ${e}`),
      p.children || (p.children = []),
      (c = p.children));
  } else c = i;
  let f = [],
    h = [];
  if (
    (n.forEach((p) => {
      let y = c.find((g) => nx(p, g));
      y ? h.push({ existingRoute: y, newRoute: p }) : f.push(p);
    }),
    f.length > 0)
  ) {
    let p = Eo(f, o, [e || "_", "patch", String(c?.length || "0")], a);
    c.push(...p);
  }
  if (u && h.length > 0)
    for (let p = 0; p < h.length; p++) {
      let { existingRoute: y, newRoute: g } = h[p],
        x = y,
        [v] = Eo([g], o, [], {}, !0);
      Object.assign(x, {
        element: v.element ? v.element : x.element,
        errorElement: v.errorElement ? v.errorElement : x.errorElement,
        hydrateFallbackElement: v.hydrateFallbackElement
          ? v.hydrateFallbackElement
          : x.hydrateFallbackElement,
      });
    }
}
function nx(e, n) {
  return "id" in e && "id" in n && e.id === n.id
    ? !0
    : e.index === n.index &&
        e.path === n.path &&
        e.caseSensitive === n.caseSensitive
      ? (!e.children || e.children.length === 0) &&
        (!n.children || n.children.length === 0)
        ? !0
        : (e.children?.every((i, a) => n.children?.some((o) => nx(i, o))) ?? !1)
      : !1;
}
var I0 = new WeakMap(),
  rx = ({ key: e, route: n, manifest: i, mapRouteProperties: a }) => {
    let o = i[n.id];
    if (
      (He(o, "No route found in manifest"),
      !o.lazy || typeof o.lazy != "object")
    )
      return;
    let u = o.lazy[e];
    if (!u) return;
    let c = I0.get(o);
    c || ((c = {}), I0.set(o, c));
    let f = c[e];
    if (f) return f;
    let h = (async () => {
      let p = Z2(e),
        g = o[e] !== void 0 && e !== "hasErrorBoundary";
      if (p)
        (Rt(
          !p,
          "Route property " +
            e +
            " is not a supported lazy route property. This property will be ignored.",
        ),
          (c[e] = Promise.resolve()));
      else if (g)
        Rt(
          !1,
          `Route "${o.id}" has a static property "${e}" defined. The lazy property will be ignored.`,
        );
      else {
        let x = await u();
        x != null && (Object.assign(o, { [e]: x }), Object.assign(o, a(o)));
      }
      typeof o.lazy == "object" &&
        ((o.lazy[e] = void 0),
        Object.values(o.lazy).every((x) => x === void 0) && (o.lazy = void 0));
    })();
    return ((c[e] = h), h);
  },
  X0 = new WeakMap();
function ME(e, n, i, a, o) {
  let u = i[e.id];
  if ((He(u, "No route found in manifest"), !e.lazy))
    return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
  if (typeof e.lazy == "function") {
    let y = X0.get(u);
    if (y) return { lazyRoutePromise: y, lazyHandlerPromise: y };
    let g = (async () => {
      He(typeof e.lazy == "function", "No lazy route function found");
      let x = await e.lazy(),
        v = {};
      for (let S in x) {
        let _ = x[S];
        if (_ === void 0) continue;
        let k = J2(S),
          j = u[S] !== void 0 && S !== "hasErrorBoundary";
        k
          ? Rt(
              !k,
              "Route property " +
                S +
                " is not a supported property to be returned from a lazy route function. This property will be ignored.",
            )
          : j
            ? Rt(
                !j,
                `Route "${u.id}" has a static property "${S}" defined but its lazy function is also returning a value for this property. The lazy route property "${S}" will be ignored.`,
              )
            : (v[S] = _);
      }
      (Object.assign(u, v), Object.assign(u, { ...a(u), lazy: void 0 }));
    })();
    return (
      X0.set(u, g),
      g.catch(() => {}),
      { lazyRoutePromise: g, lazyHandlerPromise: g }
    );
  }
  let c = Object.keys(e.lazy),
    f = [],
    h;
  for (let y of c) {
    if (o && o.includes(y)) continue;
    let g = rx({ key: y, route: e, manifest: i, mapRouteProperties: a });
    g && (f.push(g), y === n && (h = g));
  }
  let p = f.length > 0 ? Promise.all(f).then(() => {}) : void 0;
  return (
    p?.catch(() => {}),
    h?.catch(() => {}),
    { lazyRoutePromise: p, lazyHandlerPromise: h }
  );
}
async function G0(e) {
  let n = e.matches.filter((o) => o.shouldLoad),
    i = {};
  return (
    (await Promise.all(n.map((o) => o.resolve()))).forEach((o, u) => {
      i[n[u].route.id] = o;
    }),
    i
  );
}
async function jE(e) {
  return e.matches.some((n) => n.route.middleware) ? ix(e, () => G0(e)) : G0(e);
}
function ix(e, n) {
  return LE(
    e,
    n,
    (a) => {
      if (KE(a)) throw a;
      return a;
    },
    IE,
    i,
  );
  function i(a, o, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, { [o]: { type: "error", result: a } }),
      );
    {
      let { matches: c } = e,
        f = Math.min(
          Math.max(
            c.findIndex((p) => p.route.id === o),
            0,
          ),
          Math.max(
            c.findIndex((p) => p.shouldCallHandler()),
            0,
          ),
        ),
        h = Ci(c, c[f].route.id).route.id;
      return Promise.resolve({ [h]: { type: "error", result: a } });
    }
  }
}
async function LE(e, n, i, a, o) {
  let {
      matches: u,
      request: c,
      params: f,
      context: h,
      unstable_pattern: p,
    } = e,
    y = u.flatMap((x) =>
      x.route.middleware ? x.route.middleware.map((v) => [x.route.id, v]) : [],
    );
  return await ax(
    { request: c, params: f, context: h, unstable_pattern: p },
    y,
    n,
    i,
    a,
    o,
  );
}
async function ax(e, n, i, a, o, u, c = 0) {
  let { request: f } = e;
  if (f.signal.aborted)
    throw f.signal.reason ?? new Error(`Request aborted: ${f.method} ${f.url}`);
  let h = n[c];
  if (!h) return await i();
  let [p, y] = h,
    g,
    x = async () => {
      if (g) throw new Error("You may only call `next()` once per middleware");
      try {
        return ((g = { value: await ax(e, n, i, a, o, u, c + 1) }), g.value);
      } catch (v) {
        return ((g = { value: await u(v, p, g) }), g.value);
      }
    };
  try {
    let v = await y(e, x),
      S = v != null ? a(v) : void 0;
    return o(S)
      ? S
      : g
        ? (S ?? g.value)
        : ((g = { value: await x() }), g.value);
  } catch (v) {
    return await u(v, p, g);
  }
}
function lx(e, n, i, a, o) {
  let u = rx({
      key: "middleware",
      route: a.route,
      manifest: n,
      mapRouteProperties: e,
    }),
    c = ME(a.route, Wt(i.method) ? "action" : "loader", n, e, o);
  return {
    middleware: u,
    route: c.lazyRoutePromise,
    handler: c.lazyHandlerPromise,
  };
}
function yh(e, n, i, a, o, u, c, f, h = null, p) {
  let y = !1,
    g = lx(e, n, i, o, u);
  return {
    ...o,
    _lazyPromises: g,
    shouldLoad: f,
    shouldRevalidateArgs: h,
    shouldCallHandler(x) {
      return (
        (y = !0),
        h
          ? typeof p == "boolean"
            ? bo(o, { ...h, defaultShouldRevalidate: p })
            : typeof x == "boolean"
              ? bo(o, { ...h, defaultShouldRevalidate: x })
              : bo(o, h)
          : f
      );
    },
    resolve(x) {
      let { lazy: v, loader: S, middleware: _ } = o.route,
        k = y || f || (x && !Wt(i.method) && (v || S)),
        T = _ && _.length > 0 && !S && !v;
      return k && (Wt(i.method) || !T)
        ? UE({
            request: i,
            unstable_pattern: a,
            match: o,
            lazyHandlerPromise: g?.handler,
            lazyRoutePromise: g?.route,
            handlerOverride: x,
            scopedContext: c,
          })
        : Promise.resolve({ type: "data", result: void 0 });
    },
  };
}
function Wa(e, n, i, a, o, u, c, f = null) {
  return a.map((h) =>
    h.route.id !== o.route.id
      ? {
          ...h,
          shouldLoad: !1,
          shouldRevalidateArgs: f,
          shouldCallHandler: () => !1,
          _lazyPromises: lx(e, n, i, h, u),
          resolve: () => Promise.resolve({ type: "data", result: void 0 }),
        }
      : yh(e, n, i, Do(a), h, u, c, !0, f),
  );
}
async function BE(e, n, i, a, o, u) {
  i.some((p) => p._lazyPromises?.middleware) &&
    (await Promise.all(i.map((p) => p._lazyPromises?.middleware)));
  let c = {
      request: n,
      unstable_pattern: Do(i),
      params: i[0].params,
      context: o,
      matches: i,
    },
    h = await e({
      ...c,
      fetcherKey: a,
      runClientMiddleware: (p) => {
        let y = c;
        return ix(y, () =>
          p({
            ...y,
            fetcherKey: a,
            runClientMiddleware: () => {
              throw new Error(
                "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler",
              );
            },
          }),
        );
      },
    });
  try {
    await Promise.all(
      i.flatMap((p) => [p._lazyPromises?.handler, p._lazyPromises?.route]),
    );
  } catch {}
  return h;
}
async function UE({
  request: e,
  unstable_pattern: n,
  match: i,
  lazyHandlerPromise: a,
  lazyRoutePromise: o,
  handlerOverride: u,
  scopedContext: c,
}) {
  let f,
    h,
    p = Wt(e.method),
    y = p ? "action" : "loader",
    g = (x) => {
      let v,
        S = new Promise((T, j) => (v = j));
      ((h = () => v()), e.signal.addEventListener("abort", h));
      let _ = (T) =>
          typeof x != "function"
            ? Promise.reject(
                new Error(
                  `You cannot call the handler for a route which defines a boolean "${y}" [routeId: ${i.route.id}]`,
                ),
              )
            : x(
                {
                  request: e,
                  unstable_pattern: n,
                  params: i.params,
                  context: c,
                },
                ...(T !== void 0 ? [T] : []),
              ),
        k = (async () => {
          try {
            return { type: "data", result: await (u ? u((j) => _(j)) : _()) };
          } catch (T) {
            return { type: "error", result: T };
          }
        })();
      return Promise.race([k, S]);
    };
  try {
    let x = p ? i.route.action : i.route.loader;
    if (a || o)
      if (x) {
        let v,
          [S] = await Promise.all([
            g(x).catch((_) => {
              v = _;
            }),
            a,
            o,
          ]);
        if (v !== void 0) throw v;
        f = S;
      } else {
        await a;
        let v = p ? i.route.action : i.route.loader;
        if (v) [f] = await Promise.all([g(v), o]);
        else if (y === "action") {
          let S = new URL(e.url),
            _ = S.pathname + S.search;
          throw Pn(405, { method: e.method, pathname: _, routeId: i.route.id });
        } else return { type: "data", result: void 0 };
      }
    else if (x) f = await g(x);
    else {
      let v = new URL(e.url),
        S = v.pathname + v.search;
      throw Pn(404, { pathname: S });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    h && e.signal.removeEventListener("abort", h);
  }
  return f;
}
async function HE(e) {
  let n = e.headers.get("Content-Type");
  return n && /\bapplication\/json\b/.test(n)
    ? e.body == null
      ? null
      : e.json()
    : e.text();
}
async function qE(e) {
  let { result: n, type: i } = e;
  if (Jh(n)) {
    let a;
    try {
      a = await HE(n);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error"
      ? {
          type: "error",
          error: new zo(n.status, n.statusText, a),
          statusCode: n.status,
          headers: n.headers,
        }
      : { type: "data", data: a, statusCode: n.status, headers: n.headers };
  }
  return i === "error"
    ? W0(n)
      ? n.data instanceof Error
        ? {
            type: "error",
            error: n.data,
            statusCode: n.init?.status,
            headers: n.init?.headers ? new Headers(n.init.headers) : void 0,
          }
        : {
            type: "error",
            error: YE(n),
            statusCode: ko(n) ? n.status : void 0,
            headers: n.init?.headers ? new Headers(n.init.headers) : void 0,
          }
      : { type: "error", error: n, statusCode: ko(n) ? n.status : void 0 }
    : W0(n)
      ? {
          type: "data",
          data: n.data,
          statusCode: n.init?.status,
          headers: n.init?.headers ? new Headers(n.init.headers) : void 0,
        }
      : { type: "data", data: n };
}
function FE(e, n, i, a, o) {
  let u = e.headers.get("Location");
  if (
    (He(
      u,
      "Redirects returned/thrown from loaders/actions must have a Location header",
    ),
    !Zh(u))
  ) {
    let c = a.slice(0, a.findIndex((f) => f.route.id === i) + 1);
    ((u = gh(new URL(n.url), c, o, u)), e.headers.set("Location", u));
  }
  return e;
}
function Q0(e, n, i, a) {
  let o = [
    "about:",
    "blob:",
    "chrome:",
    "chrome-untrusted:",
    "content:",
    "data:",
    "devtools:",
    "file:",
    "filesystem:",
    "javascript:",
  ];
  if (Zh(e)) {
    let u = e,
      c = u.startsWith("//") ? new URL(n.protocol + u) : new URL(u);
    if (o.includes(c.protocol)) throw new Error("Invalid redirect location");
    let f = In(c.pathname, i) != null;
    if (c.origin === n.origin && f) return c.pathname + c.search + c.hash;
  }
  try {
    let u = a.createURL(e);
    if (o.includes(u.protocol)) throw new Error("Invalid redirect location");
  } catch {}
  return e;
}
function Ka(e, n, i, a) {
  let o = e.createURL(ox(n)).toString(),
    u = { signal: i };
  if (a && Wt(a.formMethod)) {
    let { formMethod: c, formEncType: f } = a;
    ((u.method = c.toUpperCase()),
      f === "application/json"
        ? ((u.headers = new Headers({ "Content-Type": f })),
          (u.body = JSON.stringify(a.json)))
        : f === "text/plain"
          ? (u.body = a.text)
          : f === "application/x-www-form-urlencoded" && a.formData
            ? (u.body = bh(a.formData))
            : (u.body = a.formData));
  }
  return new Request(o, u);
}
function bh(e) {
  let n = new URLSearchParams();
  for (let [i, a] of e.entries())
    n.append(i, typeof a == "string" ? a : a.name);
  return n;
}
function K0(e) {
  let n = new FormData();
  for (let [i, a] of e.entries()) n.append(i, a);
  return n;
}
function PE(e, n, i, a = !1, o = !1) {
  let u = {},
    c = null,
    f,
    h = !1,
    p = {},
    y = i && Tn(i[1]) ? i[1].error : void 0;
  return (
    e.forEach((g) => {
      if (!(g.route.id in n)) return;
      let x = g.route.id,
        v = n[x];
      if (
        (He(!Wi(v), "Cannot handle redirect results in processLoaderData"),
        Tn(v))
      ) {
        let S = v.error;
        if ((y !== void 0 && ((S = y), (y = void 0)), (c = c || {}), o))
          c[x] = S;
        else {
          let _ = Ci(e, x);
          c[_.route.id] == null && (c[_.route.id] = S);
        }
        (a || (u[x] = ex),
          h || ((h = !0), (f = ko(v.error) ? v.error.status : 500)),
          v.headers && (p[x] = v.headers));
      } else
        ((u[x] = v.data),
          v.statusCode && v.statusCode !== 200 && !h && (f = v.statusCode),
          v.headers && (p[x] = v.headers));
    }),
    y !== void 0 && i && ((c = { [i[0]]: y }), i[2] && (u[i[2]] = void 0)),
    { loaderData: u, errors: c, statusCode: f || 200, loaderHeaders: p }
  );
}
function Z0(e, n, i, a, o, u) {
  let { loaderData: c, errors: f } = PE(n, i, a);
  return (
    o
      .filter((h) => !h.matches || h.matches.some((p) => p.shouldLoad))
      .forEach((h) => {
        let { key: p, match: y, controller: g } = h;
        if (g && g.signal.aborted) return;
        let x = u[p];
        if ((He(x, "Did not find corresponding fetcher result"), Tn(x))) {
          let v = Ci(e.matches, y?.route.id);
          ((f && f[v.route.id]) || (f = { ...f, [v.route.id]: x.error }),
            e.fetchers.delete(p));
        } else if (Wi(x)) He(!1, "Unhandled fetcher revalidation redirect");
        else {
          let v = Fr(x.data);
          e.fetchers.set(p, v);
        }
      }),
    { loaderData: c, errors: f }
  );
}
function $0(e, n, i, a) {
  let o = Object.entries(n)
    .filter(([, u]) => u !== ex)
    .reduce((u, [c, f]) => ((u[c] = f), u), {});
  for (let u of i) {
    let c = u.route.id;
    if (
      (!n.hasOwnProperty(c) &&
        e.hasOwnProperty(c) &&
        u.route.loader &&
        (o[c] = e[c]),
      a && a.hasOwnProperty(c))
    )
      break;
  }
  return o;
}
function J0(e) {
  return e
    ? Tn(e[1])
      ? { actionData: {} }
      : { actionData: { [e[0]]: e[1].data } }
    : {};
}
function Ci(e, n) {
  return (
    (n ? e.slice(0, e.findIndex((a) => a.route.id === n) + 1) : [...e])
      .reverse()
      .find((a) => a.route.hasErrorBoundary === !0) || e[0]
  );
}
function au(e) {
  let n =
    e.length === 1
      ? e[0]
      : e.find((i) => i.index || !i.path || i.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: n }],
    route: n,
  };
}
function Pn(
  e,
  { pathname: n, routeId: i, method: a, type: o, message: u } = {},
) {
  let c = "Unknown Server Error",
    f = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((c = "Bad Request"),
        a && n && i
          ? (f = `You made a ${a} request to "${n}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.`)
          : o === "invalid-body" && (f = "Unable to encode submission body"))
      : e === 403
        ? ((c = "Forbidden"), (f = `Route "${i}" does not match URL "${n}"`))
        : e === 404
          ? ((c = "Not Found"), (f = `No route matches URL "${n}"`))
          : e === 405 &&
            ((c = "Method Not Allowed"),
            a && n && i
              ? (f = `You made a ${a.toUpperCase()} request to "${n}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.`)
              : a && (f = `Invalid request method "${a.toUpperCase()}"`)),
    new zo(e || 500, c, new Error(f), !0)
  );
}
function lu(e) {
  let n = Object.entries(e);
  for (let i = n.length - 1; i >= 0; i--) {
    let [a, o] = n[i];
    if (Wi(o)) return { key: a, result: o };
  }
}
function ox(e) {
  let n = typeof e == "string" ? Xr(e) : e;
  return br({ ...n, hash: "" });
}
function VE(e, n) {
  return e.pathname !== n.pathname || e.search !== n.search
    ? !1
    : e.hash === ""
      ? n.hash !== ""
      : e.hash === n.hash
        ? !0
        : n.hash !== "";
}
function YE(e) {
  return new zo(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data,
  );
}
function IE(e) {
  return (
    e != null &&
    typeof e == "object" &&
    Object.entries(e).every(([n, i]) => typeof n == "string" && XE(i))
  );
}
function XE(e) {
  return (
    e != null &&
    typeof e == "object" &&
    "type" in e &&
    "result" in e &&
    (e.type === "data" || e.type === "error")
  );
}
function GE(e) {
  return Jh(e.result) && J1.has(e.result.status);
}
function Tn(e) {
  return e.type === "error";
}
function Wi(e) {
  return (e && e.type) === "redirect";
}
function W0(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "type" in e &&
    "data" in e &&
    "init" in e &&
    e.type === "DataWithResponseInit"
  );
}
function Jh(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function QE(e) {
  return J1.has(e);
}
function KE(e) {
  return Jh(e) && QE(e.status) && e.headers.has("Location");
}
function ZE(e) {
  return _E.has(e.toUpperCase());
}
function Wt(e) {
  return kE.has(e.toUpperCase());
}
function Wh(e) {
  return new URLSearchParams(e).getAll("index").some((n) => n === "");
}
function bu(e, n) {
  let i = typeof n == "string" ? Xr(n).search : n.search;
  if (e[e.length - 1].route.index && Wh(i || "")) return e[e.length - 1];
  let a = G1(e);
  return a[a.length - 1];
}
function eb(e) {
  let {
    formMethod: n,
    formAction: i,
    formEncType: a,
    text: o,
    formData: u,
    json: c,
  } = e;
  if (!(!n || !i || !a)) {
    if (o != null)
      return {
        formMethod: n,
        formAction: i,
        formEncType: a,
        formData: void 0,
        json: void 0,
        text: o,
      };
    if (u != null)
      return {
        formMethod: n,
        formAction: i,
        formEncType: a,
        formData: u,
        json: void 0,
        text: void 0,
      };
    if (c !== void 0)
      return {
        formMethod: n,
        formAction: i,
        formEncType: a,
        formData: void 0,
        json: c,
        text: void 0,
      };
  }
}
function Md(e, n) {
  return n
    ? {
        state: "loading",
        location: e,
        formMethod: n.formMethod,
        formAction: n.formAction,
        formEncType: n.formEncType,
        formData: n.formData,
        json: n.json,
        text: n.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function $E(e, n) {
  return {
    state: "submitting",
    location: e,
    formMethod: n.formMethod,
    formAction: n.formAction,
    formEncType: n.formEncType,
    formData: n.formData,
    json: n.json,
    text: n.text,
  };
}
function io(e, n) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: n,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: n,
      };
}
function JE(e, n) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: n ? n.data : void 0,
  };
}
function Fr(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function WE(e, n) {
  try {
    let i = e.sessionStorage.getItem(W1);
    if (i) {
      let a = JSON.parse(i);
      for (let [o, u] of Object.entries(a || {}))
        u && Array.isArray(u) && n.set(o, new Set(u || []));
    }
  } catch {}
}
function ek(e, n) {
  if (n.size > 0) {
    let i = {};
    for (let [a, o] of n) i[a] = [...o];
    try {
      e.sessionStorage.setItem(W1, JSON.stringify(i));
    } catch (a) {
      Rt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${a}).`,
      );
    }
  }
}
function tb() {
  let e,
    n,
    i = new Promise((a, o) => {
      ((e = async (u) => {
        a(u);
        try {
          await i;
        } catch {}
      }),
        (n = async (u) => {
          o(u);
          try {
            await i;
          } catch {}
        }));
    });
  return { promise: i, resolve: e, reject: n };
}
var la = B.createContext(null);
la.displayName = "DataRouter";
var No = B.createContext(null);
No.displayName = "DataRouterState";
var sx = B.createContext(!1);
function tk() {
  return B.useContext(sx);
}
var ep = B.createContext({ isTransitioning: !1 });
ep.displayName = "ViewTransition";
var ux = B.createContext(new Map());
ux.displayName = "Fetchers";
var nk = B.createContext(null);
nk.displayName = "Await";
var On = B.createContext(null);
On.displayName = "Navigation";
var Qu = B.createContext(null);
Qu.displayName = "Location";
var lr = B.createContext({ outlet: null, matches: [], isDataRoute: !1 });
lr.displayName = "Route";
var tp = B.createContext(null);
tp.displayName = "RouteError";
var cx = "REACT_ROUTER_ERROR",
  rk = "REDIRECT",
  ik = "ROUTE_ERROR_RESPONSE";
function ak(e) {
  if (e.startsWith(`${cx}:${rk}:{`))
    try {
      let n = JSON.parse(e.slice(28));
      if (
        typeof n == "object" &&
        n &&
        typeof n.status == "number" &&
        typeof n.statusText == "string" &&
        typeof n.location == "string" &&
        typeof n.reloadDocument == "boolean" &&
        typeof n.replace == "boolean"
      )
        return n;
    } catch {}
}
function lk(e) {
  if (e.startsWith(`${cx}:${ik}:{`))
    try {
      let n = JSON.parse(e.slice(40));
      if (
        typeof n == "object" &&
        n &&
        typeof n.status == "number" &&
        typeof n.statusText == "string"
      )
        return new zo(n.status, n.statusText, n.data);
    } catch {}
}
function ok(e, { relative: n } = {}) {
  He(
    ll(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: i, navigator: a } = B.useContext(On),
    { hash: o, pathname: u, search: c } = jo(e, { relative: n }),
    f = u;
  return (
    i !== "/" && (f = u === "/" ? i : rr([i, u])),
    a.createHref({ pathname: f, search: c, hash: o })
  );
}
function ll() {
  return B.useContext(Qu) != null;
}
function Gr() {
  return (
    He(
      ll(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    B.useContext(Qu).location
  );
}
var fx =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function dx(e) {
  B.useContext(On).static || B.useLayoutEffect(e);
}
function Mo() {
  let { isDataRoute: e } = B.useContext(lr);
  return e ? Sk() : sk();
}
function sk() {
  He(
    ll(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = B.useContext(la),
    { basename: n, navigator: i } = B.useContext(On),
    { matches: a } = B.useContext(lr),
    { pathname: o } = Gr(),
    u = JSON.stringify(Gu(a)),
    c = B.useRef(!1);
  return (
    dx(() => {
      c.current = !0;
    }),
    B.useCallback(
      (h, p = {}) => {
        if ((Rt(c.current, fx), !c.current)) return;
        if (typeof h == "number") {
          i.go(h);
          return;
        }
        let y = Oo(h, JSON.parse(u), o, p.relative === "path");
        (e == null &&
          n !== "/" &&
          (y.pathname = y.pathname === "/" ? n : rr([n, y.pathname])),
          (p.replace ? i.replace : i.push)(y, p.state, p));
      },
      [n, i, u, o, e],
    )
  );
}
B.createContext(null);
function uk() {
  let { matches: e } = B.useContext(lr),
    n = e[e.length - 1];
  return n ? n.params : {};
}
function jo(e, { relative: n } = {}) {
  let { matches: i } = B.useContext(lr),
    { pathname: a } = Gr(),
    o = JSON.stringify(Gu(i));
  return B.useMemo(() => Oo(e, JSON.parse(o), a, n === "path"), [e, o, a, n]);
}
function ck(e, n, i) {
  He(
    ll(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: a } = B.useContext(On),
    { matches: o } = B.useContext(lr),
    u = o[o.length - 1],
    c = u ? u.params : {},
    f = u ? u.pathname : "/",
    h = u ? u.pathnameBase : "/",
    p = u && u.route;
  {
    let k = (p && p.path) || "";
    px(
      f,
      !p || k.endsWith("*") || k.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${f}" (under <Route path="${k}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${k}"> to <Route path="${k === "/" ? "*" : `${k}/*`}">.`,
    );
  }
  let y = Gr(),
    g;
  g = y;
  let x = g.pathname || "/",
    v = x;
  if (h !== "/") {
    let k = h.replace(/^\//, "").split("/");
    v = "/" + x.replace(/^\//, "").split("/").slice(k.length).join("/");
  }
  let S = ki(e, { pathname: v });
  return (
    Rt(
      p || S != null,
      `No routes matched location "${g.pathname}${g.search}${g.hash}" `,
    ),
    Rt(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ),
    mk(
      S &&
        S.map((k) =>
          Object.assign({}, k, {
            params: Object.assign({}, c, k.params),
            pathname: rr([
              h,
              a.encodeLocation
                ? a.encodeLocation(
                    k.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23"),
                  ).pathname
                : k.pathname,
            ]),
            pathnameBase:
              k.pathnameBase === "/"
                ? h
                : rr([
                    h,
                    a.encodeLocation
                      ? a.encodeLocation(
                          k.pathnameBase
                            .replace(/\?/g, "%3F")
                            .replace(/#/g, "%23"),
                        ).pathname
                      : k.pathnameBase,
                  ]),
          }),
        ),
      o,
      i,
    )
  );
}
function fk() {
  let e = vk(),
    n = ko(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    i = e instanceof Error ? e.stack : null,
    a = "rgba(200,200,200, 0.5)",
    o = { padding: "0.5rem", backgroundColor: a },
    u = { padding: "2px 4px", backgroundColor: a },
    c = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (c = B.createElement(
      B.Fragment,
      null,
      B.createElement("p", null, "💿 Hey developer 👋"),
      B.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        B.createElement("code", { style: u }, "ErrorBoundary"),
        " or",
        " ",
        B.createElement("code", { style: u }, "errorElement"),
        " prop on your route.",
      ),
    )),
    B.createElement(
      B.Fragment,
      null,
      B.createElement("h2", null, "Unexpected Application Error!"),
      B.createElement("h3", { style: { fontStyle: "italic" } }, n),
      i ? B.createElement("pre", { style: o }, i) : null,
      c,
    )
  );
}
var dk = B.createElement(fk, null),
  hx = class extends B.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, n) {
      return n.location !== e.location ||
        (n.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : n.error,
            location: n.location,
            revalidation: e.revalidation || n.revalidation,
          };
    }
    componentDidCatch(e, n) {
      this.props.onError
        ? this.props.onError(e, n)
        : console.error(
            "React Router caught the following error during render",
            e,
          );
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == "object" &&
        e &&
        "digest" in e &&
        typeof e.digest == "string"
      ) {
        const i = lk(e.digest);
        i && (e = i);
      }
      let n =
        e !== void 0
          ? B.createElement(
              lr.Provider,
              { value: this.props.routeContext },
              B.createElement(tp.Provider, {
                value: e,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? B.createElement(hk, { error: e }, n) : n;
    }
  };
hx.contextType = sx;
var jd = new WeakMap();
function hk({ children: e, error: n }) {
  let { basename: i } = B.useContext(On);
  if (
    typeof n == "object" &&
    n &&
    "digest" in n &&
    typeof n.digest == "string"
  ) {
    let a = ak(n.digest);
    if (a) {
      let o = jd.get(n);
      if (o) throw o;
      let u = K1(a.location, i);
      if (Q1 && !jd.get(n))
        if (u.isExternal || a.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(u.to, {
              replace: a.replace,
            }),
          );
          throw (jd.set(n, c), c);
        }
      return B.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${u.absoluteURL || u.to}`,
      });
    }
  }
  return e;
}
function pk({ routeContext: e, match: n, children: i }) {
  let a = B.useContext(la);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = n.route.id),
    B.createElement(lr.Provider, { value: e }, i)
  );
}
function mk(e, n = [], i) {
  let a = i?.state;
  if (e == null) {
    if (!a) return null;
    if (a.errors) e = a.matches;
    else if (n.length === 0 && !a.initialized && a.matches.length > 0)
      e = a.matches;
    else return null;
  }
  let o = e,
    u = a?.errors;
  if (u != null) {
    let y = o.findIndex((g) => g.route.id && u?.[g.route.id] !== void 0);
    (He(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`,
    ),
      (o = o.slice(0, Math.min(o.length, y + 1))));
  }
  let c = !1,
    f = -1;
  if (i && a) {
    c = a.renderFallback;
    for (let y = 0; y < o.length; y++) {
      let g = o[y];
      if (
        ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (f = y),
        g.route.id)
      ) {
        let { loaderData: x, errors: v } = a,
          S =
            g.route.loader &&
            !x.hasOwnProperty(g.route.id) &&
            (!v || v[g.route.id] === void 0);
        if (g.route.lazy || S) {
          (i.isStatic && (c = !0),
            f >= 0 ? (o = o.slice(0, f + 1)) : (o = [o[0]]));
          break;
        }
      }
    }
  }
  let h = i?.onError,
    p =
      a && h
        ? (y, g) => {
            h(y, {
              location: a.location,
              params: a.matches?.[0]?.params ?? {},
              unstable_pattern: Do(a.matches),
              errorInfo: g,
            });
          }
        : void 0;
  return o.reduceRight((y, g, x) => {
    let v,
      S = !1,
      _ = null,
      k = null;
    a &&
      ((v = u && g.route.id ? u[g.route.id] : void 0),
      (_ = g.route.errorElement || dk),
      c &&
        (f < 0 && x === 0
          ? (px(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (S = !0),
            (k = null))
          : f === x &&
            ((S = !0), (k = g.route.hydrateFallbackElement || null))));
    let T = n.concat(o.slice(0, x + 1)),
      j = () => {
        let M;
        return (
          v
            ? (M = _)
            : S
              ? (M = k)
              : g.route.Component
                ? (M = B.createElement(g.route.Component, null))
                : g.route.element
                  ? (M = g.route.element)
                  : (M = y),
          B.createElement(pk, {
            match: g,
            routeContext: { outlet: y, matches: T, isDataRoute: a != null },
            children: M,
          })
        );
      };
    return a && (g.route.ErrorBoundary || g.route.errorElement || x === 0)
      ? B.createElement(hx, {
          location: a.location,
          revalidation: a.revalidation,
          component: _,
          error: v,
          children: j(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p,
        })
      : j();
  }, null);
}
function np(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function gk(e) {
  let n = B.useContext(la);
  return (He(n, np(e)), n);
}
function yk(e) {
  let n = B.useContext(No);
  return (He(n, np(e)), n);
}
function bk(e) {
  let n = B.useContext(lr);
  return (He(n, np(e)), n);
}
function rp(e) {
  let n = bk(e),
    i = n.matches[n.matches.length - 1];
  return (
    He(
      i.route.id,
      `${e} can only be used on routes that contain a unique "id"`,
    ),
    i.route.id
  );
}
function xk() {
  return rp("useRouteId");
}
function vk() {
  let e = B.useContext(tp),
    n = yk("useRouteError"),
    i = rp("useRouteError");
  return e !== void 0 ? e : n.errors?.[i];
}
function Sk() {
  let { router: e } = gk("useNavigate"),
    n = rp("useNavigate"),
    i = B.useRef(!1);
  return (
    dx(() => {
      i.current = !0;
    }),
    B.useCallback(
      async (o, u = {}) => {
        (Rt(i.current, fx),
          i.current &&
            (typeof o == "number"
              ? await e.navigate(o)
              : await e.navigate(o, { fromRouteId: n, ...u })));
      },
      [e, n],
    )
  );
}
var nb = {};
function px(e, n, i) {
  !n && !nb[e] && ((nb[e] = !0), Rt(!1, i));
}
var rb = {};
function ib(e, n) {
  !e && !rb[n] && ((rb[n] = !0), console.warn(n));
}
var wk = "useOptimistic",
  ab = L2[wk],
  Ek = () => {};
function kk(e) {
  return ab ? ab(e) : [e, Ek];
}
function Ck(e) {
  let n = {
    hasErrorBoundary:
      e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      (e.element &&
        Rt(
          !1,
          "You should not include both `Component` and `element` on your route - `Component` will be used.",
        ),
      Object.assign(n, {
        element: B.createElement(e.Component),
        Component: void 0,
      })),
    e.HydrateFallback &&
      (e.hydrateFallbackElement &&
        Rt(
          !1,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.",
        ),
      Object.assign(n, {
        hydrateFallbackElement: B.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      })),
    e.ErrorBoundary &&
      (e.errorElement &&
        Rt(
          !1,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.",
        ),
      Object.assign(n, {
        errorElement: B.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      })),
    n
  );
}
var _k = ["HydrateFallback", "hydrateFallbackElement"],
  Tk = class {
    constructor() {
      ((this.status = "pending"),
        (this.promise = new Promise((e, n) => {
          ((this.resolve = (i) => {
            this.status === "pending" && ((this.status = "resolved"), e(i));
          }),
            (this.reject = (i) => {
              this.status === "pending" && ((this.status = "rejected"), n(i));
            }));
        })));
    }
  };
function Rk({
  router: e,
  flushSync: n,
  onError: i,
  unstable_useTransitions: a,
}) {
  a = tk() || a;
  let [u, c] = B.useState(e.state),
    [f, h] = kk(u),
    [p, y] = B.useState(),
    [g, x] = B.useState({ isTransitioning: !1 }),
    [v, S] = B.useState(),
    [_, k] = B.useState(),
    [T, j] = B.useState(),
    M = B.useRef(new Map()),
    $ = B.useCallback(
      (
        N,
        {
          deletedFetchers: he,
          newErrors: F,
          flushSync: oe,
          viewTransitionOpts: ie,
        },
      ) => {
        (F &&
          i &&
          Object.values(F).forEach((le) =>
            i(le, {
              location: N.location,
              params: N.matches[0]?.params ?? {},
              unstable_pattern: Do(N.matches),
            }),
          ),
          N.fetchers.forEach((le, ee) => {
            le.data !== void 0 && M.current.set(ee, le.data);
          }),
          he.forEach((le) => M.current.delete(le)),
          ib(
            oe === !1 || n != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.',
          ));
        let Ee =
          e.window != null &&
          e.window.document != null &&
          typeof e.window.document.startViewTransition == "function";
        if (
          (ib(
            ie == null || Ee,
            "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.",
          ),
          !ie || !Ee)
        ) {
          n && oe
            ? n(() => c(N))
            : a === !1
              ? c(N)
              : B.startTransition(() => {
                  (a === !0 && h((le) => lb(le, N)), c(N));
                });
          return;
        }
        if (n && oe) {
          n(() => {
            (_ && (v?.resolve(), _.skipTransition()),
              x({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: ie.currentLocation,
                nextLocation: ie.nextLocation,
              }));
          });
          let le = e.window.document.startViewTransition(() => {
            n(() => c(N));
          });
          (le.finished.finally(() => {
            n(() => {
              (S(void 0), k(void 0), y(void 0), x({ isTransitioning: !1 }));
            });
          }),
            n(() => k(le)));
          return;
        }
        _
          ? (v?.resolve(),
            _.skipTransition(),
            j({
              state: N,
              currentLocation: ie.currentLocation,
              nextLocation: ie.nextLocation,
            }))
          : (y(N),
            x({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: ie.currentLocation,
              nextLocation: ie.nextLocation,
            }));
      },
      [e.window, n, _, v, a, h, i],
    );
  (B.useLayoutEffect(() => e.subscribe($), [e, $]),
    B.useEffect(() => {
      g.isTransitioning && !g.flushSync && S(new Tk());
    }, [g]),
    B.useEffect(() => {
      if (v && p && e.window) {
        let N = p,
          he = v.promise,
          F = e.window.document.startViewTransition(async () => {
            (a === !1
              ? c(N)
              : B.startTransition(() => {
                  (a === !0 && h((oe) => lb(oe, N)), c(N));
                }),
              await he);
          });
        (F.finished.finally(() => {
          (S(void 0), k(void 0), y(void 0), x({ isTransitioning: !1 }));
        }),
          k(F));
      }
    }, [p, v, e.window, a, h]),
    B.useEffect(() => {
      v && p && f.location.key === p.location.key && v.resolve();
    }, [v, _, f.location, p]),
    B.useEffect(() => {
      !g.isTransitioning &&
        T &&
        (y(T.state),
        x({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: T.currentLocation,
          nextLocation: T.nextLocation,
        }),
        j(void 0));
    }, [g.isTransitioning, T]));
  let Z = B.useMemo(
      () => ({
        createHref: e.createHref,
        encodeLocation: e.encodeLocation,
        go: (N) => e.navigate(N),
        push: (N, he, F) =>
          e.navigate(N, {
            state: he,
            preventScrollReset: F?.preventScrollReset,
          }),
        replace: (N, he, F) =>
          e.navigate(N, {
            replace: !0,
            state: he,
            preventScrollReset: F?.preventScrollReset,
          }),
      }),
      [e],
    ),
    U = e.basename || "/",
    K = B.useMemo(
      () => ({ router: e, navigator: Z, static: !1, basename: U, onError: i }),
      [e, Z, U, i],
    );
  return B.createElement(
    B.Fragment,
    null,
    B.createElement(
      la.Provider,
      { value: K },
      B.createElement(
        No.Provider,
        { value: f },
        B.createElement(
          ux.Provider,
          { value: M.current },
          B.createElement(
            ep.Provider,
            { value: g },
            B.createElement(
              Dk,
              {
                basename: U,
                location: f.location,
                navigationType: f.historyAction,
                navigator: Z,
                unstable_useTransitions: a,
              },
              B.createElement(Ak, {
                routes: e.routes,
                future: e.future,
                state: f,
                isStatic: !1,
                onError: i,
              }),
            ),
          ),
        ),
      ),
    ),
    null,
  );
}
function lb(e, n) {
  return {
    ...e,
    navigation: n.navigation.state !== "idle" ? n.navigation : e.navigation,
    revalidation: n.revalidation !== "idle" ? n.revalidation : e.revalidation,
    actionData:
      n.navigation.state !== "submitting" ? n.actionData : e.actionData,
    fetchers: n.fetchers,
  };
}
var Ak = B.memo(Ok);
function Ok({ routes: e, future: n, state: i, isStatic: a, onError: o }) {
  return ck(e, void 0, { state: i, isStatic: a, onError: o });
}
function zk({ to: e, replace: n, state: i, relative: a }) {
  He(
    ll(),
    "<Navigate> may be used only in the context of a <Router> component.",
  );
  let { static: o } = B.useContext(On);
  Rt(
    !o,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
  );
  let { matches: u } = B.useContext(lr),
    { pathname: c } = Gr(),
    f = Mo(),
    h = Oo(e, Gu(u), c, a === "path"),
    p = JSON.stringify(h);
  return (
    B.useEffect(() => {
      f(JSON.parse(p), { replace: n, state: i, relative: a });
    }, [f, p, a, n, i]),
    null
  );
}
function Dk({
  basename: e = "/",
  children: n = null,
  location: i,
  navigationType: a = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: c,
}) {
  He(
    !ll(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let f = e.replace(/^\/*/, "/"),
    h = B.useMemo(
      () => ({
        basename: f,
        navigator: o,
        static: u,
        unstable_useTransitions: c,
        future: {},
      }),
      [f, o, u, c],
    );
  typeof i == "string" && (i = Xr(i));
  let {
      pathname: p = "/",
      search: y = "",
      hash: g = "",
      state: x = null,
      key: v = "default",
      unstable_mask: S,
    } = i,
    _ = B.useMemo(() => {
      let k = In(p, f);
      return k == null
        ? null
        : {
            location: {
              pathname: k,
              search: y,
              hash: g,
              state: x,
              key: v,
              unstable_mask: S,
            },
            navigationType: a,
          };
    }, [f, p, y, g, x, v, a, S]);
  return (
    Rt(
      _ != null,
      `<Router basename="${f}"> is not able to match the URL "${p}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    _ == null
      ? null
      : B.createElement(
          On.Provider,
          { value: h },
          B.createElement(Qu.Provider, { children: n, value: _ }),
        )
  );
}
var xu = "get",
  vu = "application/x-www-form-urlencoded";
function Ku(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function Nk(e) {
  return Ku(e) && e.tagName.toLowerCase() === "button";
}
function Mk(e) {
  return Ku(e) && e.tagName.toLowerCase() === "form";
}
function jk(e) {
  return Ku(e) && e.tagName.toLowerCase() === "input";
}
function Lk(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Bk(e, n) {
  return e.button === 0 && (!n || n === "_self") && !Lk(e);
}
var ou = null;
function Uk() {
  if (ou === null)
    try {
      (new FormData(document.createElement("form"), 0), (ou = !1));
    } catch {
      ou = !0;
    }
  return ou;
}
var Hk = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Ld(e) {
  return e != null && !Hk.has(e)
    ? (Rt(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${vu}"`,
      ),
      null)
    : e;
}
function qk(e, n) {
  let i, a, o, u, c;
  if (Mk(e)) {
    let f = e.getAttribute("action");
    ((a = f ? In(f, n) : null),
      (i = e.getAttribute("method") || xu),
      (o = Ld(e.getAttribute("enctype")) || vu),
      (u = new FormData(e)));
  } else if (Nk(e) || (jk(e) && (e.type === "submit" || e.type === "image"))) {
    let f = e.form;
    if (f == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let h = e.getAttribute("formaction") || f.getAttribute("action");
    if (
      ((a = h ? In(h, n) : null),
      (i = e.getAttribute("formmethod") || f.getAttribute("method") || xu),
      (o =
        Ld(e.getAttribute("formenctype")) ||
        Ld(f.getAttribute("enctype")) ||
        vu),
      (u = new FormData(f, e)),
      !Uk())
    ) {
      let { name: p, type: y, value: g } = e;
      if (y === "image") {
        let x = p ? `${p}.` : "";
        (u.append(`${x}x`, "0"), u.append(`${x}y`, "0"));
      } else p && u.append(p, g);
    }
  } else {
    if (Ku(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((i = xu), (a = null), (o = vu), (c = e));
  }
  return (
    u && o === "text/plain" && ((c = u), (u = void 0)),
    { action: a, method: i.toLowerCase(), encType: o, formData: u, body: c }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ip(e, n) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(n);
}
function Fk(e, n, i, a) {
  let o =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    i
      ? o.pathname.endsWith("/")
        ? (o.pathname = `${o.pathname}_.${a}`)
        : (o.pathname = `${o.pathname}.${a}`)
      : o.pathname === "/"
        ? (o.pathname = `_root.${a}`)
        : n && In(o.pathname, n) === "/"
          ? (o.pathname = `${n.replace(/\/$/, "")}/_root.${a}`)
          : (o.pathname = `${o.pathname.replace(/\/$/, "")}.${a}`),
    o
  );
}
async function Pk(e, n) {
  if (e.id in n) return n[e.id];
  try {
    let i = await import(e.module);
    return ((n[e.id] = i), i);
  } catch (i) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(i),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Vk(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function Yk(e, n, i) {
  let a = await Promise.all(
    e.map(async (o) => {
      let u = n.routes[o.route.id];
      if (u) {
        let c = await Pk(u, i);
        return c.links ? c.links() : [];
      }
      return [];
    }),
  );
  return Qk(
    a
      .flat(1)
      .filter(Vk)
      .filter((o) => o.rel === "stylesheet" || o.rel === "preload")
      .map((o) =>
        o.rel === "stylesheet"
          ? { ...o, rel: "prefetch", as: "style" }
          : { ...o, rel: "prefetch" },
      ),
  );
}
function ob(e, n, i, a, o, u) {
  let c = (h, p) => (i[p] ? h.route.id !== i[p].route.id : !0),
    f = (h, p) =>
      i[p].pathname !== h.pathname ||
      (i[p].route.path?.endsWith("*") && i[p].params["*"] !== h.params["*"]);
  return u === "assets"
    ? n.filter((h, p) => c(h, p) || f(h, p))
    : u === "data"
      ? n.filter((h, p) => {
          let y = a.routes[h.route.id];
          if (!y || !y.hasLoader) return !1;
          if (c(h, p) || f(h, p)) return !0;
          if (h.route.shouldRevalidate) {
            let g = h.route.shouldRevalidate({
              currentUrl: new URL(
                o.pathname + o.search + o.hash,
                window.origin,
              ),
              currentParams: i[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: h.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof g == "boolean") return g;
          }
          return !0;
        })
      : [];
}
function Ik(e, n, { includeHydrateFallback: i } = {}) {
  return Xk(
    e
      .map((a) => {
        let o = n.routes[a.route.id];
        if (!o) return [];
        let u = [o.module];
        return (
          o.clientActionModule && (u = u.concat(o.clientActionModule)),
          o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)),
          i &&
            o.hydrateFallbackModule &&
            (u = u.concat(o.hydrateFallbackModule)),
          o.imports && (u = u.concat(o.imports)),
          u
        );
      })
      .flat(1),
  );
}
function Xk(e) {
  return [...new Set(e)];
}
function Gk(e) {
  let n = {},
    i = Object.keys(e).sort();
  for (let a of i) n[a] = e[a];
  return n;
}
function Qk(e, n) {
  let i = new Set();
  return (
    new Set(n),
    e.reduce((a, o) => {
      let u = JSON.stringify(Gk(o));
      return (i.has(u) || (i.add(u), a.push({ key: u, link: o })), a);
    }, [])
  );
}
function mx() {
  let e = B.useContext(la);
  return (
    ip(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function Kk() {
  let e = B.useContext(No);
  return (
    ip(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var ap = B.createContext(void 0);
ap.displayName = "FrameworkContext";
function gx() {
  let e = B.useContext(ap);
  return (
    ip(e, "You must render this element inside a <HydratedRouter> element"),
    e
  );
}
function Zk(e, n) {
  let i = B.useContext(ap),
    [a, o] = B.useState(!1),
    [u, c] = B.useState(!1),
    {
      onFocus: f,
      onBlur: h,
      onMouseEnter: p,
      onMouseLeave: y,
      onTouchStart: g,
    } = n,
    x = B.useRef(null);
  (B.useEffect(() => {
    if ((e === "render" && c(!0), e === "viewport")) {
      let _ = (T) => {
          T.forEach((j) => {
            c(j.isIntersecting);
          });
        },
        k = new IntersectionObserver(_, { threshold: 0.5 });
      return (
        x.current && k.observe(x.current),
        () => {
          k.disconnect();
        }
      );
    }
  }, [e]),
    B.useEffect(() => {
      if (a) {
        let _ = setTimeout(() => {
          c(!0);
        }, 100);
        return () => {
          clearTimeout(_);
        };
      }
    }, [a]));
  let v = () => {
      o(!0);
    },
    S = () => {
      (o(!1), c(!1));
    };
  return i
    ? e !== "intent"
      ? [u, x, {}]
      : [
          u,
          x,
          {
            onFocus: ao(f, v),
            onBlur: ao(h, S),
            onMouseEnter: ao(p, v),
            onMouseLeave: ao(y, S),
            onTouchStart: ao(g, v),
          },
        ]
    : [!1, x, {}];
}
function ao(e, n) {
  return (i) => {
    (e && e(i), i.defaultPrevented || n(i));
  };
}
function $k({ page: e, ...n }) {
  let { router: i } = mx(),
    a = B.useMemo(() => ki(i.routes, e, i.basename), [i.routes, e, i.basename]);
  return a ? B.createElement(Wk, { page: e, matches: a, ...n }) : null;
}
function Jk(e) {
  let { manifest: n, routeModules: i } = gx(),
    [a, o] = B.useState([]);
  return (
    B.useEffect(() => {
      let u = !1;
      return (
        Yk(e, n, i).then((c) => {
          u || o(c);
        }),
        () => {
          u = !0;
        }
      );
    }, [e, n, i]),
    a
  );
}
function Wk({ page: e, matches: n, ...i }) {
  let a = Gr(),
    { future: o, manifest: u, routeModules: c } = gx(),
    { basename: f } = mx(),
    { loaderData: h, matches: p } = Kk(),
    y = B.useMemo(() => ob(e, n, p, u, a, "data"), [e, n, p, u, a]),
    g = B.useMemo(() => ob(e, n, p, u, a, "assets"), [e, n, p, u, a]),
    x = B.useMemo(() => {
      if (e === a.pathname + a.search + a.hash) return [];
      let _ = new Set(),
        k = !1;
      if (
        (n.forEach((j) => {
          let M = u.routes[j.route.id];
          !M ||
            !M.hasLoader ||
            ((!y.some(($) => $.route.id === j.route.id) &&
              j.route.id in h &&
              c[j.route.id]?.shouldRevalidate) ||
            M.hasClientLoader
              ? (k = !0)
              : _.add(j.route.id));
        }),
        _.size === 0)
      )
        return [];
      let T = Fk(e, f, o.unstable_trailingSlashAwareDataRequests, "data");
      return (
        k &&
          _.size > 0 &&
          T.searchParams.set(
            "_routes",
            n
              .filter((j) => _.has(j.route.id))
              .map((j) => j.route.id)
              .join(","),
          ),
        [T.pathname + T.search]
      );
    }, [f, o.unstable_trailingSlashAwareDataRequests, h, a, u, y, n, e, c]),
    v = B.useMemo(() => Ik(g, u), [g, u]),
    S = Jk(g);
  return B.createElement(
    B.Fragment,
    null,
    x.map((_) =>
      B.createElement("link", {
        key: _,
        rel: "prefetch",
        as: "fetch",
        href: _,
        ...i,
      }),
    ),
    v.map((_) =>
      B.createElement("link", { key: _, rel: "modulepreload", href: _, ...i }),
    ),
    S.map(({ key: _, link: k }) =>
      B.createElement("link", {
        key: _,
        nonce: i.nonce,
        ...k,
        crossOrigin: k.crossOrigin ?? i.crossOrigin,
      }),
    ),
  );
}
function eC(...e) {
  return (n) => {
    e.forEach((i) => {
      typeof i == "function" ? i(n) : i != null && (i.current = n);
    });
  };
}
var tC =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  tC && (window.__reactRouterVersion = "7.13.1");
} catch {}
function nC(e, n) {
  return OE({
    basename: n?.basename,
    getContext: n?.getContext,
    future: n?.future,
    history: X2({ window: n?.window }),
    hydrationData: rC(),
    routes: e,
    mapRouteProperties: Ck,
    hydrationRouteProperties: _k,
    dataStrategy: n?.dataStrategy,
    patchRoutesOnNavigation: n?.patchRoutesOnNavigation,
    window: n?.window,
    unstable_instrumentations: n?.unstable_instrumentations,
  }).initialize();
}
function rC() {
  let e = window?.__staticRouterHydrationData;
  return (e && e.errors && (e = { ...e, errors: iC(e.errors) }), e);
}
function iC(e) {
  if (!e) return null;
  let n = Object.entries(e),
    i = {};
  for (let [a, o] of n)
    if (o && o.__type === "RouteErrorResponse")
      i[a] = new zo(o.status, o.statusText, o.data, o.internal === !0);
    else if (o && o.__type === "Error") {
      if (o.__subType) {
        let u = window[o.__subType];
        if (typeof u == "function")
          try {
            let c = new u(o.message);
            ((c.stack = ""), (i[a] = c));
          } catch {}
      }
      if (i[a] == null) {
        let u = new Error(o.message);
        ((u.stack = ""), (i[a] = u));
      }
    } else i[a] = o;
  return i;
}
var yx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  na = B.forwardRef(function (
    {
      onClick: n,
      discover: i = "render",
      prefetch: a = "none",
      relative: o,
      reloadDocument: u,
      replace: c,
      unstable_mask: f,
      state: h,
      target: p,
      to: y,
      preventScrollReset: g,
      viewTransition: x,
      unstable_defaultShouldRevalidate: v,
      ...S
    },
    _,
  ) {
    let {
        basename: k,
        navigator: T,
        unstable_useTransitions: j,
      } = B.useContext(On),
      M = typeof y == "string" && yx.test(y),
      $ = K1(y, k);
    y = $.to;
    let Z = ok(y, { relative: o }),
      U = Gr(),
      K = null;
    if (f) {
      let ee = Oo(f, [], U.unstable_mask ? U.unstable_mask.pathname : "/", !0);
      (k !== "/" &&
        (ee.pathname = ee.pathname === "/" ? k : rr([k, ee.pathname])),
        (K = T.createHref(ee)));
    }
    let [N, he, F] = Zk(a, S),
      oe = sC(y, {
        replace: c,
        unstable_mask: f,
        state: h,
        target: p,
        preventScrollReset: g,
        relative: o,
        viewTransition: x,
        unstable_defaultShouldRevalidate: v,
        unstable_useTransitions: j,
      });
    function ie(ee) {
      (n && n(ee), ee.defaultPrevented || oe(ee));
    }
    let Ee = !($.isExternal || u),
      le = B.createElement("a", {
        ...S,
        ...F,
        href: (Ee ? K : void 0) || $.absoluteURL || Z,
        onClick: Ee ? ie : n,
        ref: eC(_, he),
        target: p,
        "data-discover": !M && i === "render" ? "true" : void 0,
      });
    return N && !M
      ? B.createElement(B.Fragment, null, le, B.createElement($k, { page: Z }))
      : le;
  });
na.displayName = "Link";
var aC = B.forwardRef(function (
  {
    "aria-current": n = "page",
    caseSensitive: i = !1,
    className: a = "",
    end: o = !1,
    style: u,
    to: c,
    viewTransition: f,
    children: h,
    ...p
  },
  y,
) {
  let g = jo(c, { relative: p.relative }),
    x = Gr(),
    v = B.useContext(No),
    { navigator: S, basename: _ } = B.useContext(On),
    k = v != null && hC(g) && f === !0,
    T = S.encodeLocation ? S.encodeLocation(g).pathname : g.pathname,
    j = x.pathname,
    M =
      v && v.navigation && v.navigation.location
        ? v.navigation.location.pathname
        : null;
  (i ||
    ((j = j.toLowerCase()),
    (M = M ? M.toLowerCase() : null),
    (T = T.toLowerCase())),
    M && _ && (M = In(M, _) || M));
  const $ = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
  let Z = j === T || (!o && j.startsWith(T) && j.charAt($) === "/"),
    U =
      M != null &&
      (M === T || (!o && M.startsWith(T) && M.charAt(T.length) === "/")),
    K = { isActive: Z, isPending: U, isTransitioning: k },
    N = Z ? n : void 0,
    he;
  typeof a == "function"
    ? (he = a(K))
    : (he = [
        a,
        Z ? "active" : null,
        U ? "pending" : null,
        k ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let F = typeof u == "function" ? u(K) : u;
  return B.createElement(
    na,
    {
      ...p,
      "aria-current": N,
      className: he,
      ref: y,
      style: F,
      to: c,
      viewTransition: f,
    },
    typeof h == "function" ? h(K) : h,
  );
});
aC.displayName = "NavLink";
var lC = B.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: n,
      navigate: i,
      reloadDocument: a,
      replace: o,
      state: u,
      method: c = xu,
      action: f,
      onSubmit: h,
      relative: p,
      preventScrollReset: y,
      viewTransition: g,
      unstable_defaultShouldRevalidate: x,
      ...v
    },
    S,
  ) => {
    let { unstable_useTransitions: _ } = B.useContext(On),
      k = fC(),
      T = dC(f, { relative: p }),
      j = c.toLowerCase() === "get" ? "get" : "post",
      M = typeof f == "string" && yx.test(f),
      $ = (Z) => {
        if ((h && h(Z), Z.defaultPrevented)) return;
        Z.preventDefault();
        let U = Z.nativeEvent.submitter,
          K = U?.getAttribute("formmethod") || c,
          N = () =>
            k(U || Z.currentTarget, {
              fetcherKey: n,
              method: K,
              navigate: i,
              replace: o,
              state: u,
              relative: p,
              preventScrollReset: y,
              viewTransition: g,
              unstable_defaultShouldRevalidate: x,
            });
        _ && i !== !1 ? B.startTransition(() => N()) : N();
      };
    return B.createElement("form", {
      ref: S,
      method: j,
      action: T,
      onSubmit: a ? h : $,
      ...v,
      "data-discover": !M && e === "render" ? "true" : void 0,
    });
  },
);
lC.displayName = "Form";
function oC(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function bx(e) {
  let n = B.useContext(la);
  return (He(n, oC(e)), n);
}
function sC(
  e,
  {
    target: n,
    replace: i,
    unstable_mask: a,
    state: o,
    preventScrollReset: u,
    relative: c,
    viewTransition: f,
    unstable_defaultShouldRevalidate: h,
    unstable_useTransitions: p,
  } = {},
) {
  let y = Mo(),
    g = Gr(),
    x = jo(e, { relative: c });
  return B.useCallback(
    (v) => {
      if (Bk(v, n)) {
        v.preventDefault();
        let S = i !== void 0 ? i : br(g) === br(x),
          _ = () =>
            y(e, {
              replace: S,
              unstable_mask: a,
              state: o,
              preventScrollReset: u,
              relative: c,
              viewTransition: f,
              unstable_defaultShouldRevalidate: h,
            });
        p ? B.startTransition(() => _()) : _();
      }
    },
    [g, y, x, i, a, o, n, e, u, c, f, h, p],
  );
}
var uC = 0,
  cC = () => `__${String(++uC)}__`;
function fC() {
  let { router: e } = bx("useSubmit"),
    { basename: n } = B.useContext(On),
    i = xk(),
    a = e.fetch,
    o = e.navigate;
  return B.useCallback(
    async (u, c = {}) => {
      let { action: f, method: h, encType: p, formData: y, body: g } = qk(u, n);
      if (c.navigate === !1) {
        let x = c.fetcherKey || cC();
        await a(x, i, c.action || f, {
          unstable_defaultShouldRevalidate: c.unstable_defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: g,
          formMethod: c.method || h,
          formEncType: c.encType || p,
          flushSync: c.flushSync,
        });
      } else
        await o(c.action || f, {
          unstable_defaultShouldRevalidate: c.unstable_defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: g,
          formMethod: c.method || h,
          formEncType: c.encType || p,
          replace: c.replace,
          state: c.state,
          fromRouteId: i,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition,
        });
    },
    [a, o, n, i],
  );
}
function dC(e, { relative: n } = {}) {
  let { basename: i } = B.useContext(On),
    a = B.useContext(lr);
  He(a, "useFormAction must be used inside a RouteContext");
  let [o] = a.matches.slice(-1),
    u = { ...jo(e || ".", { relative: n }) },
    c = Gr();
  if (e == null) {
    u.search = c.search;
    let f = new URLSearchParams(u.search),
      h = f.getAll("index");
    if (h.some((y) => y === "")) {
      (f.delete("index"),
        h.filter((g) => g).forEach((g) => f.append("index", g)));
      let y = f.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      o.route.index &&
      (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"),
    i !== "/" && (u.pathname = u.pathname === "/" ? i : rr([i, u.pathname])),
    br(u)
  );
}
function hC(e, { relative: n } = {}) {
  let i = B.useContext(ep);
  He(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: a } = bx("useViewTransitionState"),
    o = jo(e, { relative: n });
  if (!i.isTransitioning) return !1;
  let u = In(i.currentLocation.pathname, a) || i.currentLocation.pathname,
    c = In(i.nextLocation.pathname, a) || i.nextLocation.pathname;
  return Du(o.pathname, c) != null || Du(o.pathname, u) != null;
}
var Bd = { exports: {} },
  Ud = {};
var sb;
function pC() {
  if (sb) return Ud;
  sb = 1;
  var e = Xu();
  function n(h, p) {
    return (h === p && (h !== 0 || 1 / h === 1 / p)) || (h !== h && p !== p);
  }
  var i = typeof Object.is == "function" ? Object.is : n,
    a = e.useSyncExternalStore,
    o = e.useRef,
    u = e.useEffect,
    c = e.useMemo,
    f = e.useDebugValue;
  return (
    (Ud.useSyncExternalStoreWithSelector = function (h, p, y, g, x) {
      var v = o(null);
      if (v.current === null) {
        var S = { hasValue: !1, value: null };
        v.current = S;
      } else S = v.current;
      v = c(
        function () {
          function k(Z) {
            if (!T) {
              if (((T = !0), (j = Z), (Z = g(Z)), x !== void 0 && S.hasValue)) {
                var U = S.value;
                if (x(U, Z)) return (M = U);
              }
              return (M = Z);
            }
            if (((U = M), i(j, Z))) return U;
            var K = g(Z);
            return x !== void 0 && x(U, K) ? ((j = Z), U) : ((j = Z), (M = K));
          }
          var T = !1,
            j,
            M,
            $ = y === void 0 ? null : y;
          return [
            function () {
              return k(p());
            },
            $ === null
              ? void 0
              : function () {
                  return k($());
                },
          ];
        },
        [p, y, g, x],
      );
      var _ = a(h, v[0], v[1]);
      return (
        u(
          function () {
            ((S.hasValue = !0), (S.value = _));
          },
          [_],
        ),
        f(_),
        _
      );
    }),
    Ud
  );
}
var ub;
function mC() {
  return (ub || ((ub = 1), (Bd.exports = pC())), Bd.exports);
}
var gC = mC();
function yC(e) {
  e();
}
function bC() {
  let e = null,
    n = null;
  return {
    clear() {
      ((e = null), (n = null));
    },
    notify() {
      yC(() => {
        let i = e;
        for (; i; ) (i.callback(), (i = i.next));
      });
    },
    get() {
      const i = [];
      let a = e;
      for (; a; ) (i.push(a), (a = a.next));
      return i;
    },
    subscribe(i) {
      let a = !0;
      const o = (n = { callback: i, next: null, prev: n });
      return (
        o.prev ? (o.prev.next = o) : (e = o),
        function () {
          !a ||
            e === null ||
            ((a = !1),
            o.next ? (o.next.prev = o.prev) : (n = o.prev),
            o.prev ? (o.prev.next = o.next) : (e = o.next));
        }
      );
    },
  };
}
var cb = { notify() {}, get: () => [] };
function xC(e, n) {
  let i,
    a = cb,
    o = 0,
    u = !1;
  function c(_) {
    y();
    const k = a.subscribe(_);
    let T = !1;
    return () => {
      T || ((T = !0), k(), g());
    };
  }
  function f() {
    a.notify();
  }
  function h() {
    S.onStateChange && S.onStateChange();
  }
  function p() {
    return u;
  }
  function y() {
    (o++, i || ((i = e.subscribe(h)), (a = bC())));
  }
  function g() {
    (o--, i && o === 0 && (i(), (i = void 0), a.clear(), (a = cb)));
  }
  function x() {
    u || ((u = !0), y());
  }
  function v() {
    u && ((u = !1), g());
  }
  const S = {
    addNestedSub: c,
    notifyNestedSubs: f,
    handleChangeWrapper: h,
    isSubscribed: p,
    trySubscribe: x,
    tryUnsubscribe: v,
    getListeners: () => a,
  };
  return S;
}
var vC = () =>
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  SC = vC(),
  wC = () => typeof navigator < "u" && navigator.product === "ReactNative",
  EC = wC(),
  kC = () => (SC || EC ? B.useLayoutEffect : B.useEffect),
  CC = kC(),
  _C = Symbol.for("react-redux-context"),
  TC = typeof globalThis < "u" ? globalThis : {};
function RC() {
  if (!B.createContext) return {};
  const e = (TC[_C] ??= new Map());
  let n = e.get(B.createContext);
  return (n || ((n = B.createContext(null)), e.set(B.createContext, n)), n);
}
var Ri = RC();
function AC(e) {
  const { children: n, context: i, serverState: a, store: o } = e,
    u = B.useMemo(() => {
      const h = xC(o);
      return {
        store: o,
        subscription: h,
        getServerState: a ? () => a : void 0,
      };
    }, [o, a]),
    c = B.useMemo(() => o.getState(), [o]);
  CC(() => {
    const { subscription: h } = u;
    return (
      (h.onStateChange = h.notifyNestedSubs),
      h.trySubscribe(),
      c !== o.getState() && h.notifyNestedSubs(),
      () => {
        (h.tryUnsubscribe(), (h.onStateChange = void 0));
      }
    );
  }, [u, c]);
  const f = i || Ri;
  return B.createElement(f.Provider, { value: u }, n);
}
var OC = AC;
function lp(e = Ri) {
  return function () {
    return B.useContext(e);
  };
}
var xx = lp();
function vx(e = Ri) {
  const n = e === Ri ? xx : lp(e),
    i = () => {
      const { store: a } = n();
      return a;
    };
  return (Object.assign(i, { withTypes: () => i }), i);
}
var zC = vx();
function DC(e = Ri) {
  const n = e === Ri ? zC : vx(e),
    i = () => n().dispatch;
  return (Object.assign(i, { withTypes: () => i }), i);
}
var op = DC(),
  NC = (e, n) => e === n;
function MC(e = Ri) {
  const n = e === Ri ? xx : lp(e),
    i = (a, o = {}) => {
      const { equalityFn: u = NC } =
          typeof o == "function" ? { equalityFn: o } : o,
        c = n(),
        { store: f, subscription: h, getServerState: p } = c;
      B.useRef(!0);
      const y = B.useCallback(
          {
            [a.name](x) {
              return a(x);
            },
          }[a.name],
          [a],
        ),
        g = gC.useSyncExternalStoreWithSelector(
          h.addNestedSub,
          f.getState,
          p || f.getState,
          y,
          u,
        );
      return (B.useDebugValue(g), g);
    };
  return (Object.assign(i, { withTypes: () => i }), i);
}
var yr = MC();
function Sx(e, n) {
  return function () {
    return e.apply(n, arguments);
  };
}
const { toString: jC } = Object.prototype,
  { getPrototypeOf: sp } = Object,
  { iterator: Zu, toStringTag: wx } = Symbol,
  $u = ((e) => (n) => {
    const i = jC.call(n);
    return e[i] || (e[i] = i.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  or = (e) => ((e = e.toLowerCase()), (n) => $u(n) === e),
  Ju = (e) => (n) => typeof n === e,
  { isArray: ol } = Array,
  nl = Ju("undefined");
function Lo(e) {
  return (
    e !== null &&
    !nl(e) &&
    e.constructor !== null &&
    !nl(e.constructor) &&
    gn(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Ex = or("ArrayBuffer");
function LC(e) {
  let n;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (n = ArrayBuffer.isView(e))
      : (n = e && e.buffer && Ex(e.buffer)),
    n
  );
}
const BC = Ju("string"),
  gn = Ju("function"),
  kx = Ju("number"),
  Bo = (e) => e !== null && typeof e == "object",
  UC = (e) => e === !0 || e === !1,
  Su = (e) => {
    if ($u(e) !== "object") return !1;
    const n = sp(e);
    return (
      (n === null ||
        n === Object.prototype ||
        Object.getPrototypeOf(n) === null) &&
      !(wx in e) &&
      !(Zu in e)
    );
  },
  HC = (e) => {
    if (!Bo(e) || Lo(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  qC = or("Date"),
  FC = or("File"),
  PC = (e) => !!(e && typeof e.uri < "u"),
  VC = (e) => e && typeof e.getParts < "u",
  YC = or("Blob"),
  IC = or("FileList"),
  XC = (e) => Bo(e) && gn(e.pipe);
function GC() {
  return typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : {};
}
const fb = GC(),
  db = typeof fb.FormData < "u" ? fb.FormData : void 0,
  QC = (e) => {
    let n;
    return (
      e &&
      ((db && e instanceof db) ||
        (gn(e.append) &&
          ((n = $u(e)) === "formdata" ||
            (n === "object" &&
              gn(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  KC = or("URLSearchParams"),
  [ZC, $C, JC, WC] = ["ReadableStream", "Request", "Response", "Headers"].map(
    or,
  ),
  e_ = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Uo(e, n, { allOwnKeys: i = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let a, o;
  if ((typeof e != "object" && (e = [e]), ol(e)))
    for (a = 0, o = e.length; a < o; a++) n.call(null, e[a], a, e);
  else {
    if (Lo(e)) return;
    const u = i ? Object.getOwnPropertyNames(e) : Object.keys(e),
      c = u.length;
    let f;
    for (a = 0; a < c; a++) ((f = u[a]), n.call(null, e[f], f, e));
  }
}
function Cx(e, n) {
  if (Lo(e)) return null;
  n = n.toLowerCase();
  const i = Object.keys(e);
  let a = i.length,
    o;
  for (; a-- > 0; ) if (((o = i[a]), n === o.toLowerCase())) return o;
  return null;
}
const ea =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  _x = (e) => !nl(e) && e !== ea;
function xh() {
  const { caseless: e, skipUndefined: n } = (_x(this) && this) || {},
    i = {},
    a = (o, u) => {
      if (u === "__proto__" || u === "constructor" || u === "prototype") return;
      const c = (e && Cx(i, u)) || u;
      Su(i[c]) && Su(o)
        ? (i[c] = xh(i[c], o))
        : Su(o)
          ? (i[c] = xh({}, o))
          : ol(o)
            ? (i[c] = o.slice())
            : (!n || !nl(o)) && (i[c] = o);
    };
  for (let o = 0, u = arguments.length; o < u; o++)
    arguments[o] && Uo(arguments[o], a);
  return i;
}
const t_ = (e, n, i, { allOwnKeys: a } = {}) => (
    Uo(
      n,
      (o, u) => {
        i && gn(o)
          ? Object.defineProperty(e, u, {
              value: Sx(o, i),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(e, u, {
              value: o,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: a },
    ),
    e
  ),
  n_ = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  r_ = (e, n, i, a) => {
    ((e.prototype = Object.create(n.prototype, a)),
      Object.defineProperty(e.prototype, "constructor", {
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "super", { value: n.prototype }),
      i && Object.assign(e.prototype, i));
  },
  i_ = (e, n, i, a) => {
    let o, u, c;
    const f = {};
    if (((n = n || {}), e == null)) return n;
    do {
      for (o = Object.getOwnPropertyNames(e), u = o.length; u-- > 0; )
        ((c = o[u]),
          (!a || a(c, e, n)) && !f[c] && ((n[c] = e[c]), (f[c] = !0)));
      e = i !== !1 && sp(e);
    } while (e && (!i || i(e, n)) && e !== Object.prototype);
    return n;
  },
  a_ = (e, n, i) => {
    ((e = String(e)),
      (i === void 0 || i > e.length) && (i = e.length),
      (i -= n.length));
    const a = e.indexOf(n, i);
    return a !== -1 && a === i;
  },
  l_ = (e) => {
    if (!e) return null;
    if (ol(e)) return e;
    let n = e.length;
    if (!kx(n)) return null;
    const i = new Array(n);
    for (; n-- > 0; ) i[n] = e[n];
    return i;
  },
  o_ = (
    (e) => (n) =>
      e && n instanceof e
  )(typeof Uint8Array < "u" && sp(Uint8Array)),
  s_ = (e, n) => {
    const a = (e && e[Zu]).call(e);
    let o;
    for (; (o = a.next()) && !o.done; ) {
      const u = o.value;
      n.call(e, u[0], u[1]);
    }
  },
  u_ = (e, n) => {
    let i;
    const a = [];
    for (; (i = e.exec(n)) !== null; ) a.push(i);
    return a;
  },
  c_ = or("HTMLFormElement"),
  f_ = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (i, a, o) {
      return a.toUpperCase() + o;
    }),
  hb = (
    ({ hasOwnProperty: e }) =>
    (n, i) =>
      e.call(n, i)
  )(Object.prototype),
  d_ = or("RegExp"),
  Tx = (e, n) => {
    const i = Object.getOwnPropertyDescriptors(e),
      a = {};
    (Uo(i, (o, u) => {
      let c;
      (c = n(o, u, e)) !== !1 && (a[u] = c || o);
    }),
      Object.defineProperties(e, a));
  },
  h_ = (e) => {
    Tx(e, (n, i) => {
      if (gn(e) && ["arguments", "caller", "callee"].indexOf(i) !== -1)
        return !1;
      const a = e[i];
      if (gn(a)) {
        if (((n.enumerable = !1), "writable" in n)) {
          n.writable = !1;
          return;
        }
        n.set ||
          (n.set = () => {
            throw Error("Can not rewrite read-only method '" + i + "'");
          });
      }
    });
  },
  p_ = (e, n) => {
    const i = {},
      a = (o) => {
        o.forEach((u) => {
          i[u] = !0;
        });
      };
    return (ol(e) ? a(e) : a(String(e).split(n)), i);
  },
  m_ = () => {},
  g_ = (e, n) => (e != null && Number.isFinite((e = +e)) ? e : n);
function y_(e) {
  return !!(e && gn(e.append) && e[wx] === "FormData" && e[Zu]);
}
const b_ = (e) => {
    const n = new Array(10),
      i = (a, o) => {
        if (Bo(a)) {
          if (n.indexOf(a) >= 0) return;
          if (Lo(a)) return a;
          if (!("toJSON" in a)) {
            n[o] = a;
            const u = ol(a) ? [] : {};
            return (
              Uo(a, (c, f) => {
                const h = i(c, o + 1);
                !nl(h) && (u[f] = h);
              }),
              (n[o] = void 0),
              u
            );
          }
        }
        return a;
      };
    return i(e, 0);
  },
  x_ = or("AsyncFunction"),
  v_ = (e) => e && (Bo(e) || gn(e)) && gn(e.then) && gn(e.catch),
  Rx = ((e, n) =>
    e
      ? setImmediate
      : n
        ? ((i, a) => (
            ea.addEventListener(
              "message",
              ({ source: o, data: u }) => {
                o === ea && u === i && a.length && a.shift()();
              },
              !1,
            ),
            (o) => {
              (a.push(o), ea.postMessage(i, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (i) => setTimeout(i))(
    typeof setImmediate == "function",
    gn(ea.postMessage),
  ),
  S_ =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(ea)
      : (typeof process < "u" && process.nextTick) || Rx,
  w_ = (e) => e != null && gn(e[Zu]),
  X = {
    isArray: ol,
    isArrayBuffer: Ex,
    isBuffer: Lo,
    isFormData: QC,
    isArrayBufferView: LC,
    isString: BC,
    isNumber: kx,
    isBoolean: UC,
    isObject: Bo,
    isPlainObject: Su,
    isEmptyObject: HC,
    isReadableStream: ZC,
    isRequest: $C,
    isResponse: JC,
    isHeaders: WC,
    isUndefined: nl,
    isDate: qC,
    isFile: FC,
    isReactNativeBlob: PC,
    isReactNative: VC,
    isBlob: YC,
    isRegExp: d_,
    isFunction: gn,
    isStream: XC,
    isURLSearchParams: KC,
    isTypedArray: o_,
    isFileList: IC,
    forEach: Uo,
    merge: xh,
    extend: t_,
    trim: e_,
    stripBOM: n_,
    inherits: r_,
    toFlatObject: i_,
    kindOf: $u,
    kindOfTest: or,
    endsWith: a_,
    toArray: l_,
    forEachEntry: s_,
    matchAll: u_,
    isHTMLForm: c_,
    hasOwnProperty: hb,
    hasOwnProp: hb,
    reduceDescriptors: Tx,
    freezeMethods: h_,
    toObjectSet: p_,
    toCamelCase: f_,
    noop: m_,
    toFiniteNumber: g_,
    findKey: Cx,
    global: ea,
    isContextDefined: _x,
    isSpecCompliantForm: y_,
    toJSONObject: b_,
    isAsyncFn: x_,
    isThenable: v_,
    setImmediate: Rx,
    asap: S_,
    isIterable: w_,
  };
let ze = class Ax extends Error {
  static from(n, i, a, o, u, c) {
    const f = new Ax(n.message, i || n.code, a, o, u);
    return (
      (f.cause = n),
      (f.name = n.name),
      n.status != null && f.status == null && (f.status = n.status),
      c && Object.assign(f, c),
      f
    );
  }
  constructor(n, i, a, o, u) {
    (super(n),
      Object.defineProperty(this, "message", {
        value: n,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = "AxiosError"),
      (this.isAxiosError = !0),
      i && (this.code = i),
      a && (this.config = a),
      o && (this.request = o),
      u && ((this.response = u), (this.status = u.status)));
  }
  toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: X.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  }
};
ze.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
ze.ERR_BAD_OPTION = "ERR_BAD_OPTION";
ze.ECONNABORTED = "ECONNABORTED";
ze.ETIMEDOUT = "ETIMEDOUT";
ze.ERR_NETWORK = "ERR_NETWORK";
ze.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
ze.ERR_DEPRECATED = "ERR_DEPRECATED";
ze.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
ze.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
ze.ERR_CANCELED = "ERR_CANCELED";
ze.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
ze.ERR_INVALID_URL = "ERR_INVALID_URL";
const E_ = null;
function vh(e) {
  return X.isPlainObject(e) || X.isArray(e);
}
function Ox(e) {
  return X.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Hd(e, n, i) {
  return e
    ? e
        .concat(n)
        .map(function (o, u) {
          return ((o = Ox(o)), !i && u ? "[" + o + "]" : o);
        })
        .join(i ? "." : "")
    : n;
}
function k_(e) {
  return X.isArray(e) && !e.some(vh);
}
const C_ = X.toFlatObject(X, {}, null, function (n) {
  return /^is[A-Z]/.test(n);
});
function Wu(e, n, i) {
  if (!X.isObject(e)) throw new TypeError("target must be an object");
  ((n = n || new FormData()),
    (i = X.toFlatObject(
      i,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (_, k) {
        return !X.isUndefined(k[_]);
      },
    )));
  const a = i.metaTokens,
    o = i.visitor || y,
    u = i.dots,
    c = i.indexes,
    h = (i.Blob || (typeof Blob < "u" && Blob)) && X.isSpecCompliantForm(n);
  if (!X.isFunction(o)) throw new TypeError("visitor must be a function");
  function p(S) {
    if (S === null) return "";
    if (X.isDate(S)) return S.toISOString();
    if (X.isBoolean(S)) return S.toString();
    if (!h && X.isBlob(S))
      throw new ze("Blob is not supported. Use a Buffer instead.");
    return X.isArrayBuffer(S) || X.isTypedArray(S)
      ? h && typeof Blob == "function"
        ? new Blob([S])
        : Buffer.from(S)
      : S;
  }
  function y(S, _, k) {
    let T = S;
    if (X.isReactNative(n) && X.isReactNativeBlob(S))
      return (n.append(Hd(k, _, u), p(S)), !1);
    if (S && !k && typeof S == "object") {
      if (X.endsWith(_, "{}"))
        ((_ = a ? _ : _.slice(0, -2)), (S = JSON.stringify(S)));
      else if (
        (X.isArray(S) && k_(S)) ||
        ((X.isFileList(S) || X.endsWith(_, "[]")) && (T = X.toArray(S)))
      )
        return (
          (_ = Ox(_)),
          T.forEach(function (M, $) {
            !(X.isUndefined(M) || M === null) &&
              n.append(
                c === !0 ? Hd([_], $, u) : c === null ? _ : _ + "[]",
                p(M),
              );
          }),
          !1
        );
    }
    return vh(S) ? !0 : (n.append(Hd(k, _, u), p(S)), !1);
  }
  const g = [],
    x = Object.assign(C_, {
      defaultVisitor: y,
      convertValue: p,
      isVisitable: vh,
    });
  function v(S, _) {
    if (!X.isUndefined(S)) {
      if (g.indexOf(S) !== -1)
        throw Error("Circular reference detected in " + _.join("."));
      (g.push(S),
        X.forEach(S, function (T, j) {
          (!(X.isUndefined(T) || T === null) &&
            o.call(n, T, X.isString(j) ? j.trim() : j, _, x)) === !0 &&
            v(T, _ ? _.concat(j) : [j]);
        }),
        g.pop());
    }
  }
  if (!X.isObject(e)) throw new TypeError("data must be an object");
  return (v(e), n);
}
function pb(e) {
  const n = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (a) {
    return n[a];
  });
}
function up(e, n) {
  ((this._pairs = []), e && Wu(e, this, n));
}
const zx = up.prototype;
zx.append = function (n, i) {
  this._pairs.push([n, i]);
};
zx.toString = function (n) {
  const i = n
    ? function (a) {
        return n.call(this, a, pb);
      }
    : pb;
  return this._pairs
    .map(function (o) {
      return i(o[0]) + "=" + i(o[1]);
    }, "")
    .join("&");
};
function __(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function Dx(e, n, i) {
  if (!n) return e;
  const a = (i && i.encode) || __,
    o = X.isFunction(i) ? { serialize: i } : i,
    u = o && o.serialize;
  let c;
  if (
    (u
      ? (c = u(n, o))
      : (c = X.isURLSearchParams(n) ? n.toString() : new up(n, o).toString(a)),
    c)
  ) {
    const f = e.indexOf("#");
    (f !== -1 && (e = e.slice(0, f)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + c));
  }
  return e;
}
class mb {
  constructor() {
    this.handlers = [];
  }
  use(n, i, a) {
    return (
      this.handlers.push({
        fulfilled: n,
        rejected: i,
        synchronous: a ? a.synchronous : !1,
        runWhen: a ? a.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(n) {
    this.handlers[n] && (this.handlers[n] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(n) {
    X.forEach(this.handlers, function (a) {
      a !== null && n(a);
    });
  }
}
const cp = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
  },
  T_ = typeof URLSearchParams < "u" ? URLSearchParams : up,
  R_ = typeof FormData < "u" ? FormData : null,
  A_ = typeof Blob < "u" ? Blob : null,
  O_ = {
    isBrowser: !0,
    classes: { URLSearchParams: T_, FormData: R_, Blob: A_ },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  fp = typeof window < "u" && typeof document < "u",
  Sh = (typeof navigator == "object" && navigator) || void 0,
  z_ =
    fp &&
    (!Sh || ["ReactNative", "NativeScript", "NS"].indexOf(Sh.product) < 0),
  D_ =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  N_ = (fp && window.location.href) || "http://localhost",
  M_ = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: fp,
        hasStandardBrowserEnv: z_,
        hasStandardBrowserWebWorkerEnv: D_,
        navigator: Sh,
        origin: N_,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  en = { ...M_, ...O_ };
function j_(e, n) {
  return Wu(e, new en.classes.URLSearchParams(), {
    visitor: function (i, a, o, u) {
      return en.isNode && X.isBuffer(i)
        ? (this.append(a, i.toString("base64")), !1)
        : u.defaultVisitor.apply(this, arguments);
    },
    ...n,
  });
}
function L_(e) {
  return X.matchAll(/\w+|\[(\w*)]/g, e).map((n) =>
    n[0] === "[]" ? "" : n[1] || n[0],
  );
}
function B_(e) {
  const n = {},
    i = Object.keys(e);
  let a;
  const o = i.length;
  let u;
  for (a = 0; a < o; a++) ((u = i[a]), (n[u] = e[u]));
  return n;
}
function Nx(e) {
  function n(i, a, o, u) {
    let c = i[u++];
    if (c === "__proto__") return !0;
    const f = Number.isFinite(+c),
      h = u >= i.length;
    return (
      (c = !c && X.isArray(o) ? o.length : c),
      h
        ? (X.hasOwnProp(o, c) ? (o[c] = [o[c], a]) : (o[c] = a), !f)
        : ((!o[c] || !X.isObject(o[c])) && (o[c] = []),
          n(i, a, o[c], u) && X.isArray(o[c]) && (o[c] = B_(o[c])),
          !f)
    );
  }
  if (X.isFormData(e) && X.isFunction(e.entries)) {
    const i = {};
    return (
      X.forEachEntry(e, (a, o) => {
        n(L_(a), o, i, 0);
      }),
      i
    );
  }
  return null;
}
function U_(e, n, i) {
  if (X.isString(e))
    try {
      return ((n || JSON.parse)(e), X.trim(e));
    } catch (a) {
      if (a.name !== "SyntaxError") throw a;
    }
  return (i || JSON.stringify)(e);
}
const Ho = {
  transitional: cp,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (n, i) {
      const a = i.getContentType() || "",
        o = a.indexOf("application/json") > -1,
        u = X.isObject(n);
      if ((u && X.isHTMLForm(n) && (n = new FormData(n)), X.isFormData(n)))
        return o ? JSON.stringify(Nx(n)) : n;
      if (
        X.isArrayBuffer(n) ||
        X.isBuffer(n) ||
        X.isStream(n) ||
        X.isFile(n) ||
        X.isBlob(n) ||
        X.isReadableStream(n)
      )
        return n;
      if (X.isArrayBufferView(n)) return n.buffer;
      if (X.isURLSearchParams(n))
        return (
          i.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          n.toString()
        );
      let f;
      if (u) {
        if (a.indexOf("application/x-www-form-urlencoded") > -1)
          return j_(n, this.formSerializer).toString();
        if ((f = X.isFileList(n)) || a.indexOf("multipart/form-data") > -1) {
          const h = this.env && this.env.FormData;
          return Wu(
            f ? { "files[]": n } : n,
            h && new h(),
            this.formSerializer,
          );
        }
      }
      return u || o ? (i.setContentType("application/json", !1), U_(n)) : n;
    },
  ],
  transformResponse: [
    function (n) {
      const i = this.transitional || Ho.transitional,
        a = i && i.forcedJSONParsing,
        o = this.responseType === "json";
      if (X.isResponse(n) || X.isReadableStream(n)) return n;
      if (n && X.isString(n) && ((a && !this.responseType) || o)) {
        const c = !(i && i.silentJSONParsing) && o;
        try {
          return JSON.parse(n, this.parseReviver);
        } catch (f) {
          if (c)
            throw f.name === "SyntaxError"
              ? ze.from(f, ze.ERR_BAD_RESPONSE, this, null, this.response)
              : f;
        }
      }
      return n;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: en.classes.FormData, Blob: en.classes.Blob },
  validateStatus: function (n) {
    return n >= 200 && n < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
X.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Ho.headers[e] = {};
});
const H_ = X.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  q_ = (e) => {
    const n = {};
    let i, a, o;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (c) {
            ((o = c.indexOf(":")),
              (i = c.substring(0, o).trim().toLowerCase()),
              (a = c.substring(o + 1).trim()),
              !(!i || (n[i] && H_[i])) &&
                (i === "set-cookie"
                  ? n[i]
                    ? n[i].push(a)
                    : (n[i] = [a])
                  : (n[i] = n[i] ? n[i] + ", " + a : a)));
          }),
      n
    );
  },
  gb = Symbol("internals");
function lo(e) {
  return e && String(e).trim().toLowerCase();
}
function wu(e) {
  return e === !1 || e == null ? e : X.isArray(e) ? e.map(wu) : String(e);
}
function F_(e) {
  const n = Object.create(null),
    i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let a;
  for (; (a = i.exec(e)); ) n[a[1]] = a[2];
  return n;
}
const P_ = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function qd(e, n, i, a, o) {
  if (X.isFunction(a)) return a.call(this, n, i);
  if ((o && (n = i), !!X.isString(n))) {
    if (X.isString(a)) return n.indexOf(a) !== -1;
    if (X.isRegExp(a)) return a.test(n);
  }
}
function V_(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (n, i, a) => i.toUpperCase() + a);
}
function Y_(e, n) {
  const i = X.toCamelCase(" " + n);
  ["get", "set", "has"].forEach((a) => {
    Object.defineProperty(e, a + i, {
      value: function (o, u, c) {
        return this[a].call(this, n, o, u, c);
      },
      configurable: !0,
    });
  });
}
let yn = class {
  constructor(n) {
    n && this.set(n);
  }
  set(n, i, a) {
    const o = this;
    function u(f, h, p) {
      const y = lo(h);
      if (!y) throw new Error("header name must be a non-empty string");
      const g = X.findKey(o, y);
      (!g || o[g] === void 0 || p === !0 || (p === void 0 && o[g] !== !1)) &&
        (o[g || h] = wu(f));
    }
    const c = (f, h) => X.forEach(f, (p, y) => u(p, y, h));
    if (X.isPlainObject(n) || n instanceof this.constructor) c(n, i);
    else if (X.isString(n) && (n = n.trim()) && !P_(n)) c(q_(n), i);
    else if (X.isObject(n) && X.isIterable(n)) {
      let f = {},
        h,
        p;
      for (const y of n) {
        if (!X.isArray(y))
          throw TypeError("Object iterator must return a key-value pair");
        f[(p = y[0])] = (h = f[p])
          ? X.isArray(h)
            ? [...h, y[1]]
            : [h, y[1]]
          : y[1];
      }
      c(f, i);
    } else n != null && u(i, n, a);
    return this;
  }
  get(n, i) {
    if (((n = lo(n)), n)) {
      const a = X.findKey(this, n);
      if (a) {
        const o = this[a];
        if (!i) return o;
        if (i === !0) return F_(o);
        if (X.isFunction(i)) return i.call(this, o, a);
        if (X.isRegExp(i)) return i.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(n, i) {
    if (((n = lo(n)), n)) {
      const a = X.findKey(this, n);
      return !!(a && this[a] !== void 0 && (!i || qd(this, this[a], a, i)));
    }
    return !1;
  }
  delete(n, i) {
    const a = this;
    let o = !1;
    function u(c) {
      if (((c = lo(c)), c)) {
        const f = X.findKey(a, c);
        f && (!i || qd(a, a[f], f, i)) && (delete a[f], (o = !0));
      }
    }
    return (X.isArray(n) ? n.forEach(u) : u(n), o);
  }
  clear(n) {
    const i = Object.keys(this);
    let a = i.length,
      o = !1;
    for (; a--; ) {
      const u = i[a];
      (!n || qd(this, this[u], u, n, !0)) && (delete this[u], (o = !0));
    }
    return o;
  }
  normalize(n) {
    const i = this,
      a = {};
    return (
      X.forEach(this, (o, u) => {
        const c = X.findKey(a, u);
        if (c) {
          ((i[c] = wu(o)), delete i[u]);
          return;
        }
        const f = n ? V_(u) : String(u).trim();
        (f !== u && delete i[u], (i[f] = wu(o)), (a[f] = !0));
      }),
      this
    );
  }
  concat(...n) {
    return this.constructor.concat(this, ...n);
  }
  toJSON(n) {
    const i = Object.create(null);
    return (
      X.forEach(this, (a, o) => {
        a != null && a !== !1 && (i[o] = n && X.isArray(a) ? a.join(", ") : a);
      }),
      i
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([n, i]) => n + ": " + i).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(n) {
    return n instanceof this ? n : new this(n);
  }
  static concat(n, ...i) {
    const a = new this(n);
    return (i.forEach((o) => a.set(o)), a);
  }
  static accessor(n) {
    const a = (this[gb] = this[gb] = { accessors: {} }).accessors,
      o = this.prototype;
    function u(c) {
      const f = lo(c);
      a[f] || (Y_(o, c), (a[f] = !0));
    }
    return (X.isArray(n) ? n.forEach(u) : u(n), this);
  }
};
yn.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
X.reduceDescriptors(yn.prototype, ({ value: e }, n) => {
  let i = n[0].toUpperCase() + n.slice(1);
  return {
    get: () => e,
    set(a) {
      this[i] = a;
    },
  };
});
X.freezeMethods(yn);
function Fd(e, n) {
  const i = this || Ho,
    a = n || i,
    o = yn.from(a.headers);
  let u = a.data;
  return (
    X.forEach(e, function (f) {
      u = f.call(i, u, o.normalize(), n ? n.status : void 0);
    }),
    o.normalize(),
    u
  );
}
function Mx(e) {
  return !!(e && e.__CANCEL__);
}
let qo = class extends ze {
  constructor(n, i, a) {
    (super(n ?? "canceled", ze.ERR_CANCELED, i, a),
      (this.name = "CanceledError"),
      (this.__CANCEL__ = !0));
  }
};
function jx(e, n, i) {
  const a = i.config.validateStatus;
  !i.status || !a || a(i.status)
    ? e(i)
    : n(
        new ze(
          "Request failed with status code " + i.status,
          [ze.ERR_BAD_REQUEST, ze.ERR_BAD_RESPONSE][
            Math.floor(i.status / 100) - 4
          ],
          i.config,
          i.request,
          i,
        ),
      );
}
function I_(e) {
  const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (n && n[1]) || "";
}
function X_(e, n) {
  e = e || 10;
  const i = new Array(e),
    a = new Array(e);
  let o = 0,
    u = 0,
    c;
  return (
    (n = n !== void 0 ? n : 1e3),
    function (h) {
      const p = Date.now(),
        y = a[u];
      (c || (c = p), (i[o] = h), (a[o] = p));
      let g = u,
        x = 0;
      for (; g !== o; ) ((x += i[g++]), (g = g % e));
      if (((o = (o + 1) % e), o === u && (u = (u + 1) % e), p - c < n)) return;
      const v = y && p - y;
      return v ? Math.round((x * 1e3) / v) : void 0;
    }
  );
}
function G_(e, n) {
  let i = 0,
    a = 1e3 / n,
    o,
    u;
  const c = (p, y = Date.now()) => {
    ((i = y), (o = null), u && (clearTimeout(u), (u = null)), e(...p));
  };
  return [
    (...p) => {
      const y = Date.now(),
        g = y - i;
      g >= a
        ? c(p, y)
        : ((o = p),
          u ||
            (u = setTimeout(() => {
              ((u = null), c(o));
            }, a - g)));
    },
    () => o && c(o),
  ];
}
const Nu = (e, n, i = 3) => {
    let a = 0;
    const o = X_(50, 250);
    return G_((u) => {
      const c = u.loaded,
        f = u.lengthComputable ? u.total : void 0,
        h = c - a,
        p = o(h),
        y = c <= f;
      a = c;
      const g = {
        loaded: c,
        total: f,
        progress: f ? c / f : void 0,
        bytes: h,
        rate: p || void 0,
        estimated: p && f && y ? (f - c) / p : void 0,
        event: u,
        lengthComputable: f != null,
        [n ? "download" : "upload"]: !0,
      };
      e(g);
    }, i);
  },
  yb = (e, n) => {
    const i = e != null;
    return [(a) => n[0]({ lengthComputable: i, total: e, loaded: a }), n[1]];
  },
  bb =
    (e) =>
    (...n) =>
      X.asap(() => e(...n)),
  Q_ = en.hasStandardBrowserEnv
    ? ((e, n) => (i) => (
        (i = new URL(i, en.origin)),
        e.protocol === i.protocol &&
          e.host === i.host &&
          (n || e.port === i.port)
      ))(
        new URL(en.origin),
        en.navigator && /(msie|trident)/i.test(en.navigator.userAgent),
      )
    : () => !0,
  K_ = en.hasStandardBrowserEnv
    ? {
        write(e, n, i, a, o, u, c) {
          if (typeof document > "u") return;
          const f = [`${e}=${encodeURIComponent(n)}`];
          (X.isNumber(i) && f.push(`expires=${new Date(i).toUTCString()}`),
            X.isString(a) && f.push(`path=${a}`),
            X.isString(o) && f.push(`domain=${o}`),
            u === !0 && f.push("secure"),
            X.isString(c) && f.push(`SameSite=${c}`),
            (document.cookie = f.join("; ")));
        },
        read(e) {
          if (typeof document > "u") return null;
          const n = document.cookie.match(
            new RegExp("(?:^|; )" + e + "=([^;]*)"),
          );
          return n ? decodeURIComponent(n[1]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function Z_(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function $_(e, n) {
  return n ? e.replace(/\/?\/$/, "") + "/" + n.replace(/^\/+/, "") : e;
}
function Lx(e, n, i) {
  let a = !Z_(n);
  return e && (a || i == !1) ? $_(e, n) : n;
}
const xb = (e) => (e instanceof yn ? { ...e } : e);
function ra(e, n) {
  n = n || {};
  const i = {};
  function a(p, y, g, x) {
    return X.isPlainObject(p) && X.isPlainObject(y)
      ? X.merge.call({ caseless: x }, p, y)
      : X.isPlainObject(y)
        ? X.merge({}, y)
        : X.isArray(y)
          ? y.slice()
          : y;
  }
  function o(p, y, g, x) {
    if (X.isUndefined(y)) {
      if (!X.isUndefined(p)) return a(void 0, p, g, x);
    } else return a(p, y, g, x);
  }
  function u(p, y) {
    if (!X.isUndefined(y)) return a(void 0, y);
  }
  function c(p, y) {
    if (X.isUndefined(y)) {
      if (!X.isUndefined(p)) return a(void 0, p);
    } else return a(void 0, y);
  }
  function f(p, y, g) {
    if (g in n) return a(p, y);
    if (g in e) return a(void 0, p);
  }
  const h = {
    url: u,
    method: u,
    data: u,
    baseURL: c,
    transformRequest: c,
    transformResponse: c,
    paramsSerializer: c,
    timeout: c,
    timeoutMessage: c,
    withCredentials: c,
    withXSRFToken: c,
    adapter: c,
    responseType: c,
    xsrfCookieName: c,
    xsrfHeaderName: c,
    onUploadProgress: c,
    onDownloadProgress: c,
    decompress: c,
    maxContentLength: c,
    maxBodyLength: c,
    beforeRedirect: c,
    transport: c,
    httpAgent: c,
    httpsAgent: c,
    cancelToken: c,
    socketPath: c,
    responseEncoding: c,
    validateStatus: f,
    headers: (p, y, g) => o(xb(p), xb(y), g, !0),
  };
  return (
    X.forEach(Object.keys({ ...e, ...n }), function (y) {
      if (y === "__proto__" || y === "constructor" || y === "prototype") return;
      const g = X.hasOwnProp(h, y) ? h[y] : o,
        x = g(e[y], n[y], y);
      (X.isUndefined(x) && g !== f) || (i[y] = x);
    }),
    i
  );
}
const Bx = (e) => {
    const n = ra({}, e);
    let {
      data: i,
      withXSRFToken: a,
      xsrfHeaderName: o,
      xsrfCookieName: u,
      headers: c,
      auth: f,
    } = n;
    if (
      ((n.headers = c = yn.from(c)),
      (n.url = Dx(
        Lx(n.baseURL, n.url, n.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer,
      )),
      f &&
        c.set(
          "Authorization",
          "Basic " +
            btoa(
              (f.username || "") +
                ":" +
                (f.password ? unescape(encodeURIComponent(f.password)) : ""),
            ),
        ),
      X.isFormData(i))
    ) {
      if (en.hasStandardBrowserEnv || en.hasStandardBrowserWebWorkerEnv)
        c.setContentType(void 0);
      else if (X.isFunction(i.getHeaders)) {
        const h = i.getHeaders(),
          p = ["content-type", "content-length"];
        Object.entries(h).forEach(([y, g]) => {
          p.includes(y.toLowerCase()) && c.set(y, g);
        });
      }
    }
    if (
      en.hasStandardBrowserEnv &&
      (a && X.isFunction(a) && (a = a(n)), a || (a !== !1 && Q_(n.url)))
    ) {
      const h = o && u && K_.read(u);
      h && c.set(o, h);
    }
    return n;
  },
  J_ = typeof XMLHttpRequest < "u",
  W_ =
    J_ &&
    function (e) {
      return new Promise(function (i, a) {
        const o = Bx(e);
        let u = o.data;
        const c = yn.from(o.headers).normalize();
        let { responseType: f, onUploadProgress: h, onDownloadProgress: p } = o,
          y,
          g,
          x,
          v,
          S;
        function _() {
          (v && v(),
            S && S(),
            o.cancelToken && o.cancelToken.unsubscribe(y),
            o.signal && o.signal.removeEventListener("abort", y));
        }
        let k = new XMLHttpRequest();
        (k.open(o.method.toUpperCase(), o.url, !0), (k.timeout = o.timeout));
        function T() {
          if (!k) return;
          const M = yn.from(
              "getAllResponseHeaders" in k && k.getAllResponseHeaders(),
            ),
            Z = {
              data:
                !f || f === "text" || f === "json"
                  ? k.responseText
                  : k.response,
              status: k.status,
              statusText: k.statusText,
              headers: M,
              config: e,
              request: k,
            };
          (jx(
            function (K) {
              (i(K), _());
            },
            function (K) {
              (a(K), _());
            },
            Z,
          ),
            (k = null));
        }
        ("onloadend" in k
          ? (k.onloadend = T)
          : (k.onreadystatechange = function () {
              !k ||
                k.readyState !== 4 ||
                (k.status === 0 &&
                  !(k.responseURL && k.responseURL.indexOf("file:") === 0)) ||
                setTimeout(T);
            }),
          (k.onabort = function () {
            k &&
              (a(new ze("Request aborted", ze.ECONNABORTED, e, k)), (k = null));
          }),
          (k.onerror = function ($) {
            const Z = $ && $.message ? $.message : "Network Error",
              U = new ze(Z, ze.ERR_NETWORK, e, k);
            ((U.event = $ || null), a(U), (k = null));
          }),
          (k.ontimeout = function () {
            let $ = o.timeout
              ? "timeout of " + o.timeout + "ms exceeded"
              : "timeout exceeded";
            const Z = o.transitional || cp;
            (o.timeoutErrorMessage && ($ = o.timeoutErrorMessage),
              a(
                new ze(
                  $,
                  Z.clarifyTimeoutError ? ze.ETIMEDOUT : ze.ECONNABORTED,
                  e,
                  k,
                ),
              ),
              (k = null));
          }),
          u === void 0 && c.setContentType(null),
          "setRequestHeader" in k &&
            X.forEach(c.toJSON(), function ($, Z) {
              k.setRequestHeader(Z, $);
            }),
          X.isUndefined(o.withCredentials) ||
            (k.withCredentials = !!o.withCredentials),
          f && f !== "json" && (k.responseType = o.responseType),
          p && (([x, S] = Nu(p, !0)), k.addEventListener("progress", x)),
          h &&
            k.upload &&
            (([g, v] = Nu(h)),
            k.upload.addEventListener("progress", g),
            k.upload.addEventListener("loadend", v)),
          (o.cancelToken || o.signal) &&
            ((y = (M) => {
              k &&
                (a(!M || M.type ? new qo(null, e, k) : M),
                k.abort(),
                (k = null));
            }),
            o.cancelToken && o.cancelToken.subscribe(y),
            o.signal &&
              (o.signal.aborted
                ? y()
                : o.signal.addEventListener("abort", y))));
        const j = I_(o.url);
        if (j && en.protocols.indexOf(j) === -1) {
          a(new ze("Unsupported protocol " + j + ":", ze.ERR_BAD_REQUEST, e));
          return;
        }
        k.send(u || null);
      });
    },
  eT = (e, n) => {
    const { length: i } = (e = e ? e.filter(Boolean) : []);
    if (n || i) {
      let a = new AbortController(),
        o;
      const u = function (p) {
        if (!o) {
          ((o = !0), f());
          const y = p instanceof Error ? p : this.reason;
          a.abort(
            y instanceof ze ? y : new qo(y instanceof Error ? y.message : y),
          );
        }
      };
      let c =
        n &&
        setTimeout(() => {
          ((c = null), u(new ze(`timeout of ${n}ms exceeded`, ze.ETIMEDOUT)));
        }, n);
      const f = () => {
        e &&
          (c && clearTimeout(c),
          (c = null),
          e.forEach((p) => {
            p.unsubscribe
              ? p.unsubscribe(u)
              : p.removeEventListener("abort", u);
          }),
          (e = null));
      };
      e.forEach((p) => p.addEventListener("abort", u));
      const { signal: h } = a;
      return ((h.unsubscribe = () => X.asap(f)), h);
    }
  },
  tT = function* (e, n) {
    let i = e.byteLength;
    if (i < n) {
      yield e;
      return;
    }
    let a = 0,
      o;
    for (; a < i; ) ((o = a + n), yield e.slice(a, o), (a = o));
  },
  nT = async function* (e, n) {
    for await (const i of rT(e)) yield* tT(i, n);
  },
  rT = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const n = e.getReader();
    try {
      for (;;) {
        const { done: i, value: a } = await n.read();
        if (i) break;
        yield a;
      }
    } finally {
      await n.cancel();
    }
  },
  vb = (e, n, i, a) => {
    const o = nT(e, n);
    let u = 0,
      c,
      f = (h) => {
        c || ((c = !0), a && a(h));
      };
    return new ReadableStream(
      {
        async pull(h) {
          try {
            const { done: p, value: y } = await o.next();
            if (p) {
              (f(), h.close());
              return;
            }
            let g = y.byteLength;
            if (i) {
              let x = (u += g);
              i(x);
            }
            h.enqueue(new Uint8Array(y));
          } catch (p) {
            throw (f(p), p);
          }
        },
        cancel(h) {
          return (f(h), o.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  Sb = 64 * 1024,
  { isFunction: su } = X,
  iT = (({ Request: e, Response: n }) => ({ Request: e, Response: n }))(
    X.global,
  ),
  { ReadableStream: wb, TextEncoder: Eb } = X.global,
  kb = (e, ...n) => {
    try {
      return !!e(...n);
    } catch {
      return !1;
    }
  },
  aT = (e) => {
    e = X.merge.call({ skipUndefined: !0 }, iT, e);
    const { fetch: n, Request: i, Response: a } = e,
      o = n ? su(n) : typeof fetch == "function",
      u = su(i),
      c = su(a);
    if (!o) return !1;
    const f = o && su(wb),
      h =
        o &&
        (typeof Eb == "function"
          ? (
              (S) => (_) =>
                S.encode(_)
            )(new Eb())
          : async (S) => new Uint8Array(await new i(S).arrayBuffer())),
      p =
        u &&
        f &&
        kb(() => {
          let S = !1;
          const _ = new i(en.origin, {
            body: new wb(),
            method: "POST",
            get duplex() {
              return ((S = !0), "half");
            },
          }).headers.has("Content-Type");
          return S && !_;
        }),
      y = c && f && kb(() => X.isReadableStream(new a("").body)),
      g = { stream: y && ((S) => S.body) };
    o &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((S) => {
        !g[S] &&
          (g[S] = (_, k) => {
            let T = _ && _[S];
            if (T) return T.call(_);
            throw new ze(
              `Response type '${S}' is not supported`,
              ze.ERR_NOT_SUPPORT,
              k,
            );
          });
      });
    const x = async (S) => {
        if (S == null) return 0;
        if (X.isBlob(S)) return S.size;
        if (X.isSpecCompliantForm(S))
          return (
            await new i(en.origin, { method: "POST", body: S }).arrayBuffer()
          ).byteLength;
        if (X.isArrayBufferView(S) || X.isArrayBuffer(S)) return S.byteLength;
        if ((X.isURLSearchParams(S) && (S = S + ""), X.isString(S)))
          return (await h(S)).byteLength;
      },
      v = async (S, _) => {
        const k = X.toFiniteNumber(S.getContentLength());
        return k ?? x(_);
      };
    return async (S) => {
      let {
          url: _,
          method: k,
          data: T,
          signal: j,
          cancelToken: M,
          timeout: $,
          onDownloadProgress: Z,
          onUploadProgress: U,
          responseType: K,
          headers: N,
          withCredentials: he = "same-origin",
          fetchOptions: F,
        } = Bx(S),
        oe = n || fetch;
      K = K ? (K + "").toLowerCase() : "text";
      let ie = eT([j, M && M.toAbortSignal()], $),
        Ee = null;
      const le =
        ie &&
        ie.unsubscribe &&
        (() => {
          ie.unsubscribe();
        });
      let ee;
      try {
        if (
          U &&
          p &&
          k !== "get" &&
          k !== "head" &&
          (ee = await v(N, T)) !== 0
        ) {
          let O = new i(_, { method: "POST", body: T, duplex: "half" }),
            G;
          if (
            (X.isFormData(T) &&
              (G = O.headers.get("content-type")) &&
              N.setContentType(G),
            O.body)
          ) {
            const [C, se] = yb(ee, Nu(bb(U)));
            T = vb(O.body, Sb, C, se);
          }
        }
        X.isString(he) || (he = he ? "include" : "omit");
        const D = u && "credentials" in i.prototype,
          te = {
            ...F,
            signal: ie,
            method: k.toUpperCase(),
            headers: N.normalize().toJSON(),
            body: T,
            duplex: "half",
            credentials: D ? he : void 0,
          };
        Ee = u && new i(_, te);
        let fe = await (u ? oe(Ee, F) : oe(_, te));
        const me = y && (K === "stream" || K === "response");
        if (y && (Z || (me && le))) {
          const O = {};
          ["status", "statusText", "headers"].forEach((Se) => {
            O[Se] = fe[Se];
          });
          const G = X.toFiniteNumber(fe.headers.get("content-length")),
            [C, se] = (Z && yb(G, Nu(bb(Z), !0))) || [];
          fe = new a(
            vb(fe.body, Sb, C, () => {
              (se && se(), le && le());
            }),
            O,
          );
        }
        K = K || "text";
        let R = await g[X.findKey(g, K) || "text"](fe, S);
        return (
          !me && le && le(),
          await new Promise((O, G) => {
            jx(O, G, {
              data: R,
              headers: yn.from(fe.headers),
              status: fe.status,
              statusText: fe.statusText,
              config: S,
              request: Ee,
            });
          })
        );
      } catch (D) {
        throw (
          le && le(),
          D && D.name === "TypeError" && /Load failed|fetch/i.test(D.message)
            ? Object.assign(
                new ze("Network Error", ze.ERR_NETWORK, S, Ee, D && D.response),
                { cause: D.cause || D },
              )
            : ze.from(D, D && D.code, S, Ee, D && D.response)
        );
      }
    };
  },
  lT = new Map(),
  Ux = (e) => {
    let n = (e && e.env) || {};
    const { fetch: i, Request: a, Response: o } = n,
      u = [a, o, i];
    let c = u.length,
      f = c,
      h,
      p,
      y = lT;
    for (; f--; )
      ((h = u[f]),
        (p = y.get(h)),
        p === void 0 && y.set(h, (p = f ? new Map() : aT(n))),
        (y = p));
    return p;
  };
Ux();
const dp = { http: E_, xhr: W_, fetch: { get: Ux } };
X.forEach(dp, (e, n) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: n });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: n });
  }
});
const Cb = (e) => `- ${e}`,
  oT = (e) => X.isFunction(e) || e === null || e === !1;
function sT(e, n) {
  e = X.isArray(e) ? e : [e];
  const { length: i } = e;
  let a, o;
  const u = {};
  for (let c = 0; c < i; c++) {
    a = e[c];
    let f;
    if (
      ((o = a),
      !oT(a) && ((o = dp[(f = String(a)).toLowerCase()]), o === void 0))
    )
      throw new ze(`Unknown adapter '${f}'`);
    if (o && (X.isFunction(o) || (o = o.get(n)))) break;
    u[f || "#" + c] = o;
  }
  if (!o) {
    const c = Object.entries(u).map(
      ([h, p]) =>
        `adapter ${h} ` +
        (p === !1
          ? "is not supported by the environment"
          : "is not available in the build"),
    );
    let f = i
      ? c.length > 1
        ? `since :
` +
          c.map(Cb).join(`
`)
        : " " + Cb(c[0])
      : "as no adapter specified";
    throw new ze(
      "There is no suitable adapter to dispatch the request " + f,
      "ERR_NOT_SUPPORT",
    );
  }
  return o;
}
const Hx = { getAdapter: sT, adapters: dp };
function Pd(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new qo(null, e);
}
function _b(e) {
  return (
    Pd(e),
    (e.headers = yn.from(e.headers)),
    (e.data = Fd.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Hx.getAdapter(
      e.adapter || Ho.adapter,
      e,
    )(e).then(
      function (a) {
        return (
          Pd(e),
          (a.data = Fd.call(e, e.transformResponse, a)),
          (a.headers = yn.from(a.headers)),
          a
        );
      },
      function (a) {
        return (
          Mx(a) ||
            (Pd(e),
            a &&
              a.response &&
              ((a.response.data = Fd.call(e, e.transformResponse, a.response)),
              (a.response.headers = yn.from(a.response.headers)))),
          Promise.reject(a)
        );
      },
    )
  );
}
const qx = "1.13.6",
  ec = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, n) => {
    ec[e] = function (a) {
      return typeof a === e || "a" + (n < 1 ? "n " : " ") + e;
    };
  },
);
const Tb = {};
ec.transitional = function (n, i, a) {
  function o(u, c) {
    return (
      "[Axios v" +
      qx +
      "] Transitional option '" +
      u +
      "'" +
      c +
      (a ? ". " + a : "")
    );
  }
  return (u, c, f) => {
    if (n === !1)
      throw new ze(
        o(c, " has been removed" + (i ? " in " + i : "")),
        ze.ERR_DEPRECATED,
      );
    return (
      i &&
        !Tb[c] &&
        ((Tb[c] = !0),
        console.warn(
          o(
            c,
            " has been deprecated since v" +
              i +
              " and will be removed in the near future",
          ),
        )),
      n ? n(u, c, f) : !0
    );
  };
};
ec.spelling = function (n) {
  return (i, a) => (console.warn(`${a} is likely a misspelling of ${n}`), !0);
};
function uT(e, n, i) {
  if (typeof e != "object")
    throw new ze("options must be an object", ze.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(e);
  let o = a.length;
  for (; o-- > 0; ) {
    const u = a[o],
      c = n[u];
    if (c) {
      const f = e[u],
        h = f === void 0 || c(f, u, e);
      if (h !== !0)
        throw new ze("option " + u + " must be " + h, ze.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (i !== !0) throw new ze("Unknown option " + u, ze.ERR_BAD_OPTION);
  }
}
const Eu = { assertOptions: uT, validators: ec },
  Fn = Eu.validators;
let ta = class {
  constructor(n) {
    ((this.defaults = n || {}),
      (this.interceptors = { request: new mb(), response: new mb() }));
  }
  async request(n, i) {
    try {
      return await this._request(n, i);
    } catch (a) {
      if (a instanceof Error) {
        let o = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(o)
          : (o = new Error());
        const u = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          a.stack
            ? u &&
              !String(a.stack).endsWith(u.replace(/^.+\n.+\n/, "")) &&
              (a.stack +=
                `
` + u)
            : (a.stack = u);
        } catch {}
      }
      throw a;
    }
  }
  _request(n, i) {
    (typeof n == "string" ? ((i = i || {}), (i.url = n)) : (i = n || {}),
      (i = ra(this.defaults, i)));
    const { transitional: a, paramsSerializer: o, headers: u } = i;
    (a !== void 0 &&
      Eu.assertOptions(
        a,
        {
          silentJSONParsing: Fn.transitional(Fn.boolean),
          forcedJSONParsing: Fn.transitional(Fn.boolean),
          clarifyTimeoutError: Fn.transitional(Fn.boolean),
          legacyInterceptorReqResOrdering: Fn.transitional(Fn.boolean),
        },
        !1,
      ),
      o != null &&
        (X.isFunction(o)
          ? (i.paramsSerializer = { serialize: o })
          : Eu.assertOptions(
              o,
              { encode: Fn.function, serialize: Fn.function },
              !0,
            )),
      i.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (i.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (i.allowAbsoluteUrls = !0)),
      Eu.assertOptions(
        i,
        {
          baseUrl: Fn.spelling("baseURL"),
          withXsrfToken: Fn.spelling("withXSRFToken"),
        },
        !0,
      ),
      (i.method = (i.method || this.defaults.method || "get").toLowerCase()));
    let c = u && X.merge(u.common, u[i.method]);
    (u &&
      X.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (S) => {
          delete u[S];
        },
      ),
      (i.headers = yn.concat(c, u)));
    const f = [];
    let h = !0;
    this.interceptors.request.forEach(function (_) {
      if (typeof _.runWhen == "function" && _.runWhen(i) === !1) return;
      h = h && _.synchronous;
      const k = i.transitional || cp;
      k && k.legacyInterceptorReqResOrdering
        ? f.unshift(_.fulfilled, _.rejected)
        : f.push(_.fulfilled, _.rejected);
    });
    const p = [];
    this.interceptors.response.forEach(function (_) {
      p.push(_.fulfilled, _.rejected);
    });
    let y,
      g = 0,
      x;
    if (!h) {
      const S = [_b.bind(this), void 0];
      for (
        S.unshift(...f), S.push(...p), x = S.length, y = Promise.resolve(i);
        g < x;
      )
        y = y.then(S[g++], S[g++]);
      return y;
    }
    x = f.length;
    let v = i;
    for (; g < x; ) {
      const S = f[g++],
        _ = f[g++];
      try {
        v = S(v);
      } catch (k) {
        _.call(this, k);
        break;
      }
    }
    try {
      y = _b.call(this, v);
    } catch (S) {
      return Promise.reject(S);
    }
    for (g = 0, x = p.length; g < x; ) y = y.then(p[g++], p[g++]);
    return y;
  }
  getUri(n) {
    n = ra(this.defaults, n);
    const i = Lx(n.baseURL, n.url, n.allowAbsoluteUrls);
    return Dx(i, n.params, n.paramsSerializer);
  }
};
X.forEach(["delete", "get", "head", "options"], function (n) {
  ta.prototype[n] = function (i, a) {
    return this.request(
      ra(a || {}, { method: n, url: i, data: (a || {}).data }),
    );
  };
});
X.forEach(["post", "put", "patch"], function (n) {
  function i(a) {
    return function (u, c, f) {
      return this.request(
        ra(f || {}, {
          method: n,
          headers: a ? { "Content-Type": "multipart/form-data" } : {},
          url: u,
          data: c,
        }),
      );
    };
  }
  ((ta.prototype[n] = i()), (ta.prototype[n + "Form"] = i(!0)));
});
let cT = class Fx {
  constructor(n) {
    if (typeof n != "function")
      throw new TypeError("executor must be a function.");
    let i;
    this.promise = new Promise(function (u) {
      i = u;
    });
    const a = this;
    (this.promise.then((o) => {
      if (!a._listeners) return;
      let u = a._listeners.length;
      for (; u-- > 0; ) a._listeners[u](o);
      a._listeners = null;
    }),
      (this.promise.then = (o) => {
        let u;
        const c = new Promise((f) => {
          (a.subscribe(f), (u = f));
        }).then(o);
        return (
          (c.cancel = function () {
            a.unsubscribe(u);
          }),
          c
        );
      }),
      n(function (u, c, f) {
        a.reason || ((a.reason = new qo(u, c, f)), i(a.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(n) {
    if (this.reason) {
      n(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(n) : (this._listeners = [n]);
  }
  unsubscribe(n) {
    if (!this._listeners) return;
    const i = this._listeners.indexOf(n);
    i !== -1 && this._listeners.splice(i, 1);
  }
  toAbortSignal() {
    const n = new AbortController(),
      i = (a) => {
        n.abort(a);
      };
    return (
      this.subscribe(i),
      (n.signal.unsubscribe = () => this.unsubscribe(i)),
      n.signal
    );
  }
  static source() {
    let n;
    return {
      token: new Fx(function (o) {
        n = o;
      }),
      cancel: n,
    };
  }
};
function fT(e) {
  return function (i) {
    return e.apply(null, i);
  };
}
function dT(e) {
  return X.isObject(e) && e.isAxiosError === !0;
}
const wh = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(wh).forEach(([e, n]) => {
  wh[n] = e;
});
function Px(e) {
  const n = new ta(e),
    i = Sx(ta.prototype.request, n);
  return (
    X.extend(i, ta.prototype, n, { allOwnKeys: !0 }),
    X.extend(i, n, null, { allOwnKeys: !0 }),
    (i.create = function (o) {
      return Px(ra(e, o));
    }),
    i
  );
}
const At = Px(Ho);
At.Axios = ta;
At.CanceledError = qo;
At.CancelToken = cT;
At.isCancel = Mx;
At.VERSION = qx;
At.toFormData = Wu;
At.AxiosError = ze;
At.Cancel = At.CanceledError;
At.all = function (n) {
  return Promise.all(n);
};
At.spread = fT;
At.isAxiosError = dT;
At.mergeConfig = ra;
At.AxiosHeaders = yn;
At.formToJSON = (e) => Nx(X.isHTMLForm(e) ? new FormData(e) : e);
At.getAdapter = Hx.getAdapter;
At.HttpStatusCode = wh;
At.default = At;
const {
    Axios: iM,
    AxiosError: aM,
    CanceledError: lM,
    isCancel: oM,
    CancelToken: sM,
    VERSION: uM,
    all: cM,
    Cancel: fM,
    isAxiosError: dM,
    spread: hM,
    toFormData: pM,
    AxiosHeaders: mM,
    HttpStatusCode: gM,
    formToJSON: yM,
    getAdapter: bM,
    mergeConfig: xM,
  } = At,
  sr = At.create({
    baseURL: "https://perplexity-piyush.in/api",
    withCredentials: !0,
  });
async function hT({ email: e, username: n, password: i }) {
  return (
    await sr.post("/auth/register", { email: e, username: n, password: i })
  ).data;
}
async function pT({ email: e, password: n }) {
  return (await sr.post("/auth/login", { email: e, password: n })).data;
}
async function mT() {
  return (await sr.get("/auth/get-me")).data;
}
async function gT() {
  return (await sr.post("/auth/logout")).data;
}
function Qt(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var yT = (typeof Symbol == "function" && Symbol.observable) || "@@observable",
  Rb = yT,
  Vd = () => Math.random().toString(36).substring(7).split("").join("."),
  bT = {
    INIT: `@@redux/INIT${Vd()}`,
    REPLACE: `@@redux/REPLACE${Vd()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Vd()}`,
  },
  Mu = bT;
function hp(e) {
  if (typeof e != "object" || e === null) return !1;
  let n = e;
  for (; Object.getPrototypeOf(n) !== null; ) n = Object.getPrototypeOf(n);
  return Object.getPrototypeOf(e) === n || Object.getPrototypeOf(e) === null;
}
function Vx(e, n, i) {
  if (typeof e != "function") throw new Error(Qt(2));
  if (
    (typeof n == "function" && typeof i == "function") ||
    (typeof i == "function" && typeof arguments[3] == "function")
  )
    throw new Error(Qt(0));
  if (
    (typeof n == "function" && typeof i > "u" && ((i = n), (n = void 0)),
    typeof i < "u")
  ) {
    if (typeof i != "function") throw new Error(Qt(1));
    return i(Vx)(e, n);
  }
  let a = e,
    o = n,
    u = new Map(),
    c = u,
    f = 0,
    h = !1;
  function p() {
    c === u &&
      ((c = new Map()),
      u.forEach((k, T) => {
        c.set(T, k);
      }));
  }
  function y() {
    if (h) throw new Error(Qt(3));
    return o;
  }
  function g(k) {
    if (typeof k != "function") throw new Error(Qt(4));
    if (h) throw new Error(Qt(5));
    let T = !0;
    p();
    const j = f++;
    return (
      c.set(j, k),
      function () {
        if (T) {
          if (h) throw new Error(Qt(6));
          ((T = !1), p(), c.delete(j), (u = null));
        }
      }
    );
  }
  function x(k) {
    if (!hp(k)) throw new Error(Qt(7));
    if (typeof k.type > "u") throw new Error(Qt(8));
    if (typeof k.type != "string") throw new Error(Qt(17));
    if (h) throw new Error(Qt(9));
    try {
      ((h = !0), (o = a(o, k)));
    } finally {
      h = !1;
    }
    return (
      (u = c).forEach((j) => {
        j();
      }),
      k
    );
  }
  function v(k) {
    if (typeof k != "function") throw new Error(Qt(10));
    ((a = k), x({ type: Mu.REPLACE }));
  }
  function S() {
    const k = g;
    return {
      subscribe(T) {
        if (typeof T != "object" || T === null) throw new Error(Qt(11));
        function j() {
          const $ = T;
          $.next && $.next(y());
        }
        return (j(), { unsubscribe: k(j) });
      },
      [Rb]() {
        return this;
      },
    };
  }
  return (
    x({ type: Mu.INIT }),
    { dispatch: x, subscribe: g, getState: y, replaceReducer: v, [Rb]: S }
  );
}
function xT(e) {
  Object.keys(e).forEach((n) => {
    const i = e[n];
    if (typeof i(void 0, { type: Mu.INIT }) > "u") throw new Error(Qt(12));
    if (typeof i(void 0, { type: Mu.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(Qt(13));
  });
}
function vT(e) {
  const n = Object.keys(e),
    i = {};
  for (let u = 0; u < n.length; u++) {
    const c = n[u];
    typeof e[c] == "function" && (i[c] = e[c]);
  }
  const a = Object.keys(i);
  let o;
  try {
    xT(i);
  } catch (u) {
    o = u;
  }
  return function (c = {}, f) {
    if (o) throw o;
    let h = !1;
    const p = {};
    for (let y = 0; y < a.length; y++) {
      const g = a[y],
        x = i[g],
        v = c[g],
        S = x(v, f);
      if (typeof S > "u") throw (f && f.type, new Error(Qt(14)));
      ((p[g] = S), (h = h || S !== v));
    }
    return ((h = h || a.length !== Object.keys(c).length), h ? p : c);
  };
}
function ju(...e) {
  return e.length === 0
    ? (n) => n
    : e.length === 1
      ? e[0]
      : e.reduce(
          (n, i) =>
            (...a) =>
              n(i(...a)),
        );
}
function ST(...e) {
  return (n) => (i, a) => {
    const o = n(i, a);
    let u = () => {
      throw new Error(Qt(15));
    };
    const c = { getState: o.getState, dispatch: (h, ...p) => u(h, ...p) },
      f = e.map((h) => h(c));
    return ((u = ju(...f)(o.dispatch)), { ...o, dispatch: u });
  };
}
function wT(e) {
  return hp(e) && "type" in e && typeof e.type == "string";
}
var Yx = Symbol.for("immer-nothing"),
  Ab = Symbol.for("immer-draftable"),
  ln = Symbol.for("immer-state");
function nr(e, ...n) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Rn = Object,
  rl = Rn.getPrototypeOf,
  Lu = "constructor",
  tc = "prototype",
  Eh = "configurable",
  Bu = "enumerable",
  ku = "writable",
  Co = "value",
  Ir = (e) => !!e && !!e[ln];
function ar(e) {
  return e ? Ix(e) || rc(e) || !!e[Ab] || !!e[Lu]?.[Ab] || ic(e) || ac(e) : !1;
}
var ET = Rn[tc][Lu].toString(),
  Ob = new WeakMap();
function Ix(e) {
  if (!e || !pp(e)) return !1;
  const n = rl(e);
  if (n === null || n === Rn[tc]) return !0;
  const i = Rn.hasOwnProperty.call(n, Lu) && n[Lu];
  if (i === Object) return !0;
  if (!Za(i)) return !1;
  let a = Ob.get(i);
  return (
    a === void 0 && ((a = Function.toString.call(i)), Ob.set(i, a)),
    a === ET
  );
}
function nc(e, n, i = !0) {
  Fo(e) === 0
    ? (i ? Reflect.ownKeys(e) : Rn.keys(e)).forEach((o) => {
        n(o, e[o], e);
      })
    : e.forEach((a, o) => n(o, a, e));
}
function Fo(e) {
  const n = e[ln];
  return n ? n.type_ : rc(e) ? 1 : ic(e) ? 2 : ac(e) ? 3 : 0;
}
var zb = (e, n, i = Fo(e)) =>
    i === 2 ? e.has(n) : Rn[tc].hasOwnProperty.call(e, n),
  kh = (e, n, i = Fo(e)) => (i === 2 ? e.get(n) : e[n]),
  Uu = (e, n, i, a = Fo(e)) => {
    a === 2 ? e.set(n, i) : a === 3 ? e.add(i) : (e[n] = i);
  };
function kT(e, n) {
  return e === n ? e !== 0 || 1 / e === 1 / n : e !== e && n !== n;
}
var rc = Array.isArray,
  ic = (e) => e instanceof Map,
  ac = (e) => e instanceof Set,
  pp = (e) => typeof e == "object",
  Za = (e) => typeof e == "function",
  Yd = (e) => typeof e == "boolean";
function CT(e) {
  const n = +e;
  return Number.isInteger(n) && String(n) === e;
}
var Vr = (e) => e.copy_ || e.base_,
  mp = (e) => (e.modified_ ? e.copy_ : e.base_);
function Ch(e, n) {
  if (ic(e)) return new Map(e);
  if (ac(e)) return new Set(e);
  if (rc(e)) return Array[tc].slice.call(e);
  const i = Ix(e);
  if (n === !0 || (n === "class_only" && !i)) {
    const a = Rn.getOwnPropertyDescriptors(e);
    delete a[ln];
    let o = Reflect.ownKeys(a);
    for (let u = 0; u < o.length; u++) {
      const c = o[u],
        f = a[c];
      (f[ku] === !1 && ((f[ku] = !0), (f[Eh] = !0)),
        (f.get || f.set) &&
          (a[c] = { [Eh]: !0, [ku]: !0, [Bu]: f[Bu], [Co]: e[c] }));
    }
    return Rn.create(rl(e), a);
  } else {
    const a = rl(e);
    if (a !== null && i) return { ...e };
    const o = Rn.create(a);
    return Rn.assign(o, e);
  }
}
function gp(e, n = !1) {
  return (
    lc(e) ||
      Ir(e) ||
      !ar(e) ||
      (Fo(e) > 1 &&
        Rn.defineProperties(e, { set: uu, add: uu, clear: uu, delete: uu }),
      Rn.freeze(e),
      n &&
        nc(
          e,
          (i, a) => {
            gp(a, !0);
          },
          !1,
        )),
    e
  );
}
function _T() {
  nr(2);
}
var uu = { [Co]: _T };
function lc(e) {
  return e === null || !pp(e) ? !0 : Rn.isFrozen(e);
}
var Hu = "MapSet",
  _h = "Patches",
  Db = "ArrayMethods",
  Xx = {};
function ia(e) {
  const n = Xx[e];
  return (n || nr(0, e), n);
}
var Nb = (e) => !!Xx[e],
  _o,
  Gx = () => _o,
  TT = (e, n) => ({
    drafts_: [],
    parent_: e,
    immer_: n,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
    handledSet_: new Set(),
    processedForPatches_: new Set(),
    mapSetPlugin_: Nb(Hu) ? ia(Hu) : void 0,
    arrayMethodsPlugin_: Nb(Db) ? ia(Db) : void 0,
  });
function Mb(e, n) {
  n &&
    ((e.patchPlugin_ = ia(_h)),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = n));
}
function Th(e) {
  (Rh(e), e.drafts_.forEach(RT), (e.drafts_ = null));
}
function Rh(e) {
  e === _o && (_o = e.parent_);
}
var jb = (e) => (_o = TT(_o, e));
function RT(e) {
  const n = e[ln];
  n.type_ === 0 || n.type_ === 1 ? n.revoke_() : (n.revoked_ = !0);
}
function Lb(e, n) {
  n.unfinalizedDrafts_ = n.drafts_.length;
  const i = n.drafts_[0];
  if (e !== void 0 && e !== i) {
    (i[ln].modified_ && (Th(n), nr(4)), ar(e) && (e = Bb(n, e)));
    const { patchPlugin_: o } = n;
    o && o.generateReplacementPatches_(i[ln].base_, e, n);
  } else e = Bb(n, i);
  return (
    AT(n, e, !0),
    Th(n),
    n.patches_ && n.patchListener_(n.patches_, n.inversePatches_),
    e !== Yx ? e : void 0
  );
}
function Bb(e, n) {
  if (lc(n)) return n;
  const i = n[ln];
  if (!i) return qu(n, e.handledSet_, e);
  if (!oc(i, e)) return n;
  if (!i.modified_) return i.base_;
  if (!i.finalized_) {
    const { callbacks_: a } = i;
    if (a) for (; a.length > 0; ) a.pop()(e);
    Zx(i, e);
  }
  return i.copy_;
}
function AT(e, n, i = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && gp(n, i);
}
function Qx(e) {
  ((e.finalized_ = !0), e.scope_.unfinalizedDrafts_--);
}
var oc = (e, n) => e.scope_ === n,
  OT = [];
function Kx(e, n, i, a) {
  const o = Vr(e),
    u = e.type_;
  if (a !== void 0 && kh(o, a, u) === n) {
    Uu(o, a, i, u);
    return;
  }
  if (!e.draftLocations_) {
    const f = (e.draftLocations_ = new Map());
    nc(o, (h, p) => {
      if (Ir(p)) {
        const y = f.get(p) || [];
        (y.push(h), f.set(p, y));
      }
    });
  }
  const c = e.draftLocations_.get(n) ?? OT;
  for (const f of c) Uu(o, f, i, u);
}
function zT(e, n, i) {
  e.callbacks_.push(function (o) {
    const u = n;
    if (!u || !oc(u, o)) return;
    o.mapSetPlugin_?.fixSetContents(u);
    const c = mp(u);
    (Kx(e, u.draft_ ?? u, c, i), Zx(u, o));
  });
}
function Zx(e, n) {
  if (
    e.modified_ &&
    !e.finalized_ &&
    (e.type_ === 3 ||
      (e.type_ === 1 && e.allIndicesReassigned_) ||
      (e.assigned_?.size ?? 0) > 0)
  ) {
    const { patchPlugin_: a } = n;
    if (a) {
      const o = a.getPath(e);
      o && a.generatePatches_(e, o, n);
    }
    Qx(e);
  }
}
function DT(e, n, i) {
  const { scope_: a } = e;
  if (Ir(i)) {
    const o = i[ln];
    oc(o, a) &&
      o.callbacks_.push(function () {
        Cu(e);
        const c = mp(o);
        Kx(e, i, c, n);
      });
  } else
    ar(i) &&
      e.callbacks_.push(function () {
        const u = Vr(e);
        e.type_ === 3
          ? u.has(i) && qu(i, a.handledSet_, a)
          : kh(u, n, e.type_) === i &&
            a.drafts_.length > 1 &&
            (e.assigned_.get(n) ?? !1) === !0 &&
            e.copy_ &&
            qu(kh(e.copy_, n, e.type_), a.handledSet_, a);
      });
}
function qu(e, n, i) {
  return (
    (!i.immer_.autoFreeze_ && i.unfinalizedDrafts_ < 1) ||
      Ir(e) ||
      n.has(e) ||
      !ar(e) ||
      lc(e) ||
      (n.add(e),
      nc(e, (a, o) => {
        if (Ir(o)) {
          const u = o[ln];
          if (oc(u, i)) {
            const c = mp(u);
            (Uu(e, a, c, e.type_), Qx(u));
          }
        } else ar(o) && qu(o, n, i);
      })),
    e
  );
}
function NT(e, n) {
  const i = rc(e),
    a = {
      type_: i ? 1 : 0,
      scope_: n ? n.scope_ : Gx(),
      modified_: !1,
      finalized_: !1,
      assigned_: void 0,
      parent_: n,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
      callbacks_: void 0,
    };
  let o = a,
    u = Fu;
  i && ((o = [a]), (u = To));
  const { revoke: c, proxy: f } = Proxy.revocable(o, u);
  return ((a.draft_ = f), (a.revoke_ = c), [f, a]);
}
var Fu = {
    get(e, n) {
      if (n === ln) return e;
      let i = e.scope_.arrayMethodsPlugin_;
      const a = e.type_ === 1 && typeof n == "string";
      if (a && i?.isArrayOperationMethod(n))
        return i.createMethodInterceptor(e, n);
      const o = Vr(e);
      if (!zb(o, n, e.type_)) return MT(e, o, n);
      const u = o[n];
      if (
        e.finalized_ ||
        !ar(u) ||
        (a &&
          e.operationMethod &&
          i?.isMutatingArrayMethod(e.operationMethod) &&
          CT(n))
      )
        return u;
      if (u === Id(e.base_, n)) {
        Cu(e);
        const c = e.type_ === 1 ? +n : n,
          f = Oh(e.scope_, u, e, c);
        return (e.copy_[c] = f);
      }
      return u;
    },
    has(e, n) {
      return n in Vr(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(Vr(e));
    },
    set(e, n, i) {
      const a = $x(Vr(e), n);
      if (a?.set) return (a.set.call(e.draft_, i), !0);
      if (!e.modified_) {
        const o = Id(Vr(e), n),
          u = o?.[ln];
        if (u && u.base_ === i)
          return ((e.copy_[n] = i), e.assigned_.set(n, !1), !0);
        if (kT(i, o) && (i !== void 0 || zb(e.base_, n, e.type_))) return !0;
        (Cu(e), Ah(e));
      }
      return (
        (e.copy_[n] === i && (i !== void 0 || n in e.copy_)) ||
          (Number.isNaN(i) && Number.isNaN(e.copy_[n])) ||
          ((e.copy_[n] = i), e.assigned_.set(n, !0), DT(e, n, i)),
        !0
      );
    },
    deleteProperty(e, n) {
      return (
        Cu(e),
        Id(e.base_, n) !== void 0 || n in e.base_
          ? (e.assigned_.set(n, !1), Ah(e))
          : e.assigned_.delete(n),
        e.copy_ && delete e.copy_[n],
        !0
      );
    },
    getOwnPropertyDescriptor(e, n) {
      const i = Vr(e),
        a = Reflect.getOwnPropertyDescriptor(i, n);
      return (
        a && {
          [ku]: !0,
          [Eh]: e.type_ !== 1 || n !== "length",
          [Bu]: a[Bu],
          [Co]: i[n],
        }
      );
    },
    defineProperty() {
      nr(11);
    },
    getPrototypeOf(e) {
      return rl(e.base_);
    },
    setPrototypeOf() {
      nr(12);
    },
  },
  To = {};
for (let e in Fu) {
  let n = Fu[e];
  To[e] = function () {
    const i = arguments;
    return ((i[0] = i[0][0]), n.apply(this, i));
  };
}
To.deleteProperty = function (e, n) {
  return To.set.call(this, e, n, void 0);
};
To.set = function (e, n, i) {
  return Fu.set.call(this, e[0], n, i, e[0]);
};
function Id(e, n) {
  const i = e[ln];
  return (i ? Vr(i) : e)[n];
}
function MT(e, n, i) {
  const a = $x(n, i);
  return a ? (Co in a ? a[Co] : a.get?.call(e.draft_)) : void 0;
}
function $x(e, n) {
  if (!(n in e)) return;
  let i = rl(e);
  for (; i; ) {
    const a = Object.getOwnPropertyDescriptor(i, n);
    if (a) return a;
    i = rl(i);
  }
}
function Ah(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && Ah(e.parent_));
}
function Cu(e) {
  e.copy_ ||
    ((e.assigned_ = new Map()),
    (e.copy_ = Ch(e.base_, e.scope_.immer_.useStrictShallowCopy_)));
}
var jT = class {
  constructor(e) {
    ((this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.useStrictIteration_ = !1),
      (this.produce = (n, i, a) => {
        if (Za(n) && !Za(i)) {
          const u = i;
          i = n;
          const c = this;
          return function (h = u, ...p) {
            return c.produce(h, (y) => i.call(this, y, ...p));
          };
        }
        (Za(i) || nr(6), a !== void 0 && !Za(a) && nr(7));
        let o;
        if (ar(n)) {
          const u = jb(this),
            c = Oh(u, n, void 0);
          let f = !0;
          try {
            ((o = i(c)), (f = !1));
          } finally {
            f ? Th(u) : Rh(u);
          }
          return (Mb(u, a), Lb(o, u));
        } else if (!n || !pp(n)) {
          if (
            ((o = i(n)),
            o === void 0 && (o = n),
            o === Yx && (o = void 0),
            this.autoFreeze_ && gp(o, !0),
            a)
          ) {
            const u = [],
              c = [];
            (ia(_h).generateReplacementPatches_(n, o, {
              patches_: u,
              inversePatches_: c,
            }),
              a(u, c));
          }
          return o;
        } else nr(1, n);
      }),
      (this.produceWithPatches = (n, i) => {
        if (Za(n))
          return (c, ...f) => this.produceWithPatches(c, (h) => n(h, ...f));
        let a, o;
        return [
          this.produce(n, i, (c, f) => {
            ((a = c), (o = f));
          }),
          a,
          o,
        ];
      }),
      Yd(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze),
      Yd(e?.useStrictShallowCopy) &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy),
      Yd(e?.useStrictIteration) &&
        this.setUseStrictIteration(e.useStrictIteration));
  }
  createDraft(e) {
    (ar(e) || nr(8), Ir(e) && (e = LT(e)));
    const n = jb(this),
      i = Oh(n, e, void 0);
    return ((i[ln].isManual_ = !0), Rh(n), i);
  }
  finishDraft(e, n) {
    const i = e && e[ln];
    (!i || !i.isManual_) && nr(9);
    const { scope_: a } = i;
    return (Mb(a, n), Lb(void 0, a));
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, n) {
    let i;
    for (i = n.length - 1; i >= 0; i--) {
      const o = n[i];
      if (o.path.length === 0 && o.op === "replace") {
        e = o.value;
        break;
      }
    }
    i > -1 && (n = n.slice(i + 1));
    const a = ia(_h).applyPatches_;
    return Ir(e) ? a(e, n) : this.produce(e, (o) => a(o, n));
  }
};
function Oh(e, n, i, a) {
  const [o, u] = ic(n)
    ? ia(Hu).proxyMap_(n, i)
    : ac(n)
      ? ia(Hu).proxySet_(n, i)
      : NT(n, i);
  return (
    (i?.scope_ ?? Gx()).drafts_.push(o),
    (u.callbacks_ = i?.callbacks_ ?? []),
    (u.key_ = a),
    i && a !== void 0
      ? zT(i, u, a)
      : u.callbacks_.push(function (h) {
          h.mapSetPlugin_?.fixSetContents(u);
          const { patchPlugin_: p } = h;
          u.modified_ && p && p.generatePatches_(u, [], h);
        }),
    o
  );
}
function LT(e) {
  return (Ir(e) || nr(10, e), Jx(e));
}
function Jx(e) {
  if (!ar(e) || lc(e)) return e;
  const n = e[ln];
  let i,
    a = !0;
  if (n) {
    if (!n.modified_) return n.base_;
    ((n.finalized_ = !0),
      (i = Ch(e, n.scope_.immer_.useStrictShallowCopy_)),
      (a = n.scope_.immer_.shouldUseStrictIteration()));
  } else i = Ch(e, !0);
  return (
    nc(
      i,
      (o, u) => {
        Uu(i, o, Jx(u));
      },
      a,
    ),
    n && (n.finalized_ = !1),
    i
  );
}
var BT = new jT(),
  Wx = BT.produce;
function ev(e) {
  return ({ dispatch: i, getState: a }) =>
    (o) =>
    (u) =>
      typeof u == "function" ? u(i, a, e) : o(u);
}
var UT = ev(),
  HT = ev,
  qT =
    typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == "object"
              ? ju
              : ju.apply(null, arguments);
        };
function Ub(e, n) {
  function i(...a) {
    if (n) {
      let o = n(...a);
      if (!o) throw new Error(Yr(0));
      return {
        type: e,
        payload: o.payload,
        ...("meta" in o && { meta: o.meta }),
        ...("error" in o && { error: o.error }),
      };
    }
    return { type: e, payload: a[0] };
  }
  return (
    (i.toString = () => `${e}`),
    (i.type = e),
    (i.match = (a) => wT(a) && a.type === e),
    i
  );
}
var tv = class mo extends Array {
  constructor(...n) {
    (super(...n), Object.setPrototypeOf(this, mo.prototype));
  }
  static get [Symbol.species]() {
    return mo;
  }
  concat(...n) {
    return super.concat.apply(this, n);
  }
  prepend(...n) {
    return n.length === 1 && Array.isArray(n[0])
      ? new mo(...n[0].concat(this))
      : new mo(...n.concat(this));
  }
};
function Hb(e) {
  return ar(e) ? Wx(e, () => {}) : e;
}
function cu(e, n, i) {
  return e.has(n) ? e.get(n) : e.set(n, i(n)).get(n);
}
function FT(e) {
  return typeof e == "boolean";
}
var PT = () =>
    function (n) {
      const {
        thunk: i = !0,
        immutableCheck: a = !0,
        serializableCheck: o = !0,
        actionCreatorCheck: u = !0,
      } = n ?? {};
      let c = new tv();
      return (i && (FT(i) ? c.push(UT) : c.push(HT(i.extraArgument))), c);
    },
  VT = "RTK_autoBatch",
  qb = (e) => (n) => {
    setTimeout(n, e);
  },
  YT =
    (e = { type: "raf" }) =>
    (n) =>
    (...i) => {
      const a = n(...i);
      let o = !0,
        u = !1,
        c = !1;
      const f = new Set(),
        h =
          e.type === "tick"
            ? queueMicrotask
            : e.type === "raf"
              ? typeof window < "u" && window.requestAnimationFrame
                ? window.requestAnimationFrame
                : qb(10)
              : e.type === "callback"
                ? e.queueNotification
                : qb(e.timeout),
        p = () => {
          ((c = !1), u && ((u = !1), f.forEach((y) => y())));
        };
      return Object.assign({}, a, {
        subscribe(y) {
          const g = () => o && y(),
            x = a.subscribe(g);
          return (
            f.add(y),
            () => {
              (x(), f.delete(y));
            }
          );
        },
        dispatch(y) {
          try {
            return (
              (o = !y?.meta?.[VT]),
              (u = !o),
              u && (c || ((c = !0), h(p))),
              a.dispatch(y)
            );
          } finally {
            o = !0;
          }
        },
      });
    },
  IT = (e) =>
    function (i) {
      const { autoBatch: a = !0 } = i ?? {};
      let o = new tv(e);
      return (a && o.push(YT(typeof a == "object" ? a : void 0)), o);
    };
function XT(e) {
  const n = PT(),
    {
      reducer: i = void 0,
      middleware: a,
      devTools: o = !0,
      preloadedState: u = void 0,
      enhancers: c = void 0,
    } = e || {};
  let f;
  if (typeof i == "function") f = i;
  else if (hp(i)) f = vT(i);
  else throw new Error(Yr(1));
  let h;
  typeof a == "function" ? (h = a(n)) : (h = n());
  let p = ju;
  o && (p = qT({ trace: !1, ...(typeof o == "object" && o) }));
  const y = ST(...h),
    g = IT(y);
  let x = typeof c == "function" ? c(g) : g();
  const v = p(...x);
  return Vx(f, u, v);
}
function nv(e) {
  const n = {},
    i = [];
  let a;
  const o = {
    addCase(u, c) {
      const f = typeof u == "string" ? u : u.type;
      if (!f) throw new Error(Yr(28));
      if (f in n) throw new Error(Yr(29));
      return ((n[f] = c), o);
    },
    addAsyncThunk(u, c) {
      return (
        c.pending && (n[u.pending.type] = c.pending),
        c.rejected && (n[u.rejected.type] = c.rejected),
        c.fulfilled && (n[u.fulfilled.type] = c.fulfilled),
        c.settled && i.push({ matcher: u.settled, reducer: c.settled }),
        o
      );
    },
    addMatcher(u, c) {
      return (i.push({ matcher: u, reducer: c }), o);
    },
    addDefaultCase(u) {
      return ((a = u), o);
    },
  };
  return (e(o), [n, i, a]);
}
function GT(e) {
  return typeof e == "function";
}
function QT(e, n) {
  let [i, a, o] = nv(n),
    u;
  if (GT(e)) u = () => Hb(e());
  else {
    const f = Hb(e);
    u = () => f;
  }
  function c(f = u(), h) {
    let p = [
      i[h.type],
      ...a.filter(({ matcher: y }) => y(h)).map(({ reducer: y }) => y),
    ];
    return (
      p.filter((y) => !!y).length === 0 && (p = [o]),
      p.reduce((y, g) => {
        if (g)
          if (Ir(y)) {
            const v = g(y, h);
            return v === void 0 ? y : v;
          } else {
            if (ar(y)) return Wx(y, (x) => g(x, h));
            {
              const x = g(y, h);
              if (x === void 0) {
                if (y === null) return y;
                throw Error(
                  "A case reducer on a non-draftable value must not return undefined",
                );
              }
              return x;
            }
          }
        return y;
      }, f)
    );
  }
  return ((c.getInitialState = u), c);
}
var KT = Symbol.for("rtk-slice-createasyncthunk");
function ZT(e, n) {
  return `${e}/${n}`;
}
function $T({ creators: e } = {}) {
  const n = e?.asyncThunk?.[KT];
  return function (a) {
    const { name: o, reducerPath: u = o } = a;
    if (!o) throw new Error(Yr(11));
    const c =
        (typeof a.reducers == "function" ? a.reducers(WT()) : a.reducers) || {},
      f = Object.keys(c),
      h = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      p = {
        addCase(M, $) {
          const Z = typeof M == "string" ? M : M.type;
          if (!Z) throw new Error(Yr(12));
          if (Z in h.sliceCaseReducersByType) throw new Error(Yr(13));
          return ((h.sliceCaseReducersByType[Z] = $), p);
        },
        addMatcher(M, $) {
          return (h.sliceMatchers.push({ matcher: M, reducer: $ }), p);
        },
        exposeAction(M, $) {
          return ((h.actionCreators[M] = $), p);
        },
        exposeCaseReducer(M, $) {
          return ((h.sliceCaseReducersByName[M] = $), p);
        },
      };
    f.forEach((M) => {
      const $ = c[M],
        Z = {
          reducerName: M,
          type: ZT(o, M),
          createNotation: typeof a.reducers == "function",
        };
      tR($) ? rR(Z, $, p, n) : eR(Z, $, p);
    });
    function y() {
      const [M = {}, $ = [], Z = void 0] =
          typeof a.extraReducers == "function"
            ? nv(a.extraReducers)
            : [a.extraReducers],
        U = { ...M, ...h.sliceCaseReducersByType };
      return QT(a.initialState, (K) => {
        for (let N in U) K.addCase(N, U[N]);
        for (let N of h.sliceMatchers) K.addMatcher(N.matcher, N.reducer);
        for (let N of $) K.addMatcher(N.matcher, N.reducer);
        Z && K.addDefaultCase(Z);
      });
    }
    const g = (M) => M,
      x = new Map(),
      v = new WeakMap();
    let S;
    function _(M, $) {
      return (S || (S = y()), S(M, $));
    }
    function k() {
      return (S || (S = y()), S.getInitialState());
    }
    function T(M, $ = !1) {
      function Z(K) {
        let N = K[M];
        return (typeof N > "u" && $ && (N = cu(v, Z, k)), N);
      }
      function U(K = g) {
        const N = cu(x, $, () => new WeakMap());
        return cu(N, K, () => {
          const he = {};
          for (const [F, oe] of Object.entries(a.selectors ?? {}))
            he[F] = JT(oe, K, () => cu(v, K, k), $);
          return he;
        });
      }
      return {
        reducerPath: M,
        getSelectors: U,
        get selectors() {
          return U(Z);
        },
        selectSlice: Z,
      };
    }
    const j = {
      name: o,
      reducer: _,
      actions: h.actionCreators,
      caseReducers: h.sliceCaseReducersByName,
      getInitialState: k,
      ...T(u),
      injectInto(M, { reducerPath: $, ...Z } = {}) {
        const U = $ ?? u;
        return (
          M.inject({ reducerPath: U, reducer: _ }, Z),
          { ...j, ...T(U, !0) }
        );
      },
    };
    return j;
  };
}
function JT(e, n, i, a) {
  function o(u, ...c) {
    let f = n(u);
    return (typeof f > "u" && a && (f = i()), e(f, ...c));
  }
  return ((o.unwrapped = e), o);
}
var rv = $T();
function WT() {
  function e(n, i) {
    return { _reducerDefinitionType: "asyncThunk", payloadCreator: n, ...i };
  }
  return (
    (e.withTypes = () => e),
    {
      reducer(n) {
        return Object.assign(
          {
            [n.name](...i) {
              return n(...i);
            },
          }[n.name],
          { _reducerDefinitionType: "reducer" },
        );
      },
      preparedReducer(n, i) {
        return {
          _reducerDefinitionType: "reducerWithPrepare",
          prepare: n,
          reducer: i,
        };
      },
      asyncThunk: e,
    }
  );
}
function eR({ type: e, reducerName: n, createNotation: i }, a, o) {
  let u, c;
  if ("reducer" in a) {
    if (i && !nR(a)) throw new Error(Yr(17));
    ((u = a.reducer), (c = a.prepare));
  } else u = a;
  o.addCase(e, u)
    .exposeCaseReducer(n, u)
    .exposeAction(n, c ? Ub(e, c) : Ub(e));
}
function tR(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function nR(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function rR({ type: e, reducerName: n }, i, a, o) {
  if (!o) throw new Error(Yr(18));
  const {
      payloadCreator: u,
      fulfilled: c,
      pending: f,
      rejected: h,
      settled: p,
      options: y,
    } = i,
    g = o(e, u, y);
  (a.exposeAction(n, g),
    c && a.addCase(g.fulfilled, c),
    f && a.addCase(g.pending, f),
    h && a.addCase(g.rejected, h),
    p && a.addMatcher(g.settled, p),
    a.exposeCaseReducer(n, {
      fulfilled: c || fu,
      pending: f || fu,
      rejected: h || fu,
      settled: p || fu,
    }));
}
function fu() {}
function Yr(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const iv = rv({
    name: "auth",
    initialState: { user: null, loading: !1, error: null, initialized: !1 },
    reducers: {
      setUser: (e, n) => {
        ((e.user = n.payload), (e.initialized = !0));
      },
      setLoading: (e, n) => {
        e.loading = n.payload;
      },
      setError: (e, n) => {
        e.error = n.payload;
      },
      clearError: (e) => {
        e.error = null;
      },
      logout: (e) => {
        ((e.user = null),
          (e.error = null),
          (e.initialized = !1),
          (e.loading = !1));
      },
      setInitialized: (e) => {
        ((e.initialized = !0), (e.loading = !1));
      },
    },
  }),
  {
    setUser: Xd,
    setLoading: Xa,
    setError: Fb,
    clearError: Pb,
    logout: iR,
    setInitialized: aR,
  } = iv.actions,
  lR = iv.reducer;
function sc() {
  const e = op(),
    n = yr((c) => c.auth.error);
  async function i({ email: c, username: f, password: h }) {
    try {
      return (
        e(Pb()),
        e(Xa(!0)),
        await hT({ email: c, username: f, password: h })
      );
    } catch (p) {
      return (e(Fb(p.response?.data?.message || "Registration failed")), null);
    } finally {
      e(Xa(!1));
    }
  }
  async function a({ email: c, password: f }) {
    try {
      (e(Pb()), e(Xa(!0)));
      const h = await pT({ email: c, password: f });
      return (e(Xd(h.user)), h);
    } catch (h) {
      return (e(Fb(h.response?.data?.message || "Login failed")), null);
    } finally {
      e(Xa(!1));
    }
  }
  async function o() {
    try {
      await gT();
    } catch {
    } finally {
      e(iR());
    }
  }
  async function u() {
    try {
      e(Xa(!0));
      const c = await mT();
      e(Xd(c.user));
    } catch {
      e(Xd(null));
    } finally {
      (e(Xa(!1)), e(aR()));
    }
  }
  return {
    handleRegister: i,
    handleLogin: a,
    handleLogout: o,
    handleGetMe: u,
    error: n,
  };
}
const oR = () =>
    w.jsxs("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      children: [
        w.jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
        w.jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
      ],
    }),
  sR = () =>
    w.jsxs("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        w.jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
        w.jsx("polygon", { points: "22 2 15 22 11 13 2 9 22 2" }),
      ],
    }),
  il = () =>
    w.jsx("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "white",
      children: w.jsx("path", {
        d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
        stroke: "white",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "none",
      }),
    }),
  uR = () =>
    w.jsxs("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      children: [
        w.jsx("circle", { cx: "5", cy: "12", r: "2" }),
        w.jsx("circle", { cx: "12", cy: "12", r: "2" }),
        w.jsx("circle", { cx: "19", cy: "12", r: "2" }),
      ],
    }),
  cR = ({ open: e }) =>
    e
      ? w.jsxs("svg", {
          width: "15",
          height: "15",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          children: [
            w.jsx("path", {
              d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24",
            }),
            w.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
          ],
        })
      : w.jsxs("svg", {
          width: "15",
          height: "15",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          children: [
            w.jsx("path", {
              d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
            }),
            w.jsx("circle", { cx: "12", cy: "12", r: "3" }),
          ],
        }),
  fR = () =>
    w.jsxs("svg", {
      className: "animate-spin",
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        w.jsx("path", {
          d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          opacity: "0.25",
        }),
        w.jsx("path", { d: "M21 12a9 9 0 00-9-9", strokeLinecap: "round" }),
      ],
    }),
  dR = () => {
    const [e, n] = B.useState(""),
      [i, a] = B.useState(""),
      [o, u] = B.useState(!1),
      c = Mo(),
      f = yr((x) => x.auth.loading),
      { handleLogin: h, error: p } = sc(),
      y = async (x) => {
        (x.preventDefault(), (await h({ email: e, password: i })) && c("/"));
      },
      g =
        "w-full bg-[#0a0a0a] border border-[#252525] hover:border-[#303030] focus:border-[#20b2aa]/50 focus:ring-1 focus:ring-[#20b2aa]/15 text-white text-sm placeholder-[#3a3a3a] rounded-xl px-4 py-2.5 outline-none transition-all duration-200";
    return w.jsxs("div", {
      className:
        "min-h-screen bg-[#080808] flex items-center justify-center px-4",
      children: [
        w.jsx("div", {
          className: "pointer-events-none fixed inset-0 overflow-hidden",
          children: w.jsx("div", {
            className:
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#20b2aa]/8 blur-[140px]",
          }),
        }),
        w.jsxs("div", {
          className: "relative w-full max-w-[360px]",
          children: [
            w.jsxs("div", {
              className: "text-center mb-8",
              children: [
                w.jsxs("div", {
                  className: "inline-flex items-center gap-2.5 mb-4",
                  children: [
                    w.jsx("div", {
                      className:
                        "w-8 h-8 rounded-xl bg-[#20b2aa] flex items-center justify-center",
                      children: w.jsx(il, {}),
                    }),
                    w.jsx("span", {
                      className:
                        "text-white text-lg font-semibold tracking-tight",
                      children: "Perplexity",
                    }),
                  ],
                }),
                w.jsx("h1", {
                  className:
                    "text-[22px] font-semibold text-white tracking-tight",
                  children: "Welcome back",
                }),
                w.jsx("p", {
                  className: "text-sm text-[#555] mt-1",
                  children: "Sign in to continue",
                }),
              ],
            }),
            w.jsxs("div", {
              className:
                "bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 shadow-2xl",
              children: [
                p &&
                  w.jsxs("div", {
                    className:
                      "mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2",
                    children: [
                      w.jsxs("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "#ef4444",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        className: "flex-shrink-0",
                        children: [
                          w.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                          w.jsx("line", {
                            x1: "12",
                            y1: "8",
                            x2: "12",
                            y2: "12",
                          }),
                          w.jsx("line", {
                            x1: "12",
                            y1: "16",
                            x2: "12.01",
                            y2: "16",
                          }),
                        ],
                      }),
                      w.jsx("span", {
                        className: "text-xs text-red-400",
                        children: p,
                      }),
                    ],
                  }),
                w.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    w.jsxs("div", {
                      children: [
                        w.jsx("label", {
                          className:
                            "text-xs font-medium text-[#555] mb-1.5 block tracking-wide",
                          children: "Email",
                        }),
                        w.jsx("input", {
                          type: "email",
                          value: e,
                          onChange: (x) => n(x.target.value),
                          placeholder: "you@example.com",
                          className: g,
                          onKeyDown: (x) => x.key === "Enter" && y(x),
                        }),
                      ],
                    }),
                    w.jsxs("div", {
                      children: [
                        w.jsx("label", {
                          className:
                            "text-xs font-medium text-[#555] mb-1.5 block tracking-wide",
                          children: "Password",
                        }),
                        w.jsxs("div", {
                          className: "relative",
                          children: [
                            w.jsx("input", {
                              type: o ? "text" : "password",
                              value: i,
                              onChange: (x) => a(x.target.value),
                              placeholder: "••••••••",
                              className: `${g} pr-10`,
                              onKeyDown: (x) => x.key === "Enter" && y(x),
                            }),
                            w.jsx("button", {
                              type: "button",
                              onClick: () => u(!o),
                              className:
                                "absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3a3a] hover:text-[#666] transition-colors",
                              children: w.jsx(cR, { open: o }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    w.jsx("button", {
                      onClick: y,
                      disabled: f || !e || !i,
                      className:
                        "w-full bg-[#20b2aa] hover:bg-[#1aa39b] active:bg-[#178a82] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-150 mt-1 flex items-center justify-center gap-2",
                      children: f
                        ? w.jsxs(w.Fragment, {
                            children: [w.jsx(fR, {}), " Signing in..."],
                          })
                        : "Sign in",
                    }),
                  ],
                }),
              ],
            }),
            w.jsxs("p", {
              className: "text-center text-sm text-[#444] mt-5",
              children: [
                "Don't have an account?",
                " ",
                w.jsx(na, {
                  to: "/register",
                  className:
                    "text-[#20b2aa] hover:text-[#2dd4bf] font-medium transition-colors",
                  children: "Sign up",
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  hR = ({ open: e }) =>
    e
      ? w.jsxs("svg", {
          width: "15",
          height: "15",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          children: [
            w.jsx("path", {
              d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24",
            }),
            w.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
          ],
        })
      : w.jsxs("svg", {
          width: "15",
          height: "15",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          children: [
            w.jsx("path", {
              d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
            }),
            w.jsx("circle", { cx: "12", cy: "12", r: "3" }),
          ],
        }),
  pR = () =>
    w.jsxs("svg", {
      className: "animate-spin",
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        w.jsx("path", {
          d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          opacity: "0.25",
        }),
        w.jsx("path", { d: "M21 12a9 9 0 00-9-9", strokeLinecap: "round" }),
      ],
    }),
  Gd = [
    { label: "", color: "#222" },
    { label: "Weak", color: "#ef4444" },
    { label: "Fair", color: "#f97316" },
    { label: "Good", color: "#eab308" },
    { label: "Strong", color: "#20b2aa" },
  ],
  mR = () => {
    const [e, n] = B.useState(""),
      [i, a] = B.useState(""),
      [o, u] = B.useState(""),
      [c, f] = B.useState(!1),
      [h, p] = B.useState(!1),
      [y, g] = B.useState(!1);
    Mo();
    const x = yr((j) => j.auth.loading),
      { handleRegister: v, error: S } = sc(),
      _ = (() => {
        if (!o) return 0;
        let j = 0;
        return (
          o.length >= 8 && j++,
          /[A-Z]/.test(o) && j++,
          /[0-9]/.test(o) && j++,
          /[^A-Za-z0-9]/.test(o) && j++,
          j
        );
      })(),
      k = async (j) => {
        (j.preventDefault(),
          (await v({ username: e, email: i, password: o })) && g(!0));
      },
      T =
        "w-full bg-[#0a0a0a] border border-[#252525] hover:border-[#303030] focus:border-[#20b2aa]/50 focus:ring-1 focus:ring-[#20b2aa]/15 text-white text-sm placeholder-[#3a3a3a] rounded-xl px-4 py-2.5 outline-none transition-all duration-200";
    return y
      ? w.jsxs("div", {
          className:
            "min-h-screen bg-[#080808] flex items-center justify-center px-4",
          children: [
            w.jsx("div", {
              className: "pointer-events-none fixed inset-0 overflow-hidden",
              children: w.jsx("div", {
                className:
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#20b2aa]/8 blur-[140px]",
              }),
            }),
            w.jsxs("div", {
              className: "relative w-full max-w-[360px] text-center",
              children: [
                w.jsx("div", {
                  className:
                    "w-14 h-14 rounded-2xl bg-[#20b2aa]/15 border border-[#20b2aa]/25 flex items-center justify-center mx-auto mb-5",
                  children: w.jsxs("svg", {
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#20b2aa",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    children: [
                      w.jsx("path", {
                        d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
                      }),
                      w.jsx("polyline", { points: "22,6 12,13 2,6" }),
                    ],
                  }),
                }),
                w.jsx("h2", {
                  className: "text-xl font-semibold text-white mb-2",
                  children: "Check your email",
                }),
                w.jsxs("p", {
                  className: "text-sm text-[#555] mb-6 leading-relaxed",
                  children: [
                    "We sent a verification link to",
                    " ",
                    w.jsx("span", { className: "text-[#888]", children: i }),
                    ". Click it to activate your account.",
                  ],
                }),
                w.jsx(na, {
                  to: "/login",
                  className:
                    "inline-flex items-center gap-2 text-sm text-[#20b2aa] hover:text-[#2dd4bf] font-medium transition-colors",
                  children: "Back to sign in",
                }),
              ],
            }),
          ],
        })
      : w.jsxs("div", {
          className:
            "min-h-screen bg-[#080808] flex items-center justify-center px-4 py-10",
          children: [
            w.jsx("div", {
              className: "pointer-events-none fixed inset-0 overflow-hidden",
              children: w.jsx("div", {
                className:
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#20b2aa]/8 blur-[140px]",
              }),
            }),
            w.jsxs("div", {
              className: "relative w-full max-w-[360px]",
              children: [
                w.jsxs("div", {
                  className: "text-center mb-8",
                  children: [
                    w.jsxs("div", {
                      className: "inline-flex items-center gap-2.5 mb-4",
                      children: [
                        w.jsx("div", {
                          className:
                            "w-8 h-8 rounded-xl bg-[#20b2aa] flex items-center justify-center",
                          children: w.jsx(il, {}),
                        }),
                        w.jsx("span", {
                          className:
                            "text-white text-lg font-semibold tracking-tight",
                          children: "Perplexity",
                        }),
                      ],
                    }),
                    w.jsx("h1", {
                      className:
                        "text-[22px] font-semibold text-white tracking-tight",
                      children: "Create account",
                    }),
                    w.jsx("p", {
                      className: "text-sm text-[#555] mt-1",
                      children: "Start exploring with AI-powered search",
                    }),
                  ],
                }),
                w.jsxs("div", {
                  className:
                    "bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 shadow-2xl",
                  children: [
                    S &&
                      w.jsxs("div", {
                        className:
                          "mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2",
                        children: [
                          w.jsxs("svg", {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "#ef4444",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            className: "flex-shrink-0",
                            children: [
                              w.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                              w.jsx("line", {
                                x1: "12",
                                y1: "8",
                                x2: "12",
                                y2: "12",
                              }),
                              w.jsx("line", {
                                x1: "12",
                                y1: "16",
                                x2: "12.01",
                                y2: "16",
                              }),
                            ],
                          }),
                          w.jsx("span", {
                            className: "text-xs text-red-400",
                            children: S,
                          }),
                        ],
                      }),
                    w.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        w.jsxs("div", {
                          children: [
                            w.jsx("label", {
                              className:
                                "text-xs font-medium text-[#555] mb-1.5 block tracking-wide",
                              children: "Username",
                            }),
                            w.jsx("input", {
                              type: "text",
                              value: e,
                              onChange: (j) => n(j.target.value),
                              placeholder: "johndoe",
                              className: T,
                            }),
                          ],
                        }),
                        w.jsxs("div", {
                          children: [
                            w.jsx("label", {
                              className:
                                "text-xs font-medium text-[#555] mb-1.5 block tracking-wide",
                              children: "Email",
                            }),
                            w.jsx("input", {
                              type: "email",
                              value: i,
                              onChange: (j) => a(j.target.value),
                              placeholder: "you@example.com",
                              className: T,
                            }),
                          ],
                        }),
                        w.jsxs("div", {
                          children: [
                            w.jsx("label", {
                              className:
                                "text-xs font-medium text-[#555] mb-1.5 block tracking-wide",
                              children: "Password",
                            }),
                            w.jsxs("div", {
                              className: "relative",
                              children: [
                                w.jsx("input", {
                                  type: c ? "text" : "password",
                                  value: o,
                                  onChange: (j) => u(j.target.value),
                                  placeholder: "••••••••",
                                  className: `${T} pr-10`,
                                }),
                                w.jsx("button", {
                                  type: "button",
                                  onClick: () => f(!c),
                                  className:
                                    "absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3a3a] hover:text-[#666] transition-colors",
                                  children: w.jsx(hR, { open: c }),
                                }),
                              ],
                            }),
                            o &&
                              w.jsxs("div", {
                                className: "mt-2.5",
                                children: [
                                  w.jsx("div", {
                                    className: "flex gap-1 mb-1",
                                    children: [1, 2, 3, 4].map((j) =>
                                      w.jsx(
                                        "div",
                                        {
                                          className:
                                            "flex-1 h-0.5 rounded-full transition-all duration-300",
                                          style: {
                                            backgroundColor:
                                              j <= _ ? Gd[_].color : "#222",
                                          },
                                        },
                                        j,
                                      ),
                                    ),
                                  }),
                                  w.jsx("p", {
                                    className: "text-[11px]",
                                    style: { color: Gd[_].color },
                                    children: Gd[_].label,
                                  }),
                                ],
                              }),
                          ],
                        }),
                        w.jsxs("label", {
                          className:
                            "flex items-start gap-3 cursor-pointer group",
                          children: [
                            w.jsx("button", {
                              type: "button",
                              onClick: () => p(!h),
                              className: `w-4 h-4 mt-0.5 flex-shrink-0 rounded border transition-all duration-200 flex items-center justify-center ${h ? "bg-[#20b2aa] border-[#20b2aa]" : "border-[#2e2e2e] bg-[#0a0a0a] group-hover:border-[#3a3a3a]"}`,
                              children:
                                h &&
                                w.jsx("svg", {
                                  width: "9",
                                  height: "9",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "white",
                                  strokeWidth: "3.5",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  children: w.jsx("polyline", {
                                    points: "20 6 9 17 4 12",
                                  }),
                                }),
                            }),
                            w.jsxs("span", {
                              className: "text-xs text-[#444] leading-relaxed",
                              children: [
                                "I agree to the",
                                " ",
                                w.jsx("a", {
                                  href: "#",
                                  className:
                                    "text-[#20b2aa] hover:text-[#2dd4bf] transition-colors",
                                  children: "Terms",
                                }),
                                " ",
                                "and",
                                " ",
                                w.jsx("a", {
                                  href: "#",
                                  className:
                                    "text-[#20b2aa] hover:text-[#2dd4bf] transition-colors",
                                  children: "Privacy Policy",
                                }),
                              ],
                            }),
                          ],
                        }),
                        w.jsx("button", {
                          onClick: k,
                          disabled: x || !h || !e || !i || !o,
                          className:
                            "w-full bg-[#20b2aa] hover:bg-[#1aa39b] active:bg-[#178a82] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-150 mt-1 flex items-center justify-center gap-2",
                          children: x
                            ? w.jsxs(w.Fragment, {
                                children: [
                                  w.jsx(pR, {}),
                                  " Creating account...",
                                ],
                              })
                            : "Create account",
                        }),
                      ],
                    }),
                  ],
                }),
                w.jsxs("p", {
                  className: "text-center text-sm text-[#444] mt-5",
                  children: [
                    "Already have an account?",
                    " ",
                    w.jsx(na, {
                      to: "/login",
                      className:
                        "text-[#20b2aa] hover:text-[#2dd4bf] font-medium transition-colors",
                      children: "Sign in",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
  };
function gR(e, n) {
  const i = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e)
    .join((i.padRight ? " " : "") + "," + (i.padLeft === !1 ? "" : " "))
    .trim();
}
const yR = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  bR = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  xR = {};
function Vb(e, n) {
  return (xR.jsx ? bR : yR).test(e);
}
const vR = /[ \t\n\f\r]/g;
function SR(e) {
  return typeof e == "object" ? (e.type === "text" ? Yb(e.value) : !1) : Yb(e);
}
function Yb(e) {
  return e.replace(vR, "") === "";
}
class Po {
  constructor(n, i, a) {
    ((this.normal = i), (this.property = n), a && (this.space = a));
  }
}
Po.prototype.normal = {};
Po.prototype.property = {};
Po.prototype.space = void 0;
function av(e, n) {
  const i = {},
    a = {};
  for (const o of e) (Object.assign(i, o.property), Object.assign(a, o.normal));
  return new Po(i, a, n);
}
function zh(e) {
  return e.toLowerCase();
}
class bn {
  constructor(n, i) {
    ((this.attribute = i), (this.property = n));
  }
}
bn.prototype.attribute = "";
bn.prototype.booleanish = !1;
bn.prototype.boolean = !1;
bn.prototype.commaOrSpaceSeparated = !1;
bn.prototype.commaSeparated = !1;
bn.prototype.defined = !1;
bn.prototype.mustUseProperty = !1;
bn.prototype.number = !1;
bn.prototype.overloadedBoolean = !1;
bn.prototype.property = "";
bn.prototype.spaceSeparated = !1;
bn.prototype.space = void 0;
let wR = 0;
const Be = oa(),
  jt = oa(),
  Dh = oa(),
  ue = oa(),
  ht = oa(),
  el = oa(),
  _n = oa();
function oa() {
  return 2 ** ++wR;
}
const Nh = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: Be,
        booleanish: jt,
        commaOrSpaceSeparated: _n,
        commaSeparated: el,
        number: ue,
        overloadedBoolean: Dh,
        spaceSeparated: ht,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Qd = Object.keys(Nh);
class yp extends bn {
  constructor(n, i, a, o) {
    let u = -1;
    if ((super(n, i), Ib(this, "space", o), typeof a == "number"))
      for (; ++u < Qd.length; ) {
        const c = Qd[u];
        Ib(this, Qd[u], (a & Nh[c]) === Nh[c]);
      }
  }
}
yp.prototype.defined = !0;
function Ib(e, n, i) {
  i && (e[n] = i);
}
function sl(e) {
  const n = {},
    i = {};
  for (const [a, o] of Object.entries(e.properties)) {
    const u = new yp(a, e.transform(e.attributes || {}, a), o, e.space);
    (e.mustUseProperty &&
      e.mustUseProperty.includes(a) &&
      (u.mustUseProperty = !0),
      (n[a] = u),
      (i[zh(a)] = a),
      (i[zh(u.attribute)] = a));
  }
  return new Po(n, i, e.space);
}
const lv = sl({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: jt,
    ariaAutoComplete: null,
    ariaBusy: jt,
    ariaChecked: jt,
    ariaColCount: ue,
    ariaColIndex: ue,
    ariaColSpan: ue,
    ariaControls: ht,
    ariaCurrent: null,
    ariaDescribedBy: ht,
    ariaDetails: null,
    ariaDisabled: jt,
    ariaDropEffect: ht,
    ariaErrorMessage: null,
    ariaExpanded: jt,
    ariaFlowTo: ht,
    ariaGrabbed: jt,
    ariaHasPopup: null,
    ariaHidden: jt,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ht,
    ariaLevel: ue,
    ariaLive: null,
    ariaModal: jt,
    ariaMultiLine: jt,
    ariaMultiSelectable: jt,
    ariaOrientation: null,
    ariaOwns: ht,
    ariaPlaceholder: null,
    ariaPosInSet: ue,
    ariaPressed: jt,
    ariaReadOnly: jt,
    ariaRelevant: null,
    ariaRequired: jt,
    ariaRoleDescription: ht,
    ariaRowCount: ue,
    ariaRowIndex: ue,
    ariaRowSpan: ue,
    ariaSelected: jt,
    ariaSetSize: ue,
    ariaSort: null,
    ariaValueMax: ue,
    ariaValueMin: ue,
    ariaValueNow: ue,
    ariaValueText: null,
    role: null,
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  },
});
function ov(e, n) {
  return n in e ? e[n] : n;
}
function sv(e, n) {
  return ov(e, n.toLowerCase());
}
const ER = sl({
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv",
    },
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      abbr: null,
      accept: el,
      acceptCharset: ht,
      accessKey: ht,
      action: null,
      allow: null,
      allowFullScreen: Be,
      allowPaymentRequest: Be,
      allowUserMedia: Be,
      alt: null,
      as: null,
      async: Be,
      autoCapitalize: null,
      autoComplete: ht,
      autoFocus: Be,
      autoPlay: Be,
      blocking: ht,
      capture: null,
      charSet: null,
      checked: Be,
      cite: null,
      className: ht,
      cols: ue,
      colSpan: null,
      content: null,
      contentEditable: jt,
      controls: Be,
      controlsList: ht,
      coords: ue | el,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: Be,
      defer: Be,
      dir: null,
      dirName: null,
      disabled: Be,
      download: Dh,
      draggable: jt,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: Be,
      formTarget: null,
      headers: ht,
      height: ue,
      hidden: Dh,
      high: ue,
      href: null,
      hrefLang: null,
      htmlFor: ht,
      httpEquiv: ht,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: Be,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: Be,
      itemId: null,
      itemProp: ht,
      itemRef: ht,
      itemScope: Be,
      itemType: ht,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: Be,
      low: ue,
      manifest: null,
      max: null,
      maxLength: ue,
      media: null,
      method: null,
      min: null,
      minLength: ue,
      multiple: Be,
      muted: Be,
      name: null,
      nonce: null,
      noModule: Be,
      noValidate: Be,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: Be,
      optimum: ue,
      pattern: null,
      ping: ht,
      placeholder: null,
      playsInline: Be,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: Be,
      referrerPolicy: null,
      rel: ht,
      required: Be,
      reversed: Be,
      rows: ue,
      rowSpan: ue,
      sandbox: ht,
      scope: null,
      scoped: Be,
      seamless: Be,
      selected: Be,
      shadowRootClonable: Be,
      shadowRootDelegatesFocus: Be,
      shadowRootMode: null,
      shape: null,
      size: ue,
      sizes: null,
      slot: null,
      span: ue,
      spellCheck: jt,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: ue,
      step: null,
      style: null,
      tabIndex: ue,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: Be,
      useMap: null,
      value: jt,
      width: ue,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: ht,
      axis: null,
      background: null,
      bgColor: null,
      border: ue,
      borderColor: null,
      bottomMargin: ue,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: Be,
      declare: Be,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: ue,
      leftMargin: ue,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: ue,
      marginWidth: ue,
      noResize: Be,
      noHref: Be,
      noShade: Be,
      noWrap: Be,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: ue,
      rules: null,
      scheme: null,
      scrolling: jt,
      standby: null,
      summary: null,
      text: null,
      topMargin: ue,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: ue,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: Be,
      disableRemotePlayback: Be,
      prefix: null,
      property: null,
      results: ue,
      security: null,
      unselectable: null,
    },
    space: "html",
    transform: sv,
  }),
  kR = sl({
    attributes: {
      accentHeight: "accent-height",
      alignmentBaseline: "alignment-baseline",
      arabicForm: "arabic-form",
      baselineShift: "baseline-shift",
      capHeight: "cap-height",
      className: "class",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorProfile: "color-profile",
      colorRendering: "color-rendering",
      crossOrigin: "crossorigin",
      dataType: "datatype",
      dominantBaseline: "dominant-baseline",
      enableBackground: "enable-background",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      fontFamily: "font-family",
      fontSize: "font-size",
      fontSizeAdjust: "font-size-adjust",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontVariant: "font-variant",
      fontWeight: "font-weight",
      glyphName: "glyph-name",
      glyphOrientationHorizontal: "glyph-orientation-horizontal",
      glyphOrientationVertical: "glyph-orientation-vertical",
      hrefLang: "hreflang",
      horizAdvX: "horiz-adv-x",
      horizOriginX: "horiz-origin-x",
      horizOriginY: "horiz-origin-y",
      imageRendering: "image-rendering",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      navDown: "nav-down",
      navDownLeft: "nav-down-left",
      navDownRight: "nav-down-right",
      navLeft: "nav-left",
      navNext: "nav-next",
      navPrev: "nav-prev",
      navRight: "nav-right",
      navUp: "nav-up",
      navUpLeft: "nav-up-left",
      navUpRight: "nav-up-right",
      onAbort: "onabort",
      onActivate: "onactivate",
      onAfterPrint: "onafterprint",
      onBeforePrint: "onbeforeprint",
      onBegin: "onbegin",
      onCancel: "oncancel",
      onCanPlay: "oncanplay",
      onCanPlayThrough: "oncanplaythrough",
      onChange: "onchange",
      onClick: "onclick",
      onClose: "onclose",
      onCopy: "oncopy",
      onCueChange: "oncuechange",
      onCut: "oncut",
      onDblClick: "ondblclick",
      onDrag: "ondrag",
      onDragEnd: "ondragend",
      onDragEnter: "ondragenter",
      onDragExit: "ondragexit",
      onDragLeave: "ondragleave",
      onDragOver: "ondragover",
      onDragStart: "ondragstart",
      onDrop: "ondrop",
      onDurationChange: "ondurationchange",
      onEmptied: "onemptied",
      onEnd: "onend",
      onEnded: "onended",
      onError: "onerror",
      onFocus: "onfocus",
      onFocusIn: "onfocusin",
      onFocusOut: "onfocusout",
      onHashChange: "onhashchange",
      onInput: "oninput",
      onInvalid: "oninvalid",
      onKeyDown: "onkeydown",
      onKeyPress: "onkeypress",
      onKeyUp: "onkeyup",
      onLoad: "onload",
      onLoadedData: "onloadeddata",
      onLoadedMetadata: "onloadedmetadata",
      onLoadStart: "onloadstart",
      onMessage: "onmessage",
      onMouseDown: "onmousedown",
      onMouseEnter: "onmouseenter",
      onMouseLeave: "onmouseleave",
      onMouseMove: "onmousemove",
      onMouseOut: "onmouseout",
      onMouseOver: "onmouseover",
      onMouseUp: "onmouseup",
      onMouseWheel: "onmousewheel",
      onOffline: "onoffline",
      onOnline: "ononline",
      onPageHide: "onpagehide",
      onPageShow: "onpageshow",
      onPaste: "onpaste",
      onPause: "onpause",
      onPlay: "onplay",
      onPlaying: "onplaying",
      onPopState: "onpopstate",
      onProgress: "onprogress",
      onRateChange: "onratechange",
      onRepeat: "onrepeat",
      onReset: "onreset",
      onResize: "onresize",
      onScroll: "onscroll",
      onSeeked: "onseeked",
      onSeeking: "onseeking",
      onSelect: "onselect",
      onShow: "onshow",
      onStalled: "onstalled",
      onStorage: "onstorage",
      onSubmit: "onsubmit",
      onSuspend: "onsuspend",
      onTimeUpdate: "ontimeupdate",
      onToggle: "ontoggle",
      onUnload: "onunload",
      onVolumeChange: "onvolumechange",
      onWaiting: "onwaiting",
      onZoom: "onzoom",
      overlinePosition: "overline-position",
      overlineThickness: "overline-thickness",
      paintOrder: "paint-order",
      panose1: "panose-1",
      pointerEvents: "pointer-events",
      referrerPolicy: "referrerpolicy",
      renderingIntent: "rendering-intent",
      shapeRendering: "shape-rendering",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      strikethroughPosition: "strikethrough-position",
      strikethroughThickness: "strikethrough-thickness",
      strokeDashArray: "stroke-dasharray",
      strokeDashOffset: "stroke-dashoffset",
      strokeLineCap: "stroke-linecap",
      strokeLineJoin: "stroke-linejoin",
      strokeMiterLimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      tabIndex: "tabindex",
      textAnchor: "text-anchor",
      textDecoration: "text-decoration",
      textRendering: "text-rendering",
      transformOrigin: "transform-origin",
      typeOf: "typeof",
      underlinePosition: "underline-position",
      underlineThickness: "underline-thickness",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      unitsPerEm: "units-per-em",
      vAlphabetic: "v-alphabetic",
      vHanging: "v-hanging",
      vIdeographic: "v-ideographic",
      vMathematical: "v-mathematical",
      vectorEffect: "vector-effect",
      vertAdvY: "vert-adv-y",
      vertOriginX: "vert-origin-x",
      vertOriginY: "vert-origin-y",
      wordSpacing: "word-spacing",
      writingMode: "writing-mode",
      xHeight: "x-height",
      playbackOrder: "playbackorder",
      timelineBegin: "timelinebegin",
    },
    properties: {
      about: _n,
      accentHeight: ue,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: ue,
      amplitude: ue,
      arabicForm: null,
      ascent: ue,
      attributeName: null,
      attributeType: null,
      azimuth: ue,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: ue,
      by: null,
      calcMode: null,
      capHeight: ue,
      className: ht,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: ue,
      diffuseConstant: ue,
      direction: null,
      display: null,
      dur: null,
      divisor: ue,
      dominantBaseline: null,
      download: Be,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: ue,
      enableBackground: null,
      end: null,
      event: null,
      exponent: ue,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: ue,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: el,
      g2: el,
      glyphName: el,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: ue,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: ue,
      horizOriginX: ue,
      horizOriginY: ue,
      id: null,
      ideographic: ue,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: ue,
      k: ue,
      k1: ue,
      k2: ue,
      k3: ue,
      k4: ue,
      kernelMatrix: _n,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: ue,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: ue,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: ue,
      overlineThickness: ue,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: ue,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: ht,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: ue,
      pointsAtY: ue,
      pointsAtZ: ue,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: _n,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: _n,
      rev: _n,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: _n,
      requiredFeatures: _n,
      requiredFonts: _n,
      requiredFormats: _n,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: ue,
      specularExponent: ue,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: ue,
      strikethroughThickness: ue,
      string: null,
      stroke: null,
      strokeDashArray: _n,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: ue,
      strokeOpacity: ue,
      strokeWidth: null,
      style: null,
      surfaceScale: ue,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: _n,
      tabIndex: ue,
      tableValues: null,
      target: null,
      targetX: ue,
      targetY: ue,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: _n,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: ue,
      underlineThickness: ue,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: ue,
      values: null,
      vAlphabetic: ue,
      vMathematical: ue,
      vectorEffect: null,
      vHanging: ue,
      vIdeographic: ue,
      version: null,
      vertAdvY: ue,
      vertOriginX: ue,
      vertOriginY: ue,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: ue,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
    space: "svg",
    transform: ov,
  }),
  uv = sl({
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
    space: "xlink",
    transform(e, n) {
      return "xlink:" + n.slice(5).toLowerCase();
    },
  }),
  cv = sl({
    attributes: { xmlnsxlink: "xmlns:xlink" },
    properties: { xmlnsXLink: null, xmlns: null },
    space: "xmlns",
    transform: sv,
  }),
  fv = sl({
    properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
    space: "xml",
    transform(e, n) {
      return "xml:" + n.slice(3).toLowerCase();
    },
  }),
  CR = {
    classId: "classID",
    dataType: "datatype",
    itemId: "itemID",
    strokeDashArray: "strokeDasharray",
    strokeDashOffset: "strokeDashoffset",
    strokeLineCap: "strokeLinecap",
    strokeLineJoin: "strokeLinejoin",
    strokeMiterLimit: "strokeMiterlimit",
    typeOf: "typeof",
    xLinkActuate: "xlinkActuate",
    xLinkArcRole: "xlinkArcrole",
    xLinkHref: "xlinkHref",
    xLinkRole: "xlinkRole",
    xLinkShow: "xlinkShow",
    xLinkTitle: "xlinkTitle",
    xLinkType: "xlinkType",
    xmlnsXLink: "xmlnsXlink",
  },
  _R = /[A-Z]/g,
  Xb = /-[a-z]/g,
  TR = /^data[-\w.:]+$/i;
function RR(e, n) {
  const i = zh(n);
  let a = n,
    o = bn;
  if (i in e.normal) return e.property[e.normal[i]];
  if (i.length > 4 && i.slice(0, 4) === "data" && TR.test(n)) {
    if (n.charAt(4) === "-") {
      const u = n.slice(5).replace(Xb, OR);
      a = "data" + u.charAt(0).toUpperCase() + u.slice(1);
    } else {
      const u = n.slice(4);
      if (!Xb.test(u)) {
        let c = u.replace(_R, AR);
        (c.charAt(0) !== "-" && (c = "-" + c), (n = "data" + c));
      }
    }
    o = yp;
  }
  return new o(a, n);
}
function AR(e) {
  return "-" + e.toLowerCase();
}
function OR(e) {
  return e.charAt(1).toUpperCase();
}
const zR = av([lv, ER, uv, cv, fv], "html"),
  bp = av([lv, kR, uv, cv, fv], "svg");
function DR(e) {
  return e.join(" ").trim();
}
var Ga = {},
  Kd,
  Gb;
function NR() {
  if (Gb) return Kd;
  Gb = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
    n = /\n/g,
    i = /^\s*/,
    a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
    o = /^:\s*/,
    u = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
    c = /^[;\s]*/,
    f = /^\s+|\s+$/g,
    h = `
`,
    p = "/",
    y = "*",
    g = "",
    x = "comment",
    v = "declaration";
  function S(k, T) {
    if (typeof k != "string")
      throw new TypeError("First argument must be a string");
    if (!k) return [];
    T = T || {};
    var j = 1,
      M = 1;
    function $(le) {
      var ee = le.match(n);
      ee && (j += ee.length);
      var D = le.lastIndexOf(h);
      M = ~D ? le.length - D : M + le.length;
    }
    function Z() {
      var le = { line: j, column: M };
      return function (ee) {
        return ((ee.position = new U(le)), he(), ee);
      };
    }
    function U(le) {
      ((this.start = le),
        (this.end = { line: j, column: M }),
        (this.source = T.source));
    }
    U.prototype.content = k;
    function K(le) {
      var ee = new Error(T.source + ":" + j + ":" + M + ": " + le);
      if (
        ((ee.reason = le),
        (ee.filename = T.source),
        (ee.line = j),
        (ee.column = M),
        (ee.source = k),
        !T.silent)
      )
        throw ee;
    }
    function N(le) {
      var ee = le.exec(k);
      if (ee) {
        var D = ee[0];
        return ($(D), (k = k.slice(D.length)), ee);
      }
    }
    function he() {
      N(i);
    }
    function F(le) {
      var ee;
      for (le = le || []; (ee = oe()); ) ee !== !1 && le.push(ee);
      return le;
    }
    function oe() {
      var le = Z();
      if (!(p != k.charAt(0) || y != k.charAt(1))) {
        for (
          var ee = 2;
          g != k.charAt(ee) && (y != k.charAt(ee) || p != k.charAt(ee + 1));
        )
          ++ee;
        if (((ee += 2), g === k.charAt(ee - 1)))
          return K("End of comment missing");
        var D = k.slice(2, ee - 2);
        return (
          (M += 2),
          $(D),
          (k = k.slice(ee)),
          (M += 2),
          le({ type: x, comment: D })
        );
      }
    }
    function ie() {
      var le = Z(),
        ee = N(a);
      if (ee) {
        if ((oe(), !N(o))) return K("property missing ':'");
        var D = N(u),
          te = le({
            type: v,
            property: _(ee[0].replace(e, g)),
            value: D ? _(D[0].replace(e, g)) : g,
          });
        return (N(c), te);
      }
    }
    function Ee() {
      var le = [];
      F(le);
      for (var ee; (ee = ie()); ) ee !== !1 && (le.push(ee), F(le));
      return le;
    }
    return (he(), Ee());
  }
  function _(k) {
    return k ? k.replace(f, g) : g;
  }
  return ((Kd = S), Kd);
}
var Qb;
function MR() {
  if (Qb) return Ga;
  Qb = 1;
  var e =
    (Ga && Ga.__importDefault) ||
    function (a) {
      return a && a.__esModule ? a : { default: a };
    };
  (Object.defineProperty(Ga, "__esModule", { value: !0 }), (Ga.default = i));
  const n = e(NR());
  function i(a, o) {
    let u = null;
    if (!a || typeof a != "string") return u;
    const c = (0, n.default)(a),
      f = typeof o == "function";
    return (
      c.forEach((h) => {
        if (h.type !== "declaration") return;
        const { property: p, value: y } = h;
        f ? o(p, y, h) : y && ((u = u || {}), (u[p] = y));
      }),
      u
    );
  }
  return Ga;
}
var oo = {},
  Kb;
function jR() {
  if (Kb) return oo;
  ((Kb = 1),
    Object.defineProperty(oo, "__esModule", { value: !0 }),
    (oo.camelCase = void 0));
  var e = /^--[a-zA-Z0-9_-]+$/,
    n = /-([a-z])/g,
    i = /^[^-]+$/,
    a = /^-(webkit|moz|ms|o|khtml)-/,
    o = /^-(ms)-/,
    u = function (p) {
      return !p || i.test(p) || e.test(p);
    },
    c = function (p, y) {
      return y.toUpperCase();
    },
    f = function (p, y) {
      return "".concat(y, "-");
    },
    h = function (p, y) {
      return (
        y === void 0 && (y = {}),
        u(p)
          ? p
          : ((p = p.toLowerCase()),
            y.reactCompat ? (p = p.replace(o, f)) : (p = p.replace(a, f)),
            p.replace(n, c))
      );
    };
  return ((oo.camelCase = h), oo);
}
var so, Zb;
function LR() {
  if (Zb) return so;
  Zb = 1;
  var e =
      (so && so.__importDefault) ||
      function (o) {
        return o && o.__esModule ? o : { default: o };
      },
    n = e(MR()),
    i = jR();
  function a(o, u) {
    var c = {};
    return (
      !o ||
        typeof o != "string" ||
        (0, n.default)(o, function (f, h) {
          f && h && (c[(0, i.camelCase)(f, u)] = h);
        }),
      c
    );
  }
  return ((a.default = a), (so = a), so);
}
var BR = LR();
const UR = Kh(BR),
  dv = hv("end"),
  xp = hv("start");
function hv(e) {
  return n;
  function n(i) {
    const a = (i && i.position && i.position[e]) || {};
    if (
      typeof a.line == "number" &&
      a.line > 0 &&
      typeof a.column == "number" &&
      a.column > 0
    )
      return {
        line: a.line,
        column: a.column,
        offset:
          typeof a.offset == "number" && a.offset > -1 ? a.offset : void 0,
      };
  }
}
function HR(e) {
  const n = xp(e),
    i = dv(e);
  if (n && i) return { start: n, end: i };
}
function xo(e) {
  return !e || typeof e != "object"
    ? ""
    : "position" in e || "type" in e
      ? $b(e.position)
      : "start" in e || "end" in e
        ? $b(e)
        : "line" in e || "column" in e
          ? Mh(e)
          : "";
}
function Mh(e) {
  return Jb(e && e.line) + ":" + Jb(e && e.column);
}
function $b(e) {
  return Mh(e && e.start) + "-" + Mh(e && e.end);
}
function Jb(e) {
  return e && typeof e == "number" ? e : 1;
}
class nn extends Error {
  constructor(n, i, a) {
    (super(), typeof i == "string" && ((a = i), (i = void 0)));
    let o = "",
      u = {},
      c = !1;
    if (
      (i &&
        ("line" in i && "column" in i
          ? (u = { place: i })
          : "start" in i && "end" in i
            ? (u = { place: i })
            : "type" in i
              ? (u = { ancestors: [i], place: i.position })
              : (u = { ...i })),
      typeof n == "string"
        ? (o = n)
        : !u.cause && n && ((c = !0), (o = n.message), (u.cause = n)),
      !u.ruleId && !u.source && typeof a == "string")
    ) {
      const h = a.indexOf(":");
      h === -1
        ? (u.ruleId = a)
        : ((u.source = a.slice(0, h)), (u.ruleId = a.slice(h + 1)));
    }
    if (!u.place && u.ancestors && u.ancestors) {
      const h = u.ancestors[u.ancestors.length - 1];
      h && (u.place = h.position);
    }
    const f = u.place && "start" in u.place ? u.place.start : u.place;
    ((this.ancestors = u.ancestors || void 0),
      (this.cause = u.cause || void 0),
      (this.column = f ? f.column : void 0),
      (this.fatal = void 0),
      (this.file = ""),
      (this.message = o),
      (this.line = f ? f.line : void 0),
      (this.name = xo(u.place) || "1:1"),
      (this.place = u.place || void 0),
      (this.reason = this.message),
      (this.ruleId = u.ruleId || void 0),
      (this.source = u.source || void 0),
      (this.stack =
        c && u.cause && typeof u.cause.stack == "string" ? u.cause.stack : ""),
      (this.actual = void 0),
      (this.expected = void 0),
      (this.note = void 0),
      (this.url = void 0));
  }
}
nn.prototype.file = "";
nn.prototype.name = "";
nn.prototype.reason = "";
nn.prototype.message = "";
nn.prototype.stack = "";
nn.prototype.column = void 0;
nn.prototype.line = void 0;
nn.prototype.ancestors = void 0;
nn.prototype.cause = void 0;
nn.prototype.fatal = void 0;
nn.prototype.place = void 0;
nn.prototype.ruleId = void 0;
nn.prototype.source = void 0;
const vp = {}.hasOwnProperty,
  qR = new Map(),
  FR = /[A-Z]/g,
  PR = new Set(["table", "tbody", "thead", "tfoot", "tr"]),
  VR = new Set(["td", "th"]),
  pv = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function YR(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const i = n.filePath || void 0;
  let a;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`",
      );
    a = JR(i, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    a = $R(i, n.jsx, n.jsxs);
  }
  const o = {
      Fragment: n.Fragment,
      ancestors: [],
      components: n.components || {},
      create: a,
      elementAttributeNameCase: n.elementAttributeNameCase || "react",
      evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
      filePath: i,
      ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
      passKeys: n.passKeys !== !1,
      passNode: n.passNode || !1,
      schema: n.space === "svg" ? bp : zR,
      stylePropertyNameCase: n.stylePropertyNameCase || "dom",
      tableCellAlignToStyle: n.tableCellAlignToStyle !== !1,
    },
    u = mv(o, e, void 0);
  return u && typeof u != "string"
    ? u
    : o.create(e, o.Fragment, { children: u || void 0 }, void 0);
}
function mv(e, n, i) {
  if (n.type === "element") return IR(e, n, i);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return XR(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return QR(e, n, i);
  if (n.type === "mdxjsEsm") return GR(e, n);
  if (n.type === "root") return KR(e, n, i);
  if (n.type === "text") return ZR(e, n);
}
function IR(e, n, i) {
  const a = e.schema;
  let o = a;
  (n.tagName.toLowerCase() === "svg" &&
    a.space === "html" &&
    ((o = bp), (e.schema = o)),
    e.ancestors.push(n));
  const u = yv(e, n.tagName, !1),
    c = WR(e, n);
  let f = wp(e, n);
  return (
    PR.has(n.tagName) &&
      (f = f.filter(function (h) {
        return typeof h == "string" ? !SR(h) : !0;
      })),
    gv(e, c, u, n),
    Sp(c, f),
    e.ancestors.pop(),
    (e.schema = a),
    e.create(n, u, c, i)
  );
}
function XR(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const a = n.data.estree.body[0];
    return (a.type, e.evaluater.evaluateExpression(a.expression));
  }
  Ro(e, n.position);
}
function GR(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return e.evaluater.evaluateProgram(n.data.estree);
  Ro(e, n.position);
}
function QR(e, n, i) {
  const a = e.schema;
  let o = a;
  (n.name === "svg" && a.space === "html" && ((o = bp), (e.schema = o)),
    e.ancestors.push(n));
  const u = n.name === null ? e.Fragment : yv(e, n.name, !0),
    c = eA(e, n),
    f = wp(e, n);
  return (
    gv(e, c, u, n),
    Sp(c, f),
    e.ancestors.pop(),
    (e.schema = a),
    e.create(n, u, c, i)
  );
}
function KR(e, n, i) {
  const a = {};
  return (Sp(a, wp(e, n)), e.create(n, e.Fragment, a, i));
}
function ZR(e, n) {
  return n.value;
}
function gv(e, n, i, a) {
  typeof i != "string" && i !== e.Fragment && e.passNode && (n.node = a);
}
function Sp(e, n) {
  if (n.length > 0) {
    const i = n.length > 1 ? n : n[0];
    i && (e.children = i);
  }
}
function $R(e, n, i) {
  return a;
  function a(o, u, c, f) {
    const p = Array.isArray(c.children) ? i : n;
    return f ? p(u, c, f) : p(u, c);
  }
}
function JR(e, n) {
  return i;
  function i(a, o, u, c) {
    const f = Array.isArray(u.children),
      h = xp(a);
    return n(
      o,
      u,
      c,
      f,
      {
        columnNumber: h ? h.column - 1 : void 0,
        fileName: e,
        lineNumber: h ? h.line : void 0,
      },
      void 0,
    );
  }
}
function WR(e, n) {
  const i = {};
  let a, o;
  for (o in n.properties)
    if (o !== "children" && vp.call(n.properties, o)) {
      const u = tA(e, o, n.properties[o]);
      if (u) {
        const [c, f] = u;
        e.tableCellAlignToStyle &&
        c === "align" &&
        typeof f == "string" &&
        VR.has(n.tagName)
          ? (a = f)
          : (i[c] = f);
      }
    }
  if (a) {
    const u = i.style || (i.style = {});
    u[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = a;
  }
  return i;
}
function eA(e, n) {
  const i = {};
  for (const a of n.attributes)
    if (a.type === "mdxJsxExpressionAttribute")
      if (a.data && a.data.estree && e.evaluater) {
        const u = a.data.estree.body[0];
        u.type;
        const c = u.expression;
        c.type;
        const f = c.properties[0];
        (f.type, Object.assign(i, e.evaluater.evaluateExpression(f.argument)));
      } else Ro(e, n.position);
    else {
      const o = a.name;
      let u;
      if (a.value && typeof a.value == "object")
        if (a.value.data && a.value.data.estree && e.evaluater) {
          const f = a.value.data.estree.body[0];
          (f.type, (u = e.evaluater.evaluateExpression(f.expression)));
        } else Ro(e, n.position);
      else u = a.value === null ? !0 : a.value;
      i[o] = u;
    }
  return i;
}
function wp(e, n) {
  const i = [];
  let a = -1;
  const o = e.passKeys ? new Map() : qR;
  for (; ++a < n.children.length; ) {
    const u = n.children[a];
    let c;
    if (e.passKeys) {
      const h =
        u.type === "element"
          ? u.tagName
          : u.type === "mdxJsxFlowElement" || u.type === "mdxJsxTextElement"
            ? u.name
            : void 0;
      if (h) {
        const p = o.get(h) || 0;
        ((c = h + "-" + p), o.set(h, p + 1));
      }
    }
    const f = mv(e, u, c);
    f !== void 0 && i.push(f);
  }
  return i;
}
function tA(e, n, i) {
  const a = RR(e.schema, n);
  if (!(i == null || (typeof i == "number" && Number.isNaN(i)))) {
    if (
      (Array.isArray(i) && (i = a.commaSeparated ? gR(i) : DR(i)),
      a.property === "style")
    ) {
      let o = typeof i == "object" ? i : nA(e, String(i));
      return (e.stylePropertyNameCase === "css" && (o = rA(o)), ["style", o]);
    }
    return [
      e.elementAttributeNameCase === "react" && a.space
        ? CR[a.property] || a.property
        : a.attribute,
      i,
    ];
  }
}
function nA(e, n) {
  try {
    return UR(n, { reactCompat: !0 });
  } catch (i) {
    if (e.ignoreInvalidStyle) return {};
    const a = i,
      o = new nn("Cannot parse `style` attribute", {
        ancestors: e.ancestors,
        cause: a,
        ruleId: "style",
        source: "hast-util-to-jsx-runtime",
      });
    throw (
      (o.file = e.filePath || void 0),
      (o.url = pv + "#cannot-parse-style-attribute"),
      o
    );
  }
}
function yv(e, n, i) {
  let a;
  if (!i) a = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const o = n.split(".");
    let u = -1,
      c;
    for (; ++u < o.length; ) {
      const f = Vb(o[u])
        ? { type: "Identifier", name: o[u] }
        : { type: "Literal", value: o[u] };
      c = c
        ? {
            type: "MemberExpression",
            object: c,
            property: f,
            computed: !!(u && f.type === "Literal"),
            optional: !1,
          }
        : f;
    }
    a = c;
  } else
    a =
      Vb(n) && !/^[a-z]/.test(n)
        ? { type: "Identifier", name: n }
        : { type: "Literal", value: n };
  if (a.type === "Literal") {
    const o = a.value;
    return vp.call(e.components, o) ? e.components[o] : o;
  }
  if (e.evaluater) return e.evaluater.evaluateExpression(a);
  Ro(e);
}
function Ro(e, n) {
  const i = new nn("Cannot handle MDX estrees without `createEvaluater`", {
    ancestors: e.ancestors,
    place: n,
    ruleId: "mdx-estree",
    source: "hast-util-to-jsx-runtime",
  });
  throw (
    (i.file = e.filePath || void 0),
    (i.url = pv + "#cannot-handle-mdx-estrees-without-createevaluater"),
    i
  );
}
function rA(e) {
  const n = {};
  let i;
  for (i in e) vp.call(e, i) && (n[iA(i)] = e[i]);
  return n;
}
function iA(e) {
  let n = e.replace(FR, aA);
  return (n.slice(0, 3) === "ms-" && (n = "-" + n), n);
}
function aA(e) {
  return "-" + e.toLowerCase();
}
const Zd = {
    action: ["form"],
    cite: ["blockquote", "del", "ins", "q"],
    data: ["object"],
    formAction: ["button", "input"],
    href: ["a", "area", "base", "link"],
    icon: ["menuitem"],
    itemId: null,
    manifest: ["html"],
    ping: ["a", "area"],
    poster: ["video"],
    src: [
      "audio",
      "embed",
      "iframe",
      "img",
      "input",
      "script",
      "source",
      "track",
      "video",
    ],
  },
  lA = {};
function Ep(e, n) {
  const i = lA,
    a = typeof i.includeImageAlt == "boolean" ? i.includeImageAlt : !0,
    o = typeof i.includeHtml == "boolean" ? i.includeHtml : !0;
  return bv(e, a, o);
}
function bv(e, n, i) {
  if (oA(e)) {
    if ("value" in e) return e.type === "html" && !i ? "" : e.value;
    if (n && "alt" in e && e.alt) return e.alt;
    if ("children" in e) return Wb(e.children, n, i);
  }
  return Array.isArray(e) ? Wb(e, n, i) : "";
}
function Wb(e, n, i) {
  const a = [];
  let o = -1;
  for (; ++o < e.length; ) a[o] = bv(e[o], n, i);
  return a.join("");
}
function oA(e) {
  return !!(e && typeof e == "object");
}
const e1 = document.createElement("i");
function kp(e) {
  const n = "&" + e + ";";
  e1.innerHTML = n;
  const i = e1.textContent;
  return (i.charCodeAt(i.length - 1) === 59 && e !== "semi") || i === n
    ? !1
    : i;
}
function An(e, n, i, a) {
  const o = e.length;
  let u = 0,
    c;
  if (
    (n < 0 ? (n = -n > o ? 0 : o + n) : (n = n > o ? o : n),
    (i = i > 0 ? i : 0),
    a.length < 1e4)
  )
    ((c = Array.from(a)), c.unshift(n, i), e.splice(...c));
  else
    for (i && e.splice(n, i); u < a.length; )
      ((c = a.slice(u, u + 1e4)),
        c.unshift(n, 0),
        e.splice(...c),
        (u += 1e4),
        (n += 1e4));
}
function Vn(e, n) {
  return e.length > 0 ? (An(e, e.length, 0, n), e) : n;
}
const t1 = {}.hasOwnProperty;
function xv(e) {
  const n = {};
  let i = -1;
  for (; ++i < e.length; ) sA(n, e[i]);
  return n;
}
function sA(e, n) {
  let i;
  for (i in n) {
    const o = (t1.call(e, i) ? e[i] : void 0) || (e[i] = {}),
      u = n[i];
    let c;
    if (u)
      for (c in u) {
        t1.call(o, c) || (o[c] = []);
        const f = u[c];
        uA(o[c], Array.isArray(f) ? f : f ? [f] : []);
      }
  }
}
function uA(e, n) {
  let i = -1;
  const a = [];
  for (; ++i < n.length; ) (n[i].add === "after" ? e : a).push(n[i]);
  An(e, 0, 0, a);
}
function vv(e, n) {
  const i = Number.parseInt(e, n);
  return i < 9 ||
    i === 11 ||
    (i > 13 && i < 32) ||
    (i > 126 && i < 160) ||
    (i > 55295 && i < 57344) ||
    (i > 64975 && i < 65008) ||
    (i & 65535) === 65535 ||
    (i & 65535) === 65534 ||
    i > 1114111
    ? "�"
    : String.fromCodePoint(i);
}
function ir(e) {
  return e
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase();
}
const an = Ai(/[A-Za-z]/),
  tn = Ai(/[\dA-Za-z]/),
  cA = Ai(/[#-'*+\--9=?A-Z^-~]/);
function Pu(e) {
  return e !== null && (e < 32 || e === 127);
}
const jh = Ai(/\d/),
  fA = Ai(/[\dA-Fa-f]/),
  dA = Ai(/[!-/:-@[-`{-~]/);
function Ae(e) {
  return e !== null && e < -2;
}
function ft(e) {
  return e !== null && (e < 0 || e === 32);
}
function Ye(e) {
  return e === -2 || e === -1 || e === 32;
}
const uc = Ai(new RegExp("\\p{P}|\\p{S}", "u")),
  aa = Ai(/\s/);
function Ai(e) {
  return n;
  function n(i) {
    return i !== null && i > -1 && e.test(String.fromCharCode(i));
  }
}
function ul(e) {
  const n = [];
  let i = -1,
    a = 0,
    o = 0;
  for (; ++i < e.length; ) {
    const u = e.charCodeAt(i);
    let c = "";
    if (u === 37 && tn(e.charCodeAt(i + 1)) && tn(e.charCodeAt(i + 2))) o = 2;
    else if (u < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(u)) ||
        (c = String.fromCharCode(u));
    else if (u > 55295 && u < 57344) {
      const f = e.charCodeAt(i + 1);
      u < 56320 && f > 56319 && f < 57344
        ? ((c = String.fromCharCode(u, f)), (o = 1))
        : (c = "�");
    } else c = String.fromCharCode(u);
    (c &&
      (n.push(e.slice(a, i), encodeURIComponent(c)), (a = i + o + 1), (c = "")),
      o && ((i += o), (o = 0)));
  }
  return n.join("") + e.slice(a);
}
function $e(e, n, i, a) {
  const o = a ? a - 1 : Number.POSITIVE_INFINITY;
  let u = 0;
  return c;
  function c(h) {
    return Ye(h) ? (e.enter(i), f(h)) : n(h);
  }
  function f(h) {
    return Ye(h) && u++ < o ? (e.consume(h), f) : (e.exit(i), n(h));
  }
}
const hA = { tokenize: pA };
function pA(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, a, o);
  let i;
  return n;
  function a(f) {
    if (f === null) {
      e.consume(f);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(f),
      e.exit("lineEnding"),
      $e(e, n, "linePrefix")
    );
  }
  function o(f) {
    return (e.enter("paragraph"), u(f));
  }
  function u(f) {
    const h = e.enter("chunkText", { contentType: "text", previous: i });
    return (i && (i.next = h), (i = h), c(f));
  }
  function c(f) {
    if (f === null) {
      (e.exit("chunkText"), e.exit("paragraph"), e.consume(f));
      return;
    }
    return Ae(f) ? (e.consume(f), e.exit("chunkText"), u) : (e.consume(f), c);
  }
}
const mA = { tokenize: gA },
  n1 = { tokenize: yA };
function gA(e) {
  const n = this,
    i = [];
  let a = 0,
    o,
    u,
    c;
  return f;
  function f(M) {
    if (a < i.length) {
      const $ = i[a];
      return ((n.containerState = $[1]), e.attempt($[0].continuation, h, p)(M));
    }
    return p(M);
  }
  function h(M) {
    if ((a++, n.containerState._closeFlow)) {
      ((n.containerState._closeFlow = void 0), o && j());
      const $ = n.events.length;
      let Z = $,
        U;
      for (; Z--; )
        if (n.events[Z][0] === "exit" && n.events[Z][1].type === "chunkFlow") {
          U = n.events[Z][1].end;
          break;
        }
      T(a);
      let K = $;
      for (; K < n.events.length; ) ((n.events[K][1].end = { ...U }), K++);
      return (
        An(n.events, Z + 1, 0, n.events.slice($)),
        (n.events.length = K),
        p(M)
      );
    }
    return f(M);
  }
  function p(M) {
    if (a === i.length) {
      if (!o) return x(M);
      if (o.currentConstruct && o.currentConstruct.concrete) return S(M);
      n.interrupt = !!(o.currentConstruct && !o._gfmTableDynamicInterruptHack);
    }
    return ((n.containerState = {}), e.check(n1, y, g)(M));
  }
  function y(M) {
    return (o && j(), T(a), x(M));
  }
  function g(M) {
    return (
      (n.parser.lazy[n.now().line] = a !== i.length),
      (c = n.now().offset),
      S(M)
    );
  }
  function x(M) {
    return ((n.containerState = {}), e.attempt(n1, v, S)(M));
  }
  function v(M) {
    return (a++, i.push([n.currentConstruct, n.containerState]), x(M));
  }
  function S(M) {
    if (M === null) {
      (o && j(), T(0), e.consume(M));
      return;
    }
    return (
      (o = o || n.parser.flow(n.now())),
      e.enter("chunkFlow", { _tokenizer: o, contentType: "flow", previous: u }),
      _(M)
    );
  }
  function _(M) {
    if (M === null) {
      (k(e.exit("chunkFlow"), !0), T(0), e.consume(M));
      return;
    }
    return Ae(M)
      ? (e.consume(M),
        k(e.exit("chunkFlow")),
        (a = 0),
        (n.interrupt = void 0),
        f)
      : (e.consume(M), _);
  }
  function k(M, $) {
    const Z = n.sliceStream(M);
    if (
      ($ && Z.push(null),
      (M.previous = u),
      u && (u.next = M),
      (u = M),
      o.defineSkip(M.start),
      o.write(Z),
      n.parser.lazy[M.start.line])
    ) {
      let U = o.events.length;
      for (; U--; )
        if (
          o.events[U][1].start.offset < c &&
          (!o.events[U][1].end || o.events[U][1].end.offset > c)
        )
          return;
      const K = n.events.length;
      let N = K,
        he,
        F;
      for (; N--; )
        if (n.events[N][0] === "exit" && n.events[N][1].type === "chunkFlow") {
          if (he) {
            F = n.events[N][1].end;
            break;
          }
          he = !0;
        }
      for (T(a), U = K; U < n.events.length; )
        ((n.events[U][1].end = { ...F }), U++);
      (An(n.events, N + 1, 0, n.events.slice(K)), (n.events.length = U));
    }
  }
  function T(M) {
    let $ = i.length;
    for (; $-- > M; ) {
      const Z = i[$];
      ((n.containerState = Z[1]), Z[0].exit.call(n, e));
    }
    i.length = M;
  }
  function j() {
    (o.write([null]),
      (u = void 0),
      (o = void 0),
      (n.containerState._closeFlow = void 0));
  }
}
function yA(e, n, i) {
  return $e(
    e,
    e.attempt(this.parser.constructs.document, n, i),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
  );
}
function al(e) {
  if (e === null || ft(e) || aa(e)) return 1;
  if (uc(e)) return 2;
}
function cc(e, n, i) {
  const a = [];
  let o = -1;
  for (; ++o < e.length; ) {
    const u = e[o].resolveAll;
    u && !a.includes(u) && ((n = u(n, i)), a.push(u));
  }
  return n;
}
const Lh = { name: "attention", resolveAll: bA, tokenize: xA };
function bA(e, n) {
  let i = -1,
    a,
    o,
    u,
    c,
    f,
    h,
    p,
    y;
  for (; ++i < e.length; )
    if (
      e[i][0] === "enter" &&
      e[i][1].type === "attentionSequence" &&
      e[i][1]._close
    ) {
      for (a = i; a--; )
        if (
          e[a][0] === "exit" &&
          e[a][1].type === "attentionSequence" &&
          e[a][1]._open &&
          n.sliceSerialize(e[a][1]).charCodeAt(0) ===
            n.sliceSerialize(e[i][1]).charCodeAt(0)
        ) {
          if (
            (e[a][1]._close || e[i][1]._open) &&
            (e[i][1].end.offset - e[i][1].start.offset) % 3 &&
            !(
              (e[a][1].end.offset -
                e[a][1].start.offset +
                e[i][1].end.offset -
                e[i][1].start.offset) %
              3
            )
          )
            continue;
          h =
            e[a][1].end.offset - e[a][1].start.offset > 1 &&
            e[i][1].end.offset - e[i][1].start.offset > 1
              ? 2
              : 1;
          const g = { ...e[a][1].end },
            x = { ...e[i][1].start };
          (r1(g, -h),
            r1(x, h),
            (c = {
              type: h > 1 ? "strongSequence" : "emphasisSequence",
              start: g,
              end: { ...e[a][1].end },
            }),
            (f = {
              type: h > 1 ? "strongSequence" : "emphasisSequence",
              start: { ...e[i][1].start },
              end: x,
            }),
            (u = {
              type: h > 1 ? "strongText" : "emphasisText",
              start: { ...e[a][1].end },
              end: { ...e[i][1].start },
            }),
            (o = {
              type: h > 1 ? "strong" : "emphasis",
              start: { ...c.start },
              end: { ...f.end },
            }),
            (e[a][1].end = { ...c.start }),
            (e[i][1].start = { ...f.end }),
            (p = []),
            e[a][1].end.offset - e[a][1].start.offset &&
              (p = Vn(p, [
                ["enter", e[a][1], n],
                ["exit", e[a][1], n],
              ])),
            (p = Vn(p, [
              ["enter", o, n],
              ["enter", c, n],
              ["exit", c, n],
              ["enter", u, n],
            ])),
            (p = Vn(
              p,
              cc(n.parser.constructs.insideSpan.null, e.slice(a + 1, i), n),
            )),
            (p = Vn(p, [
              ["exit", u, n],
              ["enter", f, n],
              ["exit", f, n],
              ["exit", o, n],
            ])),
            e[i][1].end.offset - e[i][1].start.offset
              ? ((y = 2),
                (p = Vn(p, [
                  ["enter", e[i][1], n],
                  ["exit", e[i][1], n],
                ])))
              : (y = 0),
            An(e, a - 1, i - a + 3, p),
            (i = a + p.length - y - 2));
          break;
        }
    }
  for (i = -1; ++i < e.length; )
    e[i][1].type === "attentionSequence" && (e[i][1].type = "data");
  return e;
}
function xA(e, n) {
  const i = this.parser.constructs.attentionMarkers.null,
    a = this.previous,
    o = al(a);
  let u;
  return c;
  function c(h) {
    return ((u = h), e.enter("attentionSequence"), f(h));
  }
  function f(h) {
    if (h === u) return (e.consume(h), f);
    const p = e.exit("attentionSequence"),
      y = al(h),
      g = !y || (y === 2 && o) || i.includes(h),
      x = !o || (o === 2 && y) || i.includes(a);
    return (
      (p._open = !!(u === 42 ? g : g && (o || !x))),
      (p._close = !!(u === 42 ? x : x && (y || !g))),
      n(h)
    );
  }
}
function r1(e, n) {
  ((e.column += n), (e.offset += n), (e._bufferIndex += n));
}
const vA = { name: "autolink", tokenize: SA };
function SA(e, n, i) {
  let a = 0;
  return o;
  function o(v) {
    return (
      e.enter("autolink"),
      e.enter("autolinkMarker"),
      e.consume(v),
      e.exit("autolinkMarker"),
      e.enter("autolinkProtocol"),
      u
    );
  }
  function u(v) {
    return an(v) ? (e.consume(v), c) : v === 64 ? i(v) : p(v);
  }
  function c(v) {
    return v === 43 || v === 45 || v === 46 || tn(v) ? ((a = 1), f(v)) : p(v);
  }
  function f(v) {
    return v === 58
      ? (e.consume(v), (a = 0), h)
      : (v === 43 || v === 45 || v === 46 || tn(v)) && a++ < 32
        ? (e.consume(v), f)
        : ((a = 0), p(v));
  }
  function h(v) {
    return v === 62
      ? (e.exit("autolinkProtocol"),
        e.enter("autolinkMarker"),
        e.consume(v),
        e.exit("autolinkMarker"),
        e.exit("autolink"),
        n)
      : v === null || v === 32 || v === 60 || Pu(v)
        ? i(v)
        : (e.consume(v), h);
  }
  function p(v) {
    return v === 64 ? (e.consume(v), y) : cA(v) ? (e.consume(v), p) : i(v);
  }
  function y(v) {
    return tn(v) ? g(v) : i(v);
  }
  function g(v) {
    return v === 46
      ? (e.consume(v), (a = 0), y)
      : v === 62
        ? ((e.exit("autolinkProtocol").type = "autolinkEmail"),
          e.enter("autolinkMarker"),
          e.consume(v),
          e.exit("autolinkMarker"),
          e.exit("autolink"),
          n)
        : x(v);
  }
  function x(v) {
    if ((v === 45 || tn(v)) && a++ < 63) {
      const S = v === 45 ? x : g;
      return (e.consume(v), S);
    }
    return i(v);
  }
}
const Vo = { partial: !0, tokenize: wA };
function wA(e, n, i) {
  return a;
  function a(u) {
    return Ye(u) ? $e(e, o, "linePrefix")(u) : o(u);
  }
  function o(u) {
    return u === null || Ae(u) ? n(u) : i(u);
  }
}
const Sv = {
  continuation: { tokenize: kA },
  exit: CA,
  name: "blockQuote",
  tokenize: EA,
};
function EA(e, n, i) {
  const a = this;
  return o;
  function o(c) {
    if (c === 62) {
      const f = a.containerState;
      return (
        f.open || (e.enter("blockQuote", { _container: !0 }), (f.open = !0)),
        e.enter("blockQuotePrefix"),
        e.enter("blockQuoteMarker"),
        e.consume(c),
        e.exit("blockQuoteMarker"),
        u
      );
    }
    return i(c);
  }
  function u(c) {
    return Ye(c)
      ? (e.enter("blockQuotePrefixWhitespace"),
        e.consume(c),
        e.exit("blockQuotePrefixWhitespace"),
        e.exit("blockQuotePrefix"),
        n)
      : (e.exit("blockQuotePrefix"), n(c));
  }
}
function kA(e, n, i) {
  const a = this;
  return o;
  function o(c) {
    return Ye(c)
      ? $e(
          e,
          u,
          "linePrefix",
          a.parser.constructs.disable.null.includes("codeIndented")
            ? void 0
            : 4,
        )(c)
      : u(c);
  }
  function u(c) {
    return e.attempt(Sv, n, i)(c);
  }
}
function CA(e) {
  e.exit("blockQuote");
}
const wv = { name: "characterEscape", tokenize: _A };
function _A(e, n, i) {
  return a;
  function a(u) {
    return (
      e.enter("characterEscape"),
      e.enter("escapeMarker"),
      e.consume(u),
      e.exit("escapeMarker"),
      o
    );
  }
  function o(u) {
    return dA(u)
      ? (e.enter("characterEscapeValue"),
        e.consume(u),
        e.exit("characterEscapeValue"),
        e.exit("characterEscape"),
        n)
      : i(u);
  }
}
const Ev = { name: "characterReference", tokenize: TA };
function TA(e, n, i) {
  const a = this;
  let o = 0,
    u,
    c;
  return f;
  function f(g) {
    return (
      e.enter("characterReference"),
      e.enter("characterReferenceMarker"),
      e.consume(g),
      e.exit("characterReferenceMarker"),
      h
    );
  }
  function h(g) {
    return g === 35
      ? (e.enter("characterReferenceMarkerNumeric"),
        e.consume(g),
        e.exit("characterReferenceMarkerNumeric"),
        p)
      : (e.enter("characterReferenceValue"), (u = 31), (c = tn), y(g));
  }
  function p(g) {
    return g === 88 || g === 120
      ? (e.enter("characterReferenceMarkerHexadecimal"),
        e.consume(g),
        e.exit("characterReferenceMarkerHexadecimal"),
        e.enter("characterReferenceValue"),
        (u = 6),
        (c = fA),
        y)
      : (e.enter("characterReferenceValue"), (u = 7), (c = jh), y(g));
  }
  function y(g) {
    if (g === 59 && o) {
      const x = e.exit("characterReferenceValue");
      return c === tn && !kp(a.sliceSerialize(x))
        ? i(g)
        : (e.enter("characterReferenceMarker"),
          e.consume(g),
          e.exit("characterReferenceMarker"),
          e.exit("characterReference"),
          n);
    }
    return c(g) && o++ < u ? (e.consume(g), y) : i(g);
  }
}
const i1 = { partial: !0, tokenize: AA },
  a1 = { concrete: !0, name: "codeFenced", tokenize: RA };
function RA(e, n, i) {
  const a = this,
    o = { partial: !0, tokenize: Z };
  let u = 0,
    c = 0,
    f;
  return h;
  function h(U) {
    return p(U);
  }
  function p(U) {
    const K = a.events[a.events.length - 1];
    return (
      (u =
        K && K[1].type === "linePrefix"
          ? K[2].sliceSerialize(K[1], !0).length
          : 0),
      (f = U),
      e.enter("codeFenced"),
      e.enter("codeFencedFence"),
      e.enter("codeFencedFenceSequence"),
      y(U)
    );
  }
  function y(U) {
    return U === f
      ? (c++, e.consume(U), y)
      : c < 3
        ? i(U)
        : (e.exit("codeFencedFenceSequence"),
          Ye(U) ? $e(e, g, "whitespace")(U) : g(U));
  }
  function g(U) {
    return U === null || Ae(U)
      ? (e.exit("codeFencedFence"), a.interrupt ? n(U) : e.check(i1, _, $)(U))
      : (e.enter("codeFencedFenceInfo"),
        e.enter("chunkString", { contentType: "string" }),
        x(U));
  }
  function x(U) {
    return U === null || Ae(U)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), g(U))
      : Ye(U)
        ? (e.exit("chunkString"),
          e.exit("codeFencedFenceInfo"),
          $e(e, v, "whitespace")(U))
        : U === 96 && U === f
          ? i(U)
          : (e.consume(U), x);
  }
  function v(U) {
    return U === null || Ae(U)
      ? g(U)
      : (e.enter("codeFencedFenceMeta"),
        e.enter("chunkString", { contentType: "string" }),
        S(U));
  }
  function S(U) {
    return U === null || Ae(U)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), g(U))
      : U === 96 && U === f
        ? i(U)
        : (e.consume(U), S);
  }
  function _(U) {
    return e.attempt(o, $, k)(U);
  }
  function k(U) {
    return (e.enter("lineEnding"), e.consume(U), e.exit("lineEnding"), T);
  }
  function T(U) {
    return u > 0 && Ye(U) ? $e(e, j, "linePrefix", u + 1)(U) : j(U);
  }
  function j(U) {
    return U === null || Ae(U)
      ? e.check(i1, _, $)(U)
      : (e.enter("codeFlowValue"), M(U));
  }
  function M(U) {
    return U === null || Ae(U)
      ? (e.exit("codeFlowValue"), j(U))
      : (e.consume(U), M);
  }
  function $(U) {
    return (e.exit("codeFenced"), n(U));
  }
  function Z(U, K, N) {
    let he = 0;
    return F;
    function F(ee) {
      return (U.enter("lineEnding"), U.consume(ee), U.exit("lineEnding"), oe);
    }
    function oe(ee) {
      return (
        U.enter("codeFencedFence"),
        Ye(ee)
          ? $e(
              U,
              ie,
              "linePrefix",
              a.parser.constructs.disable.null.includes("codeIndented")
                ? void 0
                : 4,
            )(ee)
          : ie(ee)
      );
    }
    function ie(ee) {
      return ee === f ? (U.enter("codeFencedFenceSequence"), Ee(ee)) : N(ee);
    }
    function Ee(ee) {
      return ee === f
        ? (he++, U.consume(ee), Ee)
        : he >= c
          ? (U.exit("codeFencedFenceSequence"),
            Ye(ee) ? $e(U, le, "whitespace")(ee) : le(ee))
          : N(ee);
    }
    function le(ee) {
      return ee === null || Ae(ee) ? (U.exit("codeFencedFence"), K(ee)) : N(ee);
    }
  }
}
function AA(e, n, i) {
  const a = this;
  return o;
  function o(c) {
    return c === null
      ? i(c)
      : (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), u);
  }
  function u(c) {
    return a.parser.lazy[a.now().line] ? i(c) : n(c);
  }
}
const $d = { name: "codeIndented", tokenize: zA },
  OA = { partial: !0, tokenize: DA };
function zA(e, n, i) {
  const a = this;
  return o;
  function o(p) {
    return (e.enter("codeIndented"), $e(e, u, "linePrefix", 5)(p));
  }
  function u(p) {
    const y = a.events[a.events.length - 1];
    return y &&
      y[1].type === "linePrefix" &&
      y[2].sliceSerialize(y[1], !0).length >= 4
      ? c(p)
      : i(p);
  }
  function c(p) {
    return p === null
      ? h(p)
      : Ae(p)
        ? e.attempt(OA, c, h)(p)
        : (e.enter("codeFlowValue"), f(p));
  }
  function f(p) {
    return p === null || Ae(p)
      ? (e.exit("codeFlowValue"), c(p))
      : (e.consume(p), f);
  }
  function h(p) {
    return (e.exit("codeIndented"), n(p));
  }
}
function DA(e, n, i) {
  const a = this;
  return o;
  function o(c) {
    return a.parser.lazy[a.now().line]
      ? i(c)
      : Ae(c)
        ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), o)
        : $e(e, u, "linePrefix", 5)(c);
  }
  function u(c) {
    const f = a.events[a.events.length - 1];
    return f &&
      f[1].type === "linePrefix" &&
      f[2].sliceSerialize(f[1], !0).length >= 4
      ? n(c)
      : Ae(c)
        ? o(c)
        : i(c);
  }
}
const NA = { name: "codeText", previous: jA, resolve: MA, tokenize: LA };
function MA(e) {
  let n = e.length - 4,
    i = 3,
    a,
    o;
  if (
    (e[i][1].type === "lineEnding" || e[i][1].type === "space") &&
    (e[n][1].type === "lineEnding" || e[n][1].type === "space")
  ) {
    for (a = i; ++a < n; )
      if (e[a][1].type === "codeTextData") {
        ((e[i][1].type = "codeTextPadding"),
          (e[n][1].type = "codeTextPadding"),
          (i += 2),
          (n -= 2));
        break;
      }
  }
  for (a = i - 1, n++; ++a <= n; )
    o === void 0
      ? a !== n && e[a][1].type !== "lineEnding" && (o = a)
      : (a === n || e[a][1].type === "lineEnding") &&
        ((e[o][1].type = "codeTextData"),
        a !== o + 2 &&
          ((e[o][1].end = e[a - 1][1].end),
          e.splice(o + 2, a - o - 2),
          (n -= a - o - 2),
          (a = o + 2)),
        (o = void 0));
  return e;
}
function jA(e) {
  return (
    e !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  );
}
function LA(e, n, i) {
  let a = 0,
    o,
    u;
  return c;
  function c(g) {
    return (e.enter("codeText"), e.enter("codeTextSequence"), f(g));
  }
  function f(g) {
    return g === 96
      ? (e.consume(g), a++, f)
      : (e.exit("codeTextSequence"), h(g));
  }
  function h(g) {
    return g === null
      ? i(g)
      : g === 32
        ? (e.enter("space"), e.consume(g), e.exit("space"), h)
        : g === 96
          ? ((u = e.enter("codeTextSequence")), (o = 0), y(g))
          : Ae(g)
            ? (e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), h)
            : (e.enter("codeTextData"), p(g));
  }
  function p(g) {
    return g === null || g === 32 || g === 96 || Ae(g)
      ? (e.exit("codeTextData"), h(g))
      : (e.consume(g), p);
  }
  function y(g) {
    return g === 96
      ? (e.consume(g), o++, y)
      : o === a
        ? (e.exit("codeTextSequence"), e.exit("codeText"), n(g))
        : ((u.type = "codeTextData"), p(g));
  }
}
class BA {
  constructor(n) {
    ((this.left = n ? [...n] : []), (this.right = []));
  }
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError(
        "Cannot access index `" +
          n +
          "` in a splice buffer of size `" +
          (this.left.length + this.right.length) +
          "`",
      );
    return n < this.left.length
      ? this.left[n]
      : this.right[this.right.length - n + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return (this.setCursor(0), this.right.pop());
  }
  slice(n, i) {
    const a = i ?? Number.POSITIVE_INFINITY;
    return a < this.left.length
      ? this.left.slice(n, a)
      : n > this.left.length
        ? this.right
            .slice(
              this.right.length - a + this.left.length,
              this.right.length - n + this.left.length,
            )
            .reverse()
        : this.left
            .slice(n)
            .concat(
              this.right
                .slice(this.right.length - a + this.left.length)
                .reverse(),
            );
  }
  splice(n, i, a) {
    const o = i || 0;
    this.setCursor(Math.trunc(n));
    const u = this.right.splice(
      this.right.length - o,
      Number.POSITIVE_INFINITY,
    );
    return (a && uo(this.left, a), u.reverse());
  }
  pop() {
    return (this.setCursor(Number.POSITIVE_INFINITY), this.left.pop());
  }
  push(n) {
    (this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n));
  }
  pushMany(n) {
    (this.setCursor(Number.POSITIVE_INFINITY), uo(this.left, n));
  }
  unshift(n) {
    (this.setCursor(0), this.right.push(n));
  }
  unshiftMany(n) {
    (this.setCursor(0), uo(this.right, n.reverse()));
  }
  setCursor(n) {
    if (
      !(
        n === this.left.length ||
        (n > this.left.length && this.right.length === 0) ||
        (n < 0 && this.left.length === 0)
      )
    )
      if (n < this.left.length) {
        const i = this.left.splice(n, Number.POSITIVE_INFINITY);
        uo(this.right, i.reverse());
      } else {
        const i = this.right.splice(
          this.left.length + this.right.length - n,
          Number.POSITIVE_INFINITY,
        );
        uo(this.left, i.reverse());
      }
  }
}
function uo(e, n) {
  let i = 0;
  if (n.length < 1e4) e.push(...n);
  else for (; i < n.length; ) (e.push(...n.slice(i, i + 1e4)), (i += 1e4));
}
function kv(e) {
  const n = {};
  let i = -1,
    a,
    o,
    u,
    c,
    f,
    h,
    p;
  const y = new BA(e);
  for (; ++i < y.length; ) {
    for (; i in n; ) i = n[i];
    if (
      ((a = y.get(i)),
      i &&
        a[1].type === "chunkFlow" &&
        y.get(i - 1)[1].type === "listItemPrefix" &&
        ((h = a[1]._tokenizer.events),
        (u = 0),
        u < h.length && h[u][1].type === "lineEndingBlank" && (u += 2),
        u < h.length && h[u][1].type === "content"))
    )
      for (; ++u < h.length && h[u][1].type !== "content"; )
        h[u][1].type === "chunkText" &&
          ((h[u][1]._isInFirstContentOfListItem = !0), u++);
    if (a[0] === "enter")
      a[1].contentType && (Object.assign(n, UA(y, i)), (i = n[i]), (p = !0));
    else if (a[1]._container) {
      for (u = i, o = void 0; u--; )
        if (
          ((c = y.get(u)),
          c[1].type === "lineEnding" || c[1].type === "lineEndingBlank")
        )
          c[0] === "enter" &&
            (o && (y.get(o)[1].type = "lineEndingBlank"),
            (c[1].type = "lineEnding"),
            (o = u));
        else if (
          !(c[1].type === "linePrefix" || c[1].type === "listItemIndent")
        )
          break;
      o &&
        ((a[1].end = { ...y.get(o)[1].start }),
        (f = y.slice(o, i)),
        f.unshift(a),
        y.splice(o, i - o + 1, f));
    }
  }
  return (An(e, 0, Number.POSITIVE_INFINITY, y.slice(0)), !p);
}
function UA(e, n) {
  const i = e.get(n)[1],
    a = e.get(n)[2];
  let o = n - 1;
  const u = [];
  let c = i._tokenizer;
  c ||
    ((c = a.parser[i.contentType](i.start)),
    i._contentTypeTextTrailing && (c._contentTypeTextTrailing = !0));
  const f = c.events,
    h = [],
    p = {};
  let y,
    g,
    x = -1,
    v = i,
    S = 0,
    _ = 0;
  const k = [_];
  for (; v; ) {
    for (; e.get(++o)[1] !== v; );
    (u.push(o),
      v._tokenizer ||
        ((y = a.sliceStream(v)),
        v.next || y.push(null),
        g && c.defineSkip(v.start),
        v._isInFirstContentOfListItem &&
          (c._gfmTasklistFirstContentOfListItem = !0),
        c.write(y),
        v._isInFirstContentOfListItem &&
          (c._gfmTasklistFirstContentOfListItem = void 0)),
      (g = v),
      (v = v.next));
  }
  for (v = i; ++x < f.length; )
    f[x][0] === "exit" &&
      f[x - 1][0] === "enter" &&
      f[x][1].type === f[x - 1][1].type &&
      f[x][1].start.line !== f[x][1].end.line &&
      ((_ = x + 1),
      k.push(_),
      (v._tokenizer = void 0),
      (v.previous = void 0),
      (v = v.next));
  for (
    c.events = [],
      v ? ((v._tokenizer = void 0), (v.previous = void 0)) : k.pop(),
      x = k.length;
    x--;
  ) {
    const T = f.slice(k[x], k[x + 1]),
      j = u.pop();
    (h.push([j, j + T.length - 1]), e.splice(j, 2, T));
  }
  for (h.reverse(), x = -1; ++x < h.length; )
    ((p[S + h[x][0]] = S + h[x][1]), (S += h[x][1] - h[x][0] - 1));
  return p;
}
const HA = { resolve: FA, tokenize: PA },
  qA = { partial: !0, tokenize: VA };
function FA(e) {
  return (kv(e), e);
}
function PA(e, n) {
  let i;
  return a;
  function a(f) {
    return (
      e.enter("content"),
      (i = e.enter("chunkContent", { contentType: "content" })),
      o(f)
    );
  }
  function o(f) {
    return f === null ? u(f) : Ae(f) ? e.check(qA, c, u)(f) : (e.consume(f), o);
  }
  function u(f) {
    return (e.exit("chunkContent"), e.exit("content"), n(f));
  }
  function c(f) {
    return (
      e.consume(f),
      e.exit("chunkContent"),
      (i.next = e.enter("chunkContent", {
        contentType: "content",
        previous: i,
      })),
      (i = i.next),
      o
    );
  }
}
function VA(e, n, i) {
  const a = this;
  return o;
  function o(c) {
    return (
      e.exit("chunkContent"),
      e.enter("lineEnding"),
      e.consume(c),
      e.exit("lineEnding"),
      $e(e, u, "linePrefix")
    );
  }
  function u(c) {
    if (c === null || Ae(c)) return i(c);
    const f = a.events[a.events.length - 1];
    return !a.parser.constructs.disable.null.includes("codeIndented") &&
      f &&
      f[1].type === "linePrefix" &&
      f[2].sliceSerialize(f[1], !0).length >= 4
      ? n(c)
      : e.interrupt(a.parser.constructs.flow, i, n)(c);
  }
}
function Cv(e, n, i, a, o, u, c, f, h) {
  const p = h || Number.POSITIVE_INFINITY;
  let y = 0;
  return g;
  function g(T) {
    return T === 60
      ? (e.enter(a), e.enter(o), e.enter(u), e.consume(T), e.exit(u), x)
      : T === null || T === 32 || T === 41 || Pu(T)
        ? i(T)
        : (e.enter(a),
          e.enter(c),
          e.enter(f),
          e.enter("chunkString", { contentType: "string" }),
          _(T));
  }
  function x(T) {
    return T === 62
      ? (e.enter(u), e.consume(T), e.exit(u), e.exit(o), e.exit(a), n)
      : (e.enter(f), e.enter("chunkString", { contentType: "string" }), v(T));
  }
  function v(T) {
    return T === 62
      ? (e.exit("chunkString"), e.exit(f), x(T))
      : T === null || T === 60 || Ae(T)
        ? i(T)
        : (e.consume(T), T === 92 ? S : v);
  }
  function S(T) {
    return T === 60 || T === 62 || T === 92 ? (e.consume(T), v) : v(T);
  }
  function _(T) {
    return !y && (T === null || T === 41 || ft(T))
      ? (e.exit("chunkString"), e.exit(f), e.exit(c), e.exit(a), n(T))
      : y < p && T === 40
        ? (e.consume(T), y++, _)
        : T === 41
          ? (e.consume(T), y--, _)
          : T === null || T === 32 || T === 40 || Pu(T)
            ? i(T)
            : (e.consume(T), T === 92 ? k : _);
  }
  function k(T) {
    return T === 40 || T === 41 || T === 92 ? (e.consume(T), _) : _(T);
  }
}
function _v(e, n, i, a, o, u) {
  const c = this;
  let f = 0,
    h;
  return p;
  function p(v) {
    return (e.enter(a), e.enter(o), e.consume(v), e.exit(o), e.enter(u), y);
  }
  function y(v) {
    return f > 999 ||
      v === null ||
      v === 91 ||
      (v === 93 && !h) ||
      (v === 94 && !f && "_hiddenFootnoteSupport" in c.parser.constructs)
      ? i(v)
      : v === 93
        ? (e.exit(u), e.enter(o), e.consume(v), e.exit(o), e.exit(a), n)
        : Ae(v)
          ? (e.enter("lineEnding"), e.consume(v), e.exit("lineEnding"), y)
          : (e.enter("chunkString", { contentType: "string" }), g(v));
  }
  function g(v) {
    return v === null || v === 91 || v === 93 || Ae(v) || f++ > 999
      ? (e.exit("chunkString"), y(v))
      : (e.consume(v), h || (h = !Ye(v)), v === 92 ? x : g);
  }
  function x(v) {
    return v === 91 || v === 92 || v === 93 ? (e.consume(v), f++, g) : g(v);
  }
}
function Tv(e, n, i, a, o, u) {
  let c;
  return f;
  function f(x) {
    return x === 34 || x === 39 || x === 40
      ? (e.enter(a),
        e.enter(o),
        e.consume(x),
        e.exit(o),
        (c = x === 40 ? 41 : x),
        h)
      : i(x);
  }
  function h(x) {
    return x === c
      ? (e.enter(o), e.consume(x), e.exit(o), e.exit(a), n)
      : (e.enter(u), p(x));
  }
  function p(x) {
    return x === c
      ? (e.exit(u), h(c))
      : x === null
        ? i(x)
        : Ae(x)
          ? (e.enter("lineEnding"),
            e.consume(x),
            e.exit("lineEnding"),
            $e(e, p, "linePrefix"))
          : (e.enter("chunkString", { contentType: "string" }), y(x));
  }
  function y(x) {
    return x === c || x === null || Ae(x)
      ? (e.exit("chunkString"), p(x))
      : (e.consume(x), x === 92 ? g : y);
  }
  function g(x) {
    return x === c || x === 92 ? (e.consume(x), y) : y(x);
  }
}
function vo(e, n) {
  let i;
  return a;
  function a(o) {
    return Ae(o)
      ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), (i = !0), a)
      : Ye(o)
        ? $e(e, a, i ? "linePrefix" : "lineSuffix")(o)
        : n(o);
  }
}
const YA = { name: "definition", tokenize: XA },
  IA = { partial: !0, tokenize: GA };
function XA(e, n, i) {
  const a = this;
  let o;
  return u;
  function u(v) {
    return (e.enter("definition"), c(v));
  }
  function c(v) {
    return _v.call(
      a,
      e,
      f,
      i,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString",
    )(v);
  }
  function f(v) {
    return (
      (o = ir(a.sliceSerialize(a.events[a.events.length - 1][1]).slice(1, -1))),
      v === 58
        ? (e.enter("definitionMarker"),
          e.consume(v),
          e.exit("definitionMarker"),
          h)
        : i(v)
    );
  }
  function h(v) {
    return ft(v) ? vo(e, p)(v) : p(v);
  }
  function p(v) {
    return Cv(
      e,
      y,
      i,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString",
    )(v);
  }
  function y(v) {
    return e.attempt(IA, g, g)(v);
  }
  function g(v) {
    return Ye(v) ? $e(e, x, "whitespace")(v) : x(v);
  }
  function x(v) {
    return v === null || Ae(v)
      ? (e.exit("definition"), a.parser.defined.push(o), n(v))
      : i(v);
  }
}
function GA(e, n, i) {
  return a;
  function a(f) {
    return ft(f) ? vo(e, o)(f) : i(f);
  }
  function o(f) {
    return Tv(
      e,
      u,
      i,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString",
    )(f);
  }
  function u(f) {
    return Ye(f) ? $e(e, c, "whitespace")(f) : c(f);
  }
  function c(f) {
    return f === null || Ae(f) ? n(f) : i(f);
  }
}
const QA = { name: "hardBreakEscape", tokenize: KA };
function KA(e, n, i) {
  return a;
  function a(u) {
    return (e.enter("hardBreakEscape"), e.consume(u), o);
  }
  function o(u) {
    return Ae(u) ? (e.exit("hardBreakEscape"), n(u)) : i(u);
  }
}
const ZA = { name: "headingAtx", resolve: $A, tokenize: JA };
function $A(e, n) {
  let i = e.length - 2,
    a = 3,
    o,
    u;
  return (
    e[a][1].type === "whitespace" && (a += 2),
    i - 2 > a && e[i][1].type === "whitespace" && (i -= 2),
    e[i][1].type === "atxHeadingSequence" &&
      (a === i - 1 || (i - 4 > a && e[i - 2][1].type === "whitespace")) &&
      (i -= a + 1 === i ? 2 : 4),
    i > a &&
      ((o = { type: "atxHeadingText", start: e[a][1].start, end: e[i][1].end }),
      (u = {
        type: "chunkText",
        start: e[a][1].start,
        end: e[i][1].end,
        contentType: "text",
      }),
      An(e, a, i - a + 1, [
        ["enter", o, n],
        ["enter", u, n],
        ["exit", u, n],
        ["exit", o, n],
      ])),
    e
  );
}
function JA(e, n, i) {
  let a = 0;
  return o;
  function o(y) {
    return (e.enter("atxHeading"), u(y));
  }
  function u(y) {
    return (e.enter("atxHeadingSequence"), c(y));
  }
  function c(y) {
    return y === 35 && a++ < 6
      ? (e.consume(y), c)
      : y === null || ft(y)
        ? (e.exit("atxHeadingSequence"), f(y))
        : i(y);
  }
  function f(y) {
    return y === 35
      ? (e.enter("atxHeadingSequence"), h(y))
      : y === null || Ae(y)
        ? (e.exit("atxHeading"), n(y))
        : Ye(y)
          ? $e(e, f, "whitespace")(y)
          : (e.enter("atxHeadingText"), p(y));
  }
  function h(y) {
    return y === 35 ? (e.consume(y), h) : (e.exit("atxHeadingSequence"), f(y));
  }
  function p(y) {
    return y === null || y === 35 || ft(y)
      ? (e.exit("atxHeadingText"), f(y))
      : (e.consume(y), p);
  }
}
const WA = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul",
  ],
  l1 = ["pre", "script", "style", "textarea"],
  eO = { concrete: !0, name: "htmlFlow", resolveTo: rO, tokenize: iO },
  tO = { partial: !0, tokenize: lO },
  nO = { partial: !0, tokenize: aO };
function rO(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); );
  return (
    n > 1 &&
      e[n - 2][1].type === "linePrefix" &&
      ((e[n][1].start = e[n - 2][1].start),
      (e[n + 1][1].start = e[n - 2][1].start),
      e.splice(n - 2, 2)),
    e
  );
}
function iO(e, n, i) {
  const a = this;
  let o, u, c, f, h;
  return p;
  function p(C) {
    return y(C);
  }
  function y(C) {
    return (e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(C), g);
  }
  function g(C) {
    return C === 33
      ? (e.consume(C), x)
      : C === 47
        ? (e.consume(C), (u = !0), _)
        : C === 63
          ? (e.consume(C), (o = 3), a.interrupt ? n : R)
          : an(C)
            ? (e.consume(C), (c = String.fromCharCode(C)), k)
            : i(C);
  }
  function x(C) {
    return C === 45
      ? (e.consume(C), (o = 2), v)
      : C === 91
        ? (e.consume(C), (o = 5), (f = 0), S)
        : an(C)
          ? (e.consume(C), (o = 4), a.interrupt ? n : R)
          : i(C);
  }
  function v(C) {
    return C === 45 ? (e.consume(C), a.interrupt ? n : R) : i(C);
  }
  function S(C) {
    const se = "CDATA[";
    return C === se.charCodeAt(f++)
      ? (e.consume(C), f === se.length ? (a.interrupt ? n : ie) : S)
      : i(C);
  }
  function _(C) {
    return an(C) ? (e.consume(C), (c = String.fromCharCode(C)), k) : i(C);
  }
  function k(C) {
    if (C === null || C === 47 || C === 62 || ft(C)) {
      const se = C === 47,
        Se = c.toLowerCase();
      return !se && !u && l1.includes(Se)
        ? ((o = 1), a.interrupt ? n(C) : ie(C))
        : WA.includes(c.toLowerCase())
          ? ((o = 6), se ? (e.consume(C), T) : a.interrupt ? n(C) : ie(C))
          : ((o = 7),
            a.interrupt && !a.parser.lazy[a.now().line]
              ? i(C)
              : u
                ? j(C)
                : M(C));
    }
    return C === 45 || tn(C)
      ? (e.consume(C), (c += String.fromCharCode(C)), k)
      : i(C);
  }
  function T(C) {
    return C === 62 ? (e.consume(C), a.interrupt ? n : ie) : i(C);
  }
  function j(C) {
    return Ye(C) ? (e.consume(C), j) : F(C);
  }
  function M(C) {
    return C === 47
      ? (e.consume(C), F)
      : C === 58 || C === 95 || an(C)
        ? (e.consume(C), $)
        : Ye(C)
          ? (e.consume(C), M)
          : F(C);
  }
  function $(C) {
    return C === 45 || C === 46 || C === 58 || C === 95 || tn(C)
      ? (e.consume(C), $)
      : Z(C);
  }
  function Z(C) {
    return C === 61 ? (e.consume(C), U) : Ye(C) ? (e.consume(C), Z) : M(C);
  }
  function U(C) {
    return C === null || C === 60 || C === 61 || C === 62 || C === 96
      ? i(C)
      : C === 34 || C === 39
        ? (e.consume(C), (h = C), K)
        : Ye(C)
          ? (e.consume(C), U)
          : N(C);
  }
  function K(C) {
    return C === h
      ? (e.consume(C), (h = null), he)
      : C === null || Ae(C)
        ? i(C)
        : (e.consume(C), K);
  }
  function N(C) {
    return C === null ||
      C === 34 ||
      C === 39 ||
      C === 47 ||
      C === 60 ||
      C === 61 ||
      C === 62 ||
      C === 96 ||
      ft(C)
      ? Z(C)
      : (e.consume(C), N);
  }
  function he(C) {
    return C === 47 || C === 62 || Ye(C) ? M(C) : i(C);
  }
  function F(C) {
    return C === 62 ? (e.consume(C), oe) : i(C);
  }
  function oe(C) {
    return C === null || Ae(C) ? ie(C) : Ye(C) ? (e.consume(C), oe) : i(C);
  }
  function ie(C) {
    return C === 45 && o === 2
      ? (e.consume(C), D)
      : C === 60 && o === 1
        ? (e.consume(C), te)
        : C === 62 && o === 4
          ? (e.consume(C), O)
          : C === 63 && o === 3
            ? (e.consume(C), R)
            : C === 93 && o === 5
              ? (e.consume(C), me)
              : Ae(C) && (o === 6 || o === 7)
                ? (e.exit("htmlFlowData"), e.check(tO, G, Ee)(C))
                : C === null || Ae(C)
                  ? (e.exit("htmlFlowData"), Ee(C))
                  : (e.consume(C), ie);
  }
  function Ee(C) {
    return e.check(nO, le, G)(C);
  }
  function le(C) {
    return (e.enter("lineEnding"), e.consume(C), e.exit("lineEnding"), ee);
  }
  function ee(C) {
    return C === null || Ae(C) ? Ee(C) : (e.enter("htmlFlowData"), ie(C));
  }
  function D(C) {
    return C === 45 ? (e.consume(C), R) : ie(C);
  }
  function te(C) {
    return C === 47 ? (e.consume(C), (c = ""), fe) : ie(C);
  }
  function fe(C) {
    if (C === 62) {
      const se = c.toLowerCase();
      return l1.includes(se) ? (e.consume(C), O) : ie(C);
    }
    return an(C) && c.length < 8
      ? (e.consume(C), (c += String.fromCharCode(C)), fe)
      : ie(C);
  }
  function me(C) {
    return C === 93 ? (e.consume(C), R) : ie(C);
  }
  function R(C) {
    return C === 62
      ? (e.consume(C), O)
      : C === 45 && o === 2
        ? (e.consume(C), R)
        : ie(C);
  }
  function O(C) {
    return C === null || Ae(C)
      ? (e.exit("htmlFlowData"), G(C))
      : (e.consume(C), O);
  }
  function G(C) {
    return (e.exit("htmlFlow"), n(C));
  }
}
function aO(e, n, i) {
  const a = this;
  return o;
  function o(c) {
    return Ae(c)
      ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), u)
      : i(c);
  }
  function u(c) {
    return a.parser.lazy[a.now().line] ? i(c) : n(c);
  }
}
function lO(e, n, i) {
  return a;
  function a(o) {
    return (
      e.enter("lineEnding"),
      e.consume(o),
      e.exit("lineEnding"),
      e.attempt(Vo, n, i)
    );
  }
}
const oO = { name: "htmlText", tokenize: sO };
function sO(e, n, i) {
  const a = this;
  let o, u, c;
  return f;
  function f(R) {
    return (e.enter("htmlText"), e.enter("htmlTextData"), e.consume(R), h);
  }
  function h(R) {
    return R === 33
      ? (e.consume(R), p)
      : R === 47
        ? (e.consume(R), Z)
        : R === 63
          ? (e.consume(R), M)
          : an(R)
            ? (e.consume(R), N)
            : i(R);
  }
  function p(R) {
    return R === 45
      ? (e.consume(R), y)
      : R === 91
        ? (e.consume(R), (u = 0), S)
        : an(R)
          ? (e.consume(R), j)
          : i(R);
  }
  function y(R) {
    return R === 45 ? (e.consume(R), v) : i(R);
  }
  function g(R) {
    return R === null
      ? i(R)
      : R === 45
        ? (e.consume(R), x)
        : Ae(R)
          ? ((c = g), te(R))
          : (e.consume(R), g);
  }
  function x(R) {
    return R === 45 ? (e.consume(R), v) : g(R);
  }
  function v(R) {
    return R === 62 ? D(R) : R === 45 ? x(R) : g(R);
  }
  function S(R) {
    const O = "CDATA[";
    return R === O.charCodeAt(u++)
      ? (e.consume(R), u === O.length ? _ : S)
      : i(R);
  }
  function _(R) {
    return R === null
      ? i(R)
      : R === 93
        ? (e.consume(R), k)
        : Ae(R)
          ? ((c = _), te(R))
          : (e.consume(R), _);
  }
  function k(R) {
    return R === 93 ? (e.consume(R), T) : _(R);
  }
  function T(R) {
    return R === 62 ? D(R) : R === 93 ? (e.consume(R), T) : _(R);
  }
  function j(R) {
    return R === null || R === 62
      ? D(R)
      : Ae(R)
        ? ((c = j), te(R))
        : (e.consume(R), j);
  }
  function M(R) {
    return R === null
      ? i(R)
      : R === 63
        ? (e.consume(R), $)
        : Ae(R)
          ? ((c = M), te(R))
          : (e.consume(R), M);
  }
  function $(R) {
    return R === 62 ? D(R) : M(R);
  }
  function Z(R) {
    return an(R) ? (e.consume(R), U) : i(R);
  }
  function U(R) {
    return R === 45 || tn(R) ? (e.consume(R), U) : K(R);
  }
  function K(R) {
    return Ae(R) ? ((c = K), te(R)) : Ye(R) ? (e.consume(R), K) : D(R);
  }
  function N(R) {
    return R === 45 || tn(R)
      ? (e.consume(R), N)
      : R === 47 || R === 62 || ft(R)
        ? he(R)
        : i(R);
  }
  function he(R) {
    return R === 47
      ? (e.consume(R), D)
      : R === 58 || R === 95 || an(R)
        ? (e.consume(R), F)
        : Ae(R)
          ? ((c = he), te(R))
          : Ye(R)
            ? (e.consume(R), he)
            : D(R);
  }
  function F(R) {
    return R === 45 || R === 46 || R === 58 || R === 95 || tn(R)
      ? (e.consume(R), F)
      : oe(R);
  }
  function oe(R) {
    return R === 61
      ? (e.consume(R), ie)
      : Ae(R)
        ? ((c = oe), te(R))
        : Ye(R)
          ? (e.consume(R), oe)
          : he(R);
  }
  function ie(R) {
    return R === null || R === 60 || R === 61 || R === 62 || R === 96
      ? i(R)
      : R === 34 || R === 39
        ? (e.consume(R), (o = R), Ee)
        : Ae(R)
          ? ((c = ie), te(R))
          : Ye(R)
            ? (e.consume(R), ie)
            : (e.consume(R), le);
  }
  function Ee(R) {
    return R === o
      ? (e.consume(R), (o = void 0), ee)
      : R === null
        ? i(R)
        : Ae(R)
          ? ((c = Ee), te(R))
          : (e.consume(R), Ee);
  }
  function le(R) {
    return R === null ||
      R === 34 ||
      R === 39 ||
      R === 60 ||
      R === 61 ||
      R === 96
      ? i(R)
      : R === 47 || R === 62 || ft(R)
        ? he(R)
        : (e.consume(R), le);
  }
  function ee(R) {
    return R === 47 || R === 62 || ft(R) ? he(R) : i(R);
  }
  function D(R) {
    return R === 62
      ? (e.consume(R), e.exit("htmlTextData"), e.exit("htmlText"), n)
      : i(R);
  }
  function te(R) {
    return (
      e.exit("htmlTextData"),
      e.enter("lineEnding"),
      e.consume(R),
      e.exit("lineEnding"),
      fe
    );
  }
  function fe(R) {
    return Ye(R)
      ? $e(
          e,
          me,
          "linePrefix",
          a.parser.constructs.disable.null.includes("codeIndented")
            ? void 0
            : 4,
        )(R)
      : me(R);
  }
  function me(R) {
    return (e.enter("htmlTextData"), c(R));
  }
}
const Cp = { name: "labelEnd", resolveAll: dO, resolveTo: hO, tokenize: pO },
  uO = { tokenize: mO },
  cO = { tokenize: gO },
  fO = { tokenize: yO };
function dO(e) {
  let n = -1;
  const i = [];
  for (; ++n < e.length; ) {
    const a = e[n][1];
    if (
      (i.push(e[n]),
      a.type === "labelImage" ||
        a.type === "labelLink" ||
        a.type === "labelEnd")
    ) {
      const o = a.type === "labelImage" ? 4 : 2;
      ((a.type = "data"), (n += o));
    }
  }
  return (e.length !== i.length && An(e, 0, e.length, i), e);
}
function hO(e, n) {
  let i = e.length,
    a = 0,
    o,
    u,
    c,
    f;
  for (; i--; )
    if (((o = e[i][1]), u)) {
      if (o.type === "link" || (o.type === "labelLink" && o._inactive)) break;
      e[i][0] === "enter" && o.type === "labelLink" && (o._inactive = !0);
    } else if (c) {
      if (
        e[i][0] === "enter" &&
        (o.type === "labelImage" || o.type === "labelLink") &&
        !o._balanced &&
        ((u = i), o.type !== "labelLink")
      ) {
        a = 2;
        break;
      }
    } else o.type === "labelEnd" && (c = i);
  const h = {
      type: e[u][1].type === "labelLink" ? "link" : "image",
      start: { ...e[u][1].start },
      end: { ...e[e.length - 1][1].end },
    },
    p = { type: "label", start: { ...e[u][1].start }, end: { ...e[c][1].end } },
    y = {
      type: "labelText",
      start: { ...e[u + a + 2][1].end },
      end: { ...e[c - 2][1].start },
    };
  return (
    (f = [
      ["enter", h, n],
      ["enter", p, n],
    ]),
    (f = Vn(f, e.slice(u + 1, u + a + 3))),
    (f = Vn(f, [["enter", y, n]])),
    (f = Vn(
      f,
      cc(n.parser.constructs.insideSpan.null, e.slice(u + a + 4, c - 3), n),
    )),
    (f = Vn(f, [["exit", y, n], e[c - 2], e[c - 1], ["exit", p, n]])),
    (f = Vn(f, e.slice(c + 1))),
    (f = Vn(f, [["exit", h, n]])),
    An(e, u, e.length, f),
    e
  );
}
function pO(e, n, i) {
  const a = this;
  let o = a.events.length,
    u,
    c;
  for (; o--; )
    if (
      (a.events[o][1].type === "labelImage" ||
        a.events[o][1].type === "labelLink") &&
      !a.events[o][1]._balanced
    ) {
      u = a.events[o][1];
      break;
    }
  return f;
  function f(x) {
    return u
      ? u._inactive
        ? g(x)
        : ((c = a.parser.defined.includes(
            ir(a.sliceSerialize({ start: u.end, end: a.now() })),
          )),
          e.enter("labelEnd"),
          e.enter("labelMarker"),
          e.consume(x),
          e.exit("labelMarker"),
          e.exit("labelEnd"),
          h)
      : i(x);
  }
  function h(x) {
    return x === 40
      ? e.attempt(uO, y, c ? y : g)(x)
      : x === 91
        ? e.attempt(cO, y, c ? p : g)(x)
        : c
          ? y(x)
          : g(x);
  }
  function p(x) {
    return e.attempt(fO, y, g)(x);
  }
  function y(x) {
    return n(x);
  }
  function g(x) {
    return ((u._balanced = !0), i(x));
  }
}
function mO(e, n, i) {
  return a;
  function a(g) {
    return (
      e.enter("resource"),
      e.enter("resourceMarker"),
      e.consume(g),
      e.exit("resourceMarker"),
      o
    );
  }
  function o(g) {
    return ft(g) ? vo(e, u)(g) : u(g);
  }
  function u(g) {
    return g === 41
      ? y(g)
      : Cv(
          e,
          c,
          f,
          "resourceDestination",
          "resourceDestinationLiteral",
          "resourceDestinationLiteralMarker",
          "resourceDestinationRaw",
          "resourceDestinationString",
          32,
        )(g);
  }
  function c(g) {
    return ft(g) ? vo(e, h)(g) : y(g);
  }
  function f(g) {
    return i(g);
  }
  function h(g) {
    return g === 34 || g === 39 || g === 40
      ? Tv(
          e,
          p,
          i,
          "resourceTitle",
          "resourceTitleMarker",
          "resourceTitleString",
        )(g)
      : y(g);
  }
  function p(g) {
    return ft(g) ? vo(e, y)(g) : y(g);
  }
  function y(g) {
    return g === 41
      ? (e.enter("resourceMarker"),
        e.consume(g),
        e.exit("resourceMarker"),
        e.exit("resource"),
        n)
      : i(g);
  }
}
function gO(e, n, i) {
  const a = this;
  return o;
  function o(f) {
    return _v.call(
      a,
      e,
      u,
      c,
      "reference",
      "referenceMarker",
      "referenceString",
    )(f);
  }
  function u(f) {
    return a.parser.defined.includes(
      ir(a.sliceSerialize(a.events[a.events.length - 1][1]).slice(1, -1)),
    )
      ? n(f)
      : i(f);
  }
  function c(f) {
    return i(f);
  }
}
function yO(e, n, i) {
  return a;
  function a(u) {
    return (
      e.enter("reference"),
      e.enter("referenceMarker"),
      e.consume(u),
      e.exit("referenceMarker"),
      o
    );
  }
  function o(u) {
    return u === 93
      ? (e.enter("referenceMarker"),
        e.consume(u),
        e.exit("referenceMarker"),
        e.exit("reference"),
        n)
      : i(u);
  }
}
const bO = { name: "labelStartImage", resolveAll: Cp.resolveAll, tokenize: xO };
function xO(e, n, i) {
  const a = this;
  return o;
  function o(f) {
    return (
      e.enter("labelImage"),
      e.enter("labelImageMarker"),
      e.consume(f),
      e.exit("labelImageMarker"),
      u
    );
  }
  function u(f) {
    return f === 91
      ? (e.enter("labelMarker"),
        e.consume(f),
        e.exit("labelMarker"),
        e.exit("labelImage"),
        c)
      : i(f);
  }
  function c(f) {
    return f === 94 && "_hiddenFootnoteSupport" in a.parser.constructs
      ? i(f)
      : n(f);
  }
}
const vO = { name: "labelStartLink", resolveAll: Cp.resolveAll, tokenize: SO };
function SO(e, n, i) {
  const a = this;
  return o;
  function o(c) {
    return (
      e.enter("labelLink"),
      e.enter("labelMarker"),
      e.consume(c),
      e.exit("labelMarker"),
      e.exit("labelLink"),
      u
    );
  }
  function u(c) {
    return c === 94 && "_hiddenFootnoteSupport" in a.parser.constructs
      ? i(c)
      : n(c);
  }
}
const Jd = { name: "lineEnding", tokenize: wO };
function wO(e, n) {
  return i;
  function i(a) {
    return (
      e.enter("lineEnding"),
      e.consume(a),
      e.exit("lineEnding"),
      $e(e, n, "linePrefix")
    );
  }
}
const _u = { name: "thematicBreak", tokenize: EO };
function EO(e, n, i) {
  let a = 0,
    o;
  return u;
  function u(p) {
    return (e.enter("thematicBreak"), c(p));
  }
  function c(p) {
    return ((o = p), f(p));
  }
  function f(p) {
    return p === o
      ? (e.enter("thematicBreakSequence"), h(p))
      : a >= 3 && (p === null || Ae(p))
        ? (e.exit("thematicBreak"), n(p))
        : i(p);
  }
  function h(p) {
    return p === o
      ? (e.consume(p), a++, h)
      : (e.exit("thematicBreakSequence"),
        Ye(p) ? $e(e, f, "whitespace")(p) : f(p));
  }
}
const mn = {
    continuation: { tokenize: TO },
    exit: AO,
    name: "list",
    tokenize: _O,
  },
  kO = { partial: !0, tokenize: OO },
  CO = { partial: !0, tokenize: RO };
function _O(e, n, i) {
  const a = this,
    o = a.events[a.events.length - 1];
  let u =
      o && o[1].type === "linePrefix"
        ? o[2].sliceSerialize(o[1], !0).length
        : 0,
    c = 0;
  return f;
  function f(v) {
    const S =
      a.containerState.type ||
      (v === 42 || v === 43 || v === 45 ? "listUnordered" : "listOrdered");
    if (
      S === "listUnordered"
        ? !a.containerState.marker || v === a.containerState.marker
        : jh(v)
    ) {
      if (
        (a.containerState.type ||
          ((a.containerState.type = S), e.enter(S, { _container: !0 })),
        S === "listUnordered")
      )
        return (
          e.enter("listItemPrefix"),
          v === 42 || v === 45 ? e.check(_u, i, p)(v) : p(v)
        );
      if (!a.interrupt || v === 49)
        return (e.enter("listItemPrefix"), e.enter("listItemValue"), h(v));
    }
    return i(v);
  }
  function h(v) {
    return jh(v) && ++c < 10
      ? (e.consume(v), h)
      : (!a.interrupt || c < 2) &&
          (a.containerState.marker
            ? v === a.containerState.marker
            : v === 41 || v === 46)
        ? (e.exit("listItemValue"), p(v))
        : i(v);
  }
  function p(v) {
    return (
      e.enter("listItemMarker"),
      e.consume(v),
      e.exit("listItemMarker"),
      (a.containerState.marker = a.containerState.marker || v),
      e.check(Vo, a.interrupt ? i : y, e.attempt(kO, x, g))
    );
  }
  function y(v) {
    return ((a.containerState.initialBlankLine = !0), u++, x(v));
  }
  function g(v) {
    return Ye(v)
      ? (e.enter("listItemPrefixWhitespace"),
        e.consume(v),
        e.exit("listItemPrefixWhitespace"),
        x)
      : i(v);
  }
  function x(v) {
    return (
      (a.containerState.size =
        u + a.sliceSerialize(e.exit("listItemPrefix"), !0).length),
      n(v)
    );
  }
}
function TO(e, n, i) {
  const a = this;
  return ((a.containerState._closeFlow = void 0), e.check(Vo, o, u));
  function o(f) {
    return (
      (a.containerState.furtherBlankLines =
        a.containerState.furtherBlankLines ||
        a.containerState.initialBlankLine),
      $e(e, n, "listItemIndent", a.containerState.size + 1)(f)
    );
  }
  function u(f) {
    return a.containerState.furtherBlankLines || !Ye(f)
      ? ((a.containerState.furtherBlankLines = void 0),
        (a.containerState.initialBlankLine = void 0),
        c(f))
      : ((a.containerState.furtherBlankLines = void 0),
        (a.containerState.initialBlankLine = void 0),
        e.attempt(CO, n, c)(f));
  }
  function c(f) {
    return (
      (a.containerState._closeFlow = !0),
      (a.interrupt = void 0),
      $e(
        e,
        e.attempt(mn, n, i),
        "linePrefix",
        a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
      )(f)
    );
  }
}
function RO(e, n, i) {
  const a = this;
  return $e(e, o, "listItemIndent", a.containerState.size + 1);
  function o(u) {
    const c = a.events[a.events.length - 1];
    return c &&
      c[1].type === "listItemIndent" &&
      c[2].sliceSerialize(c[1], !0).length === a.containerState.size
      ? n(u)
      : i(u);
  }
}
function AO(e) {
  e.exit(this.containerState.type);
}
function OO(e, n, i) {
  const a = this;
  return $e(
    e,
    o,
    "listItemPrefixWhitespace",
    a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5,
  );
  function o(u) {
    const c = a.events[a.events.length - 1];
    return !Ye(u) && c && c[1].type === "listItemPrefixWhitespace"
      ? n(u)
      : i(u);
  }
}
const o1 = { name: "setextUnderline", resolveTo: zO, tokenize: DO };
function zO(e, n) {
  let i = e.length,
    a,
    o,
    u;
  for (; i--; )
    if (e[i][0] === "enter") {
      if (e[i][1].type === "content") {
        a = i;
        break;
      }
      e[i][1].type === "paragraph" && (o = i);
    } else
      (e[i][1].type === "content" && e.splice(i, 1),
        !u && e[i][1].type === "definition" && (u = i));
  const c = {
    type: "setextHeading",
    start: { ...e[a][1].start },
    end: { ...e[e.length - 1][1].end },
  };
  return (
    (e[o][1].type = "setextHeadingText"),
    u
      ? (e.splice(o, 0, ["enter", c, n]),
        e.splice(u + 1, 0, ["exit", e[a][1], n]),
        (e[a][1].end = { ...e[u][1].end }))
      : (e[a][1] = c),
    e.push(["exit", c, n]),
    e
  );
}
function DO(e, n, i) {
  const a = this;
  let o;
  return u;
  function u(p) {
    let y = a.events.length,
      g;
    for (; y--; )
      if (
        a.events[y][1].type !== "lineEnding" &&
        a.events[y][1].type !== "linePrefix" &&
        a.events[y][1].type !== "content"
      ) {
        g = a.events[y][1].type === "paragraph";
        break;
      }
    return !a.parser.lazy[a.now().line] && (a.interrupt || g)
      ? (e.enter("setextHeadingLine"), (o = p), c(p))
      : i(p);
  }
  function c(p) {
    return (e.enter("setextHeadingLineSequence"), f(p));
  }
  function f(p) {
    return p === o
      ? (e.consume(p), f)
      : (e.exit("setextHeadingLineSequence"),
        Ye(p) ? $e(e, h, "lineSuffix")(p) : h(p));
  }
  function h(p) {
    return p === null || Ae(p) ? (e.exit("setextHeadingLine"), n(p)) : i(p);
  }
}
const NO = { tokenize: MO };
function MO(e) {
  const n = this,
    i = e.attempt(
      Vo,
      a,
      e.attempt(
        this.parser.constructs.flowInitial,
        o,
        $e(
          e,
          e.attempt(this.parser.constructs.flow, o, e.attempt(HA, o)),
          "linePrefix",
        ),
      ),
    );
  return i;
  function a(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return (
      e.enter("lineEndingBlank"),
      e.consume(u),
      e.exit("lineEndingBlank"),
      (n.currentConstruct = void 0),
      i
    );
  }
  function o(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(u),
      e.exit("lineEnding"),
      (n.currentConstruct = void 0),
      i
    );
  }
}
const jO = { resolveAll: Av() },
  LO = Rv("string"),
  BO = Rv("text");
function Rv(e) {
  return { resolveAll: Av(e === "text" ? UO : void 0), tokenize: n };
  function n(i) {
    const a = this,
      o = this.parser.constructs[e],
      u = i.attempt(o, c, f);
    return c;
    function c(y) {
      return p(y) ? u(y) : f(y);
    }
    function f(y) {
      if (y === null) {
        i.consume(y);
        return;
      }
      return (i.enter("data"), i.consume(y), h);
    }
    function h(y) {
      return p(y) ? (i.exit("data"), u(y)) : (i.consume(y), h);
    }
    function p(y) {
      if (y === null) return !0;
      const g = o[y];
      let x = -1;
      if (g)
        for (; ++x < g.length; ) {
          const v = g[x];
          if (!v.previous || v.previous.call(a, a.previous)) return !0;
        }
      return !1;
    }
  }
}
function Av(e) {
  return n;
  function n(i, a) {
    let o = -1,
      u;
    for (; ++o <= i.length; )
      u === void 0
        ? i[o] && i[o][1].type === "data" && ((u = o), o++)
        : (!i[o] || i[o][1].type !== "data") &&
          (o !== u + 2 &&
            ((i[u][1].end = i[o - 1][1].end),
            i.splice(u + 2, o - u - 2),
            (o = u + 2)),
          (u = void 0));
    return e ? e(i, a) : i;
  }
}
function UO(e, n) {
  let i = 0;
  for (; ++i <= e.length; )
    if (
      (i === e.length || e[i][1].type === "lineEnding") &&
      e[i - 1][1].type === "data"
    ) {
      const a = e[i - 1][1],
        o = n.sliceStream(a);
      let u = o.length,
        c = -1,
        f = 0,
        h;
      for (; u--; ) {
        const p = o[u];
        if (typeof p == "string") {
          for (c = p.length; p.charCodeAt(c - 1) === 32; ) (f++, c--);
          if (c) break;
          c = -1;
        } else if (p === -2) ((h = !0), f++);
        else if (p !== -1) {
          u++;
          break;
        }
      }
      if ((n._contentTypeTextTrailing && i === e.length && (f = 0), f)) {
        const p = {
          type:
            i === e.length || h || f < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: u ? c : a.start._bufferIndex + c,
            _index: a.start._index + u,
            line: a.end.line,
            column: a.end.column - f,
            offset: a.end.offset - f,
          },
          end: { ...a.end },
        };
        ((a.end = { ...p.start }),
          a.start.offset === a.end.offset
            ? Object.assign(a, p)
            : (e.splice(i, 0, ["enter", p, n], ["exit", p, n]), (i += 2)));
      }
      i++;
    }
  return e;
}
const HO = {
    42: mn,
    43: mn,
    45: mn,
    48: mn,
    49: mn,
    50: mn,
    51: mn,
    52: mn,
    53: mn,
    54: mn,
    55: mn,
    56: mn,
    57: mn,
    62: Sv,
  },
  qO = { 91: YA },
  FO = { [-2]: $d, [-1]: $d, 32: $d },
  PO = {
    35: ZA,
    42: _u,
    45: [o1, _u],
    60: eO,
    61: o1,
    95: _u,
    96: a1,
    126: a1,
  },
  VO = { 38: Ev, 92: wv },
  YO = {
    [-5]: Jd,
    [-4]: Jd,
    [-3]: Jd,
    33: bO,
    38: Ev,
    42: Lh,
    60: [vA, oO],
    91: vO,
    92: [QA, wv],
    93: Cp,
    95: Lh,
    96: NA,
  },
  IO = { null: [Lh, jO] },
  XO = { null: [42, 95] },
  GO = { null: [] },
  QO = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: XO,
        contentInitial: qO,
        disable: GO,
        document: HO,
        flow: PO,
        flowInitial: FO,
        insideSpan: IO,
        string: VO,
        text: YO,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
function KO(e, n, i) {
  let a = {
    _bufferIndex: -1,
    _index: 0,
    line: (i && i.line) || 1,
    column: (i && i.column) || 1,
    offset: (i && i.offset) || 0,
  };
  const o = {},
    u = [];
  let c = [],
    f = [];
  const h = {
      attempt: K(Z),
      check: K(U),
      consume: j,
      enter: M,
      exit: $,
      interrupt: K(U, { interrupt: !0 }),
    },
    p = {
      code: null,
      containerState: {},
      defineSkip: _,
      events: [],
      now: S,
      parser: e,
      previous: null,
      sliceSerialize: x,
      sliceStream: v,
      write: g,
    };
  let y = n.tokenize.call(p, h);
  return (n.resolveAll && u.push(n), p);
  function g(oe) {
    return (
      (c = Vn(c, oe)),
      k(),
      c[c.length - 1] !== null
        ? []
        : (N(n, 0), (p.events = cc(u, p.events, p)), p.events)
    );
  }
  function x(oe, ie) {
    return $O(v(oe), ie);
  }
  function v(oe) {
    return ZO(c, oe);
  }
  function S() {
    const {
      _bufferIndex: oe,
      _index: ie,
      line: Ee,
      column: le,
      offset: ee,
    } = a;
    return { _bufferIndex: oe, _index: ie, line: Ee, column: le, offset: ee };
  }
  function _(oe) {
    ((o[oe.line] = oe.column), F());
  }
  function k() {
    let oe;
    for (; a._index < c.length; ) {
      const ie = c[a._index];
      if (typeof ie == "string")
        for (
          oe = a._index, a._bufferIndex < 0 && (a._bufferIndex = 0);
          a._index === oe && a._bufferIndex < ie.length;
        )
          T(ie.charCodeAt(a._bufferIndex));
      else T(ie);
    }
  }
  function T(oe) {
    y = y(oe);
  }
  function j(oe) {
    (Ae(oe)
      ? (a.line++, (a.column = 1), (a.offset += oe === -3 ? 2 : 1), F())
      : oe !== -1 && (a.column++, a.offset++),
      a._bufferIndex < 0
        ? a._index++
        : (a._bufferIndex++,
          a._bufferIndex === c[a._index].length &&
            ((a._bufferIndex = -1), a._index++)),
      (p.previous = oe));
  }
  function M(oe, ie) {
    const Ee = ie || {};
    return (
      (Ee.type = oe),
      (Ee.start = S()),
      p.events.push(["enter", Ee, p]),
      f.push(Ee),
      Ee
    );
  }
  function $(oe) {
    const ie = f.pop();
    return ((ie.end = S()), p.events.push(["exit", ie, p]), ie);
  }
  function Z(oe, ie) {
    N(oe, ie.from);
  }
  function U(oe, ie) {
    ie.restore();
  }
  function K(oe, ie) {
    return Ee;
    function Ee(le, ee, D) {
      let te, fe, me, R;
      return Array.isArray(le) ? G(le) : "tokenize" in le ? G([le]) : O(le);
      function O(be) {
        return Ne;
        function Ne(rt) {
          const Ke = rt !== null && be[rt],
            on = rt !== null && be.null,
            Xn = [
              ...(Array.isArray(Ke) ? Ke : Ke ? [Ke] : []),
              ...(Array.isArray(on) ? on : on ? [on] : []),
            ];
          return G(Xn)(rt);
        }
      }
      function G(be) {
        return ((te = be), (fe = 0), be.length === 0 ? D : C(be[fe]));
      }
      function C(be) {
        return Ne;
        function Ne(rt) {
          return (
            (R = he()),
            (me = be),
            be.partial || (p.currentConstruct = be),
            be.name && p.parser.constructs.disable.null.includes(be.name)
              ? Se()
              : be.tokenize.call(
                  ie ? Object.assign(Object.create(p), ie) : p,
                  h,
                  se,
                  Se,
                )(rt)
          );
        }
      }
      function se(be) {
        return (oe(me, R), ee);
      }
      function Se(be) {
        return (R.restore(), ++fe < te.length ? C(te[fe]) : D);
      }
    }
  }
  function N(oe, ie) {
    (oe.resolveAll && !u.includes(oe) && u.push(oe),
      oe.resolve &&
        An(
          p.events,
          ie,
          p.events.length - ie,
          oe.resolve(p.events.slice(ie), p),
        ),
      oe.resolveTo && (p.events = oe.resolveTo(p.events, p)));
  }
  function he() {
    const oe = S(),
      ie = p.previous,
      Ee = p.currentConstruct,
      le = p.events.length,
      ee = Array.from(f);
    return { from: le, restore: D };
    function D() {
      ((a = oe),
        (p.previous = ie),
        (p.currentConstruct = Ee),
        (p.events.length = le),
        (f = ee),
        F());
    }
  }
  function F() {
    a.line in o &&
      a.column < 2 &&
      ((a.column = o[a.line]), (a.offset += o[a.line] - 1));
  }
}
function ZO(e, n) {
  const i = n.start._index,
    a = n.start._bufferIndex,
    o = n.end._index,
    u = n.end._bufferIndex;
  let c;
  if (i === o) c = [e[i].slice(a, u)];
  else {
    if (((c = e.slice(i, o)), a > -1)) {
      const f = c[0];
      typeof f == "string" ? (c[0] = f.slice(a)) : c.shift();
    }
    u > 0 && c.push(e[o].slice(0, u));
  }
  return c;
}
function $O(e, n) {
  let i = -1;
  const a = [];
  let o;
  for (; ++i < e.length; ) {
    const u = e[i];
    let c;
    if (typeof u == "string") c = u;
    else
      switch (u) {
        case -5: {
          c = "\r";
          break;
        }
        case -4: {
          c = `
`;
          break;
        }
        case -3: {
          c = `\r
`;
          break;
        }
        case -2: {
          c = n ? " " : "	";
          break;
        }
        case -1: {
          if (!n && o) continue;
          c = " ";
          break;
        }
        default:
          c = String.fromCharCode(u);
      }
    ((o = u === -2), a.push(c));
  }
  return a.join("");
}
function JO(e) {
  const a = {
    constructs: xv([QO, ...((e || {}).extensions || [])]),
    content: o(hA),
    defined: [],
    document: o(mA),
    flow: o(NO),
    lazy: {},
    string: o(LO),
    text: o(BO),
  };
  return a;
  function o(u) {
    return c;
    function c(f) {
      return KO(a, u, f);
    }
  }
}
function WO(e) {
  for (; !kv(e); );
  return e;
}
const s1 = /[\0\t\n\r]/g;
function e4() {
  let e = 1,
    n = "",
    i = !0,
    a;
  return o;
  function o(u, c, f) {
    const h = [];
    let p, y, g, x, v;
    for (
      u =
        n +
        (typeof u == "string"
          ? u.toString()
          : new TextDecoder(c || void 0).decode(u)),
        g = 0,
        n = "",
        i && (u.charCodeAt(0) === 65279 && g++, (i = void 0));
      g < u.length;
    ) {
      if (
        ((s1.lastIndex = g),
        (p = s1.exec(u)),
        (x = p && p.index !== void 0 ? p.index : u.length),
        (v = u.charCodeAt(x)),
        !p)
      ) {
        n = u.slice(g);
        break;
      }
      if (v === 10 && g === x && a) (h.push(-3), (a = void 0));
      else
        switch (
          (a && (h.push(-5), (a = void 0)),
          g < x && (h.push(u.slice(g, x)), (e += x - g)),
          v)
        ) {
          case 0: {
            (h.push(65533), e++);
            break;
          }
          case 9: {
            for (y = Math.ceil(e / 4) * 4, h.push(-2); e++ < y; ) h.push(-1);
            break;
          }
          case 10: {
            (h.push(-4), (e = 1));
            break;
          }
          default:
            ((a = !0), (e = 1));
        }
      g = x + 1;
    }
    return (f && (a && h.push(-5), n && h.push(n), h.push(null)), h);
  }
}
const t4 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function n4(e) {
  return e.replace(t4, r4);
}
function r4(e, n, i) {
  if (n) return n;
  if (i.charCodeAt(0) === 35) {
    const o = i.charCodeAt(1),
      u = o === 120 || o === 88;
    return vv(i.slice(u ? 2 : 1), u ? 16 : 10);
  }
  return kp(i) || e;
}
const Ov = {}.hasOwnProperty;
function i4(e, n, i) {
  return (
    n && typeof n == "object" && ((i = n), (n = void 0)),
    a4(i)(
      WO(
        JO(i)
          .document()
          .write(e4()(e, n, !0)),
      ),
    )
  );
}
function a4(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: u(Zr),
      autolinkProtocol: he,
      autolinkEmail: he,
      atxHeading: u(Sr),
      blockQuote: u(on),
      characterEscape: he,
      characterReference: he,
      codeFenced: u(Xn),
      codeFencedFenceInfo: c,
      codeFencedFenceMeta: c,
      codeIndented: u(Xn, c),
      codeText: u(Oi, c),
      codeTextData: he,
      data: he,
      codeFlowValue: he,
      definition: u(Et),
      definitionDestinationString: c,
      definitionLabelString: c,
      definitionTitleString: c,
      emphasis: u(Kt),
      hardBreakEscape: u(Kr),
      hardBreakTrailing: u(Kr),
      htmlFlow: u(zn, c),
      htmlFlowData: he,
      htmlText: u(zn, c),
      htmlTextData: he,
      image: u(sa),
      label: c,
      link: u(Zr),
      listItem: u(zi),
      listItemValue: x,
      listOrdered: u(wr, g),
      listUnordered: u(wr),
      paragraph: u(fl),
      reference: C,
      referenceString: c,
      resourceDestinationString: c,
      resourceTitleString: c,
      setextHeading: u(Sr),
      strong: u(dl),
      thematicBreak: u(Gn),
    },
    exit: {
      atxHeading: h(),
      atxHeadingSequence: Z,
      autolink: h(),
      autolinkEmail: Ke,
      autolinkProtocol: rt,
      blockQuote: h(),
      characterEscapeValue: F,
      characterReferenceMarkerHexadecimal: Se,
      characterReferenceMarkerNumeric: Se,
      characterReferenceValue: be,
      characterReference: Ne,
      codeFenced: h(k),
      codeFencedFence: _,
      codeFencedFenceInfo: v,
      codeFencedFenceMeta: S,
      codeFlowValue: F,
      codeIndented: h(T),
      codeText: h(ee),
      codeTextData: F,
      data: F,
      definition: h(),
      definitionDestinationString: $,
      definitionLabelString: j,
      definitionTitleString: M,
      emphasis: h(),
      hardBreakEscape: h(ie),
      hardBreakTrailing: h(ie),
      htmlFlow: h(Ee),
      htmlFlowData: F,
      htmlText: h(le),
      htmlTextData: F,
      image: h(te),
      label: me,
      labelText: fe,
      lineEnding: oe,
      link: h(D),
      listItem: h(),
      listOrdered: h(),
      listUnordered: h(),
      paragraph: h(),
      referenceString: se,
      resourceDestinationString: R,
      resourceTitleString: O,
      resource: G,
      setextHeading: h(N),
      setextHeadingLineSequence: K,
      setextHeadingText: U,
      strong: h(),
      thematicBreak: h(),
    },
  };
  zv(n, (e || {}).mdastExtensions || []);
  const i = {};
  return a;
  function a(J) {
    let de = { type: "root", children: [] };
    const Re = {
        stack: [de],
        tokenStack: [],
        config: n,
        enter: f,
        exit: p,
        buffer: c,
        resume: y,
        data: i,
      },
      De = [];
    let Ue = -1;
    for (; ++Ue < J.length; )
      if (J[Ue][1].type === "listOrdered" || J[Ue][1].type === "listUnordered")
        if (J[Ue][0] === "enter") De.push(Ue);
        else {
          const Zt = De.pop();
          Ue = o(J, Zt, Ue);
        }
    for (Ue = -1; ++Ue < J.length; ) {
      const Zt = n[J[Ue][0]];
      Ov.call(Zt, J[Ue][1].type) &&
        Zt[J[Ue][1].type].call(
          Object.assign({ sliceSerialize: J[Ue][2].sliceSerialize }, Re),
          J[Ue][1],
        );
    }
    if (Re.tokenStack.length > 0) {
      const Zt = Re.tokenStack[Re.tokenStack.length - 1];
      (Zt[1] || u1).call(Re, void 0, Zt[0]);
    }
    for (
      de.position = {
        start: Ei(
          J.length > 0 ? J[0][1].start : { line: 1, column: 1, offset: 0 },
        ),
        end: Ei(
          J.length > 0
            ? J[J.length - 2][1].end
            : { line: 1, column: 1, offset: 0 },
        ),
      },
        Ue = -1;
      ++Ue < n.transforms.length;
    )
      de = n.transforms[Ue](de) || de;
    return de;
  }
  function o(J, de, Re) {
    let De = de - 1,
      Ue = -1,
      Zt = !1,
      Qn,
      Bt,
      kt,
      bt;
    for (; ++De <= Re; ) {
      const nt = J[De];
      switch (nt[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          (nt[0] === "enter" ? Ue++ : Ue--, (bt = void 0));
          break;
        }
        case "lineEndingBlank": {
          nt[0] === "enter" &&
            (Qn && !bt && !Ue && !kt && (kt = De), (bt = void 0));
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          bt = void 0;
      }
      if (
        (!Ue && nt[0] === "enter" && nt[1].type === "listItemPrefix") ||
        (Ue === -1 &&
          nt[0] === "exit" &&
          (nt[1].type === "listUnordered" || nt[1].type === "listOrdered"))
      ) {
        if (Qn) {
          let Kn = De;
          for (Bt = void 0; Kn--; ) {
            const sn = J[Kn];
            if (
              sn[1].type === "lineEnding" ||
              sn[1].type === "lineEndingBlank"
            ) {
              if (sn[0] === "exit") continue;
              (Bt && ((J[Bt][1].type = "lineEndingBlank"), (Zt = !0)),
                (sn[1].type = "lineEnding"),
                (Bt = Kn));
            } else if (
              !(
                sn[1].type === "linePrefix" ||
                sn[1].type === "blockQuotePrefix" ||
                sn[1].type === "blockQuotePrefixWhitespace" ||
                sn[1].type === "blockQuoteMarker" ||
                sn[1].type === "listItemIndent"
              )
            )
              break;
          }
          (kt && (!Bt || kt < Bt) && (Qn._spread = !0),
            (Qn.end = Object.assign({}, Bt ? J[Bt][1].start : nt[1].end)),
            J.splice(Bt || De, 0, ["exit", Qn, nt[2]]),
            De++,
            Re++);
        }
        if (nt[1].type === "listItemPrefix") {
          const Kn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, nt[1].start),
            end: void 0,
          };
          ((Qn = Kn),
            J.splice(De, 0, ["enter", Kn, nt[2]]),
            De++,
            Re++,
            (kt = void 0),
            (bt = !0));
        }
      }
    }
    return ((J[de][1]._spread = Zt), Re);
  }
  function u(J, de) {
    return Re;
    function Re(De) {
      (f.call(this, J(De), De), de && de.call(this, De));
    }
  }
  function c() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function f(J, de, Re) {
    (this.stack[this.stack.length - 1].children.push(J),
      this.stack.push(J),
      this.tokenStack.push([de, Re || void 0]),
      (J.position = { start: Ei(de.start), end: void 0 }));
  }
  function h(J) {
    return de;
    function de(Re) {
      (J && J.call(this, Re), p.call(this, Re));
    }
  }
  function p(J, de) {
    const Re = this.stack.pop(),
      De = this.tokenStack.pop();
    if (De)
      De[0].type !== J.type &&
        (de ? de.call(this, J, De[0]) : (De[1] || u1).call(this, J, De[0]));
    else
      throw new Error(
        "Cannot close `" +
          J.type +
          "` (" +
          xo({ start: J.start, end: J.end }) +
          "): it’s not open",
      );
    Re.position.end = Ei(J.end);
  }
  function y() {
    return Ep(this.stack.pop());
  }
  function g() {
    this.data.expectingFirstListItemValue = !0;
  }
  function x(J) {
    if (this.data.expectingFirstListItemValue) {
      const de = this.stack[this.stack.length - 2];
      ((de.start = Number.parseInt(this.sliceSerialize(J), 10)),
        (this.data.expectingFirstListItemValue = void 0));
    }
  }
  function v() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.lang = J;
  }
  function S() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.meta = J;
  }
  function _() {
    this.data.flowCodeInside ||
      (this.buffer(), (this.data.flowCodeInside = !0));
  }
  function k() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    ((de.value = J.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")),
      (this.data.flowCodeInside = void 0));
  }
  function T() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.value = J.replace(/(\r?\n|\r)$/g, "");
  }
  function j(J) {
    const de = this.resume(),
      Re = this.stack[this.stack.length - 1];
    ((Re.label = de),
      (Re.identifier = ir(this.sliceSerialize(J)).toLowerCase()));
  }
  function M() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.title = J;
  }
  function $() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.url = J;
  }
  function Z(J) {
    const de = this.stack[this.stack.length - 1];
    if (!de.depth) {
      const Re = this.sliceSerialize(J).length;
      de.depth = Re;
    }
  }
  function U() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function K(J) {
    const de = this.stack[this.stack.length - 1];
    de.depth = this.sliceSerialize(J).codePointAt(0) === 61 ? 1 : 2;
  }
  function N() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function he(J) {
    const Re = this.stack[this.stack.length - 1].children;
    let De = Re[Re.length - 1];
    ((!De || De.type !== "text") &&
      ((De = Vt()),
      (De.position = { start: Ei(J.start), end: void 0 }),
      Re.push(De)),
      this.stack.push(De));
  }
  function F(J) {
    const de = this.stack.pop();
    ((de.value += this.sliceSerialize(J)), (de.position.end = Ei(J.end)));
  }
  function oe(J) {
    const de = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const Re = de.children[de.children.length - 1];
      ((Re.position.end = Ei(J.end)), (this.data.atHardBreak = void 0));
      return;
    }
    !this.data.setextHeadingSlurpLineEnding &&
      n.canContainEols.includes(de.type) &&
      (he.call(this, J), F.call(this, J));
  }
  function ie() {
    this.data.atHardBreak = !0;
  }
  function Ee() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.value = J;
  }
  function le() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.value = J;
  }
  function ee() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.value = J;
  }
  function D() {
    const J = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const de = this.data.referenceType || "shortcut";
      ((J.type += "Reference"),
        (J.referenceType = de),
        delete J.url,
        delete J.title);
    } else (delete J.identifier, delete J.label);
    this.data.referenceType = void 0;
  }
  function te() {
    const J = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const de = this.data.referenceType || "shortcut";
      ((J.type += "Reference"),
        (J.referenceType = de),
        delete J.url,
        delete J.title);
    } else (delete J.identifier, delete J.label);
    this.data.referenceType = void 0;
  }
  function fe(J) {
    const de = this.sliceSerialize(J),
      Re = this.stack[this.stack.length - 2];
    ((Re.label = n4(de)), (Re.identifier = ir(de).toLowerCase()));
  }
  function me() {
    const J = this.stack[this.stack.length - 1],
      de = this.resume(),
      Re = this.stack[this.stack.length - 1];
    if (((this.data.inReference = !0), Re.type === "link")) {
      const De = J.children;
      Re.children = De;
    } else Re.alt = de;
  }
  function R() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.url = J;
  }
  function O() {
    const J = this.resume(),
      de = this.stack[this.stack.length - 1];
    de.title = J;
  }
  function G() {
    this.data.inReference = void 0;
  }
  function C() {
    this.data.referenceType = "collapsed";
  }
  function se(J) {
    const de = this.resume(),
      Re = this.stack[this.stack.length - 1];
    ((Re.label = de),
      (Re.identifier = ir(this.sliceSerialize(J)).toLowerCase()),
      (this.data.referenceType = "full"));
  }
  function Se(J) {
    this.data.characterReferenceType = J.type;
  }
  function be(J) {
    const de = this.sliceSerialize(J),
      Re = this.data.characterReferenceType;
    let De;
    Re
      ? ((De = vv(de, Re === "characterReferenceMarkerNumeric" ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : (De = kp(de));
    const Ue = this.stack[this.stack.length - 1];
    Ue.value += De;
  }
  function Ne(J) {
    const de = this.stack.pop();
    de.position.end = Ei(J.end);
  }
  function rt(J) {
    F.call(this, J);
    const de = this.stack[this.stack.length - 1];
    de.url = this.sliceSerialize(J);
  }
  function Ke(J) {
    F.call(this, J);
    const de = this.stack[this.stack.length - 1];
    de.url = "mailto:" + this.sliceSerialize(J);
  }
  function on() {
    return { type: "blockquote", children: [] };
  }
  function Xn() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function Oi() {
    return { type: "inlineCode", value: "" };
  }
  function Et() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: "",
    };
  }
  function Kt() {
    return { type: "emphasis", children: [] };
  }
  function Sr() {
    return { type: "heading", depth: 0, children: [] };
  }
  function Kr() {
    return { type: "break" };
  }
  function zn() {
    return { type: "html", value: "" };
  }
  function sa() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Zr() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function wr(J) {
    return {
      type: "list",
      ordered: J.type === "listOrdered",
      start: null,
      spread: J._spread,
      children: [],
    };
  }
  function zi(J) {
    return { type: "listItem", spread: J._spread, checked: null, children: [] };
  }
  function fl() {
    return { type: "paragraph", children: [] };
  }
  function dl() {
    return { type: "strong", children: [] };
  }
  function Vt() {
    return { type: "text", value: "" };
  }
  function Gn() {
    return { type: "thematicBreak" };
  }
}
function Ei(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function zv(e, n) {
  let i = -1;
  for (; ++i < n.length; ) {
    const a = n[i];
    Array.isArray(a) ? zv(e, a) : l4(e, a);
  }
}
function l4(e, n) {
  let i;
  for (i in n)
    if (Ov.call(n, i))
      switch (i) {
        case "canContainEols": {
          const a = n[i];
          a && e[i].push(...a);
          break;
        }
        case "transforms": {
          const a = n[i];
          a && e[i].push(...a);
          break;
        }
        case "enter":
        case "exit": {
          const a = n[i];
          a && Object.assign(e[i], a);
          break;
        }
      }
}
function u1(e, n) {
  throw e
    ? new Error(
        "Cannot close `" +
          e.type +
          "` (" +
          xo({ start: e.start, end: e.end }) +
          "): a different token (`" +
          n.type +
          "`, " +
          xo({ start: n.start, end: n.end }) +
          ") is open",
      )
    : new Error(
        "Cannot close document, a token (`" +
          n.type +
          "`, " +
          xo({ start: n.start, end: n.end }) +
          ") is still open",
      );
}
function o4(e) {
  const n = this;
  n.parser = i;
  function i(a) {
    return i4(a, {
      ...n.data("settings"),
      ...e,
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || [],
    });
  }
}
function s4(e, n) {
  const i = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0),
  };
  return (e.patch(n, i), e.applyData(n, i));
}
function u4(e, n) {
  const i = { type: "element", tagName: "br", properties: {}, children: [] };
  return (
    e.patch(n, i),
    [
      e.applyData(n, i),
      {
        type: "text",
        value: `
`,
      },
    ]
  );
}
function c4(e, n) {
  const i = n.value
      ? n.value +
        `
`
      : "",
    a = {},
    o = n.lang ? n.lang.split(/\s+/) : [];
  o.length > 0 && (a.className = ["language-" + o[0]]);
  let u = {
    type: "element",
    tagName: "code",
    properties: a,
    children: [{ type: "text", value: i }],
  };
  return (
    n.meta && (u.data = { meta: n.meta }),
    e.patch(n, u),
    (u = e.applyData(n, u)),
    (u = { type: "element", tagName: "pre", properties: {}, children: [u] }),
    e.patch(n, u),
    u
  );
}
function f4(e, n) {
  const i = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n),
  };
  return (e.patch(n, i), e.applyData(n, i));
}
function d4(e, n) {
  const i = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n),
  };
  return (e.patch(n, i), e.applyData(n, i));
}
function h4(e, n) {
  const i =
      typeof e.options.clobberPrefix == "string"
        ? e.options.clobberPrefix
        : "user-content-",
    a = String(n.identifier).toUpperCase(),
    o = ul(a.toLowerCase()),
    u = e.footnoteOrder.indexOf(a);
  let c,
    f = e.footnoteCounts.get(a);
  (f === void 0
    ? ((f = 0), e.footnoteOrder.push(a), (c = e.footnoteOrder.length))
    : (c = u + 1),
    (f += 1),
    e.footnoteCounts.set(a, f));
  const h = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + i + "fn-" + o,
      id: i + "fnref-" + o + (f > 1 ? "-" + f : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"],
    },
    children: [{ type: "text", value: String(c) }],
  };
  e.patch(n, h);
  const p = { type: "element", tagName: "sup", properties: {}, children: [h] };
  return (e.patch(n, p), e.applyData(n, p));
}
function p4(e, n) {
  const i = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n),
  };
  return (e.patch(n, i), e.applyData(n, i));
}
function m4(e, n) {
  if (e.options.allowDangerousHtml) {
    const i = { type: "raw", value: n.value };
    return (e.patch(n, i), e.applyData(n, i));
  }
}
function Dv(e, n) {
  const i = n.referenceType;
  let a = "]";
  if (
    (i === "collapsed"
      ? (a += "[]")
      : i === "full" && (a += "[" + (n.label || n.identifier) + "]"),
    n.type === "imageReference")
  )
    return [{ type: "text", value: "![" + n.alt + a }];
  const o = e.all(n),
    u = o[0];
  u && u.type === "text"
    ? (u.value = "[" + u.value)
    : o.unshift({ type: "text", value: "[" });
  const c = o[o.length - 1];
  return (
    c && c.type === "text"
      ? (c.value += a)
      : o.push({ type: "text", value: a }),
    o
  );
}
function g4(e, n) {
  const i = String(n.identifier).toUpperCase(),
    a = e.definitionById.get(i);
  if (!a) return Dv(e, n);
  const o = { src: ul(a.url || ""), alt: n.alt };
  a.title !== null && a.title !== void 0 && (o.title = a.title);
  const u = { type: "element", tagName: "img", properties: o, children: [] };
  return (e.patch(n, u), e.applyData(n, u));
}
function y4(e, n) {
  const i = { src: ul(n.url) };
  (n.alt !== null && n.alt !== void 0 && (i.alt = n.alt),
    n.title !== null && n.title !== void 0 && (i.title = n.title));
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return (e.patch(n, a), e.applyData(n, a));
}
function b4(e, n) {
  const i = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, i);
  const a = { type: "element", tagName: "code", properties: {}, children: [i] };
  return (e.patch(n, a), e.applyData(n, a));
}
function x4(e, n) {
  const i = String(n.identifier).toUpperCase(),
    a = e.definitionById.get(i);
  if (!a) return Dv(e, n);
  const o = { href: ul(a.url || "") };
  a.title !== null && a.title !== void 0 && (o.title = a.title);
  const u = {
    type: "element",
    tagName: "a",
    properties: o,
    children: e.all(n),
  };
  return (e.patch(n, u), e.applyData(n, u));
}
function v4(e, n) {
  const i = { href: ul(n.url) };
  n.title !== null && n.title !== void 0 && (i.title = n.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n),
  };
  return (e.patch(n, a), e.applyData(n, a));
}
function S4(e, n, i) {
  const a = e.all(n),
    o = i ? w4(i) : Nv(n),
    u = {},
    c = [];
  if (typeof n.checked == "boolean") {
    const y = a[0];
    let g;
    (y && y.type === "element" && y.tagName === "p"
      ? (g = y)
      : ((g = { type: "element", tagName: "p", properties: {}, children: [] }),
        a.unshift(g)),
      g.children.length > 0 && g.children.unshift({ type: "text", value: " " }),
      g.children.unshift({
        type: "element",
        tagName: "input",
        properties: { type: "checkbox", checked: n.checked, disabled: !0 },
        children: [],
      }),
      (u.className = ["task-list-item"]));
  }
  let f = -1;
  for (; ++f < a.length; ) {
    const y = a[f];
    ((o || f !== 0 || y.type !== "element" || y.tagName !== "p") &&
      c.push({
        type: "text",
        value: `
`,
      }),
      y.type === "element" && y.tagName === "p" && !o
        ? c.push(...y.children)
        : c.push(y));
  }
  const h = a[a.length - 1];
  h &&
    (o || h.type !== "element" || h.tagName !== "p") &&
    c.push({
      type: "text",
      value: `
`,
    });
  const p = { type: "element", tagName: "li", properties: u, children: c };
  return (e.patch(n, p), e.applyData(n, p));
}
function w4(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const i = e.children;
    let a = -1;
    for (; !n && ++a < i.length; ) n = Nv(i[a]);
  }
  return n;
}
function Nv(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function E4(e, n) {
  const i = {},
    a = e.all(n);
  let o = -1;
  for (
    typeof n.start == "number" && n.start !== 1 && (i.start = n.start);
    ++o < a.length;
  ) {
    const c = a[o];
    if (
      c.type === "element" &&
      c.tagName === "li" &&
      c.properties &&
      Array.isArray(c.properties.className) &&
      c.properties.className.includes("task-list-item")
    ) {
      i.className = ["contains-task-list"];
      break;
    }
  }
  const u = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: i,
    children: e.wrap(a, !0),
  };
  return (e.patch(n, u), e.applyData(n, u));
}
function k4(e, n) {
  const i = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n),
  };
  return (e.patch(n, i), e.applyData(n, i));
}
function C4(e, n) {
  const i = { type: "root", children: e.wrap(e.all(n)) };
  return (e.patch(n, i), e.applyData(n, i));
}
function _4(e, n) {
  const i = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n),
  };
  return (e.patch(n, i), e.applyData(n, i));
}
function T4(e, n) {
  const i = e.all(n),
    a = i.shift(),
    o = [];
  if (a) {
    const c = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([a], !0),
    };
    (e.patch(n.children[0], c), o.push(c));
  }
  if (i.length > 0) {
    const c = {
        type: "element",
        tagName: "tbody",
        properties: {},
        children: e.wrap(i, !0),
      },
      f = xp(n.children[1]),
      h = dv(n.children[n.children.length - 1]);
    (f && h && (c.position = { start: f, end: h }), o.push(c));
  }
  const u = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(o, !0),
  };
  return (e.patch(n, u), e.applyData(n, u));
}
function R4(e, n, i) {
  const a = i ? i.children : void 0,
    u = (a ? a.indexOf(n) : 1) === 0 ? "th" : "td",
    c = i && i.type === "table" ? i.align : void 0,
    f = c ? c.length : n.children.length;
  let h = -1;
  const p = [];
  for (; ++h < f; ) {
    const g = n.children[h],
      x = {},
      v = c ? c[h] : void 0;
    v && (x.align = v);
    let S = { type: "element", tagName: u, properties: x, children: [] };
    (g && ((S.children = e.all(g)), e.patch(g, S), (S = e.applyData(g, S))),
      p.push(S));
  }
  const y = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(p, !0),
  };
  return (e.patch(n, y), e.applyData(n, y));
}
function A4(e, n) {
  const i = {
    type: "element",
    tagName: "td",
    properties: {},
    children: e.all(n),
  };
  return (e.patch(n, i), e.applyData(n, i));
}
const c1 = 9,
  f1 = 32;
function O4(e) {
  const n = String(e),
    i = /\r?\n|\r/g;
  let a = i.exec(n),
    o = 0;
  const u = [];
  for (; a; )
    (u.push(d1(n.slice(o, a.index), o > 0, !0), a[0]),
      (o = a.index + a[0].length),
      (a = i.exec(n)));
  return (u.push(d1(n.slice(o), o > 0, !1)), u.join(""));
}
function d1(e, n, i) {
  let a = 0,
    o = e.length;
  if (n) {
    let u = e.codePointAt(a);
    for (; u === c1 || u === f1; ) (a++, (u = e.codePointAt(a)));
  }
  if (i) {
    let u = e.codePointAt(o - 1);
    for (; u === c1 || u === f1; ) (o--, (u = e.codePointAt(o - 1)));
  }
  return o > a ? e.slice(a, o) : "";
}
function z4(e, n) {
  const i = { type: "text", value: O4(String(n.value)) };
  return (e.patch(n, i), e.applyData(n, i));
}
function D4(e, n) {
  const i = { type: "element", tagName: "hr", properties: {}, children: [] };
  return (e.patch(n, i), e.applyData(n, i));
}
const N4 = {
  blockquote: s4,
  break: u4,
  code: c4,
  delete: f4,
  emphasis: d4,
  footnoteReference: h4,
  heading: p4,
  html: m4,
  imageReference: g4,
  image: y4,
  inlineCode: b4,
  linkReference: x4,
  link: v4,
  listItem: S4,
  list: E4,
  paragraph: k4,
  root: C4,
  strong: _4,
  table: T4,
  tableCell: A4,
  tableRow: R4,
  text: z4,
  thematicBreak: D4,
  toml: du,
  yaml: du,
  definition: du,
  footnoteDefinition: du,
};
function du() {}
const Mv = -1,
  fc = 0,
  So = 1,
  Vu = 2,
  _p = 3,
  Tp = 4,
  Rp = 5,
  Ap = 6,
  jv = 7,
  Lv = 8,
  h1 = typeof self == "object" ? self : globalThis,
  M4 = (e, n) => {
    const i = (o, u) => (e.set(u, o), o),
      a = (o) => {
        if (e.has(o)) return e.get(o);
        const [u, c] = n[o];
        switch (u) {
          case fc:
          case Mv:
            return i(c, o);
          case So: {
            const f = i([], o);
            for (const h of c) f.push(a(h));
            return f;
          }
          case Vu: {
            const f = i({}, o);
            for (const [h, p] of c) f[a(h)] = a(p);
            return f;
          }
          case _p:
            return i(new Date(c), o);
          case Tp: {
            const { source: f, flags: h } = c;
            return i(new RegExp(f, h), o);
          }
          case Rp: {
            const f = i(new Map(), o);
            for (const [h, p] of c) f.set(a(h), a(p));
            return f;
          }
          case Ap: {
            const f = i(new Set(), o);
            for (const h of c) f.add(a(h));
            return f;
          }
          case jv: {
            const { name: f, message: h } = c;
            return i(new h1[f](h), o);
          }
          case Lv:
            return i(BigInt(c), o);
          case "BigInt":
            return i(Object(BigInt(c)), o);
          case "ArrayBuffer":
            return i(new Uint8Array(c).buffer, c);
          case "DataView": {
            const { buffer: f } = new Uint8Array(c);
            return i(new DataView(f), c);
          }
        }
        return i(new h1[u](c), o);
      };
    return a;
  },
  p1 = (e) => M4(new Map(), e)(0),
  Qa = "",
  { toString: j4 } = {},
  { keys: L4 } = Object,
  co = (e) => {
    const n = typeof e;
    if (n !== "object" || !e) return [fc, n];
    const i = j4.call(e).slice(8, -1);
    switch (i) {
      case "Array":
        return [So, Qa];
      case "Object":
        return [Vu, Qa];
      case "Date":
        return [_p, Qa];
      case "RegExp":
        return [Tp, Qa];
      case "Map":
        return [Rp, Qa];
      case "Set":
        return [Ap, Qa];
      case "DataView":
        return [So, i];
    }
    return i.includes("Array")
      ? [So, i]
      : i.includes("Error")
        ? [jv, i]
        : [Vu, i];
  },
  hu = ([e, n]) => e === fc && (n === "function" || n === "symbol"),
  B4 = (e, n, i, a) => {
    const o = (c, f) => {
        const h = a.push(c) - 1;
        return (i.set(f, h), h);
      },
      u = (c) => {
        if (i.has(c)) return i.get(c);
        let [f, h] = co(c);
        switch (f) {
          case fc: {
            let y = c;
            switch (h) {
              case "bigint":
                ((f = Lv), (y = c.toString()));
                break;
              case "function":
              case "symbol":
                if (e) throw new TypeError("unable to serialize " + h);
                y = null;
                break;
              case "undefined":
                return o([Mv], c);
            }
            return o([f, y], c);
          }
          case So: {
            if (h) {
              let x = c;
              return (
                h === "DataView"
                  ? (x = new Uint8Array(c.buffer))
                  : h === "ArrayBuffer" && (x = new Uint8Array(c)),
                o([h, [...x]], c)
              );
            }
            const y = [],
              g = o([f, y], c);
            for (const x of c) y.push(u(x));
            return g;
          }
          case Vu: {
            if (h)
              switch (h) {
                case "BigInt":
                  return o([h, c.toString()], c);
                case "Boolean":
                case "Number":
                case "String":
                  return o([h, c.valueOf()], c);
              }
            if (n && "toJSON" in c) return u(c.toJSON());
            const y = [],
              g = o([f, y], c);
            for (const x of L4(c))
              (e || !hu(co(c[x]))) && y.push([u(x), u(c[x])]);
            return g;
          }
          case _p:
            return o([f, c.toISOString()], c);
          case Tp: {
            const { source: y, flags: g } = c;
            return o([f, { source: y, flags: g }], c);
          }
          case Rp: {
            const y = [],
              g = o([f, y], c);
            for (const [x, v] of c)
              (e || !(hu(co(x)) || hu(co(v)))) && y.push([u(x), u(v)]);
            return g;
          }
          case Ap: {
            const y = [],
              g = o([f, y], c);
            for (const x of c) (e || !hu(co(x))) && y.push(u(x));
            return g;
          }
        }
        const { message: p } = c;
        return o([f, { name: h, message: p }], c);
      };
    return u;
  },
  m1 = (e, { json: n, lossy: i } = {}) => {
    const a = [];
    return (B4(!(n || i), !!n, new Map(), a)(e), a);
  },
  Yu =
    typeof structuredClone == "function"
      ? (e, n) =>
          n && ("json" in n || "lossy" in n) ? p1(m1(e, n)) : structuredClone(e)
      : (e, n) => p1(m1(e, n));
function U4(e, n) {
  const i = [{ type: "text", value: "↩" }];
  return (
    n > 1 &&
      i.push({
        type: "element",
        tagName: "sup",
        properties: {},
        children: [{ type: "text", value: String(n) }],
      }),
    i
  );
}
function H4(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function q4(e) {
  const n =
      typeof e.options.clobberPrefix == "string"
        ? e.options.clobberPrefix
        : "user-content-",
    i = e.options.footnoteBackContent || U4,
    a = e.options.footnoteBackLabel || H4,
    o = e.options.footnoteLabel || "Footnotes",
    u = e.options.footnoteLabelTagName || "h2",
    c = e.options.footnoteLabelProperties || { className: ["sr-only"] },
    f = [];
  let h = -1;
  for (; ++h < e.footnoteOrder.length; ) {
    const p = e.footnoteById.get(e.footnoteOrder[h]);
    if (!p) continue;
    const y = e.all(p),
      g = String(p.identifier).toUpperCase(),
      x = ul(g.toLowerCase());
    let v = 0;
    const S = [],
      _ = e.footnoteCounts.get(g);
    for (; _ !== void 0 && ++v <= _; ) {
      S.length > 0 && S.push({ type: "text", value: " " });
      let j = typeof i == "string" ? i : i(h, v);
      (typeof j == "string" && (j = { type: "text", value: j }),
        S.push({
          type: "element",
          tagName: "a",
          properties: {
            href: "#" + n + "fnref-" + x + (v > 1 ? "-" + v : ""),
            dataFootnoteBackref: "",
            ariaLabel: typeof a == "string" ? a : a(h, v),
            className: ["data-footnote-backref"],
          },
          children: Array.isArray(j) ? j : [j],
        }));
    }
    const k = y[y.length - 1];
    if (k && k.type === "element" && k.tagName === "p") {
      const j = k.children[k.children.length - 1];
      (j && j.type === "text"
        ? (j.value += " ")
        : k.children.push({ type: "text", value: " " }),
        k.children.push(...S));
    } else y.push(...S);
    const T = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + x },
      children: e.wrap(y, !0),
    };
    (e.patch(p, T), f.push(T));
  }
  if (f.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: u,
          properties: { ...Yu(c), id: "footnote-label" },
          children: [{ type: "text", value: o }],
        },
        {
          type: "text",
          value: `
`,
        },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(f, !0),
        },
        {
          type: "text",
          value: `
`,
        },
      ],
    };
}
const dc = function (e) {
  if (e == null) return Y4;
  if (typeof e == "function") return hc(e);
  if (typeof e == "object") return Array.isArray(e) ? F4(e) : P4(e);
  if (typeof e == "string") return V4(e);
  throw new Error("Expected function, string, or object as test");
};
function F4(e) {
  const n = [];
  let i = -1;
  for (; ++i < e.length; ) n[i] = dc(e[i]);
  return hc(a);
  function a(...o) {
    let u = -1;
    for (; ++u < n.length; ) if (n[u].apply(this, o)) return !0;
    return !1;
  }
}
function P4(e) {
  const n = e;
  return hc(i);
  function i(a) {
    const o = a;
    let u;
    for (u in e) if (o[u] !== n[u]) return !1;
    return !0;
  }
}
function V4(e) {
  return hc(n);
  function n(i) {
    return i && i.type === e;
  }
}
function hc(e) {
  return n;
  function n(i, a, o) {
    return !!(
      I4(i) && e.call(this, i, typeof a == "number" ? a : void 0, o || void 0)
    );
  }
}
function Y4() {
  return !0;
}
function I4(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Bv = [],
  X4 = !0,
  Bh = !1,
  G4 = "skip";
function Uv(e, n, i, a) {
  let o;
  typeof n == "function" && typeof i != "function"
    ? ((a = i), (i = n))
    : (o = n);
  const u = dc(o),
    c = a ? -1 : 1;
  f(e, void 0, [])();
  function f(h, p, y) {
    const g = h && typeof h == "object" ? h : {};
    if (typeof g.type == "string") {
      const v =
        typeof g.tagName == "string"
          ? g.tagName
          : typeof g.name == "string"
            ? g.name
            : void 0;
      Object.defineProperty(x, "name", {
        value: "node (" + (h.type + (v ? "<" + v + ">" : "")) + ")",
      });
    }
    return x;
    function x() {
      let v = Bv,
        S,
        _,
        k;
      if (
        (!n || u(h, p, y[y.length - 1] || void 0)) &&
        ((v = Q4(i(h, y))), v[0] === Bh)
      )
        return v;
      if ("children" in h && h.children) {
        const T = h;
        if (T.children && v[0] !== G4)
          for (
            _ = (a ? T.children.length : -1) + c, k = y.concat(T);
            _ > -1 && _ < T.children.length;
          ) {
            const j = T.children[_];
            if (((S = f(j, _, k)()), S[0] === Bh)) return S;
            _ = typeof S[1] == "number" ? S[1] : _ + c;
          }
      }
      return v;
    }
  }
}
function Q4(e) {
  return Array.isArray(e)
    ? e
    : typeof e == "number"
      ? [X4, e]
      : e == null
        ? Bv
        : [e];
}
function Op(e, n, i, a) {
  let o, u, c;
  (typeof n == "function" && typeof i != "function"
    ? ((u = void 0), (c = n), (o = i))
    : ((u = n), (c = i), (o = a)),
    Uv(e, u, f, o));
  function f(h, p) {
    const y = p[p.length - 1],
      g = y ? y.children.indexOf(h) : void 0;
    return c(h, g, y);
  }
}
const Uh = {}.hasOwnProperty,
  K4 = {};
function Z4(e, n) {
  const i = n || K4,
    a = new Map(),
    o = new Map(),
    u = new Map(),
    c = { ...N4, ...i.handlers },
    f = {
      all: p,
      applyData: J4,
      definitionById: a,
      footnoteById: o,
      footnoteCounts: u,
      footnoteOrder: [],
      handlers: c,
      one: h,
      options: i,
      patch: $4,
      wrap: ez,
    };
  return (
    Op(e, function (y) {
      if (y.type === "definition" || y.type === "footnoteDefinition") {
        const g = y.type === "definition" ? a : o,
          x = String(y.identifier).toUpperCase();
        g.has(x) || g.set(x, y);
      }
    }),
    f
  );
  function h(y, g) {
    const x = y.type,
      v = f.handlers[x];
    if (Uh.call(f.handlers, x) && v) return v(f, y, g);
    if (f.options.passThrough && f.options.passThrough.includes(x)) {
      if ("children" in y) {
        const { children: _, ...k } = y,
          T = Yu(k);
        return ((T.children = f.all(y)), T);
      }
      return Yu(y);
    }
    return (f.options.unknownHandler || W4)(f, y, g);
  }
  function p(y) {
    const g = [];
    if ("children" in y) {
      const x = y.children;
      let v = -1;
      for (; ++v < x.length; ) {
        const S = f.one(x[v], y);
        if (S) {
          if (
            v &&
            x[v - 1].type === "break" &&
            (!Array.isArray(S) && S.type === "text" && (S.value = g1(S.value)),
            !Array.isArray(S) && S.type === "element")
          ) {
            const _ = S.children[0];
            _ && _.type === "text" && (_.value = g1(_.value));
          }
          Array.isArray(S) ? g.push(...S) : g.push(S);
        }
      }
    }
    return g;
  }
}
function $4(e, n) {
  e.position && (n.position = HR(e));
}
function J4(e, n) {
  let i = n;
  if (e && e.data) {
    const a = e.data.hName,
      o = e.data.hChildren,
      u = e.data.hProperties;
    if (typeof a == "string")
      if (i.type === "element") i.tagName = a;
      else {
        const c = "children" in i ? i.children : [i];
        i = { type: "element", tagName: a, properties: {}, children: c };
      }
    (i.type === "element" && u && Object.assign(i.properties, Yu(u)),
      "children" in i &&
        i.children &&
        o !== null &&
        o !== void 0 &&
        (i.children = o));
  }
  return i;
}
function W4(e, n) {
  const i = n.data || {},
    a =
      "value" in n && !(Uh.call(i, "hProperties") || Uh.call(i, "hChildren"))
        ? { type: "text", value: n.value }
        : {
            type: "element",
            tagName: "div",
            properties: {},
            children: e.all(n),
          };
  return (e.patch(n, a), e.applyData(n, a));
}
function ez(e, n) {
  const i = [];
  let a = -1;
  for (
    n &&
    i.push({
      type: "text",
      value: `
`,
    });
    ++a < e.length;
  )
    (a &&
      i.push({
        type: "text",
        value: `
`,
      }),
      i.push(e[a]));
  return (
    n &&
      e.length > 0 &&
      i.push({
        type: "text",
        value: `
`,
      }),
    i
  );
}
function g1(e) {
  let n = 0,
    i = e.charCodeAt(n);
  for (; i === 9 || i === 32; ) (n++, (i = e.charCodeAt(n)));
  return e.slice(n);
}
function y1(e, n) {
  const i = Z4(e, n),
    a = i.one(e, void 0),
    o = q4(i),
    u = Array.isArray(a)
      ? { type: "root", children: a }
      : a || { type: "root", children: [] };
  return (
    o &&
      u.children.push(
        {
          type: "text",
          value: `
`,
        },
        o,
      ),
    u
  );
}
function tz(e, n) {
  return e && "run" in e
    ? async function (i, a) {
        const o = y1(i, { file: a, ...n });
        await e.run(o, a);
      }
    : function (i, a) {
        return y1(i, { file: a, ...(e || n) });
      };
}
function b1(e) {
  if (e) throw e;
}
var Wd, x1;
function nz() {
  if (x1) return Wd;
  x1 = 1;
  var e = Object.prototype.hasOwnProperty,
    n = Object.prototype.toString,
    i = Object.defineProperty,
    a = Object.getOwnPropertyDescriptor,
    o = function (p) {
      return typeof Array.isArray == "function"
        ? Array.isArray(p)
        : n.call(p) === "[object Array]";
    },
    u = function (p) {
      if (!p || n.call(p) !== "[object Object]") return !1;
      var y = e.call(p, "constructor"),
        g =
          p.constructor &&
          p.constructor.prototype &&
          e.call(p.constructor.prototype, "isPrototypeOf");
      if (p.constructor && !y && !g) return !1;
      var x;
      for (x in p);
      return typeof x > "u" || e.call(p, x);
    },
    c = function (p, y) {
      i && y.name === "__proto__"
        ? i(p, y.name, {
            enumerable: !0,
            configurable: !0,
            value: y.newValue,
            writable: !0,
          })
        : (p[y.name] = y.newValue);
    },
    f = function (p, y) {
      if (y === "__proto__")
        if (e.call(p, y)) {
          if (a) return a(p, y).value;
        } else return;
      return p[y];
    };
  return (
    (Wd = function h() {
      var p,
        y,
        g,
        x,
        v,
        S,
        _ = arguments[0],
        k = 1,
        T = arguments.length,
        j = !1;
      for (
        typeof _ == "boolean" && ((j = _), (_ = arguments[1] || {}), (k = 2)),
          (_ == null || (typeof _ != "object" && typeof _ != "function")) &&
            (_ = {});
        k < T;
        ++k
      )
        if (((p = arguments[k]), p != null))
          for (y in p)
            ((g = f(_, y)),
              (x = f(p, y)),
              _ !== x &&
                (j && x && (u(x) || (v = o(x)))
                  ? (v
                      ? ((v = !1), (S = g && o(g) ? g : []))
                      : (S = g && u(g) ? g : {}),
                    c(_, { name: y, newValue: h(j, S, x) }))
                  : typeof x < "u" && c(_, { name: y, newValue: x })));
      return _;
    }),
    Wd
  );
}
var rz = nz();
const eh = Kh(rz);
function Hh(e) {
  if (typeof e != "object" || e === null) return !1;
  const n = Object.getPrototypeOf(e);
  return (
    (n === null ||
      n === Object.prototype ||
      Object.getPrototypeOf(n) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
function iz() {
  const e = [],
    n = { run: i, use: a };
  return n;
  function i(...o) {
    let u = -1;
    const c = o.pop();
    if (typeof c != "function")
      throw new TypeError("Expected function as last argument, not " + c);
    f(null, ...o);
    function f(h, ...p) {
      const y = e[++u];
      let g = -1;
      if (h) {
        c(h);
        return;
      }
      for (; ++g < o.length; )
        (p[g] === null || p[g] === void 0) && (p[g] = o[g]);
      ((o = p), y ? az(y, f)(...p) : c(null, ...p));
    }
  }
  function a(o) {
    if (typeof o != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + o);
    return (e.push(o), n);
  }
}
function az(e, n) {
  let i;
  return a;
  function a(...c) {
    const f = e.length > c.length;
    let h;
    f && c.push(o);
    try {
      h = e.apply(this, c);
    } catch (p) {
      const y = p;
      if (f && i) throw y;
      return o(y);
    }
    f ||
      (h && h.then && typeof h.then == "function"
        ? h.then(u, o)
        : h instanceof Error
          ? o(h)
          : u(h));
  }
  function o(c, ...f) {
    i || ((i = !0), n(c, ...f));
  }
  function u(c) {
    o(null, c);
  }
}
const gr = { basename: lz, dirname: oz, extname: sz, join: uz, sep: "/" };
function lz(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  Yo(e);
  let i = 0,
    a = -1,
    o = e.length,
    u;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; o--; )
      if (e.codePointAt(o) === 47) {
        if (u) {
          i = o + 1;
          break;
        }
      } else a < 0 && ((u = !0), (a = o + 1));
    return a < 0 ? "" : e.slice(i, a);
  }
  if (n === e) return "";
  let c = -1,
    f = n.length - 1;
  for (; o--; )
    if (e.codePointAt(o) === 47) {
      if (u) {
        i = o + 1;
        break;
      }
    } else
      (c < 0 && ((u = !0), (c = o + 1)),
        f > -1 &&
          (e.codePointAt(o) === n.codePointAt(f--)
            ? f < 0 && (a = o)
            : ((f = -1), (a = c))));
  return (i === a ? (a = c) : a < 0 && (a = e.length), e.slice(i, a));
}
function oz(e) {
  if ((Yo(e), e.length === 0)) return ".";
  let n = -1,
    i = e.length,
    a;
  for (; --i; )
    if (e.codePointAt(i) === 47) {
      if (a) {
        n = i;
        break;
      }
    } else a || (a = !0);
  return n < 0
    ? e.codePointAt(0) === 47
      ? "/"
      : "."
    : n === 1 && e.codePointAt(0) === 47
      ? "//"
      : e.slice(0, n);
}
function sz(e) {
  Yo(e);
  let n = e.length,
    i = -1,
    a = 0,
    o = -1,
    u = 0,
    c;
  for (; n--; ) {
    const f = e.codePointAt(n);
    if (f === 47) {
      if (c) {
        a = n + 1;
        break;
      }
      continue;
    }
    (i < 0 && ((c = !0), (i = n + 1)),
      f === 46 ? (o < 0 ? (o = n) : u !== 1 && (u = 1)) : o > -1 && (u = -1));
  }
  return o < 0 || i < 0 || u === 0 || (u === 1 && o === i - 1 && o === a + 1)
    ? ""
    : e.slice(o, i);
}
function uz(...e) {
  let n = -1,
    i;
  for (; ++n < e.length; )
    (Yo(e[n]), e[n] && (i = i === void 0 ? e[n] : i + "/" + e[n]));
  return i === void 0 ? "." : cz(i);
}
function cz(e) {
  Yo(e);
  const n = e.codePointAt(0) === 47;
  let i = fz(e, !n);
  return (
    i.length === 0 && !n && (i = "."),
    i.length > 0 && e.codePointAt(e.length - 1) === 47 && (i += "/"),
    n ? "/" + i : i
  );
}
function fz(e, n) {
  let i = "",
    a = 0,
    o = -1,
    u = 0,
    c = -1,
    f,
    h;
  for (; ++c <= e.length; ) {
    if (c < e.length) f = e.codePointAt(c);
    else {
      if (f === 47) break;
      f = 47;
    }
    if (f === 47) {
      if (!(o === c - 1 || u === 1))
        if (o !== c - 1 && u === 2) {
          if (
            i.length < 2 ||
            a !== 2 ||
            i.codePointAt(i.length - 1) !== 46 ||
            i.codePointAt(i.length - 2) !== 46
          ) {
            if (i.length > 2) {
              if (((h = i.lastIndexOf("/")), h !== i.length - 1)) {
                (h < 0
                  ? ((i = ""), (a = 0))
                  : ((i = i.slice(0, h)),
                    (a = i.length - 1 - i.lastIndexOf("/"))),
                  (o = c),
                  (u = 0));
                continue;
              }
            } else if (i.length > 0) {
              ((i = ""), (a = 0), (o = c), (u = 0));
              continue;
            }
          }
          n && ((i = i.length > 0 ? i + "/.." : ".."), (a = 2));
        } else
          (i.length > 0
            ? (i += "/" + e.slice(o + 1, c))
            : (i = e.slice(o + 1, c)),
            (a = c - o - 1));
      ((o = c), (u = 0));
    } else f === 46 && u > -1 ? u++ : (u = -1);
  }
  return i;
}
function Yo(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
const dz = { cwd: hz };
function hz() {
  return "/";
}
function qh(e) {
  return !!(
    e !== null &&
    typeof e == "object" &&
    "href" in e &&
    e.href &&
    "protocol" in e &&
    e.protocol &&
    e.auth === void 0
  );
}
function pz(e) {
  if (typeof e == "string") e = new URL(e);
  else if (!qh(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        e +
        "`",
    );
    throw ((n.code = "ERR_INVALID_ARG_TYPE"), n);
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw ((n.code = "ERR_INVALID_URL_SCHEME"), n);
  }
  return mz(e);
}
function mz(e) {
  if (e.hostname !== "") {
    const a = new TypeError(
      'File URL host must be "localhost" or empty on darwin',
    );
    throw ((a.code = "ERR_INVALID_FILE_URL_HOST"), a);
  }
  const n = e.pathname;
  let i = -1;
  for (; ++i < n.length; )
    if (n.codePointAt(i) === 37 && n.codePointAt(i + 1) === 50) {
      const a = n.codePointAt(i + 2);
      if (a === 70 || a === 102) {
        const o = new TypeError(
          "File URL path must not include encoded / characters",
        );
        throw ((o.code = "ERR_INVALID_FILE_URL_PATH"), o);
      }
    }
  return decodeURIComponent(n);
}
const th = ["history", "path", "basename", "stem", "extname", "dirname"];
class Hv {
  constructor(n) {
    let i;
    (n
      ? qh(n)
        ? (i = { path: n })
        : typeof n == "string" || gz(n)
          ? (i = { value: n })
          : (i = n)
      : (i = {}),
      (this.cwd = "cwd" in i ? "" : dz.cwd()),
      (this.data = {}),
      (this.history = []),
      (this.messages = []),
      this.value,
      this.map,
      this.result,
      this.stored);
    let a = -1;
    for (; ++a < th.length; ) {
      const u = th[a];
      u in i &&
        i[u] !== void 0 &&
        i[u] !== null &&
        (this[u] = u === "history" ? [...i[u]] : i[u]);
    }
    let o;
    for (o in i) th.includes(o) || (this[o] = i[o]);
  }
  get basename() {
    return typeof this.path == "string" ? gr.basename(this.path) : void 0;
  }
  set basename(n) {
    (rh(n, "basename"),
      nh(n, "basename"),
      (this.path = gr.join(this.dirname || "", n)));
  }
  get dirname() {
    return typeof this.path == "string" ? gr.dirname(this.path) : void 0;
  }
  set dirname(n) {
    (v1(this.basename, "dirname"),
      (this.path = gr.join(n || "", this.basename)));
  }
  get extname() {
    return typeof this.path == "string" ? gr.extname(this.path) : void 0;
  }
  set extname(n) {
    if ((nh(n, "extname"), v1(this.dirname, "extname"), n)) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = gr.join(this.dirname, this.stem + (n || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(n) {
    (qh(n) && (n = pz(n)),
      rh(n, "path"),
      this.path !== n && this.history.push(n));
  }
  get stem() {
    return typeof this.path == "string"
      ? gr.basename(this.path, this.extname)
      : void 0;
  }
  set stem(n) {
    (rh(n, "stem"),
      nh(n, "stem"),
      (this.path = gr.join(this.dirname || "", n + (this.extname || ""))));
  }
  fail(n, i, a) {
    const o = this.message(n, i, a);
    throw ((o.fatal = !0), o);
  }
  info(n, i, a) {
    const o = this.message(n, i, a);
    return ((o.fatal = void 0), o);
  }
  message(n, i, a) {
    const o = new nn(n, i, a);
    return (
      this.path && ((o.name = this.path + ":" + o.name), (o.file = this.path)),
      (o.fatal = !1),
      this.messages.push(o),
      o
    );
  }
  toString(n) {
    return this.value === void 0
      ? ""
      : typeof this.value == "string"
        ? this.value
        : new TextDecoder(n || void 0).decode(this.value);
  }
}
function nh(e, n) {
  if (e && e.includes(gr.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + gr.sep + "`",
    );
}
function rh(e, n) {
  if (!e) throw new Error("`" + n + "` cannot be empty");
}
function v1(e, n) {
  if (!e) throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function gz(e) {
  return !!(
    e &&
    typeof e == "object" &&
    "byteLength" in e &&
    "byteOffset" in e
  );
}
const yz = function (e) {
    const a = this.constructor.prototype,
      o = a[e],
      u = function () {
        return o.apply(u, arguments);
      };
    return (Object.setPrototypeOf(u, a), u);
  },
  bz = {}.hasOwnProperty;
class zp extends yz {
  constructor() {
    (super("copy"),
      (this.Compiler = void 0),
      (this.Parser = void 0),
      (this.attachers = []),
      (this.compiler = void 0),
      (this.freezeIndex = -1),
      (this.frozen = void 0),
      (this.namespace = {}),
      (this.parser = void 0),
      (this.transformers = iz()));
  }
  copy() {
    const n = new zp();
    let i = -1;
    for (; ++i < this.attachers.length; ) {
      const a = this.attachers[i];
      n.use(...a);
    }
    return (n.data(eh(!0, {}, this.namespace)), n);
  }
  data(n, i) {
    return typeof n == "string"
      ? arguments.length === 2
        ? (lh("data", this.frozen), (this.namespace[n] = i), this)
        : (bz.call(this.namespace, n) && this.namespace[n]) || void 0
      : n
        ? (lh("data", this.frozen), (this.namespace = n), this)
        : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const n = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [i, ...a] = this.attachers[this.freezeIndex];
      if (a[0] === !1) continue;
      a[0] === !0 && (a[0] = void 0);
      const o = i.call(n, ...a);
      typeof o == "function" && this.transformers.use(o);
    }
    return (
      (this.frozen = !0),
      (this.freezeIndex = Number.POSITIVE_INFINITY),
      this
    );
  }
  parse(n) {
    this.freeze();
    const i = pu(n),
      a = this.parser || this.Parser;
    return (ih("parse", a), a(String(i), i));
  }
  process(n, i) {
    const a = this;
    return (
      this.freeze(),
      ih("process", this.parser || this.Parser),
      ah("process", this.compiler || this.Compiler),
      i ? o(void 0, i) : new Promise(o)
    );
    function o(u, c) {
      const f = pu(n),
        h = a.parse(f);
      a.run(h, f, function (y, g, x) {
        if (y || !g || !x) return p(y);
        const v = g,
          S = a.stringify(v, x);
        (Sz(S) ? (x.value = S) : (x.result = S), p(y, x));
      });
      function p(y, g) {
        y || !g ? c(y) : u ? u(g) : i(void 0, g);
      }
    }
  }
  processSync(n) {
    let i = !1,
      a;
    return (
      this.freeze(),
      ih("processSync", this.parser || this.Parser),
      ah("processSync", this.compiler || this.Compiler),
      this.process(n, o),
      w1("processSync", "process", i),
      a
    );
    function o(u, c) {
      ((i = !0), b1(u), (a = c));
    }
  }
  run(n, i, a) {
    (S1(n), this.freeze());
    const o = this.transformers;
    return (
      !a && typeof i == "function" && ((a = i), (i = void 0)),
      a ? u(void 0, a) : new Promise(u)
    );
    function u(c, f) {
      const h = pu(i);
      o.run(n, h, p);
      function p(y, g, x) {
        const v = g || n;
        y ? f(y) : c ? c(v) : a(void 0, v, x);
      }
    }
  }
  runSync(n, i) {
    let a = !1,
      o;
    return (this.run(n, i, u), w1("runSync", "run", a), o);
    function u(c, f) {
      (b1(c), (o = f), (a = !0));
    }
  }
  stringify(n, i) {
    this.freeze();
    const a = pu(i),
      o = this.compiler || this.Compiler;
    return (ah("stringify", o), S1(n), o(n, a));
  }
  use(n, ...i) {
    const a = this.attachers,
      o = this.namespace;
    if ((lh("use", this.frozen), n != null))
      if (typeof n == "function") h(n, i);
      else if (typeof n == "object") Array.isArray(n) ? f(n) : c(n);
      else throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function u(p) {
      if (typeof p == "function") h(p, []);
      else if (typeof p == "object")
        if (Array.isArray(p)) {
          const [y, ...g] = p;
          h(y, g);
        } else c(p);
      else throw new TypeError("Expected usable value, not `" + p + "`");
    }
    function c(p) {
      if (!("plugins" in p) && !("settings" in p))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither",
        );
      (f(p.plugins),
        p.settings && (o.settings = eh(!0, o.settings, p.settings)));
    }
    function f(p) {
      let y = -1;
      if (p != null)
        if (Array.isArray(p))
          for (; ++y < p.length; ) {
            const g = p[y];
            u(g);
          }
        else throw new TypeError("Expected a list of plugins, not `" + p + "`");
    }
    function h(p, y) {
      let g = -1,
        x = -1;
      for (; ++g < a.length; )
        if (a[g][0] === p) {
          x = g;
          break;
        }
      if (x === -1) a.push([p, ...y]);
      else if (y.length > 0) {
        let [v, ...S] = y;
        const _ = a[x][1];
        (Hh(_) && Hh(v) && (v = eh(!0, _, v)), (a[x] = [p, v, ...S]));
      }
    }
  }
}
const xz = new zp().freeze();
function ih(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function ah(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function lh(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" +
        e +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.",
    );
}
function S1(e) {
  if (!Hh(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function w1(e, n, i) {
  if (!i)
    throw new Error("`" + e + "` finished async. Use `" + n + "` instead");
}
function pu(e) {
  return vz(e) ? e : new Hv(e);
}
function vz(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Sz(e) {
  return typeof e == "string" || wz(e);
}
function wz(e) {
  return !!(
    e &&
    typeof e == "object" &&
    "byteLength" in e &&
    "byteOffset" in e
  );
}
const Ez = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md",
  E1 = [],
  k1 = { allowDangerousHtml: !0 },
  kz = /^(https?|ircs?|mailto|xmpp)$/i,
  Cz = [
    { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
    { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
    {
      from: "allowNode",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowElement",
    },
    {
      from: "allowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowedElements",
    },
    { from: "className", id: "remove-classname" },
    {
      from: "disallowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "disallowedElements",
    },
    { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
    { from: "includeElementIndex", id: "#remove-includeelementindex" },
    {
      from: "includeNodeIndex",
      id: "change-includenodeindex-to-includeelementindex",
    },
    { from: "linkTarget", id: "remove-linktarget" },
    {
      from: "plugins",
      id: "change-plugins-to-remarkplugins",
      to: "remarkPlugins",
    },
    { from: "rawSourcePos", id: "#remove-rawsourcepos" },
    {
      from: "renderers",
      id: "change-renderers-to-components",
      to: "components",
    },
    { from: "source", id: "change-source-to-children", to: "children" },
    { from: "sourcePos", id: "#remove-sourcepos" },
    { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
    { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" },
  ];
function qv(e) {
  const n = _z(e),
    i = Tz(e);
  return Rz(n.runSync(n.parse(i), i), e);
}
function _z(e) {
  const n = e.rehypePlugins || E1,
    i = e.remarkPlugins || E1,
    a = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...k1 } : k1;
  return xz().use(o4).use(i).use(tz, a).use(n);
}
function Tz(e) {
  const n = e.children || "",
    i = new Hv();
  return (typeof n == "string" && (i.value = n), i);
}
function Rz(e, n) {
  const i = n.allowedElements,
    a = n.allowElement,
    o = n.components,
    u = n.disallowedElements,
    c = n.skipHtml,
    f = n.unwrapDisallowed,
    h = n.urlTransform || Az;
  for (const y of Cz)
    Object.hasOwn(n, y.from) &&
      ("" +
        y.from +
        (y.to ? "use `" + y.to + "` instead" : "remove it") +
        Ez +
        y.id,
      void 0);
  return (
    Op(e, p),
    YR(e, {
      Fragment: w.Fragment,
      components: o,
      ignoreInvalidStyle: !0,
      jsx: w.jsx,
      jsxs: w.jsxs,
      passKeys: !0,
      passNode: !0,
    })
  );
  function p(y, g, x) {
    if (y.type === "raw" && x && typeof g == "number")
      return (
        c
          ? x.children.splice(g, 1)
          : (x.children[g] = { type: "text", value: y.value }),
        g
      );
    if (y.type === "element") {
      let v;
      for (v in Zd)
        if (Object.hasOwn(Zd, v) && Object.hasOwn(y.properties, v)) {
          const S = y.properties[v],
            _ = Zd[v];
          (_ === null || _.includes(y.tagName)) &&
            (y.properties[v] = h(String(S || ""), v, y));
        }
    }
    if (y.type === "element") {
      let v = i ? !i.includes(y.tagName) : u ? u.includes(y.tagName) : !1;
      if (
        (!v && a && typeof g == "number" && (v = !a(y, g, x)),
        v && x && typeof g == "number")
      )
        return (
          f && y.children
            ? x.children.splice(g, 1, ...y.children)
            : x.children.splice(g, 1),
          g
        );
    }
  }
}
function Az(e) {
  const n = e.indexOf(":"),
    i = e.indexOf("?"),
    a = e.indexOf("#"),
    o = e.indexOf("/");
  return n === -1 ||
    (o !== -1 && n > o) ||
    (i !== -1 && n > i) ||
    (a !== -1 && n > a) ||
    kz.test(e.slice(0, n))
    ? e
    : "";
}
function C1(e, n) {
  const i = String(e);
  if (typeof n != "string") throw new TypeError("Expected character");
  let a = 0,
    o = i.indexOf(n);
  for (; o !== -1; ) (a++, (o = i.indexOf(n, o + n.length)));
  return a;
}
function Oz(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function zz(e, n, i) {
  const o = dc((i || {}).ignore || []),
    u = Dz(n);
  let c = -1;
  for (; ++c < u.length; ) Uv(e, "text", f);
  function f(p, y) {
    let g = -1,
      x;
    for (; ++g < y.length; ) {
      const v = y[g],
        S = x ? x.children : void 0;
      if (o(v, S ? S.indexOf(v) : void 0, x)) return;
      x = v;
    }
    if (x) return h(p, y);
  }
  function h(p, y) {
    const g = y[y.length - 1],
      x = u[c][0],
      v = u[c][1];
    let S = 0;
    const k = g.children.indexOf(p);
    let T = !1,
      j = [];
    x.lastIndex = 0;
    let M = x.exec(p.value);
    for (; M; ) {
      const $ = M.index,
        Z = { index: M.index, input: M.input, stack: [...y, p] };
      let U = v(...M, Z);
      if (
        (typeof U == "string" &&
          (U = U.length > 0 ? { type: "text", value: U } : void 0),
        U === !1
          ? (x.lastIndex = $ + 1)
          : (S !== $ && j.push({ type: "text", value: p.value.slice(S, $) }),
            Array.isArray(U) ? j.push(...U) : U && j.push(U),
            (S = $ + M[0].length),
            (T = !0)),
        !x.global)
      )
        break;
      M = x.exec(p.value);
    }
    return (
      T
        ? (S < p.value.length &&
            j.push({ type: "text", value: p.value.slice(S) }),
          g.children.splice(k, 1, ...j))
        : (j = [p]),
      k + j.length
    );
  }
}
function Dz(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const i = !e[0] || Array.isArray(e[0]) ? e : [e];
  let a = -1;
  for (; ++a < i.length; ) {
    const o = i[a];
    n.push([Nz(o[0]), Mz(o[1])]);
  }
  return n;
}
function Nz(e) {
  return typeof e == "string" ? new RegExp(Oz(e), "g") : e;
}
function Mz(e) {
  return typeof e == "function"
    ? e
    : function () {
        return e;
      };
}
const oh = "phrasing",
  sh = ["autolink", "link", "image", "label"];
function jz() {
  return {
    transforms: [Pz],
    enter: {
      literalAutolink: Bz,
      literalAutolinkEmail: uh,
      literalAutolinkHttp: uh,
      literalAutolinkWww: uh,
    },
    exit: {
      literalAutolink: Fz,
      literalAutolinkEmail: qz,
      literalAutolinkHttp: Uz,
      literalAutolinkWww: Hz,
    },
  };
}
function Lz() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: oh,
        notInConstruct: sh,
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: oh,
        notInConstruct: sh,
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: oh,
        notInConstruct: sh,
      },
    ],
  };
}
function Bz(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function uh(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function Uz(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function Hz(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  (n.type, (n.url = "http://" + this.sliceSerialize(e)));
}
function qz(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function Fz(e) {
  this.exit(e);
}
function Pz(e) {
  zz(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Vz],
      [
        new RegExp(
          "(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)",
          "gu",
        ),
        Yz,
      ],
    ],
    { ignore: ["link", "linkReference"] },
  );
}
function Vz(e, n, i, a, o) {
  let u = "";
  if (
    !Fv(o) ||
    (/^w/i.test(n) && ((i = n + i), (n = ""), (u = "http://")), !Iz(i))
  )
    return !1;
  const c = Xz(i + a);
  if (!c[0]) return !1;
  const f = {
    type: "link",
    title: null,
    url: u + n + c[0],
    children: [{ type: "text", value: n + c[0] }],
  };
  return c[1] ? [f, { type: "text", value: c[1] }] : f;
}
function Yz(e, n, i, a) {
  return !Fv(a, !0) || /[-\d_]$/.test(i)
    ? !1
    : {
        type: "link",
        title: null,
        url: "mailto:" + n + "@" + i,
        children: [{ type: "text", value: n + "@" + i }],
      };
}
function Iz(e) {
  const n = e.split(".");
  return !(
    n.length < 2 ||
    (n[n.length - 1] &&
      (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1]))) ||
    (n[n.length - 2] &&
      (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])))
  );
}
function Xz(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n) return [e, void 0];
  e = e.slice(0, n.index);
  let i = n[0],
    a = i.indexOf(")");
  const o = C1(e, "(");
  let u = C1(e, ")");
  for (; a !== -1 && o > u; )
    ((e += i.slice(0, a + 1)), (i = i.slice(a + 1)), (a = i.indexOf(")")), u++);
  return [e, i];
}
function Fv(e, n) {
  const i = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || aa(i) || uc(i)) && (!n || i !== 47);
}
Pv.peek = tD;
function Gz() {
  this.buffer();
}
function Qz(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function Kz() {
  this.buffer();
}
function Zz(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e,
  );
}
function $z(e) {
  const n = this.resume(),
    i = this.stack[this.stack.length - 1];
  (i.type,
    (i.identifier = ir(this.sliceSerialize(e)).toLowerCase()),
    (i.label = n));
}
function Jz(e) {
  this.exit(e);
}
function Wz(e) {
  const n = this.resume(),
    i = this.stack[this.stack.length - 1];
  (i.type,
    (i.identifier = ir(this.sliceSerialize(e)).toLowerCase()),
    (i.label = n));
}
function eD(e) {
  this.exit(e);
}
function tD() {
  return "[";
}
function Pv(e, n, i, a) {
  const o = i.createTracker(a);
  let u = o.move("[^");
  const c = i.enter("footnoteReference"),
    f = i.enter("reference");
  return (
    (u += o.move(i.safe(i.associationId(e), { after: "]", before: u }))),
    f(),
    c(),
    (u += o.move("]")),
    u
  );
}
function nD() {
  return {
    enter: {
      gfmFootnoteCallString: Gz,
      gfmFootnoteCall: Qz,
      gfmFootnoteDefinitionLabelString: Kz,
      gfmFootnoteDefinition: Zz,
    },
    exit: {
      gfmFootnoteCallString: $z,
      gfmFootnoteCall: Jz,
      gfmFootnoteDefinitionLabelString: Wz,
      gfmFootnoteDefinition: eD,
    },
  };
}
function rD(e) {
  let n = !1;
  return (
    e && e.firstLineBlank && (n = !0),
    {
      handlers: { footnoteDefinition: i, footnoteReference: Pv },
      unsafe: [
        { character: "[", inConstruct: ["label", "phrasing", "reference"] },
      ],
    }
  );
  function i(a, o, u, c) {
    const f = u.createTracker(c);
    let h = f.move("[^");
    const p = u.enter("footnoteDefinition"),
      y = u.enter("label");
    return (
      (h += f.move(u.safe(u.associationId(a), { before: h, after: "]" }))),
      y(),
      (h += f.move("]:")),
      a.children &&
        a.children.length > 0 &&
        (f.shift(4),
        (h += f.move(
          (n
            ? `
`
            : " ") +
            u.indentLines(u.containerFlow(a, f.current()), n ? Vv : iD),
        ))),
      p(),
      h
    );
  }
}
function iD(e, n, i) {
  return n === 0 ? e : Vv(e, n, i);
}
function Vv(e, n, i) {
  return (i ? "" : "    ") + e;
}
const aD = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe",
];
Yv.peek = cD;
function lD() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: sD },
    exit: { strikethrough: uD },
  };
}
function oD() {
  return {
    unsafe: [{ character: "~", inConstruct: "phrasing", notInConstruct: aD }],
    handlers: { delete: Yv },
  };
}
function sD(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function uD(e) {
  this.exit(e);
}
function Yv(e, n, i, a) {
  const o = i.createTracker(a),
    u = i.enter("strikethrough");
  let c = o.move("~~");
  return (
    (c += i.containerPhrasing(e, { ...o.current(), before: c, after: "~" })),
    (c += o.move("~~")),
    u(),
    c
  );
}
function cD() {
  return "~";
}
function fD(e) {
  return e.length;
}
function dD(e, n) {
  const i = n || {},
    a = (i.align || []).concat(),
    o = i.stringLength || fD,
    u = [],
    c = [],
    f = [],
    h = [];
  let p = 0,
    y = -1;
  for (; ++y < e.length; ) {
    const _ = [],
      k = [];
    let T = -1;
    for (e[y].length > p && (p = e[y].length); ++T < e[y].length; ) {
      const j = hD(e[y][T]);
      if (i.alignDelimiters !== !1) {
        const M = o(j);
        ((k[T] = M), (h[T] === void 0 || M > h[T]) && (h[T] = M));
      }
      _.push(j);
    }
    ((c[y] = _), (f[y] = k));
  }
  let g = -1;
  if (typeof a == "object" && "length" in a) for (; ++g < p; ) u[g] = _1(a[g]);
  else {
    const _ = _1(a);
    for (; ++g < p; ) u[g] = _;
  }
  g = -1;
  const x = [],
    v = [];
  for (; ++g < p; ) {
    const _ = u[g];
    let k = "",
      T = "";
    _ === 99
      ? ((k = ":"), (T = ":"))
      : _ === 108
        ? (k = ":")
        : _ === 114 && (T = ":");
    let j =
      i.alignDelimiters === !1 ? 1 : Math.max(1, h[g] - k.length - T.length);
    const M = k + "-".repeat(j) + T;
    (i.alignDelimiters !== !1 &&
      ((j = k.length + j + T.length), j > h[g] && (h[g] = j), (v[g] = j)),
      (x[g] = M));
  }
  (c.splice(1, 0, x), f.splice(1, 0, v), (y = -1));
  const S = [];
  for (; ++y < c.length; ) {
    const _ = c[y],
      k = f[y];
    g = -1;
    const T = [];
    for (; ++g < p; ) {
      const j = _[g] || "";
      let M = "",
        $ = "";
      if (i.alignDelimiters !== !1) {
        const Z = h[g] - (k[g] || 0),
          U = u[g];
        U === 114
          ? (M = " ".repeat(Z))
          : U === 99
            ? Z % 2
              ? ((M = " ".repeat(Z / 2 + 0.5)), ($ = " ".repeat(Z / 2 - 0.5)))
              : ((M = " ".repeat(Z / 2)), ($ = M))
            : ($ = " ".repeat(Z));
      }
      (i.delimiterStart !== !1 && !g && T.push("|"),
        i.padding !== !1 &&
          !(i.alignDelimiters === !1 && j === "") &&
          (i.delimiterStart !== !1 || g) &&
          T.push(" "),
        i.alignDelimiters !== !1 && T.push(M),
        T.push(j),
        i.alignDelimiters !== !1 && T.push($),
        i.padding !== !1 && T.push(" "),
        (i.delimiterEnd !== !1 || g !== p - 1) && T.push("|"));
    }
    S.push(i.delimiterEnd === !1 ? T.join("").replace(/ +$/, "") : T.join(""));
  }
  return S.join(`
`);
}
function hD(e) {
  return e == null ? "" : String(e);
}
function _1(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99
    ? 99
    : n === 76 || n === 108
      ? 108
      : n === 82 || n === 114
        ? 114
        : 0;
}
function pD(e, n, i, a) {
  const o = i.enter("blockquote"),
    u = i.createTracker(a);
  (u.move("> "), u.shift(2));
  const c = i.indentLines(i.containerFlow(e, u.current()), mD);
  return (o(), c);
}
function mD(e, n, i) {
  return ">" + (i ? "" : " ") + e;
}
function gD(e, n) {
  return T1(e, n.inConstruct, !0) && !T1(e, n.notInConstruct, !1);
}
function T1(e, n, i) {
  if ((typeof n == "string" && (n = [n]), !n || n.length === 0)) return i;
  let a = -1;
  for (; ++a < n.length; ) if (e.includes(n[a])) return !0;
  return !1;
}
function R1(e, n, i, a) {
  let o = -1;
  for (; ++o < i.unsafe.length; )
    if (
      i.unsafe[o].character ===
        `
` &&
      gD(i.stack, i.unsafe[o])
    )
      return /[ \t]/.test(a.before) ? "" : " ";
  return `\\
`;
}
function yD(e, n) {
  const i = String(e);
  let a = i.indexOf(n),
    o = a,
    u = 0,
    c = 0;
  if (typeof n != "string") throw new TypeError("Expected substring");
  for (; a !== -1; )
    (a === o ? ++u > c && (c = u) : (u = 1),
      (o = a + n.length),
      (a = i.indexOf(n, o)));
  return c;
}
function bD(e, n) {
  return !!(
    n.options.fences === !1 &&
    e.value &&
    !e.lang &&
    /[^ \r\n]/.test(e.value) &&
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value)
  );
}
function xD(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" +
        n +
        "` for `options.fence`, expected `` ` `` or `~`",
    );
  return n;
}
function vD(e, n, i, a) {
  const o = xD(i),
    u = e.value || "",
    c = o === "`" ? "GraveAccent" : "Tilde";
  if (bD(e, i)) {
    const g = i.enter("codeIndented"),
      x = i.indentLines(u, SD);
    return (g(), x);
  }
  const f = i.createTracker(a),
    h = o.repeat(Math.max(yD(u, o) + 1, 3)),
    p = i.enter("codeFenced");
  let y = f.move(h);
  if (e.lang) {
    const g = i.enter(`codeFencedLang${c}`);
    ((y += f.move(
      i.safe(e.lang, { before: y, after: " ", encode: ["`"], ...f.current() }),
    )),
      g());
  }
  if (e.lang && e.meta) {
    const g = i.enter(`codeFencedMeta${c}`);
    ((y += f.move(" ")),
      (y += f.move(
        i.safe(e.meta, {
          before: y,
          after: `
`,
          encode: ["`"],
          ...f.current(),
        }),
      )),
      g());
  }
  return (
    (y += f.move(`
`)),
    u &&
      (y += f.move(
        u +
          `
`,
      )),
    (y += f.move(h)),
    p(),
    y
  );
}
function SD(e, n, i) {
  return (i ? "" : "    ") + e;
}
function Dp(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" +
        n +
        "` for `options.quote`, expected `\"`, or `'`",
    );
  return n;
}
function wD(e, n, i, a) {
  const o = Dp(i),
    u = o === '"' ? "Quote" : "Apostrophe",
    c = i.enter("definition");
  let f = i.enter("label");
  const h = i.createTracker(a);
  let p = h.move("[");
  return (
    (p += h.move(
      i.safe(i.associationId(e), { before: p, after: "]", ...h.current() }),
    )),
    (p += h.move("]: ")),
    f(),
    !e.url || /[\0- \u007F]/.test(e.url)
      ? ((f = i.enter("destinationLiteral")),
        (p += h.move("<")),
        (p += h.move(i.safe(e.url, { before: p, after: ">", ...h.current() }))),
        (p += h.move(">")))
      : ((f = i.enter("destinationRaw")),
        (p += h.move(
          i.safe(e.url, {
            before: p,
            after: e.title
              ? " "
              : `
`,
            ...h.current(),
          }),
        ))),
    f(),
    e.title &&
      ((f = i.enter(`title${u}`)),
      (p += h.move(" " + o)),
      (p += h.move(i.safe(e.title, { before: p, after: o, ...h.current() }))),
      (p += h.move(o)),
      f()),
    c(),
    p
  );
}
function ED(e) {
  const n = e.options.emphasis || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" +
        n +
        "` for `options.emphasis`, expected `*`, or `_`",
    );
  return n;
}
function Ao(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function Iu(e, n, i) {
  const a = al(e),
    o = al(n);
  return a === void 0
    ? o === void 0
      ? i === "_"
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !1 }
      : o === 1
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !0 }
    : a === 1
      ? o === void 0
        ? { inside: !1, outside: !1 }
        : o === 1
          ? { inside: !0, outside: !0 }
          : { inside: !1, outside: !1 }
      : o === void 0
        ? { inside: !1, outside: !1 }
        : o === 1
          ? { inside: !0, outside: !1 }
          : { inside: !1, outside: !1 };
}
Iv.peek = kD;
function Iv(e, n, i, a) {
  const o = ED(i),
    u = i.enter("emphasis"),
    c = i.createTracker(a),
    f = c.move(o);
  let h = c.move(
    i.containerPhrasing(e, { after: o, before: f, ...c.current() }),
  );
  const p = h.charCodeAt(0),
    y = Iu(a.before.charCodeAt(a.before.length - 1), p, o);
  y.inside && (h = Ao(p) + h.slice(1));
  const g = h.charCodeAt(h.length - 1),
    x = Iu(a.after.charCodeAt(0), g, o);
  x.inside && (h = h.slice(0, -1) + Ao(g));
  const v = c.move(o);
  return (
    u(),
    (i.attentionEncodeSurroundingInfo = {
      after: x.outside,
      before: y.outside,
    }),
    f + h + v
  );
}
function kD(e, n, i) {
  return i.options.emphasis || "*";
}
function CD(e, n) {
  let i = !1;
  return (
    Op(e, function (a) {
      if (("value" in a && /\r?\n|\r/.test(a.value)) || a.type === "break")
        return ((i = !0), Bh);
    }),
    !!((!e.depth || e.depth < 3) && Ep(e) && (n.options.setext || i))
  );
}
function _D(e, n, i, a) {
  const o = Math.max(Math.min(6, e.depth || 1), 1),
    u = i.createTracker(a);
  if (CD(e, i)) {
    const y = i.enter("headingSetext"),
      g = i.enter("phrasing"),
      x = i.containerPhrasing(e, {
        ...u.current(),
        before: `
`,
        after: `
`,
      });
    return (
      g(),
      y(),
      x +
        `
` +
        (o === 1 ? "=" : "-").repeat(
          x.length -
            (Math.max(
              x.lastIndexOf("\r"),
              x.lastIndexOf(`
`),
            ) +
              1),
        )
    );
  }
  const c = "#".repeat(o),
    f = i.enter("headingAtx"),
    h = i.enter("phrasing");
  u.move(c + " ");
  let p = i.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...u.current(),
  });
  return (
    /^[\t ]/.test(p) && (p = Ao(p.charCodeAt(0)) + p.slice(1)),
    (p = p ? c + " " + p : c),
    i.options.closeAtx && (p += " " + c),
    h(),
    f(),
    p
  );
}
Xv.peek = TD;
function Xv(e) {
  return e.value || "";
}
function TD() {
  return "<";
}
Gv.peek = RD;
function Gv(e, n, i, a) {
  const o = Dp(i),
    u = o === '"' ? "Quote" : "Apostrophe",
    c = i.enter("image");
  let f = i.enter("label");
  const h = i.createTracker(a);
  let p = h.move("![");
  return (
    (p += h.move(i.safe(e.alt, { before: p, after: "]", ...h.current() }))),
    (p += h.move("](")),
    f(),
    (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
      ? ((f = i.enter("destinationLiteral")),
        (p += h.move("<")),
        (p += h.move(i.safe(e.url, { before: p, after: ">", ...h.current() }))),
        (p += h.move(">")))
      : ((f = i.enter("destinationRaw")),
        (p += h.move(
          i.safe(e.url, {
            before: p,
            after: e.title ? " " : ")",
            ...h.current(),
          }),
        ))),
    f(),
    e.title &&
      ((f = i.enter(`title${u}`)),
      (p += h.move(" " + o)),
      (p += h.move(i.safe(e.title, { before: p, after: o, ...h.current() }))),
      (p += h.move(o)),
      f()),
    (p += h.move(")")),
    c(),
    p
  );
}
function RD() {
  return "!";
}
Qv.peek = AD;
function Qv(e, n, i, a) {
  const o = e.referenceType,
    u = i.enter("imageReference");
  let c = i.enter("label");
  const f = i.createTracker(a);
  let h = f.move("![");
  const p = i.safe(e.alt, { before: h, after: "]", ...f.current() });
  ((h += f.move(p + "][")), c());
  const y = i.stack;
  ((i.stack = []), (c = i.enter("reference")));
  const g = i.safe(i.associationId(e), {
    before: h,
    after: "]",
    ...f.current(),
  });
  return (
    c(),
    (i.stack = y),
    u(),
    o === "full" || !p || p !== g
      ? (h += f.move(g + "]"))
      : o === "shortcut"
        ? (h = h.slice(0, -1))
        : (h += f.move("]")),
    h
  );
}
function AD() {
  return "!";
}
Kv.peek = OD;
function Kv(e, n, i) {
  let a = e.value || "",
    o = "`",
    u = -1;
  for (; new RegExp("(^|[^`])" + o + "([^`]|$)").test(a); ) o += "`";
  for (
    /[^ \r\n]/.test(a) &&
    ((/^[ \r\n]/.test(a) && /[ \r\n]$/.test(a)) || /^`|`$/.test(a)) &&
    (a = " " + a + " ");
    ++u < i.unsafe.length;
  ) {
    const c = i.unsafe[u],
      f = i.compilePattern(c);
    let h;
    if (c.atBreak)
      for (; (h = f.exec(a)); ) {
        let p = h.index;
        (a.charCodeAt(p) === 10 && a.charCodeAt(p - 1) === 13 && p--,
          (a = a.slice(0, p) + " " + a.slice(h.index + 1)));
      }
  }
  return o + a + o;
}
function OD() {
  return "`";
}
function Zv(e, n) {
  const i = Ep(e);
  return !!(
    !n.options.resourceLink &&
    e.url &&
    !e.title &&
    e.children &&
    e.children.length === 1 &&
    e.children[0].type === "text" &&
    (i === e.url || "mailto:" + i === e.url) &&
    /^[a-z][a-z+.-]+:/i.test(e.url) &&
    !/[\0- <>\u007F]/.test(e.url)
  );
}
$v.peek = zD;
function $v(e, n, i, a) {
  const o = Dp(i),
    u = o === '"' ? "Quote" : "Apostrophe",
    c = i.createTracker(a);
  let f, h;
  if (Zv(e, i)) {
    const y = i.stack;
    ((i.stack = []), (f = i.enter("autolink")));
    let g = c.move("<");
    return (
      (g += c.move(
        i.containerPhrasing(e, { before: g, after: ">", ...c.current() }),
      )),
      (g += c.move(">")),
      f(),
      (i.stack = y),
      g
    );
  }
  ((f = i.enter("link")), (h = i.enter("label")));
  let p = c.move("[");
  return (
    (p += c.move(
      i.containerPhrasing(e, { before: p, after: "](", ...c.current() }),
    )),
    (p += c.move("](")),
    h(),
    (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
      ? ((h = i.enter("destinationLiteral")),
        (p += c.move("<")),
        (p += c.move(i.safe(e.url, { before: p, after: ">", ...c.current() }))),
        (p += c.move(">")))
      : ((h = i.enter("destinationRaw")),
        (p += c.move(
          i.safe(e.url, {
            before: p,
            after: e.title ? " " : ")",
            ...c.current(),
          }),
        ))),
    h(),
    e.title &&
      ((h = i.enter(`title${u}`)),
      (p += c.move(" " + o)),
      (p += c.move(i.safe(e.title, { before: p, after: o, ...c.current() }))),
      (p += c.move(o)),
      h()),
    (p += c.move(")")),
    f(),
    p
  );
}
function zD(e, n, i) {
  return Zv(e, i) ? "<" : "[";
}
Jv.peek = DD;
function Jv(e, n, i, a) {
  const o = e.referenceType,
    u = i.enter("linkReference");
  let c = i.enter("label");
  const f = i.createTracker(a);
  let h = f.move("[");
  const p = i.containerPhrasing(e, { before: h, after: "]", ...f.current() });
  ((h += f.move(p + "][")), c());
  const y = i.stack;
  ((i.stack = []), (c = i.enter("reference")));
  const g = i.safe(i.associationId(e), {
    before: h,
    after: "]",
    ...f.current(),
  });
  return (
    c(),
    (i.stack = y),
    u(),
    o === "full" || !p || p !== g
      ? (h += f.move(g + "]"))
      : o === "shortcut"
        ? (h = h.slice(0, -1))
        : (h += f.move("]")),
    h
  );
}
function DD() {
  return "[";
}
function Np(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" +
        n +
        "` for `options.bullet`, expected `*`, `+`, or `-`",
    );
  return n;
}
function ND(e) {
  const n = Np(e),
    i = e.options.bulletOther;
  if (!i) return n === "*" ? "-" : "*";
  if (i !== "*" && i !== "+" && i !== "-")
    throw new Error(
      "Cannot serialize items with `" +
        i +
        "` for `options.bulletOther`, expected `*`, `+`, or `-`",
    );
  if (i === n)
    throw new Error(
      "Expected `bullet` (`" +
        n +
        "`) and `bulletOther` (`" +
        i +
        "`) to be different",
    );
  return i;
}
function MD(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" +
        n +
        "` for `options.bulletOrdered`, expected `.` or `)`",
    );
  return n;
}
function Wv(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" +
        n +
        "` for `options.rule`, expected `*`, `-`, or `_`",
    );
  return n;
}
function jD(e, n, i, a) {
  const o = i.enter("list"),
    u = i.bulletCurrent;
  let c = e.ordered ? MD(i) : Np(i);
  const f = e.ordered ? (c === "." ? ")" : ".") : ND(i);
  let h = n && i.bulletLastUsed ? c === i.bulletLastUsed : !1;
  if (!e.ordered) {
    const y = e.children ? e.children[0] : void 0;
    if (
      ((c === "*" || c === "-") &&
        y &&
        (!y.children || !y.children[0]) &&
        i.stack[i.stack.length - 1] === "list" &&
        i.stack[i.stack.length - 2] === "listItem" &&
        i.stack[i.stack.length - 3] === "list" &&
        i.stack[i.stack.length - 4] === "listItem" &&
        i.indexStack[i.indexStack.length - 1] === 0 &&
        i.indexStack[i.indexStack.length - 2] === 0 &&
        i.indexStack[i.indexStack.length - 3] === 0 &&
        (h = !0),
      Wv(i) === c && y)
    ) {
      let g = -1;
      for (; ++g < e.children.length; ) {
        const x = e.children[g];
        if (
          x &&
          x.type === "listItem" &&
          x.children &&
          x.children[0] &&
          x.children[0].type === "thematicBreak"
        ) {
          h = !0;
          break;
        }
      }
    }
  }
  (h && (c = f), (i.bulletCurrent = c));
  const p = i.containerFlow(e, a);
  return ((i.bulletLastUsed = c), (i.bulletCurrent = u), o(), p);
}
function LD(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" +
        n +
        "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`",
    );
  return n;
}
function BD(e, n, i, a) {
  const o = LD(i);
  let u = i.bulletCurrent || Np(i);
  n &&
    n.type === "list" &&
    n.ordered &&
    (u =
      (typeof n.start == "number" && n.start > -1 ? n.start : 1) +
      (i.options.incrementListMarker === !1 ? 0 : n.children.indexOf(e)) +
      u);
  let c = u.length + 1;
  (o === "tab" ||
    (o === "mixed" && ((n && n.type === "list" && n.spread) || e.spread))) &&
    (c = Math.ceil(c / 4) * 4);
  const f = i.createTracker(a);
  (f.move(u + " ".repeat(c - u.length)), f.shift(c));
  const h = i.enter("listItem"),
    p = i.indentLines(i.containerFlow(e, f.current()), y);
  return (h(), p);
  function y(g, x, v) {
    return x
      ? (v ? "" : " ".repeat(c)) + g
      : (v ? u : u + " ".repeat(c - u.length)) + g;
  }
}
function UD(e, n, i, a) {
  const o = i.enter("paragraph"),
    u = i.enter("phrasing"),
    c = i.containerPhrasing(e, a);
  return (u(), o(), c);
}
const HD = dc([
  "break",
  "delete",
  "emphasis",
  "footnote",
  "footnoteReference",
  "image",
  "imageReference",
  "inlineCode",
  "inlineMath",
  "link",
  "linkReference",
  "mdxJsxTextElement",
  "mdxTextExpression",
  "strong",
  "text",
  "textDirective",
]);
function qD(e, n, i, a) {
  return (
    e.children.some(function (c) {
      return HD(c);
    })
      ? i.containerPhrasing
      : i.containerFlow
  ).call(i, e, a);
}
function FD(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" +
        n +
        "` for `options.strong`, expected `*`, or `_`",
    );
  return n;
}
eS.peek = PD;
function eS(e, n, i, a) {
  const o = FD(i),
    u = i.enter("strong"),
    c = i.createTracker(a),
    f = c.move(o + o);
  let h = c.move(
    i.containerPhrasing(e, { after: o, before: f, ...c.current() }),
  );
  const p = h.charCodeAt(0),
    y = Iu(a.before.charCodeAt(a.before.length - 1), p, o);
  y.inside && (h = Ao(p) + h.slice(1));
  const g = h.charCodeAt(h.length - 1),
    x = Iu(a.after.charCodeAt(0), g, o);
  x.inside && (h = h.slice(0, -1) + Ao(g));
  const v = c.move(o + o);
  return (
    u(),
    (i.attentionEncodeSurroundingInfo = {
      after: x.outside,
      before: y.outside,
    }),
    f + h + v
  );
}
function PD(e, n, i) {
  return i.options.strong || "*";
}
function VD(e, n, i, a) {
  return i.safe(e.value, a);
}
function YD(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" +
        n +
        "` for `options.ruleRepetition`, expected `3` or more",
    );
  return n;
}
function ID(e, n, i) {
  const a = (Wv(i) + (i.options.ruleSpaces ? " " : "")).repeat(YD(i));
  return i.options.ruleSpaces ? a.slice(0, -1) : a;
}
const tS = {
  blockquote: pD,
  break: R1,
  code: vD,
  definition: wD,
  emphasis: Iv,
  hardBreak: R1,
  heading: _D,
  html: Xv,
  image: Gv,
  imageReference: Qv,
  inlineCode: Kv,
  link: $v,
  linkReference: Jv,
  list: jD,
  listItem: BD,
  paragraph: UD,
  root: qD,
  strong: eS,
  text: VD,
  thematicBreak: ID,
};
function XD() {
  return {
    enter: { table: GD, tableData: A1, tableHeader: A1, tableRow: KD },
    exit: {
      codeText: ZD,
      table: QD,
      tableData: ch,
      tableHeader: ch,
      tableRow: ch,
    },
  };
}
function GD(e) {
  const n = e._align;
  (this.enter(
    {
      type: "table",
      align: n.map(function (i) {
        return i === "none" ? null : i;
      }),
      children: [],
    },
    e,
  ),
    (this.data.inTable = !0));
}
function QD(e) {
  (this.exit(e), (this.data.inTable = void 0));
}
function KD(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function ch(e) {
  this.exit(e);
}
function A1(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function ZD(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, $D));
  const i = this.stack[this.stack.length - 1];
  (i.type, (i.value = n), this.exit(e));
}
function $D(e, n) {
  return n === "|" ? n : e;
}
function JD(e) {
  const n = e || {},
    i = n.tableCellPadding,
    a = n.tablePipeAlign,
    o = n.stringLength,
    u = i ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      {
        character: `
`,
        inConstruct: "tableCell",
      },
      { atBreak: !0, character: "|", after: "[	 :-]" },
      { character: "|", inConstruct: "tableCell" },
      { atBreak: !0, character: ":", after: "-" },
      { atBreak: !0, character: "-", after: "[:|-]" },
    ],
    handlers: { inlineCode: x, table: c, tableCell: h, tableRow: f },
  };
  function c(v, S, _, k) {
    return p(y(v, _, k), v.align);
  }
  function f(v, S, _, k) {
    const T = g(v, _, k),
      j = p([T]);
    return j.slice(
      0,
      j.indexOf(`
`),
    );
  }
  function h(v, S, _, k) {
    const T = _.enter("tableCell"),
      j = _.enter("phrasing"),
      M = _.containerPhrasing(v, { ...k, before: u, after: u });
    return (j(), T(), M);
  }
  function p(v, S) {
    return dD(v, { align: S, alignDelimiters: a, padding: i, stringLength: o });
  }
  function y(v, S, _) {
    const k = v.children;
    let T = -1;
    const j = [],
      M = S.enter("table");
    for (; ++T < k.length; ) j[T] = g(k[T], S, _);
    return (M(), j);
  }
  function g(v, S, _) {
    const k = v.children;
    let T = -1;
    const j = [],
      M = S.enter("tableRow");
    for (; ++T < k.length; ) j[T] = h(k[T], v, S, _);
    return (M(), j);
  }
  function x(v, S, _) {
    let k = tS.inlineCode(v, S, _);
    return (_.stack.includes("tableCell") && (k = k.replace(/\|/g, "\\$&")), k);
  }
}
function WD() {
  return {
    exit: {
      taskListCheckValueChecked: O1,
      taskListCheckValueUnchecked: O1,
      paragraph: tN,
    },
  };
}
function eN() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: nN },
  };
}
function O1(e) {
  const n = this.stack[this.stack.length - 2];
  (n.type, (n.checked = e.type === "taskListCheckValueChecked"));
}
function tN(e) {
  const n = this.stack[this.stack.length - 2];
  if (n && n.type === "listItem" && typeof n.checked == "boolean") {
    const i = this.stack[this.stack.length - 1];
    i.type;
    const a = i.children[0];
    if (a && a.type === "text") {
      const o = n.children;
      let u = -1,
        c;
      for (; ++u < o.length; ) {
        const f = o[u];
        if (f.type === "paragraph") {
          c = f;
          break;
        }
      }
      c === i &&
        ((a.value = a.value.slice(1)),
        a.value.length === 0
          ? i.children.shift()
          : i.position &&
            a.position &&
            typeof a.position.start.offset == "number" &&
            (a.position.start.column++,
            a.position.start.offset++,
            (i.position.start = Object.assign({}, a.position.start))));
    }
  }
  this.exit(e);
}
function nN(e, n, i, a) {
  const o = e.children[0],
    u = typeof e.checked == "boolean" && o && o.type === "paragraph",
    c = "[" + (e.checked ? "x" : " ") + "] ",
    f = i.createTracker(a);
  u && f.move(c);
  let h = tS.listItem(e, n, i, { ...a, ...f.current() });
  return (u && (h = h.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, p)), h);
  function p(y) {
    return y + c;
  }
}
function rN() {
  return [jz(), nD(), lD(), XD(), WD()];
}
function iN(e) {
  return { extensions: [Lz(), rD(e), oD(), JD(e), eN()] };
}
const aN = { tokenize: fN, partial: !0 },
  nS = { tokenize: dN, partial: !0 },
  rS = { tokenize: hN, partial: !0 },
  iS = { tokenize: pN, partial: !0 },
  lN = { tokenize: mN, partial: !0 },
  aS = { name: "wwwAutolink", tokenize: uN, previous: oS },
  lS = { name: "protocolAutolink", tokenize: cN, previous: sS },
  Qr = { name: "emailAutolink", tokenize: sN, previous: uS },
  vr = {};
function oN() {
  return { text: vr };
}
let Ji = 48;
for (; Ji < 123; )
  ((vr[Ji] = Qr), Ji++, Ji === 58 ? (Ji = 65) : Ji === 91 && (Ji = 97));
vr[43] = Qr;
vr[45] = Qr;
vr[46] = Qr;
vr[95] = Qr;
vr[72] = [Qr, lS];
vr[104] = [Qr, lS];
vr[87] = [Qr, aS];
vr[119] = [Qr, aS];
function sN(e, n, i) {
  const a = this;
  let o, u;
  return c;
  function c(g) {
    return !Fh(g) || !uS.call(a, a.previous) || Mp(a.events)
      ? i(g)
      : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), f(g));
  }
  function f(g) {
    return Fh(g) ? (e.consume(g), f) : g === 64 ? (e.consume(g), h) : i(g);
  }
  function h(g) {
    return g === 46
      ? e.check(lN, y, p)(g)
      : g === 45 || g === 95 || tn(g)
        ? ((u = !0), e.consume(g), h)
        : y(g);
  }
  function p(g) {
    return (e.consume(g), (o = !0), h);
  }
  function y(g) {
    return u && o && an(a.previous)
      ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(g))
      : i(g);
  }
}
function uN(e, n, i) {
  const a = this;
  return o;
  function o(c) {
    return (c !== 87 && c !== 119) || !oS.call(a, a.previous) || Mp(a.events)
      ? i(c)
      : (e.enter("literalAutolink"),
        e.enter("literalAutolinkWww"),
        e.check(aN, e.attempt(nS, e.attempt(rS, u), i), i)(c));
  }
  function u(c) {
    return (e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(c));
  }
}
function cN(e, n, i) {
  const a = this;
  let o = "",
    u = !1;
  return c;
  function c(g) {
    return (g === 72 || g === 104) && sS.call(a, a.previous) && !Mp(a.events)
      ? (e.enter("literalAutolink"),
        e.enter("literalAutolinkHttp"),
        (o += String.fromCodePoint(g)),
        e.consume(g),
        f)
      : i(g);
  }
  function f(g) {
    if (an(g) && o.length < 5)
      return ((o += String.fromCodePoint(g)), e.consume(g), f);
    if (g === 58) {
      const x = o.toLowerCase();
      if (x === "http" || x === "https") return (e.consume(g), h);
    }
    return i(g);
  }
  function h(g) {
    return g === 47 ? (e.consume(g), u ? p : ((u = !0), h)) : i(g);
  }
  function p(g) {
    return g === null || Pu(g) || ft(g) || aa(g) || uc(g)
      ? i(g)
      : e.attempt(nS, e.attempt(rS, y), i)(g);
  }
  function y(g) {
    return (e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(g));
  }
}
function fN(e, n, i) {
  let a = 0;
  return o;
  function o(c) {
    return (c === 87 || c === 119) && a < 3
      ? (a++, e.consume(c), o)
      : c === 46 && a === 3
        ? (e.consume(c), u)
        : i(c);
  }
  function u(c) {
    return c === null ? i(c) : n(c);
  }
}
function dN(e, n, i) {
  let a, o, u;
  return c;
  function c(p) {
    return p === 46 || p === 95
      ? e.check(iS, h, f)(p)
      : p === null || ft(p) || aa(p) || (p !== 45 && uc(p))
        ? h(p)
        : ((u = !0), e.consume(p), c);
  }
  function f(p) {
    return (p === 95 ? (a = !0) : ((o = a), (a = void 0)), e.consume(p), c);
  }
  function h(p) {
    return o || a || !u ? i(p) : n(p);
  }
}
function hN(e, n) {
  let i = 0,
    a = 0;
  return o;
  function o(c) {
    return c === 40
      ? (i++, e.consume(c), o)
      : c === 41 && a < i
        ? u(c)
        : c === 33 ||
            c === 34 ||
            c === 38 ||
            c === 39 ||
            c === 41 ||
            c === 42 ||
            c === 44 ||
            c === 46 ||
            c === 58 ||
            c === 59 ||
            c === 60 ||
            c === 63 ||
            c === 93 ||
            c === 95 ||
            c === 126
          ? e.check(iS, n, u)(c)
          : c === null || ft(c) || aa(c)
            ? n(c)
            : (e.consume(c), o);
  }
  function u(c) {
    return (c === 41 && a++, e.consume(c), o);
  }
}
function pN(e, n, i) {
  return a;
  function a(f) {
    return f === 33 ||
      f === 34 ||
      f === 39 ||
      f === 41 ||
      f === 42 ||
      f === 44 ||
      f === 46 ||
      f === 58 ||
      f === 59 ||
      f === 63 ||
      f === 95 ||
      f === 126
      ? (e.consume(f), a)
      : f === 38
        ? (e.consume(f), u)
        : f === 93
          ? (e.consume(f), o)
          : f === 60 || f === null || ft(f) || aa(f)
            ? n(f)
            : i(f);
  }
  function o(f) {
    return f === null || f === 40 || f === 91 || ft(f) || aa(f) ? n(f) : a(f);
  }
  function u(f) {
    return an(f) ? c(f) : i(f);
  }
  function c(f) {
    return f === 59 ? (e.consume(f), a) : an(f) ? (e.consume(f), c) : i(f);
  }
}
function mN(e, n, i) {
  return a;
  function a(u) {
    return (e.consume(u), o);
  }
  function o(u) {
    return tn(u) ? i(u) : n(u);
  }
}
function oS(e) {
  return (
    e === null ||
    e === 40 ||
    e === 42 ||
    e === 95 ||
    e === 91 ||
    e === 93 ||
    e === 126 ||
    ft(e)
  );
}
function sS(e) {
  return !an(e);
}
function uS(e) {
  return !(e === 47 || Fh(e));
}
function Fh(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || tn(e);
}
function Mp(e) {
  let n = e.length,
    i = !1;
  for (; n--; ) {
    const a = e[n][1];
    if ((a.type === "labelLink" || a.type === "labelImage") && !a._balanced) {
      i = !0;
      break;
    }
    if (a._gfmAutolinkLiteralWalkedInto) {
      i = !1;
      break;
    }
  }
  return (
    e.length > 0 &&
      !i &&
      (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0),
    i
  );
}
const gN = { tokenize: kN, partial: !0 };
function yN() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: SN,
        continuation: { tokenize: wN },
        exit: EN,
      },
    },
    text: {
      91: { name: "gfmFootnoteCall", tokenize: vN },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: bN,
        resolveTo: xN,
      },
    },
  };
}
function bN(e, n, i) {
  const a = this;
  let o = a.events.length;
  const u = a.parser.gfmFootnotes || (a.parser.gfmFootnotes = []);
  let c;
  for (; o--; ) {
    const h = a.events[o][1];
    if (h.type === "labelImage") {
      c = h;
      break;
    }
    if (
      h.type === "gfmFootnoteCall" ||
      h.type === "labelLink" ||
      h.type === "label" ||
      h.type === "image" ||
      h.type === "link"
    )
      break;
  }
  return f;
  function f(h) {
    if (!c || !c._balanced) return i(h);
    const p = ir(a.sliceSerialize({ start: c.end, end: a.now() }));
    return p.codePointAt(0) !== 94 || !u.includes(p.slice(1))
      ? i(h)
      : (e.enter("gfmFootnoteCallLabelMarker"),
        e.consume(h),
        e.exit("gfmFootnoteCallLabelMarker"),
        n(h));
  }
}
function xN(e, n) {
  let i = e.length;
  for (; i--; )
    if (e[i][1].type === "labelImage" && e[i][0] === "enter") {
      e[i][1];
      break;
    }
  ((e[i + 1][1].type = "data"),
    (e[i + 3][1].type = "gfmFootnoteCallLabelMarker"));
  const a = {
      type: "gfmFootnoteCall",
      start: Object.assign({}, e[i + 3][1].start),
      end: Object.assign({}, e[e.length - 1][1].end),
    },
    o = {
      type: "gfmFootnoteCallMarker",
      start: Object.assign({}, e[i + 3][1].end),
      end: Object.assign({}, e[i + 3][1].end),
    };
  (o.end.column++, o.end.offset++, o.end._bufferIndex++);
  const u = {
      type: "gfmFootnoteCallString",
      start: Object.assign({}, o.end),
      end: Object.assign({}, e[e.length - 1][1].start),
    },
    c = {
      type: "chunkString",
      contentType: "string",
      start: Object.assign({}, u.start),
      end: Object.assign({}, u.end),
    },
    f = [
      e[i + 1],
      e[i + 2],
      ["enter", a, n],
      e[i + 3],
      e[i + 4],
      ["enter", o, n],
      ["exit", o, n],
      ["enter", u, n],
      ["enter", c, n],
      ["exit", c, n],
      ["exit", u, n],
      e[e.length - 2],
      e[e.length - 1],
      ["exit", a, n],
    ];
  return (e.splice(i, e.length - i + 1, ...f), e);
}
function vN(e, n, i) {
  const a = this,
    o = a.parser.gfmFootnotes || (a.parser.gfmFootnotes = []);
  let u = 0,
    c;
  return f;
  function f(g) {
    return (
      e.enter("gfmFootnoteCall"),
      e.enter("gfmFootnoteCallLabelMarker"),
      e.consume(g),
      e.exit("gfmFootnoteCallLabelMarker"),
      h
    );
  }
  function h(g) {
    return g !== 94
      ? i(g)
      : (e.enter("gfmFootnoteCallMarker"),
        e.consume(g),
        e.exit("gfmFootnoteCallMarker"),
        e.enter("gfmFootnoteCallString"),
        (e.enter("chunkString").contentType = "string"),
        p);
  }
  function p(g) {
    if (u > 999 || (g === 93 && !c) || g === null || g === 91 || ft(g))
      return i(g);
    if (g === 93) {
      e.exit("chunkString");
      const x = e.exit("gfmFootnoteCallString");
      return o.includes(ir(a.sliceSerialize(x)))
        ? (e.enter("gfmFootnoteCallLabelMarker"),
          e.consume(g),
          e.exit("gfmFootnoteCallLabelMarker"),
          e.exit("gfmFootnoteCall"),
          n)
        : i(g);
    }
    return (ft(g) || (c = !0), u++, e.consume(g), g === 92 ? y : p);
  }
  function y(g) {
    return g === 91 || g === 92 || g === 93 ? (e.consume(g), u++, p) : p(g);
  }
}
function SN(e, n, i) {
  const a = this,
    o = a.parser.gfmFootnotes || (a.parser.gfmFootnotes = []);
  let u,
    c = 0,
    f;
  return h;
  function h(S) {
    return (
      (e.enter("gfmFootnoteDefinition")._container = !0),
      e.enter("gfmFootnoteDefinitionLabel"),
      e.enter("gfmFootnoteDefinitionLabelMarker"),
      e.consume(S),
      e.exit("gfmFootnoteDefinitionLabelMarker"),
      p
    );
  }
  function p(S) {
    return S === 94
      ? (e.enter("gfmFootnoteDefinitionMarker"),
        e.consume(S),
        e.exit("gfmFootnoteDefinitionMarker"),
        e.enter("gfmFootnoteDefinitionLabelString"),
        (e.enter("chunkString").contentType = "string"),
        y)
      : i(S);
  }
  function y(S) {
    if (c > 999 || (S === 93 && !f) || S === null || S === 91 || ft(S))
      return i(S);
    if (S === 93) {
      e.exit("chunkString");
      const _ = e.exit("gfmFootnoteDefinitionLabelString");
      return (
        (u = ir(a.sliceSerialize(_))),
        e.enter("gfmFootnoteDefinitionLabelMarker"),
        e.consume(S),
        e.exit("gfmFootnoteDefinitionLabelMarker"),
        e.exit("gfmFootnoteDefinitionLabel"),
        x
      );
    }
    return (ft(S) || (f = !0), c++, e.consume(S), S === 92 ? g : y);
  }
  function g(S) {
    return S === 91 || S === 92 || S === 93 ? (e.consume(S), c++, y) : y(S);
  }
  function x(S) {
    return S === 58
      ? (e.enter("definitionMarker"),
        e.consume(S),
        e.exit("definitionMarker"),
        o.includes(u) || o.push(u),
        $e(e, v, "gfmFootnoteDefinitionWhitespace"))
      : i(S);
  }
  function v(S) {
    return n(S);
  }
}
function wN(e, n, i) {
  return e.check(Vo, n, e.attempt(gN, n, i));
}
function EN(e) {
  e.exit("gfmFootnoteDefinition");
}
function kN(e, n, i) {
  const a = this;
  return $e(e, o, "gfmFootnoteDefinitionIndent", 5);
  function o(u) {
    const c = a.events[a.events.length - 1];
    return c &&
      c[1].type === "gfmFootnoteDefinitionIndent" &&
      c[2].sliceSerialize(c[1], !0).length === 4
      ? n(u)
      : i(u);
  }
}
function CN(e) {
  let i = (e || {}).singleTilde;
  const a = { name: "strikethrough", tokenize: u, resolveAll: o };
  return (
    i == null && (i = !0),
    {
      text: { 126: a },
      insideSpan: { null: [a] },
      attentionMarkers: { null: [126] },
    }
  );
  function o(c, f) {
    let h = -1;
    for (; ++h < c.length; )
      if (
        c[h][0] === "enter" &&
        c[h][1].type === "strikethroughSequenceTemporary" &&
        c[h][1]._close
      ) {
        let p = h;
        for (; p--; )
          if (
            c[p][0] === "exit" &&
            c[p][1].type === "strikethroughSequenceTemporary" &&
            c[p][1]._open &&
            c[h][1].end.offset - c[h][1].start.offset ===
              c[p][1].end.offset - c[p][1].start.offset
          ) {
            ((c[h][1].type = "strikethroughSequence"),
              (c[p][1].type = "strikethroughSequence"));
            const y = {
                type: "strikethrough",
                start: Object.assign({}, c[p][1].start),
                end: Object.assign({}, c[h][1].end),
              },
              g = {
                type: "strikethroughText",
                start: Object.assign({}, c[p][1].end),
                end: Object.assign({}, c[h][1].start),
              },
              x = [
                ["enter", y, f],
                ["enter", c[p][1], f],
                ["exit", c[p][1], f],
                ["enter", g, f],
              ],
              v = f.parser.constructs.insideSpan.null;
            (v && An(x, x.length, 0, cc(v, c.slice(p + 1, h), f)),
              An(x, x.length, 0, [
                ["exit", g, f],
                ["enter", c[h][1], f],
                ["exit", c[h][1], f],
                ["exit", y, f],
              ]),
              An(c, p - 1, h - p + 3, x),
              (h = p + x.length - 2));
            break;
          }
      }
    for (h = -1; ++h < c.length; )
      c[h][1].type === "strikethroughSequenceTemporary" &&
        (c[h][1].type = "data");
    return c;
  }
  function u(c, f, h) {
    const p = this.previous,
      y = this.events;
    let g = 0;
    return x;
    function x(S) {
      return p === 126 && y[y.length - 1][1].type !== "characterEscape"
        ? h(S)
        : (c.enter("strikethroughSequenceTemporary"), v(S));
    }
    function v(S) {
      const _ = al(p);
      if (S === 126) return g > 1 ? h(S) : (c.consume(S), g++, v);
      if (g < 2 && !i) return h(S);
      const k = c.exit("strikethroughSequenceTemporary"),
        T = al(S);
      return (
        (k._open = !T || (T === 2 && !!_)),
        (k._close = !_ || (_ === 2 && !!T)),
        f(S)
      );
    }
  }
}
class _N {
  constructor() {
    this.map = [];
  }
  add(n, i, a) {
    TN(this, n, i, a);
  }
  consume(n) {
    if (
      (this.map.sort(function (u, c) {
        return u[0] - c[0];
      }),
      this.map.length === 0)
    )
      return;
    let i = this.map.length;
    const a = [];
    for (; i > 0; )
      ((i -= 1),
        a.push(n.slice(this.map[i][0] + this.map[i][1]), this.map[i][2]),
        (n.length = this.map[i][0]));
    (a.push(n.slice()), (n.length = 0));
    let o = a.pop();
    for (; o; ) {
      for (const u of o) n.push(u);
      o = a.pop();
    }
    this.map.length = 0;
  }
}
function TN(e, n, i, a) {
  let o = 0;
  if (!(i === 0 && a.length === 0)) {
    for (; o < e.map.length; ) {
      if (e.map[o][0] === n) {
        ((e.map[o][1] += i), e.map[o][2].push(...a));
        return;
      }
      o += 1;
    }
    e.map.push([n, i, a]);
  }
}
function RN(e, n) {
  let i = !1;
  const a = [];
  for (; n < e.length; ) {
    const o = e[n];
    if (i) {
      if (o[0] === "enter")
        o[1].type === "tableContent" &&
          a.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (o[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const u = a.length - 1;
          a[u] = a[u] === "left" ? "center" : "right";
        }
      } else if (o[1].type === "tableDelimiterRow") break;
    } else o[0] === "enter" && o[1].type === "tableDelimiterRow" && (i = !0);
    n += 1;
  }
  return a;
}
function AN() {
  return { flow: { null: { name: "table", tokenize: ON, resolveAll: zN } } };
}
function ON(e, n, i) {
  const a = this;
  let o = 0,
    u = 0,
    c;
  return f;
  function f(F) {
    let oe = a.events.length - 1;
    for (; oe > -1; ) {
      const le = a.events[oe][1].type;
      if (le === "lineEnding" || le === "linePrefix") oe--;
      else break;
    }
    const ie = oe > -1 ? a.events[oe][1].type : null,
      Ee = ie === "tableHead" || ie === "tableRow" ? U : h;
    return Ee === U && a.parser.lazy[a.now().line] ? i(F) : Ee(F);
  }
  function h(F) {
    return (e.enter("tableHead"), e.enter("tableRow"), p(F));
  }
  function p(F) {
    return (F === 124 || ((c = !0), (u += 1)), y(F));
  }
  function y(F) {
    return F === null
      ? i(F)
      : Ae(F)
        ? u > 1
          ? ((u = 0),
            (a.interrupt = !0),
            e.exit("tableRow"),
            e.enter("lineEnding"),
            e.consume(F),
            e.exit("lineEnding"),
            v)
          : i(F)
        : Ye(F)
          ? $e(e, y, "whitespace")(F)
          : ((u += 1),
            c && ((c = !1), (o += 1)),
            F === 124
              ? (e.enter("tableCellDivider"),
                e.consume(F),
                e.exit("tableCellDivider"),
                (c = !0),
                y)
              : (e.enter("data"), g(F)));
  }
  function g(F) {
    return F === null || F === 124 || ft(F)
      ? (e.exit("data"), y(F))
      : (e.consume(F), F === 92 ? x : g);
  }
  function x(F) {
    return F === 92 || F === 124 ? (e.consume(F), g) : g(F);
  }
  function v(F) {
    return (
      (a.interrupt = !1),
      a.parser.lazy[a.now().line]
        ? i(F)
        : (e.enter("tableDelimiterRow"),
          (c = !1),
          Ye(F)
            ? $e(
                e,
                S,
                "linePrefix",
                a.parser.constructs.disable.null.includes("codeIndented")
                  ? void 0
                  : 4,
              )(F)
            : S(F))
    );
  }
  function S(F) {
    return F === 45 || F === 58
      ? k(F)
      : F === 124
        ? ((c = !0),
          e.enter("tableCellDivider"),
          e.consume(F),
          e.exit("tableCellDivider"),
          _)
        : Z(F);
  }
  function _(F) {
    return Ye(F) ? $e(e, k, "whitespace")(F) : k(F);
  }
  function k(F) {
    return F === 58
      ? ((u += 1),
        (c = !0),
        e.enter("tableDelimiterMarker"),
        e.consume(F),
        e.exit("tableDelimiterMarker"),
        T)
      : F === 45
        ? ((u += 1), T(F))
        : F === null || Ae(F)
          ? $(F)
          : Z(F);
  }
  function T(F) {
    return F === 45 ? (e.enter("tableDelimiterFiller"), j(F)) : Z(F);
  }
  function j(F) {
    return F === 45
      ? (e.consume(F), j)
      : F === 58
        ? ((c = !0),
          e.exit("tableDelimiterFiller"),
          e.enter("tableDelimiterMarker"),
          e.consume(F),
          e.exit("tableDelimiterMarker"),
          M)
        : (e.exit("tableDelimiterFiller"), M(F));
  }
  function M(F) {
    return Ye(F) ? $e(e, $, "whitespace")(F) : $(F);
  }
  function $(F) {
    return F === 124
      ? S(F)
      : F === null || Ae(F)
        ? !c || o !== u
          ? Z(F)
          : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(F))
        : Z(F);
  }
  function Z(F) {
    return i(F);
  }
  function U(F) {
    return (e.enter("tableRow"), K(F));
  }
  function K(F) {
    return F === 124
      ? (e.enter("tableCellDivider"),
        e.consume(F),
        e.exit("tableCellDivider"),
        K)
      : F === null || Ae(F)
        ? (e.exit("tableRow"), n(F))
        : Ye(F)
          ? $e(e, K, "whitespace")(F)
          : (e.enter("data"), N(F));
  }
  function N(F) {
    return F === null || F === 124 || ft(F)
      ? (e.exit("data"), K(F))
      : (e.consume(F), F === 92 ? he : N);
  }
  function he(F) {
    return F === 92 || F === 124 ? (e.consume(F), N) : N(F);
  }
}
function zN(e, n) {
  let i = -1,
    a = !0,
    o = 0,
    u = [0, 0, 0, 0],
    c = [0, 0, 0, 0],
    f = !1,
    h = 0,
    p,
    y,
    g;
  const x = new _N();
  for (; ++i < e.length; ) {
    const v = e[i],
      S = v[1];
    v[0] === "enter"
      ? S.type === "tableHead"
        ? ((f = !1),
          h !== 0 && (z1(x, n, h, p, y), (y = void 0), (h = 0)),
          (p = {
            type: "table",
            start: Object.assign({}, S.start),
            end: Object.assign({}, S.end),
          }),
          x.add(i, 0, [["enter", p, n]]))
        : S.type === "tableRow" || S.type === "tableDelimiterRow"
          ? ((a = !0),
            (g = void 0),
            (u = [0, 0, 0, 0]),
            (c = [0, i + 1, 0, 0]),
            f &&
              ((f = !1),
              (y = {
                type: "tableBody",
                start: Object.assign({}, S.start),
                end: Object.assign({}, S.end),
              }),
              x.add(i, 0, [["enter", y, n]])),
            (o = S.type === "tableDelimiterRow" ? 2 : y ? 3 : 1))
          : o &&
              (S.type === "data" ||
                S.type === "tableDelimiterMarker" ||
                S.type === "tableDelimiterFiller")
            ? ((a = !1),
              c[2] === 0 &&
                (u[1] !== 0 &&
                  ((c[0] = c[1]),
                  (g = mu(x, n, u, o, void 0, g)),
                  (u = [0, 0, 0, 0])),
                (c[2] = i)))
            : S.type === "tableCellDivider" &&
              (a
                ? (a = !1)
                : (u[1] !== 0 &&
                    ((c[0] = c[1]), (g = mu(x, n, u, o, void 0, g))),
                  (u = c),
                  (c = [u[1], i, 0, 0])))
      : S.type === "tableHead"
        ? ((f = !0), (h = i))
        : S.type === "tableRow" || S.type === "tableDelimiterRow"
          ? ((h = i),
            u[1] !== 0
              ? ((c[0] = c[1]), (g = mu(x, n, u, o, i, g)))
              : c[1] !== 0 && (g = mu(x, n, c, o, i, g)),
            (o = 0))
          : o &&
            (S.type === "data" ||
              S.type === "tableDelimiterMarker" ||
              S.type === "tableDelimiterFiller") &&
            (c[3] = i);
  }
  for (
    h !== 0 && z1(x, n, h, p, y), x.consume(n.events), i = -1;
    ++i < n.events.length;
  ) {
    const v = n.events[i];
    v[0] === "enter" &&
      v[1].type === "table" &&
      (v[1]._align = RN(n.events, i));
  }
  return e;
}
function mu(e, n, i, a, o, u) {
  const c = a === 1 ? "tableHeader" : a === 2 ? "tableDelimiter" : "tableData",
    f = "tableContent";
  i[0] !== 0 &&
    ((u.end = Object.assign({}, $a(n.events, i[0]))),
    e.add(i[0], 0, [["exit", u, n]]));
  const h = $a(n.events, i[1]);
  if (
    ((u = { type: c, start: Object.assign({}, h), end: Object.assign({}, h) }),
    e.add(i[1], 0, [["enter", u, n]]),
    i[2] !== 0)
  ) {
    const p = $a(n.events, i[2]),
      y = $a(n.events, i[3]),
      g = { type: f, start: Object.assign({}, p), end: Object.assign({}, y) };
    if ((e.add(i[2], 0, [["enter", g, n]]), a !== 2)) {
      const x = n.events[i[2]],
        v = n.events[i[3]];
      if (
        ((x[1].end = Object.assign({}, v[1].end)),
        (x[1].type = "chunkText"),
        (x[1].contentType = "text"),
        i[3] > i[2] + 1)
      ) {
        const S = i[2] + 1,
          _ = i[3] - i[2] - 1;
        e.add(S, _, []);
      }
    }
    e.add(i[3] + 1, 0, [["exit", g, n]]);
  }
  return (
    o !== void 0 &&
      ((u.end = Object.assign({}, $a(n.events, o))),
      e.add(o, 0, [["exit", u, n]]),
      (u = void 0)),
    u
  );
}
function z1(e, n, i, a, o) {
  const u = [],
    c = $a(n.events, i);
  (o && ((o.end = Object.assign({}, c)), u.push(["exit", o, n])),
    (a.end = Object.assign({}, c)),
    u.push(["exit", a, n]),
    e.add(i + 1, 0, u));
}
function $a(e, n) {
  const i = e[n],
    a = i[0] === "enter" ? "start" : "end";
  return i[1][a];
}
const DN = { name: "tasklistCheck", tokenize: MN };
function NN() {
  return { text: { 91: DN } };
}
function MN(e, n, i) {
  const a = this;
  return o;
  function o(h) {
    return a.previous !== null || !a._gfmTasklistFirstContentOfListItem
      ? i(h)
      : (e.enter("taskListCheck"),
        e.enter("taskListCheckMarker"),
        e.consume(h),
        e.exit("taskListCheckMarker"),
        u);
  }
  function u(h) {
    return ft(h)
      ? (e.enter("taskListCheckValueUnchecked"),
        e.consume(h),
        e.exit("taskListCheckValueUnchecked"),
        c)
      : h === 88 || h === 120
        ? (e.enter("taskListCheckValueChecked"),
          e.consume(h),
          e.exit("taskListCheckValueChecked"),
          c)
        : i(h);
  }
  function c(h) {
    return h === 93
      ? (e.enter("taskListCheckMarker"),
        e.consume(h),
        e.exit("taskListCheckMarker"),
        e.exit("taskListCheck"),
        f)
      : i(h);
  }
  function f(h) {
    return Ae(h) ? n(h) : Ye(h) ? e.check({ tokenize: jN }, n, i)(h) : i(h);
  }
}
function jN(e, n, i) {
  return $e(e, a, "whitespace");
  function a(o) {
    return o === null ? i(o) : n(o);
  }
}
function LN(e) {
  return xv([oN(), yN(), CN(e), AN(), NN()]);
}
const BN = {};
function cS(e) {
  const n = this,
    i = e || BN,
    a = n.data(),
    o = a.micromarkExtensions || (a.micromarkExtensions = []),
    u = a.fromMarkdownExtensions || (a.fromMarkdownExtensions = []),
    c = a.toMarkdownExtensions || (a.toMarkdownExtensions = []);
  (o.push(LN(i)), u.push(rN()), c.push(iN(i)));
}
const xr = Object.create(null);
xr.open = "0";
xr.close = "1";
xr.ping = "2";
xr.pong = "3";
xr.message = "4";
xr.upgrade = "5";
xr.noop = "6";
const Tu = Object.create(null);
Object.keys(xr).forEach((e) => {
  Tu[xr[e]] = e;
});
const Ph = { type: "error", data: "parser error" },
  fS =
    typeof Blob == "function" ||
    (typeof Blob < "u" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  dS = typeof ArrayBuffer == "function",
  hS = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e && e.buffer instanceof ArrayBuffer,
  jp = ({ type: e, data: n }, i, a) =>
    fS && n instanceof Blob
      ? i
        ? a(n)
        : D1(n, a)
      : dS && (n instanceof ArrayBuffer || hS(n))
        ? i
          ? a(n)
          : D1(new Blob([n]), a)
        : a(xr[e] + (n || "")),
  D1 = (e, n) => {
    const i = new FileReader();
    return (
      (i.onload = function () {
        const a = i.result.split(",")[1];
        n("b" + (a || ""));
      }),
      i.readAsDataURL(e)
    );
  };
function N1(e) {
  return e instanceof Uint8Array
    ? e
    : e instanceof ArrayBuffer
      ? new Uint8Array(e)
      : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let fh;
function UN(e, n) {
  if (fS && e.data instanceof Blob)
    return e.data.arrayBuffer().then(N1).then(n);
  if (dS && (e.data instanceof ArrayBuffer || hS(e.data))) return n(N1(e.data));
  jp(e, !1, (i) => {
    (fh || (fh = new TextEncoder()), n(fh.encode(i)));
  });
}
const M1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  go = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < M1.length; e++) go[M1.charCodeAt(e)] = e;
const HN = (e) => {
    let n = e.length * 0.75,
      i = e.length,
      a,
      o = 0,
      u,
      c,
      f,
      h;
    e[e.length - 1] === "=" && (n--, e[e.length - 2] === "=" && n--);
    const p = new ArrayBuffer(n),
      y = new Uint8Array(p);
    for (a = 0; a < i; a += 4)
      ((u = go[e.charCodeAt(a)]),
        (c = go[e.charCodeAt(a + 1)]),
        (f = go[e.charCodeAt(a + 2)]),
        (h = go[e.charCodeAt(a + 3)]),
        (y[o++] = (u << 2) | (c >> 4)),
        (y[o++] = ((c & 15) << 4) | (f >> 2)),
        (y[o++] = ((f & 3) << 6) | (h & 63)));
    return p;
  },
  qN = typeof ArrayBuffer == "function",
  Lp = (e, n) => {
    if (typeof e != "string") return { type: "message", data: pS(e, n) };
    const i = e.charAt(0);
    return i === "b"
      ? { type: "message", data: FN(e.substring(1), n) }
      : Tu[i]
        ? e.length > 1
          ? { type: Tu[i], data: e.substring(1) }
          : { type: Tu[i] }
        : Ph;
  },
  FN = (e, n) => {
    if (qN) {
      const i = HN(e);
      return pS(i, n);
    } else return { base64: !0, data: e };
  },
  pS = (e, n) =>
    n === "blob"
      ? e instanceof Blob
        ? e
        : new Blob([e])
      : e instanceof ArrayBuffer
        ? e
        : e.buffer,
  mS = "",
  PN = (e, n) => {
    const i = e.length,
      a = new Array(i);
    let o = 0;
    e.forEach((u, c) => {
      jp(u, !1, (f) => {
        ((a[c] = f), ++o === i && n(a.join(mS)));
      });
    });
  },
  VN = (e, n) => {
    const i = e.split(mS),
      a = [];
    for (let o = 0; o < i.length; o++) {
      const u = Lp(i[o], n);
      if ((a.push(u), u.type === "error")) break;
    }
    return a;
  };
function YN() {
  return new TransformStream({
    transform(e, n) {
      UN(e, (i) => {
        const a = i.length;
        let o;
        if (a < 126)
          ((o = new Uint8Array(1)), new DataView(o.buffer).setUint8(0, a));
        else if (a < 65536) {
          o = new Uint8Array(3);
          const u = new DataView(o.buffer);
          (u.setUint8(0, 126), u.setUint16(1, a));
        } else {
          o = new Uint8Array(9);
          const u = new DataView(o.buffer);
          (u.setUint8(0, 127), u.setBigUint64(1, BigInt(a)));
        }
        (e.data && typeof e.data != "string" && (o[0] |= 128),
          n.enqueue(o),
          n.enqueue(i));
      });
    },
  });
}
let dh;
function gu(e) {
  return e.reduce((n, i) => n + i.length, 0);
}
function yu(e, n) {
  if (e[0].length === n) return e.shift();
  const i = new Uint8Array(n);
  let a = 0;
  for (let o = 0; o < n; o++)
    ((i[o] = e[0][a++]), a === e[0].length && (e.shift(), (a = 0)));
  return (e.length && a < e[0].length && (e[0] = e[0].slice(a)), i);
}
function IN(e, n) {
  dh || (dh = new TextDecoder());
  const i = [];
  let a = 0,
    o = -1,
    u = !1;
  return new TransformStream({
    transform(c, f) {
      for (i.push(c); ; ) {
        if (a === 0) {
          if (gu(i) < 1) break;
          const h = yu(i, 1);
          ((u = (h[0] & 128) === 128),
            (o = h[0] & 127),
            o < 126 ? (a = 3) : o === 126 ? (a = 1) : (a = 2));
        } else if (a === 1) {
          if (gu(i) < 2) break;
          const h = yu(i, 2);
          ((o = new DataView(h.buffer, h.byteOffset, h.length).getUint16(0)),
            (a = 3));
        } else if (a === 2) {
          if (gu(i) < 8) break;
          const h = yu(i, 8),
            p = new DataView(h.buffer, h.byteOffset, h.length),
            y = p.getUint32(0);
          if (y > Math.pow(2, 21) - 1) {
            f.enqueue(Ph);
            break;
          }
          ((o = y * Math.pow(2, 32) + p.getUint32(4)), (a = 3));
        } else {
          if (gu(i) < o) break;
          const h = yu(i, o);
          (f.enqueue(Lp(u ? h : dh.decode(h), n)), (a = 0));
        }
        if (o === 0 || o > e) {
          f.enqueue(Ph);
          break;
        }
      }
    },
  });
}
const gS = 4;
function Lt(e) {
  if (e) return XN(e);
}
function XN(e) {
  for (var n in Lt.prototype) e[n] = Lt.prototype[n];
  return e;
}
Lt.prototype.on = Lt.prototype.addEventListener = function (e, n) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(n),
    this
  );
};
Lt.prototype.once = function (e, n) {
  function i() {
    (this.off(e, i), n.apply(this, arguments));
  }
  return ((i.fn = n), this.on(e, i), this);
};
Lt.prototype.off =
  Lt.prototype.removeListener =
  Lt.prototype.removeAllListeners =
  Lt.prototype.removeEventListener =
    function (e, n) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return ((this._callbacks = {}), this);
      var i = this._callbacks["$" + e];
      if (!i) return this;
      if (arguments.length == 1) return (delete this._callbacks["$" + e], this);
      for (var a, o = 0; o < i.length; o++)
        if (((a = i[o]), a === n || a.fn === n)) {
          i.splice(o, 1);
          break;
        }
      return (i.length === 0 && delete this._callbacks["$" + e], this);
    };
Lt.prototype.emit = function (e) {
  this._callbacks = this._callbacks || {};
  for (
    var n = new Array(arguments.length - 1),
      i = this._callbacks["$" + e],
      a = 1;
    a < arguments.length;
    a++
  )
    n[a - 1] = arguments[a];
  if (i) {
    i = i.slice(0);
    for (var a = 0, o = i.length; a < o; ++a) i[a].apply(this, n);
  }
  return this;
};
Lt.prototype.emitReserved = Lt.prototype.emit;
Lt.prototype.listeners = function (e) {
  return (
    (this._callbacks = this._callbacks || {}),
    this._callbacks["$" + e] || []
  );
};
Lt.prototype.hasListeners = function (e) {
  return !!this.listeners(e).length;
};
const pc =
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? (n) => Promise.resolve().then(n)
      : (n, i) => i(n, 0),
  Yn =
    typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : Function("return this")(),
  GN = "arraybuffer";
function yS(e, ...n) {
  return n.reduce((i, a) => (e.hasOwnProperty(a) && (i[a] = e[a]), i), {});
}
const QN = Yn.setTimeout,
  KN = Yn.clearTimeout;
function mc(e, n) {
  n.useNativeTimers
    ? ((e.setTimeoutFn = QN.bind(Yn)), (e.clearTimeoutFn = KN.bind(Yn)))
    : ((e.setTimeoutFn = Yn.setTimeout.bind(Yn)),
      (e.clearTimeoutFn = Yn.clearTimeout.bind(Yn)));
}
const ZN = 1.33;
function $N(e) {
  return typeof e == "string"
    ? JN(e)
    : Math.ceil((e.byteLength || e.size) * ZN);
}
function JN(e) {
  let n = 0,
    i = 0;
  for (let a = 0, o = e.length; a < o; a++)
    ((n = e.charCodeAt(a)),
      n < 128
        ? (i += 1)
        : n < 2048
          ? (i += 2)
          : n < 55296 || n >= 57344
            ? (i += 3)
            : (a++, (i += 4)));
  return i;
}
function bS() {
  return (
    Date.now().toString(36).substring(3) +
    Math.random().toString(36).substring(2, 5)
  );
}
function WN(e) {
  let n = "";
  for (let i in e)
    e.hasOwnProperty(i) &&
      (n.length && (n += "&"),
      (n += encodeURIComponent(i) + "=" + encodeURIComponent(e[i])));
  return n;
}
function e3(e) {
  let n = {},
    i = e.split("&");
  for (let a = 0, o = i.length; a < o; a++) {
    let u = i[a].split("=");
    n[decodeURIComponent(u[0])] = decodeURIComponent(u[1]);
  }
  return n;
}
class t3 extends Error {
  constructor(n, i, a) {
    (super(n),
      (this.description = i),
      (this.context = a),
      (this.type = "TransportError"));
  }
}
class Bp extends Lt {
  constructor(n) {
    (super(),
      (this.writable = !1),
      mc(this, n),
      (this.opts = n),
      (this.query = n.query),
      (this.socket = n.socket),
      (this.supportsBinary = !n.forceBase64));
  }
  onError(n, i, a) {
    return (super.emitReserved("error", new t3(n, i, a)), this);
  }
  open() {
    return ((this.readyState = "opening"), this.doOpen(), this);
  }
  close() {
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(n) {
    this.readyState === "open" && this.write(n);
  }
  onOpen() {
    ((this.readyState = "open"),
      (this.writable = !0),
      super.emitReserved("open"));
  }
  onData(n) {
    const i = Lp(n, this.socket.binaryType);
    this.onPacket(i);
  }
  onPacket(n) {
    super.emitReserved("packet", n);
  }
  onClose(n) {
    ((this.readyState = "closed"), super.emitReserved("close", n));
  }
  pause(n) {}
  createUri(n, i = {}) {
    return (
      n +
      "://" +
      this._hostname() +
      this._port() +
      this.opts.path +
      this._query(i)
    );
  }
  _hostname() {
    const n = this.opts.hostname;
    return n.indexOf(":") === -1 ? n : "[" + n + "]";
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && Number(this.opts.port) !== 443) ||
        (!this.opts.secure && Number(this.opts.port) !== 80))
      ? ":" + this.opts.port
      : "";
  }
  _query(n) {
    const i = WN(n);
    return i.length ? "?" + i : "";
  }
}
class n3 extends Bp {
  constructor() {
    (super(...arguments), (this._polling = !1));
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this._poll();
  }
  pause(n) {
    this.readyState = "pausing";
    const i = () => {
      ((this.readyState = "paused"), n());
    };
    if (this._polling || !this.writable) {
      let a = 0;
      (this._polling &&
        (a++,
        this.once("pollComplete", function () {
          --a || i();
        })),
        this.writable ||
          (a++,
          this.once("drain", function () {
            --a || i();
          })));
    } else i();
  }
  _poll() {
    ((this._polling = !0), this.doPoll(), this.emitReserved("poll"));
  }
  onData(n) {
    const i = (a) => {
      if (
        (this.readyState === "opening" && a.type === "open" && this.onOpen(),
        a.type === "close")
      )
        return (
          this.onClose({ description: "transport closed by the server" }),
          !1
        );
      this.onPacket(a);
    };
    (VN(n, this.socket.binaryType).forEach(i),
      this.readyState !== "closed" &&
        ((this._polling = !1),
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this._poll()));
  }
  doClose() {
    const n = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? n() : this.once("open", n);
  }
  write(n) {
    ((this.writable = !1),
      PN(n, (i) => {
        this.doWrite(i, () => {
          ((this.writable = !0), this.emitReserved("drain"));
        });
      }));
  }
  uri() {
    const n = this.opts.secure ? "https" : "http",
      i = this.query || {};
    return (
      this.opts.timestampRequests !== !1 &&
        (i[this.opts.timestampParam] = bS()),
      !this.supportsBinary && !i.sid && (i.b64 = 1),
      this.createUri(n, i)
    );
  }
}
let xS = !1;
try {
  xS = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {}
const r3 = xS;
function i3() {}
class a3 extends n3 {
  constructor(n) {
    if ((super(n), typeof location < "u")) {
      const i = location.protocol === "https:";
      let a = location.port;
      (a || (a = i ? "443" : "80"),
        (this.xd =
          (typeof location < "u" && n.hostname !== location.hostname) ||
          a !== n.port));
    }
  }
  doWrite(n, i) {
    const a = this.request({ method: "POST", data: n });
    (a.on("success", i),
      a.on("error", (o, u) => {
        this.onError("xhr post error", o, u);
      }));
  }
  doPoll() {
    const n = this.request();
    (n.on("data", this.onData.bind(this)),
      n.on("error", (i, a) => {
        this.onError("xhr poll error", i, a);
      }),
      (this.pollXhr = n));
  }
}
let tl = class Ru extends Lt {
  constructor(n, i, a) {
    (super(),
      (this.createRequest = n),
      mc(this, a),
      (this._opts = a),
      (this._method = a.method || "GET"),
      (this._uri = i),
      (this._data = a.data !== void 0 ? a.data : null),
      this._create());
  }
  _create() {
    var n;
    const i = yS(
      this._opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref",
    );
    i.xdomain = !!this._opts.xd;
    const a = (this._xhr = this.createRequest(i));
    try {
      a.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          a.setDisableHeaderCheck && a.setDisableHeaderCheck(!0);
          for (let o in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(o) &&
              a.setRequestHeader(o, this._opts.extraHeaders[o]);
        }
      } catch {}
      if (this._method === "POST")
        try {
          a.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {}
      try {
        a.setRequestHeader("Accept", "*/*");
      } catch {}
      ((n = this._opts.cookieJar) === null || n === void 0 || n.addCookies(a),
        "withCredentials" in a &&
          (a.withCredentials = this._opts.withCredentials),
        this._opts.requestTimeout && (a.timeout = this._opts.requestTimeout),
        (a.onreadystatechange = () => {
          var o;
          (a.readyState === 3 &&
            ((o = this._opts.cookieJar) === null ||
              o === void 0 ||
              o.parseCookies(a.getResponseHeader("set-cookie"))),
            a.readyState === 4 &&
              (a.status === 200 || a.status === 1223
                ? this._onLoad()
                : this.setTimeoutFn(() => {
                    this._onError(typeof a.status == "number" ? a.status : 0);
                  }, 0)));
        }),
        a.send(this._data));
    } catch (o) {
      this.setTimeoutFn(() => {
        this._onError(o);
      }, 0);
      return;
    }
    typeof document < "u" &&
      ((this._index = Ru.requestsCount++), (Ru.requests[this._index] = this));
  }
  _onError(n) {
    (this.emitReserved("error", n, this._xhr), this._cleanup(!0));
  }
  _cleanup(n) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (((this._xhr.onreadystatechange = i3), n))
        try {
          this._xhr.abort();
        } catch {}
      (typeof document < "u" && delete Ru.requests[this._index],
        (this._xhr = null));
    }
  }
  _onLoad() {
    const n = this._xhr.responseText;
    n !== null &&
      (this.emitReserved("data", n),
      this.emitReserved("success"),
      this._cleanup());
  }
  abort() {
    this._cleanup();
  }
};
tl.requestsCount = 0;
tl.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function") attachEvent("onunload", j1);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in Yn ? "pagehide" : "unload";
    addEventListener(e, j1, !1);
  }
}
function j1() {
  for (let e in tl.requests)
    tl.requests.hasOwnProperty(e) && tl.requests[e].abort();
}
const l3 = (function () {
  const e = vS({ xdomain: !1 });
  return e && e.responseType !== null;
})();
class o3 extends a3 {
  constructor(n) {
    super(n);
    const i = n && n.forceBase64;
    this.supportsBinary = l3 && !i;
  }
  request(n = {}) {
    return (
      Object.assign(n, { xd: this.xd }, this.opts),
      new tl(vS, this.uri(), n)
    );
  }
}
function vS(e) {
  const n = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!n || r3)) return new XMLHttpRequest();
  } catch {}
  if (!n)
    try {
      return new Yn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {}
}
const SS =
  typeof navigator < "u" &&
  typeof navigator.product == "string" &&
  navigator.product.toLowerCase() === "reactnative";
class s3 extends Bp {
  get name() {
    return "websocket";
  }
  doOpen() {
    const n = this.uri(),
      i = this.opts.protocols,
      a = SS
        ? {}
        : yS(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity",
          );
    this.opts.extraHeaders && (a.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(n, i, a);
    } catch (o) {
      return this.emitReserved("error", o);
    }
    ((this.ws.binaryType = this.socket.binaryType), this.addEventListeners());
  }
  addEventListeners() {
    ((this.ws.onopen = () => {
      (this.opts.autoUnref && this.ws._socket.unref(), this.onOpen());
    }),
      (this.ws.onclose = (n) =>
        this.onClose({
          description: "websocket connection closed",
          context: n,
        })),
      (this.ws.onmessage = (n) => this.onData(n.data)),
      (this.ws.onerror = (n) => this.onError("websocket error", n)));
  }
  write(n) {
    this.writable = !1;
    for (let i = 0; i < n.length; i++) {
      const a = n[i],
        o = i === n.length - 1;
      jp(a, this.supportsBinary, (u) => {
        try {
          this.doWrite(a, u);
        } catch {}
        o &&
          pc(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" &&
      ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
  }
  uri() {
    const n = this.opts.secure ? "wss" : "ws",
      i = this.query || {};
    return (
      this.opts.timestampRequests && (i[this.opts.timestampParam] = bS()),
      this.supportsBinary || (i.b64 = 1),
      this.createUri(n, i)
    );
  }
}
const hh = Yn.WebSocket || Yn.MozWebSocket;
class u3 extends s3 {
  createSocket(n, i, a) {
    return SS ? new hh(n, i, a) : i ? new hh(n, i) : new hh(n);
  }
  doWrite(n, i) {
    this.ws.send(i);
  }
}
class c3 extends Bp {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(
        this.createUri("https"),
        this.opts.transportOptions[this.name],
      );
    } catch (n) {
      return this.emitReserved("error", n);
    }
    (this._transport.closed
      .then(() => {
        this.onClose();
      })
      .catch((n) => {
        this.onError("webtransport error", n);
      }),
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then((n) => {
          const i = IN(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
            a = n.readable.pipeThrough(i).getReader(),
            o = YN();
          (o.readable.pipeTo(n.writable),
            (this._writer = o.writable.getWriter()));
          const u = () => {
            a.read()
              .then(({ done: f, value: h }) => {
                f || (this.onPacket(h), u());
              })
              .catch((f) => {});
          };
          u();
          const c = { type: "open" };
          (this.query.sid && (c.data = `{"sid":"${this.query.sid}"}`),
            this._writer.write(c).then(() => this.onOpen()));
        });
      }));
  }
  write(n) {
    this.writable = !1;
    for (let i = 0; i < n.length; i++) {
      const a = n[i],
        o = i === n.length - 1;
      this._writer.write(a).then(() => {
        o &&
          pc(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var n;
    (n = this._transport) === null || n === void 0 || n.close();
  }
}
const f3 = { websocket: u3, webtransport: c3, polling: o3 },
  d3 =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  h3 = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ];
function Vh(e) {
  if (e.length > 8e3) throw "URI too long";
  const n = e,
    i = e.indexOf("["),
    a = e.indexOf("]");
  i != -1 &&
    a != -1 &&
    (e =
      e.substring(0, i) +
      e.substring(i, a).replace(/:/g, ";") +
      e.substring(a, e.length));
  let o = d3.exec(e || ""),
    u = {},
    c = 14;
  for (; c--; ) u[h3[c]] = o[c] || "";
  return (
    i != -1 &&
      a != -1 &&
      ((u.source = n),
      (u.host = u.host.substring(1, u.host.length - 1).replace(/;/g, ":")),
      (u.authority = u.authority
        .replace("[", "")
        .replace("]", "")
        .replace(/;/g, ":")),
      (u.ipv6uri = !0)),
    (u.pathNames = p3(u, u.path)),
    (u.queryKey = m3(u, u.query)),
    u
  );
}
function p3(e, n) {
  const i = /\/{2,9}/g,
    a = n.replace(i, "/").split("/");
  return (
    (n.slice(0, 1) == "/" || n.length === 0) && a.splice(0, 1),
    n.slice(-1) == "/" && a.splice(a.length - 1, 1),
    a
  );
}
function m3(e, n) {
  const i = {};
  return (
    n.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (a, o, u) {
      o && (i[o] = u);
    }),
    i
  );
}
const Yh =
    typeof addEventListener == "function" &&
    typeof removeEventListener == "function",
  Au = [];
Yh &&
  addEventListener(
    "offline",
    () => {
      Au.forEach((e) => e());
    },
    !1,
  );
class Ti extends Lt {
  constructor(n, i) {
    if (
      (super(),
      (this.binaryType = GN),
      (this.writeBuffer = []),
      (this._prevBufferLen = 0),
      (this._pingInterval = -1),
      (this._pingTimeout = -1),
      (this._maxPayload = -1),
      (this._pingTimeoutTime = 1 / 0),
      n && typeof n == "object" && ((i = n), (n = null)),
      n)
    ) {
      const a = Vh(n);
      ((i.hostname = a.host),
        (i.secure = a.protocol === "https" || a.protocol === "wss"),
        (i.port = a.port),
        a.query && (i.query = a.query));
    } else i.host && (i.hostname = Vh(i.host).host);
    (mc(this, i),
      (this.secure =
        i.secure != null
          ? i.secure
          : typeof location < "u" && location.protocol === "https:"),
      i.hostname && !i.port && (i.port = this.secure ? "443" : "80"),
      (this.hostname =
        i.hostname ||
        (typeof location < "u" ? location.hostname : "localhost")),
      (this.port =
        i.port ||
        (typeof location < "u" && location.port
          ? location.port
          : this.secure
            ? "443"
            : "80")),
      (this.transports = []),
      (this._transportsByName = {}),
      i.transports.forEach((a) => {
        const o = a.prototype.name;
        (this.transports.push(o), (this._transportsByName[o] = a));
      }),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        i,
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, "") +
        (this.opts.addTrailingSlash ? "/" : "")),
      typeof this.opts.query == "string" &&
        (this.opts.query = e3(this.opts.query)),
      Yh &&
        (this.opts.closeOnBeforeunload &&
          ((this._beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener(
            "beforeunload",
            this._beforeunloadEventListener,
            !1,
          )),
        this.hostname !== "localhost" &&
          ((this._offlineEventListener = () => {
            this._onClose("transport close", {
              description: "network connection lost",
            });
          }),
          Au.push(this._offlineEventListener))),
      this.opts.withCredentials && (this._cookieJar = void 0),
      this._open());
  }
  createTransport(n) {
    const i = Object.assign({}, this.opts.query);
    ((i.EIO = gS), (i.transport = n), this.id && (i.sid = this.id));
    const a = Object.assign(
      {},
      this.opts,
      {
        query: i,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port,
      },
      this.opts.transportOptions[n],
    );
    return new this._transportsByName[n](a);
  }
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const n =
      this.opts.rememberUpgrade &&
      Ti.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
        ? "websocket"
        : this.transports[0];
    this.readyState = "opening";
    const i = this.createTransport(n);
    (i.open(), this.setTransport(i));
  }
  setTransport(n) {
    (this.transport && this.transport.removeAllListeners(),
      (this.transport = n),
      n
        .on("drain", this._onDrain.bind(this))
        .on("packet", this._onPacket.bind(this))
        .on("error", this._onError.bind(this))
        .on("close", (i) => this._onClose("transport close", i)));
  }
  onOpen() {
    ((this.readyState = "open"),
      (Ti.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush());
  }
  _onPacket(n) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch (
        (this.emitReserved("packet", n), this.emitReserved("heartbeat"), n.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(n.data));
          break;
        case "ping":
          (this._sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong"),
            this._resetPingTimeout());
          break;
        case "error":
          const i = new Error("server error");
          ((i.code = n.data), this._onError(i));
          break;
        case "message":
          (this.emitReserved("data", n.data),
            this.emitReserved("message", n.data));
          break;
      }
  }
  onHandshake(n) {
    (this.emitReserved("handshake", n),
      (this.id = n.sid),
      (this.transport.query.sid = n.sid),
      (this._pingInterval = n.pingInterval),
      (this._pingTimeout = n.pingTimeout),
      (this._maxPayload = n.maxPayload),
      this.onOpen(),
      this.readyState !== "closed" && this._resetPingTimeout());
  }
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const n = this._pingInterval + this._pingTimeout;
    ((this._pingTimeoutTime = Date.now() + n),
      (this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose("ping timeout");
      }, n)),
      this.opts.autoUnref && this._pingTimeoutTimer.unref());
  }
  _onDrain() {
    (this.writeBuffer.splice(0, this._prevBufferLen),
      (this._prevBufferLen = 0),
      this.writeBuffer.length === 0
        ? this.emitReserved("drain")
        : this.flush());
  }
  flush() {
    if (
      this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const n = this._getWritablePackets();
      (this.transport.send(n),
        (this._prevBufferLen = n.length),
        this.emitReserved("flush"));
    }
  }
  _getWritablePackets() {
    if (
      !(
        this._maxPayload &&
        this.transport.name === "polling" &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer;
    let i = 1;
    for (let a = 0; a < this.writeBuffer.length; a++) {
      const o = this.writeBuffer[a].data;
      if ((o && (i += $N(o)), a > 0 && i > this._maxPayload))
        return this.writeBuffer.slice(0, a);
      i += 2;
    }
    return this.writeBuffer;
  }
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return !0;
    const n = Date.now() > this._pingTimeoutTime;
    return (
      n &&
        ((this._pingTimeoutTime = 0),
        pc(() => {
          this._onClose("ping timeout");
        }, this.setTimeoutFn)),
      n
    );
  }
  write(n, i, a) {
    return (this._sendPacket("message", n, i, a), this);
  }
  send(n, i, a) {
    return (this._sendPacket("message", n, i, a), this);
  }
  _sendPacket(n, i, a, o) {
    if (
      (typeof i == "function" && ((o = i), (i = void 0)),
      typeof a == "function" && ((o = a), (a = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return;
    ((a = a || {}), (a.compress = a.compress !== !1));
    const u = { type: n, data: i, options: a };
    (this.emitReserved("packetCreate", u),
      this.writeBuffer.push(u),
      o && this.once("flush", o),
      this.flush());
  }
  close() {
    const n = () => {
        (this._onClose("forced close"), this.transport.close());
      },
      i = () => {
        (this.off("upgrade", i), this.off("upgradeError", i), n());
      },
      a = () => {
        (this.once("upgrade", i), this.once("upgradeError", i));
      };
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? a() : n();
            })
          : this.upgrading
            ? a()
            : n()),
      this
    );
  }
  _onError(n) {
    if (
      ((Ti.priorWebsocketSuccess = !1),
      this.opts.tryAllTransports &&
        this.transports.length > 1 &&
        this.readyState === "opening")
    )
      return (this.transports.shift(), this._open());
    (this.emitReserved("error", n), this._onClose("transport error", n));
  }
  _onClose(n, i) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    ) {
      if (
        (this.clearTimeoutFn(this._pingTimeoutTimer),
        this.transport.removeAllListeners("close"),
        this.transport.close(),
        this.transport.removeAllListeners(),
        Yh &&
          (this._beforeunloadEventListener &&
            removeEventListener(
              "beforeunload",
              this._beforeunloadEventListener,
              !1,
            ),
          this._offlineEventListener))
      ) {
        const a = Au.indexOf(this._offlineEventListener);
        a !== -1 && Au.splice(a, 1);
      }
      ((this.readyState = "closed"),
        (this.id = null),
        this.emitReserved("close", n, i),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0));
    }
  }
}
Ti.protocol = gS;
class g3 extends Ti {
  constructor() {
    (super(...arguments), (this._upgrades = []));
  }
  onOpen() {
    if ((super.onOpen(), this.readyState === "open" && this.opts.upgrade))
      for (let n = 0; n < this._upgrades.length; n++)
        this._probe(this._upgrades[n]);
  }
  _probe(n) {
    let i = this.createTransport(n),
      a = !1;
    Ti.priorWebsocketSuccess = !1;
    const o = () => {
      a ||
        (i.send([{ type: "ping", data: "probe" }]),
        i.once("packet", (g) => {
          if (!a)
            if (g.type === "pong" && g.data === "probe") {
              if (
                ((this.upgrading = !0), this.emitReserved("upgrading", i), !i)
              )
                return;
              ((Ti.priorWebsocketSuccess = i.name === "websocket"),
                this.transport.pause(() => {
                  a ||
                    (this.readyState !== "closed" &&
                      (y(),
                      this.setTransport(i),
                      i.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", i),
                      (i = null),
                      (this.upgrading = !1),
                      this.flush()));
                }));
            } else {
              const x = new Error("probe error");
              ((x.transport = i.name), this.emitReserved("upgradeError", x));
            }
        }));
    };
    function u() {
      a || ((a = !0), y(), i.close(), (i = null));
    }
    const c = (g) => {
      const x = new Error("probe error: " + g);
      ((x.transport = i.name), u(), this.emitReserved("upgradeError", x));
    };
    function f() {
      c("transport closed");
    }
    function h() {
      c("socket closed");
    }
    function p(g) {
      i && g.name !== i.name && u();
    }
    const y = () => {
      (i.removeListener("open", o),
        i.removeListener("error", c),
        i.removeListener("close", f),
        this.off("close", h),
        this.off("upgrading", p));
    };
    (i.once("open", o),
      i.once("error", c),
      i.once("close", f),
      this.once("close", h),
      this.once("upgrading", p),
      this._upgrades.indexOf("webtransport") !== -1 && n !== "webtransport"
        ? this.setTimeoutFn(() => {
            a || i.open();
          }, 200)
        : i.open());
  }
  onHandshake(n) {
    ((this._upgrades = this._filterUpgrades(n.upgrades)), super.onHandshake(n));
  }
  _filterUpgrades(n) {
    const i = [];
    for (let a = 0; a < n.length; a++)
      ~this.transports.indexOf(n[a]) && i.push(n[a]);
    return i;
  }
}
let y3 = class extends g3 {
  constructor(n, i = {}) {
    const a = typeof n == "object" ? n : i;
    ((!a.transports || (a.transports && typeof a.transports[0] == "string")) &&
      (a.transports = (a.transports || ["polling", "websocket", "webtransport"])
        .map((o) => f3[o])
        .filter((o) => !!o)),
      super(n, a));
  }
};
function b3(e, n = "", i) {
  let a = e;
  ((i = i || (typeof location < "u" && location)),
    e == null && (e = i.protocol + "//" + i.host),
    typeof e == "string" &&
      (e.charAt(0) === "/" &&
        (e.charAt(1) === "/" ? (e = i.protocol + e) : (e = i.host + e)),
      /^(https?|wss?):\/\//.test(e) ||
        (typeof i < "u" ? (e = i.protocol + "//" + e) : (e = "https://" + e)),
      (a = Vh(e))),
    a.port ||
      (/^(http|ws)$/.test(a.protocol)
        ? (a.port = "80")
        : /^(http|ws)s$/.test(a.protocol) && (a.port = "443")),
    (a.path = a.path || "/"));
  const u = a.host.indexOf(":") !== -1 ? "[" + a.host + "]" : a.host;
  return (
    (a.id = a.protocol + "://" + u + ":" + a.port + n),
    (a.href =
      a.protocol + "://" + u + (i && i.port === a.port ? "" : ":" + a.port)),
    a
  );
}
const x3 = typeof ArrayBuffer == "function",
  v3 = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e.buffer instanceof ArrayBuffer,
  wS = Object.prototype.toString,
  S3 =
    typeof Blob == "function" ||
    (typeof Blob < "u" && wS.call(Blob) === "[object BlobConstructor]"),
  w3 =
    typeof File == "function" ||
    (typeof File < "u" && wS.call(File) === "[object FileConstructor]");
function Up(e) {
  return (
    (x3 && (e instanceof ArrayBuffer || v3(e))) ||
    (S3 && e instanceof Blob) ||
    (w3 && e instanceof File)
  );
}
function Ou(e, n) {
  if (!e || typeof e != "object") return !1;
  if (Array.isArray(e)) {
    for (let i = 0, a = e.length; i < a; i++) if (Ou(e[i])) return !0;
    return !1;
  }
  if (Up(e)) return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return Ou(e.toJSON(), !0);
  for (const i in e)
    if (Object.prototype.hasOwnProperty.call(e, i) && Ou(e[i])) return !0;
  return !1;
}
function E3(e) {
  const n = [],
    i = e.data,
    a = e;
  return (
    (a.data = Ih(i, n)),
    (a.attachments = n.length),
    { packet: a, buffers: n }
  );
}
function Ih(e, n) {
  if (!e) return e;
  if (Up(e)) {
    const i = { _placeholder: !0, num: n.length };
    return (n.push(e), i);
  } else if (Array.isArray(e)) {
    const i = new Array(e.length);
    for (let a = 0; a < e.length; a++) i[a] = Ih(e[a], n);
    return i;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const i = {};
    for (const a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (i[a] = Ih(e[a], n));
    return i;
  }
  return e;
}
function k3(e, n) {
  return ((e.data = Xh(e.data, n)), delete e.attachments, e);
}
function Xh(e, n) {
  if (!e) return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < n.length)
      return n[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let i = 0; i < e.length; i++) e[i] = Xh(e[i], n);
  else if (typeof e == "object")
    for (const i in e)
      Object.prototype.hasOwnProperty.call(e, i) && (e[i] = Xh(e[i], n));
  return e;
}
const C3 = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener",
];
var Qe;
(function (e) {
  ((e[(e.CONNECT = 0)] = "CONNECT"),
    (e[(e.DISCONNECT = 1)] = "DISCONNECT"),
    (e[(e.EVENT = 2)] = "EVENT"),
    (e[(e.ACK = 3)] = "ACK"),
    (e[(e.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (e[(e.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (e[(e.BINARY_ACK = 6)] = "BINARY_ACK"));
})(Qe || (Qe = {}));
class _3 {
  constructor(n) {
    this.replacer = n;
  }
  encode(n) {
    return (n.type === Qe.EVENT || n.type === Qe.ACK) && Ou(n)
      ? this.encodeAsBinary({
          type: n.type === Qe.EVENT ? Qe.BINARY_EVENT : Qe.BINARY_ACK,
          nsp: n.nsp,
          data: n.data,
          id: n.id,
        })
      : [this.encodeAsString(n)];
  }
  encodeAsString(n) {
    let i = "" + n.type;
    return (
      (n.type === Qe.BINARY_EVENT || n.type === Qe.BINARY_ACK) &&
        (i += n.attachments + "-"),
      n.nsp && n.nsp !== "/" && (i += n.nsp + ","),
      n.id != null && (i += n.id),
      n.data != null && (i += JSON.stringify(n.data, this.replacer)),
      i
    );
  }
  encodeAsBinary(n) {
    const i = E3(n),
      a = this.encodeAsString(i.packet),
      o = i.buffers;
    return (o.unshift(a), o);
  }
}
class Hp extends Lt {
  constructor(n) {
    (super(),
      (this.opts = Object.assign(
        { reviver: void 0, maxAttachments: 10 },
        typeof n == "function" ? { reviver: n } : n,
      )));
  }
  add(n) {
    let i;
    if (typeof n == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      i = this.decodeString(n);
      const a = i.type === Qe.BINARY_EVENT;
      a || i.type === Qe.BINARY_ACK
        ? ((i.type = a ? Qe.EVENT : Qe.ACK),
          (this.reconstructor = new T3(i)),
          i.attachments === 0 && super.emitReserved("decoded", i))
        : super.emitReserved("decoded", i);
    } else if (Up(n) || n.base64)
      if (this.reconstructor)
        ((i = this.reconstructor.takeBinaryData(n)),
          i && ((this.reconstructor = null), super.emitReserved("decoded", i)));
      else throw new Error("got binary data when not reconstructing a packet");
    else throw new Error("Unknown type: " + n);
  }
  decodeString(n) {
    let i = 0;
    const a = { type: Number(n.charAt(0)) };
    if (Qe[a.type] === void 0) throw new Error("unknown packet type " + a.type);
    if (a.type === Qe.BINARY_EVENT || a.type === Qe.BINARY_ACK) {
      const u = i + 1;
      for (; n.charAt(++i) !== "-" && i != n.length; );
      const c = n.substring(u, i);
      if (c != Number(c) || n.charAt(i) !== "-")
        throw new Error("Illegal attachments");
      const f = Number(c);
      if (!R3(f) || f < 0) throw new Error("Illegal attachments");
      if (f > this.opts.maxAttachments) throw new Error("too many attachments");
      a.attachments = f;
    }
    if (n.charAt(i + 1) === "/") {
      const u = i + 1;
      for (; ++i && !(n.charAt(i) === "," || i === n.length); );
      a.nsp = n.substring(u, i);
    } else a.nsp = "/";
    const o = n.charAt(i + 1);
    if (o !== "" && Number(o) == o) {
      const u = i + 1;
      for (; ++i; ) {
        const c = n.charAt(i);
        if (c == null || Number(c) != c) {
          --i;
          break;
        }
        if (i === n.length) break;
      }
      a.id = Number(n.substring(u, i + 1));
    }
    if (n.charAt(++i)) {
      const u = this.tryParse(n.substr(i));
      if (Hp.isPayloadValid(a.type, u)) a.data = u;
      else throw new Error("invalid payload");
    }
    return a;
  }
  tryParse(n) {
    try {
      return JSON.parse(n, this.opts.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(n, i) {
    switch (n) {
      case Qe.CONNECT:
        return L1(i);
      case Qe.DISCONNECT:
        return i === void 0;
      case Qe.CONNECT_ERROR:
        return typeof i == "string" || L1(i);
      case Qe.EVENT:
      case Qe.BINARY_EVENT:
        return (
          Array.isArray(i) &&
          (typeof i[0] == "number" ||
            (typeof i[0] == "string" && C3.indexOf(i[0]) === -1))
        );
      case Qe.ACK:
      case Qe.BINARY_ACK:
        return Array.isArray(i);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(),
      (this.reconstructor = null));
  }
}
class T3 {
  constructor(n) {
    ((this.packet = n), (this.buffers = []), (this.reconPack = n));
  }
  takeBinaryData(n) {
    if (
      (this.buffers.push(n), this.buffers.length === this.reconPack.attachments)
    ) {
      const i = k3(this.reconPack, this.buffers);
      return (this.finishedReconstruction(), i);
    }
    return null;
  }
  finishedReconstruction() {
    ((this.reconPack = null), (this.buffers = []));
  }
}
const R3 =
  Number.isInteger ||
  function (e) {
    return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
  };
function L1(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
const A3 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: Hp,
      Encoder: _3,
      get PacketType() {
        return Qe;
      },
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function tr(e, n, i) {
  return (
    e.on(n, i),
    function () {
      e.off(n, i);
    }
  );
}
const O3 = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class ES extends Lt {
  constructor(n, i, a) {
    (super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = n),
      (this.nsp = i),
      a && a.auth && (this.auth = a.auth),
      (this._opts = Object.assign({}, a)),
      this.io._autoConnect && this.open());
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const n = this.io;
    this.subs = [
      tr(n, "open", this.onopen.bind(this)),
      tr(n, "packet", this.onpacket.bind(this)),
      tr(n, "error", this.onerror.bind(this)),
      tr(n, "close", this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...n) {
    return (n.unshift("message"), this.emit.apply(this, n), this);
  }
  emit(n, ...i) {
    var a, o, u;
    if (O3.hasOwnProperty(n))
      throw new Error('"' + n.toString() + '" is a reserved event name');
    if (
      (i.unshift(n),
      this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
    )
      return (this._addToQueue(i), this);
    const c = { type: Qe.EVENT, data: i };
    if (
      ((c.options = {}),
      (c.options.compress = this.flags.compress !== !1),
      typeof i[i.length - 1] == "function")
    ) {
      const y = this.ids++,
        g = i.pop();
      (this._registerAckCallback(y, g), (c.id = y));
    }
    const f =
        (o =
          (a = this.io.engine) === null || a === void 0
            ? void 0
            : a.transport) === null || o === void 0
          ? void 0
          : o.writable,
      h =
        this.connected &&
        !(
          !((u = this.io.engine) === null || u === void 0) &&
          u._hasPingExpired()
        );
    return (
      (this.flags.volatile && !f) ||
        (h
          ? (this.notifyOutgoingListeners(c), this.packet(c))
          : this.sendBuffer.push(c)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(n, i) {
    var a;
    const o =
      (a = this.flags.timeout) !== null && a !== void 0
        ? a
        : this._opts.ackTimeout;
    if (o === void 0) {
      this.acks[n] = i;
      return;
    }
    const u = this.io.setTimeoutFn(() => {
        delete this.acks[n];
        for (let f = 0; f < this.sendBuffer.length; f++)
          this.sendBuffer[f].id === n && this.sendBuffer.splice(f, 1);
        i.call(this, new Error("operation has timed out"));
      }, o),
      c = (...f) => {
        (this.io.clearTimeoutFn(u), i.apply(this, f));
      };
    ((c.withError = !0), (this.acks[n] = c));
  }
  emitWithAck(n, ...i) {
    return new Promise((a, o) => {
      const u = (c, f) => (c ? o(c) : a(f));
      ((u.withError = !0), i.push(u), this.emit(n, ...i));
    });
  }
  _addToQueue(n) {
    let i;
    typeof n[n.length - 1] == "function" && (i = n.pop());
    const a = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: n,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    (n.push(
      (o, ...u) => (
        this._queue[0],
        o !== null
          ? a.tryCount > this._opts.retries && (this._queue.shift(), i && i(o))
          : (this._queue.shift(), i && i(null, ...u)),
        (a.pending = !1),
        this._drainQueue()
      ),
    ),
      this._queue.push(a),
      this._drainQueue());
  }
  _drainQueue(n = !1) {
    if (!this.connected || this._queue.length === 0) return;
    const i = this._queue[0];
    (i.pending && !n) ||
      ((i.pending = !0),
      i.tryCount++,
      (this.flags = i.flags),
      this.emit.apply(this, i.args));
  }
  packet(n) {
    ((n.nsp = this.nsp), this.io._packet(n));
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth((n) => {
          this._sendConnectPacket(n);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(n) {
    this.packet({
      type: Qe.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, n)
        : n,
    });
  }
  onerror(n) {
    this.connected || this.emitReserved("connect_error", n);
  }
  onclose(n, i) {
    ((this.connected = !1),
      delete this.id,
      this.emitReserved("disconnect", n, i),
      this._clearAcks());
  }
  _clearAcks() {
    Object.keys(this.acks).forEach((n) => {
      if (!this.sendBuffer.some((a) => String(a.id) === n)) {
        const a = this.acks[n];
        (delete this.acks[n],
          a.withError &&
            a.call(this, new Error("socket has been disconnected")));
      }
    });
  }
  onpacket(n) {
    if (n.nsp === this.nsp)
      switch (n.type) {
        case Qe.CONNECT:
          n.data && n.data.sid
            ? this.onconnect(n.data.sid, n.data.pid)
            : this.emitReserved(
                "connect_error",
                new Error(
                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)",
                ),
              );
          break;
        case Qe.EVENT:
        case Qe.BINARY_EVENT:
          this.onevent(n);
          break;
        case Qe.ACK:
        case Qe.BINARY_ACK:
          this.onack(n);
          break;
        case Qe.DISCONNECT:
          this.ondisconnect();
          break;
        case Qe.CONNECT_ERROR:
          this.destroy();
          const a = new Error(n.data.message);
          ((a.data = n.data.data), this.emitReserved("connect_error", a));
          break;
      }
  }
  onevent(n) {
    const i = n.data || [];
    (n.id != null && i.push(this.ack(n.id)),
      this.connected
        ? this.emitEvent(i)
        : this.receiveBuffer.push(Object.freeze(i)));
  }
  emitEvent(n) {
    if (this._anyListeners && this._anyListeners.length) {
      const i = this._anyListeners.slice();
      for (const a of i) a.apply(this, n);
    }
    (super.emit.apply(this, n),
      this._pid &&
        n.length &&
        typeof n[n.length - 1] == "string" &&
        (this._lastOffset = n[n.length - 1]));
  }
  ack(n) {
    const i = this;
    let a = !1;
    return function (...o) {
      a || ((a = !0), i.packet({ type: Qe.ACK, id: n, data: o }));
    };
  }
  onack(n) {
    const i = this.acks[n.id];
    typeof i == "function" &&
      (delete this.acks[n.id],
      i.withError && n.data.unshift(null),
      i.apply(this, n.data));
  }
  onconnect(n, i) {
    ((this.id = n),
      (this.recovered = i && this._pid === i),
      (this._pid = i),
      (this.connected = !0),
      this.emitBuffered(),
      this._drainQueue(!0),
      this.emitReserved("connect"));
  }
  emitBuffered() {
    (this.receiveBuffer.forEach((n) => this.emitEvent(n)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((n) => {
        (this.notifyOutgoingListeners(n), this.packet(n));
      }),
      (this.sendBuffer = []));
  }
  ondisconnect() {
    (this.destroy(), this.onclose("io server disconnect"));
  }
  destroy() {
    (this.subs && (this.subs.forEach((n) => n()), (this.subs = void 0)),
      this.io._destroy(this));
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: Qe.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(n) {
    return ((this.flags.compress = n), this);
  }
  get volatile() {
    return ((this.flags.volatile = !0), this);
  }
  timeout(n) {
    return ((this.flags.timeout = n), this);
  }
  onAny(n) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(n),
      this
    );
  }
  prependAny(n) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(n),
      this
    );
  }
  offAny(n) {
    if (!this._anyListeners) return this;
    if (n) {
      const i = this._anyListeners;
      for (let a = 0; a < i.length; a++)
        if (n === i[a]) return (i.splice(a, 1), this);
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(n) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(n),
      this
    );
  }
  prependAnyOutgoing(n) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(n),
      this
    );
  }
  offAnyOutgoing(n) {
    if (!this._anyOutgoingListeners) return this;
    if (n) {
      const i = this._anyOutgoingListeners;
      for (let a = 0; a < i.length; a++)
        if (n === i[a]) return (i.splice(a, 1), this);
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(n) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const i = this._anyOutgoingListeners.slice();
      for (const a of i) a.apply(this, n.data);
    }
  }
}
function cl(e) {
  ((e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0));
}
cl.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var n = Math.random(),
      i = Math.floor(n * this.jitter * e);
    e = (Math.floor(n * 10) & 1) == 0 ? e - i : e + i;
  }
  return Math.min(e, this.max) | 0;
};
cl.prototype.reset = function () {
  this.attempts = 0;
};
cl.prototype.setMin = function (e) {
  this.ms = e;
};
cl.prototype.setMax = function (e) {
  this.max = e;
};
cl.prototype.setJitter = function (e) {
  this.jitter = e;
};
class Gh extends Lt {
  constructor(n, i) {
    var a;
    (super(),
      (this.nsps = {}),
      (this.subs = []),
      n && typeof n == "object" && ((i = n), (n = void 0)),
      (i = i || {}),
      (i.path = i.path || "/socket.io"),
      (this.opts = i),
      mc(this, i),
      this.reconnection(i.reconnection !== !1),
      this.reconnectionAttempts(i.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(i.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(i.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (a = i.randomizationFactor) !== null && a !== void 0 ? a : 0.5,
      ),
      (this.backoff = new cl({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(i.timeout == null ? 2e4 : i.timeout),
      (this._readyState = "closed"),
      (this.uri = n));
    const o = i.parser || A3;
    ((this.encoder = new o.Encoder()),
      (this.decoder = new o.Decoder()),
      (this._autoConnect = i.autoConnect !== !1),
      this._autoConnect && this.open());
  }
  reconnection(n) {
    return arguments.length
      ? ((this._reconnection = !!n), n || (this.skipReconnect = !0), this)
      : this._reconnection;
  }
  reconnectionAttempts(n) {
    return n === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = n), this);
  }
  reconnectionDelay(n) {
    var i;
    return n === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = n),
        (i = this.backoff) === null || i === void 0 || i.setMin(n),
        this);
  }
  randomizationFactor(n) {
    var i;
    return n === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = n),
        (i = this.backoff) === null || i === void 0 || i.setJitter(n),
        this);
  }
  reconnectionDelayMax(n) {
    var i;
    return n === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = n),
        (i = this.backoff) === null || i === void 0 || i.setMax(n),
        this);
  }
  timeout(n) {
    return arguments.length ? ((this._timeout = n), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect();
  }
  open(n) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new y3(this.uri, this.opts);
    const i = this.engine,
      a = this;
    ((this._readyState = "opening"), (this.skipReconnect = !1));
    const o = tr(i, "open", function () {
        (a.onopen(), n && n());
      }),
      u = (f) => {
        (this.cleanup(),
          (this._readyState = "closed"),
          this.emitReserved("error", f),
          n ? n(f) : this.maybeReconnectOnOpen());
      },
      c = tr(i, "error", u);
    if (this._timeout !== !1) {
      const f = this._timeout,
        h = this.setTimeoutFn(() => {
          (o(), u(new Error("timeout")), i.close());
        }, f);
      (this.opts.autoUnref && h.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(h);
        }));
    }
    return (this.subs.push(o), this.subs.push(c), this);
  }
  connect(n) {
    return this.open(n);
  }
  onopen() {
    (this.cleanup(), (this._readyState = "open"), this.emitReserved("open"));
    const n = this.engine;
    this.subs.push(
      tr(n, "ping", this.onping.bind(this)),
      tr(n, "data", this.ondata.bind(this)),
      tr(n, "error", this.onerror.bind(this)),
      tr(n, "close", this.onclose.bind(this)),
      tr(this.decoder, "decoded", this.ondecoded.bind(this)),
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(n) {
    try {
      this.decoder.add(n);
    } catch (i) {
      this.onclose("parse error", i);
    }
  }
  ondecoded(n) {
    pc(() => {
      this.emitReserved("packet", n);
    }, this.setTimeoutFn);
  }
  onerror(n) {
    this.emitReserved("error", n);
  }
  socket(n, i) {
    let a = this.nsps[n];
    return (
      a
        ? this._autoConnect && !a.active && a.connect()
        : ((a = new ES(this, n, i)), (this.nsps[n] = a)),
      a
    );
  }
  _destroy(n) {
    const i = Object.keys(this.nsps);
    for (const a of i) if (this.nsps[a].active) return;
    this._close();
  }
  _packet(n) {
    const i = this.encoder.encode(n);
    for (let a = 0; a < i.length; a++) this.engine.write(i[a], n.options);
  }
  cleanup() {
    (this.subs.forEach((n) => n()),
      (this.subs.length = 0),
      this.decoder.destroy());
  }
  _close() {
    ((this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"));
  }
  disconnect() {
    return this._close();
  }
  onclose(n, i) {
    var a;
    (this.cleanup(),
      (a = this.engine) === null || a === void 0 || a.close(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", n, i),
      this._reconnection && !this.skipReconnect && this.reconnect());
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const n = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      (this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1));
    else {
      const i = this.backoff.duration();
      this._reconnecting = !0;
      const a = this.setTimeoutFn(() => {
        n.skipReconnect ||
          (this.emitReserved("reconnect_attempt", n.backoff.attempts),
          !n.skipReconnect &&
            n.open((o) => {
              o
                ? ((n._reconnecting = !1),
                  n.reconnect(),
                  this.emitReserved("reconnect_error", o))
                : n.onreconnect();
            }));
      }, i);
      (this.opts.autoUnref && a.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(a);
        }));
    }
  }
  onreconnect() {
    const n = this.backoff.attempts;
    ((this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", n));
  }
}
const fo = {};
function zu(e, n) {
  (typeof e == "object" && ((n = e), (e = void 0)), (n = n || {}));
  const i = b3(e, n.path || "/socket.io"),
    a = i.source,
    o = i.id,
    u = i.path,
    c = fo[o] && u in fo[o].nsps,
    f = n.forceNew || n["force new connection"] || n.multiplex === !1 || c;
  let h;
  return (
    f ? (h = new Gh(a, n)) : (fo[o] || (fo[o] = new Gh(a, n)), (h = fo[o])),
    i.query && !n.query && (n.query = i.queryKey),
    h.socket(i.path, n)
  );
}
Object.assign(zu, { Manager: Gh, Socket: ES, io: zu, connect: zu });
let Pr = null;
const z3 = () => (
    Pr?.connected ||
      ((Pr = zu("https://perplexity-eeii.onrender.com", {
        withCredentials: !0,
      })),
      Pr.on("connect", () => console.log("Socket connected:", Pr.id)),
      Pr.on("disconnect", () => console.log("Socket disconnected")),
      Pr.on("connect_error", (e) => console.error("Socket error:", e.message))),
    Pr
  ),
  B1 = (e) => Pr?.emit("join_chat", e),
  D3 = async ({ message: e, chatId: n }) =>
    (await sr.post("/chats/message", { message: e, chatId: n })).data,
  N3 = async () => (await sr.get("/chats")).data,
  M3 = async ({ chatId: e }) => (await sr.get(`/chats/${e}/messages`)).data,
  j3 = async ({ chatId: e }) => (await sr.delete(`/chats/delete/${e}`)).data,
  L3 = async ({ chatId: e }) => (await sr.post(`/chats/${e}/share`)).data,
  B3 = async ({ chatId: e }) => (await sr.delete(`/chats/${e}/share`)).data,
  U3 = async ({ shareSlug: e }) => (await sr.get(`/share/${e}`)).data,
  kS = rv({
    name: "chat",
    initialState: {
      chats: {},
      currentChatId: null,
      isLoading: !1,
      error: null,
    },
    reducers: {
      createNewChat: (e, n) => {
        const { chatId: i, title: a } = n.payload;
        e.chats[i] = {
          id: i,
          title: a,
          messages: [],
          isShared: !1,
          shareSlug: null,
          shareUrl: null,
          lastUpdated: new Date().toISOString(),
        };
      },
      addNewMessage: (e, n) => {
        const {
          chatId: i,
          content: a,
          role: o,
          sources: u,
          searched: c,
        } = n.payload;
        (e.chats[i].messages.push({
          content: a,
          role: o,
          sources: u || null,
          searched: c || !1,
        }),
          (e.chats[i].lastUpdated = new Date().toISOString()));
      },
      addMessages: (e, n) => {
        const { chatId: i, messages: a } = n.payload;
        e.chats[i].messages = a;
      },
      setChats: (e, n) => {
        e.chats = n.payload;
      },
      setCurrentChatId: (e, n) => {
        e.currentChatId = n.payload;
      },
      setLoading: (e, n) => {
        e.isLoading = n.payload;
      },
      setError: (e, n) => {
        e.error = n.payload;
      },
      setChatShared: (e, n) => {
        const { chatId: i, isShared: a, shareSlug: o, shareUrl: u } = n.payload;
        e.chats[i] &&
          ((e.chats[i].isShared = a),
          (e.chats[i].shareSlug = o),
          (e.chats[i].shareUrl = u));
      },
      removeChat: (e, n) => {
        const i = n.payload;
        (delete e.chats[i], e.currentChatId === i && (e.currentChatId = null));
      },
    },
  }),
  {
    setChats: H3,
    setCurrentChatId: yo,
    setLoading: U1,
    setError: SM,
    createNewChat: H1,
    addNewMessage: ph,
    addMessages: q3,
    setChatShared: q1,
    removeChat: F1,
  } = kS.actions,
  F3 = kS.reducer,
  Qh = XT({ reducer: { auth: lR, chat: F3 } }),
  P3 = () => {
    const e = op();
    async function n({ message: f, chatId: h }) {
      try {
        let p = h;
        if (!h) {
          const k = "temp-" + Date.now();
          (e(H1({ chatId: k, title: "New Chat" })), e(yo(k)), (p = k));
        }
        (e(ph({ chatId: p, content: f, role: "user" })), e(U1(!0)));
        const y = await D3({ message: f, chatId: h }),
          { chat: g, aiMessage: x, sources: v, searched: S } = y;
        (Qh.getState().chat.chats[g._id] ||
          (e(H1({ chatId: g._id, title: g.title || "New Chat" })),
          e(ph({ chatId: g._id, content: f, role: "user" }))),
          e(
            ph({
              chatId: g._id,
              content: x.content,
              role: x.role,
              sources: v || null,
              searched: S || !1,
            }),
          ),
          e(yo(g._id)),
          B1(g._id),
          p.startsWith("temp-") && e(F1(p)));
      } catch (p) {
        console.error("handleSendMessage error:", p.message);
      } finally {
        e(U1(!1));
      }
    }
    async function i() {
      try {
        const f = await N3();
        e(
          H3(
            f.chats.reduce(
              (h, p) => (
                (h[p._id] = {
                  id: p._id,
                  title: p.title,
                  messages: [],
                  isShared: p.isShared || !1,
                  shareSlug: p.shareSlug || null,
                  shareUrl: p.shareSlug
                    ? `${window.location.origin}/share/${p.shareSlug}`
                    : null,
                  lastUpdated: p.updatedAt,
                }),
                h
              ),
              {},
            ),
          ),
        );
      } catch (f) {
        console.error("handleGetChats error:", f);
      }
    }
    async function a(f) {
      try {
        if (Qh.getState().chat.chats[f]?.messages?.length > 0) {
          e(yo(f));
          return;
        }
        const p = await M3({ chatId: f });
        (e(
          q3({
            chatId: f,
            messages: p.messages.map((y) => ({
              content: y.content,
              role: y.role,
              sources: y.sources || null,
              searched: y.searched || !1,
            })),
          }),
        ),
          e(yo(f)),
          B1(f));
      } catch (h) {
        console.error("handleOpenChat error:", h);
      }
    }
    async function o(f) {
      try {
        (await j3({ chatId: f }), e(F1(f)));
      } catch (h) {
        console.error("handleDeleteChat error:", h);
      }
    }
    async function u(f) {
      try {
        const h = await L3({ chatId: f });
        return (
          e(
            q1({
              chatId: f,
              isShared: !0,
              shareSlug: h.shareSlug,
              shareUrl: h.shareUrl,
            }),
          ),
          h.shareUrl
        );
      } catch (h) {
        console.error("handleShareChat error:", h);
      }
    }
    async function c(f) {
      try {
        (await B3({ chatId: f }),
          e(q1({ chatId: f, isShared: !1, shareSlug: null, shareUrl: null })));
      } catch (h) {
        console.error("handleUnshareChat error:", h);
      }
    }
    return {
      initializeSocketConnection: z3,
      handleSendMessage: n,
      handleGetChats: i,
      handleOpenChat: a,
      handleDeleteChat: o,
      handleShareChat: u,
      handleUnshareChat: c,
    };
  },
  V3 = () =>
    w.jsx("style", {
      children: `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --c-bg:       #050507;
      --c-s1:       #09090d;
      --c-s2:       #0e0e14;
      --c-s3:       #141420;
      --c-border:   rgba(255,255,255,0.055);
      --c-border2:  rgba(255,255,255,0.08);
      --c-teal:     #2dd4bf;
      --c-teal2:    #14b8a6;
      --c-teal3:    #0d9488;
      --c-glow:     rgba(45,212,191,0.15);
      --c-glow2:    rgba(45,212,191,0.07);
      --c-glow3:    rgba(45,212,191,0.03);
      --c-text:     #f0f0f5;
      --c-text2:    #7878a0;
      --c-text3:    #3a3a55;
      --c-text4:    #22223a;
      --c-red:      #f87171;
      --f-sans:     'DM Sans', sans-serif;
      --f-mono:     'DM Mono', monospace;
      --r:          16px;
      --r-sm:       10px;
      --sidebar:    264px;
      --topbar:     56px;
    }

    html, body { height: 100%; overflow: hidden; }
    body { font-family: var(--f-sans); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; }

    /* scrollbar */
    ::-webkit-scrollbar { width: 3px; height: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--c-s3); border-radius: 99px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--c-text3); }

    /* ── Layout ── */
    .root { display: flex; height: 100dvh; width: 100vw; overflow: hidden; position: relative; }

    /* ── Ambient light ── */
    .ambient {
      pointer-events: none; position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 55% 35% at 15% 0%, rgba(45,212,191,0.055) 0%, transparent 70%),
        radial-gradient(ellipse 35% 50% at 90% 90%, rgba(45,212,191,0.035) 0%, transparent 65%);
    }

    /* ── Sidebar ── */
    .sidebar {
      position: relative; z-index: 20;
      width: var(--sidebar); flex-shrink: 0;
      height: 100dvh;
      display: flex; flex-direction: column;
      background: var(--c-s1);
      border-right: 1px solid var(--c-border);
      transition: transform 0.28s cubic-bezier(.4,0,.2,1);
    }
    @media (max-width: 767px) {
      .sidebar { position: fixed; top: 0; left: 0; bottom: 0; transform: translateX(-100%); }
      .sidebar.open { transform: translateX(0); box-shadow: 0 0 60px rgba(0,0,0,0.8); }
    }

    .sidebar-brand {
      display: flex; align-items: center; gap: 10px;
      padding: 18px 16px 16px;
      border-bottom: 1px solid var(--c-border);
    }
    .brand-logo {
      width: 32px; height: 32px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 20px rgba(45,212,191,0.35), 0 2px 8px rgba(0,0,0,0.4);
    }
    .brand-name {
      font-size: 15px; font-weight: 600; letter-spacing: -0.02em;
      color: var(--c-text);
    }

    .new-chat {
      margin: 10px 12px;
      display: flex; align-items: center; gap: 8px;
      padding: 9px 12px;
      border-radius: var(--r-sm);
      border: 1px dashed var(--c-border2);
      background: transparent;
      color: var(--c-text3);
      font-family: var(--f-sans); font-size: 13px;
      cursor: pointer; transition: all 0.18s;
    }
    .new-chat:hover {
      border-color: var(--c-teal); color: var(--c-teal);
      background: var(--c-glow3);
      box-shadow: 0 0 16px rgba(45,212,191,0.08);
    }
    .new-chat svg { flex-shrink: 0; }

    .chat-section-label {
      padding: 8px 16px 4px;
      font-size: 10px; font-weight: 600;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--c-text4);
    }

    .chat-list { flex: 1; overflow-y: auto; padding: 2px 8px 8px; }

    .chat-item {
      position: relative;
      display: flex; align-items: center; gap: 8px;
      padding: 9px 10px 9px 12px;
      border-radius: var(--r-sm);
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s;
      margin-bottom: 1px;
    }
    .chat-item:hover { background: var(--c-s2); border-color: var(--c-border); }
    .chat-item.active {
      background: var(--c-glow2);
      border-color: rgba(45,212,191,0.15);
    }
    .chat-item.active::before {
      content: ''; position: absolute; left: -1px; top: 50%; transform: translateY(-50%);
      width: 2px; height: 18px; border-radius: 99px;
      background: var(--c-teal);
      box-shadow: 0 0 8px var(--c-teal);
    }
    .chat-title {
      flex: 1; font-size: 13px; white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
      color: var(--c-text3); transition: color 0.15s;
    }
    .chat-item:hover .chat-title { color: var(--c-text2); }
    .chat-item.active .chat-title { color: var(--c-text); }

    .shared-pip {
      width: 5px; height: 5px; border-radius: 99px;
      background: var(--c-teal); flex-shrink: 0;
      box-shadow: 0 0 6px var(--c-teal);
      animation: pipPulse 2.5s ease-in-out infinite;
    }
    @keyframes pipPulse { 0%,100%{opacity:1;} 50%{opacity:0.35;} }

    .chat-item-actions {
      display: none; align-items: center; gap: 1px;
    }
    .chat-item:hover .chat-item-actions { display: flex; }
    .icon-btn-sm {
      width: 26px; height: 26px; border: none; background: none;
      color: var(--c-text4); cursor: pointer; border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .icon-btn-sm:hover { background: var(--c-s3); color: var(--c-text2); }
    .icon-btn-sm.danger:hover { background: rgba(248,113,113,0.1); color: var(--c-red); }

    .sidebar-footer {
      padding: 10px 12px;
      border-top: 1px solid var(--c-border);
    }
    .user-row {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 10px; border-radius: var(--r-sm);
      cursor: pointer; transition: background 0.15s;
    }
    .user-row:hover { background: var(--c-s2); }
    .user-avatar {
      width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
      background: linear-gradient(135deg, #0d2626, #0f3030);
      border: 1px solid rgba(45,212,191,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 700; color: var(--c-teal);
    }
    .user-name { font-size: 12.5px; color: var(--c-text3); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .logout-btn {
      width: 26px; height: 26px; border: none; background: none;
      color: var(--c-text4); cursor: pointer; border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s; flex-shrink: 0;
    }
    .logout-btn:hover { background: var(--c-s3); color: var(--c-text2); }

    /* ── Backdrop (mobile) ── */
    .backdrop {
      display: none; position: fixed; inset: 0; z-index: 19;
      background: rgba(0,0,0,0.75); backdrop-filter: blur(4px);
    }
    .backdrop.show { display: block; }

    /* ── Main ── */
    .main { flex: 1; display: flex; flex-direction: column; height: 100dvh; min-width: 0; position: relative; z-index: 1; }

    /* ── Topbar ── */
    .topbar {
      height: var(--topbar); flex-shrink: 0;
      display: flex; align-items: center; gap: 12px;
      padding: 0 16px;
      border-bottom: 1px solid var(--c-border);
      background: rgba(5,5,7,0.85);
      backdrop-filter: blur(16px);
      position: relative; z-index: 5;
    }
    .menu-toggle {
      width: 34px; height: 34px; border: none;
      background: var(--c-s2); border-radius: 9px;
      display: flex; align-items: center; justify-content: center;
      color: var(--c-text3); cursor: pointer; flex-shrink: 0;
      transition: all 0.15s;
      border: 1px solid var(--c-border);
    }
    .menu-toggle:hover { background: var(--c-s3); color: var(--c-text); }
    @media (min-width: 768px) { .menu-toggle { display: none; } }

    .topbar-title {
      flex: 1; font-size: 13.5px; font-weight: 500;
      color: var(--c-text3); white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
    }

    /* ── THE SHARE BUTTON — crown jewel ── */
    .share-btn {
      display: flex; align-items: center; gap: 7px;
      padding: 7px 14px;
      border-radius: 10px;
      border: 1px solid var(--c-border2);
      background: var(--c-s2);
      color: var(--c-text2);
      font-family: var(--f-sans); font-size: 12.5px; font-weight: 600;
      cursor: pointer; flex-shrink: 0;
      transition: all 0.2s;
      letter-spacing: 0.01em;
    }
    .share-btn:hover {
      border-color: var(--c-teal);
      color: var(--c-teal);
      background: var(--c-glow2);
      box-shadow: 0 0 20px rgba(45,212,191,0.12), 0 0 0 1px rgba(45,212,191,0.12);
    }
    .share-btn.is-shared {
      border-color: rgba(45,212,191,0.3);
      color: var(--c-teal);
      background: var(--c-glow2);
      box-shadow: 0 0 16px rgba(45,212,191,0.1);
    }
    .share-btn.is-shared:hover {
      box-shadow: 0 0 24px rgba(45,212,191,0.18), 0 0 0 1px rgba(45,212,191,0.2);
    }
    .share-live-dot {
      width: 6px; height: 6px; border-radius: 99px;
      background: var(--c-teal);
      box-shadow: 0 0 8px var(--c-teal);
      animation: pipPulse 2s infinite;
      flex-shrink: 0;
    }

    /* ── Messages ── */
    .messages-wrap {
      flex: 1; overflow-y: auto;
      padding-bottom: 8px;
    }
    .messages-inner {
      max-width: 700px; margin: 0 auto;
      padding: 28px 20px 16px;
    }
    @media (max-width: 640px) {
      .messages-inner { padding: 20px 14px 12px; }
    }

    /* User bubble */
    .msg-user {
      display: flex; justify-content: flex-end;
      margin-bottom: 20px;
    }
    .msg-user-bubble {
      max-width: 78%;
      padding: 12px 16px;
      background: var(--c-s3);
      border: 1px solid var(--c-border2);
      border-radius: 20px 20px 4px 20px;
      font-size: 14px; line-height: 1.65;
      color: rgba(240,240,245,0.88);
    }
    @media (max-width: 640px) {
      .msg-user-bubble { max-width: 88%; font-size: 13.5px; }
    }

    /* AI bubble */
    .msg-ai { display: flex; gap: 12px; margin-bottom: 28px; }
    .ai-avatar {
      width: 28px; height: 28px; border-radius: 9px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 16px rgba(45,212,191,0.3), 0 2px 6px rgba(0,0,0,0.4);
      margin-top: 1px;
    }
    .ai-body { flex: 1; min-width: 0; }

    .ai-header {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 10px;
    }
    .ai-label {
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--c-teal);
    }
    .searched-badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 10px; font-weight: 500;
      padding: 2px 8px; border-radius: 99px;
      background: var(--c-glow3);
      border: 1px solid rgba(45,212,191,0.12);
      color: rgba(45,212,191,0.6);
    }

    /* Markdown content */
    .md-content { font-size: 14px; line-height: 1.82; color: #a8a8c0; }
    .md-content p { margin-bottom: 10px; }
    .md-content p:last-child { margin-bottom: 0; }
    .md-content strong { color: var(--c-text); font-weight: 600; }
    .md-content em { color: #8888a8; font-style: italic; }
    .md-content code {
      font-family: var(--f-mono); font-size: 12.5px;
      background: rgba(45,212,191,0.07);
      border: 1px solid rgba(45,212,191,0.12);
      padding: 1px 6px; border-radius: 5px;
      color: var(--c-teal);
    }
    .md-content pre {
      background: var(--c-s2); border: 1px solid var(--c-border);
      border-radius: 12px; padding: 16px;
      overflow-x: auto; margin: 12px 0;
    }
    .md-content pre code { background: none; border: none; padding: 0; color: #8888a8; font-size: 12.5px; }
    .md-content ul { list-style: none; padding: 0; margin-bottom: 10px; }
    .md-content ul li { display: flex; gap: 8px; color: #a8a8c0; margin-bottom: 5px; }
    .md-content ul li::before { content: '▸'; color: var(--c-teal); flex-shrink: 0; margin-top: 2px; font-size: 11px; }
    .md-content ol { padding-left: 20px; margin-bottom: 10px; color: #a8a8c0; }
    .md-content ol li { margin-bottom: 5px; }
    .md-content h1,.md-content h2,.md-content h3 { color: var(--c-text); font-weight: 600; margin: 16px 0 8px; }
    .md-content h1 { font-size: 17px; }
    .md-content h2 { font-size: 15px; }
    .md-content h3 { font-size: 14px; }
    .md-content blockquote {
      border-left: 2px solid rgba(45,212,191,0.3);
      padding-left: 14px; margin: 12px 0;
      color: #666688; font-style: italic;
    }
    .md-content a { color: var(--c-teal); text-decoration: none; border-bottom: 1px solid rgba(45,212,191,0.25); transition: border-color 0.15s; }
    .md-content a:hover { border-color: var(--c-teal); }
    .md-content table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; }
    .md-content th { background: var(--c-s2); border: 1px solid var(--c-border); padding: 8px 12px; text-align: left; color: var(--c-text2); font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; }
    .md-content td { border: 1px solid var(--c-border); padding: 8px 12px; color: #7878a0; }
    @media (max-width: 640px) { .md-content { font-size: 13.5px; } }

    /* Sources */
    .sources {
      margin-top: 14px; padding-top: 12px;
      border-top: 1px solid var(--c-border);
    }
    .sources-label {
      font-size: 10px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--c-text4); margin-bottom: 8px;
      display: flex; align-items: center; gap: 5px;
    }
    .source-chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .source-chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px; border-radius: 99px;
      border: 1px solid var(--c-border);
      background: var(--c-s2);
      font-size: 11.5px; color: var(--c-text3);
      text-decoration: none; transition: all 0.15s;
      font-family: var(--f-mono);
    }
    .source-chip:hover {
      border-color: rgba(45,212,191,0.25);
      color: var(--c-teal); background: var(--c-glow3);
    }

    /* Copy btn */
    .copy-btn {
      display: inline-flex; align-items: center; gap: 5px;
      margin-top: 10px; padding: 5px 10px; border-radius: 7px;
      border: none; background: none;
      font-family: var(--f-sans); font-size: 11.5px;
      color: var(--c-text4); cursor: pointer;
      transition: all 0.15s; opacity: 0;
    }
    .msg-ai:hover .copy-btn { opacity: 1; }
    .copy-btn:hover { background: var(--c-s2); color: var(--c-text3); }

    /* Typing indicator */
    .typing-wrap { display: flex; gap: 12px; margin-bottom: 20px; }
    .typing-dots {
      display: flex; align-items: center; gap: 5px;
      padding: 14px 16px;
      background: var(--c-s2);
      border: 1px solid var(--c-border);
      border-radius: 20px;
    }
    .typing-dot {
      width: 6px; height: 6px; border-radius: 99px;
      background: var(--c-teal);
    }
    .typing-dot:nth-child(1) { animation: tdot 1.3s ease-in-out 0s infinite; }
    .typing-dot:nth-child(2) { animation: tdot 1.3s ease-in-out 0.18s infinite; }
    .typing-dot:nth-child(3) { animation: tdot 1.3s ease-in-out 0.36s infinite; }
    @keyframes tdot { 0%,60%,100%{transform:translateY(0);opacity:0.4} 30%{transform:translateY(-6px);opacity:1} }

    /* ── Empty / Welcome ── */
    .welcome {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      min-height: 60vh; padding: 40px 20px;
      text-align: center;
    }
    .welcome-glow {
      width: 64px; height: 64px; border-radius: 20px;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 22px;
      box-shadow:
        0 0 0 1px rgba(45,212,191,0.3),
        0 0 40px rgba(45,212,191,0.25),
        0 0 80px rgba(45,212,191,0.1);
    }
    .welcome-title {
      font-size: 26px; font-weight: 700;
      letter-spacing: -0.03em; color: var(--c-text);
      margin-bottom: 8px;
      background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.55));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .welcome-sub { font-size: 13.5px; color: var(--c-text3); margin-bottom: 36px; line-height: 1.6; }
    .suggestions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; max-width: 440px; }
    @media (max-width: 480px) { .suggestions { grid-template-columns: 1fr; } }
    .suggestion {
      padding: 12px 14px; border-radius: 12px;
      border: 1px solid var(--c-border);
      background: var(--c-s1);
      text-align: left; font-family: var(--f-sans);
      font-size: 12.5px; color: var(--c-text3);
      cursor: pointer; transition: all 0.18s; line-height: 1.5;
    }
    .suggestion:hover {
      border-color: rgba(45,212,191,0.2);
      background: var(--c-glow3); color: var(--c-text2);
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }

    /* ── Input area ── */
    .input-area {
      flex-shrink: 0;
      padding: 12px 16px 16px;
      border-top: 1px solid var(--c-border);
      background: rgba(5,5,7,0.9);
      backdrop-filter: blur(16px);
    }
    .input-wrap { max-width: 700px; margin: 0 auto; }
    .input-box {
      display: flex; align-items: flex-end; gap: 10px;
      background: var(--c-s1);
      border: 1px solid var(--c-border2);
      border-radius: 16px;
      padding: 12px 12px 12px 16px;
      transition: all 0.2s;
    }
    .input-box:focus-within {
      border-color: rgba(45,212,191,0.3);
      box-shadow: 0 0 0 3px rgba(45,212,191,0.06), 0 0 40px rgba(45,212,191,0.06);
    }
    .input-ta {
      flex: 1; background: none; border: none; outline: none;
      color: var(--c-text); font-family: var(--f-sans);
      font-size: 14px; line-height: 1.6; resize: none;
    }
    .input-ta::placeholder { color: var(--c-text4); }
    .input-ta:disabled { opacity: 0.35; }
    @media (max-width: 640px) { .input-ta { font-size: 16px; } /* prevent zoom */ }
    .send-btn {
      width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      border: none; color: #fff;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.2s;
      box-shadow: 0 0 16px rgba(45,212,191,0.25), 0 2px 6px rgba(0,0,0,0.3);
    }
    .send-btn:hover:not(:disabled) {
      box-shadow: 0 0 24px rgba(45,212,191,0.4), 0 2px 10px rgba(0,0,0,0.3);
      transform: scale(1.05);
    }
    .send-btn:disabled { opacity: 0.2; cursor: not-allowed; transform: none; box-shadow: none; }
    .input-hint { text-align: center; font-size: 10.5px; color: var(--c-text4); margin-top: 8px; }

    /* ── Share Modal ── */
    .modal-bg {
      position: fixed; inset: 0; z-index: 100;
      display: flex; align-items: center; justify-content: center; padding: 16px;
      background: rgba(0,0,0,0.85);
      backdrop-filter: blur(10px);
      animation: fadein 0.15s ease;
    }
    @keyframes fadein { from{opacity:0} to{opacity:1} }
    .modal {
      width: 100%; max-width: 400px;
      background: var(--c-s1);
      border: 1px solid var(--c-border2);
      border-radius: 20px; overflow: hidden;
      box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(45,212,191,0.06);
      animation: slideup 0.22s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes slideup { from{transform:translateY(16px) scale(0.97);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }

    .modal-head {
      padding: 20px 20px 18px;
      border-bottom: 1px solid var(--c-border);
      display: flex; align-items: flex-start; justify-content: space-between;
    }
    .modal-icon-wrap {
      width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
      background: var(--c-glow2); border: 1px solid rgba(45,212,191,0.18);
      display: flex; align-items: center; justify-content: center;
      color: var(--c-teal);
    }
    .modal-title { font-size: 14.5px; font-weight: 600; color: var(--c-text); margin-bottom: 2px; }
    .modal-sub { font-size: 11.5px; color: var(--c-text3); line-height: 1.5; }
    .close-btn {
      width: 30px; height: 30px; border-radius: 8px; border: none;
      background: none; color: var(--c-text3); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .close-btn:hover { background: var(--c-s3); color: var(--c-text); }

    .modal-body { padding: 18px 20px 20px; }

    .live-status {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 12px; border-radius: 10px;
      background: var(--c-glow3); border: 1px solid rgba(45,212,191,0.1);
      margin-bottom: 14px;
    }
    .live-dot {
      width: 7px; height: 7px; border-radius: 99px; flex-shrink: 0;
      background: var(--c-teal); box-shadow: 0 0 8px var(--c-teal);
      animation: pipPulse 2s infinite;
    }
    .live-text { font-size: 12px; color: var(--c-text3); }

    .url-box {
      display: flex; align-items: center; gap: 8px;
      background: var(--c-bg); border: 1px solid var(--c-border2);
      border-radius: 11px; padding: 10px 12px;
      margin-bottom: 10px;
    }
    .url-text {
      flex: 1; font-size: 11.5px; font-family: var(--f-mono);
      color: var(--c-text3); overflow: hidden;
      text-overflow: ellipsis; white-space: nowrap;
    }
    .copy-link-btn {
      flex-shrink: 0; display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: 7px;
      border: 1px solid var(--c-border2);
      background: var(--c-s2);
      font-family: var(--f-sans); font-size: 11.5px; font-weight: 500;
      color: var(--c-text3); cursor: pointer; transition: all 0.15s;
      white-space: nowrap;
    }
    .copy-link-btn:hover { border-color: var(--c-teal); color: var(--c-teal); background: var(--c-glow3); }
    .copy-link-btn.done { border-color: var(--c-teal); color: var(--c-teal); background: var(--c-glow3); }

    .generate-btn {
      width: 100%; padding: 12px;
      border-radius: 12px; border: none;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      color: #fff; font-family: var(--f-sans); font-size: 13.5px; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      box-shadow: 0 0 24px rgba(45,212,191,0.2), 0 4px 12px rgba(0,0,0,0.3);
    }
    .generate-btn:hover:not(:disabled) {
      box-shadow: 0 0 32px rgba(45,212,191,0.35), 0 4px 16px rgba(0,0,0,0.35);
      transform: translateY(-1px);
    }
    .generate-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    .revoke-btn {
      width: 100%; padding: 10px;
      border-radius: 10px;
      border: 1px solid rgba(248,113,113,0.15);
      background: none;
      font-family: var(--f-sans); font-size: 12.5px;
      color: rgba(248,113,113,0.5); cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      transition: all 0.18s;
    }
    .revoke-btn:hover:not(:disabled) {
      border-color: rgba(248,113,113,0.4); color: var(--c-red);
      background: rgba(248,113,113,0.05);
    }
    .revoke-btn:disabled { opacity: 0.35; cursor: not-allowed; }

    .share-info-box {
      padding: 12px 14px; border-radius: 11px;
      background: var(--c-bg); border: 1px solid var(--c-border);
      font-size: 12.5px; color: var(--c-text3); line-height: 1.6;
      margin-bottom: 14px;
    }

    /* spin */
    .spin { animation: spin 0.75s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── dots menu ── */
    .dots-menu {
      position: absolute; right: 0; top: calc(100% + 4px); z-index: 30;
      background: var(--c-s2); border: 1px solid var(--c-border2);
      border-radius: 12px; overflow: hidden; min-width: 140px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.5);
      animation: fadein 0.12s ease;
    }
    .dots-menu-item {
      width: 100%; display: flex; align-items: center; gap: 8px;
      padding: 10px 14px;
      background: none; border: none; border-bottom: 1px solid var(--c-border);
      font-family: var(--f-sans); font-size: 12.5px;
      color: var(--c-text3); cursor: pointer; transition: all 0.12s;
      text-align: left;
    }
    .dots-menu-item:last-child { border-bottom: none; }
    .dots-menu-item:hover { background: var(--c-s3); color: var(--c-text); }
    .dots-menu-item.red:hover { background: rgba(248,113,113,0.08); color: var(--c-red); }
  `,
    }),
  qt = {
    Share: () =>
      w.jsxs("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
          w.jsx("circle", { cx: "18", cy: "5", r: "3" }),
          w.jsx("circle", { cx: "6", cy: "12", r: "3" }),
          w.jsx("circle", { cx: "18", cy: "19", r: "3" }),
          w.jsx("line", { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" }),
          w.jsx("line", { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" }),
        ],
      }),
    Trash: () =>
      w.jsxs("svg", {
        width: "13",
        height: "13",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
          w.jsx("polyline", { points: "3 6 5 6 21 6" }),
          w.jsx("path", { d: "M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" }),
        ],
      }),
    Copy: () =>
      w.jsxs("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
          w.jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2" }),
          w.jsx("path", {
            d: "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
          }),
        ],
      }),
    Check: () =>
      w.jsx("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: w.jsx("polyline", { points: "20 6 9 17 4 12" }),
      }),
    Globe: () =>
      w.jsxs("svg", {
        width: "11",
        height: "11",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        children: [
          w.jsx("circle", { cx: "12", cy: "12", r: "10" }),
          w.jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
          w.jsx("path", {
            d: "M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20",
          }),
        ],
      }),
    Logout: () =>
      w.jsxs("svg", {
        width: "13",
        height: "13",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
          w.jsx("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" }),
          w.jsx("polyline", { points: "16 17 21 12 16 7" }),
          w.jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" }),
        ],
      }),
    Menu: () =>
      w.jsxs("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        children: [
          w.jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
          w.jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
          w.jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" }),
        ],
      }),
    X: () =>
      w.jsxs("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        children: [
          w.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          w.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
        ],
      }),
    Link: () =>
      w.jsxs("svg", {
        width: "11",
        height: "11",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        children: [
          w.jsx("path", {
            d: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71",
          }),
          w.jsx("path", {
            d: "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
          }),
        ],
      }),
    Spin: ({ s: e = 14 }) =>
      w.jsxs("svg", {
        className: "spin",
        width: e,
        height: e,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        children: [
          w.jsx("path", {
            d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            opacity: "0.2",
          }),
          w.jsx("path", { d: "M21 12a9 9 0 00-9-9", strokeLinecap: "round" }),
        ],
      }),
  },
  Y3 = ({ sources: e }) => {
    if (!e) return null;
    let n = [];
    if (typeof e == "string")
      n = e
        .split(
          `

`,
        )
        .filter(Boolean);
    else if (Array.isArray(e))
      n = e.map(
        (a, o) => `[${o + 1}] ${a.title}
${a.content}
Source: ${a.url}`,
      );
    else return null;
    const i = n
      .map((a, o) => {
        const u = a.match(/Source:\s*(https?:\/\/[^\s]+)/),
          c = a.match(/^\[(\d+)\]\s(.+)/);
        return {
          url: u?.[1],
          title:
            c?.[2]?.split(`
`)[0] || `Source ${o + 1}`,
          index: o + 1,
        };
      })
      .filter((a) => a.url);
    return i.length
      ? w.jsxs("div", {
          className: "sources",
          children: [
            w.jsxs("div", {
              className: "sources-label",
              children: [w.jsx(qt.Globe, {}), " Sources"],
            }),
            w.jsx("div", {
              className: "source-chips",
              children: i.map((a) =>
                w.jsxs(
                  "a",
                  {
                    href: a.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "source-chip",
                    children: [
                      w.jsxs("span", {
                        style: { color: "var(--c-text4)" },
                        children: ["[", a.index, "]"],
                      }),
                      a.title.slice(0, 28),
                      a.title.length > 28 ? "…" : "",
                    ],
                  },
                  a.index,
                ),
              ),
            }),
          ],
        })
      : null;
  },
  I3 = {
    p: ({ children: e }) => w.jsx("p", { children: e }),
    strong: ({ children: e }) => w.jsx("strong", { children: e }),
    em: ({ children: e }) => w.jsx("em", { children: e }),
    ul: ({ children: e }) => w.jsx("ul", { children: e }),
    ol: ({ children: e }) => w.jsx("ol", { children: e }),
    li: ({ children: e }) => w.jsx("li", { children: e }),
    code: ({ inline: e, children: n }) =>
      e ? w.jsx("code", { children: n }) : w.jsx("code", { children: n }),
    pre: ({ children: e }) => w.jsx("pre", { children: e }),
    h1: ({ children: e }) => w.jsx("h1", { children: e }),
    h2: ({ children: e }) => w.jsx("h2", { children: e }),
    h3: ({ children: e }) => w.jsx("h3", { children: e }),
    blockquote: ({ children: e }) => w.jsx("blockquote", { children: e }),
    a: ({ href: e, children: n }) =>
      w.jsx("a", {
        href: e,
        target: "_blank",
        rel: "noopener noreferrer",
        children: n,
      }),
    table: ({ children: e }) => w.jsx("table", { children: e }),
    th: ({ children: e }) => w.jsx("th", { children: e }),
    td: ({ children: e }) => w.jsx("td", { children: e }),
  },
  X3 = ({ msg: e }) => {
    const [n, i] = B.useState(!1),
      a = () => {
        (navigator.clipboard.writeText(e.content),
          i(!0),
          setTimeout(() => i(!1), 1500));
      };
    return e.role === "user"
      ? w.jsx("div", {
          className: "msg-user",
          children: w.jsx("div", {
            className: "msg-user-bubble",
            children: e.content,
          }),
        })
      : w.jsxs("div", {
          className: "msg-ai",
          children: [
            w.jsx("div", { className: "ai-avatar", children: w.jsx(il, {}) }),
            w.jsxs("div", {
              className: "ai-body",
              children: [
                w.jsxs("div", {
                  className: "ai-header",
                  children: [
                    w.jsx("span", {
                      className: "ai-label",
                      children: "Perplexity",
                    }),
                    e.searched &&
                      w.jsxs("span", {
                        className: "searched-badge",
                        children: [w.jsx(qt.Globe, {}), " searched web"],
                      }),
                  ],
                }),
                w.jsx("div", {
                  className: "md-content",
                  children: w.jsx(qv, {
                    remarkPlugins: [cS],
                    components: I3,
                    children: e.content,
                  }),
                }),
                w.jsx(Y3, { sources: e.sources }),
                w.jsx("button", {
                  className: "copy-btn",
                  onClick: a,
                  children: n
                    ? w.jsxs(w.Fragment, {
                        children: [w.jsx(qt.Check, {}), " Copied"],
                      })
                    : w.jsxs(w.Fragment, {
                        children: [w.jsx(qt.Copy, {}), " Copy"],
                      }),
                }),
              ],
            }),
          ],
        });
  },
  G3 = ({ chat: e, onShare: n, onUnshare: i, onClose: a }) => {
    const [o, u] = B.useState(!1),
      [c, f] = B.useState(!1),
      [h, p] = B.useState(e.shareUrl || null),
      [y, g] = B.useState(e.isShared || !1),
      x = () => {
        (navigator.clipboard.writeText(h),
          u(!0),
          setTimeout(() => u(!1), 1800));
      },
      v = async () => {
        f(!0);
        const _ = await n(e.id);
        (_ && (p(_), g(!0)), f(!1));
      },
      S = async () => {
        (f(!0), await i(e.id), p(null), g(!1), f(!1));
      };
    return w.jsx("div", {
      className: "modal-bg",
      onClick: a,
      children: w.jsxs("div", {
        className: "modal",
        onClick: (_) => _.stopPropagation(),
        children: [
          w.jsxs("div", {
            className: "modal-head",
            children: [
              w.jsxs("div", {
                style: { display: "flex", alignItems: "flex-start", gap: 12 },
                children: [
                  w.jsx("div", {
                    className: "modal-icon-wrap",
                    children: w.jsx(qt.Share, {}),
                  }),
                  w.jsxs("div", {
                    children: [
                      w.jsx("div", {
                        className: "modal-title",
                        children: "Share conversation",
                      }),
                      w.jsx("div", {
                        className: "modal-sub",
                        children: "Anyone with the link can view — not reply",
                      }),
                    ],
                  }),
                ],
              }),
              w.jsx("button", {
                className: "close-btn",
                onClick: a,
                children: w.jsx(qt.X, {}),
              }),
            ],
          }),
          w.jsx("div", {
            className: "modal-body",
            children:
              y && h
                ? w.jsxs("div", {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    },
                    children: [
                      w.jsxs("div", {
                        className: "live-status",
                        children: [
                          w.jsx("div", { className: "live-dot" }),
                          w.jsx("span", {
                            className: "live-text",
                            children:
                              "Link is live — anyone can read this chat",
                          }),
                        ],
                      }),
                      w.jsxs("div", {
                        className: "url-box",
                        children: [
                          w.jsx(qt.Link, {}),
                          w.jsx("span", { className: "url-text", children: h }),
                          w.jsx("button", {
                            className: `copy-link-btn ${o ? "done" : ""}`,
                            onClick: x,
                            children: o
                              ? w.jsxs(w.Fragment, {
                                  children: [w.jsx(qt.Check, {}), " Copied!"],
                                })
                              : w.jsxs(w.Fragment, {
                                  children: [w.jsx(qt.Copy, {}), " Copy"],
                                }),
                          }),
                        ],
                      }),
                      w.jsxs("button", {
                        className: "revoke-btn",
                        onClick: S,
                        disabled: c,
                        children: [
                          c ? w.jsx(qt.Spin, { s: 12 }) : w.jsx(qt.X, {}),
                          c ? "Revoking…" : "Revoke link",
                        ],
                      }),
                    ],
                  })
                : w.jsxs("div", {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    },
                    children: [
                      w.jsx("div", {
                        className: "share-info-box",
                        children:
                          "Create a public link for this conversation. Anyone with the link can read without logging in.",
                      }),
                      w.jsx("button", {
                        className: "generate-btn",
                        onClick: v,
                        disabled: c,
                        children: c
                          ? w.jsxs(w.Fragment, {
                              children: [
                                w.jsx(qt.Spin, { s: 14 }),
                                " Generating…",
                              ],
                            })
                          : w.jsxs(w.Fragment, {
                              children: [
                                w.jsx(qt.Share, {}),
                                " Generate share link",
                              ],
                            }),
                      }),
                    ],
                  }),
          }),
        ],
      }),
    });
  },
  Q3 = ({ chat: e, isActive: n, onOpen: i, onDelete: a, onShare: o }) => {
    const [u, c] = B.useState(!1),
      f = B.useRef(null);
    return (
      B.useEffect(() => {
        const h = (p) => {
          f.current && !f.current.contains(p.target) && c(!1);
        };
        return (
          document.addEventListener("mousedown", h),
          () => document.removeEventListener("mousedown", h)
        );
      }, []),
      w.jsxs("div", {
        className: `chat-item ${n ? "active" : ""}`,
        onClick: () => i(e.id),
        children: [
          w.jsx("span", { className: "chat-title", children: e.title }),
          e.isShared &&
            w.jsx("div", { className: "shared-pip", title: "Shared" }),
          w.jsxs("div", {
            className: "chat-item-actions",
            ref: f,
            style: { position: "relative" },
            children: [
              w.jsx("button", {
                className: "icon-btn-sm",
                title: "More",
                onClick: (h) => {
                  (h.stopPropagation(), c(!u));
                },
                children: w.jsx(uR, {}),
              }),
              u &&
                w.jsxs("div", {
                  className: "dots-menu",
                  onClick: (h) => h.stopPropagation(),
                  children: [
                    w.jsxs("button", {
                      className: "dots-menu-item",
                      onClick: () => {
                        (c(!1), o(e));
                      },
                      children: [
                        w.jsx(qt.Share, {}),
                        " ",
                        e.isShared ? "Manage share" : "Share",
                      ],
                    }),
                    w.jsxs("button", {
                      className: "dots-menu-item red",
                      onClick: () => {
                        (c(!1), a(e.id));
                      },
                      children: [w.jsx(qt.Trash, {}), " Delete"],
                    }),
                  ],
                }),
            ],
          }),
        ],
      })
    );
  },
  K3 = ({ onPrompt: e }) => {
    const n = [
      "What's happening in tech today?",
      "Explain quantum computing simply",
      "Best React practices in 2026",
      "Gold price in India today",
    ];
    return w.jsxs("div", {
      className: "welcome",
      children: [
        w.jsx("div", { className: "welcome-glow", children: w.jsx(il, {}) }),
        w.jsx("div", { className: "welcome-title", children: "Ask anything" }),
        w.jsx("div", {
          className: "welcome-sub",
          children: "Powered by Gemini · searches the web when needed",
        }),
        w.jsx("div", {
          className: "suggestions",
          children: n.map((i, a) =>
            w.jsx(
              "button",
              { className: "suggestion", onClick: () => e(i), children: i },
              a,
            ),
          ),
        }),
      ],
    });
  },
  Z3 = () => {
    const {
        initializeSocketConnection: e,
        handleSendMessage: n,
        handleGetChats: i,
        handleOpenChat: a,
        handleDeleteChat: o,
        handleShareChat: u,
        handleUnshareChat: c,
      } = P3(),
      { handleLogout: f } = sc(),
      h = op(),
      p = Mo(),
      [y, g] = B.useState(""),
      [x, v] = B.useState(null),
      [S, _] = B.useState(!1),
      k = yr((D) => D.chat.chats),
      T = yr((D) => D.chat.currentChatId),
      j = yr((D) => D.chat.isLoading),
      M = yr((D) => D.auth.user),
      $ = B.useRef(null),
      Z = B.useRef(null),
      U = B.useRef(null),
      K = T ? k[T] : null,
      N = K?.messages || [],
      he = Object.values(k)
        .filter((D) => !D.id?.startsWith("temp-"))
        .sort((D, te) => new Date(te.lastUpdated) - new Date(D.lastUpdated));
    (B.useEffect(() => {
      (e(), i());
    }, []),
      B.useEffect(() => {
        $.current?.scrollIntoView({ behavior: "smooth" });
      }, [N, j]),
      B.useEffect(() => {
        x && k[x.id] && v(k[x.id]);
      }, [k]));
    const F = B.useCallback(
        async (D) => {
          D?.preventDefault();
          const te = y.trim();
          !te ||
            j ||
            (g(""),
            U.current && (U.current.style.height = "24px"),
            await n({ message: te, chatId: T }));
        },
        [y, T, j],
      ),
      oe = (D) => {
        D.key === "Enter" && !D.shiftKey && (D.preventDefault(), F());
      },
      ie = (D) => {
        (g(D.target.value),
          (D.target.style.height = "24px"),
          (D.target.style.height =
            Math.min(D.target.scrollHeight, 140) + "px"));
      },
      Ee = () => {
        (h(yo(null)), _(!1), setTimeout(() => Z.current?.focus(), 60));
      },
      le = async () => {
        (await f(), p("/login"));
      },
      ee = (D) => {
        (v(D), _(!1));
      };
    return w.jsxs(w.Fragment, {
      children: [
        w.jsx(V3, {}),
        w.jsxs("div", {
          className: "root",
          children: [
            w.jsx("div", { className: "ambient" }),
            w.jsxs("aside", {
              className: `sidebar ${S ? "open" : ""}`,
              children: [
                w.jsxs("div", {
                  className: "sidebar-brand",
                  children: [
                    w.jsx("div", {
                      className: "brand-logo",
                      children: w.jsx(il, {}),
                    }),
                    w.jsx("span", {
                      className: "brand-name",
                      children: "Perplexity",
                    }),
                  ],
                }),
                w.jsxs("button", {
                  className: "new-chat",
                  onClick: Ee,
                  children: [w.jsx(oR, {}), " New chat"],
                }),
                w.jsx("div", {
                  className: "chat-section-label",
                  children: "Recent",
                }),
                w.jsx("div", {
                  className: "chat-list",
                  children:
                    he.length === 0
                      ? w.jsxs("p", {
                          style: {
                            fontSize: 11,
                            color: "var(--c-text4)",
                            textAlign: "center",
                            marginTop: 32,
                            lineHeight: 1.7,
                          },
                          children: [
                            "No chats yet.",
                            w.jsx("br", {}),
                            "Start a conversation.",
                          ],
                        })
                      : he.map((D) =>
                          w.jsx(
                            Q3,
                            {
                              chat: D,
                              isActive: D.id === T,
                              onOpen: (te) => {
                                (a(te), _(!1));
                              },
                              onDelete: o,
                              onShare: ee,
                            },
                            D.id,
                          ),
                        ),
                }),
                w.jsx("div", {
                  className: "sidebar-footer",
                  children: w.jsxs("div", {
                    className: "user-row",
                    children: [
                      w.jsx("div", {
                        className: "user-avatar",
                        children: M?.username?.[0]?.toUpperCase(),
                      }),
                      w.jsx("span", {
                        className: "user-name",
                        children: M?.username,
                      }),
                      w.jsx("button", {
                        className: "logout-btn",
                        title: "Logout",
                        onClick: le,
                        children: w.jsx(qt.Logout, {}),
                      }),
                    ],
                  }),
                }),
              ],
            }),
            w.jsx("div", {
              className: `backdrop ${S ? "show" : ""}`,
              onClick: () => _(!1),
            }),
            w.jsxs("main", {
              className: "main",
              children: [
                w.jsxs("header", {
                  className: "topbar",
                  children: [
                    w.jsx("button", {
                      className: "menu-toggle",
                      onClick: () => _(!0),
                      children: w.jsx(qt.Menu, {}),
                    }),
                    w.jsx("span", {
                      className: "topbar-title",
                      children: K?.title || (T ? "Chat" : "New conversation"),
                    }),
                    K &&
                      w.jsxs("button", {
                        className: `share-btn ${K.isShared ? "is-shared" : ""}`,
                        onClick: () => ee(K),
                        children: [
                          w.jsx(qt.Share, {}),
                          w.jsx("span", {
                            children: K.isShared ? "Shared" : "Share",
                          }),
                          K.isShared &&
                            w.jsx("div", { className: "share-live-dot" }),
                        ],
                      }),
                  ],
                }),
                w.jsx("div", {
                  className: "messages-wrap",
                  children: w.jsx("div", {
                    className: "messages-inner",
                    children:
                      N.length === 0 && !j
                        ? w.jsx(K3, {
                            onPrompt: (D) => {
                              (g(D), setTimeout(() => Z.current?.focus(), 60));
                            },
                          })
                        : w.jsxs(w.Fragment, {
                            children: [
                              N.map((D, te) => w.jsx(X3, { msg: D }, te)),
                              j &&
                                w.jsxs("div", {
                                  className: "typing-wrap",
                                  children: [
                                    w.jsx("div", {
                                      className: "ai-avatar",
                                      children: w.jsx(il, {}),
                                    }),
                                    w.jsxs("div", {
                                      className: "typing-dots",
                                      children: [
                                        w.jsx("div", {
                                          className: "typing-dot",
                                        }),
                                        w.jsx("div", {
                                          className: "typing-dot",
                                        }),
                                        w.jsx("div", {
                                          className: "typing-dot",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              w.jsx("div", { ref: $ }),
                            ],
                          }),
                  }),
                }),
                w.jsx("div", {
                  className: "input-area",
                  children: w.jsxs("div", {
                    className: "input-wrap",
                    children: [
                      w.jsxs("div", {
                        className: "input-box",
                        children: [
                          w.jsx("textarea", {
                            ref: (D) => {
                              ((Z.current = D), (U.current = D));
                            },
                            className: "input-ta",
                            value: y,
                            onChange: ie,
                            onKeyDown: oe,
                            placeholder: "Ask anything…",
                            rows: 1,
                            disabled: j,
                            style: { minHeight: 24, maxHeight: 140 },
                          }),
                          w.jsx("button", {
                            className: "send-btn",
                            onClick: F,
                            disabled: !y.trim() || j,
                            children: j
                              ? w.jsx(qt.Spin, { s: 14 })
                              : w.jsx(sR, {}),
                          }),
                        ],
                      }),
                      w.jsx("div", {
                        className: "input-hint",
                        children: "Enter to send · Shift+Enter for new line",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            x &&
              w.jsx(G3, {
                chat: x,
                onShare: u,
                onUnshare: c,
                onClose: () => v(null),
              }),
          ],
        }),
      ],
    });
  },
  $3 = ({ children: e }) => {
    const n = yr((u) => u.auth.user),
      i = yr((u) => u.auth.loading),
      a = yr((u) => u.auth.initialized),
      { handleGetMe: o } = sc();
    return (
      B.useEffect(() => {
        a || o();
      }, []),
      !a || i
        ? w.jsx("div", {
            className:
              "min-h-screen bg-[#080808] flex items-center justify-center",
            children: w.jsxs("div", {
              className: "flex flex-col items-center gap-4",
              children: [
                w.jsx("div", {
                  className:
                    "w-8 h-8 rounded-xl bg-[#20b2aa] flex items-center justify-center",
                  children: w.jsx("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "white",
                    children: w.jsx("path", {
                      d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                      stroke: "white",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      fill: "none",
                    }),
                  }),
                }),
                w.jsxs("svg", {
                  className: "animate-spin text-[#20b2aa]",
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  children: [
                    w.jsx("path", {
                      d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                      opacity: "0.2",
                    }),
                    w.jsx("path", {
                      d: "M21 12a9 9 0 00-9-9",
                      strokeLinecap: "round",
                    }),
                  ],
                }),
              ],
            }),
          })
        : n
          ? e
          : w.jsx(zk, { to: "/login", replace: !0 })
    );
  },
  mh = () =>
    w.jsx("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "white",
      children: w.jsx("path", {
        d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
        stroke: "white",
        strokeWidth: "2",
        strokeLinecap: "round",
        fill: "none",
      }),
    }),
  J3 = () => {
    const { shareSlug: e } = uk(),
      [n, i] = B.useState(null),
      [a, o] = B.useState(null);
    return (
      B.useEffect(() => {
        U3({ shareSlug: e })
          .then(i)
          .catch(() => o("Chat not found or link has been revoked."));
      }, [e]),
      a
        ? w.jsx("div", {
            className:
              "min-h-screen bg-[#080808] flex items-center justify-center px-4",
            children: w.jsxs("div", {
              className: "text-center",
              children: [
                w.jsx("div", {
                  className:
                    "w-10 h-10 rounded-xl bg-[#20b2aa] flex items-center justify-center mx-auto mb-4",
                  children: w.jsx(mh, {}),
                }),
                w.jsx("p", { className: "text-sm text-[#555]", children: a }),
                w.jsx(na, {
                  to: "/login",
                  className:
                    "mt-4 inline-block text-xs text-[#20b2aa] hover:text-[#2dd4bf]",
                  children: "Go to app",
                }),
              ],
            }),
          })
        : n
          ? w.jsx("div", {
              className: "min-h-screen bg-[#080808] text-white",
              children: w.jsxs("div", {
                className: "max-w-2xl mx-auto px-4 py-10",
                children: [
                  w.jsxs("div", {
                    className: "flex items-center gap-2.5 mb-8",
                    children: [
                      w.jsx("div", {
                        className:
                          "w-7 h-7 rounded-xl bg-[#20b2aa] flex items-center justify-center",
                        children: w.jsx(mh, {}),
                      }),
                      w.jsx("span", {
                        className: "text-sm font-semibold",
                        children: "Perplexity",
                      }),
                      w.jsx("span", {
                        className: "text-[#2a2a2a] text-sm",
                        children: "·",
                      }),
                      w.jsxs("span", {
                        className: "text-xs text-[#444]",
                        children: ["Shared by ", n.chat.owner],
                      }),
                    ],
                  }),
                  w.jsx("h1", {
                    className: "text-lg font-semibold text-white mb-1",
                    children: n.chat.title,
                  }),
                  w.jsx("p", {
                    className: "text-xs text-[#333] mb-8",
                    children: new Date(n.chat.createdAt).toLocaleDateString(),
                  }),
                  w.jsx("div", {
                    className: "space-y-5",
                    children: n.messages.map((u, c) =>
                      u.role === "user"
                        ? w.jsx(
                            "div",
                            {
                              className: "flex justify-end",
                              children: w.jsx("div", {
                                className:
                                  "max-w-[75%] px-4 py-3 rounded-2xl rounded-tr-sm text-sm text-white/90 bg-[#1a2a2a] border border-[#20b2aa]/15",
                                children: u.content,
                              }),
                            },
                            c,
                          )
                        : w.jsxs(
                            "div",
                            {
                              className: "flex gap-3",
                              children: [
                                w.jsx("div", {
                                  className:
                                    "w-6 h-6 rounded-lg bg-[#20b2aa] flex items-center justify-center flex-shrink-0 mt-0.5",
                                  children: w.jsx(mh, {}),
                                }),
                                w.jsx("div", {
                                  className:
                                    "flex-1 text-sm text-[#bbb] leading-7",
                                  children: w.jsx(qv, {
                                    remarkPlugins: [cS],
                                    children: u.content,
                                  }),
                                }),
                              ],
                            },
                            c,
                          ),
                    ),
                  }),
                  w.jsx("div", {
                    className: "mt-12 pt-6 border-t border-[#111] text-center",
                    children: w.jsx(na, {
                      to: "/",
                      className:
                        "text-xs text-[#20b2aa] hover:text-[#2dd4bf] transition-colors",
                      children: "Try Perplexity →",
                    }),
                  }),
                ],
              }),
            })
          : w.jsx("div", {
              className:
                "min-h-screen bg-[#080808] flex items-center justify-center",
              children: w.jsxs("svg", {
                className: "animate-spin text-[#20b2aa]",
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                children: [
                  w.jsx("path", {
                    d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                    opacity: "0.2",
                  }),
                  w.jsx("path", {
                    d: "M21 12a9 9 0 00-9-9",
                    strokeLinecap: "round",
                  }),
                ],
              }),
            })
    );
  },
  W3 = nC([
    { path: "/login", element: w.jsx(dR, {}) },
    { path: "/register", element: w.jsx(mR, {}) },
    { path: "/share/:shareSlug", element: w.jsx(J3, {}) },
    { path: "/", element: w.jsx($3, { children: w.jsx(Z3, {}) }) },
  ]),
  eM = () => w.jsx(Rk, { router: W3 });
V2.createRoot(document.getElementById("root")).render(
  w.jsxs(B.StrictMode, {
    children: [w.jsx(OC, { store: Qh, children: w.jsx(eM, {}) }), ","],
  }),
);
