import React from "react";

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helloSubject: "world",
    };
  }

  render() {
    return (
      <>
        <h1>Hello {this.state.helloSubject}!</h1>
        <p>Feel free to use me as a template</p>
      </>
    );
  }
}

export default ExampleComponent;
