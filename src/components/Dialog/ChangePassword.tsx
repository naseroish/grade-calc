// // change password dialog

// import { useState } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// import { supabase } from '../../services/supabaseConfig';

// interface ChangePasswordDialogProps {
//     userId: string;
// }

// export default function ChangePasswordDialog({ userId }: ChangePasswordDialogProps) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState<string | null>(null);

//     const openDialog = () => setIsOpen(true);
//     const closeDialog = () => {
//         setIsOpen(false);
//         resetForm();
//     }

//     const resetForm = () => {
//         setPassword('');
//         setError(null);
//     }

//     const changePassword = async (): Promise<null | undefined> => {
//         try {
//             const { error } = await supabase.auth.updateUser({
//                 password,
//             });

//             if (error) {
//                 console.error('Error updating password: ', error);
//                 setError(error.message);
//                 return null;
//             }
//             closeDialog();

//             setPassword('');

//         } catch (error) {
//             console.error('Unexpected error: ', error);
//         }
//     };

//     return (
//         <>
//             <a className='btn btn-secondary text-neutral-content mt-2' onClick={openDialog}>Change Password</a>

//             <Transition appear show={isOpen} as={Fragment}>
//                 <Dialog as="div" className="relative z-10" onClose={closeDialog}>
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0 scale-95"
//                         enterTo="opacity-100 scale-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100 scale-100"
//                         leaveTo="opacity-0 scale-95"
//                     >
//                         <Dialog.Panel onFocus={() => {}} className="fixed inset-0 overflow-y-auto">
//                             <div className="flex items-center justify-center min-h-screen">
//                                 <Transition.Child
//                                     as={Fragment}
//                                     enter="ease-out duration-300"
//                                     enterFrom="opacity-0"
//                                     enterTo="opacity-100"
//                                     leave="ease-in duration-200"
//                                     leaveFrom="opacity-100"
//                                     leaveTo="opacity-0"
//                                 >
//                                     <Dialog.Overlay className="fixed inset-0 bg-black/25" />
//                                 </Transition.Child>

//                                 <Transition.Child
//                                     as={Fragment}
//                                     enter="ease-out duration-300"
//                                     enterFrom="opacity-0 scale-95"
//                                     enterTo="opacity-100 scale-100"
//                                     leave="ease-in duration-200"
//                                     leaveFrom="opacity-100 scale-100"
//                                     leaveTo="opacity-0 scale-95"
//                                 >
//                                     <div className="bg-white w-full max-w-md p-6 rounded-lg">
//                                         <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
//                                             Change Password
//                                         </Dialog.Title>
//                                         <div className="mt-2">
//                                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                                 New Password
//                                             </label>
//                                             <input
//                                                 type="password"
//                                                 id="password"
//                                                 name="password"
//                                                 value={password}
//                                                 onChange={(e) => setPassword(e.target.value)}
//                                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                             />
//                                         </div>
//                                         {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
//                                         <div className="mt-4 flex justify-end">
//                                             <button
//                                                 type="button"
//                                                 className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                                                 onClick={changePassword}
//                                             >
//                                                 Change Password
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </Transition.Child>
//                             </div>
//                         </Dialog.Panel>
//                     </Transition.Child>
//                 </Dialog>
//             </Transition>
//         </>
//     );
// }