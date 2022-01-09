<template>
  <div>
    <select class="sort_select" v-model="sortBy" @change="updateValue($event)">
      <option value="sort" disabled>Sort by</option>
      <option value="name">Name</option>
      <option value="lowToHighPrice">Price Low to High</option>
      <option value="HighToLowPrice">Price High to low</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SortOption",
  data() {
    return {
      sortBy: "sort",
    };
  },
  props: ["sortType"],
  methods: {
    updateValue(event) {
      this.sortBy = event.target.value;
      this.$parent.$emit("changeSortType", this.sortBy);
    },
  },
};
</script>

<style lang="scss">
</style>