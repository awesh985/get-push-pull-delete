const joi = require("joi");
const express = require('express');
const app = express();
app.use(express.json());

const courses =[{id:1, name:"course1"},
{id:2, name:"course2"},
{id:3, name: "course3"}];
app.get('/',(req,res)=>{res.send("hello world")});

app.get("/api/courses", (req, res) =>{res.send(courses);});

app.get("/api/courses/:id", (req, res) =>{
	const course =courses.find(c => c.id === parseInt(req.params.id));
if (!course) res.status(404).send("the course with the given id was not found "); res.send(course);});

app.get("/api/post/:year/:month",(req,res) =>{res.send(req.params.year)});





app.post("/api/courses", (req, res) => {
	const schema = {
		name: joi.string().min(3).required()
	};
	const result = joi.validate(req.body,schema);
	if(result.error){res.status(400).send(result.error.details[0].message); return;}
	
	const course = {
	id: courses.length + 1, 
	name: req.body.name 
};
courses.push(course); res.send(course);
});





app.put("/api/courses/:id", (req , res) => {
const course =courses.find(c => c.id === parseInt(req.params.id));
if (!course) res.status(404).send("the course with the given id was not found "); res.send(course);

const schema = {
name: joi.string().min(3).required()};
const result = joi.validate(req.body,schema);
if(result.error){res.status(400).send(result.error.details[0].message); return;}
course.name = req.body.name;
res.send(course);
});



app.delete("/api/courses/:id",(req,res) =>{
const course =courses.find(c => c.id === parseInt(req.params.id));
if (!course) res.status(404).send("the course with the given id was not found "); res.send(course);
courses.index = courses. indexOf(course);
courses.splice(index , 1);
res.send(course);});


const port =process.env.AWESH || 3000;
app.listen(port,() => console.log('linstening on port ${AWESH}...')) ;
