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
          <q-tab name="listar" label="Listar Usuarios" />
          <q-tab name="crear" label="Crear Usuario" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="listar">
            <div class="text-h6"></div>
            <listarUsuarios />
          </q-tab-panel>

          <q-tab-panel name="crear">
            <div class="text-h6">Usuario Nuevo</div>
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
