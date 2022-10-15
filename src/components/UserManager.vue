<template>
    <div>
        <!--:select-mode="selectMode"-->                
        <b-table
            :fields="this.fields" 
            :items="this.employees" 
            selectMode="single"
            ref="selectableTable"
            responsive="sm" 
            class="m-auto w-75"
            style="text-align: left;"  
            selectable 
            hover
        >
            <!-- A virtual column -->
            <template #cell()="data">
                <template>
                    {{ data.value }}
                </template>                
            </template>

            <!-- A custom formatted column -->
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

            <!-- A virtual column -->
            <template #cell(showDatails)>
                <div id="functionCont"> 
                    <b-img src="../assets/del.png" class="m-1 icon" fluid alt="Delete" v-b-tooltip.hover title="Delete"></b-img>
                    <b-img src="../assets/dett.png" class="m-1 icon" fluid alt="Show Details" v-b-tooltip.hover title="Show Details"></b-img>
                    <b-img src="../assets/modf.png" class="m-1 icon" fluid alt="Update" v-b-tooltip.hover title="Update"></b-img>          
                </div>                      
            </template>
        </b-table>

    </div>
</template>
  
<script>
import axios from "axios";

export default {
    name: "UserManager",
    props: {},
    components: {},
    data() {
        return {
            fields: [
                { key: 'name', label: 'Name' },
                { key: 'surname', label: 'Surname' },
                { key: 'email', label: 'Email' },
                { key: 'member', label: 'Member Type' },
                { key: 'location', label: 'Location' },
                { key: 'refund', label: 'Refund' },
                { key: 'showDatails', label: 'Function' }
            ],
            employees: []
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
                    this.$session.set("user", res.data.data);
                    this.employees=res.data.data
                }
            }).catch(function (error) {
                console.log(error);
                this.logout();    
            });
        }/*,
        logout() {
            this.$emit("logout");
        }*/
    },
    beforeCreate() { },
    created() {
        if (this.$session.exists("bearer") ) {
            this.getListUsers();
        } else {
            //this.logout();
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

</style>