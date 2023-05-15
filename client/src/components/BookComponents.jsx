/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function BookCard({ cover, author, pagecount, title }) {
  return (
    <Card
      minW={"500px"}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={cover}
        alt={title}
      />
      <Stack>
        <CardHeader>
          <Heading size={"lg"}>{title}</Heading>
          <Heading size={"md"} py="2">
            Written by {author}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            {pagecount ? `${pagecount} pages` : "Page count unavailable."}
          </Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Start
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}
