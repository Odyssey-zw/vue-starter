// 注册一些公共组件
import HelloWorld from './HelloWorld'

const install = Vue => {
  Vue.component('hello-world', HelloWorld)
}

export default install
