<template>
    <div class="edit-title__result" @click="postValue">
        <h3 v-if="result" class="edit-title__result-title">{{result}}</h3>

        <h3 v-else class="edit-title__result-title edit-title__result-title--placeholder">Заголовок блока</h3>

<!--        <div class="button-position">-->
<!--            <ButtonType-->
<!--                @startEdit="postValue"-->
<!--                :button-type="buttonTypeTitle"-->
<!--            />-->
<!--        </div>-->
    </div>
</template>

<script>
// import ButtonType from "@/components/base/ButtonType";
import {mapGetters} from "vuex"

export default {
    name: "EditTitleResult",
    // components: {ButtonType},
    props: {
        buttonTypeTitle: {
            type: String,
            require: true,
        },
        placeholder: {
            type: String,
            require: true,
        },
        result: {
            type: String,
            require: true,
        }
    },
    methods: {
        postValue() {
            this.$emit('startEdit')
        }
    },
    computed: {
        ...mapGetters({
            getInputTitle: 'getInputTitle'
        })
    }
}
</script>

<style scoped lang="scss">
.edit-title__result {
    display: flex;
    position: relative;
    padding: 10px 6px 10px 16px;
    background: $white-grey;
    border-radius: 15px;
    min-height: 50px;
    &-title {
        font-family: $font-serif-bold;
        font-weight: 600;
        font-size: 24px;
        line-height: 30px;
        //margin-top: 10px;
        min-height: 30px;
        word-break: break-word;
        &--placeholder {
            opacity: 0.5;
        }
    }
}
</style>
