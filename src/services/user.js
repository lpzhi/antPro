import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  // return request('/api/currentUser');
  return request('/api/getuser');
}
export async function queryNotices() {
  return request('/api/notices');
}
