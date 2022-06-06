import jsonwebtoken from 'jsonwebtoken';
import { IUser } from 'src/interface/user';
import User from '../models/User';

export async function authenticateUser(login: string, password: string, country?: string) {
  if (!verifyBody(login, password)) return undefined
  const foundUser = await User.findOne({ login });
  if (!foundUser) { return 'userNotFound' }
  if (foundUser) {
    if (foundUser.password !== password) { return 'passwordIncorrect' }
    if (foundUser.password === password) {
      const token = jsonwebtoken.sign({
        id: foundUser.id,
        username: foundUser.username,
        equipment: foundUser.equipment,
        login: foundUser.login,
        ...(country && { country: country }),
      }, process.env.jwtSecret);

      return token;
    }
  }
}


export function verifyBody(login?, password?) {
  if (!login || !password) {
    return undefined
  } else {
    return true
  }
}

export async function updateUserViewedFol(login: string, folId: string) {
  const foundLogin: IUser = await User.findOne({ login });
  foundLogin.viewedFols.push(folId)

  await User.updateOne({ login: foundLogin.login }, foundLogin)

  return foundLogin;
}

export async function findUserAndUpdateLocation(login: string, userLocation: string) {
  const foundLogin: IUser = await User.findOne({ login });

  foundLogin.country = userLocation

  await User.updateOne({ login: foundLogin.login }, foundLogin)

  return foundLogin;
}

export async function findUsersFols() {
  const foundUsers = await User.find({});
  let userFols = []
  for (const user of foundUsers) {
    for (const fol of user.viewedFols) {
      if (user.viewedFols) userFols.push(fol)
    }
  }
  return userFols;
}