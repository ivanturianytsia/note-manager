import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

import 'milligram'

class App extends Component {
  constructor () {
    super()
    this.change = this.change.bind(this)
    this.newNote = this.newNote.bind(this)
    this.selectNote = this.selectNote.bind(this)

    const cached = JSON.parse(localStorage.getItem('notes'))
    const defValue = '# Welcome'
    let state = {
      notes: [{
        name: defValue,
        value:  defValue
      }],
      editorId: 0,
      editorValue:  defValue
    }
    if (cached && cached.length) {
      state.notes = cached
      state.editorValue = cached[0].value
    }

    this.state = state
  }
  change (event) {
    if (this.state.editorId !== null) {
      const val = event
      this.setState(prevState => {
        prevState.notes[prevState.editorId] = {
          name: val.split('\n')[0],
          value: val
        }
        return {
          notes: prevState.notes
        }
      })
    }
  }
  saveState (state) {
    localStorage.setItem('notes', JSON.stringify(state.notes))
  }
  selectNote (index) {
    this.setState(prevState => {
      return {
        editorId: index,
        editorValue: prevState.notes[index].value
      }
    })
  }
  componentWillUpdate(nextProps, nextState) {
    this.saveState(nextState)
  }
  newNote () {
    const note = {
      name: '# Another note',
      value: '# Another note'
    }
    this.setState(prevState => {
      return {
        notes: prevState.notes.concat(note),
        editorId: prevState.notes.length,
        editorValue: note.value
      }
    })
  }
  render() {
    return (
      <div className="App">
        <h1>Marky Mark</h1>
        <div className="row">
          <Sidebar select={index => () => this.selectNote(index)} new={this.newNote} items={this.state.notes} />
          <Editor value={this.state.editorValue} change={this.change} />
        </div>
      </div>
    );
  }
}

export default App;
