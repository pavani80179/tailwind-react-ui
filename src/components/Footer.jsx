import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center">
      <div className="mb-2">
        © {new Date().getFullYear()} ProFinder. All rights reserved.
      </div>
      <div className="flex justify-center gap-4">
        <a href="#" className="hover:text-white">Facebook</a>
        <a href="#" className="hover:text-white">Twitter</a>
        <a href="#" className="hover:text-white">LinkedIn</a>
      </div>
    </footer>
  );
}

export default Footer;
