import { memo as memo$1, useState as useState$1, useMemo as useMemo$1, useCallback as useCallback$1, createElement as createElement$1, useRef as useRef$1, useEffect as useEffect$1 } from 'react';
import { v4 } from 'uuid';
import equal from 'fast-deep-equal';

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
        root: pre.root,
        tag: pre.tag,
    };
    var nextProps = {
        className: next.className,
        renderCount: next.renderCount,
        threshold: next.threshold,
        root: next.root,
        tag: next.tag,
    };
    hasChange = equal(preProps, nextProps);
    try {
        if (preChildren.length <= 100 && nextChildren.length <= 100) {
            var preKeys = preChildren.map(function (ele) { return ele.key; });
            var nextKeys = nextChildren.map(function (ele) { return ele.key; });
            hasChange = equal(preKeys, nextKeys);
        }
        else {
            var lengthChange = preChildren.length !== nextChildren.length;
            hasChange = lengthChange ? false : hasChange;
        }
    }
    catch (err) {
    }
    return hasChange;
};

loadPolyfills();
var useState = useState$1, useMemo = useMemo$1, useCallback = useCallback$1, memo = memo$1, createElement = createElement$1, useRef = useRef$1, useEffect = useEffect$1;
var LazyList = function (_a) {
    var _b = _a.children, children = _b === void 0 ? [] : _b, _c = _a.tag, tag = _c === void 0 ? 'div' : _c, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.renderCount, renderCount = _e === void 0 ? 1 : _e, _f = _a.threshold, threshold = _f === void 0 ? 0 : _f, _g = _a.root, root = _g === void 0 ? null : _g, _h = _a.warpTag, warpTag = _h === void 0 ? 'div' : _h, renderCallback = _a.renderCallback;
    var _j = useState(renderCount), renderIndex = _j[0], setRenderIndex = _j[1];
    var cloneChildrenRef = useRef([]);
    var renderListRef = useRef([]);
    var io = useRef();
    var item = useRef();
    var length = useRef(0);
    var maxRef = useRef(0);
    var cloneChildren = useMemo(function () {
        return children.map(function (item) {
            var key = item.key || v4();
            return createElement(warpTag, { 'data-key': key, key: key, className: 'lazylist_warp_tag' }, item);
        });
    }, [children, warpTag]);
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
            ele.target.setAttribute('data-observe', 'true');
            var key = ele.target.dataset.key;
            var index = cloneChildrenRef.current.findIndex(function (item) { return item.key === key; }) ||
                0;
            var t = (maxRef.current = Math.max(index, maxRef.current));
            io.current && io.current.unobserve && io.current.unobserve(ele.target);
            if (renderListRef.current.length === t + 1) {
                renderCallback && renderCallback(ele, cloneChildrenRef.current[t], t);
                ele.target.setAttribute('data-observe', 'false');
                setRenderIndex(function (pre) {
                    if (pre >= length.current)
                        return length.current;
                    return pre + renderCount;
                });
            }
        });
    }, [renderIndex, renderCallback]);
    useEffect(function () {
        io.current = new IntersectionObserver(observerCallback, {
            threshold: threshold,
            root: root
        });
        return function () {
            io.current && io.current.disconnect();
        };
    }, [threshold, root, renderList]);
    useEffect(function () {
        var container = item.current || {};
        Array.from(container.children).forEach(function (ele) {
            if (ele.dataset.observe === 'true') {
                return io.current && io.current.unobserve(ele);
            }
            io.current && io.current.observe(ele);
        });
    }, [renderList]);
    return createElement(tag, { className: className, ref: item }, renderList);
};
var index = memo(LazyList, useShouldUpdate);

export default index;
