<template>
<div>
<Header/>
<Profile/>
<Footer/>
</div>  
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Profile from '@/components/Profile.vue';
import Footer from '@/components/Footer.vue';



export default {
  name: 'Louis',
  components: {
    Header, Profile, Footer
  }
}
</script>
