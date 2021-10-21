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
               <q-input v-model="codigoProducto" label="Codigo Producto" :rules="[ val => val && val.length > 0 || 'Ingrese Codigo Producto.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input  v-model="nitProveedor" label="Nit Proveedor" :rules="[ val => val && val.length > 0 || 'Ingrese el Nit Proveedor.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input v-model="ivaCompra" label="Iva Compra" :rules="[ val => val && val.length > 0 || 'Ingrese Iva Compra.']"/>
           </div>
 </div>
 <div class="row">

           <div class="col q-px-sm">
               <q-input v-model="nombreProducto" label="Nombre Producto" :rules="[ val => val && val.length > 0 || 'Ingrese Nombre Producto.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input v-model="precioCompra" label="Precio Compra" :rules="[ val => val && val.length > 0 || 'Precio Compra.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input v-model="precioVenta" label="Precio Venta" :rules="[ val => val && val.length > 0 || 'Precio Venta.']"/>
           </div>
 </div>
 <q-separator />
        <div class="row q-mt-md q-mr-sm text-center" style="margin-top: 16px !important; margin-bottom: 16px !important">
            <div class="col q-px-sm">
                <q-btn color="secondary"  type="submit" label="Crear Producto" />
            </div>
</div>
 </q-form>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'crearProductos',
  data() {
   return {
       codigoProducto : "",
       nitProveedor : "",
       ivaCompra : "",
       nombreProducto : "",
      precioCompra : "",
        precioVenta: ""
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
              this.codigoProducto = ' ';
              this.nitProveedor = ' ';
              this.ivaCompra = ' ';
              this.nombreProducto = ' ';
              this.precioCompra = ' ';
                  this.precioVenta = ' ';
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
