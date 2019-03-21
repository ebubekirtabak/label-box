<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created () {
  },
  methods: {
  },
  data () {
    return {
      taglist: [],
    };
  },
  state: {
    taglist: [],
  },
};
</script>

<style lang="scss">
  @import "/assets/scss/main.scss";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
