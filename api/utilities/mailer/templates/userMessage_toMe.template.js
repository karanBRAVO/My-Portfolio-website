const usersMessage_template = (name, email, phone, message) => {
  return `
<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

  <h2 style="text-align: center;">User Information</h2>

  <div style="background-color: #fff; padding: 20px; border-radius: 10px; border: 1px solid #ccc; margin-bottom: 20px;">

      <div style="margin-bottom: 10px;">
          <label style="font-weight: bold; display: block;">Name:</label>
          <div style="font-size: 18px;">${name}</div>
      </div>

      <div style="margin-bottom: 10px;">
          <label style="font-weight: bold; display: block;">Email:</label>
          <div style="font-size: 18px;">${email}</div>
      </div>

      <div style="margin-bottom: 10px;">
          <label style="font-weight: bold; display: block;">Phone:</label>
          <div style="font-size: 18px;">${phone}</div>
      </div>

      <div style="margin-bottom: 10px;">
          <label style="font-weight: bold; display: block;">Message:</label>
          <div style="font-size: 18px;">${message}</div>
      </div>

  </div>

</div>
`;
};

export default usersMessage_template;
