<template>
  <div class="app">
    <ElevatorItem
    :floor="1"></ElevatorItem>
    <div class="buttons">
      <button id="b-5" v-on:click="arrayPush(5), elevator()">5</button>
      <button id="b-4" v-on:click="arrayPush(4), elevator()">4</button>
      <button id="b-3" v-on:click="arrayPush(3), elevator()">3</button>
      <button id="b-2" v-on:click="arrayPush(2), elevator()">2</button>
      <button id="b-1" v-on:click="arrayPush(1), elevator()">1</button>
    </div>

  </div>
</template>

<script>

import ElevatorItem from "@/components/Elevator";
import $ from "jquery";

export default {
  data() {
    return {
      array: []
    }
  },
  name: 'App',
  components: {
    ElevatorItem
  },
  watch: {
    array() {
      console.log('changed')
    }
  },
  methods: {
    arrayPush(floor) {
      if (this.array.indexOf(floor) === -1 && Number($(".elevator").attr('id')) !== floor) {
        $('#b-' + floor).addClass('active')
        this.array.push(floor);
      }
    },
    elevator() {
      if ($(".elevator").attr('moving') === false || $(".elevator").attr('moving') === 'false') {
        if (this.array[0]) {
          this.up(this.array.shift()).then(() => {
                if (this.array[0]) {
                  this.elevator();
                }
              }
          );
        }
      }
    },
    up(floor) {
      let height = ((floor - 1) * 200);
      const $elevator = $(".elevator");
      const $table = $elevator.children('.table');
      $table.css({
        display: 'flex'
      });
      $elevator.attr('moving', true)
      $elevator.attr('id', floor)
      let heightNow = $elevator.css('bottom');
      heightNow = Number(heightNow.substring(0, heightNow.length - 2));
      let heightDifference;
      if (height - heightNow > 0) {
        $table.children('.up').css({
          display: 'block'
        });
        $table.children('.down').css({
          display: 'none'
        });
        heightDifference = height - heightNow;
      } else {
        $table.children('.up').css({
          display: 'none'
        });
        $table.children('.down').css({
          display: 'block'
        });
        heightDifference = heightNow - height;
      }
      $table.children('.floor').html(floor);
      let promise = new Promise((resolve) => {
        $elevator.css({
          transitionDuration: (heightDifference / 200) * 1000 + 'ms'
        })
        $elevator.css({
          bottom: height + 'px'
        })
        setTimeout(() => {

          resolve()
        }, (heightDifference / 200) * 1000)
      })
      promise.then(() => {
        $elevator.css({
          transitionDuration: 0 + 'ms'
        })
        $elevator
            .fadeOut(300)
            .fadeIn(300)
            .fadeOut(300)
            .fadeIn(300)
            .fadeOut(300)
            .fadeIn(300);
      })
      return new Promise((resolve) => {
        setTimeout(() => {
          $(".elevator").attr('moving', false);
          $('#b-' + floor).removeClass('active')
          $table.css({
            display: 'none'
          });
          resolve();
        }, (heightDifference / 200) * 1000 + 1800)
      })
    }
  },
  setup() {

  }
}
</script>

<style>
.buttons {
  display: flex;
  flex-direction: column;
}

button{
  background: white;
  margin-left: 15px;
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 20px;
  font-family: "Roboto Thin";
  font-weight: 600;
}

.active{
  background: coral;
  color: white;
}

button:not(:last-child) {
  margin-bottom: 160px;
}

.app {
  display: flex;
}

.elevator-shaft {
  height: 1000px;
  width: 160px;
  border: 2px solid black;
}
</style>
