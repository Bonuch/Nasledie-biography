<template>
  <div
      class="edit-section"
      :class="{'edit-section-p': isModalActive1 || isModalActive2 || isModalActive3}"
  >
    <div class="edit-section__container">
      <div class="edit-section__content">
        <EditMainTitle
            class="mb-11"
            :placeholder="'Заголовок блока'"
            :button-type-title="buttonEdit.typeEdit"
            :sectionId="this.sectionId"
            :editContent="this.editContent"
        />

        <div class="edit-section__content-items">
          <div class="edit-section__content-img">
            <CropperPhoto
                @closeModal="closeCroppModal"
                @submit1="handleImageUpload1"
                @openMedia1="openChooseType"
                @closeCropp="closeCropp"
                v-if="(this.getPhoto.photo || this.photoMedia) && this.croppModal"
                :photoToCropp="this.getPhoto.photo"
                :aspectType="'verticalPhoto'"
                :id="1"
                :sectionId="this.sectionId"
                :typeSection="this.type"
                :mediaPhoto="this.photoMedia"
            />

            <EditPhotoCaption
                :sectionId="this.sectionId"
                :typeSection="this.type"
                :editContent="this.editContent"
                :id="1"
                @closeModal="closeModal"
                v-if="isModalActive1"
            />

            <PictureFigure
                v-if="this.active ?? this.getPhoto.photo ?? this.photoEdit.length > 0 ?? this.image1"
                :croppedPhoto1="this.image1.img"
                :picture-main="this.getPhoto.photo"
                :id="1"
            />

            <ChooseUploadType
                v-else
                class="edit-section__pict"
                @openModalType="openModalType"
            />

            <MediaModal
                v-if="this.modalMedia"
                :id=1
                :content="this.getPhoto.photo"
                :edit="this.edit"
                @openCroppModal1="openCroppModal"
                @getPhotoEdit="getEditPhoto"
                @closeMediaModal="closeMediaModal"
                @photoFromMedia="photoFromMedia"
                :sectionId="this.sectionId"
                :type="'vertical-photo'"
            />

            <ButtonType
                v-if="(this.getPhoto.photo || this.photoMedia) && this.active"
                class="button-position-caption"
                @captionModal="captionModal"
                :buttonType="buttonEdit.typeCaption"
            />

            <ButtonType
                v-if="(this.getPhoto.photo || this.photoMedia) && this.active"
                class="button-position"
                @switchEditor="switchPanel"
                :buttonType="buttonEdit.typeSwitch"
            />
          </div>
          <div class="edit-section__content-img">
            <CropperPhoto
                @closeModal="closeCroppModal2"
                @submit2="handleImageUpload2"
                @openMedia2="openChooseType2"
                @closeCropp="closeCropp"
                v-if="(this.getPhoto.photo || this.photoMedia) && this.croppModal2"
                :photoToCropp="this.getPhoto.photo"
                :aspectType="'verticalPhoto'"
                :id="2"
                :sectionId="this.sectionId"
                :typeSection="this.type"
                :mediaPhoto="this.photoMedia"
            />

            <EditPhotoCaption
                :id="2"
                :sectionId="this.sectionId"
                :typeSection="this.type"
                :editContent="this.editContent"
                @closeModal="closeModal"
                v-if="isModalActive2"
            />

            <PictureFigure
                v-if="this.active2 ?? this.getPhoto.photo ?? this.photoEdit.length > 0 ?? this.image2"
                :croppedPhoto2="this.image2.img"
                :picture-main="this.getPhoto.photo"
                :id="2"
            />

            <ChooseUploadType
                v-else
                class="edit-section__pict"
                @openModalType="openModalType2"
            />

            <MediaModal
                v-if="this.modalMedia2"
                :id=2
                :content="this.getPhoto.photo"
                :edit="this.edit"
                @openCroppModal2="openCroppModal2"
                @getPhotoEdit="getEditPhoto"
                @closeMediaModal="closeMediaModal2"
                @photoFromMedia="photoFromMedia"
                :sectionId="this.sectionId"
                :type="'vertical-photo'"
            />

            <ButtonType
                v-if="(this.getPhoto.photo || this.photoMedia) && this.active2"
                class="button-position-caption"
                @captionModal="captionModal2"
                :buttonType="buttonEdit.typeCaption"
            />

            <ButtonType
                v-if="(this.getPhoto.photo || this.photoMedia) && this.active2"
                class="button-position"
                @switchEditor="switchPanel2"
                :buttonType="buttonEdit.typeSwitch"
            />
          </div>
          <div class="edit-section__content-img">
            <CropperPhoto
                @closeModal="closeCroppModal3"
                @submit3="handleImageUpload3"
                @openMedia3="openChooseType3"
                @closeCropp="closeCropp"
                v-if="(this.getPhoto.photo || this.photoMedia) && this.croppModal3"
                :photoToCropp="this.getPhoto.photo"
                :aspectType="'verticalPhoto'"
                :id="3"
                :sectionId="this.sectionId"
                :typeSection="this.type"
                :mediaPhoto="this.photoMedia"
            />

            <EditPhotoCaption
                :id="3"
                :sectionId="this.sectionId"
                :typeSection="this.type"
                :editContent="this.editContent"
                @closeModal="closeModal"
                v-if="isModalActive3"
            />

            <PictureFigure
                v-if="this.active3 ?? this.getPhoto.photo ?? this.photoEdit.length > 0 ?? this.image3"
                :croppedPhoto3="this.image3.img"
                :picture-main="this.getPhoto.photo"
                :id="3"
            />

            <ChooseUploadType
                v-else
                class="edit-section__pict"
                @openModalType="openModalType3"
            />

            <MediaModal
                v-if="this.modalMedia3"
                :id=3
                :content="this.getPhoto.photo"
                :edit="this.edit"
                @openCroppModal3="openCroppModal3"
                @getPhotoEdit="getEditPhoto"
                @closeMediaModal="closeMediaModal3"
                @photoFromMedia="photoFromMedia"
                :sectionId="this.sectionId"
                :type="'vertical-photo'"
            />

            <ButtonType
                v-if="(this.getPhoto.photo || this.photoMedia) && this.active3"
                class="button-position-caption"
                @captionModal="captionModal3"
                :buttonType="buttonEdit.typeCaption"
            />

            <ButtonType
                v-if="(this.getPhoto.photo || this.photoMedia) && this.active3"
                class="button-position"
                @switchEditor="switchPanel3"
                :buttonType="buttonEdit.typeSwitch"
            />
          </div>

          <ButtonType
              class="handle button-move"
              :button-type="buttonEdit.typeMove"
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
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import EditMainTitle from "@/components/editPage/EditMainTitle";
import EditPictUpload from "@/components/base/EditPictUpload";
import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex";
import PictureFigure from "@/components/base/PictureFigure";
import EditSliderUpload from "@/components/base/EditSliderUpload";
import EditPhotoCaption from "@/components/base/EditPhotoCaption";
import CropperPhoto from "@/components/base/CropperPhoto";
import ChooseUploadTypeModal from "@/components/base/ChooseUploadTypeModal";
import ChooseUploadType from "@/components/base/ChooseUploadType";
import MediaModal from "@/components/base/MediaModal";

