<template>
  <!-- The Modal -->
  <div id="myModal" class="modal" ref="newModal" v-if="showModal">

    <!-- Modal content -->
    <div class="modal-content">
        <span class="circle" v-on:click="closeModal">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      <div>
        <h3>Why do you want to delete your feed?</h3>

        <div class="item">
          <input id="a" type="radio" value="1" v-model="checkBoxValueNew"   v-on:change="$emit('update:checkBoxValue', checkBoxValueNew)">
          <label for="a">Found a better alternative</label>
        </div>

        <div class="item">
          <input id="b" type="radio" value="2" v-model="checkBoxValueNew" v-on:change="$emit('update:checkBoxValue', checkBoxValueNew)" />
          <label for="b">Pricing too high</label>
        </div>

        <div class="item">
          <input id="c" type="radio" value="3" v-model="checkBoxValueNew"  v-on:change="$emit('update:checkBoxValue', checkBoxValueNew)">
          <label for="c">Not clear how it works</label>
        </div>

        <div class="item">
          <input id='d' type="radio" value="4" v-model="checkBoxValueNew"  v-on:change="$emit('update:checkBoxValue', checkBoxValueNew)">
          <label for="d">Other</label>
        </div>

        <div class="flex-fill">
          <p v-if="checkBoxValueNew == 1">Found a better alternative</p>
          <p v-if="checkBoxValueNew == 4">Other</p>
          <textarea name="" rows="6" v-if="checkBoxValueNew == 1 || checkBoxValueNew == 4" v-model="otherMessageNew" v-on:change="$emit('update:otherMessage', otherMessageNew)"></textarea>
        </div>


        <div class="buttonBlock">
          <div>
            <button v-on:click="deleteBtn" >Delete</button>
          </div>
          <a class="buttonBlock__cancel" href=""  v-on:click.prevent="closeModal" style="font-size: 16px">Cancel</a>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
    export default {
      name: "Modal",
      props:['showModal'],
      data () {
        return{
          otherMessageNew:"",
          checkBoxValueNew: ""
        }
      },
        methods:{
          onClick(event){
            var modal = document.getElementById("myModal");
            if(event.target==modal) {
              this.closeModal()
            }
          },
          closeModal(){
            this.checkBoxValueNew = "";
            this.otherMessageNew = "";
            this.$emit('closeModal')
          },
          deleteBtn(){
            this.$emit('deleteBtn');
            this.checkBoxValueNew = "";
            this.otherMessageNew = "";
          }
        },
      mounted() {
        document.addEventListener('click', this.onClick);
      },
      beforeDestroy() {
        document.removeEventListener('click', this.onClick);
      },
    }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  /* Modal Content */

  .modal {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      flex: 0 0 100%;
      color: #231f20;
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 35px;
      @media screen and (max-width: 500px) {
        margin-bottom: 25px;
      }
    }
  }
  .modal-content {
    max-width: 880px;
    margin: 50px 30px;
    position: relative;
    padding: 80px;
    background-image: url("./../assets/Combined_Shape_new.png");
    background-repeat: no-repeat;
    box-shadow: 0 5px 25px rgba(34, 60, 47, 0.15);
    border-radius: 6px;
    background-color: #ffffff;

    @media (max-width: 880px) {
      height: 100%;
    }

    @media (max-width: 600px) {
      padding: 60px 40px;
      margin-left: 15px;
      margin-right: 15px;
      height: 100%;
    }
  }
  .modal-content > div {
    display: flex;
    flex-wrap: wrap;
  }

  .flex-fill {
    flex: 0 0 100%;
    width: 100%;
  }

  textarea {
    max-width: 100%;
    min-width: 100%;
    min-height: 98px;
    max-height: 98px;
    border-radius: 6px;
    border: 2px solid #e9e8e8;
    background-color: #ffffff;
  }

  .item{
    flex: 0 0 50%;
    margin-bottom: 35px;

    @media screen and (max-width: 767px){
      width: 100%;
    }
    @media screen and (max-width: 600px){
      margin-bottom: 15px;
      flex: 0 0 100%;

      &:last-child {
        margin-bottom: 40px;
      }
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

  input[type=radio] {
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

  input[type=radio]:checked + label:before {
    background: url('./../assets/Combined_Shape_green.png') left center no-repeat;
  }
  input[type=radio]:checked + label:after {
    background: url('./../assets/check.png') left center no-repeat;
  }

  /*Buttons*/
  .buttonBlock{
    flex: 0 0 100%;
    margin-top: 30px;
    text-align: center;

    button{
      height: 90px;
      padding: 0 41px;
      border-radius: 10rem;
      color: white;
      border: none;
      outline: none;
      font-size: 30px;
      font-weight: 700;
      background-color: #FC000E;
      font-family: 'Montserrat', sans-serif;
      cursor: pointer;
      transition: all 0.5s ease-in-out;

      &:hover{
        background-color: #ad2c2c;
      }
    }

    &__cancel {
      display: inline-block;
      text-decoration: none;
      color: grey;
      margin-top: 1.3rem;
    }
  }

  .circle {
    color: #aaaaaa;
    font-size: 18px;
    font-weight: bold;
    border: 2px solid #aaaaaa;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    transition: all .7s ease-in-out;
    display: inline-flex;
    position: absolute;
    right: 20px;
    top: 20px;
    align-items: center;
    justify-content: center;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  button,
  label {
    cursor: pointer;
  }

  .item label{
    color: #231f20;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 400;
  }
</style>
