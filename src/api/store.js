
const DATABASE = 'PartyNote Offline DB'
const DB_VERSION = 1
// const STORE_NAME = 'members';

var db

openDB = () => {
  // DB 생성
  var req = indexedDB.open(DATABASE, DB_VERSION)

  // DB 생성 성공
  req.onsuccess = function (evt) {
    db = this.result
  }
  // DB 생성 오류
  req.onerror = function (evt) {
    console.error('indexedDB : ', evt.target.errorCode)
  }
  // DB 마그레이션
  req.onupgradeneeded = function (evt) {
    console.log('마이그레이션 완료')
    var noteTable = evt.currentTarget.result.createObjectStore('partynote',
      { keyPath: 'noteCode' })

    // store.createIndex('emailColumn', 'email', { unique: false });
    // store.createIndex('nameColumn', 'name', { unique: false });
    noteTable.createIndex('noteCode', 'noteCode', { unique: true })
    noteTable.createIndex('noteTitle', 'noteTitle', { unique: false })
    noteTable.createIndex('noteDes', 'noteDes', { unique: false })
    noteTable.createIndex('notColor', 'noteColor', { unique: false })
    noteTable.createIndex('priv', 'priv', { unique: false })
    noteTable.createIndex('usable', 'usable', { unique: false })
    noteTable.createIndex('recentDate', 'recentDate', { unique: false })

    const postTable = evt.currentTarget.result.createObjectStore('notepost', { keyPath: 'postCode' })

    postTable.createIndex('postCode', 'postCode', { unique: true })
    postTable.createIndex('postTitle', 'postTitle', { unique: false })
    postTable.createIndex('postSubTitle', 'postSubTitle', { unique: false })
    postTable.createIndex('postContents', 'postContents', { unique: false })
    postTable.createIndex('postColor', 'postColor', { unique: false })
    postTable.createIndex('postIndex', 'postIndex', { unique: false })
    postTable.createIndex('recentDate', 'recentDate', { unique: false })
  }
}

openDB()

function getObjectStore (store_name, mode) {
  return db.transaction(store_name, mode).objectStore(store_name)
}

function addValue () {
  // const email = document.getElementById('email') //value 갖고오기
  // const name = document.getElementById('name')
  const log = document.getElementById('log')

  const store = getObjectStore('partynote', 'readwrite') // 스토어 트랜잭션

  const obj = { // input 할 오브젝트 세팅
    email: email.value,
    name: name.value
  }

  req = store.add(obj) // 스토어 트랜잭션 시행

  req.onsuccess = (e) => {
    log.innerHTML += `${STORE_NAME}에 email: ${email.value} ,name: ${name.value} 입력 완료\n`
  }
  req.onerror = (e) => {
    console.log(e)
  }
}

module.exports={
  
}