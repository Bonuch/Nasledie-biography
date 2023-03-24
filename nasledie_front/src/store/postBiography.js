/* eslint-disable */
import axios from "axios";
import Vue from 'vue'

export default {
   state: {
      mainBiography: false,
      mainArray: [],
      info: [],
      mainSection: [],
      mainSectionObj: {},
      typeSection: {},
      title: [],
      text: [],
      main: [],
      mainText: [],
      photo: [],
      idOfRequest: null,
      id: null,
      idMain: null,
      idSect: null,
      realId: null,
      objId: [],
      mergedArray: [],
      mainPhoto: [],
      textOver: '',
      textUnder: '',
      textOverMain: '',
      textUnderMain: '',
      photoArr: [],
      photoEditArr: [],
      sliderId: null,
      photoIdx: null,
      preloader: false,
      statusActive: false,
      statusActiveError: false,
      fileList: null,
      croppedPhoto: {},
      croppedPhotoMain: {},
      copy: {},
      copyMain: {},
      progress: 0,
      imageLoaded: false,
   },
   mutations: {
      setMainBiography(state, payload) {
         state.mainBiography = payload
      },
      setInfo(state, info) {
         state.info = info
      },
      setPhoto(state, photo) {
         state.photo = photo
      },
      setPhotoArr(state, photo) {
         state.photoEditArr = photo
         if (state.photoEditArr) {
            state.photoEditArr.forEach((el) => {
               state.sliderId = el.id
               state.photoIdx = el.idx
            })
         }
      },
      setInfoIdx(state, idx) {
         state.id = idx
      },
      setTypeSection(state, typeSection) {
         state.typeSection = typeSection
      },
      setObjId(state, id) {
         state.objId = id

         if (Array.isArray(state.objId)) {
            state.objId.forEach((item) => {
               if (state.id && state.id.length > 0) {
                  state.id.forEach((realId) => {
                     if (item.id === realId) {
                        state.idSect = item.id
                     }
                  })
               }
            })
         }
      },
      setCroppedPhoto(state, croppedPhoto) {
         state.croppedPhoto = croppedPhoto
         if (croppedPhoto.idx) {
            state.sliderId = croppedPhoto.id
            state.photoIdx = croppedPhoto.idx
         }
      },
      setTextInputOver(state, text) {
         state.textOver = text
         if (text.idx || text.idxs) {
            state.sliderId = text.id
            state.photoIdx = text.idx
         }
      },
      setTextInputUnder(state, text) {
         state.textUnder = text
         if (text.idx || text.idxs) {
            state.sliderId = text.id
            state.photoIdx = text.idx
         }
      },
      setTextInputOverMain(state, text) {
         state.textOverMain = text
      },
      setTextInputUnderMain(state, text) {
         state.textUnderMain = text
      },
      setMainSection(state, arr) {
         state.mainSectionObj = arr
      },
      setMainSectionTitle(state, main) {
         state.main = main
      },
      setMainSectionMainText(state, text) {
         state.mainText = text
      },
      setMainSectionMainPhoto(state, photo) {
         state.mainPhoto = photo
      },
      setMainSectionTextOver(state, over) {
         state.textOver = over
      },
      setMainSectionTextUnder(state, under) {
         state.textUnder = under
      },
      setRequestStatus(state, status) {
         state.statusActive = status
      },
      setRequestStatusError(state, status) {
         state.statusActiveError = status
      },

      setCroppedMainPhoto(state, croppedPhoto) {
         state.croppedPhotoMain = croppedPhoto
      },
      setFileList(state, file) {
         state.fileList = file
      },
      mergeMainArray(state) {
         let mainTitle
         let mainText
         let mainPhoto
         let textMainOver
         let textMainUnder
         let croppedPhoto
         let originalPhoto

         if (Array.isArray(state.main)) {
            mainTitle = state.mainSectionObj.title
         } else if (state.main) {
            mainTitle = state.main.title
         }

         if (Array.isArray(state.mainText)) {
            mainText = state.mainSectionObj.mainText
         } else if (state.mainText) {
            mainText = state.mainText.text
         }

         if (Object.keys(state.textOverMain).length > 0) {
            textMainOver = state.textOverMain
         } else {
            if (state.mainSectionObj.mainPhoto) {
               textMainOver = state.mainSectionObj.mainPhoto.textOver
            }
         }
         if (Object.keys(state.textUnderMain).length > 0) {
            textMainUnder = state.textUnderMain
         } else {
            if (state.mainSectionObj.mainPhoto) {
               textMainUnder = state.mainSectionObj.mainPhoto.textUnder
            }
         }
         if (state.mainPhoto.result) {
            originalPhoto = state.mainPhoto.result
            mainPhoto = [state.mainPhoto]
         } else {
            if (state.mainSectionObj.mainPhoto) {
               state.mainSectionObj.mainPhoto.forEach((item) => {
                  originalPhoto = item.result
               })
            }
            mainPhoto = state.mainSectionObj.mainPhoto
         }
         if (Object.keys(state.croppedPhotoMain).length > 0) {
            croppedPhoto = state.croppedPhotoMain
         } else {
            if (state.mainSectionObj.mainPhoto) {
               croppedPhoto = state.mainSectionObj.mainPhoto.forEach((item) => item.cropped)
            }
         }
         if (Object.keys(state.mainSectionObj).length > 0) {
            if (state.mainSection.length > 0) {
               state.mainSection.forEach((item) => {
                  state.copyMain = item.mainPhoto
                  item.id = 0
                  item.typeSection = 'main-section'
                  item.title = mainTitle
                  item.mainText = mainText
                  item.mainPhoto = mainPhoto
                  if (croppedPhoto) {
                     item.mainPhoto.forEach((item) => {
                        item.cropped = croppedPhoto
                     })
                  }
                  if (textMainOver) {
                     item.mainPhoto.forEach((item) => {
                        item.textOver = textMainOver
                     })
                  }
                  if (textMainUnder) {
                     item.mainPhoto.forEach((item) => {
                        item.textUnder = textMainUnder
                     })
                  }

               })
            } else {
               state.mainSection.push({
                  id: 0,
                  typeSection: 'main-section',
                  title: state.mainSectionObj.title,
                  mainText: state.mainSectionObj.mainText,
                  mainPhoto: state.mainSectionObj.mainPhoto,
               })
            }
         } else {
            if (state.mainSection.length > 0) {
               state.mainSection.forEach((item) => {
                  state.copyMain = item.mainPhoto

                  item.typeSection = 'main-section'
                  item.id = 0
                  item.title = mainTitle
                  item.mainText = mainText
                  if (mainPhoto) {
                     item.mainPhoto = mainPhoto
                  }
                  if (croppedPhoto) {
                     item.mainPhoto.forEach((item) => {
                        item.cropped = croppedPhoto
                     })
                  }
                  if (textMainOver) {
                     item.mainPhoto.forEach((item) => {
                        item.textOver = textMainOver
                     })
                  }
                  if (textMainUnder) {
                     item.mainPhoto.forEach((item) => {
                        item.textUnder = textMainUnder
                     })
                  }
               })
            } else {
               state.mainSection.push({
                  id: 0,
                  typeSection: 'main-section',
                  title: mainTitle,
                  mainText: mainText,
                  mainPhoto: mainPhoto,
               })
            }
         }
         // console.log(state.mainSection, 'state.mainSection')
      },
      mergeArrays(state) {
         if (state.typeSection.type === 'line') {
            state.info.forEach((item) => {
               if (item.id === state.typeSection.id) {
                  item.typeSection = state.typeSection.type
               }
            })
         } else {
            state.info.forEach((item) => {
               if (item.id === state.idSect) {
                  if (state.title.length > 0) {
                     state.title.forEach((el) => {
                        if (el.id === state.idSect) {
                           item.title = el.title
                        }
                     })
                  }
                  if (state.text.length > 0) {
                     state.text.forEach((el) => {
                        if (el.id === state.idSect) {
                           item.text = el.text
                        }
                     })
                  }
                  if (item.id === state.typeSection.id) {
                     item.typeSection = state.typeSection.type
                     if (item.id === state.textOver.id) {
                        if (Object.keys(state.textOver).length > 0) {
                           state.photo.textOver = state.textOver
                           if (state.textOver.idx) {
                           } else if (state.textOver.idxs) {
                              if (state.typeSection.type === 'slider') {
                                 item.photo.forEach((itemText) => {
                                    if (itemText.textOver) {
                                       if (itemText.textOver.idxs === state.textOver.idxs) {
                                          itemText.textOver = state.textOver
                                       }
                                    } else {
                                       if (itemText.idxs === state.textOver.idxs) {
                                          itemText.textOver = state.textOver
                                       }
                                    }
                                 })
                              }
                           } else {
                              item.photo.forEach((item) => {
                                 item.textOver = state.textOver
                              })
                           }
                        }
                     }
                     if (item.id === state.textUnder.id) {
                        if (Object.keys(state.textUnder).length > 0) {
                           state.photo.textUnder = state.textUnder
                           if (state.textUnder.idx) {
                           } else if (state.textUnder.idxs) {
                              if (state.typeSection.type === 'slider') {
                                 item.photo.forEach((item) => {
                                    if (item.textUnder) {
                                       if (item.textUnder.idxs === state.textUnder.idxs) {
                                          item.textUnder = state.textUnder
                                       }
                                    } else {
                                       if (item.idxs === state.textUnder.idxs) {
                                          item.textUnder = state.textUnder
                                       }
                                    }
                                 })
                              }
                           } else {
                              item.photo.forEach((item) => {
                                 item.textUnder = state.textUnder
                              })
                           }
                        }
                     }
                     if (item.id === state.croppedPhoto.id) {
                        if (Object.keys(state.croppedPhoto.photo).length > 0) {
                           if (state.photo.cropped !== state.croppedPhoto) {
                              if (state.photo.id === state.croppedPhoto.id) {
                                 state.photo.cropped = state.croppedPhoto
                              }
                           }
                           if (Array.isArray(item.photo))
                              {
                              if (state.croppedPhoto.idx) {
                              }
                              else if (state.croppedPhoto.idxs) {
                                 if (state.typeSection.type === 'slider') {
                                    item.photo.forEach((item) => {
                                       if (item.cropped) {
                                          if (item.cropped.idxs === state.croppedPhoto.idxs) {
                                             item.cropped = state.croppedPhoto
                                          }
                                       } else {
                                          if (item.idxs === state.croppedPhoto.idxs) {
                                             item.cropped = state.croppedPhoto
                                          }
                                       }
                                    })
                                 }
                              }
                              else {
                                 item.photo.forEach((item) => {
                                    item.cropped = state.croppedPhoto //Обнуление idwp и url, при смене кропа фото
                                 })
                              }
                           }
                        }
                     }
                  }

                  if (item.id === state.sliderId) {
                     if (state.typeSection.type === 'vertical-photo' || state.typeSection.type === 'horizontal-photo') {
                        if (state.photoEditArr.length > 1 && (item.photo1 === undefined || item.photo2 === undefined || item.photo3 === undefined)) {
                           state.photoEditArr.forEach((elIdx) => {
                              if (item.photo1 === undefined) {
                                 if (elIdx.idx === 1) {
                                    item.photo1 = elIdx
                                 }
                              }
                              if (item.photo2 === undefined) {
                                 if (elIdx.idx === 2) {
                                    item.photo2 = elIdx
                                 }
                              }
                              if (item.photo3 === undefined) {
                                 if (elIdx.idx === 3) {
                                    item.photo3 = elIdx
                                 }
                              }
                           })
                        }
                        if (state.photoIdx === 1) {
                           if (item.photo1 === undefined) {
                              item.photo1 = state.photoEditArr[0]
                           }

                           if (state.photoEditArr.length > 0 && item.photo1.idx === state.photoEditArr[0].idx) {
                              item.photo1.result.original = state.photoEditArr[0].result.original
                           }
                           if (state.croppedPhoto.photo && state.croppedPhoto.idx === 1) {
                              item.photo1.cropped = state.croppedPhoto
                           }
                           if (state.textOver && state.textOver.idx === 1) {
                              item.photo1.textOver = state.textOver
                           }
                           if (state.textUnder && state.textUnder.idx === 1) {
                              item.photo1.textUnder = state.textUnder
                           }
                           state.copy = item.photo1
                        } else if (state.photoIdx === 2) {
                           if (item.photo2 === undefined) {
                              if (state.photoEditArr[0] !== undefined) {
                                 item.photo2 = state.photoEditArr[0]
                              }
                           }
                           if (state.photoEditArr.length > 0 && item.photo2.idx === state.photoEditArr[0].idx) {
                              item.photo2.result.original = state.photoEditArr[0].result.original
                           }
                           if (state.croppedPhoto.photo && state.croppedPhoto.idx === 2) {
                              item.photo2.cropped = state.croppedPhoto
                           }
                           if (state.textOver && state.textOver.idx === 2) {
                              item.photo2.textOver = state.textOver
                           }
                           if (state.textUnder && state.textUnder.idx === 2) {
                              item.photo2.textUnder = state.textUnder
                           }
                           state.copy = item.photo2
                        } else if (state.photoIdx === 3) {
                           if (item.photo3 === undefined) {
                              if (state.photoEditArr[0] !== undefined) {
                                 item.photo3 = state.photoEditArr[0]
                              }
                           }
                           if (state.photoEditArr.length > 0 && item.photo3.idx === state.photoEditArr[0].idx) {
                              item.photo3.result.original = state.photoEditArr[0].result.original
                           }
                           if (state.croppedPhoto.photo && state.croppedPhoto.idx === 3) {
                              item.photo3.cropped = state.croppedPhoto
                           }
                           if (state.textOver && state.textOver.idx === 3) {
                              item.photo3.textOver = state.textOver
                           }
                           if (state.textUnder && state.textUnder.idx === 3) {
                              item.photo3.textUnder = state.textUnder
                           }
                           state.copy = item.photo3
                        }
                     }

                     if (state.photoIdx !== undefined) {
                        if (state.typeSection.type === 'vertical-photo' || state.typeSection.type === 'horizontal-photo') {
                           item.photo = []
                           if (item.photo1 && Object.keys(item.photo1).length > 0) {
                              state.copy = item.photo1
                              item.photo.push(item.photo1)
                           }
                           if (item.photo2 && Object.keys(item.photo2).length > 0) {
                              state.copy = item.photo2
                              item.photo.push(item.photo2)
                           }
                           if (item.photo3 && Object.keys(item.photo3).length > 0) {
                              state.copy = item.photo3
                              item.photo.push(item.photo3)
                           }
                        }
                     } else {
                        if (state.photoEditArr && state.photoEditArr.length > 0) {
                           state.photoEditArr.forEach((el) => {
                              if (el.id === state.textOver.id) {
                                 if (el.idxs === state.textOver.idxs) {
                                    el.textOver = state.textOver
                                 }
                              }
                              if (el.id === state.textUnder.id) {
                                 if (el.idxs === state.textUnder.idxs) {
                                    el.textUnder = state.textUnder
                                 }
                              }
                              if (el.id === state.croppedPhoto.id) {
                                 if (el.idxs === state.croppedPhoto.idxs) {
                                    el.cropped = state.croppedPhoto
                                 }
                              }
                              if (item.id === el.id) {
                                 item.photo = state.photoEditArr
                              }
                           })
                        }
                     }
                  }
                  else if (item.id === state.photo.id && state.typeSection.type !== 'line') {
                     if (item.photo && item.photo.length > 0) {
                        state.copy = item.photo
                     }
                     item.photo = [state.photo]
                  }
               }
            })
         }

         // console.log(state.info, 'info2')
      },
      setTitleInput(state, title) {
         state.title = title

         state.title.forEach((item) => {
            if (item.id) {
               state.idSect = item.id
            }
         })
      },
      setTextInput(state, text) {
         state.text = text

         state.text.forEach((item) => {
            if (item.id) {
               state.idSect = item.id
            }
         })
      },
      update(state) {
         return state.info
      },
      backUp(state) {
         if (state.mainSection && state.mainSection.length > 0) {
            state.mainSection.forEach((item) => {
               if (item.mainPhoto) {
                  item.mainPhoto = state.copyMain
               }
               if (!item.mainPhoto[0].cropped) {
                  delete item.mainPhoto
               }
            })
         }
         if (state.info && state.info.length > 0) {
            state.info.forEach((item) => {
               if (item.id === state.idSect) {
                  if (item.id === state.typeSection.id) {
                     if (item.photo) {
                        let copyId
                        let photoId = item.photo[0].id

                        if (state.copy.length > 0) {
                           copyId = state.copy[0].id
                        }
                        if (photoId === copyId) {
                           item.photo = state.copy
                        }
                     }
                     if (!item.photo[0].cropped) {
                        delete item.photo
                     }
                  }

                  if (item.photo1) {
                     let copyId = state.copy.id
                     let copyIdx = state.copy.idx
                     let photoId = item.photo1.id
                     let photoIdx = item.photo1.idx

                     if (photoId === copyId) {
                        if (photoIdx === copyIdx) {
                           item.photo1 = state.copy
                        }
                     }
                     if (item.photo1.cropped === undefined) {
                        delete item.photo1
                     }
                  }

                  if (item.photo2) {
                     let copyId = state.copy.id
                     let copyIdx = state.copy.idx
                     let photoId = item.photo2.id
                     let photoIdx = item.photo2.idx
                     if (photoId === copyId) {
                        if (photoIdx === copyIdx) {
                           item.photo2 = state.copy
                        }
                     }
                     if (item.photo2.cropped === undefined) {
                        delete item.photo2
                     }
                  }

                  if (item.photo3) {
                     let copyId = state.copy.id
                     let copyIdx = state.copy.idx
                     let photoId = item.photo3.id
                     let photoIdx = item.photo3.idx

                     if (photoId === copyId) {
                        if (photoIdx === copyIdx) {
                           item.photo3 = state.copy
                        }
                     }
                     if (item.photo3.cropped === undefined) {
                        delete item.photo3
                     }
                  }
               }
            })
         }
      },
   },
   actions: {
      getBackUp({commit}) {
         commit('backUp')
      },
      getMainBiography({commit}, payload) {
         commit('setMainBiography', payload)
      },
      getCroppedPhoto({commit}, croppedPhoto) {
         commit('setCroppedPhoto', croppedPhoto)
      },
      getCroppedMainPhoto({commit}, croppedPhoto) {
         commit('setCroppedMainPhoto', croppedPhoto)
      },
      getFileList({commit}, file) {
         commit('setFileList', file)
      },
      getInfo({commit}, info) {
         commit('setInfo', info)
      },
      getUpdate({commit}) {
         commit('update')
      },
      getPhoto({commit}, photo) {
         commit('setPhoto', photo)
      },
      getPhotoArr({commit}, photo) {
         commit('setPhotoArr', photo)
      },
      getInfoIdx({commit}, idx) {
         commit('setInfoIdx', idx)
      },
      getTypeSection({commit}, name) {
         commit('setTypeSection', name)
      },
      getTitleInput({commit}, title) {
         commit('setTitleInput', title)
      },
      getObjId({commit}, id) {
         commit('setObjId', id)
      },
      getMainSectionTitle({commit}, main) {
         commit('setMainSectionTitle', main)
      },
      getMainSectionText({commit}, text) {
         commit('setMainSectionText', text)
      },
      getMainSectionMainText({commit}, text) {
         commit('setMainSectionMainText', text)
      },
      getMainSectionMainPhoto({commit}, photo) {
         commit('setMainSectionMainPhoto', photo)
      },
      getMainSectionTextOver({commit}, over) {
         commit('setMainSectionTextOver', over)
      },
      getMainSectionTextUnder({commit}, under) {
         commit('setMainSectionTextUnder', under)
      },
      getMainSection({commit}, arr) {
         commit('setMainSection', arr)
      },
      getTextInput({commit}, text) {
         commit('setTextInput', text)
      },
      getTextInputOver({commit}, text) {
         commit('setTextInputOver', text)
      },
      getTextInputUnder({commit}, text) {
         commit('setTextInputUnder', text)
      },
      getTextInputOverMain({commit}, text) {
         commit('setTextInputOverMain', text)
      },
      getTextInputUnderMain({commit}, text) {
         commit('setTextInputUnderMain', text)
      },
      getMergedArrays({commit}) {
         commit('mergeArrays')
      },
      getMergeMainArray({commit}) {
         commit('mergeMainArray')
      },
      getRequestStatus({commit}, status) {
         commit('setRequestStatus', status)
      },
      getRequestStatusError({commit}, status) {
         commit('setRequestStatusError', status)
      },
      deletePhotoFromSlider({state}, payload) {
         state.info.forEach((item) => {
            if (item.id === payload.id) {
               item.photo.forEach((el) => {
                  if (el.cropped === undefined) {
                     item.photo.splice(el.idxs - 1, 1)
                  }
               })
            }
         })
      },
      cancelSaveImageRequest({state}, payload) {
         state.info.forEach((item) => {
            if (item.id === payload.id) {
               item.photo.forEach((photo) => {
                  photo.result = {}
                  if (photo.idx === payload.idx) {
                     photo.result = {}
                  } else if (photo.idxs === payload.idxs) {
                     photo.result = {}
                  }
               })
            }
         })
      },

      async postPhotoOriginal({state}, payload) {
         state.imageLoaded = true
         state.idOfRequest = payload
         let result = ''

         state.info.forEach((item) => {
            if (item.id === state.idOfRequest.id) {
               if (item.photo && item.photo.length > 0) {
                  item.photo.forEach((photo) => {
                     result = photo.result.original
                     if (photo.idx === payload.idx) {
                        result = photo.result.original
                     } else if (photo.idxs === payload.idxs) {
                        result = photo.result.original
                     }
                  })
               }
            }
         })
         try {
            if (window.biography.nonce.length > 0) {
               this.nonce = window.biography.nonce

               const data = {
                  original: result,
               }
               const config = {
                  onUploadProgress: function (progressEvent) {
                     state.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  },
                  headers: {
                     'X-WP-Nonce': this.nonce,
                     'content-type': 'application/json',
                  }
               };
               let router = window.location.host
               const res = await axios.post(`https://${router}/wp-json/iweb/v1/biography/image/original/save/`,
                   data,
                   config
               )

               state.info.forEach((item) => {
                  if (item.id === state.idOfRequest.id) {
                     item.photo.forEach((photo) => {
                        if (photo.idx) {
                           if (photo.idx === payload.idx) {
                              photo.result.idwp = res.data.data.ID
                              photo.result.original = res.data.data.url
                           }
                        } else if (photo.idxs) {
                           if (photo.idxs === payload.idxs) {
                              photo.result.idwp = res.data.data.ID
                              photo.result.original = res.data.data.url
                           }
                        } else {
                           photo.result.idwp = res.data.data.ID
                           photo.result.original = res.data.data.url
                        }
                     })

                  }
               })

            }
            state.imageLoaded = false
         } catch
             (e) {
            console.log('cant fetch data:', e)
         }
      },

      async postPhotoCropped({state}, payload) {
         state.idOfRequest = payload
         let croppedImage = ''
         let id = ''
         state.info.forEach((item) => {
            if (item.id === state.idOfRequest.id) {
               if (item.photo && item.photo.length > 0) {
                  item.photo.forEach((photo) => {
                     croppedImage = photo.cropped.photo
                     id = photo.result.idwp
                     if (photo.idx === payload.idx) {
                        croppedImage = photo.cropped.photo
                        id = photo.result.idwp
                     } else if (photo.idxs === payload.idxs) {
                        croppedImage = photo.cropped.photo
                        id = photo.result.idwp
                     }
                  })
               }
            }
         })

         try {
            if (window.biography.nonce.length > 0) {
               this.nonce = window.biography.nonce

               const cropped = {
                  cropped: croppedImage,
                  idwp_original: id,
               }

               let router = window.location.host
               const res = await axios.post(`https://${router}/wp-json/iweb/v1/biography/image/cropped/save/`,
                   cropped,
                   {
                      headers: {
                         'X-WP-Nonce': this.nonce,
                         'content-type': 'application/json',
                      }
                   }
               )
               state.info.forEach((item) => {
                  if (item.id === state.idOfRequest.id) {
                     item.photo.forEach((photo) => {
                        if (photo.idx) {
                           if (photo.idx === payload.idx) {
                              photo.cropped.idwp = res.data.data.ID
                           }
                        } else if (photo.idxs) {
                           if (photo.idxs === payload.idxs) {
                              photo.cropped.idwp = res.data.data.ID
                           }
                        } else {
                           photo.cropped.idwp = res.data.data.ID
                        }
                     })

                  }
               })
            }
         } catch
             (e) {
            console.log('cant fetch data:', e)
         }
      },

      async postDataBiography({state}) {
         state.preloader = true

         state.mergedArray = [...state.mainSection, ...state.info]
         state.mergedArray.forEach((item) => {
            if (item.photo) {
               item.photo.forEach((item) => {
                  if (item.cropped) {
                     if (item.cropped.idwp.toString().length > 0) {
                        delete item.cropped.url
                        delete item.cropped.photo
                        delete item.cropped.id
                     }
                     if (item.result.idwp.toString().length > 0) {
                        delete item.result.url
                        delete item.result.original
                     }
                  }
               })
            }
            if (item.mainPhoto) {
               item.mainPhoto.forEach((item) => {
                  if (item.cropped.idwp.toString().length > 0) {
                     delete item.cropped.url
                     delete item.cropped.photo
                  }
                  if (item.result.idwp.toString().length > 0) {
                     delete item.result.url
                     delete item.result.original
                  }
               })
            }
            if (item.photo1 ?? item.photo2 ?? item.photo3) {
               delete item.photo1
               delete item.photo2
               delete item.photo3
            }
         })
         // console.log(state.mergedArray, 'state.mergedArray')
         try {
            if (window.biography.nonce.length > 0) {
               this.nonce = window.biography.nonce
            }
            let person_id = window.biography.id

            let router = window.location.host
            const data = {
               post_person: person_id,
               biography: state.mergedArray,
            }
            await axios.post(`https://${router}/wp-json/iweb/v1/biography/save/`, {
               data: data
            }, {
               headers: {
                  'X-WP-Nonce': this.nonce,
                  'content-type': 'application/json',
               }
            })
            await axios.post(`https://${router}/wp-json/iweb/v1/biography/permissions/`, data, {
               headers: {
                  'X-WP-Nonce': this.nonce,
                  'content-type': 'application/json',
               }
            })
                .then((res) => {
                   if (res.status === 200) {
                      state.statusActive = true
                   }
                })
            state.preloader = false
         } catch (ex) {
            state.preloader = false
            state.statusActiveError = true
            console.log('cant fetch data' + ex)
         }
      },
   },
   getters: {
      returnStateImageLoaded(state) {
         return state.imageLoaded
      },
      returnProgress(state) {
         return state.progress
      },
      returnMainBiography(state) {
         return state.mainBiography
      },
      getBiographyData(state) {
         return state.info
      },
      getBiographyMainData(state) {
         return state.mainSection
      },
      getTypeSection(state) {
         return state.typeSection
      },
      getInputTitle(state) {
         return state.title
      },
      getInputText(state) {
         return state.text
      },
      getInfoIdx(state) {
         return state.id
      },
      returnStatusActive(state) {
         setTimeout(() => {
            state.statusActive = false
         }, 3000)
         return state.statusActive
      },
      returnPreloader(state) {
         return state.preloader
      },
      returnStatusActiveError(state) {
         return state.statusActiveError
      },
      returnFileList(state) {
         return state.fileList
      },
      returnMainSection(state) {
         return state.mainSectionObj
      }
   },
}
