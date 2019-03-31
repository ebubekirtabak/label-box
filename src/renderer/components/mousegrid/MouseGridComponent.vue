<template>
    <div class="mouse-grid" v-show="isShow">
        <div class="mouse-grid__vertical-line" v-bind:style="{ left: this.mouse.x + 'px' }"></div>
        <div class="mouse-grid__horizontal-line" v-bind:style="{ top: this.mouse.y + 'px' }"></div>
    </div>
</template>

<script>
  export default {
    name: 'MouseGridComponent',
    data () {
      return {
        isShow: false,
      };
    },
    methods: {

    },
    computed: {
      mouse () {
        return this.$store.getters.getMouse;
      },
    },
  };
</script>

<style lang="scss" scoped>
    .mouse-grid {
        position: absolute;
        width: 100%;
        height: 100%;
        &__vertical-line {
            position: absolute;
            width: 1px;
            background: #000000;
            height: 100%;
        }

        &__horizontal-line {
            position: absolute;
            height: 1px;
            background: #000000;
            width: 100%;
        }
    }
</style>
