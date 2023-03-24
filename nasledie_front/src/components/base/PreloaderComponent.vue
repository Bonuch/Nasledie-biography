<template>
  <div class="preloader preloader-layer preloader-layer-1">
    <div class="preloader-layer-2 preloader-layer">
      <div class="preloader-layer preloader-layer-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreloaderComponent",
};
</script>

<style lang="scss" scoped>
.preloader {
  &-layer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    border-radius: 50%;
  }

  &-layer-1 {
    border-color: $green;
    width: 60px;
    height: 60px;
    animation: rotate 2s infinite;
    border-top-color: transparent;
    border-right-color: transparent;
  }

  &-layer-2 {
    border-color: $green;
    animation: rotate 2s infinite .4s;
    width: 45px;
    height: 45px;
    transform: rotate(-20deg);
    border-top-color: transparent;
    border-right-color: transparent;
  }

  &-layer-3 {
    border-color: $green;
    width: 30px;
    height: 30px;
    animation: rotate 2s infinite .6s;
    transform: rotate(-20deg);
    border-top-color: transparent;
    border-right-color: transparent;
  }
}

@keyframes rotate {
  from {
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
