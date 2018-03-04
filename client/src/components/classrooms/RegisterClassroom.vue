<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-center">
            <form>
                <v-layout row
                          wrap>
                    <v-flex xs12
                            sm1>
                        <v-subheader v-text="'Materia'"></v-subheader>
                    </v-flex>
                    <v-flex xs12
                            sm3>
                        <v-select :items="subjects"
                                  v-model="subject"
                                  :filter="customFilter"
                                  item-text="description"
                                  label="Selecciona una Materia"
                                  :error-messages="errors.collect('subject')"
                                  v-validate="'required'"
                                  data-vv-name="subject"
                                  required
                                  autocomplete></v-select>
                    </v-flex>
                    <v-flex xs12
                            sm1>
                        <v-subheader v-text="'Docente'"></v-subheader>
                    </v-flex>
                    <v-flex xs12
                            sm3>
                        <v-select :items="classrooms"
                                  v-model="classroom"
                                  :filter="customFilterClassroom"
                                  item-text="description"
                                  label="Seleccione el Aula"
                                  :error-messages="errors.collect('classroom')"
                                  v-validate="'required'"
                                  data-vv-name="classroom"
                                  required
                                  autocomplete></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <el-checkbox v-model="lunes"
                                 label="lunes"
                                 border
                                 @change="getHours('lunes')"></el-checkbox>
                    <div v-if="lunes">
                        <div v-for="(lu, index) in lunesList"
                             :key="index">
                            <el-time-picker v-model="lu.start"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                            <el-time-picker arrow-control
                                            v-model="lu.end"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                        </div>
                        <button class="btn "
                                @click=addHour(lunesList)
                                type="button">+</button>
                    </div>
                </v-layout>
                <v-layout row>
                    <el-checkbox v-model="martes"
                                 label="martes"
                                 border
                                 @change="getHours('martes')"></el-checkbox>
                    <div v-if="martes">
                        <div v-for="(lu, index) in martesList"
                             :key="index">
                            <el-time-picker v-model="lu.start"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                            <el-time-picker arrow-control
                                            v-model="lu.end"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                        </div>
                        <button class="btn "
                                @click=addHour(martesList)
                                type="button">+</button>
                    </div>
                </v-layout>
                <v-layout row>
                    <el-checkbox v-model="miercoles"
                                 label="miercoles"
                                 border
                                 @change="getHours('miercoles')"></el-checkbox>
                    <div v-if="miercoles">
                        <div v-for="(lu, index) in miercolesList"
                             :key="index">
                            <el-time-picker v-model="lu.start"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                            <el-time-picker arrow-control
                                            v-model="lu.end"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                        </div>
                        <button class="btn "
                                @click=addHour(miercolesList)
                                type="button">+</button>
                    </div>
                </v-layout>
                <v-layout row>
                    <el-checkbox v-model="jueves"
                                 label="jueves"
                                 border
                                 @change="getHours('jueves')"></el-checkbox>
                    <div v-if="jueves">
                        <div v-for="(lu, index) in juevesList"
                             :key="index">
                            <el-time-picker v-model="lu.start"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                            <el-time-picker arrow-control
                                            v-model="lu.end"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                        </div>
                        <button class="btn "
                                @click=addHour(juevesList)
                                type="button">+</button>
                    </div>
                </v-layout>
                <v-layout row>
                    <el-checkbox v-model="viernes"
                                 label="viernes"
                                 border
                                 @change="getHours('viernes')"></el-checkbox>
                    <div v-if="viernes">
                        <div v-for="(lu, index) in viernesList"
                             :key="index">
                            <el-time-picker v-model="lu.start"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                            <el-time-picker arrow-control
                                            v-model="lu.end"
                                            :picker-options="getHours1()"
                                            placeholder="Arbitrary time">
                            </el-time-picker>
                        </div>
                        <button class="btn "
                                @click=addHour(viernesList)
                                type="button">+</button>
                    </div>
                </v-layout>
                <v-btn @click="submit">Guardar Horario(s)</v-btn>
            </form>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
    import moment from 'moment'
    import axios from "axios";
    export default {
      $_veeValidate: {
        validator: "new"
      },
      data() {
        return {
          lunes: false,
          lunesList: [],
          martes: false,
          martesList: [],
          miercoles: false,
          miercolesList: [],
          jueves: false,
          juevesList: [],
          viernes: false,
          viernesList: [],
          options: [],
          value2: "",
          value3: "",
          value4: "",
          value5: "",
          subject: null,
          subjects: [],
          classroom: null,
          classrooms: [],
          dictionary: {
            custom: {
              subject: {
                required: "Debe Seleccionar una Materia"
              },
              teacher: {
                required: "Debe seleccionar un Aula"
              }
            }
          },
          customFilter(item, queryText, itemText) {
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
          customFilterClassroom(item, queryText, itemText) {
            const hasValue = val => (val != null ? val : "");
            const text = hasValue(item.description);
            const query = hasValue(queryText);
            return (
              text
                .toString()
                .toLowerCase()
                .indexOf(query.toString().toLowerCase()) > -1
            );
          }
        };
      },
      mounted() {
        this.$validator.localize("en", this.dictionary);
      },
      created () {
        this.getSubjects()
        this.getClassrooms()
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
        getClassrooms () {
            let uri = 'http://localhost:4001/classrooms'
            axios.get(uri)
            .then(res => {
                console.log('Aulas obtenidas con éxito')
                this.classrooms = res.data
            })
            .catch(err => console.log(err))
        },
        submit() {
          this.$validator.validateAll();
          if (this.lunes) {
              console.log(this.lunesList);
            this.lunesList.forEach(element => {
              axios.post("http://localhost:4001/schedules", {
                start_time: moment(element.start).format('HH:mm:ss'),
                end_time: moment(element.end).format('HH:mm:ss'),
                days: "lunes",
                fid_classroom: this.classroom.id_classroom,
                fid_subject: this.subject.id_subject
              })
              .then(res => {
                console.log('Horarios añadidos con éxito')
              })
              .catch(err => console.log(`Error al añadir horarios: ${err}`));
              // console.log("=========================================================")
              // console.log(`Reserva de la materia ${this.subject.description} en el aula ${this.classroom.description}`)
              // console.log(`De ${moment(element.start).format('HH:mm')} a ${moment(element.end).format('HH:mm')}`)
              // console.log("=========================================================\n")
            });
          }
          if (this.martes) {
              console.log(this.martesList);
            this.martesList.forEach(element => {
              axios.post("http://localhost:4001/schedules", {
                start_time: moment(element.start).format('HH:mm:ss'),
                end_time: moment(element.end).format('HH:mm:ss'),
                days: "martes",
                fid_classroom: this.classroom.id_classroom,
                fid_subject: this.subject.id_subject
              })
              .then(res => {
                console.log('Horarios añadidos con éxito')
              })
              .catch(err => console.log(`Error al añadir horarios: ${err}`));
            });
          }
          if (this.miercoles) {
              console.log(this.miercolesList);
            this.miercolesList.forEach(element => {
              axios.post("http://localhost:4001/schedules", {
                start_time: moment(element.start).format('HH:mm:ss'),
                end_time: moment(element.end).format('HH:mm:ss'),
                days: "miercoles",
                fid_classroom: this.classroom.id_classroom,
                fid_subject: this.subject.id_subject
              })
              .then(res => {
                console.log('Horarios añadidos con éxito')
              })
              .catch(err => console.log(`Error al añadir horarios: ${err}`));
            });
          }
          if (this.jueves) {
              console.log(this.juevesList);
            this.juevesList.forEach(element => {
              axios.post("http://localhost:4001/schedules", {
                start_time: moment(element.start).format('HH:mm:ss'),
                end_time: moment(element.end).format('HH:mm:ss'),
                days: "jueves",
                fid_classroom: this.classroom.id_classroom,
                fid_subject: this.subject.id_subject
              })
              .then(res => {
                console.log('Horarios añadidos con éxito')
              })
              .catch(err => console.log(`Error al añadir horarios: ${err}`));
            });
          }
          if (this.viernes) {
              console.log(this.viernesList);
            this.viernesList.forEach(element => {
              axios.post("http://localhost:4001/schedules", {
                start_time: moment(element.start).format('HH:mm:ss'),
                end_time: moment(element.end).format('HH:mm:ss'),
                days: "viernes",
                fid_classroom: this.classroom.id_classroom,
                fid_subject: this.subject.id_subject
              })
              .then(res => {
                console.log('Horarios añadidos con éxito')
              })
              .catch(err => console.log(`Error al añadir horarios: ${err}`));
            });
          }

        },
        getHours1() {
          return this.options;
        },
        addHour(list) {
          list.push({ start: null, end: null });
        },
        getHours(day) {
          var availables = [];
          axios.get("http://localhost:4001/schedules/" + day).then(response => {
            var hours = response.data;
            if (hours.length >= 1) {
              var h = "00:00:00 - " + hours[0].start_time;
              availables.push(h);
              var end = hours[0].end_time;
              for (var i = 1; i < hours.length; i++) {
                if (hours[i].start_time == end) {
                  end = hours[i].end_time;
                } else {
                  availables.push(`${end} - ${hours[i].start_time}`);
                  end = hours[i].end_time;
                }
              }
            }
            console.log(availables);
          });
          this.options = {
            selectableRange: availables
          };
        }
      }
    };
</script>

