import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';
import { signOut } from '../../utils/auth';
import getSingleUser from '../../api/userData';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const { uid } = router.query;
  //   const { user } = useAuth();

  useEffect(() => {
    getSingleUser(uid).then(setUserDetails);
  }, [uid]);

  return (
    <>
      <Head>
        <title>{userDetails.profileImageUrl}</title>
      </Head>
      <div className="profile-font" style={{ marginTop: '35px' }}>
        <h1>Name: {userDetails.firstName}{userDetails.lastName}</h1>
        <h2>Email: {userDetails.email}</h2>
        <Button variant="danger" onClick={signOut}> Sign Out</Button>
      </div>
    </>
  );
}
