<template>
  <div class="compare-page">
    <h1>Comparing {{ this.selected.length }} Plans</h1>
    <div class="container">
      <table class="wrapper head">
        <thead>
          <tr>
            <th class="no_border"></th>
          </tr>
          <tr>
            <th class="desc">Description:</th>
          </tr>
          <tr>
            <th>Price:</th>
          </tr>
          <tr>
            <th>Plan Type:</th>
          </tr>
          <tr>
            <th>Selection:</th>
          </tr>
          <tr>
            <th>Best Seller:</th>
          </tr>
        </thead>
      </table>

      <table
        v-bind:key="quote.id"
        v-for="quote in this.selectedQuote"
        class="wrapper"
      >
        <tbody>
          <tr
            class="quoteName"
            v-bind:class="
              quoteNameClass(
                selectedQuote.findIndex((item) => item.id === quote.id)
              )
            "
          >
            <th>{{ quote.name }}</th>
          </tr>
          <tr>
            <td>{{ quote.description }}</td>
          </tr>
          <tr>
            <td>{{ quote.price }}</td>
          </tr>
          <tr>
            <td>{{ quote.type }}</td>
          </tr>
          <tr>
            <td>{{ quote.section }}</td>
          </tr>
          <tr>
            <td>{{ quote.bestSellers === true ? "True" : "False" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="$router.go(-1)">Go Back</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Compare",
  data() {
    return {
      data: [],
      selectedQuote: [],
      selected: [],
      color: 0,
    };
  },

  created: function () {
    // Get quotes from back end
    axios
      .get("http://localhost:8080/quotes")
      .then((res) => {
        this.handleData(res.data.quotes);
      })
      .catch((err) => console.log(err));

    this.selected = this.$route.query.q;
  },
  methods: {
    // Select only quotes to be compared
    handleData(data) {
      let compareData = [];

      // Find quotes from data
      const findData = (item) => {
        let pulledData = data.find((id) => {
          return id.id.toString() === item.toString();
        });
        compareData.push(pulledData);
      };
      this.selected.forEach(findData);

      // Allow 4 quotes max
      compareData = compareData.slice(0, 4);
      this.selectedQuote = compareData;
    },

    quoteNameClass(item) {
      if (item !== null) {
        switch (item) {
          case 0: {
            return "one";
          }
          case 1: {
            return "two";
          }
          case 2: {
            return "three";
          }
          case 3: {
            return "four";
          }
          default: {
            return "one";
          }
        }
      } else {
        return "one";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../global.scss";
.compare-page {
  display: flex;
  flex-direction: column;
  margin: 10px 10px 10px 10px;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;

  button {
    width: 40%;
    height: 50px;
    margin-top: 20px;
    border-radius: 5px;
    border-width: 1px;
    background-color: rgba(191, 191, 216, 0.363);
    cursor: pointer;

    &:hover {
      background-color: rgb(191, 191, 216);
    }
  }

  .container {
    display: flex;
    flex-direction: row;
    width: 100%;

    .head {
      color: rgba(44, 98, 199, 0.849);
      text-decoration: underline;
    }

    .wrapper {
      display: table;
      border-width: 1px;
      border-color: $borderColor;
      border-collapse: collapse;

      .no_border {
        border-width: 1px;
        border-style: solid;
        border-color: white;
        border-bottom-color: $borderColor;
      }
      .desc {
        border-top: 1px;
        border-color: $borderColor;
      }
      th,
      td {
        border-width: 0px;
        border-style: solid;
        padding: 5px;
        width: 250px;
        height: 100px;
      }
      .quoteName {
        color: white;
        font-weight: bold;
        font-size: 20px;

        &.one {
          background-color: rgba(78, 60, 141, 0.637);
        }
        &.two {
          background-color: rgba(255, 72, 0, 0.582);
        }
        &.three {
          background-color: rgb(85, 163, 48);
        }
        &.four {
          background-color: rgb(128, 9, 9);
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .compare-page {
    .container {
      .wrapper {
        font-size: 2vw;
        .quoteName {
          font-size: 10px;
        }
      }
    }
  }
}
</style>