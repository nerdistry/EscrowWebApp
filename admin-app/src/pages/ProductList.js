import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import{ BiEdit, BiTrash } from 'react-icons/bi'
import { getProducts } from '../features/product/productSlice';

const ProductList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
  },[dispatch])
  const productState =useSelector((state) => state.product.products)
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        if (!a.title || !b.title) {
          return 0;
        }
        return a.title.length - b.title.length;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        if (!a.price || !b.price) {
          return 0;
        }
        return a.price.length - b.price.length;
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        if (!a.category || !b.category) {
          return 0;
        }
        return a.category.length - b.category.length;
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        if (!a.brand || !b.brand) {
          return 0;
        }
        return a.brand.length - b.brand.length;
      },
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  
      const data1 = [];
      for (let i = 0; i < productState.length; i++) {
        data1.push({
          key: i + 1,
          title: productState[i].title,
          price: `$ ${productState[i].price}`,
          category: productState[i].category,
          brand: productState[i].brand,
         // color: productState[i].color,
          quantity: productState[i].quantity,
          action: <> <Link className='fs-3 text-primary'><BiEdit /></Link>  <Link className='ms-3 fs-3 text-danger'><BiTrash /></Link></>
         
        });
      }
  return (
    <div>
    <h3 className="mb-4 title">Products</h3>
    <div>
    <Table  columns={columns} dataSource={data1} />
    </div>
</div>
  );
}

export default ProductList;
