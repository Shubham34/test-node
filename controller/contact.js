const Contact = require('../models/contact');

module.exports = {
    async getContacts(req,res) {
        try {
            const contacts = await Contact.find({}, {
                _id: true,
                name: true,
                email: true,
                message: true
            });
            return res.status(200).json({
                error: false,
                success: true,
                data: contacts
            })
        } catch(error) {
            return res.status(400).json({
                error: true,
                success: false,
                message: error.toString()
            })
        }
    },
    async postContact(req, res) {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const message = req.body.message;
            
            const emailToValidate = req.body.email;
            const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

            // Email validation
            if (emailRegexp.test(emailToValidate) && name.length > 0 && message.length > 0) {
                const contact = new Contact({
                    name: req.body.name,
                    email: req.body.email,
                    message: req.body.message
                })
            
                const posting = await contact.save()
                return res.status(200).json({
                    error: false,
                    success: true,
                    message: "Thankyou for contacting us. We will get back to you soon"
                })
            } else {
                var errorMessage = "";
                if (!emailRegexp.test(emailToValidate)) {
                    errorMessage += "Email not valid or empty!.";
                }
                if (!name.length > 0) {
                    errorMessage += " Enter name!.";
                }
                if (!message.length > 0) {
                    errorMessage += " Enter a message!.";
                }
                return res.status(400).json({
                    error: true,
                    success: false,
                    message: errorMessage
                })
            }
        } catch (error) {
            return res.status(400).json({
                error: true,
                success: false,
                message: error.toString()
            })
        }
    }
}