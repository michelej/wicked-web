<template src="./ListFinance.html"></template>
<script>
import api from "../../../services/backend";
export default {
  name: "ListFinance",
  data: function() {
    return {
      items: [],
      fields: [
        {
          key: "amount",
          label: "Monto"
        },
        {
            key:"description",
            label:"Descripción"
        },
        {
            key:"type",
            label:"Tipo"
        },
        {
            key:"date",
            label:"Fecha"
        }
      ]
    };
  },
  mounted() {
    this.search().catch(err => console.error(err));
  },
  methods: {
    search() {
      return new Promise((resolve, reject) => {
        api
          .searchMoneyRecords({})
          .then(resp => {
            console.log(resp);
            this.items = resp.data;
            resolve();
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "./ListFinance.scss";
</style>
