import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Firebase from "../Firebase";

const NotePage = () => {
  const [loading, setLoading] = useState(true);
  const [notePosts, setNotes] = useState([]);

  if (loading && !notePosts.length) {
    new Firebase()
      .database()
      .ref("/notes")
      .orderByChild("date")
      .once("value")
      .then((snapshot) => {
        let posts = [];
        const snapshotVal = snapshot.val();
        for (let slug in snapshotVal) {
          posts.push(snapshotVal[slug]);
        }

        const newestFirst = posts.reverse();
        setNotes(newestFirst);
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
      <div className='container'>
        <div className='container'>
          <h1 className='pageHeader'>Blog posts</h1>
          {notePosts.map((note) => (
            <section key={note.slug} className='blogCard'>
              <div className='blogCard-content'>
                <h2>
                  {note.title} &mdash;{" "}
                  <span style={{ color: "#5e5e5e" }}>{note.datePretty}</span>
                </h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${note.content.substring(0, 200)}...`,
                  }}></p>
                <Link to={`/notes/${note.slug}`}>Continue reading...</Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }
};

export default NotePage;
