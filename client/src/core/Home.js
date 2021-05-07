import React from "react";
import "../styles.css";
import {API} from "../backend"
import Navbar from "./components/navbar";

export default function Home() {
  console.log(`API is available at${API}`,process.env.REACT_APP_BACKEND)
  return (
    <div>
      <Navbar/>
      <h1 className="text-white">Hello front end</h1>
    </div>
  );
}
