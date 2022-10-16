<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p class="m-5" style="font-size: x-large;">Parametro ricevuto : {{$route.params.id}}</p>
  </div>
</template>

<script>
export default {
  name: 'RouteWithParam',
  components: {
    
  }
}
</script>
