<template>
  <q-page class="flex-fluid flex-center">
    <q-card class="q-ma-md q-pa-lg">
      <q-card-title class="text-h6">
          Cliente
      </q-card-title>
         <q-card-section>
           <div class="row">
              <div class="col-7 q-px-md">
           <q-input bottom-slots v-model="client" label="Cedula Cliente"  counterd>
       <template v-slot:before>
         <q-icon name="person" />
       </template>

       <template v-slot:append>
         <q-icon v-if="client !== ''" name="close" @click="client = ''" class="cursor-pointer" />
         <q-icon name="search" />
       </template>
     </q-input>
        </div>
        <div class="flex flex-center col  ">
           <q-btn color="primary" @click="loadClient()" class="full-width" label="Buscar" />

  </div>
  <div class="flex flex-center col ">
     <q-btn color="secondary" @click="clearClient()" class="full-width" label="Limpiar" />
</div>
   </div>
         </q-card-section>
         <q-card-section>
           <div class="row">
              <div class="col">
                <q-table
      title="Cliente seleccionado"
      :rows="cliente"
      :columns="columns"
      row-key="name"
    />
        </div>

   </div>
         </q-card-section>
       </q-card>
       <!-- Inician clientes -->
       <q-card class="q-ma-md q-pa-lg">
         <q-card-title class="text-h6">
           Productos
         </q-card-title>
         <q-card-section>
           <div class="row">
              <div class="col-12 q-px-md">
           <q-input bottom-slots v-model="product" label="Codigo producto"  counterd>
       <template v-slot:before>
         <q-icon name="inventory_2" />
       </template>

       <template v-slot:append>
         <q-icon v-if="product !== ''" name="close" @click="product = ''" class="cursor-pointer" />
         <q-icon name="search" />
       </template>
     </q-input>
        </div>
        <div class="flex flex-center col  ">
           <!-- <q-btn color="primary" @click="loadProduct()" class="full-width" label="Agregar" /> -->

  </div>
  <div class="flex flex-center col ">
     <!-- <q-btn color="secondary" @click="clearProduct()" class="full-width" label="Limpiar" /> -->
</div>
   </div>
         </q-card-section>
         <q-card-section>
           <!-- <q-card class="q-ma-md q-pa-lg" v-for="p in producto">
             <q-card-title class="text-h6">
             {{p.codigoProducto}}
             </q-card-title>
             <q-card-section>
               <q-separator/>
              <q-icon name="style" />Iva Producto: {{p.ivaCompra}} Nit Proveedor:{{p.nitProveedor}} NombreProducto:{{p.nombreProducto}} Precio Compra: {{p.precioCompra}} Precio Venta:{{p.precioVenta}}
             </q-card-section>
           </q-card> -->
           <div class="row">
             <div class="col-3 q-ma-md" v-for="p in producto">
           <q-card class="my-card "  >
     <q-img src="https://random.imagecdn.app/500/150" />

     <q-card-section>
       <q-btn
         fab
         color="primary"
         icon="attach_money"
         class="absolute"
         style="top: 0; right: 12px; transform: translateY(-50%);"
       />
        {{p.codigoProducto}} - {{p.nombreProducto}}
       <div class="row no-wrap items-center">
         <div class="col text-h6 ellipsis">
         </div>
         <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            Precio de venta: <q-icon name="euro" />
         {{p.precioVenta}}
         </div>
       </div>

       <!-- <q-rating v-model="stars" :max="5" size="32px" /> -->
     </q-card-section>

     <q-card-section class="q-pt-none">
       <div class="text-subtitle1">
        precio Compra  ${{p.precioCompra}}
       </div>
       <div class="text-caption text-grey">
         Nit Proveedor:{{p.nitProveedor}}
         <q-separator />
         Iva Producto: {{p.ivaCompra}}
       </div>
     </q-card-section>

     <q-separator />

     <q-card-actions>
       <q-btn flat round icon="credit_card" />
       <q-btn flat color="primary">
         Comprar
       </q-btn>
     </q-card-actions>
   </q-card>
    </div>
 </div>
         </q-card-section>
          </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'Ventas',
  components: {
  },
  data(){
    return{
      client:ref(''),
      cliente: ref([]),
      product: ref(''),
      producto:ref([]),
        productos:ref([])
    }
  },
  methods:{
    async loadClient(){
      await api.get("/consultarCliente?documento="+this.client)
      .then(response => (this.cliente = response.data
            ))
            .catch(e => {
              console.log(e);
            });
            if(this.cliente.length === 0){
              this.triggerPositive ("No se ha encontrado el cliente!", 'negative');
            }
    },
    clearClient(){
      this.client=""
      this.cliente=[]
    },
   loadProduct(){
     api.get("/listarProductos")
      .then(response => (this.producto = response.data
            ))
            .catch(e => {
              console.log(e);
            });

    },
    clearProduct(){
      this.product=""
      this.producto=[]
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
    this.loadProduct();
  }
})
</script>
