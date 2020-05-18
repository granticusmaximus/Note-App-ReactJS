import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, InputArea } from "reactstrap";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../Constants/routes";

const NotesPage = () => (
  <div>
    <h1>My Lovely Note</h1>
  </div>
);

const INITIAL_STATE = {
  notesTitle: "",
  noteContent: "",
  currentDate: new Date().toLocaleString(),
};

class NotesFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { notesTitle, noteContent } = this.state;

    this.props.firebase
      .doCreateNotesTitleandContent(notesTitle, noteContent)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.NOTES);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { notesTitle, noteContent, error } = this.state;

    
    return (
      <div className='App-box'>
        <Form onSubmit={this.onSubmit}>
          <Input
            name='notesTitle'
            value={notesTitle}
            onChange={this.onChange}
            type='text'
            placeholder='Add Title For Note'
          />
          <br />
          <br />
          <InputArea
            name='noteContent'
            value={noteContent}
            onChange={this.onChange}
            type='password'
            placeholder='Password'
          />
          <br />
          <Button type='submit'>
            Add Note
          </Button>

          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}

const NotesForm = withRouter(withFirebase(NotesFormBase));
export default NotesPage;
export { NotesForm };
