<template>
  <div class="edit__main">
    <div class="edit__main-content">
      <div class="edit__main-content__top">
        <h2 class="edit__main-content__title">Биография</h2>
        <div class="edit__main-content__buttons">
          <div class="edit__main-content__info">Режим редактирования</div>
          <div class="edit__main-content__flex">
            <ButtonType
                class="edit__main-content__btn"
                v-for="(item, indexIdx) in buttonEdit"
                :key="indexIdx"
                :button-type="item.type"
                @exit="finishEditing"
            >
              Сохранить
            </ButtonType>
          </div>
        </div>
      </div>

      <div class="" v-if="this.preload">
        <p class="preload-text">Переход в режим редактирования</p>

        <PreloaderMainSection/>

        <div class="preloader-mobile">
          <PreloaderComponent />
        </div>
      </div>

      <EditMainSection
          v-else-if="this.getBiographyMainData && this.getBiographyMainData.length > 0 && !this.preload"
          :editContent="this.getBiographyMainData[0]"/>
      <!-- eslint-disable-->
      <EditMainSection v-else/>

      <AddSectionButton v-if="!this.preload && this.mainBiography || this.dataBiography" @click="scrollFirst()"
                        @addSection="addSection(0)"/>
      <draggable :list="list" handle=".handle" v-if="!this.preload && this.mainBiography">
        <div
            class="edit__main-create-section"
            v-for="(element, idx) in changedBiography"
            :key="element.id"
            :ref="`idxi${idx}`"
        >
          <add-new-section
              @deleteSection="deleteSection(idx)"
              :el-id='element.id'
              :editContent='element'
          ></add-new-section>

          <AddSectionButton @addSection="addSection(idx+1)"/>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ButtonType from "@/components/base/ButtonType";
import AddSectionButton from "@/components/base/AddSectionButton";
import EditSection from "@/components/base/EditSection";
import draggable from 'vuedraggable'
import {mapGetters} from 'vuex'
import axios from "axios";
import PopupRequestStatus from "@/components/base/PopupRequestStatus";
import PreloaderMainSection from "@/components/base/PreloaderMainSection";
import PreloaderComponent from "@/components/base/PreloaderComponent";

