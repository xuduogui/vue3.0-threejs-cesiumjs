<!--
 * @Author: xuziyong
 * @Date: 2021-03-31 01:38:34
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-05 01:05:59
 * @Description: TODO
-->

<template>
  <div ref="domRef">
    可视化拟建建筑物
    <button @click="EventBus.buildShowControl">Toggle new building</button>
  </div>
</template>

<style scoped>
#toggle-building {
  z-index: 1;
  position: fixed;
  top: 5px;
  left: 5px;
}
</style>

<script lang="ts">
// TODO  warning  in ./node_modules/cesium/Source/Core/buildModuleUrl.js
// Critical dependency: require function is used in a way in which dependencies cannot be statically extracted

import { Options, setup, Vue } from "vue-class-component";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { onMounted, Ref, ref, ShallowUnwrapRef, toRef } from "vue";

interface DeclareEventBus {
  buildShowControl: {
    (): void;
  };
}

interface DeclareDomSetUpReturn {
  EventBus: DeclareEventBus;
}

/**
 *
 * @param {Ref<HTMLElement | null>} domRef 传入的渲染dom实例
 */
const domSetUp = (domRef: Ref<HTMLElement | null>): DeclareDomSetUpReturn => {
  const EventBus: DeclareEventBus = {
    buildShowControl: () => {
      console.log("no event detail");
    },
  };

  const renderView = (): void => {
    const dom: Element = domRef.value as HTMLElement;

    const your_asset_id = 407243;
    // Your access token can be found at: https://cesium.com/ion/tokens.
    // 填写cesium 的token，可以不填
    Cesium.Ion.defaultAccessToken = window.CESIUM_XDG_ID;
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

    async function addBuildingGeoJSON() {
      // Load the GeoJSON file from Cesium ion.
      // const myId = window.CESIUM_XDG_ID as string;

      const geoJSONURL = await Cesium.IonResource.fromAssetId(your_asset_id);
      // const geoJSONURL =
      //   "https://geo.datav.aliyun.com/areas_v2/bound/130000_full.json";
      // Create the geometry from the GeoJSON, and clamp it to the ground.
      //   加载geojson
      const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, {
        clampToGround: true,
      });
      // Add it to the scene.
      //   添加数据到场景
      const dataSource = await viewer.dataSources.add(geoJSON);
      // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
      // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
      for (const entity of dataSource.entities.values) {
        const polygon = entity.polygon as Cesium.PolygonGraphics;
        polygon.classificationType = (Cesium.ClassificationType
          .TERRAIN as unknown) as Cesium.Property;
      }
      // Move the camera so that the polygon is in view.
      viewer.flyTo(dataSource);
    }

    addBuildingGeoJSON();

    // STEP 4 CODE
    // Hide individual buildings in this area using 3D Tiles Styling language.
    buildingsTileset.style = new Cesium.Cesium3DTileStyle({
      // Create a style rule to control each building's "show" property.
      show: {
        conditions: [
          // Any building that has this elementId will have `show = false`.
          ["${elementId} === 332469316", false],
          ["${elementId} === 332469317", false],
          ["${elementId} === 235368665", false],
          ["${elementId} === 530288180", false],
          ["${elementId} === 530288179", false],
          ["${elementId} === 308148922", false],
          ["${elementId} === 458001155", false],
          // If a building does not have one of these elementIds, set `show = true`.
          [true, true],
        ],
      },
      // Set the default color style for this particular 3D Tileset.
      // For any building that has a `cesium#color` property, use that color, otherwise make it white.
      color:
        "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')",
    });

    // STEP 6 CODE
    // Add the 3D Tileset you created from your Cesium ion account.
    const newBuildingTileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(your_asset_id),
      })
    );
    // Move the camera to the new building.
    viewer.flyTo(newBuildingTileset);

    EventBus.buildShowControl = () => {
      newBuildingTileset.show = !newBuildingTileset.show;
    };
  };

  onMounted(() => {
    renderView();
  });

  return {
    EventBus,
  };
};
@Options({
  components: {},
})
export default class VisualizeProposedBuilding extends Vue {
  domRef: Ref<HTMLElement | null> = ref(null);

  /**
   * setup
   */
  domSetUp: ShallowUnwrapRef<DeclareDomSetUpReturn> = setup(() =>
    domSetUp(toRef(this, "domRef"))
  );

  get EventBus(): DeclareEventBus {
    return this.domSetUp.EventBus;
  }
}
</script>
