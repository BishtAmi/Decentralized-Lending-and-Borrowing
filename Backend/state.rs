use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::pubkey::Pubkey;

#[derive(BorshSerialize, BorshDeserialize)]
pub struct LoanAccountState {
    pub is_initialized: bool,
    pub name: String,
    pub email: String,
    pub dob: String,
    pub amount: String,
    // pub address: Pubkey,
}

