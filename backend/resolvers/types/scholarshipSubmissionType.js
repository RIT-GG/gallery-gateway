
export default {
    ScholarshipSubmission: {
      // Retrieves submissions submitted to this specific scholarships
      portfolio (scholarshipSubmission, _, context) {
        return scholarshipSubmission.getPortfolio()
      }
    }
  }
  