import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
  componentDidMount() {
    const node = document.createElement('div');
    document.body.appendChild(node);
    this._node = node;
    this.renderPortal(this.props);
  }

  componentDidUpdate() {
    this.renderPortal(this.props);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._node);
    document.body.removeChild(this._node);
  }

  renderPortal(props) {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <div className="portal">
        <div className="portal__mask" />
        <div className="portal__content">{props.children}</div>
      </div>,
      this._node
    );
  }

  render() {
    return null;
  }
}
