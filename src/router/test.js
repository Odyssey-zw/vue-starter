const TestPage = () => import('@/views/test/test')

const RecorderJsPage = () => import('@/views/recorderjs/recorderjs')
const VueWaterfallEasyPage = () => import('@/views/vueWaterfallEasy/index')

export default [
  {
    path: '/test',
    name: 'testPage',
    component: TestPage
  },
  {
    path: '/recorderjs',
    name: 'RecorderJsPage',
    component: RecorderJsPage
  },
  {
    path: '/vueWaterfallEasy',
    name: 'VueWaterfallEasyPage',
    component: VueWaterfallEasyPage
  }
]
