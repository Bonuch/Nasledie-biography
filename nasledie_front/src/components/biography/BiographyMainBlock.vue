<template>
    <div class="">
        <SplitLine v-model="line" v-if="returnActiveLine"/>

        <BiographyDescList :content="this.sectionType" v-model="text" v-if="returnActiveText"/>

        <BiographyPictLeft :content="this.sectionType" v-model="pictLeft" v-if="returnActivePictLeft"/>

        <BiographyPictRight :content="this.sectionType" v-model="pictRight" v-if="returnActivePictRight"/>

        <BiographyPhotoVertical
            :content="this.sectionType"
            v-model="verticalPhoto"
            v-if="returnActiveVertical"
            class="biography-vertical__pc"
        />

        <BiographySlider
            :content="this.sectionType"
            v-model="verticalPhoto"
            v-if="returnActiveVertical"
            class="biography-vertical__mobile"
        />

        <div class="w-100">
            <BiographySlider
                class="mb-80"
                :content="this.sectionType"
                v-if="returnActiveSlider"
                v-model="slider"
            />
        </div>

        <BiographySlider
            :content="this.sectionType"
            v-model="horizontalPhoto"
            v-if="returnActiveHorizontalPhoto"
            class="biography-vertical__mobile"
        />

        <BiographyPhotoHorizontal
            :content="this.sectionType"
            v-model="horizontalPhoto"
            v-if="returnActiveHorizontalPhoto"
            class="biography-vertical__pc"
        />

        <BiographyPhotoFull
            :content="this.sectionType"
            v-model="horizontalPhotoOne"
            v-if="returnActiveHorizontalPhotoOne"
        />
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "BiographyMainBlock",
    components: {
        BiographyPhotoFull: () => import('@/components/biography/BiographyPhotoFull'),
        BiographyPhotoHorizontal: () => import('@/components/biography/BiographyPhotoHorizontal'),
        BiographySlider: () => import('@/components/biography/BiographySlider'),
        BiographyPhotoVertical: () => import('@/components/biography/BiographyPhotoVertical'),
        BiographyPictRight: () => import('@/components/biography/BiographyPictRight'),
        BiographyPictLeft: () => import('@/components/biography/BiographyPictLeft'),
        BiographyDescList: () => import('@/components/biography/BiographyDescList'),
        SplitLine: () => import('@/components/base/SplitLine'),
    },
    data() {
        return {
            active: false,
            types: [],
            line: 'line',
            text: 'text',
            pictLeft: 'pict-left',
            pictRight: 'pict-right',
            verticalPhoto: 'vertical-photo',
            horizontalPhoto: 'horizontal-photo',
            horizontalPhotoOne: 'horizontal-photo-one',
            slider: 'slider',
        }
    },
    props: {
        // dataContent: {
        //     type: Array,
        //     required: false,
        // },
        blockType: {
            type: Array,
        },
        sectionType: {
            type: Object
        }
    },
    computed: {
        returnActivePictLeft() {
            this.types = this.sectionType.typeSection

            let activeBlock = false
            if (this.types === this.pictLeft) {
                activeBlock = true
            }
            return activeBlock
        },
        returnActiveLine() {
            let activeBlock = false
            if (this.types === this.line) {
                activeBlock = true
            }
            return activeBlock
        },
        returnActiveText() {
            let activeBlock = false
            if (this.types === this.text) {
                activeBlock = true
            }
            return activeBlock
        },
        returnActivePictRight() {
            let activeBlock = false
            if (this.types === this.pictRight) {
                activeBlock = true
            }
            return activeBlock
        },
        returnActiveVertical() {
            let activeBlock = false
            if (this.types === this.verticalPhoto) {
                activeBlock = true
            }
            return activeBlock
        },
        returnActiveSlider() {
            let activeBlock = false
            if (this.types === this.slider) {
                activeBlock = true
            }
            return activeBlock
        },
        returnActiveHorizontalPhoto() {
            let activeBlock = false
            if (this.types === this.horizontalPhoto) {
                activeBlock = true
            }
            return activeBlock
        },
        returnActiveHorizontalPhotoOne() {
            let activeBlock = false
            if (this.types === this.horizontalPhotoOne) {
                activeBlock = true
            }
            return activeBlock
        },
    },
}
</script>

<style scoped lang="scss">

.biography-vertical__mobile {
    display: none;
}

@media (max-width: 767px) {
    .biography-vertical__pc {
        display: none;
    }
    .biography-vertical__mobile {
        display: flex;
        margin-bottom: 80px;
    }
}
</style>
