var express = require('express');
var path = require('path');

var port = process.env.PORT || 5000
var app = express();

// // expose node_modules to client app
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'src/app')));
app.get('/', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
app.listen(port);
module.exports = app;


// <div className="some_class">
//  <h1>Todo React App</h1>
//   <div className="container" id="todos">
//       <div className="todo">
//         <li>
//           <p>
//              "Build Quotox in React"
//           </p>
//         </li>
//       </div>
//
//       <div className="todo">
//         <li>
//           <p>
//              "Put Quotox in Heroku using express"
//           </p>
//         </li>
//       </div>
//
//       <div className="todo">
//         <li>
//           <p>
//             "Quotox can post to rails and also get quotes"
//           </p>
//         </li>
//       </div>
//
//       <div className="todo">
//         <li>
//           <p>
//              "Extra Mile: Put in PHP production"
//           </p>
//         </li>
//       </div>
//       <div className="todo">
//         <li>
//           <p>
//              "SOME VARIABLE"
//           </p>
//         </li>
//       </div>
//     </div>
// </div>
