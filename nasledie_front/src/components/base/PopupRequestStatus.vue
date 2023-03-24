<template>
    <div class="popup-request-container">
        <PopupRequestStatusOk v-if="returnStatusActive"/>

        <PopupRequestStatusFalse v-if="returnStatusActiveError"/>
    </div>
</template>

<script>
import PopupRequestStatusOk from "@/components/base/PopupRequestStatusOk";
import PopupRequestStatusFalse from "@/components/base/PopupRequestStatusFalse";
import {mapGetters} from "vuex";

export default {
    name: "PopupRequestStatus",
    components: {PopupRequestStatusFalse, PopupRequestStatusOk},
    computed: {
        ...mapGetters({
            returnStatusActive: 'returnStatusActive',
            returnStatusActiveError: 'returnStatusActiveError'
        })
    }
}
</script>

<style scoped lang="scss">
.popup-request-container {
    padding-top: 50px;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
}
@media (max-width: 480px) {
  .popup-request-container {
    right: -10px;
  }
  .popup-request {
    font-size: 12px;
    padding: 10px 5px 10px 5px;
  }
  .popup-request__close {
    margin-left: 10px;
  }
  .popup-request__icon {
    width: 14px;
    height: 14px;
  }
}
</style>
