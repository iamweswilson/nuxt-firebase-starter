<template>
  <section>
    <article class="p-12 w-full sm:w-4/5 md:w-3/5 mx-auto shadow-2xl rounded-md bg-white">
      <form @submit.prevent>
        <h2 class="mb-2 text-xl text-gray-800 font-bold">Forgot Password</h2>
        <div class="mb-4">
          <label class="block mb-2 text-gray-800 text-sm" for="email"
          >Email</label
        >
          <input
            type="email"
            placeholder="type the email you signed up with"
            v-model="email"
            id="email"
            class="bg-white px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <div class="mb-4">
      <transition name="fade">
        <p
          class="mt-4 py-1 px-2 bg-white text-sm rounded-md text-red-700 bg-red-100 border border-red-300 text-center"
          v-if="error"
        >
          {{ error }}
        </p>
      </transition>
          <button
            type="submit"
            @click="sendEmail"
            class="bg-blue-600 text-white py-3 mt-2 w-full rounded-md hover:bg-blue-800"
          >
            <transition name="fade" mode="out-in">
              <span v-if="!emailSending">Send reset link</span>
              <span v-else>Sending...</span>
            </transition>
          </button>
    <section class="w-full pt-4 text-sm text-gray-700 text-center">
      Remeber your password?
      <nuxt-link to="/login" class="text-blue-600 hover:text-blue-900"
        >Log in</nuxt-link
      >
    </section>
        </div>
      </form>
    </article>
  </section>
</template>

<script>
import firebase from "firebase/app";
import auth from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      error: null,
      emailSending: false,
    };
  },
  methods: {
    sendEmail() {
      if (!this.email) {
        this.error = "Please type in a valid email address.";
        return;
      }
      this.error = null;
      this.emailSending = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.emailSending = false;
        })
        .catch(error => {
          this.emailSending = false;
          this.error = error.message;
        });
    },
  },
};
</script>