<template>
  <div class="container" style="margin-right: 0px; margin-left: 0px; max-width: 100%!important;">
    <div class="row">

      <div class="col">
        <form @submit.prevent="searchUser" class="mb-3">
          <div v-if="error" class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4 class="alert-heading">Error!</h4>
            <p class="mb-0">{{error}}</p>
          </div>

                    <div class="row">
                        <div class="form-group col">
                            <label>Hobbies</label>
                            <div v-for="currentHobby in listHobbies" :key="currentHobby._id">
                                <input type="checkbox" :id="currentHobby.name" :value="currentHobby.name" v-model="query.hobbies">
                                <label :for="currentHobby.name">{{currentHobby.name}}</label>
                            </div>
                        </div>
                        <div class="form-group col">
                            <label>Skills</label>
                            <div v-for="currentSkill in listSkills" :key="currentSkill._id">
                                <input type="checkbox" :id="currentSkill.name" :value="currentSkill.name" v-model="query.skills">
                                <label :for="currentSkill.name">{{currentSkill.name}}</label>
                            </div>
                        </div>
                        <div class="form-group col">
                            <label>Qualification</label>
                            <div v-for="currentQualif in listQualif" :key="currentQualif._id">
                                <input type="checkbox" :id="currentQualif.name" :value="currentQualif.name" v-model="query.qualifications">
                                <label :for="currentQualif.name">{{currentQualif.name}}</label>
                            </div>
                        </div>
                    </div>

          <button type="submit" class="btn btn-primary">Send query</button>
        </form>
      </div>
      <div>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">firstName</th>
            <th scope="col">lastName</th>
            <th scope="col">birthDate</th>
            <th scope="col">cityOfResidence</th>
            <th scope="col">listHobbies</th>
            <th scope="col">listSkills</th>
            <th scope="col">listQualif</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in listResult" :key="user._id" >
            <td scope="row">{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.birthDate}}</td>
            <td>{{user.cityOfResidence}}</td>
            <td>
              <div v-for="currentHobby in user.hobbies" :key="currentHobby._id">
                {{currentHobby.name}}
              </div>
            </td><td>
            <div v-for="currentSkill in user.skills" :key="currentSkill._id">
              {{currentSkill.name}}
            </div>
          </td><td>
            <div v-for="currentQualif in user.qualifications" :key="currentQualif._id">
              {{currentQualif.name}}
            </div>
          </td>
          </tr>
          </tbody>
        </table>

      </div>
      
      <br>


    </div>
    <hr>
    <div class="row">

      <div class="col">
        <form @submit.prevent="searchUser" class="mb-3">
          <div v-if="error" class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4 class="alert-heading">Error!</h4>
            <p class="mb-0">{{error}}</p>
          </div>

          <div class="row">
            <div class="form-group col">
              <label>Hobbies</label>
              <div v-for="currentDomain in listDomains" :key="currentDomain._id">
                <input type="checkbox" :id="currentDomain.name" :value="currentDomain.name" v-model="queryCompany.hobbies">
                <label :for="currentDomain.name">{{currentDomain.name}}</label>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Send query</button>
        </form>
      </div>
      <div>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">firstName</th>
            <th scope="col">lastName</th>
            <th scope="col">birthDate</th>
            <th scope="col">cityOfResidence</th>
            <th scope="col">listHobbies</th>
            <th scope="col">listSkills</th>
            <th scope="col">listQualif</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in listResult" :key="user._id" >
            <td scope="row">{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.birthDate}}</td>
            <td>{{user.cityOfResidence}}</td>
            <td>
              <div v-for="currentHobby in user.hobbies" :key="currentHobby._id">
                {{currentHobby.name}}
              </div>
            </td><td>
            <div v-for="currentSkill in user.skills" :key="currentSkill._id">
              {{currentSkill.name}}
            </div>
          </td><td>
            <div v-for="currentQualif in user.qualifications" :key="currentQualif._id">
              {{currentQualif.name}}
            </div>
          </td>
          </tr>
          </tbody>
        </table>

      </div>

      <br>


    </div>

  </div>
