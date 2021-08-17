// ./components/HomeLink.vue

<template>

    <div class="login">
    <img class="logo" alt="logo Groupomania" :src="viaJs">

    <form @submit.prevent="login()">

        <div class="form__login">
            <div class="form__login__header">
                <h2>Connectez vous</h2>
                <router-link class="toSignup" :to="`/Signup/`">Vous n'avez pas encore de compte ? </router-link>
            </div>

            <div class="error"></div>

            <div class="form__email">
                <label for="email"><i class="fas fa-envelope"></i></label>
                <input class="email" type="text" placeholder="email" required />
            </div>


            <div class="form__password">
                <label for="password"><i class="fas fa-lock"></i></label>
                <input class="password" type="text" placeholder="password">
            </div>
            <button class="submit" type="submit">Je valide</button>

        </div>
    </form>
</div>    

</template>

<script>

import axios from "axios";

export default {
	name: 'LoginForm',

    data() {
        return{
            viaJs: require('../assets/icon-above-font.png') // eslint-disable-line no-undef
        }
    },

    methods: {
        login() {
        
            const email = document.getElementsByClassName("email")[0].value;
            const password = document.getElementsByClassName("password")[0].value;
            
            // Envoie à la BD
            axios.post("http://localhost:3000/api/auth/login",
            {
                email,
                password
            },
            {
            header: {
                "Content-type":"application/json",
                }
            }
            )
            .then((res) => {
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name", res.data.name);
                this.$router.push('/')
            })
            .catch(() =>{ document.getElementsByClassName("error").innerHTML = "Adresse email ou mot de passe incorrect"} )
        }
    }
    
   }
</script>


<style scoped>

.logo{
    width: 30vw;
}

.login{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin:5vh 5vw;
}

.form__login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40vw;
    margin: 0 auto;
    
}

.form__login__header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.toSignup{
    color: #BA4D55;
    margin: 2vh;
}

.form__email, .form__password{
    display: flex;
    justify-content: center;
    align-items: center;
}

h1{
    text-align: center;
    margin: 0 4vw;
}

input{
    margin:2vh ;
    border: 2px solid #aaa;
    border-radius: 4px;
    outline: none;
    padding: 8px;
    transition: 0.3s;
}

input:focus{
    border-color: #BA4D55;
    box-shadow: 0 0 8px 0 #BA4D55;
}


button{
        margin: 2vh;
        border: 2px solid #aaa;
        border-radius: 4px;
        width: 100px;
        padding: 5px;
        transition: 0.3s;
    }

button:hover{
        border-color: #BA4D55;
        box-shadow: 0 0 8px 0 #BA4D55;
    }

</style>