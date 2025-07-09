import { Link, useNavigate } from 'react-router-dom';




const Footer = () => {
  return (
    <footer className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm py-8">
      {/* <div className="container  py-8 px-4 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center space-x-2">
      <span className="text-xl font-bold text-gray-900 "><img src="/pics/logo.png" alt="logo" width={"190"} /></span>
       </Link>

       <p className='w-50'>your gateway to a smarter, more sustainable agricultural future. We’re dedicated to empowering farmers, agribusinesses, and communities through innovative solutions that blend traditional farming wisdom with cutting-edge technology</p>
       

        <p className="text-sm">
          &copy; {new Date().getFullYear()} <a href="www.creatiftechnologies.com.ng" className="text-blue-500">Creatifity technologies digital services</a>. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          
        </p>
      </div> */}

      <div className="">
  
     <Link to="/" className="flex items-center space-x-2">
      <span className="text-xl font-bold text-gray-900 "><img src="/pics/logo.png" alt="logo" width={"190"} /></span>
       </Link>
        <p className='w-2/3 ml-8 '>your gateway to a smarter, more sustainable agricultural future. We’re dedicated to empowering farmers, agribusinesses, and communities through innovative solutions that blend traditional farming wisdom with cutting-edge technology</p>

         <p className="text-sm ml-8 mt-5">
          &copy; {new Date().getFullYear()} <a href="https://creatiftechnologies.com.ng/" className="text-blue-500">Creatifity technologies digital services</a>. All rights reserved.
        </p>

</div>
    </footer>
  );
}
export default Footer;