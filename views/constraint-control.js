selectRows = [];
n = 0;
let s = 0, f = 0, ms = 0, mf = 0;
let elements;
// define default stylesheet
let defaultStylesheet =  [
  {
    selector: 'node',
    style: {
      'background-color': '#bdd3d4',
      'label': 'data(name)',      
      'text-valign': 'center',
      'font-size': '8',
      'background-opacity': 0.8,
      'min-zoomed-font-size': '12',
      'width': '15px',
      'height': '15px',
      'border-color': '#DADADA',
      'border-width': 1,  
      // 'overlay-color' : '#FF00FF',
      // 'z-index': '0',
    }
  },    
  {
    selector: 'node:selected',
    style: {
      'background-color': '#22ee00',
      'border-color': '#22ee00',
      'z-index': '9999',

    }
  },
  {
  selector: 'node:parent',
    style: {
      'background-opacity': 0.333,
      'background-color': '#e8e8e8',
      'border-color': '#DADADA',
      'border-width': 1,
      'text-valign': 'bottom',
      //'z-index': '5',         
    }
  },
  {
    selector: 'node.station',
    style: {                  
      'content': 'data(name)',    
      'background-color': '#FFE4E1',
      'shape': 'round-rectangle',
      'width': '90px',
      'height': '90px',
      'min-zoomed-font-size': '13',
      'border-color': '#CD5C5C',
      'border-width': '15px',
      //'text-outline-color' : '#000',
      //'text-outline-width' : '10px',
      //'color': 'blue',
      'font-size': '48',
      'background-opacity': '0.8',
      'opacity': '0.9',
      // 'z-index': '6',
      //'text-halign': 'right'
    }
  },   
  {
    selector: 'node.station:selected',
      style: {
        'height': '90px',
        'width': '90px',  
        'border-width': '15px',
        'background-color': '#C0C0C0',
        'border-color': '#22ee00',        
        'z-index': '9999'
      }
  },    
  {
    selector: 'node.start, node.end',
    style: {
      'background-color': 'Red',
      'color': 'White',
      // 'height': '120px',
      // 'width': '120px',  
      'z-index': '9999'      
    }
  },  
  {
    selector: 'node.room',
    style: {
      'shape': 'rectangle',
      'background-color': '#FFFACD',
      // 'z-index': '3'
    }
  }, 
  {
    selector: 'node.float',
    style: {
      'shape': 'rectangle',
      'background-color': '#FAEBD7',
      // 'z-index': '2'
    }
  }, 
  {
    selector: 'node.building',
    style: {
      'shape': 'rectangle',    
      'background-color': '#FF7F50',
      // 'z-index': '2'
    }
  }, 
  {
    selector: 'node.unit',
    style: {
      'shape': 'round-rectangle',
      'background-color': '#363333',
      // 'z-index': '3'
    }
  },
  {
    selector: 'node.float:selected, node.unit:selected, node.building:selected, node.room:selected',
    style: {
      'background-color': '#33ff00',
    }
  },
  // Edges //
  {
    selector: 'edge',
    style: {
      'curve-style': 'straight',
      'z-index': '0',
      'opacity': '0.7',
    }
  },
  {
    selector: 'edge.line',
    style: {          
      'width': '70px',      
      'line-cap':'round',
      'source-distance-from-node': '35',     
      'target-distance-from-node': '35',   
      'content': 'data(name)',
      'z-index': '1',   
    }
  },  
  // Line color //
  {
    selector: 'edge.line[name="1"]',
    style: {      
      'line-color': 'IndianRed',
    }
  },
  {
    selector: 'edge.line[name="2"]',
    style: {      
      'line-color': 'MediumSeaGreen',
    }
  },
  {
    selector: 'edge.line[name="3"]',
    style: {      
      'line-color': 'SteelBlue',
    }
  },
  {
    selector: 'edge.line[name="4"]',
    style: {      
      'line-color': '#00BFFF',
    }
  },
  {
    selector: 'edge.line[name="5"]',
    style: {      
      'line-color': 'Sienna',
    }
  }, 
  {
    selector: 'edge.line[name="6"]',
    style: {      
      'line-color': '#FF8C00',
    }
  },
  {
    selector: 'edge.line[name="7"]',
    style: {      
      'line-color': 'MediumOrchid',
    }
  },  
  {
    selector: 'edge.line[name="8"], edge.line[name="8А"]',
    style: {      
      'line-color': 'Gold',
    }
  },
  {
    selector: 'edge.line[name="9"]',
    style: {        
      'line-color': 'Grey',          
    }
  },
  {
    selector: 'edge.line[name="10"]',
    style: {      
      'line-color': 'YellowGreen',
    }
  },
  {
    selector: 'edge.line[name="12"]',
    style: {      
      'line-color': 'LightSteelBlue',
    }
  },
  {
    selector: 'edge.line[name="13"]',
    style: {        
      'line-color': 'PowderBlue',          
    }
  },
  {
    selector: 'edge.line[name="15"]',
    style: {        
      'line-color': 'Plum',          
    }
  },
  {
    selector: 'edge.line[name="16"]',
    style: {      
      'line-color': 'LightGrey',
      // 'line-style': 'dashed',
      // 'line-fill': 'radial-gradient',
      // 'line-dash-pattern ': '[6,3]'
    }
  },   
  // Edge classes //
  {
    selector: 'edge.patchcord',
    style: {            
      'line-color': 'yellow',      
      // 'z-index': '1'
    }
  },  
  {
    selector: 'edge.magistral',
    style: {      
      //'curve-style': 'haystack',
      //'haystack-radius': '5',
      'line-color': 'DimGrey',
      'width': '7px',
      // 'z-index': '1'
    }
  },  
  {
    selector: 'edge.submagistral',
    style: {                  
      'line-color': 'MidnightBlue',
      'width': '5px',
      // 'z-index': '1'
    }
  },  
  {
    selector: 'edge.fiber',
    style: {                  
      'line-color': 'red',
      'width': '1px',
      'z-index': '0',
      'display': 'none'
    }
  },  
  {
    selector: 'edge:selected',
    style: {
      'line-color': '#22ee00',
      'background-color': '#22ee00',
      'z-index': '9999'
    }
  },
  {
    selector:  'core',
    style: {
      'active-bg-color': '#fff',
      'active-bg-opacity': '0.333'
    }
  },
  {
    selector: 'edge.not-path',
    style: {
      'opacity': '0.1',
      // 'z-index': '0'
    }
  },
  {
    selector: 'node.not-path',
    style: {
      'opacity': '0.333',
      //  'z-index': '9999'
    }
  },
  {
    selector: 'edge.path',
    style: {
      'opacity': '0.999',
      // 'z-index': '9999'
    }
  }         
];

