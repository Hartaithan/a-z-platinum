import { useData } from "@/providers/data";
import { usePick } from "@/providers/pick";
import { Modal, ModalProps } from "@/ui/modal";
import { FC, memo, useCallback } from "react";

export type PickModalData = { items: string[]; letter: string };

interface PickItemProps {
  item: string;
  letter?: string;
}

const PickItem: FC<PickItemProps> = (props) => {
  const { item, letter } = props;
  const { getItem } = useData();
  const { setPick } = usePick();
  const pickedItem = getItem(item);

  const handlePick = useCallback(
    () => setPick(item, letter ?? ""),
    [item, letter, setPick],
  );

  return (
    <button className="flex rounded border px-3 py-2" onClick={handlePick}>
      <p>
        {pickedItem?.title}, {pickedItem?.platforms}
      </p>
    </button>
  );
};

const MemoizedPickItem = memo(PickItem);

const PickModal: FC<ModalProps<PickModalData>> = (props) => {
  const { data, ...rest } = props;
  const { items, letter } = data ?? {};
  return (
    <Modal {...rest}>
      {(!items || items.length === 0) && (
        <p className="text-center">Nothing found :(</p>
      )}
      <div className="flex flex-col gap-y-3">
        {items &&
          items.map((item) => (
            <MemoizedPickItem key={item} item={item} letter={letter} />
          ))}
      </div>
    </Modal>
  );
};

export default PickModal;
