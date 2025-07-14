import LetterItems from "@/components/letter-items";
import { LetterModalData } from "@/models/letter";
import LetterProvider from "@/providers/letter";
import { Modal, ModalProps } from "@/ui/modal";
import { FC } from "react";

interface Props extends Omit<ModalProps<LetterModalData>, "title"> {
  title?: string;
}

const LetterModal: FC<Props> = (props) => {
  const { data, ...rest } = props;
  return (
    <LetterProvider items={data?.items} letter={data?.letter}>
      <Modal
        title={`Letter ${data?.letter?.toUpperCase()}`}
        titleClassName="font-bold"
        {...rest}>
        <LetterItems />
      </Modal>
    </LetterProvider>
  );
};

export default LetterModal;
