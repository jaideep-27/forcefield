import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { ActivatePassPage } from "./components/ActivatePassPage";
import { GamePage } from "./components/GamePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/activate",
    Component: ActivatePassPage,
  },
  {
    path: "/game",
    Component: GamePage,
  },
]);