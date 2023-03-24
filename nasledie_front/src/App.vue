<template>
    <div
        class="app"
        id="app">
        <router-view/>
    </div>
</template>

<script>
/* eslint-disable */
import TheHeader from "@/components/base/TheHeader";

export default {
    name: 'App',
    components: {
        TheHeader
    },
}
</script>

<style lang="scss">
body {
    font-family: 'Source Serif Pro', 'sans-serif';
    background: #FAFAFA;
    color: #444444;
    line-height: 1;
}

.app {
    display: unset !important;
    width: 100% !important;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}

* {
    box-sizing: border-box;
}

html {
    height: 100%;
}

ol, ul {
    list-style: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

.biography-desc-list__text {
    font-family: $font-nova;
    margin-top: 15px;

    & h4 {
        font-family: $font-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
    }

    & p {
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        margin-top: 10px;
        margin-bottom: 0 !important;
        & a {
            margin-top: 10px;
            text-decoration: none;
            font-weight: 600;
            color: $green;
            border-bottom: none !important;
        }
    }

    & ul {
        margin-top: 10px;
        list-style-type: disc;
        padding-left: 25px;
        font-size: 16px !important;
        &:first-child {
            margin-top: 0;
        }
        & li {
            & a {
                margin-top: 10px;
                text-decoration: none;
                font-weight: 600;
                color: $green;
            }
        }
    }

    & ol {
        margin-top: 10px;
        list-style-type: decimal;
        padding-left: 25px;
        font-size: 16px !important;
        li {
            list-style-type: decimal;
            & a {
                margin-top: 10px;
                text-decoration: none;
                font-weight: 600;
                color: $green;
            }
        }
    }
}
</style>
