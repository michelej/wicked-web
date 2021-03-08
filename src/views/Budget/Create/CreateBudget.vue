<template src="./CreateBudget.html"></template>
<script>
import Datepicker from "vuejs-datepicker";
import Multiselect from "vue-multiselect";
import api from "../../../services/backend";
import auth from "../../../services/auth";
import { es } from "vuejs-datepicker/dist/locale";
export default {
  name: "CreateBudget",
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
        month:"",
        year:"",
        budgets:[] 
      },
      show: true,
      title: "",
      budgetId: null,
      action:"Nuevo",
      users:[],
      calendarMonths:[],
      calendarYears:[{name:"2020",value:2020},{name:"2021",value:2021},{name:"2022",value:2022}]
    };
  },
  async mounted() {
    this.budgetId = this.$route.params["id"] ? this.$route.params["id"] : null;
    this.action = this.budgetId == null ? "Nuevo" : "Editar"   
    this.title = "Presupuesto";

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

    if (this.budgetId !== null) {
      api
        .getBudget(this.budgetId)
        .then(r => {                    
          Object.assign(this.form, r.data);
        })
        .catch(err => {
          console.error(err);
          this.$swal("Error!", "Ha ocurrido un error! " + err, "error");
        });
    }
    this.calendarMonths=api.getCalendarMonths()
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      let save = Object.assign({}, this.form);      
      save.amount = ""+save.amount
      save.amount = Number(save.amount.replace(",", "."));
      
      if(this.budgetId!=null){
        save._id=this.budgetId
      }
 
      try{
          await api.saveBudget(save)  
          this.$swal("Exito!", "Se ha guardado!", "success");
          this.$router.push("/main/finances/list/");
      } catch(error){
          console.error(error);
          this.$swal("Error!", "Ha ocurrido un error! " + error, "error");
      }

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
      this.form.budgets = [];
      this.form.month = "";
      this.form.year = "";
    },
    addBudget(){
      this.form.budgets.push({name:"",amount:0,id:""})
    },
    removeBudget(budget){
      this.form.budgets=this.form.budgets.filter(e => budget != e)
    }
  }
};
</script>
<style lang="scss">
@import "./CreateBudget.scss";
</style>
