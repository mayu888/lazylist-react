import React from 'react';
import LazyList from 'lazylist-react'
import './index1.css';

const Index2 = () => {
  const data = Array(900).fill(Math.random());
  return (
    <>
      <h1>使用用例2</h1>
      <LazyList className='box-warp' renderCount={7}>
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