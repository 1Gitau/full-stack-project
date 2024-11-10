
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export async function updateUserInfo(req, res){
    try {
        const {firstName, lastName, email, username} = req.body;
        const userId = req.userId;

        const updatedUser = await client.user.update({
            where: {
                id: userId,
            },
            data: {
                firstName,
                lastName,
                email,
                username
            },
        });
        res.status(200).json({message: "user updated successfully", user: updatedUser})
    } catch (error) {
        res.status(500).json({message: "something went wrong"});
        return;
    }
}

export async function updateUserPassword(req, res){
  try {

    const userId = req.userId;
    const {previousPassword, newPassword} = req.body;
     
    const user = await client.user.findFirst({
        where: {
            id: userId,
        },
    });

    if (!user) {
        res.status(404).json({message: "something went wrong"});
        return;
    }

    const passwordMatch = await bcrypt.compare(previousPassword, user.password);

    if (passwordMatch) {
        const hashedPassword = await bcrypt.hash(newPassword, 8);
        const updatedUser = await client.user.update({
            where: {
                id: userId,
            },
            data: {
                password: hashedPassword
            },
        });
        res.status(200).json({message: "password updated successfully"});
        return;
    }
    res.status(400).json({message: "wrong password"});
    return;

  } catch (error) {
    res.status(500).json({message: "something went wrong"});
    return;
  }
}