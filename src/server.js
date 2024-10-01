// requirements
require('dotenv').config();
const express            = require('express');
const sequelize          = require('./db');
const { router }         = require('./routers/router.js');
const multer             = require('multer');

const port   = process.env.PORT||3000;
const host   = process.env.HOST||'0.0.0.0'||'127.0.0.1';
const server = express();

server.set('view engine', 'twig');
server.set('view options', {layout: false});
server.set("twig options", {
  allow_async: true, // Allow asynchronous compiling
  strict_variables: false
});   

server.use("/popper"          ,express.static('./node_modules/@popperjs')); 
server.use("/css"             ,express.static('./node_modules/bootstrap/dist/css'));
server.use("/js"              ,express.static('./node_modules/bootstrap/dist/js')); 
server.use("/cytoscape"       ,express.static('./node_modules/cytoscape')); 
server.use("/font-awesome"    ,express.static('./node_modules/font-awesome'));
server.use("/cytoscape-popper",express.static('./node_modules/cytoscape-popper')); 
server.use("/tippy.js"        ,express.static('./node_modules/tippy.js')); 

server.use(express.static('./views'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
  
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
      cb(null, './views/image');
    },
    filename: (req,file, cb) => {      
      cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
    },
});

const upload = multer({ storage });
server.use(upload.single("file"));
server.use(router);  


server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
        
//SQL ORM Sequelize
const start = async () => {
  try {
      await sequelize.authenticate()
      await sequelize.sync()
      
  } catch (e) {
      console.log(e)
  }
}  
  
start()      

