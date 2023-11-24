import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
const EventDetailPage = () => {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No event was found!</p>;
  }

  return (
    <div>
      <h1>Event Details</h1>
    </div>
  );
};

export default EventDetailPage;
