<template>
  <q-page class="flex flex-center">
    <q-img alt="Fondo" src="../../assets/1234.jpg" style="width: 100%; height: 100%; margin: 0; opacity: 0.8 !important"/>

    <!-- tabla dinamica  -->
    <q-table
    style="position: absolute; top: 2%; width:95%; opacity: 0.9; border: solid 1px #ff846a !important"
       title="Listado de Productos"
       :rows="productos"
       :columns="columns"
       row-key="name"
        :filter="filter"
     >
     <template v-slot:body-cell-actions="props">
         <q-td :props="props">
           <q-btn dense round flat color="red" @click="displayDeleteDialog(props)" icon="delete"></q-btn>
           <q-btn dense round flat color="primary" @click="displayEditDialog(props)" icon="edit"></q-btn>
         </q-td>
       </template>
       <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

     </q-table>
     <!-- dialog de confirmación para eliminación -->
     <q-dialog v-model="confirm" persistent>
     <q-card>
       <q-card-section class="row items-center">
         <q-avatar icon="delete" color="primary" text-color="white" />
         <span class="q-ml-sm">¿Desea eliminar este producto? </span>
       </q-card-section>

       <q-card-actions align="right">
         <q-btn flat label="Cancel" color="primary" v-close-popup />
         <q-btn flat label="Eliminar cliente" @click="deleteRow()" color="primary" v-close-popup />
       </q-card-actions>
     </q-card>
   </q-dialog>
    <!-- fin dialog de confirmación para eliminación -->
    <!-- dialog de edición -->
   <q-dialog v-model="confirmEdit" persistent>
   <q-card>
     <q-card-section class="row items-center">
       <q-avatar icon="edit" color="primary" text-color="white" />
       <span class="q-ml-sm text-h6">Editar Producto </span>
     </q-card-section>
     <q-card-section class="row items-center">
       <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="myForm"
      >
       <div class="row">
              <div class="col q-px-sm">
                  <q-input v-model="codigoProducto" disable label="Codigo Producto" />
              </div>
              <div class="col q-px-sm">
                  <q-input v-model="nitProveedor" label="Nit Proveedor" />
              </div>
              <div class="col q-px-sm">
                  <q-input  v-model="ivaCompra" label="Iva Compra" />
              </div>
    </div>
    <div class="row">

              <div class="col q-px-sm">
                  <q-input v-model="nombreProducto" label="Nombre Producto" />
              </div>
              <div class="col q-px-sm">
                  <q-input v-model="precioCompra" label="Precio Compra" />
              </div>
              <div class="col q-px-sm">
                  <q-input v-model="precioVenta" label="Precio Venta" />
              </div>
    </div>
    <q-separator />
    </q-form>
     </q-card-section>
     <q-card-actions align="right">
       <q-btn flat label="Cancel" color="primary" v-close-popup />
       <q-btn flat label="Guardar Cambios" @click="onSubmit()" color="primary" v-close-popup />
     </q-card-actions>
   </q-card>
 </q-dialog>
 <!-- fin dialog de edición -->
     <q-separator/>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'listarClientes',
  data() {
   return {
     codigoProducto: "",
     nitProveedor: "",
     ivaCompra: "",
     nombreProducto: "",
     precioCompra: "",
     precioVenta: "",
     productos: [], // aqui se colocan los productos que usara la tabla dinamica
     eliminar: [],// se coloca el producto a eliminar
     confirm: ref(false),
       confirmEdit: ref(false),
       filter: '',// se usa para tener lo que el producto busca en el seach de la tabla
     columns: [
       {name: "codigoProducto", label: "Codigo Producto", field: "codigoProducto", sortable: true},
        {name: "nitProveedor", label: "Nit Proveedor", field: "nitProveedor"},
        {name: "ivaCompra", label: "Iva Compra", field: "ivaCompra"},
        {name: "nombreProducto", label: "Nombre Producto", field: "nombreProducto"},
        {name: "precioCompra", label: "Precio Compra", field: "precioCompra"},
          {name: "precioVenta", label: "Precio Venta", field: "precioVenta"},
            {name: 'actions', label: 'Acciones', field: '', align: 'center'},

     ]
   }
},
methods:{
  loadUsers(){ // trae los clientes de la api
    api.get("/listarProductos")
    .then(response => (this.productos = response.data
          ))
          .catch(e => {
            console.log(e);
          });
  },
  displayDeleteDialog(props){ // muestra o culpa el dialog tambien pasa información del objeto
    this.confirm = true
    this.eliminar = props
  },
  displayEditDialog(props){// muestra o culpa el dialog tambien pasa información del objeto
    this.confirmEdit = true
    this.confirm = props
    this.codigoProducto = this.confirm.row.codigoProducto  // a la propiedad cedulaUsuario que se creo en la data se le pasa la cedulaCliente que se guardo en el confirm al momento de darle al boton de editar de ese registro
    this.nitProveedor = this.confirm.row.nitProveedor
    this.ivaCompra = this.confirm.row.ivaCompra
    this.nombreProducto = this.confirm.row.nombreProducto
    this.precioCompra = this.confirm.row.precioCompra
    this.precioVenta = this.confirm.row.precioVenta
  },
  deleteRow() { // elimina cliente
    const index = this.productos.indexOf(this.eliminar.row);
      api.delete("/eliminarProductos?codigo=" + this.eliminar.row.codigoProducto)
          .then(response => {
              this.triggerPositive (response.data, 'primary') //llamada a notify para mostrar notificacion en caso de succes
          })
          .catch(e => {
            console.log(e);
            this.triggerPositive ("No fue posible completar la operación!", 'negative')
          });
      //this.loadUsers();
      this.productos.splice(index, 1);// borra cliente de la tabla ya que se elimino tambien del back pero la tabla no lo sabe
    },
    async  onSubmit(){ // evento que se usa desde el formulario de edicion
                await  api.post('/editarProducto?codigoProducto='+this.codigoProducto+'&ivaCompra='+this.ivaCompra+'&nitProveedor='+this.nitProveedor+'&nombreProducto='+this.nombreProducto+'&precioCompra='+this.precioCompra+'&precioVenta='+this.precioVenta).then(response => {
                      console.log(response)
                      this.triggerPositive (response.data, 'primary') //llamada a notify para mostrar notificacion en caso de succes
                  }).catch(e => {
                     console.log(e);
                       this.triggerPositive ("No fue posible completar la operación!", 'negative') //llamada a notify para mostrar notificacion en caso de error
                  });
                  this.loadUsers(); // se llama de nuevo la funcion que trae los usuarios para llenar la tabla asi se ve el cambio
            },
            triggerPositive (mensaje, color) {// funcion notify
       this.$q.notify({
          color: color,
          message: mensaje,
           position: 'bottom-right',
        })
      }
},
created(){// ejecuta codigo en una fase temprana de inicialización de la pagina
  this.loadUsers(); // llama el metodo que carga la tabla de información
}
})
</script>
