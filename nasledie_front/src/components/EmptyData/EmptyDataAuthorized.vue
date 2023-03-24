<template>
  <div class="empty-content">
    <img src="@/assets/img/autorized/aurized.jpg" alt="">
    <p class="empty-content-text">Готовы создать биографию?</p>
    <p class="empty-content-desc">Нажмите на карандашик в правом верхнем углу страницы</p>
  </div>
</template>

<script>
export default {
name: "EmptyDataAuthorized"
}
</script>

<style scoped lang="scss">
.empty-content {
  & img {
    max-width: 350px;
  }
}
</style>
