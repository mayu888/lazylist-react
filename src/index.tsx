import * as React from 'react';
import { v4 as uuidV4 } from "uuid";
import { loadPolyfills } from "./utils/polyfill";
import { useShouldUpdate } from './utils/hooks';
import { Props, ReactDom, IntersectionObserverEntryFace, IntersectionObserverCase } from './typings';
loadPolyfills();
const { useState, useMemo, useCallback, memo, createElement, useRef, useEffect } = React;

const LazyList : React.FC = ({
  children = [],
  tag = 'div',
  className = '',
  renderCount = 1,
  threshold = 0,
  root = null,
  warpTag = 'div',
}: Props) => {
  const [renderIndex, setRenderIndex] = useState<number>(renderCount);
  const cloneChildrenRef= useRef<ReactDom[]>([]);
  const renderListRef = useRef<React.ReactNode[]>([]);
  const io = useRef<IntersectionObserverCase>();
  const item = useRef<any>();
  const length = useRef<number>(0);
  const maxRef = useRef<number>(0);


  const cloneChildren: ReactDom[] = useMemo(() => {
    return children.map((item: ReactDom) => {
      const uuid: string = uuidV4();
      return createElement(warpTag,{ "data-key": uuid, key:uuid },item)
    })
  }, [children,warpTag]);

  cloneChildrenRef.current = cloneChildren;
  length.current = cloneChildren.length;

  const renderList:React.ReactNode[] = useMemo(() => {
    return cloneChildren.slice(0, renderIndex);
  }, [renderIndex, cloneChildren]);

  renderListRef.current = renderList;

  const observerCallback = useCallback(
    (entries:any[]):void => {
      entries.forEach((ele:IntersectionObserverEntryFace) => {
        const isIntersecting = ele.isIntersecting;
        if (!isIntersecting) return;
        ele.target.setAttribute("data-observe", "true");
        const key: string | undefined = ele.target.dataset.key;
        const index: number = cloneChildrenRef.current.findIndex(
          (item) => item.key === key
        ) || 0;
        const t = (maxRef.current = Math.max(index, maxRef.current));
        io.current && io.current.unobserve && io.current.unobserve(ele.target);
        if (renderListRef.current.length === t + 1) {
        ele.target.setAttribute("data-observe", 'false');
          setRenderIndex((pre) => {
            if (pre >= length.current) return length.current;
            return pre + renderCount;
          });
        }
      });
    },
    [renderIndex]
  );

  useEffect(() => {
    const container = item.current || {};
    Array.from(container.children).forEach((ele:HTMLElement):void => {
      if (ele.dataset.observe === 'true') {
        return io.current && io.current.unobserve(ele);
      }
      io.current && io.current.observe(ele);
    });
  }, [renderList]);

  useEffect(() => {
    io.current = new IntersectionObserver(observerCallback, {
      threshold,
      root,
    });
  }, [threshold,root]);

  return (
    createElement(tag,{ className:className,ref:item },renderList)
  )
}
export default memo(LazyList,useShouldUpdate);