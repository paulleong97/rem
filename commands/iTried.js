const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  let jsonArray = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  class Animal{
    // constructor(){
    //   this.name="nameless";
    //   this.age=3;
    // }
    constructor(name, age){
      this.name=name;
      this.age=age;
    }
    setName(name){
      this.name = name;
    }
    setAge(age){
      this.age=age;
    }
    getName(){
      return this.name;
    }
    getAge(){
      return this.age;
    }
  }

  var jsonArg1 = new Animal("dog", 3);
    // jsonArg1.name = 'dog';
    // jsonArg1.age = 3.1415;
var jsonArg2 = new Animal("cat", 4);
    // jsonArg2.name = 'cat';
    // jsonArg2.age = 2.73;

var pluginArrayArg = new Array();
    pluginArrayArg.push(jsonArg1);
    pluginArrayArg.push(jsonArg2);

    jsonArray = JSON.stringify(pluginArrayArg, null, 2);

    console.log(`jsonArray: ${jsonArray}`);
    fs.writeFile("./warnings.json", jsonArray, (err) => {
      if (err) console.log(err);
    });
}
  module.exports.help = {
    name: "iTried"
  }
