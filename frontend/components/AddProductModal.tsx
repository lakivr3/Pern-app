'use client'
import { GlobalContext } from "@/context/global";
import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react";
import { useContext, useState } from "react";

function AddProductModal() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });
  console.log(formData)

  const globalContext = useContext(GlobalContext);
  if (!globalContext) return null;

  const { addProduct, loading } = globalContext;

  const addNewProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;
    await addProduct(formData);
    setFormData({ name: "", image: "", price: "" });
    (document.getElementById("add_product_modal") as HTMLDialogElement)?.close();
  };

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => (document.getElementById("add_product_modal") as HTMLDialogElement)?.close()}
        >
          X
        </button>

        {/* MODAL HEADER */}
        <h3 className="font-bold text-xl mb-8">Add New Product</h3>

        <form onSubmit={addNewProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* PRODUCT NAME INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Product Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT PRICE INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <DollarSignIcon className="size-5" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT IMAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Image URL</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => (document.getElementById("add_product_modal") as HTMLDialogElement)?.close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* BACKDROP */}
      <div className="modal-backdrop">
        <button
          type="button"
          onClick={() => (document.getElementById("add_product_modal") as HTMLDialogElement)?.close()}
        >
          close
        </button>
      </div>
    </dialog>
  );
}

export default AddProductModal;
