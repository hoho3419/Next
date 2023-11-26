import { useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

type Props = {
  eventId: string;
};

function Comments(props: Props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  async function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    if (showComments) {
      try {
        const response = await fetch(`/api/comments/${eventId}`);

        const { status } = response;

        if (status === 422) {
          alert("잘못된 데이터 입니다.");
          return;
        }
        const comments = await response.json();
        setComments(comments);
        console.log(comments);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function addCommentHandler(commentData: {
    email: string;
    name: string;
    text: string;
  }) {
    // send data to API
    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const { status } = response;

      if (status === 422) {
        alert("잘못된 데이터 입니다.");
        return;
      }
      const message = await response.json();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
