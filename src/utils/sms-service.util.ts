// export const OTPMessageTemplate = (OTP: number): string => {
//   return `${OTP} is your OTP to log into your app. OTP valid for ${Math.floor(
//     Number(process.env.OTP_VALID_TILL_IN_SECONDS) / 60
//   )} minutes. Do not share this OTP with anyone -Narayanas The Learning App`

// };

// export const stageDefaultOTPConfig = {
//   startWithNumberRange : 1,
//   endWithNumberRange : 5,
//   defaultOTP : 1234
// }

// export const sendMessageToMobile = async (
//   repository: any,
//   countryCode: string,
//   mobile: string ,
//   message: string
// ): Promise<void> => {
//   if (countryCode && mobile && message && repository) {
//     await repository.sendSMS({
//       phoneNumber: `${countryCode}${mobile}`,
//       message: message,
//     });
//   }
// };
