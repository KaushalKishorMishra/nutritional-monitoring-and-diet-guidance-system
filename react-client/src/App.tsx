import MyRoutes from "./routes/MyRoutes";
import RootLayout from "./components/layouts/Root.layout";
import useAppSettingsStore from "./hooks/store/appSettings.store";
import Modal from "./components/modal/Modal";

const App = () => {
  const { theme } = useAppSettingsStore();

  return (
    <div data-theme={theme}>
      <RootLayout>
        <MyRoutes />
        <Modal />
      </RootLayout>
    </div>
  );
};

export default App;
