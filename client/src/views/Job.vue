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
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Gross Wage</th>
            <th scope="col">Company Id</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(currentJob, index) in listJobs" :key="currentJob._id">
            <td scope="row">{{currentJob.name}}</td>
            <td>{{currentJob.description}}</td>
            <td>{{currentJob.grossWage}}</td>
            <td>{{currentJob.companyId}}</td>
            <td><button v-on:click="delJob(currentJob._id, index)" class="btn btn-primary">Delete</button></td>
            <td><button v-on:click="selectEditJob(currentJob, index)" class="btn btn-primary">Edit</button></td>

          </tr>
          </tbody>
        </table>
      </div>


      <div class="col">

        <form @submit.prevent="addJob" class="mb-3">
          <div v-if="error" class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4 class="alert-heading">Error!</h4>
            <p class="mb-0">{{error}}</p>
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="job.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter a Name" required>
          </div>
          <div class="form-group">
            <label for="description">Desciption</label>
            <input
              v-model="job.description"
              type="text"
              class="form-control"
              id="description"
              placeholder="Enter a description" required>
          </div>
          <div class="form-group">
            <label for="grossWage">Gross Wage</label>
            <input
              v-model="job.grossWage"
              type="text"
              class="form-control"
              id="grossWage"
              placeholder="Enter a gross wage" required>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Companies</label>
              <div v-for="currentCompany in listCompanies" :key="currentCompany._id">
                <input type="radio" :id="currentCompany.name"
                       :value="currentCompany._id" v-model="job.companyId">
                <label :for="currentCompany.name">{{currentCompany.name}}</label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Add Notification</button>
        </form>
      </div>

<div class="col">

        <form @submit.prevent="editJob" class="mb-3">
          <div v-if="error" class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4 class="alert-heading">Error!</h4>
            <p class="mb-0">{{error}}</p>
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="editJobElement.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter a Name" required>
          </div>
          <div class="form-group">
            <label for="description">Desciption</label>
            <input
              v-model="editJobElement.description"
              type="text"
              class="form-control"
              id="description"
              placeholder="Enter a description" required>
          </div>
          <div class="form-group">
            <label for="grossWage">Gross Wage</label>
            <input
              v-model="editJobElement.grossWage"
              type="text"
              class="form-control"
              id="grossWage"
              placeholder="Enter a gross wage" required>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Companies</label>
              <div v-for="currentCompany in listCompanies" :key="currentCompany._id">
                <input type="radio" :id="currentCompany.name"
                       :value="currentCompany._id" v-model="editJobElement.companyId">
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
const API_URL_JOB = 'http://localhost:4000/api/jobs/';
const API_URL_COMPANY = 'http://localhost:4000/api/companies/';

export default {
  name: 'home',
  data: () => ({
    error: '',
    listJobs: [],
    listCompanies: [],
    job: {
      name: '',
      description: '',
      grossWage: '',
      companyId: '',
    },
    editJobElement: {
      _id: '',
      name: '',
      description: '',
      grossWage: '',
      companyId: '',
    },
    currentJobIndex: '',
  }),

  mounted() {
    fetch(API_URL_COMPANY)
      .then(response => response.json())
      .then((result) => {
        this.listCompanies = result;
      });
    fetch(API_URL_JOB)
      .then(response => response.json())
      .then((result) => {
        this.listJobs = result;
      });
  },
  computed: {},
  methods: {

    addJob() {
      fetch(API_URL_JOB, {
        method: 'POST',
        body: JSON.stringify(this.job),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            this.error = result.details
              .map(detail => detail.job)
              .join('. ');
          } else {
            this.error = '';
            this.listJobs.push(result.job);
          }
        });
    },
    selectEditJob(currentJob, index) {
      this.editJobElement = currentJob;
      this.currentJobIndex = index;
      console.log(this.editJobElement);
    },
    editJob() {
      fetch(API_URL_JOB.concat('', this.editJobElement._id), {
        method: 'PUT',
        body: JSON.stringify(this.editJobElement),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            this.error = result.details
              .map(detail => detail.job)
              .join('. ');
          } else {
            this.error = '';
            //this.listJobs.push(result.job);
            this.listJobs.splice(this.currentJobIndex, 1, result.job);

          }
        });
    },
    delJob(id, index) {
      this.listJobs.splice(index, 1);

      fetch(API_URL_JOB.concat('', id), {
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
