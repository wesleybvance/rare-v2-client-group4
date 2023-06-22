import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postdata';

function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  // const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query ?? {};

  // const updateCommentsList = () => {
  //   getpostComments(firebaseKey).then(setComments);
  // };

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
    // getpostComments(firebaseKey).then(setComments);
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
    </>
  );
}

export default ViewPost;
