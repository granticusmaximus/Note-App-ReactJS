import React, { useState } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Firebase from "../Firebase";

const Post = ({ match }) => {
  const slug = match.params.slug;
  const [loading, setLoading] = useState(true);
  const [currentNote, setCurrentNote] = useState();

  if (loading && !currentNote) {
    Firebase()
      .database()
      .ref()
      .child(`/notes/${slug}`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          setCurrentNote(snapshot.val());
        }
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <div className='container'>
        <center>
          <Loader
            type='Grid'
            color='#04C2C9'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </center>
      </div>
    );
  } else {
    return (
      <div>
        <div className='container'>
          <h1 className='pageHeader'>{currentNote.title}</h1>
          <em>{currentNote.datePretty}</em>
          <br />
          <em>{currentNote.author}</em>
          <hr />
          <p dangerouslySetInnerHTML={{ __html: currentNote.content }}></p>
        </div>
      </div>
    );
  }
};

export default Post;
