<template>
  <div>
    <table>
      <thead>
      <tr>

        <td>firstName</td>
        <td>lastName</td>
        <td>birthDate</td>
        <td>cityOfResidence</td>

      </tr>
      </thead>
      <tbody>
      <tr v-for="message in users" :key="message._id">
        <td>{{message.firstName}}</td>
        <td>{{message.lastName}}</td>
        <td>{{message.birthDate}}</td>
        <td>{{message.cityOfResidence}}</td>

      </tr>
      </tbody>
    </table>
    <hr>
    <table>
      <thead>
      <tr>
        <td>hobbies</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="currentHobby in ListHobbies" :key="currentHobby._id">
        <td>{{currentHobby.name}}</td>
      </tr>
      </tbody>
    </table>


    <div>
        <div v-if="error" class="alert alert-dismissible alert-warning">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <h4 class="alert-heading">Error!</h4>
          <p class="mb-0">{{error}}</p>
        </div>
        <div class="form-group">
          <label for="name"></label>
          <input
            v-model="newHobby.name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter a hobby" required>

        </div>

        <button v-on:click="addHobby" class="btn btn-primary">Add hobby</button>
    </div>


  </div>
</template>

<script>
  const API_URL = "http://localhost:4000/api/users/";
  const API_URL_HOBBY = "http://localhost:4000/api/hobbies/";

  export default {
    name: "home",
    data: () => ({
      error: "",
      users: [],
      hobbies: [],
      newHobby: {
        name: ''
      }
    }),

    mounted() {
      fetch(API_URL)
        .then(response => response.json())
        .then(result => {
          this.users = result;
        });
      fetch(API_URL_HOBBY)
        .then(response => response.json())
        .then(result => {
          this.hobbies = result;
        });
    },
    computed: {
      ListUsers() {
        return this.users.slice().reverse();
      },
      ListHobbies() {
        return this.hobbies.slice();
      }
    },
    methods: {
      addHobby() {
        fetch(API_URL_HOBBY, {
          method: "POST",
          body: JSON.stringify(this.newHobby),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => response.json())
          .then(result => {

            if (result.details) {
              // there was an error...
              this.error = result.details
                .map(detail => detail.newHobby)
                .join(". ");
              this.$router.push('about');
            } else {
              this.error = "";
              this.hobbies.push(this.newHobby);
              this.$router.push('home');
            }
          });
      }
    },
  };

</script>


<style>
</style>
