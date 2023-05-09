import { Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { SearchIcon,PhoneIcon } from "@chakra-ui/icons";

export default function SearchBar({handleChange}) {
    let possibleBookPrompts = [
        'Harry Potter And The Philosopher\'s Stone',
        'The Hunger Games',
        'Don Quixote De La Mancha',
        'Cronica De Una Muerte Anunciada',
        'Divergent',
        'Frankenstein',
        'To Kill a Mockingbird',
        'The Green Mile',
        'At The Mountains Of Madness'
    ]
    return (
        <InputGroup mx={"9"}>
            <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
            />
            <Input type='text' 
            placeholder={possibleBookPrompts[Math.floor(Math.random()*possibleBookPrompts.length)]}
            onInput={handleChange}/>
        </InputGroup>
    )
}