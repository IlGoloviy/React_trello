import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import OnHold from './OnHold';
import InProgress from './InProgress';
import NeedsReview from './NeedsReview';
import Approved from './Approved';

import { getData, setToken, moveTaskInColumn } from '../actions/authUser';
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
      console.log(tasks[destination.index].seq_num)
      taskMoved.seq_num = tasks[destination.index].seq_num - 1;
      tasks.splice(destination.index, 0, taskMoved);
      
  
      this.props.dispatch(moveTaskInColumn(tasks, source.droppableId));
      return;
    }

    const startColumn = this.props.tasks[source.droppableId].slice();
    const finishColumn = this.props.tasks[destination.droppableId].slice();
    const taskMoved = startColumn.filter(task => {
      console.log(task.id, '\n', draggableId)
      return task.id === draggableId;
    });
    startColumn.splice(source.index, 1);
    finishColumn.splice(destination.index, 0, ...taskMoved);

    this.props.dispatch(moveTaskInColumn(startColumn, source.droppableId));
    this.props.dispatch(moveTaskInColumn(finishColumn, destination.droppableId));

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
    if (localStorage.getItem('token')) {
      this.props.dispatch(getData())
    } else {
      setToken();
    }
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.arrTasks
  }
}

export default connect(mapStateToProps)(App);
