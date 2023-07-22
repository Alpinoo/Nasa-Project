//*Creating a reusable function for handling pagination
const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_LIMIT = 0 //it means return all documents
const getPagination = (query)=>{
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER //page and limit come as string. So, we convert it to number.We also try to avoid negatives
    const limit = Math.abs(query.limit) || DEFAULT_LIMIT
    const skip = (page-1)*limit

    return{
        limit,
        skip
    }
}

module.exports = {getPagination}