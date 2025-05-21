import { DashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";
import Asset from "@/pages/Asset/Asset";
import Test from "@/pages/Candle/Test";
import Dashboard from "@/pages/Dashboard/Dashboard";

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
    path: "/test",
    component: Test,
    layout: DashboardLayout,
  },
];
