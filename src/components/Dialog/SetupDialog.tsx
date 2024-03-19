// new account setup dialog

import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { supabase } from '../../services/supabaseConfig';
import { User } from '@supabase/supabase-js';
import { Level } from '../../services/types';

interface SetupDialogProps {
    onSetup: () => Promise<void>;
    levels: Level[];
    userId: string;
}

export default function SetupDialog({ onSetup, levels, userId }: SetupDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    useEffect(() => {
        if (levels.length === 0) {
            openDialog();
        }
    }, [levels]);

    const setupAccount = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    if (user) {
        try {
            const { data, error } = await supabase
                .from('user')
                .update({ setup: true })
                .eq('id', user?.id);

            if (error) {
                console.error('Error setting up account: ', error);
                return;
            }

            closeDialog();
            await onSetup();
            return data;

        } catch (error) {
            console.error('Unexpected error: ', error);
        }
    }
    };

    return (
        <>
            <a onClick={openDialog}>Setup</a>

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
                                <Dialog.Panel
                                    as="div"
                                    className="relative z-10 w-[400px] bg-white rounded p-4 shadow-lg text-left"
                                >
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Setup Account
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to setup your account?
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-transparent rounded-md shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            onClick={closeDialog}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            onClick={setupAccount}
                                        >
                                            Setup
                                        </button>
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