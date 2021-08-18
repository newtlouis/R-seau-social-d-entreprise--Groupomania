// ./components/HomeLink.vue

<template>


<header>
    <div class="header">
        <router-link class="menu" v-if="isLogged()" to="/"><img class="logo" alt="logo Groupomania" :src="viaJs"></router-link>

        <div id="nav">
            <router-link class="menu" v-if="isLogged()" to="/">Wall</router-link> 
            <router-link class="menu" v-if="isLogged()" to="/louis">Mon compte</router-link> 
            <router-link class="menu" v-if="!isLogged()" to="/login">Login</router-link> 
            <router-link class="menu" v-if="!isLogged()" to="/signup">s'inscrire</router-link>
        </div>
    </div>
       
</header>

</template>

<script>

export default {
	name: 'Header',
  data() {
    return {
      viaJs: require('../assets/logowhite.png') // eslint-disable-line no-undef
    }
  },
    methods: {
        isLogged(){
            const token = localStorage.getItem("token");
            if (token) return true
            else return false
        }
    }
   }

</script>


<style lang="scss" scoped>

.header{
    height: 15vh;

    display: flex;
    justify-content: space-between;
    align-items: center;

    text-decoration: none;
    color:white;
    background-color:#091F43;
}

.logo{
    width: 35vh;
    margin-left: 2vw;
}

#nav{
    margin-right: 5vw ;
}

.menu{
    padding: 2vw;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.1rem;
}
</style>