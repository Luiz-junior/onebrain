import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

import api from "./services/api";
import { OrderProvider } from "./contexts/OrderContext";

import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";
import OrderCompleted from "./pages/OrderCompleted";

function App() {
  const [order, setOrder] = useState({});
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
    order,
    setOrder,
    doughList,
    setDoughList,
    sizeList,
    setSizeList,
    stuffingList,
    setStuffingList,
    loading,
  };

  return (
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
  );
}

export default App;
