<template>
  <div class="edit-section">
    <div class="edit-section__container">
      <CropperPhoto
          @closeModal="closeCroppModal"
          @submit="handleImageUpload"
          @openMedia="openChooseType"
          @closeCropp="closeCropp"
          v-if="(this.photoMedia || this.getPhoto.photo) && this.croppModal"
          :photoToCropp="this.getPhoto.photo"
          :aspectType="'horizontalPhoto'"
          :sectionId="this.sectionId"
          :typeSection="'pict-right'"
          :mediaPhoto="this.photoMedia"
      />

      <div class="edit-section__content">
        <EditPhotoCaption
            :sectionId="this.sectionId"
            :typeSection="this.type"
            :editContent="this.editContent"
            @closeModal="closeModal"
            v-if="isModalActive"
        />

        <div class="edit-section__content-img">
          <PictureFigure
              v-if="this.getPhoto.photo ?? this.photoEdit.length > 0 ?? this.image"
              :croppedPhoto="this.image"
              :picture-left="this.getPhoto.photo"
          />

          <ChooseUploadType
              v-else
              class="edit-section__pict"
              @openModalType="openModalType"
          />

          <MediaModal
              v-if="this.modalMedia"
              @closeMediaModal="closeMediaModal"
              @photoFromMedia="photoFromMedia"
              @openCroppModal="openCroppModal"
              @getPhotoEdit="getEditPhoto"
              :sectionId="this.sectionId"
              :type="'pict-right'"
          />
          <ButtonType
              v-if="(this.photoMedia || this.getPhoto.photo) && this.active"
              class="button-position-caption"
              @captionModal="captionModal"
              :buttonType="buttonEdit.typeCaption"
          />

          <ButtonType
              v-if="(this.photoMedia || this.getPhoto.photo) && this.active"
              class="button-position"
              @switchEditor="switchPanel"
              :buttonType="buttonEdit.typeSwitch"
          />
        </div>

        <div class="edit-section__text">
          <EditMainTitle
              class="mb-11"
              :placeholder="'Заголовок блока'"
              :button-type-title="buttonEdit.typeEdit"
              :sectionId="this.sectionId"
              :editContent="this.editContent"
          />

          <EditMainText
              :button-type-text="buttonEdit.typeEdit"
              :sectionId="this.sectionId"
              :editContent="this.editContent"
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
import EditMainText from "@/components/editPage/EditMainText";
import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex";
import PictureFigure from "@/components/base/PictureFigure";
import EditPhotoCaption from "@/components/base/EditPhotoCaption";
import CropperPhoto from "@/components/base/CropperPhoto";
import ChooseUploadType from "@/components/base/ChooseUploadType";
import MediaModal from "@/components/base/MediaModal";

