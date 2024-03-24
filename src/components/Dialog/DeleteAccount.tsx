// DeleteAccountDialog.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { supabase } from '../../services/supabaseConfig';
import { useNavigate } from 'react-router-dom';

interface DeleteAccountDialogProps {
    userId: string;
}

export default function DeleteAccountDialog({ userId }: DeleteAccountDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    const deleteAccount = async () => {
        try {
            const { error } = await supabase.rpc('delete_user', { user_id: userId });

            if (error) {
                console.error('Error deleting account: ', error);
                return;
            }

            // Close the dialog and navigate to the home page
            closeDialog();
            navigate('/');
            // Optional: sign out the user after deleting their account
            await supabase.auth.signOut();

        } catch (error) {
            console.error('Unexpected error: ', error);
        }
    };

    return (
        <>
            <a className='btn btn-secondary text-neutral-content' onClick={openDialog}>Delete Account</a>

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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Delete Account
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete your account?
                                            This action cannot be undone.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={deleteAccount}
                                        >
                                            Confirm
                                        </button>
                                        <button className=' px-5 ' onClick={closeDialog}>Cancel</button>
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