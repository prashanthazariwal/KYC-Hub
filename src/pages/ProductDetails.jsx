import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import { addToCompare } from "../store/slices/compareSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const { products, loading } = useSelector((state) => state.products);
  const { compareProducts } = useSelector((state) => state.compare);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail) => (
        <img src={thumbnail} alt="" style={{ width: "70px", height: "50px" }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price}`,
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (discount) => `${discount}%`,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [...new Set(products.map((item) => item.category))].map(
        (category) => ({
          text: category,
          value: category,
        })
      ),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Compare",
      key: "compare",
      render: (_, record) => (
        <button
          onClick={() => {
            console.log("clicked");
            dispatch(addToCompare(record));
            navigate("/compare");
          }}
          disabled={compareProducts.some((p) => p.id === record.id)}
        >
          {compareProducts.some((p) => p.id === record.id)
            ? "Added"
            : "Compare"}
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
      }}
    />
  );
};

export default ProductDetails;
