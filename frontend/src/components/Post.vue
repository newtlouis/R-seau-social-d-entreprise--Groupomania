<template>

<article>
        <div class="post">
            <div class="post__header">
                <div class="post__author">{{post.name}} </div>
                <button class="post__delete" v-if="userId == post.id_user || admin == 'Y'"  @click="deletePost(post.id)">Supprimer</button>
            </div>    
            <div class="post__date">{{post.date}}</div>
            <div class="post__content">{{post.content}}</div>
            
            <img :src="post.image" class="post__image" alt="image du post">
        </div>

        <div class="emoji">

            <div class="like">
                <p>{{likes}}</p>
                <button class="b__like" title="like" @click="like('like')"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="heart">
                <p>{{hearts}}</p>
                <button class="b__heart" title="heart" @click="like('heart')"><i class="fas fa-heart"></i></button>
            </div>
            <div class="laugh">
                <p>{{laughs}}</p>
                <button class="b__laugh" title="laugh" @click="like('laugh')"><i class="fas fa-grin-squint-tears"></i></button>
            </div>
            <div class="angry">
                <p>{{angrys}}</p>
                <button class="b__angry" title="angry" @click="like('angry')"><i class="fas fa-angry"></i></button>
            </div>

        </div>
        <div v-if="showComments">
            <div class="comments" v-for= "comment in comments" :key="comment">
                <div class="comment">
                    <div class="comment__header">
                        <div class="comment__author">{{comment.name}} le {{comment.date_comment}}</div>
                        <button class="comment_delete" v-if="userId == comment.id_user || admin == 'Y'" @click="deleteComment(comment.id_comment)">Supprimer</button>
                    </div>
                <div class="comment__content">{{comment.comment}}</div>
                </div>
            </div>
        </div>
        <div v-if="showComments == false">
            <router-link class="post__seeComments" :to="`/posts/${post.id}`">Voir les commentaires...</router-link>

        </div>

        <form class="newComment" @submit.prevent="creatComment()">
            <label for="newComments" class="hidden">Nouveau commentaire</label>
            <textarea title="newComments" class="newComment__content" placeholder="Ecrivez un commentaire.." required></textarea>
            <button type="submit">Envoyer</button>

        </form>
       


            

</article>
    
</template>

<script>

import axios from 'axios';

export default {
    name:'Post',
    props:{
         postId: {
                        
        },
         showComments: {
            type: Boolean,
            default: true
        },
        deleteFrom : {
            type: String
        }
    },

    data() {
        return{
            admin:"",
            post : [],
            comments: [],
            userId : localStorage.getItem("userId"),
            likes : 0,
            hearts : 0,
            laughs : 0,
            angrys: 0
            
        }
    },

    created() {
        this.isAdmin();
        this.isLoggedIn();
        this.getOnePost();
        this.getComments();
        this.likesCount();
    },

    // computed: {
    //     datePostTest() {
    //         let postDate = this.post.date;
    //         if(this.post != undefined)
    //         {return postDate.split('T')[0]}
    //         else {return "date"}
    //     }
    // },

    methods: {
    isAdmin(){
        const token = localStorage.getItem("token"); 
        const userId = localStorage.getItem("userId") 
        axios.get("http://localhost:3000/api/auth/"+userId,
            {
                headers: {
                    "content-type":'application/json',
                    "Authorization" : `Bearer ${token}`                  
                }
            }
            )
            .then((res => {this.admin = res.data.result[0].admin}))
            .catch(err => {console.log(err)})

    },

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
            .then(()=>{console.log("showComments "+this.showComments)})
            .catch(err => {
                console.log("requete probalement non authentifiée, redirection vers la page login "+err);
                this.$router.push('/login')
                })
        }
        
        ,
   async getOnePost(){
            const token = localStorage.getItem("token");  
            const postId = this.postId;

            await axios.get("http://localhost:3000/api/posts/"+ postId,
            {
                headers: {
                    "content-type":'application/json',
                    "Authorization" : `Bearer ${token}`                  
                }
            }
            )
            .then((res => {
                    this.post = res.data.result[0]}))
            .catch(err => {console.log(err)})
    },
    likesCount(){
        const token = localStorage.getItem("token");
        const postId = this.postId;
        axios.get("http://localhost:3000/api/likes/"+postId,
            {
                headers: {
                    "content-type":'application/json',
                    "Authorization" : `Bearer ${token}`                  
                }
            }
            )
            .then(res => {
                const listEmoji = res.data.result;
                var nbLikes = 0;
                var nbHearts = 0;
                var nbLaughs = 0;
                var nbAngrys = 0;
                for (const element of listEmoji){
                    if (element.type == "like") {nbLikes += 1}
                    else if (element.type == "heart") {nbHearts += 1}
                    else if (element.type == "laugh") {nbLaughs += 1}
                    else if (element.type == "angry") {nbAngrys += 1}
                }
                this.likes = nbLikes;
                this.hearts = nbHearts;
                this.laughs = nbLaughs;
                this.angrys = nbAngrys;
                // this.likes = Object.keys(res.data.listEmoji).length;
                })
            .catch(err => {console.log("erreur dans le comptage des likes "+err)})
        
    },
    
    like(type) {
            const token = localStorage.getItem("token");  
            const like = {
                id_post : this.postId,
                id_user : localStorage.getItem("userId"),
                type    : type
            }

            axios.post("http://localhost:3000/api/likes/",
            like,
            {
                headers:{
                    "Content-type": "application/json",
                    "Authorization" : `Bearer ${token}` 

                }
            }
            )
            .then(() => {this.likesCount()})
            .catch(err => {console.log(err)})


    }
    
    ,

    getComments(){
            const token = localStorage.getItem("token");  
            const postId = this.postId;  

            axios.get("http://localhost:3000/api/comments/"+ postId,
            {
                headers: {
                    "content-type":'application/json',
                    "Authorization" : `Bearer ${token}`                  
                }
            }
            )
            .then((res => {this.comments = res.data.result}))
            .catch(err => {console.log("loupé " +err)})

    },
    creatComment(){
            const token = localStorage.getItem("token"); 

            const comment = {
                id_post : this.postId,
                comment : document.getElementsByClassName("newComment__content")[0].value
            }

            axios.post("http://localhost:3000/api/comments/new",
            comment,
            {
                headers:{
                    "Content-type": "application/json",
                    "Authorization" : `Bearer ${token}` 

                }
            }
            )
            .then(() => {this.getComments()})
            .catch(err => {console.log(err)})
    },

    deleteComment(id_comment){
        const token = localStorage.getItem("token");

        axios.delete("http://localhost:3000/api/comments/"+id_comment ,
            {
                headers: {
                    "content-type":'application/json',
                    "Authorization" : `Bearer ${token}`                  
                }
            }
            )
        .then(() => {this.getComments()})
        .catch(err => {console.log("supprimer le commentaire  " +err)})
    },

    deletePost(id){
        const token = localStorage.getItem("token");

        axios.delete("http://localhost:3000/api/posts/"+id ,
            {
                headers: {
                    "content-type":'application/json',
                    "Authorization" : `Bearer ${token}`                  
                }
            }
            )
        .then(() => {
            if (this.deleteFrom == "Wall") { window.location.reload()}
            else {this.$router.push('/')}
            })
        .catch(err => {console.log("supprimer le post  " +err)})
    },
    //  datePost(dateElement){

    //         const newDate = dateElement.split("T");
    //         return newDate[0]
    //     }
 
   }
}
</script>

