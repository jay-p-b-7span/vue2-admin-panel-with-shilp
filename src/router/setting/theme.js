export default [
  {
    path: "theme",
    name: "theme",
    component: require("@/views/private/settings/theme/Index").default,
    redirect: { name: "color" },
    children: [
      {
        path: "color",
        name: "color",
        component: require("@/views/private/settings/theme/Colors").default,
        meta: {
          label: "Colors",
          breadcrumbs: ["dashboard", "settings", "theme", "color"],
        },
      },
    ],
  },
];
