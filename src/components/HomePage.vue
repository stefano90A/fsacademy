<template>
    <div>
        <div v-if="employee.name">
            <p>Benvenuto {{employee.name}}</p>
        </div>
        <!--b-card
        no-body
        style="max-width: 100%;"
        v-if="item"
      >

        <template #header>
          <h4 class="mb-0">WBS: {{item.value}}</h4>
        </template>

        <b-card-body align="left">
          <b-card-title>{{item.text}}</b-card-title>
          <b-card-sub-title class="mb-2">{{item.stateDesc}}</b-card-sub-title>
          <b-container class="bv-example-row">
            <b-row class="mb-3">
              <b-col class="fontBold">Identificativo DB: {{ item.id }}</b-col>
              <b-col class="fontBold">Identificativo router: {{ wbsId }}</b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col class="fontBold">Tipo WBS: </b-col>
              <b-col>{{item.type}}</b-col>
              <b-col class="fontBold">Inizio validità: </b-col>
              <b-col>{{item.startDate}}</b-col>
              <b-col class="fontBold">Fine validità: </b-col>
              <b-col>{{item.endDate}}</b-col>
              <b-col class="fontBold">Disattiva: </b-col>
              <b-col>{{item.disabled}}</b-col>
            </b-row>
          </b-container>

          <b-list-group flush>
            <b-list-group-item>
              <p>ADV Recap</p>

              <b-table 
                striped 
                hover 
                :items="item.costi"
                :fields="this.fields" 
                selectMode="multi"
                responsive="sm" 
                selectable
                @row-selected="selectYear"
              >
                <template #cell(anno)="data">
                    <template>
                      <p :class="{ fontBold: data.value==new Date().getFullYear() }">{{ data.value }}</p>
                    </template>
                </template>

                <template #cell()="data">
                    <template>
                        {{ data.value }} €
                    </template>                
                </template>

                <template #cell(percent)="data">
                    <template>
                        {{ (data.item.margine / data.item.ricavi) * 100 }} %
                    </template>                
                </template>

              </b-table>
              
              <p>
                  Selected Rows:<br>
                  {{ selected }}                
              </p>

            </b-list-group-item>
          </b-list-group>

          <b-list-group flush>
            <b-list-group-item>
              <div v-if="projects">
                <ProjDet v-for="project in projects" :key="project.id" v-bind:item="project" provenienza="dettaglioWbs"/>
              </div>
            </b-list-group-item> 
          </b-list-group>
          
        </b-card-body>
      </b-card>
      
      <div>Lista Progetti, con ricavi entrate e spese x ogni uno</div>
      <div>Cliccando sul progetto è possibile vedere ogni risorsa che ha collaborato e in quale misura</div>

      <router-link v-if="provenienza=='link'" to="/gestionewbs"><b-button>Gestione WBS (prov. link)</b-button></router-link>
      <b-button v-else @click="closeDetails()" size="sm" class="pb-2 m-2">Gestione WBS (prov. component)</b-button-->




    </div>
</template>
  
<script>
import axios from "axios";

export default {
    name: "HomePage",
    props: {
        userId: Number,
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
        getUser( userId ) {
            axios.get("https://ftmbe.herokuapp.com/user/" + userId).then((res) => {
                if( res.data.success ) {
                    this.$session.set("user", res.data.data);
                    this.employee=res.data.data
                }
            });
        }
    },
    beforeCreate() { },
    created() {
        console.log("WbsDetails - Created")
        if (this.userId && this.$session.get("bearer") ) {
            this.getWbs(this.wbsId);
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
</style>