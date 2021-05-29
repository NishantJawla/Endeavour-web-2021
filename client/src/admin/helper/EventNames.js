//jshint esversion: 8

exports.getEventName = (eventId) => {
    switch(eventId){
        case "609caacc46ebb237b8fff05c":
            return "B-Plan";
        case "60a0b75aa45a7705fc059d84":
            return "B-Quiz";
        case "60a0ba34a45a7705fc059d85":
            return "Rags to Riches";
        case "60a0be2aa45a7705fc059d86":
            return "Market Watch";
        case "60a0d0b7a45a7705fc059d87":
            return "Corporate Mystry";
        case "60a0d1f4a45a7705fc059d88":
            return "Tresure Hunt";
        case "60a0d441a45a7705fc059d89":
            return "Mind Scribble";
        default: 
            return undefined;
    }
};