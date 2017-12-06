import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar column column-25">
        <button onClick={this.props.new} className="button button-clear">+ new note</button>
        <div className="list">
        {this.props.items.map((item, index) => (
          <input className="button button-clear" key={index} type="submit" onClick={this.props.select(index)} value={item.name} />
        ))}
        </div>
      </div>
    );
  }
}

export default Sidebar;
