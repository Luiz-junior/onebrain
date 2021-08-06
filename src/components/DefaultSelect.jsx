import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Select, Button } from "antd";
import { useHistory } from "react-router-dom";

import { Container, Title, SelectContainer } from "./styles";

const { Option } = Select;

function DefaultSelect({
  title,
  handleChange,
  listData,
  textBtn,
  nextPage,
  recommendSelected,
  loading,
}) {
  const history = useHistory();

  return (
    <Container>
      <Title>{title}</Title>
      <SelectContainer>
        <Select style={{ width: 180 }} onChange={handleChange}>
          {!loading &&
            listData.length &&
            listData.map((d) => (
              <Option key={d.id} value={d.name}>
                {d.name}
              </Option>
            ))}
        </Select>
        <Button
          type="primary"
          onClick={() => history.push(nextPage, { recommendSelected })}
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
  listData: PropTypes.array.isRequired,
  textBtn: PropTypes.string.isRequired,
  nextPage: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DefaultSelect;
