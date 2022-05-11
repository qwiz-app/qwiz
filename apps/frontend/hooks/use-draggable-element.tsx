export const useDraggableElement = ({ initial, id }) => {
  const updatePosition = ({ x, y }) => {
    const arr = localStorage.getItem('array');
    const parsedArr = JSON.parse(arr);
    const newArr = parsedArr.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          x: x - 250,
          y: y - 82,
        };
      }
      return item;
    });
    const jsonArr = JSON.stringify(newArr);
    localStorage.setItem('array', jsonArr);
  };

  return {
    updatePosition,
  };
};
