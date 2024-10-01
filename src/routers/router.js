const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller.js');

//Get index data  
router.get('/', controller.Auth)

//Post index data  
router.post('/', controller.Signin)

router.get('/getusers', controller.getUsers)
router.post('/getuser', controller.getUser)
router.post('/createuser', controller.createUser)
router.post('/deluser', controller.deleteUser)
router.post('/updateuser', controller.updateUser)

router.get('/getroles', controller.getRoles)
router.post('/createrole', controller.createRole)
router.post('/delrole', controller.deleteRole)

router.post('/addnode',controller.AddNode)
router.post('/delnode',controller.DeleteNode)
router.post('/updatenode',controller.UpdateNode)
router.post('/modnode',controller.ModNode)
router.get('/getnodes',controller.GetNodes)

router.post('/addedge',controller.AddEdge)
router.post('/deledge',controller.DeleteEdge)
router.get('/getedges',controller.GetEdges)
router.post('/modedge',controller.ModEdge)
router.post('/editedge',controller.EditEdge)

router.get('/stations',controller.GetStations)
router.get('/getcables',controller.GetCables)
router.get('/getlines',controller.GetLines)
router.get('/getobjects',controller.GetObjects)
router.get('/getunits',controller.GetUnits)
router.post('/getfibers',controller.GetFibers)
router.post('/addfiber', controller.AddFiber)
router.get('/getunitparents',controller.GetUnitParents)

router.post('/upload', controller.upload)
router.get('/config', controller.getConfig)
router.post('/createconf', controller.createConfig)
router.post('/delconf', controller.deleteConfig)

router.post('/editport',controller.editPort)

router.post('/import', controller.import)
  
router.post('/upload/image', controller.uploadImage)
router.post('/upload/getimage', controller.uploadGetImage)
router.post('/upload/delimage', controller.uploadDelImage)
router.get('/mimport',controller.mImport)

router.get('/getports',controller.getPorts)
router.get('/getdown',controller.getDown)

module.exports = { router }                                                  