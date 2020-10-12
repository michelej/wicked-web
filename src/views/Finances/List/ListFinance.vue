<template src="./ListFinance.html"></template>
<script>
import api from "../../../services/backend";
import Multiselect from "vue-multiselect";
import auth from "../../../services/auth";
export default {
  name: "ListFinance",
  components: {
    Multiselect
  },
  data: function() {
    return {
      items: [],
      categories: [],
      years: ["2019", "2020"],
      months: [
        { value: 0, name: "Enero" },
        { value: 1, name: "Febrero" },
        { value: 2, name: "Marzo" },
        { value: 3, name: "Abril" },
        { value: 4, name: "Mayo" },
        { value: 5, name: "Junio" },
        { value: 6, name: "Julio" },
        { value: 7, name: "Agosto" },
        { value: 8, name: "Septiembre" },
        { value: 9, name: "Octubre" },
        { value: 10, name: "Noviembre" },
        { value: 11, name: "Diciembre" }
      ],
      form: { month: "", year: "", categoryInclude: [], categoryExclude: [] },
      fields: {
        amount: {
          label: "Monto",
          tdAttr: { width: "15%" },
          formatter: data => {
            return data + "€";
          }
        },
        description: {
          label: "Descripción",
          tdAttr: { width: "15%" },
          formatter: data => {
            return data;
          }
        },
        type: {
          label: "Tipo",
          tdAttr: { width: "15%" },
          formatter: data => {
            return data == "expenses" ? "Gastos" : "Ingresos";
          }
        },
        categories: {
          label: "Categoria",
          tdAttr: { width: "15%" },
          formatter: data => {
            return data != null ? data.join(" , ") : "";
          }
        },
        date: {
          label: "Fecha",
          tdAttr: { width: "15%" },
          formatter: data => {
            return data != null ? this.formatDate(data) : "";
          }
        },
        money_source: {
          label: "Origen Dinero",
          tdAttr: { width: "15%" },
          formatter: data => {
            return data;
          }
        },
        show_details: {
          label: "",
          tdAttr: { width: "5%" }
        }
      }
    };
  },
  mounted() {
    this.search().catch(err => console.error(err));
    api.getMoneyCategories().then(e => {
      this.categories = e.data;
    });
    this.form.month = this.months.find(e => e.value == new Date().getMonth());
    this.form.year = new Date().getFullYear();
  },
  methods: {
    search() {
      return new Promise((resolve, reject) => {
        api
          .searchMoneyRecords({})
          .then(resp => {
            this.items = resp.data;
            this.items = this.items.filter(e => e.origin == auth.getUserName());
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
          this.search().catch(err => console.error(err));
        })
        .catch(err => {
          console.error(err);
          this.$swal("Error!", "Ha ocurrido un error! " + err, "error");
        });
    },
    editRow(row) {      
      this.$router.push("/main/finances/edit/"+row.item.type+"/" + row.item._id);
    },
    getFilteredItems() {
      let r = this.items;
      if (this.form.year !== "")
        r = r.filter(e => new Date(e.date).getFullYear() == this.form.year);
      if (this.form.month !== "")
        r = r.filter(e => new Date(e.date).getMonth() == this.form.month.value);
      if (this.form.categoryInclude.length > 0) {
        r = r.filter(e => {
          if (e.categories != undefined) {
            let c = 0;
            this.form.categoryInclude.forEach(d => {
              let f = e.categories.find(r => d.indexOf(r) >= 0);
              c = f != undefined ? c + 1 : c;
            });
            return c == this.form.categoryInclude.length;
          } else {
            return false;
          }
        });
      }
      if (this.form.categoryExclude.length > 0) {
        r = r.filter(e => {
          if (e.categories != undefined) {
            let c = 0;
            this.form.categoryExclude.forEach(d => {
              let f = e.categories.find(r => d.indexOf(r) >= 0);
              c = f == undefined ? c + 1 : c;
            });
            return c == this.form.categoryExclude.length;
          } else {
            return false;
          }
        });
      }          
      return r;
    },
    getFilteredTotals(){
      let r = this.getFilteredItems()                  
      if(r.length>1)
        return [{total:r.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) })).amount.toFixed(2)}]
      else if(r.length==1)
        return [{total:r[0].amount}]
      else
        return []
    }
  }
};
</script>
<style scoped lang="scss">
@import "./ListFinance.scss";
</style>
