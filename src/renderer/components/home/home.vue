<template>
    <div>
        <NavBar></NavBar>
        <div class="main-area">
            <div class="main-area__layer">
                <div class="main-area__layer__list">
                    <div class="main-area__layer__list__item" v-for="(item, index) in this.selectedImage.tagList" :key='index'>
                        <div class="main-area__layer__list__item-title"> {{ item.label }}</div>
                        <div class="main-area__layer__list__item-text"> {{ item.class }} </div>
                        <div class="main-area__layer__list__item-detail">
                            <div class="main-area__layer__list__item-detail-item">
                                WIDTH: {{ item.width }}
                            </div>
                            <div class="main-area__layer__list__item-detail-item">
                                HEIGHT: {{ item.height }}
                            </div>
                            <div class="main-area__layer__list__item-detail-item">
                                X: {{ item.xmin}}
                            </div>
                            <div class="main-area__layer__list__item-detail-item">
                                Y: {{ item.ymin }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AreaComponent></AreaComponent>
            <div class="main-area__layer">
                <div class="main-area__layer__list">
                    <div class="main-area__layer__list__image-item"  v-for="(image, index) in imageList" :key='index' v-on:click="selectImage(image)">
                        <div class="main-area__layer__list__image-item--overlay overlay-item"></div>
                        <div class="main-area__layer__list__image-item--check " v-bind:class="{'check-item': image.tagList.length > 0}">
                            <img src="@/assets/img/verified.png">
                        </div>
                        <div class="main-area__layer__list__image-item__footer">
                            {{ image.name }}
                        </div>
                        <img :src="image.fileData" height="auto"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import NavBar from '../navbar/NavBar.vue';
  import AreaComponent from '../area/AreaComponent.vue';

  export default {
    name: 'HomeComponent',
    components: {
      NavBar,
      AreaComponent,
    },
    methods: {
      selectImage (image) {
        this.$store.commit('setSelectedImage', image);
      },
    },
    computed: {
      imageList () {
        return this.$store.getters.getImageList;
      },
      selectedImage () {
        return this.$store.getters.getSelectedImage;
      },
    },
    watch: {
      imageList (n, i) {
        console.log({ n, i });
      },
    },
    data () {
      return {
        tagList: this.$store.state.tagList,
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
