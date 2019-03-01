<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      taglist: [ /* {label: "label", class: "className", xmin: 0, ymin: 0, xmax: 100, ymax: 100, mode: 'create'} */ ]
    }
  },
  state: {
    taglist: [ /* {label: "label", class: "className", xmin: 0, ymin: 0, xmax: 100, ymax: 100, mode: 'create'} */ ]
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
