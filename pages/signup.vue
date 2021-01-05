<template>
  <div
    class="p-12 w-full sm:w-4/5 md:w-3/5 mx-auto shadow-2xl rounded-md bg-white"
  >
    <form @submit.prevent="userRegistration">
      <h2 class="mb-2 text-xl text-gray-800 font-bold">
        Register for an account
      </h2>

      <div class="mb-4">
        <label class="block mb-2 text-gray-800 text-sm" for="displayName"
          >Name</label
        >
        <input
          class="border w-full px-2 py-2 rounded-md"
          type="text"
          id="displayName"
          v-model="name"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2 text-gray-800 text-sm" for="email"
          >Email</label
        >
        <input
          class="border w-full px-2 py-2 rounded-md"
          type="text"
          id="email"
          v-model="email"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2 text-gray-800 text-sm" for="password"
          >Password</label
        >
        <input
          class="border w-full px-2 py-2 rounded-md"
          type="password"
          id="password"
          v-model="password"
        />
      </div>

      <button
        class="bg-blue-600 text-white py-3 mt-2 w-full rounded-md hover:bg-blue-800"
      >
        Sign Up
      </button>
      <Error v-if="error" v-bind:error='error'/>
    </form>
    <section class="w-full pt-4 text-sm text-gray-700 text-center">
      Already have an account?
      <nuxt-link to="/login" class="text-blue-600 hover:text-blue-900"
        >Log in</nuxt-link>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import auth from "firebase/auth";
import Logo from '~/components/Logo.vue'
import Error from '~/components/Error.vue'

export default {
  components: {
    Logo,
    Error
  },

  data: function () {
    return {
      email: '',
      password: '',
      name: '',
      error: null
    }
  },

  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          res.user.sendEmailVerification();
          res.user
            .updateProfile({
              displayName: this.name,
            })
            .then(() => {
              // this.$router.back()
              // Sending to account page for the demo
              this.$router.push('/account')
            })
        })
        .catch((err) => {
          this.error = err.message
        })
    },
  },
}
</script>
