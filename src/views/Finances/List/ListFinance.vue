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
      years: ["2019", "2020" , "2021"],
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
    getFilteredItemsForResume(){
      return [this.getFilteredItems()]
    },
    getFilteredTotals(){
      let r = this.getFilteredItems()                  
      if(r.length>1)
        return [{total:r.reduce((a, b) => ({ amount: parseFloat(a.amount) + parseFloat(b.amount) })).amount.toFixed(2)}]
      else if(r.length==1)
        return [{total:r[0].amount}]
      else
        return []
    },
     getExpensesGroupedByCategory(array) {
      let categories = [];
      let a = array.filter(e => e.type == "expenses");
      a.forEach(e => {
        if (categories.indexOf(e.categories[0]) == -1)
          categories.push(e.categories[0]);
      });
      let res = [];
      categories.forEach(e => {
        const grouped = this.groupBy(a, r => r.categories[0]);
        res.push({
          category: e,
          amount: parseFloat(
            grouped.get(e).reduce((a, b) => ({ amount: a.amount + b.amount }))
              .amount
          ).toFixed(2)
        });
      });      
      return res;
    },
    getIncomes(array) {
      let a = array.filter(e => e.type == "income");
      let res = [];
      a.forEach(e => {
        res.push({ description: e.description, amount: e.amount });
      });      
      return res;
    },
    getTotals(array){      
      let res = []
      let i = array.filter(e => e.type == "income");            
      let income = i.length > 0 ? i.reduce((a, b) => ({amount: parseFloat(a.amount) + parseFloat(b.amount)})).amount.toFixed(2) : 0
      res.push({ description: "Ingresos", amount: income});
      let e = array.filter(e => e.type == "expenses");            
      let expenses = e.length > 0 ? e.reduce((a, b) => ({amount: parseFloat(a.amount) + parseFloat(b.amount)})).amount.toFixed(2) : 0
      res.push({ description: "Gastos", amount: expenses});
      res.push({ description: "Total", amount: (income - expenses).toFixed(2)});
      
      return res;
    },
    groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach(item => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },
  }
};
</script>
<style scoped lang="scss">
@import "./ListFinance.scss";
</style>
