import { useState } from "react";
import { Modal, Space, Table } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useGetEarningsQuery } from "../../../redux/features/earnings/earningsApi";

const RecentTransactions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { data: recentTransactionsData } = useGetEarningsQuery({
    page: 1,
    limit: 10,
  });

  const transformedData =
    recentTransactionsData?.data?.map((transaction, index) => ({
      key: index + 1,
      transactionId: transaction.id,
      userName: `${transaction.userId.firstName} ${transaction.userId.lastName}`,
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
      title: "#Tr.ID",
      dataIndex: "transactionId",
      key: "transactionId",
      responsive: ["sm"],
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

  console.log(recentTransactionsData);
  return (
    <div className="w-full col-span-full md:col-span-6 bg-white rounded-lg p-5">
      <h2 className="font-semibold py-3">Recent Transactions</h2>
      <Table
        columns={columns}
        dataSource={transformedData}
        pagination={false}
        scroll={{ x: 500 }} /* Enables horizontal scrolling on small screens */
      />

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
              <p>Transaction ID :</p>
              <p>{selectedTransaction?.transactionId || "N/A"}</p>
            </div>
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
    </div>
  );
};

export default RecentTransactions;
