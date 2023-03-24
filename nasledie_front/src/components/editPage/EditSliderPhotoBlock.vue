<template>
    <div class="" v-if="sliderContent" v-click-outside="closeModal">
        <PictureFigure
            :count="count"
            :picture-slider="sliderContent"
        />
        <EditPhotoCaption
            v-if="this.modal"
            :sectionId="this.sectionId"
            :typeSection="'slider'"
            :editContent="this.editContent"
            :idxs="sliderContent.idxs"
            @closeModal="closeModal"
        />
        <ButtonType
            class="button-position-caption"
            @captionModal="captionModal"
            :buttonType="buttonEdit.typeCaption"
        />

        <ButtonType
            class="button-position"
            @switchEditor="switchPanel"
            :buttonType="buttonEdit.typeSwitch"
        />
    </div>
</template>

<script>
/* eslint-disable */
import EditPhotoCaption from "@/components/base/EditPhotoCaption";
import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex";
import PictureFigure from "@/components/base/PictureFigure";

export default {
    name: "EditSliderPhotoBlock",
    components: {PictureFigure, ButtonType, EditPhotoCaption},
    props: {
        sliderContent: {
            // type: Object,
            required: false,
        },
        sectionId: {
            type: Number,
        },
        editContent: {
            type: Object,
            required: false
        },
        count: {
            type: Number,
            required: false
        },
    },
    data() {
        return {
            buttonEdit: {
                typeSwitch: 'edit',
                typeCaption: 'caption',
            },
            modal: false,
        }
    },
    methods: {
        closeModal() {
            this.modal = false
        },
        switchPanel() {
            this.$emit('switchPanel', this.sliderContent.idxs)
        },
        captionModal() {
            this.modal = !this.modal
        },
    },
}
</script>

<style scoped lang="scss">
.edit-section {
    &__content {
        &-overflow {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            max-height: 175px;
            object-fit: cover;
            position: relative;
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
    .biography-photo {
        width: 100%;
    }
    .biography-photo-back {
        margin-left: 0;
    }
    .photo-caption {
        right: 0;
    }
}
@media (max-width: 1280px) {
    .button-position {
        &-caption {
            right: 65px;
        }
    }
}
@media(max-width: 620px) {
    ::v-deep {
        .biography-photo-back {
          margin-left: 0px;
            max-width: unset;
            &:after {
                max-width: unset;
            }
        }
    }
}
</style>
