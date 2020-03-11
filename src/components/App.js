import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Column from './Column';

import { setToken } from '../actions/actionAuth';
import { getData, moveTaskInColumn, updateTask } from '../actions/actionWithTasks';
import { connect } from 'react-redux';

const Container = styled.div`
  background: #33363d;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  @media (max-width: 950px) {
    padding: 0 15px;
    box-sizing: border-box;
    overflow-x: scroll;
    justify-content: flex-start;
  }
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
    const OnHold = {
      nameColumn: 'OnHold',
      idColumn: '0',
      background: '#fb7e46'
    }
    const InProgress = {
      nameColumn: 'InProgress',
      idColumn: '1',
      background: '#2a92bf'
    }
    const NeedsReview = {
      nameColumn: 'NeedsReview',
      idColumn: '2',
      background: '#f4ce46'
    }
    const Approved = {
      nameColumn: 'Approved',
      idColumn: '3',
      background: '#00b961'
    }

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          <Column props={OnHold} />
          <Column props={InProgress} />
          <Column props={NeedsReview} />
          <Column props={Approved} />
        </Container>
      </DragDropContext>
    );
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.dispatch(getData())
    } else {
      setToken()
    }
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  }
}

export default connect(mapStateToProps)(App);
