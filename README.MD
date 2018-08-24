## pull-refresh

[![npm version](https://badge.fury.io/js/scroll-end-refresh.svg)](https://badge.fury.io/js/scroll-end-refresh) [![npm downloads](https://img.shields.io/npm/dm/scroll-end-refresh.svg?style=flat-square)](https://www.npmjs.com/package/scroll-end-refresh)




## use


````javascript
  
  npm install scroll-end-refresh -save

````

````javascript

  import ScrollEndRefresh from 'scroll-end-refresh'

  var scrollRefresh = new ScrollEndRefresh(200, (resolve, reject)=>{
    // 如果还有写一页，那么异步接口完成后调用 resolve(true)
    // 如果没有下一页，那么异步接口完成以后调用 reject()
    setTimeout(()=>{
      resolve();
    }, 2000)
    
  });

  /**
   
   scrollRefresh.stop();//暂停监听
   scrollRefresh.start();//继续监听
   scrollRefresh.destroy();//销毁监听

  */

````


## 注意

* 如果你设置了body高度 height:100%, 那么请修改为 min-height:100%。否则可能导致无法正确获得body的高度导致失效

````

  body{
    height:100%;
  }

  修改为 ==>

  body{
    min-height:100%;
  }

````