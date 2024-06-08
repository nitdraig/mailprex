"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Terms() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent text-accent  transition  "
      >
        Terms and Conditions
      </Button>
      <Modal
        size={"lg"}
        scrollBehavior={"inside"}
        isOpen={isOpen}
        backdrop="opaque"
        onOpenChange={onOpenChange}
        isDismissable={true}
        isKeyboardDismissDisabled={true}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Terms and Conditions of MAILPREX
              </ModalHeader>
              <ModalBody>
                <p>
                  <span className="font-bold">
                    Mailprex Terms and Conditions
                  </span>
                  <br />
                  Welcome to Mailprex. By using our platform, you agree to
                  comply with and be bound by the following terms and conditions
                  (Terms of Service). Please read them carefully before using
                  our service.
                </p>
                <p>
                  <span className="font-bold">1. Acceptance of Terms: </span>
                  By accessing and using the Mailprex platform, you accept and
                  agree to be bound by these Terms of Service. If you do not
                  agree to these terms, you should not use our platform.
                  términos, te pedimos que no utilices nuestros servicios.
                  <br />
                  <span className="font-bold">2. Service Description: </span>
                  Mailprex provides a platform for sending emails through forms
                  on the front end of websites. We offer different subscription
                  plans with specific features and usage limits. <br />
                  <span className="font-bold">
                    3. Registration and Security:
                  </span>
                  To use Mailprex, you must register by providing accurate and
                  complete information. You are responsible for maintaining the
                  confidentiality of your account and password and are
                  responsible for all activities that occur under your account.
                  You must immediately notify Mailprex of any unauthorized use
                  of your account. <br />
                  <span className="font-bold">4. Acceptable Use: </span>
                  You agree to use Mailprex only for lawful purposes and in
                  accordance with these Terms of Service. Is prohibited: * Send
                  spam or unsolicited emails. * Use the service to transmit
                  content that is illegal, harmful, threatening, abusive,
                  defamatory, vulgar, obscene, invasive of the privacy of
                  others, hateful or racially, ethnically or otherwise
                  objectionable. * Interfere with the operation of the Mailprex
                  platform or with the use of it by other users.
                  <br />
                  <span className="font-bold">
                    5. Pricing and Payment Plans:
                  </span>
                  Mailprex offers different subscription plans: * Basic Plan:
                  Includes 200 emails per month. * Professional Plan: Includes
                  2000 emails per month. * Business Plan: Includes 5000 emails
                  per month. Payments are made according to the selected plan.
                  Mailprex reserves the right to change rates at any time,
                  notifying users affected by such changes in advance.
                  <br />{" "}
                  <span className="font-bold">
                    6. Cancellation and Refunds:
                  </span>{" "}
                  You can cancel your subscription at any time. Refunds for
                  payments made will be issued in accordance with our refund
                  policy, which is detailed on our website.
                  <span className="font-bold">
                    6. Cancellation and Refunds:{" "}
                  </span>
                  You can cancel your subscription at any time. Refunds for
                  payments made will be issued in accordance with our refund
                  policy, which is detailed on our website.
                  <br />
                  <span className="font-bold"> 7. Security and Privacy: </span>
                  Mailprex implements robust security measures to protect user
                  information. However, You acknowledge that the use of the
                  Internet involves certain risks and that the complete security
                  of the data transmitted cannot be guaranteed.
                  <br />
                  <span className="font-bold"> 8. Intellectual Property: </span>
                  All intellectual property rights related to the Mailprex
                  platform, including software, content, graphics and logos, are
                  the exclusive property of Mailprex or its licensors. You may
                  not copy, modify, distribute, sell or lease any part of our
                  services or software.
                  <span className="font-bold">9. Limitation of Liability:</span>
                  Mailprex will not be liable for any indirect, incidental,
                  special, consequential or punitive damages, nor for any loss
                  of profits or revenue, whether incurred directly or
                  indirectly, nor for any loss of data, use, goodwill or other
                  intangible losses, resulting from: <br />
                  Your access to or use of or inability to access or use the
                  Platform. Any conduct or content of any third party on the
                  platform. Any content obtained from the platform. Unauthorized
                  access, use or alteration of your transmissions or content.
                  <br />
                  <span className="font-bold">
                    10. Modifications to the Terms of Service:
                  </span>
                  Mailprex reserves the right to modify these Terms of Service
                  at any time. Modifications will be effective once posted on
                  our website. It is your responsibility to periodically review
                  these Terms of Service to be aware of any changes.
                  <br /> <span className="font-bold"> 11. Termination:</span>
                  Mailprex may suspend or terminate your access to the Platform
                  at any time, without notice, for any reason, including breach
                  of these Terms of Service.
                  <br />
                  <span className="font-bold">
                    12. Applicable Law and Jurisdiction:
                  </span>
                  These Terms of Service shall be governed by and construed in
                  accordance with the laws of the country in which Mailprex is
                  located. Any dispute arising out of or in connection with
                  these Terms of Service shall be subject to the exclusive
                  jurisdiction of the courts of that country.
                  <br />
                  <span className="font-bold">
                    13. Contact If you have any questions about these Terms of
                    Service, please contact our support team via:
                    support@mailprex.top
                  </span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
