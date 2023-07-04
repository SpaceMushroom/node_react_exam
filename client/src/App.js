import Routes from "./routes/Routes";
import Providers from "./context/Providers";

const App = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default App;
