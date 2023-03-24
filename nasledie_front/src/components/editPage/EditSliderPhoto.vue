<template>
  <div class="edit-section">
    <div class="edit-section__container">
      <CropperPhoto
          @closeModal="closeCroppModal"
          @closeModalDelete="deleteEditingPhoto"
          @submit="handleImageUpload"
          @getPhotoEdit="getEditPhoto"
          @openMedia="openChooseType"
          @closeCropp="closeCropp"
          v-if="(this.photoMedia || this.getPhoto) && this.croppModal"
          :photoToCroppSlider="this.photo"
          :aspectType="'horizontalPhotoFull'"
          :sectionId="this.sectionId"
          :typeSection="'slider'"
          :idxs="this.idxs"
      />
      <div class="edit-section__content">
        <EditMainTitle
            class="mb-11"
            :placeholder="'Заголовок блока'"
            :button-type-title="buttonEdit.typeEdit"
            :sectionId="this.sectionId"
            :editContent="this.editContent"
        />

        <div class="edit-section__content-items">
          <div
              class="mb-30"
              v-if="this.photo"
          >
            <div class="edit-section__content-block flex-block item-center flex-wrap">
              <EditSliderPhotoBlock
                  class="edit-section__content-img"
                  @switchPanel="switchPanel"
                  :count="count"
                  v-for="(item, index) in this.photo"
                  :sliderContent="item"
                  :key="index"
                  :sectionId="sectionId"
                  :editContent="editContent"
              />
            </div>
          </div>

          <button @click="openModalType" class="input-file__button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                    fill="#B7BDCE"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 8.00195C12.5523 8.00195 13 8.44967 13 9.00195V15.002C13 15.5542 12.5523 16.002 12 16.002C11.4477 16.002 11 15.5542 11 15.002V9.00195C11 8.44967 11.4477 8.00195 12 8.00195Z"
                    fill="#B7BDCE"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 12.002C8 11.4497 8.44772 11.002 9 11.002H15C15.5523 11.002 16 11.4497 16 12.002C16 12.5542 15.5523 13.002 15 13.002H9C8.44772 13.002 8 12.5542 8 12.002Z"
                    fill="#B7BDCE"/>
            </svg>

            <span>Добавить фото</span>
          </button>

          <MediaModal
              v-if="this.modalMedia"
              :editContent="this.editContent"
              :content="this.editContent"
              :sliderUpload="true"
              :idxsNow="this.idxs"
              @openCroppModal="openCroppModal"
              @closeMediaModal="closeMediaModal"
              @photoFromMedia="photoFromMedia"
              @getEditPhotoIdxs="getEditPhotoIdxs"
              @getPhotoEditIdx="getEditPhotoIdxs"
              @getPhotoEdit="getEditPhoto"
              :sectionId="this.sectionId"
              :type="'slider'"
              :idxsFromCropp="this.idxsFromCropp"
          />
        </div>

        <div class="buttons-block">
          <ButtonType
              class="button-drag-up__position"
              :button-type="buttonEdit.typeDragUp"
              @dragUp="dragUp"
          />

          <ButtonType
              class="button-delete__position"
              :button-type="buttonEdit.typeDelete"
              @delete="deleteSection"
          />

          <ButtonType
              class="button-drag-down__position"
              :button-type="buttonEdit.typeDragDown"
              @dragDown="dragDown"
          />
        </div>

        <ButtonType
            class="handle button-move"
            :button-type="buttonEdit.typeMove"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import EditMainTitle from "@/components/editPage/EditMainTitle";
import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex";
import EditSliderPhotoBlock from "@/components/editPage/EditSliderPhotoBlock";
import CropperPhoto from "@/components/base/CropperPhoto";
import MediaModal from "@/components/base/MediaModal";
import ChooseUploadTypeModal from "@/components/base/ChooseUploadTypeModal";
import ChooseUploadType from "@/components/base/ChooseUploadType";

