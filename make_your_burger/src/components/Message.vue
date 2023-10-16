<template>
    <div class="message-container">
        <p>{{msg}}</p>
    </div>
</template>

<script>

export default {
    name: "Message",
    props:{
        msg: String
    },
    data() {
        return{

        }
    },
}
</script>

<style scoped>
.message-container{
    max-width: 400px;
    margin: 30px auto;
    background-color: #CCE5ff;
    border: 2px solid #b8daff;
    color: #004085;
    border-radius: 5px;
    padding: 10px;
}

</style>