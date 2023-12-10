import { Center, Box, Heading, Spacer } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { AppBar } from "../Data/AppBar";
import { MovieList } from "../Data/ApplicationList";
import styles from "./Home.module.css";
import HomePage from "./Homepage";
const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Loan Application</title>
      </Head>
      <AppBar />
      <Center>
        <Box>
          <Heading as="h1" size="l" color="white" ml={4} mt={20} mb={10}>
            <HomePage />
          </Heading>
          <Spacer></Spacer>
          <div className={styles.Loa}>
            <div className={styles.Loanh1}>
              {/* <h1>Application for Loan</h1> */}
            </div>
            {/* <Form /> */}
          </div>
          <Heading as="h1" size="l" color="white" ml={4} mt={8}>
            <div className={styles.Loanh2}>Existing Applications</div>
          </Heading>
          <MovieList />
        </Box>
      </Center>
    </div>
  );
};

export default Home;

