"use client"
import CategoriesBar from "../components/CategoriesBar"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const layout = ({children } : {children: React.ReactNode}) => {
  const notify = (message: string, type: number) => toast.success(message, {});
  return (
    <div className="flex flex-col justify-between ">
      <div className="min-h-screen">
        <Navbar />
        <CategoriesBar />
        <div className="relative py-12 my-32">
          {children}
        </div>
      </div>
      <Footer />
      <ToastContainer theme="dark" position="top-left"/>
    </div>
  )
}

export default layout
