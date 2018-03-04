<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <div class="hello black--text">
          <h1>{{ msg }}</h1>
          <h2>Donde podrás gestionar los horarios de tus cursos</h2>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Coursify'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
