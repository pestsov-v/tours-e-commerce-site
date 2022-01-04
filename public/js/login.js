import axios from 'axios'
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Вы успешно вошли на сайт!')
      window.setTimeout(() => {
        location.assign('/')
      }, 1000)
    }

  } catch (e) {
    showAlert('error', e.response.data.message)
  }
};
