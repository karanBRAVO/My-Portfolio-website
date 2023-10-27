const otp_template = (otp) => {
  return `
<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 400px; margin: 0 auto;">
  <h2 style="color: #333333;">OTP Verification</h2>
  <p style="font-size: 18px; color: #444444;">Your OTP is: <strong style="color: #007BFF;">${otp}</strong></p>
  <p style="font-size: 14px; color: #777777;">Please enter this OTP to complete your verification.</p>
</div>
    `;
};

export default otp_template;
