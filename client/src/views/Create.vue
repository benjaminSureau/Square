<template>
  <div>
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
          <label for="BirthDate">BirthDate</label>
          <input
            v-model="user.birthDate"
            type="text"
            class="form-control"
            id="birthDate"
            placeholder="Enter a BirthDate" required>
        </div>
        <div class="form-group">
          <label for="cityOfResidence">cityOfResidence</label>
          <input
            v-model="user.cityOfResidence"
            type="text"
            class="form-control"
            id="cityOfResidence"
            placeholder="Enter a city Of Residence" required>
        </div>

        <div class="form-group">
          <label>hobbies</label>
          <div v-for="currHobby in listHobbies" :key="currHobby._id">
            <input type="checkbox" :id="currHobby.name" :value="currHobby" v-model="user.hobbies">
            <label :for="currHobby.name">{{currHobby.name}}</label>
          </div>

        </div>

        <button type="submit" class="btn btn-primary">Add user</button>
      </form>
    </div>
    <br>
    <span>Noms cochés : {{ user.hobbies }}</span>


    <div>
      <form @submit.prevent="addHobby" class="mb-3">
        <div v-if="error" class="alert alert-dismissible alert-warning">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <h4 class="alert-heading">Error!</h4>
          <p class="mb-0">{{error}}</p>
        </div>
        <div class="form-group">
          <input
            v-model="user.name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter a hobby" required/>
        </div>

        <button type="submit" class="btn btn-primary">Add hobby</button>
      </form>
    </div>
  </div>
</template>


<script>
const API_URL_USER = "http://localhost:4000/api/users/";
const API_URL_HOBBY = "http://localhost:4000/api/hobbies/";

export default {
  name: "home",
  data: () => ({
    error: '',
    users: [],
    listHobbies: [],
    checkedNames: [],
    user: {
      firstName: '',
      lastName: '',
      birthDate: '',
      hobbies: []
    },
    hobby: {
      name: '',
    },
    newHobby: ''

  }),
  computed: {
    ListUsers() {
      return this.users.slice().reverse();
    }
  },
  mounted() {
    fetch(API_URL_USER)
            .then(response => response.json())
            .then(result => {
              this.users = result;
      });
    fetch(API_URL_HOBBY)
            .then(response => response.json())
            .then(result => {
              this.listHobbies = result;
            });
  },
  methods: {
    addUser() {
      console.log(this.user);
      fetch(API_URL_USER, {
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
            this.error = '';
            this.showUserForm = false;
            this.users.push(result);
            //this.$router.push('home');

          }
        });
    },
    addHobby() {
      var hobbyToAdd = {
        name: this.newHobby
      };
      console.log(this.hobby);
      fetch(API_URL_HOBBY, {
        method: "POST",
        body: JSON.stringify(hobbyToAdd),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(result => {
          if (result.details) {
            // there was an error...
            const error = result.details
              .map(detail => detail.hobby)
              .join(". ");
            this.error = error;
            this.$router.push('about');

          } else {
            this.error = '';
            this.listHobbies.push(hobbyToAdd);
            //this.$router.push('home');
            this.newHobby = '';
          }
        });
    },
  },
};
</script>


<style>
</style>
