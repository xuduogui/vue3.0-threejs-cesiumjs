<!--
 * @Author: xuziyong
 * @Date: 2021-03-27 02:14:25
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-03-28 23:53:17
 * @Description: TODO
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      {{ demo }}
    </p>

    <button @click="emitTest">测试</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

const EMIT_EV_EMIT_TEST = "emitTest";

@Options({
  name: "About",
  emits: [EMIT_EV_EMIT_TEST],
})
export default class About extends Vue {
  demo = 1233333;

  emitTest(): void {
    this.$emit(EMIT_EV_EMIT_TEST, this.demo);
  }
}
</script>
