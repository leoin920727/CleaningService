import BookContext from "./book-context";
const formData = {
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
};
const BookProvider = ({ children }) => {
  return (
    <BookContext.Provider value={formData}>{children}</BookContext.Provider>
  );
};
export default BookProvider;
