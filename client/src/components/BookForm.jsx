import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableInput,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tooltip,
  useEditableControls,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Slider,
  SliderMark,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import apiClient from "../services/apiClient";

// Book Dialog
export default function BookForm({
  title,
  author,
  pages,
  cover,
  isOpen,
  onOpen,
  onClose,
  submitBook,
  modifier,
}) {
  const [status, setStatus] = useState(0);
  const [compRating, setCompRating] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [normPages, setNormPages] = useState(pages);
  const toast = useToast();
  
  // For bookPages state (Might remove later)
  useEffect(() => setNormPages(pages), [pages])
  
   // Change book status dinamically
  useEffect(() => {
    if (status !== 3) {
      if (currentPage == 0) {
        setStatus(currentPage)
      } else if (currentPage == normPages) {
        setStatus(2)
      } else {
        setStatus(currentPage > 0 ? 1 : status)
      }
    } else {
      console.log("No change")
    }
  }, [currentPage])
  // Controls for editable fields
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
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
  };

  // Handles prop modification:
  const modifierHandler = (propName, propValue) => {
    let propObject = {};
    propObject[propName] = propValue;
    modifier(propObject);
  }

  // Input fields for title and author
  const BookInput = ({ label, input, size, propName }) => {
    return (
      <FormControl pb={3}>
        <FormLabel>{label}</FormLabel>
        <Editable defaultValue={input} isPreviewFocusable>
          <Tooltip label={"Click to edit"} shouldWrapChildren>
            <EditablePreview fontSize={size} />
          </Tooltip>
          <Input as={EditableInput} fontSize={size} onBlur={e => modifierHandler(propName, e.target.value)}/>
          <EditableControls/>
        </Editable>
      </FormControl>
    );
  };

  // Input fields for page counts
  const BasePageCount = ({ label, pagesPass, handler }) => {    
    return (
      <FormControl pb={3}>
        <FormLabel>{label}</FormLabel>
        <NumberInput defaultValue={normPages} min={1} size={"md"} onBlur={handler}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    );
  };

  const CurrPageCount = ({ label, handler }) => {
    return (
      <FormControl pb={3}>
        <FormLabel>{label}</FormLabel>
        <NumberInput defaultValue={currentPage} min={0} max={normPages} size={"md"} onBlur={e => handler(e)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    );
  };

  // Handler for currentPage picker
  const currentPageHandler = (e) => {
    let curr = e.target.value;
  
    if (curr > normPages) {
      toast({
        title: 'Page Limit Exceeded',
        description: `Maximum value is ${normPages}.`,
        status: 'error',
        duration: '5000',
        isClosable: true,
      })
    }
    setCurrentPage(curr <= normPages ? curr : normPages);
  }

  // When book total pages are modified
  const BookPageModifier = (e) => {
    let curr = e.target.value;
    modifierHandler("pages", curr)
    if (currentPage > curr) {
      setCurrentPage(curr)
    }
    setNormPages(curr)
  }
  
  // To pick Book status
  const StatusPicker = ({ title }) => {
    return (
      <Box pb={3}>
        <FormLabel>{title}</FormLabel>
        <Select
          variant={"filled"}
          icon={<ChevronDownIcon />}
          onSelect={(e) => {
            setStatus(e.target.value);
          }}
          defaultValue={status}
        >
          <option value={0} color={"yellow.900"} bg={"yellow.100"}>
            Not Started
          </option>
          <option value={1} color={"cyan.900"} bg={"cyan.100"}>
            In Progress
          </option>
          <option value={2} color={"green.900"} bg={"green.100"}>
            Completed
          </option>
          <option value={3} color={"red.900"} bg={"red.100"}>
            Dropped
          </option>
        </Select>
      </Box>
    );
  };

  const Rating = ({ title }) => {
    const labelStyles = {
      my: "2",
      ml: "-2.5",
      fontSize: "30px",
    };
    let [tooltip, setTooltip] = useState(false);
    let [rating, setRating] = useState(compRating);

    return (
      <Box mb={6}>
        <FormLabel>{title}</FormLabel>
        <Slider
          aria-label="slider-ex-4"
          defaultValue={compRating}
          min={1}
          max={5}
          step={1}
          onChange={(val) => {
            setRating(val);
          }}
          onChangeEnd={(e) => {
            setCompRating(rating)
          }}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
        >
          <SliderMark value={1} {...labelStyles}>
            <Icon
              as={rating >= 1 ? AiFillStar : AiOutlineStar}
              color={"yellow.500"}
            />
          </SliderMark>
          <SliderMark value={2} {...labelStyles}>
            <Icon
              as={rating >= 2 ? AiFillStar : AiOutlineStar}
              color={"yellow.500"}
            />
          </SliderMark>
          <SliderMark value={3} {...labelStyles}>
            <Icon
              as={rating >= 3 ? AiFillStar : AiOutlineStar}
              color={"yellow.500"}
            />
          </SliderMark>
          <SliderMark value={4} {...labelStyles}>
            <Icon
              as={rating >= 4 ? AiFillStar : AiOutlineStar}
              color={"yellow.500"}
            />
          </SliderMark>
          <SliderMark value={5} {...labelStyles}>
            <Icon
              as={rating >= 5 ? AiFillStar : AiOutlineStar}
              color={"yellow.500"}
            />
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack bg={"yellow.400"} />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="yellow.500"
            color="white"
            placement="top"
            isOpen={tooltip}
            label={`${rating}`}
          >
            <SliderThumb boxSize={6} color={"yellow.500"} />
          </Tooltip>
        </Slider>
      </Box>
    );
  };

  // For bookEntry Submission:
  const posStatus = ['Not Started', 'In Progress', 'Completed', 'Dropped']
  const submitEntry = (result) => {
    Promise.resolve(apiClient.postEntry({book_id: result.id})).then(
      result => {
        let entryBody = Object.assign(result, {
          current_page: currentPage,
          rating: compRating,
          status: posStatus[status]
        })
        Promise.resolve(apiClient.editEntry(result.id, entryBody)).then(
          response => console.log(response)
        )
      }
    )
  }

  return (
    <Modal isOpen={isOpen} p={10} size={{ base: "sm", md: "xl" }} isCentered>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent>
        <ModalHeader>Add book</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody pb={6} alignItems={"center"}>
          <Stack
            direction={{ base: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <Image
              src={cover}
              width={"200px"}
              rounded={"md"}
              alignSelf={"center"}
              mb={6}
              alt={"Book cover for " + title}
            />
            <Flex direction={"column"} px={5} w={"100%"} h={"100%"}>
              <BookInput label={"Title"} input={title} size={"xl"} propName={"title"}/>
              <BookInput label={"Author"} input={author} size={"lg"} propName={"author"}/>
              <BasePageCount label={"Page Count"} pagesPass={normPages} handler={BookPageModifier}/>
              <CurrPageCount label={"Current Page"} pagesPass={currentPage} handler={currentPageHandler} maxPage={normPages}/>
              <StatusPicker title={"Clasification"}></StatusPicker>
              <Rating title={"Rating"} />
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              variant={"solid"}
              colorScheme={"orange"}
              onClick={(e) => submitBook(submitEntry)}
            >
              Submit
            </Button>
            <Button variant={"outline"} colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
