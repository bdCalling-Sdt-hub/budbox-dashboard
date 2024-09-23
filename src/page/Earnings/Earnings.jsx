/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Table, Modal, Input, DatePicker, ConfigProvider, Form } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { IoIosSearch } from "react-icons/io";
import moment from "moment";
import { PiCurrencyCircleDollar } from "react-icons/pi";

const { Item } = Form;

const Earnings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const dataSource = [
    {
      key: "1",
      trxId: "#12345678",
      userName: "tom",
      date: "22 Jan, 2024",
      amount: "$202",
      boxName: "Budboxes",
      user: {
        name: "Tom",
        email: "tom@example.com",
        phone: "555-1234",
        address: "123 Main St",
        gender: "Male",
        createdAt: "2024-01-22",
      },
    },
    {
      key: "2",
      trxId: "#87654321",
      userName: "jane",
      date: "23 Jan, 2024",
      amount: "$300",
      boxName: "Flowerboxes",
      user: {
        name: "Jane",
        email: "jane@example.com",
        phone: "555-5678",
        address: "456 Maple Ave",
        gender: "Female",
        createdAt: "2024-01-23",
      },
    },
    // Add more entries as needed
  ];

  const columns = [
    {
      title: "#Trx ID",
      dataIndex: "trxId",
      key: "trxId",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text) => (
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="avatar"
          />
          {text}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Box Name",
      dataIndex: "boxName",
      key: "boxName",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <InfoCircleOutlined
          className="cursor-pointer text-xl"
          onClick={() => showModal(record)}
        />
      ),
    },
  ];

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section>
      <div className="bg-black text-white w-72 p-5 rounded-md my-6 flex  gap-2">
        <PiCurrencyCircleDollar className="size-16 text-[#f7cc50]" />
        <div className="space-y-2">
          <p className="text-[16px] font-semibold">Total Earnings</p>
          <p className="text-2xl font-bold">$24.88K</p>
        </div>
      </div>
      <div className="bg-white rounded-lg">
        <div className="flex justify-between items-center p-5">
          <h1 className="text-xl font-semibold">All Earnings List</h1>
          <Form layout="inline" className="flex space-x-4">
            <Item name="date">
              <DatePicker
                className="rounded-md"
                onChange={(date) => setSelectedDate(date)}
                placeholder="Select Date"
              />
            </Item>
            <Item name="username">
              <Input
                className="rounded-md"
                placeholder="User Name"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Item>
            <Item>
              <button className="size-8 rounded-full flex justify-center items-center bg-[#111111] text-white">
                <IoIosSearch className="size-5" />
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
          <Table
            className="shadow-sm"
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5, position: ["bottomCenter"] }}
          />
        </ConfigProvider>
      </div>

      {/* User Details Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-black bg-primary">
          <h1 className="text-center text-2xl font-semibold my-2">
            Transaction Details
          </h1>
          <div>
            <div className="flex justify-between py-3 border-b">
              <p>User Name :</p>
              <p>{selectedRecord?.user?.name || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Email :</p>
              <p>{selectedRecord?.user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Phone Number :</p>
              <p>{selectedRecord?.user?.phone || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Address :</p>
              <p>{selectedRecord?.user?.address || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Gender :</p>
              <p>{selectedRecord?.user?.gender || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Joining Date :</p>
              <p>
                {selectedRecord?.user?.createdAt
                  ? moment(selectedRecord.user.createdAt).format("DD MMM YYYY")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Earnings;
