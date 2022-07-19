<template>
  <div class="elevator-wrapper" :style="{height: shaftHeight}" :id="'el-' + elevatorNumber">
    <div class="elevator" moving="false" :id="floor">
      <div class="table">
        <div class="up arrow"><img width="20" height="20" src="@/assets/down-arrow.svg" alt=""></div>
        <div class="down arrow"><img width="20" height="20" src="@/assets/down-arrow.svg" alt=""></div>
        <div class="floor">{{ floor }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    floor: Number,
    initialFloor: Number,
    shaftHeight: String,
    elevatorNumber: Number
  },
  name: "ElevatorItem",
  methods: {
    up() {
      $(".elevator").css({
        bottom: "150px"
      })
    },
    display() {
      return $('.up').css('display');
    }
  },
  mounted() {
    let height = (this.initialFloor-1) * 200 + 'px';
    $('.elevator').css({
        bottom: height
    })
  }
}
</script>

<style scoped>
.table {
  display: none;
  align-items: center;
  margin-top: 10px;
  width: 150px;
  justify-content: center;
}

.elevator {
  transition-timing-function: linear;
  position: absolute;
  height: 200px;
  width: 150px;
  border: 4px solid black;
  bottom: 0;
}

.elevator-wrapper {
  position: relative;
  width: 160px;
  border: 2px solid black;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.up {
  transform: rotate(180deg);
}

.down {

}
</style>