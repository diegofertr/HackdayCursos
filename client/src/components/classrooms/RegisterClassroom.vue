<template>
    <div>
        <v-container fluid>
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
                        <v-select :items="teachers"
                                  v-model="teacher"
                                  :filter="customFilter"
                                  item-text="description"
                                  label="Seleccione al Docente"
                                  :error-messages="errors.collect('teacher')"
                                  v-validate="'required'"
                                  data-vv-name="teacher"
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

                <v-btn @click="submit">submit</v-btn>
            </form>
        </v-container>

    </div>
</template>
<script>
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
          teacher: null,
          teachers: [],
          dictionary: {
            custom: {
              subject: {
                required: "Debe Seleccionar una Materia"
              },
              teacher: {
                required: "Debe seleccionar un docente"
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
          }
        };
      },
      mounted() {
        this.$validator.localize("en", this.dictionary);
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
        submit() {
          this.$validator.validateAll();
          if (this.lunes) {
              console.log(this.lunesList);
            this.lunesList.forEach(element => {
              axios.post("http://localhost:4001/schedules", {
                start_time: "17:05:00",
                end_time: "18:00:00",
                days: "lunes",
                fid_classroom: 1,
                fid_subject: this.subject
              });
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

