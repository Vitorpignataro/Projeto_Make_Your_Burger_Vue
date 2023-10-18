<template>
    <div id="burger-table">
        <Message :msg="msg" v-show="msg"/>
        <div>
            <div id="burger-table-heading">
                <div class="order-id">#:</div>
                <div>Cliente:</div>
                <div>Pão:</div>
                <div>Carne:</div>
                <div>Opcionais:</div>
                <div>Ações:</div>
            </div>
            <div id="burger-table-rows">
                <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                    <div class="order-number">{{burger.id}}</div>
                    <div>{{burger.nome}}</div>
                    <div>{{burger.pao}}</div>
                    <div>{{burger.carne}}</div>
                    <div>
                        <ul>
                            <li v-for="(opcional, index) in burger.opcionais" :key="index">
                                {{opcional}}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <select name="status" class="status" @change="updatedBurger($event, burger.id)">
                            <!-- Fazemos a comparação para ver se o status é o mesmo para exibir o que já está vindo então do cadastro -->
                            <option v-for="statusbd in status" :key="statusbd.id" :value="statusbd.tipo" :selected="burger.status == statusbd.tipo">
                                {{statusbd.tipo}}
                            </option>
                        </select>
                        <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from './Message.vue'


export default {
    name: "Dashboard",
    components:{
        Message
    },
    data() {
        return{
            burgers: null,
            burger_id: null,
            status:[],
            msg: null
        }
    },
    mounted(){
        this.getPedidos()
    },
    methods:{
        //Função que puxa todos os pedidos e chama uma outra função para resgatar o status
        async getPedidos(){
            const req = await fetch("http://localhost:3000/burgers");
            const data = await req.json();
            this.burgers = data

            this.getStatus()
        },
        async getStatus(){
            const reqStatus = await fetch("http://localhost:3000/status")
            const dataStatus = await reqStatus.json()
            this.status = dataStatus;

        },
        //No json server isso seria como deletar um item
        async deleteBurger(id){
            const reqDelete = await fetch(`http://localhost:3000/burgers/${id}`,{
                method: "DELETE"
            });

            const resDelete = await reqDelete.json();
            this.getPedidos()

            //Define a mensagem
            this.msg = `Pedido nº ${id} foi removido com sucesso!`;

            //Deleta a mensagem após um tempo
            setTimeout(() => {
                this.msg = null
            }, 5000);

        },
        async updatedBurger(event, id){
            const option = event.target.value;
            const dataJson = JSON.stringify({status: option});

            const reqUpdate = await fetch(`http://localhost:3000/burgers/${id}`,{
                method: "PATCH",
                headers: {"Content-Type":"application/json"},
                body: dataJson
            });


            const resUpdate = await reqUpdate.json();


             //Define a mensagem
            this.msg = `Pedido nº ${resUpdate.id} foi alterado para ${resUpdate.status}!`;

            //Deleta a mensagem após um tempo
            setTimeout(() => {
                this.msg = null
            }, 5000);



        }
    }
}
</script>



<style scoped>
#burger-table{
    max-width: 1200px;
    margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row{
    display: flex;
    flex-wrap: wrap;
}


#burger-table-heading{
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
}

#burger-table-heading div,
.burger-table-row div{
    width: 19%;
}

.burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #ccc;
}

#burger-table-heading .order-id,
.burger-table-row .order-number{
    width: 5%;
}

select{
    padding: 12px 6px;
    margin-right: 12px;
}

.delete-btn{
    background: #222;
    color: #FCBA03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.5s;
}

.delete-btn:hover{
    background: transparent;
    color: #222;
}

</style>