<style scoped>

article{
    width: 43vw;
    border-radius: 20px;
    margin: 5vh auto;
    display: flex;
    flex-direction: column;
    background-color: white;
}

.post{
    display: flex;
    flex-direction: column; 
    /* background-color:white; */

}

.post__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5% 5% 0 5%;
}

.post__seeComments, .post__comments, .post__content, .newComment{
    padding: 5% 5%;
}

.comments{
    padding: 2% 5%;
}

.post__author{
    font-weight: bold;
}

.post__date{
    padding: 0 5%;
    font-size: 0.8rem;
    color: rgb(87, 87, 87);
}

.post__image{
    margin: 2vh 0;
}

.emoji{
    display:flex;
    justify-content: center;
}

.like, .heart, .laugh, .angry{
    margin: 0 2vw;
    display: flex;
    align-items: center;
}

i{
    font-size: 20px;
}

.post__seeComments{
    color: #BA4D55;
    text-decoration: underline;
}

.comment{
    margin: 0.01vh;
    padding: 1vh;
    background-color: whitesmoke;
    border-radius: 10px;
}

.comment__header{
    display: flex;
    justify-content: space-between;
}

.comment__author{
    color:rgb(70, 69, 69);
    font-weight:bold;
    font-size: 0.8rem;
}

.newComment{
    display: flex;
    justify-content: left;
    align-items: center;
}

button{
        border: 2px solid #aaa;
        border-radius: 4px;
        width: 100px;
        padding: 5px;
        margin: 3px;
        transition: 0.3s;
    }

button:hover{
        border-color: #BA4D55;
        box-shadow: 0 0 8px 0 #BA4D55;
        cursor: pointer;
    }

.b__like, .b__heart, .b__laugh, .b__angry{
    background-color:rgba(255, 255, 255, 0);
    color: #4b7fdf;
    border: none;
    width: 25px;
    transition: .3s;
}

.b__like:hover, .b__heart:hover, .b__laugh:hover, .b__angry:hover{
    border: none;
    box-shadow: none;
    transform:scale(1.3);
    cursor: pointer;
}

.b__heart{
     color: rgb(226, 57, 5);
   }


.b__laugh{
    color: rgb(238, 168, 39);
  }
.b__angry{
    color: rgb(82, 19, 19);
}

.b__laugh:hover{
    border: none;
    box-shadow: none;
    transform:scale(1.3);
    cursor: pointer;
}

    .newComment__content{
        resize: none;

        width: 40vw;
        background-color: rgb(241, 241, 241);
        border: 2px solid #aaa;
        border-radius: 15px;
        outline: none;
        margin: 0 auto;
        padding: 8px;
        transition: .3s;
    }

    .newComment__content:focus{
        border-color: #BA4D55;
        box-shadow: 0 0 8px 0 #BA4D55;

    }

    .hidden{
        z-index: -10;
        width: 0;
    }
</style>
