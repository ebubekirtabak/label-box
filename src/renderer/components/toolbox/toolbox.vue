<template>
    <div class="toolbox">

    </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'ToolBox',
    data () {
      return {
        selectedTool: {},
      };
    },
    methods: {
      ...mapActions([
        'setSelectedTool',
      ]),
    },
  };
</script>

<style lang="scss" scoped>
  .toolbox {
      max-width: 128px;
      max-height: 580px;
      &__list {
        width: 100%;
        padding: 10px 5px;
        &__item {

        }
      }
  }
</style>
