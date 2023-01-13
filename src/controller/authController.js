import formidable from 'formidable'
import validator from 'validator'
import registerModel from '../models/authModel.js'
import fs from 'fs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const userRegister = (req,res) => {
    
     const form = formidable()
    form.parse(req, async (err,fields,files) => {
        // console.log(fields)
        // console.log(files);
        const {
            userName, email, password, confirmPassword
        } = fields
        const {image} = files
        const error = []
        if(!userName ){
            error.push('Please provide your user name')
        }
        if (!email) {
          error.push("Please provide your Email");
        }
        if (email && !validator.isEmail(email)) {
          error.push("Please provide a valid Email");
        }
        if (!password) {
          error.push("Please provide your password");
        }
        if (!confirmPassword) {
          error.push("Please confirm your password");
        }
        if (password && confirmPassword && password !==confirmPassword) {
          error.push("Your password does not match");
        }
        if (password && password.length < 6) {
          error.push("Your password must be longer than 6 characters");
        }
        if (Object.keys(files).length === 0) {
          error.push("Please provide your user image");
        }
        if(error.length > 0) {
            res.status(400).json({
                error:{
                    errorMessage: error
                }
            })
        } else {
            const getImageName = files.image.originalFilename
            const randNumber = Math.floor(Math.random() * 99999)
            const newImageName = randNumber + getImageName
            files.image.originalFilename = newImageName
            
            const newPath = __dirname + `../../../chat-app-frontend/public/image/${files.image.originalFilename}`
            
            try {
                const checkUser = await registerModel.findOne({
                    email:email
                })
                if(checkUser) {
                    res.status(404).json({
                        error: {
                            errorMessage : ['Your email already registered']
                        }
                    })
                } else {
                    fs.copyFile(files.image.filepath, newPath, async(error) => {
                        if(!error) {
                            const userCreate = await registerModel.create({
                                userName, email, password : await bcrypt.hash(password,10),
                                image: files.image.originalFilename
                            })

                            const token =jwt.sign({
                                id : userCreate._id,
                                email: userCreate.email, 
                                userName: userCreate.userName,
                                image: userCreate.image,
                                registerTime: userCreate.createdAt
                            }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXP})
                            console.log(token)
                            console.log('registration complete successfully')
                            
                            const options = {expires : new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000 )}
                            
                            res.status(201).cookie('authToken', token, options).json({
                                successMessage : 'Your Register successful', token
                            })
                        } else {
                            res.status(500).json({
                              error: {
                                errorMessage: ["Internal server error"],
                              },
                            });
                        }
                    })
                }
            } catch (error) {
                res.status(500).json({
                    error: {
                        errorMessage: ['Internal server error']
                    }
                })
            }
        }


        
    }) // end formidable
    
    console.log('register is working')
} 