<template>
    <div class="twitter-navigation">
        <div class="twitter-navigation__wrapper">
            <div class="twitter-navigation__zoom-icon twitter-navigation__zoom-icon--left">
                <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0C5.44772 0 5 0.447715 5 1C5 1.55228 5.44772 2 6 2V0ZM11 2C11.5523 2 12 1.55228 12 1C12 0.447715 11.5523 0 11 0V2ZM1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2V0ZM6 2H11V0H6V2ZM11 0H1V2H11V0Z" fill="#444444"/>
                </svg>


            </div>
            <div
                class="twitter-navigation__line-wrapper"
                ref="line"
                @mousedown="onStart"
                @touchstart="onStart"
            >
                <div class="twitter-navigation__line">
                    <div class="twitter-navigation__fill" :style="{
							flexGrow: zoom
						}"></div>
                    <div
                        class="twitter-navigation__circle"
                        :class="{'twitter-navigation__circle--focus': focus}"
                        :style="{
							left: `${zoom * 100}%`
						}"
                    >
                        <div
                            class="twitter-navigation__inner-circle"
                            :class="{'twitter-navigation__inner-circle--focus': focus}"
                        ></div>
                    </div>
                </div>
            </div>

            <div class="twitter-navigation__zoom-icon twitter-navigation__zoom-icon--right">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1H7ZM5 11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11H5ZM11 7C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5V7ZM1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7V5ZM5 1V6H7V1H5ZM5 6V11H7V6H5ZM6 7H11V5H6V7ZM11 5H1V7H11V5Z" fill="#444444"/>
                </svg>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ZoomPhoto",
    props: {
        zoom: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            focus: false
        };
    },
    mounted() {
        window.addEventListener("mouseup", this.onStop, {passive: false});
        window.addEventListener("mousemove", this.onDrag, {passive: false});
        window.addEventListener("touchmove", this.onDrag, {passive: false});
        window.addEventListener("touchend", this.onStop, {passive: false});
    },
    destroyed() {
        window.removeEventListener("mouseup", this.onStop);
        window.removeEventListener("mousemove", this.onDrag);
        window.removeEventListener("touchmove", this.onDrag);
        window.removeEventListener("touchend", this.onStop);
    },
    methods: {
        onDrag(e) {
            if (this.focus) {
                const position = e.touches ? e.touches[0].clientX : e.clientX;
                const line = this.$refs.line;

                if (line) {
                    const {left, width} = line.getBoundingClientRect();
                    this.$emit(
                        "change",
                        Math.min(1, Math.max(0, position - left) / width)
                    );
                }
                if (e.preventDefault) {
                    e.preventDefault();
                }
            }
        },
        onStop() {
            this.focus = false;
        },
        onStart(e) {
            this.focus = true;
            this.onDrag(e);
        }
    }
};
</script>

<style scoped lang="scss">
.twitter-navigation {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    &__wrapper {
        display: flex;
        align-items: center;
        max-width: 178px;
        width: 100%;
    }

    &__zoom-icon {
        height: 18.75px;
        width: 18.75px;
        fill: rgb(101, 119, 134);
        flex-shrink: 0;

        &--left {
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &--right {
            margin-left: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    &__line-wrapper {
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        border-radius: 5px;
        cursor: pointer;
    }

    &__line {
        background: rgba(183, 189, 206, 0.5);
        height: 4px;
        width: 100%;
        border-radius: 5px;
        display: flex;
        position: relative;
        align-items: center;
    }

    &__fill {
        background: $green;
        align-self: stretch;
        flex-basis: auto;
        flex-direction: column;
        flex-shrink: 0;
    }

    &__circle {
        width: 30px;
        height: 30px;
        margin-left: -15px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        transition-duration: 0.2s;
        transition-property: background-color, box-shadow;
        background-color: transparent;

        &:hover {
            background-color: rgba(29, 161, 242, 0.1);
        }

        &--focus {
            background-color: rgba(29, 161, 242, 0.2);
        }
    }

    &__inner-circle {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: $green;
        transform: scale(1);
        transition-duration: 0.1s;
        transition-property: transform;
        box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 7px,
        rgba(101, 119, 134, 0.15) 0px 1px 3px 1px;

        &--focus {
            transform: scale(1.2);
        }
    }
}
@media (max-width: 585px) {
  .twitter-navigation__wrapper {
    max-width: 275px;
  }
  .twitter-navigation__inner-circle {
    width: 24px;
    height: 24px;
  }
  .twitter-navigation__zoom-icon--left {
    margin-right: 18px;
  }
  .twitter-navigation__zoom-icon--right {
    margin-left: 18px;
  }
}
</style>

