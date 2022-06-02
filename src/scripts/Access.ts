import Access from "../models/AcessLogging";

export function createHours() {
  Access.countDocuments({}, function (err, count) {
    if (count === 0) {
      for (let i = 0; i <= 24; i++) {
        const newHour = new Access({
          hours: [
            {
              hour: i,
              ammount: 0
            }
          ]
        })
        Access.create(newHour)
      }
    }
  });
}