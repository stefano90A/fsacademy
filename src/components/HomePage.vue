<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#" @click="logout">Logout</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <div>
            <b-card
            no-body
            style="max-width: 100%;"
            v-if="employee.name"
            >

                <template #header>
                <h4 class="mb-0">Utente: {{employee.name}} {{employee.surname}}</h4>
                </template>

                <b-card-body align="left">
                <b-card-title>Nome: {{employee.name}}</b-card-title>
                <b-card-sub-title class="mb-2">Cognome: {{employee.surname}}</b-card-sub-title>
                <b-container class="bv-example-row">
                    <b-row class="mb-3">
                    <b-col class="fontBold">Email: </b-col>
                    <b-col>{{employee.email}}</b-col>
                    <b-col class="fontBold">Sede Appartenenza: </b-col>
                    <b-col>{{employee.location.name}}</b-col>
                    </b-row>
                    <b-row class="mb-3">
                    <b-col class="fontBold">Tipo Contratto: </b-col>
                    <b-col>{{employee.member.name}}</b-col>
                    <b-col class="fontBold">Trattamento: </b-col>
                    <b-col>{{employee.refund.name}}</b-col>
                    </b-row>
                </b-container>
                
                </b-card-body>
            </b-card>
        </div>
    
    

    </div>
</template>
  
<script>
import axios from "axios";

export default {
    name: "HomePage",
    props: {
        userId: String,
    },
    components: {},
    data() {
        return {
            employee: {
                name: null,
                surname: null,
                email: null,
                password: null,
                member: {
                    id: null,
                    description: null,
                    name: null
                },
                location: {
                    id: null,
                    description: null,
                    name: null
                },
                refund: {
                    id: null,
                    description: null,
                    name: null,
                    value: null
                },
                role: []
            }
        }
    },
    methods: {
        getUser(userId) {
            axios.get("https://ftmbe.herokuapp.com/user/"+userId,{
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoicHJvdmE1QGZpbmNvbnNncm91cC5jb20iLCJleHAiOjQyNjE3MjAwNDUsImlhdCI6MTY2NTMwNzcwMCwic2NvcGUiOiJVU0VSIn0.-ep5shyy8tXH-wqDDgqgWdOOl-edEYGroB89nSTWeb4'
                }
            }).then((res) => {
                if( res.data.success ) {
                    this.$session.set("user", res.data.data);
                    this.employee=res.data.data
                }
            });
        },
        logout() {
            this.$emit("logout");
        }
    },
    beforeCreate() { },
    created() {
        if (this.userId && this.$session.get("bearer") ) {
            this.getUser(this.userId);
        }
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {}
}
</script>

<style scoped>
.fontBold {
    font-weight: 800;
    color: brown;
}
.bg-dark {
    background-color: brown!important;
}
</style>