<template>
    <div class="observer"/>
</template>

<script>
export default {
    props: ['options'],
    data: () => ({
        observer: null,
    }),
    mounted() {
        const options = this.options || {
            rootMargin: '0px',
            threshold: 1
        };
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry && entry.isIntersecting) {
                if(entry.intersectionRatio == 1) {
                    this.$emit("intersect");
                }
            }
        }, options);

        this.observer.observe(this.$el);
    },
    destroyed() {
        this.observer.disconnect();
    },
};
</script>
