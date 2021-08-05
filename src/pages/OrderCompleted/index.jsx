import React, { useContext, useEffect } from "react";
import { Select } from "antd";

import { OrderContext } from "../../contexts/OrderContext";
// import { Container } from './styles';

function OrderCompleted() {
  const { order } = useContext(OrderContext);

  return (
    <div>
      <h1>Pedido efetuado</h1>
      <h2>Detalhes do pedido:</h2>
    </div>
  );
}

export default OrderCompleted;
