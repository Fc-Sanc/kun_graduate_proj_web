const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: '/register', component: () => import('pages/RegisterPage.vue')},
      {path: '/login', component: () => import('pages/LoginPage.vue')},
      {path: '/book_list', component: () => import('pages/BookListPage.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
