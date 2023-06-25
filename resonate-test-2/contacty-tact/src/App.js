/**
 * The `App` function fetches contact data from an API, filters it based on user input, and renders a
 * list of `Contact` components.
 * @returns The `App` component is being returned, which contains a search bar and a list of `Contact`
 * components.
 */
import { useEffect, useState } from "react";
import Contact from "./components/Contact";

import "./App.scss";
import "./menu.scss";

function App() {
  /* These lines of code are initializing state variables using the `useState` hook. */
  const [contactData, setContactData] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const avatarNamesList = [
    "Oscar",
    "Casper",
    "Gizmo",
    "Chester",
    "Cleo",
    "Bailey",
    "Baby",
    "Harley",
    "George",
    "Buster",
  ];

/**
 * This function fetches contact data from a specified API and sets it as both the filtered and
 * unfiltered contact data.
 */
  const fetchContacts = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilteredList(data);
        setContactData(data);
      });
  };

/* `useEffect(() => { fetchContacts(); }, []);` is a hook that is used to perform side effects in
functional components. In this case, it is used to fetch contact data from an API when the component
mounts for the first time. The empty array `[]` passed as the second argument to `useEffect` ensures
that the effect is only run once when the component mounts, and not on subsequent re-renders. */
  useEffect(() => {
    fetchContacts();
  }, []);

  // console.log(contactData);

 /* `const contacts` is creating an array of `Contact` components by mapping over the `filteredList`
 array. For each `contact` object in `filteredList`, a `Contact` component is created with the
 `contact` object passed as a prop, along with a unique `key` and an `avatar` prop that is set to a
 specific name from the `avatarNamesList` array based on the `id` of the `contact` object. The
 resulting array of `Contact` components is stored in the `contacts` variable. */
  const contacts = filteredList.map((contact) => {
    return (
      <Contact
        contact={contact}
        key={contact.id}
        avatar={avatarNamesList[contact.id - 1]}
      />
    );
  });

 /**
  * The function `handleChange` sets the state of `query` to the value of the event target.
  * @param e - The parameter "e" is an event object that is passed to the function when an event
  * occurs, such as a change in the input field. It contains information about the event, such as the
  * target element (in this case, the input field) and the value of the input field.
  */
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

/* `useEffect(() => {...})` is a hook that is used to perform side effects in functional components. In
this case, it is used to filter the `contactData` array based on the value of the `query` state
variable. */
  useEffect(() => {
    console.log(query);
    let filterList = contactData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredList(filterList);
  }, [query]);

  return (
    <div className="app-container">
      <div className="menu-wrapper">
        <div className="logo">ContactAPP</div>
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
          <input
            type="search"
            placeholder="Search"
            onChange={handleChange}
            value={query}
          />
        </div>
      </div>
      {contacts}
    </div>
  );
}

export default App;
