import React, { createRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { addTaskOnHold, addTaskInProgress, addTaskNeedsReview, addTaskApproved } from '../actions/actionWithTasks';

const AddCardBtn = styled.h5`
  margin: 0;
  color: #717580;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  :hover {
    background: #191a1d;
  }
`;
const AddCardDiv = styled.div`
  padding: 10px;
`;
const AddCardButtons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
`;
const AddCardText = styled.textarea`
  width: 100%;
  background: #575a63;
  border: none;
  box-sizing: border-box;
  padding: 15px;
  color: #a2a5ad;
  font-size: 14px;
  resize: none;
  :focus {
    outline: none;
  }
`;
const AddCardBtnSaved = styled.button`
  border: none;
  background: #575a63;
  color: #a2a5ad;
  font-size: 16px;
  padding: 5px 15px;
  cursor: pointer;
`;
const AddCardBtnCansel = styled.button`
  margin-left: 5px;
  background: inherit;
  border: none;
  transform: rotate(45deg);
  color: #a2a5ad;
  font-size: 34px;
  cursor: pointer;
`;

class AddTask extends React.Component {
  constructor(props) {
    super();
    this.state = {
      add: false
    }
    this.text = createRef();

    this.addTask = this.addTask.bind(this);
    this.savedTask = this.savedTask.bind(this);
  }

  addTask() {
    this.setState({add: !this.state.add});
  }

  savedTask() {
    const task = {
      row: this.props.props,
      text: this.text.current.value
    }
    switch (this.props.props) {
      case '0': {
        this.props.dispatch(addTaskOnHold(task));
        break;
      }
      case '1': {
        this.props.dispatch(addTaskInProgress(task));
        break;
      }
      case '2': {
        this.props.dispatch(addTaskNeedsReview(task));
        break;
      }
      case '3': {
        this.props.dispatch(addTaskApproved(task));
        break;
      }
      default: {
        break; 
      }
    }
    
    this.setState({add: !this.state.add});
  }

  render() {
    if (this.state.add) {
      return (
        <AddCardDiv>
          <AddCardText ref={this.text} rows="4" placeholder="Ввести заголовок для этой карточки"></AddCardText>
          <AddCardButtons>
            <AddCardBtnSaved onClick={this.savedTask}>Добавить карточку</AddCardBtnSaved>
            <AddCardBtnCansel onClick={this.addTask}>+</AddCardBtnCansel>
          </AddCardButtons>
        </AddCardDiv>
      )
    } else {
      return (
        <AddCardBtn onClick={this.addTask}>+ Добавить карточку</AddCardBtn>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(AddTask);