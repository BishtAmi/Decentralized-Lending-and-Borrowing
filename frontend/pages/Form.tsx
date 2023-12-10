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
                  placeholder="enter your name"
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
                  placeholder="enter your email"
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
                  placeholder="purpose of loan"
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
                  onChange={(event) => setAmount(event.currentTarget.value)}
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
