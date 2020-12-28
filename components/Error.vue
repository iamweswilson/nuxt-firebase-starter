<template>
  <div>
      <div class="mt-4 py-1 px-2 bg-white text-sm rounded-md text-red-700 bg-red-100 border border-red-300 text-center">{{ error }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Error',
    props: {
      error: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>