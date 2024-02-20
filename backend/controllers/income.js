const IncomeSchema = require("../models/IncomeModel")

exports.addIncome =  async (req , res) => {
     console.log(req.body) ; 
    const { title , amount , category , description , date , name} = req.body
    // const name=req.body.name

    const income = IncomeSchema({
        name , title , amount , date , category , description 
    })

    try {
        if(!title ||  !category || !description || !date){
           return res.status(400).json({message:"All fields are not filled !!"}) ;
        }
        if(amount <= 0 || !amount==='number'){
            return res.status(400).json({message:"enter a +ve amount to procced"}) ; 
        }
        await income.save()
        res.status(200).json({message:'Income Added'})
    } catch (error) {
        console.log("error" ,error);
        res.status(500).json({message:"Server Error"})
    }
    console.log(income) ; 
}

exports.getIncomes =  async (req , res) => {
    try {
        const incomes = await IncomeSchema.find({name:req.query.name}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({messgae: 'Server Error'})
    }
}


exports.deleteIncome = async (req , res) => {
    const id =req.params.id ;
    // const {name} =req.params.name ;  
    // console.log("del req recieved "); 
    // console.log(" req " , req) ;
    // console.log("req body" , req.body) ; 
    // console.log("req params"  , req.params) ; 
    // console.log("req query" ,req.query ) ; 


    IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message:'Income deleted'})
    })
    .catch((err) => {
        res.status(500).json({message:'Server Error'})
    }) 

}
 