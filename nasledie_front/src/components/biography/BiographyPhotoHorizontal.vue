<template>
    <section class="biography-container">
        <div class="">
            <h3 class="biography__title" v-if="returnTitle">{{ returnTitle }}</h3>

            <div class="biography__flex">
                <PictureFigure
                    :picture-main-hard="this.content.photo"
                />
            </div>

        </div>
    </section>
</template>

<script>
import PictureFigure from "@/components/base/PictureFigure";

export default {
    name: "BiographyPhotoHorizontal",
    components: {PictureFigure},
    props: {
        content: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            title: '',
        }
    },
    computed: {
        returnTitle() {
            this.getTitle()
            return this.title
        },
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
    }

}
</script>

<style scoped lang="scss">
.biography-container {
    margin: 0 auto;
    max-width: 1260px;
}
.biography__flex {
    //display: flex;
    //flex-wrap: wrap;
    //justify-content: space-between;
    //align-items: flex-start;
    margin-top: 30px;

    ::v-deep {
        .biography-photo-back {
            max-width: 100%;
            margin: 0;
            margin-bottom: 25px;
            margin-right: 10px;
            width: 48.5%;

            &:after {
                max-width: 100%;
            }

            & img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .biography-photo {
            width: 100%;
            max-height: 523px;
            object-fit: cover;
        }
    }
}
</style>
