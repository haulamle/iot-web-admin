import { Button } from "antd";
import { useDispatch } from "react-redux";
import { removeAuth } from "../redux/reducers/authReducer";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(removeAuth());
  };
  return (
    <div className="text-center mt-5">
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomeScreen;
