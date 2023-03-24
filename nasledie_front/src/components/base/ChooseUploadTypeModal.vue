<template>
  <div class="add_image_action add_image_action--active" v-click-outside="closeModalType">
    <label>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 15H4V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8M2 18H14"
            stroke="#B7BDCE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
            d="M18 17H18.01M14 9.2C14 8.537 14.597 8 15.333 8H20.667C21.403 8 22 8.537 22 9.2V18.8C22 19.463 21.403 20 20.667 20H15.333C14.597 20 14 19.463 14 18.8V9.2Z"
            stroke="#B7BDCE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>

      <span>Загрузить с устройства</span>
      <EditSliderUpload
          v-if="sliderUpload"
          @getPhotoEdit="getPhotoEdit"
          @getPhotoEditIdx="getEditPhotoIdxs"
          @sendPost="openCroppModal"
          :sectionId="this.sectionId"
          :editContent="this.content"
          :idxsFromDownload="this.idxsFromCropp"
          :idxsNow="this.idxsNow"
          :type="'slider'"
      />

      <EditPictUpload
          v-else
          :id="this.id"
          @sendPost="openCroppModal"
          @getPhotoEdit="getPhotoEdit"
          :content="this.content"
          :sectionId="this.sectionId"
          class="edit-section__pict"
      />

    </label>
    <label @click="openMediaModal">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.82822 18.75H13.7161V21H6.82822C5.23871 21 3.85053 20.4375 2.70608 19.2337C1.57223 18.0525 1 16.6012 1 14.9025C1 13.44 1.41327 12.135 2.23982 10.9875C3.06637 9.84 4.17903 9.10875 5.50363 8.79375C5.94869 7.0725 6.82822 5.6775 8.15282 4.60875C9.47741 3.54 10.9822 3 12.6564 3C14.7228 3 16.4713 3.765 17.9124 5.295C19.0993 6.555 19.7881 8.0625 20 9.75C19.2582 9.75 18.5482 9.96375 17.9018 10.2675C17.7977 8.98967 17.2679 7.79309 16.4077 6.8925C15.3692 5.8125 14.1188 5.25 12.6564 5.25C11.1941 5.25 9.94367 5.8125 8.90519 6.8925C7.8879 7.995 7.35806 9.3225 7.35806 10.875H6.82822C5.80033 10.875 4.9314 11.2575 4.21082 12.0337C3.47964 12.7987 3.11935 13.7212 3.11935 14.8125C3.11935 15.9038 3.47964 16.8263 4.21082 17.625C4.9314 18.3675 5.80033 18.75 6.82822 18.75Z"
            fill="#B7BDCE"></path>
        <path
            d="M19.5053 12C19.8581 12.0037 20.2095 12.0429 20.5536 12.1168C20.627 12.1325 20.6933 12.1698 20.7435 12.2235C20.7937 12.2772 20.8251 12.3446 20.8334 12.4163L20.9151 13.1211C20.9266 13.2205 20.9623 13.316 21.0193 13.3997C21.0762 13.4835 21.1529 13.5533 21.243 13.6034C21.3332 13.6535 21.4344 13.6826 21.5384 13.6883C21.6424 13.694 21.7463 13.6761 21.8419 13.6362L22.5148 13.3524C22.5832 13.3234 22.6592 13.3156 22.7324 13.33C22.8056 13.3444 22.8724 13.3803 22.9234 13.4327C23.4098 13.9317 23.772 14.5301 23.9828 15.1829C24.0049 15.2515 24.0043 15.325 23.9809 15.3932C23.9576 15.4614 23.9127 15.521 23.8525 15.5637L23.2555 15.9864C23.1715 16.0456 23.1032 16.123 23.0561 16.2123C23.0091 16.3015 22.9846 16.4002 22.9846 16.5003C22.9847 16.6003 23.0093 16.699 23.0564 16.7882C23.1036 16.8774 23.172 16.9547 23.256 17.0139L23.8535 17.4362C23.9138 17.4789 23.9587 17.5385 23.982 17.6068C24.0054 17.6752 24.006 17.7488 23.9838 17.8174C23.773 18.4702 23.411 19.0686 22.9248 19.5676C22.8739 19.62 22.8073 19.6559 22.7342 19.6704C22.6611 19.6848 22.5851 19.6772 22.5167 19.6484L21.8409 19.3636C21.7455 19.3234 21.6416 19.3053 21.5376 19.3108C21.4335 19.3163 21.3323 19.3453 21.2421 19.3953C21.1519 19.4454 21.0752 19.5152 21.0183 19.599C20.9614 19.6828 20.9259 19.7783 20.9146 19.8778L20.8334 20.5821C20.8252 20.6531 20.7944 20.7198 20.7452 20.7733C20.696 20.8267 20.6307 20.8643 20.5585 20.8808C19.8624 21.0397 19.1372 21.0397 18.4411 20.8808C18.3688 20.8643 18.3036 20.8267 18.2543 20.7733C18.2051 20.7198 18.1743 20.6531 18.1661 20.5821L18.0844 19.8787C18.0726 19.7797 18.0367 19.6847 17.9798 19.6014C17.9228 19.518 17.8463 19.4487 17.7564 19.3989C17.6665 19.3491 17.5656 19.3202 17.462 19.3145C17.3584 19.3089 17.2548 19.3267 17.1596 19.3664L16.4833 19.6507C16.4149 19.6795 16.3389 19.6871 16.2658 19.6727C16.1927 19.6582 16.1261 19.6223 16.0752 19.5699C15.5887 19.0703 15.2267 18.4713 15.0162 17.8179C14.994 17.7492 14.9946 17.6756 15.018 17.6073C15.0413 17.539 15.0862 17.4793 15.1465 17.4366L15.7445 17.0139C15.8285 16.9547 15.8968 16.8774 15.944 16.7881C15.9911 16.6989 16.0156 16.6002 16.0156 16.5002C16.0156 16.4001 15.9911 16.3014 15.944 16.2122C15.8968 16.1229 15.8285 16.0456 15.7445 15.9864L15.147 15.5646C15.0866 15.522 15.0416 15.4623 15.0182 15.394C14.9947 15.3257 14.9941 15.2521 15.0162 15.1833C15.2272 14.5305 15.5895 13.9321 16.0761 13.4331C16.1271 13.3808 16.1938 13.345 16.2669 13.3306C16.34 13.3163 16.4159 13.324 16.4842 13.3528L17.1572 13.6367C17.2528 13.6765 17.3569 13.6942 17.461 13.6884C17.5651 13.6826 17.6663 13.6534 17.7565 13.6033C17.8467 13.5531 17.9234 13.4833 17.9805 13.3995C18.0375 13.3156 18.0733 13.2201 18.0849 13.1207L18.1666 12.4163C18.1748 12.3445 18.2063 12.2769 18.2566 12.2231C18.3068 12.1693 18.3734 12.132 18.4468 12.1163C18.792 12.0429 19.1438 12.0042 19.5053 12ZM19.499 15.1155C19.1166 15.1155 18.7498 15.2614 18.4794 15.521C18.2089 15.7807 18.057 16.1329 18.057 16.5002C18.057 16.8674 18.2089 17.2196 18.4794 17.4793C18.7498 17.7389 19.1166 17.8848 19.499 17.8848C19.8815 17.8848 20.2483 17.7389 20.5187 17.4793C20.7891 17.2196 20.9411 16.8674 20.9411 16.5002C20.9411 16.1329 20.7891 15.7807 20.5187 15.521C20.2483 15.2614 19.8815 15.1155 19.499 15.1155Z"
            fill="#B7BDCE"></path>
      </svg>

      <span>Загрузить с файлопотока</span>
    </label>
  </div>
