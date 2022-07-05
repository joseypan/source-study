// 【分析】
// 1、根据readme的介绍，稍微理解一下这个是用来解析命令的
// 尝试使用，按照官方文档可以知道主要是4个api
// cli.option
// cli.version
// cli.help
// cli.parse
const cac = require("cac");
// 可知cac导出的是一个方法;
const cli = cac();
// cli.option("--type <type>", "test", {
//   default: "node",
// });
// 设置版本信息之后，通过-v命令可以看到版本号
cli.version("0.0.1");
// cli
//   .command("rm <dir>", "Remove a dir")
//   .option("-r, --recursive", "Remove recursively")
//   .action((dir, options) => {
//     console.log("remove " + dir + (options.recursive ? " recursively" : ""));
//   });
// console.log(parsed);
cli
  .command("rm <dir>", "remove dir")
  .option("-r --recursive", "remove recursively")
  .action((dir, option) => {
    console.log(dir, option);
  });
cli
  .command("build [project]", "build a project")
  .option("--no-config", "disable config file")
  .option("--config <path>", "use a custom config file");
cli.help();
cli.parse();
// 后面的command和action暂时还不是很清楚;
