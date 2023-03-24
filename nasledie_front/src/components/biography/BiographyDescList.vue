<template>
    <section class="biography-container">
        <div class="biography-desc-list__content">
            <h3 class="biography__title" v-if="returnTitle">{{ returnTitle }}</h3>
            <div class="biography-desc-list__text" v-if="returnText" v-html="returnText">
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "BiographyDescList",
    data() {
        return {
            title: '',
            text: ''
        }
    },
    props: {
        content: {
            type: Object,
            required: false
        },
    },
    computed: {
        returnTitle() {
            this.getTitle()
            return this.title
        },
        returnText() {
            this.getText()
            return this.text
        }
    },
    methods: {
        getTitle() {
            if (this.content.title) {
                if (Array.isArray(this.content.title)) {
                    this.content.title.forEach((item) => {
                        this.title = item
                    })
                } else {
                    this.title = this.content.title
                }
            }
        },
        getText() {
            if (this.content.text) {
                if (Array.isArray(this.content.text)) {
                    this.content.text.forEach((item) => {
                        this.text = item
                    })
                } else {
                    this.text = this.content.text
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.biography-desc-list__text {

}
.biography-container {
    margin: 80px auto 0;
    max-width: 1260px;
}
</style>
