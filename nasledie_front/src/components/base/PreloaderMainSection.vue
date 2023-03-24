<template>
  <section class="biography-about">
    <div class="biography-about__content">
      <UISkeleton
          class="skeleton-photo"
          width="387px"
          height="467px"
          color="rgb(217, 217, 217)"
      />
      <div class="biography-about__content-block">
        <UISkeleton
            class="skeleton-text"
            style="position: absolute; left: 0"
            width="100%"
            height="90px"
            color="rgba(183, 189, 206, 0.2)"
        />
        <UISkeleton
            class="biography-desc-list__text mt-110 skeleton-text"
            width="534px"
            height="210px"
            color="rgba(183, 189, 206, 0.2)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import UISkeleton from "@/components/base/UiSkeleton";

export default {
  name: "PreloaderMainSection",
  components: {UISkeleton},
}
</script>

<style scoped lang="scss">
.skeleton-photo {
  margin-top: 27px;
  border-radius: 20px !important;
}

.skeleton-text {
  border-radius: 20px !important;
}

.biography-desc-list__text {
  max-width: 534px;
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

@media (max-width: 1280px) {
  .biography-about {
    &__img {
      max-width: 253px;
    }
  }
}

@media (max-width: 667px) {
  .biography-about {
    display: none !important;
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
        padding-left: 14px;

        &:before {
          top: -60px;
          min-height: 100%;
          height: 100%;
          width: 100%;
          padding-top: 70px;
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
  .skeleton-photo {
    width: 100% !important;
    height: 340px !important;
  }
  .biography-desc-list__text {
    display: none !important;
  }
  .biography-about__content-block {
    margin-top: -20px;
  }
  .skeleton-text {
    height: 120px;
  }
  .biography-about {
    height: 50vh;
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
