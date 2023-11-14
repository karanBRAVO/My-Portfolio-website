const adminLogin_template = (username, useragent, token) => {
  return `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

        <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">Login Notification</h2>
            <p>Hello Admin,</p>
            <p style="color: #555;">This is to inform you that a user has successfully logged in to the system.</p>
            <p style="color: #555;">User Details:</p>
            <ul style="list-style-type: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Username:</strong> ${username}</li>
                <li style="margin-bottom: 10px;"><strong>Logged on:</strong> ${useragent}</li>
                <li style="margin-bottom: 10px;"><strong>Token:</strong> ${token}</li>
            </ul>
            <p style="color: #555;">Thank you!</p>
            <p><em style="color: #777;">MyBlog-Karan Yadav</em></p>
        </div>
    
    </div>`;
};

export default adminLogin_template;
