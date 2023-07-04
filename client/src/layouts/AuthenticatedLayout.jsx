import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="authenticated-container">{children}</div>
      <Footer />
    </>
  );
};

export default AuthenticatedLayout;
