/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Table,
  Modal,
  Form,
  Space,
  ConfigProvider,
  DatePicker,
  Input,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useGetEarningsQuery } from "../../redux/features/earnings/earningsApi";
import { IoIosSearch } from "react-icons/io";
const Earnings = () => {
   const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { data: recentTransactionsData } = useGetEarningsQuery({
    page: currentPage,
    limit: 10,
  });

  const transformedData =
    recentTransactionsData?.map((transaction, index) => ({
      key: index + 1,
      userName: `${transaction.userId.fullName}`,
      userEmail: transaction.userId.email,
      boxPackage: transaction.budboxs.map((box) => box.name).join(", "),
      amount: `$${transaction.amount}`,
      date: transaction.createdAt,
      user: {
        name: `${transaction.userId.firstName} ${transaction.userId.lastName}`,
        email: transaction.userId.email,
        phone: transaction.userId.phone,
        address: `${transaction.userId.address_line1}, ${transaction.userId.city_locality}`,
        createdAt: transaction.userId.createdAt,
      },
    })) || [];

  const showModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User Email",
      dataIndex: "userEmail",
      key: "userEmail",
      responsive: ["sm"],
    },
    {
      title: "Box Package",
      dataIndex: "boxPackage",
      key: "boxPackage",
      responsive: ["md"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["sm"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (text ? moment(text).format("DD MMM YYYY") : "N/A"),
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <InfoCircleOutlined
            onClick={() => showModal(record)}
            style={{ fontSize: "18px", cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <section className="w-full py-5">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-xl font-semibold mb-2 sm:mb-0">Earnings</h1>
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
          columns={columns}
          dataSource={transformedData}
          scroll={{
            x: "max-content",
          }}
        />
      </ConfigProvider>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ padding: "15px" }}
      >
        <div className="text-black bg-primary">
          <h1 className="text-center text-2xl font-semibold my-2">
            Transaction Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3 border-b">
              <p>User Name :</p>
              <p>{selectedTransaction?.user?.name || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Email :</p>
              <p>{selectedTransaction?.user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Box Package :</p>
              <p>{selectedTransaction?.boxPackage || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Amount :</p>
              <p>{selectedTransaction?.amount || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Order Date :</p>
              <p>
                {selectedTransaction?.date
                  ? moment(selectedTransaction.date).format("DD MMM YYYY")
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
