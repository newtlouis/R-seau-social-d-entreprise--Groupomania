<template>

<section class="profile">
    <img class="logo" alt="logo Groupomania" :src="viaJs">

    
    <div class="profile__content">
        <h2 class="user__name"></h2>
        <button class="profile__logout" @click="logout">Se déconnecter</button>
        <button class="profile__delete" @click="deleteProfile">Supprimer mon compte</button>
    </div> 
</section>
    
</template>

<script>

import axios from 'axios';

export default {
    name:'Profile',

    data(){
        return {
            selectedFile: null,
            id :"",
            viaJs: require('../assets/icon-above-font.png') // eslint-disable-line no-undef

        }
    },

  mounted(){

        this.isLoggedIn();
        const name = localStorage.getItem('name');
        document.getElementsByClassName("user__name")[0].innerHTML = name
    },

    methods: {
        isLoggedIn(){
            const token = localStorage.getItem("token");    
            axios.get("http://localhost:3000/api/posts/all",
            {
                headers: {
                    "content-type":'application/json',
                    "Authorization" : `Bearer ${token}`                  
                }
            }
            )
            .catch(err => {
                console.log("requete non authentifiée, redirection vers la page login "+err);
                this.$router.push('/login')
                })
        }
        
        ,
        upload(event) {
            console.log(event.target.files[0])
            this.selectedFile = event.target.files[0]
        }
        ,
        deleteProfile(){
            
            const id = localStorage.getItem('userId');
            axios.delete("http://localhost:3000/api/user/"+id,
            {
                headers:{
                    "content-type": "application/json",
                }
            }
            )
            .then(()=>{
                this.$router.push('/signup')
            } )
            .catch(err => console.log(err))
        },

        logout(){
            localStorage.removeItem("token");
                this.$router.push('/login')


        }
    }
}
</script>

<style scoped>

section{
    margin: 5vh 0;
}

.logo{
    width: 30vw;
}

.profile{
    display: flex;
    justify-content: space-around;

    padding: 0 10vw;
}

.profile__delete{
    margin: 5vh 0;
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
