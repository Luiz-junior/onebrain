import React, { useContext } from "react";

import { OrderContext } from "../../contexts/OrderContext";
import DefaultSelect from "../../components/DefaultSelect";
import { Container } from "./styles";

function StepTwo() {
  const { orders, setOrders, stuffingList, loading } = useContext(OrderContext);

  const handleChange = (value) => {
    setOrders({ ...orders, stuffing: value });
  };

  return (
    <Container>
      <DefaultSelect
        title="Escolha o recheio"
        handleChange={handleChange}
        listData={stuffingList}
        textBtn="Finalizar pedido"
        nextPage="/order-completed"
        loading={loading}
      />
    </Container>
  );
}

export default StepTwo;
