import { useParams } from "react-router-dom";

export function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>EventDetailPage</h1>
      <p>{params.eventId}</p>
    </>
  );
}
