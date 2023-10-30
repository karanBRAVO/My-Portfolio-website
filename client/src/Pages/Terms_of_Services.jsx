import { useNavigate } from "react-router-dom";

const Terms_of_Services = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>

        <p className="mb-4">Last updated: 30-10-2023</p>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Acceptance of Terms</h2>
          <p>
            Welcome to Karan Yadav's Portfolio website. By accessing or using my
            website, you agree to be bound by these Terms of Service. If you
            disagree with any part of these terms, please do not use my website.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Intellectual Property</h2>
          <p>
            The content on this website, including but not limited to text,
            graphics, logos, and images, is the property of MyBlog-Karan Yadav
            and is protected by copyright laws. You may not reproduce,
            distribute, or use this content without prior written permission.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">User Accounts</h2>
          <p>
            When you create an account with me, you must provide accurate and
            complete information. You are solely responsible for maintaining the
            confidentiality of your account and password. You agree to notify us
            immediately of any unauthorized use of your account.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Limitations of Liability</h2>
          <p>
            Karan Yadav[me] will not be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of the use
            or inability to use our website.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in
            accordance with the laws of India, without regard to its conflict of
            law provisions.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Changes to Terms of Service
          </h2>
          <p>
            I reserve the right to update or change these Terms of Service at
            any time. The updated version will be effective as of the date it is
            posted on the website.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms of Service,
            please contact me at{" "}
            <span className="text-blue-500">xpresskaran98@gmail.com</span>.
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Terms_of_Services;
