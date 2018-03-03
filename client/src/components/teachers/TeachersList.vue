<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Nuevo Docente</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Nombres" v-model="editedItem.first_name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Apellidos" v-model="editedItem.last_name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Carnet Identidad" v-model="editedItem.identity_card"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Cargo" v-model="editedItem.degree"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id_teacher }}</td>
        <td class="text-xs-center">{{ props.item.first_name }}</td>
        <td class="text-xs-center">{{ props.item.last_name }}</td>
        <td class="text-xs-center">{{ props.item.identity_card }}</td>
        <td class="text-xs-center">{{ props.item.degree }}</td>
        <!-- <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td> -->
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'id',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Nombres', value: 'first_name' },
        { text: 'Apellidos', value: 'last_name' },
        { text: 'Cedula de Identidad', value: 'identity_card' },
        { text: 'Grado', value: 'degree' },
        // { text: 'Actions', value: 'id', sortable: true }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id_teacher: '',
        first_name: '',
        last_name: '',
        identity_card: '',
        degree: ''
      },
      defaultItem: {
        id_teacher: '',
        first_name: '',
        last_name: '',
        identity_card: '',
        degree: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Docente' : 'Editar Docente'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
      this.getTeachers()
    },

    methods: {
      getTeachers () {
        let uri = 'http://localhost:4001/teachers'
        axios.get(uri)
          .then(res => {
            console.log('Docentes obtenidos con exito')
            this.items = res.data
          })
          .catch(err => console.log(err))
      },
      initialize () {
        // this.items = ''
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        let uri = 'http://localhost:4001/teachers'
        axios.post(uri, this.editedItem)
          .then(res => {
            
            this.$router.replace({name: 'teachers'});
          })
          .catch(err => console.log(err));
        
        // if (this.editedIndex > -1) {
        //   Object.assign(this.items[this.editedIndex], this.editedItem)
        // } else {
        //   this.items.push(this.editedItem)
        // }
        this.getTeachers()
        this.close()
      }
    }
  }
</script>