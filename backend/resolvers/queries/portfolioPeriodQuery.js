import PortfolioPeriod from '../../models/portfolioPeriod'
import moment from 'moment'

export async function portfolioPeriod(_, args, context) {
    // Apply ordering, if desired
    const order = args.orderBy ? { order: [[args.orderBy.sort, args.orderBy.direction]] } : {}
    if (args.id) {
        return PortfolioPeriod.findByPk(args.id)
    }
    // If the active parameter is sent query for only active portfolio Periods
    if (args.active) {
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
        return PortfolioPeriod.findOne(Object.assign({}, whereClause, order))
    }

    // Otherwise just show all portfolios (with possible ordering)
    return PortfolioPeriod.findAll(order)
}
