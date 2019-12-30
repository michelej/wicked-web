<template src="./ResumeFinance.html"></template>
<script>
import api from "../../../services/backend";
export default {
  name: "ResumeFinance",
  data: function() {
    return {
      loaded: false,
      items: {},
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ]
    };
  },
  mounted() {
    this.search(() => {
      this.loaded = true;
    }).catch(err => console.error(err));
  },
  methods: {
    search() {
      return new Promise((resolve, reject) => {
        api
          .searchMoneyRecords({})
          .then(resp => {
            let res = resp.data;
            res = resp.data.filter(e => e.type == "expenses");

            let fn = (year, month, o = this.items, array = res) => {
              o[year][month] = {
                [month]: array.filter(
                  ({ date: d }) => `${year}-${month}` === d.slice(0, 7)
                )
              };
            };
            for (let { date } of res) {
              let [year, month] = date.match(/\d+/g);
              if (!this.items[year]) this.items[year] = {};
              fn(year, month);
            }

            //console.log(this.items)

            this.loaded = true;
            resolve();
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
      });
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
    getGroupedByCategory(array) {
      let categories = [];

      array.forEach(e => {
        if (categories.indexOf(e.categories[0]) == -1)
          categories.push(e.categories[0]);
      });      
      let res = []
      categories.forEach(e => {
        const grouped = this.groupBy(array, r => r.categories[0]);              
        res.push({category:e , amount:parseFloat(grouped.get(e).reduce((a, b) => ({amount: a.amount + b.amount})).amount).toFixed(2)})
      })                  
      return res;
    }
  }
};
</script>
<style scoped lang="scss">
@import "./ResumeFinance.scss";
</style>
