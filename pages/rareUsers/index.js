import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/userData';
import UserCard from '../../components/users/UserCard';

function UserPage() {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    getUsers().then((data) => setUsers(data));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <article className="users">
        <h1>Users</h1>
        <div className="container">
          <div className="row pt-5">
            <div className="col-10">
              <div className="row">
                {users.map((user) => (
                  <div key={`user--${user.id}`} className="col-lg-4 col-h-100 mb-3 d-flex align-items-stretch user-cards">
                    <div className="card-body d-flex flex-column">
                      <section className="user">
                        <UserCard id={user.id} firstName={user.first_name} lastName={user.last_name} bio={user.bio} profileImageUrl={user.profile_image_url} email={user.email} subscriptionCount={user.subscription_count} onUpdate={getAllUsers} />
                      </section>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default UserPage;
