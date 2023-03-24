<template>
  <div class="ndmodal file-stream__modal" style="display: flex;">
    <div class="ndmodal__inner">
      <div class="ndmodal__header ndmodal-header file-stream__header">
        <h3 class="ndmodal-header__title">Файлопоток</h3>
        <div class="file-stream_search">
          <input
              type="text"
              name="file-stream__search-input"
              placeholder="Поиск изображения"
              v-model="searchPhoto"
          >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11 4.5C7.13401 4.5 4 7.63401 4 11.5C4 15.366 7.13401 18.5 11 18.5C12.9333 18.5 14.6819 17.7176 15.9497 16.4497C17.2176 15.1819 18 13.4333 18 11.5C18 7.63401 14.866 4.5 11 4.5ZM2 11.5C2 6.52944 6.02944 2.5 11 2.5C15.9706 2.5 20 6.52944 20 11.5C20 13.6246 19.2628 15.5784 18.0319 17.1176L21.7071 20.7929C22.0976 21.1834 22.0976 21.8166 21.7071 22.2071C21.3166 22.5976 20.6834 22.5976 20.2929 22.2071L16.6176 18.5319C15.0784 19.7628 13.1246 20.5 11 20.5C6.02944 20.5 2 16.4706 2 11.5Z"
                  fill="#B7BDCE"></path>
          </svg>
        </div>
        <div class="ndmodal__close" @click="closeMediaModal">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                  fill="#B7BDCE"></path>
          </svg>
        </div>
      </div>
      <div class="str">
        <p>Изображения</p>

        <label>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 15H4V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8M2 18H14"
                stroke="#326E5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M18 17H18.01M14 9.2C14 8.537 14.597 8 15.333 8H20.667C21.403 8 22 8.537 22 9.2V18.8C22 19.463 21.403 20 20.667 20H15.333C14.597 20 14 19.463 14 18.8V9.2Z"
                stroke="#326E5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <span>Загрузить с устройства</span>

          <EditSliderUpload
              v-if="sliderUpload"
              @getPhotoEdit="getPhotoEdit"
              @getPhotoEditIdx="getEditPhotoIdxs"
              @sendPost="openCroppModal"
              :sectionId="this.sectionId"
              :editContent="this.content"
              :idxsFromDownload="this.idxsFromCropp"
              :idxsNow="this.idxsNow"
              :type="'slider'"
          />

          <EditPictUpload
              v-else
              :id="this.id"
              @sendPost="openCroppModal"
              @getPhotoEdit="getPhotoEdit"
              :content="this.content"
              :sectionId="this.sectionId"
              class="edit-section__pict"
          />
        </label>
      </div>
      <div class="ndmodal-content">

        <div class="ndmodal-content__files">
          <div class="file-stream_search file-stream_search-mobile">
            <input
                type="text"
                name="file-stream__search-input"
                placeholder="Поиск изображения"
                v-model="searchPhoto"
            >
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11 4.5C7.13401 4.5 4 7.63401 4 11.5C4 15.366 7.13401 18.5 11 18.5C12.9333 18.5 14.6819 17.7176 15.9497 16.4497C17.2176 15.1819 18 13.4333 18 11.5C18 7.63401 14.866 4.5 11 4.5ZM2 11.5C2 6.52944 6.02944 2.5 11 2.5C15.9706 2.5 20 6.52944 20 11.5C20 13.6246 19.2628 15.5784 18.0319 17.1176L21.7071 20.7929C22.0976 21.1834 22.0976 21.8166 21.7071 22.2071C21.3166 22.5976 20.6834 22.5976 20.2929 22.2071L16.6176 18.5319C15.0784 19.7628 13.1246 20.5 11 20.5C6.02944 20.5 2 16.4706 2 11.5Z"
                    fill="#B7BDCE"></path>
            </svg>
          </div>

          <form>
            <div class="file-stream__list">
              <div
                  class="file-stream__item"
                  v-for="(item, index) in filteredArticles"
                  :key="index"
                  v-show="item.url.length > 0"
              >
                <div
                    v-if="item.url && item.url.length > 0"
                    @click="choosePict(item)"
                >

                  <div
                      class="file-stream__item--icon"
                      :class="{'file-stream--icon__active': active && item.post_id === dataToPost}"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="22" height="22" rx="3" fill="#326E5B"
                            stroke="#326E5B" stroke-width="2"></rect>
                      <path
                          d="M16.456 7.45474C16.6673 7.25357 16.9485 7.14236 17.2402 7.14456C17.5319 7.14677 17.8114 7.26223 18.0196 7.46657C18.2279 7.67091 18.3486 7.94815 18.3563 8.2398C18.364 8.53144 18.2581 8.81468 18.061 9.02974L12.076 16.5147C11.9731 16.6256 11.8488 16.7145 11.7108 16.7763C11.5727 16.838 11.4236 16.8713 11.2723 16.8741C11.1211 16.8769 10.9709 16.8492 10.8306 16.7926C10.6903 16.736 10.5629 16.6517 10.456 16.5447L6.48697 12.5757C6.37644 12.4727 6.28779 12.3485 6.2263 12.2105C6.16481 12.0725 6.13175 11.9236 6.12908 11.7725C6.12642 11.6215 6.1542 11.4714 6.21078 11.3313C6.26737 11.1913 6.35158 11.064 6.45841 10.9572C6.56524 10.8503 6.69249 10.7661 6.83257 10.7096C6.97265 10.653 7.1227 10.6252 7.27375 10.6278C7.42481 10.6305 7.57378 10.6636 7.71178 10.7251C7.84978 10.7866 7.97398 10.8752 8.07697 10.9857L11.218 14.1252L16.4275 7.48774C16.4368 7.47619 16.4469 7.46517 16.4575 7.45474H16.456Z"
                          fill="white"></path>
                    </svg>
                  </div>

                  <div class="file-stream__image">

                    <img :src="item.url" alt="" class="attachment-thumbnail size-thumbnail">
                  </div>
                  <div
                      v-if="item.title"
                      class="file-stream-item__title"
                      v-html="item.title"
                      :class="{'file-stream-item__title--active': active && item.post_id === dataToPost}"
                  ></div>
                  <input type="checkbox" name="file-stream-item">
                </div>
              </div>
              <PreloaderComponent
                  v-if="this.preloader"
              />
              <IntersectionObserver
                  @intersect="intersected"
              />
            </div>
            <div class="ndmodal-content__footer">
              <div class="str-mobile">
                <label>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 15H4V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8M2 18H14"
                        stroke="#326E5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M18 17H18.01M14 9.2C14 8.537 14.597 8 15.333 8H20.667C21.403 8 22 8.537 22 9.2V18.8C22 19.463 21.403 20 20.667 20H15.333C14.597 20 14 19.463 14 18.8V9.2Z"
                        stroke="#326E5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <span>Загрузить с устройства</span>

                  <EditSliderUpload
                      v-if="sliderUpload"
                      @getPhotoEdit="getPhotoEdit"
                      @getPhotoEditIdx="getEditPhotoIdxs"
                      @sendPost="openCroppModal"
                      :sectionId="this.sectionId"
                      :editContent="this.content"
                      :idxsFromDownload="this.idxsFromCropp"
                      :idxsNow="this.idxsNow"
                      :type="'slider'"
                  />

                  <EditPictUpload
                      v-else
                      :id="this.id"
                      @sendPost="openCroppModal"
                      @getPhotoEdit="getPhotoEdit"
                      :content="this.content"
                      :sectionId="this.sectionId"
                      class="edit-section__pict"
                  />
                </label>
              </div>

              <button type="button" class="button-cancel ndbutton" @click="unChoose">Отменить
                выбор
              </button>
              <button
                  type="button"
                  class="button-action ndbutton"
                  :disabled="!this.active"
                  :active="this.active"
                  data-section="avatar"
                  @click="sendPhoto"
              >
                Загрузить
              </button>
            </div>
            <div class="ndmodal-content__footer ndmodal-content__footer-mobile">
              <div v-if="!this.active" class="str-mobile">
                <label>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 15H4V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8M2 18H14"
                        stroke="#326E5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M18 17H18.01M14 9.2C14 8.537 14.597 8 15.333 8H20.667C21.403 8 22 8.537 22 9.2V18.8C22 19.463 21.403 20 20.667 20H15.333C14.597 20 14 19.463 14 18.8V9.2Z"
                        stroke="#326E5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <span>Загрузить с устройства</span>

                  <EditSliderUpload
                      v-if="sliderUpload"
                      @getPhotoEdit="getPhotoEdit"
                      @getPhotoEditIdx="getEditPhotoIdxs"
                      @sendPost="openCroppModal"
                      :sectionId="this.sectionId"
                      :editContent="this.content"
                      :idxsFromDownload="this.idxsFromCropp"
                      :idxsNow="this.idxsNow"
                      :type="'slider'"
                  />

                  <EditPictUpload
                      v-else
                      :id="this.id"
                      @sendPost="openCroppModal"
                      @getPhotoEdit="getPhotoEdit"
                      :content="this.content"
                      :sectionId="this.sectionId"
                      class="edit-section__pict"
                  />
                </label>
              </div>

              <button v-if="this.active" type="button" class="button-cancel ndbutton" @click="unChoose">Отменить
                выбор
              </button>
              <button
                  v-if="this.active"
                  type="button"
                  class="button-action ndbutton"
                  :disabled="!this.active"
                  :active="this.active"
                  data-section="avatar"
                  @click="sendPhoto"
              >
                Загрузить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import {mapGetters} from "vuex";
