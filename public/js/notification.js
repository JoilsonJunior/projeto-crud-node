document.addEventListener("DOMContentLoaded", function () {
  const notification = document.querySelector("#notification");
  if (notification) {
    setTimeout(() => {
      notification.classList.add("hide");
    }, 2000);

    notification.addEventListener("transitionend", () => {
      notification.remove();
    });
  }
});
