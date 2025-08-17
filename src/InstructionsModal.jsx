import { useState } from "react";
import {motion, AnimatePresence} from "framer-motion";
import { SparklesIcon, SquareParking } from "lucide-react";
import x from './assets/x4.png';
import trash from './assets/trash.png';
import check from './assets/ecb.png';

export default function InstructionsModal(){
    const [isOpen, setIsOpen] = useState(false);

    const modalVariants = {
        hidden: { scale: 0.2, x: "-50%", y: "-50%"},
        visible: { scale: 1, x: "-50%", y: "-50%"},
        exit: { scale: 0.2, x: "-50%", y: "-50%"}
    }

    return(
        <div>
            <span
                onClick={ () => setIsOpen(true)}
                className="text-gray-500 cursor-pointer "
            >
                help?
            </span>
            <AnimatePresence>
                {isOpen &&(
                    <div
                    className="fixed inset-0 flex justify-center z-50"
                    >

                        <motion.div
                            variants ={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{duration: 0.15}}
                            className="fixed top-1/2 left-1/2 bg-white p-5  border-1 border-purple shadow-[4px_4px_0px_rgba(0,0,0,0.3)] w-[50%]"
                        >

                    <span
                    onClick={() => setIsOpen(false)}
                    className="fixed cursor-pointer text-gray-500  justify-self-end right-5 top-4"
                        >
                        <img
                        src={x}
                        alt="close"
                        className="w-[20px] h-[20px] png-icon object-contain"
                        />
                        </span>
                        <h2 className="text-xl font-bold mb-4 mt-3">How To use?</h2>
                        <p className="text-gray-600 mb-2 text-start">
                            1. Tap on  <span
                                className="text-black"
                            >+ add new list</span> to add a new list.
                            <br/>
                            2. Click the card to open it.
                            <br/>
                            3. Add tasks to the list by typing in the input field and pressing Enter.
                            <br/>
                            4. Mark tasks as done by clicking  <img src={check} className="w-[13px] h-[13px] inline"/>
                            <br/>
                            5. Edit tasks by clicking on them, typing your changes, and pressing Enter.
                            <br/>
                            6. Delete a list by clicking <img src={trash} className="w-[25px] h-[25px] inline"/> on the bottom right of the card.
                            <br/>
                            7. Completed lists can be toggled by clicking on the <span className="text-black">Completed Lists</span> header.
                            <br/>
                            <br/>
                            <SparklesIcon className="inline w-4 h-4 text-purple" /> <span className="text-gray-800">Note that the deleted lists cannot be recovered, be careful, and good luck with your tasks today!</span>
                        </p>
                        
                    

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}