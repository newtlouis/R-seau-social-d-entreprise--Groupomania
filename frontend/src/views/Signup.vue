<template>
<div>
<Header/>
<SignupForm/>
<Footer/>  
</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import SignupForm from '@/components/SignupForm.vue';
import Footer from '@/components/Footer.vue';



export default {
  name: 'Signup',
  components: {
    Header, SignupForm, Footer
  }
}
</script>
