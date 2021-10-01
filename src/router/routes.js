
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/usuarios', component: () => import('pages/usuarios/usuarios.vue') },
      { path: '/clientes', component: () => import('pages/clientes/clientes.vue') },
      { path: '/proveedores', component: () => import('pages/proveedores/proveedores.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
