import Head from "next/head";
import Hero from "../components/homePage/Hero";
import FeaturedPosts from "../components/homePage/FeaturedPosts";
import { getFeaturedPosts } from "../libs/pagesUtils";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Roman`s blog</title>
        <meta name="description" content="I post about programming and web development." />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  return { props: { posts: getFeaturedPosts() }, revalidate: 1800 };
}
