// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Workflow from './components/Workflow';
import { handleDragEnd as handleDragEndAction } from './modules/action';
import type { Workflow as WorkflowType } from './modules/reducers/workflows';

const Container = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

type AppProps = {
  +handleDragEnd: Function,
  +workflows: Array<WorkflowType>,
}

class App extends Component<AppProps> {
  onDragEnd = (result) => {
    const { destination, source } = result;

    if (
      !destination
      || (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    const { handleDragEnd } = this.props;

    handleDragEnd(result);
  };

  render() {
    const { workflows } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {workflows.map(workflow => <Workflow key={workflow.id} workflow={workflow} />)}
        </Container>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  workflows: (Object.values(state.workflows): any).sort((a, b) => a.sort - b.sort),
});

export default connect(mapStateToProps, { handleDragEnd: handleDragEndAction })(App);
