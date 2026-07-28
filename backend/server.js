const express = require("express");
const supabase = require("./config/supabase");

require("dotenv").config();

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("OpMemory Backend Running");
});


// Get all tickets
app.get("/tickets", async (req, res) => {

    const { data, error } = await supabase
        .from("tickets")
        .select("*");


    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }


    res.json(data);

});


// Get ticket by ticket_id
app.get("/tickets/:ticket_id", async (req, res) => {

    const { ticket_id } = req.params;


    const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("ticket_id", ticket_id)
        .single();


    if (error) {
        return res.status(404).json({
            error: "Ticket not found"
        });
    }


    res.json(data);

});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});