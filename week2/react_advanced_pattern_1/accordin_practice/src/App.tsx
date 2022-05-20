import React, { createContext, useState, useContext } from 'react';
import logo from './logo.svg';
import './App.css';

// mock data
const MOCK_LIST = [
  { content: "content1" },
  { content: "content2" },
  { content: "content3" },
  { content: "content4" },
  { content: "content5" },
  { content: "content6" },
  { content: "content7" },
  { content: "content8" },
]

// types
type AccordProp = {
  children: JSX.Element | JSX.Element[];
}

type AccordItemProp = {
  children: JSX.Element | JSX.Element[];
}

type AccordBtnProp = {
}

type AccordPanelProp = {
  children: JSX.Element,
}

const IsOpenContext = createContext<{ isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> } | undefined>(undefined);



// components
const Accord = ({ children }: AccordProp) => {
  return (
    <div style={{ "width": "50%", "minWidth": "300px" }}>
      {children}
    </div>
  );
};

const AccordItem = ({ children }: AccordItemProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = { isOpen, setIsOpen };

  return (
    <IsOpenContext.Provider value={value}>
      <div style={{ "display": "grid" }}>
        {children}
      </div>
    </IsOpenContext.Provider>
  );
};

function useIsOpen() {
  const context = useContext(IsOpenContext);
  if (context == undefined) throw new Error("IsOpenContext should use in AccordItem.")
  return context;
}

const AccordBtn = ({ }: AccordBtnProp) => {
  const { isOpen, setIsOpen } = useIsOpen()

  return (
    <>
      <button onClick={(e) => setIsOpen(!isOpen)}>{isOpen ? "Close": "Open"}</button>
    </>
  );
};

const AccordPanel = ({ children }: AccordPanelProp) => {
  const { isOpen } = useIsOpen();
  return (
    <>
      {isOpen ? children : null }
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Accord>
        {MOCK_LIST.map((obj, key) =>
          <AccordItem key={key}>
            <AccordBtn></AccordBtn>
            <AccordPanel>
              {/* Custom content */}
              <div>
                <h1>{obj.content}</h1>
              </div>
            </AccordPanel>
          </AccordItem>
        )}
      </Accord>
    </div>
  );
}

export default App;
