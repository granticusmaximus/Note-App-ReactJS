import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Firebase from "firebase";
import {
  Form,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class NotePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    this.getNotesData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeNoteData();
    }
  }

  writeNoteData = () => {
    Firebase.database().ref("/notes").set(this.state);
    console.log("DATA SAVED");
  };

  getNotesData = () => {
    let ref = Firebase.database().ref("/notes");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let noteTitle = this.refs.noteTitle.value;
    let noteContent = this.refs.noteContent.value;
    let uid = this.refs.uid.value;

    if (uid && noteTitle && noteContent) {
      const { notes } = this.state;
      const noteIndex = notes.findIndex((data) => {
        return data.uid === uid;
      });
      notes[noteIndex].name = noteTitle;
      notes[noteIndex].role = noteContent;
      this.setState({ notes });
    } else if (noteTitle && noteContent) {
      const uid = new Date().getTime().toString();
      const { notes } = this.state;
      notes.push({ uid, noteTitle, noteContent });
      this.setState({ notes });
    }

    this.refs.noteTitle.value = "";
    this.refs.noteContent.value = "";
    this.refs.uid.value = "";
  };

  removeData = (note) => {
    const { notes } = this.state;
    const newState = notes.filter((data) => {
      return data.uid !== note.uid;
    });
    this.setState({ notes: newState });
  };

  updateData = (note) => {
    this.refs.uid.value = note.uid;
    this.refs.noteTitle.value = note.noteTitle;
    this.refs.noteContent.value = note.noteContent;
  };

  render() {
    const { notes } = this.state;
    return (
      <React.Fragment>
        <div className='container'>
          <br />
          <div className='row'>
            <div className='col-xl-12'>
              <h1>Add new note here</h1>
              <Form onSubmit={this.handleSubmit}>
                <div className='row'>
                  <input type='hidden' ref='uid' />
                  <div className='form-group col-md-6'>
                    <h3>Note Title</h3>
                    <input
                      type='text'
                      ref='noteTitle'
                      className='form-control'
                      placeholder='Note Title'
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group col-md-12'>
                    <h3>Note Content</h3>
                    <textarea
                      type='text'
                      ref='noteContent'
                      className='form-control'
                      placeholder='New Notes Here'
                    />
                  </div>
                </div>
                <Button color='primary' type='submit' onClick={this.toggle}>
                  Save
                </Button>
              </Form>
            </div>
          </div>

          <hr />
          <div className='row'>
            <div className='col-xl-12'>
              <h1>Current Notes</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-12'>
              {notes.map((note) => (
                <div key={note.uid} className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{note.noteTitle}</h5>
                    <p className='card-text'>{note.noteContent}</p>
                    <Button
                      color='secondary'
                      onClick={() => this.removeData(note)}>
                      Delete
                    </Button>{" "}
                    <Button
                      color='secondary'
                      onClick={() => this.updateData(note)}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
        </div>
      </React.Fragment>
    );
  }
}

export default NotePage;
