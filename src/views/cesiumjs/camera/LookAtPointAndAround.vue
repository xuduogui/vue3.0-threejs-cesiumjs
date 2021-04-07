<!--
 * @Author: xuziyong
 * @Date: 2021-03-30 23:17:18
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-08 02:43:43
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

    Cesium.Ion.defaultAccessToken = window.CESIUM_XDG_ID;

    var viewer = new Cesium.Viewer(dom, {
      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url:
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
      }),
      baseLayerPicker: false,
      //   添加可视化地形（3d地形）
      terrainProvider: Cesium.createWorldTerrain({
        //   添加地形的照明效果
        requestVertexNormals: true,
        // 添加水域效果
        requestWaterMask: true,
      }),
    });

    // 设置关注点
    var center = Cesium.Cartesian3.fromRadians(
      2.4213211833389243,
      0.6171926869414084,
      3626.0426275055174
    );
    var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
    viewer.scene.camera.lookAtTransform(
      transform,
      new Cesium.HeadingPitchRange(0, -Math.PI / 4, 2900)
    );

    // 绕点旋转
    viewer.clock.onTick.addEventListener(function (clock) {
      viewer.scene.camera.rotateRight(0.005);
    });

    // 禁止相机进入地下
    viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
  };

  onMounted(() => {
    renderView();
  });

  return {};
};
@Options({
  components: {},
})
export default class LookAtPointAndAround extends Vue {
  domRef: Ref<HTMLElement | null> = ref(null);

  domSetUp = setup(() => domSetUp(toRef(this, "domRef")));
}
</script>
