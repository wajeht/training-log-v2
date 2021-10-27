exports.seed = (knex) => {
  return knex("user")
    .del()
    .then(() => {
      return knex("user").insert([
        {
          name: "Yan lon",
          age: 7,
          weight: 30,
          gender: "male",
          username: "yanlon",
          password:
            "$2a$14$wN0neQToMrorwU7lylerJeVmFHvXZB.ZzyEj/ZbjDOk4TIBXcaEfq",
          email: "yanlon@dog.com",
          profile_picture_url: "https://placekitten.com/400/400",
        },
        {
          name: "apol lo",
          age: 1,
          weight: 50,
          gender: "male",
          username: "apollo",
          password:
            "$2a$14$wN0neQToMrorwU7lylerJeVmFHvXZB.ZzyEj/ZbjDOk4TIBXcaEfq",
          email: "apollo@dog.com",
          profile_picture_url: "https://placekitten.com/400/400",
        },
        {
          name: "soap wa",
          age: 8,
          weight: 25,
          gender: "male",
          username: "soapwa",
          password:
            "$2a$14$wN0neQToMrorwU7lylerJeVmFHvXZB.ZzyEj/ZbjDOk4TIBXcaEfq",
          email: "soapwa@dog.com",
          profile_picture_url: "https://placekitten.com/400/400",
        },
        {
          name: "Jaw Dog",
          age: 27,
          weight: 190,
          gender: "male",
          username: "thejaw",
          password:
            "$2a$14$wN0neQToMrorwU7lylerJeVmFHvXZB.ZzyEj/ZbjDOk4TIBXcaEfq",
          email: "zombbayrd@gmail.com",
          profile_picture_url: "https://placekitten.com/400/400",
        },
      ]);
    });
};
