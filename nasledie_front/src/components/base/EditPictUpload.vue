<template>
  <div class="" @click="sendPost">
    <input
        type="file"
        multiple
        @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
        accept="image/*" class="input-file"
    >
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "EditPictUpload",
  data() {
    return {
      buttonEdit: 'image',
      textOver: '',
      textUnder: '',
      timeout: null,
      photo: [],
      photoMore: [],
      objId: [],
      modal: false
    }
  },
  props: {
    sectionId: {
      type: Number
    },
    id: {
      type: Number
    },
    type: {
      type: String,
      required: false,
    },
    content: {
      type: Array,
      required: false,
    }
  },
  computed: {
    ...mapGetters({
      getTypeSection: 'getTypeSection',
      returnModalActive: 'returnModalActive'
    }),
  },
  methods: {
    sendPost() {
      this.$emit('sendPost')
    },
    closeModal() {
      this.modal = false
      this.$store.dispatch('getModalActive', this.modal)
    },
    filesChange(fieldName, fileList) {
      this.$store.dispatch('getFileList', fileList)
      let _this = this
      let file = fileList[0]
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (_this.sectionId === 0) {
          _this.$store.dispatch('getMainSectionMainPhoto', {
            result: {
              original: reader.result,
              url: '',
              idwp: ''
            },
            textOver: _this.textOver,
            textUnder: _this.textUnder
          })
          if (_this.photo.length > 0) {
            _this.photo.push({
              result: reader.result,
            })
          }
          _this.$store.dispatch('getMergeMainArray')
          _this.$emit('getPhotoEdit', _this.photo)
        } else {
          if (_this.getTypeSection.type === 'vertical-photo') {
            if (_this.content && _this.content.length > 0) {
              _this.photoMore = _this.content

              _this.photoMore.push({
                result: {
                  original: reader.result,
                  url: '',
                  idwp: ''
                },
                textOver: _this.textOver,
                textUnder: _this.textUnder,
                id: _this.sectionId,
                idx: _this.id
              })
              if(_this.edit) {
                _this.$store.dispatch('getPhotoArr', _this.photoMore.slice(-1))
                _this.$store.dispatch('getMergedArrays')
              } else {
                _this.$store.dispatch('getPhotoArr', _this.photoMore)
                _this.$store.dispatch('getMergedArrays')
              }
            } else {
              _this.photoMore.push({
                result: {
                  original: reader.result,
                  url: '',
                  idwp: ''
                },
                textOver: _this.textOver,
                textUnder: _this.textUnder,
                id: _this.sectionId,
                idx: _this.id
              })
              _this.$store.dispatch('getPhotoArr', _this.photoMore.slice(-1))
              _this.$store.dispatch('getMergedArrays')
            }

            _this.photo.push({
              result: {
                original: reader.result,
                url: '',
                idwp: ''
              },
              id: _this.sectionId,
              idx: _this.id
            })
          } else if (_this.getTypeSection.type === 'horizontal-photo') {
            if (_this.content && _this.content.length > 0) {
              _this.photoMore = _this.content
              _this.photoMore.push({
                result: {
                  original: reader.result,
                  url: '',
                  idwp: ''
                },
                textOver: _this.textOver,
                textUnder: _this.textUnder,
                id: _this.sectionId,
                idx: _this.id
              })
              if(_this.edit) {
                _this.$store.dispatch('getPhotoArr', _this.photoMore.slice(-1))
                _this.$store.dispatch('getMergedArrays')
              } else {
                _this.$store.dispatch('getPhotoArr', _this.photoMore)
                _this.$store.dispatch('getMergedArrays')
              }
            } else {
              _this.photoMore.push({
                result: {
                  original: reader.result,
                  url: '',
                  idwp: ''
                },
                textOver: _this.textOver,
                textUnder: _this.textUnder,
                id: _this.sectionId,
                idx: _this.id
              })
              _this.$store.dispatch('getPhotoArr', _this.photoMore.slice(-1))
              _this.$store.dispatch('getMergedArrays')
            }
            _this.photo.push({
              result: {
                original: reader.result,
                url: '',
                idwp: ''
              },
              id: _this.sectionId,
              idx: _this.id
            })
          } else {
            _this.$store.dispatch('getPhoto', {
              result: {
                original: reader.result,
                url: '',
                idwp: ''
              },
              textOver: _this.textOver,
              textUnder: _this.textUnder,
              id: _this.sectionId
            })
            _this.$store.dispatch('getMergedArrays')
            _this.photo.push({
              result: reader.result,
              id: _this.sectionId
            })
          }
        }
      }
      if (!this.objId.length) {
        this.objId.push({id: this.sectionId})
      }

      if (this.type) {
        this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.type})
      } else {
        this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.getTypeSection.type})
      }
      this.$store.dispatch('getObjId', this.objId)
      this.$emit('getPhotoEdit', this.photo)
      setTimeout(() => {
        this.$store.dispatch('postPhotoOriginal', {id: this.sectionId, idx: this.id})
      }, 200)
    },
  },
}
</script>

<style scoped lang="scss">
.dropbox {
  display: flex;
  justify-content: center;
  align-items: center;
  background: $white-grey;
  border: 1px solid #B7BDCE;
  border-radius: 15px;
  outline-offset: -10px;
  color: dimgray;
  height: 100%;
  //min-height: 293px;
  position: relative;
  cursor: pointer;

  & svg {
    path {
      transition: .3s;
    }
  }

  &:hover {
    svg {
      path {
        transition: .3s;
        fill: $green;
      }
    }
  }
}

.input-file {
  visibility: visible;
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100%;
  //height: 293px;
  position: absolute;
  cursor: pointer;
}

.input {
  position: relative;
  background-color: $white-grey;
  padding: 8px 5px;
  z-index: 2;
  border: 1px solid $silver;

  &-over {
    position: absolute;
    bottom: 39px;
    z-index: 2;
  }

  &-under {
    margin-top: 5px;

  }
}

.form-input {
  height: 100%;
  position: relative;
}

//@media(max-width: 767px) {
//    .dropbox {
//        min-height: 200px;
//    }
//}
</style>
