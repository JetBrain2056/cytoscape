let selectRows = [];
let currentModal;
let tblModal;
let n = 0;
let tbl = [];
const content = document.querySelector('.content');
const forms   = document.getElementsByClassName('eva-form');
for (const div of forms) {                                          
  div.setAttribute("style", "height: calc(100vh - 171px); overflow-y: scroll;");               
  tbl[n] = document.createElement('table');
  tbl[n].setAttribute("class", "table table-striped table-hover table-sm table-responsive");              
  div.appendChild(tbl[n]); 
  n = n + 1;
}
function rowSelect(e) {
  console.log('>>rowSelect...');

  const path = e.path || (e.composedPath && e.composedPath());
  const row  = path[1];

  if (row.cells[0].nodeName  === 'TH') {
      
      const tBody = e.currentTarget.tBodies[0];
      const rows = Array.from(tBody.rows);
      
      let reverse = 1;
      
      const cellIndex = e.target.cellIndex;                
                  
      if (e.target.getAttribute("sort-attr") === "desc" ) {
        reverse = -1;
        e.target.setAttribute("sort-attr", "asc");
      } else {
        reverse = 1;
        e.target.setAttribute("sort-attr", "desc");        
      }
      
      rows.sort((tr1, tr2) => {    
        const tr1Text = tr1.cells[cellIndex].textContent;
        const tr2Text = tr2.cells[cellIndex].textContent;       
        return reverse * (tr1Text.localeCompare(tr2Text));
      });
  
      tBody.append(...rows);

      for (cell of row.cells) {
          cell.style.color = 'black';
      }
      e.target.style.color = 'aquamarine';

  } else {
      let text;
      if (e.ctrlKey) {
          text = 'The CTRL key was pressed!';
          selectRows.push(row);
          row.style.background = 'aquamarine';
          console.log('select rows count: ', selectRows.length);
      } else {
          text = 'The CTRL key was NOT pressed!';
          for (const rows of selectRows) {
              rows.style.background = '';
          }
          selectRows.splice(0, selectRows.length);
          row.style.background = 'aquamarine';
          selectRows.push(row);
      }
      console.log(text);
  }
}
async function showTable(showTbl, hide, col, data) {
  console.log('>>showTable()...'); 

  clear();

  showTbl.innerHTML='';
 
  if (showTbl) {
      showTbl.addEventListener('click', rowSelect);

      showTbl.addEventListener('dblclick',  (e) => {
        
        if (e.target.nodeName  === 'TH') {
          return;
        } else {
          const currentForm = e.currentTarget.parentNode.parentNode;
            
          const modalTrigger = currentForm.getElementsByClassName('eva-edit');
          if (modalTrigger[0]) {
            modalTrigger[0].click();
          }
        }
      });
  }

  const thead = document.createElement('thead');
  thead.style.position = 'sticky';  
  thead.style.top      = '0px';
  thead.style.border   = '#00ff92';
  thead.style.background = 'White';  
  showTbl.appendChild(thead);

  const tbody = document.createElement('tbody');
  showTbl.appendChild(tbody);

  const tr = document.createElement('tr'); 
  thead.appendChild(tr);
  
  for (const e of Object.keys(col)) {             
    const th = document.createElement('th');    
    th.setAttribute("sort-attr", "");                        
    for (const h of hide) {   
      if (e===h)     
      th.style.display = "none";        
    }
    tr.appendChild(th);        
    th.textContent = col[e];      
  }       

  if (data) {
      for (const rows of data) {                  
          const tr = document.createElement('tr');
          tbody.appendChild(tr);             
          for (let p of Object.keys(col)) {            
              const td = document.createElement('td');    
              tr.appendChild(td);              
              td.textContent = rows[p];    
              for (const h of hide) {   
                  if (p===h)     
                  td.style.display = "none";        
              }
          }
      } 
  } else {
      console.log('data: '+data)
      return;   
  }
}
function getModal(modalForm) {
  let options =  { focus: true };
  currentModal = new bootstrap.Modal(modalForm, options);  
  
  return currentModal.show();   
}
function logout() {
  console.log('>>Logout()...');
  let mode = content.getAttribute('data-mode');
  console.log(mode);   
}
async function listUsers() {
  console.log('>>listUsers()...');           

  data = await getOnServer('/getusers');

  const inputUserName = document.getElementById('input-username');

  for (let rows of data) {      
      if (rows['Show']) {
          let option = document.createElement('option');
          option.value = rows['Name'];
          option.text  = rows['Name'];

          inputUserName.appendChild(option);
      }        
  }    
}
//Get/post on Server//////////////////////////////////////////////////////////
async function postOnServer(data, link) {
  console.log('>>postOnServer()...');  
  try {
      let response = await fetch(link, {
          method  : 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      });
      res = await response.json();
  } catch (err) {
      console.log(err);
  }
  return res;
}
async function getOnServer(link) {
  console.log('>>getOnServer()...');  
  try{
      let response = await fetch(link);
      res = await response.json();
  } catch (err) {
      console.log(err)
  }
  return res;
}
//////////////////////////////////////////////////////////////////////////////
async function showUserTable() {
  console.log('>>showUserTable()...');
    
  let data = await getOnServer('/getusers');   

  const col  = { 'id':'Ид', 'Name':'Наименование', 'Descr':'Описание', 'Role':'Роль', 'email':'E-mail', 'Show':'Отображать при входе'};  
  const hide = ['id'];  

  await showTable(tbl[5], hide, col, data);

}
async function userCreate() {
  console.log('>>userCreate()...');
  
  const input_form        = document.getElementById('create-user-form');  
  const createMode = input_form.getAttribute("create-mode");  
  const input_username    = document.getElementById('input-user-name');
  const input_password    = document.getElementById('input-password');
  const input_confirmpass = document.getElementById('input-confirmpass');
  const input_descr       = document.getElementById('input-descr');
  const input_eauth       = document.getElementById('input-eauth');
  const input_show        = document.getElementById('input-show');
  const input_role        = document.getElementById('input-role');

  if (input_password.value !== input_confirmpass.value) alert('Incorrect password confirmation!');
  if (!input_username.value) alert('User name is not filled in!');

  const data =  {
      'id'      : input_form.getAttribute("eva-id"),
      'Name'    : input_username.value,
      'Descr'   : input_descr.value,
      'Password': input_password.value,
      'RoleId'  : input_role.getAttribute("eva-id"),
      'EAuth'   : input_eauth.checked,
      'Show'    : input_show.checked
  }
   
  //console.log('createMode: '+createMode);
  if (createMode==='true') {
      try {
        result = await postOnServer(data, '/createuser')
        console.log('create: '+result);        
      } catch (e) {
        console.log(e);
      }
  } else {
      try {
        result = await postOnServer(data, '/updateuser');
        console.log('create: '+result);          
      } catch (e) {
        console.log(e);
      }
  }
  if (result) await showUserTable();

}
async function userCreateModal() {
  console.log('>>userCreateModal()...');     

  const inputLabel        = document.getElementById("userModalLabel");
  inputLabel.innerText = 'Добавить пользователя:';      
  const input_form        = document.getElementById('create-user-form');  
  input_form.reset(); 
  input_form.setAttribute("create-mode",true);            
}
async function userEditModal() {
  console.log('>>userEditModal()...'); 

  if (selectRows.length === 0) { return };

  const row = selectRows[0];      
  
  const inputLabel        = document.getElementById("userModalLabel");
  const input_form        = document.getElementById('create-user-form');  
  const input_name        = document.getElementById('input-user-name');  
  const input_descr       = document.getElementById('input-descr');    
  const input_email       = document.getElementById('input-email');    
  const input_role        = document.getElementById('input-role');           
  const input_password    = document.getElementById('input-password');    
  const input_confirmpass = document.getElementById('input-confirmpass'); 
  const input_show        = document.getElementById('input-show');
  //const input_eauth       = document.getElementById('input-eauth');

  input_form.setAttribute("create-mode",false);    
  inputLabel.innerText = 'Редактировать пользователя:';

  let data = { 'id': row.cells[0].innerText};

  let res = await postOnServer(data,'/getuser');

  if (res) {     
      input_form.setAttribute("eva-id", res[0].id);
      input_name.value        = res[0].Name;
      input_descr.value       = res[0].Descr;   
      input_email.value       = res[0].email;   
      input_role.value        = res[0].Role;           
      input_role.setAttribute("eva-id", res[0].RoleId);
      input_password.value    = '';   
      input_confirmpass.value = '';               
      if (res[0].Show === true) {
        input_show.checked = true;
      } else {  
        input_show.checked = false;
      }      
  }         
}
async function userDelete() {
  console.log('>>userDelete()...');
  
  for (const row of selectRows){

      let data = {'id': row.cells[0].innerText};

      result = await postOnServer(data,'/deluser');        
  }

  if (result) await showUserTable();
}
/////////////////////////////////////////////////////////////////////////////
async function showRoleTable() {
  console.log('>>showRoleTable()...');
  
  let data = await getOnServer('/getroles');   

  console.log(data);

  const col  = { 'id':'Ид', 'Name':'Наименование' };  
  const hide = ['id'];  

  await showTable(tbl[6], hide, col, data);
}
async function roleCreate() {
  console.log('>>roleCreate()...');

  const input_rolename    = document.getElementById('input-rolename')

  if (!input_rolename.value) alert('The name is not filled in!');

  const data =  {
    'Name'    : input_rolename.value,
  }

  result = await postOnServer(data,'/createrole');

  if (result) await showRoleTable();
}
async function userEditRole() {
  console.log('>>userEditRole()...'); 

  let modalForm = document.getElementById("editUserRoleModal");

  currentModal = getModal(modalForm);

  let data = await getOnServer('/getroles');  

  const col = {'id':'Ид', 'Name':'Наименование'};  
  const hide = ['id'];

  await showTable(tbl[6], hide, col, data);

}
async function roleSelect() {
  console.log('>>roleSelect()...'); 

  if (selectRows.length === 0) return;

  const row = selectRows[0];  

  const input_role        = document.getElementById('input-role');   
  const input_edit_role   = document.getElementById('input-edit-role');   

  input_role.value        = row.cells[1].innerText;
  input_role.setAttribute("eva-id", row.cells[0].innerText);
  input_edit_role.value   = row.cells[1].innerText;
  input_edit_role.setAttribute("eva-id", row.cells[0].innerText);

  await currentModal.hide();
         
}
async function roleDelete() {
  console.log('>>roleDelete()...');
  
  for (const row of selectRows){

      let data = {'id': row.cells[0].innerText};

      result = await postOnServer(data,'/delrole');        
  }

  if (result) await showRoleTable();
}
/////////////////////////////////////////////////////////////////////////////
async function show_line_table() {
  console.log('>>show_line_table()...'); 

  data = await getOnServer('/getlines');

  const col = {'id':'Ид', 'source':'Источник', 'target':'Цель', 'name':'Линия метро', 'length':'Длина, м.', 'descr':'Описание'};  
  const hide = ['id'];
  
  await showTable(tbl[1], hide, col, data);    
}   
async function line_delete() {
  console.log('>>line_delete()...');

  let id, data, ele;
  for (const row of selectRows){

    id     = row.cells[0].innerText;    
    data   = {'id': id};
    result = await postOnServer(data,'/deledge');     

    ele = cy.getElementById(id);

    _status.value = '>> Линия ' + ele.data("name") +' удалена';

    await ele.remove();        
  }

  await async_clear_node_info();  
  await async_clear_edge_info();  

  if(result){    
    await show_line_table();    
  }
}
async function edit_line(obj) {
  console.log('>>edit_line()...'); 

  let data =  {   
      'id'      : obj.id,      
      'descr'   : obj.descr,
      'length'  : obj.length
    }
   
  res = await postOnServer(data,'/editedge')

  return res;
}
async function line_modal() {
  console.log('>>line_modal()...'); 

  const row = selectRows[0];  

  // const input_name        = document.getElementById('input-line-edit-name');  
  const input_descr       = document.getElementById('input-line-edit-descr');
  const input_length      = document.getElementById('input-line-edit-length'); 

  // input_name.value   = row.cells[1].innerText;
  input_descr.value  = row.cells[5].innerText;    
  input_length.value = row.cells[4].innerText;   
  
}
async function line_edit() {
  console.log('>>line_edit()...'); 

  const input_descr       = document.getElementById('input-line-edit-descr');
  const input_length      = document.getElementById('input-line-edit-length'); 

  const row  = selectRows[0];  
  let id     = row.cells[0].innerText;
  let descr  = input_descr.value;
  let length = input_length.value;

  const data =  {
      'id'      : id,      
      'descr'   : descr,            
      'length'  : length
  };

  let result;
  try {
    result = await edit_line(data)     
  } catch (e) {
    console.log(e);
  }
  //if (result) {      
    await show_line_table();     
  //}

  let ele = cy.getElementById(id);
  await ele.data('descr', descr);
  await ele.data('length', length);
}
/////////////////////////////////////////////////////////////////////////////
async function show_object_table() {
  console.log('>>show_object_table()...'); 

  data = await getOnServer('/getobjects');

  const col  = {'id':'Ид', 'parent':'Родитель', 'name':'Наименование', 'classes':'Тип' , 'descr':'Описание'};  
  const hide = ['id','parent'];
  
  await showTable(tbl[2], hide, col, data);
    
}   
/////////////////////////////////////////////////////////////////////////////
async function show_unit_table() {
  console.log('>>show_unit_table()...'); 

  data = await getOnServer('/getunits');  

  const col = {'id':'Ид', 'kod':'Код', 'parentid':'Ид родителя', 'name':'Наименование', 'parent':'Родитель', 'classes':'Тип' , 'descr':'Описание'};  
  const hide = ['id','parentid'];
  
  await showTable(tbl[3], hide, col, data);    
}   
async function unit_modal() {
  console.log('>>unit_modal()...'); 

  const row = selectRows[0];  

  const input_id          = document.getElementById('input-unit-edit-id'); 
  const input_kod         = document.getElementById('input-unit-edit-kod'); 
  const input_parentId    = document.getElementById('input-unit-edit-parentId'); 
  const input_parent      = document.getElementById('input-unit-edit-parent'); 
  const input_name        = document.getElementById('input-unit-edit-name');  
  const input_descr       = document.getElementById('input-unit-edit-descr');

  input_id.value       = row.cells[0].innerText;
  input_kod.value      = row.cells[1].innerText;
  input_parentId.value = row.cells[2].innerText;  
  input_name.value     = row.cells[3].innerText;
  input_parent.value   = row.cells[4].innerText;
  input_descr.value    = row.cells[6].innerText;            
}
async function unit_edit() {
  console.log('>>unit_edit()...'); 

  const id         = document.getElementById('input-unit-edit-id');          
  const node_name  = document.getElementById('input-unit-edit-name');  
  const node_descr = document.getElementById('input-unit-edit-descr');
  const node_kod   = document.getElementById('input-unit-edit-kod');
 
  let elem = await cy.getElementById(id.value);

  const classes = elem.classes();
  let elemParentId = 0;
  if (elem.parent().data("id")===undefined) {
    elemParentId = 0;
  } else {
    elemParentId = elem.parent().data("id");
  }
  
  if (node_parentId.value==elemParentId) {
    console.log('>>Обновление устройства...');
    const data =  {            
      'id'        : elem.data("id"),    
      'parent'    : elemParentId,
      'name'      : node_name.value,       
      'descr'     : node_descr.value,
      'kod'       : node_kod.value
    }
  
    res = await postOnServer(data,'/modnode');    

    elem.data("name",node_name.value);
    elem.data("descr",node_descr.value); 
  } else {  
    console.log('>>Перемещение устройства...');    
    if (classes[0] === 'unit') {     
      await moveNode(elem);
    } else {
      alert('Перемещение данного типа невозможно!');
      return;
    }
  }

  await show_unit_table();   

}
async function unit_delete() {
  console.log('>>unit_delete()...');

  let result, id, data, ele, name;
  for (const row of selectRows){

    id     = row.cells[0].innerText;    

    data   = {'id': id};
    result = await postOnServer(data,'/delnode');   

    ele = cy.getElementById(id);    
    name = ele.data("name");

    await ele.remove();

    _status.value = '>> Узел ' + name +' удален';
        
  }

  await async_clear_node_info();  
  await async_clear_edge_info();  

  if(result){    
    await show_unit_table();    
  }
}
async function unit_edit_parent() {
  console.log('>>unit_edit_parent()...'); 

  let editUnitParentModal = document.getElementById("editUnitParentModal");
  let options =  {
    focus: true
  };

  currentModal = new bootstrap.Modal(editUnitParentModal, options);
  currentModal.show();

  data = await getOnServer('/getunitparents');  

  const col = {'id':'id', 'kod':'Код',  'parent':'Родитель', 'name':'Наименование','classes':'Тип' , 'descr':'Описание'};  
  const hide = ['id', 'parent'];
  
  await showTable(tbl[8], hide, col, data);
 
}
async function unit_select() {
  console.log('>>unit_select()...'); 

  const row = selectRows[0];  

  const input_parentId    = document.getElementById('input-unit-edit-parentId'); 
  const input_parentKod   = document.getElementById('input-unit-edit-parentKod');
  const input_parent      = document.getElementById('input-unit-edit-parent');   
  const node_parent       = document.getElementById('node_parent');   
  const node_parentId     = document.getElementById('node_parentId');   

  input_parentId.value  = row.cells[0].innerText;
  node_parentId.value   = row.cells[0].innerText;
  input_parentKod.value = row.cells[1].innerText;;
  input_parent.value    = row.cells[3].innerText;
  node_parent.value     = row.cells[3].innerText;

  currentModal.hide();
           
}
/////////////////////////////////////////////////////////////////////////////
async function show_cable_table() {
  console.log('>>show_cable_table()...'); 

  data = await getOnServer('/getcables');  

  const col = {'id':'Ид', 'name':'Код', 'source':'Источник', 'target':'Цель', 'classes':'Тип', 'fiber':'Волокно, шт.', 'length':'Длина, м.', 'descr':'Описание'};  
  const hide = ['id'];
  
  await showTable(tbl[4], hide, col, data);
    
}   
async function cable_delete() {
  console.log('>>cable_delete()...');

  let id, data, ele;
  for (const row of selectRows){

    id     = row.cells[0].innerText;  

    data   = {'id': id};
    result = await postOnServer(data,'/deledge');        

    ele = cy.getElementById(id);
    console.log(ele);
    await ele.remove();

    _status.value = '>> Связь ' + id +' удалена';    
        
  }

  await async_clear_node_info();  
  await async_clear_edge_info();  

  // if(result){    
    await show_cable_table();    
  // }
}
async function cable_modal() {
  console.log('>>cabel_modal()...'); 

  const row = selectRows[0];  
    
  const cableEditModal    = document.getElementById('cableEditModal');
  const input_name        = document.getElementById('input-cable-edit-name');
  const input_descr       = document.getElementById('input-cable-edit-descr');
  const input_length      = document.getElementById('input-cable-edit-length'); 
  const input_fiber       = document.getElementById('input-cable-edit-fiber'); 
  const input_source      = document.getElementById('input-cable-edit-source'); 
  const input_target      = document.getElementById('input-cable-edit-target'); 
  
  input_name.value   = row.cells[1].innerText;  
  input_fiber.value  = row.cells[5].innerText;   
  input_length.value = row.cells[6].innerText;   
  input_source.value = row.cells[2].innerText;      
  input_target.value = row.cells[3].innerText;    
  input_descr.value  = row.cells[7].innerText;   

  let elem = cy.getElementById(row.cells[0].innerText);

  // console.log(elem.data("source"));

  cableEditModal.setAttribute("source-id", elem.data("source"));
  cableEditModal.setAttribute("target-id", elem.data("target"));

  
}
async function cable_edit() {
  console.log('>>cabel_edit()...'); 

  const input_descr       = document.getElementById('input-cable-edit-descr');
  const input_length      = document.getElementById('input-cable-edit-length'); 
  const input_fiber       = document.getElementById('input-cable-edit-fiber'); 
  const input_name        = document.getElementById('input-cable-edit-name'); 

  const row  = selectRows[0];  
  let id     = row.cells[0].innerText;
  let descr  = input_descr.value;
  let length = input_length.value;
  let fiber  = input_fiber.value;
  let name   = input_name.value;

  const data =  {
      'id'      : id,      
      'descr'   : descr,            
      'length'  : length,
      'fiber'   : fiber,
      'name'    : name
  }

  
  let res = await postOnServer(data,'/editedge');     
  //if (result) {      
    await show_cable_table();     
  //}

  let cyelement = {
    group: 'edges',
    data: { id: res.id, source: res.source, target: res.target, name: res.name, fiber:res.fiber, length:res.length, descr: res.descr, status: res.status },
    classes: res.classes,    
  }
  
  await cy.add(cyelement);

}
/////////////////////////////////////////////////////////////////////////////
async function port_edit() {
  console.log('>>port_edit()...'); 

  const input_id          = document.getElementById('input-port-edit-id');
  const input_kod         = document.getElementById('input-port-edit-kod');  
  const input_name        = document.getElementById('input-port-edit-name');       
  const input_ip          = document.getElementById("input-port-edit-ip");  
  const input_tx          = document.getElementById("input-port-tx");
  const input_rx          = document.getElementById("input-port-rx");
  const input_descr       = document.getElementById('input-port-edit-descr');
  const input_swbport     = document.getElementById('input-port-edit-swbport');
  
  let id       = input_id.value;
  let kod      = input_kod.value;
  let name     = input_name.value;
  let descr    = input_descr.value;   
  let ip       = input_ip.value;
  let tx       = input_tx.checked;
  let rx       = input_rx.checked;
  let swbport  = input_swbport.value;  
  
  const data =  {
      'id'      : id,
      'kod'     : kod,      
      'name'    : name,
      'descr'   : descr, 
      'ip'      : ip,
      'tx'      : tx,
      'rx'      : rx,
      'swbport' : swbport
  }
  
  try {
    result = await postOnServer(data, '/editport')     
  } catch (e) {
    console.log(e);
  }

  let ele = cy.getElementById(id);
  await ele.data("kod", kod);
  await ele.data("name", name);
  await ele.data("descr", descr);  
  await ele.data("ip", ip);  
  await ele.data("tx", tx);  
  await ele.data("rx", rx);  
  await ele.data("swbport", swbport);  

  // await updateBind(0);
  node = ele;
  let link = node.data("link");    
  let status = node.data("status");      
  if (link==='Up'&&status==='OK') {
    nodeColor = 'Green';
  } else if (link==='Up'&&status==='Warning') {
    nodeColor = 'Orange';  
  } else if (link==='Up'&&status==='Unknown') {
    nodeColor = 'Orange';
  } else if (link==='Up'&&status==='Alarm') {
    nodeColor = 'Red';
  } else if (link==='Down') {
    nodeColor = 'Red';
  } else if (link==='Unknown') {
    nodeColor = 'Violet';
  } else if (link==='AdmDown') {
    nodeColor = 'Grey';
  } else { 
    if (node.targets().length>0&&node.source().length>0) {
      nodeColor = 'DodgerBlue';
    } else{
      nodeColor = '#bdd3d4';
    }
  }
  if (nodeColor!='') node.style('border-color', nodeColor); 

}
async function fiber_edit_target_port() {
  const editFiberModal = document.getElementById("editFiberModal");
  let fiber_id = editFiberModal.getAttribute("eva-id");
  //console.log(fiber_id);
  let elem = await cy.getElementById(fiber_id);
  let nodeId = await elem.data("target");
  let node   = await cy.getElementById(nodeId);
  await fiber_edit_port(node);
}
async function fiber_edit_source_port() {
  const editFiberModal = document.getElementById("editFiberModal");
  let fiber_id = editFiberModal.getAttribute("eva-id");
  //console.log(fiber_id);
  let elem = await cy.getElementById(fiber_id);
  let nodeId = await elem.data("source");
  let node   = await cy.getElementById(nodeId);
  await fiber_edit_port(node);
}
async function fiber_edit_port(node) {
  console.log('>>fiber_edit_port()...', node);   

  let portModal = document.getElementById("portModal");
  let options =  { focus: true }

  let portId   = document.getElementById("input-port-edit-id");  
  let portKod  = document.getElementById("input-port-edit-kod");  
  let portName = document.getElementById("input-port-edit-name");  
  let parentId = document.getElementById("input-port-edit-parentId");        
  let portIp   = document.getElementById("input-port-edit-ip");  
  let portTx   = document.getElementById("input-port-tx");
  let portRx   = document.getElementById("input-port-rx");
  let portTxT     = document.getElementById("input-port-txtext");
  let portRxT     = document.getElementById("input-port-rxtext");
  let portLink    = document.getElementById("input-port-edit-link");
  let portStatus  = document.getElementById("input-port-edit-status");
  let portDescr   = document.getElementById("input-port-edit-descr");
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

  currentModal = new bootstrap.Modal(portModal, options);
  currentModal.show();

  _status.value = '>> Узел '  + node.data("name");
}
/////////////////////////////////////////////////////////////////////////////
function show_modal_import() {
  console.log('>>show_modal_import()...'); 

  let importModal = document.getElementById("importModal");
  let options =  {
    focus: true
  };

  currentModal = new bootstrap.Modal(importModal, options);
  currentModal.show();

}
function handleFile() {
  console.log('>>handleFile()...');

  const fileInput    = document.getElementById("excelFile");
  const importStatus = document.getElementById("importStatus");
  const file         = fileInput.files[0];
  const reader       = new FileReader();

  reader.onload = async function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Парсинг содержимого файла и отправка на сервер
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    // console.log('jsonData: ', jsonData)
    let res = await sendToServer({data:jsonData});    
    // console.log(res);
    importStatus.value = res;
  }; 

  reader.readAsArrayBuffer(file);
}
async function sendToServer(data) {
  let res;
  try {   
    let response = await fetch('/import', { 
      method  : 'post',    
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)            
    });
      res = await response.json();
      console.log(res);
      return res;
  } catch (e) {
    console.log(e);
  }  
}
function show_modal_export() {
  console.log('>>show_modal_export()...'); 

  let exportModal = document.getElementById("exportModal");
  let options =  {
    focus: true
  }

  currentModal = new bootstrap.Modal(exportModal, options);
  currentModal.show();
}
function exportExcel() {
  console.log('>>exportExcel()...'); 

  const savedPath = JSON.parse(localStorage.getItem('savedPath'));
  if(!savedPath) return alert('Нет маршрута для выгрузки...');

  // Создание массива данных для экспорта в формате Excel
  const data = [];
  data.push(['ID', 'Value']); // Заголовки столбцов

  for (let i = 0; i < savedPath.length; i++) {
    data.push([i + 1, savedPath[i]]); // Добавление данных из localStorage
  }

  // Создание рабочей книги
  const workbook  = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Добавление рабочего листа к рабочей книге
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Преобразование книги в бинарный формат
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Создание Blob из бинарных данных Excel
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  let filename = 'export.xlsx';
  // if (window.navigator.msSaveOrOpenBlob) {
  //  window.navigator.msSaveBlob(blob, filename);    
  // } else {
    // Создание ссылки для скачивания файла
    const downloadLink = document.createElement('a');
    let url = window.URL || window.webkitURL;
    downloadLink.href  = url.createObjectURL(blob);
    downloadLink.download = filename; // Имя файла для скачивания
  
    // Добавление ссылки на страницу и эмуляция клика для скачивания файла
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  // }
  currentModal.hide();
}
async function mview_import_onserver() {
  console.log('>>mview_import_onserver()...'); 

  try {
    response = await getOnServer('/mimport');    
    console.log(response);                     
  } catch (e) {
    console.log(e);
  }
}
function mview_import() {
  console.log('>>mview_import()...'); 

  mview_import_onserver()
}

