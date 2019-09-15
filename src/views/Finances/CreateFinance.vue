<template src="./CreateFinance.html"></template>
<script>
export default {
  name: "CreateFinance",
  data() {
    return {
      form: {
        amount: "",
        description: "",
        origin: "",
        creationDate: "",
        category: null,
        type: null
      },
      types: [
        { text: "Seleccione uno", value: null },
        { text: "Gasto", value: "expenses" },
        { text: "Ingreso", value: "income" }
      ],
      categories: [
          { text: "Seleccione uno", value: null },
          { text: "Compras y Comida", value: '0' },
          { text: "Ocio", value: '1' },
      ],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
<style lang="scss">
@import "./CreateFinance.scss";
</style>
