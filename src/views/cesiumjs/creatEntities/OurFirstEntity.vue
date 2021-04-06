<!--
 * @Author: xuziyong
 * @Date: 2021-04-02 01:09:07
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-07 02:17:35
 * @Description: TODO
-->
<template>
  <div>实例控制和事件、相机位移操作、地球光照、水、3d地形</div>
  <div ref="domRef"></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { onMounted, Ref, ref, toRef } from "vue";
import { PolygonHierarchy } from "cesium";

const utilsDemo = {
  /**
   * Returns the top-most entity at the provided window coordinates
   * or undefined if no entity is at that location.
   *
   * @param {Cartesian2} windowPosition The window coordinates.
   * @returns {Entity} The picked entity or undefined.
   */
  pickEntity(viewer: Cesium.Viewer, windowPosition: Cesium.Cartesian2) {
    var picked = viewer.scene.pick(windowPosition);
    if (picked) {
      var id = Cesium.defaultValue(picked.id, picked.primitive.id);
      if (id instanceof Cesium.Entity) {
        return id;
      }
    }
    return undefined;
  },

  /**
   * Returns the list of entities at the provided window coordinates.
   * The entities are sorted front to back by their visual order.
   *
   * @param {Cartesian2} windowPosition The window coordinates.
   * @returns {Entity[]} The picked entities or undefined.
   */
  drillPickEntities(viewer: Cesium.Viewer, windowPosition: Cesium.Cartesian2) {
    var i;
    var entity;
    var picked;
    var pickedPrimitives = viewer.scene.drillPick(windowPosition);
    var length = pickedPrimitives.length;
    var result = [];
    var hash: any = {};

    for (i = 0; i < length; i++) {
      picked = pickedPrimitives[i];
      entity = Cesium.defaultValue(picked.id, picked.primitive.id);
      if (entity instanceof Cesium.Entity && !Cesium.defined(hash[entity.id])) {
        result.push(entity);
        hash[entity.id] = true;
      }
    }
    return result;
  },
};

/**
 * 第一个实例
 * @param {Ref<HTMLElement | null>} domRef
 */
