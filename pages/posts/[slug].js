import Head from "next/head";
import PostContent from "../../components/posts/postDetail/PostContent";
import { getPostData, getPostsFiles } from "../../libs/pagesUtils";

export default function SinglePostPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
}

export function getStaticProps(context) {
  const { slug } = context.params;

  return { props: { post: getPostData(slug) }, revalidate: 600 };
}

export function getStaticPaths() {
  const fileNames = getPostsFiles();
  return { paths: fileNames.map((name) => ({ params: { slug: name.replace(/\.md$/, "") } })), fallback: false };
}
