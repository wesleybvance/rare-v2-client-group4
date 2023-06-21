import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getSubscriptions } from '../api/subscriptionData';

function Home() {
  const { user } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions(user.id).then(setSubscriptions);
  }, [user.id]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Your Bio: {user.bio}</p>
      <div>Subscribed to:
        {subscriptions.map((subscription) => (
          <p>{subscription.author_id.first_name} {subscription.author_id.last_name}</p>
        ))}
      </div>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
