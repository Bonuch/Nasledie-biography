<template>
    <div>
        <div class="form-input" >
            <button @click="openModalType" class="dropbox dropbox-height">
                <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M5.91675 17.7493C5.91675 16.1155 7.24124 14.791 8.87508 14.791H62.1251C63.7589 14.791 65.0834 16.1155 65.0834 17.7493V47.3327C65.0834 52.2342 61.1099 56.2077 56.2084 56.2077H14.7917C9.89022 56.2077 5.91675 52.2342 5.91675 47.3327V17.7493ZM11.8334 20.7077V47.3327C11.8334 48.9665 13.1579 50.291 14.7917 50.291H56.2084C57.8423 50.291 59.1668 48.9665 59.1668 47.3327V20.7077H11.8334Z"
                          fill="#B7BDCE"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M35.5001 29.5827C32.2324 29.5827 29.5834 32.2317 29.5834 35.4993C29.5834 38.767 32.2324 41.416 35.5001 41.416C38.7678 41.416 41.4167 38.767 41.4167 35.4993C41.4167 32.2317 38.7678 29.5827 35.5001 29.5827ZM23.6667 35.4993C23.6667 28.964 28.9647 23.666 35.5001 23.666C42.0354 23.666 47.3334 28.964 47.3334 35.4993C47.3334 42.0347 42.0354 47.3327 35.5001 47.3327C28.9647 47.3327 23.6667 42.0347 23.6667 35.4993Z"
                          fill="#B7BDCE"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M53.25 8.87435C53.25 10.5082 51.9255 11.8327 50.2917 11.8327L47.3333 11.8327C45.6995 11.8327 44.375 10.5082 44.375 8.87435C44.375 7.24051 45.6995 5.91602 47.3333 5.91602L50.2917 5.91602C51.9255 5.91602 53.25 7.24051 53.25 8.87435Z"
                          fill="#B7BDCE"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChooseUploadType",
    methods: {
        openModalType() {
            this.$emit('openModalType', true)
        },

    }
}
</script>

<style scoped lang="scss">
.dropbox {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $white-grey;
    border: 1px solid #B7BDCE;
    border-radius: 15px;
    outline-offset: -10px;
    color: dimgray;
    width: 100%;
    height: 100%;
    //min-height: 293px;
    position: relative;
    cursor: pointer;

    & svg {
        path {
            transition: .3s;
        }
    }

    &:hover {
        svg {
            path {
                transition: .3s;
                fill: $green;
            }
        }
    }
}

.input-file {
    visibility: visible;
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 100%;
    //height: 293px;
    position: absolute;
    cursor: pointer;
}

.input {
    position: relative;
    background-color: $white-grey;
    padding: 8px 5px;
    z-index: 2;
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
}
</style>
