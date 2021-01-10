import { memo as memo$1, createElement as createElement$1, useState as useState$1, useMemo as useMemo$1, useCallback as useCallback$1, useRef as useRef$1, useEffect as useEffect$1 } from 'react';
import { v4 } from 'uuid';
import equal from 'fast-deep-equal';

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var loadPolyfills = function () {
    if (typeof window.IntersectionObserver === 'undefined') {
        require('intersection-observer');
    }
};

var useShouldUpdate = function (pre, next) {
    var hasChange = false;
    var preChildren = pre.children;
    var nextChildren = next.children;
    var preProps = {
        className: pre.className,
        renderCount: pre.renderCount,
        threshold: pre.threshold,
        root: pre.root
    };
    var nextProps = {
        className: next.className,
        renderCount: next.renderCount,
        threshold: next.threshold,
        root: next.root
    };
    hasChange = equal(preProps, nextProps);
    if (preChildren.length <= 100 && nextChildren.length <= 100) {
        hasChange = equal(preChildren, nextChildren);
    }
    return hasChange;
};

loadPolyfills();
var useState = useState$1, useMemo = useMemo$1, useCallback = useCallback$1, memo = memo$1, createElement = createElement$1, useRef = useRef$1, useEffect = useEffect$1;
var LazyList = function (_a) {
    var _b = _a.children, children = _b === void 0 ? [] : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.renderCount, renderCount = _d === void 0 ? 1 : _d, _e = _a.threshold, threshold = _e === void 0 ? 0 : _e, _f = _a.root, root = _f === void 0 ? null : _f;
    var _g = useState(renderCount), renderIndex = _g[0], setRenderIndex = _g[1];
    var cloneChildrenRef = useRef([]);
    var renderListRef = useRef([]);
    var io = useRef();
    var item = useRef();
    var length = useRef(0);
    var maxRef = useRef(0);
    var cloneChildren = useMemo(function () {
        return children.map(function (item) {
            var type = item.type, props = item.props, ref = item.ref, key = item.key;
            var uuid = v4();
            var ele = createElement(type, __assign(__assign({}, props), { key: key || uuid, ref: ref, "data-key": key || uuid }));
            return ele;
        });
    }, [children]);
    cloneChildrenRef.current = cloneChildren;
    length.current = cloneChildren.length;
    var renderList = useMemo(function () {
        return cloneChildren.slice(0, renderIndex);
    }, [renderIndex, cloneChildren]);
    renderListRef.current = renderList;
    var observerCallback = useCallback(function (entries) {
        entries.forEach(function (ele) {
            var isIntersecting = ele.isIntersecting;
            if (!isIntersecting)
                return;
            ele.target.setAttribute("data-observe", "true");
            var key = ele.target.dataset.key;
            var index = cloneChildrenRef.current.findIndex(function (item) { return item.key === key; }) || 0;
            var t = (maxRef.current = Math.max(index, maxRef.current));
            io.current && io.current.unobserve && io.current.unobserve(ele.target);
            if (renderListRef.current.length === t + 1) {
                ele.target.setAttribute("data-observe", 'false');
                setRenderIndex(function (pre) {
                    if (pre >= length.current)
                        return length.current;
                    return pre + renderCount;
                });
            }
        });
    }, [renderIndex]);
    useEffect(function () {
        var container = item.current || {};
        Array.from(container.children).forEach(function (ele) {
            if (ele.dataset.observe === 'true') {
                return io.current && io.current.unobserve(ele);
            }
            io.current && io.current.observe(ele);
        });
    }, [renderList]);
    useEffect(function () {
        io.current = new IntersectionObserver(observerCallback, {
            threshold: threshold,
            root: root,
        });
    }, []);
    return (createElement$1("div", { className: className, ref: item }, renderList));
};
var index = memo(LazyList, useShouldUpdate);

export default index;
