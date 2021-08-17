// ./components/HomeLink.vue

<template>
<div class="signup">
    <img class="logo" alt="logo Groupomania" :src="viaJs">
   

    <form @submit.prevent="signup()">
        <div class="form__SignUp__header">
                <h2>Connectez vous</h2>
                <router-link class="toLogin" :to="`/Login/`">Vous avez déjà un compte ? </router-link>
            </div>

        <div class="form__signup">
            <div class="form__name">
                <label for="name"><i class="fas fa-user"></i></label>
                <input class="name" type="text" placeholder="user" required/>
            </div>

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
	name: 'SignupForm',

    data() {
        return{
            viaJs: require('../assets/icon-above-font.png') // eslint-disable-line no-undef
        }
    },

    methods: {
        signup() {
            console.log("Louis");

            
        
            const name = document.getElementsByClassName("name")[0].value;
            const email = document.getElementsByClassName("email")[0].value;
            const password = document.getElementsByClassName("password")[0].value;

            console.log(name);
            
            // Envoie à la BD
            axios.post("http://localhost:3000/api/auth/signup",
            {
                name,
                email,
                password
            },
            {
            header: {
                "Content-type":"application/json",
                }
            }
            )
            .then(() => this.$router.push('/login'))
            .catch((error) => console.log(error) )
        }
    }
    
   }
</script>


<style scoped>

.logo{
    width: 30vw;
}

h1{
    text-align: center;
    margin: 0 4vw;
}

.signup{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 5vh 5vw;
}

.form__signup{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40vw;
    margin: 0 auto;
    
}

.form__SignUp__header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.toLogin{
    color: #BA4D55;
    margin: 2vh;
}

.form__email, .form__password, .form__name{
    display: flex;
    justify-content: center;
    align-items: center;
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