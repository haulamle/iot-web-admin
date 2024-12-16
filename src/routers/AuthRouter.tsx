import { Typography } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { colors } from "../constants/colors";
import Login from "../screens/auth/Login";

const { Title } = Typography;

export default function AuthRouter() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col d-none d-lg-block text-center"
          style={{ marginTop: "15%" }}
        >
          <img
            className="mb-4"
            src="https://png.pngtree.com/png-vector/20210508/ourlarge/pngtree-thermometer-for-measuring-air-temperature-png-image_3258122.jpg"
            alt="logo"
            style={{
              width: 256,
              objectFit: "cover",
            }}
          />
          <Title style={{ color: colors.primary500 }}>Temperature</Title>
        </div>
        <div className="col content-center">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}
