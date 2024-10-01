export class Utils {
  // generate otp for email verification
  static generateOTP(digit = 6): string {
    let otp = "";
    for (let i = 0; i < digit; i++) {
      if (i === 0) {
        // first digit can't be zero
        otp += Math.floor(Math.random() * 9 + 1);
      } else {
        otp += Math.floor(Math.random() * 10);
      }
    }
    return otp;
  }

  // add times to date
  static generateVerificationTime(base: Date, minutesAdded: number): Date {
    base.setMinutes(base.getMinutes() + minutesAdded);
    return base;
  }

  static formatDate(date: Date): string {
    // Get the year, month, and day from the Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");

    // Concatenate the year, month, and day with a dash separator
    return `${year}-${month}-${day}`;
  }
}
