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
// import { useGetUsersQuery } from "../../../redux/features/users/usersApi";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";

const { Item } = Form;

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [params, setParams] = useState([]);
  const [date, setDate] = useState("");
  // const [allUser, setAllUser] = useState([]);
  const [user, setUser] = useState(null);
  // const { data, isFetching, isError, error } = useGetUsersQuery(params);

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

  // const dataSource = allUser?.map((user, index) => ({
  //     key: user._id,
  //     si: index + 1,
  //     name: user?.name,
  //     email: user?.email,
  //     phone: user?.phone,
  //     createdAt: user?.createdAt,
  // }))

  const dataSource = [
    {
      key: "1",
      si: 1,
      name: "Md Rakib Islam",
      email: "rakib2020.tkg@gmail.com",
      phone: "+8801319101179",
      address: "Thakurgaon Sadar Thakurgaon",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
    {
      key: "2",
      si: 2,
      name: "Md Rakib Islam",
      email: "rakib2020.tkg@gmail.com",
      phone: "+8801319101179",
      address: "Thakurgaon Sadar Thakurgaon",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
    {
      key: "1",
      si: 1,
      name: "Md Rakib Islam",
      email: "rakib2020.tkg@gmail.com",
      phone: "+8801319101179",
      address: "Thakurgaon Sadar Thakurgaon",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
    {
      key: "2",
      si: 2,
      name: "Md Rakib Islam",
      email: "rakib2020.tkg@gmail.com",
      phone: "+8801319101179",
      address: "Thakurgaon Sadar Thakurgaon",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
    {
      key: "1",
      si: 1,
      name: "Md Rakib Islam",
      email: "rakib2020.tkg@gmail.com",
      phone: "+8801319101179",
      address: "Thakurgaon Sadar Thakurgaon",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
    {
      key: "2",
      si: 2,
      name: "Md Rakib Islam",
      email: "rakib2020.tkg@gmail.com",
      phone: "+8801319101179",
      address: "Thakurgaon Sadar Thakurgaon",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
    {
      key: "1",
      si: 1,
      name: "Md Rakib Islam",
      email: "rakib2020.tkg@gmail.com",
      phone: "+8801319101179",
      address: "Thakurgaon Sadar Thakurgaon",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
    {
      key: "2",
      si: 2,
      name: "Md Rakib Islam",
      email: "rakib2020.tkg@gmail.com",
      phone: "+8801319101179",
      address: "Thakurgaon Sadar Thakurgaon",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
  ];

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "index",
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
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
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

  const onFinish = (values) => {
    let queryParams = [];
    const { username, providername } = values;
    if (date) {
      queryParams.push({ name: "date", value: date });
    }
    if (username) {
      queryParams.push({ name: "userName", value: username });
    }
    if (providername) {
      queryParams.push({ name: "providerName", value: providername });
    }
    // setParams(queryParams);
  };

  const handleDate = (date, dateString) => {
    setDate(dateString);
  };
  // useEffect(() => {
  //     if (isError && error) {
  //         setAllUser([])
  //     } else if (data) {
  //         setAllUser(data?.data?.attributes)
  //     }
  // }, [data, isError, error])
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Users List</h1>
        <Form
          className="flex px-3 py-[22px] justify-between items-center"
          layout="inline"
          onFinish={onFinish}
        >
          <Item>
            <DatePicker placeholder="Date" onChange={handleDate} />
          </Item>
          <Item name="username">
            <Input placeholder="User name" />
          </Item>
          <Item>
            <button className=" size-8 rounded-full flex justify-center items-center bg-[#111111] text-white">
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
          // loading={isFetching}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            onChange: setCurrentPage,
          }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
        />
      </ConfigProvider>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="text-black bg-primary">
          <div className="size-28 border rounded-full mx-auto">
            {/* <img src="" alt="" /> */}
          </div>
          <h1 className="text-center text-2xl font-semibold my-2">
            User Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3">
              <p>User Name</p>
              <p>{user?.name || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Email</p>
              <p>{user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Phone Number</p>
              <p>{user?.phone || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Address</p>
              <p>{user?.address || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Gender</p>
              <p>{user?.gender || "N/A"}</p>
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
