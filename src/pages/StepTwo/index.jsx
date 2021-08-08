import React, { useContext, useEffect, useState } from "react";
import { Radio, Button } from "antd";

import api from "../../services/api";
import { OrderContext } from "../../contexts/OrderContext";
import { Container, Title, RadioContainer } from "./styles";

function StepTwo({ history }) {
  const { orders, setOrders, sizeList } = useContext(OrderContext);

  const [newPoints, setNewPoints] = useState(0);
  const [itemSelected, setItemSelected] = useState(false);

  const { location } = history;

  useEffect(() => {
    api
      .get("/benefit-points")
      .then((res) => {
        setNewPoints(res.data);
      })
      .catch((error) => {
        console.log("error ", error);
      });
  }, []);

  const handleChange = (e) => {
    setOrders({ ...orders, size: e.target.value });
  };

  return (
    <Container>
      <Title>Escolha o tamanho</Title>
      <RadioContainer>
        <Radio.Group onChange={handleChange}>
          {sizeList.length &&
            sizeList.map((d) => (
              <div key={d.id}>
                <Radio value={d.name} onClick={() => setItemSelected(true)}>
                  {d.name}
                </Radio>
              </div>
            ))}
        </Radio.Group>
        <Button
          type="primary"
          onClick={() => history.push("/step-three")}
          style={{ width: 180, marginTop: 10 }}
          disabled={!itemSelected}
        >
          Continuar
        </Button>
      </RadioContainer>
      <div style={{ marginTop: 10 }}>
        {location.state.recommendSelected && (
          <span>
            Você recebeu <b>{newPoints.quantity} pontos benefício </b>
          </span>
        )}
      </div>
    </Container>
  );
}

export default StepTwo;
