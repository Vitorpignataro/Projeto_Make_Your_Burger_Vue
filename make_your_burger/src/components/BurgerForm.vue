<template>
    <div>
        <Message :msg="msg" v-show="msg"/>
        <div>
            <form id="burger-form" @submit="createBurger($event)">
                <div class="input-container">
                    <label for="nome">Nome do cliente:</label>
                    <!-- v-model pega  valor referente o mesmo nome da secção data -->
                    <input type="text" name="nome" id="nome" v-model="nome" placeholder="Digite o seu nome">
                </div>
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao">
                        <option value="">Selecione o seu pão</option>
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
                            {{ pao.tipo }}
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne do seu Burger:</label>
                    <select name="carne" id="carne" v-model="carne">
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
                            {{carne.tipo}}
                        </option>
                    </select>
                </div>
                <div id="opcionais-container" class="input-container">
                    <label id="opcionais-tittle" for="opcionais">Selecione os opcionais:</label>
                    <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                        <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
                        <span>{{opcional.tipo}}</span>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" id="submit-btn" value="Criar meu Burger">
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import Message from './Message.vue'

export default {
    name: "BurgerForm",
    data() {
        /* 
            Aqui trazemos todos os items que podemos ter, os que estão em plurar pegaremos do banco
            os que estão em sigular pegaremos do input do usuário
        */
        return{
            paes:null,
            carnes: null,
            opcionaisdata: null,
            nome: null,
            pao: null,
            carne: null,
            opcionais: [],
            status: "Solicitado",
            msg: null
        }
    },
    methods:{
        // Busca os ingredientes da rota da API fake e transforma em json
        async getIngredients(){
            const req = await fetch("http://localhost:3000/ingredientes")
            const data = await req.json() 

            //Atribuindo os valores de data
            this.paes = data.paes
            this.carnes = data.carnes
            this.opcionaisdata = data.opcionais
        },
        async createBurger(e){
            e.preventDefault();

            //Criamos o objeto com os valores que vêm do submit
            const data = {
                nome: this.nome,
                pao: this.pao,
                carne: this.carne,
                opcionais: Array.from(this.opcionais),
                status: "Solicitado"
            }

            console.log(data)

            // Transforma nosso objeto em json
            const dataJson = JSON.stringify(data)

            // Realiza a requisição para inserir os o novo hamburger
            const req = await fetch("http://localhost:3000/burgers", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: dataJson
            });

            const res = await req.json();
            
            //Define a mensagem
            this.msg = `Pedido nº${res.id} foi enviado!`;

            //Deleta a mensagem após um tempo
            setTimeout(() => {
                this.msg = null
            }, 5000);

            this.nome = '';
            this.pao = '';
            this.carne = '';
            this.opcionais = '';

        }
    },
    // lifecycles mounted - chama algo quando a página é montada
    mounted(){
        this.getIngredients()
    },
    components: {
        Message
    }

}
</script>


<style scoped>

#burger-form{
    margin: 0 auto;
    max-width: 400px;
}

.input-container{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label{
    font-weight: bold;
    margin-bottom: 15px;
    color: 222;
    padding: 5px 10px;
    border-left: 4px solid #fcba03;
}

input, select{
    padding: 5px 10px;
    /* width: 300px; */
}

.checkbox-container{
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
}

#opcionais-container{
    flex-direction: row;
    flex-wrap: wrap;
}

#opcionais-tittle{
    width: 100%;
}

.checkbox-container span,
.checkbox-container input{
    width: auto;
}

.checkbox-container span{
    margin-left: 6px;
    font-weight: bold;
}

#submit-btn{
    background-color: #222;
    color: #fcba03;
    font-weight: bold;
    padding: 15px;
    border: 2px solid #222;
    font-size: 16px;
    cursor: pointer;
    transition: 0.5s;
    /* margin: 0 auto; */
}

#submit-btn:hover{
    background-color: #fcba03;
    color: #222;
    /* margin: 0 auto; */
}
    

</style>