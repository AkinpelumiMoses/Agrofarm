const Footer = () => {
  return (
    <footer className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto text-center py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <a href="www.creatiftechnologies.com.ng"></a>. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with ❤️ using React and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
export default Footer;