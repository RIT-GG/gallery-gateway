import Scholarship from "../../models/scholarship";

export function scholarship(_, args, context) {
    const { id } = args
    return Scholarship.findByPk(id)
}

export function scholarships(_, args, context) {
    let whereClause = {
        where: {}
    }
    // Apply ordering, if desired
    const order = args.orderBy ? { order: [[args.orderBy.sort, args.orderBy.direction]] } : {}
    // Assume a query is for active scholarships unless specified in args
    if( args.includeInactive !== true ){
        whereClause.where = {
            ...whereClause.where,
            active: true
        }
    } 
    return Scholarship.findAll(Object.assign({}, whereClause, order))
}