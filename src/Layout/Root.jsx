import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
// import Footer from "../Pages/Shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className='max-w-screen-xl mx-auto '>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
