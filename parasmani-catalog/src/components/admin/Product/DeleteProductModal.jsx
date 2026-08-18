function DeleteProductModal({
  open,
  onClose,
  onDelete,
}) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">

        <div className="bg-white rounded-2xl w-[90%] max-w-md p-6">

          <h2
            className="text-2xl text-[#18322F]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Delete Product
          </h2>

          <p className="mt-4 text-gray-600">
            Are you sure you want to delete this product?
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={onClose}
              className="flex-1 border rounded-xl py-3 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={onDelete}
              className="flex-1 bg-red-600 text-white rounded-xl py-3 hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default DeleteProductModal;