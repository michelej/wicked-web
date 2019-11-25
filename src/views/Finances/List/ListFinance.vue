<template src="./ListFinance.html"></template>
<script>
import api from "../../../services/backend";
export default {
  name: "ListFinance",
  data: function () {
    return {
      items: [],
      fields: {
        amount: {
          label: 'Monto',
          tdAttr: { width: '15%' },
          formatter: (data) => {
            return data + "€"
          }
        },
        description: {
          label: 'Descripción',
          tdAttr: { width: '15%' }
        },
        type: {
          label: 'Tipo',
          tdAttr: { width: '15%' },
          formatter: (data) => {
            return data == 'expenses' ? 'Gastos' : 'Ingresos'
          }
        },
        date: {
          label: 'Fecha',
          tdAttr: { width: '15%' },
          formatter: (data) => {
            return data != null ? this.formatDateTime(data) : ''
          }
        },
        show_details: {
          label: '',
          tdAttr: { width: '5%' }
        },
      }
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
    },
    deleteRow(row) {
      api
        .deleteMoney(row.item._id)
        .then(() => {
          this.$swal("Exito!", "Se ha guardado!", "success");
          this.search().catch(err => console.error(err))
        })
        .catch(err => {
          console.error(err);
          this.$swal("Error!", "Ha ocurrido un error! " + err, "error");
        });
    }
  }
};
</script>
<style scoped lang="scss">
@import "./ListFinance.scss";
</style>