/////////////////////////////////////////////////////////////////////////////////
const fileInput = document.querySelector('input[type="file"]');

const btnLoad = document.querySelector('[data-bs-target="modalRfmLoad"]');
btnLoad?.addEventListener('click', uploadFile);

const btnLoadEdit = document.querySelector('[data-bs-target="modalRfmLoadEdit"]');
btnLoadEdit?.addEventListener('click', uploadFile);

const btnView = document.querySelector('[data-bs-target="modalRfmVeiw"]');
btnView?.addEventListener('click', showImage);
const btnViewEdit = document.querySelector('[data-bs-target="modalRfmVeiwEdit"]');
btnViewEdit?.addEventListener('click', showImage);

async function sendToServerFile(file, id) {
  console.log(">>sendToServerFile...");
  console.log(file, file.name)

  const formData = new FormData();
  formData.append('file', file);
  formData.append('id', id);   
  
  let res;  
  
  try {   
    let response = await fetch('/upload/image', {
      method: 'POST',
      body : formData             
    });
    res = await response.json();

    if (!response.ok) {
      throw new Error('Ошибка загрузки файла');
    }

    console.log(res);
    // return res;
  } catch (e) {
    console.log(e);    
  }    

  if (res === 'Success!') {
    const inputFiberReflect     = document.getElementById("input-fiber-reflect");
    const inputEditFiberReflect = document.getElementById("input-edit-fiber-reflect");  

    inputFiberReflect.checked     = true;
    inputEditFiberReflect.checked = true;  

    let elem = await cy.getElementById(id);  

    let sourceId   = elem.data("sourceParent");
    let targetId   = elem.data("targetParent");
    
    await show_modal_fibers_table(sourceId, targetId);  
  }
}
function uploadFile() {
  console.log(">>uploadFile...");

  fileInput.addEventListener('change', () => {
    console.log('file:', fileInput.files[0]);

    let id = document.getElementById("editFiberModal").getAttribute("eva-id");

    sendToServerFile(fileInput.files[0], id); 

  });

  fileInput.click();

}
function showImage() {
  console.log('>>showImage...'); 

  let showImage = document.getElementById("showImage");
  let options =  {
    focus: true
  };

  currentModal = new bootstrap.Modal(showImage, options);
  // currentModal.show();

  showFile();
}
async function getImgName(id) {
  console.log('>>getImg...'); 
  
  const data = {'id': id};
  // console.log(data);

  let res;
  try {    
      let response = await fetch('/upload/getImage', {
          method  : 'post',    
          headers : {'Content-Type': 'application/json'},
          body    : JSON.stringify(data)            
      });  
      res = await response.json();     
      console.log(res);
  } catch (err) {
    console.log(err);
  }
  return res;

}
async function showFile() {
  console.log(">>showFile()...");

  const row  = selectRows[0];  
  
  let id = row.cells[0].innerText;  

  let edge = await getImgName(id);
  let fileName = edge[0].rfmName;

  let res = await fetch('/image/'+fileName);
  let file = await res.blob();

  console.log(file);

  if (!file||fileName==='') {
    alert('Файл отсуствует!');
    return;
  }

  if (file.type.startsWith('image/')) {
    console.log('image');
    // Если тип файла является изображением, показываем его    
    const imageElement = document.getElementById('imgRfm');       
    imageElement.src = "./image/"+fileName; 
    imageElement.width = 760;

    currentModal.show();
    
  } else {
    // Если тип файла не является изображением, скачиваем его
    const downloadLink = document.createElement('a');
    downloadLink.href = res.url;
    downloadLink.download = fileName;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

}
async function delFile() {
  console.log(">>delFile...");

  const row  = selectRows[0];  
  
  let id = row.cells[0].innerText;  

  const data = {'id': id};  

  let res;    
  try {   
    let response = await fetch('/upload/delimage', {
      method: 'POST',        
      headers : {'Content-Type': 'application/json'},
      body    : JSON.stringify(data)    
    });
    res = await response.json();

    console.log(res);
  } catch (e) {
    console.log(e);    
  }  

  const inputFiberReflect     = document.getElementById("input-fiber-reflect");
  const inputEditFiberReflect = document.getElementById("input-edit-fiber-reflect");  

  inputFiberReflect.checked     = false;
  inputEditFiberReflect.checked = false;

  let elem = await cy.getElementById(id);  

  let sourceId   = elem.data("sourceParent");
  let targetId   = elem.data("targetParent");
  
  await show_modal_fibers_table(sourceId, targetId);  
}
function collapse_node() {
  console.log(">>collapse_node()...");

  cy.nodes('node.station').lock();                    
  cy.nodes('node.station').children().style('display', 'none');               
}
function unwrap_node() {
  console.log(">>unwrap_node()...");

  cy.nodes('node.station').unlock();         
  cy.nodes().style('display', 'element'); 
}
async function arrange_node() {
  console.log(">>arrange_node()...");

  elem = cy.nodes(':selected');
  let children = elem.children().sort(function( a, b ){
    return a.data('name') - b.data('name');
  });  

  let n = 0;

  if (elem.length > 1) {
    alert('Выбрано больше одного устройства!');
    return; 
  }

  p1 = children[0].position();
  yn = p1.y;

  if (children.length > 0) {
    for (let child of children) {    
      
      xn = p1.x+16*n;
     
      if (n===16) {        
        xn = p1.x;
        yn = yn+16;
        n = 0;
      }      
  
      data =  {                    
        'id' : child.data("id"), 
        'x'  : xn,
        'y'  : yn
      }
                             
      res = await postOnServer(data,'/updatenode'); 
    
      console.log(res);
        
      await child.position({ x: xn, y: yn });    

      child.scratch('previousPosition', child.position());   
      
      n = n + 1;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////

window.onload = function() {
  try {
    const logged = content.getAttribute("data-logged");
    if (logged==='true') {
      columnLeft = document.getElementById("column-left");
      columnLeft.oninput = function(e) {
        let id = e.target.id;  
        // console.log("input test...");
        if (cy.nodes(':selected').length>0) {    
          if (id==='node_parant'||id==='node_name'||id==='node_descr') {      
            let modNode = document.getElementById("ModNode");      
            modNode.setAttribute("style", "background-color:#009999");
  
            columnLeft.setAttribute("mod", "true");     
  
            let addEdge = document.getElementById("AddEdge"); 
            addEdge.disabled = true;
          }
        }
        if (cy.edges(':selected').length>0) {  
          if (id==='Edge_name'||id==='edge_fiber'||id==='edge_length'||id==='edge_descr') {
            let ModEdge = document.getElementById("ModEdge");      
            ModEdge.setAttribute("style", "background-color:#009999");
  
            columnLeft.setAttribute("mod", "true");    
            
            let addNode = document.getElementById("AddNode"); 
            addNode.disabled = true;
          }
        }
      } 
      return;
    } else {
      listUsers();                    
    }
  } catch(e) {
      console.log(e);
  }
}