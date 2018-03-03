<template>
     <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Nuevo Horario</v-btn>
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
        <td>{{ props.item.id_schedule }}</td>
        <td class="text-xs-center">{{ props.item.start_time }}</td>
        <td class="text-xs-center">{{ props.item.end_time }}</td>
        <td class="text-xs-center">{{ props.item.days }}</td>
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
        <v-btn color="primary" @click="getClassrooms">Reset</v-btn>
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
        { text: 'De', value: 'start_time' },
        { text: 'A', value: 'end_time' },
        { text: 'Dia', value: 'days'}
        // { text: 'Actions', value: 'id', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id_schedule: '',
        initials: '',
        description: '',
      },
      defaultItem: {
        id_schedule: '',
        initials: '',
        description: '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Horario' : 'Editar Horario'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.getSchedules()
    },

    methods: {
      getSchedules () {
        let uri = 'http://localhost:4001/schedules'
        axios.get(uri)
          .then(res => {
            console.log('Horarios obtenidas con exito')
            this.items = res.data
          })
          .catch(err => console.log(err))
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