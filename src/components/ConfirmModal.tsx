import { Dialog } from "@headlessui/react";

export const ConfirmModal = ({ isOpen, onClose, onConfirm }) => (
  <Dialog open={isOpen} onClose={onClose} className="relative z-50">
    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
        <Dialog.Title className="text-lg font-medium">
          Delete account?
        </Dialog.Title>
        <Dialog.Description className="mt-2 text-sm text-gray-600">
          This action cannot be undone.
        </Dialog.Description>

        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);
