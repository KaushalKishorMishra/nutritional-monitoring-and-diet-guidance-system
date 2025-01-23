import MyRoutes from "./routes/MyRoutes";
import RootLayout from "./components/layouts/Root.layout";
import useAppSettingsStore, { Theme } from "./hooks/store/appSettings.store";
import Modal from "./components/modal/Modal";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const { theme } = useAppSettingsStore();
  return (
    <div data-theme={theme}>
      <RootLayout>
        <ToastContainer position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={`${theme === Theme.Dark ? "dark" : "light"}`}
        />
        <MyRoutes />
        <Modal />
      </RootLayout>
    </div>
  );
};

export default App;
