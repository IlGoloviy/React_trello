import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task';
import AddTask from './AddTask';

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
  background: #2a92bf;
  @media (max-width: 1100px) {
    font-size: 18px;
  }
`;

class InProgress extends React.Component {
  render() {
    let tasks;

    if (this.props.tasks.length) {
      tasks = this.props.tasks.map((task, i) => {
        return <Task task={task} key={task.id} index={i} />
      })
    } else {
      tasks = false;
    }

    return (
      <Column>
        <ColumnDescription>in progress ({tasks.length})</ColumnDescription>
        <Droppable droppableId={`InProgress`}>
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
        <AddTask props='1' />
      </Column>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.InProgress,
  }
}

export default connect(mapStateToProps)(InProgress);