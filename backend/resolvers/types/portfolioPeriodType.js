
export default {
    PortfolioPeriod: {
      judges (portfolioPeriod, _, context) {
        return portfolioPeriod.getJudges()
      },
      portfolios (portfolioPeriod, _, context) {
        return portfolioPeriod.getPortfolios()
      }
    }
  }
  