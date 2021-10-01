<template>
  <q-page class="flex-fluid flex-center">
    <q-form
     @submit="onSubmit"
     @reset="onReset"
     class="q-gutter-md"
     ref="myForm"
   >
    <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="cedulaUsuario" label="Cedula" />
           </div>
           <div class="col q-px-sm">
               <q-input  v-model="emailUsuario" label="Correo" />
           </div>
 </div>
 <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="nombreUsuario" label="Nombre" />
           </div>
           <div class="col q-px-sm">
               <q-input type="password" v-model="password" label="Contraseña" />
           </div>
           <div class="col q-px-sm">
               <q-input v-model="usuario" label="Usuario" />
           </div>
 </div>
 <q-separator />
        <div class="row q-mt-md q-mr-sm">
            <div class="col q-px-sm">
                <q-btn color="primary"  type="submit" label="Crear Usuario" />
            </div>
</div>
 </q-form>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'crearUsuarios',
  data() {
   return {
       cedulaUsuario : "",
       emailUsuario : "",
       nombreUsuario : "",
       password : "",
       usuario : ""
   }
},
methods:{
onSubmit(n){
            api.post('/registrarUsuario?cedulaUsuario='+this.cedulaUsuario+'&emailUsuario='+this.emailUsuario+'&nombreUsuario='+this.nombreUsuario+'&password='+this.password+'&usuario='+this.usuario).then(response => {
                  console.log(response)
              }).catch(e => {
                 console.log(e);
              });
        },

}

})
</script>
