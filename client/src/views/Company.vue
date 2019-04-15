<template>
  <div class="container" style="margin-right: 0px; margin-left: 0px; max-width: 100%!important;">

    <div class="row">
      <div class="col-lg-6">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">siret</th>
            <th scope="col">siren</th>
            <th scope="col">description</th>
            <th scope="col">activityDomains</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(compagny,index) in listCompanies" :key="compagny._id">
            <td scope="row">{{compagny.name}}</td>
            <td>{{compagny.siret}}</td>
            <td>{{compagny.siren}}</td>
            <td>{{compagny.description}}</td>
            <td>
              <div v-for="domain in compagny.activityDomains" :key="domain._id">
                {{domain.name}}
              </div>
            </td>
            <td><button v-on:click="delCompany(compagny._id, index)" class="btn btn-primary">Delete</button></td>
            <td><button v-on:click="selectEditCompany(compagny, index)" class="btn btn-primary">Edit</button></td>

          </tr>
          </tbody>
        </table>
      </div>

      <div class="col-lg-3">
        <form @submit.prevent="addCompany" class="mb-3">
          <div v-if="error" class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4 class="alert-heading">Error!</h4>
            <p class="mb-0">{{error}}</p>
          </div>
          <div class="form-group">
            <label for="companyName">Name</label>
            <input
              v-model="company.name"
              type="text"
              class="form-control"
              id="companyName"
              placeholder="Enter a name" required>
          </div>
          <div class="form-group">
            <label for="siret">siret</label>
            <input
              v-model="company.siret"
              type="text"
              class="form-control"
              id="siret"
              placeholder="Enter a siret" required>
          </div>
          <div class="form-group">
            <label for="BirthDate">siren</label>
            <input
              v-model="company.siren"
              type="text"
              class="form-control"
              id="siren"
              placeholder="Enter a siren" required>
          </div>
          <div class="form-group">
            <label for="compagnyDescription">description</label>
            <input
              v-model="company.description"
              type="text"
              class="form-control"
              id="compagnyDescription"
              placeholder="Enter a description" required>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Hobbies</label>
              <div v-for="domain in listDomains" :key="domain._id">
                <input type="checkbox" :id="domain.name"
                       :value="domain" v-model="company.activityDomains">
                <label :for="domain.name">{{domain.name}}</label>
              </div>
            </div>
          </div>


          <button type="submit" class="btn btn-primary">Add user</button>
        </form>
      </div>
      <div class="col-lg-3">
        <form @submit.prevent="editCompany" class="mb-3">
          <div v-if="error" class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4 class="alert-heading">Error!</h4>
            <p class="mb-0">{{error}}</p>
          </div>
          <div class="form-group">
            <label for="companyName">Name</label>
            <input
              v-model="editCompanyElement.name"
              type="text"
              class="form-control"
              id="companyName"
              placeholder="Enter a name" required>
          </div>
          <div class="form-group">
            <label for="siret">siret</label>
            <input
              v-model="editCompanyElement.siret"
              type="text"
              class="form-control"
              id="siret"
              placeholder="Enter a siret" required>
          </div>
          <div class="form-group">
            <label for="siren">siren</label>
            <input
              v-model="editCompanyElement.siren"
              type="text"
              class="form-control"
              id="siren"
              placeholder="Enter a siren" required>
          </div>
          <div class="form-group">
            <label for="compagnyDescription">description</label>
            <input
              v-model="editCompanyElement.description"
              type="text"
              class="form-control"
              id="compagnyDescription"
              placeholder="Enter a description" required>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Hobbies</label>
              <div v-for="domain in listDomains" :key="domain._id">
                <input type="checkbox" :id="domain.name"
                       :value="domain" v-model="editCompanyElement.activityDomains">
                <label :for="domain.name">{{domain.name}}</label>
              </div>
            </div>
          </div>


          <button type="submit" class="btn btn-primary">Edit user</button>
        </form>
      </div>
    </div>
    <hr>

    <div class="row">


      <div class="col">
        <table class="table table-bordered">
          <thead>
          <tr>
            <td scope="col">Activity Domains</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(currentDomain, index) in listDomains" :key="currentDomain._id">
            <td scope="row">{{currentDomain.name}}</td>
            <td><button v-on:click="delDomain(currentDomain._id, index)" class="btn btn-primary">Delete</button></td>
            <td><button v-on:click="selectEditDomain(currentDomain, index)" class="btn btn-primary">Edit</button></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <div v-if="error" class="alert alert-dismissible alert-warning">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <h4 class="alert-heading">Error!</h4>
          <p class="mb-0">{{error}}</p>
        </div>
        <div class="form-group">
          <label for="domainName"></label>
          <input
            v-model="newDomain"
            type="text"
            class="form-control"
            @keyup.enter="addDomain"
            id="domainName"
            placeholder="Enter a domain" required>

        </div>

        <button v-on:click="addDomain" class="btn btn-primary">Add Domain</button>
      </div>
      <div class="col">
        <div v-if="error" class="alert alert-dismissible alert-warning">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <h4 class="alert-heading">Error!</h4>
          <p class="mb-0">{{error}}</p>
        </div>
        <div class="form-group">
          <label for="domainName"></label>
          <input
            v-model="editDomainElement.name"
            type="text"
            class="form-control"
            @keyup.enter="editDomain"
            id="domainName"
            placeholder="Enter a domain" required>

        </div>

        <button v-on:click="editDomain" class="btn btn-primary">Edit Domain</button>
      </div>

    </div>

    <hr>
  </div>
