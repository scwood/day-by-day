import React, { Component, PropTypes } from 'react';
import autobind from 'class-autobind';
import { browserHistory } from 'react-router';

import EntryEditor from '../components/EntryEditor';
import api from '../utils/api';
import handleFieldChange from '../utils/handleFieldChange';

class Entry extends Component { 

  constructor() {
    super();
    this.state = {
      isLoading: false,
      id: null,
      date: '',
      text: '',
      error: null,
      success: null,
    };
    this.handleFieldChange = handleFieldChange.bind(this);
    autobind(this);
  }

  async componentDidMount() {
    const { id } = this.props.params;
    if (id === undefined) {
      return;
    }
    this.setState({ isLoading: true, id, submitIsUpdate: true });
    const { entry: { date, text } } = await api.getEntry(id);
    this.setState({ date, text, isLoading: false });
  }

  async handleSubmitClick(event) {
    event.preventDefault();
    const { id, date, text } = this.state;
    let result;
    let newState = {};
    if (id !== null) {
      result = await api.patchEntry(id, { date, text });
      if (!('error' in result)) {
        newState.success = 'Success: entry updated';
      }
    } else {
      result = await api.postEntry({ date, text });
      if (!('error' in result)) {
        newState.success = 'Success: entry created';
        newState.id = result.entry._id;
      }
    }
    if ('error' in result) {
      newState.error = result.error;
      newState.success = null;
    } else {
      newState.error = null;
    }
    console.log(newState);
    this.setState(newState);
  }

  async handleDeleteClick(event) {
    event.preventDefault();
    const { id } = this.props.params;
    if (id !== undefined) {
      await api.deleteEntry(id);
    }
    browserHistory.replace('/entries');
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <EntryEditor
        error={this.state.error}
        success={this.state.success}
        date={this.state.date}
        text={this.state.text}
        onDateChange={this.handleFieldChange('date')}
        onTextChange={this.handleFieldChange('text')}
        onSubmitClick={this.handleSubmitClick}
        onDeleteClick={this.handleDeleteClick}
      />
    );
  }
}

Entry.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Entry;
