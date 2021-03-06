import PortfolioPeriod from '../../models/portfolioPeriod'
import moment from 'moment'
import PortfolioPeriodJudge from '../../models/portfolioPeriodJudge'
import { JUDGE } from '../../constants'
import { UserError } from 'graphql-errors'

export async function portfolioPeriod(_, args, context) {
    // Apply ordering, if desired
    let portfolio_period = null

    if (!args.id) return portfolio_period

    portfolio_period = await PortfolioPeriod.findByPk(args.id)
    return portfolio_period
}

export async function portfolioPeriods(_, args, context) {
    if(context.authType === JUDGE){
        return await handleJudgePortfolioPeriods(_, args, context)
    }
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

async function handleJudgePortfolioPeriods(_, args, context) {
    const assigned_portfolio_periods_query = {
        where: {
            judgeUsername: context.username
        }
    }
    const assigned_portfolio_period_ids = await PortfolioPeriodJudge.findAll(assigned_portfolio_periods_query)
    if(!Array.isArray(assigned_portfolio_period_ids)) return []
    const assigned_portfolio_periods = assigned_portfolio_period_ids.map(async (portfolio_period_judge) => {
        return await PortfolioPeriod.findByPk(portfolio_period_judge.portfolioPeriodId)
    })

    return assigned_portfolio_periods
}