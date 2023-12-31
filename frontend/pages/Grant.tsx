import {
  Box,
  Button,
  Center,
  HStack,
  Spacer,
  Stack,
  Text,
  position,
} from "@chakra-ui/react";
import { FC } from "react";
import { Loan } from "../Models/Loan";
import styles from "../pages/Home.module.css";

export interface CardProps {
  movie: Loan;
}
const Card: FC<CardProps> = (props) => {
  return (
    <Center>
      <Box
        p={4}
        maxWidth="32rem"
        borderWidth={1}
        margin={2}
        width="100%" // Set a fixed width
        height="auto" // Set height to auto to maintain content height
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={"#042c54"}
        maxHeight={150}
      >
        <Stack
          w="100%" // Set a fixed width for the stack
          textAlign="center"
        >
          <Text
            fontWeight="bold"
            fontSize="md"
            letterSpacing="wide"
            color="gray.200"
            textAlign={"center"}
          >
            <div className={styles.card}>
              <p>Applicant Name: {props.movie.name}</p>
            </div>
          </Text>
          <Spacer />
          <Text color="gray.200">
            <div className={styles.card}>
              <p>Email: {props.movie.email}</p>
            </div>
          </Text>
          <Text my={2} color="gray.400">
            <div className={styles.card}>
              <p>Amount: {props.movie.amount}</p>
              <Button size={"md"}>Grant Loan</Button>
            </div>
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};

export default Card;
