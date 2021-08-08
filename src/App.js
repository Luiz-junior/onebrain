import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "antd/dist/antd.css";
import styles from "styled-components";

import api from "./services/api";
import { OrderProvider } from "./contexts/OrderContext";

import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";
import OrderCompleted from "./pages/OrderCompleted";

const Container = styles.div`
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-width: 400px;

`;

function App() {
  const [orders, setOrders] = useState({});
  const [doughList, setDoughList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [stuffingList, setStuffingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onGetDough() {
      api
        .get("/dough")
        .then((res) => {
          setLoading(false);
          setDoughList(res.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error ", error);
        });
    }

    function onGetSize() {
      api
        .get("/size")
        .then((res) => {
          setSizeList(res.data);
        })
        .catch((error) => {
          console.log("error ", error);
        });
    }

    function onGetStuffing() {
      api
        .get("/stuffing")
        .then((res) => {
          setStuffingList(res.data);
        })
        .catch((error) => {
          console.log("error ", error);
        });
    }

    onGetDough();
    onGetSize();
    onGetStuffing();
  }, [loading]);

  const valueProvider = {
    orders,
    setOrders,
    doughList,
    setDoughList,
    sizeList,
    setSizeList,
    stuffingList,
    setStuffingList,
    loading,
  };

  return (
    <Container>
      <OrderProvider value={valueProvider}>
        <Router>
          <Switch>
            <Route path="/" exact component={StepOne} />
            <Route path="/step-two" component={StepTwo} />
            <Route path="/step-three" component={StepThree} />
            <Route path="/order-completed" component={OrderCompleted} />
          </Switch>
        </Router>
      </OrderProvider>
    </Container>
  );
}

export default App;
