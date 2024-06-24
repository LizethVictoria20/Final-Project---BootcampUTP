import Axios from 'axios';

const updateUser = async (userData) => {
  try {
    const response = await Axios.put(
      `https://final-project-bootcamputp.onrender.com/api/users/${userData.id}`,
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error('Error updating user:', error);
  }
};

export default updateUser;