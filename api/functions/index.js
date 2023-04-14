const functions = require("firebase-functions")
const admin = require('firebase-admin')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')
const express = require('express')
const cors = require('cors')({origin: true})
const serviceAccountCredentials = require('./service-credentials.json')

const app = express()
app.use(cors)

admin.initializeApp({ credential: admin.credential.cert(serviceAccountCredentials) })

admin.firestore().settings({ ignoreUndefinedProperties: true })

app.post('/users/create-account', async (req, res) => {
   const { username, age, role } = req.body

   try {

      // if(role !== 'teacher') {
      //    res.status(500).send({ message: 'Please choose a valid user role.' })
      //    return
      // }

      const uid = getFirestore().collection('users').doc().id
      const profileImage = 'https://picsum.photos/200/300'
      
      await admin.auth().createUser({ uid, displayName: username, age, photoURL: profileImage })
         .then(() => console.log('success'))
         .catch(() => { throw { message: 'Unable to create new user account. Please try again.' } })

      if(role === 'teacher') {
         const student_uids = []

         await getFirestore().collection('students').get().then(snapshot => {
            if(snapshot.empty) return
            snapshot.forEach(doc => student_uids.push(doc.data().uid))
         }).catch(() => { 
            throw { message: 'Unable to create new user account. Please try again.' } 
         })

         await getFirestore().collection('teachers')
            .doc().create({ 
               uid,
               photoURL: profileImage,
               displayName: username, 
               role,  
               students: student_uids
            }).catch(() => { 
               throw { message: 'An error occurred. Please try again.' } 
            })
      }

      if(role === 'student') {
         await getFirestore().collection('students')
            .doc().create({ 
               uid,
               photoURL: profileImage,
               displayName: username, 
               role,  
            }).catch(() => { 
               throw { message: 'Unable to create new user account. Please try again.' } 
            })

            await getFirestore().collection('teachers').get().then(snapshot => {
               if(snapshot.empty) return
               snapshot.forEach(async (doc) => {
                  await doc.ref.set({
                     students: FieldValue.arrayUnion(uid)
                  }, { merge: true })
               })
            }).catch(() => { 
               throw { message: 'An error occurred. Please try again.' } 
            })
      }
    
      res.status(200).send({ message: 'Account created successfully!' })
         
   } catch(error) {
      res.status(500).send(error)
   }

});

app.post('/users/createQuestion', async (req, res) => {
   console.log('test')
   const { question, uid } = req.body
   
   try {

      await getFirestore().collection('students')
         .where('uid', '==', uid).get()
         .then(async (snapshot) => {
            if(snapshot.empty) return
            const timestamp = Timestamp.now().seconds

            await snapshot.docs[snapshot.docs.length - 1].ref.set({
               questions: FieldValue.arrayUnion({
                  createdAt: timestamp,
                  question
               })
            }, { merge: true })
         })
         .catch(() => {
            throw { message: 'Unable to save your question. Please try again' }
         })

      res.send({ message: 'Questions saved!' })

   } catch(error) {
      res.status(500).send(error)
   }
})

// app.get('/users/getStudent', async (req, res) => {
//    const { uid } = req.body

//    try {
//       await getFirestore().collection('students')
//          .where('uid', '==', uid).get()
//          .then(snapshot => {
//             const user = snapshot.docs[snapshot.docs.length - 1].data()
//             res.status(200).send({ username: user.username, uid: user.uid })
//          }).catch(() => { throw { message: 'There was an error getting your profile. Please refresh your browser and try again.' }})
//    } catch(error) {
//       res.status(500).send(error)
//    }
// })

// app.get('/users/getTeacher', async (req, res) => { })

// app.get('/users/getStudentQuestions', async (req, res) => { })

exports.api = functions.https.onRequest(app);