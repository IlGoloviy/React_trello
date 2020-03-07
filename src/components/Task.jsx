import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { deleteTask } from '../actions/authUser';

const DivTask = styled.div`
  background: #191a1d;
  padding: 0 0 5px 10px;
  margin-bottom: 10px;
  cursor: move;
`;
const BtnCansel = styled.button`
  transform: rotate(45deg);
  background: rgba(0,0,0,0);
  border: none;
  color: #a2a5ad;
  text-align: right;
  font-size: 24px;
  padding: 0;
  margin-left: 250px;
  cursor: pointer;
  :focus { outline: none; }
`;
const Text = styled.p`
  margin: 0;
  color: #a2a5ad;
  padding-bottom: 15px;
`;
const Span = styled.span`
  color: #fff;
`;

const Task = (props) => {
  const { task } = props;

  const deleteBlock = () => {
    // const tasks = Object.assign({}, props.tasks);
    // for (let key in tasks) {
    //   tasks[key].forEach((item, i, arr) => {
    //     if (item.id === task.id) {
    //       arr.splice(i, 1);
    //     }
    //   })
    // }
    props.dispatch(deleteTask(task.id));
  }
  
  return (
    <Draggable draggableId={`${task.id}`} index={props.index}>
      {provided => (
        <DivTask 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <BtnCansel onClick={deleteBlock}>+</BtnCansel>
          <Text><Span>id:</Span> {task.id}</Text>
          <Text>{task.text}</Text>
        </DivTask>
      )}
    </Draggable>
  );
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(Task);