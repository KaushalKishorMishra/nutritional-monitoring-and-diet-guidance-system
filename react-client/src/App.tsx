import MyRoutes from "./routes/MyRoutes";
import RootLayout from "./components/layouts/Root.layout";
import useAppSettingsStore from "./hooks/store/appSettings.store";
import Modal from "./components/modal/Modal";
import { useEffect } from "react";
import useUserDataStore from "./hooks/store/userData.store";

const App = () => {
  const { theme } = useAppSettingsStore();

  const resetUserDataFromLocalStorage = useUserDataStore(
    (state) => state.resetUserDataFromLocalStorage,
  );

  useEffect(() => {
    // Reset user data on app load (if any exists in localStorage)
    resetUserDataFromLocalStorage();
  }, [resetUserDataFromLocalStorage]);

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
