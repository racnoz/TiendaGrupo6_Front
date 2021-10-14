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
          <q-tab name="listar" label="Listar Clientes" />
          <q-tab name="crear" label="Crear Cliente" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="listar" style="padding: 0px !important">
            <div class="text-h6"></div>
            <listarClientes />
          </q-tab-panel>

          <q-tab-panel name="crear" style="padding: 0px !important">
            <crearClientes />

          </q-tab-panel>
        </q-tab-panels>
      </q-card>


    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import listarClientes from 'components/clientes/listarClientes.vue'
import crearClientes from 'components/clientes/crearClientes.vue'

export default defineComponent({
  name: 'Clientes',
  components: {
    listarClientes,
    crearClientes
  },
  data(){
    return{
       tab: ref('listar')
    }
  }
})
</script>
