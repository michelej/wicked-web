<template src="./ListBudget.html"></template>
<script>
import api from "../../../services/backend";
import Multiselect from "vue-multiselect";
import backend from '../../../services/backend';
/*import auth from "../../../services/auth";*/
import Raphael from 'raphael/raphael'
global.Raphael = Raphael
import { BarChart,DonutChart } from 'vue-morris'

export default {
  name: "ListBudget",
  components: {
    Multiselect,BarChart,DonutChart
  },
  data: function() {
    return {
      loaded:false,
      items: [],
      categories: [],
      years: ["2019", "2020"],
      months: [],
      form: { month: "", year: "" }
    };
  },
  mounted() {
    this.months = api.getCalendarMonths()
    this.search().catch(err => console.error(err));
    api.getMoneyCategories().then(e => {
      this.categories = e.data;
    });
    this.form.month = this.months.find(e => e.value == new Date().getMonth()+1);
    this.form.year = new Date().getFullYear();
  },
  methods: {
    search() {
      return new Promise((resolve, reject) => {
        api.searchBudgets({}).then( async resp => {
            this.items = resp.data;
            await this.gatherBudgetInformation(this.items)
            console.log(this.items)
            this.loaded=true
            resolve();
          }).catch(err => {
            console.error(err);
            reject(err);
          });
      });
    },
    deleteRow(budgetId) {
      api.deleteBudget(budgetId).then(() => {
          this.$swal("Exito!", "Se eliminado con exito!", "success");
          this.search().catch(err => console.error(err));
        }).catch(err => {
          console.error(err);
          this.$swal("Error!", "Ha ocurrido un error! " + err, "error");
        });
    },
    async gatherBudgetInformation(items){
      for (let i = 0; i < items.length; i++) {
         const element = items[i];
        
         let month = element.month.value
         let year = element.year.value
         
          for (let j = 0; j < element.budgets.length; j++) {
            let budget = element.budgets[j]
            let params = {
              categories_included:budget.categories_included,
              categories_excluded:budget.categories_excluded,
              money_source:budget.money_source,
              month:parseInt(month),
              year:parseInt(year)
            }
            let resp = await backend.getMoneyLogsForBudget(params)
            items[i].budgets[j].moneyLogs = resp.data
          }        
      }
    },
    getFilteredItems() {
      let r = this.items;
      if (this.form.year !== "")
        r = r.filter(e => e.year.value == parseInt(this.form.year));
      if (this.form.month !== "")
        r = r.filter(e => e.month.value == parseInt(this.form.month.value));       
      return r;
    },
    sumMoneyLogValues(moneyLogs){
      if(moneyLogs!=undefined){        
        let array = moneyLogs.map( e => {return e.amount;})
        return array.reduce((a,b) => a + b, 0)
      }else{
        return 0
      }
    },
    sumTotalMoneyLogValues(budgets){      
      if(budgets!=undefined){        
        let array = budgets.map( e => {          
          let d = e.moneyLogs.map(d => {return parseFloat(d.amount)})
          let val = d.reduce((a,b) => a + b, 0)
          return val
        })
        return array.reduce((a,b) => a + b, 0)
      }else{
        return 0
      }
    },
    editRow(budgetId){
      this.$router.push("/main/budget/edit/" + budgetId);
    },
    getChartData(item){
      if(this.loaded){
        let data = item.budgets.map( e => {
          return {
             name : e.name,            
             spent : parseFloat(this.sumMoneyLogValues(e.moneyLogs)).toFixed(2),
             total : parseFloat(e.amount),
             missing :  parseFloat(parseFloat(e.amount) - parseFloat(this.sumMoneyLogValues(e.moneyLogs))).toFixed(2)
          }
        })
        return {
            data :data,
            xkey : 'name',
            ykeys : [ "spent", "total", "missing" ],
            labels : [ "Gasto", "Total", "Faltante" ]
        }  
      }else{
        return{
          data:[],xkey:'',ykeys:'',labels:''
        }
      }          
    }
  }
};
</script>
<style scoped lang="scss">
@import "./ListBudget.scss";
</style>
