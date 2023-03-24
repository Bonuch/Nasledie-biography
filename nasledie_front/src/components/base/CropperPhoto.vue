<template>
  <div class="cropper-container">
    <div class="cropper__content">
      <div class="cropper__content-top">
        <h3 class="cropper__content-top__title">Редактирование фото</h3>

        <ButtonType
            @exitPopup="closeModal"
            class="cropper__content-top__btn"
            :button-type="'exitPopup'"
        />
      </div>

      <h4>Вы можете кадрировать фото по месту, но и оригинал сохранится в галерее</h4>

      <img class="progress-img" v-if="this.returnStateImageLoaded" :src="returnPhoto" alt="">

      <cropper
          v-else
          ref="cropper"
          class="twitter-cropper"
          background-class="twitter-cropper__background"
          foreground-class="twitter-cropper__foreground"
          image-restriction="stencil"
          :style="style"
          :stencil-size="stencilSize"
          :stencil-props="{
                                  lines: {},
                                  handlers: {},
                                  movable: false,
                                  scalable: false,
                                  aspectRatio: aspectRatioNumber,
                                  previewClass: 'twitter-cropper__stencil',
                                }"
          :transitions="false"
          :canvas="true"
          :debounce="true"
          :default-size="defaultSize"
          :min-height="50"
          :src="returnPhoto"
          @change="onChange"
      />

      <div class="progress-bar-container" v-if="this.returnStateImageLoaded">
        <ProgressBar/>

        <p class="progress-bar-text">Загрузка изображения</p>
      </div>

      <ZoomPhoto
          v-else
          :zoom="zoom"
          @change="onZoom"
      />

      <div class="cropper__content-bottom" v-if="this.returnStateImageLoaded">
        <ButtonType
            :button-type="'cancelRequest'"
            class="cropper__content-bottom__btn-next"
            @cancelRequest="cancelRequest"
        >
          Остановить
        </ButtonType>
      </div>

      <div class="cropper__content-bottom" v-else>
        <div class="cropper__content-bottom__btn-exit">
          <form class="form-input" enctype="multipart/form-data" novalidate>
            <div class="dropbox">
              <button
                  class="input-file"
                  @click.prevent="openMedia"
              ></button>
              Другое фото
            </div>
          </form>
        </div>

        <ButtonType
            :button-type="'saveCrop'"
            class="cropper__content-bottom__btn-next"
            @saveCrop="crop"
        >
          Далее
        </ButtonType>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import ZoomPhoto from "@/components/base/ZoomPhoto";
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex";
import PreloaderComponent from "@/components/base/PreloaderComponent";
import ProgressBar from "@/components/base/ProgressBar";

