import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import { OrderContext } from "../../contexts/OrderContext";
import { Container, Title, Subtitle, OrderDetails } from "./styles";

function OrderCompleted() {
  const { orders } = useContext(OrderContext);

  const { dough, size, stuffing } = orders;

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [newOrder, setNewOrder] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!newOrder) {
      api
        .post("/orders", { dough, size, stuffing })
        .then((res) => {
          setNewOrder(res.data);
          setOrderSuccess(true);
        })
        .catch((err) => setError(err));
    }
  }, []);

  return (
    <Container>
      {orderSuccess ? (
        <>
          <Title>Pedido efetuado</Title>
          <Subtitle>Detalhes do pedido:</Subtitle>
          <OrderDetails>
            <span>
              N°: <b>{newOrder.id}</b>
            </span>
            <span>
              Massa: <b>{newOrder.dough}</b>
            </span>
            <span>
              Tamanho: <b>{newOrder.size}</b>
            </span>
            <span>
              Recheio: <b>{newOrder.stuffing}</b>
            </span>
          </OrderDetails>
        </>
      ) : (
        <>
          <Title>Ocorreu um erro :(</Title>
          <Subtitle>{error}</Subtitle>
        </>
      )}
    </Container>
  );
}

export default OrderCompleted;
