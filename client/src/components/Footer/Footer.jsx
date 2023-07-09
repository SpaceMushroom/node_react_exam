import "./Footer.scss";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return <footer>© Copyright {currentYear}, All Rights Reserved.</footer>;
};

export default Footer;
