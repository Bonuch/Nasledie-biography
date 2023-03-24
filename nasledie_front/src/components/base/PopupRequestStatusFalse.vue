<template>
    <div class="popup-request" v-click-outside="closePopup">
        <svg class="popup-request__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2730_80008)">
                <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433286 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 7.34783 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0V0ZM10 18.3333C8.35183 18.3333 6.74066 17.8446 5.37025 16.9289C3.99984 16.0132 2.93174 14.7117 2.30101 13.189C1.67028 11.6663 1.50525 9.99075 1.82679 8.37425C2.14834 6.75774 2.94201 5.27288 4.10745 4.10744C5.27288 2.94201 6.75774 2.14833 8.37425 1.82679C9.99076 1.50525 11.6663 1.67027 13.189 2.301C14.7117 2.93173 16.0132 3.99984 16.9289 5.37025C17.8446 6.74066 18.3333 8.35182 18.3333 10C18.3333 11.0943 18.1178 12.178 17.699 13.189C17.2802 14.2001 16.6664 15.1187 15.8926 15.8926C15.1187 16.6664 14.2001 17.2802 13.189 17.699C12.178 18.1178 11.0944 18.3333 10 18.3333V18.3333Z" fill="#D73F35"/>
                <path d="M10 12C9.73478 12 9.48043 11.8726 9.29289 11.6458C9.10536 11.419 9 11.1114 9 10.7907V5.2093C9 4.88858 9.10536 4.58098 9.29289 4.3542C9.48043 4.12741 9.73478 4 10 4C10.2652 4 10.5196 4.12741 10.7071 4.3542C10.8946 4.58098 11 4.88858 11 5.2093V10.7907C11 11.1114 10.8946 11.419 10.7071 11.6458C10.5196 11.8726 10.2652 12 10 12Z" fill="#D73F35"/>
                <path d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="#D73F35"/>
            </g>
            <defs>
                <clipPath id="clip0_2730_80008">
                    <rect width="20" height="20" fill="white"/>
                </clipPath>
            </defs>
        </svg>

        <p>При сохранении произошла ошибка</p>

        <ButtonType class="popup-request__close" @exitPopup="closePopup" :buttonType="buttonType"/>
    </div>
</template>

<script>
import ButtonType from "@/components/base/ButtonType";
export default {
    name: "PopupRequestStatusFalse",
    components: {ButtonType},
    data() {
        return {
            buttonType: 'exitPopup'
        }
    },
    methods: {
        closePopup() {
            this.$store.dispatch('getRequestStatusError', false)
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
        color: #D73F35;
        white-space: nowrap;
        margin-bottom: 0;
    }

    &__close {
        margin-left: 24px;
    }
}
</style>
