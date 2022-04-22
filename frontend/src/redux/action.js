export const setUser = (user='') => ({ 
  type: 'LOGIN', 
  user
}); 

export const setLogout = () => ({
  type: 'LOGOUT'
});

// export const setUserInfo = (user) => ({
//   type: 'MODIFY',
//   user
// });
// export const setNumber = (number = 0) => ({ 
//   type: 'SET_NUMBER', 
//   number 
// });

