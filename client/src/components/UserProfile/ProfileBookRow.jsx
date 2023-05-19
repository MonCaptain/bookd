import {
  Card,
  Flex,
  Box,
  Text,
  Spacer,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  CardFooter,
  Button,
  Image,
  Badge,
  Alert,
  Icon,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
export default function ProfileBookRow({
  title,
  author,
  cover,
  readingStatus,
  rating,
  lastUpdated,
}) {
  const orangeTextTheme = useColorModeValue("orange.500", "orange.200");

  let alertTypeByStatus = {
    "Not started": "warning",
    Dropped: "error",
    Completed: "success",
    "In Progress": "info",
  };
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={cover}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>
          <Text size={"md"} py="2">
            Written by {author}
          </Text>
          <Text py="2">
            <Alert
              status={
                readingStatus == "In Progress"
                  ? "warning"
                  : alertTypeByStatus[`${readingStatus}`]
              }
              variant="subtle"
              width={"full"}
            >
              {readingStatus}
            </Alert>
          </Text>
          <Text py="2">{rating ? `Rating: ${rating}/5 ` : ""}</Text>
          <SimpleGrid columns={5} alignSelf={"center"} spacingX={3}>
            {[...Array(5)].map((element, index) => {
              return (
                <Icon
                  as={index < rating ? AiFillStar : AiOutlineStar}
                  boxSize={8}
                  key={index}
                  color={readingStatus == "Dropped" ? "gray" : orangeTextTheme}
                />
              );
            })}
          </SimpleGrid>
        </CardBody>
      </Stack>
    </Card>
  );
}
