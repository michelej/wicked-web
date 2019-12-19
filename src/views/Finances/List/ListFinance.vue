<template src="./ListFinance.html"></template>
<script>
import api from "../../../services/backend";
import auth from "../../../services/auth";
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
          tdAttr: { width: '15%' },
          formatter: (data) => {
            return data
          }
        },
        type: {
          label: 'Tipo',
          tdAttr: { width: '15%' },
          formatter: (data) => {
            return data == 'expenses' ? 'Gastos' : 'Ingresos'
          }
        },
        categories: {
          label: 'Categoria',
          tdAttr: { width: '15%' },
          formatter: (data) => {
            console.log(data)
            return data[0]
          }
        },
        date: {
          label: 'Fecha',
          tdAttr: { width: '15%' },
          formatter: (data) => {
            return data != null ? this.formatDate(data) : ''
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
            this.items = resp.data;
            this.items = this.items.filter(e => e.origin == auth.getUserName())
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
          this.$swal("Exito!", "Se eliminado con exito!", "success");
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
