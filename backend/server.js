const exp=require('express')
const app=exp()
const cors=require('cors')
app.use(cors())
require('dotenv').config()

const {MongoClient}=require('mongodb')
let mClient=new MongoClient(process.env.DB_URL)
const port=process.env.PORT || 4000

mClient.connect()
.then((connectionObj)=>{
    const fsddb=connectionObj.db('residence-finder')
    const registrationsCollection=fsddb.collection('registrations')
    const housesCollection=fsddb.collection('houses')
    const wishlistCollection=fsddb.collection('wishlist')
    app.set('registrationsCollection',registrationsCollection)
    app.set('housesCollection',housesCollection)
    app.set('wishlistCollection',wishlistCollection)

    console.log('DB connection successful')
    app.listen(port,()=>console.log(`http server started on port ${port}`))
})
.catch(err=>console.log("Error in DB connection",err))

const registrationsApp=require('./APIs/registrationsApi')
const housesApp=require('./APIs/housesApi')
const wishlistApp=require('./APIs/wishlistApi')

app.use('/registrations-api',registrationsApp)
app.use('/houses-api',housesApp)
app.use('/wishlist-api',wishlistApp)

app.use('*',(req,res,next)=>{
    res.send({message:`Invalid path`})
})

app.use((err,req,res,next)=>{
    res.send({message:"error occurred",errorMessage:err.message})
})