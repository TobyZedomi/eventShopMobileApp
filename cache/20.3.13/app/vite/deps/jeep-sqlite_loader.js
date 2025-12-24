import {
  bootstrapLazy,
  setNonce
} from "./chunk-GSRY7ML2.js";
import {
  __async
} from "./chunk-SCNEKAWF.js";

// node_modules/jeep-sqlite/dist/esm/app-globals-0f993ce5.js
var globalScripts = () => {
};

// node_modules/jeep-sqlite/dist/esm/loader.js
var defineCustomElements = (win, options) => __async(null, null, function* () {
  if (typeof window === "undefined") return void 0;
  yield globalScripts();
  return bootstrapLazy([["jeep-sqlite", [[1, "jeep-sqlite", { "autoSave": [516, "autosave"], "typeOrm": [516, "typeorm"], "wasmPath": [513, "wasmpath"], "pickText": [513, "picktext"], "saveText": [513, "savetext"], "buttonOptions": [513, "buttonoptions"], "innerAutoSave": [32], "innerTypeOrm": [32], "innerWasmPath": [32], "innerPickText": [32], "innerSaveText": [32], "innerButtonOptions": [32], "echo": [64], "createConnection": [64], "isConnection": [64], "closeConnection": [64], "open": [64], "close": [64], "getVersion": [64], "beginTransaction": [64], "commitTransaction": [64], "rollbackTransaction": [64], "isTransactionActive": [64], "execute": [64], "executeSet": [64], "run": [64], "query": [64], "getTableList": [64], "isDBExists": [64], "isDBOpen": [64], "deleteDatabase": [64], "isStoreOpen": [64], "copyFromAssets": [64], "isTableExists": [64], "createSyncTable": [64], "getSyncDate": [64], "setSyncDate": [64], "isJsonValid": [64], "importFromJson": [64], "exportToJson": [64], "deleteExportedRows": [64], "addUpgradeStatement": [64], "isDatabase": [64], "getDatabaseList": [64], "checkConnectionsConsistency": [64], "saveToStore": [64], "saveToLocalDisk": [64], "getFromLocalDiskToStore": [64], "getFromHTTPRequest": [64] }, null, { "autoSave": ["parseAutoSave"], "typeOrm": ["parseTypeOrm"], "wasmPath": ["parseWasmPath"], "pickText": ["parsePickText"], "saveText": ["parseSaveText"], "buttonOptions": ["parseButtonOptions"] }]]]], options);
});

// node_modules/jeep-sqlite/loader/index.js
(function() {
  if ("undefined" !== typeof window && void 0 !== window.Reflect && void 0 !== window.customElements) {
    var a = HTMLElement;
    window.HTMLElement = function() {
      return Reflect.construct(a, [], this.constructor);
    };
    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
  }
})();
export {
  defineCustomElements,
  setNonce
};
//# sourceMappingURL=jeep-sqlite_loader.js.map
