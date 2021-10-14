<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-y-md" style="position: absolute; top: 0%; width: 100%">
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
          <q-tab name="listar" label="Listar Proveedores" />
          <q-tab name="crear" label="Crear Proveedor" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="listar" style="padding: 0px !important">
            <div class="text-h6"></div>
           <listarProveedores />
          </q-tab-panel>

          <q-tab-panel name="crear" style="padding: 0px !important">
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
