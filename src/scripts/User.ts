import excelToJson from 'convert-excel-to-json'
import BlockedUser from '../models/blockedUsers';
import User from '../models/User';

export async function importUserCsvFile() {
  const result = excelToJson({
    sourceFile: '././files/USER.xlsx'
  });
  result.query.shift();

  result.query.forEach(element => {
    const newUser = new User({
      username: element.A,
      login: element.B,
      password: element.C,
      equipment: element.D
    })

    User.countDocuments({ username: element.A }, async function (err, count) {
      const blockedUser = await BlockedUser.findOne({ login: element.B });

      if (count === 0 && !blockedUser) {
        User.create(newUser)
      }
      else if (!blockedUser) {
        User.updateOne({ username: element.A }, newUser)
      }
    })
  })

};
