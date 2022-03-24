<template lang="pug">
  div.wrapper-modal
    div.modal
      slot
      button(type="button" @click="$emit('close')") Close
</template>

<script>
export default {
  name: 'ModalComponent',
}
</script>

<style lang="scss">
.wrapper-modal,
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper-modal {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 300px;
    height: 300px;
    flex-direction: column;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    background: #ffffff;
  }
}
</style>
