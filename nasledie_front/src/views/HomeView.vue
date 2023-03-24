<template>
    <main class="main">
        <div class="preload" v-if="returnPreloader">
            <PreloaderComponent/>
            <p class="preload-text">Сохранение...</p>
        </div>

        <div class="container-home" v-else>
            <div class="" v-if="this.getStatus"></div>
            <EditMain
                v-if="active || this.getStatus"
                @finishEditing="finishEditing"
            />

            <BiographyMain
                v-else
                @switchPanel="switchPanel"
            />
        </div>
    </main>
</template>

<script>
/* eslint-disable */
import BiographyMain from "@/components/biography/BiographyMain";
import EditMain from "@/components/editPage/EditMain";
import {mapGetters} from "vuex";
import PreloaderComponent from "@/components/base/PreloaderComponent";

export default {
    name: "HomeView",
    components: {
        PreloaderComponent,
        EditMain,
        BiographyMain,
    },
    data() {
        return {
            active: false,
            nonce: ''
        }
    },

    methods: {
        switchPanel() {
            this.active = true
            this.preload = false
        },
        finishEditing() {
            this.active = !this.active
        },
    },
    computed: {
        ...mapGetters({
            returnStatusActive: 'returnStatusActive',
            returnStatusActiveError: 'returnStatusActiveError',
            returnPreloader: 'returnPreloader'
        }),
        getStatus() {
            if(this.returnStatusActive) {
                this.active = false
            }
            if(this.returnStatusActiveError) {
                this.active = false
            }
            // this.active = false
            return this.active
        }
    }
}
</script>

<style scoped lang="scss">
.preload {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    &-text {
        font-family: $font-nova;
        font-size: 20px;
     }
}
.container-home {
    display: flex;
    justify-content: flex-start;
    max-width: 1880px;
    width: 100% !important;
    margin: 0 auto;
}

@media (max-width: 1168px) {
    .container-home {
        display: block;
    }
}
</style>
