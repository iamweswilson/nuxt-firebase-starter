<template>
  <header class="flex flex-row justify-between py-5 items-center">
    <nuxt-link to="/" class="leading-tight font-bold text-blue-600 text-2xl"
      >Starter</nuxt-link
    >
    <div class="flex flex-sm items-center">
      <NuxtLink to="/about" class="text-gray-600 text-sm hover:text-blue-600"
        >About</NuxtLink
      >
      <AccountDropdown v-if="$store.state.user" class="ml-8" />
      <nuxt-link
        to="/login"
        class="opacity-60 hover:opacity-100 text-sm text-white bg-blue-600 hover:bg-blue-800 px-5 py-2 ml-4 rounded-full"
        v-else
        >Log In</nuxt-link
      >
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountDropdown from '~/components/AccountDropdown.vue'

export default {
  components: {
    AccountDropdown,
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  methods: {
    signOut: function (err) {
      this.$store
        .dispatch('signOut')
        .catch((err) => {
          alert(err.message)
        })
        .then(() => this.$router.push('/'))
    },
  },
}
</script>
