
const mysql=require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'exam',
	port:3306
});

const express = require('express');
const { response } = require('express');
const app = express();
app.use(express.static('abc'));

// getBook(single select) here we go.....

app.get('/getBookDetails', function (req, res) {
    let input = req.query.bookid;
	console.log(input);
	let output ={
		bookidfoundstatus:false,
		bookdeatils: {bookid:13,bookname:"vasuSirBoss",price:300},
	};
	connection.query("select * from book where bookid = ?", [input], (err, rows) => {
		if(rows.length > 0){
			output.bookidfoundstatus=true;
			output.bookdeatils=rows[0];
		}
		else if(err){
			console.log('buddy something went wrong');
		}
		res.send(output);
	});

});	
	


//update stuff

app.get('/updateBook',(req,res)=>{
	let output=false
	let input={
		bookid: req.query.bookid,
		bookname: req.query.bookname,
		price: req.query.price
	};

	connection.query("update book set bookname =?,price=? where bookid=?", [input.bookname,input.price,input.bookid], (err,kyaHuva) => {
		if(error){
			console.log("can't updatethe values");
		}
		else if(kyaHuva.affectedRows>0)
			output= true;
		res.send(output);	
	});	
});


app.listen(3700,()=>{
	console.log('server is listening at port 3700..')
})
