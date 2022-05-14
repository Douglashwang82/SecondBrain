import React, {useEffect} from 'react'
import VanillaTilt from 'vanilla-tilt';
import { CustomeData } from '../../types';
import {
    Frame,
} from './TiltFrameElements';


const VanillaTiltStyle = { perspective: 200, max: 35,};

type Props = {
    children: JSX.Element,
    handleDataChange(data: CustomeData): void,
}

export const TiltFrame = ({children, handleDataChange}: Props) => {
    const mydiv = document.createElement("div");
    const divRef = React.useRef<HTMLDivElement>(mydiv);
    
    useEffect(()=>{
      const node = divRef.current;
      VanillaTilt.init(node, VanillaTiltStyle);
      node.addEventListener("tiltChange", (event:CustomEvent)=>{   // need to turn off strictfunction type in tsconfig
        handleDataChange({
            angle: event.detail.angle,
            percentageX: event.detail.percentageX,
            percentageY: event.detail.percentageY,
            tiltX: event.detail.tiltX,
            tiltY: event.detail.tiltY,
            }
            );
      });
    });


  return (
    <Frame ref={divRef}>{children}</Frame>
  )
}