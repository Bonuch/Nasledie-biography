<template>
  <div v-click-outside="closeEdit">
    <EditBlock
        v-if="active"
        @startEdit="startEditComp"
        :button-type-text="buttonTypeText"
        :sectionId="this.sectionId"
        :type="this.type"
        :editContentMain="this.content"
        :editContent="this.content"
    />
    <EditTextResult
        v-else
        :post-content="this.content"
        :button-type-text="'editContentEnd'"
        @startEdit="startEditComp"
    />
  </div>
</template>

<script>
import EditTextResult from "@/components/base/EditTextResult";
import EditBlock from "@/components/base/EditBlock";
import {mapGetters} from "vuex";

export default {
  name: "EditMainText",
  components: {EditBlock, EditTextResult},
  data() {
    return {
      active: false,
      content: '',
    }
  },
  props: {
    buttonTypeText: {
      type: String,
      require: true,
    },
    editContentMain: {
      // type: Object,
      require: true,
    },
    editContent: {
      type: Object,
      require: true,
    },
    sectionId: {
      type: Number,
    },
    type: {
      type: String,
    }
  },
  mounted() {
    let takenMainText
    // if (this.type === 'text') {
    //   if (this.editContentMain !== undefined) {
    //     if (this.editContentMain) {
    //       takenMainText = this.editContentMain.mainText
    //     }
    //   }
    // }

    if (this.editContent) {
      if (Array.isArray(this.editContent.text)) {
        this.editContent.text.forEach((item) => {
          takenMainText = item
        })
      } else {
        if(this.editContent.mainText) {
          takenMainText = this.editContent.mainText
        } else {
          takenMainText = this.editContent.text
        }
      }
    }
    if (takenMainText && takenMainText.length > 0) {
      this.content = takenMainText
    }
  },
  updated() {
    let takenMainText
    // if (this.type === 'text') {
    //   if (this.editContentMain !== undefined) {
    //     if (this.editContentMain) {
    //       takenMainText = this.editContentMain.mainText
    //     }
    //   }
    // }
    if (this.editContent) {
      if (Array.isArray(this.editContent.text)) {
        this.editContent.text.forEach((item) => {
          takenMainText = item
        })
      } else {
        if(this.editContent.mainText) {
          takenMainText = this.editContent.mainText
        } else {
          takenMainText = this.editContent.text
        }
      }
    }
    if (takenMainText && takenMainText.length > 0) {
      this.content = takenMainText
    }
  },
  methods: {
    closeEdit() {
      this.active = false
    },
    startEditComp(content) {
      this.active = !this.active;
      if (content) {
        this.content = content
      }
    }
  },
  computed: {
    ...mapGetters({
      returnMainBiography: 'returnMainBiography',
      getBiographyData: 'getBiographyData'
    }),
  },
}
</script>

<style scoped>

</style>
