<template>
    <div class="split-line">
        <svg width="307" height="12" viewBox="0 0 307 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5.99805H137" stroke="#326E5B"/>
            <rect x="153.156" y="11.3145" width="8" height="8" rx="1" transform="rotate(-135 153.156 11.3145)" fill="#326E5B"/>
            <path d="M169 5.99805H306.313" stroke="#326E5B"/>
        </svg>
    </div>
</template>

<script>
export default {
    name: "SplitLine"
}
</script>

<style scoped lang="scss">
.split-line {
    display: flex;
    justify-content: center;
    margin: 35px 0;
}

@media(max-width: 799px) {
    .split-line {
        margin: 60px 0;
    }
}
@media (max-width: 480px) {
    .split-line {
        & svg {
            width: 200px;
          }
    }
}
</style>
