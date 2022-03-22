import Scholarship from "../../models/scholarship";

export function scholarship(_, args, context){
    const {id} = args
    return Scholarship.findByPk(id)
}

export function scholarships(_, args, context){
    return Scholarship.findAll()
}