<template>
  <v-app>
    <v-navigation-drawer fixed temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{ item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Coursify</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer class="red darken-2">
        <v-spacer></v-spacer>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <div class="white--text ml-3">
              &copy; 2018 by Diego F. Ticona Ramos
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    data () {
      return {
        sideNav: false,
        menuItems : [
          {icon: 'event', title: 'Registrar Horario', link: '/register-classroom'},
          {icon: 'school', title: 'Docentes', link: '/teachers'},
          {icon: 'casino', title: 'Aulas', link: '/classrooms'},
          {icon: 'subject', title: 'Materias', link: '/subjects'},
          {icon: 'schedule', title: 'Horarios', link: '/schedules'},
        ]
      }
    }
  };
</script>
