import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import { OrderContext } from "../../contexts/OrderContext";
import DefaultSelect from "../../components/DefaultSelect";
import { Container, RecommendContainer } from "./styles";

function StepOne() {
  const { orders, setOrders, doughList, loading } = useContext(OrderContext);

  const [recommendationList, setRecommendationList] = useState([]);
  const [randomRecommendation, setRandomRecommendation] = useState({});
  const [recommendationSelected, setRecommendationSelected] = useState(false);

  useEffect(() => {
    if (recommendationList.length > 0) {
      setRandomRecommendation(
        recommendationList[(Math.random() * recommendationList.length) | 0]
      );
    }
  }, [recommendationList]);

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

  const handleChange = (value) => {
    setOrders({ ...orders, dough: value });

    if (value === randomRecommendation.name) {
      setRecommendationSelected(true);
    } else {
      setRecommendationSelected(false);
    }
  };

  return (
    <Container>
      <DefaultSelect
        title="Escolha a massa da pizza"
        handleChange={handleChange}
        listData={doughList}
        textBtn="Continuar"
        nextPage="/step-two"
        recommendSelected={recommendationSelected}
        loading={loading}
      />
      <RecommendContainer>
        Recomendação do dia: <b> {randomRecommendation.name}</b>
      </RecommendContainer>
    </Container>
  );
}

export default StepOne;
