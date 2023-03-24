<template>
    <header>
        <div class="header">
            <div class="header_logo">
                <router-link to="/"><img src="@/assets/img/logo.svg" alt="Logo"></router-link>
            </div>
        </div>
    </header>
</template>

<script>
export default {
name: "TheHeader"
}
</script>

<style scoped lang="scss">
.header {
    max-width: 1900px;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #F0F4F7;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin: auto;
    margin-bottom: 10px;
}

.header_logo {
    padding: 15px 0 17px 74px;
}

.header_logo img {
    max-width: 198.42px;
    width: 100%;
}

@media (max-width: 767px) {
    .header_logo {
        padding: 10px 0 10px 13px;
    }
}
</style>
