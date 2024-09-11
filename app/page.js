"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegSmileBeam, FaMusic, FaGift } from 'react-icons/fa';
import { IoIosRose } from 'react-icons/io';
import { GiPartyPopper } from "react-icons/gi";


export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [doorsOpen, setDoorsOpen] = useState(false);
    const [uniqueCode, setUniqueCode] = useState(null);
    const [message, setMessage] = useState(null);
    const [contentVisible, setContentVisible] = useState(false);
    const [isButtonHidden, setIsButtonHidden] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {

        audioRef.current = new Audio('/Indian_Wedding_Background_Music.mp3');
        audioRef.current.loop = true;  // Set audio to loop
        audioRef.current.volume = 0.4;  // Set volume to 40%
        // Check local storage for an existing unique code for Lucy Drow
        const storedCode = localStorage.getItem('uniqueCodeLucyDrow');
        if (storedCode) {
            setUniqueCode(storedCode);
            setIsButtonHidden(true);  // Hide the button if the code is already generated
        }
    }, []);

    const toggleDoors = () => {
        setDoorsOpen(true);
        setTimeout(() => {
            setContentVisible(true);
            audioRef.current.play();
        }, 2100); // slightly longer than the door animation to ensure it completes
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const inputName = event.target.elements[0].value.trim();

        // Only make the API call if the code hasn't already been generated
        if (!uniqueCode || inputName.toLowerCase() === "lucy drow") {
            const apiUrl = `/api/guests/${inputName}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (response.ok) {
                    setUniqueCode(data.uniqueCode);
                    setMessage({ text: `Unique code generated successfully for ${inputName}.`, type: 'success' });
                    localStorage.setItem('uniqueCodeLucyDrow', data.uniqueCode);  // Save the code to local storage
                    setIsButtonHidden(true);  // Hide the button after generating the code
                } else {
                    throw new Error(data.message || 'Failed to generate unique code.');
                }
            } catch (error) {
                setMessage({ text: error.message, type: 'error' });
            }
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fef3e6] to-white overflow-hidden relative">

            <motion.div className="absolute w-full h-screen flex">
                <motion.div
                    initial={{ rotateY: 0 }}
                    animate={doorsOpen ? { rotateY: 120 } : { rotateY: 0 }}
                    transition={{ duration: 2 }}
                    className="w-1/2 h-full border-2 border-[#af795d] flex justify-center items-center"
                    style={{
                        transformOrigin: 'left',
                        backgroundImage: 'url("/main_bg.jpg")',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <motion.img
                        src="/data/Flower_bukey.png"
                        className='mt-[180px]'
                        style={{ width: 'auto', maxHeight: '50%' }}  // Adjust sizing as needed
                    />
                </motion.div>
                <motion.div
                    initial={{ rotateY: 0 }}
                    animate={doorsOpen ? { rotateY: -120 } : { rotateY: 0 }}
                    transition={{ duration: 2 }}
                    className="w-1/2 h-full border-2 border-[#af795d] flex justify-center items-center"
                    style={{
                        transformOrigin: 'right',
                        backgroundImage: 'url("/main_bg.jpg")',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <motion.img
                        src="/data/Flower_bukey.png"
                        className='mt-[180px]'
                        style={{ width: 'auto', maxHeight: '50%' }}  // Adjust sizing as needed
                    />
                </motion.div>
            </motion.div>



            {!doorsOpen && (
                <button
                    className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#af795d] text-white text-xl font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-[#c98a6d] transition-colors duration-300 ease-in-out"
                    onClick={toggleDoors}
                >
                    Enter Our Celebration
                </button>
            )}



            {contentVisible && (
                <>
                    <motion.div
                        className="card absolute max-w-lg w-[95%] sm:w-full  bg-white top-[2%] left-3 sm:top-[8%]  sm:left-[10%] z-[10] text-black border-2 border-[#e0c3a6] py-[10px] px-[20px] rounded-lg shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <motion.div
                            className="floral-right absolute top-1 left-1 w-[70px] h-[50px] sm:w-[100px] sm:h-[80px] bg-no-repeat bg-cover"
                            style={{ backgroundImage: 'url(/data/Flower_bukey.png)' }}
                            initial={{ y: 0 }}  // Start at initial position
                            animate={{ y: [-5, 5, -5] }}  // Moves up by 5px, down by 5px, and back
                            transition={{
                                duration: 4,  // Slower duration for a subtle effect
                                ease: "easeInOut",
                                repeat: Infinity,  // Repeats the animation forever
                                repeatType: "loop"
                            }}
                        />

                        <motion.div className="leaves absolute bottom-1 left-1 w-[70px] h-[50px] sm:w-[100px] sm:h-[80px] bg-no-repeat bg-cover"
                            style={{ backgroundImage: 'url(/data/Leavs.png)' }}
                            initial={{ y: 0 }}  // Start at initial position
                            animate={{ y: [-5, 5, -5] }}  // Moves up by 5px, down by 5px, and back
                            transition={{
                                duration: 4,  // Slower duration for a subtle effect
                                ease: "easeInOut",
                                repeat: Infinity,  // Repeats the animation forever
                                repeatType: "loop"
                            }}
                        />
                        <motion.div className="leaves2 absolute top-1 right-1 w-[70px] h-[50px] sm:w-[100px] sm:h-[80px] bg-no-repeat bg-cover" style={{ backgroundImage: 'url(/data/Leavs.png)' }}
                            initial={{ y: 0 }}  // Start at initial position
                            animate={{ y: [-5, 5, -5] }}  // Moves up by 5px, down by 5px, and back
                            transition={{
                                duration: 4,  // Slower duration for a subtle effect
                                ease: "easeInOut",
                                repeat: Infinity,  // Repeats the animation forever
                                repeatType: "loop"
                            }}
                        />
                        <motion.div className="floral absolute bottom-1 right-1 w-[70px] h-[50px] sm:w-[100px] sm:h-[80px] bg-no-repeat bg-cover" style={{ backgroundImage: 'url(/data/Flowers.png)' }}
                            initial={{ y: 0 }}  // Start at initial position
                            animate={{ y: [-5, 5, -5] }}  // Moves up by 5px, down by 5px, and back
                            transition={{
                                duration: 4,  // Slower duration for a subtle effect
                                ease: "easeInOut",
                                repeat: Infinity,  // Repeats the animation forever
                                repeatType: "loop"
                            }}
                        />
                        <div className='flex flex-col justify-center items-center w-full h-full gap-[10px]'>
                            <h1 className="font-bold text-3xl z-10">Sahil & Tania</h1>
                            <h2>Are Getting Married!</h2>

                            <p className="text-center text-gray-600 mt-4">
                                By the grace of Almighty Allah, we are excited to share this special moment with you.
                            </p>

                            <p className='max-sm:hidden'>Join us for a celebration of love.</p>

                            <p className="text-center text-gray-600 mt-4 max-sm:hidden">
                                Thank you for being part of our big day. Your presence means the world to us.
                            </p>

                            <p className="text-center text-gray-700 font-semibold mt-2">
                                Save the Date: <span className="text-[#af795d]">30 September 2024</span> | Time: <span className="text-[#af795d]">Afternoon</span>
                            </p>

                            <p className="text-center text-gray-600">
                                Grandfather of the groom: Late Moslem Sanfui <br />
                                Grandmother of the groom: Angurjan Bibi <br />
                                Father of the groom: Sahabuddin Laskar <br />
                                Mother of the groom: Momtaj Bibi <br />
                                Father of the bride: Imdadul Islam <br />
                                Mother of the bride: Late Parvin Nahar Islam
                            </p>

                            <div className="mt-4">
                                <p>Scan for live location:</p>
                                <img className='max-sm:w-[100px] m-auto' src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.google.com/maps?q=22.3946047,88.4960977" alt="QR Code" />
                            </div>
                        </div>




                    </motion.div>



                    <motion.img
                        src="/data/muslim-bride.jpg"
                        className="couple absolute hidden sm:block"
                        style={{ top: '22%', right: '13%', zIndex: 10 }}
                        alt="Couple Standing"
                        initial={{ opacity: 0 }}
                        animate={contentVisible ? { opacity: 1 } : {}}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    />


                    <motion.div
                        className="gift fixed right-10 bottom-1 sm:bottom-10 bg-no-repeat bg-cover cursor-pointer w-[80px] h-[80px] z-[15] sm:w-[200px] sm:h-[200px]"
                        style={{ backgroundImage: 'url(/data/Gifts.png)' }}
                        initial={{ y: 0 }}
                        animate={{ y: [0, -20, 0] }}  // Moves up by 20 pixels, then back down
                        transition={{
                            duration: 0.6,  // Adjust duration based on how quick you want the bounce
                            ease: "easeInOut",
                            repeat: Infinity,  // Repeats the animation forever
                            repeatType: "loop",
                            repeatDelay: 0.5  // No delay in repeating the animation
                        }}
                        onClick={() => setModalOpen(true)}
                    />




                </>
            )}

            {modalOpen && (
                <div className="modal fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
                    <div className="modal-content max-sm:overflow-y-auto max-sm:h-[90vh] relative max-w-lg w-full mx-auto rounded bg-white p-8 shadow-lg">
                        <button className="close absolute top-2 right-2 text-3xl cursor-pointer" onClick={() => setModalOpen(false)}><FaRegSmileBeam /></button>
                        <p className="text-sm text-gray-600">
                            <FaGift className="inline mr-2" /> Thank you from the bottom of our hearts for being a part of our special day and making it even more memorable! Your presence, love, and support mean the world to us, and we feel incredibly blessed to share these precious moments with the people we cherish. We are grateful to have you by our side as we embark on this beautiful new journey together. Thank you for celebrating with us and for all your well-wishes. We will forever treasure the memories we’ve created together today! 🎉
                        </p>
                        <h3 className="text-lg font-semibold mt-4"><GiPartyPopper className="inline mr-2" /> Special Features & Announcements</h3>
                        <p className="text-sm text-gray-600">
                            <IoIosRose className="inline mr-2" /> Don’t miss the <strong>Lucky Drow event</strong> on our wedding day, <strong>September 30th</strong> 🌹. This unique feature is designed to add a special touch to our celebration, and we can’t wait for you to experience it!
                        </p>
                        <p className="text-sm text-gray-600">
                            <FaMusic className="inline mr-2" /> Also, we're excited to announce that the <strong>contest results</strong> will be revealed on our website following the wedding. There will be two winners: <strong>1st and 2nd place</strong> 🥇🥈. Be sure to check the site on <strong>October 1st and 2nd</strong> to see if you're one of the lucky winners!
                        </p>
                        {uniqueCode && (
                            <div className="mb-4 p-2 bg-gray-100 text-gray-700 rounded">
                                Unique Code for Lucy Drow: <strong>{uniqueCode}</strong>
                            </div>
                        )}
                        {message && (
                            <div className={`mb-4 p-2 rounded text-white ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
                                {message.text}
                            </div>
                        )}
                        {!isButtonHidden && (
                            <form onSubmit={handleSubmit} className="mt-4 text-black">
                                <input type="text" placeholder="Enter your name to generate your unique code" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                                <input type="submit" value="Generate Unique Code" className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" />
                            </form>
                        )}
                    </div>
                </div>
            )}




        </div>
    );
}
