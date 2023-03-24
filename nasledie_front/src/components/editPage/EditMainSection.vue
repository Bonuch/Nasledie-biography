<template>
  <div class="biography-about" :data-id="this.sectionId">
    <CropperPhoto
        @closeModal="closeCroppModal"
        @submit="handleImageUpload"
        @openMedia="openChooseType"
        @closeCropp="closeCropp"
        v-if="(this.isGettingData || this.photoMedia) && this.croppModal"
        :photoToCropp="this.isGettingData"
        :aspectType="'verticalPhoto'"
        :sectionId="this.sectionId"
        :typeSection="'main-section'"
        :mediaPhoto="this.photoMedia"
    />
    <div class="biography-about__content">
      <EditPhotoCaption
          :sectionId="this.sectionId"
          :editContentMain="this.isGettingData"
          @closeModal="closeModal"
          v-if="this.isGettingData && isModalActive"
      />
      <div class="edit-section__content-img">
        <PictureFigure
            v-if="this.isGettingData ?? this.photoEdit.length > 0 ?? this.image"
            :croppedPhoto="this.image"
            :pictureMainSection="this.isGettingData[0]"
        />

        <ChooseUploadType
            v-else
            class="edit-section__pict"
            @openModalType="openModalType"
        />

        <MediaModal
            @openCroppModal="openCroppModal"
            @getPhotoEdit="getEditPhoto"
            v-if="this.modalMedia"
            @closeMediaModal="closeMediaModal"
            @photoFromMedia="photoFromMedia"
            :sectionId="this.sectionId"
            :type="'main-section'"
        />

        <ButtonType
            v-if="this.isGettingData"
            class="button-position-caption"
            @captionModal="captionModal"
            :buttonType="buttonEdit.typeCaption"
        />

        <ButtonType
            v-if="this.isGettingData"
            class="button-position"
            @switchEditor="switchPanel"
            :buttonType="buttonEdit.typeSwitch"
        />
      </div>

      <div class="biography-about__content-block" v-if="returnMainBiography">
        <div class="biography-about__content-top">
          <EditMainTitle
              :placeholder="'Введите ФИО'"
              :button-type-title="buttonEdit.typeEdit"
              :sectionId="this.sectionId"
              :editContentMain="this.editContent"
          />
        </div>
        <div class="biography-about__content-bottom">
          <EditMainText
              :button-type-text="buttonEdit.typeEdit"
              :sectionId="this.sectionId"
              :type="'text'"
              :editContent="this.editContent"
          />
        </div>
      </div>


    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ButtonType from "@/components/base/ButtonType";
import EditMainTitle from "@/components/editPage/EditMainTitle";
import EditMainText from "@/components/editPage/EditMainText";
import PictureFigure from "@/components/base/PictureFigure";
import {mapGetters} from "vuex";
import EditPhotoCaption from "@/components/base/EditPhotoCaption";
import CropperPhoto from "@/components/base/CropperPhoto";
import ChooseUploadType from "@/components/base/ChooseUploadType";
import MediaModal from "@/components/base/MediaModal";

export default {
  name: "EditMainSection",
  components: {
    MediaModal,
    ChooseUploadType,
    CropperPhoto,
    EditPhotoCaption,
    PictureFigure,
    EditMainText,
    EditMainTitle,
    ButtonType
  },
  props: {
    editContent: {
      // type: Object,
      require: true
    }
  },
  data() {
    return {
      buttonEdit: {
        typeEdit: 'editContent',
        typeSwitch: 'edit',
        typeCaption: 'caption',
      },
      sectionId: 0,
      modal: false,
      modalMedia: false,
      croppModal: false,
      image: '',
      photoEdit: [],
      photo: {},
      contentText: null,
      contentText1: null,
      photoMedia: null,
    }
  },
  created() {
    this.$store.dispatch('getMergeMainArray')
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
    handleImageUpload(image) {
      this.image = image;
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
      this.$store.dispatch('getMergeMainArray')
    },
    openCroppModal() {
      this.croppModal = true
    },
    getEditPhoto(val) {
      this.photoEdit = val
    },
  },
  computed: {
    ...mapGetters({
      getBiographyMainData: 'getBiographyMainData',
      returnModalActive: 'returnModalActive',
      returnMainSection: 'returnMainSection',
      returnMainBiography: 'returnMainBiography'
    }),
    isGettingData() {
      if (this.photoEdit) {
      }
      if (this.image) {
      }
      if (this.getBiographyMainData) {
        return this.getBiographyMainData[0].mainPhoto
      }
      return this.editContent.mainPhoto
    },
    isModalActive() {
      let modal
      if (this.returnModalActive.id === this.sectionId) {
        modal = this.returnModalActive.active
      }
      return modal
    },
  },
}
</script>

