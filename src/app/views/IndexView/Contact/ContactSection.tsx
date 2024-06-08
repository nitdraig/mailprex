import Form from "@/app/components/IndexComponents/Form";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaGithub, FaLinkedin, FaNpm } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section
      className="lg:h-full h-full bg-gradient-to-tr from-accent via-primary to-primary"
      id="contact"
    >
      <div className="grid pt-16  sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl  rounded-md text-accent font-[sans-serif]">
        <div>
          <h3 className=" text-3xl uppercase lg:text-4xl color-changing-text font-bold mb-4 text-accent  -pt-2">
            Lets Talk
          </h3>
          <p className="text-lg text-accent mt-3">
            Do you have any questions regarding MAILPREX? Then contact us We
            would love to provide you with help.
          </p>

          {/* <div className="mt-12">
            <h2 className="text-lg text-accent font-extrabold">Socials</h2>
            <div className="flex gap-4  mb-4 mt-2">
              <a
                href="#"
                className="text-4xl  text-accent hover:text-primary transition  "
              >
                <FaLinkedin />
              </a>
              <a href="#" className="text-4xl  text-accent hover:text-primary">
                <FaGithub />
              </a>
              <a href="#" className="text-4xl  text-accent hover:text-primary">
                <BsTwitter />
              </a>
            </div>
          </div> */}
        </div>

        <Form />
      </div>
    </section>
  );
};

export default ContactSection;
