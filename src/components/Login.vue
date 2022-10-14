<template>
    <div id="loginContainer">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
            <b-container class="bv-example-row w-50">
                <b-row class="justify-content-md-center">
                    <b-col class="p-4"><b-form-input v-model="email" placeholder="Enter your email"></b-form-input></b-col>
                </b-row>
                <b-row>
                    <b-col class="p-4"><b-form-input v-model="password" placeholder="Type your password" type="password"></b-form-input></b-col>
                </b-row>
            </b-container>
            <h1 v-if="false">aa</h1>
            <b-button type="submit"   class="m-1" variant="primary">Submit</b-button>
            <b-button type="reset"    class="m-1" variant="danger">Reset</b-button>
            <b-button @click="onRegister" class="m-1" variant="secondary">Register now!</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'LoginComponent',
    components: {},
    data() {
        return{
            email: null,
            password: null
        }
    },
    methods: {
        onSubmit: function() {
            alert("form submitted! " + this.email + " - " + this.password);
            axios.post("https://ftmbe.herokuapp.com/public/login",{
                email: this.email,
                password: this.password
            }).then((res) => {
                if( res.data.success ) {
                    alert( "Login avvenuta con successo" );
                    this.$session.set("bearer", res.data.data.token);
                    this.$session.set("userId", res.data.data.id.toString());
                    this.$emit("login",{
                        userId: res.data.data.id.toString()
                    });
                }
            });
        },
        onReset: function() {
            this.email = null;
            this.password = null;
        },
        onRegister: function() {
            this.$emit("register");
        }
    },
    beforeCreate() { 
        console.log("LoginComponent - before Create") ;
    },
    created() { 
        console.log("LoginComponent - Created") 
    },
    beforeMount() {
        console.log("LoginComponent - before Mount")
    },
    mounted() {
        console.log("LoginComponent - Mount")
    },
    beforeUpdate() { 
        console.log("LoginComponent - before Update") 
    },
    updated() { 
        console.log("LoginComponent - Updated") 
    },
    beforeDestroy() { 
        console.log("LoginComponent - before Destroy") 
    },
    destroyed() { 
        console.log("LoginComponent - Destroyed") 
    }
}
</script>

<style scoped>
    
</style>
