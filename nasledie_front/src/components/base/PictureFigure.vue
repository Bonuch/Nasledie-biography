<template>
  <div class="biography-photo__container"
       v-if="this.pictureLeft || this.pictureHorizontal || this.pictureMainSection || pictureInfo || pictureSliderHard || pictureSlider || pictureMainHard || pictureMain">
    <div class="biography-photo-back" v-if="this.pictureLeft && this.pictureLeft.length > 0">
      <figure
          @mouseover="openFig"
          @mouseleave="hideFig"
          v-for="(item, index) in this.pictureLeft" :key="index"
      >
        <img v-if="croppedPhoto" :src="croppedPhoto" alt="#"
             class="biography-photo biography-photo__side">
        <img v-else-if="item.cropped.url" :src="item.cropped.url" alt="#"
             class="biography-photo biography-photo__side">
        <img v-else-if="item.cropped.photo" :src="item.cropped.photo" alt="#"
             class="biography-photo biography-photo__side">
        <figcaption class="fig-under" v-if="typeof item.textUnder === 'object' && item.textUnder.text.length > 0">
          {{ item.textUnder.text }}
        </figcaption>
        <div
            v-if="typeof item.textOver === 'object' && item.textOver.text.length > 0"
            class="photo-fig-over photo-fig-hidden"
            :class="{'photo-fig-bottom': typeof item.textUnder === 'object' && item.textUnder.text.length > 0, 'photo-fig-anim': visibleFig}"
        >
          <p>
            {{ item.textOver.text }}
          </p>
        </div>

      </figure>
    </div>

    <div class="biography-photo-back" v-if="this.pictureHorizontal && this.pictureHorizontal.length > 0">
      <figure
          @mouseover="openFig"
          @mouseleave="hideFig"
          v-for="(item, index) in this.pictureHorizontal" :key="index"
      >
        <img v-if="croppedPhoto" :src="croppedPhoto" alt="#"
             class="biography-photo biography-photo__side biography-photo__horizontal">
        <img v-else-if="item.cropped.url" :src="item.cropped.url" alt="#"
             class="biography-photo biography-photo__side biography-photo__horizontal">
        <img v-else-if="item.cropped.photo" :src="item.cropped.photo" alt="#"
             class="biography-photo biography-photo__side biography-photo__horizontal">
        <figcaption class="fig-under" v-if="typeof item.textUnder === 'object' && item.textUnder.text.length > 0">{{
            item.textUnder.text
          }}
        </figcaption>
        <div
            v-if="typeof item.textOver === 'object' && item.textOver.text.length > 0"
            class="photo-fig-over photo-fig-hidden"
            :class="{'photo-fig-bottom': typeof item.textUnder === 'object' && item.textUnder.text.length > 0, 'photo-fig-anim': visibleFig}"
        >
          <p>
            {{ item.textOver.text }}
          </p>
        </div>
      </figure>
    </div>

    <div class="biography-photo-back" v-if="this.pictureMainSection">
      <figure
          @mouseover="openFig"
          @mouseleave="hideFig"
      >
        <img v-if="croppedPhoto" :src="croppedPhoto" alt="#"
             class="biography-photo biography-photo__side">
        <img v-else-if="this.pictureMainSection.cropped.url" :src="this.pictureMainSection.cropped.url" alt="#"
             class="biography-photo biography-photo__side">
        <img v-else-if="this.pictureMainSection.cropped.photo" :src="this.pictureMainSection.cropped.photo" alt="#"
             class="biography-photo biography-photo__side">

        <figcaption class="fig-under  fig-under-main"
                    v-if="typeof this.pictureMainSection.textUnder === 'object' && this.pictureMainSection.textUnder.text.length > 0">
          {{ this.pictureMainSection.textUnder.text }}
        </figcaption>
        <div
            v-if="typeof this.pictureMainSection.textOver === 'object' && this.pictureMainSection.textOver.text.length > 0"
            class="photo-fig-over photo-fig-hidden"
            :class="{'photo-fig-bottom': typeof this.pictureMainSection.textUnder === 'object' && this.pictureMainSection.textUnder.text.length > 0, 'photo-fig-anim': visibleFig}"
        >
          <p>
            {{ this.pictureMainSection.textOver.text }}
          </p>
        </div>
      </figure>
    </div>

    <div class="#" v-if="pictureInfo">
      <figure
          v-for="(item, indexIdx) in pictureInfo"
          :key="indexIdx"
          @mouseover="openFig"
          @mouseleave="hideFig"
      >
        <img :src="item.result" alt="#" class="biography-photo">
        <figcaption class="fig-under" v-if="typeof item.textUnder === 'object' && item.textUnder.text.length > 0">
          {{ item.textUnder }}
        </figcaption>
        <div
            v-if="typeof item.textOver === 'object' && item.textOver.text.length > 0"
            class="photo-fig-over photo-fig-hidden"
            :class="{'photo-fig-bottom': typeof item.textUnder === 'object' && item.textUnder.text.length > 0, 'photo-fig-anim': visibleFig}"
        >
          <p>
            {{ item.textOver }}
          </p>
        </div>
      </figure>
    </div>

    <div class="biography-photo-back" v-if="pictureSliderHard">
      <figure
          @mouseover="openFig"
          @mouseleave="hideFig"
      >
        <img v-if="pictureSliderHard.cropped.url" :src="pictureSliderHard.cropped.url" alt="#" class="biography-photo">
        <figcaption class="fig-under"
                    v-if="typeof pictureSliderHard.textUnder === 'object' && pictureSliderHard.textUnder.text.length > 0">
          {{ pictureSliderHard.textUnder.text }}
        </figcaption>
        <div
            v-if="typeof pictureSliderHard.textOver === 'object' && pictureSliderHard.textOver.text.length > 0"
            class="photo-fig-over photo-fig-hidden"
            :class="{'photo-fig-bottom': typeof pictureSliderHard.textUnder === 'object' && pictureSliderHard.textUnder.text.length > 0, 'photo-fig-anim': visibleFig}"
        >
          <p>
            {{ pictureSliderHard.textOver.text }}
          </p>
        </div>
      </figure>
    </div>

    <div class="biography-photo-back" v-if="pictureSlider">
      <figure
          :id="count"
          @mouseover="openFig"
          @mouseleave="hideFig"
      >
        <img v-if="pictureSlider.cropped" :src="pictureSlider.cropped.photo" alt="#" class="biography-photo">
        <figcaption class="fig-under"
                    v-if="typeof pictureSlider.textUnder === 'object' && pictureSlider.textUnder.text.length > 0">
          {{ pictureSlider.textUnder.text }}
        </figcaption>
        <div
            v-if="typeof pictureSlider.textOver === 'object' && pictureSlider.textOver.text.length > 0"
            class="photo-fig-over photo-fig-hidden"
            :class="{'photo-fig-bottom': typeof pictureSlider.textUnder === 'object' && pictureSlider.textUnder.text.length > 0, 'photo-fig-anim': visibleFig}"
        >
          <p>
            {{ pictureSlider.textOver.text }}
          </p>
        </div>
      </figure>
    </div>

    <div class="biography-some-images" v-if="pictureMainHard">
      <div class="biography-photo-back" v-for="(item, indexIdxH) in pictureMainHard"
           :key="indexIdxH">
        <figure
            @mouseover="openFig"
            @mouseleave="hideFig"

        >
          <img v-if="item.cropped.url !== undefined"
               :src="item.cropped.url" alt="#"
               class="biography-photo biography-photo__side">
          <figcaption class="fig-under" v-if="typeof item.textUnder === 'object' && item.textUnder.text">{{
              item.textUnder.text
            }}
          </figcaption>

          <div
              v-if="typeof item.textOver === 'object' && item.textOver.text.length > 0"
              class="photo-fig-over photo-fig-hidden"
              :class="{'photo-fig-bottom': typeof item.textUnder === 'object' && item.textUnder.text, 'photo-fig-anim': visibleFig}"
          >
            <p>
              {{ item.textOver.text }}
            </p>
          </div>
        </figure>
      </div>
    </div>


    <div class="biography-photo-back" v-if="getPhotoMain">
      <figure
          @mouseover="openFig"
          @mouseleave="hideFig"
      >
        <img v-if="croppedPhoto1" :src="croppedPhoto1" alt="#"
             class="biography-photo biography-photo__side">
        <img v-else-if="croppedPhoto2" :src="croppedPhoto2" alt="#"
             class="biography-photo biography-photo__side">
        <img v-else-if="croppedPhoto3" :src="croppedPhoto3" alt="#"
             class="biography-photo biography-photo__side">
        <img v-else-if="this.getPhotoMain.cropped.url !== undefined && this.getPhotoMain.cropped.url.length > 0"
             :src="this.getPhotoMain.cropped.url" alt="#"
             class="biography-photo biography-photo__side">
        <img v-else-if="this.getPhotoMain.cropped.photo"
             :src="this.getPhotoMain.cropped.photo" alt="#"
             class="biography-photo biography-photo__side">
        <figcaption class="fig-under"
                    v-if="typeof this.getPhotoMain.textUnder === 'object' && this.getPhotoMain.textUnder.text">{{
            this.getPhotoMain.textUnder.text
          }}
        </figcaption>

        <div
            v-if="typeof this.getPhotoMain.textOver === 'object' && this.getPhotoMain.textOver.text.length > 0"
            class="photo-fig-over photo-fig-hidden"
            :class="{'photo-fig-bottom': typeof this.getPhotoMain.textUnder === 'object' && this.getPhotoMain.textUnder.text, 'photo-fig-anim': visibleFig}"
        >
          <p>
            {{ this.getPhotoMain.textOver.text }}
          </p>
        </div>

      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: "PictureFigure",
  data() {
    return {
      visibleFig: false,
      leftPicture: null
    }
  },
  props: {
    pictureInfo: {
      type: Array,
      require: true,
    },
    pictureLeft: {
      // type: Object,
      require: true,
    },
    pictureRight: {
      type: Object,
      require: true,
    },
    pictureSlider: {
      type: Object,
      require: true,
    },
    pictureSliderHard: {
      type: Object,
      require: true,
    },
    pictureHorizontal: {
      type: Array,
      require: true,
    },
    pictureMain: {
      // type: Object,
      require: true,
    },
    pictureMainHard: {
      type: Array,
      require: true,
    },
    pictureMainSection: {
      require: true,
    },
    croppedPhoto: {
      type: String,
      require: true,
    },
    croppedPhoto1: {
      type: String,
      require: true,
    },
    croppedPhoto2: {
      type: String,
      require: true,
    },
    croppedPhoto3: {
      type: String,
      require: true,
    },
    photoEdit: {
      type: Array,
      require: true,
    },
    count: {
      type: Number,
      required: false
    },
    id: {
      type: Number,
      required: false
    }
  },
  methods: {
    openFig() {
      this.visibleFig = true
    },
    hideFig() {
      this.visibleFig = false
    }
  },
  computed: {
    getPhotoMain() {
      let photo
      if (this.pictureMain) {
        this.pictureMain.forEach((item) => {
          if (item.idx === this.id) {
            photo = item
          }
        })
      }
      return photo
    }
  },
  watch: {
    pictureLeft(val) {
      return this.leftPicture = val
    }
  }
}
</script>

