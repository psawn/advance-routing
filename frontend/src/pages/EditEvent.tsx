import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";
import { TEvent } from "../components/EventItem";

export function EditEventPage() {
  // const data = useRouteLoaderData("event-detail") as { event: TEvent };
  const data = useRouteLoaderData("event-detail") as { event: TEvent };

  return <EventForm event={data.event} method="PATCH" />;
}
