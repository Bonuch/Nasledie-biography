<template>
    <div class="popup-request" v-click-outside="closePopup">
      <svg class="popup-request__icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9998 1.625C5.82169 1.625 1.62476 5.82193 1.62476 11C1.62476 16.1781 5.82169 20.375 10.9998 20.375C16.1778 20.375 20.3748 16.1781 20.3748 11C20.3748 10.5286 20.34 10.0658 20.2731 9.61373C20.2225 9.27227 20.4583 8.95447 20.7998 8.90391C21.1412 8.85334 21.459 9.08914 21.5096 9.4306C21.5855 9.94306 21.6248 10.4671 21.6248 11C21.6248 16.8684 16.8682 21.625 10.9998 21.625C5.13133 21.625 0.374756 16.8684 0.374756 11C0.374756 5.13158 5.13133 0.375 10.9998 0.375C12.7011 0.375 14.3106 0.775234 15.7377 1.48727C16.0466 1.64137 16.1721 2.01669 16.018 2.32556C15.8638 2.63442 15.4885 2.75989 15.1797 2.60578C13.922 1.97828 12.5031 1.625 10.9998 1.625Z" fill="#326E5B"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8727 3.41157C21.1168 3.65565 21.1168 4.05138 20.8727 4.29546L11.706 13.4621C11.4619 13.7062 11.0662 13.7062 10.8221 13.4621L6.65547 9.29546C6.41139 9.05138 6.41139 8.65565 6.65547 8.41157C6.89955 8.1675 7.29528 8.1675 7.53935 8.41157L11.2641 12.1363L19.9888 3.41157C20.2329 3.1675 20.6286 3.1675 20.8727 3.41157Z" fill="#326E5B"/>
      </svg>

      <p>Изменения успешно сохранены</p>

      <ButtonType class="popup-request__close" @exitPopup="closePopup" :buttonType="buttonType"/>

    </div>
</template>

<script>
import ButtonType from "@/components/base/ButtonType";
export default {
    name: "PopupRequestStatusOk",
    components: {ButtonType},
    data() {
        return {
            buttonType: 'exitPopup'
        }
    },
    methods: {
        closePopup() {
            this.$store.dispatch('getRequestStatus', false)
        }
    }
}
</script>

<style scoped lang="scss">
.popup-request {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding: 17px 14px 17px 17px;

    &__icon {
        margin-right: 7px;
    }

    & p {
        font-family: $font-nova;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: $green;
        white-space: nowrap;
        margin-bottom: 0;
    }

    &__close {
        margin-left: 24px;
    }
}
</style>
