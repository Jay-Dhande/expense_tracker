const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense =  async (req , res) => {
     console.log(req.body) ; 
    const { title , amount , category , description , date , name} = req.body 
    // const name =  req.body.name 

    const expense = ExpenseSchema({
        name  , title , amount , date , category , description 
    })

    try {
        if(!title ||  !category || !description || !date){
           return res.status(400).json({message:"All fields are not filled !!"}) ;
        }
        if(amount <= 0 || !amount==='number'){
            return res.status(400).json({message:"enter a +ve amount to procced"}) ; 
        }
        await expense.save()
        res.status(200).json({message:'Expense Added'})
    } catch (error) {
        console.log("error" ,error);
        res.status(500).json({message:"Server Error"})
    }
    console.log(expense) ; 
}

exports.getExpense =  async (req , res) => {
    
    try {
        console.log("req.body exp" , req) ; 
        const expenses = await ExpenseSchema.find({name:req.query.name}).sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {

        res.status(500).json({messgae: 'Server Error'})
    }
}


exports.deleteExpense = async (req , res) => {
    const id =req.params.id ; 
    console.log(id) ; 
    console.log(req.body) ; 
    ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message:'Expense deleted'})
    })
    .catch((err) => {
        res.status(500).json({message:'Server Error'})
    }) 

}
 