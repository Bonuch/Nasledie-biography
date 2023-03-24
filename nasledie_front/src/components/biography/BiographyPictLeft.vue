<template>
    <section class="biography-container biography-pict">
        <PictureFigure v-if="this.content.photo" :picture-left="this.content.photo"/>

        <div class="biography-pict-content">
            <h3 class="biography__title" v-if="returnTitle">{{ returnTitle }}</h3>

            <div class="biography-desc-list__text" v-if="returnText" v-html="returnText">
            </div>
        </div>
    </section>
</template>

<script>
import PictureFigure from "@/components/base/PictureFigure";

export default {
    name: "BiographyPictLeft",
    components: {PictureFigure},
    data() {
        return {
            title: '',
            text: '',
        }
    },
    props: {
        content: {
            type: Object,
            required: false
        }
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
.biography-photo-back {
    margin-left: 0;
    margin-right: 35px;
}

.biography-pict-content {
    margin-top: 15px;
}
.biography-container {
    margin: 80px auto 0;
    max-width: 1260px;
}
.biography-pict {
    &::v-deep {
        .biography-photo__container {
            height: 100%;
            width: 50%;
        }
        .biography-photo-back {
            max-width: 657px;
            margin-left: 0;

            &:after {
                max-width: 657px;
            }

            & img {
                width: 100%;
                height: 100%;
                max-width: 657px;
                max-height: 478px;
                object-fit: cover;
            }
        }

        .biography-pict-content {
            width: 49%;
            margin-left: 26px;
        }
    }
}

@media(max-width: 767px) {
    .biography-pict {
      flex-direction: column;

      &::v-deep {
            .biography-photo__container {
                width: 100%;
            }
            .biography-photo-back {
                width: 100%;

                & img {
                    width: 100%;

                }
            }

            .biography-pict-content {
                width: 100%;
              margin-left: 0;
            }
        }
    }
    .biography-pict-content {
        margin-top: 40px;
    }
}
</style>
