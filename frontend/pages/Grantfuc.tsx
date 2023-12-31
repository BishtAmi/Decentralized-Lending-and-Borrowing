// this page is in progress
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
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
const MOVIE_REVIEW_PROGRAM_ID = "54NiyD7beYFBDUZq8DNTpmAbeqKB3YNgE8CnUpzYmCCt";
export interface CardProps {
  movie: Loan;
}
import { useState } from "react";
const Card: FC<CardProps> = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [amount, setAmount] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
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
    const amountint = parseInt(props.movie.amount, 10);

    const buffer = props.movie.amount;
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
              <Button onClick={handleSubmit} size={"md"}>
                Grant Loan
              </Button>
            </div>
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};

export default Card;
