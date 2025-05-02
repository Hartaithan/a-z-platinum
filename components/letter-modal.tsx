import LetterItems from "@/components/letter-items";
import { Modal, ModalProps } from "@/ui/modal";
import { FC } from "react";

export type LetterModalData = { items: string[]; letter: string };

interface Props extends Omit<ModalProps<LetterModalData>, "title"> {
  title?: string;
}

const LetterModal: FC<Props> = (props) => {
  const { data, ...rest } = props;
  const { items, letter } = data ?? {};
  return (
    <Modal
      title={`Letter ${letter?.toUpperCase()}`}
      titleClassName="font-bold"
      {...rest}>
      <LetterItems items={items} letter={letter} />
    </Modal>
  );
};

export default LetterModal;
