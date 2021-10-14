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
          <q-tab name="listar" color="secondary" label="Listar Usuarios" />
          <q-tab name="crear" label="Crear Usuario" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="listar" style="padding: 0px !important">
            <div class="text-h6"></div>
            <listarUsuarios />
          </q-tab-panel>

          <q-tab-panel name="crear" style="padding: 0px !important">
            <crearUsuarios />

          </q-tab-panel>
        </q-tab-panels>
      </q-card>


    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import listarUsuarios from 'components/usuarios/listarUsuarios.vue'
import crearUsuarios from 'components/usuarios/crearUsuarios.vue'

export default defineComponent({
  name: 'Usuarios',
  components: {
    listarUsuarios,
    crearUsuarios
  },
  data(){
    return{
       tab: ref('listar')
    }
  }
})
</script>
<style>
  #q-gutter-y-md {
    background-color: #7e12f9;
  }
</style>