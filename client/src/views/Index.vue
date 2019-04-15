<template>
  <div class="container" style="margin-right: 0px; margin-left: 0px; max-width: 100%!important;">
        <div class="row">
        <div class="col">
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
                <tr v-for="(message, index) in users" :key="message._id" >
                    <td scope="row">{{message.firstName}}</td>
                    <td>{{message.lastName}}</td>
                    <td>{{message.birthDate}}</td>
                    <td>{{message.cityOfResidence}}</td>
                  <td>
                    <div v-for="currentHobby in message.hobbies" :key="currentHobby._id">
                      {{currentHobby.name}}
                    </div>
                  </td><td>
                  <div v-for="currentSkill in message.skills" :key="currentSkill._id">
                    {{currentSkill.name}}
                  </div>
                </td><td>
                  <div v-for="currentQualif in message.qualifications" :key="currentQualif._id">
                    {{currentQualif.name}}
                  </div>
                </td>
                  <td>
                    <button v-on:click="selectEditUser(message, index)" class="btn btn-primary" style="margin-bottom: 6px">Edit</button>
                    <button v-on:click="delUser(message._id, index)" class="btn btn-primary">Delete</button>
                  </td>
                </tr>
                </tbody>
            </table>
        </div>

            <div class="col">
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
                    <div class="row">
                        <div class="form-group col">
                            <label>Hobbies</label>
                            <div v-for="currentHobby in listHobbies" :key="currentHobby._id">
                                <input type="checkbox" :id="currentHobby.name" :value="currentHobby" v-model="user.hobbies">
                                <label :for="currentHobby.name">{{currentHobby.name}}</label>
                            </div>
                        </div>
                        <div class="form-group col">
                            <label>Skills</label>
                            <div v-for="currentSkill in listSkills" :key="currentSkill._id">
                                <input type="checkbox" :id="currentSkill.name" :value="currentSkill" v-model="user.skills">
                                <label :for="currentSkill.name">{{currentSkill.name}}</label>
                            </div>
                        </div>
                        <div class="form-group col">
                            <label>Qualification</label>
                            <div v-for="currentQualif in listQualif" :key="currentQualif._id">
                                <input type="checkbox" :id="currentQualif.name" :value="currentQualif" v-model="user.qualifications">
                                <label :for="currentQualif.name">{{currentQualif.name}}</label>
                            </div>
                        </div>
                    </div>



                    <button type="submit" class="btn btn-primary">Add user</button>
                </form>
            </div>

          <div class="col">
            <form @submit.prevent="editUser" class="mb-3">
              <div v-if="error" class="alert alert-dismissible alert-warning">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <h4 class="alert-heading">Error!</h4>
                <p class="mb-0">{{error}}</p>
              </div>
              <div class="form-group">
                <label for="firstName">firstName</label>
                <input
                  v-model="editUserElement.firstName"
                  type="text"
                  class="form-control"
                  id="firstName"
                  placeholder="Enter a firstName" required>
              </div>
              <div class="form-group">
                <label for="lastName">lastName</label>
                <input
                  v-model="editUserElement.lastName"
                  type="text"
                  class="form-control"
                  id="lastName"
                  placeholder="Enter a lastName" required>
              </div>
              <div class="form-group">
                <label for="BirthDate">BirthDate</label>
                <input
                  v-model="editUserElement.birthDate"
                  type="text"
                  class="form-control"
                  id="birthDate"
                  placeholder="Enter a BirthDate" required>
              </div>
              <div class="form-group">
                <label for="cityOfResidence">cityOfResidence</label>
                <input
                  v-model="editUserElement.cityOfResidence"
                  type="text"
                  class="form-control"
                  id="cityOfResidence"
                  placeholder="Enter a city Of Residence" required>
              </div>
              <div class="row">
                <div class="form-group col">
                  <label>Hobbies</label>
                  <div v-for="currentHobby in listHobbies" :key="currentHobby._id">
                    <input type="checkbox" :id="currentHobby.name" :value="currentHobby" v-model="editUserElement.hobbies">
                    <label :for="currentHobby.name">{{currentHobby.name}}</label>
                  </div>
                </div>
                <div class="form-group col">
                  <label>Skills</label>
                  <div v-for="currentSkill in listSkills" :key="currentSkill._id">
                    <input type="checkbox" :id="currentSkill.name" :value="currentSkill" v-model="editUserElement.skills">
                    <label :for="currentSkill.name">{{currentSkill.name}}</label>
                  </div>
                </div>
                <div class="form-group col">
                  <label>Qualification</label>
                  <div v-for="currentQualif in listQualif" :key="currentQualif._id">
                    <input type="checkbox" :id="currentQualif.name" :value="currentQualif" v-model="editUserElement.qualifications">
                    <label :for="currentQualif.name">{{currentQualif.name}}</label>
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
                        <td colspan="3" scope="col">Hobbies</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(hobby, index) in listHobbies" :key="hobby._id">
                        <td scope="row">{{hobby.name}}</td>
                      <td><button v-on:click="delHobby(hobby._id, index)" class="btn btn-primary">Delete</button></td>
                      <td><button v-on:click="selectEditHobby(hobby, index)" class="btn btn-primary">Edit</button></td>
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
                    <label for="nameHobby"></label>
                    <input
                            v-model="newHobby"
                            type="text"
                            class="form-control"
                            @keyup.enter="addHobby"
                            id="nameHobby"
                            placeholder="Enter a hobby" required>
                </div>
                <button v-on:click="addHobby" class="btn btn-primary">Add hobby</button>
            </div>
            <div class="col">
                <div v-if="error" class="alert alert-dismissible alert-warning">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <h4 class="alert-heading">Error!</h4>
                    <p class="mb-0">{{error}}</p>
                </div>
                <div class="form-group">
                    <label for="nameHobby"></label>
                    <input
                            v-model="editHobbyElement.name"
                            type="text"
                            class="form-control"
                            @keyup.enter="editHobby"
                            id="nameHobby"
                            placeholder="Enter a hobby" required>
                </div>
                <button v-on:click="editHobby" class="btn btn-primary">Edit hobby</button>
            </div>
        </div><hr/>
        <div class="row">
          <div class="col">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <td colspan="3" scope="col">Skills</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(skill, index) in listSkills" :key="skill._id">
                        <td scope="row">{{skill.name}}</td>
                      <td><button v-on:click="delSkill(skill._id, index)" class="btn btn-primary">Delete</button></td>
                      <td><button v-on:click="selectEditSkill(skill, index)" class="btn btn-primary">Edit</button></td>
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
                    <label for="nameSkill"></label>
                    <input
                            v-model="newSkill"
                            type="text"
                            class="form-control"
                            @keyup.enter="addSkill"
                            id="nameSkill"
                            placeholder="Enter a Skill" required>

                </div>

                <button v-on:click="addSkill" class="btn btn-primary">Add Skill</button>
            </div>
            <div class="col">
                <div v-if="error" class="alert alert-dismissible alert-warning">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <h4 class="alert-heading">Error!</h4>
                    <p class="mb-0">{{error}}</p>
                </div>
                <div class="form-group">
                    <label for="nameSkillEdit"></label>
                    <input
                            v-model="editskillElement.name"
                            type="text"
                            class="form-control"
                            @keyup.enter="editSkill"
                            id="nameSkillEdit"
                            placeholder="Enter a Skill" required>

                </div>

                <button v-on:click="editSkill" class="btn btn-primary">Edit Skill</button>
            </div>

        </div><hr/>
    <div class="row">



            <div class="col">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <td colspan="4" scope="col">Qualifications</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(qualif, index) in listQualif" :key="qualif._id">
                        <td scope="row">{{qualif.name}}</td>
                        <td>{{qualif.description}}</td>
                      <td><button v-on:click="delQualif(qualif._id, index)" class="btn btn-primary">Delete</button></td>
                      <td><button v-on:click="selectEditQualif(qualif, index)" class="btn btn-primary">Edit</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col">

                <form @submit.prevent="addQualif" class="mb-3">
                    <div v-if="error" class="alert alert-dismissible alert-warning">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <h4 class="alert-heading">Error!</h4>
                        <p class="mb-0">{{error}}</p>
                    </div>
                    <div class="form-group">
                        <label for="qualifName">Qualification</label>
                        <input
                                v-model="newQalif.name"
                                type="text"
                                class="form-control"
                                id="qualifName"
                                placeholder="Enter a Qualification" required>
                    </div>
                    <div class="form-group">
                        <label for="qualifDesc">Description</label>
                        <input
                                v-model="newQalif.description"
                                type="text"
                                class="form-control"
                                id="qualifDesc"
                                placeholder="Enter a description" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Qualification</button>
                </form>
            </div>
            <div class="col">

                <form @submit.prevent="editQualif" class="mb-3">
                    <div v-if="error" class="alert alert-dismissible alert-warning">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <h4 class="alert-heading">Error!</h4>
                        <p class="mb-0">{{error}}</p>
                    </div>
                    <div class="form-group">
                        <label for="qualifName">Qualification</label>
                        <input
                                v-model="editqualifElement.name"
                                type="text"
                                class="form-control"
                                id="qualifName"
                                placeholder="Enter a Qualification" required>
                    </div>
                    <div class="form-group">
                        <label for="qualifDesc">Description</label>
                        <input
                                v-model="editqualifElement.description"
                                type="text"
                                class="form-control"
                                id="qualifDesc"
                                placeholder="Enter a description" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Edit Qualification</button>
                </form>
            </div>



        </div>
  </div>
