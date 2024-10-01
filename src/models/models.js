const sequelize     = require('../db')
const { DataTypes } = require('sequelize')

//sequelize.sync({ force: true })
//console.log('DB DROP and CREATE all tables!')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    Name: {type: DataTypes.STRING, unique: true},
    Descr: {type: DataTypes.STRING},    
    EAuth: {type: DataTypes.BOOLEAN, defaultValue: 'false'},
    Show: {type: DataTypes.BOOLEAN, defaultValue: 'true'},        
    Password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    AdmRole: {type: DataTypes.BOOLEAN, defaultValue: 'false'}
})

const Role = sequelize.define('Role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true}
})

const Nodes = sequelize.define('Nodes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},  
    kod: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    parent: {type: DataTypes.INTEGER},  
    classes: {type: DataTypes.STRING},
    descr: {type: DataTypes.STRING},
    x: {type: DataTypes.INTEGER},
    y: {type: DataTypes.INTEGER},
    status: {type: DataTypes.STRING},
    ip: {type: DataTypes.STRING},
    tx: {type: DataTypes.BOOLEAN},
    rx: {type: DataTypes.BOOLEAN},
    swbport: {type: DataTypes.STRING},
    txText: {type: DataTypes.STRING},
    rxText: {type: DataTypes.STRING},
    link: {type: DataTypes.STRING}
})

const Edges = sequelize.define('Edges', {
    id: {type: DataTypes.STRING, primaryKey: true},  
    source: {type: DataTypes.INTEGER},
    target: {type: DataTypes.INTEGER},    
    classes: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    fiber: {type: DataTypes.INTEGER},
    length: {type: DataTypes.INTEGER},
    descr: {type: DataTypes.STRING},
    sourceParent: {type: DataTypes.INTEGER},
    targetParent: {type: DataTypes.INTEGER},
    signal: {type: DataTypes.INTEGER},  
    status: {type: DataTypes.STRING},
    parent: {type: DataTypes.STRING},
    rfm_id: {type: DataTypes.INTEGER},
    reflect: {type: DataTypes.BOOLEAN, defaultValue: 'false'},
    rfmName: {type: DataTypes.STRING},
})

const Config = sequelize.define('Config', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    data:  {type: DataTypes.STRING(5000)},
    status:  {type: DataTypes.INTEGER, defaultValue: 0}
})

Role.hasOne(User)
User.belongsTo(Role)

sequelize.sync({alter: true});
console.log('DB UPDATE all tables!');

module.exports = {
    User,
    Role,
    Nodes,
    Edges,
    Config
}