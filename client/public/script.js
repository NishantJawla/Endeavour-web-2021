//jshint esversion: 8
//show event details popup
document.querySelector(".events .each-event .learn-more").addEventListener("click", () => {
    document.querySelector(".event-popup").classList.add("show-slowly");
    document.querySelector(".event-popup").classList.remove("hide-slowly");

});
//close event details popup
document.querySelector(".event-popup .close-button").addEventListener("click", () => {
    document.querySelector(".event-popup").classList.remove("show-slowly");
    document.querySelector(".event-popup").classList.add("hide-slowly");
});
//show event registration conf block
document.querySelector(".event-popup .register-button").addEventListener("click", () => {
    document.querySelector(".event-conf-popup").classList.add("show-slowly");
    document.querySelector(".event-conf-popup").classList.remove("hide-slowly");
    document.querySelector(".event-popup").classList.remove("show-slowly");
    document.querySelector(".event-popup").classList.add("hide-slowly");
});
//hide event registraion conf block
document.querySelector(".event-conf-popup .no-button").addEventListener("click", () => {
    document.querySelector(".event-conf-popup").classList.remove("show-slowly");
    document.querySelector(".event-conf-popup").classList.add("hide-slowly");
});