<!--
 * @Author: xuziyong
 * @Date: 2021-03-30 23:17:18
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-08 02:47:19
 * @Description: 
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

    // var viewer = new Cesium.Viewer(dom);
    // var entity = viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    //   model: {
    //     uri: "/glTF/Cesium_Air.glb",
    //   },
    // });
    // viewer.trackedEntity = entity;

    var viewer = new Cesium.Viewer(dom);
    var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706);
    var heading = Cesium.Math.toRadians(45.0);
    var pitch = Cesium.Math.toRadians(15.0);
    var roll = Cesium.Math.toRadians(0.0);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      new Cesium.HeadingPitchRoll(heading, pitch, roll)
    );

    var entity = viewer.entities.add({
      position: position,
      orientation: (orientation as unknown) as Cesium.Property,
      model: {
        uri: "/glTF/Cesium_Air.glb",
      },
    });
    viewer.trackedEntity = entity;

    // The property system
    var wyoming = new Cesium.Entity();
    wyoming.name = "Wyoming";

    var polygon = new Cesium.PolygonGraphics();
    polygon.material = new Cesium.ColorMaterialProperty(
      Cesium.Color.RED.withAlpha(0.5)
    );
    polygon.outline = new Cesium.ConstantProperty(true);
    polygon.outlineColor = new Cesium.ConstantProperty(Cesium.Color.BLACK);
    polygon.hierarchy = (Cesium.Cartesian3.fromDegreesArray([
      -109.080842,
      45.002073,
      -105.91517,
      45.002073,
      -104.058488,
      44.996596,
      -104.053011,
      43.002989,
      -104.053011,
      41.003906,
      -105.728954,
      40.998429,
      -107.919731,
      41.003906,
      -109.04798,
      40.998429,
      -111.047063,
      40.998429,
      -111.047063,
      42.000709,
      -111.047063,
      44.476286,
      -111.05254,
      45.002073,
    ]) as unknown) as Cesium.Property;
    wyoming.polygon = polygon;

    viewer.entities.add(wyoming);
  };

  onMounted(() => {
    renderView();
  });

  return {};
};
@Options({
  components: {},
})
export default class ThreeModel extends Vue {
  domRef: Ref<HTMLElement | null> = ref(null);

  domSetUp = setup(() => domSetUp(toRef(this, "domRef")));
}
</script>