export default {
  name: "EditSliderPhoto",
  components: {
    ChooseUploadType,
    ChooseUploadTypeModal,
    MediaModal, CropperPhoto, EditSliderPhotoBlock, ButtonType, EditMainTitle
  },
  props: {
    sectionId: {
      type: Number,
    },
    editContent: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      buttonEdit: {
        typeEdit: 'editContent',
        typeDelete: 'DeleteSection',
        typeMove: 'move',
        typeDragUp: 'dragUp',
        typeDragDown: 'dragDown',
      },
      photo: [],
      photoArr: [],
      type: '',
      image: '',
      photoEdit: [],
      croppModal: false,
      modal: false,
      modalType: false,
      modalMedia: false,
      idxs: null,
      count: 0,
      photoMedia: null,
      idxsFromCropp: null,
    }
  },
  mounted() {
    this.getBiographyData.forEach((item) => {
      if (this.sectionId === item.id) {
        this.$store.dispatch('getTypeSection', {id: this.sectionId, type: item.typeSection})

        if (item) {
          this.photoArr = item
        }
      }
    })
  },
  methods: {
    closeCropp() {
      this.croppModal = false
    },
    openChooseType(val) {
      this.modalMedia = true
      this.croppModal = false
      if (val) {
        this.idxsFromCropp = val
        this.idxs = val
      }
    },
    openModalType() {
      this.modalMedia = true
      this.idxsFromCropp = null
      this.idxs = this.editContent.photo.slice(-1)[0].idxs
    },
    closeModalType() {
      this.modalType = false
    },
    closeMediaModal() {
      this.modalMedia = false
      this.idxsFromCropp = null
    },
    openMediaModal() {
      this.modalMedia = true
      this.croppModal = false
    },
    photoFromMedia(val) {
      this.modalMedia = false
      this.modalMedia2 = false

      if (Object.keys(val).length > 0) {
        this.photoMedia = val
      }
      this.croppModal = true
      this.idxsFromCropp = null
    },
    dragUp() {
      let selectedSection
      let index
      if (this.getBiographyData) {
        this.getBiographyData.forEach((item) => {
          if (item === this.photoArr) {
            selectedSection = item
          }
        })
        index = this.getBiographyData.indexOf(selectedSection)
        if (index === 0 || index === -1) {
        } else {
          this.getBiographyData.splice(index - 1, 0, this.getBiographyData.splice(index, 1)[0])
          const inputId = this.getBiographyData.map((item) => {
            return item.id
          })
          this.$store.dispatch('getInfo', this.getBiographyData)
          this.$store.dispatch('getInfoIdx', inputId)
        }
      }
    },
    dragDown() {
      let selectedSection
      let index
      let indexLast
      let lastItem
      if (this.getBiographyData) {
        this.getBiographyData.forEach((item) => {
          if (item === this.photoArr) {
            selectedSection = item
          }
        })
        index = this.getBiographyData.indexOf(selectedSection)
        lastItem = this.getBiographyData.slice(-1)
        indexLast = this.getBiographyData.lastIndexOf(lastItem[0])

        if (index === -1 || index === indexLast) {
        } else {
          this.getBiographyData.splice(index + 1, 0, this.getBiographyData.splice(index, 1)[0])
          this.$store.dispatch('getInfo', this.getBiographyData)
        }
      }
    },
    deleteSection() {
      this.$emit('deleteSection')
    },
    handleImageUpload(image) {
      this.image = image;
    },
    switchPanel(idxs) {
      if (idxs) {
        this.idxs = idxs
      }
      this.croppModal = true
    },
    getEditPhoto(val) {
      this.photoEdit = val
      this.idxsFromCropp = null
    },
    deleteEditingPhoto() {
        this.$store.dispatch('deletePhotoFromSlider', {id: this.sectionId, idxs: this.idxs})
        this.photo.forEach((item) => {
          if (item.cropped === undefined) {
            this.photo.splice(this.idxs - 1, 1)
          }
        })
      this.count++
      this.photoMedia = {}
      this.croppModal = false
      this.modalMedia = false
    },
    closeCroppModal() {
      this.croppModal = false
      this.modalMedia = false
    },
    openCroppModal(idxs) {
      if (idxs) {
        this.idxs = idxs
      }
      this.croppModal = true
    },
    getEditPhotoIdxs(idxs) {
      this.idxs = ''
      if (idxs) {
        this.idxs = idxs
      }
    }
  },
  computed: {
    ...mapGetters({
      getBiographyData: 'getBiographyData',
    }),
    getPhoto() {
      if (this.image.length > 0) {
      }
      if (this.photoEdit) {
      }
      const photoArr = this.getBiographyData
      photoArr.forEach((item) => {
        if (this.sectionId === item.id) {
          this.type = item.typeSection
          if (item.photo) {
            item.photo.forEach((itemId) => {
              if (itemId.idx !== undefined) {
                itemId.idxs = itemId.idx
              }
              if (itemId.result.idx !== undefined) {
                itemId.result.idxs = itemId.result.idx
              }
              if (itemId.cropped) {
                if (itemId.cropped.idx !== undefined) {
                  itemId.cropped.idxs = itemId.cropped.idx
                }
              }
              if (itemId.textOver.idx !== undefined) {
                itemId.textOver.idxs = itemId.textOver.idx
              }
              if (itemId.textUnder.idx !== undefined) {
                itemId.textUnder.idxs = itemId.textUnder.idx
              }
              delete itemId.idx
              delete itemId.result.idx
              delete itemId.textUnder.idx
              delete itemId.textOver.idx
              if (itemId.cropped) {
                if (itemId.cropped.idx) {
                  delete itemId.cropped.idx
                }
              }
              this.$set(this.photo, itemId.idxs, itemId)
            })
          }
        }
      })
      this.count++
      return this.photo
    }
  },
  watch: {
    getPhoto(val) {
      return this.photo = val
    }
  }
}
</script>

