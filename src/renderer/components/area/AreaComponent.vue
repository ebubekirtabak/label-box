<template>
    <div class="main-area__image" @mousemove="onmouseMove($event)" >
        <div class="main-area__image__content" ref="area_content" v-on:click="onMouseClick($event)">
            <img @load="loadedImage" v-show="isLoad" ref="main_image" :src="'file://' + selectedImage.fullPath"/>
        </div>
        <div class="image-tag" v-on:click="onTagClick()"  v-on:dblclick="openEditMode(item)" data-id="item.id" v-for="item in selectedImage.tagList"
             v-bind:style="{ width: item.width + 'px', height: item.height + 'px', left: item.xmin + 'px', top: item.ymin + 'px' }" v-bind:key="item.id">
            <div class="image-tag__header">
                <p> {{ item.label }} </p>
            </div>
            <div class="image-tag__body" @mousedown="onMouseDown($event, item)" @mouseup="onMouseUp($event)" @mouseleave="onMouseLeave($event, item)" @mouseover="onmouseOver($event, item)">
                <!-- tag dots -->
                <div class="image-tag__body-dot tr"></div>
                <div class="image-tag__body-dot tl"></div>
                <div class="image-tag__body-dot br"></div>
                <div class="image-tag__body-dot bl"></div>
                <!-- tag dots -->
            </div>
            <!-- tag borders -->
            <div class="image-tag__body--border top" @mousedown="onMouseOverBorder($event, item, 't')" @mouseup="onLeaveMouseBorder($event)"></div>
            <div class="image-tag__body--border top-left" @mousedown="onMouseOverBorder($event, item, 'tl')" @mouseup="onLeaveMouseBorder($event)"></div>
            <div class="image-tag__body--border top-right" @mousedown="onMouseOverBorder($event, item, 'tr')" @mouseup="onLeaveMouseBorder($event)"></div>
            <div class="image-tag__body--border right" @mousedown="onMouseOverBorder($event, item, 'r')" @mouseup="onLeaveMouseBorder($event)"></div>
            <div class="image-tag__body--border bottom" @mousedown="onMouseOverBorder($event, item, 'b')" @mouseup="onLeaveMouseBorder($event)"></div>
            <div class="image-tag__body--border bottom-left" @mousedown="onMouseOverBorder($event, item, 'bl')" @mouseup="onLeaveMouseBorder($event)"></div>
            <div class="image-tag__body--border bottom-right" @mousedown="onMouseOverBorder($event, item, 'br')" @mouseup="onLeaveMouseBorder($event)"></div>
            <div class="image-tag__body--border left" @mousedown="onMouseOverBorder($event, item, 'l')" @mouseup="onLeaveMouseBorder($event)"></div>
            <!-- tag borders -->
        </div>
        <!-- image tag dialog -->
        <div class="dialog-container" v-show="selectedTag && selectedTag.mode === 'edit'">
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
        <!-- image tag dialog -->
        <div class="main-area__image__info">
            <span>Mode: {{ selectedTag.mode }}</span>
            <span>Direction: {{ mouse.direction }}</span>
            <span>Y: {{ mouse.y }}</span>
            <span>X: {{ mouse.x }}</span>
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'AreaComponent',
    components: {
    },
    methods: {
      ...mapActions([
        'pushTagToSelectedImage',
        'updateSelectedTag',
      ]),
      onMount () {

      },
      dismissDialog () {
        this.selectedTag = { label: '' };
        this.isSelectedTag = false;
      },
      loadedImage () {
        const { width, height, naturalWidth, naturalHeight } = this.$refs.main_image;
        this.imgResolutions = Object.assign(this.imgResolutions, { width, height, naturalWidth, naturalHeight });
        this.imgResolutions.widthRate = naturalWidth / width;
        this.imgResolutions.heightRate = naturalHeight / height;
      },
      openEditMode (tag) {
        setTimeout(() => {
          this.isSelectedTag = true;
          this.selectedTag = tag;
          this.selectedTag.mode = 'edit';
          this.$refs.tag_name.focus();
          console.log('Mode edit');
        }, 100);
      },
      onTagClick () {
        if (this.selectedTag.mode !== 'edit' && this.selectedTag.mode !== 'create') {
          console.log(`Mode none: ${ this.selectedTag.mode }`);
          this.selectedTag.mode = 'none';
          this.isSelectedTag = false;
          this.selectedTag = { label: '' };
        } else if (this.selectedTag.mode === 'create') {
          this.selectedTag.mode = 'edit';
          this.openEditMode(this.selectedTag);
        }
      },
      onMouseDown (event, element) {
        if (element) {
          this.isMouseDown = true;
          if (element.mode !== 'create' && element.mode !== 'edit') {
            this.selectedTag = element;
            this.selectedTag.mode = 'over';
          }
        }
      },
      onMouseOverBorder (event, item, border) {
        if (this.selectedTag.mode !== 'edit' && this.selectedTag.mode !== 'create') {
          this.selectedTag = item;
          this.selectedTag.mode = 'resize';
          this.isSelectedTag = true;
          this.selectedBorder = border;
        }
      },
      onLeaveMouseBorder (event) {
        event.preventDefault();
        if (this.selectedTag.mode === 'resize') {
          setTimeout(() => {
            this.selectedTag = 'none';
            this.isSelectedTag = false;
            this.selectedTag = { label: '' };
          }, 500);
        }
      },
      onMouseUp (event) {
        event.preventDefault();
        this.isMouseDown = false;
      },
      onmouseOver (evet, element) {
        console.log('mouseOver +++++');
        if (element.mode !== 'create' && this.selectedTag.mode !== 'edit') {
          this.selectedTag = element;
          this.selectedTag.mode = 'over';
        }
      },
      onMouseLeave (evetn, element) {
        console.log('mouseLeave ------');
        if (element.mode !== 'create' && this.selectedTag.mode !== 'edit') {
          this.selectedTag.mode = 'none';
          this.selectedTag = { label: '' };
        }
      },
      onMouseClick (event) {
        if (!this.isSelectedTag) {
          this.isSelectedTag = true;
          const {
            offsetTop,
            offsetLeft,
            scrollTop,
            scrollLeft,
          } = this.$refs.area_content.offsetParent;
          this.imageContent.offsetTop = offsetTop;
          this.imageContent.offsetLeft = offsetLeft;
          this.imageContent.scrollTop = scrollTop;
          this.imageContent.scrollLeft = scrollLeft;
          this.mouse.y = (event.clientY + scrollTop);
          this.mouse.x = (event.clientX + offsetLeft + scrollLeft);
          this.mouse.startY = (event.clientY - offsetTop) + scrollTop;
          this.mouse.startX = (event.clientX - offsetLeft) + scrollLeft;
          const newTag = {
            id: (this.selectedImage.tagList.length + 1),
            label: '',
            class: '',
            xmin: this.mouse.startX,
            ymin: this.mouse.startY,
            width: 1,
            height: 1,
            mode: 'create',
          };
          this.pushTagToSelectedImage(newTag);
          this.updateSelectedTag(this.selectedImage.tagList[this.selectedImage.tagList.length - 1]);
        } else {
          console.log('---- draw finish -----');
          this.selectedTag.mode = 'edit';
          this.openEditMode();
          /* this.isSelectedTag = false
              this.selectedTag = {} */
        }
      },
      onmouseMove (event) {
        this.setMousePosition(event);
        if (this.isSelectedTag && this.selectedTag.mode === 'create') {
          const elWidth = Math.abs((this.mouse.x + this.imageContent.scrollLeft) - this.mouse.startX);
          let elHeight = Math.abs((this.mouse.y - this.mouse.startY) - this.imageContent.scrollTop);
          if ((this.mouse.y + this.imageContent.scrollTop) > this.mouse.startY) {
            // mouse down v
            console.log('mouse down v');
            this.mouse.direction = 'v';
            elHeight = Math.abs((this.mouse.startY - this.mouse.y) - this.imageContent.scrollTop);
            /* var elY1 = ((this.mouse.y + this.imageContent.scrollTop) - this.mouse.startY < 0) ?
              ((this.mouse.y + this.imageContent.scrollTop) - this.imageContent.offsetTop) :
              (this.mouse.startY)
            */
          } else {
            // mouse up ^
            console.log('mouse up ^');
            this.mouse.direction = '^';
            elHeight = Math.abs((this.mouse.y + this.imageContent.scrollTop) - this.mouse.startY);
            if ((this.mouse.y + this.imageContent.scrollTop) - this.mouse.startY < 0) {
              this.selectedTag.ymin = ((this.mouse.y + this.imageContent.scrollTop));
            } else {
              this.selectedTag.ymin = ((this.mouse.y + this.imageContent.scrollTop));
            }
          }

          console.log(`startX:${ this.mouse.startY } - ${ this.mouse.y }`);
          console.log(` ${ this.mouse.y + this.imageContent.scrollTop + this.imageContent.offsetTop } - ${ this.mouse.startY }`);
          let elX1 = 0;
          if (((this.mouse.x) + this.imageContent.scrollLeft) - this.mouse.startX < 0) {
            elX1 = ((this.mouse.x) + this.imageContent.scrollLeft);
          } else {
            elX1 = this.mouse.startX;
          }

          this.updateSelectedTag({ width: elWidth, height: elHeight, xmin: elX1 });
        } else if (this.selectedTag && this.selectedTag.mode === 'over') {
          console.log('over mode --');
          if (this.mouse.oldX > 0 && this.isMouseDown) {
            this.selectedTag.xmin += (this.mouse.x - this.mouse.oldX);
          }

          if (this.mouse.oldY > 0 && this.isMouseDown) {
            this.selectedTag.ymin += (this.mouse.y - this.mouse.oldY);
          }

          this.mouse.oldX = this.mouse.x;
          this.mouse.oldY = this.mouse.y;
        } else if (this.selectedTag && this.selectedTag.mode === 'resize') {
          let move = 0;
          switch (this.selectedBorder) {
            case 'tl':
              move = (this.mouse.x - this.selectedTag.xmin);
              if (this.mouse.x > this.selectedTag.xmin) {
                move = this.mouse.x - this.selectedTag.xmin;
                this.mouse.direction = '>';
                this.selectedTag.width -= move;
                this.selectedTag.xmin += move;
              } else {
                move = this.selectedTag.xmin - this.mouse.x;
                this.mouse.direction = '<';
                this.selectedTag.width += move;
                this.selectedTag.xmin -= move;
              }

              if ((this.selectedTag.ymin) < this.mouse.y) {
                this.mouse.direction = 'v';
                move = (this.mouse.y - this.selectedTag.ymin);
                console.log(`Movevvvv: ${ move }`);
                this.selectedTag.height -= move;
                this.selectedTag.ymin += move;
              } else {
                move = (this.selectedTag.ymin - this.mouse.y);
                this.mouse.direction = '^';
                console.log(`Move ^^: ${ move }`);
                this.selectedTag.height += move;
                this.selectedTag.ymin -= move;
              }

              break;
            case 'tr':
              move = (this.mouse.x - this.selectedTag.xmin);
              if ((this.selectedTag.xmin + this.selectedTag.width) < this.mouse.x) {
                move = this.mouse.x - (this.selectedTag.xmin + this.selectedTag.width);
                this.mouse.direction = '>';
                this.selectedTag.width += move;
              } else {
                move = (this.selectedTag.xmin + this.selectedTag.width) - this.mouse.x;
                this.mouse.direction = '<';
                this.selectedTag.width -= move;
              }

              if (this.selectedTag.ymin < this.mouse.y) {
                this.mouse.direction = 'v';
                move = (this.mouse.y - this.selectedTag.ymin);
                console.log(`Movevvvv: ${ move }`);
                this.selectedTag.height -= move;
                this.selectedTag.ymin += move;
              } else {
                move = (this.selectedTag.ymin - this.mouse.y);
                this.mouse.direction = '^';
                console.log(`Move ^^: ${ move }`);
                this.selectedTag.height += move;
                this.selectedTag.ymin -= move;
              }

              break;
            case 'br':
            case 'bl': // bottom left action
              this.onBottomResize(this.selectedBorder);
              break;
            case 't':
              console.log(this.mouse.y - (this.selectedTag.height + this.selectedTag.ymin));
              console.log(`resize mode v^: ${ this.mouse.y }  ymin: ${ this.selectedTag.ymin }`);
              move = (this.mouse.y - this.selectedTag.ymin);
              if (this.selectedTag.ymin < this.mouse.y) {
                this.mouse.direction = 'v';
                this.selectedTag.height -= move;
                this.selectedTag.ymin += move;
              } else {
                move = (this.selectedTag.ymin - this.mouse.y);
                this.mouse.direction = '^';
                this.selectedTag.height += move;
                console.log(`move v: ${ move }--- ymin: ${ this.selectedTag.ymin }`);
                this.selectedTag.ymin -= move;
              }

              break;
            case 'b':
              console.log((this.mouse.y - (this.selectedTag.height + this.selectedTag.ymin)));
              console.log(`resize mode v^: ${ this.mouse.y - this.selectedTag.ymin }`);
              move = (this.mouse.y - this.selectedTag.ymin - this.selectedTag.height);
              console.log(`move v: ${ move }`);
              if (this.selectedTag.ymin < this.mouse.y) {
                this.mouse.direction = 'v';
                this.selectedTag.height += move;
                // this.selectedTag.ymin += move
              } else {
                this.mouse.direction = '^';
                this.selectedTag.height -= move;
                this.selectedTag.ymin += move;
              }

              break;
            case 'l':
              console.log((this.mouse.x - (this.selectedTag.width + this.selectedTag.xmin)));
              console.log(`resize mode<: ${ this.mouse.x - this.selectedTag.xmin }`);
              move = (this.mouse.x - this.selectedTag.xmin);
              if (this.selectedTag.xmin < this.mouse.x) {
                this.mouse.direction = '>';
                this.selectedTag.width -= move;
                this.selectedTag.xmin += move;
              } else {
                this.mouse.direction = '<';
                this.selectedTag.width -= move;
                this.selectedTag.xmin += move;
              }

              break;
            case 'r':
              console.log((this.mouse.x - (this.selectedTag.width + this.selectedTag.xmin)));
              console.log(`resize mode: ${ this.selectedTag.width } - ${ this.selectedTag.xmin } X: ${ this.mouse.x }`);
              this.selectedTag.width +=
                (this.mouse.x - (this.selectedTag.width + this.selectedTag.xmin));
              break;
            default:
          }

          this.mouse.oldX = this.mouse.x;
          this.mouse.oldY = this.mouse.y;
        }

        this.imageContent.offsetTop = this.$refs.area_content.offsetParent.offsetTop;
        this.imageContent.offsetLeft = this.$refs.area_content.offsetParent.offsetLeft;
        /* console.log('onmouseMove:' + event.clientX + ' - ' + event.clientY)
          console.log('real position:' + (event.clientY - this.imageContent.offsetTop)
          + ' - ' + (event.clientX - this.imageContent.offsetLeft))
        */
      },
      onBottomResize (selectedBorder) {
        let move = 0;
        const { width, xmin } = this.selectedTag;
        switch (selectedBorder) {
          case 'br': // bottom right action
            move = (this.mouse.x - xmin);

            if ((xmin + this.selectedTag.width) < this.mouse.x) {
              move = this.mouse.x - (xmin + width);
              this.mouse.direction = '>';
              this.selectedTag.width += move;
            } else {
              move = (xmin + width) - this.mouse.x;
              this.mouse.direction = '<';
              this.selectedTag.width -= move;
            }

            break;
          case 'bl': // bottom left action
            move = (this.mouse.x - xmin);

            if (xmin < this.mouse.x) {
              console.log('<v');
              this.mouse.direction = '>';
              this.selectedTag.width -= move;
              this.selectedTag.xmin += move;
            } else {
              this.mouse.direction = '<';
              this.selectedTag.width -= move;
              this.selectedTag.xmin += move;
            }

            break;
          default:
            break;
        }

        if ((this.selectedTag.ymin + this.selectedTag.height) < this.mouse.y) {
          this.mouse.direction = 'v';
          move = (this.mouse.y - (this.selectedTag.ymin + this.selectedTag.height));
          this.selectedTag.height += move;
        } else {
          move = (this.mouse.y - (this.selectedTag.ymin + this.selectedTag.height));
          this.mouse.direction = '^';
          this.selectedTag.height += move;
        }
      },
      setMousePosition (e) {
        const ev = e || window.event; // Moz || IE
        const { offsetLeft, offsetTop } = this.imageContent;
        if (ev.pageX) { // Moz
          this.mouse.x = (ev.pageX + window.pageXOffset) - offsetLeft;
          this.mouse.y = (ev.pageY + window.pageYOffset) - offsetTop;
        } else if (ev.clientX) { // IE
          this.mouse.x = (ev.clientX + document.body.scrollLeft) - offsetLeft;
          this.mouse.y = (ev.clientY + document.body.scrollTop) - offsetTop;
        }
      },
    },
    computed: {
      imageList () {
        return this.$store.getters.getImageList;
      },
      selectedImage () {
        return this.$store.getters.getSelectedImage;
      },
      selectedTag () {
        return this.$store.getters.getSelectedTag;
      },
    },
    watch: {
      selectedImage (n, i) {
        console.log({ n, i });
        console.log(`selectedImage update: ${ this.selectedImage.fileData }`);
        this.isLoad = true;
        const $this = this;
        setTimeout(() => {
          const { naturalWidth, naturalHeight, width, height } = $this.$refs.main_image;
          $this.imgResolutions = Object.assign($this.imgResolutions, { naturalWidth, naturalHeight, width, height });
          $this.imgResolutions.widthRate = naturalWidth / width;
          $this.imgResolutions.heightRate = naturalHeight / height;
          $this.selectedImage.imgResolutions = this.imgResolutions;
          $this.selectedImage.tagList.forEach((item) => {
            if (!item.isSetResolution) {
              item.isSetResolution = true;
              let difference = (width - naturalWidth);
              console.log(` > ${ $this.imgResolutions.width - $this.imgResolutions.naturalWidth } < `);
              $this.perCent.width = (difference / naturalWidth) * 100; // difference
              difference = (height - naturalHeight);
              $this.perCent.height = (difference / naturalHeight) * 100; // difference
              console.log(`width: ${ $this.imgResolutions.width } : naturalWidth :
               ${ $this.imgResolutions.naturalWidth } : difference : ${ $this.perCent.width }`);
              console.log(`height: ${ $this.imgResolutions.height } : naturalHeight:
               ${ $this.imgResolutions.naturalHeight } : difference : ${ $this.perCent.height }`);
              if ($this.imgResolutions.width > $this.imgResolutions.naturalWidth) {
                console.log(`Width: + ${ (item.width / 100) * $this.perCent.width }`);
                item.width = parseInt(item.width + ((item.width / 100) * $this.perCent.width), 10);
                item.xmin = parseInt(item.xmin + ((item.xmin / 100) * $this.perCent.width), 10);
              } else {
                item.width = parseInt(item.width + ((item.width / 100) * $this.perCent.width), 10);
                item.xmin = parseInt(item.xmin + ((item.xmin / 100) * $this.perCent.width), 10);
              }

              if ($this.imgResolutions.height > $this.imgResolutions.naturalHeight) {
                item.ymin = parseInt(item.ymin + ((item.ymin / 100) * $this.perCent.height), 10);
                item.height = parseInt(item.height + ((item.height / 100) * $this.perCent.height), 10);
              } else {
                item.ymin = parseInt(item.ymin + ((item.ymin / 100) * $this.perCent.height), 10);
                item.height = parseInt(item.height + ((item.height / 100) * $this.perCent.height), 10);
              }
            }
          });
        }, 250);
      },
      imageList (n, i) {
        console.log({ n, i });
      },
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        isLoad: false,
        isSelectedTag: false,
        isMouseDown: false,
        selectedBorder: '',
        imgResolutions: {
          naturalWidth: 0,
          naturalHeight: 0,
          width: 0,
          height: 0,
          widthRate: 1,
          heightRate: 1,
        },
        mouse: {
          x: 0,
          y: 0,
          oldX: 0,
          oldY: 0,
          startX: 0, // startX ve startY mouse a ilk tıklanan kordinatlardır.
          startY: 0,
          direction: '+',
        },
        imageContent: {
          offsetTop: 0,
          offsetLeft: 0,
        },
        perCent: { width: 100, height: 100 },
        tagList: this.$store.state.tagList,
      };
    },
  };
</script>

<style scoped>

</style>
