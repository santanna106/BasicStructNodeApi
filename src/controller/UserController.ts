import {Request,Response } from "express";
import User from "../database/schemas/User";

class UserController{
    async find(request:Request,response:Response){
        try{
            const users = await User.find();
            return response.json(users);
        } catch(error){
            return response
                    .status(500)
                    .send({
                        error:"Something wrong happended, try again",
                        message:error
                    })
        }    
    }
    async create(request:Request,response:Response){
        const { name, email, password} = request.body;

        try{
            const userExists = await User.findOne({email});

            if(userExists){
                return response
                       .status(400)
                       .send({
                    error:"Ooops",
                    message:"User already exists",
                })
            }
            //const user = await User.create(request.body);
           
            const user = await User.create({
                name,
                email,
                password
            });

            return response.json(user);
            
        } catch(error){
            return response
                    .status(500)
                    .send({
                        error:"Registration failed",
                        message:error
                    })
        }        
    }
}

export default new UserController;