</template>

<script>
const API_URL_COMPANY = 'http://localhost:4000/api/companies/';
const API_URL_JOB = 'http://localhost:4000/api/jobs/';
const API_URL_DOMAIN = 'http://localhost:4000/api/activityDomains/';

export default {
  name: 'home',
  data: () => ({
    error: '',
    listCompanies: [],
    listJobs: [],
    listDomains: [],
    company: {
      name: '',
      siret: '',
      siren: '',
      description: '',
      activityDomains: [],
    },
    editCompanyElement: {
      _id: '',
      name: '',
      siret: '',
      siren: '',
      description: '',
      activityDomains: [],
    },
    domain: {
      name: '',
    },
    editDomainElement: {
      _id: '',
      name: '',
    },
    newDomain: '',
    currentCompanyIndex: '',
    currentDomainIndex: '',

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
    fetch(API_URL_DOMAIN)
      .then(response => response.json())
      .then((result) => {
        this.listDomains = result;
      });
  },
  computed: {},
  methods: {
    addCompany() {
      fetch(API_URL_COMPANY, {
        method: 'POST',
        body: JSON.stringify(this.company),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            this.error = result.details
              .map(detail => detail.company)
              .join('. ');
          } else {
            this.error = '';
            this.listCompanies.push(result.company);
          }
        });
    },



    selectEditCompany(currentElem, index) {
      this.editCompanyElement = currentElem;
      this.currentCompanyIndex = index;
      //console.log(this.editCompanyElement);
    },
    editCompany() {
      fetch(API_URL_COMPANY.concat('', this.editCompanyElement._id), {
        method: 'PUT',
        body: JSON.stringify(this.editCompanyElement),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            this.error = result.details
              .map(detail => detail.company)
              .join('. ');
          } else {
            this.error = '';
            this.listCompanies.splice(this.currentCompanyIndex, 1, result.company);

          }
        });
    },
    delCompany(id, index) {
      this.listCompanies.splice(index, 1);

      fetch(API_URL_COMPANY.concat('', id), {
        method: 'DELETE',
        //body: JSON.stringify(this.job),
        headers: {
          'content-type': 'application/json',
        },
      });
    },


    addDomain() {
      const domainToAdd = {
        name: this.newDomain,
      };
      fetch(API_URL_DOMAIN, {
        method: 'POST',
        body: JSON.stringify(domainToAdd),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            this.error = result.details
              .map(detail => detail.activityDomain)
              .join('. ');
          } else {
            this.error = '';
            this.listDomains.push(result.activityDomain);
          }
        });
    },


    selectEditDomain(currentElem, index) {
      this.editDomainElement = currentElem;
      this.currentDomainIndex = index;
      //console.log(this.editCompanyElement);
    },
    editDomain() {
      fetch(API_URL_DOMAIN.concat('', this.editDomainElement._id), {
        method: 'PUT',
        body: JSON.stringify(this.editDomainElement),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            this.error = result.details
              .map(detail => detail.activityDomain)
              .join('. ');
          } else {
            this.error = '';
            this.listDomains.splice(this.currentDomainIndex, 1, result.activityDomain);

          }
        });
    },
    delDomain(id, index) {
      this.listDomains.splice(index, 1);

      fetch(API_URL_DOMAIN.concat('', id), {
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
