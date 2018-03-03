<template>
  <div id="app">
     <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title href="/">Cursos</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat href="#/">Inicio</v-btn>
      <v-btn flat href="#/register-classroom">REGISTRAR HORARIO</v-btn>
      <v-btn flat href="#/teachers">Docentes</v-btn>
      <v-btn flat href="#/classrooms">Aulas</v-btn>
      <v-btn flat href="#/subjects">Materias</v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <v-app>
      <v-content>
        <v-container>
          <transition name="fade">
            <router-view/>
          </transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>