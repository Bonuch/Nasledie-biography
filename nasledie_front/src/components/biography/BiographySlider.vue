<template>
    <div class="biography__container-slider">
        <h3 class="biography__title" v-if="returnTitle">{{ returnTitle }}</h3>
        <div class="swiper-container"
        :class="`swiper-container-${this.content.id}`"
        >
            <div class="swiper-wrapper" >
                <div
                    class="swiper-slide biography-slider"
                    v-for="(item, index) in this.content.photo"
                    :key="index"
                >
                    <PictureFigure
                        :picture-slider-hard="item"
                    />

                </div>
            </div>

            <button
                type="button"
                class="swiper-button swiper-button-prev"
            >
                <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24.002" r="24" transform="rotate(-180 24 24.002)" fill="#FAFAFA"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M27.6096 16.3925C28.1303 16.9132 28.1303 17.7574 27.6096 18.2781L21.8857 24.002L27.6096 29.7258C28.1303 30.2465 28.1303 31.0907 27.6096 31.6114C27.0889 32.1321 26.2446 32.1321 25.7239 31.6114L19.0573 24.9448C18.5366 24.4241 18.5366 23.5798 19.0573 23.0591L25.7239 16.3925C26.2446 15.8718 27.0889 15.8718 27.6096 16.3925Z"
                          fill="#444444"/>
                </svg>
            </button>

            <button
                type="button"
                class="swiper-button swiper-button-next"
            >
                <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24.002" r="24" fill="#FAFAFA"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M20.3906 31.6114C19.8699 31.0907 19.8699 30.2465 20.3906 29.7258L26.1144 24.002L20.3906 18.2781C19.8699 17.7574 19.8699 16.9132 20.3906 16.3925C20.9113 15.8718 21.7555 15.8718 22.2762 16.3925L28.9429 23.0591C29.4635 23.5798 29.4635 24.4241 28.9429 24.9448L22.2762 31.6114C21.7555 32.1321 20.9113 32.1321 20.3906 31.6114Z"
                          fill="#444444"/>
                </svg>
            </button>

            <div class="round-pagination" :class="`round-pagination-${this.content.id}`"></div>
        </div>
    </div>

</template>

<script>
/* eslint-disable */
import Swiper from "swiper/bundle";
import 'swiper/swiper-bundle.css'
import PictureFigure from "@/components/base/PictureFigure";

export default {
    name: "BiographySlider",
    components: {
        PictureFigure,
    },
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
    mounted() {
        this.initSwiper();
    },
    methods: {
        initSwiper() {
            const $el = this.$el;
            const list = $el.querySelector('.swiper-container-' + this.content.id)
            const pagination = $el.querySelector('.round-pagination-' + this.content.id);
            // const buttons = $el.querySelectorAll('.swiper-button');
            // let prev = buttons[0];
            // let next = buttons[1];

            if ($el && list) {
                const swiper = new Swiper(list, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: {
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    },
                    centeredSlides: true,
                    pagination: {
                        el: pagination,
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 3,
                    },
                });
            }
        },
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
    },
    computed: {
        returnTitle() {
            this.getTitle()
            return this.title
        },
    },
}
</script>

<style scoped lang="scss">
.swiper-container {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    padding-bottom: 12px;
}

.biography__container-slider {
    flex-direction: column;
    margin: 80px auto;
    max-width: 1260px;
}
.biography__title {
    margin-bottom: 29px;
}

.biography-slider {

    &::v-deep {
        .biography-photo__container {
            width: 100%;
        }
        .biography-photo-back {
            margin-left: 0;
            max-width: unset;
            width: 99%;

            & figcaption {
                font-size: 16px;
                line-height: 20px;
                padding-top: 17px;
                text-align: center;
                margin-left: 0;
                margin-bottom: 13px;
            }

            &:after {
                max-width: 100%;
            }

            & img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .photo-fig-over {
            padding: 20px 10px 15px 20px;
            font-size: 16px;
            line-height: 20px;
            text-align: center;
        }
    }
}

.round-pagination {
    text-align: center;
    position: absolute;
    z-index: 2;
    bottom: 90px;

    &::v-deep {
        .swiper-slide {
            width: 98% !important;
        }

        .swiper-pagination-bullet {
            background: $white-grey;
            width: 10px;
            height: 10px;
            opacity: 1;
        }

        .swiper-pagination-bullet-active {
            background: $green;
        }
    }

}

::v-deep {
    .swiper-button {
        background: transparent;
        border: none;
        padding: 0;
        width: 44px;

        & svg {
            & circle {
                transition: .3s;
            }

            & path {
                transition: .3s;
            }

            &:hover {
                & circle {
                    fill: $green;
                    transition: .3s;
                }

                & path {
                    fill: $white;
                    transition: .3s;
                }
            }
        }

        &-prev {
            left: 20px;
        }

        &-next {
            right: 20px;
        }

        &:after {
            content: none;
        }
    }
}

@media (max-width: 767px) {
    .swiper-container {
        padding-bottom: 20px;
    }
    .round-pagination {
        bottom: 0;

        &::v-deep {
            .swiper-slide {
                width: 99% !important;
            }

            .swiper-pagination-bullet {
                background: $silver;
                width: 8px;
                height: 8px;
                opacity: 1;
                margin: 0 2.5px;
            }

            .swiper-pagination-bullet-active {
                background: $green;
            }
        }
    }
    .swiper-button {
        display: none;
    }

    .biography-slider {

        &::v-deep {

            .biography-photo-back {
                width: 99%;

                & figcaption {
                    font-size: 12px;
                    line-height: 14px;
                    padding-top: 6px;
                    text-align: center;
                    margin-left: 0;
                    margin-bottom: 15px;
                }
            }

            .photo-fig-over {
                padding: 6px;
                text-align: center;
                font-size: 12px;
                line-height: 14px;
            }
        }
    }
}
</style>