import IntersectionObserver from "@/components/base/IntersectionObserver";
import PreloaderComponent from "@/components/base/PreloaderComponent";
import EditSliderUpload from "@/components/base/EditSliderUpload";
import EditPictUpload from "@/components/base/EditPictUpload";

export default {
  name: "MediaModal",
  components: {EditPictUpload, EditSliderUpload, PreloaderComponent, IntersectionObserver},
  data() {
    return {
      dataList: [],
      active: false,
      timeout: null,
      debouncedInput: '',
      selectedPict: null,
      objId: [],
      photoMore: [],
      textOver: '',
      textUnder: '',
      page: 1,
      preloader: false,
      idxs: 0,
      photo: [],
      beingPhoto: [],
      dataToPost: null,
    }
  },
  props: {
    sectionId: {
      type: Number,
    },
    type: {
      type: String,
      required: false,
    },
    content: {
      required: false,
    },
    id: {
      type: Number
    },

    idxsNow: {
      type: Number,
      required: false,
    },
    idxsFromCropp: {
      type: Number
    },
    editContent: {
      type: Object,
      require: true,
    },
    sliderUpload: {
      type: Boolean,
      required: false,
      default: false
    },
    edit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    getEditPhotoIdxs(val) {
      this.$emit('getEditPhotoIdxs', val)
    },
    getPhotoEdit(val) {
      this.$emit('getPhotoEdit', val)
    },
    openCroppModal() {
      if (this.id === 1) {
        this.$emit('openCroppModal1')
      } else if (this.id === 2) {
        this.$emit('openCroppModal2')
      } else if (this.id === 3) {
        this.$emit('openCroppModal3')
      } else {
        this.$emit('openCroppModal')
      }
    },
    closeMediaModal() {
      this.$emit('closeMediaModal', false)
    },
    choosePict(val) {
      this.active = true
      this.selectedPict = val
      this.dataToPost = val.post_id
    },
    unChoose() {
      this.active = false
    },
    sendPhoto() {
      if (!this.objId.length) {
        this.objId.push({id: this.sectionId})
      }

      if (this.type) {
        this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.type})
      } else {
        this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.getTypeSection.type})
      }
      this.$store.dispatch('getObjId', this.objId)

      if (this.type === 'slider') {
        if (this.idxsFromCropp) {
          this.idxs = this.idxsFromCropp
          this.beingPhoto = this.editContent.photo
          this.beingPhoto.forEach((item) => {
            if (item.idxs) {
              if (item.idxs === this.idxsFromCropp) {
                item.result.original = this.selectedPict.url
                item.result.url = ''
                item.result.idwp = this.selectedPict.post_id
              }
            }
          })
          this.$store.dispatch('getPhotoArr', this.beingPhoto)
          this.$store.dispatch('getMergedArrays')
        } else {
          if (this.editContent.photo) {
            this.beingPhoto = this.editContent.photo
            if(this.idxsNow) {
              this.idxs = this.idxsNow
            }
            this.idxs++;
            this.beingPhoto.push({
              result: {
                original: this.selectedPict.url,
                url: '',
                idwp: this.selectedPict.post_id,
              },
              textOver: this.textOver,
              textUnder: this.textUnder,
              id: this.sectionId,
              idxs: this.idxs
            })
            this.$store.dispatch('getPhotoArr', this.beingPhoto)
            this.$store.dispatch('getMergedArrays')
          } else {
            this.idxs++;
            this.photo.push({
              result: {
                original: this.selectedPict.url,
                url: '',
                idwp: this.selectedPict.post_id,
              },
              textOver: this.textOver,
              textUnder: this.textUnder,
              id: this.sectionId,
              idxs: this.idxs
            })
            this.$store.dispatch('getPhotoArr', this.photo)
            this.$store.dispatch('getMergedArrays')
          }
          if (this.photo.length > 0) {
            this.$emit('getPhotoEdit', this.photo)
            this.$emit('getPhotoEditIdx', this.photo.slice(-1)[0].idxs)
          } else {
            this.$emit('getPhotoEdit', this.beingPhoto)
            this.$emit('getPhotoEditIdx', this.beingPhoto.slice(-1)[0].idxs)
          }
        }
      }

      if (this.sectionId === 0) {
        this.$store.dispatch('getMainSectionMainPhoto', {
          result: {
            original: this.selectedPict.url,
            url: '',
            idwp: this.selectedPict.post_id,
          },
          textOver: this.textOver,
          textUnder: this.textUnder
        })
        this.$store.dispatch('getMergeMainArray')
        this.$emit('getPhotoEdit', this.photo)
      } else {
        if (this.getTypeSection.type === 'vertical-photo') {
          if (this.content && this.content.length > 0) {
            this.photoMore = this.content

            this.photoMore.push({
              result: {
                original: this.selectedPict.url,
                url: '',
                idwp: this.selectedPict.post_id,
              },
              textOver: this.textOver,
              textUnder: this.textUnder,
              id: this.sectionId,
              idx: this.id
            })
            if(this.edit) {
              this.$store.dispatch('getPhotoArr', this.photoMore.slice(-1))
              this.$store.dispatch('getMergedArrays')
            } else {
              this.$store.dispatch('getPhotoArr', this.photoMore)
              this.$store.dispatch('getMergedArrays')
            }
          } else {
            this.photoMore.push({
              result: {
                original: this.selectedPict.url,
                url: '',
                idwp: this.selectedPict.post_id,
              },
              textOver: this.textOver,
              textUnder: this.textUnder,
              id: this.sectionId,
              idx: this.id
            })
            this.$store.dispatch('getPhotoArr', this.photoMore.slice(-1))
            this.$store.dispatch('getMergedArrays')
          }

        }
        else if (this.getTypeSection.type === 'horizontal-photo') {
          if (this.content && this.content.length > 0) {
            this.photoMore = this.content
            this.photoMore.push({
              result: {
                original: this.selectedPict.url,
                url: '',
                idwp: this.selectedPict.post_id,
              },
              textOver: this.textOver,
              textUnder: this.textUnder,
              id: this.sectionId,
              idx: this.id
            })
            if(this.edit) {
              this.$store.dispatch('getPhotoArr', this.photoMore.slice(-1))
              this.$store.dispatch('getMergedArrays')
            } else {
              this.$store.dispatch('getPhotoArr', this.photoMore)
              this.$store.dispatch('getMergedArrays')
            }
          } else {
            this.photoMore.push({
              result: {
                original: this.selectedPict.url,
                url: '',
                idwp: this.selectedPict.post_id,
              },
              textOver: this.textOver,
              textUnder: this.textUnder,
              id: this.sectionId,
              idx: this.id
            })
            this.$store.dispatch('getPhotoArr', this.photoMore.slice(-1))
            this.$store.dispatch('getMergedArrays')
          }
        }
        else {
          this.$store.dispatch('getPhoto', {
            result: {
              original: this.selectedPict.url,
              url: '',
              idwp: this.selectedPict.post_id,
            },
            textOver: this.textOver,
            textUnder: this.textUnder,
            id: this.sectionId
          })
          this.$store.dispatch('getMergedArrays')
        }
      }

      this.$store.dispatch('getMergedArrays')
      // }
      if (this.type === 'slider') {
        this.$emit('photoFromMedia', this.selectedPict)
      }
      if (this.id) {
        this.$emit('photoFromMedia', this.selectedPict, this.id)
      } else {
        this.$emit('photoFromMedia', this.selectedPict)
      }
    },
    async intersected() {
      let data = new FormData();
      this.page++;

      data.append('action', 'ndfuOpenFileStream')
      data.append('page', `${this.page}`)
      try {
        this.preload = true
        let router = window.location.host

        // const res = await axios.post(`https://i1web-testov.nasledie.digital/wp-admin/admin-ajax.php`, data,
            const res = await axios.post(`https://${router}/wp-admin/admin-ajax.php`, data,
            {
              headers: {
                "Content-Type": "text/plain"
              }
            })

        const items = res.data;

        items.forEach((item) => {
          this.$set(this.dataList, this.dataList.length, item)
        })

        this.preload = false
      } catch (ex) {
        console.log('cant fetch data' + ex)
      }

    },
  },
  computed: {
    ...mapGetters({
      getTypeSection: 'getTypeSection',
    }),
    filteredArticles() {
      let list_array = this.dataList,
          searchString = this.debouncedInput;

      if (!searchString) {
        return list_array;
      }

      searchString = searchString.trim().toLowerCase();

      list_array = list_array.filter(function (item) {
        if (item.title.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      })

      return list_array;
    },
    searchPhoto: {
      get() {
        return this.debouncedInput;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedInput = val;
        }, 250);
      }
    },
  },
  async created() {
    let data = new FormData();

    data.append('action', 'ndfuOpenFileStream')
    let router = window.location.host
    try {
      // const res = await axios.post(`https://i1web-testov.nasledie.digital/wp-admin/admin-ajax.php`, data,
          const res = await axios.post(`https://${router}/wp-admin/admin-ajax.php`, data,
          {
            headers: {
              "Content-Type": "text/plain"
            }
          })
      this.dataList = res.data
    } catch (e) {
      console.log('cant fetch data', e)
    }
  }
}
</script>

