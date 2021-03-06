import axios from 'axios';
import { notification } from 'antd';
import moment from 'moment';
import Store from './store';
// import store from './store';


export const baseURL = '';
function checkAccessTokenExpires(expiresAt) {
  const now = moment().unix();
  if (expiresAt - now <= 0) {
    return -1;
  }
  if (expiresAt - now <= 600) {
    return 0;
  }
  return 1;
}

async function getAccessToken() {
  const tokenInfo = Store.getAccessToken();
  if (!tokenInfo) {
    return '';
  }

  if (checkAccessTokenExpires(tokenInfo.expires_at) === 0) {
    return axios
      .request({
        url: `${baseURL}/v1/pub/refresh_token`,
        method: 'POST',
        headers: {
          Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
        },
      })
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          Store.setAccessToken(data);
          // store.setAccessToken(data);
          return `${data.token_type} ${data.access_token}`;
        }
        return '';
      });
  }
  return `${tokenInfo.token_type} ${tokenInfo.access_token}`;
}


export default async function request(url, options) {
  let showNotify = true;
  const opts = {
    baseURL,
    url,
    validateStatus() {
      return true;
    },
    ...options,
  };
  if (opts.notNotify) {
    showNotify = false;
  }

  console.log(opts);

  const defaultHeader = {
    Authorization: Store.getAccessToken(), //await getAccessToken(),
    // 'Content-Type': 'application/x-www-form-urlencoded',
};

  console.log(opts.method)
  if (opts.method === 'POST' || opts.method === 'PUT') {
   defaultHeader['Content-Type'] = 'application/json; charset=utf-8';
   opts.data = opts.body;
  }
   opts.headers = { ...defaultHeader, ...opts.headers };

  return axios.request(opts).then(response => {
    const { status, data } = response;
    console.log(data);
    if (status >= 200 && status < 300) {
      return data;
    }

  

    if (status === 401) {
      const {
        error: { code },
      } = data;
      if (code === 9999) {
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({ type: 'login/logout' });
        return {};
      }
    }

    const error = {
      code: 0,
      message: '服务器发生错误',
    };
    if (status === 504) {
      error.message = '未连接到服务器';
    } else if (data) {
      const {
        error: { message, code },
      } = data;
      error.message = message;
      error.code = code;
    } else if (status >= 400 && status < 500) {
      error.message = '请求发生错误';
    }

    if (showNotify) {
      notification.error({
        message: `${opts.baseURL}${opts.url}`,
        description: error.message,
      });
    }


    return { error, status };
  });
}
