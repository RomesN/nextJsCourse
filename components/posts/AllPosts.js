import PostGrid from "./PostsGrid";
import classes from "./AllPosts.module.css";

export default function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostGrid posts={props.posts} />
    </section>
  );
}
