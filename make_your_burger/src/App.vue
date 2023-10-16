<template>

  <Navbar :logo="logo_src" :alt="app_name" />
  <!-- A tag abaixo consiste onde alocaremos todas as views do nosso sistema -->
  <router-view/> 
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
  

export default {

  data() {
    return{
      logo_src: "/img/logo.png",
      app_name: "Make your burger"
    }
  },
  components:{
    Navbar,
    Footer
  }
}
</script>



<style>
/* Estilo de escopo global  */

  *{
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;
  }

  .main-container{
    margin: 50px;
    min-height: 60vh;
  }

  h1{
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }

</style>
