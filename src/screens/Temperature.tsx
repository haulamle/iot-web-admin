import { Button, message, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import handleAPI from "../apis/handleAPI";
import { colors } from "../constants/colors";
import { AddTemperatureModal } from "../modals";

const { Title } = Typography;

export interface Temperature {
  _id: string;
  DeviceID: string;
  Temperatured: string;
  DateTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Temperature = () => {
  const [isloading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(10);
  const [temperatures, setTemperatures] = useState([]);
  const [visibleModalTemperature, setVisibleModalTemperature] = useState(false);

  useEffect(() => {
    getData();
    const getDataInterval = setInterval(() => {
      getData();
    }, 60000);
    return () => clearInterval(getDataInterval);
  }, [page, pageSize]);

  const getData = async () => {
    const api = `/temperature/get-temperature?page=${page}&pageSize=${pageSize}`;
    setIsLoading(true);
    try {
      const res = await handleAPI(api);
      res.data && setTemperatures(res.data?.temperature);
      res.data && setTotal(res.data?.totalItem);
      setIsLoading(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const columns: ColumnProps<Temperature>[] = [
    {
      title: "Device ID",
      dataIndex: "DeviceID",
      key: "DeviceID",
    },
    {
      title: "Temperature",
      dataIndex: "Temperatured",
      key: "Temperatured",
    },
    {
      title: "DateTime",
      dataIndex: "DateTime",
      key: "DateTime",
      render: (date: string) => {
        return new Date(date).toLocaleString();
      },
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col">
          <Title style={{ color: colors.primary500 }}>Temperature</Title>
        </div>
        <div className="col ">
          <Button
            onClick={() => setVisibleModalTemperature(true)}
            type="default"
            style={{ float: "right" }}
          >
            Add Temperature
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Table
            bordered
            scroll={{ x: "max-content" }}
            dataSource={temperatures}
            columns={columns}
            loading={isloading}
            pagination={{
              showSizeChanger: true,
              total,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
              showPrevNextJumpers: false,
            }}
          />
        </div>
      </div>
      <AddTemperatureModal
        visible={visibleModalTemperature}
        onclose={() => setVisibleModalTemperature(false)}
        onAddNew={() => {
          getData();
        }}
      />
    </>
  );
};

export default Temperature;
