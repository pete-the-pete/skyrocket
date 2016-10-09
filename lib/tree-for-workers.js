/* jshint node: true */
'use strict';
var WorkerCompiler = require('./plugins/worker-compiler');
var WorkerGenerator = require('./plugins/worker-generator');
var BabelTranspiler = require('broccoli-babel-transpiler');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var path = require('path');
var chalk = require('chalk');
var debug  = require('debug')('skyrocket');
// var log = require('broccoli-stew').log;

module.exports = function treeForWorkers(app) {
  debug(chalk.yellow('Generating Worker Tree'));
  var tree = app.trees.app;

  // grab addon modules so that each worker's imported
  // dependencies can be bundled with the worker
  var addonTrees = addonTreesFor(this.project, 'addon');
  var mergedAddons = mergeTrees(addonTrees);
  var funneledAddons = new Funnel(mergedAddons, {
    srcDir: 'modules'
  });

  // combine addon modules with the with app tree
  //   again, so that app modules are also available
  //   to workers that import them
  var combinedTree = mergeTrees([funneledAddons, tree]);

  debug(chalk.grey('\tForked Assets for Worker Consumption'));

  // discover workers
  // compile workers to /public/assets/workers
  // compiling the contracts to /workers/<worker-name>.js occurs elsewhere
  debug(chalk.grey('\tCompiling Workers'));

  // create worker asset files
  // TODO: the deps should be required and enforced, with the npm version
  // preferred and should probably seomthing like _addonInstalled
  // 
  // The WorkerGenerator vs WorkerCompiler should have clearer responsibilities, the
  // compiler could use these values for rollup
  var pathToEmber = path.join(app.project.root, app.bowerDirectory, 'ember/ember.min.js');
  var emberShims = path.join(app.project.root, app.bowerDirectory, '/ember-cli-shims/app-shims.js');
  var pathToLoader = path.join(app.project.root, 'node_modules/loader.js/lib/loader/loader.js');
  var alternatePathToLoader = path.join(app.project.root, app.bowerDirectory, 'loader.js/loader.js');

  var workers = new WorkerCompiler(combinedTree, {
    ember: pathToEmber
  });

  debug(chalk.grey('\tTranspiling Workers'));

  // transpile workers from es2015 to es5
  var transpiled = new BabelTranspiler(workers, {
    loose: true,
    moduleIds: true,
    modules: 'amdStrict',
    browserPolyfill: true
  });

  var assembled = new WorkerGenerator(transpiled, {
    ember: pathToEmber,
    loader: alternatePathToLoader,
    emberShims: emberShims,
    appName: app.name,
    workerPrefix: 'workers',
    destDir: 'assets/workers'
  });

  return assembled;
};


function addonTreesFor(project, type) {
  return project.addons.map(function(addon) {
    if (addon.treeFor) {
      return addon.treeFor(type);
    }
  }).filter(Boolean);
}
