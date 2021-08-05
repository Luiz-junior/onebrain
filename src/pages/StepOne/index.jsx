import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import { OrderContext } from "../../contexts/OrderContext";
import DefaultSelect from "../../components/DefaultSelect";
import { Container } from "./styles";

function StepOne() {
  const { order, setOrder, doughList, loading } = useContext(OrderContext);

  const [recommendationList, setRecommendationList] = useState([]);
  const [randomRecommendation, setRandomRecommendation] = useState({});

  useEffect(() => {
    if (recommendationList.length > 0) {
      setRandomRecommendation(
        recommendationList[(Math.random() * recommendationList.length) | 0]
      );
    }
  }, [recommendationList]);

  console.log("randomRecommendation ", randomRecommendation);

  useEffect(() => {
    api
      .get("/recommendation")
      .then((res) => {
        setRecommendationList(res.data);
      })
      .catch((error) => {
        console.log("error ", error);
      });
  }, []);

  const handleChange = (id) => {
    setOrder({ ...order, id: 2, idDough: id });
  };

  return (
    <Container>
      <DefaultSelect
        title="Escolha a massa da pizza"
        handleChange={handleChange}
        listaData={doughList}
        textBtn="Continuar"
        nextPage="/step-two"
        loading={loading}
      />
      <div>
        <b>Recomendação do dia: {randomRecommendation.name}</b>
      </div>
    </Container>
  );
}

export default StepOne;
