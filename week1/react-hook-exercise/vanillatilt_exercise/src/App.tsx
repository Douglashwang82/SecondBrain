import React, { RefObject, useEffect, useRef, useState } from 'react';
import './App.css';
import { TiltFrame } from './components/tiltFrame/TiltFrame';
import { TiltDataDisplay } from './components/tiltDataDisplay/TiltDataDisplay';
import { CustomeData } from './types';
const initialCustomDAta = {angle:"", percentageX:"", percentageY:"", tiltX:"", tiltY:""};


function App() {
  const [data ,setData] = useState<CustomeData>(initialCustomDAta);
  const handleDataChange = (newdata:CustomeData) => setData(newdata);
  return (
    <>

      <TiltFrame handleDataChange={handleDataChange}>
        <TiltDataDisplay data ={data}></TiltDataDisplay>
      </TiltFrame>
    </>
  );
}

export default App;


// const initialEvent = new CustomEvent("tiltChange", {});
// const [data, setData] = useState<CustomEventInit>(initialEvent);
// const handleDataChange = (data: CustomEventInit) => setData(data);

{/* <TiltFrame handleDataChange={handleDataChange}>
  <TiltDataDisplay data={...,{...data}}></TiltDataDisplay>
</TiltFrame> */}