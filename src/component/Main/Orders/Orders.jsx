import { useState } from "react";
import {
  ConfigProvider,
  DatePicker,
  Input,
  Modal,
  Space,
  Table,
  Form,
} from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";

const { Item } = Form;

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample data
  const dataSource = [
    {
      key: "1",
      boxName: "Blissful Retreat Box",
      orderId: "#BUDBOX-001",
      orderDate: "10/12/2023, 8 PM",
      status: "Completed",
    },
    {
      key: "2",
      boxName: "Soothing Spa Box",
      orderId: "#BUDBOX-002",
      orderDate: "10/13/2023, 9 AM",
      status: "Pending",
    },
    {
      key: "3",
      boxName: "Deluxe Wellness Box",
      orderId: "#BUDBOX-003",
      orderDate: "10/14/2023, 11 AM",
      status: "Canceled",
    },
    {
      key: "4",
      boxName: "Herbal Healing Box",
      orderId: "#BUDBOX-004",
      orderDate: "10/15/2023, 3 PM",
      status: "Completed",
    },
    {
      key: "5",
      boxName: "Mindful Meditation Box",
      orderId: "#BUDBOX-005",
      orderDate: "10/16/2023, 6 PM",
      status: "Pending",
    },
    {
      key: "6",
      boxName: "Ultimate Relaxation Box",
      orderId: "#BUDBOX-006",
      orderDate: "10/17/2023, 12 PM",
      status: "Completed",
    },
    {
      key: "7",
      boxName: "Rejuvenation Essentials Box",
      orderId: "#BUDBOX-007",
      orderDate: "10/18/2023, 4 PM",
      status: "Completed",
    },
    {
      key: "8",
      boxName: "Calm & Serenity Box",
      orderId: "#BUDBOX-008",
      orderDate: "10/19/2023, 5 PM",
      status: "Pending",
    },
    {
      key: "9",
      boxName: "Balance & Harmony Box",
      orderId: "#BUDBOX-009",
      orderDate: "10/20/2023, 6 PM",
      status: "Completed",
    },
    {
      key: "10",
      boxName: "Peaceful Retreat Box",
      orderId: "#BUDBOX-010",
      orderDate: "10/21/2023, 7 PM",
      status: "Canceled",
    },
  ];

  const columns = [
    {
      title: "#SI",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => index + 1, // Auto-generate index
    },
    {
      title: "Box Name",
      dataIndex: "boxName",
      key: "boxName",
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <button
          className={`px-3 py-1 text-white rounded-lg ${
            status === "Completed"
              ? "bg-green-600"
              : status === "Pending"
              ? "bg-yellow-500"
              : "bg-red-600"
          } text-xs`}
        >
          {status}
        </button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsInfoCircle
            onClick={() => handleView(record)}
            size={18}
            className="text-[#111111] cursor-pointer"
          />
        </Space>
      ),
    },
  ];

  const handleView = (record) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    let queryParams = [];
    const { username } = values;
    if (date) {
      queryParams.push({ name: "date", value: date });
    }
    if (username) {
      queryParams.push({ name: "userName", value: username });
    }
    // setParams(queryParams); // You can use this to pass params to an API call
  };

  const handleDate = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <section className="w-full py-5">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-xl font-semibold mb-2 sm:mb-0">Orders</h1>
        <Form
          layout="inline"
          onFinish={onFinish}
          className="flex flex-wrap gap-2"
        >
          <Item className="w-full sm:w-auto">
            <DatePicker placeholder="Date" onChange={handleDate} />
          </Item>
          <Item name="username" className="w-full sm:w-auto">
            <Input placeholder="User name" />
          </Item>
          <Item className="w-full sm:w-auto">
            <button
              type="submit"
              className="rounded-full flex justify-center items-center bg-[#111111] text-white p-2"
            >
              <IoIosSearch size={18} />
            </button>
          </Item>
        </Form>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#111111",
              headerColor: "white",
              headerBorderRadius: 2,
            },
          },
        }}
      >
        <div className="overflow-x-auto">
          <Table
            pagination={{
              position: ["bottomCenter"],
              pageSize: 5,
              current: currentPage,
              onChange: setCurrentPage,
            }}
            columns={columns}
            dataSource={dataSource}
            rowKey="orderId"
            scroll={{ x: "max-content" }} // Enables horizontal scrolling
            responsive={{ xs: true, sm: true, md: true, lg: true, xl: true }} // Adjust the responsiveness of columns
          />
        </div>
      </ConfigProvider>

      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="text-black bg-primary">
          <h1 className="text-center text-2xl font-semibold my-2">
            Order Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3 border-b">
              <h1>Order ID :</h1>
              <p>{selectedOrder?.orderId || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <h1>Box Name :</h1>
              <p>{selectedOrder?.boxName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <h1>Order Date :</h1>
              <p>{selectedOrder?.orderDate || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <h1>Status :</h1>
              <p>{selectedOrder?.status || "N/A"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Orders;
