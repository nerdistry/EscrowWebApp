import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/orders/orderSlice';


const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.order.orders);
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data1 = [];

  if (orderState !== null) {
    orderState.forEach((order, index) => {
      const prod = order.products.map((product, index) => (
        <ul key={index}>
          <li>{product.product.title}</li>
        </ul>
      ));

      const name = order.orderBy ? order.orderBy.firstname : "";

      data1.push({
        key: index + 1,
        name: name,
        product: prod,
        amount: order.paymentIntent.amount,
        date: new Date(order.createdAt).toLocaleDateString(),
        action: (
          <>
            <Link className="fs-3 text-primary">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger">
              <BiTrash />
            </Link>
          </>
        ),
      });
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};



export default Orders;
