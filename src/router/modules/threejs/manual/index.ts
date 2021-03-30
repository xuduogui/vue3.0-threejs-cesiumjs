import { RouteRecordRaw } from "vue-router";

/*
 * @Author: xuziyong
 * @Date: 2021-03-28 14:25:06
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-03-30 23:09:20
 * @Description: TODO
 */
export const manual: Array<RouteRecordRaw> = [
  {
    path: "/CreateScene",
    name: "CreateScene",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CreateScene" */
        "../../../../views/threejs/manual/CreateScene.vue"
      ),
  },
  {
    path: "/DrawLine",
    name: "DrawLine",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "DrawLine" */
        "../../../../views/threejs/manual/DrawLine.vue"
      ),
  },
  {
    path: "/CreatingText",
    name: "CreatingText",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CreatingText" */
        "../../../../views/threejs/manual/CreatingText.vue"
      ),
  },
];