///////////////////////////////////////////////////////////////////////////

let node_classes = document.getElementById('Node_classes');
let node_parentId= document.getElementById('node_parentId');
let node_parent  = document.getElementById('node_parent');
let node_name    = document.getElementById('node_name');
let node_descr   = document.getElementById('node_descr');
let edge_name    = document.getElementById('Edge_name');
let edge_classes = document.getElementById('Edge_classes');
let edge_source  = document.getElementById('Edge_source');
let edge_target  = document.getElementById('Edge_target');
let edge_fiber   = document.getElementById('edge_fiber');
let edge_length  = document.getElementById('edge_length');
let edge_descr   = document.getElementById('edge_descr');
let _status      = document.getElementById('status');
let position     = document.getElementById('position');

async function async_clear_edge_info() {
  edge_source.value = ''; 
  edge_target.value = '';
  edge_fiber.value  = 0;
  edge_length.value = 0;
  edge_descr.value  = '';
  edge_name         = '';
}
async function async_clear_node_info() {
  node_parent.value = ''; 
  node_name.value   = '';
  node_descr.value  = '';
}
let start, end;
let $body = document.body;
let shownTippy = null;
let tooltipOpen = false;
let $ = function(sel) { return document.querySelector(sel) }
const $clear = $('#clear');

