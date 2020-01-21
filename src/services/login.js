import request from '@/utils/request';
export const baseURL = 'server';
export async function fakeAccountLogin(params) {
  console.log(params)
  return request('/api/login/account', {
    method: 'post',
    data: params,
  });
  // return request('/api/auth', {
  //   method: 'POST',
  //   //data: params,
  //   body: params,
  // });

}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
