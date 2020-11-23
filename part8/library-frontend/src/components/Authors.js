import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const UPDATE_AUTHOR_DOB = gql`
  mutation updateAuthorDob(
    $name: String!
    $born: Int!
    ) {
    editAuthor(
      name: $name
      setBornTo: $born
      ) {
        name
        born
      }
  }
`

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBornTo] = useState("");

  const [ updateAuthorDob ] = useMutation(UPDATE_AUTHOR_DOB, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <div>loading...</div>;
  }

  const updateBirthDate = async (event) => {
    event.preventDefault()
    updateAuthorDob({variables: { name, born}})
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ paddingTop: "2rem" }}>
        <form onSubmit={updateBirthDate}>
        <div style={{ paddingTop: "1rem" }}>
            <select value={name} onChange={({target}) => setName(target.value)}>
              {result.data.allAuthors.map(author => (
                <option value={author.name}>{author.name}</option>
              ))}
            </select>
          </div>
          <div style={{ paddingTop: "1rem" }}>
            Date of Birth: <input type="number" value={born} onChange={({target}) => setBornTo(Number(target.value))}/>
          </div>
          <button type="submit">Update Author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
