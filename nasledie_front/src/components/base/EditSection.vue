<template>
    <div class="">
        <div class="edit-section__container" :data-id="this.elId" v-if="this.section === false">

            <ButtonType
                class="button-delete"
                :button-type="buttonEdit.typeDelete"
                @delete="deleteSection"
            />

            <div class="edit-section__top">
                <h3 class="edit-section__title">Добавить секцию</h3>
                <div class="edit-section__prompt">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.29979 3C8.11408 3 7.93598 3.079 7.80467 3.21961C7.67335 3.36022 7.59958 3.55094 7.59958 3.7498C7.59958 3.94865 7.67335 4.13937 7.80467 4.27998C7.93598 4.42059 8.11408 4.49959 8.29979 4.49959C8.4855 4.49959 8.6636 4.42059 8.79491 4.27998C8.92623 4.13937 9 3.94865 9 3.7498C9 3.55094 8.92623 3.36022 8.79491 3.21961C8.6636 3.079 8.4855 3 8.29979 3ZM8.13174 5.38435C7.57624 5.43434 6.05912 6.72898 6.05912 6.72898C5.96576 6.80396 5.99376 6.79896 6.06845 6.93892C6.14314 7.07389 6.13381 7.08388 6.2225 7.0189C6.31586 6.95392 6.46991 6.84895 6.72665 6.67899C7.71628 5.99918 6.88537 7.56875 6.46057 10.213C6.29252 11.5227 7.39418 10.8479 7.67894 10.6479C7.95902 10.453 8.71058 9.89812 8.78527 9.84313C8.88797 9.76815 8.81328 9.70817 8.73392 9.5832C8.6779 9.49823 8.62189 9.55821 8.62189 9.55821C8.31846 9.77315 7.76296 10.223 7.68827 9.9381C7.59958 9.65318 8.16908 7.69872 8.48184 6.35408C8.53319 6.03417 8.67324 5.33436 8.13174 5.38435Z"
                            fill="#B7BDCE"/>
                        <circle cx="7.5" cy="7.5" r="7" stroke="#B7BDCE"/>
                    </svg>
                </div>
            </div>
            <h4 class="edit-section__subtitle">Выберите тип секции</h4>
            <div class="edit-section__block">
                <button
                    class="edit-section__block-btn"
                    v-for="(item, indexIdx) in svgItems"
                    :key="indexIdx"
                >
                    <figure
                        @click.prevent="chooseSection(indexIdx)"
                        class="edit-section__block-figure"
                    >
                        <img :src="item.img" :alt="item.description" draggable="false" class="edit-section__block-img">
                        <figcaption class="edit-section__block-desc">{{ item.description }}</figcaption>
                    </figure>
                </button>
            </div>
        </div>


        <EditTextSection
            @deleteSection="deleteSection"
            v-if="this.section && this.index === 0"
            :sectionId="this.elId"
            :editContent="this.editContent"
        />

        <EditPictLeftSection
            @deleteSection="deleteSection"
            v-if="this.section && this.index === 1"
            :sectionId="this.elId"
            :editContent="this.editContent"
        />

        <EditPictRightSection
            @deleteSection="deleteSection"
            v-if="this.section && this.index === 2"
            :sectionId="this.elId"
            :editContent="this.editContent"
        />

        <EditSplitLine
            @deleteSection="deleteSection"
            v-if="this.section && this.index === 3"
            :sectionId="this.elId"
            :editContent="this.editContent"
        />

        <EditVerticalPhotoThree
            @deleteSection="deleteSection"
            v-if="this.section && this.index === 4"
            :sectionId="this.elId"
            :editContent="this.editContent"
        />

        <EditHorizontalPhotoSection
            @deleteSection="deleteSection"
            v-if="this.section && this.index === 5"
            :sectionId="this.elId"
            :editContent="this.editContent"
        />

        <EditHorizontalPhotoOne
            @deleteSection="deleteSection"
            v-if="this.section && this.index === 6"
            :sectionId="this.elId"
            :editContent="this.editContent"
        />

        <EditSliderPhoto
            @deleteSection="deleteSection"
            v-if="this.section && this.index === 7"
            :sectionId="this.elId"
            :editContent="this.editContent"
        />

    </div>

</template>

<script>
/* eslint-disable */
import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex";

