<template>
  <div className="filter_container">
    <div>
      <select v-model="filter.policyMax" class="input_box">
        <option value="0">Any Policy Max</option>
        <option value="50">50,000</option>
        <option value="100">100,000</option>
        <option value="250">250,000</option>
        <option value="500">500,000</option>
      </select>
    </div>
    <div>
      <input
        type="checkbox"
        v-on:change="handleChecked"
        v-bind:checked="filter.bestSeller"
      />
      <label> BestSeller</label>
    </div>
    <div>
      <select v-model="filter.type" class="input_box">
        <option value="anyType">Any Type</option>
        <option value="Comprehensive">Comprehensive</option>
        <option value="Fixed">Fixed</option>
      </select>
    </div>
    <div>
      <select v-model="filter.section" class="input_box">
        <option value="anySection">Any Section</option>
        <option value="Travel Medical">Travel Medical</option>
        <option value="International Travel Medical">
          International Travel Medical
        </option>
        <option value="Student Medical">Student Medical</option>
        <option value="J1 Medical">J1 Medical</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterOption",
  props: ["filter"],
  methods: {
    handleChecked() {
      this.filter.bestSeller = !this.filter.bestSeller;
    },
  },
};
</script>

<style lang="scss">
</style>