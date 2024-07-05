import React from 'react'
import styled from '@emotion/styled'

const StyledSelectButton = styled.span`
  border: 1px solid #F6B17A;
  border-radius: 5px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: Madimi One;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#F6B17A' : '')};
  color: ${({ selected }) => (selected ? 'black' : '')};
  font-weight: ${({ selected }) => (selected ? '700' : '500')};
  &:hover {
    background-color: #F6B17A;
    color: black;
  }
  width: 22%;
`;

const SelectButton = ({ children, selected, onClick }) => {
    return (
        <StyledSelectButton selected={selected} onClick={onClick}>
            {children}
        </StyledSelectButton>
    )
}

export default SelectButton;
