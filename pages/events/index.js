// import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { getEvents } from "../../helpers/api-util";

const AllEventsPage = (props) => {
  // fetch all events... but in serverside and receive it as props.
  // step 2: get props.data
  console.log("events: ", props.events);

  //step3: load all evetns
  const { events } = props;
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const events = await getEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

// step 1: write serverside prop for serverside pre-generation
// export async function getServerSideProps() {
//   const data = await fetch(
//     "https://nextjs-ce475-default-rtdb.firebaseio.com/events.json"
//   ).then((res) => res.json());
//   const data_array = [];
//   for (const key in data) {
//     data_array.push({
//       id: key,
//       title: data[key].title,
//       description: data[key].description,
//       location: data[key].location,
//       date: data[key].date,
//       image: data[key].image,
//       isFeatured: data[key].isFeatured,
//     });
//   }
//   return {
//     props: {
//       events: data_array,
//     },
//   };
// }

export default AllEventsPage;
