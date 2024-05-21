import {
  json,
  useRouteLoaderData,
  // useLoaderData,
  redirect,
  Params,
  defer,
  Await,
} from "react-router-dom";
import EventItem, { TEvent } from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export function EventDetailPage() {
  const data = useRouteLoaderData("event-detail") as {
    event: TEvent;
    events: TEvent[];
  };
  // const data = useLoaderData() as { event: TEvent };

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data.event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data.events}>
          {(loadEvent) => <EventsList events={loadEvent} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id: string) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json({ message: "Could not fetch event" }, { status: 500 });
  }

  const resData = await response.json();
  return resData.event;
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Error" };
    // throw new Response(JSON.stringify({ message: "Could not fetch event" }), { status: 500 });
    throw json({ message: "Could not fetch events" }, { status: 500 });
  }
  // return response;
  const resData = await response.json();
  return resData.events;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function eventDetailLoader({
  params,
}: {
  request: Request;
  params: Params;
}) {
  const id = params.eventId;

  return defer({
    event: loadEvent(id!),
    events: loadEvents(),
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export async function deleteEventAction({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  const id = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }

  return redirect("/events");
}
