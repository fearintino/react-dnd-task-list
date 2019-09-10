// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Workflow from './components/Workflow';
import { handleDragEnd as handleDragEndAction } from './modules/action';
import type { Workflow as WorkflowType } from './modules/reducers/workflows';

type AppProps = {
  +handleDragEnd: Function,
  +workflows: { [string]: WorkflowType },
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
        {(Object.values(workflows): any).map((workflow: WorkflowType) => (
          <Workflow key={workflow.id} workflow={workflow} />
        ))}
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({ workflows: state.workflows });

export default connect(mapStateToProps, { handleDragEnd: handleDragEndAction })(App);
