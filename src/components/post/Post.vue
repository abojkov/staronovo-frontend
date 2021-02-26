<template>
  <div class="blog-card">
    <div class="meta">
      <div class="photo">
        <img :src="post.image" style="width: 100%;"/>
      </div>
      <ul class="details">
        <li class="date">{{ post['datetime_posted'] }}</li>
        <li v-if="post['seller_username'] !== undefined"><i class="fa fa-user"></i> <span id="link" @click="openProfile">{{ post['seller_username'] }}</span></li>
      </ul>
    </div>
    <div class="description">
      <h1>{{ post.name }}</h1>
      <h2>{{ post.category.name }}<span v-if="post['quantity_left'] > 0">{{ ', на залиха ' + post['quantity_left'] }}</span></h2>
      <h2>{{ post.price }} МКД</h2>
      <p>{{ post.description }}</p>
      <div class="read-more">
        <div  v-if="isLoggedInUserAuthor">
          <div class="alert alert-danger mb-0 mt-2 mb-2" v-if="post['quantity_left'] == 0" style="text-align: center;">
            Нема доволно залиха од овој производ!
          </div>
          <div style="display: block">
            <a href="#" style="float: left; color: red;" @click="deletePost">Избриши</a>
            <a style="cursor: pointer; float: right; color: green;" @click="triggereditPost" ref="triggereditPost">Промени</a>
            <a style="display: none; cursor: pointer; float: right; color: green;" @click="editPost" ref="editPost">Зачувај</a>
          </div>
          <br/>
          <div style="float: right; display: none;" ref="editPostSection">
            <span>Цена (МКД): </span>
            <input v-model="post['price']" class="form-control form-control-sm" style="display: inline-block; width: 30%"/>
            <div class="error" id="error-price"></div>
            <span>Залиха: </span>
            <input v-model="post['quantity_left']" class="form-control form-control-sm" style="display: inline-block; width: 30%"/>
            <div class="error" id="error-quantity_left"></div>
          </div>

        </div>
        <div v-if="!isLoggedInUserAuthor" class="mt-3">
          <button style="float: left;" class="btn bubbly-button" :class="'bubbly-button'+post['id']" @click="toggleFave">
            <i style="color: deeppink" class="fa" v-bind:class="post['is_favourite'] ? 'fa-heart' : 'fa-heart-o'"></i>
          </button>
          <div v-if="post['quantity_left'] > 0">
            <input id="qty" type="number" min="1" v-model="quantity" :max="post['quantity_left']" class="form-control form-control-sm">
            <a href="#" @click="buy">Купи</a>
          </div>
          <div class="alert alert-danger mb-0 mt-2" v-if="post['quantity_left'] == 0" style="text-align: center;">
            Нема доволно залиха од овој производ!
          </div>
        </div>
      </div>
    </div>
    <button style="display: none;" data-toggle="modal" data-target="#dialogInfoModal" ref="dialogTrigger"></button>
    <DialogInfo v-bind:message="'Во моментот не може да се процесира вашето барање!'"/>
  </div>
</template>

<script>
import axios from "axios";
import DialogInfo from "@/components/popups/DialogInfo";

export default {
  name: "Post",
  props: ["post"],
  components: {DialogInfo},
  mounted() {
    var animateButton = function(e) {
      e.preventDefault;

      if(!e.target.classList.contains('bubbly-button')){
        e.target.parentNode.classList.remove('animate');

        e.target.parentNode.classList.add('animate');
        setTimeout(function(){
          e.target.parentNode.classList.remove('animate');
        },700);
      }
      else {
        e.target.classList.remove('animate');

        e.target.classList.add('animate');
        setTimeout(function(){
          e.target.classList.remove('animate');
        },700);
      }
    };

    var bubblyButtons = document.getElementsByClassName("bubbly-button"+this.post['id']);

    for (var i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[0].addEventListener('click', animateButton, false);
    }
  },
  data(){
    return{
      quantity: 1
    }
  },
  computed: {
    isLoggedInUserAuthor(){
      return this.post['seller_id'] === this.$store.state.user.id;
    }
  },
  methods: {
    triggereditPost(){
      (this.$refs.triggereditPost).style.display = 'none';
      (this.$refs.editPost).style.display = 'inline-block';
      (this.$refs.editPostSection).style.display = 'block';
    },
    editPost(){
      var body = {
        price: this.post.price,
        quantity_left: this.post['quantity_left']
      }

      axios.put('/api/posts/' + this.post.id, body)
          .then(() => {
            this.$el.querySelector('#error-price').innerHTML = "";
            this.$el.querySelector('#error-quantity_left').innerHTML = "";

            (this.$refs.triggereditPost).style.display = 'inline-block';
            (this.$refs.editPost).style.display = 'none';
            (this.$refs.editPostSection).style.display = 'none';
          })
          .catch(error => {
            if (error.response.status === 422) {
              var alLErrors = error.response.data;
              Object.keys(alLErrors).forEach(key => {
                this.$el.querySelector('#error-' + key).innerHTML = alLErrors[key];
                console.log(alLErrors[key])
              })
            }
          });
    },
    deletePost(){
      axios.delete('/api/posts/' + this.post.id)
          .then(() => this.$router.push('/profile/' + this.$store.state.user.username))
          .catch(() => {
            alert("Не можете да го избришете постот затоа што е зависен во досегашните купувања помеѓу корисниците." +
                " Ако сакате да го оневозможите постот, поставете го бројот на залихи на 0.");
          });
    },
    openProfile(){
      this.$router.push('/profile/' + this.post['seller_username']);
    },
    buy(){
      var bodyData ={
        post_id: this.post.id,
        quantity: this.quantity
      }

      axios.post('/api/purchases', bodyData).then(() => {
        this.$router.push({name: 'Purchases'});
      }).catch(() => {
        this.$refs.dialogTrigger.click();
      });
    },
    toggleFave(){
      var bodyData ={
        post_id: this.post.id
      }

      axios.post('/api/favourites/toggle', bodyData).then(() => {
        this.post['is_favourite'] = !this.post['is_favourite'];
      }).catch(() => {
        this.$refs.dialogTrigger.click();
      });
    }
  }
}
</script>

