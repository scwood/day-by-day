import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import EntryEditor from '../components/EntryEditor';
import fetchOrRedirect from '../utils/fetchOrRedirect';
import handleFieldChange from '../utils/handleFieldChange';

class Entry extends Component { 

  constructor() {
    super();
    this.state = {
      isLoading: false,
      date: '',
      text: '',
      error: null
    };
    this.handleFieldChange = handleFieldChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.params;
    if (id !== undefined) {
      this.setState({ isLoading: true });
      const { entry } = await fetchOrRedirect(`/api/entries/${id}`);
      const { date, text } = entry;
      this.setState({ date, text, isLoading: false });
    }
  }

  handleSubmitClick(event) {
    event.preventDefault();
    console.log('submitted');
  }

  async handleDeleteClick(event) {
    event.preventDefault();
    const { id } = this.props.params;
    if (id !== undefined) {
      await fetchOrRedirect(`/api/entries/${id}`, { method: 'delete' });
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
