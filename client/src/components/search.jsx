import { Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { SearchIcon,PhoneIcon } from "@chakra-ui/icons";

export default function SearchBar({handleChange}) {
    
    return (
        <InputGroup maxW={'500px'}>
            <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
            />
            <Input type='tel' placeholder='Phone number' onChange={handleChange} />
        </InputGroup>
    )
}