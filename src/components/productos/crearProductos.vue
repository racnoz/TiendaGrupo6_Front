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
                   <q-input v-model="ivaCompra"
                    :dense="dense"
                    :rules="[ val => val && val.length > 0 || 'Ingrese Iva Compra.']"
                    >
        <template v-slot:append>
          <q-avatar size="16px" square>
            <img src="../../assets/porcentaje.png" style="width:80px">
          </q-avatar>
        </template>
      </q-input>
           </div>

 </div>
 <div class="row">

           <div class="col q-px-sm">
               <q-input v-model="nombreProducto" label="Nombre Producto" :rules="[ val => val && val.length > 0 || 'Ingrese Nombre Producto.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input v-model="precioCompra" @change="calcularPrecioVenta" label="Precio Compra" :rules="[ val => val && val.length > 0 || 'Precio Compra.']"/>
           </div>
           <div class="col q-px-sm">
               <q-input v-model="precioVenta" readonly label="Precio Venta" />
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
        precioVenta: ''
   }
},
methods:{
onSubmit(n){
            api.post('/registrarProducto?codigoProducto='+this.codigoProducto+'&ivaCompra='+this.ivaCompra+'&nitProveedor='+this.nitProveedor+'&nombreProducto='+this.nombreProducto+'&precioCompra='+this.precioCompra+'&precioVenta='+this.precioVenta).then(response => {
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
computed:{
calcularPrecioVenta(){
    this.precioVenta = ((this.ivaCompra/100)+1)*this.precioCompra
  }
}

})
</script>
