<template>
    <div class="edit-section__title-container" :data-id="this.sectionId">
        <input
            type="text"
            class="input input__title"
            :placeholder="placeholder"
            v-model.trim="searchInput"
            autofocus
        >
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "EditSectionTitle",
    // components: {ButtonType},
    data() {
        return {
            timeout: null,
            titleObj: [],
            mainSectionData: [],
            objId: [],
            title: '',
            id: 1,
            inputLocal: '',
        }
    },
    props: {
        buttonTypeTitle: {
            type: String,
            require: true,
        },
        placeholder: {
            type: String,
            require: true,
        },
        editContentMain: {
            // type: Array,
            require: true,
        },
        editContent: {
            type: Object,
            require: true,
        },
        result: {
            type: String,
            require: true,
        },
        sectionId: {
            type: Number,
        }
    },
    mounted() {
        let takenMainTitle
        if (Array.isArray(this.editContentMain)) {
            [...this.editContentMain].forEach((item) => {
                takenMainTitle = item
            })
        }
        if (typeof this.editContentMain === 'object' && this.editContentMain !== null) {
            takenMainTitle = this.editContentMain.title[0]
        }
        if(this.result) {
            this.title = this.result
        }
        else if (takenMainTitle && takenMainTitle.length > 0) {
            this.title = takenMainTitle
        }

        this.objId.push({id: this.sectionId})
        this.$store.dispatch('getObjId', this.objId)
        // if(this.editContent) {
        //     let takenTitle = this.editContent.title
        //     if (takenTitle && takenTitle.length > 0) {
        //         this.title = takenTitle[0]
        //     }
        // }
        // if(this.getInputTitle) {
        //     this.getInputTitle.forEach((item) => {
        //         if(item.id === this.sectionId) {
        //             this.title = item.title
        //         }
        //     })
        // }

    },
    methods: {
        postValue() {
            this.$emit('startEdit', this.title)
        },
    },
    computed: {
        ...mapGetters({
            getInputTitle: 'getInputTitle',
            getTypeSection: 'getTypeSection'
        }),

        searchInput: {
            get() {
                return this.title
            },

            set(val) {
                if (this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.getInputTitle.forEach((item) => {
                        return this.id = item.id
                    })
                    this.title = val;

                    if (this.sectionId === 0) {
                        if (!this.mainSectionData.length) {
                            this.mainSectionData.push({id: 0, title: this.title})
                        }

                        this.$store.dispatch('getMainSectionTitle', {id: 0, title: this.title})
                        this.$store.dispatch('getMergeMainArray')
                        if (this.sectionId === 0 && this.mainSectionData.length > 0) {
                            this.mainSectionData.forEach((item) => {
                                item.title = this.title
                                item.id = this.sectionId
                            })
                        }
                        this.$emit('mainTitle', this.title)
                    }

                    if (!this.titleObj.length) {
                        this.titleObj.push({id: this.sectionId, title: this.title})
                    }

                    this.$store.dispatch('getTitleInput', this.titleObj)

                    if (this.sectionId === this.getInputTitle[0].id && this.titleObj.length > 0) {
                        this.titleObj.forEach((item) => {
                            item.title = this.title
                            item.id = this.sectionId
                        })
                    }
                    this.$store.dispatch('getMergedArrays')
                    // this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.getTypeSection.type})
                }, 250);
            }
        },
    },
}
</script>

<style scoped lang="scss">
.edit-section__title-container {
    position: relative;
    width: 100%;
}
</style>
