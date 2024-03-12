/**
 * Function to fetch and update time for each minute
 */
 const updateTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // 12-hour format with leading zero
    const minutes = now.getMinutes().toString().padStart(2, "0"); // 2-digit minutes with leading zero
    const period = now.getHours() >= 12 ? "PM" : "AM";
    dashboardTime.text(`${hours}:${minutes} ${period}`);
  };