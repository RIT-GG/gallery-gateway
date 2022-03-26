import ScholarshipSubmissions from "../../models/scholarshipSubmissions";

export function scholarshipSubmission(_, args, context) {
    const { id } = args
    return ScholarshipSubmissions.findByPk(id)
}

export function scholarshipSubmissions(_, args, context) {
    let whereClause = {
        where: {}
    }
    // Apply ordering, if desired
    const order = args.orderBy ? { order: [[args.orderBy.sort, args.orderBy.direction]] } : {}
    
    return ScholarshipSubmissions.findAll(Object.assign({}, whereClause, order))
}