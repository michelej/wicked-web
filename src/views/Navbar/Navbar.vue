
<template src="./Navbar.html"></template>
<script>
export default {
  name: "navbar",
  data: function () {
    return {
      window: {
        width: 0,
        height: 0
      },
      showDebug: true
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  logout: function () {
    this.$router.push('/login')
  },
  mounted() { },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  }
};
</script>
<style scoped lang="scss">
@import "./Navbar.scss";
</style>
