<template>
  <div class="empty-content">
    <img src="@/assets/img/autorized/unaurized.jpg" alt="">
    <p class="empty-content-text">В этом разделе ещё нет материалов</p>
  </div>
</template>

<script>
export default {
  name: "EmptyDataUnauthorized"
}
</script>

<style scoped lang="scss">
.empty-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 37px;
  & img {
    max-width: 350px;
  }
  &-text {
    font-size: 24px;
    font-weight: 600;
    line-height: 30px;
    margin-top: 24px;
  }
}
</style>
