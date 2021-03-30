<!--
 * @Author: xuziyong
 * @Date: 2021-03-27 02:14:25
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-03-28 13:19:09
 * @Description: TODO
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
