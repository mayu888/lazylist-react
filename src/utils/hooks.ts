import { useRef, useState, useEffect } from "react";
import equal from "fast-deep-equal";
import { CommonProps, ReactDom } from '../typings';

export const useDeepEffect = (callback:() => (()=>any )| void, deps:any[]) => {
  if (typeof callback !== "function") {
    throw Error("callback must be a function");
  }
  if (!Array.isArray(deps)) {
    throw Error("the dependence must be an Array！");
  }
  const depsRef = useRef<any[]>(deps);
  const [hasChange, setHasChange] = useState<boolean>(false);

  useEffect(() => {
    if (!equal(depsRef.current, deps)) {
      setHasChange(!hasChange);
      depsRef.current = deps;
    }
  }, [deps]);

  useEffect(() => {
    const returnValue = callback();
    return returnValue;
  }, [hasChange]);
};

export const useShouldUpdate = (pre:any, next:any) => {
  let hasChange:boolean = false;
  const preChildren:ReactDom[] = pre.children;
  const nextChildren:ReactDom[] = next.children;
  const preProps:CommonProps = {
    className:pre.className,
    renderCount:pre.renderCount,
    threshold:pre.threshold,
    root:pre.root
  }
  const nextProps:CommonProps = {
    className:next.className,
    renderCount:next.renderCount,
    threshold:next.threshold,
    root:next.root
  }
  hasChange = equal(preProps,nextProps);
  if(preChildren.length<=100 && nextChildren.length<=100){
    hasChange = equal(preChildren,nextChildren);
  }
  return hasChange;
};