import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import OnHold from './OnHold';
import InProgress from './InProgress';
import NeedsReview from './NeedsReview';
import Approved from './Approved';

import { moveTaskInColumn } from '../actions/addTask';
import { connect } from 'react-redux';

const Container = styled.div`
  background: #33363d;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const App = (props) => {
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const tasks = props.tasks[source.droppableId].slice();
      const taskMoved = tasks.filter(task => {
        return task.id === draggableId;
      });
      tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, ...taskMoved);
  
      props.dispatch(moveTaskInColumn(tasks, source.droppableId));
      return;
    }

    const startColumn = props.tasks[source.droppableId].slice();
    const finishColumn = props.tasks[destination.droppableId].slice();
    const taskMoved = startColumn.filter(task => {
      return task.id === draggableId;
    });
    startColumn.splice(source.index, 1);
    finishColumn.splice(destination.index, 0, ...taskMoved);

    props.dispatch(moveTaskInColumn(startColumn, source.droppableId));
    props.dispatch(moveTaskInColumn(finishColumn, destination.droppableId));

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <OnHold />
        <InProgress />
        <NeedsReview />
        <Approved />
      </Container>
    </DragDropContext>
  );
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App);
