import axios from 'axios';
import { showAlert } from './alerts';

export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Данные были успешно обновлены!');
    }
  } catch (e) {
    console.log(e);
    showAlert('error', e.response.data.message);
  }
};
