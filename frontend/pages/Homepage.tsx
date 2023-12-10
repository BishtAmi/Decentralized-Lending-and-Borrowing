import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ChakraProvider,
  Spacer,
  extendTheme,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import styles from "./Home.module.css";
import Link from "next/link";
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
import { useRouter } from "next/router";
function HomePage() {
  const router = useRouter();
  const navigateToForm = () => {
    router.push("/Form"); // Specify the path to the AppBar page
  };
  const navigateToGrant = () => {
    router.push("/Grantdata"); // Specify the path to the AppBar page
  };
  const navigateToPay = () => {
    router.push("/Pay"); // Specify the path to the AppBar page
  };

  return (
    // <div className={styles.App}>
    <ChakraProvider theme={theme}>
      <Box h="65vh" display="flex" alignItems="center" justifyContent="center">
        <Box
          backgroundColor="white"
          padding="20px"
          borderRadius="10px"
          maxWidth="400px"
          textAlign="center"
          boxShadow={"5px 5px 10px rgba(0,0,0,0.3),0 1px 2px rgba(0,0,0,0.24)"}
          // box-shadow="5px 5px 10px rgba(0,0,0,0.3),0 1px 2px rgba(0,0,0,0.24)"
        >
          <div className={styles.msg}>
            <h1> Click below to Apply for Loan</h1>
          </div>
          <div className={styles.button3}>
            <div className={styles.left}>
              <Button
                backgroundColor="rgb(7, 6, 7)"
                color="white"
                variant="solid"
                size="lg"
                _hover={{ backgroundColor: "skyblue", color: "black" }}
                //onClick={handleApplyClick}
                onClick={navigateToForm}
              >
                <Link href={"/Form"}>Apply</Link>
              </Button>
            </div>
            {/* <Box mt={1}> */}
            <div className={styles.msg}>
              <h1> Click below to grant for Loan</h1>
            </div>
            <div className={styles.right}>
              <Button
                backgroundColor="rgb(7, 6, 7)"
                color="white"
                variant="solid"
                size="lg"
                _hover={{ backgroundColor: "skyblue", color: "black" }}
                onClick={navigateToGrant}
              >
                <Link href={"/Grantdata"}> Grant</Link>
              </Button>
              <Spacer></Spacer>
              <div className={styles.msg}>
                <h1> Click below to pay Loan</h1>
              </div>
            </div>
            <div className={styles.centers}>
              <Button
                backgroundColor="rgb(7, 6, 7)"
                color="white"
                variant="solid"
                size="lg"
                _hover={{ backgroundColor: "skyblue", color: "black" }}
                onClick={navigateToPay}
              >
                Pay
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </ChakraProvider>
    // </div>
  );
}

export default HomePage;
