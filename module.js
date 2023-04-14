import fs from 'node:fs'
import {parseSync} from '@swc/core'
import { NODE_TYPES } from './constants.js';
import path from 'node:path'

console.log(NODE_TYPES)
export default class Module {
  constructor(filePath){
    this.filePath = filePath
    this.content = fs.readFileSync(filePath, 'utf-8');
    this.ast = parseSync(this.content);
    this.dependencies = this.findDependencies();
  }

  findDependencies() {
    const dependencies = this.ast.body
                        .filter((node) => node.type === NODE_TYPES.IMPORT_DECLARATION)
                        .map((node) => node.source.value)
                        .map((path) => this.resolveFile(this.filePath, path));
    return dependencies;
  }

  resolveFile(currDir, filePath){
    if(filePath.startsWith('.')){
      return path.join(path.dirname(currDir),filePath);
    }
    return path.join('node_modules', filePath);
  }
}