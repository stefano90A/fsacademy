<template>
    <div>
        <div v-if="show=='listUsers'">
            <div class="m-auto w-75" style="text-align: left;">
                <b-button pill class="m-1" variant="outline-primary" @click="getListUsers()">Aggiorna</b-button>
                <b-button pill class="m-1" variant="outline-primary" @click="show = 'insertUser'">Aggiungi</b-button>
                <b-button pill class="m-1" variant="outline-primary" @click="deleteSelected()">Elimina</b-button>
                <b-button pill class="m-1" variant="outline-primary" @click="selectAll()">Sel. Tutti</b-button>
                <b-button pill class="m-1" variant="outline-primary" @click="deselectAll()">Desel. Tutti</b-button>
            </div>
            <b-table
                :fields="this.fields" 
                :items="this.employees"
                selectMode="multi"
                ref="selectableTable"
                responsive="sm" 
                class="m-auto w-75"
                style="text-align: left;"  
                selectable 
                striped 
                hover
                :filter="criteria"
                :filter-function="filterTable"
                @row-selected="onRowSelected"
            >
                
                <template #cell(email)="data">
                    <b class="text-info" >{{data.value}}</b>                
                </template>
                <template #cell(member)="data">
                    {{data.value.name}}                
                </template>
                <template #cell(location)="data">
                    {{data.value.name}}                
                </template>
                <template #cell(refund)="data">
                    {{data.value.name}}                
                </template>
                <template #cell(showDatails)="data">
                    <div id="functionCont"> 
                        <b-img src="../assets/del.png"  class="m-1 icon" fluid alt="Delete" v-b-tooltip.hover title="Delete" @click="deleteUser(data.item.id)"></b-img>
                        <b-img src="../assets/dett.png" class="m-1 icon" fluid alt="Show Details" v-b-tooltip.hover title="Show Details" @click="showUser(data.item)"></b-img>
                        <b-img src="../assets/modf.png" class="m-1 icon" fluid alt="Update" v-b-tooltip.hover title="Update" @click="updateUser(data.item)"></b-img>          
                    </div>                      
                </template>
            </b-table>
            {{selected}}
        </div>
        <div v-if="show=='updateUser'">
            <UserComp :employeeProps="employee" viewMode="update" @return="returnBack()" @updated="getListUsers(); returnBack();"></UserComp>
        </div>
        <div v-if="show=='showUser'">
            <UserComp :employeeProps="employee" viewMode="read" @return="returnBack()" @updated="returnBack();"></UserComp>
        </div>
        <div v-if="show=='insertUser'">
            <UserComp :employeeProps="employee" viewMode="insert" @return="returnBack()" @inserted="getListUsers(); returnBack();"></UserComp>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import UserComp from "./User.vue"

export default {
    name: "UserManager",
    props: {
        
    },
    components: {
        UserComp
    },
    data() {
        return {
            show: 'listUsers',
            employees: [],
            employee: {},
            selected: null,
            criteria: this.$session.get("userId").toString(),
            fields: [
                { key: 'name', label: 'Name' },
                { key: 'surname', label: 'Surname' },
                { key: 'email', label: 'Email' },
                { key: 'member', label: 'Member Type' },
                { key: 'location', label: 'Location' },
                { key: 'refund', label: 'Refund' },
                { key: 'showDatails', label: 'Function' }
            ]
        }
    },
    methods: {
        getListUsers() {
            axios.get("https://ftmbe.herokuapp.com/user/",{
                headers: {
                    Authorization: 'Bearer ' + this.$session.get("bearer")
                }
            }).then( (res) => {
                if( res.data.success )
                    this.employees = res.data.data
            })
        },
        onRowSelected(items) {
            this.selected = items;
        },
        filterTable(row, filter) {
            if (row.id == filter) {
                return false;
            } else {
                return true;
            }
        },
        deleteUser(item) {           
            axios.delete("https://ftmbe.herokuapp.com/user/"+item,{
                headers: {
                    Authorization: 'Bearer ' + this.$session.get("bearer")
                }
            }).then(() => {
                this.getListUsers()
            }).catch(function (error) {
                console.log(error);
                this.logout();    
            });
        },
        updateUser(employee) {
            this.employee = employee
            this.show = "updateUser"
        },
        returnBack() {
            this.show = "listUsers"
            this.employee = null;
        },
        showUser(employee) {
            this.show = "showUser"
            this.employee = employee
        },
        deleteSelected() {
            if( this.selected.length == 0 ) {
                alert("Selezionare almeno un record")
                return
            }
            this.selected.forEach((value) => {
                this.deleteUser(value.id)
            });
            this.getListUsers();
        },
        selectAll() {
            this.$refs.selectableTable.selectAllRows()
        },
        deselectAll() {
            this.$refs.selectableTable.clearSelected()
        }
    },
    created() {
        this.getListUsers()
    }
}
</script>

<style scoped>
.icon {
    height: 20px;
}
#icona {
    color: red;
}

.btn-outline-primary:hover{
    background-color:brown;
    color: white;
}
.btn-outline-primary{
    color:brown;
    border-color: brown;
}
</style>