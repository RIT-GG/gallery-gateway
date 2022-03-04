import PortfolioPeriod from '../../models/portfolioPeriod'
import moment from 'moment'

export async function portfolioPeriod(_, args, context) {
    // Apply ordering, if desired
    const order = args.orderBy ? { order: [[args.orderBy.sort, args.orderBy.direction]] } : {}
    if (args.id) {
        return PortfolioPeriod.findByPk(args.id)
    }

    // Can only query for portfolio periods by active and id
    return null;
}

export async function portfolioPeriods(_, args, context) {
    // Apply ordering, if desired
    const order = args.orderBy ? { order: [[args.orderBy.sort, args.orderBy.direction]] } : {};
    // If the active parameter is sent query for only active portfolio periods (submissions OR judging it open)
    if (args.active) {
        const today = moment().toDate()
        const whereClause = {
            where: {
                startDate: {
                    $lte: today
                },
                judgingEndDate: {
                    $gte: today
                }
            }
        }
        return PortfolioPeriod.findAll(Object.assign({}, whereClause, order))
    }
    // If the activeSubmissions parameter is sent query for only portfolio periods accepting submissions
    if (args.activeSubmission) {
        const today = moment().toDate()
        const whereClause = {
            where: {
                startDate: {
                    $lte: today
                },
                endDate: {
                    $gte: today
                }
            }
        }
        return PortfolioPeriod.findAll(Object.assign({}, whereClause, order))
    }
    // If the activeJudging parameter is sent query for only portfolio periods accepting submissions
    if (args.activeJudging) {
        const today = moment().toDate()
        const whereClause = {
            where: {
                judgingStartDate: {
                    $lte: today
                },
                judgingEndDate: {
                    $gte: today
                }
            }
        }
        return PortfolioPeriod.findAll(Object.assign({}, whereClause, order))
    }
    return PortfolioPeriod.findAll(order);
}