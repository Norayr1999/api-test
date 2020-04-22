<template>
  <div id="app">
    <button id="myBtn" v-on:click="openModal" :disabled="!is_enable" style="padding: 5px 10px;">Delete this feed</button>

    <!-- The Modal -->
    <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <span class="circle">
          <span class="close" v-on:click="closeModal">&times;</span>
        </span>
        <div>
          <h3>Why do you want to delete your feed?</h3>

          <div class="item">
            <input id="a" type="checkbox" value="1"  :checked="check.one" v-on:change="checkBox($event.target.checked,1)">
            <label for="a">Found a better alternative</label>
          </div>

          <div class="item">
            <input id="b" type="checkbox" value="2"  :checked="check.two" v-on:change="checkBox($event.target.checked,2)">
            <label for="b">Pricing too high</label>
          </div>

          <div class="item">
            <input id="c" type="checkbox" value="3"  :checked="check.three" v-on:change="checkBox($event.target.checked,3)">
            <label for="c">Not clear how it works</label>
          </div>

          <div class="item">
            <input id='d' type="checkbox" value="4"  :checked="check.four" v-on:change="checkBox($event.target.checked,4)">
            <label for="d">Other</label>
          </div>

          <div>
            <textarea name="" id="" cols="30" rows="10" v-if="is_Show" v-model="otherMessage"></textarea>
          </div>


          <div class="buttonBlock">
            <div>
              <button v-on:click="deleteBtn" >Delete</button>
            </div>
            <p>
              <a href=""  v-on:click.prevent="closeModal" style="font-size: 18px">Cancel</a>
            </p>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      feed_id:'',
      is_enable: false,
      is_Show: false,
      check: {one:false,two:false,three:false,four:false},
      checkBoxId: '',
      otherMessage:''
    }
  },
  mounted() {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODYyMTk5MzEsInN1YiI6IjI2NTM3OTkiLCJyb2xlIjoidXNlciIsInVzZXJuYW1lIjoiZHVob3ZnYW1lcytwdWIzMmRlMGVjIn0.b164gMpUr6RFY6T-e7zqqPYzLk2ws3kx-nEHkQSDaac';
    axios.get('http://localhost:8080/api/feed/get-base-info',{ 'headers': { 'token': token } }).then((res)=>{
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
    checkBox(checked,type){
      this.checkBoxId = type;
      switch (type) {
        case 1:
          this.check.one = true;
          this.check.two = false;
          this.check.three = false;
          this.check.four = false;
          this.is_Show = false;
          break;
        case 2:
          this.check.one = false;
          this.check.two = true;
          this.check.three = false;
          this.check.four = false;
          this.is_Show = false;
          break;
        case 3:
          this.check.one = false;
          this.check.two = false;
          this.check.three = true;
          this.check.four = false;
          this.is_Show = false;
          break;
        case 4:
          this.check.one = false;
          this.check.two = false;
          this.check.three = false;
          this.check.four = true;
          this.is_Show = !this.is_Show;
          break;
      }
    },
    deleteBtn(){
      if (!this.checkBoxId){
        this.$vToastify.info("Please select one of checkbox");
        return false;
      }
      let obj = {
        feed_id: this.feed_id,
        option: this.checkBoxId,
        message: this.checkBoxId === 4 ? this.otherMessage : null
      };
      let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODYyMTk5MzEsInN1YiI6IjI2NTM3OTkiLCJyb2xlIjoidXNlciIsInVzZXJuYW1lIjoiZHVob3ZnYW1lcytwdWIzMmRlMGVjIn0.b164gMpUr6RFY6T-e7zqqPYzLk2ws3kx-nEHkQSDaac';
      axios.get('http://localhost:8080/api/feed/delete-feed',
        {
          'headers': { 'token': token },
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
      this.check.one = false;
      this.check.two = false;
      this.check.three = false;
      this.check.four = false;
      this.is_Show = false;
      this.checkBoxId = '';
      this.otherMessage = '';
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    closeModal(){
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
  },
}

  window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
</script>

<style lang="scss">


#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

textarea{
  width: 670px;
  height: 70px;
  border-radius: 6px;
  border: 2px solid #e9e8e8;
  background-color: #ffffff;
}

.item label{
  color: #231f20;
  font-family: Montserrat;
  font-size: 15px;
  font-weight: 400;
}


/* Modal Content */
  .modal-content h3{
    color: #231f20;
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 35px;
    @media screen and (max-width: 500px) {
      margin-bottom: 25px;
    }
  }
  .modal {
    display: none;
    position: relative;
    z-index: 1;
    padding-top: 50px;
    padding-bottom: 50px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    @media screen and (max-width: 500px) {
      padding-top: 40px;
    }
  }
.modal-content {
  margin: auto;
  padding: 20px;
  background-image: url("./../assets/Combined_Shape_new.png");
  background-repeat: no-repeat;
  width: 883px;
  height: 560px;
  box-shadow: 0 5px 25px rgba(34, 60, 47, 0.15);
  border-radius: 6px;
  background-color: #ffffff;
  @media screen and (max-width: 991px) {
    width: 82%;
  }
  @media screen and (max-width: 500px) {
    height: 100%;
  }
}
  .modal-content > div{
    width: 75%;
    margin: 0 auto;
    padding-top: 25px;
    @media screen and (max-width: 991px) {
      width: 90%;
    }

  }
  .item{
    display: inline-block;
    width: 45%;
    margin-bottom: 35px;
    @media screen and (max-width: 991px) {
      width: 50%;
    }
    @media screen and (max-width: 767px){
        width: 100%;
    }
    @media screen and (max-width: 400px){
      margin-bottom: 10px;
    }

  }

  /*Input Button*/
  label {
    cursor: pointer;
    display: inline-block;
    position: relative;
    padding-left: 50px;
    margin-top: 20px;
    margin-right: 10px;
  }

  label::before {
    content: "";
    width: 15px;
    height: 15px;
    position: absolute;
    left: 0;
  }

  input[type=checkbox] {
    display: none;
  }

  label {
    &:before{
      background: url('./../assets/Combined_Shape.png') left center no-repeat;
      margin-top: -8px;
      width: 35px;
      height: 35px;
      border-radius: 6px;
      @media screen and (max-width: 400px) {
        margin-top: -5px;
      }
    }
  }

  input[type=checkbox]:checked + label:before {
    background: url('./../assets/Combined_Shape_green.png') left center no-repeat;
  }
  input[type=checkbox]:checked + label:after {
    background: url('./../assets/check.png') left center no-repeat;
  }

/*Buttons*/
.buttonBlock{
  margin-top: 30px;
  text-align: center;
}
.buttonBlock button{
  width: 155px;
  height: 90px;
  border-radius: 45px;
  color: white;
  border: none;
  outline: none;
  font-size: 30px;
  font-weight: 700;
  line-height: 40px;
  background-color: #FC000E;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

.buttonBlock button{
  &:hover{
    background-color: #ad2c2c;
  }
}
.buttonBlock a{
  text-decoration: none;
  color: grey;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  border: 2px solid #aaaaaa;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  transition: all .7s ease-in-out;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
