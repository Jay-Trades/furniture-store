import React from "react";

const OrderList = ({ orders, meta }) => {
  return (
    <div className="container mx-auto p-4">
      <h4 className="mb-4 capitalize">
        total orders : {meta.pagination.total}
      </h4>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.attributes.name}</td>
                <td>{order.attributes.address}</td>
                <td>{order.attributes.cartItems.length}</td>
                <td>{order.attributes.orderTotal}</td>
                <td>{new Date(order.attributes.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
