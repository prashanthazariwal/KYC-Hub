import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import {
  removeFromCompare,
  clearCompare,
  addToCompare,
} from "../store/slices/compareSlice";
import { useState } from "react";
import CustomModal from "../components/CustomModal";

const CompareProducts = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { compareProducts } = useSelector((state) => state.compare);
  const { products } = useSelector((state) => state.products);

  const features = [
    { key: "title", label: "Product Name" },
    { key: "brand", label: "Brand" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "discountPercentage", label: "Discount" },
    { key: "description", label: "Description" },
  ];

  const modalColumns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.thumbnail}
            alt={text}
            className="w-10 h-10 object-cover rounded"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const isAlreadyAdded = compareProducts.some((p) => p.id === record.id);
        return (
          <button
            className={`px-4 py-2 rounded ${
              isAlreadyAdded || compareProducts.length >= 4
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={isAlreadyAdded || compareProducts.length >= 4}
            onClick={() => handleAddToCompare(record)}
          >
            {isAlreadyAdded ? "Already Added" : "Add to Compare"}
          </button>
        );
      },
    },
  ];

  const compareColumns = [
    {
      title: "Features",
      dataIndex: "feature",
      key: "feature",
      width: 150,
      fixed: "left",
    },
    ...compareProducts.map((product, index) => ({
      title: (
        <div className="text-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-24 h-24 object-cover mx-auto rounded"
          />
          <button
            onClick={() => dispatch(removeFromCompare(product.id))}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ),
      dataIndex: `product${index}`,
      key: `product${index}`,
      width: 200,
      render: (text) => <div className="text-center">{text}</div>,
    })),
  ];

  const compareData = features.map(({ key, label }) => ({
    key,
    feature: label,
    ...compareProducts.reduce((acc, product, index) => {
      acc[`product${index}`] =
        key === "price"
          ? `$${product[key]}`
          : key === "discountPercentage"
          ? `${product[key]}%`
          : product[key];
      return acc;
    }, {}),
  }));

  const handleAddToCompare = (product) => {
    dispatch(addToCompare(product));
    setIsModalOpen(false);
  };

  const availableProducts = products.filter(
    (product) => !compareProducts.some((p) => p.id === product.id)
  );

  if (compareProducts.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">No products to compare</h2>
        <p className="text-gray-600 mb-4">
          Please add some products to compare from the product list.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add Products to Compare
        </button>

        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Products to Compare"
        >
          <Table
            columns={modalColumns}
            dataSource={products}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </CustomModal>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Compare Products ({compareProducts.length})
        </h2>
        <div className="space-x-3">
          <button
            className={`px-4 py-2 rounded ${
              compareProducts.length >= 4
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => setIsModalOpen(true)}
            disabled={compareProducts.length >= 4}
          >
            Add More
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => dispatch(clearCompare())}
          >
            Clear All
          </button>
        </div>
      </div>

      <Table
        columns={compareColumns}
        dataSource={compareData}
        pagination={false}
        scroll={{ x: true }}
        bordered
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Products to Compare"
      >
        <Table
          columns={modalColumns}
          dataSource={availableProducts}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </CustomModal>
    </div>
  );
};

export default CompareProducts;
