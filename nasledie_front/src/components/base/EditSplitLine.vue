<template>
    <div class="edit-line" :data-id="this.sectionId">
        <div class="edit-line__container">
            <SplitLine/>

            <ButtonType
                class="button-container"
                :button-type="buttonEdit.typeDelete"
                @delete="deleteSection"
            />

            <ButtonType
                class="button-drag-up__position"
                :button-type="buttonEdit.typeDragUp"
                @dragUp="dragUp"
            />

            <ButtonType
                class="button-drag-down__position"
                :button-type="buttonEdit.typeDragDown"
                @dragDown="dragDown"
            />


            <ButtonType
                class="handle button-move"
                :button-type="buttonEdit.typeMove"
            />
        </div>

    </div>
</template>

<script>
/* eslint-disable */
import SplitLine from "@/components/base/SplitLine";
import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex";

export default {
    name: "EditSplitLine",
    components: {ButtonType, SplitLine},
    props: {
        sectionId: {
            type: Number,
        }
    },
    data() {
        return {
            buttonEdit: {
                typeDelete: 'DeleteSection',
                typeMove: 'move',
                typeDragUp: 'dragUp',
                typeDragDown: 'dragDown',
            },
            photo: []
        }
    },
    mounted() {
        this.getBiographyData.forEach((item) => {
            if (this.sectionId === item.id) {
                this.photo = item
            }
        })
    },
    methods: {
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
                    // this.$store.dispatch('getMergedArrays')
                }
            }
        },
        deleteSection() {
            this.$emit('deleteSection')
        }
    },
    computed: {
        ...mapGetters({
            getBiographyData: 'getBiographyData',
        }),
    }
}
</script>

<style scoped lang="scss">
.edit-line {
    position: relative;
    padding: 14px 0;
    background: $white;
    border: 1px solid #F0F4F7;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin: 37px 0;
    &__container {
        max-width: 1260px;
        margin: 0 auto;
    }
    &::v-deep {
        .split-line {
            margin: 0;
        }
    }
}

.button-container {
    position: absolute;
    right: 9px;
    top: 12px;
}

.button-drag-up__position {
    position: absolute;
    margin-bottom: 0;
    right: 45px;
    top: 0;
}

.button-drag-down__position {
    position: absolute;
    margin-top: 0;
    right: 45px;
    bottom: 11px;
}

.button-move {
    top: 12px;
    left: 10px;
}
</style>
