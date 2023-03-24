<template>
  <div>
    <div class="progress-bar">
      <span :style="{width: this.returnProgress + `%`}"></span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ProgressBar",
  computed: {
    ...mapGetters({
      returnProgress: 'returnProgress'
    }),
  }
}
</script>

<style scoped lang="scss">
.progress-bar {
  display: block;
  background: #B7BDCE;
  height: 4px;
  border-radius: 3px;
  width: 240px !important;
  & span {
    display: block;
    background: #326E5B;
    height: 100%;
    border-radius: 3px;
    transition: .1s;
  }
}
</style>
