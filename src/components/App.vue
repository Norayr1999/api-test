<template>
  <div id="app" >
    <button id="myBtn" v-on:click="openModal" :disabled="!is_enable" style="padding: 5px 10px;">Delete this feed</button>

    <modal-component v-on:closeModal="closeModal"
                     v-on:deleteBtn="deleteBtn"
                     :showModal="is_show"
                     :checkBoxValue.sync="checkBoxValue"
                     :otherMessage.sync="otherMessage"
    ></modal-component>



  </div>
</template>

<script>
  import axios from 'axios';
  import ModalComponent from "./Modal";

  export default {
    name: 'app',
    components:{
      ModalComponent
    },

    data () {
      return {
        feed_id:'',
        is_show: false,
        is_enable: false,
        otherMessage:'',
        checkBoxValue:"",
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODYyMTk5MzEsInN1YiI6IjI2NTM3OTkiLCJyb2xlIjoidXNlciIsInVzZXJuYW1lIjoiZHVob3ZnYW1lcytwdWIzMmRlMGVjIn0.b164gMpUr6RFY6T-e7zqqPYzLk2ws3kx-nEHkQSDaac'
      }
    },

    mounted() {
      axios.get('http://localhost:8080/api/feed/get-base-info',{ 'headers': { 'token': this.token } }).then((res)=>{
        if (res.data.code === 200){
          this.is_enable = true;
          this.feed_id = res.data.id;
          this.$vToastify.success("Successfully get feed id");
        }
      }).catch((err)=>{
        this.$vToastify.error(err.message);
      })
    },


    methods:{
      deleteBtn(){
        if (!this.checkBoxValue){
          this.$vToastify.info("Please select one of checkbox");
          return false;
        }
        let obj = {
          feed_id: this.feed_id,
          option: this.checkBoxValue,
          message: this.checkBoxValue == 4 || this.checkBoxValue == 1 ? this.otherMessage : null
        };
        axios.get('http://localhost:8080/api/feed/delete-feed',
          {
            'headers': { 'token': this.token },
            params: obj
          }).then((res)=>{
          if (res.data.code === 200){
            this.$vToastify.success('Successfully deleted, full_name = '+res.data.full_name);
            this.closeModal()
          }
        }).catch((err)=>{
          this.$vToastify.error(err.message);
        });

      },
      openModal(){
        this.is_show = true
      },
      closeModal(){
         this.otherMessage='';
        this.checkBoxValue="";
        this.is_show = false
      }
    },
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    box-sizing: border-box;
    min-height: 100vh;
    position: relative;
  }
  #myBtn{
    position: absolute;
    left: 10px;
    top: 10px;
  }
</style>



