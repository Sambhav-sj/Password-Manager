import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passRef = useRef()
    const [form, setForm] = useState({ website: '', username: '', password: '' })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let storedPasswords = localStorage.getItem('passwords');
        if (storedPasswords) {
            setPasswordArray(JSON.parse(storedPasswords));
        }
    }, []);

    const showPass = () => {
        passRef.current.type = "text";
        if (ref.current.src.includes("image/eyecross.png")) {
            passRef.current.type = "password";
            ref.current.src = "image/eye.png"
        } else {
            passRef.current.type = "text";
            ref.current.src = "image/eyecross.png"
        }
    }
    const savePass = () => {
        if (form.website.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            console.log("Password Saved", form);
            setForm({ website: '', username: '', password: '' });
            toast('Password Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast.error('Fields Empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const delPass = (id) => {
        let c = confirm("Are you sure you want to delete this password?");
        if (c) {
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswords);
            localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
        }
        toast('Password Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const editPass = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        if (passwordToEdit) {
            setForm(passwordToEdit);
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswords);
        }
    }

    const copyText = (text) => {
        toast('Text Copied', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-cyan-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-teal-300 opacity-20 blur-[100px]"></div>
            </div>

            <div className="px-2 md:px-6 md:mycontainer min-h-[82vh]">
                <h1 className='text-4xl font-bold mt-5 text-center'>
                    <span className="text-cyan-700"></span>
                    Iron
                    <span className="text-cyan-700">Vault</span>
                </h1>
                <p className='text-lg font-bold pb-3 text-cyan-900 text-center'>Your Password Manager</p>

                <div className="text-black flex flex-col py-1 px-5 gap-7 items-center mx-4 md:mx-18">
                    <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className='bg-white rounded-full w-full h-10 text-black border border-cyan-700 py-1 p-4' type="text" placeholder='Website Name' />

                    <div className="flex md:flex-row flex-col w-full justify-between gap-7">
                        <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className='bg-white rounded-full w-full h-10 text-black border border-cyan-700 py-1 px-4' type="text" placeholder='Username' />

                        <div className="relative w-full"> 
                            <input ref={passRef} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className='bg-white rounded-full w-full h-10 text-black border border-cyan-700 py-1 px-4' type="password" placeholder='Password' />
                            <span onClick={showPass} className="absolute right-[1px] top-[2px] mx-2 mt-1 cursor-pointer">
                                <img ref={ref} src="/image/eye.png" alt="" width={30} className="p-1" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePass} className='bg-cyan-600 text-white rounded-full pb-1 px-2 flex items-center justify-center gap-2 border-2 border-cyan-900 w-fit hover:bg-cyan-700 transition-all duration-300'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords md:px-8">
                    <h2 className='text-xl font-bold pt-4 pb-2'>Your Passwords</h2>
                    {passwordArray.length === 0 && (
                        <div className='text-md font-bold text-cyan-900'>No passwords saved yet!</div>
                    )}

                    {passwordArray.length !== 0 && (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full rounded-md overflow-hidden mb-7 min-w-[600px]">
                                <thead className='bg-cyan-900 text-white font-bold'>
                                    <tr>
                                        <th className="border border-gray-300 px-2 py-2">Username</th>
                                        <th className="border border-gray-300 px-2 py-2">Website</th>
                                        <th className="border border-gray-300 px-2 py-2">Password</th>
                                        <th className="border border-gray-300 px-2 py-2">Tools</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-cyan-100'>
                                    {passwordArray.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="border border-gray-300 py-2 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <a href={item.website} target="_blank" rel="noreferrer">{item.website}</a>
                                                        <div className="copy size-7 cursor-pointer" onClick={() => copyText(item.website)}>
                                                            <lord-icon style={{ width: '25px', height: '25px', paddingTop: '3px', paddingLeft: '3px' }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 py-2 text-center">
                                                    <div className='flex items-center justify-center'>
                                                        <span>{item.username}</span>
                                                        <div className="copy size-7 cursor-pointer" onClick={() => copyText(item.username)}>
                                                            <lord-icon style={{ width: '25px', height: '25px', paddingTop: '3px', paddingLeft: '3px' }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 py-2 text-center">
                                                    <div className='flex items-center justify-center'>
                                                        <span>{"*".repeat(item.password.length)}</span>
                                                        <div className="copy size-7 cursor-pointer" onClick={() => copyText(item.password)}>
                                                            <lord-icon style={{ width: '25px', height: '25px', paddingTop: '3px', paddingLeft: '3px' }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 justify-center py-2 text-center">
                                                    <span className='cursor-pointer mx-2' onClick={() => editPass(item.id)}>
                                                        <lord-icon style={{ width: '25px', height: '25px' }} src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover"></lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer mx-2' onClick={() => delPass(item.id)}>
                                                        <lord-icon style={{ width: '25px', height: '25px' }} src="https://cdn.lordicon.com/skkahier.json" trigger="hover"></lord-icon>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>

    )
}

export default Manager
