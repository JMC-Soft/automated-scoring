import users from '@/app/api/database/users';

const findUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

const saveUser = async (email: string, password: string, nickName: string) => {
  const user = {
    email,
    password,
    nickName,
  };

  users.push(user);
  return user;
};

export { findUserByEmail, saveUser };
