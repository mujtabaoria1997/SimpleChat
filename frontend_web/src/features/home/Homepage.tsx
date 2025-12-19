import React from "react";
import { useAuth } from "../users/hooks/useAuth";

const Homepage = () => {
  useAuth();
  
  return <div>ABC</div>;
};

export default Homepage;
