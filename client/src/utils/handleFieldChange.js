function handleFieldChange(field) {
  return (event) => {
    const state = {};
    state[field] = event.target.value;
    this.setState(state);
  };
}

export default handleFieldChange;
