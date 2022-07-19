<template>
  <div class="wrapper">
    <ElevatorItem
        :floor="1"
        :initial-floor="this.$store.state.initialFloor"
        :shaft-height="shaftHeight"
    ></ElevatorItem>
    <div class="buttons">
      <div class="button" v-for="floor in floorsArray" :key="floor">
        <button :id="'b-' + floor" v-on:click="arrayPush(floor), elevator()" >{{floor}}</button>
      </div>
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
  name: 'ElevatorShaft',
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
      if (this.$store.state.array.indexOf(floor) === -1 && Number($(".elevator").attr('id')) !== floor) {
        $('#b-' + floor).addClass('active');
        this.$store.commit('pushActiveButton', floor)
        this.$store.commit('pushArray', floor);
      }
    },
    elevator() {
      if ($(".elevator").attr('moving') === false || $(".elevator").attr('moving') === 'false') {
        if (this.$store.state.array[0]) {
          const floor = this.$store.state.array[0];
          this.up(this.$store.state.array[0]).then(() => {
                this.$store.commit('shiftArray')
                this.$store.commit('deleteActiveButton')
                if (this.$store.state.array[0]) {
                  this.elevator();
                }else{
                  this.$store.commit('setFloor', floor);
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
      $elevator.attr('moving', true);
      $elevator.attr('id', floor);
      let heightNow = $elevator.css('bottom');
      heightNow = Number(heightNow.substring(0, heightNow.length - 2));
      this.$store.commit('setFloor', heightNow/200 + 1);
      let heightDifference;
      if (height > heightNow) {
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
  mounted() {
    this.elevator();
    for (let i = 0; i < this.$store.state.activeButtons.length; i++) {
      $('#b-' + this.$store.state.activeButtons[i]).addClass('active');
    }
  },
  props: {
    floorsAmount: Number
  },
  computed: {
    floorsArray: function () {
      let array = [];
      for (let i = this.floorsAmount; i > 0; i--) {
        array.push(i);
      }
      return array;
    },
    shaftHeight: function (){
      return this.floorsAmount * 200 + 'px'
    }
  }
}
</script>

<style>
.buttons {
  display: flex;
  flex-direction: column;
}
button {
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

.active {
  background: coral;
  color: white;
}

.button:not(:last-child) {
  margin-bottom: 160px;
}

.wrapper {
  display: flex;
}
</style>
