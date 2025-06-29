import { useParams } from "react-router-dom";

import EventDetailsLayout from "@/layouts/eventDetails";

const EventDetails = () => {
  const { id } = useParams();

  return <EventDetailsLayout>EventDetails{id}</EventDetailsLayout>;
};

export default EventDetails;
