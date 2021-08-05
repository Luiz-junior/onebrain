import React, { useContext, useEffect } from "react";

import { OrderContext } from "../../contexts/OrderContext";
import DefaultSelect from "../../components/DefaultSelect";
import { Container } from "./styles";

function StepTwo() {
  const { order, setOrder, stuffingList, loading } = useContext(OrderContext);

  useEffect(() => {
    console.log("selecionado ", order);
  }, [order]);

  const handleChange = (value) => {
    setOrder({ ...order, stuffing: value });
  };

  return (
    <Container>
      <DefaultSelect
        title="Escolha o tamanho"
        handleChange={handleChange}
        listaData={stuffingList}
        textBtn="Finalizar pedido"
        nextPage="/order-completed"
        loading={loading}
      />
    </Container>
  );
}

export default StepTwo;
