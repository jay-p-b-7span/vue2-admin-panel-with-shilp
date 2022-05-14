import theme from "./theme";

export default [
  {
    path: "settings",
    name: "settings",
    component: require("@/views/private/settings/Index").default,
    meta: {
      label: "Settings",
      breadcrumbs: ["dashboard", "settings"],
    },
    children: [...theme],
  },
];