export default {
  name: "EditPictRightSection",
  components: {
    MediaModal,
    ChooseUploadType,
    CropperPhoto,
    EditPhotoCaption,
    PictureFigure,
    ButtonType,
    EditMainText,
    EditMainTitle
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
        typeSwitch: 'edit',
        typeCaption: 'caption',
        typeDragUp: 'dragUp',
        typeDragDown: 'dragDown',
      },
      active: false,
      modal: false,
      modalType: false,
      modalMedia: false,
      type: '',
      croppModal: false,
      image: '',
      photo: {},
      photoEdit: [],
      photoMedia: null,
    }
  },
  methods: {
    closeCropp() {
      this.croppModal = false
    },
    openChooseType() {
      this.modalMedia = true
      this.croppModal = false
    },
    openModalType() {
      this.modalMedia = true
    },
    closeModalType() {
      this.modalType = false
    },
    closeMediaModal() {
      this.modalMedia = false
    },
    openMediaModal() {
      this.modalMedia = true
      this.croppModal = false
    },
    photoFromMedia(val) {
      this.modalMedia = false

      if (Object.keys(val).length > 0) {
        this.photoMedia = val
      }

      this.croppModal = true
    },
    dragUp() {
      let selectedSection
      let index
      if (this.getBiographyData) {
        this.getBiographyData.forEach((item) => {
          if (item === this.photo) {
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
          if (item === this.photo) {
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
          // this.$store.dispatch('getMergedArrays')
        }
      }
    },
    handleImageUpload(image) {
      this.image = image;
    },
    deleteSection() {
      this.$emit('deleteSection')
    },
    switchPanel() {
      this.croppModal = true
    },
    captionModal() {
      this.modal = !this.modal
      this.$store.dispatch('getModalActive', {active: this.modal, id: this.sectionId})
    },
    closeModal() {
      this.modal = false
      this.$store.dispatch('getModalActive', this.modal)
    },
    closeCroppModal() {
      this.photoEdit = []
      this.photoMedia = {}
      this.active = false
      this.croppModal = false
      this.modalMedia = false
    },
    openCroppModal() {
      this.croppModal = true
    },
    getEditPhoto(val) {
      this.photoEdit = val
      if (this.photoEdit) {
        this.active = true
      }
    },
  },
  computed: {
    ...mapGetters({
      getBiographyData: 'getBiographyData',
      returnModalActive: 'returnModalActive'
    }),
    isModalActive() {
      let modal
      if (this.returnModalActive.id === this.sectionId) {
        modal = this.returnModalActive.active
      }
      return modal
    },

    getPhoto() {
      if (this.photoEdit) {

      }
      let original
      let url
      this.getBiographyData.forEach((item) => {
        if (this.sectionId === item.id) {
          this.type = item.typeSection
          this.photo = item
          if(item.photo) {
            item.photo.forEach((item) => {
              original = item.result.original
              url = item.result.url
            })
            if(original === null && url === null) {
              delete item.photo
            }
          }
        }
      })
      if (this.photo && Object.keys(this.photo).length > 1) {
        this.active = true
      }
      return this.photo
    }
  },
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
    flex-direction: row-reverse;

    &-img {
      position: relative;
      width: 50%;
    }
  }

  &__text {
    width: 50%;
  }

  &__pict {
    margin-left: 31px;
    position: relative;
    height: 100%;

    &:before {
      content: '';
      position: absolute;
      left: 6px;
      top: 11px;
      width: 100%;
      height: 100%;
      background: $silver;
      opacity: 0.2;
      border-radius: 15px;
    }
  }
}

.button-delete__position {
  right: -31px;
}

.button-drag-up__position {
  right: -27px;
}

.button-drag-down__position {
  right: -27px;
}

::v-deep {
  .biography-photo-back {
    max-height: 478px;
    max-width: unset;
    height: unset;
    margin-left: 26px;
    margin-right: 0;

    &:after {
      max-width: unset;
    }
  }

  .biography-photo {
    max-height: 478px;
    object-fit: cover;
  }

  .dropbox-height {
    max-height: 478px !important;
    min-height: 478px !important;
  }

}

.button-position {
  position: absolute;
  top: 13px;
  right: 17px;
  z-index: 2;

  &-caption {
    position: absolute;
    top: 13px;
    z-index: 2;
    right: 75px;
  }
}

@media(max-width: 1280px) {
  ::v-deep {
    .biography-photo-back {
      max-height: 325px;
    }

    .biography-photo {
      max-height: 293px;
    }

    .dropbox-height {
      max-height: 293px !important;
    }
  }
  @media (max-width: 1280px) {
    .button-position {
      &-caption {
        right: 65px;
      }
    }
  }
}

@media(max-width: 767px) {
  .edit-section {
    &__content {
      flex-direction: column;

      &-img {
        width: 100%;
      }
    }

    &__pict {
      width: 100%;
      margin-left: 0;
      margin-bottom: 40px;
    }

    &__text {
      width: 100%;
    }
  }
  ::v-deep {
    .biography-photo-back {
      margin-left: 0;
    }

  }
}

@media (max-width: 480px) {
  ::v-deep {
    .biography-photo-back {
      margin-bottom: 20px;
      max-height: 255px;
    }

    .biography-photo {
      max-height: 233px;
    }

    .dropbox-height {
      max-height: 233px !important;
      min-height: 233px !important;
    }
  }
}
</style>
