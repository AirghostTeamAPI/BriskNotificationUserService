import { sign } from 'jsonwebtoken';
import { IUser } from 'src/interface/user';
import User from '../models/User';

export async function authenticateUser(login: string, password: string) {
  const foundUser = await User.findOne({ login });
  if (foundUser) {
    if (foundUser.password === password) {
      const token = sign({
        id: foundUser.id,
        username: foundUser.username,
        equipment: foundUser.equipment,
        login: foundUser.login,
      }, process.env.jwtSecret);

      return token;
    }
  }
}

export async function updateUserViewedFol(login: string, folId: string) {
  const foundLogin: IUser = await User.findOne({ login });
  foundLogin.viewedFols.push(folId)

  await User.updateOne({ login: foundLogin.login }, foundLogin)

  return foundLogin;
}