import { Fragment, useState } from 'react';
import { supabase } from '../../services/supabaseConfig';
import { Dialog, Transition } from '@headlessui/react';

interface DeleteDialogProps {
    assignmentId: string;
    onDeleteAssignment: () => Promise<void>;
}

export default function DeleteAssignmentDialog({ assignmentId, onDeleteAssignment }: DeleteDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    const deleteAssignment = async () => {
        try {
            const { data, error } = await supabase
                .from('Assignment')
                .delete()
                .eq('id', assignmentId);

            if (error) {
                console.error('Error deleting assignment: ', error);
                return;
            }

            // Call the onDeleteAssignment function to refresh the assignments list
            closeDialog();
            await onDeleteAssignment();
            return data;

        } catch (error) {
            console.error('Unexpected error: ', error);
        }
    };

    return (
        <>
            <a onClick={openDialog}>Delete</a>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeDialog}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                        
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 "
                                    >
                                        Delete Assignment
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this assignment?
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={deleteAssignment}
                                        >
                                            Confirm
                                        </button>
                                        <button className='inline-flex justify-center rounded-md ' onClick={closeDialog}>Cancel</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}