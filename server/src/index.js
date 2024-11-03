import express from "express"
import{PrismaClient}from "@prisma/client"
import cors from "cors"
import bcrypt from "bcryptjs"


const client = new PrismaClient();
const app = express()
app.use(express.json())


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.post("/register", async (req, res) => {
    try {
        const {firstName, lastName, email, username, password} = req.body

        if (!firstName) {
            res.status(400).json({message: "First name is required"})
            return;
        }
        if(!lastName){
            res.status(400).json({message: "Last name is required"})
            return;
        }
        if(!username){
            res.status(400).json({message: "Username is required"})
            return;
        }
        if(!email){
            res.status(400).json({message: "Email is required"})
            return;
        }
        if(!password){
            res.status(400).json({message: "Password is required"})
            return;
        }
      
        const passwordHash = await bcrypt.hash(password, 8)
    
        const newUser = await client.user.create({
            data: {
                firstName,
                lastName,
                email,
                username,
                password: passwordHash,
            },
        });

        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
});