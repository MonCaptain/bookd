import { ReactNode } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiLogIn } from 'react-icons/bi';
import { BsPersonAdd } from 'react-icons/bs'

const Links = ['Dashboard', 'Projects', 'Team'];

export default function LandingPageNavBar() {
  return (
    <nav>
      <Box bg={useColorModeValue('gray.50', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Text color={'orange.400'} fontWeight={'900'}>Get Book'd</Text>
              </Box>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
                rounded={'full'}
                variant={'outline'}
                color={'orange.400'}
                borderColor={'orang.400'}
                mr={4}
                leftIcon={<Icon as={ BiLogIn }/>}
                >
                Sign In
            </Button>
            <Button
              rounded={'full'}
              variant={'solid'}
              bg={'orange.400'}
              color={'white'}
              mr={4}
              leftIcon={<Icon as={ BsPersonAdd }/>}
              _hover={{bg: 'orange.600'}}
              >
              Sign up
            </Button>
          </Flex>
        </Flex>
      </Box>
    </nav>
  );
}
