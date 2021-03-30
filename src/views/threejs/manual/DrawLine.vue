<!--
 * @Author: xuziyong
 * @Date: 2021-03-29 00:04:36
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-03-30 23:09:32
 * @Description: TODO
-->
<template>
  <div ref="threeDom"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as THREE from "three";
/**
 * 画线（Drawing lines）
 */
@Options({
  components: {},
})
export default class DrwaLine extends Vue {
  $refs!: {
    threeDom: HTMLElement;
  };

  mounted(): void {
    this.$nextTick(() => {
      this.init();
    });
  }

  init(): void {
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染器尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 挂载渲染器
    this.$refs.threeDom.appendChild(renderer.domElement);
    // 创建相机（PerspactiveCamera 透视相机）
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    // 设置相机位置
    camera.position.set(0, 0, 100);
    // 相机目标点
    camera.lookAt(0, 0, 0);
    // 创建场景
    const scene = new THREE.Scene();
    // 创建材质
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    // geometry几何体
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    renderer.render(scene, camera);
  }
}
</script>
