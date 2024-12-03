/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  ConfigProvider,
  Modal,
  Space,
  Table
} from "antd";
import { BsInfoCircle } from "react-icons/bs";
import moment from "moment";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [user, setUser] = useState(null);

  const { data, isFetching, isError, error } = useGetAllUsersQuery({
    page: currentPage,
    limit: pageSize,
  });

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

  const dataSource = allUser?.map((user, index) => ({
    key: user.id,
    si: index + 1,
    name: user?.fullName,
    email: user?.email,
    address: user?.address_line1,
    image: user?.image?.url,
    phone: user?.phone,
    createdAt: user?.createdAt,
  }));

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "index",
      responsive: ["lg"], 

    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={imageBaseUrl + text} alt={text} className="w-10 h-10 rounded-full" />,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (text ? moment(text).format("DD MMM YYYY") : "N/A"),
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


  useEffect(() => {
    if (isError && error) {
      setAllUser([]);
    } else if (data) {
      setAllUser(data?.data?.attributes?.user?.results);
    }
  }, [data, isError, error]);

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">Users List</h1>
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
          loading={isFetching}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.data?.attributes?.user?.totalResults || 0,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
            position: ["bottomCenter"],
          }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          scroll={{ x: "max-content" }} // Enable horizontal scroll on mobile
        />
      </ConfigProvider>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="text-black">
          <img
            className="w-28 h-28 mx-auto rounded-full"
            src={`${imageBaseUrl}${user?.image}`}
            alt="User"
          />
          <h1 className="text-center text-2xl font-semibold my-2">
            User Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3 border-b">
              <p>User Name : </p>
              <p>{user?.name || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Email : </p>
              <p>{user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Phone Number : </p>
              <p>{user?.phone || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Address : </p>
              <p>{user?.address || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Joining Date :</p>
              <p>
                {user?.createdAt
                  ? moment(user.createdAt).format("DD MMM YYYY")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Users;
