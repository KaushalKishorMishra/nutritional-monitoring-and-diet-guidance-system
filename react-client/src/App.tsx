import MyRoutes from "./routes/MyRoutes";
import RootLayout from "./components/layouts/Root.layout";
import useAppSettingsStore from "./hooks/store/appSettings.store";

const App = () => {
  const { theme } = useAppSettingsStore();

  return (
    <div data-theme={theme}>
      <RootLayout>
        <MyRoutes />
      </RootLayout>
    </div>
  );
};

export default App;
