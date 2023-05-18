/* eslint-disable react/prop-types */
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
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
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Slider,
  SliderMark,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// Book Dialog
export default function EntryForm({
  book,
  current,
  isOpen,
  onClose,
  submitEntry,
  modifier,
}) {
  const [status, setStatus] = useState(0);
  const [compRating, setCompRating] = useState(5);
  const [currentPage, setCurrentPage] = useState(current);
  const toast = useToast();

  // For bookEntry Submission:
  const posStatus = ["Not Started", "In Progress", "Completed", "Dropped"];

  // For bookPages state (Might remove later)
  useEffect(() => {
    setCurrentPage(current)
  }, [current])

  // Handles prop modification:
  const modifierHandler = (propName, propValue) => {
    let propObject = {};
    propObject[propName] = propValue;
    modifier(propObject);
  };

  // Change book status dinamically
  useEffect(() => {
    if (status !== 3) {
      if (currentPage == 0) {
        setStatus(currentPage);
      } else if (currentPage == book.page_count) {
        setStatus(2);
      } else {
        setStatus(currentPage > 0 ? 1 : status);
      }
    }
  }, [currentPage]);

  // Input fields for title and author
  const PropField = ({ label, input, size}) => {
    return (
      <FormControl pb={3}>
        <FormLabel>{label}</FormLabel>
        <Text fontSize={size}>{input}</Text>
      </FormControl>
    );
  };

  const CurrPageCount = ({ label, handler }) => {
    return (
      <FormControl pb={3}>
        <FormLabel>{label}</FormLabel>
        <NumberInput
          defaultValue={currentPage}
          min={0}
          max={book.page_count}
          size={"md"}
          onBlur={(e) => handler(e)}
        >
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

    if (curr > book.page_count) {
      toast({
        title: "Page Limit Exceeded",
        description: `Maximum value is ${book.page_count}.`,
        status: "error",
        duration: "5000",
        isClosable: true,
      });
    }
    let newCurr = curr <= book.page_count ? curr : book.page_count
    setCurrentPage(newCurr);
    modifierHandler('current_page', newCurr)
  };

  // To pick Book status
  const StatusPicker = ({ title }) => {
    modifierHandler('status', posStatus[status])
    return (
      <Box pb={3}>
        <FormLabel>{title}</FormLabel>
        <Select
          variant={"filled"}
          icon={<ChevronDownIcon />}
          onChange={(e) => {
            setStatus(e.target.value);
            modifierHandler('status', posStatus[e.target.value]);
          }}
          defaultValue={status}
        >
          <option value={0} color={"yellow.900"}>
            Not Started
          </option>
          <option value={1} color={"cyan.900"}>
            In Progress
          </option>
          <option value={2} color={"green.900"}>
            Completed
          </option>
          <option value={3} color={"red.900"}>
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
    const ratingArray = [1, 2, 3, 4, 5];
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
          onChangeEnd={() => {
            setCompRating(rating);
            modifierHandler('rating', rating)
          }}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
        >
          {ratingArray.map((starValue, index) => {
            return (
              <SliderMark value={starValue} {...labelStyles} key={index}>
                <Icon
                  as={rating >= starValue ? AiFillStar : AiOutlineStar}
                  color={"#faaf00"}
                />
              </SliderMark>
            );
          })}
          <SliderTrack>
            <SliderFilledTrack bg={"#faaf00"} />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="orange.500"
            color="white"
            placement="top"
            isOpen={tooltip}
            label={`${rating}`}
          >
            <SliderThumb boxSize={6} color={"orange.700"} />
          </Tooltip>
        </Slider>
      </Box>
    );
  };


  return (
    <Modal isOpen={isOpen} p={10} size={{ base: "sm", md: "xl" }} isCentered>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent>
        <ModalHeader>Edit progress</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody pb={6} alignItems={"center"}>
          <Stack
            direction={{ base: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <Image
              src={book.cover_image}
              width={"200px"}
              rounded={"md"}
              alignSelf={"center"}
              mb={6}
              alt={"Book cover for " + book.title}
            />
            <Flex direction={"column"} px={5} w={"100%"} h={"100%"}>
              <PropField
                label={"Title"}
                input={book.title}
                size={"xl"}
              />
              <PropField
                label={"Author"}
                input={book.author}
                size={"lg"}
              />
              <PropField
                label={"Page Count"}
                input={book.page_count}
                size={"lg"}
              />
              <CurrPageCount
                label={"Current Page"}
                pagesPass={currentPage}
                handler={currentPageHandler}
                maxPage={book.page_count}
              />
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
              onClick={() => {submitEntry()}}
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
