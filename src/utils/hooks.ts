import { useRef, useState, useEffect } from "react";
import equal from "fast-deep-equal";

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
  return equal(pre, next);
};