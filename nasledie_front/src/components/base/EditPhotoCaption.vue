<template>
  <div class="photo-caption">
    <div class="photo-caption__top">
      <h3>Подписи</h3>
      <button class="photo-caption__btn" @click="closeModal">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L7.41421 6L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071C11.3166 12.0976 10.6834 12.0976 10.2929 11.7071L6 7.41421L1.70711 11.7071C1.31658 12.0976 0.683417 12.0976 0.292893 11.7071C-0.0976311 11.3166 -0.0976311 10.6834 0.292893 10.2929L4.58579 6L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                fill="#B7BDCE"/>
        </svg>
      </button>

    </div>
    <div class="input input-over">
      <div class="input-block">
        <input id="textOver" v-model="getTextOver" placeholder=" " type="text" class="input input-text">
        <label class="placeholder" for="textOver">Подпись на фото</label>

      </div>
    </div>

    <span class="input-separator">и/или</span>
    <div class="input input-under">
      <div class="input-block">
        <input id="textUnder" v-model="getTextUnder" placeholder=" " type="text" class="input input-text">
        <label class="placeholder" for="textUnder">Подпись под фото</label>

      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "EditPhotoCaption",
  data() {
    return {
      timeout: null,
      textOver: '',
      textUnder: '',
      objId: []
    }
  },
  props: {
    sectionId: {
      type: Number
    },
    id: {
      type: Number
    },
    idxs: {
      type: Number
    },
    typeSection: {
      type: String,
    },
    content: {
      type: Object,
      require: true,
    },
    editContent: {
      type: Object,
      require: true,
    },
    editContentMain: {
      // type: Object,
      require: true,
    },
  },
  mounted() {
    if (this.editContentMain) {
      this.editContentMain.forEach((item) => {
        if (item.textOver) {
          this.textOver = item.textOver.text
        }
        if (item.textUnder) {
          this.textUnder = item.textUnder.text
        }
      })
    }

    if (this.editContent) {
      if (this.editContent.photo) {
        if (!this.editContent.photo1 ?? !this.editContent.photo2 ?? !this.editContent.photo3) {
          this.editContent.photo.forEach((item) => {
            if (item.idxs && item.textOver) {
              if (item.idxs === this.idxs) {
                this.textOver = item.textOver.text
              }
            } else {
              if (item.textOver) {
                this.textOver = item.textOver.text
              }
            }
          })
          this.editContent.photo.forEach((item) => {
            if (item.idxs && item.textUnder) {
              if (item.idxs === this.idxs) {
                this.textUnder = item.textUnder.text
              }
            } else {
              if (item.textUnder) {
                this.textUnder = item.textUnder.text
              }
            }
          })
        }
      }

      if (this.editContent.photo1) {
        if (this.id === this.editContent.photo1.textOver.idx) {
          this.textOver = this.editContent.photo1.textOver.text
        }
      }

      if (this.editContent.photo1) {
        if (this.id === this.editContent.photo1.textUnder.idx) {
          this.textUnder = this.editContent.photo1.textUnder.text
        }
      }

      if (this.editContent.photo2) {
        if (this.id === this.editContent.photo2.textOver.idx) {
          this.textOver = this.editContent.photo2.textOver.text
        }
      }

      if (this.editContent.photo2) {
        if (this.id === this.editContent.photo2.textUnder.idx) {
          this.textUnder = this.editContent.photo2.textUnder.text
        }
      }
      if (this.editContent.photo3) {
        if (this.id === this.editContent.photo3.textOver.idx) {
          this.textOver = this.editContent.photo3.textOver.text
        }
      }

      if (this.editContent.photo3) {
        if (this.id === this.editContent.photo3.textUnder.idx) {
          this.textUnder = this.editContent.photo3.textUnder.text
        }
      }

    }
  },
  computed: {
    ...mapGetters({
      getTypeSection: 'getTypeSection'
    }),
    getTextOver: {
      get() {
        return this.textOver
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          this.textOver = val

          if (this.sectionId === 0) {
            this.$store.dispatch('getTextInputOverMain', {
              text: this.textOver,
              id: this.sectionId,
            })
            this.$store.dispatch('getMergeMainArray')
            this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.typeSection})
          } else {
            if (this.typeSection === 'slider') {
              this.$store.dispatch('getTextInputOver', {
                text: this.textOver,
                id: this.sectionId,
                idxs: this.idxs
              })
            } else if (this.id) {
              if (this.editContent) {
                this.$store.dispatch('getPhotoArr', this.editContent.photo)
              }

              this.$store.dispatch('getTextInputOver', {
                text: this.textOver,
                id: this.sectionId,
                idx: this.id
              })

            } else {
              this.$store.dispatch('getTextInputOver', {
                text: this.textOver,
                id: this.sectionId,
              })
            }
            if (!this.objId.length) {
              this.objId.push({id: this.sectionId})
            }
            this.$store.dispatch('getObjId', this.objId)
            this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.typeSection})
            this.$store.dispatch('getMergedArrays')
          }

        }, 250)
      }
    },
    getTextUnder: {
      get() {
        return this.textUnder
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          this.textUnder = val

          if (this.sectionId === 0) {
            this.$store.dispatch('getTextInputUnderMain', {
              text: this.textUnder,
              id: this.sectionId,
            })
            this.$store.dispatch('getMergeMainArray')
            this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.typeSection})
          } else {
            if (this.typeSection === 'slider') {
              this.$store.dispatch('getTextInputUnder', {
                text: this.textUnder,
                id: this.sectionId,
                idxs: this.idxs
              })
            } else if (this.id) {
              if (this.editContent) {
                this.$store.dispatch('getPhotoArr', this.editContent.photo)
              }
              this.$store.dispatch('getTextInputUnder', {
                text: this.textUnder,
                id: this.sectionId,
                idx: this.id
              })
            } else {
              this.$store.dispatch('getTextInputUnder', {
                text: this.textUnder,
                id: this.sectionId,
              })
            }
            if (!this.objId.length) {
              this.objId.push({id: this.sectionId})
            }
            this.$store.dispatch('getObjId', this.objId)
            this.$store.dispatch('getTypeSection', {id: this.sectionId, type: this.typeSection})
            this.$store.dispatch('getMergedArrays')
          }
        }, 250)
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped lang="scss">
.photo-caption {
  position: absolute;
  padding: 18px 18px 35px 18px;
  border-radius: 15px;
  top: 70px;
  filter: drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1));
  background-color: $white;
  z-index: 10;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    & h3 {
      font-weight: 600;
      font-size: 24px;
      line-height: 30px;
      color: $text-color;
    }
  }

  &__btn {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
}

