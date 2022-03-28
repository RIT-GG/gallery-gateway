
export default {
    ScholarshipSubmission: {
      // Retrieves the portfolio for this specific scholarship submission
      portfolio (scholarshipSubmission, _, context) {
        return scholarshipSubmission.getPortfolio()
      }
    }
  }
  