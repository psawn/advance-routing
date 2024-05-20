import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

export function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}
