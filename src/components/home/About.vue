<template>
  <div>
    <div class="container-fluid my-5 d-sm-flex justify-content-center" style="max-width: 50%;">
      <div class="card px-2">
        <div class="card-header bg-white">
          <div class="row justify-content-between">
            <div class="col">
              <h4>За апликацијата</h4>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div>
            <img src="logo.png" width="100px"/><br/>
            Апликацијата „СтароНово“ претставува проект кој е дел од предметите
            <span class="highlight">Имплементација на системи со отворен код</span> и
            <span class="highlight">Напреден веб дизајн</span>,
            при Факултетот за Информатички Науки и Компјутерско Инженерство во Скопје.
          </div><br/>
          <div>
            Апликацијата се состои од два дела, backend дел и frontend дел.
          </div><br/>
          <div>
            <strong>Главни технологии кои се користени се:</strong>
            <ul style="width: 70%; margin: auto;">
              <li>Lumen - PHP Micro-Framework By Laravel за backend</li>
              <li>Vue.js - The Progressive JavaScript Framework за frontend</li>
            </ul>
          </div>
        </div>
        <div class="card-footer bg-white px-sm-3 px-0">
          <div class="row text-center" style="margin: 20px;">
            <div  style="width: 100%; text-align: center">
              <p style="float: left">Девелопер: Александар Бојков</p>
              <p style="float: right">Одговорен: Бобан Јоксимоски</p>
            </div>
            <div  style="width: 100%; text-align: center">
              <a class="btn btn-outline-primary" href="https://abojkov.com/" target="_blank"><i class="fa fa-globe"></i> https://abojkov.com/</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button style="display: none;" class="btn btn-sm btn-primary w-100" data-toggle="modal" data-target="#dialogInfoModal" ref="dialogTrigger"></button>
    <DialogInfo v-bind:message="'Во моментот не може да се процесира вашето барање!'"/>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped>
  .highlight{
    font-weight: bold;
    text-decoration: underline;
  }
  body {
    letter-spacing: 0.8px;
    background: linear-gradient(0deg, #ffff 50%, #74a0ff) no-repeat;
  }

  .container-fluid {
    margin-top: 80px !important;
    margin-bottom: 80px !important
  }

  p {
    font-size: 14px;
    margin-bottom: 7px
  }

  .cursor-pointer {
    cursor: pointer
  }

  a {
    text-decoration: none !important;
    color: #651FFF !important
  }

  .bold {
    font-weight: 600
  }

  .small {
    font-size: 12px !important;
    letter-spacing: 0.5px !important
  }

  .Today {
    color: rgb(83, 83, 83)
  }

  .btn-outline-primary {
    background-color: #fff !important;
    color: deepskyblue !important;
    border: 1.3px solid deepskyblue;
    font-size: 12px;
    border-radius: 0.4em !important
  }

  .btn-outline-primary:hover {
    background-color: deepskyblue !important;
    color: #fff !important;
    border: 1.3px solid deepskyblue;
  }

  .btn-outline-primary:focus,
  .btn-outline-primary:active {
    outline: none !important;
    box-shadow: none !important;
    border-color: deepskyblue !important
  }


  #progressbar #step1:before {
    content: "1";
    color: #fff;
    width: 29px;
    margin-left: 12px !important;
  }

  #progressbar #step2:before {
    content: "2";
    color: #fff;
    width: 29px
  }

  #progressbar #step3:before {
    content: "3";
    color: #fff;
    width: 29px;
    margin-right: 15px !important;
    padding-right: 11px !important
  }

  #progressbar li:before {
    line-height: 29px;
    display: block;
    font-size: 12px;
    background: #455A64;
    border-radius: 50%;
    margin: auto
  }

  #progressbar li:after {
    content: '';
    width: 121%;
    height: 2px;
    background: #455A64;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 15px;
    z-index: -1
  }

  #progressbar li:nth-child(2):after {
    left: 50%
  }

  #progressbar li:nth-child(1):after {
    left: 25%;
    width: 121%
  }

  #progressbar li:nth-child(3):after {
    left: 25% !important;
    width: 50% !important
  }

  #progressbar li.active:before,
  #progressbar li.active:after {
    background: #fa3e5b
  }

  .card {
    background-color: #fff;
    box-shadow: 5px 4px 15px 2px deepskyblue;
    z-index: 0
  }

  small {
    font-size: 12px !important
  }

  .a {
    justify-content: space-between !important
  }

  .border-line {
    border-right: 1px solid rgb(226, 206, 226)
  }

  .card-footer img {
    opacity: 0.3
  }

  .card-footer h5 {
    font-size: 1.1em;
    color: #8C9EFF;
    cursor: pointer
  }
</style>