</template>


<script>
const API_URL_USER = "http://localhost:4000/api/users/";
const API_URL_USER_FILTER = "http://localhost:4000/api/users/filter";
const API_URL_COMPANY_FILTER = "http://localhost:4000/api/users/filter";
const API_URL_HOBBY = "http://localhost:4000/api/hobbies/";
const API_URL_SKILL = "http://localhost:4000/api/skills/";
const API_URL_QUALIF = "http://localhost:4000/api/qualifications/";
const API_URL_COMPANY = 'http://localhost:4000/api/companies/';
const API_URL_DOMAIN = 'http://localhost:4000/api/activityDomains/';


export default {
  name: "find",
  data: () => ({
    error: '',
    users: [],
    listHobbies: [],
    listSkills: [],
    listQualif: [],
    listCompanies: [],
    listDomains: [],
    query: {
      skills: [],
      hobbies: [],
      qualifications: [],
      code: ''
    },
    listResult: [],
    queryCompany: {
      domains: [],
    },
    listResultCompany: [],

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
            fetch(API_URL_SKILL)
                .then(response => response.json())
                .then(result => {
                    this.listSkills = result;
                });
            fetch(API_URL_QUALIF)
                .then(response => response.json())
                .then(result => {
                    this.listQualif = result;
                });
          fetch(API_URL_COMPANY)
            .then(response => response.json())
            .then((result) => {
              this.listCompanies = result;
            });
          fetch(API_URL_DOMAIN)
            .then(response => response.json())
            .then((result) => {
              this.listDomains = result;
            });
        },
        methods: {

            searchUser() {
              const valueToSearch = this.query;
              var url = API_URL_USER_FILTER + "?";
              console.log(url);

              if (valueToSearch.skills.length !== 0){
                valueToSearch.skills.forEach(function(element) {
                  url += "skills=" + element + "&";
                });
                valueToSearch.code += "Skills";
              }
              if (valueToSearch.hobbies.length !== 0){
                valueToSearch.hobbies.forEach(function(element) {
                  url += "hobbies=" + element + "&";
                });
                valueToSearch.code += "Hobbies";
              }
              if (valueToSearch.qualifications.length !== 0){
                valueToSearch.qualifications.forEach(function(element) {
                  url += "qualifications=" + element + "&";
                });
                valueToSearch.code += "Qualifications";
              }
              url += "code=" + valueToSearch.code;
              console.log(url);

              /*var paramValue = {
                skills: valueToSearch.skills,
                hobbies: valueToSearch.hobbies,
                qualifications: valueToSearch.qualifications,
                code: valueToSearch.code
              };
              console.log(paramValue);
              var url = new URL(API_URL_USER_FILTER),
                params = paramValue
              Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
*/
                fetch(url,{
                    method: "GET",

                })
                    .then(response => response.json())
                    .then(result => {
                        this.listResult = result;
                        console.log(result);
                      valueToSearch.code = "";
                      valueToSearch.skills = [];
                      valueToSearch.hobbies = [];
                      valueToSearch.qualifications = [];
                    });
            },

            searchCompany() {
              const valueCompanySearch = this.queryCompany;
              var url = API_URL_COMPANY_FILTER + "?";
              console.log(url);

              if (valueCompanySearch.domains.length !== 0){
                valueCompanySearch.domains.forEach(function(element) {
                  url += "activityDomains=" + element + "&";
                });
              }
              url = url.slice(0,-1);
              console.log(url);

                fetch(url,{
                    method: "GET",

                })
                    .then(response => response.json())
                    .then(result => {
                        this.listResultCompany = result;
                        console.log(result);
                      valueCompanySearch.domains = [];
                    });
            },
        },
    };
</script>


<style>
</style>
