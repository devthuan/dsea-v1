import { DashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";
import Asset from "@/pages/Asset/Asset";
import Candle from "@/pages/Candle/Candle";
import  Dashboard  from "@/pages/Dashboard/Dashboard";

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
    path: "/candle",
    component: Candle,
    layout: DashboardLayout,
  },
];