export default {
  name: "CropperPhoto",
  components: {
    ProgressBar,
    PreloaderComponent,
    ButtonType,
    ZoomPhoto:() => import('@/components/base/ZoomPhoto'),
    Cropper,
  },
  props: {
    photoToCropp: {
      // type: Object,
      required: false,
    },
    photoToCroppSlider: {
      type: Array,
      required: false,
    },
    aspectType: {
      type: String,
      required: false,
    },
    sectionId: {
      type: Number,
    },
    typeSection: {
      type: String,
    },
    id: {
      type: Number,
    },
    idx: {
      type: Number,
    },
    idxs: {
      type: Number,
    },
    mediaPhoto: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      zoom: 0,
      image: null,
      objId: [],
      photo: [],
      photoMore: [],
      textOver: '',
      textUnder: '',
      timeout: null,
      sliderImage: '',
      preload: false,
      checkProgress: 0,
    }
  },
  computed: {
    ...mapGetters({
      returnFileList: 'returnFileList',
      getTypeSection: 'getTypeSection',
      getBiographyData: 'getBiographyData',
      returnProgress: 'returnProgress',
      returnStateImageLoaded: 'returnStateImageLoaded',
    }),
    progressBarStatus() {
      this.checkProgress = this.returnProgress
      if (this.checkProgress === 100) {
        this.checkProgress = null
      }
      return this.checkProgress
    },
    style() {
      let width
      let height
      if (this.aspectType === 'verticalPhoto') {
        width = 390
        height = 260
      } else if (this.aspectType === 'horizontalPhoto') {
        if (window.innerWidth > 767) {
          width = 490
          height = 260
        } else {
          width = 390
          height = 260
        }

      } else if (this.aspectType === 'horizontalPhotoFull') {
        if (window.innerWidth > 767) {
          width = 520
          height = 260
        } else {
          width = 390
          height = 260
        }
      }

      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    },
    aspectRatioNumber() {
      if (this.aspectType === 'verticalPhoto') {
        return 14 / 16
      } else if (this.aspectType === 'horizontalPhoto') {
        return 16 / 12
      } else if (this.aspectType === 'horizontalPhotoFull') {
        return 16 / 9
      }
      return 1
    },
    returnPhoto() {
      this.preload = true
      if (this.photo.length > 0) {
        return this.photo[0].result
      }
      if (this.photoToCropp) {
        let photo
        if (Array.isArray(this.photoToCropp)) {
          this.photoToCropp.forEach((item) => {
            if (item.idx === this.id) {
              if (item.result.original) {
                photo = item.result.original
              } else {
                photo = item.result.url
              }
            } else {
              if (item.result.url) {
                photo = item.result.url
              }
            }
          })
        } else {
          photo = this.photoToCropp.result.original
        }
        return photo
      }
      if (this.mediaPhoto && Object.keys(this.mediaPhoto).length > 0) {
        return this.mediaPhoto.url
      }
      if (this.photoToCroppSlider) {
        if (Array.isArray(this.photoToCroppSlider)) {
          this.photoToCroppSlider.forEach((item) => {
            if (item.idxs === this.idxs) {
              this.sliderImage = item.result.original
            }
          })
          return this.sliderImage
        } else {
          if (this.photoToCroppSlider.idxs === this.idxs) {
            this.sliderImage = this.photoToCroppSlider.url
          }
          return this.sliderImage
        }
      }
    }
  },
  methods: {
    cancelRequest() {
      this.$store.dispatch('cancelSaveImageRequest', {id: this.sectionId, idx: this.id, idxs: this.idxs})
      this.$emit('closeCropp')
    },
    openMedia() {
      if (this.id === 1) {
        this.$emit('openMedia1')
      }
      if (this.id === 2) {
        this.$emit('openMedia2')
      }
      if (this.id === 3) {
        this.$emit('openMedia3')
      } else {
        this.$emit('openMedia', this.idxs)
      }
    },
    crop() {
      const result = this.$refs.cropper.getResult();
      if (this.id === 1) {
        this.$emit("submit1", {img: result.canvas.toDataURL('image/jpeg'), id: 1})
      }
      if (this.id === 2) {
        this.$emit("submit2", {img: result.canvas.toDataURL('image/jpeg'), id: 2})
      }
      if (this.id === 3) {
        this.$emit("submit3", {img: result.canvas.toDataURL('image/jpeg'), id: 3})
      } else {
        this.$emit("submit", result.canvas.toDataURL('image/jpeg'));
      }
      if (!this.objId.length) {
        this.objId.push({id: this.sectionId})
      }
      if (this.sectionId === 0) {
        this.$store.dispatch('getCroppedMainPhoto', {
          id: this.sectionId,
          photo: result.canvas.toDataURL('image/jpeg'),
          idwp: '',
          url: ''
        })
        // this.$store.dispatch('getMergeMainArray')
      }
      if (this.typeSection === 'vertical-photo') {
        this.$store.dispatch('getCroppedPhoto', {
          id: this.sectionId,
          idx: this.id,
          photo: result.canvas.toDataURL('image/jpeg'),
          idwp: '',
          url: ''
        })
        this.$store.dispatch('getMergedArrays')
      }
      if (this.typeSection === 'horizontal-photo') {
        this.$store.dispatch('getCroppedPhoto', {
          id: this.sectionId,
          idx: this.id,
          photo: result.canvas.toDataURL('image/jpeg'),
          idwp: '',
          url: ''
        })
        this.$store.dispatch('getMergedArrays')
      }
      if (this.sectionId !== 0 && this.typeSection !== 'vertical-photo' && this.typeSection !== 'horizontal-photo') {
        if (this.typeSection === 'slider') {
          this.$store.dispatch('getCroppedPhoto', {
            id: this.sectionId,
            photo: result.canvas.toDataURL('image/jpeg'),
            idxs: this.idxs,
            idwp: '',
            url: ''
          })
          this.$store.dispatch('getMergedArrays')
        } else {
          this.$store.dispatch('getCroppedPhoto', {
            id: this.sectionId,
            photo: result.canvas.toDataURL('image/jpeg'),
            idwp: '',
            url: ''
          })
          this.$store.dispatch('getMergedArrays')
        }
      }
      this.$store.dispatch('getObjId', this.objId)
      this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.typeSection})
      this.$emit('closeModal')
      this.checkImageFormat()
    },
    checkImageFormat() {
      setTimeout(() => {
        this.$store.dispatch('postPhotoCropped', {id: this.sectionId, idx: this.id, idxs: this.idxs})
      }, 400)
    },
    closeModal() {
      this.$emit('closeModalDelete')
      this.$emit('closeCropp')
      this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.typeSection})
      this.$store.dispatch('getBackUp')
    },
    filesChange(fieldName, fileList) {
      this.$store.dispatch('getFileList', fileList)
      let _this = this
      let file = fileList[0]
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (_this.typeSection === 'slider') {
          _this.photoToCroppSlider.forEach((item) => {
            if (item.idxs === _this.idxs) {
              item.result.original = reader.result
              item.result.url = ''
              item.result.idwp = ''
            }
          })
        } else {
          if (_this.sectionId === 0) {
            _this.$store.dispatch('getMainSectionMainPhoto', {
              result: {
                original: reader.result,
                url: '',
                idwp: ''
              },
              textOver: _this.textOver,
              textUnder: _this.textUnder,
            })
            _this.photo.push({
              result: reader.result,
            })
            // _this.$store.dispatch('getMergeMainArray')
          } else {
            if (_this.getTypeSection.type === 'vertical-photo') {
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
              _this.$store.dispatch('getPhotoArr', _this.photoMore)
              _this.$store.dispatch('getMergedArrays')
              _this.photo.push({
                result: reader.result,
              })
            } else if (_this.getTypeSection.type === 'horizontal-photo') {
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
              _this.$store.dispatch('getPhotoArr', _this.photoMore)
              _this.$store.dispatch('getMergedArrays')
              _this.photo.push({
                result: reader.result,
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
              // _this.$store.dispatch('getMergeMainArray')
              _this.$store.dispatch('getMergedArrays')
              _this.photo.push({
                result: reader.result,
                id: _this.sectionId
              })
            }
          }
        }
      }
      if (!this.objId.length) {
        this.objId.push({id: this.sectionId})
      }
      this.$store.dispatch('getObjId', this.objId)
      this.$emit('getPhotoEdit', this.photo)
      this.$emit('getIdxFrCropped', this.idxs)
    },
    defaultSize({imageSize}) {
      return {
        width: Math.min(imageSize.height, imageSize.width),
        height: Math.min(imageSize.height, imageSize.width),
      };
    },
    stencilSize({boundaries}) {
      return {
        width: Math.min(boundaries.height, boundaries.width),
        height: Math.min(boundaries.height, boundaries.width),
      };
    },
    onChange(result) {
      const cropper = this.$refs.cropper;
      if (cropper) {
        const {coordinates, imageSize} = cropper;
        if (
            imageSize.width / imageSize.height >
            coordinates.width / coordinates.height
        ) {
          // Determine the position of slider bullet
          // It's 0 if the stencil has the maximum size and it's 1 if the has the minimum size
          this.zoom =
              (cropper.imageSize.height - cropper.coordinates.height) /
              (cropper.imageSize.height - cropper.sizeRestrictions.minHeight);
        } else {
          this.zoom =
              (cropper.imageSize.width - cropper.coordinates.width) /
              (cropper.imageSize.width - cropper.sizeRestrictions.minWidth);
        }
      }
    },
    onZoom(value) {
      const cropper = this.$refs.cropper;
      if (cropper) {
        if (cropper.imageSize.height < cropper.imageSize.width) {
          const minHeight = cropper.sizeRestrictions.minHeight;
          const imageHeight = cropper.imageSize.height;
          // Determine the current absolute zoom and the new absolute zoom
          // to calculate the sought relative zoom value
          cropper.zoom(
              (imageHeight - this.zoom * (imageHeight - minHeight)) /
              (imageHeight - value * (imageHeight - minHeight))
          );
        } else {
          const minWidth = cropper.sizeRestrictions.minWidth;
          const imageWidth = cropper.imageSize.width;
          cropper.zoom(
              (imageWidth - this.zoom * (imageWidth - minWidth)) /
              (imageWidth - value * (imageWidth - minWidth))
          );
        }
      }
    },
  }
}
</script>

