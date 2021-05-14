//jshint esversion: 8
exports.getEventId = (eventName) => {
    switch(eventName){
        case "bplan":
            return "idofbplan";
        case "bquiz": 
            return "idofbquiz";
        case "hackathon":
            return "idofhackathon";
        default: 
            return null;
    }
}