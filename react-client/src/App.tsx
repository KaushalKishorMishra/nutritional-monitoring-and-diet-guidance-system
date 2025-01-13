import { useState } from "react";
import MyRoutes from "./routes/MyRoutes";
import RootLayout from "./components/layouts/Root.layout";

const App = () => {
  const [theme, setTheme] = useState<"customLight" | "customDark">(
    "customDark",
  );

  return (
    <div data-theme={theme}>
      <RootLayout setTheme={setTheme} theme={theme}>
        <MyRoutes />
      </RootLayout>
    </div>
  );
};

export default App;
