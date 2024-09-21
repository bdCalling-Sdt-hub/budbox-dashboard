import { useState } from "react";
import { Modal, Space, Table } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const RecentTransactions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const data = [
    {
      key: "1",
      transactionId: "12345678",
      userName: "Enrique",
      boxPackage: "Basic",
      amount: "$250",
      date: "16 Apr 2024",
    },
    {
      key: "2",
      transactionId: "12345678",
      userName: "Enrique",
      boxPackage: "Basic",
      amount: "$250",
      date: "16 Apr 2024",
    },
    {
      key: "3",
      transactionId: "12345678",
      userName: "Enrique",
      boxPackage: "Basic",
      amount: "$250",
      date: "16 Apr 2024",
    },
    {
      key: "4",
      transactionId: "12345678",
      userName: "Enrique",
      boxPackage: "Basic",
      amount: "$250",
      date: "16 Apr 2024",
    },
    {
      key: "5",
      transactionId: "12345678",
      userName: "Enrique",
      boxPackage: "Basic",
      amount: "$250",
      date: "16 Apr 2024",
    },
  ];

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
      title: "#Tr.ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Box Package",
      dataIndex: "boxPackage",
      key: "boxPackage",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => text ? moment(text).format('DD MMM YYYY') : "N/A",
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
    <div className="w-full col-span-full md:col-span-6 bg-white rounded-lg p-5">
      <h2 className="font-semibold py-3">Recent Transactions</h2>
      <Table columns={columns} dataSource={data} pagination={false} />

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-black bg-primary">
          <h1 className="text-center text-2xl font-semibold my-2">Transaction Details</h1>
          <div className="p-5">
            <div className="flex justify-between py-3">
              <p>Transaction ID</p>
              <p>{selectedTransaction?.transactionId || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>User Name</p>
              <p>{selectedTransaction?.userName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Box Package</p>
              <p>{selectedTransaction?.boxPackage || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Amount</p>
              <p>{selectedTransaction?.amount || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Date</p>
              <p>{selectedTransaction?.date ? moment(selectedTransaction.date).format('DD MMM YYYY') : "N/A"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecentTransactions;
