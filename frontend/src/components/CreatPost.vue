<template>

<section class="creatPost">
    <h2>Que souhaitez-vous raconter ?</h2>

    <form class="newPost" @submit.prevent="creatPost()">
        
        <div class="newPost__content">
            
            <div class="postDescription">
                <label for="content"></label>
                <textarea id="content" name="content" class="postDescription__content" rows="4" cols="12" placeholder="Ecrivez içi" required></textarea>
            </div>
           
            <label title="image" for="image" class="hidden">image</label>
                <input id="image" class="post__image" type="file" name="image" ref="image" v-on:change="upload"> <br>
            
         </div>

        <button type="submit">Partagez</button>
    </form>

</section>
    
</template>

<script>

import axios from 'axios';

export default {
    name:'CreatPost',

    data() {
        return {
            selectedFile: null
        }
    },

    created() {
        this.isLoggedIn();  
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
            .then(()=>{console.log("Connecté")})
            .catch(err => {
                console.log("requete probalement non authentifiée, redirection vers la page login "+err);
                this.$router.push('/login')
                })
        }
        
        ,
        upload(event) {
            this.selectedFile = event.target.files[0]
        }
        ,
        creatPost(){

            const fd = new FormData();
            fd.append('image',  this.selectedFile);
            fd.append('content',  document.getElementsByClassName("postDescription__content")[0].value);
            console.log(Array.from(fd));
            console.log(fd);


            const token = localStorage.getItem("token");    

            axios.post("http://localhost:3000/api/posts/new",
            fd,
            {
                headers:{
                    "Content-type": "application/json",
                    "Authorization" : `Bearer ${token}` 

                }
            }
            )
            .then(()=> window.location.reload())
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>

h2{
    margin: 0 auto;
}


.newPost, .newPost__content, .creatPost{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.creatPost{
    width: 43vw;
    margin: 5vh auto;
    padding: 2%;
    background-color:rgb(250, 250, 250);
    border-radius: 20px;
    box-shadow: 0px 0px 4px 0px rgb(207, 206, 206);
    }            

  

    .postDescription__content{
        resize: none;
        width: 40vw;
        background-color: rgb(241, 241, 241);
        border: 2px solid #aaa;
        border-radius: 15px;
        outline: none;
        margin: 10px 30vw;
        padding: 8px;
        transition: .3s;
    }

    .postDescription__content:focus{
        border-color: #BA4D55;
        box-shadow: 0 0 8px 0 #BA4D55;

    }

    button{
        border: 2px solid #aaa;
        border-radius: 4px;
        width: 100px;
        padding: 8px;
        margin: 10px;
        transition: 0.3s;
    }

    button:hover{
        border-color: #BA4D55;
        box-shadow: 0 0 8px 0 #BA4D55;
    }

    .hidden{
        z-index: -10;
    }

</style>
