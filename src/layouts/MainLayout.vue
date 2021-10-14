<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="opacity: 0.8">
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
        <q-item-label header class="text-center" style="color: #366382 
        !important; font-size: 16px !important; letter-spacing: 1px !important"
        >
          Menú
        </q-item-label>
        <EssentialLink
                 v-for="link in essentialLinks"
                 :key="link.title"
                 v-bind="link"
               />

      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'


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

];

import { defineComponent, ref } from 'vue'

export default defineComponent({
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
