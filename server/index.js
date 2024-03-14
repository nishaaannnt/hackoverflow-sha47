const express=require("express")
const app=express()
const cors=require("cors");

const authRouter=require('./src/routes/authRoutes')
const cameraRouter=require('./src/routes/cameraRoutes')
const userRouter=require('./src/routes/userRoutes')
const logsRouter=require('./src/routes/logsRoutes')
const objectRouter=require('./src/routes/objectRoutes')

app.use(cors());

app.use(express.json());


app.use('/auth',authRouter)
app.use('/api/camera',cameraRouter)
app.use('/api/users',userRouter)
app.use('/api/logs',logsRouter)
app.use('/api/analyze',objectRouter)


app.listen(3001,()=>{
    console.log("Done Sir")
})