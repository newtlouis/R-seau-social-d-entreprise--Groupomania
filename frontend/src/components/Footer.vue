// ./components/HomeLink.vue

<template>

    <footer>
        <div class="footer__contact">
            <p>Mentions légales</p>
            <a href="mailto:?to=contact@groupomania.com">Contact</a>
        </div>
    </footer>

</template>

<script>
export default {
	name: 'Footer',
   }
</script>


<style scoped>

footer{
   padding: 5vh ;
   background-color:#091F43; 
   color: white;
}

.footer__contact{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>