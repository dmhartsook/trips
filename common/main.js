/*
  City: {
    name: unique shorter string
    start date: Date
    end date: Date
    description: (long) string
    activities: [ActivityId], client does not have access to
    createdAt: Date, created by default
    notes: long string
    owner: user id
  }
*/
CitiesCollection = new Mongo.Collection("cities");

/*
  Activity: {
    cityId: client does not have access to
    name: short string
    description: long string
    openingTimes: object probably
    price: object probably
    notes: long string
    createdAt: Date, created by default
    owner: user id
  }
*/
ActivitiesCollection = new Mongo.Collection("activities");