<style scoped lang="scss">
.progress-bar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.progress-img {
  width: 390px;
  height: 260px;
  object-fit: cover;
  margin: 0 auto 40px;
}

.progress-bar-text {
  color: #444444;
  font-family: $font-nova;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0;
  margin-top: 9px;
}

.preload {
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.twitter-cropper {
  max-width: 390px;
  height: 260px;
  margin: 0 auto;
  margin-bottom: 40px;

  &__background {
    background-color: #edf2f4;
  }

  &__foreground {
    background-color: #edf2f4;
  }

  &__stencil {
    border: solid 5px rgb(29, 161, 242);
  }
}

.cropper-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 83px;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.cropper__content {
  max-width: 938px;
  margin: 0 auto;
  background-color: $white;
  border-radius: 15px;

  &-top {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 22px 0;
    background: #F5F2F3;
    border: 1px solid #F0F4F7;
    border-radius: 15px 15px 0 0;
    position: relative;

    &__btn {
      position: absolute;
      top: 29px;
      right: 29px;

      &::v-deep {
        .button {
          padding: 0;

          & svg {
            width: 16px;
            height: 16px;
            transition: .3s;

            &:hover {
              path {
                transition: .3s;
                fill: $green;
              }
            }
          }
        }
      }
    }

    &__title {
      color: $text-color;
      font-weight: 600;
      font-size: 24px;
      line-height: 30px;
    }
  }

  &-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
    padding-bottom: 22px;

    &__btn-exit {
      margin-right: 15px;
      min-width: 200px;
    }

    &__btn-next {
      min-width: 200px;
    }
  }

  & h4 {
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: $text-color;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 35px;
    padding-bottom: 50px;
  }
}

