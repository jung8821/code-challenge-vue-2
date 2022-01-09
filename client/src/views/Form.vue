
<template>
  <div class="wrapper">
    <QuoteForm v-on:form-submit="sendForm" />
  </div>
</template>

<script>
import QuoteForm from "../components/Form/QuoteForm";
import axios from "axios";

export default {
  name: "Form",
  components: {
    QuoteForm,
  },
  methods: {
    // Post form data to back end
    async sendForm(formData) {
      const { startDate, endDate, citizenShip, policyMax, age, mailingState } =
        formData;
      try {
        const response = await axios.post(`http://localhost:8080/quotes`, {
          startDate,
          endDate,
          citizenShip,
          policyMax,
          age,
          mailingState,
        });
        console.log(response.data);
        this.$router.push({ name: "Results" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../global.scss";
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.wrapper {
  border-width: 1px;
  border-style: solid;
  border-color: $borderColor;
  max-width: 900px;
  margin-top: 20px;
  background-color: white;
}
</style>