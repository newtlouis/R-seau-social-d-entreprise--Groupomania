<template>
<div>

<Header/>
<Post :postId = 'this.$route.params.id' :showComments='true' deleteFrom = "OnePost"/>
<Footer/>  

</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Post from '@/components/Post.vue';
import Footer from '@/components/Footer.vue';



export default {
  name: 'OnePost',
  components: {
    Header,  Footer, Post,
  }
}
</script>
