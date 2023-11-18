import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/Auth-layout";
import Auth from "./views/Auth";
import MainLayout from "./layouts/Main-layout";
import Registration from "./views/Registration";
import Group from "./views/Group";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Auth />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
        <Route path="/dashboard" element={<MainLayout />}>
          <Route path="/dashboard/group" element={<Group />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
