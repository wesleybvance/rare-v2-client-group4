import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleComment } from '../../../utils/data/commentData';
import CommentForm from '../../../components/comments/CommentForm';

export default function UpdateComment() {
  const { user } = useAuth();
  const router = useRouter();
  const commentId = router.query;
  const [editComment, setEditComment] = useState({});
  const [postId, setPostId] = useState();

  useEffect(() => {
    getSingleComment(commentId.id).then(setEditComment);
    getSingleComment(commentId.id).then((data) => setPostId(data.post_id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId]);

  return (
    <div>
      <h2>Update Comment</h2>
      <CommentForm user={user} obj={editComment} commentPostId={postId} onSubmit={console.warn('submit')} />
    </div>
  );
}
