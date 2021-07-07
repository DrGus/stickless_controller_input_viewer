let haveEvents = 'GamepadEvent' in window;
let haveWebkitEvents = 'WebKitGamepadEvent' in window;
let controllers = {};

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
        if(debug) {
          console.log(i);
        }
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
