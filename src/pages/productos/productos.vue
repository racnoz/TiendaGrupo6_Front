<template>
  <q-page class="flex-fluid flex-center">
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="secondary"
          indicator-color="secondary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="listar" color="primary" label="Listar Productos" />
          <q-tab name="crear" label="Crear Productos" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="listar" style="padding: 0px !important">
            <div class="text-h6"></div>
              <listarProductos />
          </q-tab-panel>

          <q-tab-panel name="crear">
            <div class="text-h6">Productos Nuevo</div>

aqui va el formulario de productos
          </q-tab-panel>
        </q-tab-panels>
      </q-card>


    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
 import listarProductos from 'components/productos/listarproductos.vue'
// import crearUsuarios from 'components/usuarios/crearUsuarios.vue'

export default defineComponent({
  name: 'Productos',
  components: {
     listarProductos,
    // crearUsuarios
  },
  data(){
    return{
       tab: ref('listar')
    }
  }
})
</script>
