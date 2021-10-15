<template>
  <q-page class="flex-fluid flex-center">
    <div class="q-gutter-y-md">
      <q-card>
            <!-- botones que dan función al tab -->
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="cargarArchivo" color="primary" label="Cargar Archivo" />

        </q-tabs>

        <q-separator />
        <!-- contenido que se muestra en el tab, se define que se muestra basandose en los name de los q-tab-panel pasandose a los v-model de los
        q-tab-panels y q-tabs  -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel   name="cargarArchivo">
            <div class="text-h6">Cargar Archivo CSV de productos</div>
              <cargarProductos class="flex" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>


    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
 import cargarProductos from 'components/productos/cargarProductos.vue'
 //import crearUsuarios from 'components/usuarios/crearUsuarios.vue'

export default defineComponent({
  name: 'Productos',
  components: {
     cargarProductos
  },
  data(){
    return{
       tab: ref('cargarArchivo')//se inicializa en este caso en el name del q-tab-panel que se quiere mostrar al cargar la pagina
    }
  },
  mounted() {
   if (this.$store.state.usuario === false) {
       this.$router.push({ path: `/` });
           }
 }
})
</script>
