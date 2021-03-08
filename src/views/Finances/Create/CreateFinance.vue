<template src="./CreateFinance.html"></template>
<script>
import Datepicker from "vuejs-datepicker";
import Multiselect from "vue-multiselect";
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
        type: null,
        money_source:null,
        budgetId:null
      },
      types: [
        { text: "Seleccione uno", value: null },
        { text: "Gasto", value: "expenses" },
        { text: "Ingreso", value: "income" }
      ],
      categories: [],
      moneySources : [],
      show: true,
      title: "",
      financeId: null,
      action:"Nuevo",
      sharedExpense:"0",
      sharedPercentage:"",
      sharedUser:"",
      users:[],
      localBudget:null
    };
  },
  async mounted() {
    this.financeId = this.$route.params["id"] ? this.$route.params["id"] : null;
    this.action = this.financeId == null ? "Nuevo" : "Editar"   
    this.form.type =
      this.$route.params["type"] != undefined ? this.$route.params["type"] : "";
    this.title = this.form.type == "expenses" ? "Gasto" : "Ingreso";

    api.getMoneyCategories().then(e => {
      this.categories = e.data;
    });

     api.getMoneySources().then(e => {
      this.moneySources = e.data;
    });

    api.getAllUsers().then(e => {
      this.users = e.data;      
      this.users = this.users.filter( e => e.name != auth.getUserName())
    });

    if (!(this.form.type === "expenses" || this.form.type === "income")) {
      this.$router.push("/main/dashboard");
    }

    await this.getBudget()

    if (this.financeId !== null) {
      api
        .getMoney(this.financeId)
        .then(r => {                    
          Object.assign(this.form, r.data);
        })
        .catch(err => {
          console.error(err);
          this.$swal("Error!", "Ha ocurrido un error! " + err, "error");
        });
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      let saveAlt = null
      let save = Object.assign({}, this.form);      
      save.amount = ""+save.amount
      save.amount = Number(save.amount.replace(",", "."));
      
      if(this.financeId!=null){
        save._id=this.financeId
      }

      if(this.sharedExpense=="1"){
         saveAlt = Object.assign({} , save)
         saveAlt.origin = this.sharedUser.name
         let per = ( save.amount * parseFloat(this.sharedPercentage) ) / 100         
         save.amount = per
         saveAlt.amount = per
         delete saveAlt._id                  
      }     
      
      try{
        if(saveAlt !=null)
          await api.saveMoney(saveAlt)
          await api.saveMoney(save)
          this.$swal("Exito!", "Se ha guardado!", "success");
          this.$router.push("/main/finances/list/");
      } catch(error){
          console.error(error);
          this.$swal("Error!", "Ha ocurrido un error! " + error, "error");
      }

      /*api.saveMoney(save).then(() => {
          this.$swal("Exito!", "Se ha guardado!", "success");
          this.$router.push("/main/finances/list/");
        })
        .catch(err => {
          console.error(err);
          this.$swal("Error!", "Ha ocurrido un error! " + err, "error");
        });*/
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
    },
    async getBudget(){      
      let budget = await api.searchBudgets()
      let month = new Date(this.form.date).getMonth()+1
      let year = new Date(this.form.date).getFullYear()
      let budgets = budget.data
      let found = budgets.find( e => e.month.value == month && e.year.value == year)
      if(found){
        this.localBudget = found        
      }else{
        this.localBudget = null
      }
      console.log(this.localBudget)
    },
    getBudgetSelect(){
      if(this.localBudget!=null){
        return this.localBudget.budgets.map( e => {
          return {
            key:e.id,
            value:e.name
          }
        })
      }else{
        return []
      }
    }   
  },
  watch:{
      async ["form.date"](newValue,oldValue){
        if(newValue!=oldValue){
           await this.getBudget()
        }
      }
  }
};
</script>
<style lang="scss">
@import "./CreateFinance.scss";
</style>
