
export default {
  Portfolio: {
    entries (portfolio, _, context) {
      // Admins and judges should see all entries on a show
      // TO DO: Lock this down to Admin, judge, or user who owns the portfolio
      return portfolio.getEntries()
    }
  }
}
