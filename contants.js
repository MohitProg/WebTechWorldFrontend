import axios from "axios";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { TbBrandJavascript } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiMongodb } from "react-icons/di";
import { SiPostman } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaRegSmileWink } from "react-icons/fa";

let url="https://personalwebbackend-4cb2.onrender.com"
// let url="https://webtech-world-backend.vercel.app"
// let url="http://localhost:8000"
const ApiClient=axios.create({
    baseURL:`${url}/api/v1`,
    headers:{
        "Content-Type":"application/json"
    }
})



ApiClient.interceptors.request.use(
    (config) => {
      try {
        // Attempt to retrieve the token
        const token = localStorage.getItem('token');
        
        // If a token exists, add it to the headers
        if (token) {
          config.headers['auth-token'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
        // Optionally handle token retrieval error (e.g., redirect to login)
      }
  
      return config;
    },
    (error) => {
      // Handle the request error
      return Promise.reject(error);
    }
  );
  
  export default ApiClient;



  export const ArrayofTech = [
      {
        TagName: FaHtml5,
        color: "#e75e3b",
        title: "HTML",
      },
  
      {
        TagName: FaCss3Alt,
        color: "#3a5ee7",
        title: "CSS",
      },
      {
        TagName: TbBrandJavascript,
        color: "#fee038",
        title: "JAVASCRIPT",
      },
      {
        TagName: RiTailwindCssFill,
        color: "#1ebdd8",
        title: "TAILWIND CSS",
      },
      {
        TagName: DiMongodb,
        color: "#58ad4c",
        title: "MONGODB",
      },
      {
        TagName: SiPostman,
        color: "#fd713b",
        title: "POSTMAN",
      },
      {
        TagName: FaGithub,
        color: "#080808",
        title: "GITHUB",
      },
  
      {
        TagName: FaRegSmileWink,
        color: "#fee038",
        title: "Wiill Add More",
      },
    ];