import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import CreateNew from "./Components/CreateNew";
import Menu from "./Components/Menu";
import About from "./Components/About";
import NotificationMessage from "./Components/NotificationMessage";
import AnecdoteList from "./Components/AnecdoteList";
import SingleAnecdote from "./Components/SingleAnecdote";
import Footer from "./Components/Footer";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState(null);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    handleNotification(`A new anecdote, ${anecdote.content}, was created!`);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useRouteMatch("/anecdotes/:id");
  console.log(match);
  const anecdote = match ? anecdoteById(match.params.id) : null;
  console.log("single anec", anecdote);

  const handleNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <NotificationMessage message={notification} />
        <Switch>
          <Route path="/anecdotes/:id">
            <SingleAnecdote anecdote={anecdote} />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
        <Footer />
      </div>
  );
};

export default App;
