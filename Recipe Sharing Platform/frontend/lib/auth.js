import Cookies from 'js-cookie';

export const saveAuth = (token, user) => {
  Cookies.set('token', token, { expires: 7 });
  if (user) {
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
  }
};

export const getAuth = () => {
  const token = Cookies.get('token');
  const user = Cookies.get('user');
  
  return {
    token,
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!token
  };
};

export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  window.location.href = '/login';
};

export const requireAuth = () => {
  const { isAuthenticated } = getAuth();
  
  if (!isAuthenticated) {
    window.location.href = '/login';
    return false;
  }
  
  return true;
};
