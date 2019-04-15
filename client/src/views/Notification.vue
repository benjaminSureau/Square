<template>
  <div class="container" style="margin-right: 0px; margin-left: 0px; max-width: 100%!important;">


    <div class="row">


      <div class="col">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th colspan="3" scope="col">Notifications</th>
          </tr>
          <tr>
            <th scope="col">Status (read?)</th>
            <th scope="col">content</th>
            <th scope="col">accountId</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(currentNotif, index) in listNotif" :key="currentNotif._id">
            <td scope="row">{{currentNotif.status}}</td>
            <td>{{currentNotif.content}}</td>
            <td>{{currentNotif.accountId}}</td>
            <td><button v-on:click="delJob(currentNotif._id, index)" class="btn btn-primary">Delete</button></td>
            <td><button v-on:click="selectEditNotif(currentNotif, index)" class="btn btn-primary">Edit</button></td>
          </tr>
          </tbody>
        </table>
      </div>


      <div class="col">

        <form @submit.prevent="addNotif" class="mb-3">
          <div v-if="error" class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4 class="alert-heading">Error!</h4>
            <p class="mb-0">{{error}}</p>
          </div>
          <div class="form-group">
            <label for="notifStatus">Status</label>
            <input
              v-model="notification.status"
              type="text"
              class="form-control"
              id="notifStatus"
              placeholder="Enter a Qualification" required>
          </div>
          <div class="form-group">
            <label for="notifContent">Content</label>
            <input
              v-model="notification.content"
              type="text"
              class="form-control"
              id="notifContent"
              placeholder="Enter a description" required>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Users</label>
              <div v-for="currentUser in users" :key="currentUser._id">
                <input type="radio" :id="currentUser._id"
                       :value="currentUser._id" v-model="notification.accountId">
                <label :for="currentUser._id">{{currentUser.lastName}}</label>
              </div>
            </div>
            <div class="form-group col">
              <label>Companies</label>
              <div v-for="currentCompany in listCompanies" :key="currentCompany._id">
                <input type="radio" :id="currentCompany.name"
                       :value="currentCompany._id" v-model="notification.accountId">
                <label :for="currentCompany.name">{{currentCompany.name}}</label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Add Notification</button>
        </form>
      </div>

      <div class="col">

        <form @submit.prevent="editNotif" class="mb-3">
          <div v-if="error" class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4 class="alert-heading">Error!</h4>
            <p class="mb-0">{{error}}</p>
          </div>
          <div class="form-group">
            <label for="notifStatus">Status</label>
            <input
              v-model="editNotificationElement.status"
              type="text"
              class="form-control"
              id="notifStatus"
              placeholder="Enter a Qualification" required>
          </div>
          <div class="form-group">
            <label for="notifContent">Content</label>
            <input
              v-model="editNotificationElement.content"
              type="text"
              class="form-control"
              id="notifContent"
              placeholder="Enter a description" required>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Users</label>
              <div v-for="currentUser in users" :key="currentUser._id">
                <input type="radio" :id="currentUser._id"
                       :value="currentUser._id" v-model="editNotificationElement.accountId">
                <label :for="currentUser._id">{{currentUser.lastName}}</label>
              </div>
            </div>
            <div class="form-group col">
              <label>Companies</label>
              <div v-for="currentCompany in listCompanies" :key="currentCompany._id">
                <input type="radio" :id="currentCompany.name"
                       :value="currentCompany._id" v-model="editNotificationElement.accountId">
                <label :for="currentCompany.name">{{currentCompany.name}}</label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Add Notification</button>
        </form>
      </div>


    </div>

    <hr>
  </div>
</template>

<script>
const API_URL_USER = 'http://localhost:4000/api/users/';
const API_URL_COMPANY = 'http://localhost:4000/api/companies/';
const API_URL_NOTIF = 'http://localhost:4000/api/notifications/';

export default {
  name: 'home',
  data: () => ({
    error: '',
    users: [],
    listCompanies: [],
    listNotif: [],
    notification: {
      status: '',
      content: '',
      accountId: '',
    },
    editNotificationElement: {
      _id: '',
      status: '',
      content: '',
      accountId: '',
    },
    currentNotifIndex: '',
  }),

  mounted() {
    fetch(API_URL_USER)
      .then(response => response.json())
      .then((result) => {
        this.users = result;
      });
    fetch(API_URL_COMPANY)
      .then(response => response.json())
      .then((result) => {
        this.listCompanies = result;
      });
    fetch(API_URL_NOTIF)
      .then(response => response.json())
      .then((result) => {
        this.listNotif = result;
      });
  },
  computed: {},
  methods: {

    addNotif() {
      fetch(API_URL_NOTIF, {
        method: 'POST',
        body: JSON.stringify(this.notification),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            this.error = result.details
              .map(detail => detail.notification)
              .join('. ');
          } else {
            this.error = '';
            this.listNotif.push(result.notification);
          }
        });
    },

    selectEditNotif(currentElem, index) {
      this.editNotificationElement = currentElem;
      this.currentNotifIndex = index;
      console.log(this.editNotificationElement);
    },
    editNotif() {
      fetch(API_URL_NOTIF.concat('', this.editNotificationElement._id), {
        method: 'PUT',
        body: JSON.stringify(this.editNotificationElement),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            this.error = result.details
              .map(detail => detail.notification)
              .join('. ');
          } else {
            this.error = '';
            this.listNotif.splice(this.currentNotifIndex, 1, result.notification);

          }
        });
    },
    delJob(id, index) {
      this.listNotif.splice(index, 1);

      fetch(API_URL_NOTIF.concat('', id), {
        method: 'DELETE',
        //body: JSON.stringify(this.job),
        headers: {
          'content-type': 'application/json',
        },
      });
    },

  },
};

</script>


<style>
</style>