<style scoped lang="scss">
$fuschia: #ff0081;
$button-bg: $fuschia;
$button-text-color: #fff;
$baby-blue: #f8faff;

.bubbly-button {
  font-family: "Helvetica", "Arial", sans-serif;
  display: inline-block;
  font-size: 1em;
  -webkit-appearance: none;
  appearance: none;
  color: $button-text-color;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px;

  &:focus {
    outline: 0;
  }

  &:before,
  &:after {
    position: absolute;
    content: "";
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    z-index: -1000;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
  }

  &:before {
    display: none;
    top: -75%;
    background-image: radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, transparent 20%, $button-bg 20%, transparent 30%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, $button-bg 15%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%,
    15% 15%, 10% 10%, 18% 18%;
    //background-position: 0% 80%, -5% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 85% 30%;
  }

  &:after {
    display: none;
    bottom: -75%;
    background-image: radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, $button-bg 15%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%,
    20% 20%;
    //background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }

  &:active {
    transform: scale(0.7);
  }

  &.animate {
    &:before {
      display: block;
      animation: topBubbles ease-in-out 1s forwards;
    }
    &:after {
      display: block;
      animation: bottomBubbles ease-in-out 1s forwards;
    }
  }
}

@keyframes topBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
    40% 90%, 55% 90%, 70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
    50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
    50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

@keyframes bottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
    70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
    105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
    110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

  .error{
    text-align: right;
    color: red;
  }
  #link{

  }
  #link:hover{
    cursor: pointer;
    color: black;
    background: white;
  }
  #qty{
    width: 50px;
    display: inline-block;
    margin-right: 10px;
  }

  a{
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }

  body {
    background: #f1f1f1;
    margin: 2rem;
  }

  $color_white: #fff;
  $color_prime: #5ad67d;
  $color_grey: #e2e2e2;
  $color_grey_dark: #a2a2a2;

  .blog-card {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    box-shadow: 0 3px 7px -1px rgba(#000, .1);
    margin-bottom: 1.6%;
    background: $color_white;
    line-height: 1.4;
    font-family: sans-serif;
    border-radius: 5px;
    overflow: hidden;
    z-index: 0;
    a {
      color: inherit;
      &:hover {
        color: $color_prime;
      }
    }
    &:hover {
      .photo {
        transform: scale(1.3) rotate(3deg);
      }
    }
    .meta {
      position: relative;
      z-index: 0;
      height: 200px;
    }
    .photo {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-size: cover;
      background-position: center;
      transition: transform .2s;
    }
    .details,
    .details ul {
      margin: auto;
      padding: 0;
      list-style: none;
    }

    .details {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -100%;
      margin: auto;
      transition: left .2s;
      background: rgba(#000, .6);
      color: $color_white;
      padding: 10px;
      width: 100%;
      font-size: .9rem;
      a {
        text-decoration: dotted underline
      }
      ul li {
        display: inline-block;
      }
      .author:before {
        font-family: FontAwesome;
        margin-right: 10px;
        content: "\f007";
      }

      .date:before {
        font-family: FontAwesome;
        margin-right: 10px;
        content: "\f133";
      }

      .tags {
        ul:before {
          font-family: FontAwesome;
          content: "\f02b";
          margin-right: 10px;
        }
        li {
          margin-right: 2px;
          &:first-child {
            margin-left: -4px;
          }
        }
      }
    }
    .description {
      padding: 1rem;
      background: $color_white;
      position: relative;
      z-index: 1;
      h1,
      h2 {
        font-family: Poppins, sans-serif;
      }
      h1 {
        line-height: 1;
        margin: 0;
        font-size: 1.7rem;
      }
      h2 {
        font-size: 1rem;
        font-weight: 300;
        text-transform: uppercase;
        color: $color_grey_dark;
        margin-top: 5px;
      }
      .read-more {
        text-align: right;
        a {
          color: $color_prime;
          display: inline-block;
          position: relative;
          &:after {
            content: "\f061";
            font-family: FontAwesome;
            margin-left: -10px;
            opacity: 0;
            vertical-align: middle;
            transition: margin .3s, opacity .3s;
          }

          &:hover:after {
            margin-left: 5px;
            opacity: 1;
          }
        }
      }
    }
    p {
      position: relative;
      margin: 1rem 0 0;
      &:first-of-type {
        margin-top: 1.25rem;
        &:before {
          content: "";
          position: absolute;
          height: 5px;
          background: $color_prime;
          width: 35px;
          top: -0.75rem;
          border-radius: 3px;
        }
      }
    }
    &:hover {
      .details {
        left: 0%;
      }
    }


    @media (min-width: 640px) {
      flex-direction: row;
      max-width: 700px;
      .meta {
        flex-basis: 40%;
        height: auto;
      }
      .description {
        flex-basis: 60%;
        &:before {
          transform: skewX(-3deg);
          content: "";
          background: #fff;
          width: 30px;
          position: absolute;
          left: -10px;
          top: 0;
          bottom: 0;
          z-index: -1;
        }
      }
      &.alt {
        flex-direction: row-reverse;
        .description {
          &:before {
            left: inherit;
            right: -10px;
            transform: skew(3deg)
          }
        }
        .details {
          padding-left: 25px;
        }
      }
    }
  }
</style>