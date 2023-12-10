use solana_program::{
    account_info::{next_account_info, AccountInfo},
    borsh::try_from_slice_unchecked,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::invoke_signed,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};
use std::convert::TryInto;
pub mod addInstruction;
pub mod state;
use addInstruction::LoanInstruction;
use addInstruction::LoanReviewPayload;
use borsh::BorshSerialize;
use state::LoanAccountState;

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = LoanInstruction::unpack(instruction_data)?;
    match instruction {
        LoanInstruction::ApplyLoan {
            name,
            email,
            dob,
            amount,
        } => add_loan_review(program_id, accounts, name, email, dob, amount),
        //LoanInstruction::GrantLoan {} => grant_loan_review(program_id, accounts),
    }
}

pub fn add_loan_review(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    name: String,
    email: String,
    dob: String,
    amount: String,
) -> ProgramResult {
    msg!("Apply for loan...");
    msg!("Name: {}", name);
    msg!("Email: {}", email);
    msg!("Amount: {}", amount);

    // Get Account iterator
    let account_info_iter = &mut accounts.iter();

    // Get accounts
    let initializer = next_account_info(account_info_iter)?;
    let pda_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    // Derive PDA and check that it matches client
    let (pda, bump_seed) = Pubkey::find_program_address(
        &[initializer.key.as_ref(), name.as_bytes().as_ref()],
        program_id,
    );

    // Calculate account size required
    let account_len: usize = 1 + 1 + (4 + name.len()) + (4 + email.len()) + (4 + dob.len()) + (4 + amount.len());
    // + (4 + initializer.key.as_ref().len());

    // Calculate rent required
    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(account_len);

    // Create the account
    invoke_signed(
        &system_instruction::create_account(
            initializer.key,
            pda_account.key,
            rent_lamports,
            account_len.try_into().unwrap(),
            program_id,
        ),
        &[
            initializer.clone(),
            pda_account.clone(),
            system_program.clone(),
        ],
        &[&[
            initializer.key.as_ref(),
            name.as_bytes().as_ref(),
            &[bump_seed],
        ]],
    )?;

    msg!("PDA created: {}", pda);

    msg!("unpacking state account");
    let mut account_data =
        try_from_slice_unchecked::<LoanAccountState>(&pda_account.data.borrow()).unwrap();
    msg!("borrowed account data");
    // if (account_data.is_initialized) {
    //     return Err(("already initialized"));
    // }
    // let address: Pubkey = *initializer.key;
    account_data.is_initialized = true;
    account_data.name = name;
    account_data.email = email;
    account_data.dob = dob;
    account_data.amount = amount;
    // account_data.address = address;

    msg!("serializing account");
    account_data.serialize(&mut &mut pda_account.data.borrow_mut()[..])?;
    msg!("state account serialized");

    Ok(())
}


