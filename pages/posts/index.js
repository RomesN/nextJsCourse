import Head from "next/head";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../libs/pagesUtils";

export default function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>All my posts</title>
        <meta name="description" content="A list of all programming-related tutorials and posts." />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  return { props: { posts: getAllPosts() }, revalidate: 1800 };
}
