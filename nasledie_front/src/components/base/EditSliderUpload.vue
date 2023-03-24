<template>
  <div class="" @click="sendPost">
    <!--        <form enctype="multipart/form-data" novalidate>-->
    <!--            <div class="dropbox">-->
    <input type="file"
           multiple
           @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
           accept="image/*" class="input-file">

    <!--                <div class="input-file__button">-->
    <!--                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"-->
    <!--                         xmlns="http://www.w3.org/2000/svg">-->
    <!--                        <path fill-rule="evenodd" clip-rule="evenodd"-->
    <!--                              d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"-->
    <!--                              fill="#B7BDCE"/>-->
    <!--                        <path fill-rule="evenodd" clip-rule="evenodd"-->
    <!--                              d="M12 8.00195C12.5523 8.00195 13 8.44967 13 9.00195V15.002C13 15.5542 12.5523 16.002 12 16.002C11.4477 16.002 11 15.5542 11 15.002V9.00195C11 8.44967 11.4477 8.00195 12 8.00195Z"-->
    <!--                              fill="#B7BDCE"/>-->
    <!--                        <path fill-rule="evenodd" clip-rule="evenodd"-->
    <!--                              d="M8 12.002C8 11.4497 8.44772 11.002 9 11.002H15C15.5523 11.002 16 11.4497 16 12.002C16 12.5542 15.5523 13.002 15 13.002H9C8.44772 13.002 8 12.5542 8 12.002Z"-->
    <!--                              fill="#B7BDCE"/>-->
    <!--                    </svg>-->

    <!--                    <p>Добавить фото</p>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </form>-->
  </div>
</template>

<script>
/* eslint-disable */
import {mapGetters} from "vuex";

// let idxs = 0;

export default {
  name: "EditSliderUpload",
  data() {
    return {
      buttonEdit: 'image',
      textOver: '',
      textUnder: '',
      timeout: null,
      photo: [],
      objId: [],
      beingPhoto: [],
      idxs: '0',
      idxsFrDev: null,
    }
  },
  props: {
    sectionId: {
      type: Number
    },
    editContent: {
      type: Object,
      require: true,
    },
    type: {
      type: String,
      required: false,
    },
    idxsFromDownload: {
      type: Number,
      required: false,
    },
    idxsNow: {
      type: Number,
      required: false,
    },
  },
  mounted() {
    if (this.editContent.photo) {
      this.editContent.photo.slice(-1).forEach((item) => {
        this.idxs = item.idxs

      })
    }
    if(this.idxsNow) {
      this.idxs = this.idxsNow
    }
    this.idxsFrDev = null
    if(this.idxsFromDownload) {
      this.idxsFrDev = this.idxsFromDownload
    } else {
      this.idxsFrDev = null
    }
  },
  computed: {
    ...mapGetters({
      getTypeSection: 'getTypeSection'
    }),
  },
  methods: {
    sendPost() {
      this.$emit('sendPost', this.idxs)
    },
    filesChange(fieldName, fileList) {
      let _this = this
      let file = fileList[0]
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if(_this.idxsFrDev === _this.idxs) {
          _this.beingPhoto = _this.editContent.photo

          _this.beingPhoto.forEach((item) => {
            if(item.idxs) {
              if(item.idxs === _this.idxsFrDev) {
                item.result.original = reader.result
                item.result.url = ''
                item.result.idwp = ''
              }
            }
          })
          _this.$store.dispatch('getPhotoArr', _this.beingPhoto)
          _this.$store.dispatch('getMergedArrays')
        }else {
          if (_this.editContent.photo) {
            _this.beingPhoto = _this.editContent.photo
            _this.idxs++;
            _this.beingPhoto.push({
              result: {
                original: reader.result,
                url: '',
                idwp: ''
              },
              textOver: _this.textOver,
              textUnder: _this.textUnder,
              id: _this.sectionId,
              idxs: _this.idxs
            })
            _this.$store.dispatch('getPhotoArr', _this.beingPhoto)
            _this.$store.dispatch('getMergedArrays')
          }
          else {
            _this.idxs++;
            _this.photo.push({
              result: {
                original: reader.result,
                url: '',
                idwp: ''
              },
              textOver: _this.textOver,
              textUnder: _this.textUnder,
              id: _this.sectionId,
              idxs: _this.idxs
            })
            _this.$store.dispatch('getPhotoArr', _this.photo)
            _this.$store.dispatch('getMergedArrays')
          }


        }

      }
      if (!this.objId.length) {
        this.objId.push({id: this.sectionId})
      }
      this.$store.dispatch('getObjId', this.objId)
      if(this.idxsFrDev) {

      } else {
        setTimeout(() => {
          if (this.photo.length > 0) {
            this.$emit('getPhotoEdit', this.photo)
            this.$emit('getPhotoEditIdx', this.photo.slice(-1)[0].idxs)
          } else {
            this.$emit('getPhotoEdit', this.beingPhoto)
            this.$emit('getPhotoEditIdx', this.beingPhoto.slice(-1)[0].idxs)
          }
        }, 400)
      }

      if (this.type) {
        this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.type})
      } else {
        this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.getTypeSection.type})
      }
      setTimeout(() => {
        this.$store.dispatch('postPhotoOriginal', {id: this.sectionId, idxs: this.idxs})
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
  position: relative;

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
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;

  &__button {
    display: flex;
    align-items: center;

    & svg {
      margin-right: 20px;
    }

    & p {
      font-family: $font-nova;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
    }
  }
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
</style>
