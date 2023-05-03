import {useState, React} from "react";
import LoginDiag from "../components/LoginDiag";
import {
    Flex,
    Heading,
    Text,
    Stack,
    Link,
    useColorModeValue
  } from '@chakra-ui/react';
import RegisterDiag from "../components/RegisterDiag";

export default function LoginPage() {
    const [logOrReg, setLogOrReg] = useState(false);
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                {
                    logOrReg ?
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Welcome back!</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Sign in to keep track of your <Link color={'orange.400'}>books</Link> 📖
                        </Text>
                    </Stack> :
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Glad you're joining us!</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Register to start your <Link color={'orange.400'}>book</Link> 📖 journey!
                        </Text>
                    </Stack>
                }
                {logOrReg ? <LoginDiag/> : <RegisterDiag/>}
                <Stack pt={6}>
                    {
                    logOrReg ? 
                    <Text align={'center'}>Already have an account? Click <Link color={'orange.400'} onClick={(e) => setLogOrReg(false)} >here</Link> 👈</Text> :
                    <Text align={'center'}>Haven't joined yet? Click <Link color={'orange.400'} onClick={(e) => setLogOrReg(true)} >here</Link> 👈</Text>
                    }
                </Stack>
            </Stack>
        </Flex>
    )
}