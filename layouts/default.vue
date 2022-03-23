<template lang="pug">
  div.wrapper-app
    TheNavBar
    Nuxt
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="scss">
#__nuxt,
#__layout {
  height: 100%;

  .wrapper-app {
    height: 100%;
    background: #f7f7f7;
  }
}
</style>
