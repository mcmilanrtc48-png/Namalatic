import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeDeleteModal, addToast } from '../../redux/slices/uiSlice';
import { deleteHotel } from '../../redux/slices/hotelSlice';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const ConfirmModal = () => {
  const dispatch = useDispatch();
  const { isOpen, hotelId, hotelTitle } = useSelector((state) => state.ui.deleteModal);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await dispatch(deleteHotel(hotelId)).unwrap();
      dispatch(closeDeleteModal());
      dispatch(
        addToast({
          type: 'success',
          message: `"${hotelTitle}" has been deleted successfully!`,
        })
      );
    } catch (err) {
      dispatch(
        addToast({
          type: 'error',
          message: err || 'Failed to delete hotel. Please try again.',
        })
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button
              onClick={() => dispatch(closeDeleteModal())}
              className="text-slate-400 hover:text-slate-600 transition"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-4">
            <h3 id="modal-title" className="text-lg font-bold text-slate-900">
              Delete Hotel Listing
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{hotelTitle}"</span>?
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => dispatch(closeDeleteModal())}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2 shadow-sm transition"
          >
            <Trash2 size={16} />
            Delete Hotel
          </button>
        </div>
      </div>
    </div>
  );
};

