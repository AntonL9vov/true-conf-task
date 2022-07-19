<template>
  <div class="app">
  <ElevatorShaft
  :floors-amount="20"></ElevatorShaft>
  </div>
</template>

<script>
import ElevatorShaft from "@/components/ElevatorShaft";
export default {
  components: {
    ElevatorShaft
  },
  data() {
    return {
      array: []
    }
  },
  name: 'App',
}
</script>

<style>
.app {
  display: flex;
}
</style>
