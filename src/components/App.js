import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import OnHold from './OnHold';
import InProgress from './InProgress';
import NeedsReview from './NeedsReview';
import Approved from './Approved';

import { getData, moveTaskInColumn, updateTask } from '../actions/actionWithTasks';
import { connect } from 'react-redux';

const Container = styled.div`
  background: #33363d;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

class App extends React.Component {
  constructor(props) {
    super();
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
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
      const tasks = this.props.tasks[source.droppableId].slice();
      const [ taskMoved ] = tasks.filter(task => {
        return task.id === Number(draggableId);
      });
      tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, taskMoved);
      tasks.forEach((task, i) => task.seq_num = i);
  
      this.props.dispatch(moveTaskInColumn(tasks, source.droppableId));
      tasks.forEach(task => {
        const body = {
          row: task.row,
          seq_num: task.seq_num,
          text: task.text
        }
        this.props.dispatch(updateTask(body, task.id));
      });
      return;
    }

    const startColumn = this.props.tasks[source.droppableId].slice();
    const finishColumn = this.props.tasks[destination.droppableId].slice();
    const [ taskMoved ] = startColumn.filter(task => {
      return task.id === Number(draggableId);
    });
    startColumn.splice(source.index, 1);
    finishColumn.splice(destination.index, 0, taskMoved);
    finishColumn.forEach((task, i) => {
      task.seq_num = i;
      const arr = ['OnHold', 'InProgress', 'NeedsReview', 'Approved'];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === destination.droppableId) {
          task.row = i;
        }
      }
    });

    console.log(startColumn, '\n', finishColumn)
    this.props.dispatch(moveTaskInColumn(startColumn, source.droppableId));
    this.props.dispatch(moveTaskInColumn(finishColumn, destination.droppableId));
    finishColumn.forEach(task => {
      const body = {
        row: task.row,
        seq_num: task.seq_num,
        text: task.text
      }
      this.props.dispatch(updateTask(body, task.id));
    });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          <OnHold />
          <InProgress />
          <NeedsReview />
          <Approved />
        </Container>
      </DragDropContext>
    );
  }

  componentDidMount() {
    this.props.dispatch(getData())
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App);
