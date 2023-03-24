<template>
    <transition name="fade">
        <div class="ui-skeleton" :style="style" />
    </transition>
</template>

<script lang="js">
export default {
    name: 'UISkeleton',

    data() {
        return {
            show: false
        }
    },
    props: {
        height: {
            type: String,
            required: false,
            default: () => '200px',
        },

        width: {
            type: String,
            required: false,
            default: () => '100px',
        },

        maxWidth: {
            type: String,
            required: false,
        },

        minWidth: {
            type: String,
            required: false,
        },

        maxHeight: {
            type: String,
            required: false,
        },
        minHeight: {
            type: String,
            required: false,
        },

        rounded: {
            type: String,
            required: false,
            default: () => '',
        },

        bordered: {
            type: String,
            required: false,
            default: () => '',
        },

        color: {
            type: String,
            required: false,
            default: () => '#dadada',
        },

        colored: {
            type: Boolean,
            required: false,
            default: () => false,
        },

        bgColors: {
            type: Object,
            required: false,
            default: () => ({
                start: 'black',
                finish: 'grey'
            }),
        },

        animationDuration: {
            type: String,
            required: false,
            default: () => '1.2s'
        }
    },

    computed: {
        radius() {
            return this.rounded ? `${this.rounded}px` : '0'
        },

        border() {
            return this.bordered ? `0.1px solid ${this.bordered}` : false
        },

        animation() {
            return this.colored ? 'blinker-color' : 'blinker'
        },

        style() {
            return {
                'width': this.width,
                'max-width': this.maxWidth,
                'max-height': this.maxHeight,
                'min-width': this.minWidth,
                'min-height': this.minHeight,
                'height': this.height,
                'border-radius': this.radius,
                'background': this.color,
                'border': this.border,
                'animation-name': this.animation,
                'animation-duration': this.animationDuration,
            }
        }
    }
}
</script>

<style lang="scss">
.ui-skeleton {
    animation-iteration-count: infinite;
}

@keyframes blinker-color {
    10%,
    90% {
        background: #000000;
    }

    30%,
    50%,
    70% {
        background: #131313;
    }
}

@keyframes blinker {
    10%,
    90% {
        opacity: 1;
    }

    30%,
    50%,
    70% {
        opacity: 0.6;
    }
}
</style>
