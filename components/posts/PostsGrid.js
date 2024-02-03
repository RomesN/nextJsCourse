import PostItem from "./PostItem";
import classes from "./PostsGrid.module.css";

export default function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((p) => (
        <PostItem key={p.slug} post={p} />
      ))}
    </ul>
  );
}
