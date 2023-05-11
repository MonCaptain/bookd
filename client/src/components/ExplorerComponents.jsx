import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Flex,
  Stack,
  VStack,
  Link,
  Card,
  CardBody,
  CardFooter,
  Image,
  IconButton,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  FormControl,
  FormLabel,
  Tooltip,
  Input,
  useEditableControls,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import SearchBar from "./Search";

// BookSearch Navigation
export function BookSearch({ handleChange }) {
  return (
    <>
      <Box bg={useColorModeValue("whiteAlpha.900", "gray.800")} p={4}>
        <Stack direction={{ base: "column", md: "row" }}>
          <VStack spacing={"0"} mx={4}>
            <Heading size={"md"} my={0}>
              BookSearch
            </Heading>
            <Text fontSize={"10px"} my={0}>
              Powered by{" "}
              <Link href="https://openlibrary.org/" isExternal>
                OpenLibrary
              </Link>
            </Text>
          </VStack>
          <SearchBar handleChange={handleChange} />
        </Stack>
      </Box>
    </>
  );
}

// Book card
export function SearchedBookCard({
  cover,
  author,
  pagecount,
  title,
  infopage,
  clickHandle
}) {
  return (
    <>
      <Card
        direction={{ base: "row", md: "column" }}
        rounded={"xl"}
        minH={{ base: "230px", sm: "100%" }}
        alignItems={"center"}
        justifyContent={{ base: "center", md: "space-between" }}
      >
        <Flex justifyContent={"center"} h={{base: "100%", md: ""}} w={{base: "200px", md: "100%"}}>
          <Image
            src={cover}
            alt={author}
            roundedTopLeft={"xl"}
            roundedBottomLeft={{base: "xl", md: "0"}}
            roundedTopRight={{base: "0", md: "xl"}}
            h={{ base: "100%", md: "350px" }}
            objectFit={"cover"}
            objectPosition={"center"}
            w={{base: "200px", md: "100%"}}
          />
        </Flex>
        <Flex direction={"column"} alignContent={"end"} w={"100%"}>
          <CardBody>
            <Stack>
              <Heading size="md" m={0} overflowWrap={"normal"}>
                {title.slice(0, 64)}
              </Heading>
              <Text m={"0!important"}>{author ? author : "N/A"}</Text>
              <Text
                colorScheme={'orange'}
                fontSize="2xl"
              >
                {pagecount ? `${pagecount} pages` : "N/A"}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="orange" onClick={clickHandle}>
                Track
              </Button>
              <Button variant="ghost" colorScheme="orange">
                <Link href={infopage} isExternal>
                  More Info
                </Link>
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Flex>
      </Card>
    </>
  );
}

// Book Dialog
export function BookForm({title, author, pages, cover, isOpen, onOpen, onClose, submitBook}) {
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null; 
  }
  const BookInput = ({label, input, size }) => {
    return (
      <FormControl pb={6}>
        <FormLabel>{label}</FormLabel>
        <Editable defaultValue={input} isPreviewFocusable >
          <Tooltip label={"Click to edit"} shouldWrapChildren>
            <EditablePreview fontSize={size}/>
          </Tooltip>
          <Input as={EditableInput} fontSize={size}/>
          <EditableControls/>
        </Editable>
      </FormControl>
    )
  };

  const PageCount = ({pages}) => {
    return (
      <FormControl>
        <FormLabel>Page Count</FormLabel>
        <NumberInput defaultValue={pages} min={0} size={'md'}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    )
  }
  return (
    <Modal isOpen={isOpen} p={10} size={{base: "sm", md: "xl"}} isCentered>
      <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)'/>
      <ModalContent>
          <ModalHeader>Add book</ModalHeader>
          <ModalCloseButton onClick={onClose}/>
          <ModalBody pb={6} alignItems={"center"}>
              <Stack direction={{base: 'column', md: 'row'}} alignItems={'center'} justifyContent={'space-around'}>
                <Image src={cover} width={'200px'} rounded={'md'} alignSelf={'center'} mb={6}/>
                <Flex direction={'column'} px={5} w={'100%'} h={"100%"}>
                  <BookInput label={"Title"} input={title} size={'xl'}/>
                  <BookInput label={"Author"} input={author} size={'lg'}/>
                  <PageCount pages={pages}/>
                </Flex>
              </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button variant={'solid'} colorScheme={'orange'} onClick={submitBook}>Submit</Button>
              <Button variant={'outline'} colorScheme="red" onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
      </ModalContent>
    </Modal>
  )
}