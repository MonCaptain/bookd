/* eslint-disable react/prop-types */
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export default function SearchBar({ handleChange }) {
  let possibleBookPrompts = [
    "Harry Potter And The Philosopher's Stone",
    "The Hunger Games",
    "Don Quixote De La Mancha",
    "Cronica De Una Muerte Anunciada",
    "Divergent",
    "Frankenstein",
    "To Kill a Mockingbird",
    "The Green Mile",
    "At The Mountains Of Madness",
  ];
  let [suggestion, setSuggestion] = useState(
    possibleBookPrompts[Math.floor(Math.random() * possibleBookPrompts.length)]
  );

  useEffect(() => {
    let suggestTimeout = setTimeout(
      () =>
        setSuggestion(
          possibleBookPrompts[
            Math.floor(Math.random() * possibleBookPrompts.length)
          ]
        ),
      5000
    );
    return () => clearTimeout(suggestTimeout);
  });

  return (
    <InputGroup mx={"9"}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input type="text" placeholder={suggestion} onInput={handleChange} />
    </InputGroup>
  );
}
