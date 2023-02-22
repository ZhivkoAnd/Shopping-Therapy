import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
  lightMode: React.MouseEventHandler<SVGSVGElement>;
  darkMode: React.MouseEventHandler<SVGSVGElement>;
}

const Layout = ({ children, lightMode, darkMode }: Props) => {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
