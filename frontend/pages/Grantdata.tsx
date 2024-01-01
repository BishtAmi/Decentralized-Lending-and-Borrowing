import Card  from "./Grant";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { FC, useEffect, useMemo, useState } from "react";
import { Loan } from "../Models/Loan";
import * as web3 from "@solana/web3.js";
import { LoanCoordinator } from "../Coordinator/LoanCoordinator";
import styles from "./Home.module.css";
import { Button, Center, HStack, Input, Spacer } from "@chakra-ui/react";
import AppBar from "./AppBar";
const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#042c54",
      },
    },
  },
});
const LoanList: FC = () => {
  //const connection = new web3.Connection('https://white-spring-spring.solana-devnet.quiknode.pro/5e71175caa83cbf42670c2bb41e8eb6ff4799cde/');
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const [Loans, setLoans] = useState<Loan[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    LoanCoordinator.fetchPage(connection, page, 5, search, search !== "").then(
      setLoans
    );
  }, [page, search]);

  return (
    <ChakraProvider theme={theme}>
      <div className={styles.Grant}>
        <Center>
          <Input
            id="search"
            color="gray.400"
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search"
            w="60%"
            backgroundColor={"white"}
            mt={2}
            mb={2}
          />
        </Center>
        {Loans.map((Loan, i) => (
          <Card key={i} Loan={Loan} />
        ))}
        <Center>
          <HStack w="full" mt={2} mb={8} ml={4} mr={4}>
            {page > 1 && (
              <Button onClick={() => setPage(page - 1)}>Previous</Button>
            )}
            <Spacer />
            {LoanCoordinator.accounts.length > page * 5 && (
              <Button onClick={() => setPage(page + 1)}>Next</Button>
            )}
          </HStack>
        </Center>
      </div>
    </ChakraProvider>
  );
};

export default LoanList;
