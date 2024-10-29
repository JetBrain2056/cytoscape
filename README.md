Only backend release of the application for working with cytoscape.js has been published!

![evanet](https://github.com/user-attachments/assets/4ad3407f-169f-431c-80f1-3e5deeee1230)


//OVERLAP example:

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

cy.on('grab', 'node', function(e) {
  console.log('>>grab node...'); 

  let node = e.target;              
  node.scratch('previousPosition', node.position());                                      
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
