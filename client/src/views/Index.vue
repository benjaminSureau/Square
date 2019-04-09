<template>
  <div>
  <table>
      <thead>
        <tr>

           <td>firstName</td>
           <td>lastName</td>
           <td>birthDate</td>

        </tr>
      </thead>
      <tbody>
        <tr v-for="message in messages" :key="message._id">
            <td>{{message.firstName}}</td>
            <td>{{message.lastName}}</td>
            <td>{{message.birthDate}}</td>

        </tr>
      </tbody>
    </table>
    <hr>
  </div>
</template>



<script>
const API_URL = "http://localhost:4000/api/users/";

export default {
  name: "home",
  data: () => ({
    error: "",
    messages: []
  }),

  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.messages = result;
      });
  },
  methods: {}
};
</script>


<style>
</style>
