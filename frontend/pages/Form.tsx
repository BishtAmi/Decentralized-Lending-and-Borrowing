import { Loan } from "../Models/Loan";
import { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import styles from "../pages/Home.module.css";
import AppBar from "./AppBar";
const MOVIE_REVIEW_PROGRAM_ID = "54NiyD7beYFBDUZq8DNTpmAbeqKB3YNgE8CnUpzYmCCt";
const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [amount, setAmount] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [key, setKey] = useState("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const movie = new Loan(name, email, dob, amount);
    handleTransactionSubmit(movie);
  };
  const [inputValue, setInputValue] = useState("");
  // const handleApplyClick = () => {
  //   // Your logic for handling the button click with the integer value
  //   const integerValue = parseInt(inputValue, 10);
  //   if (!isNaN(integerValue)) {
  //     // Perform actions with the integer value
  //     console.log("Integer value:", integerValue);
  //   } else {
  //     // Show an error message or handle the case where the input is not a valid integer
  //     console.error("Invalid integer value");
  //   }
  // };
  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Check if the input consists of only digits using a regular expression
    if (/^\d*$/.test(inputValue)) {
      setAmount(inputValue);
    }
  };
  const handleTransactionSubmit = async (movie: Loan) => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    const buffer = movie.serialize();
    const transaction = new web3.Transaction();

    const [pda] = await web3.PublicKey.findProgramAddress(
      [publicKey.toBuffer(), Buffer.from(movie.name)], // new TextEncoder().encode(movie.name)],
      new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    );

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });

    transaction.add(instruction);

    try {
      let txid = await sendTransaction(transaction, connection);
      alert(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (e) {
      console.log(JSON.stringify(e));
      alert(JSON.stringify(e));
    }
  };

  return (
    <div className={styles.App}>
      <AppBar/>
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        <div className={styles.Loan}>
          <div className={styles.Loanh1}>
            <h1>Application for Loan</h1>
          </div>
          <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="60rem"
            borderWidth={0}
            color={"black"}
            margin={2}
            textAlign={"center"}
            justifyContent="center"
          >
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Spacer></Spacer>
                <FormLabel color="gray.200">
                  <div className={styles.char}>Name </div>
                </FormLabel>
                <Input
                  id="name"
                  color="black"
                  placeholder="Jhon Wick"
                  onChange={(event) => setName(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel color="gray.200">
                  <div className={styles.char}>Email</div>
                </FormLabel>
                <Input
                  id="email"
                  color="black"
                  placeholder="hello@gmail.com"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel color="black">
                  <div className={styles.char}>Purpose</div>
                </FormLabel>
                <Textarea
                  id="review"
                  color="black"
                  placeholder="Home Loan"
                  onChange={(event) => setDob(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel color="black">
                  <div className={styles.char}>Amount</div>
                </FormLabel>
                <Input
                  // onChange={(event) =>
                  //   setAmount(Number(event.currentTarget.value))}
                  // onInput={handleInputChange(event)
                  type="number"
                  onChange={(event) => {
                  setAmount(event.currentTarget.value);
                  
                  }}
                >
                  {/* <NumberInputField id="amount" color="gray.400" />
                  <NumberInputStepper color="gray.400">
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper> */}
                </Input>
              </FormControl>
              <Button
                width="full"
                mt={4}
                type="submit"
                color={"white"}
                backgroundColor={"black"}
                _hover={{ backgroundColor: "skyblue", color: "black" }}
              >
                Apply
              </Button>
            </form>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Form;
