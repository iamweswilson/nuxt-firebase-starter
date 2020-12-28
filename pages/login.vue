<template>
  <div
    class="p-12 w-full sm:w-4/5 md:w-3/5 mx-auto shadow-2xl rounded-md bg-white"
  >
    <form @submit.prevent="userSignIn">
      <h2 class="mb-2 text-xl text-gray-800 font-bold">
        Log in to your account
      </h2>

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
        Continue
      </button>

      <Error v-if="error" v-bind:error='error'/>

    </form>
    <section class="w-full pt-4 text-sm text-gray-700 text-center">
      Forgot your password?
      <nuxt-link to="/forgotPassword" class="text-blue-600 hover:text-blue-900"
        >Reset it</nuxt-link
      >
    </section>
    <section class="w-full pt-2 text-sm text-gray-700 text-center">
      Don't have an account?
      <nuxt-link to="/signup" class="text-blue-600 hover:text-blue-900"
        >Register</nuxt-link
      >
    </section>
  </div>
</template>

<script>
import Error from '~/components/Error.vue'

export default {
  name: 'login',

  components: {
    Error
  },
  data: function () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    userSignIn: function (err) {
      this.$store
        .dispatch('signInWithEmail', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.email = ''
          this.password = ''
          this.$router.back()
        })
        .catch((err) => {
          this.error = err.message
        })
    },
  },
}
</script>