<style scoped lang="scss">
.biography-photo {
  position: relative;
  background: $gray;
  border-radius: 15px;
  z-index: 2;

  &__container {
    width: 100%;
  }

  &-w {
    width: 100%;
    max-height: 304px;
    object-fit: cover;
  }

  &__side {
    width: 100%;
  }

  &__horizontal {
    max-width: 1474px;
    max-height: 505px;
  }

  &__main {
    max-height: 465px;
  }

  &-back {
    //max-width: 405px;
    height: 100%;
    position: relative;
    margin-left: 35px;

    & figcaption {
      font-family: $font-nova;
      font-size: 12px;
      line-height: 14px;
      margin-left: 30px;
      padding-top: 8px;
    }

    &:after {
      content: "";
      position: absolute;
      //max-width: 405px;
      width: 100%;
      height: 100%;
      top: 13px;
      right: -6px;
      opacity: 0.2;
      border-radius: 15px;
      background-color: $green;
      z-index: 1;
    }
  }
}

.photo-fig-over {
  font-family: $font-nova;
  position: absolute;
  padding: 13px 7px 13px 20px;
  bottom: 3px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(2.5px);
  border-radius: 0 0 15px 15px;
  color: $white;
  font-size: 12px;
  line-height: 14px;
  width: 100%;
}

.photo-fig-hidden {
  display: none;
  opacity: 0;
}

.photo-fig-bottom {
  bottom: 25px;
}

.photo-fig-anim {
  display: block;
  animation: overPhotoAnim .3s forwards;
}

.biography-some-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

@keyframes overPhotoAnim {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 1280px) {
  .biography-photo__horizontal {
    max-height: 460px;
  }
}
@media (max-width: 767px) {
  .biography-photo__horizontal {
    max-height: 367px;
  }
  .fig-under {
    text-align: center;
    margin-left: 0 !important;
  }
  .biography-photo-back {
    &:after {
      height: 98%;
    }
    & figcaption {
      padding-top: 4px !important;
    }
  }
}
@media (max-width: 480px) {
  .biography-photo__horizontal {
    max-height: 258px;
  }
  .fig-under-main {
    padding-bottom: 4px;
  }
  .biography-photo-back {
    &:after {
      height: 97%;
    }
  }
}
</style>
