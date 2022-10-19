<template>
    <b-container id="registerContainer" class="w-50">
        <b-form @submit.prevent="onSubmit">
            <b-row class="justify-content-md-center">
                <b-col>
                    <b-form-group id="input-group-1" label="Name:" label-for="input-1" class="labelForm">
                        <b-form-input id="input-1" :disabled="viewMode == 'read'" v-model="employee.name" type="text" placeholder="Enter your name" required></b-form-input>
                    </b-form-group>           
                </b-col>
                <b-col>
                    <b-form-group id="input-group-2" label="Surname:" label-for="input-2" class="labelForm">
                        <b-form-input id="input-2" :disabled="viewMode == 'read'" v-model="employee.surname" type="text" placeholder="Enter your surname" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group id="input-group-3" label="Email address:" label-for="input-3" class="labelForm">
                        <b-form-input id="input-3" :disabled="viewMode == 'read'" v-model="employee.email" type="email" placeholder="Enter email" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group id="input-group-4" label="Password:" label-for="input-4" class="labelForm">
                        <b-form-input id="input-4" :disabled="viewMode == 'read'" v-model="employee.password" type="password" placeholder="Type Password" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label class="mr-sm-2 h-50 labelForm" for="inline-form-custom-select-pref" >Seleziona tipologia contratto:</label>
                    <b-form-select id="inline-form-custom-select-member" :disabled="viewMode == 'read'" v-model="employee.member">
                        <option v-for="memberType in memberTypes" v-bind:key="memberType.id" v-bind:value="memberType">{{memberType.name}}</option>
                    </b-form-select>
                </b-col>
                <b-col>
                    <label class="mr-sm-2 h-50 labelForm" for="inline-form-custom-select-pref">Seleziona Sede Assunzione:</label>
                    <b-form-select id="inline-form-custom-select-location" :disabled="viewMode == 'read'" v-model="employee.location">
                        <option v-for="location in locations" v-bind:key="location.id" v-bind:value="location">{{location.name}}</option>
                    </b-form-select>
                </b-col>
                <b-col>
                    <label class="mr-sm-2 h-50 labelForm" for="inline-form-custom-select-pref">Seleziona Benefit:</label>
                    <b-form-select id="inline-form-custom-select-refund" :disabled="viewMode == 'read'" v-model="employee.refund">
                        <option v-for="refund in refunds" v-bind:key="refund.id" v-bind:value="refund">{{refund.name}} ({{refund.value}} €/gg)</option>
                    </b-form-select>                    
                </b-col>
            </b-row>
            <b-row>
                <b-col class="p-4">
                    <b-button type="submit" v-if="viewMode=='update' || viewMode=='insert'" class="m-1" variant="primary">Submit</b-button>
                    <b-button @click="returnBack()" class="m-1" variant="secondary">Indietro</b-button>
                </b-col>
            </b-row>
            
        </b-form>
    </b-container>
</template>

<script>
import axios from "axios"

export default {
    name: "UserComponent",
    props: {
        viewMode: String,
        employeeProps: Object,
    },
    components: {},
    data() {
        return {
            employee: {},
            memberTypes: [],
            locations: [],
            refunds: []
        }        
    },
    watch: {
        refunds() {
            if( this.viewMode == 'insert' ) 
                this.employee.refund = this.refunds[0]
        },
        memberTypes() {
            if( this.viewMode == 'insert' ) 
                this.employee.member = this.memberTypes[0]
        },
        locations() {
            if( this.viewMode == 'insert' ) 
                this.employee.location = this.locations[0]
        }
    },
    methods: {
        returnBack() {
            this.$emit("return");
        },
        onSubmit: function() {
            if( this.viewMode == "update" )
                this.updateUser()
            if( this.viewMode == "insert" )
                this.insertUser()
        },
        insertUser: function() {
            axios.post("https://ftmbe.herokuapp.com/user/",this.employee,{
                headers: {
                    Authorization: 'Bearer ' + this.$session.get("bearer")
                }
            }).then((res) => {
                if( res.data.success ) {
                    alert( "Inserimento avvenuta con successo" );
                    this.$emit("inserted");
                }
            });
        },
        updateUser: function() {
            axios.put("https://ftmbe.herokuapp.com/user/",this.employee,{
                headers: {
                    Authorization: 'Bearer ' + this.$session.get("bearer")
                }
            }).then((res) => {
                if( res.data.success ) {
                    alert( "Aggiornamento avvenuta con successo" );
                    this.$emit("updated");
                }
            });
        },
        getDomainsValue: function() {
            axios.get("https://ftmbe.herokuapp.com/public/memberType").then((res) => {
                if( res.data.success ) {
                    this.memberTypes = res.data.data 
                }
            });
            axios.get("https://ftmbe.herokuapp.com/public/location").then((res) => {
                if( res.data.success ) {
                    this.locations = res.data.data 
                }
            });
            axios.get("https://ftmbe.herokuapp.com/public/refund").then((res) => {
                if( res.data.success ) {
                    this.refunds = res.data.data 
                }
            });
        },
    },
    created() {
        this.getDomainsValue()
        
        if( this.viewMode != "insert" ) {
            this.employee = this.employeeProps
        }  
        
        
    },
    beforeMount() {
        if( this.viewMode == "read" ) {    
            this.employee.password = "123456"
        } 
    },
}
</script>

<style></style>