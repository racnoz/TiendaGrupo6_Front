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
               <q-input v-model="cedulaCliente" label="Cedula"
                :rules="[ val => val && val.length > 0 || 'Ingrese numero de cedula.']"
               />
           </div>
           <div class="col q-px-sm">
               <q-input  v-model="direccionCliente" label="Dirección"
                :rules="[ val => val && val.length > 0 || 'Ingrese Dirección.']"
               />
           </div>
 </div>
 <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="emailCliente" label="Correo"
                :rules="[ val => val && val.length > 0 || 'Ingrese Correo.']"
               />
           </div>
           <div class="col q-px-sm">
               <q-input v-model="nombreCliente" label="Nombre"
                :rules="[ val => val && val.length > 0 || 'Ingrese nombre.']"
               />
           </div>
           <div class="col q-px-sm">
               <q-input v-model="telefonoCliente" label="Telefono"
                :rules="[ val => val && val.length > 0 || 'Ingrese Telefono.']"
               />
           </div>
 </div>
 <q-separator />
        <div class="row q-mt-md q-mr-sm">
            <div class="col q-px-sm">
                <q-btn color="primary"  type="submit" label="Crear Cliente" />
            </div>
</div>
 </q-form>

  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'crearClientes',
  data() {
   return {
       cedulaCliente : "",
       direccionCliente : "",
       emailCliente : "",
       nombreCliente : "",
      telefonoCliente : ""
   }
},
methods:{
onSubmit(n){
            api.post('/registrarCliente?cedulaCliente='+this.cedulaCliente+'&direccionCliente='+this.direccionCliente+'&emailCliente='+this.emailCliente+'&nombreCliente='+this.nombreCliente+'&telefonoCliente='+this.telefonoCliente)
            .then(response => {
                  console.log(response)
                  this.triggerPositive (response.data, 'primary')
              }).catch(e => {
                 console.log(e);
                 this.triggerPositive ("No fue posible completar la operación!", 'negative')
              });
        },
triggerPositive (mensaje, color) {
  this.$q.notify({
    color: color,
    message: mensaje,
    position: 'bottom-right',
    })
  }
}

})
</script>
