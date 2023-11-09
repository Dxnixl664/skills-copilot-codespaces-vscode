// Create web server
// Run: node comments.js
// Test: curl -X GET http://localhost:3000/comments
// Test: curl -X POST http://localhost:3000/comments -H "Content-Type: application/json" -d '{"body": "comment body", "postId": 1}'
// Test: curl -X PUT http://localhost:3000/comments/1 -H "Content-Type: application/json" -d '{"body": "comment body", "postId": 1}'
// Test: curl -X DELETE http://localhost:3000/comments/1
// Test: curl -X GET http://localhost:3000/comments/1

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.use(bodyParser.json());

var comments = [
	{
		id: 1,
		body: "comment body 1",
		postId: 1
	},
	{
		id: 2,
		body: "comment body 2",
		postId: 2
	},
	{
		id: 3,
		body: "comment body 3",
		postId: 3
	}
];

// Get comments
app.get('/comments', function(req, res) {
	res.json(comments);
});

// Get comment by id
app.get('/comments/:id', function(req, res) {
	var commentId = parseInt(req.params.id);
	var comment = comments.filter(comment => comment.id === commentId)[0];
	if (comment) {
		res.json(comment);
	} else {
		res.sendStatus(404);
	}
});

// Add comment
app.post('/comments', function(req, res) {
	var comment = req.body;
	comment.id = comments.length + 1;
	comments.push(comment);
	res.json(comment);
});

// Update comment
app.put('/comments/:id', function(req, res) {
	var commentId = parseInt(req.params.id);
	var comment = comments.filter(comment => comment.id === commentId)[0];
	if (comment) {
		comment.body = req.body.body;
		comment.postId = req.body.postId;
		res.json(comment);
	} else {
		res.sendStatus(404);
	}
});

// Delete comment
app.delete('/comments/:id', function(req, res) {
	var commentId = parseInt(req.params.id);
	var comment = comments.filter(comment => comment.id === commentId)[0];