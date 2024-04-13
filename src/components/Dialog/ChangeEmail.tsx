// change email

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { supabase } from '../../services/supabaseConfig';

interface ChangeEmailDialogProps {
    userId: string;
    onEmailChange: () => Promise<void>;
}

export default function ChangeEmailDialog({ userId, onEmailChange }: ChangeEmailDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => {
        setIsOpen(false);
        resetForm();
    }

    const resetForm = () => {
        setEmail('');
        setError(null);
    }

    const changeEmail = async (): Promise<null | undefined> => {
        try {
            const { data, error } = await supabase
                .from('users')
                .update({ email })
                .eq('id', userId);

            if (error) {
                console.error('Error updating email: ', error);
                setError(error.message);
                return null;
            }
            closeDialog();
            await onEmailChange();

            setEmail('');

            return data;
        } catch (error) {
            console.error('Unexpected error: ', error);
        }
    };

    return (
        <>
            <a className='btn btn-secondary text-neutral-content mt-2' onClick={openDialog}>Change Email</a>

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
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                                        Change Email
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={changeEmail}
                                        >
                                            Change Email
                                        </button>
                                        <button className='px-5' onClick={closeDialog}>Cancel</button>
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