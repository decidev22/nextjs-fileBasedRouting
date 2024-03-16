import { useRouter } from "next/router";
// import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";
import Head from "next/head";

const FilteredEventPage = () => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(filterData);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    "https://nextjs-ce475-default-rtdb.firebaseio.com/events.json",
    fetcher
  );
  console.log(data);

  useEffect(() => {
    if (data) {
      const events_array = [];
      for (const key in data) {
        events_array.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events_array);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Your desired Events</title>
      <meta name="description" content="A list of filtered events" />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </Fragment>
    );
  }
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Your desired Events</title>
      <meta
        name="description"
        content={`All events in ${numYear} / ${numMonth}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid Filter</p>
        </ErrorAlert>

        <Button link="/events">Show All Events</Button>
      </Fragment>
    );
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  const date = new Date(numYear, numMonth - 1);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter.</p>
        </ErrorAlert>

        <Button link="/events">Show All Events</Button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventPage;
