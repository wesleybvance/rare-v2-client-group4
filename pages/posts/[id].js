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
    console.warn(Number(postId.id));
    // getpostComments(firebaseKey).then(setComments);
    getAllComments();
  }, [id]);

  return (
    <>
      <Head>
        <title>{postDetails?.title}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column" />
        <div className="text-white ms-5 details">
          <h5>
            <div className="d-flex flex-column">
              <Image src={postDetails?.image_url} alt={postDetails?.imageUrl} style={{ height: '200px', width: '200px' }} />
            </div>
            Title: {postDetails?.title}
            <br />
            Publication Date: {postDetails?.publication_date}
            <br />
            Content: {postDetails?.content}
          </h5>
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
      <h2>Post Comment</h2>
      <CommentForm user={user} commentPostId={Number(postId.id)} />
      {comments.map((comment) => (
        <section key={`comment--${comment.id}`} className="comment">
          <CommentCard content={comment.content} postId={comment.post_id} authorId={comment.author_id} createdOn={comment.created_on} id={comment.id} onUpdate={getAllComments} />
        </section>
      ))}
    </>
  );
}

export default ViewPost;
