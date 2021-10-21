<template>
  <q-page class="flex flex-center">
  <q-img alt="Fondo" src="../assets/Index.jpg" style="width: 100%; height: 100%; margin: 0; opacity: 0.8 !important"/>
      <div class="text-h1" style="position: absolute; top: 1%; font-weight:bold; font-family: Arial; color: #0b3a31; font-size: 5em;">
        Bienvenido(a) a La Tienda
      </div>
      <div class="text-h5" style="position: absolute; top: 20%; font-weight:bold; font-family:'Helvetica','Verdana','Monaco',sans-serif; color: #0b3a31">
        Inicie sesión para comenzar
      </div>
      <q-form  class="q-gutter-md"
       @submit="onSubmit"
        style=" opacity: 0.9 !important; position: absolute; top: 25%">
      <q-card class="q-pa-lg shadow-24" square style="width: 400px;">
        <q-card-title class="text-h5">
        Login
      </q-card-title>
        <q-card-section>

               <q-input square filled  v-model="usuario" type="text" label="Usuario"
                 :rules="[ val => val && val.length > 0 || 'Ingrese Usuario.']"
                />
                <q-input square filled v-model="password" :type="isPwd ? 'password' : 'text'" label="Contraseña"
                   :rules="[ val => val && val.length > 0 || 'Ingrese Usuario.']"
                >
         <template v-slot:append>
           <q-icon
             :name="isPwd ? 'visibility_off' : 'visibility'"
             class="cursor-pointer"
             @click="isPwd = !isPwd"
           />
         </template>
       </q-input>

      </q-card-section>
      <q-card-actions class="q-px-md">
            <q-btn unelevated type="submit" color="primary" size="lg" class="full-width" label="Login" />
          </q-card-actions>
    </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'PageIndex',
  data(){
    return{
      usuario:ref(''),
      password:ref(''),
      isPwd: ref(true),
    }
  },
  methods:{
    onSubmit(){
                api.get('/comprobarUsuario?pass='+this.password+'&usuario='+this.usuario).then(response => {
                      console.log(response)
                      if(response.data !== -1){
                         this.$router.push({path: `/usuarios`})
                          this.$store.commit('autenticado');
                          this.$store.commit('updateCedulaUsuario', response.data)
                      }else{
                         this.triggerPositive ("Información de usuario incorrecta", 'negative')
                      }

                  }).catch(e => {
                     console.log(e);

                  });
            },
            triggerPositive (mensaje, color) { // funcion de notify
               this.$q.notify({
                  color: color,
                  message: mensaje,
                   position: 'bottom-right',
                })
              },

  },
})
</script>
