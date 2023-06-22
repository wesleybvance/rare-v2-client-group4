/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import CommentForm from '../../../components/comments/CommentForm';
import { getSinglePost } from '../../../utils/data/postdata';
import CommentCard from '../../../components/comments/CommentCard';
import { getCommentsByPostId } from '../../../utils/data/commentData';

export default function PostComment() {
  const { user } = useAuth();
  const router = useRouter();
  const postIdRouter = router.query;
  const [postId, setPostId] = useState();
  const [comments, setComments] = useState([]);

  const getAllComments = () => {
    getCommentsByPostId(postId).then((data) => setComments(data));
  };

  useEffect(() => {
    console.warn(postIdRouter);
    getAllComments();
    getSinglePost(postIdRouter.id).then((data) => setPostId(data.id));
  }, [postIdRouter]);

  return (
    <div>
      <h2>Post Comment</h2>
      {comments.map((comment) => (
        <section key={`comment--${comment.id}`} className="comment">
          <CommentCard content={comment.content} postId={comment.post_id} authorId={comment.author_id} createdOn={comment.created_on} id={comment.id} onUpdate={getAllComments} />
        </section>
      ))}
      <CommentForm user={user} commentPostId={postId} />
    </div>
  );
}