export default {
    name: "EditSection",
    components: {
        EditSplitLine: () => import('@/components/base/EditSplitLine'),
        EditTextSection: () => import('@/components/editPage/EditTextSection'),
        EditPictLeftSection: () => import('@/components/editPage/EditPictLeftSection'),
        EditPictRightSection: () => import('@/components/editPage/EditPictRightSection'),
        EditVerticalPhotoThree: () => import('@/components/editPage/EditVerticalPhotoThree'),
        EditHorizontalPhotoSection: () => import('@/components/editPage/EditHorizontalPhotoSection'),
        EditHorizontalPhotoOne: () => import('@/components/editPage/EditHorizontalPhotoOne'),
        EditSliderPhoto: () => import('@/components/editPage/EditSliderPhoto'),
        ButtonType
    },
    props: {
        elId: {
            type: Number,
            require: true,
        },
        editContent: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            svgItems: [
                {
                    img: require('../../assets/img/edit-svg/text.svg'),
                    description: 'Текст',
                },
                {
                    img: require('../../assets/img/edit-svg/photo-left.svg'),
                    description: 'Картинка слева',
                },
                {
                    img: require('../../assets/img/edit-svg/photo-right.svg'),
                    description: 'Картинка справа',
                },
                {
                    img: require('../../assets/img/edit-svg/spliter.svg'),
                    description: 'Разделитель',
                },
                {
                    img: require('../../assets/img/edit-svg/3-photo.svg'),
                    description: '3 вертикальных фото',
                },
                {
                    img: require('../../assets/img/edit-svg/2-photo.svg'),
                    description: '2 горизонтальных фото',
                },
                {
                    img: require('../../assets/img/edit-svg/1-photo.svg'),
                    description: '1 горизонтальное фото',
                },
                {
                    img: require('../../assets/img/edit-svg/slider.svg'),
                    description: 'Слайдер',
                },

            ],
            buttonEdit: {
                typeDelete: 'delete',
            },
            sectionItems: [
                {
                    id: 0,
                    name: 'text'
                },
                {
                    id: 1,
                    name: 'pict-left'
                },
                {
                    id: 2,
                    name: 'pict-right'
                },
                {
                    id: 3,
                    name: 'line'
                },
                {
                    id: 4,
                    name: 'vertical-photo'
                },
                {
                    id: 5,
                    name: 'horizontal-photo'
                },
                {
                    id: 6,
                    name: 'horizontal-photo-one'
                },
                {
                    id: 7,
                    name: 'slider'
                },
            ],
            section: false,
            index: null,
            id: 1,
            typeSection: {}
        }
    },
    mounted() {
        if (this.editContent.typeSection) {
            this.sectionItems.forEach((item) => {
                if (item.name === this.editContent.typeSection) {
                    let id = item.id
                    this.$nextTick(() => {
                        this.getInfoIdx.slice(-1).forEach((item) => {
                            this.id = item
                            this.section = true;
                            this.index = id;
                        })
                    })
                }
            })
        }
    },
    computed: {
        ...mapGetters({getInfoIdx: 'getInfoIdx'}),
    },
    methods: {
        deleteSection() {
            this.$emit("deleteSection")
            this.index = null;
            this.section = false;
        },
        chooseSection(index) {
            this.id = Math.max.apply(null, this.getInfoIdx)

            this.sectionItems.forEach((item) => {
                if (item.id === index) {
                    this.section = true;
                    this.index = item.id;
                    this.typeSection = item.name
                    this.$store.dispatch('getTypeSection', {id: this.id, type: item.name})
                }
                if(item.id === 3) {
                  this.$store.dispatch('getMergedArrays')
                }
            })
        },
    },
}
</script>

<style scoped lang="scss">
.edit-section {
    &__container {
        max-width: 1260px;
        margin: 0 auto;
        padding: 41px 36px 42px;
        border: 1px solid $silver;
        border-radius: 15px;
        background: $white-grey;
        position: relative;
    }

    &__top {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    &__title {
        font-family: $font-serif-bold;
        font-weight: 600;
        font-size: 24px;
        line-height: 30px;
    }

    &__prompt {
        height: 15px;
        margin-left: 10px;
    }

    &__subtitle {
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        margin-bottom: 30px;
    }

    &__block {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;

        &-btn {
            border: none;
            background: transparent;
            padding: 0;
            margin-right: 40px;
            cursor: pointer;
            width: 21%;

            &:nth-child(1) {
                padding-bottom: 58px;
            }

            &:nth-child(2) {
                padding-bottom: 58px;
            }

            &:nth-child(3) {
                padding-bottom: 58px;
            }

            &:nth-child(4) {
                padding-bottom: 58px;
                margin-right: 0;
            }

            &:nth-child(8) {
                margin-right: 0;
            }

        }

        &-figure {
            width: 100%;
        }

        &-img {
            width: 100%;
        }

        &-figure {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &-desc {
            font-family: $font-nova;
            margin-top: 8px;
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
        }
    }
}

.button {
    &-delete {
        position: absolute;
        right: 19px;
        top: 27px;
    }
}

@media (max-width: 890px) {
    .edit-section {
        &__block {
            &-btn {
                margin-right: 20px;
                width: 22%;

                &:nth-child(1) {
                    padding-bottom: 28px;
                }

                &:nth-child(2) {
                    padding-bottom: 28px;
                }

                &:nth-child(3) {
                    padding-bottom: 28px;
                }

                &:nth-child(4) {
                    padding-bottom: 28px;
                }

                &:nth-child(8) {
                    margin-right: 0;
                }
            }
        }
    }
}

@media (max-width: 580px) {
    .edit-section {
        &__block {
            &-desc {
                margin-top: 5px;
                line-height: 14px;
            }

            &-btn {
                width: 47%;

                &:nth-child(2) {
                    margin-right: 0;
                }

                &:nth-child(4) {
                    padding-bottom: 28px;
                    margin-right: 0;
                }

                &:nth-child(5) {
                    padding-bottom: 28px;
                }

                &:nth-child(6) {
                    padding-bottom: 28px;
                    margin-right: 0;
                }

                &:nth-child(8) {
                    padding-bottom: 28px;
                    margin-right: 0;
                }
            }
        }
    }
}

@media (max-width: 404px) {
    .edit-section {
        &__block {
            &-btn {
                width: 45.9%;
            }
        }
    }
}
</style>
