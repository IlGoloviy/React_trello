import React, { createRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task';
import { addTaskNeedsReview } from '../actions/actionWithTasks';

const Column = styled.div`
  background: #292b31;
  color: #fff;
  width: 300px;
  margin: 50px 15px;
  @media (max-width: 1300px) {
    width: 250px;
  }
  @media (max-width: 1100px) {
    width: 200px;
  }
`;
const ColumnContent = styled.div`
  padding: 10px;
  padding-bottom: 0;
`;
const ColumnDescription = styled.h2`
  margin: 0;
  padding: 10px;
  text-transform: uppercase;
  background: #f4ce46;
  @media (max-width: 1100px) {
    font-size: 18px;
  }
`;
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

class NeedsReview extends React.Component {
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
      row: `2`,
      text: this.text.current.value
    }
    this.props.dispatch(addTaskNeedsReview(task));
    this.setState({add: !this.state.add});
  }

  render() {
    let addTask, tasks;

    if (this.state.add) {
      addTask = <AddCardDiv>
        <AddCardText ref={this.text} rows="4" placeholder="Ввести заголовок для этой карточки"></AddCardText>
        <AddCardButtons>
          <AddCardBtnSaved onClick={this.savedTask}>Добавить карточку</AddCardBtnSaved>
          <AddCardBtnCansel onClick={this.addTask}>+</AddCardBtnCansel>
        </AddCardButtons>
      </AddCardDiv>
    } else {
      addTask = <AddCardBtn onClick={this.addTask}>+ Добавить карточку</AddCardBtn>
    }

    if (this.props.tasks.length) {
      tasks = this.props.tasks.map((task, i) => {
        return <Task task={task} key={task.id} index={i} />
      })
    } else {
      tasks = false;
    }

    return (
      <Column>
        <ColumnDescription>needs review ({tasks.length})</ColumnDescription>
        <Droppable droppableId={`NeedsReview`}>
          {provided => (
            <ColumnContent
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks}
              {provided.placeholder}
            </ColumnContent>
          )}
        </Droppable>
        {addTask}
      </Column>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.NeedsReview,
  }
}

export default connect(mapStateToProps)(NeedsReview);