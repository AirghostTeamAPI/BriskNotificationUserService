import { IUser } from "src/interface/user";
import User from "../models/User";

export async function findUsersByEquipments(equipments: string[]) {
  let foundUsers: IUser[] = [];
  for (let i = 0; i < equipments.length; i++) {
    const Users = await User.find({ equipment: { "$regex": equipments[i], "$options": "i" } });
    for (let j = 0; j < Users.length; j++) {
      foundUsers.push(Users[j]._id);
    }
  }
  return foundUsers;
}

export async function findUsersByLogin(login) {
  const foundUser = User.findOne({ login });
  return foundUser;
}

export async function findUserAndUpdateToken(login: string, pushToken: string) {
  const foundUser = await User.findOne({ login });
  await User.updateOne({ _id: foundUser.id }, { pushToken });
}

export async function findUserByLocation(userCountry?: string) {
  console.log(userCountry);

  const foundUsers = await User.find({ ...(userCountry && { country: userCountry }) });
  console.log(foundUsers);
  let userDTO = [];
  for (let i = 0; i < foundUsers.length; i++) {
    if (foundUsers[i].country) {
      userDTO.push({
        id: foundUsers[i].id,
        country: foundUsers[i].country,
      })
    }
  }
  return userDTO
}