export default {
  name: "EditVerticalPhotoThree",
  components: {
    MediaModal,
    ChooseUploadType,
    ChooseUploadTypeModal,
    CropperPhoto,
    EditPhotoCaption, EditSliderUpload, PictureFigure, ButtonType, EditPictUpload, EditMainTitle
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
      active2: false,
      active3: false,
      photo: [],
      photoToCropp: [],
      modal: false,
      modal2: false,
      modal3: false,
      modalType: false,
      modalMedia: false,
      modalType2: false,
      modalMedia2: false,
      modalType3: false,
      modalMedia3: false,
      type: 'vertical-photo',
      croppModal: false,
      croppModal2: false,
      croppModal3: false,
      photoEdit: [],
      image1: '',
      image2: '',
      image3: '',
      photoMedia: null,
      edit: false,
    }
  },
  methods: {
    closeCropp() {
      this.croppModal = false
      this.croppModal2 = false
      this.croppModal3 = false
    },
    openChooseType() {
      this.modalMedia = true
      this.croppModal = false
      this.edit = true
    },
    openChooseType2() {
      this.modalMedia2 = true
      this.croppModal2 = false
      this.edit = true
    },
    openChooseType3() {
      this.modalMedia3 = true
      this.croppModal3 = false
      this.edit = true
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
    openModalType2() {
      this.modalMedia2 = true
    },
    closeModalType2() {
      this.modalType2 = false
    },
    closeMediaModal2() {
      this.modalMedia2 = false
    },
    openMediaModal2() {
      this.modalMedia2 = true
      this.croppModal2 = false
    },
    openModalType3() {
      this.modalMedia3 = true
    },
    closeModalType3() {
      this.modalType3 = false
    },
    closeMediaModal3() {
      this.modalMedia3 = false
    },
    openMediaModal3() {
      this.modalMedia3 = true
      this.croppModal3 = false
    },
    photoFromMedia(val, id) {
      this.modalMedia = false
      this.modalMedia2 = false
      this.modalMedia3 = false
      this.edit = false

      if (Object.keys(val).length > 0) {
        this.photoMedia = val
      }
      if (id === 1) {
        this.croppModal = true
      } else if (id === 2) {
        this.croppModal2 = true
      } else {
        this.croppModal3 = true
      }

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
        }
      }
    },
    handleImageUpload1(image) {
      this.image1 = image;
    },
    handleImageUpload2(image) {
      this.image2 = image;
    },
    handleImageUpload3(image) {
      this.image3 = image;
    },
    deleteSection() {
      this.$emit('deleteSection')
    },
    switchPanel() {
      this.croppModal = true
    },
    switchPanel2() {
      this.croppModal2 = true
    },
    switchPanel3() {
      this.croppModal3 = true
    },
    captionModal() {
      this.modal = !this.modal
      this.$store.dispatch('getModalActive', {active1: this.modal, id: this.sectionId, idx: 1})
    },
    captionModal2() {
      this.modal2 = !this.modal2
      this.$store.dispatch('getModalActive', {active2: this.modal2, id: this.sectionId, idx: 2})
    },
    captionModal3() {
      this.modal3 = !this.modal3
      this.$store.dispatch('getModalActive', {active3: this.modal3, id: this.sectionId, idx: 3})
    },
    closeModal() {
      this.modal = false
      this.$store.dispatch('getModalActive', this.modal)
    },
    closeCroppModal() {
      this.active = false
      this.photoEdit = []
      this.photoMedia = {}
      this.active = false
      this.croppModal = false
      this.modalMedia = false
    },
    openCroppModal() {
      this.croppModal = true
    },
    closeCroppModal2() {
      this.active2 = false
      this.photoEdit = []
      this.photoMedia = {}
      this.active2 = false
      this.croppModal2 = false
      this.modalMedia2 = false
    },
    openCroppModal2() {
      this.croppModal2 = true
    },
    closeCroppModal3() {
      this.active3 = false
      this.photoEdit = []
      this.photoMedia = {}
      this.active = false
      this.croppModal3 = false
      this.modalMedia3 = false
    },
    openCroppModal3() {
      this.croppModal3 = true
    },
    getEditPhoto(val) {
      this.photoEdit = val
      this.edit = false
    },
  },
  mounted() {
    this.getBiographyData.forEach((item) => {
      if (this.sectionId === item.id) {
        if (item.typeSection) {
          this.type = item.typeSection
          this.$store.dispatch('getTypeSection', {id: this.sectionId, type: item.typeSection})
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      getBiographyData: 'getBiographyData',
      returnModalActive: 'returnModalActive'
    }),
    isModalActive1() {
      let modal
      if (this.returnModalActive.id === this.sectionId) {
        modal = this.returnModalActive.active1
      }
      return modal
    },
    isModalActive2() {
      let modal
      if (this.returnModalActive.id === this.sectionId) {
        modal = this.returnModalActive.active2
      }
      return modal
    },
    isModalActive3() {
      let modal
      if (this.returnModalActive.id === this.sectionId) {
        modal = this.returnModalActive.active3
      }
      return modal
    },
    getPhoto() {
      if (this.photoEdit) {

      }
      if (this.image1 ?? this.image2 ?? this.image3) {

      }
      this.getBiographyData.forEach((item) => {
        if (this.sectionId === item.id) {
          this.type = 'vertical-photo'
          this.photo = item
        }
      })
      if (this.photo.photo) {
        this.photo.photo.forEach((item) => {
          if (item.idx === 1) {
            this.active = true
          }
          if (item.idx === 2) {
            this.active2 = true
          }
          if (item.idx === 3) {
            this.active3 = true
          }
        })
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

  &__content {
    display: flex;
    flex-direction: column;

    &-img {
      position: relative;
      width: 100%;
      margin-right: 15px;

      &:nth-child(3) {
        margin-right: 9px;
      }
    }

    &-items {
      display: flex;
    }

    &-overflow {
      padding: 11px;
      background: #FAFAFA;
      border-radius: 15px;
      position: relative;
      width: 100%;
      height: 100%;

      &-active {
        &::v-deep {
          .dropbox-height {
            min-height: unset !important;
          }
        }
      }
    }
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

::v-deep {
  .input-over {
    position: relative;
    bottom: 0;
    margin-top: 5px;
  }

  .biography-photo-back {
    max-height: 486px;
    margin-left: 0 !important;
    width: 100%;
    height: unset;

    &:after {
      max-width: unset;
    }
  }

  .photo-caption {
    right: 0;
  }

  .biography-photo {
    object-fit: cover;
    width: 100%;
  }

  .biography-photo__side {
    max-height: 478px;
    object-fit: cover;
  }

  .dropbox-height {
    max-height: 460px !important;
    //min-height: 460px !important;
    min-height: 24.3vw !important;
  }
}

@media (max-width: 1280px) {
  .edit-section {
    &-p {
      padding: 27px 36px 100px 40px;
    }
  }
  ::v-deep {
    .biography-photo-back {
      max-width: unset;
      max-height: 325px;
    }

    .biography-photo {
      max-height: 293px;
    }

    .dropbox-height {
      max-height: 293px !important;
      min-height: 22.4vw !important;
      //min-height: 293px !important;
    }
  }
  .button-position {
    &-caption {
      right: 65px;
    }
  }
}

@media (max-width: 1100px) {
  ::v-deep {
    .dropbox-height {
      max-height: 265px !important;
      //min-height: 293px !important;
      min-height: 21.3vw !important;
    }
  }
}

@media (max-width: 900px) {
  .edit-section {
    &-p {
      padding: 27px 36px 130px 40px;
    }
  }
}

@media (max-width: 767px) {
  .edit-section {
    &__content {
      &-img {
        width: 48%;
        margin-right: 15px;
        margin-bottom: 25px;

        &:nth-child(3) {
          margin-bottom: 0;
        }

        &:nth-child(2) {
          margin-right: 0;
          margin-bottom: 0;
        }
      }

      &-items {
        flex-wrap: wrap;
      }
    }
  }
  ::v-deep {
    //.dropbox-height {
    //    min-height: 293px;
    //}
    .biography-photo-back {
      max-height: 360px;
    }

    .biography-photo {
      max-height: 335px;
    }

    .dropbox-height {
      max-height: 330px !important;
      //min-height: 330px !important;
      min-height: 45vw !important;
    }
  }
}

@media (max-width: 575px) {
  .edit-section {
    &__content {
      &-img {
        width: 48%;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
}

@media (max-width: 480px) {
  .edit-section {
    &__content {
      &-img {
        width: 100%;
        margin-right: 0;
        margin-bottom: 25px;

        &:nth-child(2) {
          margin-bottom: 25px;
        }
        &:nth-child(3) {
          margin-right: 0;
        }
      }
    }
  }
  ::v-deep {
    .biography-photo-back {
      max-height: 360px;
    }

    .biography-photo {
      max-height: 335px;
    }

    .dropbox-height {
      max-height: 335px !important;
    }
  }
}
</style>
