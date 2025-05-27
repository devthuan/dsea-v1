import { DashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";
import Asset from "@/pages/Asset/Asset";
import Test from "@/pages/Test/Test";
import Dashboard from "@/pages/Dashboard/Dashboard";
import { Overview } from "@/pages/Overview/Overview";

export const publicRoutes = [
  {
    path: "/",
    component: Dashboard,
    layout: DashboardLayout,
  },
  {
    path: "/asset",
    component: Asset,
    layout: DashboardLayout,
  },
  {
    path: "/overview",
    component: Overview,
    layout: DashboardLayout,
  },
  {
    path: "/test-thang",
    component: Test,
    layout: DashboardLayout,
  },
  {
    path: "/test-nhat",
    component: Test,
    layout: DashboardLayout,
  },
  {
    path: "/tes3-hoang",
    component: Test,
    layout: DashboardLayout,
  },
];
