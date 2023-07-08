/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postdata';
import { getCommentsByPostId } from '../../utils/data/commentData';
import CommentCard from '../../components/comments/CommentCard';
import CommentForm from '../../components/comments/CommentForm';
import { useAuth } from '../../utils/context/authContext';
// testing date formatter

function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  // const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query ?? {};
  const postId = router.query;
  const [comments, setComments] = useState([]);
  const { user } = useAuth();

  // const updateCommentsList = () => {
  //   getpostComments(firebaseKey).then(setComments);
  // };
  const getAllComments = () => {
    getCommentsByPostId(postId.id).then((data) => setComments(data));
  };

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
    // getpostComments(firebaseKey).then(setComments);
    getAllComments();
  }, [id]);

  return (
    <>
      <Head>
        <title>{postDetails?.title}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap post-details-cont">
        <div className="d-flex flex-column post-details-cont" />
        <div className="text-white ms-5 details">
          <div className="post-details-cont">
            <div className="post-img-details">
              <Image src={postDetails?.image_url} alt={postDetails?.imageUrl} className="post-img-detail" />
            </div>
            <div className="post-content-cont">
              <h2 className="post-details-title">{postDetails?.title}</h2>
              <h7 className="post-details-text">{postDetails?.publication_date}</h7>
              <h5 className="post-details-text post-content-detail">{postDetails?.content}</h5>
            </div>
          </div>
        </div>
      </div>
      {/* <div> <postCommentForm firebaseKey={firebaseKey} onUpdate={updateCommentsList} />
      </div>
      <Head>
        <title>Comments</title>
      </Head>
      <div>
        {comments.map((comment) => (
          <CommentCard key={comment.firebaseKey} commentObj={comment} onUpdate={() => getMediaComments(firebaseKey).then(setComments)} />
        ))}
      </div> */}
      <div className="post-details-cont">
        <h2 className="post-comment-title">Post Comment</h2>
        <CommentForm user={user} commentPostId={Number(postId.id)} onSubmit={getAllComments} />
        {comments.map((comment) => (
          <section key={`comment--${comment.id}`} className="comment">
            <CommentCard content={comment.content} postId={comment.post_id} authorId={comment.author_id} createdOn={comment.created_on} id={comment.id} onUpdate={getAllComments} />
          </section>
        ))}
      </div>
    </>
  );
}

export default ViewPost;