</template>

<script>
/* eslint-disable */
import EditPictUpload from "@/components/base/EditPictUpload";
import EditSliderUpload from "@/components/base/EditSliderUpload";

export default {
  name: "ChooseUploadTypeModal",
  components: {EditSliderUpload, EditPictUpload},
  props: {
    sectionId: {
      type: Number,
      required: false,
    },
    id: {
      type: Number,
      required: false,
    },
    idxs: {
      type: Number,
      required: false,
    },
    idxsNow: {
      type: Number,
      required: false,
    },
    idxsFromCropp: {
      type: Number,
      required: false,
    },
    content: {
      required: false,
    },
    sliderUpload: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    getEditPhotoIdxs(val) {
      this.$emit('getEditPhotoIdxs', val)
    },
    getPhotoEdit(val) {
      this.$emit('getPhotoEdit', val)
    },
    openCroppModal() {
      if (this.id === 1) {
        this.$emit('openCroppModal1')
      } else if (this.id === 2) {
        this.$emit('openCroppModal2')
      } else if (this.id === 3) {
        this.$emit('openCroppModal3')
      } else {
        this.$emit('openCroppModal')
      }

    },
    closeModalType() {
      this.$emit('closeModalType', false)
    },
    openMediaModal() {
      this.$emit('openMediaModal', true)
    },
  }
}
</script>

<style scoped lang="scss">
.add_image_action {
  flex-direction: column;
  gap: 15px;
  background: #FFFFFF;
  border-radius: 25px;
  padding: 20px 15px;
  transition: 0.3s;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  z-index: 30;

  & label {
    display: flex;
    flex-direction: row;
    gap: 20px;
    border: none;
    cursor: pointer;
    align-items: center;
    font-family: $font-nova;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #444444;
    transition: 0.3s;
  }
}

.add_image_action input[type="file"] {
  display: none;
}
</style>
