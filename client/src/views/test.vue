<template>
  <div>
    <form @submit.prevent="addUser" class="mb-3">
      <div v-if="error" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{error}}</p>
      </div>
      <div class="form-group">
        <label for="firstName">firstName</label>
        <input
          v-model="user.firstName"
          type="text"
          class="form-control"
          id="firstName"
          placeholder="Enter a firstName" required>

      </div>
      <div class="form-group">
        <label for="lastName">lastName</label>
        <input
          v-model="user.lastName"
          type="text"
          class="form-control"
          id="lastName"
          placeholder="Enter a lastName" required>
      </div>
      <div class="form-group">
        <label for="lastName">BirthDate</label>
        <input
          v-model="user.birthDate"
          type="text"
          class="form-control"
          id="birthDate"
          placeholder="Enter a BirthDate" required>
      </div>
      <button type="submit" class="btn btn-primary">Add user</button>
    </form>
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
              <tr class="list-unstyled" v-for="user in users" :key="user._id">
                  <td>{{user.firstName}}</td>
                  <td>{{user.lastName}}</td>
                  <td>{{user.birthDate}}</td>
              </tr>
            </tbody>
          </table>
    </div>

  </div>
</template>


<script>
const API_URL = "http://localhost:4000/api/users/";

export default {
  name: "home",
  data: () => ({
    error: "",
    users: [],
    user: {
      firstName: "",
      lastName: "",
      birthDate: ""
    }
  }),
  computed: {
    ListUsers() {
      return this.users.slice().reverse();
    }
  },
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.users = result;
      });
  },
  methods: {
    addUser() {
      console.log(this.user);
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(this.user),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(result => {
          if (result.details) {
            // there was an error...
            const error = result.details
              .map(detail => detail.user)
              .join(". ");
            this.error = error;
          } else {
            this.error = "";
            this.showUserForm = false;
            this.users.push(result);
          }
        });
    }
  }




};
</script>


<style>
</style>
