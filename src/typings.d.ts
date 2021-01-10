export interface CommonProps{
  className: string;
  tag?: string;
  renderCount?: number;
  threshold?: number;
  root?: null | HTMLElement;
}

export interface Props extends CommonProps{
  children: React.ReactNode[];
}

export interface ReactDom extends React.ReactElement{
  ref?:React.RefObject<any>
}

export interface IntersectionObserverEntryFace{
  time: number;
  rootBounds: ClientRect;
  boundingClientRect: ClientRect;
  intersectionRect: ClientRect;
  intersectionRatio: number;
  target: HTMLElement;
  isIntersecting: boolean;
}

export interface IntersectionObserverCase{
  disconnect: () => void;
  observe: (arg0: HTMLElement) => void;
  takeRecords: () => any[];
  unobserve: (arg0: HTMLElement) => void;
}
