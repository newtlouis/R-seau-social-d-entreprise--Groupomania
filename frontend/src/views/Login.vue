<template>
<div>
<Header/>
<LoginForm/>
<Footer/>  
</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import LoginForm from '@/components/LoginForm.vue';
import Footer from '@/components/Footer.vue';



export default {
  name: 'Login',
  components: {
    Header, LoginForm, Footer
  }
}
</script>
