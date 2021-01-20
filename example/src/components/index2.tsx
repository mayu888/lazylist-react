import React,{ useState } from 'react';
import LazyList from 'lazylist-react';
import './index1.css';

const Index2 = () => {
  const [data, setData] = useState(Array(30).fill(Math.random()));
  

  const callback = async (item:any,target:React.ReactNode,index:number) => {
    console.log(item, target,index);
    if (index === data.length - 1) {
      const data = Array(30).fill(Math.random());
      setData(pre => ([...pre, ...data]));
    }
  }

  return (
    <>
      <h1>使用用例2</h1>
      <LazyList className='box-warp' renderCount={10} renderCallback={callback}>
        {
          data.map((_,index) => {
            return (
              <div className='item'>
                <h3>我是第{index}个</h3>
                </div>
            )
          })
        }
      </LazyList>
    </>
  )
};
export default Index2;