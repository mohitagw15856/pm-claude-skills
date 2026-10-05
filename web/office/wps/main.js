// WPS 加载项 entry: ribbon callbacks. The button opens the shared task pane
// (../taskpane.html), the same one the Word add-in uses.
var PANE_URL = new URL('../taskpane.html', document.location.href).href;
var paneId = null;

function OnAddinLoad(ribbonUI) {
  if (typeof window.Application === 'object' && window.Application.ribbonUI !== ribbonUI) {
    window.Application.ribbonUI = ribbonUI;
  }
  return true;
}

function OnAction(control) {
  if (control.Id !== 'pmSkillsOpen') return true;
  var pane = paneId !== null ? wps.GetTaskPane(paneId) : null;
  if (pane) {
    pane.Visible = !pane.Visible;   // the button toggles the pane
  } else {
    pane = wps.CreateTaskPane(PANE_URL);
    paneId = pane.ID;
    pane.Visible = true;
  }
  return true;
}

function GetImage() {
  return new URL('../../assets/icon-192.png', document.location.href).href;
}
