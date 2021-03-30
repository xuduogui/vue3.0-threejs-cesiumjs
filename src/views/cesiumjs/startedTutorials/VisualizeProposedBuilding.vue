<!--
 * @Author: xuziyong
 * @Date: 2021-03-31 01:38:34
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-03-31 01:47:35
 * @Description: TODO
-->

<template>
  <div ref="domRef"></div>
</template>

<script lang='ts'>
import { Options, setup, Vue } from "vue-class-component";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { nextTick, onMounted, Ref, ref, toRef } from "vue";

/**
 * @domRef Ref<HTMLElement | null>
 */
const domSetUp = (domRef: Ref<HTMLElement | null>) => {
  const renderView = () => {
    const dom: Element = domRef.value as HTMLElement;
    // Your access token can be found at: https://cesium.com/ion/tokens.
    // 填写cesium 的token，可以不填
    // Cesium.Ion.defaultAccessToken = 'your_access_token';
    // Initialize the viewer with Cesium World Terrain.
    // 创建视图
    const viewer = new Cesium.Viewer(dom, {
      terrainProvider: Cesium.createWorldTerrain(),
    });
    // Add Cesium OSM Buildings.
    // 创建建筑群
    const buildingsTileset = viewer.scene.primitives.add(
      Cesium.createOsmBuildings()
    );
    // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
    // 调整相机
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000),
    });
  };

  onMounted(() => {
    renderView();
  });

  return {};
};
@Options({
  components: {},
})
export default class VisualizeProposedBuilding extends Vue {
  domRef: Ref<HTMLElement | null> = ref(null);

  domSetUp = setup(() => domSetUp(toRef(this, "domRef")));
}
</script>