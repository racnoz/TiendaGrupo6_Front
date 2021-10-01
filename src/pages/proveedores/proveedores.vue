<template>
  <q-page class="flex-fluid flex-center">
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="listar" label="Listar Proveedores" />
          <q-tab name="crear" label="Crear Proveedor" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="listar">
            <div class="text-h6"></div>
           <listarProveedores />
          </q-tab-panel>

          <q-tab-panel name="crear">
            <div class="text-h6">Proveedor Nuevo</div>
            <crearProveedores />

          </q-tab-panel>
        </q-tab-panels>
      </q-card>


    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import listarProveedores from 'components/proveedores/listarProveedores.vue'
import crearProveedores from 'components/proveedores/crearProveedores.vue'

export default defineComponent({
  name: 'Usuarios',
  components: {
    listarProveedores,
    crearProveedores
  },
  data(){
    return{
       tab: ref('listar')
    }
  }
})
</script>
