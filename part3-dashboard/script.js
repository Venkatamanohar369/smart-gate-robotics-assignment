const statusText = document.getElementById("statusText");
const activityText = document.getElementById("activityText");
const indicator = document.getElementById("indicator");

function updateActivity(message) {
  const currentTime = new Date().toLocaleTimeString();
  activityText.textContent = `${message} at ${currentTime}`;
}

function simulateGate() {

  // Gate Opening
  statusText.textContent = "Gate Opening...";
  indicator.className = "indicator opening";
  updateActivity("Vehicle detected");


  // Gate Open
  setTimeout(() => {

    statusText.textContent = "Gate Open";
    indicator.className = "indicator open";
    updateActivity("Gate opened successfully");

  }, 2000);


  // Gate Closing
  setTimeout(() => {

    statusText.textContent = "Gate Closing...";
    indicator.className = "indicator opening";
    updateActivity("Path clear, closing gate");

  }, 5000);


  // Gate Closed
  setTimeout(() => {

    statusText.textContent = "Gate Closed";
    indicator.className = "indicator closed";
    updateActivity("Gate closed successfully");

  }, 7000);
}