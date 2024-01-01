import { Box, Button, Center, Spacer, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Loan } from "../Models/Loan";
import styles from "../pages/Home.module.css";

export interface CardProps {
  movie: Loan;
}

const Card: FC<CardProps> = (props) => {
  // Check if 'props.movie' is defined
  if (!props.movie) {
    return null; // or handle the case where movie is undefined
  }

  return (
    <Center>
      <Box
        p={4}
        maxWidth="32rem"
        borderWidth={1}
        margin={2}
        width="100%"
        height="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={"#042c54"}
        maxHeight={150}
      >
        <Stack w="100%" textAlign="center">
          <Text
            fontWeight="bold"
            fontSize="md"
            letterSpacing="wide"
            color="gray.200"
            textAlign={"center"}
          >
            <div className={styles.card}>
              {/* Check if 'props.movie.name' is defined */}
              <p>Applicant Name: {props.movie.name || "N/A"}</p>
            </div>
          </Text>
          <Spacer />
          <Text color="gray.200">
            <div className={styles.card}>
              {/* Check if 'props.movie.email' is defined */}
              <p>Email: {props.movie.email || "N/A"}</p>
            </div>
          </Text>
          <Text my={2} color="gray.400">
            <div className={styles.card}>
              {/* Check if 'props.movie.amount' is defined */}
              <p>Amount: {props.movie.amount || "N/A"}</p>
              <Button size={"md"}>Grant Loan</Button>
            </div>
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};

export default Card;
