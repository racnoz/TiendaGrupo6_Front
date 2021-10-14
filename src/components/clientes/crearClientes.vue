<template>
  <q-page class="flex-fluid flex-center">
  <q-img alt="Fondo" src="../../assets/1234.jpg" style="width: 100%; height: 100%; margin: 0; opacity: 0.8 !important"/>
    <q-form
     style="background-color: #ffffff !important; position: absolute !important; top: 4% !important; width:95% !important; opacity: 1 !important; border: solid 1px #ff846a !important; opacity: 0.9 !important; right: 3% !important"
     @submit="onSubmit"
     @reset="onReset"
     class="q-gutter-md"
     ref="myForm"
   >
    <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="cedulaCliente" label="Cedula" :rules="[ val => val && val.length > 0 || 'Ingrese número de cedula.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input  v-model="direccionCliente" label="Dirección" :rules="[ val => val && val.length > 0 || 'Ingrese dirección.']"/>
           </div>
 </div>
 <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="emailCliente" label="Correo" :rules="[ val => val && val.length > 0 || 'Ingrese correo.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input v-model="nombreCliente" label="Nombre" :rules="[ val => val && val.length > 0 || 'Ingrese nombre.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input v-model="telefonoCliente" label="Telefono" :rules="[ val => val && val.length > 0 || 'Ingrese teléfono.']"/>
           </div>
 </div>
 <q-separator />
        <div class="row q-mt-md q-mr-sm text-center" style="margin-top: 16px !important; margin-bottom: 16px !important">
            <div class="col q-px-sm">
                <q-btn color="secondary"  type="submit" label="Crear Cliente" />
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
            api.post('/registrarCliente?cedulaCliente='+this.cedulaCliente+'&direccionCliente='+this.direccionCliente+'&emailCliente='+this.emailCliente+'&nombreCliente='+this.nombreCliente+'&telefonoCliente='+this.telefonoCliente).then(response => {
                  console.log(response)
                  this.triggerPositive (response.data, 'primary')
              }).catch(e => {
                 console.log(e);
                 this.triggerPositive ("No fue posible completar la operación!", 'negative')
              });
              this.cedulaCliente = ' ';
              this.direccionCliente = ' ';
              this.emailCliente = ' ';
              this.nombreCliente = ' ';
              this.telefonoCliente = ' ';
        },
  triggerPositive (mensaje, color) {
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
