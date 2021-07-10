io = require("socket.io");

module.exports = io => {
   io.on("connection", client => {

       console.log("new connection");
       
       client.on("disconnect", () => {
           console.log("user disconnected");
        });
        
        client.on("message", () => {
            io.emit("message", {
                content: "Hello"
            });
        });

        $("#chatForm").submit(() => {
            socket.emit("message");
            $("#chat-input").val("");
            return false;
        });
        socket.on("message", (message) => {
            displayMessage(message.content);
        });
        let displayMessage = (message) => {
            $("#chat").prepend($("<li>").html(message));
        };
    })
};