export default {
  name: "EditMain",
  components: {
    PreloaderComponent,
    PreloaderMainSection,
    PopupRequestStatus, AddSectionButton, ButtonType, EditSection, draggable,
    EditMainSection: () => import('@/components/editPage/EditMainSection'),
  },
  props: {
    nonce: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      buttonEdit: [
        // {
        //     type: 'back'
        // },
        {
          type: 'exit'
        },
        {
          type: 'save'
        },
      ],
      text: '',
      list: [],
      id: 1,
      dataBiography: [],
      mainBiography: false,
      preload: false,
    }
  },
  methods: {
    scrollFirst() {
      window.scrollTo({top: 1400, behavior: 'smooth'})
    },
    addSection(idx) {
      const section = this.$refs[`idxi${idx}`]
      if (section) {
        section.forEach((item) => {
          let top = window.scrollY + item.getBoundingClientRect().y;
          window.scrollTo({top: top - 175, behavior: 'smooth'})
        })
      } else {
        const screenHeigthBefore = document.documentElement.scrollHeight
        setTimeout(() => {
          const screenHeigthAfter = document.documentElement.scrollHeight
          if (screenHeigthBefore < screenHeigthAfter) {
            window.scrollTo({top: screenHeigthAfter, behavior: 'smooth'})
          }
        }, 10)
      }

      this.list.forEach((item) => {
        this.id = item.id
      })
      let max
      if (this.list.length > 0) {
        max = Math.max(...this.list.map(answer => answer.id))
      }
      if (max === undefined) {
        this.list.push({id: 1});
      } else {
        if (max) {
          this.list.splice(idx, 0, {id: max + 1});
        }
      }
      const inputId = this.list.map((item) => {
        return item.id
      })
      this.$store.dispatch('getInfo', this.list)
      this.$store.dispatch('getInfoIdx', inputId)
    },

    deleteSection(idx) {
      this.list.splice(idx, 1);
      this.$store.dispatch('getInfo', this.list)
    },
    finishEditing() {
      this.$emit('finishEditing')
    },
    postDataBiographyContent() {
      if (this.dataBiography && this.dataBiography.length > 0) {
        this.dataBiography.forEach((item) => {
          if (item.mainPhoto ?? item.mainText ?? item.title) {
            this.$store.dispatch('getMainSection', this.dataBiography[0])
            this.$store.dispatch('getMergeMainArray')
          }
        })
      }
      if (this.dataBiography && this.dataBiography.length > 0) {
        const inputId = this.dataBiography.slice(1).map((item) => {
          return item.id
        })
        this.list = this.dataBiography.slice(1)
        this.$store.dispatch('getInfo', this.dataBiography.slice(1))
        this.$store.dispatch('getInfoIdx', inputId)
        // this.$store.dispatch('getMergedArrays')
      }
    }
  },
  computed: {
    ...mapGetters({
      getBiographyData: 'getBiographyData',
      getBiographyMainData: 'getBiographyMainData'
    }),
    changedBiography() {
      if (this.getBiographyData.length > 0) {
        return this.getBiographyData
      }
      return this.list
    }
  },
  async created() {
    let url = process.env.VUE_APP_API_URL_EDIT
    try {
      if(window.biography.nonce.length > 0) {
          this.nonce = window.biography.nonce
      }
      this.preload = true
      let slug = window.biography.slug;
      // const slug = 'index';
      let router = window.location.host

      const { data } = await axios.post(`https://${router}/${url}/`, {
          slug: slug,
      }, {
          headers: {
              'X-WP-Nonce': this.nonce,
              'content-type': 'application/json',
          }})
      // const {data} = await axios.post(`https://i1web-testov.nasledie.digital/${url}/`, {
      //   slug: slug,
      // })

      if (data.biography) {
        this.dataBiography = data.biography
      }

      // console.log(this.dataBiography)
      this.postDataBiographyContent()
      this.mainBiography = true
      await this.$store.dispatch('getMainBiography', this.mainBiography)

      this.preload = false
    } catch (ex) {
      console.log('cant fetch data' + ex)
    }
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
  z-index: 10;

  &-text {
    text-align: center;
    font-family: $font-nova;
    font-size: 20px;
  }
}

.edit__main {
  //margin-right: 28px;
  //max-width: 924px;
  width: 100%;

  &-content {

    &__info {
      font-family: $font-nova;
      padding: 10px 22px;
      border: 1px dashed $black;
      filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.12));
      border-radius: 4px;
      color: $green;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      margin-right: 16px;
    }

    &__top {
      display: flex;
      justify-content: space-between;
      padding: 40px 36px 27px 38px;
    }

    &__buttons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &__flex {
      display: flex;
    }

    &__title {
      color: $text-color;
      font-weight: 600;
      font-size: 32px;
      line-height: 38px;
    }

    &__btn {
      &::v-deep {
        .button {
          margin-left: 10px;
        }
      }
    }
  }

  &-create-section {
    margin: 35px 0;
  }
}

@media (max-width: 1199px) {
  .edit__main {
    &-content {
      padding: 4px 8px 20px 7px;

      &__top {
        padding: 4px 8px 20px 7px;

      }
    }
  }
}

@media(max-width: 800px) {
  .edit__main {
    margin-right: 0;

    &-content {
      &__top {
        flex-direction: column;
      }

      &__title {
        margin-bottom: 15px;
      }

      &__buttons {
        flex-direction: column;
        align-items: flex-start;
      }

      &__info {
        margin-right: 0;
        padding: 7px 15px;
        margin-bottom: 15px;
      }

      &__btn {
        margin-left: 10px;

        &:first-child {
          margin-left: 0;
        }

        &::v-deep {
          .button {
            margin-left: 0;
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .edit__main {
    &-create-section {

    }
  }
}
</style>
