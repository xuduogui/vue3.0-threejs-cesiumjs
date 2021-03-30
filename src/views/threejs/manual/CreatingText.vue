<!--
 * @Author: xuziyong
 * @Date: 2021-03-29 00:04:36
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-03-30 23:10:02
 * @Description: TODO
-->
<template>
  <div ref="threeDom" class="text">Description</div>
</template>

<style lang="sass" scoped>
.text
  position: absolute
  top: 10px
  width: 100%
  text-align: center
  z-index: 100
  display: block
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import * as THREE from "three";
/**
 * 文字（CreatingText）
 */
@Options({
  components: {},
})
export default class CreatingText extends Vue {
  $refs!: {
    threeDom: HTMLElement;
  };
}
</script>
