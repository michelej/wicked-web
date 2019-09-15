<template src="./CreateFinance.html"></template>
<script>
import Datepicker from "vuejs-datepicker";
import api from "../../../services/backend";
import { es } from "vuejs-datepicker/dist/locale";
export default {
  name: "CreateFinance",
  components: {
    Datepicker
  },
  data: () => {
    return {
      es: es,
      form: {
        amount: "",
        description: "",
        origin: "michel",
        date: new Date(),
        category: null,
        type: null
      },
      types: [
        { text: "Seleccione uno", value: null },
        { text: "Gasto", value: "expenses" },
        { text: "Ingreso", value: "income" }
      ],
      categories: [
        { text: "Seleccione uno", value: null, type: null },
        { text: "Compras y Comida", value: "0", type: "expenses" },
        { text: "Ocio", value: "1", type: "expenses" },
        { text: "Nomina", value: "2", type: "income" },
        { text: "Ingreso", value: "1", type: "income" }
      ],
      show: true,
      title: ""
    };
  },
  mounted() {
    this.form.type =
      this.$route.params["type"] != undefined ? this.$route.params["type"] : "";
    this.title = this.form.type == "expenses" ? "Gasto" : "Ingreso";
    this.categories = this.categories.filter(
      e => e.type == this.form.type || e.type == null
    );
    if (!(this.form.type === "expenses" || this.form.type === "income")) {
      this.$router.push("/main/dashboard");
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let save = Object.assign({}, this.form);
      save.category = this.categories.find(e => e.value == this.form.category);
      api
        .saveNewAmountMoney(save)
        .then(() => {
          this.$swal("Exito!", "Se ha guardado!", "success");
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
