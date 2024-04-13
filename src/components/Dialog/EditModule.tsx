// ModuleDialog.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { supabase } from '../../services/supabaseConfig';
interface ModuleDialogProps {
    moduleId: string;
    moduleName: string;
    moduleCredit: string;
    onEditModule: () => Promise<void>;
}

export default function EditModuleDialog(
    { moduleId, moduleName, moduleCredit, onEditModule }: ModuleDialogProps) {

    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    const [newModuleName, setModuleName] = useState(moduleName);
    const [newModuleCredit, setModuleCredit] = useState(moduleCredit);
    const [error, setError] = useState<string | null>(null); // Add this line

    const editModule = async (): Promise<null> => {
        try {
            const { data, error } = await supabase
                .from('module')
                .update({ id: moduleId, name: newModuleName, credit: newModuleCredit })
                .eq('id', moduleId);

            if (error) {
                console.error('Error inserting module: ', error);
                setError(error.message); // Set the error state
                return null;
            }
            closeDialog();
            await onEditModule();
            //add toaster with success message

            return data;
        } catch (error) {
            console.error('Unexpected error: ', error);
            setError((error as Error).message); // Set the error state
            return null;
        }
    };


    return (
        <>
            <a onClick={openDialog} className="">
                Edit
            </a>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-base-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <Dialog.Title as="h3" className="text-2xl leading-6 font-bold p-6">
                                    Edit Module
                                </Dialog.Title>
                                <div className="px-6 py-4">
                                    <label className="input input-bordered flex items-center gap-2">
                                        Name
                                        <input type="text" value={newModuleName} onChange={(e) => setModuleName(e.target.value)} className="grow" placeholder="Assignment Name" />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2 mt-4">
                                        Credit
                                        <input type="number" value={newModuleCredit} onChange={(e) => setModuleCredit(e.target.value)} className="grow" placeholder="e.g. 30" />
                                    </label>
                                </div>
                                {error && <p className="text-red-500 text-sm p-4">{error}</p>}
                                <div className="px-6 py-4 bg-base-300 flex justify-end">
                                    <button onClick={editModule} className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-3">
                                        Add
                                    </button>
                                    <button onClick={closeDialog} className="px-4 py-2 text-sm font-medium  bg-neutral rounded-md hover:bg-white/[0.12] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}