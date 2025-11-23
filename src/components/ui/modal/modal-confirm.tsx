import { Modal } from "./modal";

interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  confirmClassName?: string;
  cancelClassName?: string;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  confirmClassName = "bg-red-500 text-white hover:bg-red-600",
  cancelClassName = "border border-gray-300 text-gray-700 hover:bg-gray-100",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

        <p className="text-sm leading-relaxed text-gray-600">{description}</p>

        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={onClose}
            className={`bg-error cursor-pointer rounded-xl px-4 py-2 text-white transition hover:opacity-70 ${cancelClassName}`}
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`bg-primary cursor-pointer rounded-xl px-4 py-2 text-white transition hover:opacity-70 ${confirmClassName}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
