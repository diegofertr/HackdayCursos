<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn color="primary" dark slot="activator" class="mb-2">Nuevo materia</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="Sigla" v-model="editedItem.initials"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="descripcion" v-model="editedItem.description"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Guardar</v-btn>
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
            <td>{{ props.item.id_subject }}</td>
            <td class="text-xs-center">{{ props.item.initials }}</td>
            <td class="text-xs-center">{{ props.item.description }}</td>
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
            <v-btn color="primary" @click="getSubjects">Reset</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
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
        { text: 'Sigla', value: 'initials' },
        { text: 'Descripcion', value: 'description' },
        // { text: 'Actions', value: 'id', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        initials: '',
        description: '',
      },
      defaultItem: {
        id: '',
        initials: '',
        description: '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Materia' : 'Editar Materia'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.getSubjects()
    },

    methods: {
      getSubjects () {
        let uri = 'http://localhost:4001/subjects'
        axios.get(uri)
          .then(res => {
            console.log('Materias obtenidos con exito')
            this.items = res.data
          })
          .catch(err => console.log(err))
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
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>