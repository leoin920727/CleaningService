import { useEffect, useState } from "react";
import axios from "../login/axios";

export const useAttendance = ({ ornumber }) => {
  //data=會員編號

  const [attdata, setAttdata] = useState(null);
  const [dayTime, setDayTime] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.post("/member/orderdonetime", { ornumber });
      setDayTime(response.data.time);
      return setAttdata(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { attdata, dayTime };
};
