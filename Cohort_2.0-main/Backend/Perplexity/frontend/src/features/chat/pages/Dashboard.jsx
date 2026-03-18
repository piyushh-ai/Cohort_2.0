import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const {initializeSocketConnection} = useChat()

  useEffect(() => {
    
    initializeSocketConnection()
  }, [])
  


  console.log(user);

  return <div>Dashboard</div>;
};

export default Dashboard;
