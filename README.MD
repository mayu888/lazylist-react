# lazylist-react

[![NPM](https://img.shields.io/npm/v/lazylist-react.svg)](https://www.npmjs.com/package/lazylist-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Please understand before using
This is a lazy loading component based on intersectionObserver.The child elements under this component render one by default, and When the rendered subcomponent appears in the view, it continues to render the next one, and so on. Each child element is wrapped in a layer of `warpTag`, You can define its type.
`The version of react must be greater than or equal to 16.8. Because the component form is hooks.`

## Install
```bash
npm install --save lazylist-react
// or
yarn add lazylist-react

```
## Props
|  attribute   |  value  |   type   |   describe   |
|--------------|---------|----------|--------------|
| **className**|         |  string  | the classname of container|
|  **tag**     | `default`: div| string | the nodetype of  container|
|**renderCount**|`default`: 1 | number | Number of DOMS per rendering |
|**threshold** | `default`:0  | number | Rendered elements will continue to render at this scale in the viewport |
| **root**   | `default`:`window`|HTMLElement| View |
| **warpTag**   | `default`:div|HTMLElement| A label that wraps each child element |
| **renderCallback** |   | (containerInfo,containerVdom,index) => void | Callback function with standard rendering quantity|
| **equalityCheckLimit** | `default:100` | number | Limit for equality check of children keys |
## Usage

```tsx
import React from 'react'
import LazyList from 'lazylist-react'

const Example = () => {
  const data = [
  {
    title:'列表1',
    img:'http://xxxx',
    component:<Item title='列表1'/>
  },
  {
    title:'列表2',
    img:'http://xxxx',
    component:<Item title='列表2'/>
  },
  {
    title:'列表3',
    img:'http://xxxx',
    component:<Item title='列表3'/>
  },
]
  return(
    <LazyList>
      {
        data.map(info => {
          return(
            <div>
              <h3>{info.title}</h3>
              <img src={info.img}/>
              {info.component}
            </div>
          )
        })
      }
    </LazyList>
  )
}

```


## License

MIT © [mayu888](https://github.com/mayu888)
