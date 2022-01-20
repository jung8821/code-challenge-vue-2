<template>
  <div>
    <div class="topHeader">
      <img class="logo" v-bind:src="require('../../assets/vue.png')" />
      <span class="header">Travel Insurance</span>
    </div>
    <div>
      <form class="form" @submit.prevent="handleSubmit">
        <span>
          <label
            >Policy Maximum
            <img class="tooltip" src="../../assets/tooltip.svg" />
          </label>
          <select v-model="policyMax" class="input_box" required>
            <option disabled value="0">Choose your policy maximum</option>
            <option value="50">50,000</option>
            <option value="100">100,000</option>
            <option value="250">250,000</option>
            <option value="500">500,000</option>
          </select>
          <p class="error">{{ errors.policyMax }}</p>
        </span>
        <span>
          <label
            >Age <img class="tooltip" src="../../assets/tooltip.svg"
          /></label>
          <span class="mobile-age">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Age</th>
                  <th class="empty"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>
                    <input
                      class="input_box"
                      v-model.number="age"
                      type="number"
                      placeholder="age"
                      required
                    />
                  </td>
                  <td class="empty"></td>
                </tr>
              </tbody>
            </table>
          </span>
          <span class="desktop-age">
            <input
              class="input_box"
              v-model.number="age"
              type="number"
              placeholder="Choose your age"
              required
            />
          </span>
          <p class="error">{{ errors.age }}</p>
        </span>
        <span>
          <label
            >Travel Dates (mm/dd/yyyy)
            <img class="tooltip" src="../../assets/tooltip.svg"
          /></label>
          <span class="dates">
            <datepicker
              wrapper-class="input_box"
              :format="dateFormat"
              placeholder="Start Date"
              v-model="startDate"
              required
            ></datepicker>
            <datepicker
              wrapper-class="input_box"
              :format="dateFormat"
              placeholder="End Date"
              v-model="endDate"
              required
            ></datepicker>
          </span>
          <p class="error">{{ errors.endDate }}</p>
        </span>
        <span>
          <label
            >Citizenship <img class="tooltip" src="../../assets/tooltip.svg"
          /></label>
          <input
            class="input_box"
            v-model="citizenShip"
            type="text"
            placeholder="Choose Your Country of Citizenship"
            pattern="[A-Za-z]*"
            required
          />
        </span>
        <span>
          <label
            >Mailing State <img class="tooltip" src="../../assets/tooltip.svg"
          /></label>
          <input
            class="input_box"
            v-model="mailingState"
            type="text"
            placeholder="Choose State"
            pattern="[A-Za-z]*"
            required
          />
        </span>
        <span class="get_quotes">
          <input class="button" type="submit" value="GET QUOTES" />
        </span>
        <span class="reset_form">
          <span v-on:click="resetForm">Reset Form</span>
        </span>
      </form>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  name: "QuoteForm",
  components: {
    Datepicker,
  },
  // Form Data
  data() {
    return {
      dateFormat: "MM/dd/yyyy",
      startDate: null,
      endDate: null,
      policyMax: "0",
      age: "",
      citizenShip: "",
      mailingState: "",
      errors: {
        policyMax: "",
        age: "",
        endDate: "",
      },
    };
  },
  watch: {
    policyMax() {
      this.clearError();
    },
    age() {
      this.clearError();
    },
    startDate() {
      this.clearError();
    },
    endDate() {
      this.clearError();
    },
    citizenShip() {
      this.clearError();
    },
    mailingState() {
      this.clearError();
    },
  },
  methods: {
    // Submit Form
    handleSubmit() {
      if (this.validateForm()) {
        let formData = {
          policyMax: this.policyMax,
          age: this.age,
          startDate: this.startDate,
          endDate: this.endDate,
          citizenShip: this.citizenShip,
          mailingState: this.mailingState,
        };
        this.$emit("form-submit", formData);
        (this.policyMax = "0"),
          (this.age = ""),
          (this.endDate = null),
          (this.startDate = null),
          (this.citizenShip = ""),
          (this.mailingState = ""),
          (this.errors = {
            policyMax: "",
            age: "",
            endDate: "",
          });
      }
    },
    // Reset Button
    resetForm() {
      (this.policyMax = "0"),
        (this.age = ""),
        (this.endDate = null),
        (this.startDate = null),
        (this.citizenShip = ""),
        (this.mailingState = ""),
        (this.errors = {
          policyMax: "",
          age: "",
          endDate: "",
        });
    },
    clearError() {
      this.errors = {
        policyMax: "",
        age: "",
        endDate: "",
      };
    },

    // Validate Form
    validateForm() {
      let result = true;
      this.clearError();
      // Policy Max
      if (this.policyMax === "0") {
        this.errors.policyMax = "Please select your policy maximum.";
        result = false;
      }

      // Age
      if (this.age > 100) {
        const currentYear = new Date().getFullYear();
        const currentAge = currentYear - this.age;

        if (currentAge > 100) {
          this.errors.age = "Age cannot be more than 100 years old.";
          result = false;
        }

        if (currentAge <= 0) this.errors.age = "Age needs to be greater than 0";
        result = false;
      }

      // Travel Dates
      if (this.startDate >= this.endDate) {
        this.errors.endDate = "The end date should be after the start date.";
        result = false;
      }

      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../global.scss";
.topHeader {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgba(138, 138, 185, 0.103);
  width: 100%;
  font-family: "Trebuchet MS", Helvetica, sans-serif;

  .logo {
    height: 50px;
    width: 50px;
    margin: 20px 10px 20px 15px;
  }
  .header {
    font-size: 16px;
    font-weight: bold;
    color: rgb(15, 15, 146);
  }
}
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 10px;
  justify-content: left;
  margin: 10px 20px 10px 10px;
  font-family: Arial, Helvetica, sans-serif;

  label {
    display: block;
    text-align: left;
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 500;
  }
  .mobile-age {
    display: none;
  }
  .input_box {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-color: $borderColor;
    border-width: 1px;
    margin: 0;
  }
  .dates {
    display: flex;
    flex-direction: row;
  }
  .get_quotes {
    grid-column: 1/3;
    margin: 20px 0px 0px 5px;

    .button {
      width: 100%;
      font-size: 1em;
      padding-bottom: 10px;
      padding-top: 10px;
      border-width: 0;
      border-radius: 2px;
      color: #fff;
      background-color: #ed8029;
      cursor: pointer;
      font-family: "Trebuchet MS", Helvetica, sans-serif;
    }
  }
  .reset_form {
    grid-column: 1/3;
    font-style: italic;
    color: rgb(123, 149, 167);
    font-weight: none;
    text-decoration: underline;

    span {
      cursor: pointer;
    }
  }
  .tooltip {
    width: 13px;
    cursor: pointer;
  }
}
.error {
  margin: 10px;
  color: red;
}

@media only screen and (max-width: 510px) {
  .form {
    display: flex;
    flex-direction: column;

    .mobile-age {
      display: flex;
      background-color: rgba(128, 128, 128, 0.185);
      width: 100%;
      border-width: 1px;
      border-style: solid;
      border-color: $borderColor;

      table {
        border-collapse: collapse;
        width: 100%;
        margin: 10px;
        justify-content: left;
        flex-direction: column;

        .empty {
          width: 50%;
        }
        thead {
          tr {
            border: 0;
            border-bottom: 1px;
            border-style: solid;
            border-color: $borderColor;
            th,
            td {
              padding-bottom: 5px;
              font-size: 12px;
            }
          }
        }
        tbody {
          tr {
            th,
            td {
              padding: 8px;
              .input_box {
                width: 100%;
              }
            }
          }
        }
      }
      .input_box {
        text-align: center;
        width: 30%;
      }
    }
    .desktop-age {
      display: none;
    }
    .get_quotes {
      button {
        width: 40%;
      }
    }
    .reset_form {
      margin-bottom: 10px;
      a {
        cursor: pointer;
      }
    }
  }
}
</style>