function makeTippy(node, html) {
  console.log('>>makeTippy()...', node)

  $body.appendChild(html);
  node.popper({ content: html });

  shownTippy = new bootstrap.Tooltip(html);
  shownTippy.show();
  tooltipOpen = true;
  cy.userPanningEnabled(false);
}
function removeTippy() {
  console.log('>>removeTippy()...')
  if (shownTippy) {
    shownTippy.hide();
    shownTippy.dispose();
    shownTippy = null;     
  }
  cy.userPanningEnabled(true);
  tooltipOpen = false;
}
function selectStart(node) {

  $body.classList.add('has-start');

  start = node;
  start.addClass('start');
  
}
function selectEnd(node) {
  $body.classList.add('has-end', 'calc');
  end = node;
  cy.startBatch();
  end.addClass('end');

  if (start.id() === end.id()) {
    $body.classList.remove('calc');
    clear();
    cy.endBatch();
    return 
    // alert('Вы пытались создать начало и конец маршрута в одной точке.');
  }
  
  setTimeout(function() {
    let aStar = cy.elements().aStar({
      root: [start],
      goal: [end],
    });

    if (!aStar.found) {
      $body.classList.remove('calc');
      clear();
      cy.endBatch();
      return 
      // alert('Вы пытались создать несуществующий маршрут.');
    }

    cy.elements().not(aStar.path).addClass('not-path');

    if (cy.elements(aStar.path).parent().length > 0) {
      cy.elements(aStar.path).parent().removeClass('not-path');
    }
    if (cy.elements(aStar.path).parent().parent().length > 0) {
      cy.elements(aStar.path).parent().parent().removeClass('not-path');
    }

    let edges = cy.edges(aStar.path);
    console.log(edges);

    for (const ele of edges) {
      console.log(ele.data("parent"));
      cy.getElementById(ele.data("parent")).removeClass('not-path');
    }

    cy.endBatch();

    $body.classList.remove('calc');

    let pathIds = aStar.path.map(element => element.id());
    localStorage.setItem('savedPath', JSON.stringify(pathIds));
  }, 300);
}
function clear() {
  console.log('>>clear...');
  removeTippy();
  $body.classList.remove('has-start', 'has-end');
  cy.elements().removeClass('path not-path start end');
  cy.elements().unselect();
  localStorage.removeItem('savedPath');   

  s = 0, f = 0, ms = 0, mf = 0;
  let start = document.getElementById('start');
  if (start) start.remove();    
  let end = document.getElementById('end');
  if (end) end.remove();   
}
function backClear() {
  console.log('>>backClear...',s,ms,f,mf);

  // removeTippy();
  if (s===0&&ms===1&&f===0&&mf===0) {
    $body.classList.remove('has-start');
    cy.elements().removeClass('start');
    let start = document.getElementById('start');
    if (start) start.remove();
    ms=0;
  } else if (s===1&&ms===1&&mf===1&&f===0) {
    $body.classList.remove('has-end');
    cy.elements().removeClass('end');    
    let end = document.getElementById('end');    
    if (end) end.remove(); 
    mf=0; 
  } else {
    clear();
  }  

}
//  Nodes /////////////////////////////////////////////////////////////////
function compareNodes(a, b) {
  let isOverlapping = false;
  // bottom right
  if (a.x1 < b.x2 && a.x1 > b.x1 && a.y1 < b.y2 && a.y1 > b.y1) {
      isOverlapping = true;
  }
  // bottom left
  if (a.x2 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y1 > b.y1) {
      isOverlapping = true;
  }
  // top left
  if (a.x2 < b.x2 && a.x2 > b.x1 && a.y2 > b.y1 && a.y2 < b.y2) {
      isOverlapping = true;
  }
  // top right
  if (a.x1 < b.x2 && a.x1 > b.x1 && a.y2 < b.y2 && a.y2 > b.y1) {
      isOverlapping = true;
  }
  return isOverlapping;
}
function checkIfOverlaps(node, padding) {
    let x = node.renderedPoint().x;
    let y = node.renderedPoint().y;
    let w = node.renderedOuterWidth();
    let h = node.renderedOuterHeight();
    let currentNodeBB = {
        x1: x - w / 2 - padding,
        x2: x + w / 2 + padding,
        y1: y - h / 2 - padding,
        y2: y + h / 2 + padding
    }
    if (node.isChild()) {
        siblings = node.parent().children().difference(node);
    } else {
        siblings = node.cy().nodes().orphans().difference(node);
    }
    let isOverlapping = false;
    for (let neighbor of siblings) {
        let x = neighbor.renderedPoint().x;
        let y = neighbor.renderedPoint().y;
        let w = neighbor.renderedOuterWidth();
        let h = neighbor.renderedOuterHeight();
        let neighborBB = {
            x1: x - w / 2 - padding,
            x2: x + w / 2 + padding,
            y1: y - h / 2 - padding,
            y2: y + h / 2 + padding
        }
        if (compareNodes(currentNodeBB, neighborBB)) {
            isOverlapping = true;
        }
        if (compareNodes(neighborBB, currentNodeBB)) {
            isOverlapping = true;
        }
    }
    if (node.parent().length > 0) {
        if (checkIfOverlaps(node.parent(), padding)) {
            isOverlapping = true;
        }
    }
    return isOverlapping;
}
async function get_nodes() {
  console.log('>>get_nodes...'); 

  let res = await getOnServer('/getnodes'); 

  return res;  
}
async function add_node() {
  console.log('>>add_node()...'); 


  if (node_classes.value === 'Выбор...') {
    // alert('Не выбран тип для узла!');
    return;    
  }

  if (node_classes.value === 'unit') {
      
    let Modal = document.getElementById("addUnit");    

    currentModal = new bootstrap.Modal(Modal, {focus: true});
    currentModal.show();
  } else {
    await addNodeExt();
  }
}
async function addNodeExt() {
  console.log('>>addNodeExt()...'); 

  let elem = cy.nodes(':selected');
  let name = node_name.value;

  if (elem.length > 1) {
    // alert('Выбрано больше одного узла!');
    return; 
  }

  if (node_classes.value === elem.data("classes")) {
    // alert('Добавление узла выбранного типа запрещено!');
    return;    
  }

  if (node_classes.value === 'node' && elem.length === 0 ) {    
    // alert('Добавление порта в не устройства запрещено!');
    return;    
  }

  if (node_classes.value === 'node' && elem.classes()[0] != 'unit' ) {
    console.log('classes', elem.classes()[0]);
    // alert('Добавление порта для выбранного типа узла запрещено!');
    return;    
  }

  let unitMode = document.getElementsByName("unit_mode");
  let portCount;
  for (let ele of unitMode) {
    // console.log('unitMode:', ele.id);
    // console.log('unitMode.checked:', ele.checked);
    if(ele.checked) portCount = ele.id;
  }

  async function addElem() {
      let children = elem.children().sort(function( a, b ){
        return a.data('name') - b.data('name');
      });  

      let n = children.length;

      if (node_classes.value==='node') {
        name = '1';
        if (n > 0) {
          p1 = children[0].position();  
          pn = children[n-1].position();    
          name = Number(children[n-1].data('name')) + 1;       
        }
      }

      if (children.visible() === false) return;

      if (elem.length < 1) {
        name = '';
        node_parent.value = '';
        node_name.value ='';
      } else {
        let c = elem.data("classes");      
        if (c != undefined){
          let cc = await c.substring(0,1) ;

          if (cc === node_classes.value.substring(0,1)) {    
            name = '';          
            node_name.value ='';          
            return;
          }
        }
      }  
      
      let data;
      if (elem.isNode()) {      

        node_parent.value = elem.data('name');
        
        let x = elem.position().x;
        let y = elem.position().y;    
        if ((n + 1)>1 && children.classes()[0]==='node'){                               
            
          if (n===16||n===32||n===48||n===64||n===80) {        
            x = p1.x;
            y = children[n-1].position().y+16;
          } else {
            x = pn.x + 16;  
            y = pn.y;         
          }              
        }

        data =  {            
          'name'      : name,
          'parent'    : elem.data("id"),
          'classes'   : node_classes.value,
          'descr'     : node_descr.value,
          'x'         : x,
          'y'         : y
        }
      } else {
        data =  {   
          'name'      : name,   
          'parent'    : 0,
          'classes'   : node_classes.value,
          'descr'     : node_descr.value,
          'x'         : -200,
          'y'         : -2800
        }
      }  

      res = await postOnServer(data,'/addnode');

      let cyelement = {
        group: 'nodes',
        data: { id: res.id, name: res.name, parent: res.parent, descr: res.descr },
        classes: res.classes,
        position: { x: res.x, y: res.y }
      }
        
      let ele = cy.add(cyelement);    
      let classes = ele.classes();

      node_classes.value = classes[0];
            
      cy.zoom(2)
      .delayAnimation(2000);
      cy.center(ele);
      if (classes[0] === 'unit') {
        elem.unselect();
        ele.select();
      }
          
      _status.value = '>> Узел ' + ele.data("name") +' добавлен';
  }

  if (portCount==='x0') {
    await addElem();
  } else {
    //unit
    await addElem();
    node_classes.value = 'node';
    elem = cy.nodes(':selected');
    name = node_name.value;
    //ports
    if (portCount ==='x16') {
      ports=16;
    } else if (portCount ==='x32') {
      ports=32;
    } else if (portCount ==='x48') {
      ports=48;
    } else if (portCount ==='x64') {
      ports=64;
    } else if (portCount ==='x96') {
      ports=96;
    }
    for (let i = 0; i < ports; i++) {
      await addElem();
    }
  
    let x0 = document.getElementById("x0");
    x0.checked = true;
  }
}
async function update_node(elem) {
  console.log('>>update_node()...'); 

  const data =  {            
      'id'        : elem.data("id"),      
      'x'         : elem.position().x,
      'y'         : elem.position().y
  }  
 
  let res = await postOnServer(data,'/updatenode');

  return res;
}
async function moveNode(elem) {
  console.log('>>moveNode()...'); 
  const id = elem.data("id");

  const newParentElem = cy.getElementById(node_parentId.value);  

  if (newParentElem.locked) {
    newParentElem.unlock();  
  }

  const newElem = elem;
  const childEle = await elem.children();  
  await elem.remove(); 

  const data =  {            
      'id'        : id,    
      'parent'    : newParentElem.data("id"),
      'name'      : node_name.value,       
      'descr'     : node_descr.value
  }
 
  res = await postOnServer(data,'/modnode');   
 
  newElem.data('id',elem.data("id"));
  newElem.data('parent',newParentElem.data("id"));
  newElem.data('name',node_name.value);
  newElem.data('descr',node_descr.value);  
  newElem.position('x',newParentElem.position().x);  
  newElem.position('y',newParentElem.position().y);  
  newElem.classes('unit');
  newElem.data('classes','unit');
  newElem.group('nodes');

  await update_node(newElem);
    
  let cyelement = {
    group: 'nodes',
    data: data,
    classes: newElem.data("classes"),
    position: { x: newElem.position().x, y: newElem.position().y }
  }
    
  let ele = cy.add(cyelement);  
            
  cy.zoom(2)
  .delayAnimation(2000);
  cy.center(ele);
  
  //обновить коорд. вложенных элементов!
  let n = childEle.length;
  // console.log('n:',n);
  console.log(childEle);
  let childEleSort = childEle.sort((a, b) => a.data("name") - b.data("name"));
  console.log(childEleSort);
  let i = 0;
  if (n > 0) {
    for (let child of childEleSort) {
      // console.log(child);
      let newChild = child;
      await child.remove();                                       
  
      const dataCh =  {   
        'id'        : newChild.data("id") ,
        'name'      : newChild.data("name"),
        'parent'    : newElem.data("id"),        
        'descr'     : newChild.data("descr")
      }                             

      await newChild.position('x',newElem.position().x+i);  
      await newChild.position('y',newElem.position().y);  

      await update_node(newChild); 

      let cyelementCh = {
        group: 'nodes',
        data: dataCh,
        classes: newChild.data("classes"),
        position: { x: newElem.position().x+i, y: newElem.position().y }
      }
              
      await cy.add(cyelementCh);     
      i = i+16;        
    }    
  }  
  ele.select();  
}
async function mod_node() {
  console.log('>>mod_node()...'); 

  elem = cy.nodes(':selected');

  if (elem.length > 1) {
    // alert('Выбрано больше одного узла!');
    return; 
  }
  
  const classes = elem.classes();
  let elemParentId = 0;
  if (elem.parent().data("id")===undefined) {
    elemParentId = 0;
  } else {
    elemParentId = elem.parent().data("id");
  }
    
  if (node_parentId.value==elemParentId) {
    // console.log('>>Обновление устройства...');
    const data =  {            
      'id'        : elem.data("id"),    
      'parent'    : elemParentId,
      'name'      : node_name.value,       
      'descr'     : node_descr.value
    }
  
    res = await postOnServer(data,'/modnode');    

    elem.data("name",node_name.value);
    elem.data("descr",node_descr.value); 
  } else {  
    // console.log('>>Перемещение устройства...');    
    if (classes[0] === 'unit') {     
      await moveNode(elem);
    } else {
      // alert('Перемещение данного типа невозможно!');
      return;
    }
  }
  let ModNode = document.getElementById("ModNode");
  ModNode.setAttribute("style", "background-color:#30baaf");

  let columnLeft = document.getElementById("column-left");
  columnLeft.setAttribute("mod", "fales");

  let addEdge = document.getElementById("AddEdge"); 
  addEdge.disabled = false;

  cy.autounselectify( false );
}
async function copy_node() {
  console.log('>>copy_node()...'); 

  let elem = cy.nodes(':selected');  
  let children = elem.children();  
  let n = children.length;

  if (elem.length > 1) {
    alert('Выбрано больше одного узла!');
    return; 
  }

  let data;
  if (elem.isNode()) {      
                
    let x = elem.position().x;
    let y = elem.position().y+15;   
    let classes =  elem.classes();

    data =  {            
      'name'      : elem.data("name"),
      'parent'    : elem.parent().data("id"),
      'classes'   : classes[0],
      'descr'     : elem.data("descr"),
      'x'         : x,
      'y'         : y
    }
  }   
  // console.log(data);

  let res = await postOnServer(data,'/addnode');

  let cyelement = {
    group: 'nodes',
    data: { id: res.id, name: res.name, parent: res.parent, descr: res.descr },
    classes: res.classes,
    position: { x: res.x, y: res.y }
  }
    
  elem = await cy.add(cyelement);    
 
  // cy.center(elem);
      
  // _status.value = '>> Узел ' + elem.data("name") +' скопирован';

  if (n > 0) {
    for (let child of children) {
                                       
      let classes =  child.classes();
  
      data =  {            
        'name'      : child.data("name"),
        'parent'    : elem.data("id"),
        'classes'   : classes[0],
        'descr'     : child.data("descr"),
        'x'         : child.position().x,
        'y'         : child.position().y + child.renderedOuterHeight() + 16
      }
                             
      let res = await postOnServer(data,'/addnode'); 
    
      let cyelement = {
        group: 'nodes',
        data: { id: res.id, name: res.name, parent: res.parent, descr: res.descr },
        classes: res.classes,
        position: { x: res.x, y: res.y }
      }
        
      await cy.add(cyelement);               

    }
  }
}
async function delete_node(){
  console.log('>>delete_node()...');
  
  let names = '';
  let elem = await cy.nodes('node:selected');
  for (let ele of elem) {
    
    let classes = ele.classes();    
    if (classes[0] === 'station') {
      console.log(ele); 
      // alert('Недоступно удаление узлов станций интерактивно!');
      return;
    } else {  

      const data = {            
        'id'    : ele.data("id"),    
      }
                
      let res = await postOnServer(data,'/delnode');

      names = names + ele.data("name") +'; ';
    }
  }      
  await elem.remove();
  
  await async_clear_node_info();  
  await async_clear_edge_info();

  node_classes.value = "Select...";

  // _status.value = '>> Узел(ы) ' + names +' удален(ы)';
  
}
// Edges //////////////////////////////////////////////////////////////////
async function get_edges() {
  console.log('>>get_edges()...'); 

  let res = await getOnServer('/getedges'); 
  
  return res;  
}
async function add_edge() {
  console.log('>>add_edges()...'); 

  let line;  
  let elem = await cy.nodes(':selected');
  let classes = elem[0].classes();
  if (classes[0] === 'station') {    
    classes = 'line';
    line = elem[0].data("descr");
  } else {
    classes = edge_classes.value;
    line = '';

    if (edge_classes.value === 'Выбор...') {
      // alert('Не выбран тип для связи!');
      return;    
    }
  }       

  let data =  {            
      'source'    : elem[elem.length-1].data("id"),
      'target'    : elem[0].data("id"),
      'classes'   : classes,
      'name'      : line,
      'descr'     : edge_descr.value
  } 
 
  let res = await postOnServer(data,'/addedge');
  
  let cyelement = {
    group: 'edges',
    data: { id: res.id, source: res.source, target: res.target, name: res.name, descr: res.descr },
    classes: res.classes
  }

  // console.log(cyelement);    
  await cy.add(cyelement);
  //cy.zoom(2);
  //cy.center(ele);

}
async function mod_edge() {
  console.log('>>mod_edge()...'); 

  let elem = cy.edges(':selected');

  if (elem.length > 1) {
    alert('Выбрано больше одной связи!');
    return; 
  }

  const data =  {            
      'source'    : elem.data("source"),                   
      'target'    : elem.data("target"),  
      'classes'   : elem.classes(),    
      'name'      : edge_name.value,            
      'descr'     : edge_descr.value
  }
  //console.log(data); 
 
  let res = await postOnServer(data,'/modedge');  
  
  elem.data('descr' , edge_descr.value);
  elem.data('name'  , edge_name.value);

  let ModEdge = document.getElementById("ModEdge");
  ModEdge.setAttribute("style", "background-color:#30baaf");

  let columnLeft = document.getElementById("column-left");
  columnLeft.setAttribute("mod", "fales");

  let addNode = document.getElementById("AddNode"); 
  addNode.disabled = false;

  cy.autounselectify( false );

  _status.value     = '>> '+elem.data("source")+ '-' +elem.data("target")+ ' обновлена';
}
async function delete_edge(){
  console.log('>>delete_edge()...');
  
  let elem = await cy.edges(':selected');

  for (let ele of elem) {

    let id = ele.data("id");
    
    const data = {                   
      'id'    : id,  
    }
    
    let res = await postOnServer(data,'/deledge') 

    await ele.remove();

    _status.value     = '>> Связь '+id+' удалена';
    
  }    
  
  await async_clear_edge_info();
}
function select_node_classes() {

  node_parent.value = '';

  let elem = cy.nodes(':selected');
  if (elem.isNode()) {      
    node_parent.value = elem.data("name");
  }
  node_name.value   = '';
  node_descr.value  = '';

}
///////////////////////////////////////////////////////////////////////////
function show_modal_export() {
  console.log('>>show_modal_export...'); 

  let exportModal = document.getElementById("exportModal");
  let options =  {
    focus: true
  };

  currentModal = new bootstrap.Modal(exportModal, options);
  currentModal.show();

}
function exportExcel() {
  const savedPath = JSON.parse(localStorage.getItem('savedPath'));
  if (!savedPath) return alert('Нет маршрута для выгрузки...');

  // Создание массива данных для экспорта в формате Excel
  const data = [];
  data.push(['ID', 'Value']); // Заголовки столбцов

  for (let i = 0; i < savedPath.length; i++) {
    data.push([i + 1, savedPath[i]]); // Добавление данных из localStorage
  }

  // Создание рабочей книги
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Добавление рабочего листа к рабочей книге
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Преобразование книги в бинарный формат
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Предлагаем пользователю имя файла и выбор папки для сохранения
  const fileName = prompt('Введите имя файла', 'export.xlsx');
  if (fileName === null) return; // Если пользователь нажал "Отмена", прерываем выполнение

  // Создание Blob из бинарных данных Excel
  // const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const file = new File([excelBuffer], fileName, {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

  // Создание ссылки для скачивания файла
  const downloadLink = document.createElement('a');
  downloadLink.href     = window.URL.createObjectURL(file);
  downloadLink.download = fileName;

  // Добавление ссылки на страницу и эмуляция клика для скачивания файла
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  downloadLink.remove();

  currentModal.hide();
}
///////////////////////////////////////////////////////////////////////////
async function updateCy() {
  console.log('>>updateCy()...');

  res = await get_nodes();
  // console.log(res);
  let e_nodes = [];
  let status = false;
  for (const element of res) {    
    if (element.classes === 'station') {status = true} else {status = false}         
    let cyelement = {group: "nodes", data: element, classes: element.classes, locked: status, position: {"x": element.x, "y": element.y}};       
    e_nodes.push(cyelement);              
  }

  res  = await get_edges();
  // console.log(res);
  let e_edges = [];
  for (const element of res) {              
    let cyelement = {group: "edges", data: element, classes: element.classes};       
    e_edges.push(cyelement);              
  }

  let elements = e_nodes.concat(e_edges);
  
  return elements;
}
async function initCy() {
  console.log('>>initCy()...');
  
  elements = await updateCy();

  let cy = window.cy = cytoscape({
    container: document.getElementById('cy'),  
    layout: {
            name: 'preset',            
            //fit: true, // whether to fit to viewport             
            // padding: 5, // padding used on fit
            //  boundingBox: undefined,              
            // avoidOverlap: false, 
            //  avoidOverlapPadding: 10,
            // nodeOverlap: 0,
            // componentSpacing: 10,
            // refresh: 20
            // name: 'cola',
            // fit: false,
            // infinite: false,
            // avoidOverlap: true
            },            
    boxSelectionEnabled: true,
    style: defaultStylesheet,
    elements: elements,
    wheelSensitivity:    0.3,
    //motionBlur:          true,
    //selectionType:       'single',    
    //zoom: 0.1,
    //pan: { x: 0, y: 0 },    
    minZoom: 0.02,
    maxZoom: 5,
    //zoomingEnabled: true,
    //userZoomingEnabled: true,   
    pixelRatio: 'auto'  
  });
    
  // cy.panningEnabled( false );

  async function updateBind(f) {
    console.log('>>updateBind()...', f);
  
  }
  function bindRouters() {
    console.log('>>bindRouters()...');
   
    const node_classes = document.getElementById('Node_classes');
    const node_parent  = document.getElementById('node_parent');    
    const node_parentId = document.getElementById('node_parentId');  
    const node_name    = document.getElementById('node_name');
    const node_descr   = document.getElementById('node_descr');
    const edge_name    = document.getElementById('Edge_name');
    const edge_source  = document.getElementById('Edge_source');
    const edge_target  = document.getElementById('Edge_target');
    const edge_fiber   = document.getElementById('edge_fiber');
    const edge_length  = document.getElementById('edge_length');
    const edge_descr   = document.getElementById('edge_descr');
    const _status      = document.getElementById('status');
    const position     = document.getElementById('position');

    function clear_edge_info() {
      edge_classes.value = 'Select...';
      edge_source.value = ''; 
      edge_target.value = '';
      edge_descr.value  = '';
      edge_name.value   = '';
    }
    function clear_node_info() {
      node_classes.value = 'Select...';
      node_parent.value = ''; 
      node_name.value   = '';
      node_descr.value  = '';
    }    
    
    updateBind(0);

    let nodes = cy.nodes('node.station');
    nodes.children().style('display', 'none'); 

    let buttonsearch = document.getElementById("button-addon2");
    buttonsearch.addEventListener('click', search);
    function search() {
  
      let namesearch = document.getElementById("namesearch");
  
      console.log(namesearch.value);
  
      ele = cy.nodes('[name="'+namesearch.value+'"]');
  
      console.log(ele);
      if(ele.data("name") === namesearch.value){
        cy.zoom(1.5) 
        cy.center(ele)         
        ele.select();        
        namesearch.value ='';
        _status.value = '>> Узел найден '  + ele.data('name');
      }
    }

    // cy.on('tap dbltap cxttap drag pan zoom', function(e) {
      // if(e.target === cy){
      //  removeTippy();                             
      // }
    // });
   
    cy.on('tap dbltap', function(e) {
      console.log('>>tap dbltap...');
      // if(e.target === cy){    
      columnLeft = document.getElementById("column-left");
      let mod = columnLeft.getAttribute("mod");

      if (mod === 'true') { 
        // alert("Существует не сохраненный элемент!");
        // cy.autounselectify( true );
        // return;
      } else {
        clear_edge_info();
        clear_node_info();   
        _status.value = '';      
      }
    });

    cy.on('tap', 'node', function(e) {
      console.log('>>tap node...');

      let node = e.target;  
      
      columnLeft = document.getElementById("column-left");
      let mod = columnLeft.getAttribute("mod");
     
      if (mod === 'true') { 
        // alert("Существует не сохраненный элемент!");
        cy.autounselectify( true );
        return;
      } else {
        clear_edge_info();
        clear_node_info();   
        _status.value = '';            
     
        let parent   = node.parent().data("name");
        let parentId = node.parent().data("id");
        if (parent === undefined) {parent=''};
        if (parentId === undefined) {parentId=0};

        node_classes.value    = node.classes();
        node_parentId.value   = parentId;
        node_parent.value     = parent; 
        node_name.value       = node.data("name");
        node_descr.value      = node.data("descr");
        edge_source.value     = parent+'/'+node.data("name");

        let elem = cy.nodes(':selected');
        if (elem.length > 1) {  
          
          let name_source = elem[elem.length-1];        
          edge_source.value = name_source.data("name");
              
          let name_target = elem[0];
          edge_target.value = name_target.data("name");     
        }
        
        _status.value  = '>> Узел '  + node_name.value;
        position.value = 'x: '+ Math.round(node.position().x) + ' y:'  + Math.round(node.position().y);  
      }
    });

    cy.on('drag', 'node', function(e) {
      console.log('>>drag node...');                        
      
      let node = e.target;   
      
      setTimeout(function() {
        _status.value = '>> Узел ' + node.data("name") + ' перемещен';
        position.value = 'x: ' + Math.round(node.position().x) + ' y:' + Math.round(node.position().y);
      }, 200);  
    
    });
    
    cy.on('grab', 'node', function(e) {
      console.log('>>grab node...'); 

      let node = e.target;              
      node.scratch('previousPosition', JSON.parse(JSON.stringify(node.position())));                          
    
    });

    cy.on('dragfree', 'node', async function(e) {
      console.log('>>dragfree node...');   

      let node = await e.target;
           
      const padding = -2;
      res = checkIfOverlaps(node, padding);
      console.log('>>checkIfOverlaps:', res);  
      if (res) {          
        previousPosition = await node.scratch('previousPosition');               
        await node.position(previousPosition);
      } else {                         
        await node.scratch('previousPosition', await node.position());    
        res = await update_node(node);
        console.log(res); 
      }     
  
    });
    
    cy.on('tap', 'edge', async function(e){
      let edge = e.target;    
            
      columnLeft = document.getElementById("column-left");
      let mod = columnLeft.getAttribute("mod");

      if (mod === 'true') { 
        // alert("Существует не сохраненный элемент!");
        cy.autounselectify( true );
        return;
      } else {
        clear_edge_info();
        clear_node_info();   
        _status.value = '';          

        edge_classes.value = edge.classes();
        edge_source.value = edge.source().parent().data("name")+'/'+edge.source().data("name");      
        edge_target.value = edge.target().parent().data("name")+'/'+edge.target().data("name");
        edge_fiber.value  = edge.data("fiber");  
        edge_length.value = edge.data("length");  
        edge_descr.value  = edge.data("descr");   
        edge_name.value   = edge.data("name");             
        
        _status.value      = '>> Edge ' + edge_source.value + '-' + edge_target.value;
      }
    });

    cy.on('tap', 'edge.line', async function(e){
      let edge = e.target;    

      clear_node_info();
      clear_edge_info();
            
      edge_classes.value = "Выбор...";
      edge_source.value = edge.source().data("name");      
      edge_target.value = edge.target().data("name");
      edge_descr.value  = edge.data("name");
      edge_length.value = edge.data("length");
      
      _status.value = '>> ' + edge.data("name") + ', ' + edge.source().data("name") + ' - ' + edge.target().data("name");

    });

    cy.on('cxttap', 'edge', async function(e){
      let edge = await e.target;    

    });

    cy.on('dbltap', 'node.node', async function(e){
      let node = await e.target;
     
      await updateBind(1);    

      let portModal = document.getElementById("portModal");      
      let options =  { focus: true }

      let portId   = document.getElementById("input-port-edit-id");  
      let portKod  = document.getElementById("input-port-edit-kod");  
      let portName = document.getElementById("input-port-edit-name");  
      let parentId = document.getElementById("input-port-edit-parentId");        
      let portIp   = document.getElementById("input-port-edit-ip");  
      let portTx   = document.getElementById("input-port-tx");
      let portRx   = document.getElementById("input-port-rx");
      let portTxT  = document.getElementById("input-port-txtext");
      let portRxT  = document.getElementById("input-port-rxtext");
      let portLink = document.getElementById("input-port-edit-link");
      let portStatus = document.getElementById("input-port-edit-status");
      let portDescr  = document.getElementById("input-port-edit-descr");
      let portSwbPort = document.getElementById("input-port-edit-swbport");

      res = await postOnServer({'id':node.data("id")}, '/getnode');
    
      portId.value      = res.id;
      portKod.value     = res.kod;
      portName.value    = res.name;
      parentId.value    = node.parent().data("id");
      portIp.value      = res.ip;
      portTx.checked    = res.tx;
      portRx.checked    = res.rx;
      portTxT.value     = res.txText;
      portRxT.value     = res.rxText;
      portLink.value    = res.link;
      portStatus.value  = res.status;
      portDescr.value   = res.descr;
      portSwbPort.value = res.swbport;

      await node.data('kod', res.kod);
      await node.data('name', res.name);
      await node.data('kod', res.kod);
      await node.data('ip', res.ip);
      await node.data('tx', res.tx);
      await node.data('rx', res.rx);
      await node.data('txText', res.txText);
      await node.data('rxText', res.rxText);
      await node.data('link', res.link);
      await node.data('status', res.status);
      await node.data('descr', res.descr);
      await node.data('swbport', res.swbport);

      const myModal = new bootstrap.Modal(portModal, options);
      myModal.show();                               

      _status.value = '>> Узел '  + node.data("name");

    });

    cy.on('dbltap', 'edge.submagistral',async function(e){
      let edge = e.target;    
      
      let fibersModal = document.getElementById("fibersModal");      
      let options =  {
        focus: true
      };

      let sourceId = edge.source().data("id");
      let targetId = edge.target().data("id");

      fibersModal.setAttribute("source-id", sourceId);
      fibersModal.setAttribute("target-id", targetId);
      fibersModal.setAttribute("source-name", edge.source().data("name"));
      fibersModal.setAttribute("target-name", edge.target().data("name"));

      const myModal = new bootstrap.Modal(fibersModal, options);
      myModal.show();
      
      await show_modal_fibers_table(sourceId, targetId);         

      _status.value      = '>> ' + edge_source.value + '-' + edge_target.value;

    });

    cy.on('dbltap', 'edge.line', async function(e){
      let edge = await e.target;

      clear_node_info();
      clear_edge_info();
            
      edge_classes.value = "Выбор...";
      edge_source.value = edge.source().data("name");      
      edge_target.value = edge.target().data("name");
      edge_descr.value  = edge.data("name");
      edge_length.value = edge.data("length");
                                   
      let sNode = edge.source();      
      let tNode = edge.target();   

      if (sNode.locked()){                
        sNode.unlock();                        
      } else {                
        sNode.lock();                                
      } 

      for(let ele of sNode.children()) {        
        if (ele.visible()) {                     
          ele.style('display', 'none');               
        } else if (ele.hidden()) {          
          ele.style('display', 'element');                
        }
      }  

      if (tNode.locked()){                
        tNode.unlock();                        
      } else {                
        tNode.lock();                                
      } 

      for(let ele of tNode.children()) {        
        if (ele.visible()) {                     
          ele.style('display', 'none');               
        } else if (ele.hidden()) {          
          ele.style('display', 'element');                
        }
      }  
      
      _status.value = '>> ' + edge.data("name") + ', ' + edge.source().data("name") + ' - ' + edge.target().data("name");

    });

  
    cy.on('cxttap', 'node.node', function(e) {
      let node = e.target;            

      // removeTippy();                      
 
      const start = document.createElement('button');
      start.classList.add("btn", "btn-secondary");
      start.setAttribute("id", "start");
      start.innerText = 'Start';   

      const end = document.createElement('button');
      end.classList.add("btn", "btn-secondary");
      end.setAttribute("id", "end");
      end.innerText = 'End';              

      if (s === 0 && ms === 0) {  
        makeTippy(node, start);   
        ms = 1;
        start.addEventListener('click', function() {                      
          selectStart(node);                    
          start.remove();
          removeTippy();  
          s = 1;
        });                          
      } else if (s === 1 && f === 0 && mf === 0) {         
        makeTippy(node, end);  
        mf = 1;
        end.addEventListener('click', function() {               
          selectEnd(node); 
          end.remove();   
          removeTippy();        
          f = 1;
        });            
      } else {                                
        start.remove();
        end.remove();        
        removeTippy();             
        clear();    
        if (f === 1) {s = 0 ; f = 0; ms = 0; mf = 0}
      } 
       
    });

    cy.on('grab', 'node', function (event) {
      if (tooltipOpen) {
        event.target.ungrabify();
      }
    });

    cy.on('free', 'node', function (event) {
      if (!tooltipOpen) {
        event.target.grabify();
      }
    });
  }

  $clear.addEventListener('click', clear);

  document.onkeydown = function(e) {
    // console.log(e.key);
    if (e.key === "Escape") { 
      console.log('shownTippy:', shownTippy);           
      // clear(); 
      backClear();
    }
  }

  bindRouters();
  
  // setInterval(await updateBind(1), 60000);
}

document.addEventListener('DOMContentLoaded', initCy());