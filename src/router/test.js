const TestPage = () => import('@/views/test/test')

export default [
  {
    path: '/test',
    name: 'testPage',
    component: TestPage
  }
]
