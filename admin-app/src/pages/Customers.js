import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const customers = useSelector((state) => state.users.customers);
  console.log(customers);
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "First name",
      dataIndex: "firstname",
      defaultSortOrder: "descend",
      sorter: (a, b) => (a.firstname ? a.firstname.length : 0) - (b.firstname ? b.firstname.length : 0),
    },
    
    {
      title: "Last name",
      dataIndex: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
  ];
  const data1 = [];
  if (Array.isArray(customers) && customers.length > 0) {
    for (let i = 0; i < customers.length; i++) {
      if (customers[i]?.role !== "admin") {
        data1.push({
          key: i,
          firstname: customers[i]?.firstname,
          lastname: customers[i]?.lastname,
          email: customers[i]?.email,
          mobile: customers[i]?.mobile,
        });
      }
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        {Array.isArray(customers) && customers.length > 0 ? (
          <Table columns={columns} dataSource={data1} />
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
