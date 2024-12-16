import { Spin } from "antd";
import { useEffect, useState } from "react";
import MainRouter from "./MainRouter";
import AuthRouter from "./AuthRouter";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, authSeletor, AuthState } from "../redux/reducers/authReducer";
import { localDataNames } from "../constants/appInfos";

const Routers = () => {
  const [isLoading] = useState(false);

  const auth: AuthState = useSelector(authSeletor);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = localStorage.getItem(localDataNames.authData);
    res && dispatch(addAuth(JSON.parse(res)));
  };

  return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <MainRouter />;
};

export default Routers;
