import Access from "../models/AcessLogging";

export async function getAccessLogging() {
  const foundAccess = await Access.find({});

  return foundAccess;
}

export async function updateAccessLogging(hour: number) {
  const foundAccess = await Access.findOne({ "hours.hour": hour });

  foundAccess.hours.forEach(element => {
    if (element.hour === hour) {
      element.ammount++;
    }
  });

  await foundAccess.save();

  return foundAccess;
}

