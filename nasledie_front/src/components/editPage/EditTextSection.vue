<template>
    <div class="edit-section">
        <div class="edit-section__container">
            <div class="edit-section__content">

                <EditMainTitle
                    class="mb-11"
                    :placeholder="'Заголовок блока'"
                    :button-type-title="buttonEdit.typeEdit"
                    :sectionId="this.sectionId"
                    :editContent="this.editContent"
                />

                <EditMainText
                    :button-type-text="buttonEdit.typeEdit"
                    :sectionId="this.sectionId"
                    :editContent="this.editContent"
                />
                <div class="buttons-block">
                    <ButtonType
                        class="button-drag-up__position"
                        :button-type="buttonEdit.typeDragUp"
                        @dragUp="dragUp"
                    />

                    <ButtonType
                        class="button-delete__position"
                        :button-type="buttonEdit.typeDelete"
                        @delete="deleteSection"
                    />

                    <ButtonType
                        class="button-drag-down__position"
                        :button-type="buttonEdit.typeDragDown"
                        @dragDown="dragDown"
                    />
                </div>


                <ButtonType
                    class="handle button-move"
                    :button-type="buttonEdit.typeMove"
                />
            </div>

        </div>
    </div>
</template>

<script>
/* eslint-disable */
import EditMainTitle from "@/components/editPage/EditMainTitle";
import EditMainText from "@/components/editPage/EditMainText";
import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex";

export default {
    name: "EditTextSection",
    components: {ButtonType, EditMainText, EditMainTitle},
    props: {
        sectionId: {
            type: Number,
        },
        editContent: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            buttonEdit: {
                typeEdit: 'editContent',
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
.edit-section {
    padding: 16px 36px 10px 40px;
    &__container {
        max-width: 1260px;
        margin: 0 auto;
    }
}
</style>
