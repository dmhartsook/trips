/*
  db.cities.insert({name: "London", createdAt: new Date() });
  City: {
    name: unique shorter string
    start date: Date
    end date: Date
    description: (long) string
    activities: [ActivityId], client does not have access to
    createdAt: Date, created by default
    notes: long string
  }
*/
CitiesCollection = new Mongo.Collection("cities");

/*
  db.activities.insert({name: "London Eye", createdAt: new Date(), activity_id: 1});
  Activity: {
    city_id: client does not have access to
    name: short string
    description: long string
    opening_times: object probably
    price: object probably
    notes: long string
    createdAt: Date, created by default
  }
*/
ActivitiesCollection = new Mongo.Collection("activities");



