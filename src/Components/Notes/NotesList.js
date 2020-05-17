import React from "react";

import NotesItem from "./NotesItem";

const MessageList = ({ messages, onEditMessage, onRemoveMessage }) => (
  <ul>
    {messages.map((message) => (
      <NotesItem
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

export default MessageList;
