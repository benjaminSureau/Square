<template>
  <div class="container" style="margin-right: 0px; margin-left: 0px; max-width: 100%!important;">
    <div class="row">

      <div>
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
                        <div class="form-group col">
                            <label>Choices</label><br>

                            <input type="radio" id="Skills" value="Skills" v-model="query.code"/>
                            <label for="Skills">Skills</label>
                            <br>
                            <input type="radio" id="Hobbies" value="Hobbies" v-model="query.code"/>
                            <label for="Hobbies">Hobbies</label>
                            <br>
                            <input type="radio" id="Qualifications" value="Qualifications" v-model="query.code"/>
                            <label for="Qualifications">Qualifications</label>
                            <br>
                            <input type="radio" id="SkillsHobbies" value="SkillsHobbies" v-model="query.code"/>
                            <label for="SkillsHobbies">SkillsHobbies</label>
                            <br>
                            <input type="radio" id="SkillsQualifications" value="SkillsQualifications" v-model="query.code"/>
                            <label for="SkillsQualifications">SkillsQualifications</label>
                            <br>
                            <input type="radio" id="HobbiesQualifications" value="HobbiesQualifications" v-model="query.code"/>
                            <label for="HobbiesQualifications">HobbiesQualifications</label>
                            <br>
                            <input type="radio" id="SkillsHobbiesQualifications" value="SkillsHobbiesQualifications" v-model="query.code"/>
                            <label for="SkillsHobbiesQualifications">SkillsHobbiesQualifications</label>
                            <br>
                        </div>
                    </div>

          <button type="submit" class="btn btn-primary">Send query</button>
        </form>
      </div>
      <br>


    </div>
  </div>
</template>


<script>
const API_URL_USER = "http://localhost:4000/api/users/";
const API_URL_USER_FILTER = "http://localhost:4000/api/users/filter";
const API_URL_HOBBY = "http://localhost:4000/api/hobbies/";
const API_URL_SKILL = "http://localhost:4000/api/skills/";
const API_URL_QUALIF = "http://localhost:4000/api/qualifications/";


export default {
  name: "find",
  data: () => ({
    error: '',
    users: [],
    listHobbies: [],
    listSkills: [],
    listQualif: [],
    query: {
      skills: [],
      hobbies: [],
      qualifications: [],
      code: ''
    },
    listResult: [],

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
        },
        methods: {

            searchUser() {
              const valueToSearch = this.query;

              var paramValue = {
                skills: valueToSearch.skills,
                hobbies: valueToSearch.hobbies,
                qualifications: valueToSearch.qualifications,
                code: valueToSearch.code
              };
              var url = new URL(API_URL_USER_FILTER),
                params = paramValue
              Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

                fetch(url,{
                    method: "GET",

                })
                    .then(response => response.json())
                    .then(result => {
                        this.listResult = result;
                        console.log(result);

                    });
            },
        },
    };
</script>


<style>
</style>
