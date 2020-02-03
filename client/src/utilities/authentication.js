export function authenticateUser(user) {
  localStorage.setItem('user', user);
};

export function deAuthenticateUser() {
  localStorage.removeItem('user');
};

export function getUser() {
  return localStorage.getItem('user');
};

export function isUserAuthenticated() {
  return localStorage.getItem('user') !== null;
};
