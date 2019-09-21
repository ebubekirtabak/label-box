<template>

</template>
<div class="dialog-container" v-show="isShow">
  <div id="tag_dialog" class="tag-dialog" >
    <div class="tag-dialog__body">
      <div class="tag-dialog__body__form-content">
        <label>Object Name</label>
        <input ref="tag_name" id="imput_tag_name" type="text" v-model="selectedTag.label"  autofocus v-on:keyup.13="dismissDialog()"/>
      </div>
      <div class="tag-dialog__body__form-content">
        <label>Class Name</label>
        <input id="imput_class_name" type="text"  v-model="selectedTag.class"  v-on:keyup.13="dismissDialog()"/>
      </div>
    </div>
    <div class="tag-dialog__footer">
      <a class="tag-dialog__footer-btn left flex-item" v-on:click="dismissDialog()">
        <i class="fas fa-check"></i> ok
      </a>
      <a class="tag-dialog__footer-btn right flex-item">
        <i class="fas fa-times"></i> remove
      </a>
    </div>
  </div>
</div>

<script>
  export default {
    name: 'TagDialogComponent',
    data () {
      return {
        isShow: false,
      };
    },
    methods: {

    },
    computed: {

    },
  };
</script>

<style lang="scss" scoped>

</style>
