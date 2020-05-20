import React, { useState } from "react";
import Firebase from "../Firebase/firebase";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const NewNote = ({ history }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  const generateDate = () => {
    const now = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };

    const year = now.getFullYear();

    let month = now.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }

    const day = now.getDate();
    if (day < 10) {
      day = `0${day}`;
    }

    return {
      formatted: `${year}-${month}-${day}`,
      pretty: now.toLocaleDateString("en-US", options),
    };
  };

  const createNote = () => {
    const date = generateDate();
    const newPost = {
      title,
      dateFormatted: date.formatted,
      datePretty: date.pretty,
      slug,
      content,
    };
    Firebase()
      .database()
      .ref()
      .child(`notes/${slug}`)
      .set(newPost)
      .then(() => history.push(`/`));
  };

  return (
    <Form>
      <div>
        <h1>Create a new post</h1>
        <section style={{ margin: "2rem 0" }}>
          <FormGroup>
            <Label htmlFor='title-field'>Title</Label>
            <Input
              id='title-field'
              type='text'
              value={title}
              onChange={({ target: { value } }) => {
                setTitle(value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='slug-field'>Slug</Label>
            <Input
              id='slug-field'
              type='text'
              value={slug}
              onChange={({ target: { value } }) => {
                setSlug(value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='content-field'>Content</Label>
            <Input
              type='textarea'
              name='text'
              style={{ height: 200, verticalAlign: "top" }}
              id='content'
              value={content}
              onChange={({ target: { value } }) => {
                setContent(value);
              }}
            />
          </FormGroup>
          <div style={{ textAlign: "right" }}>
            <Button
              style={{
                border: "none",
                color: "#fff",
                backgroundColor: "#039be5",
                borderRadius: "4px",
                padding: "8px 12px",
                fontSize: "0.9rem",
              }}
              onClick={createNote}>
              Create
            </Button>
          </div>
        </section>
      </div>
    </Form>
  );
};

export default NewNote;
