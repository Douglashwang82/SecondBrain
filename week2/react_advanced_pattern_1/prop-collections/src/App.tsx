import React, { useState } from 'react';
import './App.css';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import { MyComponent } from './MyComponent';
import {ImHeart, ImStarFull} from 'react-icons/im';

type useAnimatedCounterStateProp = {
  maximumCount: number,
  minimumCount: number,
  step: number;
  initialCount: number,
}

type AnimatedCounterState = {
  numberProp: {
    minimumCount: number,
    maximumCount: number,
    count: number,
  },
  animatedButtonProp: {
    count: number,
    animationType: string,
    handleIncrease: any,
    controls: AnimationControls,
  },
  resetButtonProp: {
    handleReset: any,
  },
  increaseButtonProp: {
    handleIncrease: () => void,
  },
  state: {
    count: number,
    atStartPosition: boolean,
    atEndPosition: boolean,
    initialCount: number,
    minimumCount: number,
    maximumCount: number,
    step: number,
  }
}


const variants = {
  hidden: { opacity: 0, scale: 0.5, y: -50 },
  visible: { opacity: 1, scale: 1, y: 0, color: "rgb(255,255,255)" },
  onHover: { color: "rgb(140, 252, 3)" },
  test: { scale: 10 },
}
const Initial = async (controls: any) => {
  await controls.start({ opacity: 0 })
  return await controls.start({ opacity: 1 })

}

const Normal = async (controls: any) => {
  await controls.start({ scale: 3, transition: { duration: 0.01 } })
  await controls.start({ scale: 1, transition: { duration: 0.2 } })
  await controls.start({ scale: 2, transition: { duration: 0.2 } })
  return await controls.start({ scale: 1, transition: { duration: 0.2 } })
}

const Shake = async (controls: any) => {
  await controls.start({ x: -40, transition: { duration: 0.05 } })
  await controls.start({ x: 30, transition: { duration: 0.05 } })
  await controls.start({ x: -20, transition: { duration: 0.05 } })
  await controls.start({ x: 10, transition: { duration: 0.05 } })
  return await controls.start({ x: 0 });
}




function useAnimatedCounterState({
  maximumCount,
  minimumCount,
  step,
  initialCount,
}: useAnimatedCounterStateProp): AnimatedCounterState {
  const [count, setCount] = useState<number>(initialCount);
  const controls = useAnimation();

  // what if start and end position are the same?
  const [atStartPosition, setAtStartPosition] = useState<boolean>(count == initialCount);
  const [atEndPosition, setAtEndPosition] = useState<boolean>(initialCount >= maximumCount);

  const [animationType, setAnimationType] = useState<any>("normal");

  const handleIncrease = () => {
    if ((count + step) < maximumCount) {
      const newCount = count + step;
      setCount(newCount);
      setAnimationType("normal");
      Normal(controls);
    } else {
      setCount(maximumCount)
      setAnimationType("shake");
      Shake(controls);
    }
  }

  const handleReset = () => {
    setAtStartPosition(true);
    setAtEndPosition(() => initialCount >= maximumCount);
    setAnimationType(() => {
      if (atStartPosition) return "initial";
      if (atEndPosition) return "shake";
      return "normal";
    })
    Initial(controls);
    setCount(initialCount);
  }


  return {
    numberProp: {
      minimumCount: minimumCount,
      maximumCount: maximumCount,
      count: count,
    },
    animatedButtonProp: {
      count: count,
      animationType: animationType,
      handleIncrease,
      controls: controls,
    },
    resetButtonProp: {
      handleReset,
    },
    increaseButtonProp: {
      handleIncrease
    },
    state: {
      count,
      atStartPosition,
      atEndPosition,
      initialCount,
      minimumCount,
      maximumCount,
      step
    }
  }
}


const AnimatedButton = ({ children, className, animationType, handleIncrease, controls }: any) => {
  const handleAnimatedButtonNormal = (controls: AnimationControls) => {
    handleIncrease()
    Normal(controls)
  }
  return (<>
    <motion.button className={className}
      initial="initial"
      whileInView="visible"
      animate={controls}
      whileHover="onHover"
      onTap={handleIncrease}
      variants={variants}
    >
      {children}
    </motion.button>
  </>);
}

const Number = ({ count, className }: any) => {
  return (
    <>
      <div className={className}>
        {count}
      </div>
    </>
  );
}



const ResetButton = ({ handleReset }: any) => {
  return <button onClick={handleReset}>Reset</button>
}

const IncreaseButton = ({ handleIncrease }: any) => {
  return <button onClick={handleIncrease}>+</button>;
}

const Counter = ({ className }: any) => {
  const { numberProp, animatedButtonProp, increaseButtonProp, resetButtonProp } = useAnimatedCounterState({
    maximumCount: 10,
    minimumCount: 0,
    step: 1,
    initialCount: 0,
  }
  );

  return (
    <div className={className}>
      <AnimatedButton className="animatedButton" {...animatedButtonProp}>
        <Number className="number" {...numberProp} />
      </AnimatedButton>
      <ResetButton {...resetButtonProp} />
      <IncreaseButton {...increaseButtonProp} />
    </div>
  );
}

const HeartCounter = ({ className }: any) => {
  const { numberProp, animatedButtonProp, increaseButtonProp, resetButtonProp } = useAnimatedCounterState({
    maximumCount: 20,
    minimumCount: 2,
    step: 2,
    initialCount: 2,
  });

  return (
    <div className={className}>
      <Number className="number" {...numberProp} />
      <AnimatedButton className="animatedHeartButton" {...animatedButtonProp}>
      <ImHeart className="heartImg"/>
      </AnimatedButton>
      <ResetButton {...resetButtonProp} />
    </div>
  );
}

const MyStars = ({className, count}:any) => {
  const stars = Array(count).fill(null).map((_, key)=>{
    return <ImStarFull key={key} className={className}/>
  })
  return(
    <>
  {stars}
    </>
  );
}

const StartCounter = ({className}: any) =>{
  const { numberProp, animatedButtonProp, increaseButtonProp, resetButtonProp } = useAnimatedCounterState({
    maximumCount: 5,
    minimumCount: 1,
    step: 1,
    initialCount: 1,
  });
  
  return(
    <div className={className}>
      <Number className="number" {...numberProp} />
      <AnimatedButton className="animatedHeartButton" {...animatedButtonProp}>
      <MyStars className="heartImg" {...numberProp}/>
      </AnimatedButton>
      <ResetButton {...resetButtonProp} />
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <Counter className="counter" />
      <HeartCounter className="heartCounter"/>
      <StartCounter className="heartCounter"/>
    </div>
  );
}

export default App;
