/**
 * localStorage 和 sessionStorage 方法
 */
export default {
  // localStorage 方法
  getLocalStorage (key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {}
  },
  setLocalStorage (key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (e) {}
  },
  removeLocalStorage (key) {
    try {
      localStorage.removeItem(key)
    } catch (e) {}
  },
  clearLocalStorage () {
    try {
      localStorage.clear()
    } catch (e) {}
  },
  // sessionStorage 方法
  getSessionStorage (key) {
    try {
      return JSON.parse(sessionStorage.getItem(key))
    } catch (e) {}
  },
  setSessionStorage (key, val) {
    try {
      sessionStorage.setItem(key, JSON.stringify(val))
    } catch (e) {}
  },
  removeSessionStorage (key) {
    try {
      sessionStorage.removeItem(key)
    } catch (e) {}
  },
  clearSessionStorage () {
    try {
      sessionStorage.clear()
    } catch (e) {}
  }
}
