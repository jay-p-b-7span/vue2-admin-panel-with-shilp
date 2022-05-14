export default [
  {
    path: "dashboard",
    name: "dashboard",
    component: require("@/views/private/dashboard/Index").default,
    meta: {
      label: "Dashboard",
      breadcrumbs: ["dashboard"],
      icon: "IconIcRoundDashboard",
    },
  },
];
