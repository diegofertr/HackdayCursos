<template>
    <div>
        <v-container fluid>
            <v-layout row
                      wrap>
                <form>
                    <v-flex xs12
                            sm1>
                        <v-subheader v-text="'Materia'"></v-subheader>
                    </v-flex>
                    <v-flex xs12
                            sm3>
                        <v-select :items="subjects"
                                  v-model="subject"
                                  :filter="customFilterSubject"
                                  item-text="description"
                                  label="Selecciona una Materia"
                                  :error-messages="errors.collect('select')"
                                  v-validate="'required'"
                                  data-vv-name="select"
                                  required
                                  autocomplete></v-select>
                    </v-flex>
                    <v-flex xs12
                            sm1>
                        <v-subheader v-text="'Docente'"></v-subheader>
                    </v-flex>
                    <v-flex xs12
                            sm3>
                        <v-select :items="teachers"
                                  v-model="teachers"
                                  :filter="customFilterTeacher"
                                  item-text="first_name"
                                  label="Seleccione al Docente"
                                  autocomplete></v-select>
                    </v-flex>
                    <v-btn @click="submit">submit</v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </form>
            </v-layout>
        </v-container>

    </div>
</template>
<script>
    import axios from 'axios'
    export default {
      data() {
        return {
          subject: null,
          subjects: [],
          teacher: null,
          teachers: [],
          customFilterSubject(item, queryText, itemText) {
            const hasValue = val => (val != null ? val : "");
            const text = hasValue(item.description);
            const query = hasValue(queryText);
            return (
              text
                .toString()
                .toLowerCase()
                .indexOf(query.toString().toLowerCase()) > -1
            );
          },
          customFilterTeacher(item, queryText, itemText) {
            const hasValue = val => (val != null ? val : "");
            const text = hasValue(item.first_name);
            const query = hasValue(queryText);
            return (
              text
                .toString()
                .toLowerCase()
                .indexOf(query.toString().toLowerCase()) > -1
            );
          },

        };
      },
      created () {
        this.getSubjects()
        this.getTeachers()
      },
      methods: {
        getSubjects () {
            let uri = 'http://localhost:4001/subjects'
            axios.get(uri)
            .then(res => {
                console.log('Materias obtenidas con exito')
                this.subjects = res.data
            })
            .catch(err => console.log(err))
        },
        getTeachers () {
            let uri = 'http://localhost:4001/teachers'
            axios.get(uri)
            .then(res => {
                console.log('Docentes obtenidos con exito')
                this.teachers = res.data
            })
            .catch(err => console.log(err))
        },
      }
    };
</script>
