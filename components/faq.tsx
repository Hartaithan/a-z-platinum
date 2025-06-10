import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react";

interface ItemProps extends PropsWithChildren {
  id: string;
  title: string;
}

const Item: FC<ItemProps> = (props) => {
  const { id, title, children } = props;
  return (
    <AccordionItem value={id}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

const ExternalLink: FC<ComponentPropsWithoutRef<"a">> = (props) => {
  const { children, className, target = "_blank", ...rest } = props;
  return (
    <a
      className={cn(className, "text-primary font-bold")}
      target={target}
      {...rest}>
      {children}
    </a>
  );
};

const FAQ: FC = () => {
  return (
    <div className="pt-6 pb-8">
      <section id="about" className="container flex flex-col flex-nowrap gap-2">
        <h1 className="text-xl font-bold">FAQ</h1>
        <Accordion type="multiple">
          <Item
            id="ps-account"
            title="Do I need a PlayStation account to use this app?">
            Yes, you need a PlayStation account. Additionally,&nbsp;
            <b>your PSN account must be set to public</b> so your trophy data
            can be accessed
          </Item>
          <Item
            id="private-profile"
            title="I am seeing the error 'User has not granted access to view
              trophies'. What does this mean?">
            This error indicates that&nbsp;
            <b>your profile&apos;s privacy settings</b> are preventing access to
            your trophy data. To resolve this, you need to&nbsp;
            <b>adjust your profile settings.</b> You can find more details&nbsp;
            <ExternalLink href="https://forum.psnprofiles.com/topic/171838-trophies-are-missing-hidden-or-private-trophies-how-to-fix-it">
              here
            </ExternalLink>
          </Item>
          <Item
            id="artifacts"
            title="The generated image contains artifacts. How can I fix this?">
            This can happen if you&apos;re using an <b>mobile browser</b>. Try
            generating the image again from desktop mode, and if the issue
            persists, feel free to email me at&nbsp;
            <ExternalLink href="mailto:hartaithan@gmail.com">
              hartaithan@gmail.com
            </ExternalLink>
          </Item>
          <Item id="report" title="I found a bug or issue. How do I report it?">
            You can contact me via Discord <b>@hartaithan</b> or by email
            at&nbsp;
            <ExternalLink href="mailto:hartaithan@gmail.com">
              hartaithan@gmail.com
            </ExternalLink>
          </Item>
        </Accordion>
      </section>
    </div>
  );
};

export default FAQ;
