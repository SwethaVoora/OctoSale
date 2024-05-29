import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  cartitems: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  cartitems,
}: EmailTemplateProps) => {
  const previewText = `${name} has a message`;

  return (
    <>
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans">
            <Container
              className="border border-solid border-[#eaeaea] rounded
my-[40px] mx-auto p-[20px] w-[465px]"
            >
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                <strong>{firstName}</strong> would like to buy some products
                from OctoSale
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Here are the items they are interested in:
              </Text>

              <Text className="text-black text-[14px] leading-[24px]">
                {cartitems}
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This message was sent by ${firstName}. You can contact him
                through his email {email}.
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </>
  );
};
