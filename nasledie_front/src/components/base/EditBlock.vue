<template>
    <div
        class="editor-block"
        :class="({'editor-block__type': this.date})"
        :data-id="this.sectionId"
    >

        <quillEditor
            v-model="searchInput"
            :options="options"
        />
    </div>
</template>

<script>
/* eslint-disable */
import EditMainSection from "@/components/editPage/EditMainSection";
import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex";
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
    name: "EditBlock",
    components: {
        ButtonType,
        EditMainSection,
        quillEditor
    },
    props: {
        buttonTypeText: {
            type: String,
            require: true,
        },
        sectionId: {
            type: Number,
        },
        editContentMain: {
            type: String,
            require: true,
        },
        editContent: {
            type: String,
            require: true,
        },
        type: {
            type: String,
        }
    },
    data() {
        return {
            options: {
                placeholder: "Текст блока",
                formats: [
                    'background',
                    'bold',
                    'color',
                    'font',
                    'code',
                    'italic',
                    'link',
                    'size',
                    'strike',
                    'script',
                    'underline',
                    'blockquote',
                    'header',
                    'indent',
                    'list',
                    'align',
                    'direction',
                    'code-block',
                    'formula'
                    // 'image'
                    // 'video'
                ],
            },
            timeout: null,
            textObj: [],
            mainSectionData: [],
            text: '',
            id: 1,
            date: false,
            objId: [],
        }
    },
    mounted() {
        let takenMainText
        if (this.type === 'text') {
            takenMainText = this.editContentMain
        }

        if (this.editContent) {
            takenMainText = this.editContent
        }

        if (takenMainText && takenMainText.length > 0) {
            this.text = takenMainText
        }
        this.objId.push({id: this.sectionId})

        this.$store.dispatch('getObjId', this.objId)
    },
    methods: {
        postText() {
            this.$emit('startEdit', this.text)
        }
    },
    computed: {
        ...mapGetters({
            getInputText: 'getInputText',
            getTypeSection: 'getTypeSection'
        }),
        searchInput: {
            get() {
                return this.text;
            },

            set(val) {
                if (this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.getInputText.forEach((item) => {
                        return this.id = item.id
                    })
                    this.text = val;

                    if (this.sectionId === 0) {
                        this.$store.dispatch('getMainSectionMainText', {id: 0, text: this.text})
                    }

                    if (!this.textObj.length) {
                        this.textObj.push({id: this.sectionId, text: this.text})
                    }

                    this.$store.dispatch('getTextInput', this.textObj)

                    if (this.sectionId === this.getInputText[0].id && this.textObj.length > 0) {
                        this.textObj.forEach((item) => {
                            item.text = this.text
                            item.id = this.sectionId
                        })
                    }
                    // this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.getTypeSection.type})
                    this.$store.dispatch('getMergedArrays')
                    this.$store.dispatch('getMergeMainArray')
                }, 250);
            }
        },
    }
}
</script>

<style scoped lang="scss">
/* eslint-disable */
::v-deep {
    .ql-container.ql-snow {
        border: 1px solid #B7BDCE;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    .ql-snow .ql-tooltip {
        left: 0 !important;
    }

    .ql-editor {
        min-height: 234px;
        font-family: $font-nova;
        font-size: 16px !important;

        & h4 {
            font-family: $font-serif;
            font-weight: 400;
            font-size: 20px !important;
            line-height: 25px;
        }

        & p {
            font-weight: 400;
            line-height: 20px;
            margin-top: 10px;

            & a {
                margin-top: 10px;
                text-decoration: none;
                font-weight: 600;
                color: $green;
            }
        }

        & ul {
            margin-top: 10px;
            padding-left: 25px;

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
            padding-left: 25px;

            & li {
                & a {
                    margin-top: 10px;
                    text-decoration: none;
                    font-weight: 600;
                    color: $green;
                }
            }
        }
    }

    .ql-toolbar.ql-snow {
        .ql-formats {
            &:nth-child(2) {
                display: none;
            }

            &:nth-child(3) {
                display: none;
            }

            &:nth-child(5) {
                display: none;
            }

            &:nth-child(6) {
                display: none;
            }

            &:nth-child(7) {
                display: none;
            }

            &:nth-child(8) {
                display: none;
            }

            &:nth-child(9) {
                display: none;
            }

            &:nth-child(10) {
                display: none;
            }

            &:nth-child(11) {
                display: none;
            }

            &:nth-child(12) {
                display: none;
            }

            &:nth-child(13) {
                display: none;
            }

            &:nth-child(14) {
                .ql-image {
                    display: none;
                }

                .ql-video {
                    display: none;
                }
            }
        }
    }
}

.editor-block {
    position: relative;

    &::v-deep {
        .ql-container.ql-snow {
            border-radius: 15px;
            margin-top: 15px;
            border-top: 1px solid #ccc !important;
        }

        .ql-editor {
            padding: 16px 40px 16px 16px;
        }

        .ql-editor {
            ul {
                padding-left: 0 !important;

            }

            ol {
                padding-left: 0 !important;
            }
        }
    }
}

.editor-block__type {
    &::v-deep {
        .ql-container.ql-snow {
            margin-top: 0;
        }

        .quillWrapper .ql-snow.ql-toolbar {
            display: none;
        }

        .ql-editor {
            min-height: 55px;
        }
    }
}
</style>
