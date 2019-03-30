<template>
    <div class="mouse-grid">
        <div class="mouse-grid__vertical-line"></div>
        <div class="mouse-grid__horizontal-line"></div>
    </div>
</template>

<script>
  export default {
    name: 'MouseGridComponent',
    data () {
      return {
      };
    },
    methods: {

    },
  };
</script>

<style lang="scss" scoped>
    .mouse-grid {
        position: absolute;
        width: 100%;
        height: 100%;
        &__vertical-line {

        }
    }
</style>