<style scoped lang="scss">
.input[type="checkbox"] {
  display: none;
}

.ndmodal h1 {
  color: #444444;
  font-size: 48px;
  font-weight: 600;
  line-height: 60px;
  letter-spacing: 0px;
  text-align: left;
  opacity: .3;

}

.ndmodal h2 {
  color: #444444;
  font-size: 32px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0px;
  text-align: left;

}

.ndmodal h3 {
  color: #444444;
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0px;
  text-align: left;

}

.ndmodal h4 {
  color: #444444;
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0px;
  text-align: left;
}

.ndmodal h5 {
  color: #444444;
  font-size: 18px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: left;
}

.ndmodal p {
  color: #444444;
  font-family: $font-nova;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
}

.ndmodal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 5555;
  background: rgba(0, 0, 0, 0.3);
}

.ndmodal__inner {
  border-radius: 12px;
  box-shadow: 0 2px 20px 0 #0000001A;
  background: #FAFAFA;
}

.ndmodal__header {
  position: relative;
  padding: 22px;
  background: linear-gradient(0deg, #F5F2F3, #F5F2F3),
  linear-gradient(0deg, #F0F4F7, #F0F4F7);
  border: 1px solid #F0F4F7;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.ndmodal__close {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0;
  padding: 8px;
  cursor: pointer;
}

.ndmodal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 35px 100px 22px;
  background: #FAFAFA;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.ndmodal-content__prompt {
  margin-bottom: 50px;
  color: #444444;
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0;
  text-align: center;

}

.ndmodal-create-folder .ndmodal-content {
  border-radius: 12px;
}

h3.ndmodal-header__title {
  font-style: normal;

  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  color: #444444;
}

@media screen and (max-width: 650px) {
  .ndmodal {
    top: unset;
    bottom: 0;
  }
  .ndmodal .ndmodal__inner {
    border-radius: unset;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .ndmodal-content {
    padding: 35px 25px 65px;
  }
  .ndmodal h4 {
    color: #444444;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0px;
    text-align: left;
  }
  h3.ndmodal-header__title {
    font-size: 20px;
  }
  .ndmodal-create-folder .ndmodal__inner {
    width: 100%;
  }
  .ndmodal-create-folder .ndmodal-content {
    border-radius: unset;
  }
}

.file-stream__modal .file-stream__list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 350px;
  max-height: 350px;
  overflow-y: scroll;
  gap: 10px;
  width: 960px;
}

.file-stream__item {
  display: flex;
  flex-direction: column;
  width: 195px;
  height: 185px;
  overflow: hidden;
  filter: drop-shadow(0px 2px 15px rgba(0, 0, 0, 0.12));
  border-radius: 8px;
}

.file-stream__item label {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.file-stream__image {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 155px;
}

.file-stream__item img {
  height: auto;
  object-fit: cover;
}

.file-stream-item__title {
  display: block;
  width: 204.8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 100%;
  font-family: $font-nova;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  background: #fff;
  padding: 8px;
  color: #444444;
}

.file-stream-item__title--active {
  color: #fff;
  background: #8DBEAF;
}

.file-stream__item--icon {
  display: none;
}

.file-stream--icon__active {
  display: block;
  position: absolute;
  right: 15px;
  top: 15px;
}


.ndmodal__header.file-stream__header {
  display: flex;
  align-items: center;
  gap: 50px;
  padding-left: 65px;
  border-bottom: 1px solid rgba(183, 189, 206, 0.3);
}

.file-stream_search {
  display: flex;
  position: relative;
  min-width: 50%;
}

.file-stream_search svg {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

input[name='file-stream__search-input'] {
  font-style: normal;
  color: #B7BDCE;
}

.file-stream__modal .str {
  padding: 12px 65px;
  font-family: $font-nova;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #444444;
  border-bottom: 1px solid rgba(183, 189, 206, 0.3);

  & label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & span {
      margin-left: 12px;
      font-family: $font-nova;
      color: #326E5B;
      font-size: 16px;
      font-weight: 700;
      line-height: 19px;
    }
  }
}

.file-stream__modal .ndmodal-content {
  padding: 0;
  background: #fff;
}

.file-stream__list {
  padding: 20px 65px 5px;
}

.file-stream__modal .ndmodal-content__footer {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 12px 65px;
  background: #FFFFFF;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 15px 15px;
}

.file-stream__modal button {
  padding: 12px 24px;
}

.file-stream__item:hover label {
  cursor: pointer;
}

input[type="radio"] {
  display: none;
}

input[type="checkbox"] {
  display: none;
}


/* checkbox */
label.inputCheckbox {
  position: relative;
  padding-left: 30px;
  font-size: 18rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
}

label.inputCheckbox::before {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  border: 2px solid #444444;
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 100%;
  opacity: 50%;

}

label.inputCheckbox::after {
  position: absolute;
  top: 50%;
  left: 5rem;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  background-color: #326E5B;
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 100%;
  -webkit-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  opacity: 0;
  visibility: hidden;
}

input[type="radio"]:checked + label::before {
  opacity: 1;
  border-color: #326E5B;
}

input[type="radio"]:checked + label::after {
  opacity: 1;
  visibility: visible;
}

/* radio */

/* text */
input[type="text"] {
  padding: 14px 10px;
  font-family: $font-nova;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  background: #FFFFFF;
  border: 1px solid rgba(183, 189, 206, 0.3);
  border-radius: 8px;
  width: 100%;
}

@media only screen and (max-width: 650px) {
  input[type="radio"]:checked + label::after {
    left: 1.4%;
  }
  input[type="radio"]:checked + label::before {
    outline-offset: unset;
    background-color: unset;
  }
}

.ndbutton {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  border-radius: 40rem;
  font-family: $font-nova;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  cursor: pointer;
  min-width: 160px;
  white-space: nowrap;
  cursor: pointer;
}

.button-action {
  background: #326E5B;
  color: #f1f1f1;
  border: 1px solid #B7BDCE
}

.button-action:hover {
  background: #408C74;
  border: 1px solid #B7BDCE
}

.button-action:active {
  background: linear-gradient(0deg, #B7BDCE, #B7BDCE),
  linear-gradient(0deg, #2C6050, #2C6050);
  border: 1px solid #B7BDCE
}

.button-action:disabled {
  background: #326E5B;
  opacity: 0.5;
  cursor: not-allowed;
}

.button-cancel {
  border: 1px solid #B7BDCE;
  background: #fff;
}

.button-cancel:hover {
  background: #fff;
  border: 1px solid #326E5B;
}

.fileUploader .ndmodal__inner button {
  font-weight: 400;
  font-size: 14px;
  padding: 12px 5px;

}

#abortUploader {
  min-width: 190px;
  padding: 12px 14px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}

@media only screen and (max-width: 650px) {
  .ndbutton {
    padding: 14px 5px;
    min-width: auto;
  }
  #abortUploader {
    min-width: auto;
  }

  .fileUploader .ndmodal__inner button {
    font-weight: 400;
    font-size: 14px;
    padding: 12px 14px;
    width: 100%;
  }
}
.str-mobile {
  display: none;
}
.file-stream_search-mobile {
  display: none;
}
.ndmodal-content__footer-mobile {
  display: none !important;
}
@media (max-width: 980px) {
  .ndmodal__inner {
    width: 100%;
  }
  .ndmodal-content__files {
    width: 100%;
  }
  .file-stream__list {
    width: 100% !important;
  }
}
@media (max-width: 768px) {
  .ndmodal-content__footer {

  }
  .file-stream__modal .file-stream__list {
    padding: 0 25px 25px 25px;
  }
  .ndmodal__header {
    padding-top: 16px;
    padding-bottom: 11px;
  }
}
@media(max-width: 690px) {
  .file-stream__item {
    width: 49%;
  }
  .file-stream-item__title {
    width: 100%;
  }
}
@media (max-width: 585px) {
  .ndmodal__close {
    right: 16px;
  }
  .ndmodal__header.file-stream__header {
    padding-left: 0;
    justify-content: center;
  }
  .file-stream_search {
    display: none;
  }
  .ndmodal-content__footer-mobile {
    display: flex !important;
    justify-content: center;
    border-radius: 0 !important;
  }
  .file-stream_search-mobile {
    display: flex;
    margin: 30px 25px 25px;
  }
  .file-stream__modal .str {
    display: none ;
  }
  .str-mobile {
    display: flex;
    padding: 0;
    font-family: $font-nova;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    align-items: center;
    color: #444444;

    & label {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      & span {
        margin-left: 12px;
        font-family: $font-nova;
        color: #326E5B;
        font-size: 16px;
        font-weight: 700;
        line-height: 19px;
      }
    }
  }
  .file-stream__modal .ndmodal-content__footer {
    display: none;
    padding: 20px 25px;
    flex-direction: column-reverse;
    align-items: center;
  }

  .file-stream__modal button {
    padding: 14.5px 24px;
  }

  .ndbutton {
    width: 100%;
  }

  .file-stream__item {
    width: 49%;
    height: 166px;
  }
  .file-stream__modal .file-stream__list {
    max-height: 350px;
    gap: 6px;
  }
  .file-stream__item img {
    width: 100%;
  }
}
@media(max-width: 390px) {
  .file-stream__item {
    width: 100%;
    height: 180px;
  }

}
</style>
