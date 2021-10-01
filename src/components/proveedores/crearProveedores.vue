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
               <q-input v-model="nitProveedor" label="Nit" />
           </div>
           <div class="col q-px-sm">
               <q-input  v-model="nombreProveedor" label="Nombre" />
           </div>
 </div>
 <div class="row">
           <div class="col q-px-sm">
               <q-input v-model="ciudadProveedor" label="Ciudad" />
           </div>
           <div class="col q-px-sm">
               <q-input v-model="direccionProveedor" label="Dirección" />
           </div>
           <div class="col q-px-sm">
               <q-input v-model="telefonoProveedor" label="Telefono" />
           </div>
 </div>
 <q-separator />
        <div class="row q-mt-md q-mr-sm">
            <div class="col q-px-sm">
                <q-btn color="primary"  type="submit" label="Crear Proveedor" />
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
              }).catch(e => {
                 console.log(e);
              });
        },
}

})
</script>
