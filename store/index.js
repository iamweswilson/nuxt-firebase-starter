import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { auth } from '~/plugins/firebase.js'
import 'firebase/storage'
Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    state: {
      user: '',
    },

    getters: {
      user(state) {
        return state.user
      },

      isAuthenticated(state) {
        return !!state.user
      }
    },

    mutations: {
      setUser(state, payload) {
        state.user = payload
      },
    },

    actions: {
      signUp({}, { email, password }) {
        return auth.createUserWithEmailAndPassword(email, password)
      },

      signInWithEmail({}, { email, password }) {
        return auth.signInWithEmailAndPassword(email, password)
      },

      signOut() {
        return auth.signOut()
      },
      updateUserName({state}, displayName) {
        state.user.updateProfile({ displayName }).then(() => {
          // Update successful.
        }, error => {
          alert(error)
        })
      },
      updatePhotoURL({state}, photoURL) {
        state.user.updateProfile({ photoURL }).then(() => {
          // Update successful.
        }, error => {
          alert(error)
        })
      },
      profilePic({state}, payload) {
        state.user.photoURL = payload
      },
      updateUserEmail({state}, email) {
        state.user.updateEmail(email).then(() => {
          // Update successful.
        }, error => {
          alert(error)
        })
      },
    }
  })
}

export default store