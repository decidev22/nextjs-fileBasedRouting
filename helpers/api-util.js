export async function getEvents() {
  const data = await fetch(
    "https://nextjs-ce475-default-rtdb.firebaseio.com/events.json"
  ).then((res) => res.json());
  const data_array = [];
  for (const key in data) {
    data_array.push({
      id: key,
      ...data[key],
    });
  }
  return data_array;
}

export async function getFeaturedEvents() {
  const allEvents = await getEvents();
  //   console.log(
  //     "test",
  //     allEvents.filter((event) => event.isFeatured)
  //   );
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year &&
      eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
