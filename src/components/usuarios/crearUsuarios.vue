<template>
  <q-page class="flex-fluid flex-center">
    <!-- formulario de creación de usuarios -->
    <q-form
     @submit="onSubmit"
     @reset="onReset"
     class="q-gutter-md"
     ref="myForm"
   >
    <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="cedulaUsuario" label="Cedula"
                 :rules="[ val => val && val.length > 0 || 'Ingrese numero de cedula.']"
               />
           </div>
           <div class="col q-px-sm">
               <q-input  v-model="emailUsuario" label="Correo"
                  :rules="[ val => val && val.length > 0 || 'Ingrese correo.']"
                />
           </div>
 </div>
 <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="nombreUsuario" label="Nombre"
                 :rules="[ val => val && val.length > 0 || 'Ingrese nombre.']"
               />
           </div>
           <div class="col q-px-sm">
               <q-input type="password" v-model="password" label="Contraseña"
                 :rules="[ val => val && val.length > 0 || 'Ingrese  contraseña.']"
                />
           </div>
           <div class="col q-px-sm">
               <q-input v-model="usuario" label="Usuario"
                  :rules="[ val => val && val.length > 0 || 'Ingrese  usuario.']"
                />
           </div>
 </div>
 <q-separator />
        <div class="row q-mt-md q-mr-sm">
            <div class="col q-px-sm">
                <q-btn color="primary"  type="submit" label="Crear Usuario" />
            </div>
</div>
 </q-form>
 <!-- fin formulario de creacion -->
  </q-page>
</template>

<script>
import { api } from 'boot/axios' //llamada a axios
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'crearUsuarios',
  data() { // datos reactivos

   return {
       cedulaUsuario : "",  // propiedades reactivas
       emailUsuario : "",
       nombreUsuario : "",
       password : "",
       usuario : ""

   }
},
methods:{
onSubmit(n){ // funcion llamada por el formulario de creacion de usuarios
            api.post('/registrarUsuario?cedulaUsuario='+this.cedulaUsuario+'&emailUsuario='+this.emailUsuario+'&nombreUsuario='+this.nombreUsuario+'&password='+this.password+'&usuario='+this.usuario).then(response => {
                  console.log(response)
                  this.triggerPositive (response.data, 'primary') // llamada a la funcion que maneja las notificaciones por medio de notify
              }).catch(e => {
                 console.log(e);
                   this.triggerPositive ("No fue posible completar la operación!", 'negative')// llamada a la funcion que maneja las notificaciones por medio de notify
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
created(){
}

})
</script>
