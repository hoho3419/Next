import { Comment } from "@/pages";
import classes from "./comment-list.module.css";

type Props = {
  items: Comment[];
};

function CommentList(props: Props) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((el) => (
        <li key={el._id}>
          <p>{el.text}</p>
          <div>
            By <address>{el.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
