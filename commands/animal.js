class Animal{
  // constructor(){
  //   this.name="nameless";
  //   this.age=3;
  // }
  constructor(){
    this.name="dog"
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

module.exports = Animal;
module.exports.help = {
  name: "Animal"
}
