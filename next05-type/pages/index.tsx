import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

export type Event = {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
  description?: string;
};

export type Comment = {
  _id?: string;
  id: string;
  name: string;
  text: string;
  email?: string;
  message?: string;
};

type Props = {
  events: Event[];
};

function HomePage(props: Props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
