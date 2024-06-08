import Form from "@/app/components/IndexComponents/Form";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaGithub, FaLinkedin, FaNpm } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";

const ContactSection = () => {
  return (
    <section className="lg:h-full h-full bg-gradient-to-tr from-accent via-primary to-primary">
      <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl  rounded-md text-accent font-[sans-serif]">
        <div>
          <h1 className="text-3xl font-extrabold">Lets Talk</h1>
          <p className="text-sm text-accent mt-3">
            Have some big idea or brand to develop and need help? Then reach out
            wed love to hear about your project and provide help.
          </p>

          <div className="mt-12">
            <h2 className="text-lg text-accent font-extrabold">Socials</h2>

            <div className="flex gap-3  mb-4 mt-2">
              <a
                href="#"
                className=" text-3xl text-accent hover:text-secondary transition  "
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className=" text-3xl  text-accent hover:text-secondary"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className=" text-3xl text-accent hover:text-secondary"
              >
                <BsTwitter />
              </a>
            </div>
          </div>
        </div>

        <Form />
      </div>
    </section>
  );
};

export default ContactSection;
