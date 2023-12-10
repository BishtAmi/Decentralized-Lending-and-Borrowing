use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::program_error::ProgramError;

pub enum LoanInstruction {
    ApplyLoan {
        name: String,
        email: String,
        dob: String,
        amount: String,
    },
    // GrantLoan {},
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct LoanReviewPayload {
    pub name: String,
    pub email: String,
    pub dob: String,
    pub amount: String,
}
// #[derive(BorshSerialize, BorshDeserialize, Debug)]
// pub struct LoanGrantPayload {
//     pub name: String,
//     pub email: String,
//     pub dob: String,
//     pub amount: u128,
// }

// implementation of Movie Instruction fuction
impl LoanInstruction {
    // Unpack inbound buffer to associated Instruction
    // The expected format for input is a Borsh serialized vector
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        // Split the first byte of data
        let (&variant, rest) = input
            .split_first()
            .ok_or(ProgramError::InvalidInstructionData)?;
        // `try_from_slice` is one of the implementations from the BorshDeserialization trait
        // Deserializes instruction byte data into the payload struct
        let payload = LoanReviewPayload::try_from_slice(rest).unwrap();
        // Match the first byte and return the AddMovieReview struct
        Ok(match variant {
            0 => Self::ApplyLoan {
                name: payload.name,
                email: payload.email,
                dob: payload.dob,
                amount: payload.amount,
            },
            // 1 => {
            //     // let payload = LoanReviewPayload::try_from_slice(rest).unwrap();
            //     Self::GrantLoan {}
            // }
            _ => return Err(ProgramError::InvalidInstructionData),
        })
    }
}
