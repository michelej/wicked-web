<template src="./CreateFinance.html"></template>
<script>
import Datepicker from "vuejs-datepicker";
import Multiselect from 'vue-multiselect'
import api from "../../../services/backend";
import auth from "../../../services/auth";
import { es } from "vuejs-datepicker/dist/locale";
export default {
  name: "CreateFinance",
  components: {
    Datepicker,
    Multiselect
  },
  data: () => {
    return {
      es: es,
      form: {
        amount: "",
        description: "",
        origin: auth.getUserName(),
        date: new Date(),
        categories: null,
        type: null
      },
      types: [
        { text: "Seleccione uno", value: null },
        { text: "Gasto", value: "expenses" },
        { text: "Ingreso", value: "income" }
      ],
      categories: [],
      show: true,
      title: ""
    };
  },
  async mounted() {
    this.form.type = this.$route.params["type"] != undefined ? this.$route.params["type"] : "";
    this.title = this.form.type == "expenses" ? "Gasto" : "Ingreso";

    api.getMoneyCategories().then(e => {
      this.categories = e.data
    })

    if (!(this.form.type === "expenses" || this.form.type === "income")) {
      this.$router.push("/main/dashboard");
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let save = Object.assign({}, this.form);
      console.log(save)
      save.amount = Number(save.amount.replace(",", '.'))
      api
        .saveMoney(save)
        .then(() => {
          this.$swal("Exito!", "Se ha guardado!", "success");
          this.$router.push("/main/finances/list/");
        })
        .catch(err => {
          console.error(err);
          this.$swal("Error!", "Ha ocurrido un error! " + err, "error");
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.resetData();
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    resetData() {
      this.form.amount = "";
      this.form.description = "";
      this.form.date = new Date();
      this.form.category = null;
      this.form.type = null;
    }
  }
};
</script>
<style lang="scss">
@import "./CreateFinance.scss";
</style>
