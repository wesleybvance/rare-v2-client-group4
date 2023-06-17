import RareUserForm from '../../components/rareUserData/RareUserForm';
import { useAuth } from '../../utils/context/authContext';

const NewRareUser = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register as a New Rare Media User</h2>
      <RareUserForm user={user} />
    </div>
  );
};

export default NewRareUser;
