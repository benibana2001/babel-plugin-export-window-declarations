const exportLiteral = (array) => {
  if (!Array.isArray(array) || !array.length > 0) return "";
  return `
  export {
    ${array.join(",\n  ")}
  }
  `;
};

const plugin = ({ types: t, template }) => {
  const pre = function () {
    this.doInsert = true;
    this.members = [];
  };
  const visitor = {
    ExportNamedDeclaration: (nodePath, state) => {
      state.doInsert = false;
    },
    VariableDeclarator: (nodePath, state) => {
      if (!t.isIdentifier(nodePath.node.id)) return;

      const grandParentPathType = nodePath.parentPath.parentPath.node.type;
      if (grandParentPathType === "Program") {
        state.members.push(nodePath.node.id.name);
      }
    },
    FunctionDeclaration: (nodePath, state) => {
      if (!t.isIdentifier(nodePath.node.id)) return;

      const parentPathType = nodePath.parentPath.node.type;
      if (parentPathType === "Program")
        state.members.push(nodePath.node.id.name);
    },
    Program: {
      exit: (nodePath, state) => {
        if (!state.doInsert) return;
        const newAst = template(exportLiteral(state.members))();
        nodePath.pushContainer("body", newAst);
      },
    },
  };
  return {
    name: "insert-export",
    pre,
    visitor,
  };
};

module.exports = plugin;
