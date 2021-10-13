<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Tienda Grupo 6
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>
        <EssentialLink
                 v-for="link in essentialLinks"
                 :key="link.title"
                 v-bind="link"
               />

      </q-list>
    </q-drawer>
    <q-page-container>
      <!-- vistas que seran dinamicas -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

// rutas que se visualizaran en el menu
const linksList = [
  {
    title: 'Usuarios',
    caption: 'Usuarios',
    icon: 'person',
    link: '/usuarios'
  },
  {
    title: 'Clientes',
    caption: 'Clientes',
    icon: 'people',
    link: '/clientes'
  },
  {
    title: 'Proveedores',
    caption: 'Proveedores',
    icon: 'local_shipping',
    link: '/proveedores'
  },
  {
    title: 'Productos',
    caption: 'Productos',
    icon: 'inventory_2',
    link: '/productos'
  },
  {
    title: 'Ventas',
    caption: 'ventas',
    icon: 'shopping_cart',
    link: '/ventas'
  },

];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  //nombre del componente
  name: 'MainLayout',

  components: {
    EssentialLink,

  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

})
</script>
