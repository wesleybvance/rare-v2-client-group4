import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PostCard from '../../components/PostCard';
import { getPosts } from '../../utils/data/postdata';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const showPosts = () => {
    getPosts(user.uid).then((data) => setPosts(data));
  };
  useEffect(() => {
    showPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.warn(posts);

  return (
    <>
      <Button
        className="register-btn"
        onClick={() => {
          router.push('/posts/new');
        }}
      >
        Register New Post
      </Button>
      <h1>Posts</h1>
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {posts.map((post) => (
          <div key={`post--${post.id}`} className="post">
            <PostCard
              id={post.id}
              title={post.title}
              imageUrl={post.image_url}
              publicationDate={post.publication_date}
              content={post.content}
              onUpdate={showPosts}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
