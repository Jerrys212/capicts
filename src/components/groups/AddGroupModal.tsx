import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";
import AddGroupForm from "./AddGroupForm";

export default function AddGroupModal() {
    const location = useLocation();
    const navigate = useNavigate();

    const show = new URLSearchParams(useLocation().search).has("addGroup");

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                                        <DialogTitle as="h3" className="text-2xl font-bold text-gray-800">
                                            Nuevo Grupo
                                        </DialogTitle>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500"
                                            onClick={() => navigate(location.pathname, { replace: true })}
                                        >
                                            <span className="sr-only">Cerrar</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="px-6 py-4">
                                        <AddGroupForm />
                                    </div>

                                    <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md mr-2 transition-colors"
                                            onClick={() => navigate(location.pathname, { replace: true })}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            form="add-group-form" // Asegúrate de que tu formulario tenga este id
                                            className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md transition-colors"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
