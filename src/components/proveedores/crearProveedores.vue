<template>
  <q-page class="flex flex-center">
  <q-img alt="Fondo" src="../../assets/1234.jpg" style="width: 100%; height: 100%; margin: 0; opacity: 0.8 !important"/>
    <q-form
     style="background-color: #ffffff; position: absolute; top: 4%; width:95%; opacity: 1; border: solid 1px #ff846a !important; opacity: 0.9 !important"
     @submit="onSubmit"
     @reset="onReset"
     class="q-gutter-md"
     ref="myForm"
   >
    <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="nitProveedor" label="Nit" :rules="[ val => val && val.length > 0 || 'Ingrese número del nit.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input  v-model="nombreProveedor" label="Nombre" :rules="[ val => val && val.length > 0 || 'Ingrese el nombre.']"/>
           </div>
 </div>
 <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="ciudadProveedor" label="Ciudad" :rules="[ val => val && val.length > 0 || 'Ingrese la ciudad.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input v-model="direccionProveedor" label="Dirección" :rules="[ val => val && val.length > 0 || 'Ingrese la dirección.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input v-model="telefonoProveedor" label="Telefono" :rules="[ val => val && val.length > 0 || 'Ingrese el teléfono.']"/>
           </div>
 </div>
 <q-separator />
        <div class="row q-mt-md q-mr-sm text-center" style="margin-top: 16px !important; margin-bottom: 16px !important">
            <div class="col q-px-sm">
                <q-btn color="secondary"  type="submit" label="Crear Proveedor" />
            </div>
</div>
 </q-form>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'crearProveedores',
  data() {
   return {
       nitProveedor : "",
       nombreProveedor : "",
       ciudadProveedor : "",
       direccionProveedor : "",
      telefonoProveedor : ""
   }
},
methods:{
onSubmit(n){
            api.post('/registrarProveedor?nitProveedor='+this.nitProveedor+'&nombreProveedor='+this.nombreProveedor+'&ciudadProveedor='+this.ciudadProveedor+'&direccionProveedor='+this.direccionProveedor+'&telefonoProveedor='+this.telefonoProveedor).then(response => {
                  console.log(response)
                  this.triggerPositive (response.data, 'primary')
              }).catch(e => {
                 console.log(e);
                 this.triggerPositive ("No fue posible completar la operación!", 'negative')
              });
              this.nitProveedor = ' ';
              this.nombreProveedor = ' ';
              this.ciudadProveedor = ' ';
              this.direccionProveedor = ' ';
              this.telefonoProveedor = ' ';
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
