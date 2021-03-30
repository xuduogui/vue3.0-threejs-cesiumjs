<!--
 * @Author: xuziyong
 * @Date: 2021-03-28 13:57:38
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-03-29 00:02:58
 * @Description: TODO
-->
<template>
  <div ref="threeDom"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as THREE from "three";
@Options({
  components: {},
})
export default class CreateScene extends Vue {
  public $refs!: {
    threeDom: HTMLElement;
  };

  mounted(): void {
    this.$nextTick(() => {
      this.init();
    });
  }

  init(): void {
    const dom = this.$refs.threeDom;
    // 建立场景
    const scene = new THREE.Scene();
    // 创建相机，PerspectiveCamera（透视摄像机）
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    // 渲染器的尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer（渲染器）的dom元素添加到组件中
    dom.appendChild(renderer.domElement);
    // 立方体
    const geometry = new THREE.BoxGeometry();
    // MeshBasicMaterial材质
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 创建网格（网格包含一个几何体以及作用在此几何体上的材质）
    const cube = new THREE.Mesh(geometry, material);
    // 调用scene.add()的时候，物体将会被添加到(0,0,0)坐标
    scene.add(cube);
    // 将摄像机稍微向外移动一些
    camera.position.z = 5;

    const animate = (): void => {
      // 下一次重绘之前调用
      requestAnimationFrame(animate);
      // 改变网格属性，下次重新渲染执行
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      // 渲染
      renderer.render(scene, camera);
    };
    // 首次执行
    animate();
  }
}
</script>
