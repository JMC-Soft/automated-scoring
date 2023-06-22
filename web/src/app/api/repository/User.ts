import users from '@/app/api/database/users';

const findUserByEmail = async (email: string) => {
  return (await users.find((user) => user.email === email)) || null;
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
