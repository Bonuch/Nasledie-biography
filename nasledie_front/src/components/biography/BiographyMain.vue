<template>
  <div class="biography__main">
    <div class="biography__main-content">
      <div class="biography__main-content__top">
        <h2 class="biography__main-content__title">Биография</h2>


        <ButtonType
            v-if="permission === 'edit'"
            @switchEditor="switchPanel"
            :buttonType="buttonEdit"
        />

        <PopupRequestStatus/>
      </div>

      <PreloaderMainSection v-if="this.preload"/>

      <div v-if="this.preload" class="preloader-mobile">
        <PreloaderComponent  />
      </div>


      <BiographyMainSection v-if="this.mainBiography && !this.preload" :content="this.dataBiography[0]"/>

      <BiographyMainSection v-else/>

      <div class="biography__main-block" v-for="(item, index) in this.dataBiography" :key="index">
        <view-block-main
            v-if="item"
            :sectionType="item"
        >
        </view-block-main>
      </div>

      <EmptyDataAuthorized v-if="permission === 'edit' && !this.dataBiography"/>

      <EmptyDataUnauthorized v-else-if="!this.dataBiography && permission !== 'edit'"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ButtonType from "@/components/base/ButtonType";
import axios from "axios";
import PopupRequestStatus from "@/components/base/PopupRequestStatus";
import PreloaderMainSection from "@/components/base/PreloaderMainSection";
import EmptyDataAuthorized from "@/components/EmptyData/EmptyDataAuthorized";
import EmptyDataUnauthorized from "@/components/EmptyData/EmptyDataUnauthorized";
import PreloaderComponent from "@/components/base/PreloaderComponent";

export default {
  name: "BiographyMain",
  components: {
    PreloaderComponent,
    EmptyDataUnauthorized,
    EmptyDataAuthorized,
    PreloaderMainSection,
    PopupRequestStatus,
    BiographyMainSection: () => import('@/components/biography/BiographyMainSection'),
    ButtonType
  },
  data() {
    return {
      buttonEdit: 'edit',
      dataBiography: [],
      preload: false,
      mainBiography: false,
      nonce: '',
      permission: ''
    }
  },
  async created() {
    try {
      let slug = window.biography.slug;
      await this.$store.dispatch('getPreloader', true)
      this.preload = true
      // const slug = '1';
      let router = window.location.host

      const {data} = await axios.post(`https://${router}/wp-json/iweb/v1/biography/get/`, {
          slug: slug
      })
      // const {data} = await axios.post(`https://i1web-testov.nasledie.digital/wp-json/iweb/v1/biography/get/`, {
      //   slug: slug
      // })
      this.dataBiography = data.biography
      if (this.dataBiography && this.dataBiography.length > 0) {
        this.dataBiography.forEach((item) => {
          if (item.mainPhoto ?? item.mainText ?? item.title) {
            this.mainBiography = true
            this.$store.dispatch('getMainBiography', this.mainBiography)
          } else {
            this.$store.dispatch('getMainBiography', this.mainBiography)
          }
        })
      }
      // console.log(this.dataBiography)
      this.preload = false
      await this.$store.dispatch('getPreloader', false)

    } catch (ex) {
      this.preload = false
      console.log('cant fetch data' + ex)
    }
  },
  async mounted() {
    try {
      if (window.biography.nonce) {
        this.nonce = window.biography.nonce
      }
      let router = window.location.host

      const data = {}
      const permission = await axios.post(`https://${router}/wp-json/iweb/v1/biography/permissions/`, data, {
        headers: {
          'X-WP-Nonce': this.nonce,
          'content-type': 'application/json',
        }
      })

      this.permission = permission.data.permissions
      // console.log(this.permission)
    } catch (ex) {
      this.preload = false
      console.log('cant fetch data' + ex)
    }
  },
  methods: {
    switchPanel() {
      this.$emit('switchPanel')
    },
  },

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
}

.biography__main {
  margin-bottom: 121px;
  max-width: 100%;
  width: 100%;
  margin-right: 20px;
  background: $white;
  border-radius: 15px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #F0F4F7;
  overflow: hidden;

  &-block {
    margin: 80px 0;
  }

  &-content {
    padding: 40px 36px 58px 40px;

    &__top {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      max-width: 1260px;
      margin: 0 auto;
    }

    &__title {
      color: $text-color;
      font-weight: 600;
      font-size: 32px;
      line-height: 38px;
    }

  }
}

@media(max-width: 1280px) {
  .biography__main {
    &-block {
      margin: 70px 0;
    }
  }
}

@media (max-width: 1168px) {
  .biography__main {
    margin: 4px 8px 20px 7px;

    &-content {
      padding: 27px 18px 36px 19px;
    }
  }
}

@media (max-width: 767px) {
  .biography__main {
    &-block {
      margin: 60px 0;
    }

    &-content {
      &__title {
        font-size: 26px;
        line-height: 32px;
      }
    }
  }
}
</style>
