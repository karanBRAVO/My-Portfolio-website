import { useNavigate } from "react-router-dom";

const Privacy_Policy = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

        <p className="mb-4">Last updated: 30-10-2023</p>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Introduction</h2>
          <p>
            Welcome to Karan Yadav's Portfolio website. At MyBlog-Karan Yadav, I
            respect your privacy and are committed to protecting your personal
            information. This Privacy Policy is designed to help you understand
            how we collect, use, disclose, and safeguard your personal
            information. By using my website, you agree to the terms of this
            Privacy Policy.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Information MyBlog Collect</h2>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Personal Information</h3>
            <p>
              I may collect personal information that you voluntarily provide to
              us, including but not limited to your name, email address, and any
              other information you choose to provide when contacting me through
              my contact form.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Usage Data</h3>
            <p>
              I may collect non-personal information about how our website is
              accessed and used. This information may include your browser type,
              operating system, IP address, pages visited, and referring
              website.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">How I Use Your Information</h2>
          <p>
            I may use the information we collect for various purposes,
            including:
          </p>
          <ul className="list-disc ml-6">
            <li>
              To respond to your inquiries and provide the services you request.
            </li>
            <li>
              To improve and optimize our website's performance and user
              experience.
            </li>
            <li>To analyze and monitor usage patterns and trends.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Disclosure of Your Information
          </h2>
          <p>
            I do not sell, trade, or otherwise transfer your personal
            information to third parties. However, we may share your information
            with trusted service providers who assist me in operating our
            website and providing services.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Security</h2>
          <p>
            I take reasonable measures to protect the personal information
            submitted to me. However, no method of transmission over the
            internet or electronic storage is completely secure. Therefore, we
            cannot guarantee absolute security.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Cookies</h2>
          <p>
            My website may use cookies to enhance your browsing experience. You
            can choose to disable cookies through your browser settings, but
            this may affect the functionality of the website.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Changes to This Privacy Policy
          </h2>
          <p>
            I may update this Privacy Policy from time to time. The updated
            version will be effective as of the date it is posted on the
            website.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Contact Me</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact me at{" "}
            <span className="font-text text-blue-500">
              xpresskaran98@gmail.com
            </span>
            .
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

export default Privacy_Policy;
