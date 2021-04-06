<!--
 * @Author: xuziyong
 * @Date: 2021-03-27 02:14:25
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-06 23:35:16
 * @Description: TODO
-->
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|

    <br />
    <p>Threejs</p>
    <router-link to="/CreateScene">CreateScene</router-link>|
    <router-link to="/DrawLine">DrawLine</router-link>|
    <router-link to="/CreatingText">CreatingText</router-link>|

    <br />
    <p>Cesiumjs</p>
    <router-link to="/cesiumjsQuickRun">cesiumjsQuickRun</router-link>|
    <router-link to="/FlightTracker">FlightTracker</router-link>|
    <router-link to="/VisualizeProposedBuilding"
      >VisualizeProposedBuilding</router-link
    >| <router-link to="/OurFirstEntity">OurFirstEntity</router-link>|
  </div>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  emits: ["onEmit-test"],
})
export default class App extends Vue {
  test(msg: string): void {
    console.log(msg);
  }
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
