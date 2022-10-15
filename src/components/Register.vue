<template>
    <b-container id="registerContainer" class="w-50">
        <b-form @submit.prevent="onSubmit">
            <b-row class="justify-content-md-center">
                <b-col>
                    <b-form-group id="input-group-1" label="Name:" label-for="input-1" class="labelForm">
                        <b-form-input id="input-1" v-model="employee.name" type="text" placeholder="Enter your name" required></b-form-input>
                    </b-form-group>           
                </b-col>
                <b-col>
                    <b-form-group id="input-group-2" label="Surname:" label-for="input-2" class="labelForm">
                        <b-form-input id="input-2" v-model="employee.surname" type="text" placeholder="Enter your surname" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group id="input-group-3" label="Email address:" label-for="input-3" class="labelForm">
                        <b-form-input id="input-3" v-model="employee.email" type="email" placeholder="Enter email" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group id="input-group-4" label="Password:" label-for="input-4" class="labelForm">
                        <b-form-input id="input-4" v-model="employee.password" type="password" placeholder="Type Password" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label class="mr-sm-2 h-50 labelForm" for="inline-form-custom-select-pref" >Seleziona tipologia contratto:</label>
                    <b-form-select id="inline-form-custom-select-pref" v-model="employee.member">
                        <option v-for="memberType in memberTypes" v-bind:key="memberType.id" v-bind:value="memberType">{{memberType.name}}</option>
                    </b-form-select>
                </b-col>
                <b-col>
                    <label class="mr-sm-2 h-50 labelForm" for="inline-form-custom-select-pref">Seleziona Sede Assunzione:</label>
                    <b-form-select id="inline-form-custom-select-pref" v-model="employee.location">
                        <option v-for="location in locations" v-bind:key="location.id" v-bind:value="location">{{location.name}}</option>
                    </b-form-select>
                </b-col>
                <b-col>
                    <label class="mr-sm-2 h-50 labelForm" for="inline-form-custom-select-pref">Seleziona Benefit:</label>
                    <b-form-select id="inline-form-custom-select-pref" v-model="employee.refund">
                        <option v-for="refund in refunds" v-bind:key="refund.id" v-bind:value="refund">{{refund.name}} ({{refund.value}} €/gg)</option>
                    </b-form-select>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="p-4">
                    <b-button type="submit"   class="m-1" variant="primary">Submit</b-button>
                    <b-button type="reset"    class="m-1" variant="danger">Reset</b-button>
                </b-col>
            </b-row>
            
        </b-form>
    </b-container>
</template>

<script>
import axios from "axios";
export default {
    name: 'RegisterComponent',
    components: {},
    data() {
        return{
            refunds: [],
            locations: [],
            memberTypes: [],
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
            },
            password: null
        }
    },
    methods: {
        onSubmit: function() {
            axios.post("https://ftmbe.herokuapp.com/public/register",this.employee).then((res) => {
                if( res.data.success ) {
                    alert( "Registrazione avvenuta con successo" );
                    this.$session.set("bearer", res.data.data.token);
                    this.$session.set("userId", res.data.data.id.toString());
                    this.$emit("registered",{
                        userId: res.data.data.id.toString()
                    });
                }
            });
        },
        getMemberTypes: function() {
            axios.get("https://ftmbe.herokuapp.com/public/memberType").then((res) => {
                if( res.data.success ) {
                    this.memberTypes = res.data.data 
                }
            });
        },
        getlocations: function() {
            axios.get("https://ftmbe.herokuapp.com/public/location").then((res) => {
                if( res.data.success ) {
                    this.locations = res.data.data 
                }
            });
        },
        getRefunds: function() {
            axios.get("https://ftmbe.herokuapp.com/public/refund").then((res) => {
                if( res.data.success ) {
                    this.refunds = res.data.data 
                }
            });
        }
    },
    beforeCreate() { 
        console.log("RegisterComponent - before Create") ;
    },
    created() { 
        console.log("RegisterComponent - Created") 
    },
    beforeMount() {
        console.log("RegisterComponent - before Mount")
        this.getMemberTypes();
        this.getlocations();
        this.getRefunds();
    },
    mounted() {
        console.log("RegisterComponent - Mount")
    },
    beforeUpdate() { 
        console.log("RegisterComponent - before Update") 
    },
    updated() { 
        console.log("RegisterComponent - Updated") 
    },
    beforeDestroy() { 
        console.log("RegisterComponent - before Destroy") 
    },
    destroyed() { 
        console.log("RegisterComponent - Destroyed") 
    }
}
</script>

<style scoped>
    #registerContainer {
        margin: auto;
    }
    .labelForm {
        color: brown;
        font-weight: 700;
    }
</style>
