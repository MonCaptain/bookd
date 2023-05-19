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
} from "@chakra-ui/react";

export default function ProfileBookRow({
  title,
  author,
  cover,
  readingStatus,
  rating,
  lastUpdated,
}) {
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
          <Text py="2">{rating ? "Rating: " + rating : ""}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
}
