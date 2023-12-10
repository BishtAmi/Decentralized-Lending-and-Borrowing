import { Box, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Loan } from "../Models/Loan";
import styles from "../pages/Home.module.css";
export interface CardProps {
  movie: Loan;
}

export const Card: FC<CardProps> = (props) => {
  return (
    
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
    >
      <Stack
        w="full"
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 5 }}
        mr={{ md: 5 }}
      >
        {/* <HStack> */}
        <Text
          fontWeight="bold"
          // textTransform="uppercase"
          fontSize="md"
          letterSpacing="wide"
          color="gray.200"
        >
          <div className={styles.card}>
            <p>Applicant Name: {props.movie.name}</p>
          </div>
        </Text>
        <Spacer />

        <Text color="gray.200">
          <div className={styles.card}>
            <p>Email:{props.movie.email}</p>
          </div>
        </Text>
        {/* </HStack> */}
        <Text my={2} color="gray.400">
          <div className={styles.card}>
            <p>Amount: {props.movie.amount.toString()}</p>
          </div>
        </Text>
      </Stack>
    </Box>
  );
};
