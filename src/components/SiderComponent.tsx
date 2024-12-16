import { Layout, Menu, MenuProps, Typography } from "antd";
import { Home2 } from "iconsax-react";
import { FaTags } from "react-icons/fa";
import { Link } from "react-router-dom";
import { appInfo } from "../constants/appInfos";
import { colors } from "../constants/colors";
type MenuItem = Required<MenuProps>["items"][number];
const { Sider } = Layout;
const { Text } = Typography;
const SiderComponent = () => {
  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link to={"/"}>Dashboard</Link>,
      icon: <Home2 size={20} />,
    },
    {
      key: "temperature",
      label: <Link to={"/temperature"}>Temperature</Link>,
      icon: <FaTags size={20} className="text-muted" />,
    },
  ];

  return (
    <Sider width={280} theme="light" style={{ height: "100vh" }}>
      <div className="p-2 d-flex align-items-center pl-4">
        <img
          alt=""
          src="https://png.pngtree.com/png-vector/20210508/ourlarge/pngtree-thermometer-for-measuring-air-temperature-png-image_3258122.jpg"
          width={48}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: colors.primary500,
            margin: "0 0 0 10px",
          }}
        >
          {appInfo.title}
        </Text>
      </div>
      <Menu mode="inline" items={items} theme="light" />
    </Sider>
  );
};

export default SiderComponent;
