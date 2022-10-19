<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#" @click="show = null">Home</b-navbar-brand>
            
            <b-navbar-nav>
                <b-nav-item href="#" @click="show = 'userManager'">Gestione Utenti</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    <em>{{employee.name}} {{employee.surname}}</em>
                </template>
                <b-dropdown-item href="#" @click="show = 'userProfile'">Profile</b-dropdown-item>
                <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            
        </b-navbar>

        <UserCard v-if="show=='userProfile'" :employee="employee" />

        <UserManager v-if="show=='userManager'" ></UserManager>

    </div>    
</template>

<script>
import axios from "axios";
import UserManager from "./UserManager.vue"
import UserCard from "./ProfileCard.vue"

export default {
    name: "HomePage",
    props: {
        userId: String,
    },
    components: {
        UserManager,
        UserCard
    },
    data() {
        return {
            show: null,
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
        getUser() {
            axios.get("https://ftmbe.herokuapp.com/user/"+this.userId,{
                headers: {
                    Authorization: 'Bearer ' + this.$session.get("bearer")
                }
            }).then((res) => {
                if( res.data.success ) {
                    this.$session.set("user", res.data.data);
                    this.employee=res.data.data
                }
            }).catch(function (error) {
                console.log(error);
                this.logout();    
            });
        },
        logout() {
            this.$emit("logout");
        }
    },
    created() {
        if (this.$session.exists("userId") && this.$session.exists("bearer") ) {
            this.getUser();
        } else {
            this.logout();
        }
    }
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