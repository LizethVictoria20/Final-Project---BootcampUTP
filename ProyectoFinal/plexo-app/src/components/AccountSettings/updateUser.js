import api from '../../http/index.js';

const updateUser = async (userData) => {
  try {
    console.log(userData)
    const response = await api.put('users/',
      userData
    );
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('Error updating user:', error);
  }
};

export default updateUser;