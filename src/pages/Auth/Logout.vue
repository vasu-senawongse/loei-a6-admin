<template> <div></div></template>
<script>
export default {
  name: 'auth.logout',
  data() {
    return {};
  },
  mounted() {
    localStorage.removeItem('user');
    window.location.href = 'http://43.229.149.124';
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  border-radius: 50%;
}
</style>
