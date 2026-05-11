interface ModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
  hideCancel?: boolean;
}

export default function Modal({
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  danger = false,
  hideCancel = false,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-[#13131a] border border-[#1e1e2e] p-6 w-full max-w-sm flex flex-col gap-4">
        <h2
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-lg tracking-widest text-white uppercase"
        >
          {title}
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-gray-400 text-sm">
          {message}
        </p>
        <div className="flex gap-3 justify-end mt-2">
          {!hideCancel && (
            <button
              onClick={onCancel}
              className="px-5 py-2 text-xs tracking-widest uppercase border border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition"
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-5 py-2 text-xs tracking-widest uppercase font-medium transition ${
              danger
                ? "bg-red-700 hover:bg-red-600 text-white"
                : "bg-purple-600 hover:bg-purple-500 text-white"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}