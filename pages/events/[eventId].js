import { useRouter } from "next/router";
import Head from "next/head";
// import { getEventById } from "../../dummy-data";
import {
  getEventById,
  getEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";

// <></>
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = (props) => {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content="Do some networking." />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId; //from the url
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({
    params: { eventId: event.id },
  }));
  //which parameter value should we pre-render
  return {
    paths: paths, //[{ params: { eventId: "e1" } }]
    fallback: true, // we don't need to set fallback if it's generating for all possible pages.
  };
}

export default EventDetailPage;
