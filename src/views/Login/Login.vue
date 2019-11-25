<template src="./Login.html"></template>
<script>
//import api from "../../services/backend";
import auth from "../../services/auth";
export default {
  name: "login",
  data: function () {
    return {
      username: "",
      password: "",
      passIsVisible: false,
      errors: { pass: false, user: false, wrongCredentials: false },
      loading: false
    };
  },
  mounted() {
    auth.logout()
  },
  methods: {
    userValid: function () {
      return this.username.trim().length > 0;
    },
    passValid: function () {
      return this.password.trim().length > 0;
    },
    login: function () {
      this.loading = true;
      if (this.userValid() && this.passValid()) {
        auth.login(this.username, this.password).then(() => {
          this.$router.push("/main/dashboard");
        }).catch(error => {
          console.error(error);
          this.loading = false;
          this.errors.wrongCredentials = true;
        });
      } else {
        this.loading = false;
        this.errors.user = true;
        this.errors.password = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./Login.scss";
</style>


