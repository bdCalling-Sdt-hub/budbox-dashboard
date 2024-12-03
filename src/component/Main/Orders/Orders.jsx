import { useState } from "react";
import { ConfigProvider, Modal, Select, Space, Table, Tag } from "antd";
import {
  useGetOrdersQuery,
  useUpdateOderMutation,
} from "../../../redux/features/orders/ordersApi";
import { PiEyeClosedBold } from "react-icons/pi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { toast } from "sonner";
const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: responseData } = useGetOrdersQuery({
    page: currentPage,
    limit: 10,
  });

  const [updateOrderStatus] = useUpdateOderMutation(); // mutation to update status

  const dataSource = responseData?.map((order, index) => {
    return {
      key: index + 1,
      orderId: order?._id,
      customerName: order?.userId[0]?.fullName || "N/A",
      customerEmail: order?.userId[0]?.email || "N/A",
      customerImage: order?.userId[0]?.image?.url || "",
      totalAmount: `$${order?.paymentId[0]?.amount || "0.00"}`,
      budboxs: order?.budboxs || [],
      address:
        `${order?.addressId[0]?.street1}, ${order?.addressId[0]?.city}, ${order?.addressId[0]?.state}, ${order?.addressId[0]?.country}, ${order?.addressId[0]?.zip}` ||
        "N/A",
      boxQuantity: order?.budboxs?.length || 0,
      status: order?.status || "N/A",
    };
  });

  const handleStatusChange = async (value, orderId) => {
    try {
      const res = await updateOrderStatus({
        id: orderId,
        data: { status: value },
      }).unwrap();
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const getAvailableStatusOptions = (currentStatus) => {
    const statusOptions = ["pending", "progress", "completed"];
    let disabledOptions = [];

    // Handling different status conditions
    switch (currentStatus) {
      case "pending":
        // If it's pending, no options are disabled.
        disabledOptions = [];
        break;
      case "progress":
        // If it's in progress, "pending" can't be selected.
        disabledOptions = ["pending"];
        break;
      case "completed":
        // If it's completed, "pending" and "progress" can't be selected.
        disabledOptions = ["pending", "progress"];
        break;
      default:
        // If the status is unknown, disable everything.
        disabledOptions = statusOptions;
        break;
    }

    return statusOptions.map((status) => ({
      label: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize the first letter
      value: status,
      disabled: disabledOptions.includes(status),
    }));
  };


  const columns = [
    {
      title: "#SI",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Box Quantity",
      dataIndex: "boxQuantity",
      key: "boxQuantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "orange"
              : status === "completed"
                ? "green"
                : "red"
          }
          className="text-xs uppercase p-2 rounded-lg"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Select
            value={record.status}
            onChange={(value) => handleStatusChange(value, record?.orderId)}
            options={getAvailableStatusOptions(record.status)}
            style={{ width: 160 }}
          />
        );
      },
    },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <Space size="middle">
          <PiEyeClosedBold
            onClick={() => handleView(record)}
            className="size-6 cursor-pointer"
          />
        </Space>
      ),
    },
  ];

  const handleView = (record) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  return (
    <section className="w-full py-5">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-xl font-semibold mb-2 sm:mb-0">Orders</h1>
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
        title={<h1 className="text-2xl font-semibold mb-2">Order Details</h1>}
        open={isModalOpen}
        width={600}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="text-black bg-primary">
          <img
            src={`${imageBaseUrl}${selectedOrder?.customerImage}`}
            alt={selectedOrder?.customerName}
            className="size-20 rounded-full mx-auto object-cover"
          />
          <h2 className="text-center text-lg font-semibold my-2">
            {selectedOrder?.customerName}
          </h2>
          <ConfigProvider theme={{}}>
            <Table
              columns={[
                {
                  title: "#SI",
                  dataIndex: "key",
                  key: "key",
                },
                {
                  title: "Box Name",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                },
                {
                  title: "Price",
                  dataIndex: "price",
                  key: "price",
                },
              ]}
              dataSource={selectedOrder?.budboxs?.map((box, i) => ({
                key: i + 1,
                name: box?.name,
                quantity: box?.quantity,
                price: box?.discountPrice,
              }))}
              pagination={false}
              rowKey="orderId"
              scroll={{ x: "max-content" }} // Enables horizontal scrolling
              responsive={{ xs: true, sm: true, md: true, lg: true, xl: true }} // Adjust the responsiveness of columns
            />
          </ConfigProvider>
        </div>
      </Modal>
    </section>
  );
};

export default Orders;
