const subscribed_template = (users_name) => {
  return `
 <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

 <h1 style="color: #333;">Welcome to MyBlog-Karan Yadav Updates!</h1>

 <p>Dear ${users_name},</p>

 <p>Welcome aboard! We're delighted to have you as a subscriber to MyBlog-Karan Yadav's updates. This means you're now part of an exclusive community receiving the latest and greatest from me.</p>

 <h2 style="color: #333;">What you can expect:</h2>
 <ol style="list-style: decimal; margin-bottom: 20px;">
     <li style="margin-bottom: 8px;">Stay in the Loop: You'll be the first to know about my newest videos, tutorials, and updates.</li>
     <li style="margin-bottom: 8px;">Personalized Recommendations: I'll tailor my content to match your interests, ensuring you get the most out of each update.</li>
     <li style="margin-bottom: 8px;">Engagement and Interaction: I love hearing from my subscribers! Feel free to comment and share your thoughts with us.</li>
 </ol>

 <p>To start enjoying all the benefits, simply head over to our <a href="https://www.youtube.com/channel/UC3c471ecB2uo6pJUfmPt_Ow" style="color: #007bff; text-decoration: none;">Karan Yadav [My Youtube Channel]</a> and hit the subscribe button. It's that easy!</p>

 <br>

 <p>If you have any questions, suggestions, or just want to say hello, don't hesitate to reach out. You can directly message or go to contact section on MyBlog-Karan Yadav.</p>

 <br>
 
 <p>Thank you for joining. I can't wait to share exciting updates with you!</p>

 <br>

 <p style="margin-bottom: 0;">Warm regards,</p>
 <p style="margin-top: 0;">Karan Yadav<br>Owner/Developer<br>xpresskaran98@gmail.com | 7814677153</p>

</div> 
`;
};

export default subscribed_template;
