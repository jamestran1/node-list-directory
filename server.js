const express = require('express');
const fs = require('fs');
const app = express();


app.use(express.static('public'));
app.set('view engine', 'pug')

let root = "/";
app.use(function(req, res, next) {
  let data = [];
  let path = __dirname + req.path;
    if(fs.lstatSync(path).isFile()) {
      console.log('a');
        return fs.readFile(path, 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          res.send("<pre>"+data+"</pre>");
        });
    }
  // }
  
  return fs.readdir(path, function(err, items) {
//       console.log(path);
//       // let root = '';
//       if (req.path != '/') {
        
//         // console.log('req.path: ', req.path);
//         data.push({name: '..', type:'folder', nextPath: root});
        
//         let reg = /((\/)([\w\-]+)$)/g;
//         let substr = req.path.match(reg);
//         let length = substr ? substr[0].length : 0;
//         console.log(substr);
//         console.log(req.path.length);
//         console.log(length);
//         root = req.path.substring(0, req.path.length - length);
//         root = root == '' ? req.path : root;
//         console.log("root: ", root);
//         // console.log('before: root: ', root);
//         // console.log('req.path: ', req.path);
//         // if (root.length >= req.path.length) {
//         //   let reg = /((\/)([\w\-]+)$)/g;
//         //   let substr = root.match(reg);
//         //   console.log("substr: ", substr);
//         //   root = root.substring(0, root.length - substr[0].length);
//         //   substr = root.match(reg);
//         //   root = root.substring(0, root.length - substr[0].length);
//         // } else {
//         //   root = req.path;
//         // }
//         // // root = root.length < req.path.length ? req.path : root;
//         // console.log('after:root: ', root);
//       }
    
      for (var i=0; i<items.length; i++) {
          let info = {};
          let reg = /(\.)[(\-)a-zA-Z]+$/gi;
          let fileType = items[i].match(reg);
          info.name = items[i];
          root = req.path;
          info.nextPath = req.path == "/" ? info.name : req.path + "/"+ info.name;
          if(fileType) {            
            info.type = info.name[0] == '.' ? 'hidden-file':  fileType[0];
          } else if (info.name == "LICENSE") {
            info.type == "file"
          } else {
            info.type = "folder";
          }
          data.push(info);
      }
    res.render(__dirname + '/views/index', {data: data, root: root});
  });
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
