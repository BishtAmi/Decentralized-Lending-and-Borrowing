import * as borsh from "@project-serum/borsh";
export class Loan {
  name: string;
  email: string;
  dob: string;
  amount: string;
  constructor(
    name: string,
    email: string,
    dob: string,
    amount: string,
  ) {
    this.name = name;
    this.email = email;
    this.dob = dob;
    this.amount = amount;
  }

  // const mocks=new Loan({
  //  name: "Amit",
  //  email: "singhbisht@gmail.com",
  //  purpose:  "Education",
  //  amount: "100"
  // });
  // const borshInstructionSchema: Schema =  new Map([
  //   [
  //     Loan,
  //     {
  //       kind: 'struct',
  //       fields: [
  //         ['name', 'string'],
  //         ['email', 'string'],
  //         ['dob', ['string']],
  //         ['amount','u32'],
  //         ['variant','u8']
  //       ],
  //     },
  //   ],
  // ]);
  // const buffer = borsh.serialize(this.borshInstructionSchema, value);
  static mocks: Loan[] = [
    new Loan(
      "The Shawshank Redemption",
      "okke",
      `For a Loan shot entirely in prison where there is no hope at all, shawshank redemption's main massage and purpose is to remind us of hope, that even in the darkest places hope exists, and only needs someone to find it. Combine this message with a brilliant screenplay, lovely characters and Martin freeman, and you get a Loan that can teach you a lesson everytime you watch it. An all time Classic!!!`,
      "5",
    ),
    new Loan(
      "The Shawshank Redemption",
      "okkke",
      `For a Loan shot entirely in prison where there is no hope at all, shawshank redemption's main massage and purpose is to remind us of hope, that even in the darkest places hope exists, and only needs someone to find it. Combine this message with a brilliant screenplay, lovely characters and Martin freeman, and you get a Loan that can teach you a lesson everytime you watch it. An all time Classic!!!`,
      "5",
    ),
    new Loan(
      "The Shawshank Redemption",
      "okkee",
      `For a Loan shot entirely in prison where there is no hope at all, shawshank redemption's main massage and purpose is to remind us of hope, that even in the darkest places hope exists, and only needs someone to find it. Combine this message with a brilliant screenplay, lovely characters and Martin freeman, and you get a Loan that can teach you a lesson everytime you watch it. An all time Classic!!!`,
      "5",
    
    ),
    new Loan(
      "The Shawshank Redemption",
      "okkke",
      `For a Loan shot entirely in prison where there is no hope at all, shawshank redemption's main massage and purpose is to remind us of hope, that even in the darkest places hope exists, and only needs someone to find it. Combine this message with a brilliant screenplay, lovely characters and Martin freeman, and you get a Loan that can teach you a lesson everytime you watch it. An all time Classic!!!`,
      "5",
    ),
  ];

  borshInstructionSchema = borsh.struct([
    borsh.u8("variant"),
    borsh.str("name"),
    borsh.str("email"),
    borsh.str("dob"),
    borsh.str("amount"),
  ]);

  static borshAccountSchema = borsh.struct([
    borsh.bool("initialized"),
    borsh.str("name"),
    borsh.str("email"),
    borsh.str("dob"),
    borsh.str("amount"),
  ]);
  serialize(): Buffer {
    const buffer = Buffer.alloc(1000);
    this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer);
    return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer));
  }

  static deserialize(buffer?: Buffer): Loan | null {
    if (!buffer) {
      return null;
    }

    try {
      const { name, email, dob, amount, key } =
        this.borshAccountSchema.decode(buffer);
      return new Loan(name, email, dob, amount);
    } catch (e) {
      console.log("Deserialization error:", e);
      console.log(buffer);
      return null;
    }
  }
}
