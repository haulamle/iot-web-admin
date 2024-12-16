import { Affix, Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiderComponent } from "../components";
import HomeScreen from "../screens/HomeScreen";
import { Temperature } from "../screens";
const { Content } = Layout;
const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Affix offsetTop={0}>
          <SiderComponent />
        </Affix>
        <Content className="pt-3 container-fluid bg-white">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/temperature" element={<Temperature />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
