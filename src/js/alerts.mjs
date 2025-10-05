export default class Alert {
  constructor(alerts) {
    this.alerts = alerts;
  }

  createAlert() {
    if (!this.alerts || this.alerts.length === 0) {
      return;
    }

    const alertSection = document.createElement("section");
    alertSection.className = "alert-list";

    this.alerts.forEach((alert) => {
      const alertElement = document.createElement("div");
      alertElement.className = `alert alert-${alert.type || "info"}`;
      alertElement.innerHTML = `
        <p>${alert.message}</p>
      `;
      alertSection.appendChild(alertElement);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(alertSection);
    }
  }
}
