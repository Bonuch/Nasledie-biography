<template>
  <div class="edit-section">
    <div class="edit-section__container">
      <CropperPhoto
          @closeModal="closeCroppModal"
          @submit="handleImageUpload"
          @openMedia="openChooseType"
          @closeCropp="closeCropp"
          v-if="(this.photoMedia || this.isGettingData.photo) && this.croppModal"
          :photoToCropp="this.isGettingData.photo"
          :aspectType="'horizontalPhotoFull'"
          :sectionId="this.sectionId"
          :typeSection="'horizontal-photo-one'"
          :mediaPhoto="this.photoMedia"
      />

      <div class="edit-section__content">
        <EditMainTitle
            class="mb-11"
            :placeholder="'Заголовок блока'"
            :button-type-title="buttonEdit.typeEdit"
            :sectionId="this.sectionId"
            :editContent="this.editContent"
        />

        <EditPhotoCaption
            :sectionId="this.sectionId"
            :typeSection="this.type"
            :editContent="this.editContent"
            @closeModal="closeModal"
            v-if="isModalActive"
        />

        <div class="edit-section__content-items edit-section__content-img">
          <PictureFigure
              v-if="this.isGettingData.photo ?? this.photoEdit.length > 0 ?? this.image"
              :croppedPhoto="this.image"
              :picture-horizontal="this.isGettingData.photo"
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
              :type="'horizontal-photo-one'"
          />

          <ButtonType
              v-if="this.isGettingData.photo && this.active"
              class="button-position-caption"
              @captionModal="captionModal"
              :buttonType="buttonEdit.typeCaption"
          />

          <ButtonType
              v-if="this.isGettingData.photo && this.active"
              class="button-position"
              @switchEditor="switchPanel"
              :buttonType="buttonEdit.typeSwitch"
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
import EditPictUpload from "@/components/base/EditPictUpload";
import ButtonType from "@/components/base/ButtonType";
import PictureFigure from "@/components/base/PictureFigure";
import {mapGetters} from "vuex";
import EditPhotoCaption from "@/components/base/EditPhotoCaption";
import CropperPhoto from "@/components/base/CropperPhoto";
import ChooseUploadTypeModal from "@/components/base/ChooseUploadTypeModal";
import ChooseUploadType from "@/components/base/ChooseUploadType";
import MediaModal from "@/components/base/MediaModal";

export default {
  name: "EditHorizontalPhotoOne",
  components: {
    MediaModal,
    ChooseUploadType,
    ChooseUploadTypeModal,
    CropperPhoto, EditPhotoCaption, PictureFigure, ButtonType, EditPictUpload, EditMainTitle
  },
  props: {
    sectionId: {
      type: Number,
    },
    editContent: {
      type: Object,
      required: false,
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
      croppModal: false,
      image: '',
      type: '',
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
    isGettingData() {
      if (this.photoEdit) {

      }
      this.getBiographyData.forEach((item) => {
        if (this.sectionId === item.id) {
          this.type = item.typeSection
          this.photo = item
        }
      })
      if (this.photo && Object.keys(this.photo).length > 1) {
        this.active = true
      }
      return this.photo
    },
  },
}
</script>

<style scoped lang="scss">

.edit-section {
  &__container {
    max-width: 1260px;
    margin: 0 auto;
  }

  &__pict {
    width: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;

    &-img {
      position: relative;
      width: 99% !important;
    }

    &-items {
      display: flex;
    }

    &-overflow {
      padding: 11px;
      background: #FAFAFA;
      border-radius: 15px;
      width: 100%;
      height: 100%;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}

.button-position {
  position: absolute;
  top: 19px;
  right: 33px;
  z-index: 2;

  &-caption {
    position: absolute;
    top: 19px;
    z-index: 2;
    right: 92px;
  }
}

::v-deep {
  .input-over {
    position: relative;
    bottom: 0;
    margin-top: 5px;
  }

  .biography-photo-back {
    max-width: unset;
    margin-left: 0;
    width: 100%;
    max-height: 505px !important;

    &:after {
      max-width: unset;
    }
  }

  .biography-photo {
    object-fit: cover;
    max-height: 480px;
  }

  .twitter-cropper {
    max-width: 520px;
  }

  .dropbox-height {
    min-height: 480px !important;
  }

  .photo-caption {
    top: 135px;
    right: 12px;
  }
}

@media (max-width: 1280px) {
  ::v-deep {
    .biography-photo-back {
      max-height: 460px;
    }

    .biography-photo {
      max-height: 435px;
    }

    .dropbox-height {
      min-height: 435px !important;
    }
  }
  .button-position {
    &-caption {
      right: 83px;
    }
  }
}

@media (max-width: 767px) {
  .edit-section {
    &__content {
      &-img {
        width: 100%;
        margin-right: 0;
        margin-bottom: 25px;

        &:nth-child(2) {
          margin-bottom: 0;
        }
      }

      &-items {
        flex-direction: column;
      }
    }
  }
  ::v-deep {
    .biography-photo-back {
      max-height: 367px;
    }

    .biography-photo {
      max-height: 350px;
    }

    .dropbox-height {
      min-height: 350px !important;
    }
  }
}

@media (max-width: 480px) {
  .edit-section {
    &__content {
      &-img {
        margin-bottom: 155px;
      }


    }
  }
  ::v-deep {
    .biography-photo-back {
      max-height: 258px;
    }

    .biography-photo {
      max-height: 233px;
    }

    .dropbox-height {
      min-height: 233px !important;
    }
  }
}
</style>
