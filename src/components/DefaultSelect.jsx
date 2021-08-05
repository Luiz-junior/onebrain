import React from "react";
import PropTypes from "prop-types";
import { Select, Button } from "antd";
import { useHistory } from "react-router-dom";

import { Container, Title, SelectContainer } from "./styles";

const { Option } = Select;

function DefaultSelect({
  title,
  handleChange,
  listaData,
  textBtn,
  nextPage,
  loading,
}) {
  const history = useHistory();

  return (
    <Container>
      <Title>{title}</Title>
      <SelectContainer>
        <Select style={{ width: 180 }} onChange={handleChange}>
          {!loading &&
            listaData.length &&
            listaData.map((d) => (
              <Option key={d.id} value={d.id}>
                {d.name}
              </Option>
            ))}
        </Select>
        <Button
          type="primary"
          onClick={() => history.push(nextPage)}
          style={{ width: 180, marginTop: 10 }}
        >
          {textBtn}
        </Button>
      </SelectContainer>
    </Container>
  );
}

DefaultSelect.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  listaData: PropTypes.array.isRequired,
  textBtn: PropTypes.string.isRequired,
  nextPage: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DefaultSelect;
