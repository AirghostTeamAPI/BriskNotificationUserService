import { IUser } from "src/interface/user";
import User from "../models/User";

export async function findUsersByEquipments(equipments: string[]) {
  let foundUsers: IUser[] = [];
  for (let i = 0; i < equipments.length; i++) {
    const Users = await User.find({ equipment: equipments[i] });
    for (let j = 0; j < Users.length; j++) {
      foundUsers.push(Users[j]);
    }
  }
  return foundUsers;
}

export async function findUserAndUpdateToken(login: string, pushToken: string) {
  const foundUser = await User.findOne({ login });
  await User.updateOne({ _id: foundUser.id }, { pushToken });
}