const domSetUp = (domRef: Ref<HTMLElement | null>) => {
  const renderView = () => {
    const dom: Element = domRef.value as HTMLElement;

    const imgUrl: Cesium.MaterialProperty = ("/img/logo.82b9c7a5.png" as unknown) as Cesium.MaterialProperty;

    const viewer = new Cesium.Viewer(dom, {
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
    // 开启照明（区分白天和黑夜）
    viewer.scene.globe.enableLighting = true;

    // 添加点击事件
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function (event) {
      var pickedPosition = viewer.scene.pickPosition(event.position);
      if (Cesium.defined(pickedPosition)) {
        //   打印坐标
        console.log("pickedPosition", pickedPosition);
        // 打印选中点最上层的实例
        console.log("pickEntity", utilsDemo.pickEntity(viewer, event.position));
        // 打印选中点涉及的所有实例
        console.log(
          "drillPickEntities",
          utilsDemo.drillPickEntities(viewer, event.position)
        );
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 添加地球图层
    var layers = viewer.scene.imageryLayers;
    // 夜晚的地球
    var blackMarble = layers.addImageryProvider(
      new Cesium.IonImageryProvider({ assetId: 3812 })
    );
    // 设置透明度，查看两个图层的关系
    blackMarble.alpha = 0.5;
    // 增加光亮
    blackMarble.brightness = 2.0; // > 1.0 increases brightness.  < 1.0 decreases.
    // 特定范围内绘制单个图像。(地球贴图)
    layers.addImageryProvider(
      new Cesium.SingleTileImageryProvider({
        url: (imgUrl as unknown) as string,
        rectangle: Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75),
      })
    );

    // 多边形
    const wyoming = viewer.entities.add({
      polygon: {
        hierarchy: (Cesium.Cartesian3.fromDegreesArray([
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
        ]) as unknown) as PolygonHierarchy,
        height: 100,
        // 材质
        // material: Cesium.Color.RED.withAlpha(0.5),
        material: imgUrl,
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });

    viewer.zoomTo(wyoming);

    // 调整高度
    (wyoming.polygon as Cesium.PolygonGraphics).height = (200000 as unknown) as Cesium.Property;
    // 挤压高度 尝试 0 ， 200000（米）  250000
    (wyoming.polygon as Cesium.PolygonGraphics).extrudedHeight = (0 as unknown) as Cesium.Property;

    // 设置名称和描述
    wyoming.name = "wyoming";
    wyoming.description = (('\
<img\
  width="50%"\
  style="float:left; margin: 0 1em 1em 0;"\
  src="' +
      imgUrl +
      '"/>\
<p>\
  Wyoming is a state in the mountain region of the Western \
  United States.\
</p>\
<p>\
  Wyoming is the 10th most extensive, but the least populous \
  and the second least densely populated of the 50 United \
  States. The western two thirds of the state is covered mostly \
  with the mountain ranges and rangelands in the foothills of \
  the eastern Rocky Mountains, while the eastern third of the \
  state is high elevation prairie known as the High Plains. \
  Cheyenne is the capital and the most populous city in Wyoming, \
  with a population estimate of 63,624 in 2017.\
</p>\
<p>\
  Source: \
  <a style="color: WHITE"\
    target="_blank"\
    href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>\
</p>') as unknown) as Cesium.Property;

    // 椭圆1 vue logo图
    var entity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
      ellipse: {
        semiMinorAxis: 250000.0,
        semiMajorAxis: 400000.0,
        material: Cesium.Color.BLUE.withAlpha(0.5),
      },
    });
    viewer.zoomTo(viewer.entities);

    var ellipse = entity.ellipse;
    // logo图材质
    (ellipse as Cesium.EllipseGraphics).material = imgUrl;

    // 椭圆2 黑白格
    var entity2 = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-103.0, 41.0),
      ellipse: {
        semiMinorAxis: 250000.0,
        semiMajorAxis: 400000.0,
        material: Cesium.Color.BLUE.withAlpha(0.5),
      },
    });
    viewer.zoomTo(viewer.entities);

    var ellipse2 = entity2.ellipse;

    // 黑白格材质
    (ellipse2 as Cesium.EllipseGraphics).material = new Cesium.CheckerboardMaterialProperty(
      {
        evenColor: Cesium.Color.WHITE,
        oddColor: Cesium.Color.BLACK,
        repeat: new Cesium.Cartesian2(4, 4),
      }
    );

    // 调整相机
    var heading = Cesium.Math.toRadians(90);
    var pitch = Cesium.Math.toRadians(-30);
    viewer.zoomTo(wyoming, new Cesium.HeadingPitchRange(heading, pitch));

    // 飞往目标并选中
    viewer.flyTo(wyoming).then(function (result) {
      if (result) {
        //   选中
        viewer.selectedEntity = wyoming;
        setTimeout(() => {
          // 相机移动到指定范围
          var west = -90.0;
          var south = 38.0;
          var east = -87.0;
          var north = 40.0;
          var rectangle = viewer.entities.add({
            rectangle: {
              coordinates: Cesium.Rectangle.fromDegrees(
                west,
                south,
                east,
                north
              ),
            },
          });
          viewer.flyTo(rectangle);
        }, 1000);

        setTimeout(() => {
          // 相机从东京晴空塔飞向西雅图太空针塔，缓动效果
          viewer.camera.flyTo({
            destination: new Cesium.Cartesian3(
              -3961951.575572026,
              3346492.0945766014,
              3702340.5336036095
            ),
            orientation: {
              direction: new Cesium.Cartesian3(
                0.8982074415844437,
                -0.4393530288745287,
                0.013867512433959908
              ),
              up: new Cesium.Cartesian3(
                0.12793638617798253,
                0.29147314437764565,
                0.9479850669701113
              ),
            },
            complete: function () {
              setTimeout(function () {
                viewer.camera.flyTo({
                  destination: new Cesium.Cartesian3(
                    -2304817.2435183465,
                    -3639113.128132953,
                    4688495.013644141
                  ),
                  orientation: {
                    direction: new Cesium.Cartesian3(
                      0.3760550186878076,
                      0.9007147395506565,
                      0.21747547189489164
                    ),
                    up: new Cesium.Cartesian3(
                      -0.20364591529594356,
                      -0.14862471084230877,
                      0.9676978022659334
                    ),
                  },
                  easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
                  duration: 5,
                });
                // 减低光亮
                blackMarble.brightness = 0.5;
              }, 3000);
            },
          });
        }, 4000);
      }
    });

    // 跟踪实体而不是追踪地球
    wyoming.position = (Cesium.Cartesian3.fromDegrees(
      -107.724,
      42.68
    ) as unknown) as Cesium.PositionProperty;
    // 持续追踪实体（设置为视图中心）
    // viewer.trackedEntity = wyoming;
  };

  onMounted(() => {
    renderView();
  });

  return {};
};
@Options({
  components: {},
})
export default class OurFirstEntity extends Vue {
  domRef: Ref<HTMLElement | null> = ref(null);

  domSetUp = setup(() => domSetUp(toRef(this, "domRef")));
}
</script>
