<template>
  <div>
    <div class="title_container">
      <h1>Comprehensive Coverage Plans</h1>
      <button
        class="compare_button"
        :disabled="isCompareDisabled"
        v-on:click="handleCompare"
      >
        Comapre
      </button>
      <div class="view_option_container">
        <ViewOption v-bind:viewType="viewType" />
      </div>
      <div class="sort_container">
        <SortOption v-bind:sortType="sortType" />
      </div>
    </div>

    <h1 v-if="loading">LOADING</h1>
    <div v-else class="quote_container" v-bind:class="quoteClass">
      <div v-bind:key="quote.id" v-for="quote in quotes" class="quote_wrapper">
        <div>{{ quote.bestSellers === true ? "Best Seller" : "" }}</div>
        <div class="checkbox">
          <label>Compare</label>
          <input
            type="checkbox"
            :disabled="isCheckboxDisabled(quote)"
            v-bind:checked="quote.checked"
            v-on:change="handleSelected(quote)"
          />
        </div>
        <div class="quote_header_wrapper">
          <div class="quote_name">{{ quote.name }}</div>
          <div class="quote_price">${{ quote.price }}</div>
        </div>
        <div class="quote_body">
          <div>
            <img src="../../assets/checkmark.png" alt="check" />{{
              quote.description
            }}
          </div>
          <div>
            <img src="../../assets/checkmark.png" alt="check" />{{ quote.type }}
          </div>
          <div>
            <img src="../../assets/checkmark.png" alt="check" />{{
              quote.section
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewOption from "./ViewOption";
import SortOption from "./SortOption";

export default {
  name: "PlanContainer",
  props: ["quotes", "sortType", "viewType", "filter", "loading"],
  components: {
    ViewOption,
    SortOption,
  },
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    // Send data to compare component page
    handleCompare() {
      let compareData = [];

      const findData = (item) => {
        let pulledData = this.quotes.find((id) => {
          return id.id === item;
        });
        compareData.push(pulledData);
      };
      this.selected.forEach(findData);

      this.$router.push({
        name: "Compare",
        query: { q: this.selected },
      });
    },
    // Handle selected quotes
    handleSelected(quote) {
      quote.checked = !quote.checked;

      const selectedIndex = this.selected.indexOf(quote.id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(this.selected, quote.id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(this.selected.slice(1));
      } else if (selectedIndex === this.selected.length - 1) {
        newSelected = newSelected.concat(this.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          this.selected.slice(0, selectedIndex),
          this.selected.slice(selectedIndex + 1)
        );
      }
      this.selected = newSelected;
    },
    // Disable Checkbox
    isCheckboxDisabled(quote) {
      if (this.selected.length > 3 && !this.selected.includes(quote.id)) {
        return true;
      }
      return false;
    },
  },

  changeViewType(view) {
    this.viewType = view;
  },
  changeSortType(sort) {
    this.sortType = sort;
  },
  computed: {
    // Validate Compare Quantity
    isCompareDisabled() {
      if (this.selected.length < 2 || this.selected.length > 4) return true;
      return false;
    },
    quoteClass() {
      if (this.viewType === "grid") return "grid";
      return "list";
    },
  },
};
</script>

<style lang="scss">
@import "../../global.scss";

.title_container {
  margin-top: 50px;

  h1 {
    color: #045ca5;
  }
  .compare_button {
    width: 150px;
    font-size: 1em;
    margin-top: 25px;
    padding-bottom: 10px;
    padding-top: 10px;
    border-width: 0;
    border-radius: 5px;
    color: #fff;
    background-color: #ed8029;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background-color: #ff7300;
      transition: all 0.2s ease;
    }
    &:disabled {
      background-color: grey;
      cursor: default;
      transition: all 0.2s ease;
    }
  }
  .view_option_container {
    width: 100%;
    display: flex;
    margin-left: 50px;
    margin-top: 10px;
    justify-content: left;
    justify-self: left;
  }
  .sort_container {
    display: block;
    margin: auto;

    .sort_select {
      border-width: 1px;
      border-color: $borderColor;
    }
  }
}
.quote_container {
  margin: 20px;
  font-family: Arial, Helvetica, sans-serif;

  .quote_wrapper {
    border-width: 1px;
    border-style: solid;
    border-color: $borderColor;
    border-radius: 10px;
    padding: 15px;
    margin: 15px;
    &:hover {
      background-color: rgba(30, 101, 134, 0.212);
      transition: all 0.2s ease;
    }

    .quote_header_wrapper {
      display: flex;
      width: 100%;
      font-size: large;
      font-weight: bold;
      margin-bottom: 25px;

      .quote_name {
        flex: 0.5;
        text-align: left;
      }
      .quote_price {
        flex: 0.5;
        text-align: right;
        justify-self: right;
        color: rgb(17, 0, 255);
      }
    }
    .quote_body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 15px;
      column-gap: 15px;
      text-align: left;
      color: rgba(32, 115, 163, 0.979);

      img {
        width: 15px;
        margin-right: 2px;
      }
    }

    .checkbox {
      width: 100%;
      display: flex;
      justify-content: right;
      align-items: center;
      margin-bottom: 5px;

      label {
        font-size: 13px;
        font-weight: bold;
      }
    }
  }

  &.list {
    display: flex;
    flex-direction: column;
  }
  &.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (max-width: 600px) {
  .title_container {
    .view_option_container {
      display: none;
    }

    .compare_button {
      margin-bottom: 30px;
    }
  }

  .quote_container {
    .quote_wrapper {
      display: flex;
      flex-direction: column;
    }
    &.grid {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>