<style scoped lang="scss">
.edit-section {

  &__container {
    max-width: 1260px;
    margin: 0 auto;
  }

  &__content {
    display: flex;
    flex-direction: column;

    &-img {
      position: relative;
      width: 32%;
      margin-right: 15px;
      margin-bottom: 25px;

      &:nth-child(3n+3) {
        margin-right: 0;
      }
    }

    &-items {
      display: flex;
      flex-direction: column;
      padding: 21px 16px 29px 16px;
      background: #FAFAFA;
      border-radius: 15px;
    }

    &-block {
      position: relative;
    }

    &-overflow {
      margin-right: 10px;
      margin-bottom: 10px;
      width: 32%;
      border-radius: 10px;
      max-height: 175px;
      object-fit: cover;
      position: relative;
      height: 100%;

      &:nth-child(3n+3) {
        margin-right: 0;
      }
    }
  }
}

.dropbox {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.input-file {
  visibility: visible;
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      margin-right: 20px;
    }

    & span {
      font-family: $font-nova;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
    }
  }
}

@media(max-width: 920px) {
  .edit-section {
    &__content {
      &-img {
        position: relative;
        width: 48.5%;
        margin-right: 15px;
        margin-bottom: 25px;

        &:nth-child(2n) {
          margin-right: 0;
        }

        &:nth-child(3n+3) {
          margin-right: 15px;
        }

        &:nth-child(6) {
          margin-right: 0;
        }
      }
    }
  }
}

@media(max-width: 620px) {
  .edit-section {
    &__content {
      &-items {
        padding: 21px 14px 29px 8px;
      }

      &-img {
        position: relative;
        width: 100%;
        margin-right: 0;
        margin-bottom: 25px;

        &:nth-child(2n) {
          margin-right: 0;
        }

        &:nth-child(3n+3) {
          margin-right: 0;
        }

        &:nth-child(6) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
