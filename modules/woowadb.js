const WOOWA_DB_PATH = './data.json'
const fs = require('fs');
const User = require('../models/users')
class WoowaDB {
  constructor(){
    if(!fs.existsSync(WOOWA_DB_PATH)){
      const initObj = {users: []};
      fs.writeFileSync(WOOWA_DB_PATH, JSON.stringify(initObj))
    }
  }
  getUsers(){
    const {users} = JSON.parse(fs.readFileSync(WOOWA_DB_PATH));
    return users;
  }
  findUser(id){
    try{
      const users = this.getUsers()
      const user = users.find(x=>x.id == id);
      if(user){
        return new User(user)
      }
      return null
    }
    catch(e){
      console.error(e);
      return null
    }
  }
  addUser(obj){
    try{
      const newUsers = [...this.getUsers(), new User(obj)]
      fs.writeFileSync(WOOWA_DB_PATH, JSON.stringify({users: newUsers}, null, 2));
    }
    catch(e){
      console.error(e);
    }
  }
}
module.exports = WoowaDB