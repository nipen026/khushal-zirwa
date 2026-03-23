"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { IoArrowBack } from "react-icons/io5";
import { FiSend, FiPlus } from "react-icons/fi";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

export default function ChatScreen({ orderId }) {
    const router = useRouter();
    const bottomRef = useRef(null);
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [orderDetails, setOrderDetails] = useState()
    useEffect(() => {
        const fetchOrder = async () => {
            const { data, error } = await supabase
                .from("vendor_order")
                .select("*")
                .eq("id", orderId).limit(1)
                .single(); // 👈 convert array → object
            setOrderDetails(data)
        }
        fetchOrder();
    },[])
    const fileInputRef = useRef(null);
    /* 🔐 AUTH */
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data?.user);
        });
    }, []);
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    /* 📥 FETCH MESSAGES */
    useEffect(() => {
        fetchMessages();

        const channel = supabase
            .channel("chat-realtime")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "chat_with_admin" },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new]);
                    scrollBottom();
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    const fetchMessages = async () => {


        const { data } = await supabase
            .from("chat_with_admin")
            .select("*")
            .eq("order_id", orderId)
            .order("created_at", { ascending: true });

        setMessages(data || []);
        // scrollBottom();
    };
    useEffect(() => {
        scrollBottom();
    }, [messages]);

    const scrollBottom = () => {
        requestAnimationFrame(() => {
            bottomRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        });
    };

    /* 📤 SEND MESSAGE */
    const sendMessage = async () => {
        if (!text && !image) return;

        let base64Image = null;

        if (image) {
            base64Image = await fileToBase64(image); // ✅ convert to base64
        }

        await supabase.from("chat_with_admin").insert({
            order_id: orderId,
            user_id: user.id,
            message: text || null,
            is_from_admin: true,
            vendor_id:orderDetails?.vendor_id ? orderDetails?.vendor_id : null,
            image_data: base64Image, // ✅ BASE64 STRING
        });

        setText("");
        setImage(null);
    };
    const removeImage = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // reset input
        }
    };

    const USER_AVATAR = user?.user_metadata?.avatar_url; // user image
    const ADMIN_LOGO = "/assets/header_logo.png"; // admin/support logo

    return (
        <div className="flex w-full flex-col h-[70vh] bg-white">
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()}>
                        <IoArrowBack className="text-xl" />
                    </button>
                    <h2 className="text-lg font-semibold text-red-500">User Support</h2>
                </div>
                {/* <button className="border px-4 py-1 rounded-full text-red-500">
          Chat with us
        </button> */}
            </div>

            {/* CHAT BODY */}
            <div className="flex-1 overflow-y-auto scroll-hidden p-4">
                <div className="min-h-full flex flex-col justify-end space-y-4">
                    {messages.map((msg) => {
                        const isUser = msg.sender_role === "user";
                        return (
                            <>
                                <div
                                    key={msg.id}
                                    className={`flex items-end gap-2 ${isUser ? "justify-start" : "justify-end"
                                        }`}
                                >
                                    {/* USER IMAGE (LEFT) */}
                                    {isUser && (
                                        <Image
                                            src={ADMIN_LOGO}
                                            alt="user"
                                            width={32}
                                            height={32}
                                            className="rounded-full w-[20px] h-[20px] object-cover"
                                        />
                                    )}

                                    {/* MESSAGE BUBBLE */}
                                    <div
                                        className={`max-w-xs p-3 rounded-xl text-sm ${isUser
                                            ? "bg-primary text-white rounded-bl-none"
                                            : "bg-primary text-white rounded-br-none"
                                            }`}
                                    >
                                        {msg.message && <p>{msg.message}</p>}

                                        {msg.image_data && (
                                            <img
                                                src={msg.image_data}
                                                alt="chat"
                                                className="mt-2 rounded max-w-[150px]"
                                            />
                                        )}
                                    </div>
                                    {/* ADMIN LOGO (RIGHT) */}
                                    {!isUser && (
                                        <Image
                                            src={USER_AVATAR}
                                            alt="admin"
                                            width={32}
                                            height={32}
                                            className="rounded-full w-[20px] h-[20px] object-cover"
                                        />
                                    )}
                                    <div className="m-0" ref={bottomRef} />
                                </div>
                            </>
                        );
                    })}


                </div>
            </div>

            {/* INPUT */}

            <div className="p-3 border-t gap-3">
                <div>
                    {image && (
                        <div className="relative px-3 pb-2 w-fit">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="w-24 h-24 object-cover rounded-lg border"
                            />

                            {/* ❌ Remove button */}
                            <button
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                </div>
                <div className="flex  items-center gap-3">
                    <div className="bg-primary p-2 rounded-full text-white hover:bg-red-600">
                        <label className="cursor-pointer">
                            <FiPlus />
                            <input
                                type="file"
                                accept="image/*,video/*"
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                    </div>

                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your message"
                        className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-red-500 p-3 rounded-full text-white"
                    >
                        <FiSend />
                    </button>
                </div>

            </div>
        </div>
    );
}