</template>

<script>
  const API_URL_USER = "http://localhost:4000/api/users/";
  const API_URL_HOBBY = "http://localhost:4000/api/hobbies/";
  const API_URL_SKILL = "http://localhost:4000/api/skills/";
  const API_URL_QUALIF = "http://localhost:4000/api/qualifications/";

  export default {
    name: "home",
    data: () => ({
        error: "",
        users: [],
        listHobbies: [],
        listSkills: [],
        listQualif: [],
        user: {
            firstName: '',
            lastName: '',
            birthDate: '',
            hobbies: [],
            skills: [],
            qualifications: [],
        },
        editUserElement: {
            _id: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            hobbies: [],
            skills: [],
            qualifications: [],
        },
        hobby: {
            name: '',
        },
        editHobbyElement: {
          _id: '',
          name: '',
        },
        skill: {
            name: '',
        },
        editskillElement: {
          _id: '',
          name: '',
        },
        qualif: {
            name: '',
            description: '',
        },
        editqualifElement: {
          _id: '',
          name: '',
            description: '',
        },
        newHobby: '',
        newSkill: '',
        newQalif: {
            name: '',
            description: '',
        },
        currentUserIndex: '',
        currentHobbyIndex: '',
        currentSkillIndex: '',
        currentQualifIndex: '',
    }),

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
    computed: {
      ListUsers() {
        return this.users.slice().reverse();
      },
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
                    this.users.push(result.user);

                  }
                });
      },

      selectEditUser(currentElem, index) {
        this.editUserElement = currentElem;
        this.currentUserIndex = index;
      },

      editUser() {
        console.log(JSON.stringify(this.editUserElement));
        fetch(API_URL_USER.concat('', this.editUserElement._id), {
          method: 'PUT',
          body: JSON.stringify(this.editUserElement),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(response => response.json())
          .then((result) => {
            if (result.details) {
              // there was an error...
              this.error = result.details
                .map(detail => detail.user)
                .join('. ');
            } else {
              this.error = '';
              this.users.splice(this.currentUserIndex, 1, result.user);

            }
          });
      },
      delUser(id, index) {
        this.users.splice(index, 1);

        fetch(API_URL_USER.concat('', id), {
          method: 'DELETE',
          //body: JSON.stringify(this.job),
          headers: {
            'content-type': 'application/json',
          },
        });
      },

      addHobby() {
        var hobbyToAdd = {
          name: this.newHobby
        };
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
              this.error = result.details
                .map(detail => detail.hobby)
                .join(". ");
              this.$router.push('about');
            } else {
              this.error = "";
              this.listHobbies.push(result.hobby);
              this.newHobby = '';
            }
          });
      },


      selectEditHobby(currentElem, index) {
        this.editHobbyElement = currentElem;
        this.currentHobbyIndex = index;
      },
      editHobby() {
        fetch(API_URL_HOBBY.concat('', this.editHobbyElement._id), {
          method: 'PUT',
          body: JSON.stringify(this.editHobbyElement),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(response => response.json())
          .then((result) => {
            if (result.details) {
              // there was an error...
              this.error = result.details
                .map(detail => detail.hobby)
                .join('. ');
            } else {
              this.error = '';
              this.listHobbies.splice(this.currentHobbyIndex, 1, result.hobby);

            }
          });
      },
      delHobby(id, index) {
        this.listHobbies.splice(index, 1);

        fetch(API_URL_HOBBY.concat('', id), {
          method: 'DELETE',
          //body: JSON.stringify(this.job),
          headers: {
            'content-type': 'application/json',
          },
        });
      },

      addSkill() {
        var skillToAdd = {
          name: this.newSkill
        };
        fetch(API_URL_SKILL, {
          method: "POST",
          body: JSON.stringify(skillToAdd),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => response.json())
          .then(result => {
            if (result.details) {
              // there was an error...
              this.error = result.details
                .map(detail => detail.skill)
                .join(". ");
              this.$router.push('about');
            } else {
              this.error = "";
              this.listSkills.push(result.skill);
              this.newSkill = '';
            }
          });
      },


      selectEditSkill(currentElem, index) {
        this.editskillElement = currentElem;
        this.currentSkillIndex = index;
      },
      editSkill() {
        fetch(API_URL_SKILL.concat('', this.editskillElement._id), {
          method: 'PUT',
          body: JSON.stringify(this.editskillElement),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(response => response.json())
          .then((result) => {
            if (result.details) {
              // there was an error...
              this.error = result.details
                .map(detail => detail.skill)
                .join('. ');
            } else {
              this.error = '';
              this.listSkills.splice(this.currentSkillIndex, 1, result.skill);

            }
          });
      },
      delSkill(id, index) {
        this.listSkills.splice(index, 1);

        fetch(API_URL_SKILL.concat('', id), {
          method: 'DELETE',
          //body: JSON.stringify(this.job),
          headers: {
            'content-type': 'application/json',
          },
        });
      },




      addQualif() {
        var qualifToAdd = {
            name: this.newQalif.name,
            description: this.newQalif.description
        };
        fetch(API_URL_QUALIF, {
          method: "POST",
          body: JSON.stringify(qualifToAdd),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => response.json())
          .then(result => {
            if (result.details) {
              // there was an error...
              this.error = result.details
                .map(detail => detail.qualification)
                .join(". ");
              this.$router.push('about');
            } else {
              this.error = "";
              this.listQualif.push(result.qualification);
              this.newQalif = '';
            }
          });
      },


      selectEditQualif(currentElem, index) {
        this.editqualifElement = currentElem;
        this.currentQualifIndex = index;
      },
      editQualif() {
        fetch(API_URL_QUALIF.concat('', this.editqualifElement._id), {
          method: 'PUT',
          body: JSON.stringify(this.editqualifElement),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(response => response.json())
          .then((result) => {
            if (result.details) {
              // there was an error...
              this.error = result.details
                .map(detail => detail.qualification)
                .join('. ');
            } else {
              this.error = '';
              this.listQualif.splice(this.currentQualifIndex, 1, result.qualification);

            }
          });
      },
      delQualif(id, index) {
        this.listQualif.splice(index, 1);

        fetch(API_URL_QUALIF.concat('', id), {
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
