import React from "react";import React from " Orders = () => {
import useSWR from "swr";
import { Table, Tag, Button, Space, message } from "antd";
import { Link } from "react-router-dom";

// Example fetcher
const fetcher = (url) => fetch(`/api/${url}`).then((res) => res.json());
 const { data, error, isLoading, mutate } = useSWR("orders", fetcher);

  // ✅ Update order status
  const updateOrder = async (status, id) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      message.success(`Order marked as ${status}`);
      mutate(); // refresh data
    } catch (err) {
      message.error("Failed to update order");
    }
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders</p>;

  // ✅ Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "dispatched":
        return "blue";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const columns = [
    {
      title: "Customer",
      key: "customer",
      render: (item) => (
        <div>
          <strong>{item?.user?.fullname}</strong>
          <br />
          <span>{item?.user?.email}</span>
        </div>
      ),
    },
    {
      title: "Items",
      key: "items",
      render: (item) => (
        <Link to={`/orders/${item._id}`}>
          {item.products.length} items
        </Link>
      ),
    },
    {
      title: "Amount",
      key: "amount",
      render: (item) => <strong>₹{item.amount}</strong>,
    },
    {
      title: "Status",
      key: "status",
      render: (item) => (
        <Tag color={getStatusColor(item.status)}>
          {item.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (item) => (
        <Space>
          {item.status === "pending" && (
            <Button
              type="primary"
              onClick={() => updateOrder("dispatched", item._id)}
            >
              Dispatch
            </Button>
          )}

          {item.status === "dispatched" && (
            <Button
              type="default"
              onClick={() => updateOrder("delivered", item._id)}
            >
              Mark Delivered
            </Button>
          )}

          {item.status !== "cancelled" && (
            <Button
              danger
              onClick={() => updateOrder("cancelled", item._id)}
            >
              Cancel
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Orders Management</h2>
      <Table
        columns={columns}
        dataSource={data || []}
        rowKey="_id"
        bordered
      />
    </div>
  );
};

export default Orders;
