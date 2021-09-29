// getMousePosition
// Returns an object with the coordinates of where 
// the cursor is in the viewport
const getMousePosition = e => {
    return { 
        x: e.clientX, 
        y: e.clientY 
    };
};

export {
    getMousePosition
}