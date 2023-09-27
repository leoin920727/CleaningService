import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Book1 from "./pages/book/Book1";
import Book2 from "./pages/book/Book2";
import Book3 from "./pages/book/Book3";
import Book4 from "./pages/book/Book4";
import Book5 from "./pages/book/Book5";
import {
  OrderList,
  UndoneOrder,
  DoneOrder,
  StaffList,
  StaffListInfo,
  Banlist,
  AddStaff,
} from "./components/dashboard/DashboardSet";
import Dashboard from "./pages/Dashboard";
import MemberInfo from "./components/member/MemberInfo";
import PersonalInfo from "./components/member/PersonalInfo";
import Aboutus from "./components/aboutus/aboutus";
import Accepting from "./components/Accept/Accepting";
import Case from "./components/caseshare/case";
import Question from "./components/opinion/question";
import AdminOrder from "./pages/order/AdminOrder";
import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./pages/Error";
import Member from "./pages/Member";
import Employee from "./pages/Employee";
import Order from "./components/dashboard/Order";
import OrderDone from "./components/dashboard/OrderDone";
import LoginPage from "./components/login/LoginPage";
import Memberlogin from "./components/login/Memberlogin";
import ChangePwd from "./components/login/ChangePwd";
import OrderMemberDone from "./components/dashboard/OrderMemberDone";
import { EmployeeList, EmployeeDone } from "./components/dashboard/employeeSet";
import EmployeeOrder from "./pages/order/employeeOrder";
import EmployeeInfo from "./components/login/EmployeeInfo";
import EmployeePwd from "./components/login/EmployeePwd";

import RenewPwd from "./components/book/RenewPwd";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/service" element={<Accepting />} />
        <Route path="/case" element={<Case />} />
        <Route path="/question" element={<Question />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/book" element={<Book />}>
          <Route index="/book/" element={<Book1 />} />
          <Route path="/book/book2" element={<Book2 />} />
          <Route path="/book/book3" element={<Book3 />} />
          <Route path="/book/book4" element={<Book4 />} />
          <Route path="/book/book5" element={<Book5 />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute admin="staffAdmin">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index="/dashboard" element={<OrderList />} />
          <Route path="/dashboard/UndoneOrder/" element={<UndoneOrder />} />
          <Route path="/dashboard/DoneOrder/" element={<DoneOrder />} />
          <Route
            path="/dashboard/AdminOrder/:ornumber"
            element={<AdminOrder />}
          />
          <Route path="/dashboard/PersonalInfo/" element={<MemberInfo />} />
          <Route
            path="/dashboard/PersonalInfo/:userid"
            element={<PersonalInfo />}
          />
          <Route path="/dashboard/StaffList/" element={<StaffList />} />
          <Route
            path="/dashboard/StaffList/:employeeid"
            element={<StaffListInfo />}
          />
          <Route
            path="/dashboard/DoneOrder/:employeeid"
            element={<DoneOrder />}
          />
          <Route path="/dashboard/blacklist" element={<Banlist />} />
          <Route path="/dashboard/addstaff" element={<AddStaff />} />
        </Route>
        <Route path="*" element={<Error />} />
        <Route
          path="/member/"
          element={
            <ProtectedRoute admin="memberAdmin">
              <Member />
            </ProtectedRoute>
          }
        >
          <Route index="/member/" element={<Order />} />
          <Route path="/member/orderdone" element={<OrderMemberDone />} />
          <Route path="/member/:orderNumber" element={<OrderDone />} />
          <Route path="/member/memberinfo" element={<Memberlogin />} />
          <Route path="/member/changepwd" element={<ChangePwd />} />
        </Route>
        <Route
          path="/employee/"
          element={
            <ProtectedRoute admin="employeeAdmin">
              <Employee />
            </ProtectedRoute>
          }
        >
          <Route path="/employee/" element={<EmployeeList />} />
          <Route path="/employee/employeeDone" element={<EmployeeDone />} />
          <Route path="/employee/memberinfo" element={<EmployeeInfo />} />
          <Route path="/employee/EmployeePwd" element={<EmployeePwd />} />
          <Route
            path="/employee/employeeDone/:ornumber"
            element={<EmployeeOrder />}
          />
        </Route>
        <Route path="/renewpwd" element={<RenewPwd />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
