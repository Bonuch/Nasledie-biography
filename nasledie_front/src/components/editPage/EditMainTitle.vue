<template>
    <div class="w-100">
        <EditSectionTitle
            v-if="active"
            @startEdit="startEditComp"
            @mainTitle="getMainTitle"
            :button-type-title="buttonTypeTitle"
            :placeholder="placeholder"
            :result="this.title"
            :sectionId="this.sectionId"
            :editContentMain="editContentMain"
            :editContent="editContent"
        />

        <EditTitleResult
            v-else
            @startEdit="stopEditComp"
            :button-type-title="'editContentEnd'"
            :result="this.title"
        />
    </div>
</template>

<script>
/* eslint-disable */
import EditTitleResult from "@/components/base/EditTitleResult";
import EditSectionTitle from "@/components/base/EditSectionTitle";
import {mapGetters} from "vuex";

export default {
    name: "EditMainTitle",
    components: {EditSectionTitle, EditTitleResult},
    props: {
        placeholder: {
            type: String,
            require: true,
        },
        buttonTypeTitle: {
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
        sectionId: {
            type: Number,
        }
    },
    data() {
        return {
            active: false,
            title: '',
            content: null
        }
    },
    mounted() {
        let takenMainTitle
        if (this.editContentMain) {
            takenMainTitle = this.editContentMain.title
        }
        if (typeof this.editContentMain === 'object' && this.editContentMain !== null) {
            takenMainTitle = this.editContentMain.title
        }
        if (takenMainTitle && takenMainTitle.length > 0) {
            this.title = takenMainTitle
        }
        if (this.editContent) {
            let takenTitle = this.editContent.title
            if (takenTitle && takenTitle.length > 0) {
                this.title = takenTitle
            }
        }
    },
    methods: {
        startEditComp(title) {
            this.active = !this.active;
            if (title) {
                this.title = title
            }
        },
        stopEditComp() {
            this.active = !this.active;
        },
        getMainTitle(val) {
            this.title = val
        }
    },
    computed: {
        ...mapGetters({
            getInputTitle: 'getInputTitle',
            returnMainBiography: 'returnMainBiography'
        }),
    },
    watch: {
        title(val) {
            return this.title = val
        }
    }
}
</script>

<style scoped lang="scss">

</style>
