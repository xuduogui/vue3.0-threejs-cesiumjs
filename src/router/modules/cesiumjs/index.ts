import { RouteRecordRaw } from "vue-router";

/*
 * @Author: xuziyong
 * @Date: 2021-03-28 14:25:06
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-08 02:38:45
 * @Description: TODO
 */
export const cesium: Array<RouteRecordRaw> = [
  {
    path: "/cesiumjsQuickRun",
    name: "cesiumjsQuickRun",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CreateScene" */
        "../../../views/cesiumjs/quickStart/quickRun.vue"
      ),
  },
  {
    path: "/VisualizeProposedBuilding",
    name: "VisualizeProposedBuilding",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CreateScene" */
        "../../../views/cesiumjs/startedTutorials/VisualizeProposedBuilding.vue"
      ),
  },
  {
    path: "/FlightTracker",
    name: "FlightTracker",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CreateScene" */
        "../../../views/cesiumjs/startedTutorials/FlightTracker.vue"
      ),
  },
  {
    path: "/OurFirstEntity",
    name: "OurFirstEntity",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CreateScene" */
        "../../../views/cesiumjs/creatEntities/OurFirstEntity.vue"
      ),
  },
  {
    path: "/ThreeModel",
    name: "ThreeModel",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CreateScene" */
        "../../../views/cesiumjs/creatEntities/ThreeModel.vue"
      ),
  },
  {
    path: "/LookAtPointAndAround",
    name: "LookAtPointAndAround",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CreateScene" */
        "../../../views/cesiumjs/camera/LookAtPointAndAround.vue"
      ),
  },
];
