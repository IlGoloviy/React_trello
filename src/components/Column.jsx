import React from 'react'
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

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
  @media (max-width: 950px) {
    width: 300px;
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
  background: ${props => props.color};
  @media (max-width: 1100px) {
    font-size: 18px;
  }
`;

class Columns extends React.Component {
    render() {
      let tasks;
      const { nameColumn, idColumn, background } = this.props.props;
  
      if (this.props[nameColumn].length) {
        tasks = this.props[nameColumn].map((task, i) => {
          return <Task task={task} key={task.id} index={i}/>
        })
      } else {
        tasks = false;
      }
  
      return (
        <Column>
          <ColumnDescription color={background}>on-hold ({this.props[nameColumn].length})</ColumnDescription>
          <Droppable droppableId={nameColumn}>
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
          <AddTask props={idColumn} />
        </Column>
      );
    }
  }
  
  function mapStateToProps(state) {
    return {
      OnHold: state.tasks.OnHold,
      InProgress: state.tasks.InProgress,
      NeedsReview: state.tasks.NeedsReview,
      Approved: state.tasks.Approved
    }
  }
  
  export default connect(mapStateToProps)(Columns);