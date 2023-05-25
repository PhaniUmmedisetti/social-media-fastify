// import * as bcrypt from 'bcrypt';

// export class HashingService {
//   async hash(unhashedValue: string): Promise<string> {
//     return bcrypt.hash(unhashedValue, this.saltRounds);
//   }

//   async compare(candidateValue: string, hashedValue: string): Promise<boolean> {
//     return bcrypt.compare(candidateValue, hashedValue);
//   }

//   get saltRounds(): number {
//     const envSaltRounds = process.env.BCRYPT_SALT_ROUNDS || '';
//     return parseInt(envSaltRounds, 10) || 10;
//   }
// }
