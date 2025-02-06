import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion'
import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

const Hero = (): JSX.Element => {

    const colours = ["#00B4D8", "#48CAE4", "#90E0EF", "#CAF0F8"];
    const colour = useMotionValue(colours[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(150% 150% at 50% 0%, #020617 50%, ${colour})`;
    const border = useMotionTemplate`1px solid ${colour}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${colour}`;

    useEffect(() => {
        animate(colour, colours, {
            ease: 'easeInOut',
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.section style={{ backgroundImage }} className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200">

            <div className='container z-10'>
                <div className='text-center flex flex-col space-y-4'>
                    <h3 className='text-xl font-extralight'>Map your adventure</h3>
                    <h1 className='text-7xl font-extrabold'>TrailForge</h1>
                    <p className="text-xl pb-4 md:text-2xl lg:w-1/2 lg:mx-auto">
                       Draw, explore, and share your perfect routes for running, hiking, and cycling. Your journey starts with a single line.
                   </p>
                   <div className='flex gap-6 justify-center'>
                    <motion.button whileHover={{
                            scale:1.015,
                        }}
                        whileTap={{
                            scale: 0.985,
                        }}
                        style={{
                            border,
                            boxShadow,
                        }}
                        className='group relative flex px-8 py-4 w-fit items-center rounded-full bg-gray-950'
                    >
                        Start Drawing
                    </motion.button>
                    <button>
                        How it works →
                    </button>
                   </div>
                </div>
            </div>
            {/* Drei three fiber */}
            <div className='absolute inset-0 z-0'>
            <Canvas>
                <Sparkles
                    count={200}
                    size={2}
                    scale={[20,20,10]}
                    opacity={0.5}
                    speed={0.3}
                />
                </Canvas>
            </div>
        </motion.section>
    )
}
export default  Hero;