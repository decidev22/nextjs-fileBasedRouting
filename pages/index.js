import Head from "next/head";
import { useRef, useState } from "react";

// import { getFeaturedEvents } from "../dummy-data";
import { getFeaturedEvents } from "../helpers/api-util";

import EventList from "../components/events/event-list";

const HomePage = (props) => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault(); // Prevent reload behaviour
    const enteredEmail = emailInputRef.current.value;
    const feedbackInput = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: feedbackInput };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbackItems(data.feedback));
  }

  const featuredEvents = props.events;
  return (
    <div>
      <Head>
        <title>Event For Engineers</title>
        <meta name="description" content="Do some networking." />
      </Head>
      <div className="center">
        <h1>Feedbcak Submit</h1>
        <form onSubmit={submitFormHandler}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div>
            <label htmlFor="feedback">Feedbcak</label>
            <input type="feedback" rows="5" ref={feedbackInputRef} />
          </div>
          <button>Send your event info</button>
        </form>
        <hr />
        <button onClick={loadFeedbackHandler()}>Load Feedback</button>
        <ul>
          {feedbackItems.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 100,
  };
}
