import { DashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";
import Asset from "@/pages/Asset/Asset";
import Test from "@/pages/Test/Test";
import Dashboard from "@/pages/Dashboard/Dashboard";
import { Overview } from "@/pages/Overview/Overview";
import TestHoang from "@/pages/Test/TestHoang";
import TestNhat from "@/pages/Test/TestNhat";
import Deepsea from "@/pages/Deepsea/Deepsea";
import SharkAI from "@/pages/SharkAI/SharkAI";

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
    path: "/deepsea",
    component: Deepsea,
    layout: DashboardLayout,
  },
  {
    path: "/shark-ai",
    component: SharkAI,
    layout: DashboardLayout,
  },
  {
    path: "/test",
    component: Test,
    layout: DashboardLayout,
  },
  {
    path: "/test-hoang",
    component: TestHoang,
    layout: DashboardLayout,
  },
  {
    path: "/test-nhat",
    component: TestNhat,
    layout: DashboardLayout,
  },
];
