<template>
  <div class="edit-text__container" @click="postValue">
    <div class="edit-text__top-label">
      <div v-if="postContent" class="edit-text__content biography-desc-list__text" v-html="postContent"></div>

      <div v-else class="edit-text__content biography-desc-list__text biography-desc-list__text--placeholder pt-15">
        Текст блока
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "EditTextResult",
  props: {
    postContent: {},
    buttonTypeText: {},
  },
  methods: {
    postValue() {
      this.$emit('startEdit')
    }
  }
}
</script>

<style scoped lang="scss">
.edit-text {
  &__container {
    position: relative;
  }

  &__label {
    font-family: $font-nova;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    opacity: 0.5;
  }

  &__top {
    &-label {

    }
  }

  &__content {
    padding: 6px 27px 10px 26px;
    background: $white-grey;
    border-radius: 15px;
    margin-top: 0;
    min-height: 234px;
  }
}

.biography-desc-list__text {
  font-family: $font-nova;

  &--placeholder {
    opacity: 0.5;
  }

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

    & a {
      margin-top: 10px;
      text-decoration: none;
      font-weight: 600;
      color: $green;
    }
  }

  & ul {
    margin-top: 10px;
    list-style-type: disc;
    padding-left: 25px;

    & li {
    }
  }

  & ol {
    margin-top: 10px;
    list-style-type: decimal;
    padding-left: 25px;

    li {
    }
  }
}

.pt-15 {
  padding-top: 15px;
}
</style>
