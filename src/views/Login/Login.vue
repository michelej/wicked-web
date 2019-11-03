<template src="./Login.html"></template>
<script>
//import api from "../../services/backend";
import auth from "../../services/auth";
export default {
  name: "login",
  data: function() {
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
    userValid: function() {
      return this.username.trim().length > 0;
    },
    passValid: function() {
      return this.password.trim().length > 0;
    },
    login: function() {
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
.footer-text {
  font-weight: bold;
  color: #666;
}
.err-input {
  border: 0.5px solid red;
}
.err-msg {
  color: red;
  font-weight: bold;
  padding-top: 5px;
  padding-left: 45px;
}
.left-bar {
  width: calc(50% - 120px);
  height: 80px;
  background: $light-gray;
  float: left;
  padding: 0;
  margin: 0;
  position: relative;
  background-image: linear-gradient(to left, $light-gray 20%, white 80%);

  &:before {
    content: "";
    width: 0px;
    position: absolute;
    height: 80px;
    border-style: solid;
    border-width: 80px 90px 0 0;
    border-color: $light-gray transparent transparent transparent;
    display: inline-block;
    vertical-align: middle;
    right: -90px;
  }
}

.right-bar {
  width: calc(50% - 120px);
  height: 80px;
  background: $light-gray;
  float: right;
  padding: 0;
  margin: 0;
  position: relative;
  background-image: linear-gradient(to right, $light-gray 20%, white 80%);

  &:before {
    content: "";
    width: 0px;
    position: absolute;
    height: 80px;
    border-style: solid;
    border-width: 0 90px 80px 0;
    border-color: transparent $light-gray transparent transparent;
    display: inline-block;
    vertical-align: middle;
    left: -90px;
  }
}

.bottom-bar {
  width: 100%;
  height: 80px;
  background: #eaeaea;
  padding: 0;
  margin: 0;
  z-index: 4;
  background-image: linear-gradient(to left, white, #eaeaea 50%, white);
}
.btn {
  background: $green;
  color: white;
  width: 100%;
}

.fenix-title {
  height: 200px;
  span {
    position: absolute;
    top: 80px;
    color: white;
    right: calc(50% - 220px);
    font-weight: bolder;
    font-size: 3vw;
    text-align: center;
    width: 100%;
    text-shadow: 0 0 10px #eaeaea;
  }
  img {
    position: absolute;
    top: -38px;
    left: calc(50% - 150px);
    height: 300px;
    width: auto;
    opacity: 0.5;
    z-index: -1;
    transform: rotate(15deg);
  }
}

.form-control {
  background-color: #ffffff;
  background-image: none;
  border-radius: 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  color: #333333;
  display: block;
  font-size: 14px;
  line-height: 1.42857;
  padding: 6px 12px;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
}

.form-line {
  width: 88%;
}

.login-btn {
  padding-top: 30px;
}

.login-box {
  width: 410px;
  margin: 3% auto;
  background: #fff;
  min-height: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.login-page {
  background: #d2d6de;
}

.login-logo {
  font-size: 35px;
  text-align: center;
  margin-bottom: 25px;
  margin-top: 0px;
  font-weight: 300;
  h3 {
    color: black;
    text-shadow: 5px 5px 15px #666;
    font-size: 35px;
  }
}

.login-box-msg {
  margin: 0;
  text-align: center;
  padding: 0 20px 20px 20px;
  font-size: 20px;
}

.login-box-body {
  background: #fff;
  padding: 5px 20px 20px 20px;
  border-top: 0;
  color: #666;
  margin-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
}

.login-title {
  padding: 8px 0px 5px 0px;
  margin-top: 25px;
  background: #55a645;
  h3 {
    color: white !important;
    font-weight: bold !important;
  }
}

.has-feedback {
  position: relative;
}

.form-group {
  margin-bottom: 15px;
}

.has-feedback .form-control {
  padding-right: 42.5px;
}

.login-box-body .form-control-feedback .form-control-feedback {
  color: #777;
}

.form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  pointer-events: none;
}

.footer-text {
  font-weight: bold;
}

.input-group-addon {
  min-width: 40px;
  text-align: left;
}

.alert-danger {
  text-align: justify;
  text-justify: inter-word;
  padding: 5px 0px 5px 0px;
}

.login-logo-top {
  position: absolute;
  top: 10px;
  left: 5%;
  z-index: 1000;
  border: 1px #333333 solid;
}

.input-group-prepend {
  min-width: 42px !important;
}

.input-group-text {
  width: 100% !important;
}

.btn-success {
  background-image: linear-gradient(#88c149, #73a839 60%, #699934);
  font-weight: bold;
}

h3 {
  background: #eaeaea;
  color: black;
  padding: 15px 10px 15px 10px;
  font-size: 30px;
}

@media screen and (max-width: 550px) {
  .holder {
    margin-left: 0px;
    margin-right: 0px;
  }
}

@media screen and (max-height: 768px) {
  .bottom-bar {
    display: none;
  }
  .login-box {
    width: 410px;
    margin: 1% auto;
  }
  .login-box-body {
    margin-bottom: 0px;
  }
  .login-logo {
    margin-bottom: 0px;
  }
  .login-btn {
    padding-top: 10px;
  }
}

@media screen and (max-width: 826px) {
  .login-logo-top {
    display: none;
  }
}

@media screen and (max-width: 435px) {
  .login-box {
    width: 355px;
    margin: 7% auto;
    border: 0px;
    background: #fff;
    min-height: 50px;
    box-shadow: none;
    position: relative;
    margin-bottom: 30px;
  }
  .alert {
    font-size: 14px;
    margin-bottom: 0px;
    padding: 5px 5px 5px 15px;
  }
}
</style>


