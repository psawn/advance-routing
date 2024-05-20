import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

export function EventsPage() {
  const data: any = useLoaderData();
  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function eventLoader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //
  } else {
    return response;
  }
}
