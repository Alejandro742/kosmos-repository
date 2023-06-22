import React, { useRef, useState, useEffect } from "react";
import Moveable from "react-moveable";

export default function useFrontChallenge({}) {
  // STATES
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);

  // FUNCTIONS

  function randomPhotoId(min = 0, max = 100) {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
  }

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { ...moveable,id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents([...updatedMoveables]);
  };
  const addMoveable = () => {
    let randomId = randomPhotoId(0, 300);

    fetch(`https://jsonplaceholder.typicode.com/photos/${randomId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const color = `#${data.url.split("/")[4]}`;

        setMoveableComponents([
          ...moveableComponents,
          {
            id: Math.floor(Math.random() * Date.now()),
            top: 0,
            left: 0,
            width: 100,
            height: 100,
            color: color,
            updateEnd: true,
          },
        ]);
      })
      .catch((error) => {});
  };
  const handleResizeStart = (index, e) => {
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };
  const removeElement = (id) => {
    const updatedMoveables = moveableComponents.filter(
      (moveable) => moveable.id !== id
    );
    console.log(updatedMoveables);
    setMoveableComponents(updatedMoveables);
  };
  return {
    // CONSTANTS
    // STATE
    moveableComponents,
    setMoveableComponents,
    selected,
    setSelected,
    updateMoveable,
    addMoveable,
    handleResizeStart,
    removeElement,
  };
}
