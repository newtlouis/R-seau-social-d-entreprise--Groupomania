<template>
<div>
<Header/>

<CreatPost/>  

<article class="allPosts__posts" v-for="post in posts" :key="post">
  <Post :postId = "post.id" :showComments='false' deleteFrom = "Wall"/>
</article>

<Footer/>  
</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import CreatPost from '@/components/CreatPost.vue';
import Post from '@/components/Post.vue';
import Footer from '@/components/Footer.vue';

import axios from 'axios';


export default {
  name: 'Wall',
  components: {
    Header, Footer, CreatPost, Post
  },
     data(){
        return{
            posts:[],
        }
    },
    mounted(){
        this.getAllPosts()   
    },
    methods: {
        getAllPosts(){
            const token = localStorage.getItem("token");    

            axios.get("http://localhost:3000/api/posts/all",
            {
                headers: {
                    "content-type":'application/json',
                    "Authorization" : `Bearer ${token}`                  
                }
            }
            )
            .then((res => {this.posts = res.data.result}))
            .catch(err => {console.log(err)})
            
        }
}
}
</script>
