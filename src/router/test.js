const TestPage = () => import('@/views/test/test')

const RecorderJsPage = () => import('@/views/demo/recorderjs')

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
  }
]
