<template lang="pug">
  div.container-card
    h2.title
     slot(name="header")
    slot
</template>

<script>
export default {
  name: 'CardComponent',
}
</script>

<style lang="scss">
.container-card {
  max-width: 400px;
  width: 100%;
  height: 400px;
  border: 1px solid #eee;
  padding: 1rem;
  background-color: #ffffff;

  h2.title {
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }
}
</style>