.placeholder {
  position: absolute;
  left: 0;
  font-family: $font-nova;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  opacity: 0.5;
  white-space: nowrap;
  transition: transform 200ms, color 200ms;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-15px) translateX(-10px) scale(0.9);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #444444;
}

.input {
  padding: 0;

  & .input-block {
    padding: 10px 56px 15px 0;
    position: relative;
  }

  &-text {
    margin-top: 3px;
    border-radius: unset;
    opacity: 1;
  }
}

.input-over {
  padding: 10px 56px 10px 10px;
  margin-bottom: 10px;
}

.input-under {
  margin-top: 15px;
  padding: 10px 56px 10px 10px;
}

.input-separator {
  font-family: $font-nova;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
}

@media (max-width: 1280px) {
  .photo-caption {
    padding: 15px 15px 25px 15px;
    top: 55px;

    &__top {
      margin-bottom: 10px;

      & h3 {
        font-size: 20px;
      }
    }
  }
  .input-over {
    padding: 10px 56px 20px 10px;
    margin-bottom: 5px;
  }

  .input-under {
    margin-top: 5px;
    padding: 10px 56px 20px 10px;
  }
}

@media(max-width: 1150px) {
  .input {
    & input {
      font-size: 12px;
    }

    & span {
      font-size: 12px;
      line-height: 18px;
    }
  }
  .input-separator {
    font-size: 12px;
  }
}
</style>
