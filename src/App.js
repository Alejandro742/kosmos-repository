import React from "react";

import SquareComponent from "./components/Square";
import Tags from "./components/Tags";

import useFrontChallenge from "./hooks/useFrontChallenge";

const App = () => {
  const {
    moveableComponents,
    addMoveable,
    selected,
    setSelected,
    updateMoveable,
    handleResizeStart,
    removeElement,
  } = useFrontChallenge({});

  const checkOutside = (e, id) => {
    const { bottom, top, left, right } = e;
    if (bottom < 0 || top < 0 || left < 0 || right < 0) {
      removeElement(id);
    }
  };

  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <section className="header">
        <h1 className="header__title">React Moveable - KosmosJS</h1>
        <div className="header__button" onClick={() => addMoveable()}>
          Agregar Figura
        </div>
        <div className="">
          {moveableComponents.map((item) => (
            <Tags
              removeElement={removeElement}
              color={item.color}
              id={item.id}
            />
          ))}
        </div>
      </section>
      <div
        id="parent"
        className="parent"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          position: "relative",
          /* background: "black", */
          height: "80vh",
          width: "80vw",
          margin: "auto",
        }}
      >
        {moveableComponents.map((item, index) => (
          <SquareComponent
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
            moveableComponents={moveableComponents}
            checkOutside={checkOutside}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
