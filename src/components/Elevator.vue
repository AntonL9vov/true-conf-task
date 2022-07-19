<template>
  <div class="elevator-shaft">
    <div class="elevator" moving="false" id="1">
        <div class="table">
          <div class="up arrow"><img width="20" height="20" src="@/assets/down-arrow.svg" alt=""></div>
          <div class="down arrow" :style="'display: ' +  display()"><img width="20" height="20" src="@/assets/down-arrow.svg" alt=""></div>
          <div class="floor">{{floor}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props:{
    floor: Number
  },
  name: "ElevatorItem",
  methods: {
    up(){
      $(".elevator").css({
        bottom: "150px"
      })
    },
    display() {
      console.log($('.up').css('display'));
      return $('.up').css('display');
    }
  }
}
</script>

<style scoped>
.table{
  display: none;
  align-items: center;
  margin-top: 10px;
  width: 150px;
  justify-content: center;
}
.elevator{
  transition-timing-function: linear;
  position: absolute;
  height: 200px;
  width: 150px;
  border: 4px solid black;
  bottom: 0;
}
.elevator-shaft{
  position: relative;
  height: 1000px;
  width: 160px;
  border: 2px solid black;
}
.arrow{
  display: flex;
  align-items: center;
  justify-content: center;
}
.up{
  transform: rotate(180deg);
}
.down{
  display: none;
}
</style>