<!--
 * @Author: xuziyong
 * @Date: 2021-03-30 23:17:18
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-02 00:28:19
 * @Description: 
 * Configuring CESIUM_BASE_URL
 * CesiumJS requires a few static files to be hosted on your server, like web workers and SVG icons. Configure your module bundler to copy the following four directories and serve them as static files:
 * node_modules/cesium/Build/Cesium/Workers
 * node_modules/cesium/Build/Cesium/ThirdParty
 * node_modules/cesium/Build/Cesium/Assets
 * node_modules/cesium/Build/Cesium/Widgets
 * The window.CESIUM_BASE_URL global variable must be set before CesiumJS is imported. It must point to the URL where those four directories are served.
 * 
 * For example, if the image at Assets/Images/cesium_credit.png is served with a static/Cesium/ prefix under http://localhost:8080/static/Cesium/Assets/Images/cesium_credit.png, then you would set the base URL as follows:
 * 
 * Copy to clipboard.Data copied clipboard.
 * window.CESIUM_BASE_URL = '/static/Cesium/';
 * See the Cesium Webpack Example for a complete Webpack config.
-->

<template>
  <div ref="domRef"></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { onMounted, Ref, ref, toRef } from "vue";

/**
 * @param {Ref<HTMLElement | null>} domRef
 */
const domSetUp = (domRef: Ref<HTMLElement | null>) => {
  const renderView = () => {
    const dom: Element = domRef.value as HTMLElement;
    // Your access token can be found at: https://cesium.com/ion/tokens.
    // 填写cesium 的token，可以不填
    // Cesium.Ion.defaultAccessToken = 'your_access_token';
    // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
    // 注册viewer
    const viewer = new Cesium.Viewer(dom, {
      terrainProvider: Cesium.createWorldTerrain(),
    });
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    // 创建建筑群
    viewer.scene.primitives.add(Cesium.createOsmBuildings());
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    // 调整相机
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      },
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
export default class quickRun extends Vue {
  domRef: Ref<HTMLElement | null> = ref(null);

  domSetUp = setup(() => domSetUp(toRef(this, "domRef")));
}
</script>
