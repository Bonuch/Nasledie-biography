<template>
    <div class="button-add-section__container">
        <button class="button-add-section" @click="addSection" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                      fill="#B7BDCE"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12 8.00195C12.5523 8.00195 13 8.44967 13 9.00195V15.002C13 15.5542 12.5523 16.002 12 16.002C11.4477 16.002 11 15.5542 11 15.002V9.00195C11 8.44967 11.4477 8.00195 12 8.00195Z"
                      fill="#B7BDCE"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M8 12.002C8 11.4497 8.44772 11.002 9 11.002H15C15.5523 11.002 16 11.4497 16 12.002C16 12.5542 15.5523 13.002 15 13.002H9C8.44772 13.002 8 12.5542 8 12.002Z"
                      fill="#B7BDCE"/>
            </svg>
            <span>Добавить секцию</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "AddSectionButton",
    data() {
        return {}
    },
    methods: {
        addSection() {
            this.$emit('addSection')
        }
    }
}
</script>

<style scoped lang="scss">
.button-add-section__container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 37px 0;
}
.button-add-section {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;

    & svg {
        & path {
            transition: .3s;
        }
    }

    & span {
        font-family: $font-nova;
        color: $silver;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        margin-left: 20px;
        transition: .3s;
    }

    &:hover {
        & svg {
            & path {
                transition: .3s;
                fill: $green;
            }
        }

        & span {
            color: $green;
            transition: .3s;
        }
    }
}
</style>
