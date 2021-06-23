let haveEvents = 'GamepadEvent' in window;
let haveWebkitEvents = 'WebKitGamepadEvent' in window;
let controllers = {};
let map = {};

/**
 * My personal mapping of the inputs. If yours isn't the same, activate debug,
 * watch in the console the ID of every input and change it on the list.
 */

 map[14] = "path873"; // <-- left
 map[13] = "path873-1"; // <-- down
 map[15] = "path873-1-0"; // <-- right
 map[12] = "path873-1-0-9-2-5-7"; // <-- up
 map[2] = "path873-1-0-9-2"; // <-- square
 map[3] = "path873-1-0-9-2-5"; // <-- triangle
 map[5] = "path873-1-0-9-2-1"; // <-- R1
 map[4] = "path873-1-0-9-2-1-9"; // <-- L1
 map[0] = "path873-1-0-9"; // <-- X
 map[1] = "path873-1-0-9-9"; // <-- circle
 map[7] = "path873-1-0-9-5"; // <-- R2
 map[6] = "path873-1-0-9-5-1"; // <-- L2

 /**
  * End of mapping
  */

var rAF =
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

var rAFStop =
  window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.cancelRequestAnimationFrame;

function connecthitbox(e) {
  addhitbox(e.gamepad);
}
function addhitbox(gamepad) {
  controllers[gamepad.index] = gamepad;

  rAF(updateStatus);
}

function disconnecthibtox(e) {
  removehitbox(e.gamepad);
}
function removehitbox(gamepad) {
  let d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  scanehitbox();
  for (j in controllers) {
    let controller = controllers[j];

    for (let i=0; i<controller.buttons.length; i++) {
      if (buttonPressed(controller.buttons[i])) {
        $("#" + map[i]).attr("r", 7);
      } else {
        $("#" + map[i]).attr("r", 0);
      }
    }
  }
  rAF(updateStatus);
}

function scanehitbox() {
  let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (let i = 0; i < gamepads.length; i++) {
    if (gamepads[i] && (gamepads[i].index in controllers)) {
      controllers[gamepads[i].index] = gamepads[i];
    }
  }
}

function buttonPressed(b) {
  if (typeof b == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

if (haveEvents) {
  window.addEventListener("gamepadconnected", connecthitbox);
  window.addEventListener("gamepaddisconnected", disconnecthibtox);
} else if (haveWebkitEvents) {
  window.addEventListener("webkitgamepadconnected", connecthitbox);
  window.addEventListener("webkitgamepaddisconnected", disconnecthibtox);
} else {
  setInterval(scanehitbox, 500);
}
