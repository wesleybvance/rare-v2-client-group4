import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getSubscriptions } from '../api/subscriptionData';
import PostCard from '../components/PostCard';

function Home() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);

  const getSubPosts = () => {
    getSubscriptions(user.id).then(setSubscriptions);
  };

  useEffect(() => {
    getSubPosts();
  }, [user]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '20px auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <div>
        {subscriptions.map((subscription) => (
          <div key={subscription.id}>
            {subscription.author_id.posts && subscription.author_id.posts.length > 0 ? (
              subscription.author_id.posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  userId={subscription.author_id}
                  title={post.title}
                  publicationDate={post.publication_date}
                  imageUrl={post.image_url}
                  content={post.content}
                  onUpdate={getSubPosts}
                />
              ))
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
