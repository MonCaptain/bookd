import {
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';
import { BiLogIn } from 'react-icons/bi';
import { BsPersonAdd } from 'react-icons/bs';
import LandingPageNavBar from '../components/landingPageNavBar';

function SplitScreen() {
  return (
      <Stack flex={1} minH={'100%'} direction={{ base: 'column', md: 'row' }} m={'0 !important'}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'orange.400',
                  zIndex: -1,
                }}>
                Get Book'd
              </Text>
              <br />{' '}
              <Text color={'orange.400'} as={'span'}>
                keeps track your favorite reads!
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              The project board is an exclusive resource for contract work. It's
              perfect for freelancers, agencies, and moonlighters.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
                rounded={'full'}
                variant={'outline'}
                color={'orange.400'}
                borderColor={'orang.400'}
                leftIcon={<Icon as={ BiLogIn }/>}>
                Sign In
            </Button>
            <Button
              rounded={'full'}
              variant={'solid'}
              bg={'orange.400'}
              color={'white'}
              leftIcon={<Icon as={ BsPersonAdd }/>}
              _hover={{bg: 'orange.600'}}>
              Sign up
            </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
          />
        </Flex>
      </Stack>)
  }

export default function LandingPage() {
  return (
    <Stack minH={'100vh'} flexDir={'column'}>
      <LandingPageNavBar/>
      <SplitScreen/>
    </Stack>
  )
};
