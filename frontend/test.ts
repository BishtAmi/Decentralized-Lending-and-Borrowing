const web3 =  require('@solana/web3.js')
const borsh = require('@project-serum/borsh')
const dotenv =  require('dotenv')
const base58 =  require('bs58')
dotenv.config()

const keypairFromSecretKey = web3.Keypair.fromSecretKey(base58.decode("5Z5wfvDqFt9mpqLGfjipP5bzPciooMgKn47pSoanaFY7aDtSZ1rbzRw7bqDdWMHVbJBY5VE1TSPWM57vhKAYydJ2"));
async function airdropSolIfNeeded(signer, connection) {
    const balance = await connection.getBalance(signer.publicKey)
    console.log('Current balance is', balance)
    // if () {
    //     console.log('Airdropping 1 SOL...')
    //     await connection.requestAirdrop(signer.publicKey, web3.LAMPORTS_PER_SOL)
    // }
}
const movieInstructionLayout = borsh.struct([
    borsh.u8('variant'),
    borsh.str('name'),
    borsh.u8('email'),
    borsh.str('dob'),
    borsh.u8('amount')
])

async function sendTestMovieReview(signer, programId, connection) {
    let buffer = Buffer.alloc(1000)
    const movieTitle = 'Amit'
    movieInstructionLayout.encode(
        {
            variant: 0,
            name: movieTitle,
            email: "singh@gmail.com",
            dob: '12/1/2004',
            amount: 100
        },
        buffer
    )

    buffer = buffer.slice(0, movieInstructionLayout.getSpan(buffer))

    // const [pda] = await web3.PublicKey.findProgramAddress(
    //     [signer.publicKey.toBuffer(), Buffer.from(movieTitle)],
    //     programId
    // )

    // console.log("PDA is:", pda.toBase58())

 //  const greetingAccountKp = new web3.Keypair();
//     // console.log(greetingAccountKp.publicKey);
//     //     // const lamports = await connection.getMinimumBalanceForRentExemption(
//     //     // );
  // const lamports= 1818720;
    
  // const GREETING_SIZE = 20;
// //   const lamports = await connection.getMinimumBalanceForRentExemption(
// //     GREETING_SIZE
// //     );
    // const createGreetingAccountIx = web3.SystemProgram.createAccount({
    //   fromPubkey: signer.publicKey,
    //   newAccountPubkey: greetingAccountKp.publicKey,
    //   lamports: lamports,
    //   space: GREETING_SIZE,
    //   programId: programId
    // });

// //     // Create greet instruction
 

// //     // Create transaction and add the instructions
    // const tx1 = new web3.Transaction();
    // tx1.add(createGreetingAccountIx);

// // //     // // Send and confirm the transaction
    // const txHash = await web3.sendAndConfirmTransaction(connection, tx1, [
    //   signer,
    //   greetingAccountKp,
    // ]);
    // console.log(txHash);

    
    // const pubkey = new web3.PublicKey(
    //     "3Z8MZA3rUpTnJ7cY98xVRsK8epbYacNAa66k7zWoxHGX"
    // ); 
    // const transaction = new web3.Transaction()
    
    // const instruction = new web3.TransactionInstruction({
    //     programId: programId,
    //     data: buffer,
    //     keys: [
    //         {
    //             pubkey: pubkey,
    //             isSigner: false,
    //             isWritable: true
    //         }
    //     ]
    // })

    // transaction.add(instruction)
    // const tx = await web3.sendAndConfirmTransaction(connection, transaction, [signer])
    // console.log(`https://solscan.io/tx/${tx}?cluster=devnet`)
}

async function main() {
    const signer = keypairFromSecretKey;
    
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    await airdropSolIfNeeded(signer, connection)
    
    const movieProgramId = new web3.PublicKey('7LVQSN5Wwph33BFqmhYSo8gwPZg1xdFM5LFB59MWd8pw')
    await sendTestMovieReview(signer, movieProgramId, connection)
}


const borshAccountSchema = borsh.struct([
    borsh.str('name'),
    borsh.u8('email'),
    borsh.str('dob'),
    borsh.u8('amount')
  ]);
async function deserialize()
{
    // const movieTitle = 'POKO';
    // const signer=keypairFromSecretKey;
    // const programId=new web3.PublicKey("HaRwYqYwNbg1dB7bYxUMKjevjLuSx4v5yiFKdeyd1UbT");
    // const [pda] = await web3.PublicKey.findProgramAddress(
    //     [signer.publicKey.toBuffer(), Buffer.from(movieTitle)],
    //     programId
    // )
    const pubkey = new web3.PublicKey(
        "3Z8MZA3rUpTnJ7cY98xVRsK8epbYacNAa66k7zWoxHGX"
    );
      // console.log(pubkey);
    let connection= new web3.Connection(web3.clusterApiUrl('devnet'));
      //console.log("PDA is:", pda.toBase58())
    const greetingAccount = await connection.getAccountInfo(pubkey);
    console.log(greetingAccount);
      //Deserialize the account data
    const { name,email,dob,amount } = borshAccountSchema.decode(greetingAccount.data);
      console.log("Name", name);
      console.log("email",email);
      console.log("dob: ", dob);
      console.log("amount: ", amount);
}
// Eo5P8fAYDG5SfNGxZUGVqQBBUegYip12w87WmcapYipP
 // deserialize();

main().then(() => {
    console.log('Finished successfully')
    process.exit(0)
}).catch(error => {
    console.log(error)
    process.exit(1)
})