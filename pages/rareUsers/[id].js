import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../api/userData';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getAUser = () => {
    getSingleUser(id).then((data) => setUserDetails(data));
  };

  useEffect(() => {
    getAUser(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
      </div>
    </>
  );
}
