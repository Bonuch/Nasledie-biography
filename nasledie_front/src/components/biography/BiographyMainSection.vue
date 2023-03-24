<template>
  <section class="biography-about" v-if="this.content">
    <div class="biography-about__content">

      <div class="biography-about__img">
        <h3 class="biography-about__content-title biography__title biography__title-mobile" v-if="this.content">{{ returnTitle }}</h3>

        <PictureFigure
            v-if="this.content.mainPhoto"
            :pictureMainSection="this.content.mainPhoto[0]"
        />
      </div>
      <div class="biography-about__content-block">
        <h3 class="biography-about__content-title biography__title" v-if="this.content">{{ returnTitle }}</h3>

        <div class="biography-desc-list__text" v-if="this.content" v-html="returnText"></div>
      </div>
    </div>
  </section>
</template>

<script>
import PictureFigure from "@/components/base/PictureFigure";
import {mapGetters} from "vuex";

export default {
  name: "BiographyMainSection",
  components: {PictureFigure},
  data() {
    return {
      title: '',
      text: '',
      height: 0,
    }
  },
  props: {
    content: {
      // type: Object,
      // required: false
    }
  },
  computed: {
    ...mapGetters({
      returnPreloaderStatus: 'returnPreloaderStatus'
    }),
    returnTitle() {
      // this.getTitle()
      return this.content.title
    },
    returnText() {
      // this.getText()
      return this.content.mainText
    },
  },

}
</script>

<style scoped lang="scss">
.biography-desc-list__text {
  max-width: 840px;
  margin-top: 42px;

  & p {
    margin-top: 0 !important;
  }
}

.biography-about {
  padding-top: 27px;
  position: relative;
  max-width: 1260px;
  margin: 0 auto 40px;

  &__content {
    display: flex;

    &-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 34px;
    }

    &-title {

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 90px;
        background: rgba(183, 189, 206, 0.2);
        border-radius: 15px;
        z-index: 1;
        pointer-events: none;
      }
    }


    &-about {
      font-family: $font-nova;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
    }
  }

  &__img {
    max-width: 387px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
    position: relative;
    z-index: 2;
  }
}

::v-deep {
  .biography-photo {
    width: 100%;
  }

  .biography-photo-back {
    margin-left: 0 !important;
    height: unset !important;
  }
}

.mt {
  &-110 {
    margin-top: 110px;
  }
}

.biography__title-mobile {
  display: none;
}
@media (max-width: 1280px) {
  .biography-about {
    &__img {
      max-width: 253px;
    }
  }
}

@media (max-width: 667px) {
  .biography__title-mobile {
    display: flex !important;
  }
  .biography__title {
    display: none;
  }
  .biography-desc-list__text {
    margin-top: 0;
  }
  .biography-about {
    padding-top: 18px;

    &__content {
      display: flex;
      flex-direction: column;

      &-block {
        margin-top: 19px;
        margin-left: 0;
      }

      &-title {
        position: relative;
        width: 100%;
        //padding-left: 14px;
        padding-right: 15px;
        margin-bottom: 29px;
        &:before {
          top: -60px;
          min-height: 100%;
          height: 100%;
          width: 0;
          //width: 100%;
          padding-top: 100px;
        }
      }

      &-about {
        margin-top: 40px;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &__img {
      max-width: 60%;
      min-width: 280px;
    }
  }
}

@media (max-width: 390px) {
  .biography-about {
    &__img {
      max-width: 100%;
      min-width: unset;
    }
  }
}
</style>
