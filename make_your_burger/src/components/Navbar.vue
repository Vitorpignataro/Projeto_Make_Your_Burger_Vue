<template>
    <!-- Criação do componente NavBaer -->
    <div id="nav">
        <router-link to="/" id="logo-url">
        <!-- Usando props para passar os valores de src e alt -->
            <img :src="logo" :alt="alt" id="logo">
        </router-link>

        <router-link to="/">
            Home
        </router-link> 
        
        <router-link to="/pedidos">
            Pedidos
        </router-link>
    </div>
</template>


<script>
// Onde nosso JS está alocado
export default {
    name: "Navbar",
    // Definindo pros
    props:["logo", "alt"],
    data() {
        return{

        }
    },
}
</script>

<style scoped>
/* Todo CSS desse componente*/
    #nav{   
        background-color: #222;
        border-bottom: 4x solid #111;
        padding: 15px 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    #nav #logo-url{
        margin: auto;
        margin-left: 0;
    }

    #logo{
        width: 40px;
        height: 40px;
    }

    #nav a {
        color: #fcba03;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
    }

    #nav a:hover {
        color: #fff;
    }



</style>