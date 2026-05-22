// ======================================================
// Custom Blockly Block Definition
// ======================================================

Blockly.defineBlocksWithJsonArray([
  {
    "type": "open_gate_with_speed",

    "message0": "open gate with speed %1",

    "args0": [
      {
        "type": "field_number",

        "name": "speed",

        "value": 5,

        "min": 1,

        "max": 10
      }
    ],

    "previousStatement": null,

    "nextStatement": null,

    "colour": 230,

    "tooltip": "Open smart gate using selected speed",

    "helpUrl": ""
  }
]);


// ======================================================
// Create Blockly Workspace
// ======================================================

const workspace = Blockly.inject('blocklyDiv', {

  toolbox: document.getElementById('toolbox')

});


// ======================================================
// JavaScript Generator
// ======================================================

const javascriptGenerator =
  new Blockly.Generator('JavaScript');


// ======================================================
// Generator Logic For Custom Block
// ======================================================

javascriptGenerator.forBlock['open_gate_with_speed'] =
function(block) {

  // Get speed input value
  const speed =
    block.getFieldValue('speed');

  // Convert speed into servo angle
  const angle = speed * 10;

  // Generate JavaScript output
  return `servo.write(${angle});\n`;
};


// ======================================================
// Generate Code Function
// ======================================================

function generateCode() {

  const code =
    javascriptGenerator.workspaceToCode(workspace);

  document.getElementById('output').textContent =
    code;
}