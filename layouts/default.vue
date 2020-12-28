<template>
  <div id="app" class="container mx-auto px-6">
    <Header />
    <div class="flex-grow mt-6">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
  head: {
    bodyAttrs: {
      class: 'bg-blue-100 flex flex-col min-h-screen',
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
