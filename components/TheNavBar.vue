<template lang="pug">
  header.header 
    div.brand Currency Exchange
</template>

<script>
export default {
  name: 'TheNavBar',
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.header {
  height: 60px;
  background-color: $primary;
  color: #ffffff;
  display: flex;
  align-items: center;

  .brand {
    margin-left: 1rem;
  }
}
</style>
