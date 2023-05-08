import { ReactNode } from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  useDisclosure,
  useColorModeValue,
  Text,
  Stack,
  HStack,
  VStack,
  Link,
  Card, CardBody, CardFooter, Image,
  Button, ButtonGroup, CardHeader 
} from '@chakra-ui/react';
import SearchBar from './search';

// BookSearch Navigation
export function BookSearch({ handleChange }) {
    return (
      <>
        <Box bg={useColorModeValue('whiteAlpha.900', 'gray.800')} p={4}>
          <HStack>
            <VStack spacing={'0'} mx={4}>
                <Heading size={'md'} my={0}>BookSearch</Heading>
                <Text fontSize={'10px'} my={0}>Powered by <Link href='https://openlibrary.org/' isExternal>OpenLibrary</Link></Text>
            </VStack>
            <SearchBar handleChange={handleChange}/>
          </HStack>
          
        </Box>
      </>
    );
  }

// Book card
export function SearchedBookCard({cover, author, pagecount, title}) {
    return (
    <>
      <Card w={'350px'} h={'750px'}>
          <CardBody>
          <Image
              src={cover}
              alt='Green double couch with wooden legs'
              borderRadius='lg'
              w={'100%'}
              h={'450px'}
              objectFit={'contain'}
              objectPosition={'center'}
              />
              <Stack mt='6' spacing='3'>
              <Heading size='md'>{title.slice(0,64)}</Heading>
              <Text>{author ? author : "N/A" }</Text>
              <Text color={useColorModeValue('blue.500', 'cyan.500')} fontSize='2xl'>
                  {pagecount ? `${pagecount} pages` : "N/A" }
              </Text>
              </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
              <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                  Track
              </Button>
              <Button variant='ghost' colorScheme='blue'>
                  Add to cart
              </Button>
              </ButtonGroup>
          </CardFooter>
      </Card>
    </>
    )
}