<template>
    
    <div>
            <b-card
                no-body
                style="max-width: 80%;"
                v-if="employee.name"
                class="m-auto"
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

</template>

<script>

export default {
    name: "ProfileCardComponent",
    props: {
        employee: Object,
    },
    components: {},
    data() {
        return {}
    },
    methods: {}
}

</script>