::v-deep {
  .vue-advanced-cropper__foreground {
    background: $white;
  }

  .vue-preview--fill {
    border: 2px solid #B7BDCE;
  }

  .button {
    box-shadow: unset;
  }

  .button__exit {
    width: 100%;
  }

  .button__save {
    width: 100%;
  }
}

.dropbox {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-family: $font-nova;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  padding: 15px 32px;
  background: #ffffff;
  border: 1px solid #F0F4F7;
  border-radius: 100px;
  height: 100%;
}

.input-file {
  visibility: visible;
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
}

.input {
  position: relative;
  background-color: $white-grey;
  padding: 8px 5px;
  z-index: 2;
  cursor: pointer;

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
  cursor: pointer;
}

@media (max-width: 767px) {
  .cropper__content {
    &-top {
      padding: 18px 0;

      &__btn {
        top: 27px;
      }

      &__title {
        font-size: 20px;
      }
    }

    & h4 {
      text-align: center;
      font-size: 18px;
      padding: 15px 10px 20px;
    }
  }
  .cropper-container {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 40px;
    overflow: auto;
  }
}

@media(max-width: 480px) {
  .cropper-container {
    display: flex;
    padding-top: 0;
  }
  .cropper__content {
    &-bottom {
      flex-direction: column-reverse;

      &__btn-exit {
        padding-right: 26px;
        padding-left: 26px;
        min-width: 100%;
        margin-right: 0;

      }

      &__btn-next {
        padding-right: 26px;
        padding-left: 26px;
        min-width: 100%;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
