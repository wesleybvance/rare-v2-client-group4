import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { signOut } from '../../utils/auth';
import { deleteUser, getSingleUser } from '../../api/userData';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  // const { id } = router.query;

  const deleteProfile = () => {
    if (window.confirm('Are you sure you would like to delete your profile? You cannot undo this.')) {
      deleteUser(user.id).then(() => signOut());
    }
  };

  const getAUser = () => {
    getSingleUser(user.id).then((data) => setUserDetails(data));
  };

  useEffect(() => {
    getAUser(user.id);
  }, [user.id]);

  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <div className="d-flex flex-column">
        <Image
          className="plant-image"
          src={userDetails.profile_image_url}
          alt={userDetails.name}
          style={{
            width: '300px', borderRadius: '0px', border: '3px solid #014415', boxShadow: '6px 6px rgb(216, 208, 208)',
          }}
        />
      </div>
      <div className="profile-font" style={{ marginTop: '35px' }}>
        <h1>Name: {userDetails.first_name} {userDetails.last_name}</h1>
        <h2>Email: {userDetails.email}</h2>
        <p>Bio: {userDetails.bio} </p>
        <p>Followers: {userDetails.subscription_count} </p>
        <Button
          onClick={() => {
            router.push(`/rareUsers/edit/${userDetails.id}`);
          }}
        >
          Edit Profile
        </Button>
        <Button variant="danger" onClick={deleteProfile}> Delete Profile</Button>
        <Button variant="success" onClick={signOut}> Sign Out</Button>
      </div>
    </>
  );
}
