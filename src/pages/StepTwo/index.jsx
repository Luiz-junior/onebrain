import React, { useContext } from "react";
import { Radio, Button } from "antd";

import { OrderContext } from "../../contexts/OrderContext";
import { Container, Title, RadioContainer } from "./styles";

function StepTwo({ history }) {
  const { order, setOrder, sizeList } = useContext(OrderContext);

  const { location } = history;

  const handleChange = (e) => {
    setOrder({ ...order, size: e.target.value });
  };

  return (
    <Container>
      <Title>Escolha o tamanho</Title>
      <RadioContainer>
        <Radio.Group onChange={handleChange}>
          {sizeList.length &&
            sizeList.map((d) => (
              <div key={d.id}>
                <Radio value={d.name}>{d.name}</Radio>
              </div>
            ))}
        </Radio.Group>
        <Button
          type="primary"
          onClick={() => history.push("/step-three")}
          style={{ width: 180, marginTop: 10 }}
        >
          Continuar
        </Button>
      </RadioContainer>
      <div style={{ marginTop: 10 }}>
        {location.state.recommendSelected && "Você recebeu 20 pontos benefício"}
      </div>
    </Container>
  );
}

export default StepTwo;
