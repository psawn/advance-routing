import { json, useLoaderData, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { TEvent } from "../components/EventItem";
import { Suspense } from "react";

export function EventsPage() {
  const data = useLoaderData() as { events: TEvent[] };

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={data.events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );

  // if ("isError" in data) {
  //   return <p>{data.message}</p>;
  // }

  // const events = data.events;

  // return (
  //   <>
  //     <EventsList events={events} />
  //   </>
  // );
}

// eslint-disable-next-line react-refresh/only-export-components
export function eventsLoader() {
  return defer({ events: loader() });
}

async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Error" };
    // throw new Response(JSON.stringify({ message: "Could not fetch event" }), { status: 500 });
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    // return response;
    const resData = await response.json();
    return resData.events;
  }
}
