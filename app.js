require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const foodModel = require("./model/food");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURL).then(() => console.log("mongo db connected"));

app.get("/",(req,res) => { console.log("Simple Crud Opreation");});

app.get("/foodDetail", async (req,res) =>
{
    const details = await foodModel.find();

    if(details === 0){
        return res.json({data:"No Data Found"});
    }

    return res.json({data:details});
});

app.get("/foodDetail/:id", async (req,res) =>
{
    const fId = req.params.id;
    const details = await foodModel.findOne({f_id : fId}); 

    if(details === 0)
    {
        return res.json({data:"No Data Found"});
    }

    return res.json({data:details});
});

app.post("/addFood", (req,res) =>
{
    const {addFood} = req.body;
    const addData = foodModel.create(addFood);
    
    if(addData)
    {
        return res.json({data:"Inserted Successfully..."});
    }
    
    return res.json({data:"Something Wrong"});
});

app.put("/updateFoodName", async (req,res) =>
{
    const fid = req.body.f_id;
    const name = req.body.name;

    const updateData = await foodModel.findOneAndUpdate(
        {f_id: fid},
        {name : name},
        {new:true}
    ); 

    if(!updateData)
    {
        return res.json({data:"Somthing Wrong"});
    }
    
    return res.json({data:"Update Successfully..."});
});

app.put("/updatePrice", async (req,res) =>
{
    const id = req.body.movie_id;
    const price = req.body.price;

    const updateData = await foodModel.findOneAndUpdate(
        {f_id: id},
        {price : price},
        {new:true}
    ); 

    if(updateData)
    {
        return res.json({data:"Price Update Successfully"});
    }
    return res.json({data:"Something Wrong"});
});

app.delete("/deleteWithId/:id", async (req,res) =>
{
    const fId = req.params.id;
    const deleteData = await foodModel.findOneAndDelete(
        {f_id : fId}
    );

    if(deleteData)
    {
        return res.json({data:"Deteled Successfully..."});
    }

    return res.json({data:"Something Wrong"});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))