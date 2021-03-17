const Person = {
    state: {
      name: ''
    },
    setName(name) {
      this.state.name = name
      console.log('set', this.state.name)
    }
  }
  export default Person