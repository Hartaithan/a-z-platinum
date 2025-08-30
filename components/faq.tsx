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
      <AccordionTrigger className="py-3 text-xs md:py-4 md:text-sm">
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-xs md:text-sm">
        {children}
      </AccordionContent>
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
    <div className="py-4">
      <section id="faq" className="container flex flex-col flex-nowrap">
        <h2 className="text-lg font-bold md:text-xl">FAQ</h2>
        <Accordion className="mt-1" type="multiple">
          <Item
            id="ps-account"
            title="What are the requirements for using this app?">
            You need a PlayStation account. Additionally,&nbsp;
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
            id="difficulty"
            title="What is 'difficulty' and what types are there?">
            Difficulty affects <b>how many letters</b> you need to complete
            during a challenge. You can find a detailed explanation in the
            app&apos;s settings
          </Item>
          <Item
            id="featured"
            title="Can I choose different games to display on the screen?">
            Yes, you can select any game to feature by tapping on the letter
            itself. Then, <b>tap the note icon button to assign a game</b> of
            your choice
          </Item>
          <Item
            id="rarity"
            title="I want to see trophy rarity from PSNP instead of PSN. Can I change that?">
            <b>Unfortunately, no.</b> The app uses data from PSN only, and PSNP
            rarity data is not available
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