<style scoped lang="scss">
.biography-about {
  position: relative;
  margin-bottom: 35px;
  border: 1px solid #F0F4F7;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 47px 36px 23px 40px;
  background-color: $white;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 55px;
    left: 50%;
    transform: translate(-50%, -56%);
    width: 100%;
    max-width: 1260px;
    height: 90px;
    background: rgba(183, 189, 206, .2);
    border-radius: 15px;
    z-index: 1;
    pointer-events: none;
    margin: 20px auto 0;
  }

  &__content {
    display: flex;
    position: relative;
    max-width: 1260px;
    margin: 0 auto;

    &-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    &-top {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

    }

    &-bottom {
      width: 100%;
      margin-top: 25px;
      position: relative;
    }
  }

  &__img {
    width: 100%;

    border-radius: 15px;
    position: relative;
    object-fit: cover;
    z-index: 2;

    &::v-deep {
      .input {
        position: relative;
        margin-top: 3px;
      }

      .input-under {
        margin-bottom: 10px;
      }

      .input-over {
        bottom: 0;
      }
    }

  }
}

.edit-section__content-img {
  position: relative;
  margin-right: 34px;
  width: 46%;
}

.input__date {
  &::v-deep {
    .edit-text__content {
      min-height: 37px;
    }

    .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
      min-height: 37px;
    }

    .ck.ck-editor__editable.ck-focused {
      min-height: 37px;
    }

    .button-position {
      .buttons {
        transform: translate(0, 25%);
        top: 15%;
      }
    }

    .edit-text__top-label {
      border-radius: 15px;
      background: $white-grey;
      padding: 10px 27px 9px 21px;
      min-height: 37px;
    }

    .edit-text__label {
      margin-bottom: 7px;
    }

    .edit-text__content {
      padding: 0;
      min-height: unset;
    }
  }
}

::v-deep {
  .biography-photo-back {
    margin-left: 0 !important;
    height: unset !important;
  }

  .biography-photo__side {
    max-height: 465px;
    object-fit: cover;
  }

  .dropbox-height {
    min-height: 380px;
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

@media (max-width: 1375px) {
  .biography-about {
    &:before {
      width: 92%;
    }
  }
}

@media (max-width: 990px) {
  ::v-deep {
    .dropbox-height {
      min-height: 300px;
    }
  }
}

@media(max-width: 767px) {
  .biography-about {
    padding: 27px 18px 36px 19px;

    &:before {
      display: none;
    }

    &__content {
      flex-direction: column;

      &-top {
        position: relative;

        &:before {
          content: "";
          position: absolute;
          left: 0;
          background: rgba(183, 189, 206, 0.2);
          border-radius: 15px;
          z-index: 1;
          pointer-events: none;
          top: -60px;
          min-height: 100%;
          height: 100%;
          //width: 100%;
          padding-top: 70px;
        }
      }

      &-block {
        margin-top: 18px;
        margin-left: 0;
      }

      &-bottom {
        margin-top: 40px;
      }
    }
  }
  .input__date {
    margin-bottom: 26px;
  }
}

@media (max-width: 600px) {
  .edit-section__content-img {
    width: 91%;
    max-width: 280px;
  }
}
</style>
