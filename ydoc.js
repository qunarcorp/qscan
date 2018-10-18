module.exports = {
  title: "qscan",
  description: "qunar scan tool",
  markdownIt: function(md){
    md.use(require('markdown-it-task-lists'));
  }
}