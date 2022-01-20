<template>
  <div>
    <FilterOption v-bind:filter="filter" />
    <PlanContainer
      v-bind:quotes="filteredData"
      v-bind:sortType="sortType"
      v-bind:viewType="viewType"
      v-bind:filter="filter"
      v-on:changeViewType="changeViewType"
      v-on:changeSortType="changeSortType"
    />
  </div>
</template>

<script>
import FilterOption from "../components/Results/FilterOption";
import PlanContainer from "../components/Results/PlanContainer";
import axios from "axios";

export default {
  name: "Results",
  components: {
    FilterOption,
    PlanContainer,
  },
  data() {
    return {
      data: [],
      filteredData: [],
      sortType: "sort",
      viewType: "list",
      filter: {
        policyMax: "0",
        type: "anyType",
        section: "anySection",
        bestSeller: false,
      },
    };
  },

  watch: {
    sortType: function () {
      this.sortData();
    },
    // Change data when filter changes
    filter: {
      deep: true,
      handler() {
        this.filterData();
        this.sortData();
      },
    },
  },

  created: function () {
    axios
      .get(process.env.VUE_APP_BACK_API_URL + process.env.VUE_APP_BACK_API_QUOTE)
      .then((res) => {
        this.data = res.data.quotes;
        this.filteredData = res.data.quotes;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    // Filter Quotes
    filterData() {
      const tempData = this.data;
      let checkFilter = (e) => {
        // NOTE: PolicyMax do not exist in the mockData
        return (
          //(filter.policyMax === '0'? e.policyMax === e.policyMax : e.policyMax === filter.policyMax)&&
          (this.filter.type === "anyType"
            ? e.type === e.type
            : e.type === this.filter.type) &&
          (this.filter.section === "anySection"
            ? e.section === e.section
            : e.section === this.filter.section) &&
          (this.filter.bestSeller === false
            ? e.bestSellers === e.bestSellers
            : e.bestSellers === this.filter.bestSeller)
        );
      };
      this.filteredData = tempData.filter(checkFilter);
    },

    // Sort Quotes
    sortData() {
      let sortedData = this.filteredData;
      // Compare by sort type
      switch (this.sortType) {
        case "sort":
          break;
        case "name":
          sortedData.sort((a, b) =>
            a[this.sortType].localeCompare(b[this.sortType])
          );
          break;
        case "lowToHighPrice":
          sortedData.sort((a, b) => a["price"] - b["price"]);
          break;
        case "HighToLowPrice":
          sortedData.sort((a, b) => b["price"] - a["price"]);
          break;
        default:
          break;
      }

      this.filteredData = sortedData;
    },
    // Change View
    changeViewType(view) {
      this.viewType = view;
    },
    // Change Sorting
    changeSortType(sort) {
      this.sortType = sort;
    },
  },
};
</script>

<style lang="scss">
@import "../global.scss";
</style>