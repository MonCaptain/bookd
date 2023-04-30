import React from "react";
import LoginDiag from "../components/loginDiag";
import {
    Flex,
    Heading,
    Text,
    Stack,
    Link,
    useColorModeValue
  } from '@chakra-ui/react';

export default function LoginPage() {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Welcome back!</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                    Sign in to keep track of your <Link color={'blue.400'}>books</Link> 📖
                    </Text>
                </Stack>
                <LoginDiag></LoginDiag>
            </Stack>
        </Flex>
    )
}