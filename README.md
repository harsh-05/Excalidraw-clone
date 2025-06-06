Trying to Build the Excalidraw like application but with real-time collaborattion using Monorepo architecture and latest spec with native Canvas API and WS library for the websocket.


Todo : 

1. Add the UUID ID to each shapes objects and which is the best way to store them for efficient searching in case of selection, moving, resizing and erasing functionalities.

2. (Completed) Add the Eraser functionality, Make sure to implement the Robust Hit Detection for the eraser instead of bounding box hit detection method.

3. Change the hit detection for the selection, moving, resizing of shapes, check isPointinPath(), ispointinStroke(). Hit Detection should work according to the fillstyle property, if filled then we should check for isPointinPath(), if not then ispointStroke() only.

4. Add the functionality to change the strokewidth, strokestyle, fillStyle, fillcolor, strokecolor etc in all the shapes

    4.1 Depending on the fillstyle, the hit detection should work, when fillstyle !== null then it should check for within and it's outline too, otherwise it should work only when clicked on the outline itself.

    4.2 Even on the fillstyle, the outline should appears too.

5. Add the zoom tool

6. Add the Pan tool

7. Add the Auto Save functionality which saves all the drawn shapes into the browser's localstorage or cache whatever is suitable.

8. 