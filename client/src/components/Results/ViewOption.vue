<template>
  <div>
    <button
      class="view-button list_button"
      v-bind:class="{ list: isListView }"
      @click="$parent.$emit('changeViewType', 'list')"
    />
    <button
      class="view-button grid_button"
      v-bind:class="{ grid: isGridView }"
      @click="$parent.$emit('changeViewType', 'grid')"
    />
  </div>
</template>

<script>
export default {
  name: "ViewOption",
  props: ["viewType"],

  computed: {
    isListView() {
      return this.viewType === "list";
    },
    isGridView() {
      return this.viewType === "grid";
    },
  },
};
</script>

<style lang="scss">
.view-button {
  width: 40px;
  height: 40px;
  border-width: 1px;
  cursor: pointer;

  &.list {
    background-color: #508fc2;
    transition: all 0.2s ease;
  }
  &.grid {
    background-color: #508fc2;
    transition: all 0.2s ease;
  }
}

.list_button {
  background-image: url("../../assets/list_icon.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.grid_button {
  background-image: url("../../assets/grid_icon.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>