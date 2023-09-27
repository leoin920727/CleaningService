import React from "react";

const BookContext = React.createContext({
  user: null,
  uid: null,
  weeks: 4,
  employeeid: null,
  week: null,
  time: null,
  date: null,
  name: null,
  phone: null,
  email: null,
  city: "臺中市",
  rural: "中區",
  address: null,
  note: null,
});

export default BookContext;
