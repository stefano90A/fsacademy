<template>
    <div>
        <div v-if="show=='listUsers'">
            <div class="m-auto w-75" style="text-align: left;">
                <b-button pill class="m-1" variant="outline-primary" @click="show = 'insertUser'">Aggiungi</b-button>
            </div>
            <div style="clear: both"></div>
            <div style="max-height: 500pt; overflow-y:auto">
                <b-table
                    :fields="this.fields" 
                    :items="this.employees"
                    selectMode="single"
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
                    <!-- Tutte le colonne -->
                    <template #cell()="data">
                        {{ data.value }}
                    </template>
                    <!-- Colonne custom -->
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
                    <!-- Colonna virtuale -->
                    <template #cell(showDatails)="data">
                        <div id="functionCont"> 
                            <b-img src="../assets/del.png" class="m-1 icon" fluid alt="Delete" v-b-tooltip.hover title="Delete" @click="deleteUser(data.item.id)"></b-img>
                            <b-img src="../assets/dett.png" class="m-1 icon" fluid alt="Show Details" v-b-tooltip.hover title="Show Details" @click="showUser(data.item)"></b-img>
                            <b-img src="../assets/modf.png" class="m-1 icon" fluid alt="Update" v-b-tooltip.hover title="Update" @click="updateUser(data.item)"></b-img>          
                        </div>                      
                    </template>
                </b-table>
            </div>
            
            Selected: {{selected}}
        </div>
        <div v-if="show=='updateUser'">
            <UserComp :employeeProps="employee" viewMode="write" @return="returnBack()" @updated="getListUsers(); returnBack();"></UserComp>
        </div>
        <div v-if="show=='showUser'">
            <UserComp :employeeProps="employee" viewMode="read" @return="returnBack()" @updated="getListUsers(); returnBack();"></UserComp>
        </div>
        <div v-if="show=='insertUser'">
            <UserComp :employeeProps="employee" viewMode="insert" @return="returnBack()" @inserted="getListUsers(); returnBack();"></UserComp>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
import UserComp from "./User.vue";

export default {
    name: "UserManager",
    props: {},
    components: {
        UserComp
    },
    data() {
        return {
            show: "listUsers",
            employee: null,
            fields: [
                { key: 'name', label: 'Name' },
                { key: 'surname', label: 'Surname' },
                { key: 'email', label: 'Email' },
                { key: 'member', label: 'Member Type' },
                { key: 'location', label: 'Location' },
                { key: 'refund', label: 'Refund' },
                { key: 'showDatails', label: 'Function' }
            ],
            employees: [],
            selected: [],
            criteria: this.$session.get("userId")
        }
    },
    methods: {
        getListUsers() {
            axios.get("https://ftmbe.herokuapp.com/user/",{
                headers: {
                    Authorization: 'Bearer ' + this.$session.get("bearer")
                }
            }).then((res) => {
                if( res.data.success ) {
                    this.employees=res.data.data
                }
            }).catch(function (error) {
                console.log(error);
                this.logout();    
            });
        },
        logout() {
            this.$emit("logout");
        },
        filterTable(row, filter) {
            if (row.id == filter) {
                return false;
            } else {
                return true;
            }
        },
        onRowSelected(items) {
            this.selected = items;
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
        updateUser(item) {           
            this.employee = item
            this.show = "updateUser"
        },
        showUser(item) {           
            this.employee = item
            this.show = "showUser"
        },
        returnBack() {
            this.show = "listUsers"
            this.employee = null;
        }
    },
    beforeCreate() { },
    created() {
        if (this.$session.exists("bearer") ) {
            this.getListUsers();
        } else {
            this.logout();
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
.icon {
    height: 20px;
}

#functionCont {
    float: left;
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