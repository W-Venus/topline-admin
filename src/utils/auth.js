// 把window.localStorage保存为一个变量,方便后续使用
const localStorage = window.localStorage
// 把本地存储中的用户信息的key保存为一个变量,方便后续使用
const USER_KEY = 'user_info'
// 获取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_KEY))
}
// 删除用户信息
export const removeUser = () => {
  localStorage.removeItem(USER_KEY)
}
// 设置(保存)用户信息
export function setUser (data) {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}
