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
                                <input type="checkbox" :id="currentHobby.name" :value="currentHobby" v-model="query.hobbies">
                                <label :for="currentHobby.name">{{currentHobby.name}}</label>
                            </div>
                        </div>
                        <div class="form-group col">
                            <label>Skills</label>
                            <div v-for="currentSkill in listSkills" :key="currentSkill._id">
                                <input type="checkbox" :id="currentSkill.name" :value="currentSkill" v-model="query.skills">
                                <label :for="currentSkill.name">{{currentSkill.name}}</label>
                            </div>
                        </div>
                        <div class="form-group col">
                            <label>Qualification</label>
                            <div v-for="currentQualif in listQualif" :key="currentQualif._id">
                                <input type="checkbox" :id="currentQualif.name" :value="currentQualif" v-model="query.qualifications">
                                <label :for="currentQualif.name">{{currentQualif.name}}</label>
                            </div>
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
                code: ""
            },
            listResult:[]

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
                console.log(this.query);
                fetch(API_URL_USER_FILTER, {
                    method: "GET",
                    body: JSON.stringify(this.query),
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
                            this.listResult.push(result);
                            console.log(result);
                        }
                    });
            },
        },
    };
</script>


<style>
</style>
