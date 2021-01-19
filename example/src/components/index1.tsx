import React, { useState } from 'react'
import LazyList from 'lazylist-react'
import './index1.css';

const Index1 = () => {
  const [data] = useState([1, 2, 3, 4, 5, 6, 7, 8])
  return (
    <>
    <h1>使用用例1</h1>
    <LazyList className='box-ul' tag='ul'>
      {data.map(item => {
        return (
          <li key={item}>{item}</li>
        )
      })}
      </LazyList>
    </>
  )
}
export default Index1;
